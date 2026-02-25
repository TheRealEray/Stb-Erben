/**
 * news.js — Steuer-Aktuell News Feed
 * Fetches live RSS feeds from official German tax news sources
 * and renders them as a filterable editorial article layout.
 *
 * Sources: BMF (2 feeds), Haufe Steuern, Bundesrat
 * Proxy: allorigins.win (primary) + rss2json.com (fallback)
 * Cache: localStorage (24h TTL) — only cached when articles > 0
 */

const NEWS_CACHE_KEY = 'news_cache_v2';
const NEWS_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 Stunden (täglich aktualisiert)

const FEEDS = [
  {
    url: 'https://www.bundesfinanzministerium.de/SiteGlobals/Functions/RSSFeed/DE/Pressemitteilungen/RSSPressemitteilungen.xml',
    source: 'Bundesfinanzministerium',
    category: 'Steuerpolitik',
    icon: '🏛️'
  },
  {
    url: 'https://www.bundesfinanzministerium.de/SiteGlobals/Functions/RSSFeed/DE/Steuern/RSSSteuern.xml',
    source: 'BMF Steuern',
    category: 'Steuerrecht',
    icon: '📋'
  },
  {
    url: 'https://www.haufe.de/xml/rss_129148.xml',
    source: 'Haufe Steuer',
    category: 'Steuerrecht',
    icon: '⚖️'
  },
  {
    url: 'https://www.bundesrat.de/SiteGlobals/Functions/RSSFeed/RSSGenerator_Announcement.xml?nn=4352850',
    source: 'Bundesrat',
    category: 'Gesetzgebung',
    icon: '📜'
  }
];

// ────────────────────────────────────────────────────────────────
// RSS Parsing (direct via DOMParser)
// ────────────────────────────────────────────────────────────────

function parseRSSXml(xmlStr, feed) {
  try {
    const doc = new DOMParser().parseFromString(xmlStr, 'application/xml');
    // Check for parse error
    if (doc.querySelector('parsererror')) return [];

    const items = doc.querySelectorAll('item');
    if (!items.length) return [];

    return Array.from(items).slice(0, 10).map(item => {
      const text = tag => item.querySelector(tag)?.textContent?.trim() || '';

      // <link> in RSS is a self-closing tag or contains text — try multiple approaches
      let link = text('link');
      if (!link) {
        // Some feeds put the URL in guid
        const guid = item.querySelector('guid');
        if (guid && guid.getAttribute('isPermaLink') !== 'false') {
          link = guid.textContent.trim();
        }
      }
      if (!link || link === '') link = '#';

      const pubDate = text('pubDate') || text('date') || text('dc\\:date');
      const date = pubDate ? new Date(pubDate) : new Date();

      return {
        title: text('title'),
        link,
        description: stripHtml(text('description') || text('content\\:encoded') || ''),
        date: isNaN(date.getTime()) ? new Date() : date,
        source: feed.source,
        category: feed.category,
        icon: feed.icon
      };
    }).filter(a => a.title && a.title.length > 2);
  } catch {
    return [];
  }
}

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  return text.replace(/\s+/g, ' ').trim().slice(0, 240);
}

// ────────────────────────────────────────────────────────────────
// Fetch — 3-strategy proxy chain
// ────────────────────────────────────────────────────────────────

