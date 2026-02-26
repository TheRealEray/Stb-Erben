/**
 * Navigation Helpers
 * - Back button
 * - Scroll to top button
 * - Table of Contents (TOC) for long pages
 * - Search functionality
 */

// ============================================================================
// BACK BUTTON
// ============================================================================
function initBackButton() {
    const backBtn = document.querySelector('.back-button');
    if (!backBtn) return;

    backBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Check if there's history to go back to
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback to homepage
            window.location.href = 'index.html';
        }
    });
}

// ============================================================================
// SCROLL TO TOP BUTTON
// ============================================================================
function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('is-visible');
        } else {
            scrollBtn.classList.remove('is-visible');
        }
    });

    // Smooth scroll to top
    scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================================================
// TABLE OF CONTENTS (TOC)
// ============================================================================
function initTableOfContents() {
    const tocContainer = document.querySelector('.toc-sidebar');
    if (!tocContainer) return;

    // Find all content sections with IDs (actual content, not navigation)
    const contentSections = document.querySelectorAll('section[id]');

    // If no sections with IDs, fall back to old behavior
    if (contentSections.length === 0) {
        const contentArea = document.querySelector('.toc-content-area') || document.querySelector('main') || document.querySelector('.section');
        if (!contentArea) return;
        var allHeadings = contentArea.querySelectorAll('h2, h3');
    } else {
        // Find all h2 and h3 headings within content sections only
        var allHeadings = [];
        contentSections.forEach(section => {
            const sectionHeadings = section.querySelectorAll('h2, h3');
            sectionHeadings.forEach(h => allHeadings.push(h));
        });
    }

    // Filter out headings in cards/navigation
    const headings = Array.from(allHeadings).filter(heading => {
        return !heading.closest('.card') && !heading.closest('.grid--3');
    });

    if (headings.length === 0) return;

    // Generate hierarchical TOC (h2 with h3 dropdowns)
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    let currentH2Item = null;
    let currentH3List = null;

    headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
            const parentSection = heading.closest('section[id]');
            if (parentSection && parentSection.id) {
                heading.id = parentSection.id;
            } else {
                heading.id = `section-${index}`;
            }
        }

        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = 'toc-link';

        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Calculate position with header offset
            const headerOffset = 150;
            const elementPosition = heading.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update active state
            document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');

            // Close TOC on mobile after clicking
            const tocContainer = document.querySelector('.toc-sidebar');
            if (tocContainer && window.innerWidth < 768) {
                tocContainer.classList.remove('is-open');
            }
        });

        if (heading.tagName === 'H2') {
            // Create new h2 item
            const li = document.createElement('li');
            li.className = 'toc-item toc-item--h2';
            li.appendChild(link);

            // Create dropdown container for h3 items
            currentH3List = document.createElement('ul');
            currentH3List.className = 'toc-dropdown';
            li.appendChild(currentH3List);

            tocList.appendChild(li);
            currentH2Item = li;
        } else if (heading.tagName === 'H3' && currentH3List) {
            // Add h3 to current h2's dropdown
            const li = document.createElement('li');
            li.className = 'toc-item toc-item--h3';
            li.appendChild(link);
            currentH3List.appendChild(li);
        }
    });

    const tocInner = tocContainer.querySelector('.toc-inner');
    if (tocInner) {
        tocInner.appendChild(tocList);
    }

    // Highlight current section on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveSection(headings);
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================================================================
// TOC TOGGLE BUTTONS
// ============================================================================
function initTOCToggle() {
    const tocContainer = document.querySelector('.toc-sidebar');
    if (!tocContainer) return;

    const tocToggleBtn = document.querySelector('.toc-toggle-btn');

    function syncTocState() {
        const isOpen = tocContainer.classList.contains('is-open');
        if (tocToggleBtn) tocToggleBtn.classList.toggle('is-active', isOpen);
    }

    // Toggle TOC - close button inside TOC (X button)
    const tocToggle = document.querySelector('.toc-toggle');
    if (tocToggle) {
        tocToggle.addEventListener('click', () => {
            tocContainer.classList.remove('is-open');
            syncTocState();
        });
    }

    // Toggle TOC - open/close button (bottom right)
    if (tocToggleBtn) {
        tocToggleBtn.addEventListener('click', () => {
            tocContainer.classList.toggle('is-open');
            syncTocState();
        });
    }

    // Close TOC when clicking outside
    document.addEventListener('click', (e) => {
        if (tocContainer.classList.contains('is-open') &&
            !tocContainer.contains(e.target) &&
            !tocToggleBtn?.contains(e.target)) {
            tocContainer.classList.remove('is-open');
            syncTocState();
        }
    });
}

