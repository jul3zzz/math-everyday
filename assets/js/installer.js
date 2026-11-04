/* Math Everyday — l'appli s'utilise seulement installée : appli Windows (.exe) ou appli web installée
   (Android, iPhone/iPad, Mac, Chromebook). Dans un simple onglet de navigateur, le site montre la page de
   téléchargement avec un tuto par appareil (« porte »). Page #/installer dans l'appli : installer
   sur un autre appareil. Expose window.Installer. */
(function () {
  'use strict';
  var esc = U.esc;
  var invite = null;
  var ua = navigator.userAgent || '';
  var CLE_TEST = 'mathEveryday.appli';
  var SITE = 'jul3zzz.github.io/math-everyday';

  /* ---------- l'appareil et le navigateur ---------- */
  function appareil() {
    var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    var android = /Android/.test(ua);
    var nav = /Edg\//.test(ua) ? 'edge' : /SamsungBrowser/.test(ua) ? 'samsung' : /OPR\//.test(ua) ? 'opera' : /Firefox|FxiOS/.test(ua) ? 'firefox' :
      /CriOS|Chrome\//.test(ua) ? 'chrome' : /Safari\//.test(ua) ? 'safari' : 'autre';
    var sys = ios ? 'ios' : android ? 'android' : /Mac OS X/.test(ua) ? 'mac' : /Windows/.test(ua) ? 'windows' : /Linux|CrOS/.test(ua) ? 'autre' : 'autre';
    return { sys: sys, nav: nav, mobile: ios || android };
  }
  /* ouverte depuis l'appli Windows ou depuis l'icône d'une appli web installée */
  function installee() {
    return !!window.MathEverydayPC ||
      (window.matchMedia && (matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: window-controls-overlay)').matches || matchMedia('(display-mode: fullscreen)').matches)) ||
      navigator.standalone === true;
  }
  /* test en local : ?appli=1 fait comme si le site était installé (jamais sur le vrai site) */
  (function () {
    if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname) || !/[?&]appli=1/.test(location.search)) return;
    try { sessionStorage.setItem(CLE_TEST, '1'); } catch (e) { /* rien */ }
  })();
  function appli() {
    if (installee()) return true;
    try { return /^(localhost|127\.0\.0\.1)$/.test(location.hostname) && sessionStorage.getItem(CLE_TEST) === '1'; } catch (e) { return false; }
  }
  function lienWindows() { var t = window.ME_CONFIG && ME_CONFIG.telechargement; return (t && t.windows) || ''; }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); invite = e;
    rafraichir();
  });
  window.addEventListener('appinstalled', function () {
    invite = null;
    toast('Math Everyday est installée : ouvre-la depuis son icône φ.');
    rafraichir();
  });
  function rafraichir() { var m = U.$('#main'); if (m && m.getAttribute('data-inst-vue')) rendre(m, m.getAttribute('data-inst-vue') === 'porte', courant); }

  function installer() {
    if (!invite) return false;
    var p = invite; invite = null;
    p.prompt();
    p.userChoice.then(function (c) { if (c && c.outcome === 'dismissed') toast('Pas de souci : les étapes sont juste en dessous si tu changes d\'avis.'); }).catch(function () {});
    return true;
  }

  /* ---------- tutos par appareil ---------- */
  var PICTO = {
    partager: '<svg class="inst-picto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-label="Partager"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5a1.5 1.5 0 0 0-1.5 1.5v7A1.5 1.5 0 0 0 5 21h14a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 19 11h-1"/></svg>',
    ajouter: '<svg class="inst-picto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-label="Ajouter"><rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/></svg>',
    menu: '<svg class="inst-picto" viewBox="0 0 24 24" fill="currentColor" aria-label="Menu"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>',
    installer: '<svg class="inst-picto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-label="Installer"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M12 8v6M9 11l3 3 3-3M8 21h8"/></svg>'
  };
  var ETAPES = {
    windows: { titre: 'Windows (PC)', ic: 'monitor', etapes: [
      'Clique sur <b>Télécharger pour Windows</b> : le fichier <b>Math-Everyday-Setup.exe</b> arrive dans tes <b>Téléchargements</b>.',
      'Ouvre-le (double-clic sur le fichier, ou clic dessus en bas de ton navigateur).',
      'Si une fenêtre bleue « <b>Windows a protégé votre ordinateur</b> » s\'affiche : clique sur <b>Informations complémentaires</b>, puis sur <b>Exécuter quand même</b>. C\'est normal pour une nouvelle appli qui n\'a pas encore de certificat payant.',
      'L\'installation se fait toute seule en quelques secondes : Math Everyday s\'ouvre, et une icône φ apparaît sur ton <b>bureau</b> et dans le <b>menu Démarrer</b>.'] },
    android: { titre: 'Android', ic: 'phone', etapes: [
      'Ouvre <b>' + SITE + '</b> dans <b>Chrome</b>.',
      'Touche le bouton <b>Installer l\'appli</b> plus haut. S\'il n\'apparaît pas : touche le menu ' + PICTO.menu + ' en haut à droite, puis <b>Installer l\'application</b> (ou <b>Ajouter à l\'écran d\'accueil</b>).',
      'Confirme avec <b>Installer</b> : l\'icône φ arrive avec tes autres applis.',
      'Ouvre Math Everyday <b>depuis son icône</b> (et non plus depuis Chrome), puis accepte les notifications pour recevoir ton rappel du jour.'] },
    ios: { titre: 'iPhone et iPad', ic: 'phone', etapes: [
      'Ouvre <b>' + SITE + '</b> dans <b>Safari</b>.',
      'Touche le bouton <b>Partager</b> ' + PICTO.partager + ' : en bas de l\'écran sur iPhone, en haut à droite sur iPad.',
      'Fais défiler et choisis <b>Sur l\'écran d\'accueil</b> ' + PICTO.ajouter + ' (si tu ne le vois pas : <b>Modifier les actions</b> tout en bas).',
      'Touche <b>Ajouter</b>, puis ouvre Math Everyday <b>depuis l\'icône φ</b> de ton écran d\'accueil. Les notifications marchent à partir d\'iOS 16.4.'] },
    mac: { titre: 'Mac', ic: 'monitor', etapes: [
      'Ouvre <b>' + SITE + '</b> dans <b>Chrome</b>, <b>Edge</b> ou <b>Safari</b>.',
      'Chrome ou Edge : clique sur l\'icône <b>Installer</b> ' + PICTO.installer + ' à droite de la barre d\'adresse. Safari : menu <b>Fichier</b> → <b>Ajouter au Dock</b>.',
      'Confirme : Math Everyday s\'ouvre dans sa propre fenêtre et reste dans ton Dock et ton Launchpad.'] },
    autre: { titre: 'Chromebook et Linux', ic: 'monitor', etapes: [
      'Ouvre <b>' + SITE + '</b> dans <b>Chrome</b> ou <b>Edge</b>.',
      'Clique sur l\'icône <b>Installer</b> ' + PICTO.installer + ' à droite de la barre d\'adresse (ou menu ' + PICTO.menu + ' → <b>Installer Math Everyday</b>).',
      'Confirme : l\'appli s\'ouvre dans sa propre fenêtre et rejoint tes autres applis.'] }
  };
  var ICONES = {
    monitor: '<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    cloche: '<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    horsligne: '<path d="M3 3l18 18"/><path d="M8.5 8.5A6.5 6.5 0 0 0 5 14M12 6a8 8 0 0 1 8 8M2 10a12 12 0 0 1 4-3.4M17.5 6.8A12 12 0 0 1 22 10"/><circle cx="12" cy="18.5" r="1.3"/>',
    ecran: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 3v18"/>'
  };
  function ic(n) { return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONES[n] + '</svg>'; }

  /* bouton principal, adapté à l'appareil */
  function boutonPrincipal(a) {
    var win = lienWindows();
    if (a.sys === 'windows' && win) return '<a class="btn btn-lg" href="' + esc(win) + '" id="inst-dl">' + I('download') + 'Télécharger pour Windows</a><span class="inst-meta">Windows 10 et 11 · gratuit · environ 120 Mo</span>';
    if (invite) return '<button class="btn btn-lg" type="button" id="inst-go">' + I('download') + 'Installer l\'appli</button><span class="inst-meta">Gratuit · moins de 5 Mo · sans store</span>';
    return '<button class="btn btn-lg" type="button" id="inst-voir">' + I('download') + 'Voir comment l\'installer</button><span class="inst-meta">Gratuit · 1 minute · sans store</span>';
  }
  function tuto(cle, porte) {
    var win = lienWindows();
    return '<div class="card inst-etapes" id="inst-etapes"><h2>' + (porte ? 'Comment installer Math Everyday' : 'Sur un autre appareil') + '</h2>' +
      '<div class="tabs" role="tablist">' + Object.keys(ETAPES).map(function (k) { return '<button type="button" class="tab" role="tab" data-inst="' + k + '" aria-selected="' + (k === cle) + '">' + esc(ETAPES[k].titre) + '</button>'; }).join('') + '</div>' +
      '<ol class="inst-pas">' + ETAPES[cle].etapes.map(function (e, i) { return '<li><span class="inst-n">' + (i + 1) + '</span><span>' + e + '</span></li>'; }).join('') + '</ol>' +
      (cle === 'windows' ? (win ? '<div class="btn-row" style="margin:0 0 16px"><a class="btn" href="' + esc(win) + '">' + I('download') + 'Télécharger pour Windows</a></div>' : '<p class="inst-note">' + I('bulb') + '<span>L\'appli Windows arrive très bientôt. En attendant, installe Math Everyday avec <b>Edge</b> ou <b>Chrome</b> : icône <b>Installer</b> ' + PICTO.installer + ' à droite de la barre d\'adresse.</span></p>') : '') +
      '<p class="small muted" style="margin:0">Pour la retirer : clic droit (ou appui long) sur l\'icône → <b>Désinstaller</b> ou <b>Supprimer</b>. Ton compte et tes progrès ne sont pas effacés : ils sont gardés en ligne.</p></div>';
  }

  var ongletChoisi = null, courant = '';
  /* la vraie leçon de 3e sur les identités remarquables, telle qu'elle apparaît dans l'appli */
  function apercuLecon() {
    var r = String.raw;
    return '<figure class="apercu" aria-label="Aperçu d\'une leçon de 3e"><div class="apercu-h"><span class="chip chip-lvl lv-3e">3e</span><span class="muted small">Leçon 2 sur 14</span></div>' +
      '<h2>Identités remarquables et factorisation</h2>' +
      '<div class="apercu-f">' + r`$$(a + b)^2 = a^2 + 2ab + b^2$$` + '</div>' +
      '<p class="apercu-q">' + r`Calcule $101^2$ de tête.` + '</p>' +
      '<div class="apercu-r"><span class="input">10 201</span></div>' +
      '<div class="fb ok"><div class="fb-t">' + I('check') + 'Bonne réponse</div><div class="corr">' + r`$(100 + 1)^2 = 10,000 + 200 + 1 = 10,201$` + '</div></div></figure>';
  }
  function rendre(main, porte, route) {
    var a = appareil(), cle = ongletChoisi || a.sys;
    if (!ETAPES[cle]) cle = 'autre';
    main.setAttribute('data-inst-vue', porte ? 'porte' : 'page');
    if (!porte) {
      main.innerHTML = '<section class="page"><div class="wrap">' +
        '<span class="eyebrow">Installer</span><h1>Math Everyday sur tous tes appareils</h1>' +
        '<p class="muted inst-intro">Installe l\'appli sur ton téléphone, ta tablette ou un autre ordinateur : connecte-toi avec le même compte, tes progrès te suivent.</p>' +
        tuto(cle, false) + '</div></section>';
    } else {
      var verif = route === 'verifier'
        ? '<p class="inst-note inst-ok-note">' + I('check') + '<span><b>Ton adresse e-mail est confirmée.</b> Retourne dans l\'appli Math Everyday : tu y seras connecté tout seul.</span></p>' : '';
      var deja = !verif && a.mobile ? '<p class="small muted porte-deja">Déjà installée ? Ouvre-la depuis l\'icône φ de ton écran d\'accueil.</p>'
        : !verif ? '<p class="small muted porte-deja">Déjà installée ? Ouvre-la depuis l\'icône φ de ton bureau ou de ton menu Démarrer.</p>' : '';
      var firefox = a.nav === 'firefox' && !a.mobile && a.sys !== 'windows'
        ? '<p class="inst-note">' + I('bulb') + '<span>Firefox ne sait pas installer les applis web : ouvre ce lien dans <b>Chrome</b> ou <b>Edge</b>.</span></p>' : '';
      main.innerHTML =
        '<section class="hero porte-hero"><div class="wrap hero-in"><div>' +
        '<span class="eyebrow">Appli gratuite · de la 6e à la prépa MPSI</span>' +
        '<h1>Les maths, <em>30 minutes</em> par jour, dans ton appli.</h1>' +
        '<p class="hero-lead">Un test pour connaître ton niveau, une leçon offerte chaque jour, des exercices corrigés et un rappel à l\'heure que tu choisis. Sur ton téléphone ou ton ordinateur.</p>' +
        verif + '<div class="porte-cta">' + boutonPrincipal(a) + '</div>' + firefox + deja +
        '</div>' + apercuLecon() + '</div></section>' +
        '<section class="section"><div class="wrap">' + tuto(cle, true) + '</div></section>' +
        '<section class="section"><div class="wrap"><div class="section-h"><h2>Math Everyday en 30 secondes</h2></div>' +
        '<div class="pub"><video controls playsinline preload="none" poster="assets/video/pub-apercu.jpg" src="assets/video/pub-math-everyday.mp4" aria-label="Vidéo de présentation de Math Everyday, 30 secondes"></video></div></div></section>' +
        '<section class="section"><div class="wrap"><div class="section-h"><h2>Pourquoi une appli ?</h2></div><div class="porte-atouts">' +
        '<div class="card"><span class="inst-ic">' + ic('cloche') + '</span><h3>Un rappel chaque jour</h3><p class="muted">Une notification à l\'heure que tu choisis, seulement si ta leçon du jour n\'est pas faite.</p></div>' +
        '<div class="card"><span class="inst-ic">' + ic('horsligne') + '</span><h3>Même sans connexion</h3><p class="muted">Les leçons déjà ouvertes restent disponibles dans le bus ou en voyage.</p></div>' +
        '<div class="card"><span class="inst-ic">' + ic('ecran') + '</span><h3>Sans distractions</h3><p class="muted">Plein écran, sans onglets ni barre d\'adresse : juste toi et tes maths.</p></div>' +
        '</div></div></section>';
      U.math(U.$('.apercu', main));
    }
    var go = U.$('#inst-go', main);
    if (go) go.onclick = function () { if (!installer()) voir(); };
    var vo = U.$('#inst-voir', main);
    if (vo) vo.onclick = voir;
    main.onclick = function (e) { var t = e.target.closest('[data-inst]'); if (t && t.tagName === 'BUTTON') { ongletChoisi = t.getAttribute('data-inst'); rendre(main, porte, route); } };
    function voir() { ongletChoisi = cleDe(a); rendre(main, porte, route); U.$('#inst-etapes', main).scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }
  function cleDe(a) { return ETAPES[a.sys] ? a.sys : 'autre'; }

  window.Installer = {
    page: function (main) { ongletChoisi = null; courant = ''; rendre(main, false, ''); },
    porte: function (main, route) { if (courant !== route) ongletChoisi = null; courant = route; rendre(main, true, route); },
    installer: installer, installee: installee, appli: appli, appareil: appareil, disponible: function () { return !!invite; }
  };
  /* compatibilité : ancien bouton du pied de page */
  window.installerAppli = function () { if (!installer()) location.hash = '#/installer'; };
})();
