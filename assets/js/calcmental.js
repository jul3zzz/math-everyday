/* Math Everyday — calcul mental : séries rapides de 10 calculs de tête générés au hasard,
   par thème et par difficulté, chronométrées. Gratuit : 30 calculs par jour ; abonnés : illimité.
   Expose window.CalculMental. */
(function () {
  'use strict';
  var esc = U.esc, LIMITE = 30;
  function int(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function nz(a, b) { var x; do { x = int(a, b); } while (x === 0); return x; }
  function pick(t) { return t[Math.floor(Math.random() * t.length)]; }
  function P(x) { return x < 0 ? '(' + x + ')' : String(x); }
  function D(x) { return String(Math.round(x * 1000) / 1000).replace('.', '{,}'); }
  /* chaque thème : nom, description, générateur(niveau 1..3) -> { q, rep } */
  var THEMES = [
    ['tables', 'Tables de multiplication', 'De 2 à 12, puis jusqu\'à 20', function (n) { var m = n === 1 ? 10 : n === 2 ? 12 : 20, a = int(2, m), b = int(2, m); return Math.random() < 0.8 || n === 1 ? { q: a + ' \\times ' + b, rep: a * b } : { q: a * b + ' \\div ' + a, rep: b }; }],
    ['addsous', 'Additions et soustractions', 'Nombres entiers puis décimaux', function (n) { var a = n === 1 ? int(10, 99) : n === 2 ? int(100, 999) : int(10, 999) / 10, b = n === 1 ? int(10, 99) : n === 2 ? int(10, 999) : int(10, 999) / 10; return Math.random() < 0.5 ? { q: D(a) + ' + ' + D(b), rep: a + b } : { q: D(Math.max(a, b)) + ' - ' + D(Math.min(a, b)), rep: Math.max(a, b) - Math.min(a, b) }; }],
    ['relatifs', 'Nombres relatifs', 'Sommes, différences et produits', function (n) { var m = n * 10, a = nz(-m, m), b = nz(-m, m), t = int(0, n === 1 ? 1 : 2); return t === 0 ? { q: P(a) + ' + ' + P(b), rep: a + b } : t === 1 ? { q: P(a) + ' - ' + P(b), rep: a - b } : { q: P(a) + ' \\times ' + P(b), rep: a * b }; }],
    ['doubles', 'Doubles, moitiés, ×10', 'Multiplier et diviser par 2, 4, 10, 100…', function (n) { var a = n === 1 ? int(2, 100) : int(11, 999) / (n === 3 ? 10 : 1), k = pick(n === 1 ? [2, 10] : [2, 4, 5, 10, 100, 0.1, 0.5]); return Math.random() < 0.5 || k < 1 ? { q: D(a) + ' \\times ' + D(k), rep: a * k } : { q: D(a * k) + ' \\div ' + D(k), rep: a }; }],
    ['carres', 'Carrés et puissances', 'Carrés, cubes, puissances de 2 et de 10', function (n) { var t = int(0, n === 1 ? 0 : 2); if (t === 0) { var a = int(1, n === 1 ? 12 : n === 2 ? 20 : 30); return { q: a + '^2', rep: a * a }; } if (t === 1) { var b = int(1, n === 2 ? 5 : 10); return { q: b + '^3', rep: b * b * b }; } var e = int(0, n === 2 ? 10 : 15); return { q: '2^{' + e + '}', rep: Math.pow(2, e) }; }],
    ['racines', 'Racines carrées', 'Carrés parfaits', function (n) { var a = int(1, n === 1 ? 12 : n === 2 ? 20 : 30), k = n === 3 && Math.random() < 0.4 ? pick([4, 9, 16, 25]) : 1; return k > 1 ? { q: '\\sqrt{' + a * a * k + '}', rep: a * Math.sqrt(k) } : { q: '\\sqrt{' + a * a + '}', rep: a }; }],
    ['fractions', 'Fractions', 'Fraction d\'un nombre, sommes simples', function (n) { var b = pick(n === 1 ? [2, 4, 5, 10] : [2, 3, 4, 5, 6, 8, 10]), a = int(1, b - 1); if (n === 1 || Math.random() < 0.5) { var N = b * int(2, n === 1 ? 10 : 25); return { q: '\\dfrac{' + a + '}{' + b + '} \\text{ de } ' + N, rep: N / b * a }; } var c = int(1, b - 1); return { q: '\\dfrac{' + a + '}{' + b + '} + \\dfrac{' + c + '}{' + b + '}', rep: (a + c) / b, tol: 0.005 }; }],
    ['pourcents', 'Pourcentages', '10 %, 25 %, 50 %… d\'un nombre', function (n) { var t = pick(n === 1 ? [10, 50] : n === 2 ? [5, 10, 20, 25, 50, 75] : [1, 5, 12, 15, 30, 40, 120]), N = 20 * int(1, n === 1 ? 10 : 50); return { q: t + '\\,\\% \\text{ de } ' + N, rep: t * N / 100 }; }],
    ['priorites', 'Priorités opératoires', 'Calculs enchaînés', function (n) { var a = int(2, 9), b = int(2, 9), c = int(2, 9), d = int(1, 9), t = int(0, 2); if (t === 0) return { q: a + ' + ' + b + ' \\times ' + c, rep: a + b * c }; if (t === 1) return { q: '(' + a + ' + ' + b + ') \\times ' + c + ' - ' + d, rep: (a + b) * c - d }; return { q: a * c + ' \\div ' + c + ' + ' + b + '^2', rep: a + b * b }; }],
    ['melange', 'Mélange', 'Un peu de tout', null]
  ];
  THEMES[THEMES.length - 1][3] = function (n) { var t = THEMES[int(0, THEMES.length - 2)]; return t[3](n); };

  function st() { var s = Store.get(); s.mental = s.mental || { jour: null, n: 0, records: {} }; if (s.mental.jour !== U.today()) { s.mental.jour = U.today(); s.mental.n = 0; } return s.mental; }
  function reste() { return Store.estPremium() ? Infinity : Math.max(0, LIMITE - st().n); }
  function page(inner) { return '<section class="page"><div class="wrap wrap-narrow">' + inner + '</div></section>'; }

  function vAccueil(main) {
    if (!Store.connecte()) { location.hash = '#/compte'; return; }
    var m = st(), niv = m.niv || 1;
    main.innerHTML = page('<span class="eyebrow">Calcul mental</span><h1>Calculs de tête</h1>' +
      '<p class="muted">Des séries de 10 calculs rapides, générés au hasard. Pas de calculatrice : tout se fait de tête, le plus vite possible.' + (Store.estPremium() ? '' : ' Formule gratuite : ' + LIMITE + ' calculs par jour (il t\'en reste ' + reste() + ').') + '</p>' +
      '<div class="seg" role="tablist" style="margin:8px 0 18px">' + [[1, 'Facile'], [2, 'Moyen'], [3, 'Difficile']].map(function (d) { return '<button type="button" class="seg-b" data-niv="' + d[0] + '" aria-selected="' + (d[0] === niv) + '">' + d[1] + '</button>'; }).join('') + '</div>' +
      '<div class="cm-themes">' + THEMES.map(function (t) {
        var rec = m.records[t[0] + niv];
        return '<button type="button" class="card cm-t" data-theme-cm="' + t[0] + '"><b>' + esc(t[1]) + '</b><span class="small muted">' + esc(t[2]) + '</span>' + (rec ? '<span class="chip">' + I('star') + 'Record ' + rec.score + '/10 · ' + rec.temps + ' s</span>' : '') + '</button>';
      }).join('') + '</div>');
    main.onclick = function (e) {
      var d = e.target.closest('[data-niv]'); if (d) { m.niv = +d.getAttribute('data-niv'); Store.save(); vAccueil(main); return; }
      var t = e.target.closest('[data-theme-cm]'); if (t) serie(main, t.getAttribute('data-theme-cm'), niv);
    };
  }
  function serie(main, id, niv) {
    var T = THEMES.filter(function (t) { return t[0] === id; })[0];
    if (reste() <= 0) { limite(main); return; }
    var qs = [], i = 0, ok = 0, debut = Date.now(), reps = [];
    for (var k = 0; k < 10; k++) qs.push(T[3](niv));
    function q() {
      if (reste() <= 0) { fin(true); return; }
      var x = qs[i];
      main.innerHTML = page('<div class="quiz-top"><span class="quiz-count">' + (i + 1) + ' / 10</span><div class="progress"><i style="width:' + (i * 10) + '%"></i></div><span class="mono small" id="cm-t">0 s</span></div>' +
        '<div class="card cm-carte"><span class="chip">' + esc(T[1]) + '</span><div class="cm-q">$' + x.q + ' = \\ ?$</div>' +
        '<form id="cm-f" class="answer" novalidate style="justify-content:center"><label class="sr" for="cm-in">Réponse</label><input class="input cm-in" id="cm-in" inputmode="decimal" autocomplete="off" spellcheck="false"><button class="btn" type="submit">OK</button></form>' +
        '<div class="cm-fb" id="cm-fb" aria-live="polite"></div></div>' +
        '<p class="small muted center">Entrée pour valider · ' + ok + ' juste' + (ok > 1 ? 's' : '') + ' pour l\'instant</p>');
      U.math(main);
      var inp = U.$('#cm-in', main); inp.focus();
      var t = setInterval(function () { var z = U.$('#cm-t', main); if (!z) { clearInterval(t); return; } z.textContent = Math.round((Date.now() - debut) / 1000) + ' s'; }, 300);
      U.$('#cm-f', main).onsubmit = function (e) {
        e.preventDefault();
        var v = inp.value.trim(); if (!v) return;
        clearInterval(t);
        var juste = Check.juger({ type: 'num', rep: x.rep, tol: x.tol }, v);
        reps.push({ v: v, ok: juste }); if (juste) ok++;
        st().n++; Store.save();
        if (juste) Progres.gagner('exo', { ok: true }); else Progres.rate();
        var fb = U.$('#cm-fb', main);
        fb.className = 'cm-fb ' + (juste ? 'ok' : 'ko');
        fb.innerHTML = juste ? I('check') + 'Juste !' : I('x') + 'Non : $' + x.q + ' = ' + D(x.rep) + '$';
        U.math(fb);
        inp.disabled = true;
        setTimeout(function () { i++; if (i < 10) q(); else fin(false); }, juste ? 450 : 1500);
      };
    }
    function fin(coupe) {
      var temps = Math.round((Date.now() - debut) / 1000), m = st(), cle = id + niv, rec = m.records[cle], nouveau = !coupe && (!rec || ok > rec.score || (ok === rec.score && temps < rec.temps));
      if (nouveau) { m.records[cle] = { score: ok, temps: temps }; Store.save(); }
      main.innerHTML = page('<div class="card end-card">' + Mascotte.bulle(coupe ? 'Tu as atteint la limite gratuite du jour. Reviens demain, ou passe à l\'illimité !' : ok === 10 ? 'Sans faute ! Une vraie calculatrice humaine.' : ok >= 7 ? 'Très bien !' : 'Continue, ça vient avec l\'entraînement.', ok >= 7 ? 'bravo' : 'pense') +
        '<span class="eyebrow">' + esc(T[1]) + '</span><div class="end-score">' + ok + ' / ' + reps.length + '</div><p>' + temps + ' secondes' + (nouveau ? ' · <b>nouveau record !</b>' : '') + '</p>' +
        '<div class="btn-row" style="justify-content:center">' + (coupe ? '<a class="btn" href="#/abonnement">' + I('crown') + 'Passer à l\'illimité</a>' : '<button class="btn" type="button" id="cm-re">' + I('refresh') + 'Rejouer</button>') + '<a class="btn btn-2" href="#/calcul-mental">Autres thèmes</a></div></div>');
      var re = U.$('#cm-re', main); if (re) re.onclick = function () { serie(main, id, niv); };
    }
    q();
  }
  function limite(main) {
    main.innerHTML = page('<div class="card center">' + Mascotte.bulle('Tu as fait tes ' + LIMITE + ' calculs gratuits du jour. Reviens demain, ou passe à l\'illimité pour t\'entraîner sans limite.', 'pense') + '<div class="btn-row" style="justify-content:center"><a class="btn" href="#/abonnement">' + I('crown') + 'Voir les offres</a><a class="btn btn-2" href="#/sentrainer">S\'entraîner autrement</a></div></div>');
  }
  window.CalculMental = { page: vAccueil, THEMES: THEMES, LIMITE: LIMITE };
})();
