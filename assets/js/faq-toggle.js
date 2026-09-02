/*
 * Sichtbarkeit der FAQ-Antworten auf den Wissensseiten.
 *
 * Arbeitsteilung mit main.js: main.js setzt aria-expanded/aria-controls
 * (und ein wirkungsloses maxHeight, da .faq__answer per display:none/
 * .is-open gesteuert wird). Dieses Skript setzt ausschliesslich die
 * Klasse .is-open — es darf die aria-Attribute NICHT anfassen, sonst
 * toggeln beide Handler dasselbe Attribut und heben sich auf.
 */
(function () {
  document.addEventListener('click', function (e) {
    var button = e.target.closest('.faq__question');
    if (!button) return;
    var answer = button.nextElementSibling;
    if (answer && answer.classList.contains('faq__answer')) {
      answer.classList.toggle('is-open');
    }
  });
})();