async function fetchFeed(feed) {
  // Strategy 1: Netlify Function (server-side, most reliable, no CORS)
  try {
    const fnUrl = `/.netlify/functions/news?url=${encodeURIComponent(feed.url)}`;
    const res = await fetch(fnUrl, { signal: AbortSignal.timeout(10000) });
    if (res.ok) {
      const xmlStr = await res.text();
      const articles = parseRSSXml(xmlStr, feed);
      if (articles.length > 0) return articles;
    }
  } catch {}

  // Strategy 2: allorigins.win — public CORS proxy
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
    if (res.ok) {
      const json = await res.json();
      if (json.contents) {
        const articles = parseRSSXml(json.contents, feed);
        if (articles.length > 0) return articles;
      }
    }
  } catch {}

  // Strategy 3: rss2json.com — parses RSS for us
  try {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=10`;
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(6000) });
    if (res.ok) {
      const data = await res.json();
      if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        return data.items.map(item => ({
          title: item.title || '',
          link: item.link || '#',
          description: stripHtml(item.description || item.content || ''),
          date: item.pubDate ? new Date(item.pubDate) : new Date(),
          source: feed.source,
          category: feed.category,
          icon: feed.icon
        })).filter(a => a.title);
      }
    }
  } catch {}

  return [];
}

async function loadAllNews() {
  // Check localStorage cache (only exists if a previous fetch returned articles)
  try {
    const cached = localStorage.getItem(NEWS_CACHE_KEY);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < NEWS_CACHE_TTL && Array.isArray(data) && data.length > 0) {
        return data.map(a => ({ ...a, date: new Date(a.date) }));
      }
    }
  } catch {}

  // Fetch all feeds in parallel
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  const articles = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value);

  // Deduplicate by title, sort newest first
  const seen = new Set();
  const unique = articles
    .filter(a => {
      if (!a.title || seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    })
    .sort((a, b) => b.date - a.date);

  // Cache only when we actually got articles
  if (unique.length > 0) {
    try {
      localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({ data: unique, ts: Date.now() }));
    } catch {}
  }

  return unique;
}

// ────────────────────────────────────────────────────────────────
// Render — Editorial (nm- classes)
// ────────────────────────────────────────────────────────────────

function formatDate(date) {
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function getCategories(articles) {
  return [...new Set(articles.map(a => a.category))].sort();
}

/** Featured hero card (first article) */
function renderNmFeatured(article) {
  const desc = article.description
    ? `<p class="nm-featured__desc">${article.description}…</p>`
    : '';
  return `
    <div class="nm-featured" role="article">
      <div class="nm-featured__content">
        <div class="nm-featured__badge">★ Top-Beitrag</div>
        <div class="nm-featured__source">${article.icon}&nbsp;${article.source}&ensp;·&ensp;${article.category}</div>
        <h2 class="nm-featured__title">${article.title}</h2>
        ${desc}
        <div class="nm-featured__footer">
          <time class="nm-featured__date" datetime="${article.date.toISOString()}">${formatDate(article.date)}</time>
          <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="nm-featured__link">
            Artikel lesen
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
      <div class="nm-featured__deco" aria-hidden="true">01</div>
    </div>
  `;
}

/** Grid card (remaining articles) */
function renderNmCard(article, index) {
  const desc = article.description
    ? `<p class="nm-card__desc">${article.description}…</p>`
    : '';
  const delay = (index % 9) * 0.055;
  return `
    <article class="nm-card" data-category="${article.category}" style="animation-delay:${delay}s">
      <div class="nm-card__meta">
        <span class="nm-card__source">${article.icon}&nbsp;${article.source}</span>
        <span class="nm-card__category">${article.category}</span>
      </div>
      <h3 class="nm-card__title">${article.title}</h3>
      ${desc}
      <div class="nm-card__footer">
        <time class="nm-card__date" datetime="${article.date.toISOString()}">${formatDate(article.date)}</time>
        <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="nm-card__link">
          Lesen
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </article>
  `;
}

/** Tab button */
function renderNmTab(cat, label, active) {
  return `<button class="nm-tab${active === cat ? ' is-active' : ''}" data-cat="${cat}" role="tab" aria-selected="${active === cat}">${label}</button>`;
}

/** Loading skeleton */
function renderNmSkeleton(count = 6) {
  return Array.from({ length: count }, () => `
    <div class="nm-skeleton" aria-hidden="true">
      <div class="nm-skeleton__line nm-skeleton__line--short"></div>
      <div class="nm-skeleton__line nm-skeleton__line--title nm-skeleton__line--medium"></div>
      <div class="nm-skeleton__line nm-skeleton__line--medium"></div>
      <div class="nm-skeleton__line nm-skeleton__line--short"></div>
      <div class="nm-skeleton__footer">
        <div class="nm-skeleton__line" style="width:35%"></div>
      </div>
    </div>
  `).join('');
}

/** Featured skeleton */
function renderNmFeaturedSkeleton() {
  return `
    <div class="nm-skeleton__featured" aria-hidden="true">
      <div class="nm-skeleton__line nm-skeleton__line--short" style="width:100px;height:20px"></div>
      <div class="nm-skeleton__line" style="width:65%;height:14px;margin-top:1rem"></div>
      <div class="nm-skeleton__line nm-skeleton__line--title" style="width:85%"></div>
      <div class="nm-skeleton__line nm-skeleton__line--medium" style="height:11px"></div>
      <div class="nm-skeleton__line nm-skeleton__line--short" style="height:11px"></div>
    </div>
  `;
}

/** Empty state */
function renderNmEmpty() {
  return `
    <div class="nm-empty">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>Keine Artikel gefunden.</p>
    </div>
  `;
}

/** Error state — links to original sources as fallback */
function renderNmError() {
  return `
    <div class="nm-empty">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>Nachrichten konnten nicht geladen werden.</p>
      <div style="margin-top:1rem;display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;">
        <a href="https://www.bundesfinanzministerium.de/Web/DE/Presse/Pressemitteilungen/pressemitteilungen.html" target="_blank" rel="noopener" class="btn btn--secondary" style="font-size:.85rem">BMF Pressemitteilungen</a>
        <a href="https://www.haufe.de/steuern/steuer-aktuell/" target="_blank" rel="noopener" class="btn btn--secondary" style="font-size:.85rem">Haufe Steuer</a>
        <a href="https://www.bundesrat.de/DE/presse/pressemitteilungen/pressemitteilungen-node.html" target="_blank" rel="noopener" class="btn btn--secondary" style="font-size:.85rem">Bundesrat</a>
      </div>
      <button class="btn btn--primary" style="margin-top:1rem" onclick="initNews()">Erneut versuchen</button>
    </div>
  `;
}

// ────────────────────────────────────────────────────────────────
// State & Filter
// ────────────────────────────────────────────────────────────────

let allArticles = [];
let activeCategory = 'all';

function filterAndRender(category) {
  activeCategory = category;

  const featured  = document.getElementById('nm-featured');
  const grid      = document.getElementById('news-grid');
  const filters   = document.getElementById('news-filters');
  const countEl   = document.getElementById('news-count');
  const gridCount = document.getElementById('nm-grid-count');

  if (!grid) return;

  const filtered = category === 'all'
    ? allArticles
    : allArticles.filter(a => a.category === category);

  // Update tab active state
  if (filters) {
    filters.querySelectorAll('.nm-tab').forEach(btn => {
      const isActive = btn.dataset.cat === category;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });
  }

  // Update counts
  if (countEl) countEl.textContent = filtered.length;

  // Featured: first article
  if (featured) {
    featured.innerHTML = filtered.length > 0 ? renderNmFeatured(filtered[0]) : '';
  }

  // Grid: remaining articles
  const rest = filtered.slice(1);
  if (gridCount) {
    gridCount.textContent = rest.length > 0 ? `${rest.length} weitere` : '';
  }
  grid.innerHTML = rest.length > 0
    ? rest.map((a, i) => renderNmCard(a, i)).join('')
    : filtered.length === 0
      ? renderNmEmpty()
      : '';
}

// ────────────────────────────────────────────────────────────────
// Init
// ────────────────────────────────────────────────────────────────

async function initNews() {
  const featured  = document.getElementById('nm-featured');
  const grid      = document.getElementById('news-grid');
  const filters   = document.getElementById('news-filters');
  const timestamp = document.getElementById('news-timestamp');
  const countEl   = document.getElementById('news-count');

  if (!grid) return;

  // Show loading skeletons
  if (featured) featured.innerHTML = renderNmFeaturedSkeleton();
  grid.innerHTML = renderNmSkeleton(6);
  if (filters) filters.innerHTML = renderNmTab('all', 'Alle', 'all');

  try {
    allArticles = await loadAllNews();

    if (allArticles.length === 0) {
      if (featured) featured.innerHTML = '';
      grid.innerHTML = renderNmError();
      return;
    }

    const categories = getCategories(allArticles);

    // Render tab bar
    if (filters) {
      filters.innerHTML =
        renderNmTab('all', 'Alle', activeCategory) +
        categories.map(cat => renderNmTab(cat, cat, activeCategory)).join('');

      filters.addEventListener('click', e => {
        const btn = e.target.closest('.nm-tab');
        if (btn) filterAndRender(btn.dataset.cat);
      });
    }

    // Update timestamp
    if (timestamp) {
      timestamp.textContent = `Aktualisiert ${new Date().toLocaleTimeString('de-DE', {
        hour: '2-digit', minute: '2-digit'
      })} Uhr`;
    }

    if (countEl) countEl.textContent = allArticles.length;

    // Render content
    filterAndRender(activeCategory);

  } catch {
    if (featured) featured.innerHTML = '';
    grid.innerHTML = renderNmError();
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNews);
} else {
  initNews();
}