function updateActiveSection(headings) {
    const scrollPos = window.pageYOffset + 100;

    headings.forEach((heading) => {
        const section = heading;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.toc-link').forEach(link => {
                link.classList.remove('is-active');
            });
            const activeLink = document.querySelector(`.toc-link[href="#${heading.id}"]`);
            if (activeLink) {
                activeLink.classList.add('is-active');
            }
        }
    });
}

// ============================================================================
// SEARCH FUNCTIONALITY — Full-text search with scroll-to + highlight
// ============================================================================

// Search index: built lazily on first search, then cached
let _searchIndex = null;
let _searchIndexLoading = false;

// All pages to index
const SEARCH_PAGES = [
    { url: 'index.html', title: 'Startseite' },
    { url: 'leistungen.html', title: 'Leistungen' },
    { url: 'leistungen-steuerstrafrecht.html', title: 'Steuerstraf- & Bußgeldverfahren' },
    { url: 'leistungen-insolvenz.html', title: 'Insolvenz & Sanierung' },
    { url: 'leistungen-wegzug.html', title: 'Wegzugssteuer & Internationales' },
    { url: 'leistungen-ecommerce.html', title: 'E-Commerce & Online-Handel' },
    { url: 'leistungen-heilberufe.html', title: 'Heilberufe & MVZ' },
    { url: 'leistungen-immobilien.html', title: 'Immobilien & Vermögen' },
    { url: 'leistungen-nachfolge.html', title: 'Nachfolge & Umstrukturierung' },
    { url: 'leistungen-betreuung.html', title: 'Laufende Betreuung' },
    { url: 'ueber-uns.html', title: 'Über uns' },
    { url: 'faq.html', title: 'FAQ' },
    { url: 'wissen.html', title: 'Wissen' },
    { url: 'wissen-aussenpruefung.html', title: 'Steuerliche Außenprüfung' },
    { url: 'wissen-steuerstrafrecht.html', title: 'Steuerstrafrecht' },
    { url: 'wissen-umwandlungssteuerrecht.html', title: 'Umwandlungssteuerrecht' },
    { url: 'tools.html', title: 'Tools & Steuerrechner' },
    { url: 'honorar.html', title: 'Honorar & Kosten' },
    { url: 'karriere.html', title: 'Karriere' },
    { url: 'news.html', title: 'News & Steuernachrichten' },
    { url: 'kontakt.html', title: 'Kontakt' },
    { url: 'impressum.html', title: 'Impressum' },
    { url: 'datenschutz.html', title: 'Datenschutz' }
];

/**
 * Build the search index by fetching all pages and extracting text sections.
 * Each entry: { url, title, sections: [{ heading, text }] }
 */
async function buildSearchIndex() {
    if (_searchIndex) return _searchIndex;
    if (_searchIndexLoading) {
        // Wait for current build to finish
        while (_searchIndexLoading) await new Promise(r => setTimeout(r, 50));
        return _searchIndex;
    }
    _searchIndexLoading = true;

    const index = [];
    const basePath = window.location.pathname.replace(/[^/]*$/, '');

    const fetches = SEARCH_PAGES.map(async (page) => {
        try {
            const resp = await fetch(basePath + page.url);
            if (!resp.ok) return null;
            const html = await resp.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Remove script, style, nav, header, footer to get only content
            doc.querySelectorAll('script, style, nav, header, footer, .breadcrumbs, .cookie-banner, .search-modal').forEach(el => el.remove());

            const main = doc.querySelector('main') || doc.querySelector('.section') || doc.body;
            if (!main) return null;

            // Extract sections: split by headings
            const sections = [];
            const headings = main.querySelectorAll('h1, h2, h3, h4');

            if (headings.length === 0) {
                // No headings: use whole page as one section
                const text = (main.textContent || '').replace(/\s+/g, ' ').trim();
                if (text.length > 10) {
                    sections.push({ heading: page.title, text: text });
                }
            } else {
                headings.forEach((h) => {
                    const headingText = h.textContent.trim();
                    // Collect text after this heading until the next heading
                    let textParts = [];
                    let sibling = h.nextElementSibling;
                    while (sibling && !sibling.matches('h1, h2, h3, h4')) {
                        const t = (sibling.textContent || '').replace(/\s+/g, ' ').trim();
                        if (t) textParts.push(t);
                        sibling = sibling.nextElementSibling;
                    }
                    // Also check parent for content (e.g. heading is inside a div)
                    if (textParts.length === 0) {
                        const parent = h.closest('section, .section, .card, .faq__item, article, div');
                        if (parent) {
                            const t = (parent.textContent || '').replace(/\s+/g, ' ').trim();
                            if (t.length > headingText.length + 5) textParts.push(t);
                        }
                    }
                    const sectionText = textParts.join(' ');
                    if (sectionText.length > 5 || headingText.length > 3) {
                        sections.push({ heading: headingText, text: headingText + ' ' + sectionText });
                    }
                });
            }

            if (sections.length > 0) {
                index.push({ url: page.url, title: page.title, sections: sections });
            }
        } catch (e) {
            // Skip failed pages silently
        }
        return null;
    });

    await Promise.all(fetches);
    _searchIndex = index;
    _searchIndexLoading = false;
    return index;
}

