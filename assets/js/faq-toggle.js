/*
 * Sichtbarkeit der FAQ-Antworten auf den Wissensseiten.
 *
 * Hintergrund: .faq__answer wird im CSS über display:none / .is-open
 * gesteuert. main.js registriert am selben Button einen eigenen Handler,
 * der aria-expanded setzt (gewuenscht) und zusaetzlich inline
 * max-height/padding schreibt (hier schaedlich): Es liest scrollHeight,
 * waehrend das Element noch display:none ist, erhaelt 0 und setzt
 * max-height:0px. Da .faq__answer kein overflow:hidden hat, laeuft der
 * Text anschliessend sichtbar ueber die folgenden Fragen.
 *
 * Dieser Handler laeuft per Bubbling NACH main.js und raeumt dessen
 * Inline-Styles wieder ab. aria-expanded bleibt bewusst unangetastet —
 * darum kuemmert sich main.js.
 */
(function () {
  document.addEventListener('click', function (e) {
    var button = e.target.closest('.faq__question');
    if (!button) return;

    var answer = button.nextElementSibling;
    if (!answer || !answer.classList.contains('faq__answer')) return;

    answer.classList.toggle('is-open');

    // Inline-Styles von main.js entfernen, damit das CSS greift
    answer.style.maxHeight = '';
    answer.style.paddingTop = '';
    answer.style.paddingBottom = '';
  });
})();
