/* Math Everyday — rappels par notification.
   Demande l'autorisation avec une fenêtre qui explique à quoi elle sert (le navigateur n'affiche sa propre
   question qu'après un clic), puis prévient chaque jour à l'heure du rappel (st.notif.heure) si la leçon du
   jour n'est pas faite, une seule fois par jour. Le rappel part tant que l'appli tourne : sur PC l'appli
   Windows reste dans la barre des tâches ; sur Android, le service worker prend aussi le relais en
   arrière-plan (synchronisation périodique, quand Chrome l'accorde). Expose window.Rappels. */
(function () {
  'use strict';
  var CLE_CHOIX = 'mathEveryday.rappels';      /* 'oui' | 'non' | date du dernier « plus tard » */
  var CLE_DERNIER = 'mathEveryday.dernierRappel';
  var CACHE = 'me-rappel';
  var proposeCetteFois = false;

  function lire(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function ecrire(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* rien */ } }
  function supporte() { return 'Notification' in window; }
  function permission() { return supporte() ? Notification.permission : 'unsupported'; }
  function actifs() { return lire(CLE_CHOIX) === 'oui' && permission() === 'granted'; }
  function leconFaite(st) { var t = U.today(); return Object.keys(st.faites || {}).some(function (k) { return st.faites[k] && st.faites[k].date === t; }); }
  function heureAtteinte(h) { var p = (h || '17:30').split(':'), n = new Date(); return n.getHours() * 60 + n.getMinutes() >= (+p[0]) * 60 + (+p[1] || 0); }

  /* ---------- afficher une notification ---------- */
  function notifier(titre, corps) {
    var opts = { body: corps, icon: 'icone-192.png', badge: 'icone-192.png', tag: 'rappel', data: { url: '#/aujourdhui' } };
    if (!window.MathEverydayPC && 'serviceWorker' in navigator) {
      return navigator.serviceWorker.getRegistration().then(function (reg) {
        if (reg && reg.showNotification) return reg.showNotification(titre, opts);
        return direct();
      }).catch(direct);
    }
    return Promise.resolve(direct());
    function direct() {
      var n = new Notification(titre, opts);
      n.onclick = function () { if (window.MathEverydayPC) MathEverydayPC.montrer(); window.focus(); location.hash = '#/aujourdhui'; n.close(); };
    }
  }

  /* ---------- le rappel du jour ---------- */
  function verifier() {
    if (!actifs() || !Store.connecte()) return;
    var st = Store.get();
    if (!st.notif || !st.notif.actif || !st.niveau) return;
    if (lire(CLE_DERNIER) === U.today() || leconFaite(st) || !heureAtteinte(st.notif.heure)) return;
    ecrire(CLE_DERNIER, U.today());
    partagerEtat();
    var prenom = st.profil && st.profil.nom ? st.profil.nom : '';
    notifier('Ta leçon du jour t\'attend', (prenom ? prenom + ', tes' : 'Tes') + ' 3 leçons sont prêtes : 30 minutes et c\'est bouclé.');
  }
  /* état lu par le service worker pour les rappels en arrière-plan (Android) */
  function partagerEtat() {
    if (!('caches' in window) || !Store.connecte()) return;
    var st = Store.get();
    var etat = { actif: actifs() && !!(st.notif && st.notif.actif) && !!st.niveau, heure: (st.notif && st.notif.heure) || '17:30', fait: leconFaite(st) ? U.today() : null, dernier: lire(CLE_DERNIER), prenom: st.profil ? st.profil.nom : '' };
    caches.open(CACHE).then(function (c) { return c.put('etat', new Response(JSON.stringify(etat), { headers: { 'Content-Type': 'application/json' } })); }).catch(function () { /* rien */ });
  }
  function arrierePlan() {
    if (!('serviceWorker' in navigator) || window.MathEverydayPC) return;
    navigator.serviceWorker.ready.then(function (reg) {
      if (!reg.periodicSync) return;
      return navigator.permissions.query({ name: 'periodic-background-sync' }).then(function (p) {
        if (p.state === 'granted') return reg.periodicSync.register('rappel', { minInterval: 60 * 60 * 1000 });
      });
    }).catch(function () { /* pas accordé : le rappel partira quand l'appli est ouverte */ });
  }

  /* ---------- demander l'autorisation ---------- */
  function demander() {
    if (!supporte()) { toast('Cet appareil ne permet pas les notifications. Sur iPhone : iOS 16.4 ou plus récent, appli ouverte depuis son icône.'); return Promise.resolve(false); }
    var p = Notification.permission === 'default' ? Notification.requestPermission() : Promise.resolve(Notification.permission);
    return Promise.resolve(p).then(function (r) {
      if (r === 'granted') {
        ecrire(CLE_CHOIX, 'oui'); partagerEtat(); arrierePlan();
        var st = Store.get();
        if (st.notif && !st.notif.actif) { st.notif.actif = true; Store.save(); }
        toast('Rappels activés : chaque jour à ' + ((st.notif && st.notif.heure) || '17:30') + ' si ta leçon n\'est pas faite.');
        return true;
      }
      ecrire(CLE_CHOIX, 'non');
      toast(r === 'denied' ? 'Notifications bloquées. Tu peux les réactiver dans les réglages de ton appareil.' : 'D\'accord, pas de rappels pour l\'instant.');
      return false;
    });
  }
  /* fenêtre d'explication, une fois par session, sur la page du jour */
  function proposer() {
    if (proposeCetteFois || !supporte() || !Store.connecte() || !Store.get().niveau) return;
    var choix = lire(CLE_CHOIX);
    if (choix === 'oui' && permission() === 'granted') return;
    if (choix === 'non' && permission() !== 'default') return;
    if (choix && /^\d{4}-/.test(choix) && (Date.now() - new Date(choix).getTime()) < 3 * 86400000) return;
    if (permission() === 'denied') return;
    proposeCetteFois = true;
    setTimeout(function () {
      if (!/^#\/aujourdhui/.test(location.hash) || document.querySelector('#modal:not([hidden])')) return;
      var h = (Store.get().notif && Store.get().notif.heure) || '17:30';
      Modal.ouvrir('<div class="rap-modal"><span class="rap-ic">' + I('bell') + '</span>' +
        '<h2 id="modal-title">Un petit rappel chaque jour ?</h2>' +
        '<p class="muted">Math Everyday te prévient à <b>' + U.esc(h) + '</b> si ta leçon du jour n\'est pas encore faite. Une seule notification par jour, jamais de pub.</p>' +
        '<div class="btn-row"><button class="btn btn-lg" type="button" id="rap-oui">' + I('bell') + 'Autoriser les notifications</button>' +
        '<button class="btn btn-2" type="button" id="rap-tard" data-close>Plus tard</button></div>' +
        '<p class="small muted" style="margin:12px 0 0">Tu peux changer l\'heure ou couper les rappels dans Réglages.</p></div>');
      U.$('#rap-oui').onclick = function () { Modal.fermer(); demander(); };
      U.$('#rap-tard').addEventListener('click', function () { ecrire(CLE_CHOIX, new Date().toISOString().slice(0, 10)); });
    }, 1200);
  }

  /* bloc pour la page Réglages */
  function blocReglages() {
    var p = permission(), etat;
    if (p === 'unsupported') etat = '<span class="muted">Non disponible sur cet appareil.</span>';
    else if (actifs()) etat = '<span class="rap-on">' + I('check') + 'Activées sur cet appareil</span> <button class="btn btn-ghost btn-sm" type="button" id="rap-test">Tester</button> <button class="btn btn-ghost btn-sm" type="button" id="rap-couper">Couper</button>';
    else if (p === 'denied') etat = '<span class="muted">Bloquées par l\'appareil : autorise Math Everyday dans les réglages de notifications de ton téléphone ou de Windows.</span>';
    else etat = '<button class="btn btn-sm" type="button" id="rap-activer">' + I('bell') + 'Autoriser les notifications</button>';
    return '<div class="field rap-reg"><label>Notifications sur cet appareil</label><div class="rap-etat">' + etat + '</div></div>';
  }
  function brancher(main, rafraichir) {
    var a = U.$('#rap-activer', main); if (a) a.onclick = function () { demander().then(rafraichir); };
    var c = U.$('#rap-couper', main); if (c) c.onclick = function () { ecrire(CLE_CHOIX, 'non'); partagerEtat(); toast('Rappels coupés sur cet appareil.'); rafraichir(); };
    var t = U.$('#rap-test', main); if (t) t.onclick = function () { notifier('Math Everyday', 'Les rappels marchent : à demain !'); };
  }

  /* vérification chaque minute (résiste à la mise en veille et aux changements d'heure) */
  setInterval(verifier, 60 * 1000);
  setTimeout(verifier, 5000);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') verifier(); else partagerEtat(); });
  var apres = Store.apresSauvegarde;
  Store.apresSauvegarde = function () { if (apres) apres.apply(this, arguments); partagerEtat(); };
  if (actifs()) arrierePlan();

  window.Rappels = { proposer: proposer, demander: demander, actifs: actifs, blocReglages: blocReglages, brancher: brancher, notifier: notifier, verifier: verifier };
})();
