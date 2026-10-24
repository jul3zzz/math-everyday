/* Math Everyday — fonctions en ligne : amis (code ami), classements, défis entre amis,
   classes (élèves) et espace professeur (classes, devoirs, résultats). Nécessite le nuage (Cloud).
   Expose window.Social. */
(function () {
  'use strict';
  var esc = U.esc;
  var ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  function page(inner, narrow) { return '<section class="page"><div class="wrap' + (narrow ? ' wrap-narrow' : '') + '">' + inner + '</div></section>'; }
  function chipNiv(nid) { var n = niv(nid); return n ? '<span class="chip chip-lvl lv-' + nid + '">' + n.nom + '</span>' : ''; }
  function moi() { var u = window.Cloud && Cloud.utilisateur(); return u && Store.get().uid === u.uid ? u : null; }
  function charge(main, titre) { main.innerHTML = page('<span class="eyebrow">' + esc(titre) + '</span><p class="muted">Chargement…</p>'); }
  function horsLigne(main, titre) {
    if (!window.Cloud || !Cloud.actif) { main.innerHTML = page('<span class="eyebrow">' + esc(titre) + '</span><div class="card center">' + Mascotte.bulle('Cette partie demande les comptes en ligne, qui ne sont pas activés sur cette version du site.', 'pense') + '</div>', true); return true; }
    if (!Store.connecte()) { location.hash = '#/compte/connexion'; return true; }
    if (!moi()) {
      main.innerHTML = page('<span class="eyebrow">' + esc(titre) + '</span><div class="card center">' + Mascotte.bulle('Connexion au serveur… Si ce message reste affiché, vérifie ta connexion internet puis recharge la page.', 'pense') + '</div>', true);
      var h = location.hash;
      Cloud.pret().then(function () { setTimeout(function () { if (moi() && location.hash === h) window.dispatchEvent(new HashChangeEvent('hashchange')); }, 900); }, function () { /* hors ligne */ });
      return true;
    }
    return false;
  }
  function erreur(main, e) {
    main.innerHTML = page('<div class="card center">' + Mascotte.bulle('Impossible de charger ces informations : ' + esc(Cloud.message(e)), 'pense') + '<button class="btn" type="button" id="so-reessai">Réessayer</button></div>', true);
    U.$('#so-reessai', main).onclick = function () { window.dispatchEvent(new HashChangeEvent('hashchange')); };
  }
  function code(prefixe) { var c = prefixe; for (var i = 0; i < 5; i++) c += ALPHA[Math.floor(Math.random() * ALPHA.length)]; return c; }
  function copier(t) { if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { toast('Copié : ' + t); }); else toast(t); }
  function xpSemaine(p) { return p && p.semaine === Progres.semaine().lundi ? (p.xpSemaine || 0) : 0; }
  function lirePublics(uids) { return Promise.all(uids.map(function (u) { return Cloud.lire('publics/' + u).then(function (p) { if (p) p.uid = u; return p; }, function () { return null; }); })).then(function (l) { return l.filter(Boolean); }); }

  /* ============================================================
     Amis, classements, défis
     ============================================================ */
  function vAmis(main) {
    if (horsLigne(main, 'Amis')) return;
    var u = moi(), st = Store.get();
    charge(main, 'Amis');
    Synchro.pousser();
    Promise.all([
      Cloud.lire('publics/' + u.uid),
      Cloud.requete('publics', [], ['xp', 'desc'], 30).catch(function () { return []; }),
      Cloud.requete('duels', [['a', '==', u.uid]]).catch(function () { return []; }),
      Cloud.requete('duels', [['de', '==', u.uid]]).catch(function () { return []; })
    ]).then(function (r) {
      var mien = r[0] || {}, general = r[1].filter(function (p) { return p.visible !== false; }).slice(0, 20), duels = r[2].concat(r[3]);
      return lirePublics(mien.amis || []).then(function (amis) { rendre(mien, amis, general, duels); });
    }).catch(function (e) { erreur(main, e); });

    function rendre(mien, amis, general, duels) {
      mien.uid = u.uid;
      var semaine = amis.concat([mien]).sort(function (a, b) { return xpSemaine(b) - xpSemaine(a); });
      duels.sort(function (a, b) { return (b.cree || 0) - (a.cree || 0); });
      var aJouer = duels.filter(function (d) { return d.a === u.uid && !(d.scores && d.scores[u.uid]); });
      main.innerHTML = page('<span class="eyebrow">Amis</span><h1>Apprendre ensemble</h1>' +
        '<div class="btn-row" style="margin-bottom:18px"><a class="btn btn-2 btn-sm" href="#/classes">' + I('book') + 'Mes classes</a><a class="btn btn-ghost btn-sm" href="#/prof">' + I('user') + 'Espace professeur</a></div>' +
        '<div class="grid g2">' +
        '<div class="card"><h2 style="font-size:1.15rem">Ton code ami</h2><div class="code-ami"><b class="mono">' + esc(st.codeAmi || mien.code || '…') + '</b><button class="btn btn-2 btn-sm" type="button" id="am-copie">Copier</button></div><p class="small muted" style="margin:8px 0 0">Donne-le à tes amis pour qu\'ils t\'ajoutent.</p></div>' +
        '<div class="card"><h2 style="font-size:1.15rem">Ajouter un ami</h2><form class="answer" id="am-f" novalidate><label class="sr" for="am-code">Code ami</label><input class="input mono" id="am-code" placeholder="PHI-XXXXX" maxlength="9" autocomplete="off" style="text-transform:uppercase"><button class="btn" type="submit">Ajouter</button></form><p class="small" id="am-err" style="margin:8px 0 0;color:var(--ko)"></p></div>' +
        '</div>' +
        (aJouer.length ? '<div class="banner" style="margin-top:18px">' + I('target') + '<div class="banner-t"><b>' + aJouer.length + ' défi' + (aJouer.length > 1 ? 's' : '') + ' à relever</b><span>' + aJouer.map(function (d) { return esc(d.deNom || 'Un ami'); }).join(', ') + ' t\'' + (aJouer.length > 1 ? 'ont' : 'a') + ' défié.</span></div><a class="btn btn-2" href="#/duel/' + aJouer[0].id + '">Jouer</a></div>' : '') +
        '<h2 style="margin-top:28px;font-size:1.3rem">Mes amis <span class="muted small">' + amis.length + '</span></h2>' +
        (amis.length ? '<div class="amis">' + amis.map(function (a) {
          return '<div class="card ami">' + Mascotte.svg('content') + '<div class="ami-t"><b>' + esc(a.nom || 'Ami') + '</b><span class="row" style="gap:6px">' + chipNiv(a.niveau) + '<span class="small muted">' + I('flame') + ' ' + (a.serie || 0) + ' j · ' + xpSemaine(a) + ' XP cette semaine · ' + (a.nbLecons || 0) + ' leçons</span></span></div>' +
            '<div class="btn-row"><button class="btn btn-sm" type="button" data-defier="' + a.uid + '" data-nom="' + esc(a.nom || '') + '" data-niv="' + esc(a.niveau || st.niveau) + '">' + I('target') + 'Défier</button><button class="btn btn-ghost btn-sm" type="button" data-retirer="' + a.uid + '">Retirer</button></div></div>';
        }).join('') + '</div>' : '<div class="card card-flat"><p class="muted" style="margin:0">Pas encore d\'amis. Partage ton code ou ajoute celui d\'un ami.</p></div>') +
        '<div class="grid g2" style="margin-top:28px">' +
        '<div class="card"><h2 style="font-size:1.15rem">Classement de la semaine</h2><ol class="classement">' + semaine.map(function (p, i) { return '<li class="' + (p.uid === u.uid ? 'moi' : '') + '"><span class="rang">' + (i + 1) + '</span><span class="cl-n">' + esc(p.nom || '—') + (p.uid === u.uid ? ' (toi)' : '') + '</span><b>' + xpSemaine(p) + ' XP</b></li>'; }).join('') + '</ol><p class="small muted" style="margin:0">Remis à zéro chaque lundi.</p></div>' +
        '<div class="card"><h2 style="font-size:1.15rem">Classement général</h2><ol class="classement">' + general.map(function (p, i) { return '<li class="' + (p.id === u.uid ? 'moi' : '') + '"><span class="rang">' + (i + 1) + '</span><span class="cl-n">' + esc(p.nom || '—') + ' ' + chipNiv(p.niveau) + '</span><b>' + (p.xp || 0) + ' XP</b></li>'; }).join('') + '</ol>' +
        '<label class="switch small" style="margin-top:8px"><input type="checkbox" id="am-visible"' + (st.visible === false ? '' : ' checked') + '> Apparaître dans le classement général</label></div>' +
        '</div>' +
        (duels.length ? '<h2 style="margin-top:28px;font-size:1.3rem">Défis</h2><div class="prog-list">' + duels.slice(0, 20).map(function (d) {
          var moiDe = d.de === u.uid, autre = moiDe ? d.aNom : d.deNom, sm = d.scores && d.scores[u.uid], sa = d.scores && d.scores[moiDe ? d.a : d.de];
          var statut = !sm ? 'À jouer' : !sa ? 'En attente de ' + esc(autre || 'ton ami') : sm.score > sa.score || (sm.score === sa.score && sm.temps < sa.temps) ? 'Gagné ' + sm.score + '-' + sa.score : sm.score === sa.score && sm.temps === sa.temps ? 'Égalité' : 'Perdu ' + sm.score + '-' + sa.score;
          return '<a class="pl" href="#/duel/' + d.id + '"><span class="pl-n">' + I('target') + '</span><span class="pl-t"><b>' + (moiDe ? 'Toi contre ' : '') + esc(autre || 'ami') + (moiDe ? '' : ' contre toi') + '</b><span>' + esc(niv(d.niveau) ? niv(d.niveau).long : '') + ' · ' + statut + '</span></span>' + I('arrow') + '</a>';
        }).join('') + '</div>' : ''));
      U.$('#am-copie', main).onclick = function () { copier(st.codeAmi || mien.code); };
      U.$('#am-visible', main).onchange = function () { st.visible = this.checked; Store.save(); Cloud.ecrire('publics/' + u.uid, { visible: this.checked }, true); };
      U.$('#am-f', main).onsubmit = function (e) {
        e.preventDefault();
        var c = U.$('#am-code', main).value.trim().toUpperCase().replace(/\s/g, ''), er = U.$('#am-err', main);
        if (!/^PHI-[A-Z0-9]{5}$/.test(c)) { er.textContent = 'Un code ami ressemble à PHI-XXXXX.'; return; }
        if (c === st.codeAmi) { er.textContent = 'C\'est ton propre code !'; return; }
        Cloud.lire('codes/' + c).then(function (d) {
          if (!d) throw new Error('Aucun élève avec ce code.');
          if ((mien.amis || []).indexOf(d.uid) >= 0) throw new Error('Vous êtes déjà amis.');
          return Promise.all([Cloud.ajouterA('publics/' + u.uid, 'amis', d.uid), Cloud.ajouterA('publics/' + d.uid, 'amis', u.uid)]);
        }).then(function () { toast('Ami ajouté !'); vAmis(main); }, function (x) { er.textContent = x.code ? Cloud.message(x) : x.message; });
      };
      main.onclick = function (e) {
        var r0 = e.target.closest('[data-retirer]');
        if (r0) { var id = r0.getAttribute('data-retirer'); Promise.all([Cloud.retirerDe('publics/' + u.uid, 'amis', id), Cloud.retirerDe('publics/' + id, 'amis', u.uid).catch(function () { /* profil supprimé */ })]).then(function () { toast('Ami retiré.'); vAmis(main); }); return; }
        var d0 = e.target.closest('[data-defier]');
        if (d0) defier(d0.getAttribute('data-defier'), d0.getAttribute('data-nom'), d0.getAttribute('data-niv'));
      };
    }
  }

  function defier(uid, nom, nivAmi) {
    var st = Store.get();
    Modal.ouvrir('<h2 id="modal-title">Défier ' + esc(nom) + '</h2><p class="muted">10 exercices tirés au hasard, les mêmes pour vous deux. Celui qui en réussit le plus gagne ; en cas d\'égalité, le plus rapide.</p>' +
      '<div class="field"><label for="df-niv">Niveau du défi</label><select class="input" id="df-niv">' + NIVEAUX.map(function (n) { return '<option value="' + n.id + '"' + (n.id === (st.niveau || nivAmi) ? ' selected' : '') + '>' + esc(n.long) + '</option>'; }).join('') + '</select></div>' +
      '<div class="btn-row" style="margin-top:16px"><button class="btn" type="button" id="df-go">' + I('target') + 'Lancer le défi</button><button class="btn btn-2" type="button" data-close>Annuler</button></div>');
    U.$('#df-go').onclick = function () {
      var n = U.$('#df-niv').value, u = moi();
      var L = U.shuffle(LECONS.filter(function (l) { return l.niveau === n; })), exos = [];
      for (var i = 0; i < 10; i++) { var l = L[i % L.length], g = GENERATEURS[l.id]; exos.push({ l: l.id, e: g ? g() : l.exos[0] }); }
      var id = Cloud.nouvelId('duels');
      this.disabled = true;
      Cloud.ecrire('duels/' + id, { de: u.uid, deNom: st.profil.nom, a: uid, aNom: nom, niveau: n, exos: JSON.stringify(exos), scores: {}, cree: Date.now() })
        .then(function () { Modal.fermer(); location.hash = '#/duel/' + id; }, function (e) { Modal.fermer(); toast(Cloud.message(e)); });
    };
  }

  function vDuel(main, id) {
    if (horsLigne(main, 'Défi')) return;
    var u = moi();
    charge(main, 'Défi');
    Cloud.lire('duels/' + id).then(function (d) {
      if (!d) { main.innerHTML = page('<p>Ce défi n\'existe plus.</p><a class="btn" href="#/amis">Amis</a>', true); return; }
      var exos = JSON.parse(d.exos), moiDe = d.de === u.uid, adv = moiDe ? d.aNom : d.deNom, advUid = moiDe ? d.a : d.de;
      var sm = d.scores && d.scores[u.uid], sa = d.scores && d.scores[advUid];
      if (sm) return resultat(d, exos, sm, sa, adv);
      main.innerHTML = page('<span class="eyebrow">Défi</span><h1>Toi contre ' + esc(adv || 'ton ami') + '</h1>' + chipNiv(d.niveau) +
        '<div class="card" style="margin-top:16px"><ul class="retenir"><li>' + I('pencil') + '<span><b>10 exercices</b>, les mêmes pour vous deux.</span></li><li>' + I('clock') + '<span>Le chrono tourne dès que tu commences : en cas d\'égalité, le plus rapide gagne.</span></li><li>' + I('check') + '<span>La correction s\'affiche à la fin.</span></li></ul>' +
        '<div class="btn-row" style="margin-top:16px"><button class="btn btn-lg" type="button" id="du-go">' + I('arrow') + 'C\'est parti</button></div></div>', true);
      U.$('#du-go', main).onclick = function () { jouer(d, exos, adv, advUid); };
    }).catch(function (e) { erreur(main, e); });

    function jouer(d, exos, adv, advUid) {
      var i = 0, reps = [], debut = Date.now();
      function q() {
        var x = exos[i], e = x.e, L = Vues.lecon_(x.l);
        main.innerHTML = page('<div class="quiz-top"><span class="quiz-count">' + (i + 1) + ' / ' + exos.length + '</span><div class="progress"><i style="width:' + (i / exos.length * 100) + '%"></i></div><span class="mono small" id="du-t"></span></div>' +
          '<div class="card"><div class="row" style="margin-bottom:10px"><span class="chip">' + esc(L ? L.titre : '') + '</span></div><div class="exo-q">' + e.q + '</div>' +
          (e.type === 'qcm' ? '<div class="choices">' + e.choix.map(function (c, k) { return '<button type="button" class="choice" data-ci="' + k + '"><span class="choice-l">' + 'ABCD'[k] + '</span><span>' + c + '</span></button>'; }).join('') + '</div>'
            : '<form class="answer" id="du-f" novalidate><input class="input" id="du-in" autocomplete="off" placeholder="Ta réponse">' + (e.unite ? '<span class="muted">' + e.unite + '</span>' : '') + '<button class="btn" type="submit">Valider</button><span class="hint">' + esc(Check.aide(e)) + '</span></form>') +
          '</div>', true);
        U.math(main);
        var t = setInterval(function () { var z = U.$('#du-t', main); if (!z) { clearInterval(t); return; } z.textContent = Math.round((Date.now() - debut) / 1000) + ' s'; }, 500);
        function suivant(v) { clearInterval(t); reps.push(v); i++; if (i < exos.length) q(); else fin(); }
        var f = U.$('#du-f', main);
        if (f) { var inp = U.$('#du-in', main); if (window.matchMedia('(pointer:fine)').matches) inp.focus(); f.onsubmit = function (ev) { ev.preventDefault(); if (inp.value.trim()) suivant(inp.value.trim()); }; }
        else main.onclick = function (ev) { var b = ev.target.closest('[data-ci]'); if (b) suivant(b.getAttribute('data-ci')); };
      }
      function fin() {
        var temps = Math.round((Date.now() - debut) / 1000), score = 0;
        exos.forEach(function (x, k) { if (Check.juger(x.e, reps[k])) score++; });
        var mien = { score: score, temps: temps, reps: reps, fini: Date.now() }, o = {};
        o['scores.' + u.uid] = mien;
        for (var s = 0; s < score; s++) Progres.gagner('exo', { ok: true });
        Cloud.maj('duels/' + d.id, o).then(function () { return Cloud.lire('duels/' + d.id); }).then(function (d2) { resultat(d2, exos, mien, d2.scores && d2.scores[advUid], adv); }, function (e) { toast(Cloud.message(e)); resultat(d, exos, mien, null, adv); });
      }
      q();
    }
    function resultat(d, exos, sm, sa, adv) {
      var verdict = !sa ? 'En attente de ' + esc(adv || 'ton ami') + '…' : sm.score > sa.score || (sm.score === sa.score && sm.temps < sa.temps) ? 'Tu as gagné !' : sm.score === sa.score && sm.temps === sa.temps ? 'Égalité parfaite !' : esc(adv || 'Ton ami') + ' a gagné.';
      main.innerHTML = page('<div class="card end-card">' + Mascotte.bulle(verdict, !sa || sm.score >= sa.score ? 'bravo' : 'pense') +
        '<div class="duel-score"><div><span class="small muted">Toi</span><div class="end-score">' + sm.score + '/10</div><span class="small muted">' + sm.temps + ' s</span></div><div class="duel-vs">contre</div><div><span class="small muted">' + esc(adv || 'Ami') + '</span><div class="end-score">' + (sa ? sa.score + '/10' : '?') + '</div><span class="small muted">' + (sa ? sa.temps + ' s' : 'pas encore joué') + '</span></div></div>' +
        '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/amis">' + I('arrow') + 'Retour aux amis</a></div></div>' +
        '<h2 style="margin-top:26px;font-size:1.3rem">Correction</h2>' + exos.map(function (x, k) {
          var e = x.e, ok = Check.juger(e, sm.reps[k]);
          return '<div class="card" style="margin-bottom:10px"><div class="exo-h"><span class="block-num">' + (k + 1) + '</span>' + (ok ? '<span class="chip" style="color:var(--ok);border-color:var(--ok)">Juste</span>' : '<span class="chip" style="color:var(--ko);border-color:var(--ko)">Faux</span>') + '</div><div class="exo-q">' + e.q + '</div><div class="fb ' + (ok ? 'ok' : 'ko') + '"><div class="corr"><b>Correction.</b> ' + (e.type === 'qcm' ? '<b>' + e.choix[e.rep] + '</b>. ' : '') + e.corr + '</div></div></div>';
        }).join(''), true);
      U.math(main);
    }
  }

  /* ============================================================
     Classes (côté élève)
     ============================================================ */
  function devoirsDe(classes) {
    var st = Store.get(), out = [];
    classes.forEach(function (c) { (c.devoirs || []).forEach(function (d) { out.push({ classe: c, d: d }); }); });
    st.devoirsLecons = []; out.forEach(function (x) { (x.d.lecons || []).forEach(function (l) { if (st.devoirsLecons.indexOf(l) < 0) st.devoirsLecons.push(l); }); });
    Store.save();
    return out.sort(function (a, b) { return (a.d.pour || '') < (b.d.pour || '') ? -1 : 1; });
  }
  function mesClasses() {
    var u = moi(); if (!u) return Promise.resolve([]);
    return Cloud.lire('publics/' + u.uid).then(function (p) {
      return Promise.all(((p && p.classes) || []).map(function (id) { return Cloud.lire('classes/' + id).catch(function () { return null; }); }));
    }).then(function (l) { return l.filter(Boolean); });
  }
  function vClasses(main) {
    if (horsLigne(main, 'Classes')) return;
    var u = moi(), st = Store.get();
    charge(main, 'Mes classes');
    mesClasses().then(function (classes) {
      var dv = devoirsDe(classes);
      main.innerHTML = page('<span class="eyebrow">Mes classes</span><h1>Classes et devoirs</h1>' +
        '<div class="card"><h2 style="font-size:1.15rem">Rejoindre une classe</h2><p class="small muted">Ton professeur t\'a donné un code de classe (CL-XXXXX).</p><form class="answer" id="cl-f" novalidate><input class="input mono" id="cl-code" placeholder="CL-XXXXX" maxlength="8" autocomplete="off" style="text-transform:uppercase"><button class="btn" type="submit">Rejoindre</button></form><p class="small" id="cl-err" style="margin:8px 0 0;color:var(--ko)"></p></div>' +
        (classes.length ? classes.map(function (c) {
          var mes = dv.filter(function (x) { return x.classe.id === c.id; });
          return '<div class="card" style="margin-top:18px"><div class="row" style="justify-content:space-between"><div><h2 style="font-size:1.2rem;margin:0">' + esc(c.nom) + '</h2><span class="small muted">Professeur : ' + esc(c.profNom || '—') + ' · ' + (c.eleves || []).length + ' élève' + ((c.eleves || []).length > 1 ? 's' : '') + '</span></div><button class="btn btn-ghost btn-sm" type="button" data-quitter="' + c.id + '">Quitter</button></div>' +
            (mes.length ? '<div class="prog-list" style="margin-top:12px">' + mes.map(function (x) {
              var faites = (x.d.lecons || []).filter(function (l) { return st.faites[l]; }).length, tot = (x.d.lecons || []).length;
              return '<div class="card card-flat devoir"><b>' + esc(x.d.titre || 'Devoir') + '</b><span class="small muted">' + (x.d.pour ? 'Pour le ' + esc(x.d.pour) + ' · ' : '') + faites + ' / ' + tot + ' leçons faites</span><div class="dv-l">' + (x.d.lecons || []).map(function (id) { var L = Vues.lecon_(id), f = st.faites[id]; return L ? '<a class="chip" href="#/lecon/' + id + '">' + (f ? I('check') : '') + esc(L.titre) + (f ? ' · ' + f.score + '/3' : '') + '</a>' : ''; }).join('') + '</div></div>';
            }).join('') + '</div>' : '<p class="small muted" style="margin:12px 0 0">Aucun devoir pour l\'instant.</p>') + '</div>';
        }).join('') : '<p class="muted" style="margin-top:18px">Tu n\'es inscrit dans aucune classe.</p>') +
        '<p class="small muted" style="margin-top:22px">Les leçons données en devoir sont accessibles gratuitement.</p>', true);
      U.$('#cl-f', main).onsubmit = function (e) {
        e.preventDefault();
        var c = U.$('#cl-code', main).value.trim().toUpperCase(), er = U.$('#cl-err', main);
        if (!/^CL-[A-Z0-9]{5}$/.test(c)) { er.textContent = 'Un code de classe ressemble à CL-XXXXX.'; return; }
        Cloud.lire('codesClasse/' + c).then(function (d) {
          if (!d) throw new Error('Aucune classe avec ce code.');
          return Promise.all([Cloud.ajouterA('classes/' + d.classe, 'eleves', u.uid), Cloud.ajouterA('publics/' + u.uid, 'classes', d.classe)]);
        }).then(function () { toast('Classe rejointe !'); vClasses(main); }, function (x) { er.textContent = x.code ? Cloud.message(x) : x.message; });
      };
      main.onclick = function (e) {
        var q = e.target.closest('[data-quitter]'); if (!q) return;
        var id = q.getAttribute('data-quitter');
        if (!confirm('Quitter cette classe ?')) return;
        Promise.all([Cloud.retirerDe('classes/' + id, 'eleves', u.uid), Cloud.retirerDe('publics/' + u.uid, 'classes', id)]).then(function () { toast('Classe quittée.'); vClasses(main); });
      };
    }).catch(function (e) { erreur(main, e); });
  }

  /* ============================================================
     Espace professeur
     ============================================================ */
  function vProf(main, idClasse) {
    if (horsLigne(main, 'Professeur')) return;
    var u = moi(), st = Store.get();
    if (!st.prof) {
      main.innerHTML = page('<span class="eyebrow">Espace professeur</span><h1>Suivre ses élèves</h1><div class="card">' + Mascotte.bulle('Crée des classes, partage un code à tes élèves, donne des leçons en devoir et suis leurs résultats.', 'content') +
        '<button class="btn" type="button" id="pr-on">' + I('user') + 'Activer l\'espace professeur</button></div>', true);
      U.$('#pr-on', main).onclick = function () { st.prof = true; Store.save(); Synchro.pousser(); vProf(main); window.dispatchEvent(new HashChangeEvent('hashchange')); };
      return;
    }
    charge(main, 'Espace professeur');
    if (idClasse) return detailClasse(main, idClasse);
    Cloud.requete('classes', [['prof', '==', u.uid]]).then(function (classes) {
      classes.sort(function (a, b) { return (b.cree || 0) - (a.cree || 0); });
      main.innerHTML = page('<span class="eyebrow">Espace professeur</span><h1>Mes classes</h1>' +
        '<div class="card"><form class="answer" id="pr-f" novalidate><label class="sr" for="pr-nom">Nom de la classe</label><input class="input" id="pr-nom" placeholder="Ex. 3e B — maths" maxlength="60"><button class="btn" type="submit">' + I('pencil') + 'Créer la classe</button></form></div>' +
        (classes.length ? '<div class="prog-list" style="margin-top:18px">' + classes.map(function (c) { return '<a class="pl" href="#/prof/' + c.id + '"><span class="pl-n">' + I('user') + '</span><span class="pl-t"><b>' + esc(c.nom) + '</b><span>Code ' + esc(c.code) + ' · ' + (c.eleves || []).length + ' élève' + ((c.eleves || []).length > 1 ? 's' : '') + ' · ' + (c.devoirs || []).length + ' devoir' + ((c.devoirs || []).length > 1 ? 's' : '') + '</span></span>' + I('arrow') + '</a>'; }).join('') + '</div>' : '<p class="muted" style="margin-top:18px">Aucune classe. Crée la première ci-dessus.</p>'));
      U.$('#pr-f', main).onsubmit = function (e) {
        e.preventDefault();
        var nom = U.$('#pr-nom', main).value.trim(); if (!nom) return;
        var id = Cloud.nouvelId('classes');
        function essai(n) {
          var c = code('CL-');
          return Cloud.ecrire('classes/' + id, { prof: u.uid, profNom: st.profil.nom, nom: nom, code: c, eleves: [], devoirs: [], cree: Date.now() })
            .then(function () { return Cloud.creer('codesClasse/' + c, { classe: id, prof: u.uid }); })
            .catch(function (x) { if (n < 4 && x.message === 'existe') return essai(n + 1); throw x; });
        }
        essai(0).then(function () { location.hash = '#/prof/' + id; }, function (x) { toast(Cloud.message(x)); });
      };
    }).catch(function (e) { erreur(main, e); });
  }
  function detailClasse(main, id) {
    var u = moi();
    Cloud.lire('classes/' + id).then(function (c) {
      if (!c || c.prof !== u.uid) { location.hash = '#/prof'; return; }
      return lirePublics(c.eleves || []).then(function (eleves) { rendre(c, eleves); });
    }).catch(function (e) { erreur(main, e); });
    function rendre(c, eleves) {
      eleves.sort(function (a, b) { return (a.nom || '').localeCompare(b.nom || '', 'fr'); });
      var devoirs = (c.devoirs || []).slice().reverse();
      main.innerHTML = page('<a class="small muted" href="#/prof">← Mes classes</a><h1 style="margin-top:8px">' + esc(c.nom) + '</h1>' +
        '<div class="card code-classe"><span>Code à donner aux élèves</span><b class="mono">' + esc(c.code) + '</b><button class="btn btn-2 btn-sm" type="button" id="pc-copie">Copier</button><span class="small muted">Ils le saisissent dans « Mes classes ».</span></div>' +
        '<h2 style="margin-top:24px;font-size:1.3rem">Élèves <span class="muted small">' + eleves.length + '</span></h2>' +
        (eleves.length ? '<div class="card" style="overflow-x:auto"><table class="compare"><thead><tr><th>Élève</th><th>Niveau</th><th>Leçons</th><th>Série</th><th>XP semaine</th><th></th></tr></thead><tbody>' + eleves.map(function (p) {
          return '<tr><td><b>' + esc(p.nom || '—') + '</b></td><td>' + chipNiv(p.niveau) + '</td><td>' + (p.nbLecons || 0) + '</td><td>' + (p.serie || 0) + ' j</td><td>' + xpSemaine(p) + '</td><td><button class="btn btn-ghost btn-sm" type="button" data-exclure="' + p.uid + '">Retirer</button></td></tr>';
        }).join('') + '</tbody></table></div>' : '<p class="muted">Aucun élève pour l\'instant : partage le code ci-dessus.</p>') +
        '<div class="row" style="justify-content:space-between;margin-top:28px"><h2 style="font-size:1.3rem;margin:0">Devoirs</h2><button class="btn btn-sm" type="button" id="pc-dv">' + I('pencil') + 'Nouveau devoir</button></div>' +
        (devoirs.length ? devoirs.map(function (d) {
          var L = (d.lecons || []).map(function (x) { return Vues.lecon_(x); }).filter(Boolean);
          return '<div class="card" style="margin-top:14px"><div class="row" style="justify-content:space-between"><div><b>' + esc(d.titre || 'Devoir') + '</b><br><span class="small muted">' + (d.pour ? 'Pour le ' + esc(d.pour) + ' · ' : '') + L.length + ' leçon' + (L.length > 1 ? 's' : '') + '</span></div><button class="btn btn-ghost btn-sm" type="button" data-supdv="' + d.id + '">Supprimer</button></div>' +
            (eleves.length ? '<div style="overflow-x:auto;margin-top:10px"><table class="t resultats"><thead><tr><th>Élève</th>' + L.map(function (l) { return '<th title="' + esc(l.titre) + '">' + esc(l.titre.length > 18 ? l.titre.slice(0, 17) + '…' : l.titre) + '</th>'; }).join('') + '<th>Fait</th></tr></thead><tbody>' + eleves.map(function (p) {
              var f = p.faites || {}, n = 0;
              return '<tr><td>' + esc(p.nom || '—') + '</td>' + L.map(function (l) { var s = f[l.id]; if (s != null) n++; return '<td class="' + (s == null ? 'r-vide' : s === 3 ? 'r-top' : s >= 2 ? 'r-ok' : 'r-ko') + '">' + (s == null ? '—' : s + '/3') + '</td>'; }).join('') + '<td><b>' + n + '/' + L.length + '</b></td></tr>';
            }).join('') + '</tbody></table></div>' : '') + '</div>';
        }).join('') : '<p class="muted">Aucun devoir. Les leçons données en devoir sont gratuites pour les élèves.</p>') +
        '<div class="btn-row" style="margin-top:30px"><button class="btn btn-ghost btn-sm" type="button" id="pc-sup">' + I('trash') + 'Supprimer la classe</button></div>');
      U.$('#pc-copie', main).onclick = function () { copier(c.code); };
      U.$('#pc-dv', main).onclick = function () { nouveauDevoir(c, function () { detailClasse(main, id); }); };
      U.$('#pc-sup', main).onclick = function () {
        if (!confirm('Supprimer définitivement la classe « ' + c.nom + ' » ?')) return;
        Promise.all([Cloud.effacer('classes/' + id), Cloud.effacer('codesClasse/' + c.code).catch(function () { /* déjà absent */ })]).then(function () { toast('Classe supprimée.'); location.hash = '#/prof'; });
      };
      main.onclick = function (e) {
        var x = e.target.closest('[data-exclure]');
        if (x) { if (confirm('Retirer cet élève de la classe ?')) Cloud.retirerDe('classes/' + id, 'eleves', x.getAttribute('data-exclure')).then(function () { detailClasse(main, id); }); return; }
        var s = e.target.closest('[data-supdv]');
        if (s && confirm('Supprimer ce devoir ?')) { var dvid = s.getAttribute('data-supdv'); Cloud.maj('classes/' + id, { devoirs: (c.devoirs || []).filter(function (d) { return d.id !== dvid; }) }).then(function () { detailClasse(main, id); }); }
      };
    }
  }
  function nouveauDevoir(c, fini) {
    var nid = Store.get().niveau || '3e';
    function liste(n) { return LECONS.filter(function (l) { return l.niveau === n; }).map(function (l) { return '<label class="dv-c"><input type="checkbox" value="' + l.id + '"> ' + esc(l.titre) + '</label>'; }).join(''); }
    Modal.ouvrir('<h2 id="modal-title">Nouveau devoir</h2>' +
      '<div class="form" style="max-width:none"><div class="field"><label for="dv-t">Titre</label><input class="input" id="dv-t" value="Leçons de la semaine" maxlength="80"></div>' +
      '<div class="field"><label for="dv-p">À faire pour le</label><input class="input" id="dv-p" type="date" value="' + U.addDays(U.today(), 7) + '"></div>' +
      '<div class="field"><label for="dv-n">Niveau</label><select class="input" id="dv-n">' + NIVEAUX.map(function (n) { return '<option value="' + n.id + '"' + (n.id === nid ? ' selected' : '') + '>' + esc(n.long) + '</option>'; }).join('') + '</select></div>' +
      '<div class="dv-liste" id="dv-l">' + liste(nid) + '</div></div>' +
      '<p class="small" id="dv-err" style="color:var(--ko)"></p><div class="btn-row"><button class="btn" type="button" id="dv-ok">Donner le devoir</button><button class="btn btn-2" type="button" data-close>Annuler</button></div>', { large: true });
    U.$('#dv-n').onchange = function () { U.$('#dv-l').innerHTML = liste(this.value); };
    U.$('#dv-ok').onclick = function () {
      var lecons = U.$$('#dv-l input:checked').map(function (x) { return x.value; });
      if (!lecons.length) { U.$('#dv-err').textContent = 'Coche au moins une leçon.'; return; }
      var d = { id: 'dv' + Date.now().toString(36), titre: U.$('#dv-t').value.trim() || 'Devoir', pour: U.$('#dv-p').value, lecons: lecons, cree: Date.now() };
      Cloud.maj('classes/' + c.id, { devoirs: (c.devoirs || []).concat([d]) }).then(function () { Modal.fermer(); toast('Devoir donné à la classe.'); fini(); }, function (x) { U.$('#dv-err').textContent = Cloud.message(x); });
    };
  }

  /* Bandeau des devoirs sur « Aujourd'hui » (rempli en arrière-plan). */
  function bandeauDevoirs(el) {
    if (!el || !moi()) return;
    mesClasses().then(function (classes) {
      var st = Store.get(), dv = devoirsDe(classes).filter(function (x) { return (x.d.lecons || []).some(function (l) { return !st.faites[l]; }); });
      if (!dv.length || !document.body.contains(el)) return;
      var x = dv[0], reste = x.d.lecons.filter(function (l) { return !st.faites[l]; }).length;
      el.innerHTML = '<a class="banner banner-rv" href="#/classes">' + I('book') + '<div class="banner-t"><b>Devoir : ' + esc(x.d.titre) + '</b><span>' + esc(x.classe.nom) + ' · ' + reste + ' leçon' + (reste > 1 ? 's' : '') + ' à faire' + (x.d.pour ? ' pour le ' + esc(x.d.pour) : '') + (dv.length > 1 ? ' · et ' + (dv.length - 1) + ' autre' + (dv.length > 2 ? 's' : '') + ' devoir' + (dv.length > 2 ? 's' : '') : '') + '</span></div><span class="btn btn-2">Voir</span></a>';
    }).catch(function () { /* hors ligne */ });
  }

  window.Social = { amis: vAmis, duel: vDuel, classes: vClasses, prof: vProf, bandeauDevoirs: bandeauDevoirs };
})();
