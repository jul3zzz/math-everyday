/* Math Everyday — pages : accueil, aujourd'hui, leçon, programme, abonnement, réglages. */
(function () {
  'use strict';

  var PLANS = [
    { id: 'mensuel', nom: 'Mensuel', prix: '4,99 €', per: '/ mois', note: 'Satisfait ou remboursé le premier mois', avantages: ['Leçons illimitées, tous niveaux', 'Les 3 leçons du jour débloquées', 'Résiliable à tout moment', 'Remboursé si le premier mois ne te convient pas'] },
    { id: 'annuel', nom: 'Annuel', prix: '39,99 €', per: '/ an', note: 'Soit 3,33 € par mois, 2 mois offerts', best: true, avantages: ['Tout le contenu du mensuel', '33 % moins cher que le mensuel', 'Un an de maths, de la 6e à la prépa', 'Idéal pour une année scolaire'] },
    { id: 'vie', nom: 'À vie', prix: '49,99 €', per: 'une seule fois', note: 'Paiement unique, accès pour toujours', avantages: ['Tout le contenu, pour toujours', 'Toutes les futures leçons incluses', 'Aucun renouvellement', 'Suit l\'élève jusqu\'en prépa'] }
  ];
  window.PLANS = PLANS;

  function lecon(id) { for (var i = 0; i < LECONS.length; i++) if (LECONS[i].id === id) return LECONS[i]; return null; }
  function leconsDe(nid) { return LECONS.filter(function (l) { return l.niveau === nid; }); }
  function chipNiv(nid) { var n = niv(nid); return '<span class="chip chip-lvl lv-' + nid + '">' + (n ? n.nom : nid) + '</span>'; }
  function page(inner, narrow) { return '<section class="page"><div class="wrap' + (narrow ? ' wrap-narrow' : '') + '">' + inner + '</div></section>'; }

  /* ================= Leçons du jour ================= */
  var Jour = {
    get: function () {
      var st = Store.get();
      if (!st.niveau) return null;
      if (!st.jour || st.jour.date !== U.today() || st.jour.niveau !== st.niveau) {
        st.jour = { date: U.today(), niveau: st.niveau, ids: Jour.choisir(st), choisie: null };
        Store.save();
      }
      return st.jour;
    },
    /* 2 leçons suivantes du programme + 1 révision (leçon ratée) ou la 3e suivante. */
    choisir: function (st) {
      var idx = nivIndex(st.niveau);
      var pris = {}, ids = [];
      function prendre(l) { if (l && !pris[l.id] && ids.length < 3) { pris[l.id] = 1; ids.push(l.id); } }
      var suiv = [];
      for (var k = idx; k < NIVEAUX.length && suiv.length < 3; k++) {
        leconsDe(NIVEAUX[k].id).forEach(function (l) { if (!st.faites[l.id] && suiv.length < 3) suiv.push(l); });
      }
      prendre(suiv[0]); prendre(suiv[1]);
      var aRevoir = LECONS.filter(function (l) { var f = st.faites[l.id]; return f && (f.best != null ? f.best : f.score) < 3 && nivIndex(l.niveau) <= idx; });
      aRevoir.sort(function (a, b) { return st.faites[a.id].date < st.faites[b.id].date ? -1 : 1; });
      prendre(aRevoir[0]);
      prendre(suiv[2]);
      for (var j = idx - 1; j >= 0 && ids.length < 3; j--) leconsDe(NIVEAUX[j].id).forEach(function (l) { if (!st.faites[l.id]) prendre(l); });
      LECONS.forEach(function (l) { if (nivIndex(l.niveau) === idx) prendre(l); });
      return ids;
    },
    /* true | 'choix' (gratuite dispo) | false */
    acces: function (id) {
      var st = Store.get();
      if (Store.estPremium()) return true;
      if (st.faites[id]) return true;
      var j = Jour.get();
      if (!j) return false;
      if (j.choisie === id) return true;
      if (!j.choisie && j.ids.indexOf(id) >= 0) return 'choix';
      return false;
    },
    revision: function (id) { var f = Store.get().faites[id]; return !!f; }
  };
  window.Jour = Jour;

  /* ================= Exercice (composant partagé) ================= */
  var Exo = {
    monter: function (el, exo, o) {
      o = o || {};
      var essais = o.essais || 2, fini = false, tentative = 0;
      var h = '<div class="exo"><div class="exo-h"><span class="block-num">' + (o.num || 1) + '</span><b>Exercice ' + (o.num || 1) + '</b>' +
        (o.etiquette ? '<span class="chip">' + U.esc(o.etiquette) + '</span>' : '') + '</div>' +
        '<div class="exo-q">' + exo.q + '</div>';
      if (exo.type === 'qcm') {
        var perm = U.shuffle(exo.choix.map(function (c, i) { return i; }));
        h += '<div class="choices">' + perm.map(function (ci, k) {
          return '<button type="button" class="choice" data-ci="' + ci + '"><span class="choice-l">' + 'ABCDEF'[k] + '</span><span>' + exo.choix[ci] + '</span></button>';
        }).join('') + '</div>';
      } else {
        h += '<form class="answer" novalidate><label class="sr" for="in-' + (o.num || 1) + '">Ta réponse</label>' +
          '<input class="input" id="in-' + (o.num || 1) + '" autocomplete="off" spellcheck="false" placeholder="Ta réponse"' + (exo.unite ? ' aria-describedby="u-' + (o.num || 1) + '"' : '') + '>' +
          (exo.unite ? '<span id="u-' + (o.num || 1) + '" class="muted">' + exo.unite + '</span>' : '') +
          '<button class="btn" type="submit">Vérifier</button>' +
          '<span class="hint">' + U.esc(Check.aide(exo)) + '</span></form>';
      }
      h += '<div class="fb-zone" aria-live="polite"></div></div>';
      el.innerHTML = h;
      U.math(el);
      var zone = U.$('.fb-zone', el);

      function terminer(ok) {
        fini = true;
        U.$$('button, input', el).forEach(function (x) { if (!x.closest('.fb-zone')) x.disabled = true; });
        if (o.onFin) o.onFin(ok && tentative === 1, ok);
      }
      function fb(ok, final) {
        var t = ok ? (tentative === 1 ? 'Bonne réponse !' : 'Bonne réponse, au deuxième essai.') : (final ? 'Ce n\'est pas ça.' : 'Pas tout à fait. Réessaie !');
        var body = '';
        if (ok || final) body = '<div class="corr"><b>Correction.</b> ' + exo.corr + '</div>';
        else if (exo.indice) body = '<div class="corr"><b>Indice.</b> ' + exo.indice + '</div>';
        zone.innerHTML = '<div class="fb ' + (ok ? 'ok' : 'ko') + '"><div class="fb-t">' + I(ok ? 'check' : 'x') + t + '</div>' + body + '</div>';
        U.math(zone);
      }
      if (exo.type === 'qcm') {
        el.addEventListener('click', function (e) {
          var b = e.target.closest('.choice'); if (!b || fini) return;
          tentative = 1;
          var ci = +b.getAttribute('data-ci'), ok = ci === exo.rep;
          b.classList.add(ok ? 'is-ok' : 'is-ko');
          if (!ok) { var bon = U.$('.choice[data-ci="' + exo.rep + '"]', el); if (bon) bon.classList.add('is-ok'); }
          fb(ok, true); terminer(ok);
        });
      } else {
        var f = U.$('form', el), inp = U.$('input', el);
        f.addEventListener('submit', function (e) {
          e.preventDefault(); if (fini) return;
          var v = inp.value.trim();
          if (!v) { inp.focus(); return; }
          tentative++;
          var ok = Check.juger(exo, v);
          var final = ok || tentative >= essais;
          fb(ok, final);
          if (final) terminer(ok); else { inp.select(); }
        });
      }
    }
  };
  window.Exo = Exo;

  /* ================= Accueil ================= */
  function vAccueil(main) {
    var st = Store.get();
    var nb = LECONS.length;
    var cta = st.profil
      ? '<a class="btn btn-lg" href="#/aujourdhui">' + I('sun') + 'Mes leçons du jour</a><a class="btn btn-lg btn-2" href="#/programme">Voir le programme</a>'
      : '<a class="btn btn-lg" href="#/compte">' + I('user') + 'Créer mon compte gratuit</a><a class="btn btn-lg btn-2" href="#/compte/connexion">J\'ai déjà un compte</a>';
    var steps = [
      ['Ton compte', 'Gratuit, en une minute : prénom, e-mail et mot de passe. Ta progression est gardée.'],
      ['Le test', '20 questions qui s\'adaptent à toi pour estimer ton niveau, de la 6e à la prépa.'],
      ['La confirmation', '5 exercices à rédiger pour confirmer, et tu es placé au bon niveau.'],
      ['Chaque jour', 'Un mail avec 3 leçons choisies pour toi. Une est gratuite, tous les jours.'],
      ['30 minutes', 'La leçon, une vidéo conseillée et 3 exercices corrigés. Calculatrice et notes à portée de main.']
    ].map(function (s, i) {
      return '<div class="step"><span class="step-n">' + (i + 1) + '</span><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div>';
    }).join('');
    var lv = NIVEAUX.map(function (n) {
      var c = leconsDe(n.id).length;
      return '<a class="chip chip-lvl lv-' + n.id + '" href="#/programme/' + n.id + '" style="text-decoration:none">' + n.nom + ' · ' + c + ' leçons</a>';
    }).join('');
    var dp = Theme.liste.map(function (t) {
      return '<button type="button" class="dp" data-theme-pick="' + t.id + '" aria-pressed="' + (Theme.actuel() === t.id) + '">' +
        '<span class="dp-prev p-' + t.id + '"><i></i><i></i><i></i><i></i><i></i></span>' +
        '<span class="dp-txt"><b>' + U.esc(t.nom) + '</b><span>' + U.esc(t.desc) + '</span></span></button>';
    }).join('');

    main.innerHTML =
      '<section class="hero"><div class="wrap hero-in">' +
      '<div><span class="eyebrow">De la 6e à la prépa MPSI</span>' +
      '<h1>Les maths, <em>30 minutes</em> par jour.</h1>' +
      '<p class="hero-lead">Un test pour connaître ton niveau, puis chaque jour une leçon claire, une vidéo choisie avec soin et 3 exercices corrigés. Sans te noyer, sans rien rater.</p>' +
      '<div class="btn-row">' + cta + '</div>' +
      '<div class="hero-meta"><span>' + I('book') + nb + ' leçons</span><span>' + I('playline') + 'Une vidéo par leçon</span><span>' + I('sun') + '1 leçon gratuite par jour</span></div></div>' +
      '<div class="hero-art">' + rectangleOr(323.6) + '</div>' +
      '</div></section>' +

      '<section class="section"><div class="wrap"><div class="section-h"><h2>Comment ça marche</h2></div><div class="steps">' + steps + '</div></div></section>' +

      '<section class="section"><div class="wrap"><div class="section-h"><h2>Tout le programme</h2><a class="btn btn-2 btn-sm" href="#/programme">Parcourir ' + I('arrow') + '</a></div>' +
      '<p class="muted" style="max-width:40em">Collège, lycée (spécialité maths) et première année de prépa MPSI, avec l\'exigence des meilleures classes préparatoires : définitions précises, démonstrations, exercices de concours.</p>' +
      '<div class="lvl-strip">' + lv + '</div></div></section>' +

      '<section class="section"><div class="wrap"><div class="section-h"><h2>Choisis ton design</h2></div>' +
      '<p class="muted">Même contenu, trois ambiances. Tu peux changer à tout moment avec le bouton en haut à droite.</p>' +
      '<div class="design-pick">' + dp + '</div></div></section>' +

      '<section class="section"><div class="wrap"><div class="banner">' + I('crown') +
      '<div class="banner-t"><b>Envie d\'aller plus vite ?</b><span>L\'abonnement débloque toutes les leçons : 4,99 €/mois (remboursé le 1er mois si ça ne te plaît pas), 39,99 €/an ou 49,99 € à vie.</span></div>' +
      '<a class="btn btn-2" href="#/abonnement">Voir les offres</a></div></div></section>';
  }

  /* ================= Aujourd'hui ================= */
  function vAujourdhui(main) {
    var st = Store.get();
    if (!st.profil) { location.hash = '#/compte/connexion'; return; }
    if (!st.niveau) { location.hash = '#/test'; return; }
    var j = Jour.get();
    var prem = Store.estPremium();
    var serie = Store.serie();
    var nbF = Object.keys(st.faites).length;
    var scores = Object.keys(st.faites).map(function (k) { return st.faites[k].score; });
    var moy = scores.length ? Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / (scores.length * 3) * 100) : null;
    var faitesAuj = j.ids.filter(function (id) { return st.faites[id] && st.faites[id].date === U.today(); }).length;

    var cartes = j.ids.map(function (id, i) {
      var l = lecon(id); if (!l) return '';
      var f = st.faites[id];
      var acc = Jour.acces(id);
      var chosen = j.choisie === id;
      var revision = f && f.date !== U.today();
      var etat, btn, cls = 'card dl';
      if (f && f.date === U.today()) { cls += ' is-done'; etat = '<span class="chip dl-badge">' + I('check') + f.score + '/3</span>'; btn = '<a class="btn btn-2 btn-sm" href="#/lecon/' + id + '">Revoir</a>'; }
      else if (acc === true) { if (chosen) cls += ' is-chosen'; etat = chosen ? '<span class="chip dl-badge">Ta leçon gratuite</span>' : (prem ? '<span class="chip dl-badge">' + I('crown') + 'Illimité</span>' : ''); btn = '<a class="btn btn-sm" href="#/lecon/' + id + '">' + I('arrow') + (revision ? 'Réviser' : 'Commencer') + '</a>'; }
      else if (acc === 'choix') { etat = '<span class="chip dl-badge">' + I('unlock') + 'Gratuite</span>'; btn = '<a class="btn btn-sm" href="#/lecon/' + id + '">' + I('arrow') + 'Choisir celle-ci</a>'; }
      else { cls += ' is-locked'; etat = '<span class="chip dl-badge">' + I('lock') + 'Abonnés</span>'; btn = '<a class="btn btn-2 btn-sm" href="#/abonnement">' + I('crown') + 'Débloquer</a>'; }
      var type = revision ? 'À revoir' : 'Leçon ' + l.ordre + ' / ' + leconsDe(l.niveau).length;
      return '<article class="' + cls + '">' +
        '<div class="dl-top">' + chipNiv(l.niveau) + '<span class="chip">' + type + '</span>' + etat + '</div>' +
        '<h3>' + U.esc(l.titre) + '</h3><p>' + U.esc(l.resume) + '</p>' +
        '<div class="dl-foot"><span class="dl-time">' + I('clock') + '≈ 30 min · 3 exercices · vidéo</span><span class="spacer"></span>' + btn + '</div></article>';
    }).join('');

    var info;
    if (prem) info = '<div class="banner">' + I('crown') + '<div class="banner-t"><b>Abonnement ' + U.esc(planNom(st.premium.plan)) + ' actif</b><span>Toutes les leçons sont débloquées. Tu peux aussi piocher dans le programme complet.</span></div><a class="btn btn-2" href="#/programme">Programme complet</a></div>';
    else if (j.choisie) info = '<div class="banner">' + I('bell') + '<div class="banner-t"><b>Ta leçon gratuite du jour est choisie.</b><span>Demain, 3 nouvelles leçons t\'attendent' + (st.notif.actif ? ' (mail à ' + U.esc(st.notif.heure) + ')' : '') + '. Pour faire les autres dès maintenant, passe à l\'illimité.</span></div><a class="btn btn-2" href="#/abonnement">Voir les offres</a></div>';
    else info = '<div class="banner">' + I('sun') + '<div class="banner-t"><b>Choisis ta leçon gratuite.</b><span>Une des 3 leçons est offerte aujourd\'hui. Les deux autres restent accessibles avec l\'abonnement.</span></div></div>';

    var idx = nivIndex(st.niveau);
    var tot = leconsDe(st.niveau).length, fNiv = leconsDe(st.niveau).filter(function (l) { return st.faites[l.id]; }).length;
    main.innerHTML = page(
      '<div class="today-h"><div><span class="eyebrow">' + U.esc(U.dateLongue()) + '</span><h1>Bonjour ' + U.esc(st.profil.nom) + '.</h1></div>' +
      '<div class="stats">' +
      '<div class="stat">' + I('flame') + '<span><b>' + serie + '</b><small>jour' + (serie > 1 ? 's' : '') + ' de suite</small></span></div>' +
      '<div class="stat">' + I('book') + '<span><b>' + nbF + '</b><small>leçon' + (nbF > 1 ? 's' : '') + ' faite' + (nbF > 1 ? 's' : '') + '</small></span></div>' +
      '<div class="stat">' + I('target') + '<span><b>' + (moy == null ? '–' : moy + ' %') + '</b><small>réussite</small></span></div>' +
      '</div></div>' +
      '<div class="daily">' + cartes + '</div>' + info +
      '<div class="card card-flat" style="margin-top:24px"><div class="row"><b>Programme ' + U.esc(NIVEAUX[idx].long) + '</b><span class="spacer"></span><span class="muted small mono">' + fNiv + ' / ' + tot + '</span></div>' +
      '<div class="progress" style="margin-top:10px"><i style="width:' + (tot ? fNiv / tot * 100 : 0) + '%"></i></div>' +
      (faitesAuj ? '<p class="small muted" style="margin:10px 0 0">Bravo, ta séance du jour est faite. À demain !</p>' : '') + '</div>'
    );
  }

  function planNom(id) { for (var i = 0; i < PLANS.length; i++) if (PLANS[i].id === id) return PLANS[i].nom.toLowerCase(); return ''; }

  /* ================= Leçon ================= */
  function vLecon(main, id) {
    var l = lecon(id);
    if (!l) { main.innerHTML = page('<h1>Leçon introuvable</h1><a class="btn" href="#/programme">Programme</a>', true); return; }
    var st = Store.get();
    var acc = Jour.acces(id);
    var N = niv(l.niveau);
    var entete = '<div class="lesson-h"><div class="row">' + chipNiv(l.niveau) + '<span class="chip">' + U.esc(l.domaine) + '</span><span class="chip">Leçon ' + l.ordre + '</span></div>' +
      '<h1>' + U.esc(l.titre) + '</h1><p class="muted" style="font-size:1.08rem;margin:0">' + U.esc(l.resume) + '</p>';

    if (acc !== true) {
      var corps;
      if (!st.profil) {
        corps = '<div class="card center" style="padding:40px 24px">' + I('user') + '<h2 style="margin-top:12px">Crée ton compte gratuit</h2><p class="muted">Un compte, un test de niveau d\'une vingtaine de minutes, et ta première leçon gratuite est débloquée.</p><div class="btn-row" style="justify-content:center"><a class="btn btn-lg" href="#/compte">Créer mon compte</a><a class="btn btn-lg btn-2" href="#/compte/connexion">Se connecter</a></div></div>';
      } else if (!st.niveau) {
        corps = '<div class="card center" style="padding:40px 24px">' + I('target') + '<h2 style="margin-top:12px">Passe d\'abord le test de niveau</h2><p class="muted">Il te place au bon niveau et débloque ta première leçon gratuite.</p><div class="btn-row" style="justify-content:center"><a class="btn btn-lg" href="#/test">Passer le test</a></div></div>';
      } else if (acc === 'choix') {
        corps = '<div class="card center" style="padding:40px 24px"><h2>Utiliser ta leçon gratuite du jour ?</h2><p class="muted">Tu as une leçon offerte aujourd\'hui, à choisir parmi les 3 proposées. Une fois choisie, les deux autres restent réservées aux abonnés jusqu\'à demain.</p>' +
          '<div class="btn-row" style="justify-content:center"><button class="btn btn-lg" type="button" id="b-choisir">' + I('unlock') + 'Oui, je prends celle-ci</button><a class="btn btn-lg btn-2" href="#/aujourdhui">Revoir les 3 leçons</a></div></div>';
      } else {
        var j = Jour.get();
        var dansJour = j && j.ids.indexOf(id) >= 0;
        corps = '<div class="card center" style="padding:40px 24px">' + I('lock') + '<h2 style="margin-top:12px">Leçon réservée aux abonnés</h2><p class="muted">' +
          (dansJour ? 'Tu as déjà utilisé ta leçon gratuite aujourd\'hui. Reviens demain pour une nouvelle leçon offerte, ou passe à l\'illimité.' : 'Cette leçon ne fait pas partie de tes leçons du jour. Avec l\'abonnement, tout le programme de la 6e à la prépa est ouvert.') +
          '</p><div class="btn-row" style="justify-content:center"><a class="btn btn-lg" href="#/abonnement">' + I('crown') + 'Voir les offres</a><a class="btn btn-lg btn-2" href="#/aujourdhui">Mes leçons du jour</a></div></div>';
      }
      main.innerHTML = page(entete + '</div>' + corps, true);
      var bc = U.$('#b-choisir', main);
      if (bc) bc.onclick = function () { Jour.get().choisie = id; Store.save(); vLecon(main, id); window.scrollTo(0, 0); };
      U.math(main);
      return;
    }

    var v = (window.VIDEOS || {})[id];
    var videoHtml;
    if (v) {
      videoHtml = '<div class="video" id="video"><button type="button" aria-label="Lire la vidéo : ' + U.esc(v.t) + '"><img src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="" loading="lazy"><span class="video-play">' + I('play') + '</span></button></div>' +
        '<div class="video-meta"><span><b>' + U.esc(v.t) + '</b></span><span>' + U.esc(v.c) + (v.d ? ' · ' + U.esc(v.d) : '') + '</span></div>';
    } else {
      videoHtml = '<div class="card card-flat"><p style="margin:0">Vidéo conseillée : <a href="https://www.youtube.com/results?search_query=' + encodeURIComponent(l.yt || l.titre) + '" target="_blank" rel="noopener">rechercher « ' + U.esc(l.yt || l.titre) + ' » sur YouTube</a></p></div>';
    }
    var f = st.faites[id];
    main.innerHTML = page(entete +
      '<div class="lesson-steps"><span class="ls on">' + I('book') + 'Cours · 10 min</span><span class="ls on">' + I('playline') + 'Vidéo · ' + U.esc(v && v.d ? v.d : '≈ 8 min') + '</span><span class="ls on" id="ls-exos">' + I('pencil') + 'Exercices · 12 min</span>' +
      (f ? '<span class="ls ok">' + I('check') + 'Déjà faite · ' + f.score + '/3</span>' : '') + '</div>' +
      '<div class="lesson-outils"><button type="button" class="btn btn-2 btn-sm" id="l-note">' + I('pencil') + 'Prendre des notes sur cette leçon</button><button type="button" class="btn btn-ghost btn-sm" data-outil="calc">Ouvrir la calculatrice</button></div></div>' +
      '<div class="block"><div class="block-h"><span class="block-num">1</span><h2>Le cours</h2></div><div class="card cours">' + l.cours + '</div></div>' +
      (l.retenir && l.retenir.length ? '<div class="block"><div class="block-h"><span class="block-num">' + I('star') + '</span><h2>À retenir</h2></div><div class="card"><ul class="retenir">' + l.retenir.map(function (x) { return '<li>' + I('check') + '<span>' + x + '</span></li>'; }).join('') + '</ul></div></div>' : '') +
      '<div class="block"><div class="block-h"><span class="block-num">2</span><h2>La vidéo conseillée</h2></div>' + videoHtml + '</div>' +
      '<div class="block"><div class="block-h"><span class="block-num">3</span><h2>Les 3 exercices</h2></div><p class="muted">Deux essais par exercice. La correction détaillée s\'affiche ensuite.</p>' +
      l.exos.map(function (e, i) { return '<div class="card" id="exo-' + i + '" style="margin-bottom:16px"></div>'; }).join('') +
      '<div id="fin"></div></div>', true);
    U.math(main);

    U.$('#l-note', main).onclick = function () { Outils.ouvrir('notes'); Notes.nouvelleDepuisLecon(); };
    var vb = U.$('#video button', main);
    if (vb) vb.onclick = function () {
      var box = U.$('#video', main);
      box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0" title="' + U.esc(v.t) + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    };

    var res = [], faits = 0;
    l.exos.forEach(function (e, i) {
      Exo.monter(U.$('#exo-' + i, main), e, {
        num: i + 1, essais: 2,
        onFin: function (okPremier, ok) {
          res[i] = ok ? 1 : 0; faits++;
          if (faits === l.exos.length) finir();
        }
      });
    });
    function finir() {
      var score = res.reduce(function (a, b) { return a + b; }, 0);
      Store.marquerFaite(id, score);
      var msg = score === 3 ? 'Parfait, leçon maîtrisée.' : score === 2 ? 'Très bien. Relis la correction de l\'exercice manqué.' : score === 1 ? 'C\'est un début. Cette leçon reviendra en révision.' : 'Pas de panique : cette leçon te sera reproposée en révision.';
      var fin = U.$('#fin', main);
      fin.innerHTML = '<div class="card end-card"><span class="eyebrow">Leçon terminée</span><div class="end-score">' + score + ' / 3</div><p>' + msg + '</p>' +
        '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/aujourdhui">' + I('sun') + 'Retour à aujourd\'hui</a>' +
        (Store.estPremium() ? '' : '<a class="btn btn-2" href="#/abonnement">Débloquer la suite</a>') + '</div></div>';
      U.$('#ls-exos', main).classList.add('ok');
      fin.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* ================= Programme ================= */
  function vProgramme(main, nid) {
    var st = Store.get();
    nid = niv(nid) ? nid : (st.niveau || '6e');
    var j = st.profil ? Jour.get() : null;
    var tabs = NIVEAUX.map(function (n) {
      return '<a class="tab" role="tab" href="#/programme/' + n.id + '" aria-selected="' + (n.id === nid) + '" style="text-decoration:none">' + n.nom + '</a>';
    }).join('');
    var liste = leconsDe(nid).map(function (l) {
      var f = st.faites[l.id], acc = st.profil ? Jour.acces(l.id) : false;
      var ic = f ? 'check' : acc === true ? 'arrow' : acc === 'choix' ? 'unlock' : 'lock';
      var sous = f ? 'Faite · ' + f.score + '/3' : acc === 'choix' ? 'Gratuite aujourd\'hui' : acc === true ? 'Disponible' : 'Abonnés';
      if (j && j.ids.indexOf(l.id) >= 0 && !f) sous += ' · leçon du jour';
      return '<a class="pl' + (f ? ' is-done' : '') + '" href="#/lecon/' + l.id + '"><span class="pl-n">' + l.ordre + '</span><span class="pl-t"><b>' + U.esc(l.titre) + '</b><span>' + U.esc(l.domaine) + ' · ' + sous + '</span></span>' + I(ic) + '</a>';
    }).join('');
    var N = niv(nid);
    main.innerHTML = page(
      '<span class="eyebrow">Programme</span><h1>' + U.esc(N.long) + '</h1>' +
      '<p class="muted">' + leconsDe(nid).length + ' leçons, chacune avec un cours, une vidéo et 3 exercices corrigés.' + (Store.estPremium() ? ' Tout est débloqué.' : ' Les leçons faites restent accessibles pour réviser.') + '</p>' +
      '<div class="tabs" role="tablist" aria-label="Niveaux">' + tabs + '</div>' +
      '<div class="prog-list">' + liste + '</div>'
    );
  }

  /* ================= Abonnement ================= */
  function vAbonnement(main) {
    var st = Store.get();
    var cartes = PLANS.map(function (p) {
      var actif = st.premium && st.premium.plan === p.id;
      return '<article class="card plan' + (p.best ? ' is-best' : '') + '">' + (p.best ? '<span class="plan-tag"><span class="chip">Le plus choisi</span></span>' : '') +
        '<h2 class="plan-name">' + p.nom + '</h2><div class="plan-price">' + p.prix + ' <small>' + p.per + '</small></div>' +
        '<p class="muted small" style="margin:0">' + p.note + '</p>' +
        '<ul>' + p.avantages.map(function (a) { return '<li>' + I('check') + '<span>' + a + '</span></li>'; }).join('') + '</ul>' +
        (actif ? '<button class="btn btn-2" type="button" disabled>' + I('check') + 'Ton offre actuelle</button>' : '<button class="btn" type="button" data-plan="' + p.id + '">Choisir ' + p.nom.toLowerCase() + '</button>') +
        '</article>';
    }).join('');
    var ok = I('check'), no = '<span class="muted">—</span>';
    main.innerHTML = page(
      '<div class="center" style="max-width:640px;margin:0 auto 34px"><span class="eyebrow">Abonnement</span><h1>Toutes les maths, sans limite.</h1>' +
      '<p class="muted" style="font-size:1.08rem">Gratuitement, tu as une leçon complète par jour. Avec l\'abonnement, tu fais les 3 leçons du jour et tu as accès à tout le programme, de la 6e à la prépa, quand tu veux.</p></div>' +
      '<div class="plans">' + cartes + '</div>' +
      '<div class="card" style="margin-top:34px;overflow-x:auto"><table class="compare"><thead><tr><th>Ce qui est inclus</th><th>Gratuit</th><th>Abonné</th></tr></thead><tbody>' +
      '<tr><td>Test de niveau (20 questions + 5 exercices)</td><td>' + ok + '</td><td>' + ok + '</td></tr>' +
      '<tr><td>Mail quotidien avec 3 leçons proposées</td><td>' + ok + '</td><td>' + ok + '</td></tr>' +
      '<tr><td>Leçons complètes par jour</td><td>1</td><td>Illimité</td></tr>' +
      '<tr><td>Vidéo conseillée et 3 exercices corrigés</td><td>' + ok + '</td><td>' + ok + '</td></tr>' +
      '<tr><td>Accès libre à tout le programme (' + LECONS.length + ' leçons)</td><td>' + no + '</td><td>' + ok + '</td></tr>' +
      '<tr><td>Révisions des leçons déjà faites</td><td>' + ok + '</td><td>' + ok + '</td></tr>' +
      '</tbody></table></div>' +
      '<div class="faq" style="max-width:760px;margin:34px auto 0"><h2>Questions fréquentes</h2>' +
      faq('Comment marche le « satisfait ou remboursé » ?', 'Sur l\'offre mensuelle, si le premier mois ne te convient pas, tu demandes le remboursement dans les 30 jours suivant ton premier paiement et on te rembourse intégralement, sans justification.') +
      faq('Puis-je résilier quand je veux ?', 'Oui. Le mensuel et l\'annuel se résilient en un clic depuis les réglages ; tu gardes l\'accès jusqu\'à la fin de la période payée.') +
      faq('Que comprend l\'offre à vie ?', 'Un paiement unique de 49,99 € pour un accès permanent à toutes les leçons actuelles et futures, sans renouvellement.') +
      faq('Je peux continuer gratuitement ?', 'Bien sûr. Chaque jour, une leçon complète (cours, vidéo, 3 exercices) reste offerte.') +
      '</div>' +
      '<p class="center small muted" style="margin-top:28px">Version démo : aucun paiement n\'est effectué, l\'abonnement est simulé sur cet appareil.</p>'
    );
    main.onclick = function (e) {
      var b = e.target.closest('[data-plan]'); if (!b) return;
      var p = PLANS.filter(function (x) { return x.id === b.getAttribute('data-plan'); })[0];
      Modal.ouvrir('<h2 id="modal-title">Offre ' + p.nom.toLowerCase() + ' · ' + p.prix + ' ' + p.per + '</h2>' +
        '<p class="muted">' + p.note + '.</p>' +
        '<div class="card card-flat" style="margin:16px 0"><b>Mode démo</b><p class="small muted" style="margin:6px 0 0">Le paiement sécurisé (Stripe) sera branché à la mise en ligne définitive. Ici, l\'abonnement est simulé : aucune carte n\'est demandée, rien n\'est débité.</p></div>' +
        '<div class="btn-row"><button class="btn" type="button" id="m-ok" autofocus>' + I('crown') + 'Activer (démo)</button><button class="btn btn-2" type="button" data-close>Annuler</button></div>');
      U.$('#m-ok').onclick = function () {
        if (!Store.get().profil) { Modal.fermer(); toast('Crée d\'abord ton compte gratuit.'); location.hash = '#/compte'; return; }
        Store.set({ premium: { plan: p.id, depuis: U.today() } });
        Modal.fermer(); toast('Abonnement ' + p.nom.toLowerCase() + ' activé (démo).');
        location.hash = '#/aujourdhui';
      };
    };
  }
  function faq(q, r) { return '<details><summary>' + q + '</summary><p>' + r + '</p></details>'; }

  /* ================= Réglages ================= */
  function vReglages(main) {
    var st = Store.get();
    if (!st.profil) { location.hash = '#/compte/connexion'; return; }
    var heures = ['07:00', '08:00', '12:00', '16:30', '17:30', '18:30', '19:30', '20:30'];
    var themes = Theme.liste.map(function (t) {
      return '<button type="button" class="choice" data-theme-pick="' + t.id + '" aria-pressed="' + (Theme.actuel() === t.id) + '"><span class="choice-l">' + I('palette') + '</span><span><b>' + U.esc(t.nom) + '</b><br><span class="small muted">' + U.esc(t.desc) + '</span></span></button>';
    }).join('');
    var nivOpts = NIVEAUX.map(function (n) { return '<option value="' + n.id + '"' + (n.id === st.niveau ? ' selected' : '') + '>' + U.esc(n.long) + '</option>'; }).join('');
    var ab = st.premium
      ? '<p>Offre <b>' + U.esc(planNom(st.premium.plan)) + '</b> active depuis le ' + U.esc(st.premium.depuis) + '.</p><button class="btn btn-2" type="button" id="r-resil">Résilier (démo)</button>'
      : '<p class="muted">Formule gratuite : 1 leçon complète par jour.</p><a class="btn" href="#/abonnement">' + I('crown') + 'Voir les offres</a>';
    main.innerHTML = page(
      '<span class="eyebrow">Réglages</span><h1>Ton espace</h1>' +
      '<div class="set-grid" style="margin-top:24px">' +
      '<div class="card"><h2>' + I('user') + 'Profil</h2><form class="form" id="r-profil" novalidate>' +
      '<div class="field"><label for="r-nom">Prénom</label><input class="input" id="r-nom" name="nom" value="' + U.esc(st.profil.nom) + '" maxlength="40"></div>' +
      '<div class="field"><label for="r-mail">E-mail</label><input class="input" id="r-mail" name="mail" type="email" value="' + U.esc(st.profil.mail) + '" maxlength="120"></div>' +
      '<div><button class="btn btn-sm" type="submit">Enregistrer</button></div></form></div>' +

      '<div class="card"><h2>' + I('bell') + 'Mail quotidien</h2><div class="form">' +
      '<label class="switch"><input type="checkbox" id="r-notif"' + (st.notif.actif ? ' checked' : '') + '> Recevoir le mail des leçons du jour</label>' +
      '<div class="field"><label for="r-heure">Heure d\'envoi</label><select class="input" id="r-heure">' + heures.map(function (h) { return '<option' + (h === st.notif.heure ? ' selected' : '') + '>' + h + '</option>'; }).join('') + '</select></div>' +
      '<div><button class="btn btn-2 btn-sm" type="button" id="r-apercu">' + I('mail') + 'Aperçu du mail</button></div>' +
      '<p class="small muted" style="margin:0">Démo : l\'envoi réel sera activé à la mise en ligne avec le service d\'e-mails.</p></div></div>' +

      '<div class="card"><h2>' + I('target') + 'Niveau</h2><div class="form">' +
      '<div class="field"><label for="r-niv">Niveau de travail</label><select class="input" id="r-niv">' + nivOpts + '</select>' +
      (st.placement ? '<small>Test du ' + U.esc(st.placement.date) + ' : niveau estimé ' + U.esc(niv(st.placement.estime).long) + ', ' + st.placement.score + '/20 au QCM, ' + st.placement.conf + '/5 en confirmation.</small>' : '') + '</div>' +
      '<div><button class="btn btn-2 btn-sm" type="button" id="r-test">' + I('refresh') + 'Repasser le test</button></div></div></div>' +

      '<div class="card"><h2>' + I('crown') + 'Abonnement</h2>' + ab + '</div>' +

      '<div class="card"><h2>' + I('lock') + 'Mot de passe</h2><form class="form" id="r-mdp" novalidate>' +
      '<div class="field"><label for="r-m1">Mot de passe actuel</label><input class="input" id="r-m1" name="ancien" type="password" autocomplete="current-password"></div>' +
      '<div class="field"><label for="r-m2">Nouveau mot de passe</label><input class="input" id="r-m2" name="nouveau" type="password" autocomplete="new-password" minlength="8"><small>8 caractères minimum.</small></div>' +
      '<div><button class="btn btn-sm" type="submit">Changer le mot de passe</button></div></form></div>' +

      '<div class="card"><h2>' + I('user') + 'Compte</h2><p class="muted small">Connecté en tant que <b>' + U.esc(st.profil.mail) + '</b> depuis le ' + U.esc(st.profil.cree) + '. Dans la version démo, les comptes sont enregistrés sur cet appareil.</p>' +
      '<div class="btn-row"><button class="btn btn-2 btn-sm" type="button" id="r-deco">Se déconnecter</button><button class="btn btn-ghost btn-sm" type="button" id="r-suppr">' + I('trash') + 'Supprimer mon compte</button></div></div>' +

      '<div class="card" style="grid-column:1/-1"><h2>' + I('palette') + 'Design du site</h2><div class="choices g3 grid">' + themes + '</div></div>' +

      '</div>'
    );
    U.$('#r-profil', main).onsubmit = function (e) {
      e.preventDefault();
      var nom = this.nom.value.trim(), mail = this.mail.value.trim();
      if (!nom || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) { toast('Prénom ou e-mail invalide.'); return; }
      if (!Store.changerMail(mail)) { toast('Un autre compte utilise déjà cet e-mail.'); return; }
      st.profil.nom = nom; Store.save(); toast('Profil enregistré.');
    };
    U.$('#r-notif', main).onchange = function () { st.notif.actif = this.checked; Store.save(); toast(this.checked ? 'Mail quotidien activé.' : 'Mail quotidien désactivé.'); };
    U.$('#r-heure', main).onchange = function () { st.notif.heure = this.value; Store.save(); toast('Rappel à ' + this.value + '.'); };
    U.$('#r-niv', main).onchange = function () { Store.set({ niveau: this.value, jour: null }); toast('Niveau changé : ' + niv(this.value).long + '. Tes leçons du jour sont mises à jour.'); };
    U.$('#r-apercu', main).onclick = function () { if (!st.niveau) { toast('Passe d\'abord le test de niveau.'); return; } Modal.ouvrir(apercuMail(), { large: true }); };
    U.$('#r-test', main).onclick = function () { Test.recommencer(); location.hash = '#/test'; };
    var rs = U.$('#r-resil', main);
    if (rs) rs.onclick = function () { Store.set({ premium: null }); toast('Abonnement résilié (démo).'); vReglages(main); };
    U.$('#r-mdp', main).onsubmit = function (e) {
      e.preventDefault();
      var f = this;
      if (f.nouveau.value.length < 8) { toast('Le nouveau mot de passe doit faire au moins 8 caractères.'); return; }
      Store.changerMdp(f.ancien.value, f.nouveau.value).then(function () { f.reset(); toast('Mot de passe changé.'); }, function () { toast('Mot de passe actuel incorrect.'); });
    };
    U.$('#r-deco', main).onclick = function () { Store.deconnexion(); Test.recommencer(); location.hash = '#/'; toast('Tu es déconnecté. À bientôt !'); };
    U.$('#r-suppr', main).onclick = function () {
      Modal.ouvrir('<h2 id="modal-title">Supprimer ton compte ?</h2><p class="muted">Ton profil, ta progression, tes notes et ton abonnement démo seront définitivement effacés de cet appareil.</p><div class="btn-row"><button class="btn" type="button" id="m-suppr">Oui, supprimer</button><button class="btn btn-2" type="button" data-close autofocus>Annuler</button></div>');
      U.$('#m-suppr').onclick = function () { Store.supprimerCompte(); Test.recommencer(); Modal.fermer(); location.hash = '#/'; toast('Compte supprimé.'); };
    };
  }

  /* Aperçu du mail quotidien (même contenu que le modèle mails/lecon-du-jour.html). */
  function apercuMail() {
    var st = Store.get(), j = Jour.get();
    var items = j.ids.map(function (id, i) {
      var l = lecon(id);
      return '<a class="mail-item" href="#/lecon/' + id + '"><b>' + U.esc(l.titre) + '</b><small>' + U.esc(niv(l.niveau).long) + ' · ' + U.esc(l.domaine) + '</small></a>';
    }).join('');
    return '<h2 id="modal-title" style="font-size:1.3rem">Aperçu du mail de ' + U.esc(st.notif.heure) + '</h2>' +
      '<div class="mail"><div class="mail-meta"><b>De :</b> Math Everyday &lt;bonjour@matheveryday.fr&gt;<br><b>À :</b> ' + U.esc(st.profil.mail) + '<br><b>Objet :</b> ' + U.esc(st.profil.nom) + ', tes 3 leçons du jour sont prêtes</div>' +
      '<div class="mail-body"><div style="width:34px;height:34px">' + LOGO.replace('<svg', '<svg style="width:34px;height:34px"').replace('class="lg-bg"', 'class="lg-bg" fill="#111"').replace('class="lg-phi"', 'class="lg-phi" stroke="#fff"') + '</div>' +
      '<h2>Bonjour ' + U.esc(st.profil.nom) + ',</h2><p>Voici les 3 leçons choisies pour toi aujourd\'hui (' + U.esc(niv(st.niveau).long) + '). ' + (Store.estPremium() ? 'Tu es abonné : elles sont toutes ouvertes.' : 'Choisis-en une : elle est offerte, avec sa vidéo et ses 3 exercices corrigés.') + '</p>' +
      items + '<a class="mail-cta" href="#/aujourdhui">Faire ma leçon (≈ 30 min)</a>' +
      '<p style="color:#555;font-size:13.5px">Série en cours : ' + Store.serie() + ' jour' + (Store.serie() > 1 ? 's' : '') + '. Ne la casse pas !</p></div>' +
      '<div class="mail-foot">Tu reçois ce mail car tu as activé le rappel quotidien. Se désabonner · Changer l\'heure</div></div>';
  }

  /* ================= Sélecteur de design ================= */
  function modalThemes() {
    var b = Theme.liste.map(function (t) {
      return '<button type="button" class="dp" data-theme-pick="' + t.id + '" aria-pressed="' + (Theme.actuel() === t.id) + '" style="display:grid;grid-template-columns:150px 1fr;align-items:center">' +
        '<span class="dp-prev p-' + t.id + '" style="height:90px;border-bottom:0"><i></i><i></i><i></i><i></i><i></i></span>' +
        '<span class="dp-txt"><b>' + U.esc(t.nom) + '</b><span>' + U.esc(t.desc) + '</span></span></button>';
    }).join('');
    Modal.ouvrir('<h2 id="modal-title">Choisis ton design</h2><p class="muted">Le contenu reste le même, seule l\'ambiance change.</p><div class="theme-opts">' + b + '</div>');
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-theme-pick]');
    if (!t) return;
    Theme.appliquer(t.getAttribute('data-theme-pick'));
    U.$$('[data-theme-pick]').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-theme-pick') === Theme.actuel()); });
    toast('Design : ' + Theme.nom(Theme.actuel()));
  });

  /* ================= Compte : création et connexion ================= */
  function vCompte(main, mode) {
    if (Store.connecte()) { location.hash = Store.get().niveau ? '#/aujourdhui' : '#/test'; return; }
    var connexion = mode === 'connexion';
    var heures = ['07:00', '08:00', '12:00', '16:30', '17:30', '18:30', '19:30', '20:30'];
    var classes = '<option value="">Je ne sais pas / adulte</option>' + NIVEAUX.map(function (n) { return '<option value="' + n.id + '">' + U.esc(n.long) + '</option>'; }).join('');
    var onglets = '<div class="tabs" role="tablist" style="margin-bottom:22px">' +
      '<a class="tab" role="tab" href="#/compte" aria-selected="' + !connexion + '" style="text-decoration:none">Créer un compte</a>' +
      '<a class="tab" role="tab" href="#/compte/connexion" aria-selected="' + connexion + '" style="text-decoration:none">Se connecter</a></div>';
    var mdpChamp = function (id, label, auto, aide) {
      return '<div class="field"><label for="' + id + '">' + label + '</label><div class="pw"><input class="input" id="' + id + '" name="' + id + '" type="password" autocomplete="' + auto + '" required minlength="' + (connexion ? 1 : 8) + '" maxlength="128">' +
        '<button type="button" class="btn btn-ghost btn-sm pw-voir" data-voir="' + id + '" aria-label="Afficher le mot de passe">Afficher</button></div>' + (aide || '') + '</div>';
    };
    var corps;
    if (connexion) {
      corps = '<span class="eyebrow">Bon retour</span><h1>Se connecter</h1><p class="muted">Retrouve ta progression, tes notes et tes leçons du jour.</p>' + onglets +
        '<form class="form" id="f-compte" novalidate>' +
        '<div class="field"><label for="c-mail">Adresse e-mail</label><input class="input" id="c-mail" name="mail" type="email" autocomplete="email" required maxlength="120"></div>' +
        mdpChamp('c-mdp', 'Mot de passe', 'current-password') +
        '<p class="small" id="c-err" role="alert" style="margin:0;color:var(--ko)"></p>' +
        '<div class="btn-row"><button class="btn btn-lg" type="submit">' + I('arrow') + 'Se connecter</button></div>' +
        '<p class="small muted" style="margin:0">Pas encore de compte ? <a href="#/compte">Crée-le en une minute</a>.</p></form>';
    } else {
      corps = '<span class="eyebrow">Gratuit · 1 minute</span><h1>Crée ton compte</h1><p class="muted">Ensuite, un test de niveau d\'une vingtaine de minutes, et ta première leçon gratuite est prête.</p>' + onglets +
        '<form class="form" id="f-compte" novalidate>' +
        '<div class="field"><label for="c-nom">Prénom</label><input class="input" id="c-nom" name="nom" autocomplete="given-name" required maxlength="40"></div>' +
        '<div class="field"><label for="c-mail">Adresse e-mail</label><input class="input" id="c-mail" name="mail" type="email" autocomplete="email" required maxlength="120"><small>Pour te connecter et recevoir le rappel quotidien. Jamais revendue.</small></div>' +
        mdpChamp('c-mdp', 'Mot de passe', 'new-password', '<div class="pw-force" aria-hidden="true"><i></i></div><small id="c-force">8 caractères minimum.</small>') +
        mdpChamp('c-mdp2', 'Confirme le mot de passe', 'new-password') +
        '<div class="field"><label for="c-classe">Ta classe</label><select class="input" id="c-classe" name="classe">' + classes + '</select><small>Le test de niveau démarrera à ce niveau.</small></div>' +
        '<div class="field"><label for="c-heure">Heure du rappel quotidien</label><select class="input" id="c-heure" name="heure">' + heures.map(function (h) { return '<option' + (h === '17:30' ? ' selected' : '') + '>' + h + '</option>'; }).join('') + '</select></div>' +
        '<label class="switch"><input type="checkbox" name="notif" checked> Recevoir le mail avec mes 3 leçons du jour</label>' +
        '<p class="small" id="c-err" role="alert" style="margin:0;color:var(--ko)"></p>' +
        '<div class="btn-row"><button class="btn btn-lg" type="submit">' + I('check') + 'Créer mon compte</button></div>' +
        '<p class="small muted" style="margin:0">Déjà inscrit ? <a href="#/compte/connexion">Connecte-toi</a>. Version démo : le compte est enregistré sur cet appareil.</p></form>';
    }
    main.innerHTML = page(corps, true);
    var f = U.$('#f-compte', main), err = U.$('#c-err', main);
    main.onclick = function (e) {
      var b = e.target.closest('[data-voir]'); if (!b) return;
      var inp = U.$('#' + b.getAttribute('data-voir'), main);
      var vis = inp.type === 'password';
      inp.type = vis ? 'text' : 'password'; b.textContent = vis ? 'Masquer' : 'Afficher';
      b.setAttribute('aria-label', vis ? 'Masquer le mot de passe' : 'Afficher le mot de passe');
    };
    var force = U.$('.pw-force i', main);
    if (force) f.querySelector('#c-mdp').oninput = function () {
      var v = this.value, n = 0;
      if (v.length >= 8) n++; if (v.length >= 12) n++; if (/[A-Z]/.test(v) && /[a-z]/.test(v)) n++; if (/\d/.test(v)) n++; if (/[^A-Za-z0-9]/.test(v)) n++;
      var lib = ['Trop court', 'Faible', 'Correct', 'Bon', 'Très bon', 'Excellent'][v.length < 8 ? 0 : n];
      force.style.width = (v.length < 8 ? 10 : n * 20) + '%';
      force.setAttribute('data-n', v.length < 8 ? 0 : n);
      U.$('#c-force', main).textContent = v ? 'Solidité : ' + lib : '8 caractères minimum.';
    };
    setTimeout(function () { var p = f.querySelector('input'); if (p) p.focus(); }, 30);
    f.onsubmit = function (e) {
      e.preventDefault();
      err.textContent = '';
      var mail = f.mail.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) { err.textContent = 'Cette adresse e-mail ne semble pas valide.'; f.mail.focus(); return; }
      if (connexion) {
        Store.connexion(mail, f['c-mdp'].value).then(function () {
          Test.recommencer();
          var st = Store.get();
          location.hash = st.niveau ? '#/aujourdhui' : '#/test';
          toast('Bon retour ' + st.profil.nom + ' !');
        }, function (x) { err.textContent = x.message === 'inconnu' ? 'Aucun compte avec cet e-mail sur cet appareil.' : 'Mot de passe incorrect.'; });
        return;
      }
      var nom = f.nom.value.trim();
      if (!nom) { err.textContent = 'Indique ton prénom.'; f.nom.focus(); return; }
      if (f['c-mdp'].value.length < 8) { err.textContent = 'Le mot de passe doit faire au moins 8 caractères.'; f['c-mdp'].focus(); return; }
      if (f['c-mdp'].value !== f['c-mdp2'].value) { err.textContent = 'Les deux mots de passe ne sont pas identiques.'; f['c-mdp2'].focus(); return; }
      if (Store.existe(mail)) { err.textContent = 'Un compte existe déjà avec cet e-mail. Connecte-toi.'; return; }
      Store.creerCompte({ nom: nom, mail: mail, mdp: f['c-mdp'].value, classe: f.classe.value || null, notif: { actif: f.notif.checked, heure: f.heure.value } }).then(function () {
        Test.recommencer();
        location.hash = '#/test';
        toast('Compte créé. Bienvenue ' + nom + ' ! Place au test de niveau.');
      }, function () { err.textContent = 'Impossible de créer le compte.'; });
    };
  }

  window.Vues = {
    compte: vCompte,
    accueil: vAccueil, aujourdhui: vAujourdhui, lecon: vLecon, programme: vProgramme,
    abonnement: vAbonnement, reglages: vReglages, themes: modalThemes, lecon_: lecon
  };
})();
