/* Math Everyday — test de niveau : 20 QCM adaptatifs, puis 5 exercices de confirmation, puis création du profil. */
(function () {
  'use strict';
  var NB_Q = 20, NB_CONF = 5;
  var T = null;

  function nouveau() {
    return { etape: 'intro', classe: null, idx: 3, hist: [], used: {}, q: null, estim: null, conf: null, final: null };
  }

  /* Choisit une question non posée au niveau idx, sinon au niveau le plus proche. */
  function tirer(idx) {
    var ordre = [idx];
    for (var d = 1; d < 8; d++) { if (idx - d >= 0) ordre.push(idx - d); if (idx + d < 8) ordre.push(idx + d); }
    for (var o = 0; o < ordre.length; o++) {
      var nid = NIVEAUX[ordre[o]].id;
      var dispo = PLACEMENT.map(function (q, i) { return i; }).filter(function (i) { return PLACEMENT[i].n === nid && !T.used[i]; });
      if (dispo.length) {
        var qi = dispo[Math.floor(Math.random() * dispo.length)];
        T.used[qi] = 1;
        var perm = U.shuffle([0, 1, 2, 3]);
        return { qi: qi, lvl: ordre[o], perm: perm };
      }
    }
    return null;
  }

  /* Estimation : moyenne des niveaux des 10 dernières questions, corrigée par la réussite au niveau atteint. */
  function estimer() {
    var h = T.hist;
    var fin = h.slice(-10);
    var m = fin.reduce(function (s, x) { return s + x.lvl + (x.ok ? 0.5 : -0.5); }, 0) / fin.length;
    var est = Math.max(0, Math.min(7, Math.floor(m + 0.25)));
    var parNiv = NIVEAUX.map(function (n, i) {
      var qs = h.filter(function (x) { return x.lvl === i; });
      return { i: i, n: qs.length, ok: qs.filter(function (x) { return x.ok; }).length };
    });
    var dom = {};
    h.forEach(function (x) {
      var d = PLACEMENT[x.qi].d;
      dom[d] = dom[d] || { n: 0, ok: 0 };
      dom[d].n++; if (x.ok) dom[d].ok++;
    });
    return { idx: est, parNiv: parNiv, dom: dom, score: h.filter(function (x) { return x.ok; }).length };
  }

  function exosConfirmation(idx) {
    var nid = NIVEAUX[idx].id;
    var lec = U.shuffle(LECONS.filter(function (l) { return l.niveau === nid; }));
    var out = [];
    lec.forEach(function (l) {
      if (out.length >= NB_CONF) return;
      var ex = l.exos.filter(function (e) { return e.type !== 'texte'; });
      if (ex.length) out.push({ exo: ex[Math.floor(Math.random() * ex.length)], lecon: l });
    });
    return out;
  }

  /* ---------------- Rendu ---------------- */
  function rendre(main) {
    var h = '';
    if (T.etape === 'intro') h = vIntro();
    else if (T.etape === 'quiz') h = vQuiz();
    else if (T.etape === 'estim') h = vEstim();
    else if (T.etape === 'conf') h = vConf();
    else if (T.etape === 'resultat') h = vResultat();
    else if (T.etape === 'profil') h = vProfil();
    main.innerHTML = '<section class="page"><div class="wrap wrap-narrow">' + h + '</div></section>';
    U.math(main);
    lier(main);
  }

  function vIntro() {
    var g = NIVEAUX.map(function (n, i) {
      return '<button type="button" class="lvl-btn" data-classe="' + i + '" aria-pressed="' + (T.classe === i) + '">' + n.nom + '<small>' + U.esc(n.cycle) + '</small></button>';
    }).join('');
    return '<span class="eyebrow">Test de niveau</span>' +
      '<h1>On commence par voir où tu en es.</h1>' +
      '<p class="muted" style="font-size:1.1rem">20 questions à choix multiples qui s\'adaptent à tes réponses, puis 5 exercices pour confirmer. Compte une vingtaine de minutes. Pas de chrono, pas de note : juste une photo de ton niveau.</p>' +
      '<div class="card" style="margin:28px 0">' +
      '<h3 style="font-size:1.1rem">En quelle classe es-tu ?</h3>' +
      '<p class="muted small">Le test démarre à ce niveau puis monte ou descend selon tes réponses. Facultatif.</p>' +
      '<div class="lvl-grid">' + g + '</div>' +
      '<button type="button" class="btn btn-ghost btn-sm" data-classe="-1" style="margin-top:12px">Je ne sais pas / je suis adulte</button>' +
      '</div>' +
      '<div class="btn-row"><button class="btn btn-lg" type="button" data-go="start">' + I('arrow') + 'Commencer le test</button>' +
      '<span class="muted small">Tu peux répondre « Je ne sais pas » à tout moment.</span></div>';
  }

  function vQuiz() {
    var n = T.hist.length + 1;
    var Q = PLACEMENT[T.q.qi];
    var lettres = 'ABCD';
    var ch = T.q.perm.map(function (ci, k) {
      return '<button type="button" class="choice" data-rep="' + ci + '"><span class="choice-l">' + lettres[k] + '</span><span>' + Q.c[ci] + '</span></button>';
    }).join('');
    return '<div class="quiz-top"><span class="quiz-count">' + n + ' / ' + NB_Q + '</span>' +
      '<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="' + NB_Q + '" aria-valuenow="' + (n - 1) + '"><i style="width:' + ((n - 1) / NB_Q * 100) + '%"></i></div></div>' +
      '<div class="card">' +
      '<div class="row" style="margin-bottom:14px"><span class="chip">' + U.esc(Q.d) + '</span></div>' +
      '<div class="quiz-q">' + Q.q + '</div>' +
      '<div class="choices">' + ch + '</div>' +
      '<div class="row" style="margin-top:16px"><button type="button" class="btn btn-ghost btn-sm" data-rep="-1">Je ne sais pas</button></div>' +
      '</div>';
  }

  function vEstim() {
    var e = T.estim;
    var N = NIVEAUX[e.idx];
    var bars = e.parNiv.filter(function (p) { return p.n; }).map(function (p) {
      var pc = Math.round(p.ok / p.n * 100);
      return '<div class="bar-row"><span class="chip chip-lvl lv-' + NIVEAUX[p.i].id + '">' + NIVEAUX[p.i].nom + '</span>' +
        '<div class="progress"><i style="width:' + pc + '%"></i></div><span>' + p.ok + '/' + p.n + '</span></div>';
    }).join('');
    var doms = Object.keys(e.dom).map(function (d) { return { d: d, r: e.dom[d].ok / e.dom[d].n, n: e.dom[d].n }; });
    doms.sort(function (a, b) { return b.r - a.r; });
    var forts = doms.filter(function (x) { return x.r >= 0.6; }).slice(0, 3).map(function (x) { return x.d; });
    var faibles = doms.filter(function (x) { return x.r < 0.5; }).slice(-3).map(function (x) { return x.d; });
    return '<span class="eyebrow">Étape 1 terminée · ' + e.score + ' bonnes réponses sur ' + NB_Q + '</span>' +
      '<h1>Niveau estimé</h1>' +
      '<div class="big-lvl">' + U.esc(N.long) + '</div>' +
      '<p class="muted">Le test a convergé autour de ce niveau. On vérifie maintenant avec 5 vrais exercices, à rédiger cette fois (pas de choix multiple).</p>' +
      '<div class="card card-flat" style="margin:22px 0"><h3 style="font-size:1.05rem">Réussite par niveau</h3><div class="bars">' + bars + '</div>' +
      (forts.length ? '<p class="small" style="margin:12px 0 4px"><b>Points forts :</b> ' + U.esc(forts.join(', ')) + '</p>' : '') +
      (faibles.length ? '<p class="small" style="margin:0"><b>À travailler :</b> ' + U.esc(faibles.join(', ')) + '</p>' : '') +
      '</div>' +
      '<button class="btn btn-lg" type="button" data-go="conf">' + I('pencil') + 'Faire les 5 exercices</button>';
  }

  function vConf() {
    var c = T.conf;
    var it = c.liste[c.i];
    return '<div class="quiz-top"><span class="quiz-count">Exercice ' + (c.i + 1) + ' / ' + c.liste.length + '</span>' +
      '<div class="progress"><i style="width:' + (c.i / c.liste.length * 100) + '%"></i></div></div>' +
      '<p class="muted small">Niveau ' + U.esc(NIVEAUX[T.estim.idx].long) + ' · tiré de la leçon « ' + U.esc(it.lecon.titre) + ' »</p>' +
      '<div class="card" id="conf-exo"></div>' +
      '<div class="btn-row" style="margin-top:18px"><button class="btn hidden" type="button" data-go="confnext" id="conf-next">' +
      (c.i + 1 < c.liste.length ? 'Exercice suivant' : 'Voir mon résultat') + I('arrow') + '</button></div>';
  }

  function vResultat() {
    var c = T.conf, e = T.estim;
    var N = NIVEAUX[T.final];
    var msg;
    if (T.final === e.idx) msg = c.score + ' exercices réussis sur ' + c.liste.length + ' : ton niveau est confirmé.';
    else if (T.final < e.idx) msg = c.score + ' exercice' + (c.score > 1 ? 's' : '') + ' réussi' + (c.score > 1 ? 's' : '') + ' sur ' + c.liste.length + ' : on te place un cran plus bas pour consolider les bases avant d\'attaquer ' + NIVEAUX[e.idx].long + '.';
    else msg = 'Sans faute ! Tu peux viser plus haut.';
    var g = NIVEAUX.map(function (n, i) {
      return '<button type="button" class="lvl-btn" data-final="' + i + '" aria-pressed="' + (T.final === i) + '">' + n.nom + '<small>' + U.esc(n.cycle) + '</small></button>';
    }).join('');
    return '<span class="eyebrow">Résultat</span>' +
      '<h1>Ton niveau de travail</h1>' +
      '<div class="big-lvl">' + U.esc(N.long) + '</div>' +
      '<p style="font-size:1.08rem">' + msg + '</p>' +
      '<p class="muted">Chaque jour, on te proposera 3 leçons de ce niveau. Tu peux le changer ici ou plus tard dans les réglages.</p>' +
      '<div class="lvl-grid" style="margin:18px 0 28px">' + g + '</div>' +
      '<button class="btn btn-lg" type="button" data-go="profil">' + I('arrow') + 'Créer mon espace</button>';
  }

  function vProfil() {
    var st = Store.get();
    var heures = ['07:00', '08:00', '12:00', '16:30', '17:30', '18:30', '19:30', '20:30'];
    var opts = heures.map(function (h) { return '<option' + (h === st.notif.heure ? ' selected' : '') + '>' + h + '</option>'; }).join('');
    return '<span class="eyebrow">Dernière étape</span>' +
      '<h1>Ton espace Math Everyday</h1>' +
      '<p class="muted">Chaque jour, on t\'envoie un mail avec tes 3 leçons du jour. Une est gratuite : la leçon, ses 3 exercices et une vidéo conseillée, environ 30 minutes.</p>' +
      '<form class="form" id="f-profil" novalidate style="margin-top:22px">' +
      '<div class="field"><label for="p-nom">Prénom</label><input class="input" id="p-nom" name="nom" autocomplete="given-name" required maxlength="40"></div>' +
      '<div class="field"><label for="p-mail">Adresse e-mail</label><input class="input" id="p-mail" name="mail" type="email" autocomplete="email" required maxlength="120"><small>Pour le rappel quotidien. Jamais revendue.</small></div>' +
      '<div class="field"><label for="p-heure">Heure du rappel</label><select class="input" id="p-heure" name="heure">' + opts + '</select></div>' +
      '<label class="switch"><input type="checkbox" name="notif" checked> Recevoir le mail quotidien</label>' +
      '<p class="small muted" id="p-err" role="alert" style="margin:0"></p>' +
      '<div class="btn-row"><button class="btn btn-lg" type="submit">' + I('check') + 'C\'est parti</button></div>' +
      '</form>';
  }

  /* ---------------- Interactions ---------------- */
  function lier(main) {
    main.onclick = function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.hasAttribute('data-classe')) {
        var c = +b.getAttribute('data-classe');
        T.classe = c < 0 ? null : c;
        if (c < 0) { demarrer(3); return; }
        U.$$('[data-classe]', main).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        return;
      }
      if (b.hasAttribute('data-final')) { T.final = +b.getAttribute('data-final'); rendre(main); return; }
      if (b.hasAttribute('data-rep') && T.etape === 'quiz') { repondre(+b.getAttribute('data-rep'), main); return; }
      var go = b.getAttribute('data-go');
      if (go === 'start') demarrer(T.classe == null ? 3 : T.classe);
      else if (go === 'conf') {
        T.conf = { liste: exosConfirmation(T.estim.idx), i: 0, score: 0 };
        T.etape = 'conf'; rendre(main); monterConf(main);
      } else if (go === 'confnext') {
        T.conf.i++;
        if (T.conf.i < T.conf.liste.length) { rendre(main); monterConf(main); }
        else {
          var s = T.conf.score, e = T.estim.idx;
          T.final = s >= 3 ? (s === T.conf.liste.length && e < 7 && T.estim.score >= 17 ? e + 1 : e) : Math.max(0, e - 1);
          T.etape = 'resultat'; rendre(main);
        }
      } else if (go === 'profil') { T.etape = 'profil'; rendre(main); U.$('#p-nom', main).focus(); }
      window.scrollTo(0, 0);
    };
    var f = U.$('#f-profil', main);
    if (f) f.onsubmit = function (e) {
      e.preventDefault();
      var nom = f.nom.value.trim(), mail = f.mail.value.trim();
      var err = U.$('#p-err', main);
      if (!nom) { err.textContent = 'Indique ton prénom.'; f.nom.focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) { err.textContent = 'Cette adresse e-mail ne semble pas valide.'; f.mail.focus(); return; }
      Store.set({
        profil: { nom: nom, mail: mail, cree: U.today() },
        niveau: NIVEAUX[T.final].id,
        placement: { date: U.today(), estime: NIVEAUX[T.estim.idx].id, score: T.estim.score, conf: T.conf.score, classe: T.classe != null ? NIVEAUX[T.classe].id : null },
        notif: { actif: f.notif.checked, heure: f.heure.value },
        jour: null
      });
      T = null;
      location.hash = '#/aujourdhui';
      toast('Bienvenue ' + nom + ' ! Voici tes leçons du jour.');
    };
  }

  function demarrer(idx) {
    T.idx = idx; T.hist = []; T.used = {};
    T.q = tirer(idx); T.etape = 'quiz';
    rendre(document.getElementById('main'));
  }

  function repondre(ci, main) {
    var ok = ci === 0;
    T.hist.push({ qi: T.q.qi, lvl: T.q.lvl, ok: ok });
    T.idx = Math.max(0, Math.min(7, T.q.lvl + (ok ? 1 : -1)));
    if (T.hist.length >= NB_Q) {
      T.estim = estimer();
      T.etape = 'estim';
    } else {
      T.q = tirer(T.idx);
    }
    rendre(main);
    var first = U.$('.choice', main);
    if (first) first.focus({ preventScroll: true });
  }

  function monterConf(main) {
    var c = T.conf, it = c.liste[c.i];
    Exo.monter(U.$('#conf-exo', main), it.exo, {
      num: c.i + 1, essais: 1,
      onFin: function (ok) {
        if (ok) c.score++;
        var nx = U.$('#conf-next', main);
        nx.classList.remove('hidden'); nx.focus();
      }
    });
  }

  window.Test = {
    vue: function (main) {
      if (!T) T = nouveau();
      rendre(main);
      if (T.etape === 'conf') monterConf(main);
    },
    recommencer: function () { T = nouveau(); }
  };
})();
