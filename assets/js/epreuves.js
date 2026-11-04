/* Math Everyday — épreuves : le problème long de chaque leçon, les évaluations notées sur 20,
   les défis de la semaine (1 h, récompenses à collectionner : titres et cadres d'avatar) et
   l'olympiade du mois (2 h, classement équitable entre niveaux, thème Olympe pour le vainqueur).
   Une seule copie en cours à la fois (Store.get().copie) : elle survit au rechargement et le
   chronomètre continue de tourner si on quitte la page. Expose window.Epreuves. */
(function () {
  'use strict';
  var esc = U.esc;
  function page(inner, narrow) { return '<section class="page"><div class="wrap' + (narrow ? ' wrap-narrow' : '') + '">' + inner + '</div></section>'; }
  function chipNiv(nid) { var n = niv(nid); return n ? '<span class="chip chip-lvl lv-' + nid + '">' + n.nom + '</span>' : ''; }
  function lecon(id) { return Vues.lecon_(id); }
  function virgule(x) { return String(Math.round(x * 100) / 100).replace('.', ','); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function st() {
    var s = Store.get();
    s.evals = s.evals || {};
    s.defis = s.defis || { hist: [], semaines: {} };
    s.olymp = s.olymp || {};
    s.problemes = s.problemes || {};
    s.cosmetiques = s.cosmetiques || { titres: {}, cadres: {}, themes: [], equipe: { titre: null, cadre: null } };
    return s;
  }
  /* horloge (décalable pour les essais en local uniquement) */
  function maintenant() { return Date.now() + (/^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? (window.__decalageHorloge || 0) : 0); }

  /* ---------------- Hasard reproductible ----------------
     Même graine = même sujet : tous les élèves d'un niveau reçoivent la même olympiade. */
  function hacher(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function prng(graine) {
    var a = hacher(String(graine));
    return function () { a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function avecGraine(graine, fn) {
    var ancien = Math.random; Math.random = prng(graine);
    try { return fn(); } finally { Math.random = ancien; }
  }

  /* ---------------- Fabrication des sujets ---------------- */
  function leconsNiv(nid) { return LECONS.filter(function (l) { return l.niveau === nid; }); }
  function genere(l) { var g = (window.GENERATEURS || {})[l.id]; if (!g) return null; try { var e = g(); if (e) e.lecon = l.id; return e; } catch (x) { return null; } }
  /* n questions tirées des générateurs des leçons données, sans doublon ; repli sur les exercices des leçons */
  function questions(L, n) {
    var res = [], vus = {}, ordre = U.shuffle(L), essais = 0;
    while (res.length < n && essais < n * 10 && ordre.length) {
      var l = ordre[essais % ordre.length]; essais++;
      var e = genere(l);
      if (e && !vus[e.q]) { vus[e.q] = 1; res.push(e); }
    }
    U.shuffle(L).forEach(function (l) { l.exos.forEach(function (e) { if (res.length < n && !vus[e.q]) { vus[e.q] = 1; res.push(e); } }); });
    return res;
  }
  /* problèmes longs du niveau, de préférence dans les domaines voulus et avec le bon nombre d'étoiles */
  function problemes(nid, domaines, n, etoiles, exclus) {
    exclus = exclus || {};
    var tous = leconsNiv(nid).map(function (l) { return PROBLEMES[l.id]; }).filter(function (p) { return p && !exclus[p.lecon]; });
    function score(p) { var l = lecon(p.lecon); return (domaines && domaines.indexOf(l.domaine) >= 0 ? 0 : 2) + (etoiles && p.etoiles !== etoiles ? 1 : 0) + Math.random(); }
    return tous.map(function (p) { return { p: p, s: score(p) }; }).sort(function (a, b) { return a.s - b.s; }).slice(0, n).map(function (x) { exclus[x.p.lecon] = 1; return x.p; });
  }
  function blocProbleme(p, points) { return { titre: p.titre, etoiles: p.etoiles, lecon: p.lecon, enonce: p.enonce, questions: p.questions, points: points }; }

  function sujetEval(lid, graine) {
    var l = lecon(lid); if (!l) return null;
    return avecGraine(graine, function () {
      var avant = leconsNiv(l.niveau).filter(function (x) { return x.ordre < l.ordre && Store.get().faites[x.id]; });
      /* certains générateurs ont peu de variantes : on prend ce qu'il y a, sans doublon */
      var q1 = questions([l], 8), q2 = avant.length ? questions(avant, 2) : [];
      var parties = [{ titre: 'La leçon', consigne: q1.length + ' questions sur « ' + l.titre + ' ».', blocs: [{ titre: 'Questions', questions: q1, points: q2.length ? 16 : 20 }] }];
      if (q2.length) parties.push({ titre: 'Révision', consigne: 'Deux questions sur les leçons précédentes du niveau.', blocs: [{ titre: 'Questions', questions: q2, points: 4 }] });
      return { titre: 'Évaluation : ' + l.titre, niveau: l.niveau, minutes: 25, bareme: 20,
        consigne: 'Pas de correction avant la fin. Calculatrice et brouillon autorisés (dans les outils).', parties: parties };
    });
  }

  /* ---------------- Défis de la semaine ---------------- */
  var NUM = ['Nombres', 'Fractions', 'Relatifs', 'Calcul', 'Calculs', 'Puissances', 'Arithmétique', 'Proportionnalité'];
  var DEFIS = [
    { id: 'pharaons', nom: 'Le défi des Pharaons', theme: 'Calculs et nombres', ic: 'calc', domaines: NUM, titre: 'Scribe des Pharaons', desc: 'Les scribes d\'Égypte calculaient déjà avec des fractions il y a 4 000 ans. À ton tour.' },
    { id: 'euclide', nom: 'Le défi d\'Euclide', theme: 'Géométrie', ic: 'compass', domaines: ['Géométrie', 'Vecteurs', 'Trigonométrie'], titre: 'Géomètre d\'Alexandrie', desc: 'Figures, longueurs, angles et aires : le terrain de jeu d\'Euclide.' },
    { id: 'khwarizmi', nom: 'Le défi d\'Al-Khwârizmî', theme: 'Algèbre et équations', ic: 'pencil', domaines: ['Équations', 'Calcul littéral', 'Algèbre', 'Second degré', 'Fondements'], titre: 'Disciple d\'Al-Khwârizmî', desc: 'Le mot « algèbre » vient de son livre. Équations, inconnues et calcul littéral.' },
    { id: 'descartes', nom: 'Le défi de Descartes', theme: 'Fonctions et courbes', ic: 'chart', domaines: ['Fonctions', 'Dérivation', 'Exponentielle', 'Logarithme', 'Analyse', 'Intégration', 'Proportionnalité'], titre: 'Esprit cartésien', desc: 'Repères, fonctions, variations : tout ce qui se dessine avec une courbe.' },
    { id: 'pascal', nom: 'Le défi de Pascal', theme: 'Hasard et données', ic: 'target', domaines: ['Probabilités', 'Statistiques', 'Données', 'Dénombrement'], titre: 'As du hasard', desc: 'Dés, cartes, sondages et moyennes : apprivoiser le hasard.' },
    { id: 'fibonacci', nom: 'Le défi de Fibonacci', theme: 'Suites et raisonnement', ic: 'refresh', domaines: ['Suites', 'Arithmétique', 'Fondements', 'Nombres', 'Puissances'], titre: 'As des suites', desc: 'Motifs, suites, divisibilité : trouver la règle cachée.' },
    { id: 'gauss', nom: 'Le marathon de Gauss', theme: 'Tout le programme, au pas de course', ic: 'clock', domaines: null, sprint: true, titre: 'Prodige du calcul', desc: 'À 9 ans, Gauss additionnait les nombres de 1 à 100 en une minute. Un marathon de questions.' },
    { id: 'hypatie', nom: 'Le défi d\'Hypatie', theme: 'Le grand mélange', ic: 'star', domaines: null, titre: 'Élève d\'Hypatie', desc: 'Hypatie enseignait toutes les mathématiques de son temps. Un peu de tout, en plus dur.' }
  ];
  var METAUX = [['or', 'Or', 17], ['argent', 'Argent', 14], ['bronze', 'Bronze', 10]];
  function metal(note) { for (var i = 0; i < METAUX.length; i++) if (note >= METAUX[i][2]) return METAUX[i][0]; return null; }
  function rangMetal(m) { return { or: 3, argent: 2, bronze: 1 }[m] || 0; }
  function nomMetal(m) { return { or: 'Or', argent: 'Argent', bronze: 'Bronze' }[m] || ''; }
  function defi(id) { return DEFIS.filter(function (d) { return d.id === id; })[0]; }
  /* semaines comptées depuis le lundi 2 novembre 2026 */
  function numSemaine() { var l = Progres.semaine().lundi.split('-'), d = new Date(+l[0], +l[1] - 1, +l[2]); return Math.round((d - new Date(2026, 10, 2)) / 6048e5); }
  function defiSemaine() { var n = numSemaine(); return DEFIS[((n % DEFIS.length) + DEFIS.length) % DEFIS.length]; }
  function dimancheSemaine() { return U.addDays(Progres.semaine().lundi, 6); }
  /* niveau de concours : le plus haut entre le niveau du test et les leçons déjà faites (pas de « sous-classement ») */
  function niveauConcours() {
    var s = Store.get(), i = Math.max(0, nivIndex(s.niveau || '6e'));
    Object.keys(s.faites || {}).forEach(function (k) { var l = lecon(k); if (l) i = Math.max(i, nivIndex(l.niveau)); });
    return NIVEAUX[i].id;
  }
  function sujetDefi(did, nid, graine) {
    var d = defi(did); if (!d) return null;
    return avecGraine(graine, function () {
      var L = leconsNiv(nid), Ld = d.domaines ? L.filter(function (l) { return d.domaines.indexOf(l.domaine) >= 0; }) : L;
      if (Ld.length < 2) Ld = L;
      var nq = d.sprint ? 14 : 8, np = d.sprint ? 1 : 2;
      var qs = questions(Ld, nq), ps = problemes(nid, d.domaines, np, d.id === 'hypatie' ? 3 : null);
      return { titre: d.nom, niveau: nid, minutes: 60, bareme: 20,
        consigne: 'Une heure, à ton niveau (' + niv(nid).long + '). La correction arrive quand tu rends ta copie.',
        parties: [
          { titre: 'Échauffement', consigne: nq + ' questions, ' + (d.sprint ? '1 point' : '1 point') + ' chacune.', blocs: [{ titre: 'Questions', questions: qs, points: nq }] },
          { titre: np > 1 ? 'Les problèmes' : 'Le problème', consigne: np > 1 ? 'Deux problèmes longs, 6 points chacun.' : 'Un problème long sur 6 points.', blocs: ps.map(function (p) { return blocProbleme(p, 6); }) }
        ] };
    });
  }

  /* ---------------- Olympiade du mois ----------------
     Le dernier samedi de chaque mois, de 10 h à 22 h : chacun a 2 h à partir du moment où il commence.
     Chaque niveau a son propre sujet, construit de la même façon (sprint 30 pts, 3 problèmes 45 pts,
     le problème φ 25 pts). Égalisation : si un niveau a au moins 3 copies, on ajoute à chaque note
     l'écart entre la moyenne générale et la moyenne du niveau. Égalité : le plus rapide gagne. */
  var DUREE_OLYMP = 120;
  function olympiadeDu(a, m) {
    var d = new Date(a, m + 1, 0);
    while (d.getDay() !== 6) d.setDate(d.getDate() - 1);
    var y = d.getFullYear(), mo = d.getMonth(), j = d.getDate();
    return { mois: y + '-' + pad(mo + 1), debut: new Date(y, mo, j, 10).getTime(), fin: new Date(y, mo, j, 22).getTime(), jour: d,
      nom: 'Olympiade ' + (/^[aeiouéèo]/.test(d.toLocaleDateString('fr-FR', { month: 'long' })) ? 'd\'' : 'de ') + d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) };
  }
  function calendrier() {
    var t = maintenant(), n = new Date(t), a = n.getFullYear(), m = n.getMonth();
    var cette = olympiadeDu(a, m), prec = olympiadeDu(a, m - 1), suiv = olympiadeDu(a, m + 1);
    return {
      t: t,
      ouverte: t >= cette.debut && t < cette.fin ? cette : null,
      prochaine: t < cette.debut ? cette : suiv,
      derniere: t >= cette.fin ? cette : prec
    };
  }
  function sujetOlymp(mois, nid) {
    return avecGraine('olympiade:' + mois + ':' + nid, function () {
      var L = leconsNiv(nid), ex = {};
      var qs = questions(L, 10), ps = problemes(nid, null, 3, 2, ex), phi = problemes(nid, null, 1, 3, ex);
      return { titre: 'Olympiade · ' + niv(nid).long, niveau: nid, minutes: DUREE_OLYMP, bareme: 100,
        consigne: 'Deux heures. Le sujet est le même pour tous les élèves de ton niveau. Bonne chance.',
        parties: [
          { titre: 'Le sprint', consigne: '10 questions, 3 points chacune.', blocs: [{ titre: 'Questions', questions: qs, points: 30 }] },
          { titre: 'Les problèmes', consigne: 'Trois problèmes longs, 15 points chacun.', blocs: ps.map(function (p) { return blocProbleme(p, 15); }) },
          { titre: 'Le problème φ', consigne: 'Le plus difficile, sur 25 points. Garde-lui du temps.', blocs: phi.map(function (p) { return blocProbleme(p, 25); }) }
        ] };
    });
  }

  /* ---------------- Récompenses ---------------- */
  var CADRES = DEFIS.map(function (d) { return { id: d.id, nom: 'Cadre ' + d.nom.replace(/^Le (défi|marathon) (des |de |d')?/, '') }; })
    .concat([{ id: 'laurier', nom: 'Couronne de laurier' }]);
  var TITRES = DEFIS.map(function (d) { return { id: d.id, nom: d.titre }; })
    .concat([{ id: 'olympien', nom: 'Membre de l\'Olympe' }, { id: 'podium', nom: 'Sur le podium de l\'Olympe' }, { id: 'champion', nom: 'Légende de l\'Olympe' }]);
  function nomTitre(id) { var t = TITRES.filter(function (x) { return x.id === id; })[0]; return t ? t.nom : ''; }
  function nomCadre(id) { var t = CADRES.filter(function (x) { return x.id === id; })[0]; return t ? t.nom : ''; }
  function gagnerTitre(id) { var c = st().cosmetiques; if (c.titres[id]) return false; c.titres[id] = U.today(); if (!c.equipe.titre) c.equipe.titre = id; return true; }
  function gagnerCadre(id, m) { var c = st().cosmetiques; if (rangMetal(c.cadres[id]) >= rangMetal(m)) return false; c.cadres[id] = m; if (!c.equipe.cadre || c.equipe.cadre === id) c.equipe.cadre = id; return true; }
  /* attributs d'avatar : le sien (sans argument) ou celui d'un profil public { cadre, metal } */
  function attrsAvatar(p) {
    var cad, m;
    if (p) { cad = p.cadre; m = p.metal; }
    else { var c = Store.get().cosmetiques; cad = c && c.equipe && c.equipe.cadre; m = cad && c.cadres[cad]; }
    return cad && m ? ' data-cadre="' + esc(cad) + '" data-metal="' + esc(m) + '"' : '';
  }
  function titreEquipe(d) { var c = (d || Store.get()).cosmetiques; return c && c.equipe && c.equipe.titre ? nomTitre(c.equipe.titre) : ''; }
  function publicCosm(d) {
    var c = d.cosmetiques, cad = c && c.equipe && c.equipe.cadre;
    return { titre: titreEquipe(d) || null, cadre: cad && c.cadres[cad] ? cad : null, metal: cad && c.cadres[cad] ? c.cadres[cad] : null };
  }
  function apercuCadre(id, m, lettre) { return '<span class="avatar avatar-l" data-cadre="' + id + '" data-metal="' + m + '">' + esc(lettre || 'φ') + '</span>'; }

  /* ---------------- La copie ---------------- */
  function construire(c) {
    if (c.type === 'eval') return sujetEval(c.ref, c.graine);
    if (c.type === 'defi') return sujetDefi(c.ref, c.niveau, c.graine);
    if (c.type === 'olymp') return sujetOlymp(c.ref, c.niveau);
    return null;
  }
  function route(c) { return c.type === 'eval' ? '#/evaluation/' + c.ref : c.type === 'defi' ? '#/defi/' + c.ref : '#/olympiades'; }
  function limite(c) {
    var t = c.debut + c.minutes * 60000;
    if (c.type === 'olymp' && c.finFenetre) t = Math.min(t, c.finFenetre);
    return t;
  }
  function cleQ(i, j, k) { return i + '.' + j + '.' + k; }
  /* corrige une copie : { points, max, note, details: {cle: {ok, pts, max}} } */
  function noter(S, reps) {
    var total = 0, max = 0, details = {};
    S.parties.forEach(function (P, i) {
      P.blocs.forEach(function (B, j) {
        var pq = B.points / Math.max(1, B.questions.length); max += B.points;
        B.questions.forEach(function (q, k) {
          var key = cleQ(i, j, k), v = reps[key], ok = v != null && v !== '' && Check.juger(q, v);
          if (ok) total += pq;
          details[key] = { ok: ok, pts: ok ? pq : 0, max: pq, vide: v == null || v === '' };
        });
      });
    });
    var note = Math.round(total / max * S.bareme * 2) / 2;
    return { points: total, max: max, note: note, details: details };
  }
  function rendreQuestion(q, key, v) {
    var h = '<div class="sujet-q" id="q-' + key.replace(/\./g, '-') + '"><div class="exo-q"><b>' + (+key.split('.')[2] + 1) + '.</b> ' + q.q + '</div>';
    if (q.type === 'qcm') {
      h += '<div class="choices">' + U.shuffle(q.choix.map(function (c, n) { return n; })).map(function (n, pos) {
        return '<button type="button" class="choice" data-k="' + key + '" data-ci="' + n + '" aria-pressed="' + (String(v) === String(n)) + '"><span class="choice-l">' + 'ABCDEF'[pos] + '</span><span>' + q.choix[n] + '</span></button>';
      }).join('') + '</div>';
    } else {
      h += '<div class="answer"><label class="sr" for="in-' + key.replace(/\./g, '-') + '">Ta réponse</label><input class="input" id="in-' + key.replace(/\./g, '-') + '" data-kin="' + key + '" autocomplete="off" spellcheck="false" placeholder="Ta réponse" value="' + esc(v || '') + '">' +
        (q.unite ? '<span class="muted">' + q.unite + '</span>' : '') + '<span class="hint">' + esc(Check.aide(q)) + '</span></div>';
    }
    return h + '<div class="fb-zone" data-fb="' + key + '"></div></div>';
  }
  function etoiles(n) { return n ? '<span class="chip pb-etoiles" title="Difficulté">' + new Array(n + 1).join('★') + '</span>' : ''; }
  function rendreSujet(S, reps) {
    var num = 0;
    return S.parties.map(function (P, i) {
      return '<h2 class="ep-partie" id="partie-' + i + '"><span>Partie ' + (i + 1) + ' · ' + esc(P.titre) + '</span><span class="chip">' + P.blocs.reduce(function (a, b) { return a + b.points; }, 0) + ' pts</span></h2>' + (P.consigne ? '<p class="muted small">' + esc(P.consigne) + '</p>' : '') +
        P.blocs.map(function (B, j) {
          num++;
          return '<div class="card sujet-ex"><div class="exo-h"><span class="block-num">' + num + '</span><b>' + esc(B.titre) + '</b>' + etoiles(B.etoiles) + '<span class="chip">' + virgule(B.points) + ' pts</span></div>' +
            (B.enonce ? '<div class="cours">' + B.enonce + '</div>' : '') +
            B.questions.map(function (q, k) { var key = cleQ(i, j, k); return rendreQuestion(q, key, reps[key]); }).join('') + '</div>';
        }).join('');
    }).join('');
  }
  function corriger(main, S, res, reps) {
    S.parties.forEach(function (P, i) {
      P.blocs.forEach(function (B, j) {
        B.questions.forEach(function (q, k) {
          var key = cleQ(i, j, k), d = res.details[key], v = reps[key], z = U.$('[data-fb="' + key + '"]', main);
          if (!z) return;
          z.innerHTML = '<div class="fb ' + (d.ok ? 'ok' : 'ko') + '"><div class="fb-t">' + I(d.ok ? 'check' : 'x') + (d.ok ? 'Juste' : d.vide ? 'Sans réponse' : 'Faux') + ' · ' + virgule(d.pts) + ' / ' + virgule(d.max) + '</div><div class="corr"><b>Correction.</b> ' + (q.type === 'qcm' ? '<b>' + q.choix[q.rep] + '</b>. ' : '') + q.corr + '</div></div>';
          if (q.type === 'qcm') U.$$('[data-k="' + key + '"]', main).forEach(function (x) { x.disabled = true; var ci = +x.getAttribute('data-ci'); if (ci === q.rep) x.classList.add('is-ok'); else if (String(ci) === String(v)) x.classList.add('is-ko'); });
        });
      });
    });
    U.$$('[data-kin]', main).forEach(function (x) { x.disabled = true; });
  }
  /* termine la copie en cours (même sans l'afficher) et enregistre le résultat */
  function terminer(c, S) {
    var s = st(), res = noter(S, c.reps || {}), temps = Math.min(maintenant(), limite(c)) - c.debut;
    res.temps = Math.max(0, Math.round(temps / 1000));
    s.copie = null;
    res.recompenses = enregistrer(c, S, res);
    Store.save();
    return res;
  }
  function enregistrer(c, S, res) {
    var s = st(), rec = [];
    if (c.type === 'eval') {
      var e = s.evals[c.ref] || {};
      s.evals[c.ref] = { best: Math.max(e.best || 0, res.note), last: res.note, date: U.today(), n: (e.n || 0) + 1 };
      res.xp = Progres.gagner('examen', { niveau: S.niveau, note: res.note, titre: S.titre });
    } else if (c.type === 'defi') {
      var d = defi(c.ref), m = metal(res.note);
      s.defis.hist.push({ id: c.ref, date: U.today(), note: res.note, niveau: c.niveau });
      if (c.semaine) s.defis.semaines[c.semaine] = { id: c.ref, note: res.note };
      if (m) {
        if (gagnerTitre(d.id)) rec.push('Titre « ' + d.titre + ' »');
        if (gagnerCadre(d.id, m)) rec.push(nomCadre(d.id) + ' (' + nomMetal(m) + ')');
      }
      res.metal = m;
      res.xp = Progres.gagner('defi', { note: res.note });
    } else if (c.type === 'olymp') {
      s.olymp[c.ref] = { score: res.note, temps: res.temps, niveau: c.niveau, date: U.today() };
      if (gagnerTitre('olympien')) rec.push('Titre « Membre de l\'Olympe »');
      res.xp = Progres.gagner('olympiade', { score: res.note });
      if (window.Cloud && Cloud.actif && Store.get().uid) Cloud.maj('olympiades/' + c.ref + '_' + Store.get().uid, { rendu: true, score: res.note, temps: res.temps, fin: Date.now() }).catch(function (x) { toast('Copie gardée sur l\'appareil, envoi impossible : ' + Cloud.message(x)); s.olymp[c.ref].nonEnvoyee = true; Store.save(); });
    }
    return rec;
  }
  function duree(ms) {
    var t = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), sec = t % 60;
    return (h ? h + ':' + pad(m) : m) + ':' + pad(sec);
  }
  function tempsLisible(sec) { var m = Math.floor(sec / 60); return (m >= 60 ? Math.floor(m / 60) + ' h ' + pad(m % 60) : m) + ' min ' + pad(sec % 60) + ' s'; }

  /* affiche la copie en cours ; fin(res) est appelé une fois la copie rendue */
  function afficherCopie(main, c, apres) {
    var S = construire(c);
    if (!S) { st().copie = null; Store.save(); location.hash = '#/defis'; return; }
    c.reps = c.reps || {};
    if (maintenant() >= limite(c)) { var r0 = terminer(c, S); afficherResultat(main, c, S, r0, apres, true); return; }
    main.innerHTML = page('<div class="ex-barre ep-barre"><b>' + esc(S.titre) + '</b>' + chipNiv(S.niveau) + '<span class="spacer"></span><span class="ex-chrono" id="ep-chrono" role="timer" aria-label="Temps restant"></span><button class="btn btn-sm" type="button" id="ep-rendre">Rendre</button></div>' +
      '<p class="muted ep-consigne">' + esc(S.consigne) + ' Tes réponses sont enregistrées au fur et à mesure : tu peux recharger la page, le chronomètre continue.</p>' +
      '<div class="ep-sommaire">' + S.parties.map(function (P, i) { return '<button type="button" class="chip" data-aller="' + i + '">' + (i + 1) + '. ' + esc(P.titre) + '</button>'; }).join('') + '</div>' +
      rendreSujet(S, c.reps) +
      '<div class="btn-row" style="margin-top:22px"><button class="btn btn-lg" type="button" id="ep-rendre2">' + I('check') + 'Rendre ma copie</button></div><div id="ep-res"></div>', true);
    U.math(main);
    var t;
    function garder() { clearTimeout(t); t = setTimeout(function () { Store.save(); }, 700); }
    main.oninput = function (e) { var k = e.target.getAttribute('data-kin'); if (k) { c.reps[k] = e.target.value.trim(); garder(); } };
    main.onclick = function (e) {
      var a = e.target.closest('[data-aller]');
      if (a) { e.preventDefault(); var h = U.$('#partie-' + a.getAttribute('data-aller'), main); if (h) h.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      var b = e.target.closest('[data-ci]'); if (!b || b.disabled) return;
      var k = b.getAttribute('data-k'); c.reps[k] = b.getAttribute('data-ci'); garder();
      U.$$('[data-k="' + k + '"]', main).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    };
    var chrono = U.$('#ep-chrono', main), fini = false;
    function tic() {
      if (!document.body.contains(chrono)) { clearInterval(iv); return; }
      var reste = limite(c) - maintenant();
      chrono.textContent = duree(reste);
      chrono.classList.toggle('urgent', reste < 5 * 60000);
      if (reste <= 0) rendre(true);
    }
    var iv = setInterval(tic, 1000); tic();
    function rendre(auto) {
      if (fini) return;
      if (!auto) {
        var vides = U.$$('[data-kin]', main).filter(function (x) { return !x.value.trim(); }).length;
        S.parties.forEach(function (P, i) { P.blocs.forEach(function (B, j) { B.questions.forEach(function (q, k) { if (q.type === 'qcm' && c.reps[cleQ(i, j, k)] == null) vides++; }); }); });
        if (vides && !confirm('Il reste ' + vides + ' question' + (vides > 1 ? 's' : '') + ' sans réponse. Rendre quand même ?')) return;
      }
      fini = true; clearInterval(iv);
      U.$$('[data-kin]', main).forEach(function (x) { c.reps[x.getAttribute('data-kin')] = x.value.trim(); });
      var res = terminer(c, S);
      afficherResultat(main, c, S, res, apres, auto);
    }
    U.$('#ep-rendre', main).onclick = function () { rendre(false); };
    U.$('#ep-rendre2', main).onclick = function () { rendre(false); };
  }
  function afficherResultat(main, c, S, res, apres, auto) {
    if (!U.$('#ep-res', main)) {
      main.innerHTML = page('<h1>' + esc(S.titre) + '</h1>' + rendreSujet(S, c.reps || {}) + '<div id="ep-res"></div>', true);
    }
    main.oninput = null; main.onclick = null;
    corriger(main, S, res, c.reps || {});
    var b = U.$('.ep-barre', main); if (b) b.remove();
    U.$$('.ep-consigne, .ep-sommaire', main).forEach(function (x) { x.remove(); });
    U.$$('#ep-rendre2', main).forEach(function (x) { x.closest('.btn-row').remove(); });
    var bon = res.note >= S.bareme / 2;
    var html = '<div class="card end-card ep-fin">' + Mascotte.bulle((auto ? 'Temps écoulé : ta copie a été rendue automatiquement. ' : '') + (res.note >= S.bareme * 0.8 ? 'Remarquable, c\'est une très belle copie.' : bon ? 'Bien joué. Relis les corrections des questions ratées.' : 'Chaque correction lue te fera progresser. Relis-les tranquillement.'), bon ? 'bravo' : 'pense') +
      '<span class="eyebrow">' + esc(S.titre) + '</span><div class="end-score">' + virgule(res.note) + ' / ' + S.bareme + '</div>' +
      '<p class="muted small">Temps : ' + tempsLisible(res.temps) + (res.xp ? ' · +' + res.xp + ' XP' : '') + '</p>' +
      (res.metal ? '<div class="ep-medaille m-' + res.metal + '">' + I('trophy') + '<b>Médaille ' + nomMetal(res.metal) + '</b></div>' : '') +
      (res.recompenses && res.recompenses.length ? '<p><b>Débloqué :</b> ' + res.recompenses.map(esc).join(' · ') + '</p>' : '') +
      (apres ? apres(res) : '') + '</div>';
    var z = U.$('#ep-res', main);
    z.innerHTML = html;
    U.math(z); compteurs(z);
    window.scrollTo(0, 0);
    main.querySelector('.wrap').insertBefore(z, main.querySelector('.wrap').firstChild);
    if (res.recompenses && res.recompenses.length) setTimeout(function () { Progres.fete('Récompense : ' + res.recompenses[0]); }, 500);
    if (window.Nav) Nav();
  }
  /* démarre une copie, ou propose de reprendre celle qui est en cours */
  function demarrer(main, c, apres) {
    var s = st();
    if (s.copie && !(s.copie.type === c.type && s.copie.ref === c.ref)) {
      var autre = construire(s.copie);
      main.innerHTML = page('<div class="card center">' + Mascotte.bulle('Tu as déjà une épreuve en cours : <b>' + esc(autre ? autre.titre : 'épreuve') + '</b>. Termine-la d\'abord (ou rends-la).', 'pense') +
        '<div class="btn-row" style="justify-content:center"><a class="btn" href="' + route(s.copie) + '">Reprendre</a><button class="btn btn-2" type="button" id="ep-abandon">La rendre maintenant</button></div></div>', true);
      U.$('#ep-abandon', main).onclick = function () { if (!confirm('Rendre cette copie telle quelle ?')) return; if (autre) terminer(s.copie, autre); else { s.copie = null; Store.save(); } toast('Copie rendue.'); demarrer(main, c, apres); };
      return;
    }
    if (!s.copie) { c.debut = maintenant(); c.reps = {}; s.copie = c; Store.save(); }
    afficherCopie(main, s.copie, apres);
  }
  function enCours(type, ref) { var c = Store.get().copie; return c && c.type === type && (ref == null || c.ref === ref) ? c : null; }

  /* ============================================================
     Le problème long d'une leçon
     ============================================================ */
  function blocLecon(l) {
    var p = PROBLEMES[l.id]; if (!p) return '';
    return '<div class="block"><div class="block-h"><span class="block-num">4</span><h2>Le problème</h2>' + etoiles(p.etoiles) + '</div>' +
      '<p class="muted">Pour aller plus loin : un problème long, plus dur que les exercices. Il ne compte pas dans le score de la leçon. Deux essais par question.</p>' +
      '<div class="card sujet-ex pb-lecon" id="pb-lecon"><div class="exo-h"><span class="block-num">' + I('star') + '</span><b>' + esc(p.titre) + '</b></div><div class="cours">' + p.enonce + '</div>' +
      p.questions.map(function (q, k) { return '<div class="sujet-q pbq" data-pbq="' + k + '"></div>'; }).join('') + '<div id="pb-fin"></div></div></div>';
  }
  function monterLecon(main, l) {
    var p = PROBLEMES[l.id], box = U.$('#pb-lecon', main); if (!p || !box) return;
    var s = st(), etat = s.problemes[l.id] || {}, ok = 0, faits = 0;
    p.questions.forEach(function (q, k) {
      var el = U.$('[data-pbq="' + k + '"]', box);
      Exo.monter(el, q, { num: k + 1, essais: 2, lecon: l, sansIA: false, etiquette: 'Question ' + (k + 1) + ' / ' + p.questions.length,
        onFin: function (prem, juste) {
          faits++; if (juste) ok++;
          Progres.gagner('exo', { ok: juste, lecon: l.id });
          if (faits === p.questions.length) {
            var t = st(); t.problemes[l.id] = { ok: Math.max(ok, etat.ok || 0), tot: p.questions.length, date: U.today() }; Store.save();
            U.$('#pb-fin', box).innerHTML = '<div class="fb ' + (ok === faits ? 'ok' : 'ko') + '" style="margin-top:14px"><div class="fb-t">' + I(ok === faits ? 'check' : 'star') + 'Problème terminé : ' + ok + ' / ' + faits + ' questions justes</div></div>';
          }
        } });
      /* numérotation propre au problème (les exercices de la leçon utilisent déjà in-1… in-3) */
      var h = U.$('.exo-h b', el); if (h) h.textContent = 'Question ' + (k + 1);
      var inp = U.$('input', el); if (inp) { inp.id = 'pb-in-' + k; var lb = U.$('label', el); if (lb) lb.setAttribute('for', inp.id); }
    });
    U.$$('.exo-h .chip', box).forEach(function (c) { if (/^Question/.test(c.textContent)) c.remove(); });
  }

  /* ============================================================
     Évaluations
     ============================================================ */
  function evalsAujourdhui() { var s = st(); return (s.evalJour && s.evalJour.date === U.today()) ? s.evalJour.n : 0; }
  function vEvaluation(main, lid) {
    if (!Store.connecte()) { location.hash = '#/compte/connexion'; return; }
    var s = st(), prem = Store.estPremium();
    if (!lid) {
      var faites = LECONS.filter(function (l) { return s.faites[l.id]; });
      main.innerHTML = page('<span class="eyebrow">Évaluations</span><h1>Les contrôles notés</h1><p class="muted">Pour chaque leçon terminée : une dizaine de questions en 25 minutes, sans correction avant la fin, notées sur 20. Les questions changent à chaque fois.' + (prem ? '' : ' Formule gratuite : 1 évaluation par jour.') + '</p>' +
        (faites.length ? '<div class="prog-list" style="margin-top:16px">' + faites.map(function (l) { var e = s.evals[l.id]; return '<a class="pl" href="#/evaluation/' + l.id + '"><span class="pl-n">' + (e ? virgule(e.best) : '–') + '</span><span class="pl-t"><b>' + esc(l.titre) + '</b><span>' + esc(niv(l.niveau).nom) + ' · ' + esc(l.domaine) + (e ? ' · meilleure note ' + virgule(e.best) + '/20' : ' · pas encore passée') + '</span></span>' + I('arrow') + '</a>'; }).join('') + '</div>'
          : '<div class="card card-flat"><p class="muted" style="margin:0">Termine une leçon pour débloquer son évaluation.</p></div>'));
      return;
    }
    var l = lecon(lid);
    if (!l) { location.hash = '#/evaluation'; return; }
    if (enCours('eval', lid)) { afficherCopie(main, s.copie, apresEval(l)); return; }
    if (!s.faites[lid]) {
      main.innerHTML = page('<div class="card center">' + Mascotte.bulle('Fais d\'abord la leçon « ' + esc(l.titre) + ' » : son évaluation se débloque juste après.', 'pense') + '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/lecon/' + lid + '">Aller à la leçon</a></div></div>', true);
      return;
    }
    if (!prem && evalsAujourdhui() >= 1) {
      main.innerHTML = page('<div class="card center">' + Mascotte.bulle('Tu as déjà passé ton évaluation gratuite aujourd\'hui. Reviens demain, ou passe à l\'illimité.', 'pense') + '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/abonnement">' + I('crown') + 'Voir les offres</a><a class="btn btn-2" href="#/entrainement/' + lid + '">S\'entraîner</a></div></div>', true);
      return;
    }
    var e = s.evals[lid];
    main.innerHTML = page('<a class="small muted" href="#/evaluation">← Toutes les évaluations</a><div class="card" style="margin-top:10px"><span class="eyebrow">Évaluation</span><h1 style="margin-top:6px">' + esc(l.titre) + '</h1>' +
      '<div class="row" style="gap:8px;margin:10px 0 14px">' + chipNiv(l.niveau) + '<span class="chip">' + I('clock') + '25 min</span><span class="chip">≈ 10 questions</span><span class="chip">sur 20</span></div>' +
      '<ul class="retenir"><li>' + I('check') + '<span>Des questions sur la leçon, et 2 de révision sur les leçons d\'avant si tu en as déjà fait.</span></li><li>' + I('check') + '<span>Aucune correction pendant l\'épreuve : tout arrive quand tu rends ta copie.</span></li><li>' + I('check') + '<span>Le chronomètre continue si tu quittes la page. À la fin du temps, la copie est rendue toute seule.</span></li></ul>' +
      (e ? '<p class="muted small">Meilleure note : <b>' + virgule(e.best) + '/20</b> · dernière : ' + virgule(e.last) + '/20</p>' : '') +
      '<div class="btn-row"><button class="btn btn-lg" type="button" id="ev-go">' + I('arrow') + 'Commencer</button><a class="btn btn-ghost" href="#/lecon/' + lid + '">Revoir la leçon</a></div></div>', true);
    U.$('#ev-go', main).onclick = function () {
      var t = st(); if (!prem) t.evalJour = { date: U.today(), n: evalsAujourdhui() + 1 };
      demarrer(main, { type: 'eval', ref: lid, niveau: l.niveau, graine: 'eval:' + lid + ':' + Date.now(), minutes: 25 }, apresEval(l));
    };
  }
  function apresEval(l) {
    return function () { return '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/lecon/' + l.id + '">Revoir la leçon</a><a class="btn btn-2" href="#/entrainement/' + l.id + '">S\'entraîner</a><a class="btn btn-ghost" href="#/evaluation">Autres évaluations</a></div>'; };
  }

  /* ============================================================
     Défis
     ============================================================ */
  function peutDefi(d) {
    var s = st(), sem = 'S' + Progres.semaine().lundi;
    if (Store.estPremium()) return { ok: true };
    if (d.id !== defiSemaine().id) return { ok: false, raison: 'abonne' };
    if (s.defis.semaines[sem]) return { ok: false, raison: 'fait', res: s.defis.semaines[sem] };
    if (new Date(maintenant()).getDay() !== 0) return { ok: false, raison: 'dimanche' };
    return { ok: true, semaine: sem };
  }
  function meilleur(id) { var s = st(), b = null; s.defis.hist.forEach(function (h) { if (h.id === id && (b == null || h.note > b)) b = h.note; }); return b; }
  function prochainDimanche() { var d = dimancheSemaine().split('-'); return new Date(+d[0], +d[1] - 1, +d[2]).getTime(); }
  function vDefis(main, ancre) {
    if (!Store.connecte()) { location.hash = '#/compte/connexion'; return; }
    var s = st(), prem = Store.estPremium(), ds = defiSemaine(), p = peutDefi(ds), cal = calendrier();
    var etat;
    if (enCours('defi')) etat = '<a class="btn btn-lg" href="#/defi/' + s.copie.ref + '">' + I('clock') + 'Reprendre mon défi</a>';
    else if (p.ok) etat = '<a class="btn btn-lg" href="#/defi/' + ds.id + '">' + I('arrow') + 'Relever le défi (1 h)</a>';
    else if (p.raison === 'fait') etat = '<span class="chip">' + I('check') + 'Fait cette semaine : ' + virgule(p.res.note) + '/20</span><span class="muted small">Le prochain défi arrive dimanche prochain.</span>';
    else etat = '<span class="ep-compte" data-compte="' + prochainDimanche() + '" data-avant="Ouvre dans "></span><span class="muted small">Ouvert toute la journée du dimanche ' + new Date(prochainDimanche()).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) + '.</span>';
    var c = s.cosmetiques;
    main.innerHTML = page('<span class="eyebrow">Défis</span><h1>Les défis de la semaine</h1>' +
      '<p class="muted" style="max-width:44em">Une heure de questions et de problèmes longs, à ton niveau (' + esc(niv(niveauConcours()).long) + '). Avec 10/20 tu gagnes le titre du défi et son cadre d\'avatar en bronze, 14/20 en argent, 17/20 en or.' + (prem ? ' Abonné : tous les défis sont ouverts, quand tu veux, autant de fois que tu veux.' : ' Formule gratuite : le défi de la semaine, le dimanche (une tentative).') + '</p>' +
      '<div class="card ep-semaine"><div class="ep-sem-ic">' + I(ds.ic) + '</div><div class="ep-sem-t"><span class="eyebrow">Défi de la semaine</span><h2>' + esc(ds.nom) + '</h2><p class="muted">' + esc(ds.desc) + '</p><div class="row" style="gap:10px;flex-wrap:wrap;align-items:center">' + etat + '</div></div>' +
      '<div class="ep-sem-r">' + apercuCadre(ds.id, (c.cadres[ds.id] || 'or'), (Store.get().profil.nom || '?').charAt(0).toUpperCase()) + '<span class="small muted">' + esc(ds.titre) + '</span></div></div>' +
      '<a class="banner ep-olymp-b" href="#/olympiades">' + I('laurel') + '<div class="banner-t"><b>' + (cal.ouverte ? esc(cal.ouverte.nom) + ' : c\'est aujourd\'hui' : esc(cal.prochaine.nom) + ' le ' + cal.prochaine.jour.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })) + '</b><span>' + (cal.ouverte ? 'Épreuve de 2 h, jusqu\'à 22 h. Le vainqueur gagne le thème Olympe.' : '<span class="ep-compte" data-compte="' + cal.prochaine.debut + '" data-avant="Dans "></span> · 2 h d\'épreuve, le vainqueur gagne le thème exclusif Olympe.') + '</span></div><span class="btn btn-2">Voir</span></a>' +
      '<h2 style="margin-top:30px;font-size:1.3rem">Tous les défis</h2><div class="grid g2 ep-defis">' + DEFIS.map(function (d) {
        var q = peutDefi(d), b = meilleur(d.id), m = c.cadres[d.id];
        var bouton = q.ok ? '<a class="btn btn-sm" href="#/defi/' + d.id + '">' + I('arrow') + 'Relever</a>'
          : q.raison === 'abonne' ? '<a class="btn btn-2 btn-sm" href="#/abonnement">' + I('lock') + 'Abonnés</a>'
          : q.raison === 'fait' ? '<span class="chip">' + I('check') + 'Fait</span>' : '<span class="chip">' + I('clock') + 'Dimanche</span>';
        return '<div class="card ep-defi' + (d.id === ds.id ? ' semaine' : '') + '"><div class="ep-defi-h">' + I(d.ic) + '<div><b>' + esc(d.nom) + '</b><span class="small muted">' + esc(d.theme) + '</span></div>' + (d.id === ds.id ? '<span class="chip">Cette semaine</span>' : '') + '</div>' +
          '<p class="small muted">' + esc(d.desc) + '</p><div class="ep-defi-f">' + (m ? '<span class="ep-medaille petite m-' + m + '">' + I('trophy') + nomMetal(m) + '</span>' : '<span class="small muted">Récompense : « ' + esc(d.titre) + ' »</span>') + (b != null ? '<span class="small muted">Record ' + virgule(b) + '/20</span>' : '') + '<span class="spacer"></span>' + bouton + '</div></div>';
      }).join('') + '</div>' +
      vitrine() +
      '<p class="small muted" style="margin-top:22px">Les cadres et les titres sont visibles par tes amis et dans les classements.</p>');
    brancherVitrine(main, function () { vDefis(main); });
    compteurs(main);
    if (ancre === 'vitrine') setTimeout(function () { var v = document.getElementById('vitrine'); if (v) v.scrollIntoView({ block: 'start' }); }, 50);
  }
  function vitrine() {
    var c = st().cosmetiques, lettre = (Store.get().profil.nom || '?').charAt(0).toUpperCase();
    var titres = Object.keys(c.titres), cadres = Object.keys(c.cadres);
    return '<h2 style="margin-top:34px;font-size:1.3rem" id="vitrine">Ma vitrine</h2>' +
      '<div class="card"><div class="ep-vit-tete"><span class="avatar avatar-l"' + attrsAvatar() + '>' + esc(lettre) + '</span><div><b>' + esc(Store.get().profil.nom) + '</b><span class="small muted">' + esc(titreEquipe() || 'Aucun titre choisi') + '</span></div></div>' +
      '<h3 class="ep-vit-h">Titres</h3>' + (titres.length ? '<div class="ep-vit">' + titres.map(function (id) { return '<button type="button" class="cb' + (c.equipe.titre === id ? ' on' : '') + '" data-titre="' + id + '" aria-pressed="' + (c.equipe.titre === id) + '">' + esc(nomTitre(id)) + '</button>'; }).join('') + '<button type="button" class="cb' + (!c.equipe.titre ? ' on' : '') + '" data-titre="" aria-pressed="' + !c.equipe.titre + '">Aucun</button></div>' : '<p class="small muted">Gagne un défi avec au moins 10/20 pour obtenir ton premier titre.</p>') +
      '<h3 class="ep-vit-h">Cadres d\'avatar</h3>' + (cadres.length ? '<div class="ep-vit ep-vit-cadres">' + cadres.map(function (id) { return '<button type="button" class="ep-cadre-b' + (c.equipe.cadre === id ? ' on' : '') + '" data-cadre-pick="' + id + '" aria-pressed="' + (c.equipe.cadre === id) + '" title="' + esc(nomCadre(id) + ' · ' + nomMetal(c.cadres[id])) + '">' + apercuCadre(id, c.cadres[id], lettre) + '<span class="small">' + esc(nomCadre(id).replace(/^Cadre /, '')) + '</span></button>'; }).join('') + '<button type="button" class="ep-cadre-b' + (!c.equipe.cadre ? ' on' : '') + '" data-cadre-pick="" aria-pressed="' + !c.equipe.cadre + '"><span class="avatar avatar-l">' + esc(lettre) + '</span><span class="small">Sans cadre</span></button></div>' : '<p class="small muted">Chaque défi réussi te donne son cadre : bronze, argent ou or.</p>') +
      (c.themes.length ? '<h3 class="ep-vit-h">Thèmes exclusifs</h3><div class="ep-vit">' + c.themes.map(function (id) { return '<button type="button" class="cb" data-theme-pick="' + id + '">' + I('palette') + esc(Theme.nom(id)) + '</button>'; }).join('') + '</div>' : '') + '</div>';
  }
  function brancherVitrine(main, rafraichir) {
    main.onclick = function (e) {
      var t = e.target.closest('[data-titre]'), k = e.target.closest('[data-cadre-pick]');
      if (!t && !k) return;
      var c = st().cosmetiques;
      if (t) c.equipe.titre = t.getAttribute('data-titre') || null;
      if (k) c.equipe.cadre = k.getAttribute('data-cadre-pick') || null;
      Store.save(); if (window.Nav) Nav(); rafraichir();
      var v = document.getElementById('vitrine'); if (v) v.scrollIntoView({ block: 'start' });
    };
  }
  function vDefi(main, id) {
    if (!Store.connecte()) { location.hash = '#/compte/connexion'; return; }
    var d = defi(id); if (!d) { location.hash = '#/defis'; return; }
    var s = st();
    if (enCours('defi', id)) { afficherCopie(main, s.copie, apresDefi()); return; }
    var p = peutDefi(d), nid = niveauConcours();
    if (!p.ok) {
      var msg = p.raison === 'abonne' ? 'Ce défi est réservé aux abonnés. En formule gratuite, tu as le défi de la semaine (« ' + esc(defiSemaine().nom) + ' »), le dimanche.' : p.raison === 'fait' ? 'Tu as déjà relevé le défi de cette semaine (' + virgule(p.res.note) + '/20). Rendez-vous dimanche prochain.' : 'Le défi de la semaine s\'ouvre le dimanche, toute la journée.';
      main.innerHTML = page('<div class="card center">' + Mascotte.bulle(msg, 'pense') + '<div class="btn-row" style="justify-content:center">' + (p.raison === 'abonne' ? '<a class="btn" href="#/abonnement">' + I('crown') + 'Voir les offres</a>' : '') + '<a class="btn btn-2" href="#/defis">Tous les défis</a></div></div>', true);
      return;
    }
    var c = s.cosmetiques, lettre = (Store.get().profil.nom || '?').charAt(0).toUpperCase();
    main.innerHTML = page('<a class="small muted" href="#/defis">← Tous les défis</a><div class="card ep-intro" style="margin-top:10px"><div class="ep-defi-h">' + I(d.ic) + '<div><span class="eyebrow">' + esc(d.theme) + '</span><h1 style="margin:4px 0 0">' + esc(d.nom) + '</h1></div></div>' +
      '<p class="muted">' + esc(d.desc) + '</p><div class="row" style="gap:8px;margin:10px 0 14px">' + chipNiv(nid) + '<span class="chip">' + I('clock') + '1 heure</span><span class="chip">sur 20</span></div>' +
      '<ul class="retenir"><li>' + I('check') + '<span>' + (d.sprint ? '14 questions (1 point chacune) puis un problème long sur 6 points.' : '8 questions (1 point chacune) puis deux problèmes longs sur 6 points chacun.') + '</span></li><li>' + I('check') + '<span>Tout est à ton niveau : ' + esc(niv(nid).long) + '.</span></li><li>' + I('check') + '<span>Le chronomètre tourne même si tu quittes la page. À la fin de l\'heure, la copie est rendue toute seule.</span></li>' + (p.semaine ? '<li>' + I('check') + '<span>Une seule tentative pour le défi de la semaine.</span></li>' : '') + '</ul>' +
      '<h3 style="font-size:1rem;margin-top:18px">À gagner</h3><div class="ep-gains">' + METAUX.map(function (m) { return '<div class="ep-gain">' + apercuCadre(d.id, m[0], lettre) + '<b>' + m[1] + '</b><span class="small muted">dès ' + m[2] + '/20</span></div>'; }).join('') + '<div class="ep-gain ep-gain-t"><b>« ' + esc(d.titre) + ' »</b><span class="small muted">titre, dès 10/20</span></div></div>' +
      (c.cadres[d.id] ? '<p class="small muted">Déjà gagné : cadre ' + nomMetal(c.cadres[d.id]) + '.</p>' : '') +
      '<div class="btn-row" style="margin-top:16px"><button class="btn btn-lg" type="button" id="df-go">' + I('arrow') + 'Commencer le défi</button><a class="btn btn-ghost" href="#/defis">Plus tard</a></div></div>', true);
    U.$('#df-go', main).onclick = function () {
      var graine = p.semaine && !Store.estPremium() ? 'defi:' + d.id + ':' + p.semaine + ':' + nid : 'defi:' + d.id + ':' + Date.now();
      demarrer(main, { type: 'defi', ref: d.id, niveau: nid, graine: graine, minutes: 60, semaine: p.semaine || null }, apresDefi());
    };
  }
  function apresDefi() { return function (res) { return (res.metal ? '' : '<p class="small muted">Il faut au moins 10/20 pour gagner le titre et le cadre.</p>') + '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/defis/vitrine">Ma vitrine</a><a class="btn btn-2" href="#/defis">Tous les défis</a></div>'; }; }

  /* ============================================================
     Olympiades
     ============================================================ */
  function classement(copies) {
    var rendues = copies.filter(function (x) { return x.rendu && typeof x.score === 'number'; });
    var parNiv = {}, somme = 0;
    rendues.forEach(function (x) { (parNiv[x.niveau] = parNiv[x.niveau] || []).push(x.score); somme += x.score; });
    var moy = rendues.length ? somme / rendues.length : 0, moyNiv = {};
    Object.keys(parNiv).forEach(function (k) { moyNiv[k] = parNiv[k].reduce(function (a, b) { return a + b; }, 0) / parNiv[k].length; });
    rendues.forEach(function (x) {
      var corr = parNiv[x.niveau].length >= 3 ? moy - moyNiv[x.niveau] : 0;
      x.corr = Math.round(corr * 10) / 10;
      x.final = Math.round(Math.max(0, Math.min(100, x.score + corr)) * 10) / 10;
    });
    rendues.sort(function (a, b) { return b.final - a.final || (a.temps || 0) - (b.temps || 0) || (a.fin || 0) - (b.fin || 0); });
    return { liste: rendues, moyenne: moy, moyNiv: moyNiv, effectifs: Object.keys(parNiv).reduce(function (o, k) { o[k] = parNiv[k].length; return o; }, {}) };
  }
  function copiesDu(mois) {
    if (!window.Cloud || !Cloud.actif) {
      var o = Store.get().olymp && Store.get().olymp[mois];
      return Promise.resolve(o ? [{ uid: Store.get().uid || 'moi', nom: Store.get().profil.nom, niveau: o.niveau, score: o.score, temps: o.temps, rendu: true, fin: 0 }] : []);
    }
    return Cloud.requete('olympiades', [['mois', '==', mois]]);
  }
  function recompenserOlymp(mois, cl) {
    var s = st(), moi = Store.get().uid || 'moi', rang = -1;
    cl.liste.forEach(function (x, i) { if (x.uid === moi) rang = i; });
    if (rang < 0 || !s.olymp[mois] || s.olymp[mois].recompense) return;
    s.olymp[mois].rang = rang + 1; s.olymp[mois].recompense = true;
    var rec = [];
    if (rang === 0) {
      if (s.cosmetiques.themes.indexOf('olympe') < 0) { s.cosmetiques.themes.push('olympe'); rec.push('le thème Olympe'); }
      if (gagnerTitre('champion')) rec.push('le titre « Légende de l\'Olympe »');
      gagnerCadre('laurier', 'or');
    } else if (rang < 3) {
      if (gagnerTitre('podium')) rec.push('le titre « Sur le podium de l\'Olympe »');
      gagnerCadre('laurier', rang === 1 ? 'argent' : 'bronze');
    }
    Store.save();
    if (rang < 3) setTimeout(function () { Progres.fete(rang === 0 ? 'Tu as gagné l\'olympiade ! ' + (rec.length ? 'Tu reçois ' + rec.join(' et ') + '.' : '') : 'Tu es sur le podium : ' + (rang + 1) + 'e place.'); }, 400);
  }
  function tableau(cl, moi, max) {
    if (!cl.liste.length) return '<p class="muted small">Aucune copie rendue.</p>';
    var lignes = cl.liste.slice(0, max || 20), dedans = lignes.some(function (x) { return x.uid === moi; });
    var monRang = -1; cl.liste.forEach(function (x, i) { if (x.uid === moi) monRang = i; });
    function ligne(x, i) {
      return '<tr class="' + (x.uid === moi ? 'moi' : '') + '"><td><span class="ep-rang r' + (i + 1) + '">' + (i + 1) + '</span>' + '' + '</td><td>' + esc(x.nom || '—') + (x.uid === moi ? ' (toi)' : '') + '</td><td>' + chipNiv(x.niveau) + '</td><td>' + virgule(x.score) + '</td><td>' + (x.corr ? (x.corr > 0 ? '+' : '') + virgule(x.corr) : '0') + '</td><td><b>' + virgule(x.final) + '</b></td><td class="small mono" style="white-space:nowrap">' + duree((x.temps || 0) * 1000) + '</td></tr>';
    }
    return '<div class="ep-table"><table class="compare"><thead><tr><th>Rang</th><th>Élève</th><th>Niveau</th><th>Note</th><th>Égalisation</th><th>Score</th><th>Temps</th></tr></thead><tbody>' +
      lignes.map(ligne).join('') + (!dedans && monRang >= 0 ? '<tr><td colspan="7" class="muted">…</td></tr>' + ligne(cl.liste[monRang], monRang) : '') + '</tbody></table></div>';
  }
  function reglesOlymp() {
    return '<details class="card ep-regles"><summary><b>Comment un élève de 6e peut battre un élève de prépa ?</b></summary>' +
      '<ul class="retenir">' +
      '<li>' + I('check') + '<span><b>Chacun son sujet.</b> Tu composes sur le programme de ton niveau (le plus haut entre ton test et les leçons que tu as faites). Personne n\'est interrogé sur ce qu\'il n\'a pas appris.</span></li>' +
      '<li>' + I('check') + '<span><b>Le même moule pour tous.</b> Tous les sujets ont la même forme : un sprint de 10 questions (30 pts), 3 problèmes longs (45 pts) et le problème φ, le plus dur (25 pts). Les problèmes sont classés par difficulté (★★ et ★★★) dans chaque niveau.</span></li>' +
      '<li>' + I('check') + '<span><b>L\'égalisation.</b> Si un sujet s\'est révélé plus dur que les autres, ça se voit : la moyenne de son niveau est plus basse. Dès qu\'un niveau a au moins 3 copies, on ajoute à chaque note l\'écart entre la moyenne générale et la moyenne du niveau. Ce qui compte, c\'est d\'être meilleur que les élèves de ton niveau.</span></li>' +
      '<li>' + I('check') + '<span><b>Départage au temps.</b> À score égal, le plus rapide passe devant.</span></li>' +
      '</ul><p class="small muted" style="margin:0">Exemple : un élève de 6e fait 88/100 alors que la moyenne de la 6e est 52 ; un élève de MPSI fait 80/100 avec une moyenne MPSI de 50 ; la moyenne générale est 51. Scores : 88 − 1 = 87 pour la 6e, 80 + 1 = 81 pour la MPSI. La 6e gagne.</p></details>';
  }
  function vOlympiades(main) {
    if (!Store.connecte()) { location.hash = '#/compte/connexion'; return; }
    var s = st(), cal = calendrier(), nid = niveauConcours(), O = cal.ouverte, moi = Store.get().uid || 'moi';
    var cc = enCours('olymp'); if (cc) { afficherCopie(main, cc, apresOlymp(cc.finFenetre)); return; }
    var tete = '<span class="eyebrow">Olympiades</span><h1>L\'olympiade du mois</h1>' +
      '<p class="muted" style="max-width:44em">Le dernier samedi de chaque mois, une épreuve de 2 heures, ouverte à tous, gratuite. Chacun compose à son niveau. Le vainqueur gagne le <b>thème Olympe</b>, exclusif, et la couronne de laurier d\'or ; le podium gagne la couronne d\'argent et de bronze.</p>';
    var bloc;
    if (O) {
      var deja = s.olymp[O.mois];
      if (deja) bloc = '<div class="card ep-olymp center"><span class="eyebrow">' + esc(O.nom) + '</span><h2>Copie rendue : ' + virgule(deja.score) + '/100</h2><p class="muted">Les résultats seront publiés à 22 h, à la fermeture de l\'épreuve.</p><div class="ep-compte grand" data-compte="' + O.fin + '" data-avant="Résultats dans "></div></div>';
      else if (O.fin - cal.t < 10 * 60000) bloc = '<div class="card ep-olymp center"><h2>L\'épreuve ferme dans quelques minutes</h2><p class="muted">Il est trop tard pour commencer. Rendez-vous le mois prochain.</p></div>';
      else bloc = '<div class="card ep-olymp"><span class="eyebrow">' + esc(O.nom) + ' · c\'est maintenant</span><h2>L\'épreuve est ouverte jusqu\'à 22 h</h2>' +
        '<div class="row" style="gap:8px;margin:8px 0 12px">' + chipNiv(nid) + '<span class="chip">' + I('clock') + (O.fin - cal.t < DUREE_OLYMP * 60000 ? duree(O.fin - cal.t).replace(/:\d\d$/, '') + ' restantes (fermeture à 22 h)' : '2 heures') + '</span><span class="chip">sur 100</span></div>' +
        '<ul class="retenir"><li>' + I('check') + '<span>Une seule tentative. Le chronomètre démarre dès que tu commences et ne s\'arrête plus.</span></li><li>' + I('check') + '<span>Calculatrice et brouillon autorisés (dans les outils). Pas d\'aide extérieure : c\'est ton olympiade.</span></li><li>' + I('check') + '<span>Tu composes au niveau ' + esc(niv(nid).long) + '.</span></li></ul>' +
        '<div class="btn-row" style="margin-top:14px"><button class="btn btn-lg" type="button" id="ol-go">' + I('laurel') + 'Commencer l\'olympiade</button></div><p class="small" id="ol-err" style="color:var(--ko)"></p></div>';
    } else {
      bloc = '<div class="card ep-olymp center"><span class="eyebrow">Prochaine épreuve</span><h2>' + esc(cal.prochaine.nom) + '</h2><p class="muted">' + esc(cal.prochaine.jour.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })) + ', de 10 h à 22 h (2 h d\'épreuve à partir du moment où tu commences)</p>' +
        '<div class="ep-compte grand" data-compte="' + cal.prochaine.debut + '"></div><p class="small muted">Pour t\'entraîner : <a href="#/defis">les défis de la semaine</a> ont le même format, en plus court.</p></div>';
    }
    main.innerHTML = page(tete + bloc + reglesOlymp() + '<h2 style="margin-top:30px;font-size:1.3rem">Résultats : ' + esc(cal.derniere.nom) + '</h2><div id="ol-res"><p class="muted">Chargement…</p></div>');
    compteurs(main);
    var go = U.$('#ol-go', main);
    if (go) go.onclick = function () { commencerOlymp(main, O, nid, go); };
    copiesDu(cal.derniere.mois).then(function (copies) {
      var z = U.$('#ol-res', main); if (!z) return;
      var cl = classement(copies);
      if (cl.liste.length) recompenserOlymp(cal.derniere.mois, cl);
      var gagnant = cl.liste[0];
      z.innerHTML = (gagnant ? '<div class="card ep-gagnant"><span class="avatar avatar-l" data-cadre="laurier" data-metal="or">' + esc((gagnant.nom || '?').charAt(0).toUpperCase()) + '</span><div><span class="eyebrow">Vainqueur</span><b>' + esc(gagnant.nom || '—') + '</b><span class="small muted">' + esc(niv(gagnant.niveau) ? niv(gagnant.niveau).long : '') + ' · score ' + virgule(gagnant.final) + '</span></div></div>' : '') +
        tableau(cl, moi) + (cl.liste.length ? '<p class="small muted">' + cl.liste.length + ' participant' + (cl.liste.length > 1 ? 's' : '') + ' · moyenne générale ' + virgule(cl.moyenne) + '/100 · ' + Object.keys(cl.effectifs).map(function (k) { return niv(k).nom + ' : ' + cl.effectifs[k] + (cl.effectifs[k] >= 3 ? ' (moy. ' + virgule(cl.moyNiv[k]) + ')' : ''); }).join(' · ') + '</p>' : '');
    }).catch(function (e) { var z = U.$('#ol-res', main); if (z) z.innerHTML = '<p class="muted">Résultats indisponibles : ' + esc(Cloud.message(e)) + '</p>'; });
  }
  function commencerOlymp(main, O, nid, bouton) {
    var s = st(), uid = Store.get().uid;
    var c = { type: 'olymp', ref: O.mois, niveau: nid, graine: 'olympiade', minutes: DUREE_OLYMP, finFenetre: O.fin };
    if (!window.Cloud || !Cloud.actif || !uid) { demarrer(main, c, apresOlymp(O.fin)); return; }
    bouton.disabled = true;
    var chemin = 'olympiades/' + O.mois + '_' + uid;
    Cloud.lire(chemin).then(function (doc) {
      if (doc && doc.rendu) throw new Error('Tu as déjà rendu ta copie pour cette olympiade.');
      if (doc) { c.debut = doc.debut; c.niveau = doc.niveau; c.reps = {}; s.copie = c; Store.save(); afficherCopie(main, c, apresOlymp(O.fin)); return; }
      return Cloud.creer(chemin, { uid: uid, mois: O.mois, nom: Store.get().profil.nom, niveau: nid, debut: maintenant(), rendu: false }).then(function () { demarrer(main, c, apresOlymp(O.fin)); });
    }).catch(function (e) { bouton.disabled = false; var z = U.$('#ol-err', main); if (z) z.textContent = e.message && !e.code ? e.message : Cloud.message(e); });
  }
  function apresOlymp(fin) { return function () { return '<p class="muted">Les résultats seront publiés à 22 h.</p><div class="ep-compte grand" data-compte="' + fin + '" data-avant="Résultats dans "></div><div class="btn-row" style="justify-content:center"><a class="btn" href="#/olympiades">Page de l\'olympiade</a></div>'; }; }

  /* ---------------- Comptes à rebours ---------------- */
  function compteurs(root) {
    var els = U.$$('[data-compte]', root); if (!els.length) return;
    function tic() {
      if (!document.body.contains(els[0])) { clearInterval(iv); return; }
      var t = maintenant();
      els.forEach(function (el) {
        var r = +el.getAttribute('data-compte') - t;
        if (r <= 0) { el.textContent = 'C\'est ouvert'; return; }
        var j = Math.floor(r / 864e5), h = Math.floor(r % 864e5 / 36e5), m = Math.floor(r % 36e5 / 6e4), sec = Math.floor(r % 6e4 / 1000);
        el.innerHTML = (el.getAttribute('data-avant') || '') + (el.classList.contains('grand')
          ? '<span><b>' + j + '</b><small>jour' + (j > 1 ? 's' : '') + '</small></span><span><b>' + pad(h) + '</b><small>h</small></span><span><b>' + pad(m) + '</b><small>min</small></span><span><b>' + pad(sec) + '</b><small>s</small></span>'
          : (j ? j + ' j ' : '') + pad(h) + ' h ' + pad(m) + ' min ' + pad(sec) + ' s');
      });
    }
    var iv = setInterval(tic, 1000); tic();
  }
  /* bandeaux de la page Aujourd'hui */
  function bandeaux() {
    if (!Store.get().niveau) return '';
    var ds = defiSemaine(), p = peutDefi(ds), cal = calendrier(), c = Store.get().copie;
    var h = '<div class="ep-bandeaux">';
    if (c) h += '<a class="card ep-band urgent" href="' + route(c) + '">' + I('clock') + '<span><b>Épreuve en cours</b><small>Le chronomètre tourne : <span data-compte="' + limite(c) + '"></span></small></span></a>';
    h += '<a class="card ep-band" href="#/defis">' + I('trophy') + '<span><b>' + esc(ds.nom) + '</b><small>' + (p.ok ? 'Ouvert maintenant · 1 h' : p.raison === 'fait' ? 'Fait cette semaine · ' + virgule(p.res.note) + '/20' : Store.estPremium() ? 'Tous les défis sont ouverts' : 'Dimanche · <span data-compte="' + prochainDimanche() + '"></span>') + '</small></span></a>';
    h += '<a class="card ep-band" href="#/olympiades">' + I('laurel') + '<span><b>' + esc(cal.ouverte ? cal.ouverte.nom : cal.prochaine.nom) + '</b><small>' + (cal.ouverte ? 'C\'est aujourd\'hui, jusqu\'à 22 h' : '<span data-compte="' + cal.prochaine.debut + '"></span>') + '</small></span></a>';
    return h + '</div>';
  }

  window.Epreuves = {
    DEFIS: DEFIS, CADRES: CADRES, TITRES: TITRES,
    evaluation: vEvaluation, defis: vDefis, defi: vDefi, olympiades: vOlympiades,
    blocLecon: blocLecon, monterLecon: monterLecon, bandeaux: bandeaux, compteurs: compteurs,
    attrsAvatar: attrsAvatar, titreEquipe: titreEquipe, publicCosm: publicCosm,
    defiSemaine: defiSemaine, calendrier: calendrier, classement: classement, niveauConcours: niveauConcours,
    /* pour les vérifications automatiques */
    _sujetEval: sujetEval, _sujetDefi: sujetDefi, _sujetOlymp: sujetOlymp, _noter: noter, _olympiadeDu: olympiadeDu
  };
})();