function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchModal = document.querySelector('.search-modal');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const searchClose = document.querySelector('.search-close');

    if (!searchToggle || !searchModal) return;

    // Start pre-loading the index when user hovers over search icon
    searchToggle.addEventListener('mouseenter', () => { buildSearchIndex(); }, { once: true });

    // Open search modal
    searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        searchModal.classList.add('is-open');
        searchInput.focus();
        buildSearchIndex(); // ensure index is loading
    });

    // Close search modal
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchModal.classList.remove('is-open');
            searchInput.value = '';
            searchResults.innerHTML = '';
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('is-open')) {
            searchModal.classList.remove('is-open');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    // Close on overlay click
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('is-open');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    // Search functionality
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        const minLength = /^\d/.test(query) ? 1 : 2;
        if (query.length < minLength) {
            searchResults.innerHTML = '';
            return;
        }

        searchTimeout = setTimeout(async () => {
            await performSearch(query, searchResults);
        }, 300);
    });
}

async function performSearch(query, resultsContainer) {
    const index = await buildSearchIndex();
    if (!index) {
        resultsContainer.innerHTML = '<div class="search-no-results"><p>Suchindex wird geladen...</p></div>';
        return;
    }

    const queryLower = query.toLowerCase().replace(/^§\s*/, '§');
    const paragraphQuery = /^\d/.test(queryLower) ? '§' + queryLower : null;

    const results = [];

    for (const page of index) {
        // Search through all sections of this page
        for (const section of page.sections) {
            const textLower = section.text.toLowerCase();
            const headingLower = section.heading.toLowerCase();

            const match = textLower.includes(queryLower) ||
                          headingLower.includes(queryLower) ||
                          (paragraphQuery && (textLower.includes(paragraphQuery) || headingLower.includes(paragraphQuery)));

            if (match) {
                // Extract context snippet around the match
                const snippet = extractSnippet(section.text, queryLower, paragraphQuery);
                results.push({
                    pageTitle: page.title,
                    sectionHeading: section.heading,
                    url: page.url,
                    snippet: snippet
                });
            }
        }
    }

    // Deduplicate by URL (keep best match per page, max 2 per page)
    const byPage = {};
    for (const r of results) {
        if (!byPage[r.url]) byPage[r.url] = [];
        if (byPage[r.url].length < 2) byPage[r.url].push(r);
    }
    const dedupedResults = Object.values(byPage).flat().slice(0, 12);

    if (dedupedResults.length === 0) {
        resultsContainer.innerHTML = `
            <div class="search-no-results">
                <p>Keine Ergebnisse für "<strong>${escapeHtml(query)}</strong>" gefunden.</p>
                <p style="font-size: 0.875rem; color: var(--color-text-light); margin-top: 0.5rem;">
                    Versuchen Sie es mit anderen Suchbegriffen oder <a href="kontakt.html">kontaktieren Sie uns</a> direkt.
                </p>
            </div>
        `;
        return;
    }

    const resultsHTML = dedupedResults.map(result => {
        const highlightUrl = result.url + (result.url.includes('?') ? '&' : '?') + 'highlight=' + encodeURIComponent(query);
        return `
        <a href="${highlightUrl}" class="search-result-item">
            <div class="search-result-title">${highlightQuery(result.pageTitle, query)}</div>
            <div class="search-result-section">${highlightQuery(result.sectionHeading, query)}</div>
            <div class="search-result-snippet">${highlightQuery(result.snippet, query)}</div>
        </a>`;
    }).join('');

    resultsContainer.innerHTML = `
        <div class="search-results-header">
            <strong>${dedupedResults.length}</strong> Ergebnis${dedupedResults.length !== 1 ? 'se' : ''} für "<strong>${escapeHtml(query)}</strong>"
        </div>
        ${resultsHTML}
    `;
}

/**
 * Extract a context snippet (~120 chars) around the first match.
 */
