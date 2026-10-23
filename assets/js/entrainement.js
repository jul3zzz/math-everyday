/* Math Everyday — s'entraîner : révisions espacées (cartes mémo), entraînement à l'infini,
   examens blancs (brevet, bac, concours), page Progrès. Expose window.Entrainement. */
(function () {
  'use strict';
  var esc = U.esc;
  var INTERVALLES = [1, 3, 7, 14, 30, 60, 120];
  var LIMITE_EXOS_GRATUITS = 10;

  function st() { var s = Store.get(); s.srs = s.srs || {}; s.entr = s.entr || { jour: null, n: 0 }; s.examensSem = s.examensSem || {}; return s; }
  function lecon(id) { return Vues.lecon_(id); }
  function page(inner, narrow) { return '<section class="page"><div class="wrap' + (narrow ? ' wrap-narrow' : '') + '">' + inner + '</div></section>'; }
  function chipNiv(nid) { var n = niv(nid); return '<span class="chip chip-lvl lv-' + nid + '">' + (n ? n.nom : nid) + '</span>'; }
  function exige(main) {
    if (!Store.connecte()) { location.hash = '#/compte'; return false; }
    if (!Store.get().niveau) { location.hash = '#/test'; return false; }
    return true;
  }

  /* ============================================================
     Cartes de révision
     ============================================================ */
  /* Chaque leçon faite donne 4 cartes : ses 3 exercices + ses points clés. */
  function cartesDe(l) {
    var c = l.exos.map(function (e, i) { return { id: l.id + '#' + i, lecon: l.id, exo: i }; });
    if (l.retenir && l.retenir.length) c.push({ id: l.id + '#r', lecon: l.id, exo: 'r' });
    return c;
  }
  function synchroniser() {
    var s = st(), ajout = 0;
    Object.keys(s.faites).forEach(function (id) {
      var l = lecon(id); if (!l) return;
      cartesDe(l).forEach(function (c) { if (!s.srs[c.id]) { s.srs[c.id] = { boite: 0, due: U.addDays(s.faites[id].date, 1) }; ajout++; } });
    });
    if (ajout) Store.save();
  }
  function dues() {
    synchroniser();
    var s = st(), auj = U.today();
    return Object.keys(s.srs).filter(function (k) { return s.srs[k].due <= auj; }).sort(function (a, b) { return s.srs[a].due < s.srs[b].due ? -1 : 1; });
  }
  function noter(id, resultat) {
    var s = st(), c = s.srs[id] || { boite: 0 };
    if (resultat === 'non') { c.boite = 0; c.due = U.addDays(U.today(), 1); }
    else if (resultat === 'bof') { c.due = U.addDays(U.today(), Math.max(1, Math.round(INTERVALLES[c.boite] / 2))); }
    else { c.boite = Math.min(INTERVALLES.length - 1, c.boite + 1); c.due = U.addDays(U.today(), INTERVALLES[c.boite]); }
    c.vue = U.today(); s.srs[id] = c; Store.save();
    Progres.gagner('carte', { su: resultat === 'oui' });
  }

  function vRevisions(main) {
    if (!exige(main)) return;
    var s = st(), liste = dues(), total = Object.keys(s.srs).length;
    var maitrisees = Object.keys(s.srs).filter(function (k) { return s.srs[k].boite >= 4; }).length;
    var file = liste.slice(0, 30), i = 0, ok = 0, entrainementLibre = false;
    function entete() {
      return '<div class="row" style="justify-content:space-between;margin-bottom:18px"><div><span class="eyebrow">Révisions espacées</span><h1 style="margin:0">Cartes mémo</h1></div>' +
        '<div class="stats"><div class="stat">' + I('refresh') + '<span><b>' + liste.length + '</b><small>à revoir</small></span></div><div class="stat">' + I('book') + '<span><b>' + total + '</b><small>cartes</small></span></div><div class="stat">' + I('star') + '<span><b>' + maitrisees + '</b><small>maîtrisées</small></span></div></div></div>';
    }
    if (!total) {
      main.innerHTML = page(entete() + '<div class="card center">' + Mascotte.bulle('Termine une leçon et ses cartes mémo arriveront ici : elles reviendront le lendemain, puis à 3, 7, 14, 30 jours… juste avant que tu les oublies.', 'pense') + '<a class="btn" href="#/aujourdhui">Faire ma leçon du jour</a></div>', true);
      return;
    }
    if (!file.length) {
      main.innerHTML = page(entete() + '<div class="card center">' + Mascotte.bulle('Tout est à jour ! Prochaine carte : ' + prochaine() + '.', 'bravo') + '<button class="btn btn-2" type="button" id="rv-libre">Réviser quand même (10 cartes au hasard)</button></div>', true);
      U.$('#rv-libre', main).onclick = function () { file = U.shuffle(Object.keys(s.srs)).slice(0, 10); entrainementLibre = true; carte(); };
      return;
    }
    carte();
    function prochaine() {
      var d = Object.keys(s.srs).map(function (k) { return s.srs[k].due; }).sort()[0];
      return d ? new Date(d + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) : '—';
    }
    function carte() {
      if (i >= file.length) {
        main.innerHTML = page(entete() + '<div class="card end-card">' + Mascotte.bulle('Session terminée : ' + ok + ' carte' + (ok > 1 ? 's' : '') + ' sur ' + file.length + ' sues du premier coup. Les autres reviendront bientôt.', 'bravo') + '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/sentrainer">' + I('arrow') + 'Continuer à s\'entraîner</a><a class="btn btn-2" href="#/aujourdhui">Aujourd\'hui</a></div></div>', true);
        return;
      }
      var id = file[i], p = id.split('#'), l = lecon(p[0]);
      if (!l) { i++; carte(); return; }
      var recto, verso;
      if (p[1] === 'r') { recto = 'Quels sont les points clés de la leçon <b>« ' + esc(l.titre) + ' »</b> ? Essaie de les redire de tête.'; verso = '<ul class="retenir">' + l.retenir.map(function (x) { return '<li>' + I('check') + '<span>' + x + '</span></li>'; }).join('') + '</ul>'; }
      else { var e = l.exos[+p[1]]; recto = e.q + (e.type === 'qcm' ? '<ol class="rv-choix">' + e.choix.map(function (c) { return '<li>' + c + '</li>'; }).join('') + '</ol>' : ''); verso = (e.type === 'qcm' ? '<p><b>Réponse :</b> ' + e.choix[e.rep] + '</p>' : '') + e.corr; }
      main.innerHTML = page(entete() +
        '<div class="quiz-top"><span class="quiz-count">' + (i + 1) + ' / ' + file.length + '</span><div class="progress"><i style="width:' + (i / file.length * 100) + '%"></i></div></div>' +
        '<div class="card rv-carte"><div class="row" style="margin-bottom:12px">' + chipNiv(l.niveau) + '<span class="chip">' + esc(l.titre) + '</span>' + (entrainementLibre ? '' : '<span class="chip">Boîte ' + (s.srs[id].boite + 1) + '</span>') + '</div>' +
        '<div class="rv-recto">' + recto + '</div><div class="rv-verso" id="rv-verso" hidden><hr class="rule">' + verso + '</div>' +
        '<div class="btn-row" id="rv-a" style="margin-top:18px"><button class="btn" type="button" id="rv-voir">Voir la réponse <span class="kbd">Espace</span></button></div>' +
        '<div class="btn-row rv-notes" id="rv-b" hidden><button class="btn btn-2" type="button" data-n="non">À revoir <span class="kbd">1</span></button><button class="btn btn-2" type="button" data-n="bof">Hésitant <span class="kbd">2</span></button><button class="btn" type="button" data-n="oui">Je savais <span class="kbd">3</span></button></div></div>', true);
      U.math(main);
      U.$('#rv-voir', main).onclick = voir;
      U.$('#rv-b', main).onclick = function (e) { var b = e.target.closest('[data-n]'); if (b) suivant(b.getAttribute('data-n')); };
      document.onkeydown = function (e) {
        if (!document.body.contains(U.$('#rv-a', main))) { document.onkeydown = null; return; }
        if (e.target.closest('input,textarea,[contenteditable]')) return;
        if (e.key === ' ' && !U.$('#rv-a', main).hidden) { e.preventDefault(); voir(); }
        else if (!U.$('#rv-b', main).hidden && /^[123]$/.test(e.key)) suivant(['non', 'bof', 'oui'][+e.key - 1]);
      };
      function voir() { U.$('#rv-verso', main).hidden = false; U.$('#rv-a', main).hidden = true; U.$('#rv-b', main).hidden = false; U.math(U.$('#rv-verso', main)); }
      function suivant(n) { if (n === 'oui') ok++; if (!entrainementLibre) noter(id, n); else Progres.gagner('carte', { su: n === 'oui' }); i++; carte(); window.scrollTo(0, 0); }
    }
  }

  /* ============================================================
     Entraînement à l'infini
     ============================================================ */
  function quotaExos() {
    var s = st();
    if (Store.estPremium()) return Infinity;
    if (s.entr.jour !== U.today()) { s.entr.jour = U.today(); s.entr.n = 0; }
    return Math.max(0, LIMITE_EXOS_GRATUITS - s.entr.n);
  }
  function vEntrainement(main, cible) {
    if (!exige(main)) return;
    var s = st();
    if (!cible) {
      var nid = s.entrNiv || s.niveau;
      var tabs = NIVEAUX.map(function (n) { return '<button type="button" class="tab" role="tab" data-niv="' + n.id + '" aria-selected="' + (n.id === nid) + '">' + n.nom + '</button>'; }).join('');
      var L = LECONS.filter(function (l) { return l.niveau === nid; });
      main.innerHTML = page('<span class="eyebrow">Entraînement</span><h1>Des exercices à l\'infini</h1>' +
        '<p class="muted">Choisis un chapitre : chaque exercice est nouveau, avec des nombres tirés au hasard et sa correction.' + (Store.estPremium() ? '' : ' Formule gratuite : ' + LIMITE_EXOS_GRATUITS + ' exercices par jour (il t\'en reste ' + quotaExos() + ').') + '</p>' +
        '<div class="tabs" role="tablist">' + tabs + '</div>' +
        '<a class="pl pl-mix" href="#/entrainement/mix-' + nid + '"><span class="pl-n">' + I('refresh') + '</span><span class="pl-t"><b>Tout le niveau ' + esc(niv(nid).long) + '</b><span>Exercices mélangés de tous les chapitres</span></span>' + I('arrow') + '</a>' +
        '<div class="prog-list" style="margin-top:12px">' + L.map(function (l) { return '<a class="pl" href="#/entrainement/' + l.id + '"><span class="pl-n">' + l.ordre + '</span><span class="pl-t"><b>' + esc(l.titre) + '</b><span>' + esc(l.domaine) + '</span></span>' + I('arrow') + '</a>'; }).join('') + '</div>');
      main.onclick = function (e) { var b = e.target.closest('[data-niv]'); if (b) { s.entrNiv = b.getAttribute('data-niv'); Store.save(); vEntrainement(main); } };
      return;
    }
    var mix = cible.indexOf('mix-') === 0, nivMix = mix ? cible.slice(4) : null;
    var pool = mix ? LECONS.filter(function (l) { return l.niveau === nivMix; }) : [lecon(cible)];
    if (!pool[0]) { location.hash = '#/entrainement'; return; }
    var justes = 0, total = 0, serie = 0, meilleure = 0;
    nouvel();
    function nouvel() {
      if (quotaExos() <= 0) {
        main.innerHTML = page('<div class="card center">' + Mascotte.bulle('Tu as fait tes ' + LIMITE_EXOS_GRATUITS + ' exercices gratuits du jour. Reviens demain, ou passe à l\'illimité pour t\'entraîner sans limite.', 'pense') + '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/abonnement">' + I('crown') + 'Voir les offres</a><a class="btn btn-2" href="#/revisions">Réviser mes cartes</a></div></div>', true);
        return;
      }
      var l = pool[Math.floor(Math.random() * pool.length)], gen = window.GENERATEURS[l.id];
      var e = gen ? gen() : l.exos[Math.floor(Math.random() * l.exos.length)];
      main.innerHTML = page('<div class="row" style="justify-content:space-between;margin-bottom:16px"><div><a class="small muted" href="#/entrainement">← Chapitres</a><h1 style="margin:6px 0 0;font-size:1.6rem">' + esc(mix ? 'Tout le niveau ' + niv(nivMix).long : l.titre) + '</h1></div>' +
        '<div class="stats"><div class="stat">' + I('check') + '<span><b>' + justes + '/' + total + '</b><small>justes</small></span></div><div class="stat">' + I('flame') + '<span><b>' + serie + '</b><small>de suite</small></span></div>' + (Store.estPremium() ? '' : '<div class="stat">' + I('lock') + '<span><b>' + quotaExos() + '</b><small>restants</small></span></div>') + '</div></div>' +
        (mix ? '<p class="small muted">Chapitre : ' + esc(l.titre) + '</p>' : '') +
        '<div class="card" id="en-exo"></div><div class="btn-row" style="margin-top:14px"><button class="btn hidden" type="button" id="en-next">' + I('refresh') + 'Exercice suivant</button><a class="btn btn-ghost" href="#/lecon/' + l.id + '">Revoir le cours</a></div>', true);
      Exo.monter(U.$('#en-exo', main), e, {
        num: total + 1, essais: 2, etiquette: 'Entraînement',
        onFin: function (premier, ok) {
          total++; st().entr.n++;
          if (ok) { justes++; serie++; meilleure = Math.max(meilleure, serie); Progres.gagner('exo', { ok: true }); } else { serie = 0; Progres.rate(); }
          Store.save();
          var nx = U.$('#en-next', main); nx.classList.remove('hidden'); nx.focus();
          nx.onclick = nouvel;
        }
      });
    }
  }

  /* ============================================================
     Examens blancs
     ============================================================ */
  function nomExamen(nid) { return { '3e': 'Brevet blanc', tle: 'Bac blanc', mpsi: 'Concours blanc' }[nid] || 'Devoir blanc'; }
  function configExamen(nid) {
    var grand = nid === '3e' || nid === 'tle' || nid === 'mpsi';
    return { n: grand ? 15 : 10, minutes: grand ? (nid === 'mpsi' ? 60 : 45) : 30 };
  }
  function cleSemaine() { var p = Progres.semaine(); return p.lundi; }
  function vExamens(main, nidChoisi) {
    if (!exige(main)) return;
    var s = st(), dejaCetteSemaine = s.examensSem[cleSemaine()] || 0;
    var libre = Store.estPremium() || dejaCetteSemaine < 1;
    if (!nidChoisi) {
      var hist = (s.stats && s.stats.examens) || [];
      main.innerHTML = page('<span class="eyebrow">Examens blancs</span><h1>En conditions réelles</h1>' +
        '<p class="muted">Un chronomètre, des exercices de tout le programme du niveau, aucune correction avant la fin, et une note sur 20. Les exercices changent à chaque fois.' + (Store.estPremium() ? '' : ' Formule gratuite : 1 examen blanc par semaine' + (libre ? ' (disponible).' : ' (déjà utilisé cette semaine).')) + '</p>' +
        '<div class="grid g4" style="margin-top:20px">' + NIVEAUX.map(function (n) {
          var c = configExamen(n.id);
          return '<a class="card ex-carte" href="#/examens/' + n.id + '" style="text-decoration:none">' + chipNiv(n.id) + '<b>' + nomExamen(n.id) + '</b><span class="small muted">' + c.n + ' exercices · ' + c.minutes + ' min</span></a>';
        }).join('') + '</div>' +
        (hist.length ? '<h2 style="margin-top:34px;font-size:1.3rem">Mes examens</h2><table class="compare"><thead><tr><th>Date</th><th>Examen</th><th>Note</th></tr></thead><tbody>' + hist.slice().reverse().slice(0, 12).map(function (h) { return '<tr><td>' + esc(h.date) + '</td><td>' + esc(h.titre || h.niveau) + '</td><td><b>' + String(h.note).replace('.', ',') + '/20</b></td></tr>'; }).join('') + '</tbody></table>' : ''));
      return;
    }
    if (!niv(nidChoisi)) { location.hash = '#/examens'; return; }
    if (!libre) {
      main.innerHTML = page('<div class="card center">' + Mascotte.bulle('Tu as déjà passé ton examen blanc gratuit cette semaine. Il revient lundi ! Avec l\'abonnement, les examens sont illimités.', 'pense') + '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/abonnement">' + I('crown') + 'Voir les offres</a><a class="btn btn-2" href="#/entrainement">S\'entraîner</a></div></div>', true);
      return;
    }
    var cfg = configExamen(nidChoisi), titre = nomExamen(nidChoisi) + ' — ' + niv(nidChoisi).long;
    main.innerHTML = page('<span class="eyebrow">' + esc(nomExamen(nidChoisi)) + '</span><h1>' + esc(titre) + '</h1>' +
      '<div class="card"><ul class="retenir"><li>' + I('clock') + '<span><b>' + cfg.minutes + ' minutes</b> pour <b>' + cfg.n + ' exercices</b> tirés de tout le programme.</span></li>' +
      '<li>' + I('pencil') + '<span>Tu peux naviguer librement entre les exercices et modifier tes réponses.</span></li>' +
      '<li>' + I('check') + '<span>La correction détaillée et ta note sur 20 s\'affichent à la fin (ou quand le temps est écoulé).</span></li>' +
      '<li>' + I('bulb') + '<span>La calculatrice et le brouillon restent disponibles (boutons en bas à droite), comme une calculatrice autorisée.</span></li></ul>' +
      '<div class="btn-row" style="margin-top:18px"><button class="btn btn-lg" type="button" id="ex-go">' + I('arrow') + 'Commencer l\'examen</button><a class="btn btn-ghost" href="#/examens">Annuler</a></div></div>', true);
    U.$('#ex-go', main).onclick = function () { lancer(main, nidChoisi, cfg, titre); };
  }
  function lancer(main, nid, cfg, titre) {
    var s = st();
    s.examensSem[cleSemaine()] = (s.examensSem[cleSemaine()] || 0) + 1; Store.save();
    var L = U.shuffle(LECONS.filter(function (l) { return l.niveau === nid; }));
    var qs = [];
    for (var k = 0; qs.length < cfg.n; k++) {
      var l = L[k % L.length], g = window.GENERATEURS[l.id];
      qs.push({ l: l, e: g && Math.random() < 0.75 ? g() : l.exos[Math.floor(Math.random() * l.exos.length)], rep: '' });
    }
    var fin = Date.now() + cfg.minutes * 60000, cur = 0, chrono = null, termine = false;
    function render() {
      var q = qs[cur], e = q.e;
      var champ = e.type === 'qcm'
        ? '<div class="choices">' + e.choix.map(function (c, i) { return '<button type="button" class="choice" data-ci="' + i + '" aria-pressed="' + (String(q.rep) === String(i)) + '"><span class="choice-l">' + 'ABCD'[i] + '</span><span>' + c + '</span></button>'; }).join('') + '</div>'
        : '<div class="answer"><label class="sr" for="ex-in">Ta réponse</label><input class="input" id="ex-in" autocomplete="off" spellcheck="false" placeholder="Ta réponse" value="' + esc(q.rep) + '">' + (e.unite ? '<span class="muted">' + e.unite + '</span>' : '') + '<span class="hint">' + esc(Check.aide(e)) + '</span></div>';
      main.innerHTML = page('<div class="ex-barre"><b>' + esc(titre) + '</b><span class="spacer"></span><span class="ex-chrono" id="ex-chrono"></span><button class="btn btn-sm" type="button" id="ex-rendre">Rendre la copie</button></div>' +
        '<div class="ex-nav" role="navigation" aria-label="Exercices">' + qs.map(function (x, i) { return '<button type="button" class="ex-n' + (i === cur ? ' on' : '') + (x.rep !== '' ? ' fait' : '') + '" data-q="' + i + '" aria-label="Exercice ' + (i + 1) + '">' + (i + 1) + '</button>'; }).join('') + '</div>' +
        '<div class="card"><div class="exo-h"><span class="block-num">' + (cur + 1) + '</span><b>Exercice ' + (cur + 1) + ' / ' + qs.length + '</b><span class="chip">' + esc(q.l.domaine) + '</span></div><div class="exo-q">' + e.q + '</div>' + champ + '</div>' +
        '<div class="btn-row" style="margin-top:14px"><button class="btn btn-2" type="button" id="ex-prec"' + (cur ? '' : ' disabled') + '>Précédent</button><button class="btn" type="button" id="ex-suiv">' + (cur < qs.length - 1 ? 'Suivant' : 'Terminer') + '</button></div>', true);
      U.math(main); tic();
      var inp = U.$('#ex-in', main);
      if (inp) { inp.oninput = function () { q.rep = inp.value; }; inp.onkeydown = function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); aller(cur + 1); } }; if (window.matchMedia('(pointer:fine)').matches) inp.focus(); }
      main.onclick = function (ev) {
        var c = ev.target.closest('[data-ci]'); if (c) { q.rep = c.getAttribute('data-ci'); U.$$('[data-ci]', main).forEach(function (x) { x.setAttribute('aria-pressed', x === c); }); return; }
        var n = ev.target.closest('[data-q]'); if (n) { aller(+n.getAttribute('data-q')); return; }
        if (ev.target.closest('#ex-prec')) aller(cur - 1);
        else if (ev.target.closest('#ex-suiv')) { if (cur < qs.length - 1) aller(cur + 1); else rendre(); }
        else if (ev.target.closest('#ex-rendre')) rendre();
      };
    }
    function aller(i) { if (i < 0 || i >= qs.length) return; cur = i; render(); }
    function tic() {
      var el = U.$('#ex-chrono', main); if (!el) return;
      var r0 = Math.max(0, fin - Date.now()), m = Math.floor(r0 / 60000), sec = Math.floor(r0 % 60000 / 1000);
      el.textContent = m + ' min ' + String(sec).padStart(2, '0') + ' s';
      el.classList.toggle('urgent', r0 < 5 * 60000);
      if (r0 <= 0 && !termine) { toast('Temps écoulé : la copie est ramassée.'); corriger(); }
    }
    chrono = setInterval(function () { if (!document.body.contains(main.querySelector('.ex-barre'))) { if (!termine) clearInterval(chrono); return; } tic(); }, 1000);
    function rendre() {
      var vides = qs.filter(function (q) { return q.rep === ''; }).length;
      if (vides) {
        Modal.ouvrir('<h2 id="modal-title">Rendre la copie ?</h2><p class="muted">' + vides + ' exercice' + (vides > 1 ? 's sont' : ' est') + ' sans réponse.</p><div class="btn-row"><button class="btn" type="button" id="m-rendre">Rendre quand même</button><button class="btn btn-2" type="button" data-close autofocus>Continuer</button></div>');
        U.$('#m-rendre').onclick = function () { Modal.fermer(); corriger(); };
      } else corriger();
    }
    function corriger() {
      termine = true; clearInterval(chrono);
      var justes = 0;
      qs.forEach(function (q) { q.ok = q.rep !== '' && Check.juger(q.e, q.rep); if (q.ok) justes++; });
      var note = Math.round(justes / qs.length * 40) / 2;
      var xp = Progres.gagner('examen', { niveau: nid, note: note, titre: nomExamen(nid) + ' ' + niv(nid).nom });
      var appr = note >= 18 ? 'Excellent, c\'est une copie de major !' : note >= 16 ? 'Très bien, mention très bien !' : note >= 14 ? 'Bien, mention bien.' : note >= 12 ? 'Assez bien.' : note >= 10 ? 'C\'est la moyenne : relis les corrections.' : 'Il reste du travail : les chapitres ratés sont listés ci-dessous.';
      main.innerHTML = page('<div class="card end-card">' + Mascotte.bulle(appr, note >= 10 ? 'bravo' : 'pense') + '<span class="eyebrow">' + esc(titre) + '</span><div class="end-score">' + String(note).replace('.', ',') + ' / 20</div><p>' + justes + ' exercice' + (justes > 1 ? 's' : '') + ' juste' + (justes > 1 ? 's' : '') + ' sur ' + qs.length + ' · +' + xp + ' XP</p>' +
        '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/examens">' + I('refresh') + 'Autres examens</a><a class="btn btn-2" href="#/entrainement">S\'entraîner</a></div></div>' +
        '<h2 style="margin-top:28px;font-size:1.3rem">Correction</h2>' +
        qs.map(function (q, i) {
          var e = q.e, ta = e.type === 'qcm' ? (q.rep !== '' ? e.choix[+q.rep] : '—') : esc(q.rep || '—');
          return '<div class="card" style="margin-bottom:12px"><div class="exo-h"><span class="block-num">' + (i + 1) + '</span><b>' + esc(q.l.titre) + '</b>' + (q.ok ? '<span class="chip" style="color:var(--ok);border-color:var(--ok)">' + I('check') + 'Juste</span>' : '<span class="chip" style="color:var(--ko);border-color:var(--ko)">' + I('x') + 'Faux</span>') + '</div>' +
            '<div class="exo-q">' + e.q + '</div><p class="small"><b>Ta réponse :</b> ' + ta + '</p><div class="fb ' + (q.ok ? 'ok' : 'ko') + '"><div class="corr"><b>Correction.</b> ' + (e.type === 'qcm' ? '<b>' + e.choix[e.rep] + '</b>. ' : '') + e.corr + '</div></div>' +
            (q.ok ? '' : '<a class="small" href="#/lecon/' + q.l.id + '">Revoir la leçon « ' + esc(q.l.titre) + ' »</a>') + '</div>';
        }).join(''), true);
      U.math(main); window.scrollTo(0, 0);
    }
    render();
  }

  /* ============================================================
     Hub « S'entraîner »
     ============================================================ */
  function vHub(main) {
    if (!exige(main)) return;
    var nd = dues().length, s = st();
    var tuiles = [
      ['#/revisions', 'refresh', 'Cartes mémo', nd ? nd + ' carte' + (nd > 1 ? 's' : '') + ' à revoir aujourd\'hui' : 'Révisions espacées des leçons déjà faites', nd],
      ['#/entrainement', 'pencil', 'Entraînement', 'Des exercices nouveaux à l\'infini, chapitre par chapitre'],
      ['#/examens', 'clock', 'Examens blancs', 'Brevet, bac et concours blancs chronométrés, notés sur 20'],
      ['#/fiches', 'book', 'Fiches résumé', 'Une fiche d\'une page par leçon, à imprimer ou garder en PDF']
    ];
    main.innerHTML = page('<span class="eyebrow">S\'entraîner</span><h1>Ancrer ce que tu as appris</h1>' +
      Mascotte.bulle(nd ? 'Tu as ' + nd + ' carte' + (nd > 1 ? 's' : '') + ' mémo à revoir : c\'est le meilleur moyen de ne rien oublier !' : 'Rien à réviser pour l\'instant. Un peu d\'entraînement ?', nd ? 'content' : 'pense') +
      '<div class="hub">' + tuiles.map(function (t) { return '<a class="card hub-t" href="' + t[0] + '">' + I(t[1]) + '<b>' + t[2] + '</b><span class="muted small">' + t[3] + '</span>' + (t[4] ? '<span class="hub-pastille">' + t[4] + '</span>' : '') + '</a>'; }).join('') + '</div>' +
      '<p class="small muted" style="margin-top:22px">Le formulaire complet, la calculatrice, le brouillon et la géométrie sont dans les outils (boutons en bas à droite).</p>');
  }

  /* ============================================================
     Page Progrès
     ============================================================ */
  function vProgres(main) {
    if (!Store.connecte()) { location.hash = '#/compte'; return; }
    var s = Store.get(), N = Progres.niveau(Progres.xp()), sem = Progres.semaine();
    Progres.verifierBadges();
    var obj = (s.objectif && s.objectif.lecons) || 5;
    var nbF = Object.keys(s.faites).length, st0 = s.stats || { exosOk: 0, exosTot: 0, cartes: 0, examens: [] };
    var badges = Progres.BADGES.map(function (b) {
      var d = s.badges && s.badges[b.id];
      return '<div class="badge' + (d ? ' on' : '') + '" title="' + esc(b.desc) + '">' + I(b.ic) + '<b>' + esc(b.nom) + '</b><span>' + esc(d ? 'obtenu le ' + d : b.desc) + '</span></div>';
    }).join('');
    var nbB = Object.keys(s.badges || {}).length;
    main.innerHTML = page('<span class="eyebrow">Progrès</span><h1>Ton parcours</h1>' +
      '<div class="card niv-carte">' + Mascotte.svg(nbB ? 'bravo' : 'content') + '<div class="niv-t"><span class="small muted">Niveau ' + N.n + '</span><b>' + esc(N.titre) + '</b>' +
      '<div class="progress" style="margin:8px 0 4px"><i style="width:' + (N.dans / N.besoin * 100) + '%"></i></div><span class="small muted mono">' + N.dans + ' / ' + N.besoin + ' XP · total ' + Progres.xp() + ' XP</span></div></div>' +
      '<div class="grid g4" style="margin:18px 0">' +
      tuile('flame', Progres.serie(), 'jours de suite', 'record : ' + Progres.meilleureSerie()) + tuile('book', nbF, 'leçons faites', LECONS.length + ' au total') +
      tuile('pencil', st0.exosOk, 'exercices justes', st0.exosTot ? Math.round(st0.exosOk / st0.exosTot * 100) + ' % de réussite' : 'en entraînement') + tuile('refresh', st0.cartes, 'cartes révisées', nbB + ' badge' + (nbB > 1 ? 's' : '')) + '</div>' +
      '<div class="card"><div class="row" style="justify-content:space-between"><h2 style="margin:0;font-size:1.2rem">Objectif de la semaine</h2><label class="small">Leçons par semaine <select class="input" id="pg-obj" style="min-height:34px;max-width:80px;display:inline-block;margin-left:6px">' + [3, 5, 7, 10, 14].map(function (v) { return '<option' + (v === obj ? ' selected' : '') + '>' + v + '</option>'; }).join('') + '</select></label></div>' +
      '<div class="progress" style="margin:14px 0 6px;height:14px"><i style="width:' + Math.min(100, sem.lecons / obj * 100) + '%"></i></div>' +
      '<p class="small muted" style="margin:0">' + sem.lecons + ' / ' + obj + ' leçons cette semaine · ' + sem.jours + ' jour' + (sem.jours > 1 ? 's' : '') + ' actif' + (sem.jours > 1 ? 's' : '') + ' · ' + sem.xp + ' XP' + (sem.lecons >= obj ? ' · objectif atteint !' : '') + '</p></div>' +
      '<div class="card" style="margin-top:18px"><h2 style="margin:0 0 12px;font-size:1.2rem">Calendrier de série</h2>' + Progres.calendrier(26) + '</div>' +
      '<h2 style="margin-top:28px;font-size:1.3rem">Badges <span class="muted small">' + nbB + ' / ' + Progres.BADGES.length + '</span></h2><div class="badges">' + badges + '</div>');
    U.$('#pg-obj', main).onchange = function () { s.objectif = s.objectif || {}; s.objectif.lecons = +this.value; Store.save(); vProgres(main); };
    function tuile(ic, val, lib, sous) { return '<div class="stat" style="flex-direction:column;align-items:flex-start;padding:16px">' + I(ic) + '<b style="font-size:1.8rem;margin-top:6px">' + val + '</b><small>' + lib + '</small><small class="muted">' + sous + '</small></div>'; }
  }

  window.Entrainement = { hub: vHub, revisions: vRevisions, entrainement: vEntrainement, examens: vExamens, progres: vProgres, dues: function () { return Store.connecte() ? dues().length : 0; }, synchroniser: synchroniser };
})();
