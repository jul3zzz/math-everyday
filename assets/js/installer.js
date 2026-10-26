/* Math Everyday — utiliser le site sur le web ou l'installer comme une appli (ordinateur, téléphone).
   Récupère l'invite d'installation du navigateur quand il en propose une (Chrome, Edge, Android),
   sinon montre les étapes adaptées à l'appareil. Page #/installer. Expose window.Installer. */
(function () {
  'use strict';
  var esc = U.esc;
  var invite = null;
  var ua = navigator.userAgent || '';

  /* ---------- l'appareil et le navigateur ---------- */
  function appareil() {
    var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    var android = /Android/.test(ua);
    var nav = /Edg\//.test(ua) ? 'edge' : /SamsungBrowser/.test(ua) ? 'samsung' : /OPR\//.test(ua) ? 'opera' : /Firefox|FxiOS/.test(ua) ? 'firefox' :
      /CriOS|Chrome\//.test(ua) ? 'chrome' : /Safari\//.test(ua) ? 'safari' : 'autre';
    var sys = ios ? 'ios' : android ? 'android' : /Mac OS X/.test(ua) ? 'mac' : /Windows/.test(ua) ? 'windows' : /Linux|CrOS/.test(ua) ? 'linux' : 'autre';
    return { sys: sys, nav: nav, mobile: ios || android };
  }
  function installee() {
    return (window.matchMedia && (matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: window-controls-overlay)').matches)) || navigator.standalone === true;
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); invite = e;
    U.$$('[data-installer]').forEach(function (b) { b.hidden = false; });
    if (location.hash === '#/installer') rendre(U.$('#main'));
  });
  window.addEventListener('appinstalled', function () {
    invite = null;
    toast('Math Everyday est installée. Tu la trouveras avec tes autres applis.');
    if (location.hash === '#/installer') rendre(U.$('#main'));
  });

  function installer() {
    if (invite) {
      var p = invite; invite = null;
      p.prompt();
      p.userChoice.then(function (c) { if (c && c.outcome === 'dismissed') toast('Pas de souci : tu peux l\'installer plus tard depuis cette page.'); }).catch(function () {});
      return true;
    }
    return false;
  }

  /* ---------- étapes par appareil ---------- */
  var ETAPES = {
    pc: { titre: 'Ordinateur (Chrome ou Edge)', ic: 'monitor', etapes: [
      'Ouvre <b>jul3zzz.github.io/math-everyday</b> dans <b>Chrome</b> ou <b>Edge</b>.',
      'Clique sur l\'icône <b>Installer</b> à droite de la barre d\'adresse (un petit écran avec une flèche), ou sur le bouton <b>Installer sur cet appareil</b> plus haut.',
      'Confirme : Math Everyday s\'ouvre dans sa propre fenêtre et apparaît dans le menu Démarrer (Windows) ou le Launchpad (Mac).'] },
    mac: { titre: 'Mac (Safari)', ic: 'monitor', etapes: [
      'Ouvre le site dans <b>Safari</b>.',
      'Menu <b>Fichier</b> → <b>Ajouter au Dock</b>.',
      'Clique sur <b>Ajouter</b> : l\'icône φ apparaît dans ton Dock.'] },
    ios: { titre: 'iPhone et iPad (Safari)', ic: 'phone', etapes: [
      'Ouvre le site dans <b>Safari</b>.',
      'Touche le bouton <b>Partager</b> (le carré avec une flèche vers le haut).',
      'Choisis <b>Sur l\'écran d\'accueil</b>, puis <b>Ajouter</b>.'] },
    android: { titre: 'Android (Chrome)', ic: 'phone', etapes: [
      'Ouvre le site dans <b>Chrome</b>.',
      'Touche le menu <b>⋮</b> en haut à droite.',
      'Choisis <b>Installer l\'application</b> (ou <b>Ajouter à l\'écran d\'accueil</b>), puis confirme.'] }
  };
  function cleEtapes(a) { return a.sys === 'ios' ? 'ios' : a.sys === 'android' ? 'android' : a.sys === 'mac' && a.nav === 'safari' ? 'mac' : 'pc'; }
  var ICONES = {
    monitor: '<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    lien: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
    globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5S14.6 18.7 12 21.5C9.4 18.7 8.1 15.5 8.1 12S9.4 5.3 12 2.5z"/>'
  };
  function ic(n) { return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONES[n] + '</svg>'; }

  var ongletChoisi = null;
  function rendre(main) {
    var a = appareil(), deja = installee(), cle = ongletChoisi || cleEtapes(a);
    var avertir = a.nav === 'firefox' && !a.mobile
      ? '<p class="inst-note">' + I('bulb') + '<span>Firefox sur ordinateur ne sait pas installer les applis web : ouvre ce site dans <b>Chrome</b> ou <b>Edge</b> pour l\'installer, ou continue sur le web.</span></p>' : '';
    var etat = deja
      ? '<span class="inst-ok">' + I('check') + 'Déjà installée sur cet appareil</span>'
      : '<button class="btn btn-lg" type="button" id="inst-go">' + I('download') + 'Installer sur cet appareil</button>';
    main.innerHTML = '<section class="page"><div class="wrap">' +
      '<span class="eyebrow">Installer</span><h1>Math Everyday, partout</h1>' +
      '<p class="muted inst-intro">Le même site, ton compte et tes progrès te suivent : choisis comment tu préfères l\'utiliser.</p>' +
      '<div class="inst-choix">' +
      '<article class="card inst-c"><span class="inst-ic">' + ic('globe') + '</span><h2>Sur le web</h2><p class="muted">Rien à installer : ouvre le site dans ton navigateur, sur n\'importe quel ordinateur, tablette ou téléphone.</p>' +
      '<ul class="inst-l"><li>' + I('check') + 'Toujours la dernière version</li><li>' + I('check') + 'Fonctionne partout, même au collège ou au lycée</li></ul>' +
      '<div class="btn-row"><a class="btn btn-2 btn-lg" href="#/' + (Store.connecte() ? 'aujourdhui' : '') + '">Continuer sur le web</a><button class="btn btn-ghost" type="button" id="inst-copier">' + ic('lien') + 'Copier le lien</button></div></article>' +
      '<article class="card inst-c inst-reco"><span class="chip inst-tag">Conseillé</span><span class="inst-ic">' + ic(a.mobile ? 'phone' : 'monitor') + '</span><h2>' + (a.mobile ? 'Comme une appli' : 'Sur ton ordinateur') + '</h2><p class="muted">' + (a.mobile ? 'Une icône sur ton écran d\'accueil, en plein écran, avec la barre d\'onglets en bas.' : 'Une icône sur ton bureau ou dans ton Dock, dans sa propre fenêtre, sans onglets ni barre d\'adresse.') + '</p>' +
      '<ul class="inst-l"><li>' + I('check') + 'S\'ouvre en un clic</li><li>' + I('check') + 'Les leçons déjà vues marchent hors connexion</li><li>' + I('check') + 'Gratuit, moins de 5 Mo, sans store</li></ul>' +
      '<div class="btn-row">' + etat + '</div>' + avertir + '</article></div>' +
      '<div class="card inst-etapes" id="inst-etapes"><h2>Comment installer</h2>' +
      '<div class="tabs" role="tablist">' + Object.keys(ETAPES).map(function (k) { return '<button type="button" class="tab" role="tab" data-inst="' + k + '" aria-selected="' + (k === cle) + '">' + esc(ETAPES[k].titre) + '</button>'; }).join('') + '</div>' +
      '<ol class="inst-pas">' + ETAPES[cle].etapes.map(function (e, i) { return '<li><span class="inst-n">' + (i + 1) + '</span><span>' + e + '</span></li>'; }).join('') + '</ol>' +
      '<p class="small muted" style="margin:0">Pour la retirer : clic droit (ou appui long) sur l\'icône → <b>Désinstaller</b> ou <b>Supprimer</b>. Ton compte et tes progrès ne sont pas effacés.</p></div>' +
      '</div></section>';
    var go = U.$('#inst-go', main);
    if (go) go.onclick = function () {
      if (!installer()) { ongletChoisi = cleEtapes(a); rendre(main); U.$('#inst-etapes', main).scrollIntoView({ behavior: 'smooth', block: 'start' }); toast('Suis les étapes ci-dessous pour ton navigateur.'); }
    };
    U.$('#inst-copier', main).onclick = function () {
      var lienSite = location.origin + location.pathname;
      (navigator.clipboard ? navigator.clipboard.writeText(lienSite) : Promise.reject()).then(function () { toast('Lien copié : ' + lienSite); }, function () { toast(lienSite); });
    };
    main.onclick = function (e) { var t = e.target.closest('[data-inst]'); if (t) { ongletChoisi = t.getAttribute('data-inst'); rendre(main); } };
  }

  window.Installer = { page: function (main) { ongletChoisi = null; rendre(main); }, installer: installer, installee: installee, disponible: function () { return !!invite; } };
  /* compatibilité : ancien bouton du pied de page */
  window.installerAppli = function () { if (!installer()) location.hash = '#/installer'; };
})();