function extractSnippet(text, queryLower, paragraphQuery) {
    const textLower = text.toLowerCase();
    let idx = textLower.indexOf(queryLower);
    if (idx === -1 && paragraphQuery) idx = textLower.indexOf(paragraphQuery);
    if (idx === -1) idx = 0;

    const snippetRadius = 60;
    let start = Math.max(0, idx - snippetRadius);
    let end = Math.min(text.length, idx + queryLower.length + snippetRadius);

    // Snap to word boundaries
    if (start > 0) {
        const ws = text.indexOf(' ', start);
        if (ws !== -1 && ws < idx) start = ws + 1;
    }
    if (end < text.length) {
        const ws = text.lastIndexOf(' ', end);
        if (ws > idx) end = ws;
    }

    let snippet = text.slice(start, end).trim();
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    return snippet;
}

/**
 * On page load: check for ?highlight= parameter and highlight the matching text.
 */
function initSearchHighlight() {
    const params = new URLSearchParams(window.location.search);
    const highlightTerm = params.get('highlight');
    if (!highlightTerm || highlightTerm.length < 1) return;

    // Wait for page to fully render
    requestAnimationFrame(() => {
        setTimeout(() => {
            highlightAndScrollTo(highlightTerm);
        }, 300);
    });
}

/**
 * Find the search term in the page text, wrap it in a <mark>, scroll to it, animate.
 */
function highlightAndScrollTo(term) {
    const main = document.querySelector('main') || document.querySelector('.section') || document.body;
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, null);

    const termLower = term.toLowerCase();
    let firstMark = null;

    // Collect all text nodes that contain the term
    const matches = [];
    while (walker.nextNode()) {
        const node = walker.currentNode;
        const text = node.textContent;
        if (text.toLowerCase().includes(termLower)) {
            matches.push(node);
        }
    }

    // Highlight up to 5 matches
    const maxHighlights = 5;
    let count = 0;

    for (const node of matches) {
        if (count >= maxHighlights) break;

        const text = node.textContent;
        const idx = text.toLowerCase().indexOf(termLower);
        if (idx === -1) continue;

        // Skip if inside a script, style, or already highlighted
        const parent = node.parentElement;
        if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.classList.contains('search-highlight')) continue;

        // Split the text node and wrap the match
        const before = text.slice(0, idx);
        const match = text.slice(idx, idx + term.length);
        const after = text.slice(idx + term.length);

        const mark = document.createElement('mark');
        mark.className = 'search-highlight';
        mark.textContent = match;

        const frag = document.createDocumentFragment();
        if (before) frag.appendChild(document.createTextNode(before));
        frag.appendChild(mark);
        if (after) frag.appendChild(document.createTextNode(after));

        parent.replaceChild(frag, node);

        if (!firstMark) firstMark = mark;
        count++;
    }

    // Scroll to the first match
    if (firstMark) {
        const headerOffset = 100;
        const elementPosition = firstMark.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

        // Remove highlights after 4 seconds with fade-out
        setTimeout(() => {
            document.querySelectorAll('.search-highlight').forEach(mark => {
                mark.classList.add('search-highlight--fade');
                setTimeout(() => {
                    const text = mark.textContent;
                    mark.replaceWith(document.createTextNode(text));
                }, 600);
            });

            // Clean up URL parameter
            const url = new URL(window.location);
            url.searchParams.delete('highlight');
            window.history.replaceState({}, '', url);
        }, 4000);
    }
}

function highlightQuery(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================================================
// SOCIAL SPEED DIAL
// ============================================================================
function initSocialDial() {
    const dial = document.querySelector('.social-dial');
    const trigger = dial && dial.querySelector('.social-dial__trigger');
    if (!dial || !trigger) return;

    let isOpen = false;
    let closeTimeout;

    function open() {
        clearTimeout(closeTimeout);
        isOpen = true;
        dial.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
    }

    function close() {
        isOpen = false;
        dial.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
    }

    // Click to toggle (works on touch devices)
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        isOpen ? close() : open();
    });

    // Desktop hover with delay to allow moving to items
    dial.addEventListener('mouseenter', open);
    dial.addEventListener('mouseleave', function () {
        closeTimeout = setTimeout(close, 400);
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
        if (isOpen && !dial.contains(e.target)) close();
    });
}

// ============================================================================
function initNavBodyClass() {
    // Adds/removes body.nav-is-open so CSS can hide fixed elements (speed dial, scroll-to-top)
    // when the mobile/tablet nav is open. Works alongside the inline nav toggle script.
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    if (!navToggle || !navList) return;

    navToggle.addEventListener('click', function () {
        // Run after the inline handler so is-open is already toggled
        setTimeout(function () {
            document.body.classList.toggle('nav-is-open', navList.classList.contains('is-open'));
        }, 0);
    });
}

// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    initBackButton();
    initScrollToTop();
    initTableOfContents();
    initTOCToggle();
    initSearch();
    initSearchHighlight();
    initSocialDial();
    initNavBodyClass();
});
// nav-fix-1772025098
