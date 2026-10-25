/* Math Everyday — synchronisation des comptes avec le nuage (Firebase).
   Quand le nuage est actif, les fonctions de compte de Store passent par Cloud, la progression est
   envoyée en ligne quelques secondes après chaque changement et récupérée à la connexion.
   Cahier en ligne (abonnés) : les notes voyagent avec la progression et le brouillon (dessins) dans
   cahiers/{uid}. Sans abonnement, notes et brouillon restent sur l'appareil. Expose window.Synchro. */
(function () {
  'use strict';
  if (!window.Cloud || !Cloud.actif) { window.Synchro = { actif: false }; return; }

  var local = {
    creerCompte: Store.creerCompte, connexion: Store.connexion, deconnexion: Store.deconnexion,
    changerMdp: Store.changerMdp, changerMail: Store.changerMail, supprimerCompte: Store.supprimerCompte
  };
  var timer = null, enCours = false, application = false, occupe = false, codeEnCours = null;
  /* pendant une inscription ou une connexion lancée par l'élève, on ignore l'écouteur de session */
  function operation(p) { occupe = true; return p.then(function (v) { occupe = false; return v; }, function (e) { occupe = false; throw e; }); }
  var ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  function sansBrouillon(d) { var c = Object.assign({}, d); delete c.brouillon; if (!d.premium) delete c.notes; return c; }
  var dernierCahier = null, cahierTropGros = false;
  function pousserCahier(u, d) {
    if (!d.premium || !d.brouillon) return Promise.resolve();
    var json = JSON.stringify(d.brouillon);
    if (json === dernierCahier) return Promise.resolve();
    if (json.length > 900000) { if (!cahierTropGros) { cahierTropGros = true; toast('Brouillon trop lourd pour le cahier en ligne : supprime quelques pages pour le synchroniser.'); } return Promise.resolve(); }
    cahierTropGros = false;
    return Cloud.ecrire('cahiers/' + u.uid, { json: json, maj: Date.now() }).then(function () { dernierCahier = json; });
  }
  /* fusion des notes : on garde chaque note, dans sa version la plus récente */
  function fusionNotes(a, b) {
    var m = {};
    (a || []).concat(b || []).forEach(function (n) { if (n && n.id && (!m[n.id] || (n.modif || '') > (m[n.id].modif || ''))) m[n.id] = n; });
    return Object.keys(m).map(function (k) { return m[k]; });
  }
  function brouillonVide(b) { return !b || !b.pages || b.pages.every(function (p) { return !p.traits || !p.traits.length; }); }
  function lundi() { return Progres.semaine().lundi; }
  function profilPublic(d) {
    var faites = {};
    Object.keys(d.faites || {}).forEach(function (k) { var f = d.faites[k]; faites[k.replace(/\./g, '_')] = f.best != null ? f.best : f.score; });
    var sem = Progres.semaine();
    return {
      nom: d.profil ? d.profil.nom : '', code: d.codeAmi || null, niveau: d.niveau || null,
      xp: d.xp || 0, semaine: sem.lundi, xpSemaine: sem.xp, serie: Progres.serie(), nbLecons: Object.keys(d.faites || {}).length,
      faites: faites, prof: !!d.prof, premium: !!d.premium, maj: Date.now()
    };
  }
  function pousser() {
    clearTimeout(timer); timer = null;
    var u = Cloud.utilisateur(), d = Store.get();
    if (!u || !d.uid || d.uid !== u.uid || enCours) return Promise.resolve();
    enCours = true;
    return Promise.all([
      Cloud.ecrire('users/' + u.uid, { json: JSON.stringify(sansBrouillon(d)), maj: d._maj || Date.now() }),
      Cloud.ecrire('publics/' + u.uid, profilPublic(d), true),
      pousserCahier(u, d)
    ]).then(function () { enCours = false; etat('ok'); }, function (e) { enCours = false; etat('erreur', e); });
  }
  function planifier() { if (application) return; clearTimeout(timer); timer = setTimeout(pousser, 2500); etat('attente'); }
  var dernierEtat = null;
  function etat(e, err) { dernierEtat = e; var z = document.getElementById('synchro'); if (z) z.textContent = e === 'ok' ? 'Synchronisé' : e === 'attente' ? 'Synchronisation…' : 'Hors ligne : enregistré sur l\'appareil'; if (err && window.console) console.warn('Synchro :', err.code || err.message); }

  /* Code ami unique, réservé dans codes/{code}. */
  function assurerCode(uid) {
    var d = Store.get();
    if (d.codeAmi) return Promise.resolve(d.codeAmi);
    if (codeEnCours) return codeEnCours;
    codeEnCours = essai(0).then(function (c) { codeEnCours = null; return c; }, function (e) { codeEnCours = null; throw e; });
    return codeEnCours;
    function essai(n) {
      var code = 'PHI-'; for (var i = 0; i < 5; i++) code += ALPHA[Math.floor(Math.random() * ALPHA.length)];
      return Cloud.creer('codes/' + code, { uid: uid }).then(function () { Store.get().codeAmi = code; Store.save(); return code; }, function (e) { if (n > 4) throw e; return essai(n + 1); });
    }
  }
  function initialiserPublic(uid) {
    return Cloud.lire('publics/' + uid).then(function (p) {
      var d = Store.get();
      if (p && p.code && !d.codeAmi) { d.codeAmi = p.code; }
      if (!p) return Cloud.ecrire('publics/' + uid, Object.assign(profilPublic(d), { amis: [], classes: [] })).then(function () { return assurerCode(uid); }).then(pousser);
      return assurerCode(uid).then(pousser);
    });
  }
  /* Récupère les données en ligne et les applique si elles sont plus récentes que celles de l'appareil. */
  function tirer(u, forcer) {
    return Cloud.lire('users/' + u.uid).then(function (doc) {
      var loc = Store._local(u.mail);
      var brouillon = loc && loc.brouillon;
      var data;
      if (doc && doc.json) {
        var distant = JSON.parse(doc.json);
        if (!forcer && loc && loc.uid === u.uid && (loc._maj || 0) > (doc.maj || 0)) data = loc;
        else {
          data = distant;
          if (brouillon) data.brouillon = brouillon;
          var memeCompte = loc && (!loc.uid || loc.uid === u.uid);
          if (memeCompte && loc.notes) data.notes = distant.premium ? fusionNotes(distant.notes, loc.notes) : loc.notes;
        }
      } else if (loc && (!loc.uid || loc.uid === u.uid)) data = loc;
      else data = Store._defaut();
      data.uid = u.uid;
      data.profil = data.profil || { nom: u.nom || u.mail.split('@')[0], mail: u.mail, cree: U.today() };
      data.profil.mail = u.mail;
      application = true;
      Store._activer(u.mail, data, { uid: u.uid });
      application = false;
      return Promise.all([initialiserPublic(u.uid), tirerCahier(u, data)]);
    });
  }
  /* Nouvel appareil : on récupère le brouillon en ligne si celui de l'appareil est vide. */
  function tirerCahier(u, data) {
    if (!data.premium || !brouillonVide(data.brouillon)) return Promise.resolve();
    return Cloud.lire('cahiers/' + u.uid).then(function (doc) {
      if (!doc || !doc.json) return;
      var d = Store.get(); d.brouillon = JSON.parse(doc.json); dernierCahier = doc.json;
      application = true; Store.save(true); application = false;
    }).catch(function () { /* hors ligne : on réessaiera */ });
  }

  /* ---------------- Remplacement des fonctions de compte ---------------- */
  Store.creerCompte = function (infos) {
    var mail = infos.mail.trim().toLowerCase();
    return operation(Cloud.inscrire(mail, infos.mdp, infos.nom).then(function (u) {
      var d = Store._defaut();
      d.uid = u.uid; d.profil = { nom: infos.nom, mail: mail, cree: U.today() }; d.classe = infos.classe; d.notif = infos.notif;
      application = true; Store._activer(mail, d, { uid: u.uid }); application = false;
      return initialiserPublic(u.uid);
    }, function (e) { throw new Error(Cloud.message(e)); }));
  };
  Store.connexion = function (mail, mdp) {
    return operation(Cloud.connexion(mail.trim().toLowerCase(), mdp).then(function (u) { return tirer(u, true); }, function (e) { var x = new Error(Cloud.message(e)); x.cloud = true; throw x; }));
  };
  Store.deconnexion = function () {
    pousser();
    Cloud.deconnexion().catch(function () { /* déjà déconnecté */ });
    Store._quitter();
  };
  Store.changerMdp = function (ancien, nouveau) { return Cloud.changerMdp(ancien, nouveau).catch(function (e) { throw new Error(Cloud.message(e)); }); };
  Store.changerMail = function (nouveau) {
    nouveau = nouveau.trim().toLowerCase();
    if (nouveau === Store.get().profil.mail) return true;
    Cloud.changerMail(nouveau).then(function () { toast('Lien de confirmation envoyé à ' + nouveau + '. Ton e-mail changera une fois le lien validé.'); }, function (e) { toast(Cloud.message(e)); });
    return true;
  };
  Store.supprimerCompte = function (mdp) {
    var u = Cloud.utilisateur(), d = Store.get();
    if (!u) { local.supprimerCompte(); return Promise.resolve(); }
    var nettoyage = [Cloud.effacer('users/' + u.uid), Cloud.effacer('publics/' + u.uid), Cloud.effacer('cahiers/' + u.uid)];
    if (d.codeAmi) nettoyage.push(Cloud.effacer('codes/' + d.codeAmi));
    return Cloud.appel('reauth', mdp).catch(function (e) { throw new Error(Cloud.message(e)); })
      .then(function () { return Promise.all(nettoyage.map(function (p) { return p.catch(function () { /* déjà absent */ }); })); })
      .then(function () { return Cloud.supprimerCompte(mdp); })
      .then(function () { local.supprimerCompte(); });
  };
  Store.apresSauvegarde = function () { planifier(); };
  Store.motDePasseOublie = function (mail) { return Cloud.reinitialiser(mail.trim().toLowerCase()).catch(function (e) { throw new Error(Cloud.message(e)); }); };

  /* ---------------- Session au chargement ---------------- */
  var premier = true;
  Cloud.surEtat(function (u) {
    if (occupe) { premier = false; return; }
    var d = Store.get();
    if (u) {
      if (!Store.connecte() || d.uid !== u.uid) { tirer(u, false).then(function () { window.dispatchEvent(new HashChangeEvent('hashchange')); }); }
      else if (premier) { tirer(u, false).then(function () { if (Store.get()._maj) window.dispatchEvent(new HashChangeEvent('hashchange')); }); }
    } else if (Store.connecte() && d.uid) {
      Store._quitter();
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
    premier = false;
  });
  Cloud.pret().catch(function (e) { etat('erreur', e); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden' && timer) pousser(); });
  window.addEventListener('pagehide', function () { if (timer) pousser(); });

  window.Synchro = { actif: true, pousser: pousser, tirer: tirer, etat: function () { return dernierEtat; }, profilPublic: profilPublic };
})();
