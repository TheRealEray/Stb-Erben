/**
 * Features Module
 * Handles initialization of all new UX enhancement features
 * Part of Batch 1-6 implementation plan
 */

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Batch 1: Core UX Enhancements
  initProgressBar();
  initReadingTime();
  initStickyCTA();
  initPrintButton();

  // Footer Features
  initDarkModeToggle();
  initNewsletterForm();

  // Batch 2: Navigation & Accessibility
  initReadingMode();
  initLazyLoading();
});

/**
 * Feature 1: Progress Bar
 * Shows reading progress for long articles
 */
function initProgressBar() {
  const progressBar = document.querySelector('.progress-bar__fill');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
  });
}

/**
 * Feature 3: Reading Time Indicator
 * Calculates and displays estimated reading time
 */
function initReadingTime() {
  const readingTimeElement = document.querySelector('.reading-time__minutes');
  if (!readingTimeElement) return;

  // Find main content area
  const contentArea = document.querySelector('article') ||
                      document.querySelector('main') ||
                      document.querySelector('.section');

  if (!contentArea) return;

  // Calculate reading time (average 200 words per minute in German)
  const text = contentArea.textContent || '';
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  readingTimeElement.textContent = readingTime;
}

/**
 * Feature 4: Sticky Contact CTA
 * Always-visible call to action button
 * (No JS needed - pure CSS, but function here for consistency)
 */
function initStickyCTA() {
  const stickyCTA = document.querySelector('.sticky-cta');
  if (!stickyCTA) return;

  // Optional: Hide CTA when footer is visible to avoid overlap
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stickyCTA.style.opacity = '0';
        stickyCTA.style.pointerEvents = 'none';
      } else {
        stickyCTA.style.opacity = '1';
        stickyCTA.style.pointerEvents = 'auto';
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(footer);
}

/**
 * Feature 5: Print Button
 * Enhanced print functionality
 * (Click handler is inline in HTML, but we can add enhancements here)
 */
function initPrintButton() {
  const printButtons = document.querySelectorAll('.print-button');
  if (printButtons.length === 0) return;

  printButtons.forEach(button => {
    // Add keyboard shortcut listener (Ctrl/Cmd + P)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        // Browser will handle this natively, but we could add tracking here
        console.log('Print initiated via keyboard shortcut');
      }
    });
  });
}

// Export functions for testing/debugging
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initProgressBar,
    initReadingTime,
    initStickyCTA,
    initPrintButton,
    initDarkModeToggle,
    initNewsletterForm
  };
}

/**
 * Dark Mode Toggle
 * Handles all .dark-mode-toggle elements (header + footer).
 * Syncs state across all instances and persists to localStorage.
 */
function initDarkModeToggle() {
  const allToggles = document.querySelectorAll('.dark-mode-toggle');
  if (!allToggles.length) return;

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
    // Sync all toggle buttons
    allToggles.forEach(t => t.setAttribute('aria-checked', dark ? 'true' : 'false'));
    // Sync footer switch thumb (aria-checked drives CSS)
    const footerSwitch = document.getElementById('dark-mode-toggle');
    if (footerSwitch) footerSwitch.setAttribute('aria-checked', dark ? 'true' : 'false');
  };

  // Restore saved preference on load
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') applyTheme(true);

  // Handle clicks on all toggles
  allToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(!isDark);
    });
  });

  // Also keep footer switch working (id-based, legacy)
  const footerSwitch = document.getElementById('dark-mode-toggle');
  if (footerSwitch && !footerSwitch.classList.contains('dark-mode-toggle')) {
    footerSwitch.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(!isDark);
    });
  }
}

/**
 * Footer Feature: Newsletter Form
 * Shows a success message on submit (no backend needed for demo).
 */
function initNewsletterForm() {
  const form = document.getElementById('footer-newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.footer__newsletter-input');
    const success = document.getElementById('footer-newsletter-success');

    if (!input || !input.value.includes('@')) return;

    if (success) success.classList.add('is-visible');
    if (input) input.value = '';

    // Hide message after 5 seconds
    setTimeout(() => {
      if (success) success.classList.remove('is-visible');
    }, 5000);
  });
}

/**
 * Batch 2 – Feature 7: Reading Mode
 * Hides distractions and focuses on the article content.
 * Activated by .reading-mode-btn, exited via .reading-mode-exit.
 */
function initReadingMode() {
  const btns = document.querySelectorAll('.reading-mode-btn');
  if (!btns.length) return;

  // Inject the exit button once into the body
  const exitBtn = document.createElement('button');
  exitBtn.className = 'reading-mode-exit';
  exitBtn.setAttribute('aria-label', 'Lesemodus beenden');
  exitBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
    Lesemodus beenden`;
  document.body.appendChild(exitBtn);

  const enter = () => {
    document.body.classList.add('is-reading-mode');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const exit = () => document.body.classList.remove('is-reading-mode');

  btns.forEach(btn => btn.addEventListener('click', enter));
  exitBtn.addEventListener('click', exit);

  // Also exit on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('is-reading-mode')) exit();
  });
}

/**
 * Batch 2 – Feature 8: Lazy Loading
 * Uses native browser lazy loading as primary mechanism.
 * Adds IntersectionObserver fallback for older browsers.
 */
function initLazyLoading() {
  // Native lazy loading is already set via loading="lazy" in HTML.
  // This adds a fade-in effect when images enter the viewport.
  const images = document.querySelectorAll('img[loading="lazy"]');
  if (!images.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '50px' });

  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';
    // If already loaded (cached), show immediately
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      observer.observe(img);
      img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
    }
  });
}
