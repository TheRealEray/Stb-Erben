/*
 * 2-Klick-Lösung für Google Maps (DSGVO).
 * Die Karte (iframe mit data-src) wird erst geladen, nachdem der Nutzer
 * aktiv auf "Karte laden" geklickt hat. Erst dann wird eine Verbindung
 * zu Google aufgebaut und die IP-Adresse übertragen.
 */
(function () {
  function loadMap(btn) {
    var wrap = btn.closest('.map-consent');
    if (!wrap) return;
    var iframe = wrap.querySelector('iframe[data-src]');
    if (iframe) {
      iframe.src = iframe.getAttribute('data-src');
      iframe.removeAttribute('data-src');
    }
    var overlay = wrap.querySelector('.map-consent__overlay');
    if (overlay) overlay.remove();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.js-map-load');
    if (btn) loadMap(btn);
  });
})();
