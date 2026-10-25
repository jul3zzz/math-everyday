/* Math Everyday — routeur (#/…), navigation, logo, application installable. */
(function () {
  'use strict';
  var main = document.getElementById('main');

  function nav(route) {
    var st = Store.get();
    var items = st.profil
      ? [['aujourdhui', 'Aujourd\'hui', 'sun'], ['sentrainer', 'S\'entraîner', 'pencil'], ['programme', 'Programme', 'list'], ['progres', 'Progrès', 'star']]
        .concat(window.Cloud && Cloud.actif ? [['amis', 'Amis', 'user']] : [['abonnement', Store.estPremium() ? 'Illimité' : 'Abonnement', 'crown']])
        .concat(st.prof ? [['prof', 'Prof', 'book']] : []).concat([['reglages', 'Réglages', 'gear']])
      : [['', 'Accueil', 'sun'], ['programme', 'Programme', 'list'], ['formulaire', 'Formulaire', 'book'], ['abonnement', 'Abonnement', 'crown'], ['compte/connexion', 'Se connecter', 'user']];
    var groupe = { revisions: 'sentrainer', entrainement: 'sentrainer', examens: 'sentrainer', fiches: 'sentrainer', fiche: 'sentrainer', atelier: 'sentrainer', 'calcul-mental': 'sentrainer', sujets: 'sentrainer', plan: 'sentrainer', bilan: 'progres', nouveautes: 'abonnement', duel: 'amis', classes: 'amis', lecon: st.profil ? 'aujourdhui' : '' };
    var actif = groupe[route] != null ? groupe[route] : route;
    var nd = st.profil && window.Entrainement ? Entrainement.dues() : 0;
    document.getElementById('nav').innerHTML = items.map(function (it) {
      var on = actif === it[0].split('/')[0];
      return '<a href="#/' + it[0] + '" title="' + it[1] + '"' + (on ? ' aria-current="page"' : '') + '>' + I(it[2]) + '<span class="nav-lbl">' + it[1] + '</span>' + (it[0] === 'sentrainer' && nd ? '<span class="nav-pastille">' + nd + '</span>' : '') + '</a>';
    }).join('');
  }

  function router() {
    var h = location.hash.replace(/^#\/?/, '');
    var parts = h.split('/');
    var r = parts[0] || '';
    var st = Store.get();
    if (r === '' && st.profil && location.hash !== '#/') r = 'aujourdhui';
    /* Le test de niveau se passe une fois le compte créé. */
    if (r === 'test' && !st.profil) { location.hash = '#/compte'; return; }
    main.onclick = null;
    document.onkeydown = null;
    if (Theme.premium(Theme.actuel()) && !Store.estPremium()) Theme.appliquer('minimal');
    Modal.fermer();
    nav(r);
    switch (r) {
      case 'compte': Vues.compte(main, parts[1]); break;
      case 'test': Test.vue(main); break;
      case 'aujourdhui': Vues.aujourdhui(main); break;
      case 'lecon': Vues.lecon(main, parts[1]); break;
      case 'programme': Vues.programme(main, parts[1]); break;
      case 'abonnement': Vues.abonnement(main); break;
      case 'reglages': Vues.reglages(main); break;
      case 'sentrainer': Entrainement.hub(main); break;
      case 'revisions': Entrainement.revisions(main); break;
      case 'entrainement': Entrainement.entrainement(main, parts[1]); break;
      case 'examens': Entrainement.examens(main, parts[1]); break;
      case 'progres': Entrainement.progres(main); break;
      case 'fiches': Fiches.liste(main, parts[1]); break;
      case 'fiche': Fiches.fiche(main, parts[1]); break;
      case 'formulaire': Formulaire.page(main); break;
      case 'amis': Social.amis(main); break;
      case 'duel': Social.duel(main, parts[1]); break;
      case 'classes': Social.classes(main); break;
      case 'prof': Social.prof(main, parts[1]); break;
      case 'atelier': Atelier.page(main); break;
      case 'calcul-mental': CalculMental.page(main, parts[1]); break;
      case 'sujets': Premium.sujets(main, parts[1]); break;
      case 'plan': Premium.plan(main); break;
      case 'bilan': Premium.bilan(main); break;
      case 'nouveautes': Premium.nouveautes(main); break;
      default: Vues.accueil(main);
    }
    U.math(main);
    if (window.Outils) Outils.route(r, parts[1]);
    if (!window.__premier) window.scrollTo(0, 0);
    window.__premier = false;
  }

  U.$$('[data-logo]').forEach(function (el) { el.innerHTML = LOGO; });
  Theme.appliquer(Store.theme() || 'minimal');
  document.getElementById('theme-btn').onclick = Vues.themes;
  document.getElementById('foot-note').textContent = 'Version démo · comptes, mails et paiements simulés sur cet appareil · ' + LECONS.length + ' leçons de la 6e à la MPSI';
  if (window.Outils) Outils.init();
  window.addEventListener('hashchange', router);
  router();

  /* Application installable et lecture hors connexion */
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { /* hors ligne indisponible */ }); });
  }
  var invite = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); invite = e; var b = document.getElementById('installer'); if (b) b.hidden = false; });
  window.installerAppli = function () {
    if (invite) { invite.prompt(); invite = null; return; }
    Modal.ouvrir('<h2 id="modal-title">Installer Math Everyday</h2><p class="muted">Sur iPhone / iPad : bouton <b>Partager</b> de Safari, puis <b>Sur l\'écran d\'accueil</b>.</p><p class="muted">Sur Android : menu <b>⋮</b> de Chrome, puis <b>Installer l\'application</b>.</p><p class="muted">Sur ordinateur : icône d\'installation à droite de la barre d\'adresse de Chrome ou Edge.</p><p class="small muted">Une fois installée, les leçons déjà ouvertes restent consultables sans connexion.</p><div class="btn-row"><button class="btn" type="button" data-close>Compris</button></div>');
  };
  var ib = document.getElementById('installer');
  if (ib) ib.onclick = window.installerAppli;
})();
