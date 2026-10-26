/* Math Everyday — vérification de l'adresse e-mail (comptes en ligne).
   Après l'inscription, Firebase envoie un lien ; cette page attend le clic : elle relit le compte toutes
   les 3 s (et dès que l'on revient sur l'onglet) et connecte l'élève tout de suite quand c'est fait.
   Page #/verifier. Expose window.Verification. */
(function () {
  'use strict';
  var minuterie = null, attenteRenvoi = 0;

  function arreter() { if (minuterie) { clearInterval(minuterie); minuterie = null; } }
  function suite() {
    var st = Store.get();
    location.hash = st.niveau ? '#/aujourdhui' : '#/test';
  }
  function verifiee(main) {
    arreter();
    var z = U.$('#vf-etat', main);
    if (z) z.innerHTML = '<span class="vf-ok">' + I('check') + 'Adresse vérifiée, connexion…</span>';
    return Synchro.apresVerification().then(function () {
      toast('Adresse vérifiée : bienvenue sur Math Everyday !');
      Synchro.pousser();
      setTimeout(suite, 700);
    });
  }
  function controler(main) {
    if (location.hash !== '#/verifier') { arreter(); return; }
    Cloud.actualiser().then(function (v) { if (v) verifiee(main); }).catch(function () { /* hors ligne : on réessaie */ });
  }

  function page(main) {
    arreter();
    var st = Store.get(), u = Cloud.utilisateur();
    if (!st.profil || !u) { location.hash = '#/compte'; return; }
    if (Cloud.verifie()) { suite(); return; }
    var mail = U.esc(u.mail || st.profil.mail || '');
    main.innerHTML = '<section class="page"><div class="wrap wrap-narrow"><div class="card vf">' +
      '<div class="vf-ic">' + I('mail') + '</div>' +
      '<h1>Vérifie ton adresse e-mail</h1>' +
      '<p class="vf-txt">On vient d\'envoyer un lien à <b>' + mail + '</b>. Clique dessus : ton compte se connecte ici <b>tout seul</b>, sans rien retaper.</p>' +
      '<div id="vf-etat" class="vf-etat"><span class="vf-attente"><i></i><i></i><i></i></span>En attente de la vérification…</div>' +
      '<ul class="vf-aide"><li>' + I('clock') + '<span>Le mail arrive en général en moins d\'une minute.</span></li>' +
      '<li>' + I('bulb') + '<span>Rien reçu ? Regarde dans <b>Spam</b> ou <b>Promotions</b>.</span></li>' +
      '<li>' + I('shield') + '<span>Cette vérification protège ton compte : personne ne peut s\'inscrire avec ton adresse.</span></li></ul>' +
      '<div class="btn-row vf-actions"><button class="btn" type="button" id="vf-renvoyer">' + I('refresh') + 'Renvoyer l\'e-mail</button>' +
      '<button class="btn btn-ghost" type="button" id="vf-autre">Changer d\'adresse</button></div>' +
      (Cloud.faux ? '<p class="small muted" style="margin-top:18px">Test local : <button class="btn btn-2 btn-sm" type="button" id="vf-faux">Simuler le clic sur le lien</button></p>' : '') +
      '</div></div></section>';
    var renv = U.$('#vf-renvoyer', main);
    function decompte() {
      var reste = Math.ceil((attenteRenvoi - Date.now()) / 1000);
      if (reste > 0) { renv.disabled = true; renv.lastChild.textContent = 'Renvoyer dans ' + reste + ' s'; setTimeout(decompte, 1000); }
      else { renv.disabled = false; renv.lastChild.textContent = 'Renvoyer l\'e-mail'; }
    }
    renv.onclick = function () {
      Cloud.envoyerVerification().then(function () {
        toast('Nouvel e-mail envoyé à ' + (u.mail || ''));
        attenteRenvoi = Date.now() + 60000; decompte();
      }, function (e) { toast(Cloud.message(e)); });
    };
    if (attenteRenvoi > Date.now()) decompte();
    U.$('#vf-autre', main).onclick = function () {
      arreter();
      Store.deconnexion();
      location.hash = '#/compte';
      toast('Crée ton compte avec la bonne adresse.');
    };
    var f = U.$('#vf-faux', main);
    if (f) f.onclick = function () { Cloud.validerFaux().then(function () { controler(main); }); };
    minuterie = setInterval(function () { controler(main); }, 3000);
    controler(main);
  }
  /* retour sur l'onglet (après avoir cliqué dans la messagerie) : on vérifie tout de suite */
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && location.hash === '#/verifier') controler(document.getElementById('main'));
  });

  window.Verification = { page: page, arreter: arreter };
})();
