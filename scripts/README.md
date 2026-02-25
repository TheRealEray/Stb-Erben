# Translation Script

Automatische Übersetzung von `de.json` → `en.json` + `tr.json` via Claude API.

## Einrichtung

```bash
# Anthropic API Key setzen (einmalig in ~/.zshrc oder ~/.bashrc)
export ANTHROPIC_API_KEY=sk-ant-...
```

## Verwendung

```bash
# Nur neue/fehlende Keys übersetzen (normaler Workflow)
node scripts/translate.js

# Alle Keys neu übersetzen (nach großen Änderungen)
node scripts/translate.js --force

# Nur Englisch übersetzen
node scripts/translate.js --lang en

# Nur Türkisch übersetzen
node scripts/translate.js --lang tr

# Vorschau: zeigt welche Keys übersetzt werden (ohne zu schreiben)
node scripts/translate.js --dry-run
```

## Workflow bei Änderungen

1. `de.json` bearbeiten (deutsche Texte ändern/hinzufügen)
2. `node scripts/translate.js` ausführen
3. Ergebnis prüfen: `en.json` und `tr.json`
4. `netlify deploy --prod`

Das Script übersetzt **nur neue oder fehlende Keys** — bestehende Übersetzungen bleiben erhalten.
Mit `--force` werden alle Keys neu übersetzt.
