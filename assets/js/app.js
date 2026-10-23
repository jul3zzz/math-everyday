/* Math Everyday — routeur (#/…), navigation, logo. */
(function () {
  'use strict';
  var main = document.getElementById('main');

  function nav(route) {
    var st = Store.get();
    var items = st.profil
      ? [['aujourdhui', 'Aujourd\'hui', 'sun'], ['programme', 'Programme', 'list'], ['abonnement', Store.estPremium() ? 'Illimité' : 'Abonnement', 'crown'], ['reglages', 'Réglages', 'gear']]
      : [['', 'Accueil', 'sun'], ['programme', 'Programme', 'list'], ['abonnement', 'Abonnement', 'crown'], ['test', 'Test de niveau', 'target']];
    document.getElementById('nav').innerHTML = items.map(function (it) {
      var on = route === it[0] || (route === 'lecon' && it[0] === (st.profil ? 'aujourdhui' : ''));
      return '<a href="#/' + it[0] + '"' + (on ? ' aria-current="page"' : '') + '>' + I(it[2]) + it[1] + '</a>';
    }).join('');
  }

  function router() {
    var h = location.hash.replace(/^#\/?/, '');
    var parts = h.split('/');
    var r = parts[0] || '';
    var st = Store.get();
    if (r === '' && st.profil && location.hash !== '#/') r = 'aujourdhui';
    main.onclick = null;
    Modal.fermer();
    nav(r);
    switch (r) {
      case 'test': Test.vue(main); break;
      case 'aujourdhui': Vues.aujourdhui(main); break;
      case 'lecon': Vues.lecon(main, parts[1]); break;
      case 'programme': Vues.programme(main, parts[1]); break;
      case 'abonnement': Vues.abonnement(main); break;
      case 'reglages': Vues.reglages(main); break;
      default: Vues.accueil(main);
    }
    U.math(main);
    if (!window.__premier) window.scrollTo(0, 0);
    window.__premier = false;
  }

  U.$$('[data-logo]').forEach(function (el) { el.innerHTML = LOGO; });
  Theme.appliquer(Store.get().theme || 'minimal');
  document.getElementById('theme-btn').onclick = Vues.themes;
  document.getElementById('foot-note').textContent = 'Version démo · comptes, mails et paiements simulés sur cet appareil · ' + LECONS.length + ' leçons de la 6e à la MPSI';
  window.addEventListener('hashchange', router);
  router();
})();
