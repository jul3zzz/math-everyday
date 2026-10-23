/* Math Everyday — progression : XP, niveaux, badges, activité quotidienne, objectifs de la semaine,
   calendrier de série et mascotte φ. Expose window.Progres et window.Mascotte. */
(function () {
  'use strict';

  /* ---------------- Données ---------------- */
  function st() {
    var s = Store.get();
    s.xp = s.xp || 0;
    s.activite = s.activite || {};
    s.badges = s.badges || {};
    s.objectif = s.objectif || { lecons: 5, minutes: 0 };
    s.stats = s.stats || { exosOk: 0, exosTot: 0, cartes: 0, examens: [], calculs: 0 };
    return s;
  }
  function jour(d) { var a = st().activite, k = d || U.today(); a[k] = a[k] || { xp: 0, lecons: 0, exos: 0, cartes: 0 }; return a[k]; }

  /* Niveaux : il faut 100 × n XP pour passer du niveau n au niveau n+1. */
  var TITRES = ['Débutant', 'Curieux', 'Apprenti', 'Calculateur', 'Logicien', 'Géomètre', 'Algébriste', 'Analyste', 'Probabiliste', 'Mathématicien', 'Chercheur', 'Savant', 'Disciple d\'Euclide', 'Disciple de Gauss', 'Disciple d\'Euler', 'Maître du nombre d\'or'];
  function niveau(xp) {
    var n = 1, seuil = 0;
    while (xp >= seuil + 100 * n) { seuil += 100 * n; n++; }
    return { n: n, titre: TITRES[Math.min(n - 1, TITRES.length - 1)], debut: seuil, fin: seuil + 100 * n, dans: xp - seuil, besoin: 100 * n };
  }

  /* ---------------- Badges ---------------- */
  function nbFaites(s) { return Object.keys(s.faites).length; }
  function nbParfaites(s) { return Object.keys(s.faites).filter(function (k) { var f = s.faites[k]; return (f.best != null ? f.best : f.score) === 3; }).length; }
  function niveauFini(s) { return NIVEAUX.some(function (n) { var L = LECONS.filter(function (l) { return l.niveau === n.id; }); return L.length && L.every(function (l) { return s.faites[l.id]; }); }); }
  var BADGES = [
    { id: 'premiere', nom: 'Premier pas', desc: 'Terminer sa première leçon', ic: 'check', test: function (s) { return nbFaites(s) >= 1; } },
    { id: 'dix', nom: 'Dix leçons', desc: 'Terminer 10 leçons', ic: 'book', test: function (s) { return nbFaites(s) >= 10; } },
    { id: 'cinquante', nom: 'Cinquante', desc: 'Terminer 50 leçons', ic: 'book', test: function (s) { return nbFaites(s) >= 50; } },
    { id: 'encyclopedie', nom: 'Encyclopédie', desc: 'Terminer les ' + (window.LECONS ? LECONS.length : 96) + ' leçons', ic: 'crown', test: function (s) { return nbFaites(s) >= LECONS.length; } },
    { id: 'parfait', nom: 'Sans faute', desc: 'Réussir les 3 exercices d\'une leçon', ic: 'star', test: function (s) { return nbParfaites(s) >= 1; } },
    { id: 'perfection', nom: 'Perfectionniste', desc: '10 leçons réussies sans faute', ic: 'star', test: function (s) { return nbParfaites(s) >= 10; } },
    { id: 'niveau', nom: 'Niveau bouclé', desc: 'Terminer toutes les leçons d\'un niveau', ic: 'target', test: niveauFini },
    { id: 'serie3', nom: 'Lancé', desc: '3 jours de suite', ic: 'flame', test: function (s) { return Progres.serie() >= 3; } },
    { id: 'serie7', nom: 'Une semaine', desc: '7 jours de suite', ic: 'flame', test: function (s) { return Progres.serie() >= 7; } },
    { id: 'serie30', nom: 'Un mois', desc: '30 jours de suite', ic: 'flame', test: function (s) { return Progres.serie() >= 30; } },
    { id: 'serie100', nom: 'Centenaire', desc: '100 jours de suite', ic: 'flame', test: function (s) { return Progres.serie() >= 100; } },
    { id: 'memoire', nom: 'Bonne mémoire', desc: 'Réviser 50 cartes', ic: 'refresh', test: function (s) { return s.stats.cartes >= 50; } },
    { id: 'elephant', nom: 'Mémoire d\'éléphant', desc: 'Réviser 500 cartes', ic: 'refresh', test: function (s) { return s.stats.cartes >= 500; } },
    { id: 'entraineur', nom: 'Entraîné', desc: '100 exercices justes en entraînement', ic: 'pencil', test: function (s) { return s.stats.exosOk >= 100; } },
    { id: 'machine', nom: 'Machine à calculer', desc: '1 000 exercices justes en entraînement', ic: 'pencil', test: function (s) { return s.stats.exosOk >= 1000; } },
    { id: 'examen', nom: 'Premier examen', desc: 'Terminer un examen blanc', ic: 'clock', test: function (s) { return s.stats.examens.length >= 1; } },
    { id: 'mention', nom: 'Mention très bien', desc: 'Obtenir au moins 16/20 à un examen blanc', ic: 'crown', test: function (s) { return s.stats.examens.some(function (e) { return e.note >= 16; }); } },
    { id: 'vingt', nom: '20 sur 20', desc: 'Obtenir 20/20 à un examen blanc', ic: 'crown', test: function (s) { return s.stats.examens.some(function (e) { return e.note >= 20; }); } },
    { id: 'objectif', nom: 'Objectif atteint', desc: 'Atteindre son objectif de la semaine', ic: 'target', test: function (s) { return Progres.semaine().lecons >= s.objectif.lecons; } },
    { id: 'matinal', nom: 'Lève-tôt', desc: 'Travailler avant 8 h', ic: 'sun', test: function () { return new Date().getHours() < 8; } },
    { id: 'nocturne', nom: 'Oiseau de nuit', desc: 'Travailler après 22 h', ic: 'sun', test: function () { return new Date().getHours() >= 22; } },
    { id: 'scribe', nom: 'Scribe', desc: 'Écrire 10 notes', ic: 'pencil', test: function (s) { return (s.notes || []).length >= 10; } },
    { id: 'or', nom: 'Nombre d\'or', desc: 'Atteindre le niveau 8', ic: 'star', test: function (s) { return niveau(s.xp).n >= 8; } }
  ];

  /* ---------------- API ---------------- */
  var GAINS = { lecon: function (o) { return 20 + 10 * (o.score || 0); }, exo: function () { return 5; }, carte: function (o) { return o.su ? 3 : 1; }, examen: function (o) { return Math.round(10 + (o.note || 0) * 3); } };
  var Progres = {
    niveau: niveau, BADGES: BADGES, TITRES: TITRES,
    xp: function () { return st().xp; },
    /* type : lecon | exo | carte | examen */
    gagner: function (type, o) {
      if (!Store.connecte()) return 0;
      o = o || {};
      var s = st(), avant = niveau(s.xp).n, j = jour(), premier = j.xp === 0;
      var g = GAINS[type] ? GAINS[type](o) : 0;
      if (premier && g > 0) g += 10; /* bonus première activité du jour */
      s.xp += g; j.xp += g;
      if (type === 'lecon') j.lecons++;
      if (type === 'exo') { j.exos++; s.stats.exosTot++; if (o.ok) s.stats.exosOk++; }
      if (type === 'carte') { j.cartes++; s.stats.cartes++; }
      if (type === 'examen') s.stats.examens.push({ date: U.today(), niveau: o.niveau, note: o.note, titre: o.titre });
      Store.save();
      var apres = niveau(s.xp).n;
      if (apres > avant) setTimeout(function () { Progres.fete('Niveau ' + apres + ' : ' + niveau(s.xp).titre + ' !'); }, 400);
      Progres.verifierBadges();
      return g;
    },
    /* exo d'entraînement raté : compte dans les stats sans XP */
    rate: function () { if (!Store.connecte()) return; var s = st(); s.stats.exosTot++; jour().exos++; Store.save(); },
    verifierBadges: function () {
      var s = st(), nouveaux = [];
      BADGES.forEach(function (b) { if (!s.badges[b.id]) { try { if (b.test(s)) { s.badges[b.id] = U.today(); nouveaux.push(b); } } catch (e) { /* données incomplètes */ } } });
      if (nouveaux.length) {
        Store.save();
        nouveaux.forEach(function (b, i) { setTimeout(function () { Progres.fete('Badge débloqué : ' + b.nom, b); }, 900 + i * 1600); });
      }
      return nouveaux;
    },
    fete: function (msg, badge) {
      var d = document.createElement('div');
      d.className = 'fete'; d.setAttribute('role', 'status');
      d.innerHTML = Mascotte.svg('bravo') + '<div><b>' + U.esc(msg) + '</b>' + (badge ? '<span>' + U.esc(badge.desc) + '</span>' : '') + '</div>';
      document.body.appendChild(d);
      requestAnimationFrame(function () { d.classList.add('on'); });
      setTimeout(function () { d.classList.remove('on'); setTimeout(function () { d.remove(); }, 400); }, 3600);
    },
    /* série : jours consécutifs avec une activité (aujourd'hui ou jusqu'à hier) */
    serie: function () {
      var s = st(), jours = {};
      for (var k in s.activite) if (s.activite[k].xp > 0) jours[k] = 1;
      for (var id in s.faites) jours[s.faites[id].date] = 1;
      var d = U.today(), n = 0;
      if (!jours[d]) d = U.addDays(d, -1);
      while (jours[d]) { n++; d = U.addDays(d, -1); }
      return n;
    },
    meilleureSerie: function () {
      var s = st(), jours = Object.keys(s.activite).filter(function (k) { return s.activite[k].xp > 0; }).sort(), best = 0, cur = 0, prev = null;
      jours.forEach(function (d) { cur = prev && U.addDays(prev, 1) === d ? cur + 1 : 1; best = Math.max(best, cur); prev = d; });
      return Math.max(best, Progres.serie());
    },
    /* semaine en cours (lundi → dimanche) */
    semaine: function () {
      var s = st(), auj = new Date(), dec = (auj.getDay() + 6) % 7, lundi = U.addDays(U.today(), -dec), t = { lecons: 0, xp: 0, exos: 0, cartes: 0, jours: 0 };
      for (var i = 0; i < 7; i++) { var a = s.activite[U.addDays(lundi, i)]; if (a) { t.lecons += a.lecons; t.xp += a.xp; t.exos += a.exos; t.cartes += a.cartes; if (a.xp) t.jours++; } }
      t.lundi = lundi;
      return t;
    },
    /* calendrier façon contributions : 26 semaines */
    calendrier: function (semaines) {
      semaines = semaines || 26;
      var s = st(), auj = new Date(), dec = (auj.getDay() + 6) % 7, debut = U.addDays(U.today(), -dec - 7 * (semaines - 1));
      var cases = '', mois = '', dernierMois = -1;
      for (var w = 0; w < semaines; w++) {
        var col = '';
        for (var d = 0; d < 7; d++) {
          var date = U.addDays(debut, w * 7 + d), a = s.activite[date], xp = a ? a.xp : 0;
          var futur = date > U.today();
          var lvl = futur ? -1 : xp === 0 ? 0 : xp < 30 ? 1 : xp < 60 ? 2 : xp < 100 ? 3 : 4;
          col += '<i class="cal-c" data-l="' + lvl + '" title="' + date + (futur ? '' : ' : ' + xp + ' XP') + '"></i>';
          if (d === 0) { var m = +date.split('-')[1]; if (m !== dernierMois) { mois += '<span style="grid-column:' + (w + 1) + '">' + ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'][m - 1] + '</span>'; dernierMois = m; } }
        }
        cases += '<div class="cal-s">' + col + '</div>';
      }
      return '<div class="cal" style="--sem:' + semaines + '"><div class="cal-m">' + mois + '</div><div class="cal-g">' + cases + '</div>' +
        '<div class="cal-leg"><span>Moins</span><i class="cal-c" data-l="0"></i><i class="cal-c" data-l="1"></i><i class="cal-c" data-l="2"></i><i class="cal-c" data-l="3"></i><i class="cal-c" data-l="4"></i><span>Plus</span></div></div>';
    }
  };

  /* ---------------- Mascotte φ ---------------- */
  var ASTUCES = [
    'Une leçon par jour, c\'est 365 leçons par an. La régularité bat l\'intensité.',
    'Quand un exercice résiste, refais l\'exemple du cours en cachant la solution.',
    'Vérifie toujours un résultat avec un ordre de grandeur.',
    'Écris chaque étape de calcul sur une nouvelle ligne : moins d\'erreurs, plus de clarté.',
    'Les révisions espacées gravent les formules dans la mémoire à long terme.',
    'Une figure à main levée aide presque toujours en géométrie.',
    'Relis l\'énoncé à la fin : as-tu bien répondu à la question posée ?',
    'Le nombre d\'or vaut (1 + √5)/2 ≈ 1,618. On le retrouve dans les spirales des tournesols.',
    'Un « piège » repéré dans le cours vaut dix exercices ratés.',
    'Explique une notion à voix haute : si tu peux l\'expliquer, tu l\'as comprise.',
    'Les erreurs sont des informations, pas des échecs. Lis toujours la correction.',
    'En prépa comme au collège : définitions précises, puis exemples, puis exercices.',
    'Prends des notes avec tes mots : c\'est la meilleure fiche de révision.',
    'Utilise le brouillon pour tester une idée avant de l\'écrire au propre.',
    'Le cerveau consolide pendant le sommeil : une leçon le soir, une révision le matin.'
  ];
  var Mascotte = {
    svg: function (humeur) {
      humeur = humeur || 'content';
      var yeux = humeur === 'bravo'
        ? '<path d="M24 30q3-4 6 0M34 30q3-4 6 0" fill="none" stroke="var(--masc-ink)" stroke-width="2.4" stroke-linecap="round"/>'
        : humeur === 'pense'
          ? '<circle cx="27" cy="29" r="2.6" fill="var(--masc-ink)"/><circle cx="37" cy="27" r="2.6" fill="var(--masc-ink)"/>'
          : '<circle cx="27" cy="29" r="2.8" fill="var(--masc-ink)"/><circle cx="37" cy="29" r="2.8" fill="var(--masc-ink)"/><circle cx="28" cy="28" r=".9" fill="var(--masc-fond)"/><circle cx="38" cy="28" r=".9" fill="var(--masc-fond)"/>';
      var bouche = humeur === 'pense' ? '<path d="M28 39h8" stroke="var(--masc-ink)" stroke-width="2.2" stroke-linecap="round"/>' : '<path d="M26 37q6 6 12 0" fill="none" stroke="var(--masc-ink)" stroke-width="2.4" stroke-linecap="round"/>';
      return '<svg class="masc" viewBox="0 0 64 64" aria-hidden="true">' +
        '<path d="M32 4v56" stroke="var(--masc-trait)" stroke-width="5" stroke-linecap="round"/>' +
        '<ellipse cx="32" cy="33" rx="19" ry="15" fill="var(--masc-fond)" stroke="var(--masc-trait)" stroke-width="4"/>' +
        '<ellipse cx="21" cy="37" rx="3" ry="2" fill="var(--masc-joue)"/><ellipse cx="43" cy="37" rx="3" ry="2" fill="var(--masc-joue)"/>' +
        yeux + bouche + '</svg>';
    },
    bulle: function (msg, humeur) {
      return '<div class="masc-w">' + Mascotte.svg(humeur) + '<div class="masc-bulle">' + msg + '</div></div>';
    },
    astuce: function () {
      var i = Math.floor((Date.now() / 86400000)) % ASTUCES.length;
      return ASTUCES[i];
    },
    salut: function (nom) {
      var h = new Date().getHours(), s = Progres.serie();
      var debut = h < 6 ? 'Encore debout, ' : h < 12 ? 'Bonjour ' : h < 18 ? 'Salut ' : 'Bonsoir ';
      var serie = s >= 2 ? ' Tu es sur une série de ' + s + ' jours, continue !' : s === 1 ? ' Tu as travaillé hier : on enchaîne ?' : '';
      return debut + U.esc(nom) + ' !' + serie + '<br><span class="masc-ast"><b>Astuce du jour.</b> ' + U.esc(Mascotte.astuce()) + '</span>';
    }
  };

  window.Progres = Progres;
  window.Mascotte = Mascotte;
})();
