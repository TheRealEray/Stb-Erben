/**
 * Main JavaScript functionality
 * Handles UI interactions: navigation, language switcher, FAQ accordion, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('[main.js] DOM Content Loaded - Initializing UI components');

  // ========================================
  // Mobile Navigation Toggle
  // ========================================
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('is-open');
      console.log('[main.js] Mobile navigation toggled:', !isExpanded);
    });
  }

  // ========================================
  // Language Switcher Dropdown
  // ========================================
  const langButton = document.getElementById('lang-button');
  const langDropdown = document.getElementById('lang-dropdown');

  if (langButton && langDropdown) {
    // Toggle dropdown on button click
    langButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = langButton.getAttribute('aria-expanded') === 'true';
      langButton.setAttribute('aria-expanded', !isExpanded);
      langDropdown.classList.toggle('is-open');
      console.log('[main.js] Language switcher toggled:', !isExpanded);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!langButton.contains(e.target) && !langDropdown.contains(e.target)) {
        langButton.setAttribute('aria-expanded', 'false');
        langDropdown.classList.remove('is-open');
      }
    });

    // Close dropdown when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langDropdown.classList.contains('is-open')) {
        langButton.setAttribute('aria-expanded', 'false');
        langDropdown.classList.remove('is-open');
        langButton.focus();
      }
    });
  }

  // ========================================
  // FAQ Accordion
  // ========================================
  const faqQuestions = document.querySelectorAll('.faq__question');

  faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      const answer = question.nextElementSibling;

      // Toggle current item
      question.setAttribute('aria-expanded', !isExpanded);

      if (answer && answer.classList.contains('faq__answer')) {
        if (isExpanded) {
          answer.style.maxHeight = null;
          answer.style.paddingTop = null;
          answer.style.paddingBottom = null;
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.paddingTop = '1rem';
          answer.style.paddingBottom = '1rem';
        }
      }
    });
  });

  console.log('[main.js] ✅ UI components initialized successfully');
});
