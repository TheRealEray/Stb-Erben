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

  // Future batches will add more init calls here
  // initDarkMode();
  // initReadingMode();
  // initLazyLoading();
  // etc.
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
    initPrintButton
  };
}
