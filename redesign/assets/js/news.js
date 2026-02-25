/**
 * news.js — Steuer-Aktuell News Feed
 * Fetches live RSS feeds from official German tax news sources
 * and renders them as a filterable editorial article layout.
 *
 * Sources: BMF, Haufe Steuern, BRAK, Bundesrat
 * Proxy: rss2json.com (free, no key needed for public feeds)
 * Cache: sessionStorage (1h TTL)
 */

const NEWS_CACHE_KEY = 'news_cache';
const NEWS_CACHE_TTL = 60 * 60 * 1000; // 1 Stunde

const RSS2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

const FEEDS = [
  {
    url: 'https://www.bundesfinanzministerium.de/RSS/Pressemitteilungen.rss',
    source: 'Bundesfinanzministerium',
    category: 'Steuerpolitik',
    icon: '🏛️'
  },
  {
    url: 'https://www.haufe.de/rss/steuer-aktuell.xml',
    source: 'Haufe Steuer',
    category: 'Steuerrecht',
    icon: '⚖️'
  },
  {
    url: 'https://www.bundesrat.de/SharedDocs/rss/DE/news-top.html',
    source: 'Bundesrat',
    category: 'Gesetzgebung',
    icon: '📜'
  },
  {
    url: 'https://www.nwb.de/service/rss/steuern-rss.xml',
    source: 'NWB',
    category: 'Steuerrecht',
    icon: '📰'
  }
];

// ────────────────────────────────────────────────────────────────
// Fetch & Cache
// ────────────────────────────────────────────────────────────────

async function fetchFeed(feed) {
  const apiUrl = `${RSS2JSON}${encodeURIComponent(feed.url)}&count=10`;
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== 'ok' || !Array.isArray(data.items)) return [];

    return data.items.map(item => ({
      title: item.title || '',
      link: item.link || '#',
      description: stripHtml(item.description || item.content || ''),
      date: item.pubDate ? new Date(item.pubDate) : new Date(),
      source: feed.source,
      category: feed.category,
      icon: feed.icon
    }));
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

async function loadAllNews() {
  // Check cache
  try {
    const cached = sessionStorage.getItem(NEWS_CACHE_KEY);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < NEWS_CACHE_TTL) {
        return data.map(a => ({ ...a, date: new Date(a.date) }));
      }
    }
  } catch {}

  // Fetch all feeds in parallel
  const results = await Promise.allSettled(FEEDS.map(fetchFeed));
  const articles = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value);

  // Sort newest first, deduplicate by title
  const seen = new Set();
  const unique = articles
    .filter(a => {
      if (seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    })
    .sort((a, b) => b.date - a.date);

  // Cache
  try {
    sessionStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({ data: unique, ts: Date.now() }));
  } catch {}

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

/** Error state */
function renderNmError() {
  return `
    <div class="nm-empty">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>Nachrichten konnten nicht geladen werden. Bitte Seite neu laden.</p>
      <button class="btn btn--secondary" onclick="initNews()">Erneut versuchen</button>
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
      grid.innerHTML = renderNmEmpty();
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
