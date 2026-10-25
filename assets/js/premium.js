/* Math Everyday — avantages abonnés : plan de révision d'examen, bilan détaillé, sujets type examen,
   accès anticipé (nouveautés), mascotte personnalisable, téléchargement hors connexion.
   Expose window.Premium. */
(function () {
  'use strict';
  var esc = U.esc;
  function page(inner, narrow) { return '<section class="page"><div class="wrap' + (narrow ? ' wrap-narrow' : '') + '">' + inner + '</div></section>'; }
  function chipNiv(nid) { var n = niv(nid); return n ? '<span class="chip chip-lvl lv-' + nid + '">' + n.nom + '</span>' : ''; }
  function verrou(main, titre, texte, puces) {
    main.innerHTML = page('<span class="eyebrow">' + esc(titre) + ' · abonnés</span><h1>' + esc(titre) + '</h1><div class="card">' + Mascotte.bulle(texte, 'content') +
      (puces ? '<ul class="retenir">' + puces.map(function (p) { return '<li>' + I('check') + '<span>' + p + '</span></li>'; }).join('') + '</ul>' : '') +
      '<div class="btn-row" style="margin-top:16px"><a class="btn" href="#/abonnement">' + I('crown') + 'Voir les offres</a></div></div>', true);
    U.math(main);
  }
  function exige(main) { if (!Store.connecte()) { location.hash = '#/compte'; return false; } return true; }

  /* ============================================================
     Nouveautés et accès anticipé
     ============================================================ */
  var NOUVEAUTES = [
    { date: '2026-10-25', titre: 'Mode libre', desc: 'Géométrie, fonctions, équations, textes et exercices sur la même feuille.', lien: '#/atelier' },
    { date: '2026-10-25', titre: 'Sujets type brevet, bac et concours', desc: 'Des sujets complets corrigés, notés sur 20.', lien: '#/sujets' },
    { date: '2026-10-25', titre: 'Calcul mental', desc: '10 thèmes, 3 difficultés, records personnels.', lien: '#/calcul-mental' },
    { date: '2026-10-25', titre: 'Plan de révision et bilan détaillé', desc: 'Un programme jour par jour jusqu\'à l\'examen et l\'analyse de tes points faibles.', lien: '#/plan' }
  ];
  /* Une leçon marquée « nouveau » est réservée aux abonnés pendant 30 jours. */
  function anticipe(l) { return !!(l && l.nouveau && U.addDays(l.nouveau, 30) >= U.today()); }
  function vNouveautes(main) {
    var prem = Store.estPremium();
    var nouvellesLecons = LECONS.filter(anticipe);
    main.innerHTML = page('<span class="eyebrow">Accès anticipé</span><h1>Nouveautés</h1>' +
      Mascotte.bulle(prem ? 'Tu es abonné : chaque nouveauté t\'arrive en premier, 30 jours avant tout le monde.' : 'Les abonnés reçoivent chaque nouvelle leçon et chaque nouvel outil 30 jours avant les autres.', 'content') +
      '<div class="nv-liste">' + NOUVEAUTES.map(function (n) {
        return '<a class="card nv" href="' + n.lien + '">' + I('sparkle') + '<span class="nv-t"><b>' + esc(n.titre) + '</b><span class="muted small">' + esc(n.desc) + '</span></span><span class="small muted mono">' + n.date.split('-').reverse().join('/') + '</span></a>';
      }).join('') +
      nouvellesLecons.map(function (l) { return '<a class="card nv" href="#/lecon/' + l.id + '">' + I('book') + '<span class="nv-t"><b>Nouvelle leçon : ' + esc(l.titre) + '</b><span class="muted small">' + esc(niv(l.niveau).long) + (prem ? '' : ' · pour tous le ' + U.addDays(l.nouveau, 31).split('-').reverse().join('/')) + '</span></span></a>'; }).join('') + '</div>' +
      (prem ? '' : '<div class="btn-row" style="margin-top:18px"><a class="btn" href="#/abonnement">' + I('crown') + 'Passer à l\'illimité</a></div>'), true);
  }

  /* ============================================================
     Plan de révision
     ============================================================ */
  var EXAMENS = [['brevet', 'Brevet', '3e'], ['bac', 'Bac (spécialité maths)', 'tle'], ['concours', 'Concours / partiels de prépa', 'mpsi'], ['controle', 'Contrôle ou examen de mon niveau', null]];
  function genererPlan(type, date, nid) {
    var s = Store.get(), jours = [], d = U.addDays(U.today(), 0), n = 0;
    while (d < date && n < 200) { jours.push(d); d = U.addDays(d, 1); n++; }
    if (!jours.length) return null;
    var aFaire = LECONS.filter(function (l) { return l.niveau === nid && !s.faites[l.id]; }).map(function (l) { return l.id; });
    var aRevoir = LECONS.filter(function (l) { return l.niveau === nid && s.faites[l.id] && (s.faites[l.id].best != null ? s.faites[l.id].best : s.faites[l.id].score) < 3; }).map(function (l) { return l.id; });
    var plan = {};
    var dernierExamen = -7, k = 0, nbEx = 0;
    jours.forEach(function (j, i) {
      var items = [], finale = jours.length - i <= 3, dow = new Date(j + 'T12:00').getDay();
      if (finale) {
        items.push({ t: 'revisions' });
        if (jours.length - i === 3 && nid) items.push({ t: 'examen', niveau: nid });
        if (jours.length - i === 2) items.push({ t: 'fiches', niveau: nid });
        if (jours.length - i === 1) items.push({ t: 'repos' });
      } else {
        if (aFaire.length && k < aFaire.length) items.push({ t: 'lecon', id: aFaire[k++] });
        else if (aRevoir.length) items.push({ t: 'entrainement', id: aRevoir[i % aRevoir.length] });
        else items.push({ t: 'entrainement', id: 'mix-' + nid });
        items.push({ t: 'revisions' });
        if ((dow === 6 || dow === 0) && i - dernierExamen >= 6) { items.push({ t: SUJETS.some(function (x) { return x.niveau === nid; }) && nbEx++ % 2 ? 'sujet' : 'examen', niveau: nid }); dernierExamen = i; }
        if (dow === 3) items.push({ t: 'mental' });
      }
      plan[j] = items;
    });
    return { type: type, date: date, niveau: nid, cree: U.today(), jours: plan };
  }
  function libelle(it) {
    var L = it.id && it.id.indexOf('mix-') !== 0 ? Vues.lecon_(it.id) : null;
    switch (it.t) {
      case 'lecon': return ['book', 'Leçon : ' + (L ? L.titre : ''), '#/lecon/' + it.id];
      case 'entrainement': return ['pencil', L ? 'Entraînement : ' + L.titre : 'Entraînement mélangé ' + (niv(it.id.slice(4)) || {}).nom, '#/entrainement/' + it.id];
      case 'revisions': return ['refresh', 'Réviser ses cartes mémo', '#/revisions'];
      case 'examen': return ['clock', 'Examen blanc ' + (niv(it.niveau) || {}).nom, '#/examens/' + it.niveau];
      case 'sujet': return ['star', 'Sujet type examen', '#/sujets'];
      case 'fiches': return ['book', 'Relire ses fiches résumé', '#/fiches/' + it.niveau];
      case 'mental': return ['target', 'Calcul mental (une série)', '#/calcul-mental'];
      case 'repos': return ['sun', 'Repos : dors bien, tu es prêt !', '#/plan'];
    }
    return ['check', it.t, '#/'];
  }
  function fait(it, date) {
    var s = Store.get();
    if (it.t === 'lecon') return !!s.faites[it.id];
    var a = s.activite && s.activite[date];
    if (it.t === 'revisions') return !!(a && a.cartes);
    if (it.t === 'entrainement' || it.t === 'mental') return !!(a && a.exos);
    if (it.t === 'examen' || it.t === 'sujet') return (s.stats && s.stats.examens || []).some(function (e) { return e.date === date; });
    return !!(s.planFait && s.planFait[date + it.t]);
  }
  function vPlan(main) {
    if (!exige(main)) return;
    if (!Store.estPremium()) return verrou(main, 'Plan de révision', 'Donne la date de ton examen : le site te prépare un programme jour par jour pour arriver prêt.', ['Les leçons qui restent, réparties jusqu\'à l\'examen', 'Révisions espacées tous les jours', 'Examens blancs et sujets type le week-end', 'Les 3 derniers jours : révisions, fiches et repos']);
    var s = Store.get(), p = s.plan;
    if (!p || p.date < U.today()) {
      main.innerHTML = page('<span class="eyebrow">Plan de révision</span><h1>Prépare ton examen</h1>' +
        '<form class="card form" id="pl-f" style="max-width:520px" novalidate>' +
        '<div class="field"><label for="pl-t">Examen</label><select class="input" id="pl-t">' + EXAMENS.map(function (e) { return '<option value="' + e[0] + '">' + esc(e[1]) + '</option>'; }).join('') + '</select></div>' +
        '<div class="field"><label for="pl-n">Niveau du programme</label><select class="input" id="pl-n">' + NIVEAUX.map(function (n) { return '<option value="' + n.id + '"' + (n.id === s.niveau ? ' selected' : '') + '>' + esc(n.long) + '</option>'; }).join('') + '</select></div>' +
        '<div class="field"><label for="pl-d">Date de l\'examen</label><input class="input" id="pl-d" type="date" min="' + U.addDays(U.today(), 2) + '" value="' + U.addDays(U.today(), 30) + '"></div>' +
        '<p class="small" id="pl-err" style="color:var(--ko);margin:0"></p><div><button class="btn" type="submit">' + I('target') + 'Créer mon plan</button></div></form>', true);
      U.$('#pl-t', main).onchange = function () { var e = EXAMENS.filter(function (x) { return x[0] === this.value; }, this)[0]; if (e && e[2]) U.$('#pl-n', main).value = e[2]; };
      U.$('#pl-f', main).onsubmit = function (e) {
        e.preventDefault();
        var d = U.$('#pl-d', main).value, pl = d && genererPlan(U.$('#pl-t', main).value, d, U.$('#pl-n', main).value);
        if (!pl) { U.$('#pl-err', main).textContent = 'Choisis une date au moins dans 2 jours.'; return; }
        s.plan = pl; Store.save(); vPlan(main);
      };
      return;
    }
    var dates = Object.keys(p.jours).sort(), auj = U.today(), restants = Math.round((new Date(p.date) - new Date(auj)) / 86400000);
    var total = 0, faits = 0;
    dates.forEach(function (d) { if (d <= auj) p.jours[d].forEach(function (it) { if (it.t !== 'repos') { total++; if (fait(it, d)) faits++; } }); });
    var parSemaine = {};
    dates.forEach(function (d) { var lu = U.addDays(d, -((new Date(d + 'T12:00').getDay() + 6) % 7)); (parSemaine[lu] = parSemaine[lu] || []).push(d); });
    main.innerHTML = page('<span class="eyebrow">Plan de révision</span><h1>' + esc((EXAMENS.filter(function (e) { return e[0] === p.type; })[0] || [0, 'Examen'])[1]) + ' le ' + esc(new Date(p.date + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })) + '</h1>' +
      '<div class="stats" style="margin-bottom:18px"><div class="stat">' + I('clock') + '<span><b>' + restants + '</b><small>jours restants</small></span></div><div class="stat">' + I('check') + '<span><b>' + (total ? Math.round(faits / total * 100) : 0) + ' %</b><small>du plan suivi</small></span></div>' + chipNiv(p.niveau) + '</div>' +
      Object.keys(parSemaine).map(function (lu) {
        return '<h2 class="pl-sem">Semaine du ' + esc(new Date(lu + 'T12:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })) + '</h2><div class="plan-j">' + parSemaine[lu].map(function (d) {
          var passe = d < auj, ajd = d === auj;
          return '<div class="card plan-d' + (ajd ? ' ajd' : '') + (passe ? ' passe' : '') + '"><b>' + esc(new Date(d + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })) + (ajd ? ' · aujourd\'hui' : '') + '</b>' +
            p.jours[d].map(function (it) { var l = libelle(it), ok = fait(it, d); return '<a class="plan-it' + (ok ? ' ok' : '') + '" href="' + l[2] + '">' + I(ok ? 'check' : l[0]) + '<span>' + esc(l[1]) + '</span></a>'; }).join('') + '</div>';
        }).join('') + '</div>';
      }).join('') +
      '<div class="btn-row" style="margin-top:24px"><button class="btn btn-ghost btn-sm" type="button" id="pl-suppr">' + I('trash') + 'Supprimer ce plan</button></div>');
    U.$('#pl-suppr', main).onclick = function () { if (confirm('Supprimer ce plan de révision ?')) { s.plan = null; Store.save(); vPlan(main); } };
  }
  /* Bandeau « aujourd'hui dans ton plan » */
  function bandeauPlan() {
    var s = Store.get(), p = s.plan;
    if (!Store.estPremium() || !p || !p.jours[U.today()]) return '';
    var it = p.jours[U.today()].filter(function (x) { return !fait(x, U.today()) && x.t !== 'repos'; });
    if (!it.length) return '<a class="banner banner-rv" href="#/plan">' + I('check') + '<div class="banner-t"><b>Plan du jour terminé</b><span>Bravo, tu es dans les temps pour ton examen.</span></div></a>';
    var l = libelle(it[0]);
    return '<a class="banner banner-rv" href="' + l[2] + '">' + I('target') + '<div class="banner-t"><b>Plan de révision : ' + esc(l[1]) + '</b><span>' + it.length + ' tâche' + (it.length > 1 ? 's' : '') + ' aujourd\'hui · examen dans ' + Math.round((new Date(p.date) - new Date(U.today())) / 86400000) + ' jours</span></div><span class="btn btn-2">Y aller</span></a>';
  }

  /* ============================================================
     Bilan détaillé
     ============================================================ */
  function vBilan(main) {
    if (!exige(main)) return;
    if (!Store.estPremium()) return verrou(main, 'Bilan détaillé', 'Repère tes points forts et tes points faibles chapitre par chapitre, et suis ta progression semaine après semaine.', ['Réussite par domaine et par chapitre', 'Courbe d\'XP des 12 dernières semaines', 'Les chapitres à retravailler en priorité, avec des liens directs']);
    var s = Store.get(), sl = s.statsLecons || {};
    var lignes = LECONS.map(function (l) {
      var f = s.faites[l.id], st = sl[l.id] || { ok: 0, tot: 0 }, pts = 0, max = 0;
      if (f) { pts += (f.best != null ? f.best : f.score); max += 3; }
      pts += st.ok; max += st.tot;
      return { l: l, taux: max ? pts / max : null, n: max };
    }).filter(function (x) { return x.taux != null; });
    var dom = {};
    lignes.forEach(function (x) { var k = x.l.domaine; dom[k] = dom[k] || { s: 0, n: 0, nb: 0 }; dom[k].s += x.taux * x.n; dom[k].n += x.n; dom[k].nb++; });
    var doms = Object.keys(dom).map(function (k) { return { k: k, t: dom[k].s / dom[k].n, nb: dom[k].nb }; }).sort(function (a, b) { return b.t - a.t; });
    var faibles = lignes.filter(function (x) { return x.taux < 0.75; }).sort(function (a, b) { return a.taux - b.taux; }).slice(0, 6);
    var forts = lignes.filter(function (x) { return x.taux >= 0.9; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 6);
    /* XP par semaine (12 semaines) */
    var auj = new Date(), dec = (auj.getDay() + 6) % 7, lundi = U.addDays(U.today(), -dec), sem = [];
    for (var w = 11; w >= 0; w--) { var lu = U.addDays(lundi, -7 * w), xp = 0; for (var j = 0; j < 7; j++) { var a = s.activite && s.activite[U.addDays(lu, j)]; if (a) xp += a.xp; } sem.push({ lu: lu, xp: xp }); }
    var mx = Math.max.apply(null, sem.map(function (x) { return x.xp; }).concat([10]));
    var W = 600, H = 180, bw = W / sem.length;
    var graph = '<svg class="g-svg bilan-g" viewBox="0 0 ' + W + ' ' + (H + 24) + '" role="img" aria-label="XP par semaine">' + sem.map(function (x, i) {
      var h = x.xp / mx * (H - 20);
      return '<rect x="' + (i * bw + 6) + '" y="' + (H - h) + '" width="' + (bw - 12) + '" height="' + Math.max(1, h) + '" rx="3" fill="currentColor" fill-opacity="' + (i === sem.length - 1 ? 0.9 : 0.35) + '"/>' +
        (x.xp ? '<text x="' + (i * bw + bw / 2) + '" y="' + (H - h - 5) + '" font-size="14" text-anchor="middle" style="fill:var(--ink)">' + x.xp + '</text>' : '') +
        '<text x="' + (i * bw + bw / 2) + '" y="' + (H + 16) + '" font-size="13" text-anchor="middle" style="fill:var(--ink-2)">' + x.lu.slice(8) + '/' + x.lu.slice(5, 7) + '</text>';
    }).join('') + '</svg>';
    function barre(t) { return '<div class="progress"><i style="width:' + Math.round(t * 100) + '%"></i></div>'; }
    main.innerHTML = page('<span class="eyebrow">Bilan détaillé</span><h1>Où en es-tu vraiment ?</h1>' +
      (lignes.length ? '' : Mascotte.bulle('Fais quelques leçons et exercices : ton bilan se remplira tout seul.', 'pense')) +
      '<div class="card"><h2 style="font-size:1.15rem">XP par semaine</h2>' + graph + '</div>' +
      (doms.length ? '<div class="card" style="margin-top:18px"><h2 style="font-size:1.15rem">Réussite par domaine</h2><div class="bars">' + doms.map(function (d) { return '<div class="bar-row bilan-r"><span>' + esc(d.k) + '</span>' + barre(d.t) + '<span>' + Math.round(d.t * 100) + ' %</span></div>'; }).join('') + '</div></div>' : '') +
      '<div class="grid g2" style="margin-top:18px">' +
      '<div class="card"><h2 style="font-size:1.15rem">À retravailler en priorité</h2>' + (faibles.length ? '<div class="prog-list" style="grid-template-columns:1fr">' + faibles.map(function (x) { return '<a class="pl" href="#/entrainement/' + x.l.id + '"><span class="pl-n">' + Math.round(x.taux * 100) + '</span><span class="pl-t"><b>' + esc(x.l.titre) + '</b><span>' + esc(niv(x.l.niveau).nom) + ' · ' + esc(x.l.domaine) + ' · s\'entraîner</span></span>' + I('arrow') + '</a>'; }).join('') + '</div>' : '<p class="muted small">Rien à signaler : continue comme ça !</p>') + '</div>' +
      '<div class="card"><h2 style="font-size:1.15rem">Points forts</h2>' + (forts.length ? '<ul class="retenir">' + forts.map(function (x) { return '<li>' + I('star') + '<span>' + esc(x.l.titre) + ' <span class="muted small">(' + Math.round(x.taux * 100) + ' %)</span></span></li>'; }).join('') + '</ul>' : '<p class="muted small">Ils apparaîtront au fil des leçons réussies.</p>') + '</div></div>');
  }

  /* ============================================================
     Sujets type examen
     ============================================================ */
  function vSujets(main, id) {
    if (!exige(main)) return;
    if (!Store.estPremium()) return verrou(main, 'Sujets type examen', 'Des sujets complets façon brevet, bac et concours : plusieurs exercices à questions enchaînées, notés sur 20 et corrigés.', ['2 sujets type brevet, 2 sujets type bac, 1 sujet type concours MPSI', 'Une note sur 20 et une correction détaillée question par question']);
    var s = Store.get(); s.sujetsFaits = s.sujetsFaits || {};
    if (!id) {
      main.innerHTML = page('<span class="eyebrow">Sujets type examen</span><h1>Comme le jour J</h1><p class="muted">Lis tout le sujet, réponds dans l\'ordre que tu veux, puis rends ta copie pour obtenir ta note et la correction. La calculatrice et le brouillon sont dans les outils.</p>' +
        '<div class="grid g3" style="margin-top:18px">' + SUJETS.map(function (x) { var f = s.sujetsFaits[x.id]; return '<a class="card ex-carte" href="#/sujets/' + x.id + '" style="text-decoration:none">' + chipNiv(x.niveau) + '<b>' + esc(x.titre) + '</b><span class="small muted">' + x.exercices.length + ' exercices · ' + Math.round(x.duree / 60 * 10) / 10 + ' h conseillées</span>' + (f ? '<span class="chip">' + I('check') + 'Meilleure note ' + String(f).replace('.', ',') + '/20</span>' : '') + '</a>'; }).join('') + '</div>');
      return;
    }
    var S = SUJETS.filter(function (x) { return x.id === id; })[0];
    if (!S) { location.hash = '#/sujets'; return; }
    var reps = {};
    main.innerHTML = page('<a class="small muted" href="#/sujets">← Tous les sujets</a><h1 style="margin-top:8px">' + esc(S.titre) + '</h1><p class="muted">' + S.type + ' · ' + esc(niv(S.niveau).long) + ' · durée conseillée ' + Math.floor(S.duree / 60) + ' h' + (S.duree % 60 ? ' ' + S.duree % 60 : '') + ' · noté sur 20</p>' +
      S.exercices.map(function (ex, i) {
        return '<div class="card sujet-ex"><div class="exo-h"><span class="block-num">' + (i + 1) + '</span><b>Exercice ' + (i + 1) + ' : ' + esc(ex.titre) + '</b><span class="chip">' + ex.points + ' points</span></div><div class="cours">' + ex.enonce + '</div>' +
          ex.questions.map(function (q, j) {
            var k = i + '-' + j;
            return '<div class="sujet-q"><div class="exo-q"><b>' + (j + 1) + '.</b> ' + q.q + '</div>' +
              (q.type === 'qcm' ? '<div class="choices">' + q.choix.map(function (c, n) { return '<button type="button" class="choice" data-q="' + k + '" data-ci="' + n + '"><span class="choice-l">' + 'ABCD'[n] + '</span><span>' + c + '</span></button>'; }).join('') + '</div>'
                : '<div class="answer"><input class="input" data-qin="' + k + '" autocomplete="off" placeholder="Ta réponse"><span class="hint">' + esc(Check.aide(q)) + '</span></div>') +
              '<div class="fb-zone" data-fb="' + k + '"></div></div>';
          }).join('') + '</div>';
      }).join('') +
      '<div class="btn-row" style="margin-top:18px"><button class="btn btn-lg" type="button" id="sj-rendre">' + I('check') + 'Rendre ma copie</button></div><div id="sj-res"></div>', true);
    U.math(main);
    main.onclick = function (e) {
      var b = e.target.closest('[data-ci]'); if (!b || b.disabled) return;
      var k = b.getAttribute('data-q'); reps[k] = b.getAttribute('data-ci');
      U.$$('[data-q="' + k + '"]', main).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    };
    U.$('#sj-rendre', main).onclick = function () {
      var total = 0;
      U.$$('[data-qin]', main).forEach(function (inp) { reps[inp.getAttribute('data-qin')] = inp.value.trim(); inp.disabled = true; });
      S.exercices.forEach(function (ex, i) {
        var pq = ex.points / ex.questions.length;
        ex.questions.forEach(function (q, j) {
          var k = i + '-' + j, v = reps[k], ok = v != null && v !== '' && Check.juger(q, v);
          if (ok) total += pq;
          var z = U.$('[data-fb="' + k + '"]', main);
          z.innerHTML = '<div class="fb ' + (ok ? 'ok' : 'ko') + '"><div class="fb-t">' + I(ok ? 'check' : 'x') + (ok ? 'Juste' : (v ? 'Faux' : 'Sans réponse')) + ' · ' + String(Math.round((ok ? pq : 0) * 100) / 100).replace('.', ',') + '/' + String(Math.round(pq * 100) / 100).replace('.', ',') + '</div><div class="corr"><b>Correction.</b> ' + (q.type === 'qcm' ? '<b>' + q.choix[q.rep] + '</b>. ' : '') + q.corr + '</div></div>';
          if (q.type === 'qcm') U.$$('[data-q="' + k + '"]', main).forEach(function (x) { x.disabled = true; var ci = +x.getAttribute('data-ci'); if (ci === q.rep) x.classList.add('is-ok'); else if (String(ci) === v) x.classList.add('is-ko'); });
        });
      });
      var note = Math.round(total * 2) / 2;
      if (!s.sujetsFaits[S.id] || note > s.sujetsFaits[S.id]) s.sujetsFaits[S.id] = note;
      var xp = Progres.gagner('examen', { niveau: S.niveau, note: note, titre: S.titre });
      U.math(main);
      this.remove();
      var res = U.$('#sj-res', main);
      res.innerHTML = '<div class="card end-card" style="margin-top:18px">' + Mascotte.bulle(note >= 16 ? 'Excellent travail, c\'est une copie solide !' : note >= 10 ? 'C\'est la moyenne : relis les corrections des questions ratées.' : 'Courage : chaque correction lue te rapproche du jour J.', note >= 10 ? 'bravo' : 'pense') + '<div class="end-score">' + String(note).replace('.', ',') + ' / 20</div><p>+' + xp + ' XP</p><div class="btn-row" style="justify-content:center"><a class="btn" href="#/sujets">Autres sujets</a></div></div>';
      res.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  }

  /* ============================================================
     Mascotte personnalisable
     ============================================================ */
  var ACCESSOIRES = [['', 'Aucun'], ['lunettes', 'Lunettes'], ['chapeau', 'Chapeau haut-de-forme'], ['diplome', 'Toque de diplômé'], ['couronne', 'Couronne'], ['noeud', 'Nœud papillon'], ['echarpe', 'Écharpe'], ['casquette', 'Casquette']];
  var TEINTES = [['', 'Couleurs du design'], ['#ffd23f', 'Soleil'], ['#bbf7d0', 'Menthe'], ['#bae6fd', 'Ciel'], ['#fbcfe8', 'Rose'], ['#ddd6fe', 'Lavande'], ['#fed7aa', 'Abricot'], ['#1f2937', 'Nuit']];
  function svgAccessoire(a) {
    var t = 'var(--masc-trait)';
    switch (a) {
      case 'lunettes': return '<g fill="none" stroke="' + t + '" stroke-width="2"><circle cx="27" cy="29" r="5"/><circle cx="37" cy="29" r="5"/><path d="M32 29h0M22 28l-4-2M42 28l4-2"/></g>';
      case 'chapeau': return '<g fill="' + t + '"><rect x="21" y="2" width="22" height="16" rx="2"/><rect x="14" y="16" width="36" height="4" rx="2"/></g><rect x="21" y="12" width="22" height="3" fill="#dc2626"/>';
      case 'diplome': return '<g fill="' + t + '"><path d="M32 6l20 7-20 7-20-7z"/><rect x="24" y="14" width="16" height="6" rx="2"/></g><path d="M50 13v9" stroke="#eab308" stroke-width="2"/><circle cx="50" cy="23" r="2" fill="#eab308"/>';
      case 'couronne': return '<path d="M18 19l3-12 6 7 5-10 5 10 6-7 3 12z" fill="#facc15" stroke="#a16207" stroke-width="1.5" stroke-linejoin="round"/>';
      case 'noeud': return '<path d="M32 50l-9-5v10zM32 50l9-5v10z" fill="#dc2626" stroke="' + t + '" stroke-width="1.2"/><circle cx="32" cy="50" r="2.4" fill="#991b1b"/>';
      case 'echarpe': return '<path d="M14 44q18 8 36 0l1 5q-19 9-38 0z" fill="#2563eb"/><path d="M40 48l3 12h5l-3-13z" fill="#1d4ed8"/>';
      case 'casquette': return '<path d="M15 20q2-14 17-14t17 14z" fill="#16a34a"/><path d="M45 19q10 0 13 3h-16z" fill="#15803d"/>';
    }
    return '';
  }
  function decorerMascotte(svg) {
    var m = Store.get().mascotte;
    if (!m || !Store.estPremium()) return svg;
    /* fond clair : yeux et bouche foncés, quel que soit le design ; fond « Nuit » : traits clairs */
    var style = m.fond ? '--masc-fond:' + m.fond + ';' + (m.fond === '#1f2937' ? '--masc-ink:#f9fafb;--masc-trait:#f9fafb;' : '--masc-ink:#1f2937;') : '';
    return svg.replace('<svg class="masc"', '<svg class="masc" style="' + style + '"').replace('</svg>', svgAccessoire(m.acc) + '</svg>');
  }
  function editeurMascotte() {
    var s = Store.get();
    if (!Store.estPremium()) { Modal.ouvrir('<h2 id="modal-title">Mascotte personnalisable</h2>' + Mascotte.bulle('Change mes couleurs et ajoute-moi des accessoires : c\'est réservé aux abonnés !', 'content') + '<div class="btn-row"><a class="btn" href="#/abonnement" data-close>' + I('crown') + 'Voir les offres</a></div>'); return; }
    s.mascotte = s.mascotte || { fond: '', acc: '' };
    function rendu() {
      Modal.ouvrir('<h2 id="modal-title">Ma mascotte</h2><div class="masc-apercu">' + Mascotte.svg('bravo') + '</div>' +
        '<h3 style="font-size:1rem">Couleur</h3><div class="masc-choix">' + TEINTES.map(function (t) { return '<button type="button" class="sw' + (t[0] ? '' : ' sw-none') + '" data-teinte="' + t[0] + '" style="--sw:' + (t[0] || 'transparent') + '" aria-checked="' + (s.mascotte.fond === t[0]) + '" role="radio" title="' + t[1] + '"></button>'; }).join('') + '</div>' +
        '<h3 style="font-size:1rem;margin-top:14px">Accessoire</h3><div class="masc-acc">' + ACCESSOIRES.map(function (a) { return '<button type="button" class="cb' + (s.mascotte.acc === a[0] ? ' on' : '') + '" data-acc="' + a[0] + '">' + a[1] + '</button>'; }).join('') + '</div>' +
        '<div class="btn-row" style="margin-top:16px"><button class="btn" type="button" data-close>Terminé</button></div>');
      U.$('#modal-body').onclick = function (e) {
        var t = e.target.closest('[data-teinte]'), a = e.target.closest('[data-acc]');
        if (t) { s.mascotte.fond = t.getAttribute('data-teinte'); Store.save(); rendu(); }
        if (a) { s.mascotte.acc = a.getAttribute('data-acc'); Store.save(); rendu(); }
      };
    }
    rendu();
  }

  /* ============================================================
     Hors connexion complet
     ============================================================ */
  var KATEX_POLICES = ['AMS-Regular', 'Caligraphic-Bold', 'Caligraphic-Regular', 'Fraktur-Bold', 'Fraktur-Regular', 'Main-Bold', 'Main-BoldItalic', 'Main-Italic', 'Main-Regular', 'Math-BoldItalic', 'Math-Italic', 'SansSerif-Bold', 'SansSerif-Italic', 'SansSerif-Regular', 'Script-Regular', 'Size1-Regular', 'Size2-Regular', 'Size3-Regular', 'Size4-Regular', 'Typewriter-Regular'];
  function toutTelecharger(bouton) {
    if (!Store.estPremium()) { location.hash = '#/abonnement'; return; }
    if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) { toast('Le mode hors connexion n\'est pas disponible dans ce navigateur (ou la page doit être rechargée une fois).'); return; }
    var urls = KATEX_POLICES.map(function (p) { return 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/fonts/KaTeX_' + p + '.woff2'; })
      .concat(Object.keys(window.VIDEOS || {}).map(function (k) { return 'https://i.ytimg.com/vi/' + VIDEOS[k].id + '/hqdefault.jpg'; }))
      .concat(['firebase-app.js', 'firebase-auth.js', 'firebase-firestore.js'].map(function (f) { return 'https://www.gstatic.com/firebasejs/10.12.2/' + f; }));
    if (bouton) { bouton.disabled = true; bouton.textContent = 'Téléchargement…'; }
    var canal = new MessageChannel();
    canal.port1.onmessage = function (e) {
      var d = e.data || {};
      if (bouton) { bouton.disabled = false; bouton.textContent = 'Mettre à jour le téléchargement'; }
      Store.get().horsLigne = U.today(); Store.save();
      toast('Prêt pour le hors connexion : ' + d.ok + ' fichiers enregistrés' + (d.ko ? ' (' + d.ko + ' indisponibles)' : '') + '.');
    };
    navigator.serviceWorker.controller.postMessage({ type: 'tout', urls: urls }, [canal.port2]);
  }

  window.Premium = {
    plan: vPlan, bilan: vBilan, sujets: vSujets, nouveautes: vNouveautes, bandeauPlan: bandeauPlan, NOUVEAUTES: NOUVEAUTES, anticipe: anticipe,
    decorerMascotte: decorerMascotte, editeurMascotte: editeurMascotte, toutTelecharger: toutTelecharger
  };
})();
