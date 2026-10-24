/* Math Everyday — couche « nuage » : comptes en ligne et base de données.
   Deux moteurs interchangeables :
   - Firebase (Authentication + Firestore), chargé depuis gstatic quand config.js contient firebaseConfig ;
   - un faux nuage local (localStorage), activé sur localhost avec ?fauxcloud=1, pour tester sans vrais comptes.
   Les données privées de l'élève sont dans users/{uid} (JSON), son profil visible par les autres dans publics/{uid}.
   Expose window.Cloud. */
(function () {
  'use strict';
  var VERSION_SDK = '10.12.2';
  var cfg = (window.ME_CONFIG || {}).firebase;
  var faux = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) && /[?&]fauxcloud=1/.test(location.search);
  var moteur = null, pret = null, utilisateur = null, abonnes = [];

  /* ---------------- Moteur Firebase ---------------- */
  function moteurFirebase() {
    var base = 'https://www.gstatic.com/firebasejs/' + VERSION_SDK + '/';
    return Promise.all([import(base + 'firebase-app.js'), import(base + 'firebase-auth.js'), import(base + 'firebase-firestore.js')]).then(function (m) {
      var A = m[0], Au = m[1], F = m[2];
      var app = A.initializeApp(cfg);
      var auth = Au.getAuth(app);
      Au.setPersistence(auth, Au.browserLocalPersistence).catch(function () { /* persistance par défaut */ });
      var db = F.getFirestore(app);
      function ref(chemin) { return F.doc.apply(null, [db].concat(chemin.split('/'))); }
      function donnees(s) { var d = s.data(); d.id = s.id; return d; }
      return {
        nom: 'firebase',
        inscrire: function (mail, mdp, nom) { return Au.createUserWithEmailAndPassword(auth, mail, mdp).then(function (c) { return Au.updateProfile(c.user, { displayName: nom }).then(function () { return { uid: c.user.uid, mail: c.user.email }; }); }); },
        connexion: function (mail, mdp) { return Au.signInWithEmailAndPassword(auth, mail, mdp).then(function (c) { return { uid: c.user.uid, mail: c.user.email }; }); },
        deconnexion: function () { return Au.signOut(auth); },
        reinitialiser: function (mail) { return Au.sendPasswordResetEmail(auth, mail); },
        reauth: function (mdp) { return Au.reauthenticateWithCredential(auth.currentUser, Au.EmailAuthProvider.credential(auth.currentUser.email, mdp)); },
        changerMdp: function (ancien, nouveau) { var self = this; return self.reauth(ancien).then(function () { return Au.updatePassword(auth.currentUser, nouveau); }); },
        changerMail: function (nouveau) { return Au.verifyBeforeUpdateEmail(auth.currentUser, nouveau); },
        supprimerCompte: function (mdp) { var self = this; return self.reauth(mdp).then(function () { return Au.deleteUser(auth.currentUser); }); },
        surEtat: function (cb) { Au.onAuthStateChanged(auth, function (u) { cb(u ? { uid: u.uid, mail: u.email, nom: u.displayName } : null); }); },
        lire: function (chemin) { return F.getDoc(ref(chemin)).then(function (s) { return s.exists() ? donnees(s) : null; }); },
        ecrire: function (chemin, obj, fusion) { return F.setDoc(ref(chemin), obj, fusion ? { merge: true } : undefined); },
        creer: function (chemin, obj) { return F.runTransaction(db, function (t) { return t.get(ref(chemin)).then(function (s) { if (s.exists()) throw new Error('existe'); t.set(ref(chemin), obj); }); }); },
        maj: function (chemin, obj) { return F.updateDoc(ref(chemin), obj); },
        effacer: function (chemin) { return F.deleteDoc(ref(chemin)); },
        ajouterA: function (chemin, champ, v) { var o = {}; o[champ] = F.arrayUnion(v); return F.updateDoc(ref(chemin), o); },
        retirerDe: function (chemin, champ, v) { var o = {}; o[champ] = F.arrayRemove(v); return F.updateDoc(ref(chemin), o); },
        nouvelId: function (col) { return F.doc(F.collection(db, col)).id; },
        requete: function (col, conds, tri, limite) {
          var parts = (conds || []).map(function (c) { return F.where(c[0], c[1], c[2]); });
          if (tri) parts.push(F.orderBy(tri[0], tri[1] || 'asc'));
          if (limite) parts.push(F.limit(limite));
          return F.getDocs(F.query.apply(null, [F.collection(db, col)].concat(parts))).then(function (r) { return r.docs.map(donnees); });
        }
      };
    });
  }

  /* ---------------- Faux nuage local (tests) ---------------- */
  function moteurFaux() {
    var K = 'mathEveryday.fauxcloud';
    function lireTout() { try { return JSON.parse(localStorage.getItem(K)) || { comptes: {}, docs: {}, session: null }; } catch (e) { return { comptes: {}, docs: {}, session: null }; } }
    function ecrireTout(x) { localStorage.setItem(K, JSON.stringify(x)); }
    function delai(v) { return new Promise(function (res) { setTimeout(function () { res(v); }, 30); }); }
    function err(code) { var e = new Error(code); e.code = code; return Promise.reject(e); }
    var ecoute = null;
    function moi() { return lireTout().session; }
    function acces(chemin, ecriture) {
      /* imitation simplifiée des règles : on ne peut écrire users/{uid} que pour soi */
      var s = moi(); if (!s) return false;
      var p = chemin.split('/');
      if (p[0] === 'users') return p[1] === s.uid;
      return true;
    }
    return Promise.resolve({
      nom: 'faux',
      inscrire: function (mail, mdp, nom) {
        var x = lireTout(); mail = mail.toLowerCase();
        if (x.comptes[mail]) return err('auth/email-already-in-use');
        if (mdp.length < 6) return err('auth/weak-password');
        var uid = 'u' + Math.random().toString(36).slice(2, 12);
        x.comptes[mail] = { uid: uid, mdp: mdp, nom: nom }; x.session = { uid: uid, mail: mail, nom: nom }; ecrireTout(x);
        if (ecoute) ecoute(x.session);
        return delai({ uid: uid, mail: mail });
      },
      connexion: function (mail, mdp) {
        var x = lireTout(), c = x.comptes[mail.toLowerCase()];
        if (!c || c.mdp !== mdp) return err('auth/invalid-credential');
        x.session = { uid: c.uid, mail: mail.toLowerCase(), nom: c.nom }; ecrireTout(x);
        if (ecoute) ecoute(x.session);
        return delai({ uid: c.uid, mail: mail.toLowerCase() });
      },
      deconnexion: function () { var x = lireTout(); x.session = null; ecrireTout(x); if (ecoute) ecoute(null); return delai(); },
      reinitialiser: function (mail) { return lireTout().comptes[mail.toLowerCase()] ? delai() : delai(); },
      changerMdp: function (ancien, nouveau) { var x = lireTout(), s = x.session, c = s && x.comptes[s.mail]; if (!c || c.mdp !== ancien) return err('auth/invalid-credential'); c.mdp = nouveau; ecrireTout(x); return delai(); },
      changerMail: function () { return delai(); },
      supprimerCompte: function (mdp) { var x = lireTout(), s = x.session, c = s && x.comptes[s.mail]; if (!c || c.mdp !== mdp) return err('auth/invalid-credential'); delete x.comptes[s.mail]; x.session = null; ecrireTout(x); return delai(); },
      surEtat: function (cb) { ecoute = cb; setTimeout(function () { cb(moi()); }, 20); },
      lire: function (chemin) { var d = lireTout().docs[chemin]; return delai(d ? Object.assign({ id: chemin.split('/').pop() }, JSON.parse(JSON.stringify(d))) : null); },
      ecrire: function (chemin, obj, fusion) { if (!acces(chemin, true)) return err('permission-denied'); var x = lireTout(); x.docs[chemin] = fusion ? Object.assign({}, x.docs[chemin] || {}, obj) : obj; ecrireTout(x); return delai(); },
      creer: function (chemin, obj) { var x = lireTout(); if (x.docs[chemin]) return Promise.reject(new Error('existe')); x.docs[chemin] = obj; ecrireTout(x); return delai(); },
      maj: function (chemin, obj) {
        var x = lireTout(), d = x.docs[chemin]; if (!d) return err('not-found');
        Object.keys(obj).forEach(function (k) { var p = k.split('.'), o = d; for (var i = 0; i < p.length - 1; i++) { o[p[i]] = o[p[i]] || {}; o = o[p[i]]; } o[p[p.length - 1]] = obj[k]; });
        ecrireTout(x); return delai();
      },
      effacer: function (chemin) { var x = lireTout(); delete x.docs[chemin]; ecrireTout(x); return delai(); },
      ajouterA: function (chemin, champ, v) { var x = lireTout(), d = x.docs[chemin]; if (!d) return err('not-found'); d[champ] = d[champ] || []; if (d[champ].indexOf(v) < 0) d[champ].push(v); ecrireTout(x); return delai(); },
      retirerDe: function (chemin, champ, v) { var x = lireTout(), d = x.docs[chemin]; if (!d) return err('not-found'); d[champ] = (d[champ] || []).filter(function (y) { return y !== v; }); ecrireTout(x); return delai(); },
      nouvelId: function () { return 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); },
      requete: function (col, conds, tri, limite) {
        var x = lireTout(), res = [];
        for (var k in x.docs) {
          var p = k.split('/'); if (p.length !== 2 || p[0] !== col) continue;
          var d = Object.assign({ id: p[1] }, x.docs[k]);
          if ((conds || []).every(function (c) { var v = d[c[0]]; return c[1] === '==' ? v === c[2] : c[1] === 'array-contains' ? (v || []).indexOf(c[2]) >= 0 : c[1] === 'in' ? c[2].indexOf(v) >= 0 : true; })) res.push(d);
        }
        if (tri) res.sort(function (a, b) { var u = a[tri[0]] || 0, v = b[tri[0]] || 0; return tri[1] === 'desc' ? v - u : u - v; });
        return delai(limite ? res.slice(0, limite) : res);
      }
    });
  }

  /* ---------------- API ---------------- */
  var MESSAGES = {
    'auth/email-already-in-use': 'Un compte existe déjà avec cet e-mail. Connecte-toi.',
    'auth/invalid-email': 'Cette adresse e-mail ne semble pas valide.',
    'auth/weak-password': 'Mot de passe trop faible (au moins 8 caractères).',
    'auth/invalid-credential': 'E-mail ou mot de passe incorrect.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/user-not-found': 'Aucun compte avec cet e-mail.',
    'auth/too-many-requests': 'Trop d\'essais. Réessaie dans quelques minutes.',
    'auth/network-request-failed': 'Pas de connexion internet.',
    'auth/requires-recent-login': 'Reconnecte-toi puis réessaie.',
    'auth/unauthorized-domain': 'Ce site n\'est pas encore autorisé dans Firebase (domaines autorisés).',
    'permission-denied': 'Accès refusé par les règles de sécurité.'
  };
  var Cloud = {
    actif: !!(cfg || faux),
    faux: faux,
    message: function (e) { var c = e && (e.code || e.message); return MESSAGES[c] || (c && /permission/i.test(c) ? MESSAGES['permission-denied'] : 'Une erreur est survenue (' + (c || 'inconnue') + ').'); },
    pret: function () {
      if (!Cloud.actif) return Promise.reject(new Error('inactif'));
      if (!pret) pret = (faux ? moteurFaux() : moteurFirebase()).then(function (m) {
        moteur = m;
        m.surEtat(function (u) { utilisateur = u; abonnes.forEach(function (cb) { try { cb(u); } catch (e) { /* abonné fautif */ } }); });
        return m;
      });
      return pret;
    },
    moteur: function () { return moteur; },
    utilisateur: function () { return utilisateur; },
    surEtat: function (cb) { abonnes.push(cb); if (moteur) cb(utilisateur); },
    /* raccourcis qui attendent le chargement */
    appel: function (nom) { var args = [].slice.call(arguments, 1); return Cloud.pret().then(function (m) { return m[nom].apply(m, args); }); }
  };
  ['inscrire', 'connexion', 'deconnexion', 'reinitialiser', 'changerMdp', 'changerMail', 'supprimerCompte', 'lire', 'ecrire', 'creer', 'maj', 'effacer', 'ajouterA', 'retirerDe', 'requete'].forEach(function (n) {
    Cloud[n] = function () { return Cloud.appel.apply(null, [n].concat([].slice.call(arguments))); };
  });
  Cloud.nouvelId = function (col) { return moteur ? moteur.nouvelId(col) : 'd' + Date.now().toString(36); };
  window.Cloud = Cloud;
})();
