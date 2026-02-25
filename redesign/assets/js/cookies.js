/**
 * Cookie Consent Banner
 * GDPR-compliant cookie consent system
 */

(function() {
  'use strict';

  const COOKIE_NAME = 'stb_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  /**
   * Get cookie value by name
   */
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  /**
   * Set cookie
   */
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  }

  /**
   * Create and inject cookie banner HTML
   */
  function createBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie Einwilligung');
    banner.setAttribute('aria-live', 'polite');

    banner.innerHTML = `
      <div class="cookie-banner__content">
        <div class="cookie-banner__text">
          <strong>Cookie-Hinweis:</strong>
          Wir verwenden Cookies, um Ihnen die beste Nutzererfahrung zu bieten.
          Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.
          Weitere Informationen finden Sie in unserer
          <a href="datenschutz.html" target="_blank">Datenschutzerklärung</a>.
        </div>
        <div class="cookie-banner__actions">
          <button class="cookie-banner__btn cookie-banner__btn--accept" id="cookie-accept" aria-label="Cookies akzeptieren">
            Akzeptieren
          </button>
          <button class="cookie-banner__btn cookie-banner__btn--decline" id="cookie-decline" aria-label="Cookies ablehnen">
            Ablehnen
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    return banner;
  }

  /**
   * Show banner with animation
   */
  function showBanner(banner) {
    // Force reflow to trigger CSS transition
    banner.offsetHeight;
    banner.classList.add('show');
  }

  /**
   * Hide banner with animation
   */
  function hideBanner(banner) {
    banner.classList.remove('show');
    // Remove from DOM after animation completes
    setTimeout(() => {
      if (banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 300);
  }

  /**
   * Handle accept button click
   */
  function handleAccept(banner) {
    setCookie(COOKIE_NAME, 'accepted', COOKIE_EXPIRY_DAYS);
    hideBanner(banner);

    // Optional: Enable analytics or other tracking here
    console.log('Cookies accepted');
  }

  /**
   * Handle decline button click
   */
  function handleDecline(banner) {
    setCookie(COOKIE_NAME, 'declined', COOKIE_EXPIRY_DAYS);
    hideBanner(banner);

    // Optional: Disable analytics or tracking here
    console.log('Cookies declined');
  }

  /**
   * Initialize cookie consent banner
   */
  function init() {
    // Check if user has already made a choice
    const consent = getCookie(COOKIE_NAME);

    if (consent) {
      // User has already made a choice
      console.log('Cookie consent:', consent);
      return;
    }

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        showConsentBanner();
      });
    } else {
      showConsentBanner();
    }
  }

  /**
   * Show consent banner
   */
  function showConsentBanner() {
    const banner = createBanner();

    // Add event listeners
    const acceptBtn = banner.querySelector('#cookie-accept');
    const declineBtn = banner.querySelector('#cookie-decline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        handleAccept(banner);
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function() {
        handleDecline(banner);
      });
    }

    // Show banner after a short delay for better UX
    setTimeout(function() {
      showBanner(banner);
    }, 500);
  }

  // Initialize on page load
  init();

  // Expose API for manual control if needed
  window.CookieConsent = {
    reset: function() {
      document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      location.reload();
    },
    getStatus: function() {
      return getCookie(COOKIE_NAME);
    }
  };

  // Footer "Cookie-Einstellungen" link handler
  document.addEventListener('DOMContentLoaded', function() {
    const cookieSettingsBtn = document.getElementById('footer-cookie-btn');
    if (cookieSettingsBtn) {
      cookieSettingsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.CookieConsent.reset();
      });
    }
  });

})();
