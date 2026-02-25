#!/usr/bin/env node
/**
 * Auto-Translation Script
 * Reads de.json (source of truth) and translates new/changed keys to EN and TR
 * using the Anthropic Claude API.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/translate.js
 *
 * The script only translates keys that differ between de.json and the target language.
 * Existing translations are preserved unless --force flag is used.
 *
 * Options:
 *   --force     Re-translate ALL keys (ignore existing translations)
 *   --lang en   Only translate to English (skip Turkish)
 *   --lang tr   Only translate to Turkish (skip English)
 *   --dry-run   Show what would be translated without writing files
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const TRANSLATIONS_DIR = path.join(ROOT, 'assets', 'translations');

const DE_PATH = path.join(TRANSLATIONS_DIR, 'de.json');
const EN_PATH = path.join(TRANSLATIONS_DIR, 'en.json');
const TR_PATH = path.join(TRANSLATIONS_DIR, 'tr.json');

// --- CLI args ---
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const DRY_RUN = args.includes('--dry-run');
const LANG_FILTER = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : null;

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('❌  ANTHROPIC_API_KEY environment variable not set.');
  console.error('    Run: ANTHROPIC_API_KEY=sk-... node scripts/translate.js');
  process.exit(1);
}

// --- Flatten/unflatten helpers ---
function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flatten(obj[key], fullKey));
    } else {
      acc[fullKey] = obj[key];
    }
    return acc;
  }, {});
}

function unflatten(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

// --- Anthropic API call ---
async function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }]
    });

    const req = https.request({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) return reject(new Error(parsed.error.message));
          resolve(parsed.content[0].text);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// --- Translate a batch of key-value pairs ---
async function translateBatch(kvPairs, targetLang) {
  const langNames = { en: 'English', tr: 'Turkish' };
  const langName = langNames[targetLang];

  const jsonInput = JSON.stringify(kvPairs, null, 2);

  const prompt = `You are a professional translator specializing in German tax law and legal terminology.

Translate the following JSON key-value pairs from German to ${langName}.

Rules:
- Keep all JSON keys exactly as-is (do NOT translate keys)
- Translate ONLY the values
- Preserve HTML tags if any (e.g., <strong>, <a href="...">)
- Preserve template variables if any (e.g., {name}, {{count}})
- Use formal/professional tone appropriate for a German tax consulting firm
- For Turkish: use formal Turkish ("siz" form), accurate legal terminology
- For English: use British/International English, formal register
- Return ONLY valid JSON, no explanation, no markdown code blocks

Input JSON:
${jsonInput}

Output (valid JSON only):`;

  const response = await callClaude(prompt);

  // Strip markdown code blocks if present
  const cleaned = response.trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('❌  Failed to parse Claude response as JSON:');
    console.error(cleaned.substring(0, 500));
    throw new Error('Invalid JSON from Claude API');
  }
}

// --- Find keys that need translation ---
function findMissingOrChanged(deFlat, targetFlat) {
  if (FORCE) return deFlat; // Translate everything

  const missing = {};
  for (const [key, deValue] of Object.entries(deFlat)) {
    if (!(key in targetFlat)) {
      missing[key] = deValue;
    }
    // Note: we don't re-translate existing keys unless --force
  }
  return missing;
}

// --- Main ---
async function main() {
  console.log('🔍  Reading translation files...');

  const de = JSON.parse(fs.readFileSync(DE_PATH, 'utf8'));
  const en = fs.existsSync(EN_PATH) ? JSON.parse(fs.readFileSync(EN_PATH, 'utf8')) : {};
  const tr = fs.existsSync(TR_PATH) ? JSON.parse(fs.readFileSync(TR_PATH, 'utf8')) : {};

  const deFlat = flatten(de);
  const enFlat = flatten(en);
  const trFlat = flatten(tr);

  console.log(`📊  Total DE keys: ${Object.keys(deFlat).length}`);

  const targets = [];
  if (!LANG_FILTER || LANG_FILTER === 'en') targets.push({ lang: 'en', flat: enFlat, path: EN_PATH });
  if (!LANG_FILTER || LANG_FILTER === 'tr') targets.push({ lang: 'tr', flat: trFlat, path: TR_PATH });

  for (const { lang, flat: targetFlat, path: targetPath } of targets) {
    const toTranslate = findMissingOrChanged(deFlat, targetFlat);
    const count = Object.keys(toTranslate).length;

    if (count === 0) {
      console.log(`✅  ${lang.toUpperCase()}: All keys up to date, nothing to translate.`);
      continue;
    }

    console.log(`\n🌐  ${lang.toUpperCase()}: ${count} keys to translate...`);

    if (DRY_RUN) {
      console.log('    (Dry run — keys that would be translated:)');
      Object.keys(toTranslate).forEach(k => console.log(`    - ${k}`));
      continue;
    }

    // Split into batches of 50 keys to avoid token limits
    const BATCH_SIZE = 50;
    const keys = Object.keys(toTranslate);
    const translated = { ...targetFlat };

    for (let i = 0; i < keys.length; i += BATCH_SIZE) {
      const batchKeys = keys.slice(i, i + BATCH_SIZE);
      const batch = {};
      batchKeys.forEach(k => batch[k] = toTranslate[k]);

      process.stdout.write(`    Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(keys.length / BATCH_SIZE)}... `);

      const result = await translateBatch(batch, lang);
      Object.assign(translated, result);

      console.log('✓');

      // Small delay to avoid rate limiting
      if (i + BATCH_SIZE < keys.length) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // Write updated file — use DE structure as template to preserve key order
    const fullTranslated = {};
    for (const key of Object.keys(deFlat)) {
      fullTranslated[key] = translated[key] ?? deFlat[key]; // Fallback to DE if translation missing
    }

    const output = unflatten(fullTranslated);
    fs.writeFileSync(targetPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
    console.log(`💾  Saved ${targetPath}`);
  }

  console.log('\n✅  Translation complete!');
  if (!DRY_RUN) {
    console.log('    Deploy with: netlify deploy --prod');
  }
}

main().catch(err => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});
