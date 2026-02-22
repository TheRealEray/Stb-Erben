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

    const contentArea = document.querySelector('.toc-content-area') || document.querySelector('main') || document.querySelector('.section');
    if (!contentArea) return;

    // Find all headings (h2 and h3)
    const headings = contentArea.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    // Generate TOC
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
            heading.id = `section-${index}`;
        }

        const li = document.createElement('li');
        li.className = `toc-item toc-item--${heading.tagName.toLowerCase()}`;

        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = 'toc-link';

        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Update active state
            document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');
        });

        li.appendChild(link);
        tocList.appendChild(li);
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

    // Toggle TOC - close button inside TOC
    const tocToggle = document.querySelector('.toc-toggle');
    if (tocToggle) {
        tocToggle.addEventListener('click', () => {
            tocContainer.classList.remove('is-open');
        });
    }

    // Toggle TOC - open button (bottom right)
    const tocToggleBtn = document.querySelector('.toc-toggle-btn');
    if (tocToggleBtn) {
        tocToggleBtn.addEventListener('click', () => {
            tocContainer.classList.add('is-open');
        });
    }
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
// SEARCH FUNCTIONALITY
// ============================================================================
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchModal = document.querySelector('.search-modal');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    const searchClose = document.querySelector('.search-close');

    if (!searchToggle || !searchModal) return;

    // Open search modal
    searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        searchModal.classList.add('is-open');
        searchInput.focus();
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

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        searchTimeout = setTimeout(() => {
            performSearch(query, searchResults);
        }, 300);
    });
}

function performSearch(query, resultsContainer) {
    // Simple client-side search through page content
    const searchablePages = [
        { title: 'Startseite', url: 'index.html', keywords: 'steuerberatung düren ibrahim erben wegzugssteuer ecommerce' },
        { title: 'Leistungen', url: 'leistungen.html', keywords: 'steuerstrafrecht insolvenz wegzug ecommerce heilberufe immobilien nachfolge betreuung' },
        { title: 'Steuerstraf- & Bußgeldverfahren', url: 'leistungen.html#steuerstrafrecht', keywords: 'steuerstrafrecht selbstanzeige verteidigung bußgeld ermittlung' },
        { title: 'Wegzugssteuer & Internationales', url: 'leistungen.html#wegzug', keywords: 'wegzugssteuer ausland doppelbesteuerung international entstrickung' },
        { title: 'E-Commerce & Online-Handel', url: 'leistungen.html#ecommerce', keywords: 'ecommerce amazon ebay shopify oss umsatzsteuer online handel' },
        { title: 'Heilberufe & MVZ', url: 'leistungen.html#heilberufe', keywords: 'arzt zahnarzt apotheke mvz praxis medizin' },
        { title: 'Immobilien & Vermögen', url: 'leistungen.html#immobilien', keywords: 'immobilien vermögen grundstück haus wohnung immobiliensteuer' },
        { title: 'Nachfolge & Umstrukturierung', url: 'leistungen.html#nachfolge', keywords: 'nachfolge umstrukturierung holding umwandlung unternehmensübertragung' },
        { title: 'Laufende Betreuung', url: 'leistungen.html#betreuung', keywords: 'buchhaltung lohnbuchhaltung jahresabschluss steuererklärung betreuung' },
        { title: 'Über uns', url: 'ueber-uns.html', keywords: 'team kanzlei über uns philosophie standort düren' },
        { title: 'FAQ', url: 'faq.html', keywords: 'fragen antworten häufig faq hilfe' },
        { title: 'Wissen', url: 'wissen.html', keywords: 'wissen module außenprüfung steuerstrafrecht umwandlungssteuerrecht' },
        { title: 'Steuerliche Außenprüfung', url: 'wissen-aussenpruefung.html', keywords: 'außenprüfung betriebsprüfung finanzamt prüfung' },
        { title: 'Steuerstrafrecht', url: 'wissen-steuerstrafrecht.html', keywords: 'steuerstrafrecht verfahren selbstanzeige verteidigung' },
        { title: 'Umwandlungssteuerrecht', url: 'wissen-umwandlungssteuerrecht.html', keywords: 'umwandlung verschmelzung spaltung formwechsel einbringung holding' },
        { title: 'Tools', url: 'tools.html', keywords: 'tools rechner einkommensteuer brutto netto elterngeld steuerrechner' },
        { title: 'Honorar', url: 'honorar.html', keywords: 'honorar preise kosten vergütung gebühren pauschale stundensatz' },
        { title: 'Karriere', url: 'karriere.html', keywords: 'karriere jobs stellenangebote arbeiten team mitarbeiter' },
        { title: 'Kontakt', url: 'kontakt.html', keywords: 'kontakt telefon email adresse düren weierstraße' }
    ];

    const queryLower = query.toLowerCase();
    const results = searchablePages.filter(page => {
        const titleMatch = page.title.toLowerCase().includes(queryLower);
        const keywordsMatch = page.keywords.toLowerCase().includes(queryLower);
        return titleMatch || keywordsMatch;
    });

    if (results.length === 0) {
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

    const resultsHTML = results.map(result => `
        <a href="${result.url}" class="search-result-item">
            <div class="search-result-title">${highlightQuery(result.title, query)}</div>
        </a>
    `).join('');

    resultsContainer.innerHTML = `
        <div class="search-results-header">
            <strong>${results.length}</strong> Ergebnis${results.length !== 1 ? 'se' : ''} für "<strong>${escapeHtml(query)}</strong>"
        </div>
        ${resultsHTML}
    `;
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
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    initBackButton();
    initScrollToTop();
    initTableOfContents();
    initTOCToggle();
    initSearch();
});
