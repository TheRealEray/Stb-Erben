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
        { title: 'Startseite', url: 'index.html', keywords: 'steuerberatung düren ibrahim erben wegzugssteuer ecommerce 2025 2026 steuerkanzlei' },
        { title: 'Leistungen', url: 'leistungen.html', keywords: 'steuerstrafrecht insolvenz wegzug ecommerce heilberufe immobilien nachfolge betreuung §370 §153' },
        { title: 'Steuerstraf- & Bußgeldverfahren', url: 'leistungen.html#steuerstrafrecht', keywords: 'steuerstrafrecht selbstanzeige verteidigung bußgeld ermittlung §370 §371 §378 abgabenordnung ao strafrecht' },
        { title: 'Wegzugssteuer & Internationales', url: 'leistungen.html#wegzug', keywords: 'wegzugssteuer ausland doppelbesteuerung international entstrickung §6 außensteuergesetz astg dba' },
        { title: 'E-Commerce & Online-Handel', url: 'leistungen.html#ecommerce', keywords: 'ecommerce amazon ebay shopify oss umsatzsteuer online handel §3a §22f §25e ustg vat' },
        { title: 'Heilberufe & MVZ', url: 'leistungen.html#heilberufe', keywords: 'arzt zahnarzt apotheke mvz praxis medizin §4 ustg steuerbefreiung heilbehandlung' },
        { title: 'Immobilien & Vermögen', url: 'leistungen.html#immobilien', keywords: 'immobilien vermögen grundstück haus wohnung immobiliensteuer §23 estg spekulationssteuer 10 jahre' },
        { title: 'Nachfolge & Umstrukturierung', url: 'leistungen.html#nachfolge', keywords: 'nachfolge umstrukturierung holding umwandlung unternehmensübertragung §13 §13a erbschaftsteuer schenkung' },
        { title: 'Laufende Betreuung', url: 'leistungen.html#betreuung', keywords: 'buchhaltung lohnbuchhaltung jahresabschluss steuererklärung betreuung datev §4 estg gewinnermittlung' },
        { title: 'Über uns', url: 'ueber-uns.html', keywords: 'kanzlei über uns philosophie standort düren weierstraße 43 52349' },
        { title: 'FAQ', url: 'faq.html', keywords: 'fragen antworten häufig faq hilfe steuerberater kosten ablauf erstgespräch' },
        { title: 'Wissen', url: 'wissen.html', keywords: 'wissen module außenprüfung steuerstrafrecht umwandlungssteuerrecht ratgeber leitfaden' },
        { title: 'Steuerliche Außenprüfung', url: 'wissen-aussenpruefung.html', keywords: 'außenprüfung betriebsprüfung finanzamt prüfung §193 §194 §201 ao prüfungsanordnung schlussbesprechung' },
        { title: 'Steuerstrafrecht', url: 'wissen-steuerstrafrecht.html', keywords: 'steuerstrafrecht verfahren selbstanzeige verteidigung §370 §371 §153 steuerhinterziehung strafbefreiende' },
        { title: 'Umwandlungssteuerrecht', url: 'wissen-umwandlungssteuerrecht.html', keywords: 'umwandlung verschmelzung spaltung formwechsel einbringung holding §20 §21 §24 umwandlungssteuergesetz umwstg' },
        { title: 'Tools & Steuerrechner', url: 'tools.html', keywords: 'tools rechner einkommensteuer brutto netto elterngeld steuerrechner 2025 minijob 556 grundfreibetrag 12096 pflegegeld kindergeld 250' },
        { title: 'Honorar & Kosten', url: 'honorar.html', keywords: 'honorar preise kosten vergütung gebühren pauschale stundensatz steuerberatervergütungsverordnung stbvv rvo §13' },
        { title: 'Karriere', url: 'karriere.html', keywords: 'karriere jobs stellenangebote arbeiten team mitarbeiter steuerberater steuerfachangestellter ausbildung' },
        { title: 'Kontakt', url: 'kontakt.html', keywords: 'kontakt telefon email adresse düren weierstraße 43 52349 02421 99 848 10 info@stberben.com' },
        { title: 'News & Steuernachrichten', url: 'news.html', keywords: 'news nachrichten steuern aktuell bmf bundesfinanzministerium haufe 2025 2026 gesetz änderung' }
    ];

    const queryLower = query.toLowerCase().replace(/^§\s*/, '§');
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
