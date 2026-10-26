/* Math Everyday — routeur (#/…), navigation, logo, application installable. */
(function () {
  'use strict';
  var main = document.getElementById('main');

  /* ================= Navigation =================
     Ordinateur : 4 onglets principaux en haut, le reste dans le menu du compte (avatar).
     Téléphone : barre d'onglets en bas comme une appli (la calculatrice au centre), le reste dans la feuille « Menu ». */
  var actifCourant = '';
  function lien(it, actif, cls) {
    var on = actif === it[0].split('/')[0];
    return '<a href="#/' + it[0] + '"' + (cls ? ' class="' + cls + '"' : '') + (on ? ' aria-current="page"' : '') + '>' + I(it[2]) + '<span class="nav-lbl">' + it[1] + '</span>' + (it[3] ? '<span class="nav-pastille">' + it[3] + '</span>' : '') + '</a>';
  }
  /* éléments secondaires (menu du compte et feuille « Menu ») */
  function secondaires(st) {
    return (window.Cloud && Cloud.actif ? [['amis', 'Amis', 'user']] : [])
      .concat(st.prof ? [['prof', 'Espace prof', 'book']] : [])
      .concat([['abonnement', Store.estPremium() ? 'Mon abonnement' : 'Abonnement', 'crown'], ['reglages', 'Réglages', 'gear']]);
  }
  function nav(route) {
    var st = Store.get();
    var groupe = { revisions: 'sentrainer', entrainement: 'sentrainer', examens: 'sentrainer', fiches: 'sentrainer', fiche: 'sentrainer', atelier: 'sentrainer', 'calcul-mental': 'sentrainer', sujets: 'sentrainer', plan: 'sentrainer', bilan: 'progres', nouveautes: 'abonnement', duel: 'amis', classes: 'amis', lecon: st.profil ? 'aujourdhui' : '', compte: 'compte' };
    var actif = actifCourant = groupe[route] != null ? groupe[route] : route;
    var nd = st.profil && window.Entrainement ? Entrainement.dues() : 0;
    var principaux = st.profil
      ? [['aujourdhui', 'Aujourd\'hui', 'sun'], ['sentrainer', 'S\'entraîner', 'pencil', nd], ['programme', 'Programme', 'list'], ['progres', 'Progrès', 'star']]
      : [['programme', 'Programme', 'list'], ['formulaire', 'Formulaire', 'book'], ['abonnement', 'Abonnement', 'crown']];
    document.getElementById('nav').innerHTML = principaux.map(function (it) { return lien(it, actif); }).join('');
    /* à droite : le compte (ordinateur) */
    var ha = document.getElementById('haut-actions');
    if (st.profil) {
      var initiale = U.esc((st.profil.nom || '?').trim().charAt(0).toUpperCase() || '?');
      var sec = secondaires(st);
      ha.innerHTML = '<div class="compte-m"><button type="button" class="avatar-b' + (sec.some(function (x) { return x[0] === actif; }) ? ' on' : '') + '" id="avatar-b" aria-haspopup="true" aria-expanded="false" aria-controls="menu-compte" aria-label="Mon compte"><span class="avatar">' + initiale + '</span><span class="avatar-nom">' + U.esc(st.profil.nom) + '</span>' + I('chevron') + '</button>' +
        '<div class="menu-d" id="menu-compte" hidden><div class="menu-tete"><span class="avatar avatar-l">' + initiale + '</span><span><b>' + U.esc(st.profil.nom) + '</b><small>' + U.esc(st.profil.mail || '') + '</small></span></div>' +
        sec.map(function (it) { return lien(it, actif, 'menu-i'); }).join('') +
        '<button type="button" class="menu-i" data-apparence>' + I('palette') + '<span class="nav-lbl">Apparence</span></button>' +
        (Installer.installee() ? '' : lien(['installer', 'Installer l\'appli', 'download'], actif, 'menu-i')) +
        '<button type="button" class="menu-i menu-sortie" data-deco>' + I('arrow') + '<span class="nav-lbl">Se déconnecter</span></button></div></div>';
    } else {
      ha.innerHTML = '<a class="btn btn-ghost btn-sm" href="#/compte/connexion"' + (route === 'compte' ? ' aria-current="page"' : '') + '>Se connecter</a><a class="btn btn-sm" href="#/compte">Créer un compte</a>';
    }
    /* téléphone : barre du bas */
    var bas = st.profil
      ? lien(['aujourdhui', 'Aujourd\'hui', 'sun'], actif, 'bb') + lien(['sentrainer', 'S\'entraîner', 'pencil', nd], actif, 'bb') +
        '<button type="button" class="bb bb-centre" data-outil="calc" aria-label="Calculatrice et outils">' + I('calc') + '<span class="nav-lbl">Outils</span></button>' +
        lien(['progres', 'Progrès', 'star'], actif, 'bb') +
        '<button type="button" class="bb' + (['programme'].concat(secondaires(st).map(function (x) { return x[0]; })).indexOf(actif) >= 0 ? ' on' : '') + '" data-ouvrir-feuille aria-haspopup="dialog">' + I('menu') + '<span class="nav-lbl">Menu</span></button>'
      : lien(['', 'Accueil', 'sun'], actif, 'bb') + lien(['programme', 'Leçons', 'list'], actif, 'bb') + lien(['formulaire', 'Formules', 'book'], actif, 'bb') +
        lien(['abonnement', 'Offres', 'crown'], actif, 'bb') + lien(['compte', 'Compte', 'user'], actif, 'bb');
    document.getElementById('barre-bas').innerHTML = bas;
    fermerTout();
    ajusterNav();
  }

  /* menu du compte (ordinateur) */
  function menuCompte() { return document.getElementById('menu-compte'); }
  function fermerTout() {
    var m = menuCompte(); if (m) { m.hidden = true; var b = document.getElementById('avatar-b'); if (b) b.setAttribute('aria-expanded', 'false'); }
    fermerFeuille();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('#avatar-b');
    if (b) {
      e.stopPropagation();
      var m = menuCompte(), ouvrir = m.hidden;
      m.hidden = !ouvrir; b.setAttribute('aria-expanded', String(ouvrir));
      if (ouvrir) { var p = m.querySelector('.menu-i'); if (p) p.focus(); }
      return;
    }
    if (e.target.closest('[data-apparence]')) { fermerTout(); Vues.themes(); return; }
    if (e.target.closest('[data-deco]')) { fermerTout(); Store.deconnexion(); if (window.Test) Test.recommencer(); location.hash = '#/'; toast('Tu es déconnecté. À bientôt !'); return; }
    if (e.target.closest('[data-ouvrir-feuille]')) { ouvrirFeuille(); return; }
    if (e.target.closest('[data-fermer-feuille]')) { fermerFeuille(); return; }
    if (e.target.closest('.feuille a, .feuille [data-outil]')) { fermerFeuille(); return; }
    var m2 = menuCompte();
    if (m2 && !m2.hidden && !e.target.closest('.compte-m')) fermerTout();
    if (m2 && !m2.hidden && e.target.closest('.menu-i')) fermerTout();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var m = menuCompte();
    if (m && !m.hidden) { fermerTout(); document.getElementById('avatar-b').focus(); }
    if (!document.getElementById('feuille').hidden) fermerFeuille();
  });

  /* feuille « Menu » (téléphone) : grandes tuiles */
  function ouvrirFeuille() {
    var st = Store.get(), f = document.getElementById('feuille'), boite = document.getElementById('feuille-boite');
    var tuiles = [['programme', 'Programme', 'list']].concat(secondaires(st))
      .concat([['formulaire', 'Formulaire', 'book'], ['atelier', 'Mode libre', 'compass'], ['calcul-mental', 'Calcul mental', 'target']]);
    /* grille de 3 colonnes toujours pleine (+ 2 tuiles fixes : Notes et Apparence) */
    if (!Installer.installee()) tuiles.push(['installer', 'Installer l\'appli', 'download']);
    var bonus = [['fiches', 'Fiches résumé', 'book'], ['examens', 'Examens blancs', 'clock'], ['sujets', 'Sujets type', 'star']];
    while ((tuiles.length + 2) % 3 && bonus.length) tuiles.push(bonus.shift());
    var N = window.Progres ? Progres.niveau(Progres.xp()) : null;
    boite.innerHTML = '<div class="feuille-poignee" aria-hidden="true"></div>' +
      '<div class="menu-tete"><span class="avatar avatar-l">' + U.esc((st.profil.nom || '?').charAt(0).toUpperCase()) + '</span><span><b>' + U.esc(st.profil.nom) + '</b><small>' + (N ? 'Niveau ' + N.n + ' · ' + U.esc(N.titre) : '') + '</small></span></div>' +
      '<div class="feuille-grille">' + tuiles.map(function (it) { return lien(it, actifCourant, 'tuile'); }).join('') +
      '<button type="button" class="tuile" data-outil="notes">' + I('pencil') + '<span class="nav-lbl">Notes</span></button>' +
      '<button type="button" class="tuile" data-apparence>' + I('palette') + '<span class="nav-lbl">Apparence</span></button></div>' +
      '<button type="button" class="feuille-sortie" data-deco>Se déconnecter</button>';
    f.hidden = false;
    document.body.classList.add('feuille-ouverte');
    var p = boite.querySelector('a'); if (p) p.focus();
  }
  function fermerFeuille() {
    var f = document.getElementById('feuille');
    if (f && !f.hidden) { f.hidden = true; document.body.classList.remove('feuille-ouverte'); }
  }

  /* Menu « Plus » : les onglets qui ne tiennent pas dans la barre passent dans un menu déroulant
     (la page active reste toujours visible). Recalculé quand la barre change de largeur. */
  var navEl = document.getElementById('nav'), plusW = document.getElementById('nav-plus'),
    plusB = document.getElementById('nav-plus-b'), menu = document.getElementById('nav-menu');
  function fermerMenu() { menu.hidden = true; plusB.setAttribute('aria-expanded', 'false'); }
  function ajusterNav() {
    var liens = U.$$('a', navEl);
    liens.forEach(function (a) { a.hidden = false; });
    plusW.hidden = true; menu.innerHTML = '';
    if (navEl.scrollWidth <= navEl.clientWidth + 1) { fermerMenu(); return; }
    plusW.hidden = false;
    var caches = [];
    for (var i = liens.length - 1; i >= 0 && navEl.scrollWidth > navEl.clientWidth + 1; i--) {
      if (liens[i].hasAttribute('aria-current')) continue;
      liens[i].hidden = true; caches.unshift(liens[i]);
    }
    menu.innerHTML = caches.map(function (a) { return '<a href="' + a.getAttribute('href') + '">' + a.innerHTML + '</a>'; }).join('');
    plusB.innerHTML = I('menu') + '<span>Plus</span>';
  }
  plusB.onclick = function (e) {
    e.stopPropagation();
    var ouvrir = menu.hidden;
    menu.hidden = !ouvrir; plusB.setAttribute('aria-expanded', String(ouvrir));
    if (ouvrir) { var p = menu.querySelector('a'); if (p) p.focus(); }
  };
  menu.addEventListener('click', fermerMenu);
  document.addEventListener('click', function (e) { if (!menu.hidden && !e.target.closest('#nav-plus')) fermerMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { fermerMenu(); plusB.focus(); } });
  if (window.ResizeObserver) new ResizeObserver(function () { ajusterNav(); }).observe(document.querySelector('.top-in'));
  else window.addEventListener('resize', ajusterNav);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajusterNav);

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
      case 'installer': Installer.page(main); break;
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

  /* Mode « tout débloqué » pour tester en local (lancer-local.bat) : ?debloque=1 ouvre un compte de
     démo abonné à vie, avec l'espace professeur. Jamais sur le vrai site ni avec les vrais comptes en ligne. */
  (function debloquer() {
    if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname) || !/[?&]debloque=1/.test(location.search)) return;
    if (window.Cloud && Cloud.actif && !Cloud.faux) return;
    var MAIL = 'demo@math-everyday.test', MDP = 'demo-local-1618';
    var pret = Store.connecte() ? Promise.resolve()
      : Store.connexion(MAIL, MDP).catch(function () { return Store.creerCompte({ nom: 'Démo', mail: MAIL, mdp: MDP, classe: '3e', notif: { actif: false, heure: '17:30' } }); });
    pret.then(function () {
      var s = Store.get();
      if (!s.niveau) s.niveau = '3e';
      if (!s.premium) s.premium = { plan: 'vie', depuis: U.today() };
      s.prof = true;
      Store.save();
      if (!location.hash || location.hash === '#/' || /^#\/(compte|test)/.test(location.hash)) location.hash = '#/aujourdhui';
      else router();
      toast('Mode local : tout est débloqué (compte Démo, abonnement à vie).');
    }).catch(function (e) { toast('Mode tout débloqué indisponible : ' + e.message); });
  })();

  /* Application installable et lecture hors connexion */
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { /* hors ligne indisponible */ }); });
  }
  /* installation : voir installer.js et la page #/installer */
})();
