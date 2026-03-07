/**
 * Internationalization (i18n) System
 * Loads translations from JSON files and replaces content dynamically
 */

class I18n {
  constructor() {
    // Initialize properties FIRST
    this.translations = {};
    this.fallbackLang = 'de';
    this.supportedLanguages = ['de', 'tr', 'en'];

    // THEN detect language (needs supportedLanguages to be defined)
    this.currentLang = this.detectLanguage();
  }

  /**
   * Detect language from URL parameter, localStorage, or browser
   */
  detectLanguage() {
    // 1. Check URL parameter (?lang=tr)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && this.supportedLanguages.includes(urlLang)) {
      // Sync localStorage with URL
      localStorage.setItem('preferred-language', urlLang);
      return urlLang;
    }

    // 2. Check localStorage
    const storedLang = localStorage.getItem('preferred-language');
    if (storedLang && this.supportedLanguages.includes(storedLang)) {
      return storedLang;
    }

    // 3. Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (this.supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    // 4. Default to German
    return this.fallbackLang;
  }

  /**
   * Load translation file for specified language
   */
  async loadTranslations(lang) {
    try {
      const path = `assets/translations/${lang}.json`;

      // Add cache busting and no-cache headers to prevent browser caching
      const response = await fetch(path, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.translations = await response.json();
      return true;
    } catch (error) {
      console.error(`[i18n] Error loading translations for ${lang}:`, error);

      // Try fallback language if not already trying it
      if (lang !== this.fallbackLang) {
        return this.loadTranslations(this.fallbackLang);
      }
      return false;
    }
  }

  /**
   * Get translated text by key (supports nested keys with dot notation)
   */
  t(key) {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return value;
  }

  /**
   * Apply translations to all elements with data-i18n attribute
   */
  applyTranslations() {
    // Update page title
    const titleElement = document.querySelector('title[data-i18n]');
    if (titleElement) {
      const key = titleElement.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation && translation !== key) {
        document.title = translation;
      }
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"][data-i18n-content]');
    if (metaDesc) {
      const key = metaDesc.getAttribute('data-i18n-content');
      const translation = this.t(key);
      if (translation && translation !== key) {
        metaDesc.setAttribute('content', translation);
      }
    }

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation && translation !== key) {
        element.textContent = translation;
      }
    });

    // HTML content (for elements that need HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const translation = this.t(key);
      if (translation && translation !== key) {
        element.innerHTML = translation;
      }
    });

    // Attributes (placeholder, alt, title, aria-label)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation && translation !== key) {
        element.placeholder = translation;
      }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
      const key = element.getAttribute('data-i18n-alt');
      const translation = this.t(key);
      if (translation && translation !== key) {
        element.alt = translation;
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      const translation = this.t(key);
      if (translation && translation !== key) {
        element.title = translation;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria');
      const translation = this.t(key);
      if (translation && translation !== key) {
        element.setAttribute('aria-label', translation);
      }
    });
  }

  /**
   * Update all navigation links to include current language
   */
  updateNavigationLinks() {
    // Update all internal navigation links (but not language switcher links)
    document.querySelectorAll('a[href]:not(.lang-switcher__option)').forEach(link => {
      const href = link.getAttribute('href');

      // Skip external links, anchors, and special links
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
        return;
      }

      // Add or update lang parameter
      try {
        const url = new URL(href, window.location.href);

        // Only update if it's a relative link to the same site
        if (url.origin === window.location.origin) {
          // Remove existing lang parameter first
          url.searchParams.delete('lang');

          // Add lang parameter only if not German (default)
          if (this.currentLang !== 'de') {
            url.searchParams.set('lang', this.currentLang);
          }

          link.setAttribute('href', url.pathname + url.search + url.hash);
        }
      } catch (e) {
        // If URL parsing fails, it might be a relative link
        if (href.includes('.html')) {
          // Remove existing lang parameter if any
          let newHref = href.replace(/[?&]lang=(de|tr|en)/g, '');
          // Clean up leftover ? or &
          newHref = newHref.replace(/\?&/g, '?').replace(/\?$/g, '');

          // Add new lang parameter only if not German
          if (this.currentLang !== 'de') {
            const separator = newHref.includes('?') ? '&' : '?';
            newHref += separator + 'lang=' + this.currentLang;
          }

          link.setAttribute('href', newHref);
        }
      }
    });
  }

  /**
   * Update language switcher UI
   */
  updateLanguageSwitcher() {
    const langFlags = {
      'de': '\u{1F1E9}\u{1F1EA}',
      'tr': '\u{1F1F9}\u{1F1F7}',
      'en': '\u{1F1EC}\u{1F1E7}'
    };

    const langNames = {
      'de': 'DE',
      'tr': 'TR',
      'en': 'EN'
    };

    // Update button
    const langButton = document.querySelector('.lang-switcher__button .lang-flag');
    const langCode = document.querySelector('.lang-switcher__button span:not(.lang-flag)');

    if (langButton) {
      langButton.textContent = langFlags[this.currentLang];
    }
    if (langCode) {
      langCode.textContent = langNames[this.currentLang];
    }

    // Update active state in dropdown
    document.querySelectorAll('.lang-switcher__option').forEach(option => {
      option.classList.remove('lang-switcher__option--active');
      const href = option.getAttribute('href');
      // Extract language from href (e.g., "?lang=de" -> "de")
      const match = href && href.match(/lang=(\w+)/);
      const optionLang = match ? match[1] : null;

      // Set active if languages match
      if (optionLang === this.currentLang) {
        option.classList.add('lang-switcher__option--active');
      }
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', this.currentLang);

    // Update all navigation links to include current language
    this.updateNavigationLinks();
  }

  /**
   * Change language
   */
  async changeLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.error(`[i18n] Language ${lang} is not supported`);
      return false;
    }

    this.currentLang = lang;
    localStorage.setItem('preferred-language', lang);

    // Update URL without reload
    const url = new URL(window.location);
    if (lang === 'de') {
      // Remove lang parameter for German (default)
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    window.history.pushState({}, '', url);

    // Load and apply translations
    await this.loadTranslations(lang);
    this.applyTranslations();
    this.updateLanguageSwitcher();

    return true;
  }

  /**
   * Initialize i18n system
   */
  async init() {
    // Load translations for current language
    const loaded = await this.loadTranslations(this.currentLang);
    if (!loaded) {
      console.error('[i18n] Failed to load translations');
      return;
    }

    // Apply translations to page
    this.applyTranslations();

    // Update language switcher
    this.updateLanguageSwitcher();

    // Set up language switcher click handlers
    const options = document.querySelectorAll('.lang-switcher__option');

    options.forEach((option) => {
      option.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const href = option.getAttribute('href');
        const match = href.match(/lang=(\w+)/);
        if (match) {
          const newLang = match[1];
          await this.changeLanguage(newLang);

          // Close dropdown
          const dropdown = document.getElementById('lang-dropdown');
          if (dropdown) {
            dropdown.classList.remove('is-open');
          }
        }
      });
    });
  }
}

// Initialize i18n when DOM is ready
let i18n;
document.addEventListener('DOMContentLoaded', async () => {
  try {
    i18n = new I18n();
    await i18n.init();
    // Make i18n globally available
    window.i18n = i18n;
  } catch (error) {
    console.error('[i18n] Fatal error during initialization:', error);
  }
});
