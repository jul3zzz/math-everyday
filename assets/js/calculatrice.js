/* Math Everyday — calculatrice : scientifique, graphique, équations, statistiques & probabilités,
   matrices, conversions. S'appuie sur window.Moteur. Expose window.Calculatrice. */
(function () {
  'use strict';
  var M = window.Moteur;
  var esc = function (s) { return U.esc(s); };
  var num = function (s) { var v = Check.nombre(String(s).trim()); return v; };
  var fm = function (x) { return M.fmtReel(x, 10); };

  function etat() {
    var st = Store.get();
    if (!st.calc) st.calc = {};
    var c = st.calc;
    c.hist = c.hist || []; c.vars = c.vars || {}; c.angle = c.angle || 'deg';
    c.onglet = c.onglet || 'calcul';
    c.graph = c.graph || { fns: [{ e: 'x^2 - 2', on: true }, { e: 'sin(x)', on: true }], win: [-6, 6, -4, 4] };
    c.equ = c.equ || 'poly';
    c.stat = c.stat || 'une';
    c.conv = c.conv || 'bases';
    return c;
  }
  function sauver() { Store.save(); }

  var ONGLETS = [
    ['calcul', 'Calcul'], ['graphe', 'Graphique'], ['equations', 'Équations'],
    ['stats', 'Stats & probas'], ['matrices', 'Matrices'], ['conversions', 'Conversions']
  ];
  var COULEURS = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c', '#0891b2'];

  var racineEl = null;

  function monter(el) {
    racineEl = el;
    var c = etat();
    el.innerHTML = '<div class="calc">' +
      '<div class="calc-tabs" role="tablist" aria-label="Modes de la calculatrice">' + ONGLETS.map(function (o) {
        return '<button type="button" role="tab" class="calc-tab" data-onglet="' + o[0] + '" aria-selected="' + (c.onglet === o[0]) + '">' + o[1] + '</button>';
      }).join('') + '</div><div class="calc-corps" id="calc-corps"></div></div>';
    el.querySelector('.calc-tabs').onclick = function (e) {
      var b = e.target.closest('[data-onglet]'); if (!b) return;
      c.onglet = b.getAttribute('data-onglet'); sauver();
      U.$$('.calc-tab', el).forEach(function (t) { t.setAttribute('aria-selected', t === b); });
      afficher();
    };
    afficher();
  }
  function afficher() {
    var c = etat(), corps = U.$('#calc-corps', racineEl);
    corps.onclick = null; corps.oninput = null; corps.onchange = null; corps.onkeydown = null;
    ({ calcul: vCalcul, graphe: vGraphe, equations: vEquations, stats: vStats, matrices: vMatrices, conversions: vConversions })[c.onglet](corps);
  }

  /* ============================================================
     1. CALCUL SCIENTIFIQUE
     ============================================================ */
  var deuxieme = false, complexe = false;
  var TOUCHES = [
    /* [libellé, insertion, libellé 2nde, insertion 2nde, classe] */
    [['2nde', '@2nde', null, null, 'k-mode'], ['@angle', '@angle', null, null, 'k-mode'], ['ℝ', '@cx', null, null, 'k-mode'], ['(', '('], [')', ')'], ['AC', '@ac', null, null, 'k-del']],
    [['sin', 'sin(', 'sin⁻¹', 'asin('], ['cos', 'cos(', 'cos⁻¹', 'acos('], ['tan', 'tan(', 'tan⁻¹', 'atan('], ['ln', 'ln(', 'eˣ', 'e^('], ['log', 'log(', '10ˣ', '10^('], ['⌫', '@del', null, null, 'k-del']],
    [['x²', '²', 'x³', '³'], ['xʸ', '^', 'ʸ√x', 'root('], ['7', '7', null, null, 'k-num'], ['8', '8', null, null, 'k-num'], ['9', '9', null, null, 'k-num'], ['÷', '÷', null, null, 'k-op']],
    [['√', '√(', '∛', '∛('], ['x⁻¹', '^(-1)', '|x|', 'abs('], ['4', '4', null, null, 'k-num'], ['5', '5', null, null, 'k-num'], ['6', '6', null, null, 'k-num'], ['×', '×', null, null, 'k-op']],
    [['x!', '!', 'nCr', 'ncr('], ['π', 'π', 'φ', 'φ'], ['1', '1', null, null, 'k-num'], ['2', '2', null, null, 'k-num'], ['3', '3', null, null, 'k-num'], ['−', '−', null, null, 'k-op']],
    [['e', 'e', 'mod', ' mod '], ['%', '%', 'nPr', 'npr('], ['0', '0', null, null, 'k-num'], [',', ',', null, null, 'k-num'], ['ᴇ', 'ᴇ', null, null, 'k-num'], ['+', '+', null, null, 'k-op']],
    [['Ans', 'Ans', 'rand', 'rand()'], ['i', 'i', '°', '°'], [';', ';'], ['x', 'x', 'k', 'k'], ['=', '=', 'STO', '@sto'], ['EXE', '@exe', null, null, 'k-exe']]
  ];
  var CATALOGUE = [
    ['Trigonométrie', [['sin(x)', 'sinus'], ['cos(x)', 'cosinus'], ['tan(x)', 'tangente'], ['asin(x)', 'arc sinus'], ['acos(x)', 'arc cosinus'], ['atan(x)', 'arc tangente'], ['cot(x)', 'cotangente'], ['sec(x)', 'sécante'], ['csc(x)', 'cosécante'], ['atan2(y;x)', 'angle du point (x;y)'], ['deg(x)', 'radians → degrés'], ['rad(x)', 'degrés → radians']]],
    ['Hyperboliques', [['sinh(x)', 'sinus hyperbolique (sh)'], ['cosh(x)', 'cosinus hyperbolique (ch)'], ['tanh(x)', 'tangente hyperbolique (th)'], ['asinh(x)', 'argsh'], ['acosh(x)', 'argch'], ['atanh(x)', 'argth']]],
    ['Puissances & logarithmes', [['exp(x)', 'exponentielle'], ['ln(x)', 'logarithme népérien'], ['log(x)', 'logarithme décimal'], ['log(x;b)', 'logarithme en base b'], ['log2(x)', 'logarithme en base 2'], ['sqrt(x)', 'racine carrée'], ['cbrt(x)', 'racine cubique'], ['root(x;n)', 'racine n-ième'], ['hyp(a;b)', '√(a² + b²)']]],
    ['Arithmétique', [['pgcd(a;b)', 'plus grand diviseur commun'], ['ppcm(a;b)', 'plus petit multiple commun'], ['mod(a;b)', 'reste de a par b'], ['quotient(a;b)', 'quotient entier'], ['premier(n)', '1 si n est premier, 0 sinon'], ['fact(n)', 'factorielle (ou n!)'], ['gamma(x)', 'fonction Γ'], ['ncr(n;k)', 'combinaisons (k parmi n)'], ['npr(n;k)', 'arrangements']]],
    ['Arrondis & nombres', [['abs(x)', 'valeur absolue / module'], ['round(x;n)', 'arrondi à n décimales'], ['floor(x)', 'partie entière'], ['ceil(x)', 'arrondi supérieur'], ['trunc(x)', 'troncature'], ['frac(x)', 'partie décimale'], ['sign(x)', 'signe'], ['min(a;b;…)', 'minimum'], ['max(a;b;…)', 'maximum'], ['moy(a;b;…)', 'moyenne'], ['rand()', 'aléatoire entre 0 et 1'], ['randint(a;b)', 'entier aléatoire']]],
    ['Complexes (mode ℂ)', [['i', 'unité imaginaire'], ['re(z)', 'partie réelle'], ['im(z)', 'partie imaginaire'], ['abs(z)', 'module'], ['arg(z)', 'argument'], ['conj(z)', 'conjugué']]],
    ['Analyse', [['deriv(x^3;2)', 'dérivée en x = a'], ['integ(x^2;0;3)', 'intégrale de a à b (variable x)'], ['somme(k^2;1;10)', 'Σ pour k de a à b'], ['produit(k;1;5)', 'Π pour k de a à b'], ['resoudre(x^2-2;1)', 'solution de … = 0 près d\'une valeur']]],
    ['Probabilités', [['binompdf(n;p;k)', 'P(X = k), loi binomiale'], ['binomcdf(n;p;k)', 'P(X ≤ k), loi binomiale'], ['normcdf(a;b;μ;σ)', 'P(a ≤ X ≤ b), loi normale'], ['normpdf(x;μ;σ)', 'densité normale'], ['invnorm(p;μ;σ)', 'quantile de la loi normale'], ['poissonpdf(λ;k)', 'loi de Poisson']]]
  ];
  var CONSTS = [
    ['π', 'π', 'pi'], ['e', 'e', 'nombre d\'Euler'], ['φ', 'φ', 'nombre d\'or'], ['τ = 2π', 'tau', 'tau'],
    ['c', '299792458', 'vitesse de la lumière (m/s)'], ['g', '9,80665', 'pesanteur terrestre (m/s²)'], ['G', '6,674ᴇ-11', 'constante gravitationnelle'],
    ['h', '6,62607015ᴇ-34', 'constante de Planck (J·s)'], ['Nₐ', '6,02214076ᴇ23', 'nombre d\'Avogadro (mol⁻¹)'], ['k_B', '1,380649ᴇ-23', 'constante de Boltzmann (J/K)'],
    ['e⁻', '1,602176634ᴇ-19', 'charge élémentaire (C)'], ['R', '8,314462618', 'constante des gaz parfaits'], ['mₑ', '9,1093837ᴇ-31', 'masse de l\'électron (kg)'], ['ε₀', '8,8541878128ᴇ-12', 'permittivité du vide']
  ];

  function vCalcul(corps) {
    var c = etat();
    complexe = !!c.complexe;
    var histo = c.hist.slice(-40).map(function (h, i) {
      return '<button type="button" class="ch-l" data-hist="' + (c.hist.length - Math.min(40, c.hist.length) + i) + '"><span class="ch-e">' + esc(h.e) + '</span><span class="ch-r">= ' + esc(h.r) + (h.x ? ' <em>(' + esc(h.x) + ')</em>' : '') + '</span></button>';
    }).join('');
    corps.innerHTML =
      '<div class="calc-ecran">' +
      '<div class="ch" id="ch">' + (histo || '<p class="ch-vide">Tape un calcul, par exemple <b>2(3+4)²</b>, <b>sin 30</b>, <b>integ(x^2;0;3)</b> ou <b>a = 5</b>.</p>') + '</div>' +
      '<label class="sr" for="ce">Expression</label>' +
      '<input class="ce" id="ce" autocomplete="off" spellcheck="false" inputmode="text" placeholder="0" value="' + esc(c.saisie || '') + '">' +
      '<div class="cr" id="cr" aria-live="polite"></div>' +
      '</div>' +
      '<div class="calc-barre">' +
      '<button type="button" class="cb" data-menu="fonctions">Fonctions</button>' +
      '<button type="button" class="cb" data-menu="constantes">Constantes</button>' +
      '<button type="button" class="cb" data-menu="variables">Variables</button>' +
      '<button type="button" class="cb" id="c-copier">Copier</button>' +
      '<button type="button" class="cb" id="c-effhist">Effacer l\'historique</button>' +
      '</div>' +
      '<div class="calc-menu" id="cmenu" hidden></div>' +
      '<div class="clavier" id="clavier"></div>';
    dessinerClavier();
    var inp = U.$('#ce', corps);
    var ch = U.$('#ch', corps); ch.scrollTop = ch.scrollHeight;
    apercu();
    inp.oninput = function () { c.saisie = inp.value; apercu(); };
    inp.onkeydown = function (e) {
      if (e.key === 'Enter') { e.preventDefault(); executer(); }
      else if (e.key === 'ArrowUp' && c.hist.length) { e.preventDefault(); navHist(-1); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); navHist(1); }
    };
    corps.onclick = function (e) {
      var k = e.target.closest('[data-k]');
      if (k) { touche(+k.getAttribute('data-r'), +k.getAttribute('data-c')); return; }
      var hb = e.target.closest('[data-hist]');
      if (hb) { var h = c.hist[+hb.getAttribute('data-hist')]; inserer(e.shiftKey ? h.r.replace(/ ×10\^/, 'ᴇ').replace(/−/g, '-') : h.e, true); return; }
      var mb = e.target.closest('[data-menu]');
      if (mb) { menu(mb.getAttribute('data-menu')); return; }
      var ins = e.target.closest('[data-ins]');
      if (ins) { inserer(ins.getAttribute('data-ins')); U.$('#cmenu', corps).hidden = true; return; }
      if (e.target.closest('#c-copier')) { copier(U.$('#cr', corps).getAttribute('data-val') || inp.value); return; }
      if (e.target.closest('#c-effhist')) { c.hist = []; sauver(); vCalcul(corps); return; }
      var del = e.target.closest('[data-delvar]');
      if (del) { delete c.vars[del.getAttribute('data-delvar')]; sauver(); menu('variables', true); return; }
    };
    var idxHist = c.hist.length;
    function navHist(d) {
      idxHist = Math.max(0, Math.min(c.hist.length, idxHist + d));
      inp.value = idxHist < c.hist.length ? c.hist[idxHist].e : '';
      c.saisie = inp.value; apercu();
    }
    setTimeout(function () { if (window.matchMedia('(pointer:fine)').matches) inp.focus(); }, 30);
  }

  function dessinerClavier() {
    var c = etat(), cl = U.$('#clavier', racineEl);
    cl.innerHTML = TOUCHES.map(function (rang, r) {
      return rang.map(function (t, k) {
        var lib = t[0];
        if (lib === '@angle') lib = c.angle.toUpperCase();
        if (lib === 'ℝ') lib = complexe ? 'ℂ' : 'ℝ';
        var lib2 = t[2];
        var montre = deuxieme && lib2 ? lib2 : lib;
        var cls = 'k ' + (t[4] || '') + (deuxieme && lib2 ? ' k-2' : '') + (t[0] === '2nde' && deuxieme ? ' on' : '') + (t[0] === 'ℝ' && complexe ? ' on' : '');
        return '<button type="button" class="' + cls + '" data-k data-r="' + r + '" data-c="' + k + '" title="' + esc(lib2 ? lib + ' / 2nde : ' + lib2 : lib) + '">' + esc(montre) + (lib2 && !deuxieme ? '<small>' + esc(lib2) + '</small>' : '') + '</button>';
      }).join('');
    }).join('');
  }

  function touche(r, k) {
    var c = etat(), t = TOUCHES[r][k];
    var act = deuxieme && t[3] ? t[3] : t[1];
    var inp = U.$('#ce', racineEl);
    if (act === '@2nde') { deuxieme = !deuxieme; dessinerClavier(); return; }
    if (deuxieme && t[2]) { deuxieme = false; dessinerClavier(); }
    if (act === '@angle') { c.angle = { deg: 'rad', rad: 'grad', grad: 'deg' }[c.angle]; sauver(); dessinerClavier(); apercu(); toast('Angles en ' + { deg: 'degrés', rad: 'radians', grad: 'grades' }[c.angle]); return; }
    if (act === '@cx') { complexe = !complexe; c.complexe = complexe; sauver(); dessinerClavier(); apercu(); toast(complexe ? 'Mode complexe : √(−1) = i' : 'Mode réel'); return; }
    if (act === '@ac') { inp.value = ''; c.saisie = ''; apercu(); inp.focus(); return; }
    if (act === '@del') {
      var a = inp.selectionStart, b = inp.selectionEnd, v = inp.value;
      if (a === b && a > 0) { inp.value = v.slice(0, a - 1) + v.slice(b); inp.setSelectionRange(a - 1, a - 1); }
      else { inp.value = v.slice(0, a) + v.slice(b); inp.setSelectionRange(a, a); }
      c.saisie = inp.value; apercu(); inp.focus(); return;
    }
    if (act === '@exe') { executer(); return; }
    if (act === '@sto') {
      var nom = prompt('Nom de la variable (lettres) :', 'a');
      if (nom && /^[A-Za-z][A-Za-z0-9_]*$/.test(nom)) { inp.value = nom + ' = ' + (inp.value || 'Ans'); executer(); }
      return;
    }
    inserer(act);
  }

  function inserer(txt, remplacer) {
    var c = etat(), inp = U.$('#ce', racineEl);
    if (!inp) return;
    if (remplacer) { inp.value = txt; inp.setSelectionRange(txt.length, txt.length); }
    else {
      var a = inp.selectionStart != null ? inp.selectionStart : inp.value.length, b = inp.selectionEnd != null ? inp.selectionEnd : a;
      /* Commencer par un opérateur après un résultat : on enchaîne sur Ans */
      if (!inp.value && /^[+×÷^²³!%−*\/]/.test(txt) && txt !== '−' && c.hist.length) { inp.value = 'Ans'; a = b = 3; }
      inp.value = inp.value.slice(0, a) + txt + inp.value.slice(b);
      var pos = a + txt.length;
      inp.setSelectionRange(pos, pos);
    }
    c.saisie = inp.value; apercu();
    if (window.matchMedia('(pointer:fine)').matches) inp.focus();
  }

  function calculer(expr) {
    var c = etat();
    var vars = {};
    for (var k in c.vars) vars[k] = M.C(c.vars[k].re, c.vars[k].im);
    var z = M.calculer(expr, { angle: c.angle, complexe: complexe, vars: vars });
    return { z: z, vars: vars };
  }
  function apercu() {
    var inp = U.$('#ce', racineEl), out = U.$('#cr', racineEl);
    if (!inp || !out) return;
    var v = inp.value.trim();
    if (!v || /=/.test(v.replace(/[<>]=/g, ''))) { out.textContent = ''; out.className = 'cr'; return; }
    try {
      var z = calculer(v).z;
      var ex = M.formeExacte(z);
      out.innerHTML = '= ' + esc(M.fmt(z)) + (ex && ex !== M.fmt(z) ? ' <span class="cr-ex">= ' + esc(ex) + '</span>' : '');
      out.className = 'cr'; out.setAttribute('data-val', M.fmt(z));
    } catch (e) { out.textContent = ''; out.className = 'cr'; }
  }
  function executer() {
    var c = etat(), inp = U.$('#ce', racineEl), out = U.$('#cr', racineEl);
    var v = inp.value.trim();
    if (!v) return;
    try {
      var r = calculer(v), z = r.z;
      for (var k in r.vars) c.vars[k] = { re: r.vars[k].re, im: r.vars[k].im };
      c.vars.Ans = { re: z.re, im: z.im };
      var ex = M.formeExacte(z);
      c.hist.push({ e: v, r: M.fmt(z), x: ex && ex !== M.fmt(z) ? ex : null });
      if (c.hist.length > 200) c.hist.shift();
      c.saisie = ''; sauver();
      vCalcul(U.$('#calc-corps', racineEl));
    } catch (e) {
      out.textContent = e.message || 'Erreur de syntaxe';
      out.className = 'cr cr-err';
    }
  }
  function menu(type, garder) {
    var c = etat(), m = U.$('#cmenu', racineEl);
    if (!garder && !m.hidden && m.getAttribute('data-type') === type) { m.hidden = true; return; }
    m.setAttribute('data-type', type);
    var h = '';
    if (type === 'fonctions') {
      h = CATALOGUE.map(function (g) {
        return '<div class="cm-g"><b>' + esc(g[0]) + '</b><div class="cm-l">' + g[1].map(function (f) {
          /* fonctions : on insère « nom( » ; exemples d'analyse et rand() : tels quels */
          var ins = /^(deriv|integ|somme|produit|resoudre)\(|\(\)$|^i$/.test(f[0]) ? f[0] : f[0].slice(0, f[0].indexOf('(') + 1) || f[0];
          return '<button type="button" class="cm-i" data-ins="' + esc(ins) + '"><code>' + esc(f[0]) + '</code><span>' + esc(f[1]) + '</span></button>';
        }).join('') + '</div></div>';
      }).join('');
    } else if (type === 'constantes') {
      h = '<div class="cm-l">' + CONSTS.map(function (k) { return '<button type="button" class="cm-i" data-ins="' + esc(k[1]) + '"><code>' + esc(k[0]) + '</code><span>' + esc(k[2]) + '</span></button>'; }).join('') + '</div>';
    } else {
      var noms = Object.keys(c.vars);
      h = noms.length ? '<div class="cm-l">' + noms.map(function (n) {
        var v = c.vars[n];
        return '<div class="cm-v"><button type="button" class="cm-i" data-ins="' + esc(n) + '"><code>' + esc(n) + '</code><span>' + esc(M.fmt(M.C(v.re, v.im))) + '</span></button>' + (n === 'Ans' ? '' : '<button type="button" class="cb" data-delvar="' + esc(n) + '" aria-label="Supprimer ' + esc(n) + '">×</button>') + '</div>';
      }).join('') + '</div>' : '<p class="small muted" style="margin:0">Aucune variable. Crée-en une en tapant par exemple <b>a = 5</b> puis EXE, ou avec 2nde + STO.</p>';
    }
    m.innerHTML = h; m.hidden = false;
  }
  function copier(txt) {
    if (!txt) return;
    var t = String(txt).replace(/^= /, '');
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { toast('Copié : ' + t); }, function () { toast(t); });
    else toast(t);
  }

  /* ============================================================
     2. GRAPHIQUE
     ============================================================ */
  var gEtat = null;
  function vGraphe(corps) {
    var c = etat(), g = c.graph;
    corps.innerHTML =
      '<div class="gf" id="gf"></div>' +
      '<div class="g-outils"><button type="button" class="cb" id="g-plus">+ Fonction</button>' +
      '<button type="button" class="cb" data-zoom="0.5" aria-label="Zoomer">Zoom +</button><button type="button" class="cb" data-zoom="2" aria-label="Dézoomer">Zoom −</button>' +
      '<button type="button" class="cb" id="g-std">Standard</button><button type="button" class="cb" id="g-auto">Ajuster</button><button type="button" class="cb" id="g-trig">Trigo</button></div>' +
      '<div class="g-cadre"><canvas id="gc" aria-label="Représentation graphique des fonctions"></canvas><div class="g-trace" id="gt"></div></div>' +
      '<div class="g-fen">' + ['xmin', 'xmax', 'ymin', 'ymax'].map(function (n, i) { return '<label>' + n + '<input class="input" data-win="' + i + '" value="' + fm(g.win[i]) + '"></label>'; }).join('') + '</div>' +
      '<div class="g-ana"><b>Analyser</b><div class="g-ana-l">' +
      '<select class="input" id="ga-f">' + g.fns.map(function (f, i) { return '<option value="' + i + '">f' + (i + 1) + '</option>'; }).join('') + '</select>' +
      '<button type="button" class="cb" data-ana="zeros">Zéros</button><button type="button" class="cb" data-ana="extr">Extremums</button>' +
      '<button type="button" class="cb" data-ana="inter">Intersections</button>' +
      '<label class="g-mini">x =<input class="input" id="ga-x" value="1"></label><button type="button" class="cb" data-ana="val">f(x) et f′(x)</button>' +
      '<label class="g-mini">∫ de<input class="input" id="ga-a" value="0"></label><label class="g-mini">à<input class="input" id="ga-b" value="1"></label><button type="button" class="cb" data-ana="integ">Aire</button>' +
      '</div><div class="g-res" id="gres" aria-live="polite"></div></div>';
    listeFonctions();
    var cv = U.$('#gc', corps);
    gEtat = { cv: cv, ombre: null, pts: [] };
    dessiner();
    lierCanvas(cv);
    corps.onclick = function (e) {
      if (e.target.closest('#g-plus')) { if (g.fns.length >= 6) { toast('6 fonctions maximum'); return; } g.fns.push({ e: '', on: true }); sauver(); listeFonctions(); var ins = U.$$('#gf input[data-fn]', corps); ins[ins.length - 1].focus(); majSelect(); return; }
      var z = e.target.closest('[data-zoom]'); if (z) { zoom(+z.getAttribute('data-zoom')); return; }
      if (e.target.closest('#g-std')) { g.win = [-10, 10, -7, 7]; fin(); return; }
      if (e.target.closest('#g-trig')) { g.win = [-2 * Math.PI, 2 * Math.PI, -2, 2]; fin(); return; }
      if (e.target.closest('#g-auto')) { ajuster(); return; }
      var ana = e.target.closest('[data-ana]'); if (ana) { analyser(ana.getAttribute('data-ana')); return; }
      var del = e.target.closest('[data-delfn]'); if (del) { g.fns.splice(+del.getAttribute('data-delfn'), 1); gEtat.ombre = null; sauver(); listeFonctions(); majSelect(); dessiner(); return; }
      var vis = e.target.closest('[data-visfn]'); if (vis) { var f = g.fns[+vis.getAttribute('data-visfn')]; f.on = !f.on; sauver(); listeFonctions(); dessiner(); return; }
    };
    corps.oninput = function (e) {
      var fi = e.target.closest('[data-fn]');
      if (fi) { g.fns[+fi.getAttribute('data-fn')].e = fi.value; sauver(); dessiner(); return; }
    };
    corps.onchange = function (e) {
      var w = e.target.closest('[data-win]');
      if (w) { var v = num(w.value); if (!isNaN(v)) { g.win[+w.getAttribute('data-win')] = v; if (g.win[0] < g.win[1] && g.win[2] < g.win[3]) { sauver(); dessiner(); } } }
    };
    function fin() { sauver(); majFen(); dessiner(); }
    function majSelect() { U.$('#ga-f', corps).innerHTML = g.fns.map(function (f, i) { return '<option value="' + i + '">f' + (i + 1) + '</option>'; }).join(''); }
    if (gEtat.resize) window.removeEventListener('resize', gEtat.resize);
    gEtat.resize = function () { if (document.body.contains(cv)) dessiner(); };
    window.addEventListener('resize', gEtat.resize);
  }
  function listeFonctions() {
    var g = etat().graph, el = U.$('#gf', racineEl);
    el.innerHTML = g.fns.map(function (f, i) {
      return '<div class="gf-l"><button type="button" class="gf-pastille' + (f.on ? '' : ' off') + '" data-visfn="' + i + '" style="--fc:' + COULEURS[i] + '" aria-label="Afficher ou masquer f' + (i + 1) + '" aria-pressed="' + f.on + '"></button>' +
        '<label for="gfi' + i + '">f<sub>' + (i + 1) + '</sub>(x) =</label><input class="input" id="gfi' + i + '" data-fn="' + i + '" value="' + esc(f.e) + '" placeholder="ex. 2x^2 - 3x + 1" spellcheck="false" autocomplete="off">' +
        '<button type="button" class="cb" data-delfn="' + i + '" aria-label="Supprimer f' + (i + 1) + '">×</button></div>';
    }).join('');
  }
  function majFen() {
    var g = etat().graph;
    U.$$('[data-win]', racineEl).forEach(function (w) { w.value = fm(g.win[+w.getAttribute('data-win')]); });
  }
  function fonctions() {
    var c = etat();
    M.regler({ angle: 'rad', vars: varsCplx() });
    return c.graph.fns.map(function (f) {
      if (!f.e.trim()) return null;
      try { M.parser(f.e); } catch (e) { return null; }
      return M.fonctionDe(f.e, 'x');
    });
  }
  function varsCplx() { var c = etat(), v = {}; for (var k in c.vars) v[k] = M.C(c.vars[k].re, c.vars[k].im); return v; }
  function couleursTheme() {
    var cs = getComputedStyle(document.documentElement);
    return { fond: cs.getPropertyValue('--surface').trim() || '#fff', ink: cs.getPropertyValue('--ink').trim() || '#000', ligne: cs.getPropertyValue('--line').trim() || '#ddd', ink2: cs.getPropertyValue('--ink-2').trim() || '#666' };
  }
  function pasGrille(etendue) {
    var brut = etendue / 8, p = Math.pow(10, Math.floor(Math.log10(brut))), n = brut / p;
    return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * p;
  }
  function dessiner() {
    if (!gEtat) return;
    var cv = gEtat.cv, g = etat().graph, W = g.win;
    var dpr = window.devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return;
    cv.width = w * dpr; cv.height = h * dpr;
    var x = cv.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0);
    var col = couleursTheme();
    var X = function (v) { return (v - W[0]) / (W[1] - W[0]) * w; }, Y = function (v) { return h - (v - W[2]) / (W[3] - W[2]) * h; };
    x.fillStyle = col.fond; x.fillRect(0, 0, w, h);
    /* grille */
    var sx = pasGrille(W[1] - W[0]), sy = pasGrille(W[3] - W[2]);
    x.strokeStyle = col.ligne; x.lineWidth = 1; x.beginPath();
    for (var gx = Math.ceil(W[0] / sx) * sx; gx <= W[1]; gx += sx) { x.moveTo(Math.round(X(gx)) + 0.5, 0); x.lineTo(Math.round(X(gx)) + 0.5, h); }
    for (var gy = Math.ceil(W[2] / sy) * sy; gy <= W[3]; gy += sy) { x.moveTo(0, Math.round(Y(gy)) + 0.5); x.lineTo(w, Math.round(Y(gy)) + 0.5); }
    x.stroke();
    /* axes */
    x.strokeStyle = col.ink2; x.lineWidth = 1.4; x.beginPath();
    if (W[2] <= 0 && W[3] >= 0) { x.moveTo(0, Y(0)); x.lineTo(w, Y(0)); }
    if (W[0] <= 0 && W[1] >= 0) { x.moveTo(X(0), 0); x.lineTo(X(0), h); }
    x.stroke();
    /* graduations */
    x.fillStyle = col.ink2; x.font = '11px Geist, system-ui, sans-serif';
    var ay = Math.min(Math.max(Y(0), 12), h - 4), ax = Math.min(Math.max(X(0), 4), w - 30);
    x.textAlign = 'center';
    for (gx = Math.ceil(W[0] / sx) * sx; gx <= W[1]; gx += sx) if (Math.abs(gx) > sx / 2) x.fillText(fm(+gx.toPrecision(10)), X(gx), ay + (ay > h - 16 ? -6 : 14));
    x.textAlign = 'left';
    for (gy = Math.ceil(W[2] / sy) * sy; gy <= W[3]; gy += sy) if (Math.abs(gy) > sy / 2) x.fillText(fm(+gy.toPrecision(10)), ax + 4, Y(gy) - 3);
    /* aire ombrée */
    var fs = fonctions();
    if (gEtat.ombre && fs[gEtat.ombre.i]) {
      var o = gEtat.ombre, fo = fs[o.i];
      x.fillStyle = COULEURS[o.i] + '33'; x.beginPath(); x.moveTo(X(o.a), Y(0));
      for (var k = 0; k <= 200; k++) { var xv = o.a + (o.b - o.a) * k / 200, yv = fo(xv); if (isFinite(yv)) x.lineTo(X(xv), Y(yv)); }
      x.lineTo(X(o.b), Y(0)); x.closePath(); x.fill();
    }
    /* courbes */
    fs.forEach(function (f, i) {
      if (!f || !g.fns[i].on) return;
      x.strokeStyle = COULEURS[i]; x.lineWidth = 2.2; x.beginPath();
      var debut = true, prevY = null, n = Math.max(400, w * 2);
      for (var k2 = 0; k2 <= n; k2++) {
        var xv2 = W[0] + (W[1] - W[0]) * k2 / n, yv2 = f(xv2);
        if (!isFinite(yv2) || (prevY != null && Math.abs(Y(yv2) - Y(prevY)) > h * 2)) { debut = true; prevY = isFinite(yv2) ? yv2 : null; continue; }
        var py = Math.max(-h, Math.min(2 * h, Y(yv2)));
        if (debut) { x.moveTo(X(xv2), py); debut = false; } else x.lineTo(X(xv2), py);
        prevY = yv2;
      }
      x.stroke();
    });
    /* points marqués par l'analyse */
    gEtat.pts.forEach(function (p) {
      x.fillStyle = p.c || col.ink; x.beginPath(); x.arc(X(p.x), Y(p.y), 4.5, 0, 2 * Math.PI); x.fill();
    });
    gEtat.X = X; gEtat.Y = Y; gEtat.w = w; gEtat.h = h;
  }
  function zoom(f, cx, cy) {
    var g = etat().graph, W = g.win;
    cx = cx != null ? cx : (W[0] + W[1]) / 2; cy = cy != null ? cy : (W[2] + W[3]) / 2;
    g.win = [cx - (cx - W[0]) * f, cx + (W[1] - cx) * f, cy - (cy - W[2]) * f, cy + (W[3] - cy) * f];
    sauver(); majFen(); dessiner();
  }
  function ajuster() {
    var g = etat().graph, fs = fonctions(), lo = Infinity, hi = -Infinity;
    fs.forEach(function (f, i) {
      if (!f || !g.fns[i].on) return;
      for (var k = 0; k <= 400; k++) { var y = f(g.win[0] + (g.win[1] - g.win[0]) * k / 400); if (isFinite(y) && Math.abs(y) < 1e6) { lo = Math.min(lo, y); hi = Math.max(hi, y); } }
    });
    if (!isFinite(lo)) return;
    if (hi - lo < 1e-9) { lo -= 1; hi += 1; }
    var m = (hi - lo) * 0.1; g.win[2] = lo - m; g.win[3] = hi + m;
    sauver(); majFen(); dessiner();
  }
  function lierCanvas(cv) {
    var g = etat().graph, drag = null, pinch = null;
    function coord(e) { var r = cv.getBoundingClientRect(); return { px: e.clientX - r.left, py: e.clientY - r.top }; }
    function versMonde(p) { var W = g.win; return { x: W[0] + p.px / gEtat.w * (W[1] - W[0]), y: W[3] - p.py / gEtat.h * (W[3] - W[2]) }; }
    cv.addEventListener('pointerdown', function (e) { drag = { p: coord(e), win: g.win.slice() }; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', function (e) {
      var p = coord(e);
      if (drag && !pinch) {
        var W = drag.win, dx = (p.px - drag.p.px) / gEtat.w * (W[1] - W[0]), dy = (p.py - drag.p.py) / gEtat.h * (W[3] - W[2]);
        g.win = [W[0] - dx, W[1] - dx, W[2] + dy, W[3] + dy]; majFen(); dessiner();
      }
      trace(versMonde(p), p);
    });
    cv.addEventListener('pointerup', function () { if (drag) { drag = null; sauver(); } });
    cv.addEventListener('pointerleave', function () { U.$('#gt', racineEl).textContent = ''; });
    cv.addEventListener('wheel', function (e) { e.preventDefault(); var m = versMonde(coord(e)); zoom(e.deltaY > 0 ? 1.15 : 1 / 1.15, m.x, m.y); }, { passive: false });
    cv.addEventListener('touchstart', function (e) { if (e.touches.length === 2) { pinch = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); } }, { passive: true });
    cv.addEventListener('touchmove', function (e) {
      if (e.touches.length === 2 && pinch) {
        var d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        zoom(pinch / d); pinch = d;
      }
    }, { passive: true });
    cv.addEventListener('touchend', function () { pinch = null; });
  }
  function trace(m) {
    var g = etat().graph, fs = fonctions(), best = null;
    fs.forEach(function (f, i) {
      if (!f || !g.fns[i].on) return;
      var y = f(m.x); if (!isFinite(y)) return;
      var d = Math.abs(gEtat.Y(y) - gEtat.Y(m.y));
      if (!best || d < best.d) best = { i: i, y: y, d: d };
    });
    var t = U.$('#gt', racineEl);
    t.innerHTML = 'x = ' + esc(fm(m.x)) + (best && best.d < 40 ? ' · <span style="color:' + COULEURS[best.i] + '">f' + (best.i + 1) + '(x) = ' + esc(fm(best.y)) + '</span>' : ' · y = ' + esc(fm(m.y)));
  }
  function analyser(type) {
    var g = etat().graph, fs = fonctions(), i = +U.$('#ga-f', racineEl).value, f = fs[i], res = U.$('#gres', racineEl);
    gEtat.pts = []; gEtat.ombre = null;
    if (!f) { res.textContent = 'La fonction f' + (i + 1) + ' est vide ou invalide.'; dessiner(); return; }
    var W = g.win, lignes = [];
    try {
      if (type === 'zeros') {
        var z = M.racinesIntervalle(f, W[0], W[1]).map(function (x) { return Math.abs(x) < 1e-9 * (W[1] - W[0]) ? 0 : x; });
        z.forEach(function (x) { gEtat.pts.push({ x: x, y: 0, c: COULEURS[i] }); });
        lignes.push(z.length ? 'Zéros de f' + (i + 1) + ' dans la fenêtre : x ≈ ' + z.map(fm).join(' ; ') : 'Aucun zéro dans la fenêtre affichée.');
      } else if (type === 'extr') {
        var d = function (x) { return M.derivee(f, x); };
        var e = M.racinesIntervalle(d, W[0], W[1], 1500).map(function (x) { return Math.abs(x) < 1e-7 * (W[1] - W[0]) ? 0 : x; });
        e.forEach(function (x) {
          var y = f(x), d2 = M.derivee(d, x);
          if (!isFinite(y)) return;
          gEtat.pts.push({ x: x, y: y, c: COULEURS[i] });
          lignes.push((d2 < 0 ? 'Maximum local' : d2 > 0 ? 'Minimum local' : 'Point critique') + ' en x ≈ ' + fm(x) + ' : f(x) ≈ ' + fm(y));
        });
        if (!lignes.length) lignes.push('Aucun extremum local dans la fenêtre.');
      } else if (type === 'inter') {
        fs.forEach(function (h, j) {
          if (j === i || !h) return;
          var r = M.racinesIntervalle(function (x) { return f(x) - h(x); }, W[0], W[1]);
          r.forEach(function (x) { gEtat.pts.push({ x: x, y: f(x) }); });
          lignes.push('f' + (i + 1) + ' ∩ f' + (j + 1) + ' : ' + (r.length ? r.map(function (x) { return '(' + fm(x) + ' ; ' + fm(f(x)) + ')'; }).join(', ') : 'aucune intersection visible'));
        });
        if (!lignes.length) lignes.push('Ajoute une deuxième fonction pour chercher les intersections.');
      } else if (type === 'val') {
        var x0 = num(U.$('#ga-x', racineEl).value);
        if (isNaN(x0)) throw new Error('Valeur de x invalide');
        var y0 = f(x0), dy = M.derivee(f, x0);
        gEtat.pts.push({ x: x0, y: y0, c: COULEURS[i] });
        lignes.push('f' + (i + 1) + '(' + fm(x0) + ') = ' + fm(y0));
        lignes.push('f′(' + fm(x0) + ') ≈ ' + fm(dy) + '  —  tangente : y = ' + fm(dy) + '(x − ' + fm(x0) + ') + ' + fm(y0));
      } else if (type === 'integ') {
        var a = num(U.$('#ga-a', racineEl).value), b = num(U.$('#ga-b', racineEl).value);
        if (isNaN(a) || isNaN(b)) throw new Error('Bornes invalides');
        var I0 = M.integrale(f, a, b);
        gEtat.ombre = { i: i, a: Math.min(a, b), b: Math.max(a, b) };
        lignes.push('∫ de ' + fm(a) + ' à ' + fm(b) + ' de f' + (i + 1) + '(x) dx ≈ ' + fm(I0) + (M.formeExacte(M.C(I0)) ? ' (= ' + M.formeExacte(M.C(I0)) + ' ?)' : ''));
      }
    } catch (er) { lignes = [er.message]; }
    res.innerHTML = lignes.map(function (l) { return '<div>' + esc(l) + '</div>'; }).join('');
    dessiner();
  }

  /* ============================================================
     3. ÉQUATIONS
     ============================================================ */
  function sousOnglets(liste, actif, attr) {
    return '<div class="seg" role="tablist">' + liste.map(function (o) { return '<button type="button" class="seg-b" data-' + attr + '="' + o[0] + '" aria-selected="' + (o[0] === actif) + '">' + o[1] + '</button>'; }).join('') + '</div>';
  }
  function vEquations(corps) {
    var c = etat();
    var h = sousOnglets([['poly', 'Polynôme'], ['libre', 'f(x) = g(x)'], ['sys', 'Système']], c.equ, 'equ');
    if (c.equ === 'poly') {
      var deg = c.deg || 2;
      h += '<div class="form-l"><label>Degré <select class="input" id="eq-deg">' + [1, 2, 3, 4, 5, 6].map(function (d) { return '<option' + (d === deg ? ' selected' : '') + '>' + d + '</option>'; }).join('') + '</select></label></div>' +
        '<div class="coefs">' + Array.from({ length: deg + 1 }, function (_, k) {
          var p = deg - k;
          return '<label><span>' + (p === 0 ? 'constante' : 'x' + (p > 1 ? '<sup>' + p + '</sup>' : '')) + '</span><input class="input" data-coef="' + k + '" value="' + esc((c.coefs && c.coefs[deg] && c.coefs[deg][k]) || (k === 0 ? '1' : '0')) + '"></label>';
        }).join('') + '</div>' +
        '<button type="button" class="btn btn-sm" id="eq-go">Résoudre</button><div class="res" id="eq-res" aria-live="polite"></div>';
    } else if (c.equ === 'libre') {
      h += '<div class="form-l"><label class="large">Équation (variable x)<input class="input" id="eq-ex" value="' + esc(c.eqLibre || 'x^3 = 2x + 1') + '" spellcheck="false"></label></div>' +
        '<div class="form-l"><label>Chercher entre<input class="input" id="eq-a" value="' + esc(c.eqA || '-10') + '"></label><label>et<input class="input" id="eq-b" value="' + esc(c.eqB || '10') + '"></label></div>' +
        '<button type="button" class="btn btn-sm" id="eq-go">Résoudre</button><p class="small muted">Utilise les fonctions de la calculatrice (sin, ln, √…). Les angles sont en radians.</p><div class="res" id="eq-res" aria-live="polite"></div>';
    } else {
      var n = c.sysN || 2, lettres = 'xyzt';
      h += '<div class="form-l"><label>Inconnues <select class="input" id="eq-n">' + [2, 3, 4].map(function (d) { return '<option' + (d === n ? ' selected' : '') + '>' + d + '</option>'; }).join('') + '</select></label></div>' +
        '<div class="sys">' + Array.from({ length: n }, function (_, i) {
          return '<div class="sys-l">' + Array.from({ length: n }, function (_, j) { return '<input class="input" data-sa="' + i + '-' + j + '" value="' + (i === j ? 1 : 0) + '" aria-label="coefficient de ' + lettres[j] + ' ligne ' + (i + 1) + '"><span>' + lettres[j] + (j < n - 1 ? ' +' : ' =') + '</span>'; }).join('') + '<input class="input" data-sb="' + i + '" value="' + (i + 1) + '" aria-label="second membre ligne ' + (i + 1) + '"></div>';
        }).join('') + '</div><button type="button" class="btn btn-sm" id="eq-go">Résoudre</button><div class="res" id="eq-res" aria-live="polite"></div>';
    }
    corps.innerHTML = h;
    corps.onclick = function (e) {
      var s = e.target.closest('[data-equ]'); if (s) { c.equ = s.getAttribute('data-equ'); sauver(); vEquations(corps); return; }
      if (e.target.closest('#eq-go')) resoudre();
    };
    corps.onchange = function (e) {
      if (e.target.id === 'eq-deg') { c.deg = +e.target.value; sauver(); vEquations(corps); }
      if (e.target.id === 'eq-n') { c.sysN = +e.target.value; sauver(); vEquations(corps); }
    };
    corps.onkeydown = function (e) { if (e.key === 'Enter' && e.target.tagName === 'INPUT') resoudre(); };
    function resoudre() {
      var out = U.$('#eq-res', corps), L = [];
      try {
        if (c.equ === 'poly') {
          var deg = c.deg || 2, co = U.$$('[data-coef]', corps).map(function (i) { return i.value; });
          c.coefs = c.coefs || {}; c.coefs[deg] = co; sauver();
          var a = co.map(function (v) { var x = evalNum(v); if (isNaN(x)) throw new Error('Coefficient invalide : ' + v); return x; });
          if (a[0] === 0) throw new Error('Le coefficient dominant ne peut pas être nul');
          if (deg === 2) {
            var D = a[1] * a[1] - 4 * a[0] * a[2];
            L.push('Δ = b² − 4ac = ' + fm(D) + (D > 0 ? ' > 0 : deux racines réelles' : D === 0 ? ' : une racine double' : ' < 0 : deux racines complexes conjuguées'));
            var al = -a[1] / (2 * a[0]), be = a[2] - a[1] * a[1] / (4 * a[0]);
            L.push('Forme canonique : ' + coef(a[0]) + '(x ' + (al >= 0 ? '− ' + fm(al) : '+ ' + fm(-al)) + ')² ' + (be >= 0 ? '+ ' + fm(be) : '− ' + fm(-be)) + '  —  sommet S(' + fm(al) + ' ; ' + fm(be) + ')');
          }
          var r = M.racinesPoly(a);
          L.push('<b>Racines</b>');
          r.forEach(function (z, i) { var ex = M.formeExacte(z); L.push('x' + sub(i + 1) + ' = ' + M.fmt(z, 10) + (ex ? '  (= ' + ex + ')' : '')); });
          var reelles = r.filter(function (z) { return M.Cx.estReel(z); });
          if (reelles.length === r.length && deg > 1) L.push('Forme factorisée : ' + coef(a[0]) + reelles.map(function (z) { return '(x ' + (z.re >= 0 ? '− ' + fm(z.re) : '+ ' + fm(-z.re)) + ')'; }).join(''));
        } else if (c.equ === 'libre') {
          var ex = U.$('#eq-ex', corps).value, A = evalNum(U.$('#eq-a', corps).value), B = evalNum(U.$('#eq-b', corps).value);
          c.eqLibre = ex; c.eqA = U.$('#eq-a', corps).value; c.eqB = U.$('#eq-b', corps).value; sauver();
          var cotes = ex.split('=');
          if (cotes.length > 2) throw new Error('Un seul signe = attendu');
          var expr = cotes.length === 2 ? '(' + cotes[0] + ')-(' + cotes[1] + ')' : cotes[0];
          M.regler({ angle: 'rad', vars: varsCplx() }); M.parser(expr);
          var f = M.fonctionDe(expr, 'x');
          if (isNaN(A) || isNaN(B) || A >= B) throw new Error('Intervalle invalide');
          var sols = M.racinesIntervalle(f, A, B, 4000);
          L.push(sols.length ? '<b>' + sols.length + ' solution' + (sols.length > 1 ? 's' : '') + ' dans [' + fm(A) + ' ; ' + fm(B) + ']</b>' : 'Aucune solution trouvée dans cet intervalle.');
          sols.forEach(function (x, i) { var ex2 = M.formeExacte(M.C(x)); L.push('x' + sub(i + 1) + ' ≈ ' + fm(x) + (ex2 ? '  (= ' + ex2 + ' ?)' : '')); });
        } else {
          var n = c.sysN || 2, Am = [], b = [];
          for (var i = 0; i < n; i++) {
            Am.push([]); for (var j = 0; j < n; j++) { var v = evalNum(U.$('[data-sa="' + i + '-' + j + '"]', corps).value); if (isNaN(v)) throw new Error('Coefficient invalide'); Am[i].push(v); }
            var bv = evalNum(U.$('[data-sb="' + i + '"]', corps).value); if (isNaN(bv)) throw new Error('Second membre invalide'); b.push(bv);
          }
          var sol = M.Mat.systeme(Am, b);
          if (sol.type === 'aucune') L.push('Le système n\'a <b>aucune solution</b> (équations incompatibles).');
          else if (sol.type === 'infinite') L.push('Le système a <b>une infinité de solutions</b> (équations liées).');
          else { L.push('<b>Solution unique</b>  —  déterminant = ' + fm(M.Mat.det(Am))); sol.x.forEach(function (v, i) { var fr = M.fraction(v, 10000); L.push('xyzt'[i] + ' = ' + fm(v) + (fr && fr.d !== 1 ? '  (= ' + M.fracTexte(fr) + ')' : '')); }); }
        }
      } catch (er) { L = ['<span class="err">' + esc(er.message) + '</span>']; }
      out.innerHTML = L.map(function (l) { return '<div>' + l + '</div>'; }).join('');
    }
  }
  function coef(a) { return a === 1 ? '' : a === -1 ? '−' : fm(a); }
  function sub(n) { return String(n).replace(/\d/g, function (d) { return '₀₁₂₃₄₅₆₇₈₉'[d]; }); }
  function evalNum(s) {
    s = String(s).trim(); if (!s) return NaN;
    try { var c = etat(); var z = M.calculer(s, { angle: c.angle, vars: varsCplx() }); return z.re; } catch (e) { return NaN; }
  }

  /* ============================================================
     4. STATISTIQUES & PROBABILITÉS
     ============================================================ */
  function liste(s) { return String(s).split(/[;\s\n]+/).filter(Boolean).map(function (v) { return evalNum(v); }); }
  function vStats(corps) {
    var c = etat(), sd = c.statData || {};
    var h = sousOnglets([['une', '1 variable'], ['deux', '2 variables'], ['lois', 'Lois de probabilité']], c.stat, 'stat');
    if (c.stat === 'une') {
      h += '<div class="form-l"><label class="large">Valeurs (séparées par ; ou espaces)<textarea class="input" id="st-v" rows="3">' + esc(sd.v || '12 15 9 14 11 15 8 17') + '</textarea></label></div>' +
        '<div class="form-l"><label class="large">Effectifs (facultatif, même ordre)<input class="input" id="st-n" value="' + esc(sd.n || '') + '"></label></div>' +
        '<button type="button" class="btn btn-sm" id="st-go">Calculer</button><div class="res" id="st-res"></div>';
    } else if (c.stat === 'deux') {
      h += '<div class="form-l"><label class="large">x<input class="input" id="st-x" value="' + esc(sd.x || '1 2 3 4 5') + '"></label></div>' +
        '<div class="form-l"><label class="large">y<input class="input" id="st-y" value="' + esc(sd.y || '2,1 3,9 6,2 7,8 10,1') + '"></label></div>' +
        '<div class="form-l"><label>Prévoir y pour x =<input class="input" id="st-p" value="' + esc(sd.p || '6') + '"></label></div>' +
        '<button type="button" class="btn btn-sm" id="st-go">Régression linéaire</button><div class="res" id="st-res"></div>';
    } else {
      var loi = sd.loi || 'binom';
      h += '<div class="form-l"><label>Loi <select class="input" id="st-loi">' + [['binom', 'Binomiale B(n ; p)'], ['norm', 'Normale N(μ ; σ)'], ['poisson', 'Poisson P(λ)'], ['geo', 'Géométrique G(p)'], ['unif', 'Uniforme U([a ; b])']].map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === loi ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></label></div>';
      var champs = { binom: [['n', 10], ['p', 0.3], ['k', 3]], norm: [['μ', 0], ['σ', 1], ['a', -1.96], ['b', 1.96]], poisson: [['λ', 2], ['k', 3]], geo: [['p', 0.2], ['k', 3]], unif: [['a', 0], ['b', 10], ['c', 2], ['d', 5]] }[loi];
      h += '<div class="form-l">' + champs.map(function (ch, i) { return '<label>' + ch[0] + '<input class="input" data-loi="' + i + '" value="' + esc((sd['l_' + loi] && sd['l_' + loi][i]) != null ? sd['l_' + loi][i] : String(ch[1]).replace('.', ',')) + '"></label>'; }).join('') + '</div>' +
        '<button type="button" class="btn btn-sm" id="st-go">Calculer</button><div class="res" id="st-res"></div>';
    }
    corps.innerHTML = h;
    corps.onclick = function (e) {
      var s = e.target.closest('[data-stat]'); if (s) { c.stat = s.getAttribute('data-stat'); sauver(); vStats(corps); return; }
      if (e.target.closest('#st-go')) go();
    };
    corps.onchange = function (e) { if (e.target.id === 'st-loi') { sd.loi = e.target.value; c.statData = sd; sauver(); vStats(corps); } };
    function ligne(lib, val) { return '<tr><th>' + lib + '</th><td>' + val + '</td></tr>'; }
    function go() {
      var out = U.$('#st-res', corps), H = '';
      try {
        if (c.stat === 'une') {
          sd.v = U.$('#st-v', corps).value; sd.n = U.$('#st-n', corps).value;
          var v = liste(sd.v), n = sd.n.trim() ? liste(sd.n) : null;
          if (v.some(isNaN)) throw new Error('Une valeur n\'est pas un nombre');
          if (n && (n.length !== v.length || n.some(function (x) { return isNaN(x) || x < 0 || x % 1; }))) throw new Error('Les effectifs doivent être des entiers, autant que de valeurs');
          var S = M.stats(v, n);
          H = '<table class="t-res">' + ligne('Effectif total', S.n) + ligne('Somme', fm(S.somme)) + ligne('Moyenne x̄', fm(S.moyenne)) + ligne('Médiane', fm(S.mediane)) +
            ligne('Q1 / Q3', fm(S.q1) + ' / ' + fm(S.q3)) + ligne('Écart interquartile', fm(S.q3 - S.q1)) + ligne('Min / Max', fm(S.min) + ' / ' + fm(S.max)) + ligne('Étendue', fm(S.etendue)) +
            ligne('Variance V', fm(S.variance)) + ligne('Écart type σ', fm(S.ecartType)) + ligne('Écart type échantillon s', isNaN(S.ecartTypeEch) ? '—' : fm(S.ecartTypeEch)) + ligne('Mode(s)', S.modes.length ? S.modes.map(fm).join(' ; ') : 'aucun') + '</table>' +
            boite(S);
        } else if (c.stat === 'deux') {
          sd.x = U.$('#st-x', corps).value; sd.y = U.$('#st-y', corps).value; sd.p = U.$('#st-p', corps).value;
          var xs = liste(sd.x), ys = liste(sd.y);
          if (xs.some(isNaN) || ys.some(isNaN)) throw new Error('Une valeur n\'est pas un nombre');
          var r = M.regression(xs, ys), xp = evalNum(sd.p);
          H = '<table class="t-res">' + ligne('Droite des moindres carrés', 'y = ' + fm(r.a) + 'x ' + (r.b >= 0 ? '+ ' + fm(r.b) : '− ' + fm(-r.b))) + ligne('Point moyen G', '(' + fm(r.mx) + ' ; ' + fm(r.my) + ')') +
            ligne('Coefficient de corrélation r', fm(r.r)) + ligne('r²', fm(r.r * r.r)) + (isNaN(xp) ? '' : ligne('Prévision pour x = ' + fm(xp), 'y ≈ ' + fm(r.a * xp + r.b))) + '</table>' + nuage(xs, ys, r);
        } else {
          var loi = sd.loi || 'binom', p = U.$$('[data-loi]', corps).map(function (i) { return i.value; });
          sd['l_' + loi] = p;
          var P = p.map(evalNum);
          if (P.some(isNaN)) throw new Error('Paramètre invalide');
          if (loi === 'binom') {
            var N = Math.round(P[0]), q = P[1], k = Math.round(P[2]);
            if (q < 0 || q > 1) throw new Error('p doit être entre 0 et 1');
            var pk = function (j) { return M.comb(N, j) * Math.pow(q, j) * Math.pow(1 - q, N - j); }, cum = 0;
            for (var j = 0; j <= k; j++) cum += pk(j);
            H = '<table class="t-res">' + ligne('P(X = ' + k + ')', fm(pk(k))) + ligne('P(X ≤ ' + k + ')', fm(Math.min(1, cum))) + ligne('P(X ≥ ' + k + ')', fm(Math.max(0, 1 - cum + pk(k)))) + ligne('P(X > ' + k + ')', fm(Math.max(0, 1 - cum))) +
              ligne('Espérance np', fm(N * q)) + ligne('Variance np(1−p)', fm(N * q * (1 - q))) + ligne('Écart type', fm(Math.sqrt(N * q * (1 - q)))) + '</table>' + barres(N, pk, k);
          } else if (loi === 'norm') {
            var mu = P[0], sg = P[1], a = P[2], b = P[3];
            if (sg <= 0) throw new Error('σ doit être strictement positif');
            var F = function (x) { return M.phiNormale((x - mu) / sg); };
            H = '<table class="t-res">' + ligne('P(' + fm(a) + ' ≤ X ≤ ' + fm(b) + ')', fm(F(b) - F(a))) + ligne('P(X ≤ ' + fm(a) + ')', fm(F(a))) + ligne('P(X ≥ ' + fm(b) + ')', fm(1 - F(b))) +
              ligne('Intervalle à 95 %', '[' + fm(mu - 1.96 * sg) + ' ; ' + fm(mu + 1.96 * sg) + ']') + '</table>';
          } else if (loi === 'poisson') {
            var l = P[0], kk = Math.round(P[1]), pp = function (j) { var f = 1; for (var t = 2; t <= j; t++) f *= t; return Math.exp(-l) * Math.pow(l, j) / f; }, cc = 0;
            for (var j2 = 0; j2 <= kk; j2++) cc += pp(j2);
            H = '<table class="t-res">' + ligne('P(X = ' + kk + ')', fm(pp(kk))) + ligne('P(X ≤ ' + kk + ')', fm(cc)) + ligne('Espérance = variance', fm(l)) + '</table>';
          } else if (loi === 'geo') {
            var g = P[0], kg = Math.round(P[1]);
            H = '<table class="t-res">' + ligne('P(X = ' + kg + ')', fm(Math.pow(1 - g, kg - 1) * g)) + ligne('P(X ≤ ' + kg + ')', fm(1 - Math.pow(1 - g, kg))) + ligne('P(X > ' + kg + ')', fm(Math.pow(1 - g, kg))) + ligne('Espérance 1/p', fm(1 / g)) + ligne('Variance (1−p)/p²', fm((1 - g) / (g * g))) + '</table>';
          } else {
            var ua = P[0], ub = P[1], c1 = Math.max(P[2], ua), d1 = Math.min(P[3], ub);
            if (ub <= ua) throw new Error('Il faut a < b');
            H = '<table class="t-res">' + ligne('P(' + fm(P[2]) + ' ≤ X ≤ ' + fm(P[3]) + ')', fm(Math.max(0, d1 - c1) / (ub - ua))) + ligne('Espérance', fm((ua + ub) / 2)) + ligne('Variance', fm((ub - ua) * (ub - ua) / 12)) + '</table>';
          }
        }
        c.statData = sd; sauver();
      } catch (er) { H = '<span class="err">' + esc(er.message) + '</span>'; }
      out.innerHTML = H;
    }
  }
  function boite(S) {
    var w = 300, lo = S.min, hi = S.max, X = function (v) { return hi === lo ? w / 2 : 10 + (v - lo) / (hi - lo) * (w - 20); };
    return '<svg class="g-svg" viewBox="0 0 ' + w + ' 60" role="img" aria-label="Diagramme en boîte"><g fill="none" stroke="currentColor" stroke-width="1.6">' +
      '<path d="M' + X(S.min) + ' 30H' + X(S.q1) + 'M' + X(S.q3) + ' 30H' + X(S.max) + 'M' + X(S.min) + ' 22v16M' + X(S.max) + ' 22v16"/>' +
      '<rect x="' + X(S.q1) + '" y="14" width="' + Math.max(1, X(S.q3) - X(S.q1)) + '" height="32" fill="currentColor" fill-opacity=".1"/><path d="M' + X(S.mediane) + ' 14v32" stroke-width="2.6"/></g>' +
      '<g font-size="10" fill="currentColor" text-anchor="middle"><text x="' + X(S.min) + '" y="58">' + fm(S.min) + '</text><text x="' + X(S.mediane) + '" y="10">Me ' + fm(S.mediane) + '</text><text x="' + X(S.max) + '" y="58">' + fm(S.max) + '</text></g></svg>';
  }
  function nuage(xs, ys, r) {
    var w = 300, h = 170, x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var X = function (v) { return 14 + (v - x0) / ((x1 - x0) || 1) * (w - 28); }, Y = function (v) { return h - 14 - (v - y0) / ((y1 - y0) || 1) * (h - 28); };
    return '<svg class="g-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Nuage de points et droite de régression"><path d="M' + X(x0) + ' ' + Y(r.a * x0 + r.b) + 'L' + X(x1) + ' ' + Y(r.a * x1 + r.b) + '" stroke="#dc2626" stroke-width="2"/>' +
      xs.map(function (x, i) { return '<circle cx="' + X(x) + '" cy="' + Y(ys[i]) + '" r="4" fill="currentColor"/>'; }).join('') + '</svg>';
  }
  function barres(N, pk, k) {
    if (N > 60) return '';
    var w = 300, h = 120, bw = (w - 10) / (N + 1), mx = 0;
    for (var j = 0; j <= N; j++) mx = Math.max(mx, pk(j));
    var s = '';
    for (var j2 = 0; j2 <= N; j2++) { var bh = pk(j2) / mx * (h - 20); s += '<rect x="' + (5 + j2 * bw) + '" y="' + (h - 12 - bh) + '" width="' + Math.max(1, bw - 2) + '" height="' + bh + '" fill="currentColor" fill-opacity="' + (j2 === k ? 0.85 : 0.25) + '"/>'; }
    return '<svg class="g-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Diagramme de la loi binomiale">' + s + '<text x="' + (5 + k * bw + bw / 2) + '" y="' + (h - 1) + '" font-size="10" fill="currentColor" text-anchor="middle">k = ' + k + '</text></svg>';
  }

  /* ============================================================
     5. MATRICES
     ============================================================ */
  function vMatrices(corps) {
    var c = etat();
    c.mat = c.mat || { A: { l: 2, c: 2, v: [['1', '2'], ['3', '4']] }, B: { l: 2, c: 2, v: [['0', '1'], ['1', '0']] } };
    function grille(nom) {
      var m = c.mat[nom];
      return '<div class="mat"><div class="mat-h"><b>' + nom + '</b><select class="input" data-dim="' + nom + '-l" aria-label="lignes de ' + nom + '">' + [1, 2, 3, 4, 5].map(function (n) { return '<option' + (n === m.l ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select> × <select class="input" data-dim="' + nom + '-c" aria-label="colonnes de ' + nom + '">' + [1, 2, 3, 4, 5].map(function (n) { return '<option' + (n === m.c ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></div>' +
        '<div class="mat-g" style="grid-template-columns:repeat(' + m.c + ',minmax(0,1fr))">' + Array.from({ length: m.l }, function (_, i) { return Array.from({ length: m.c }, function (_, j) { return '<input class="input" data-m="' + nom + '-' + i + '-' + j + '" value="' + esc((m.v[i] && m.v[i][j]) != null ? m.v[i][j] : '0') + '" aria-label="' + nom + ' ligne ' + (i + 1) + ' colonne ' + (j + 1) + '">'; }).join(''); }).join('') + '</div></div>';
    }
    corps.innerHTML = '<div class="mats">' + grille('A') + grille('B') + '</div>' +
      '<div class="mat-ops">' + [['A+B', 'add'], ['A−B', 'sub'], ['A×B', 'mul'], ['B×A', 'mulBA'], ['k·A', 'scal'], ['det A', 'det'], ['A⁻¹', 'inv'], ['Aᵀ', 'tr'], ['Aⁿ', 'pow'], ['rang A', 'rang'], ['trace A', 'trace'], ['A ⇄ B', 'swap']].map(function (o) { return '<button type="button" class="cb" data-op="' + o[1] + '">' + o[0] + '</button>'; }).join('') +
      '<label class="g-mini">k / n =<input class="input" id="mat-k" value="' + esc(c.matK || '2') + '"></label></div>' +
      '<div class="res" id="mat-res" aria-live="polite"></div>';
    corps.oninput = function (e) {
      var m = e.target.getAttribute('data-m'); if (!m) return;
      var p = m.split('-'), M0 = c.mat[p[0]]; M0.v[+p[1]] = M0.v[+p[1]] || []; M0.v[+p[1]][+p[2]] = e.target.value; sauver();
    };
    corps.onchange = function (e) {
      var d = e.target.getAttribute('data-dim'); if (!d) { if (e.target.id === 'mat-k') { c.matK = e.target.value; sauver(); } return; }
      var p = d.split('-'); c.mat[p[0]][p[1]] = +e.target.value; sauver(); vMatrices(corps);
    };
    corps.onclick = function (e) {
      var b = e.target.closest('[data-op]'); if (!b) { var cp = e.target.closest('[data-copie]'); if (cp && corps._dernier) { var R0 = corps._dernier; c.mat[cp.getAttribute('data-copie')] = { l: R0.length, c: R0[0].length, v: R0.map(function (l) { return l.map(function (x) { return fmFrac(x); }); }) }; sauver(); vMatrices(corps); } return; }
      var op = b.getAttribute('data-op'), out = U.$('#mat-res', corps);
      if (op === 'swap') { var t = c.mat.A; c.mat.A = c.mat.B; c.mat.B = t; sauver(); vMatrices(corps); return; }
      try {
        var A = lire('A'), B = lire('B'), k = evalNum(U.$('#mat-k', corps).value), R0, txt = null;
        if (op === 'add') R0 = M.Mat.add(A, B); else if (op === 'sub') R0 = M.Mat.add(A, B, -1);
        else if (op === 'mul') R0 = M.Mat.mul(A, B); else if (op === 'mulBA') R0 = M.Mat.mul(B, A);
        else if (op === 'scal') { if (isNaN(k)) throw new Error('k invalide'); R0 = M.Mat.scal(A, k); }
        else if (op === 'det') txt = 'det A = ' + fmFrac(M.Mat.det(A));
        else if (op === 'inv') R0 = M.Mat.inv(A); else if (op === 'tr') R0 = M.Mat.tr(A);
        else if (op === 'pow') { if (isNaN(k) || k % 1) throw new Error('n doit être un entier'); R0 = M.Mat.puiss(A, k); }
        else if (op === 'rang') txt = 'rang A = ' + M.Mat.rang(A);
        else if (op === 'trace') txt = 'trace A = ' + fmFrac(M.Mat.trace(A));
        corps._dernier = R0 || null;
        out.innerHTML = txt ? '<div class="mat-txt">' + esc(txt) + '</div>' : afficherMat(R0) + '<div class="btn-row"><button type="button" class="cb" data-copie="A">Copier dans A</button><button type="button" class="cb" data-copie="B">Copier dans B</button></div>';
      } catch (er) { out.innerHTML = '<span class="err">' + esc(er.message) + '</span>'; }
    };
    function lire(nom) {
      var m = c.mat[nom], R0 = [];
      for (var i = 0; i < m.l; i++) { R0.push([]); for (var j = 0; j < m.c; j++) { var v = evalNum((m.v[i] && m.v[i][j]) || '0'); if (isNaN(v)) throw new Error('Coefficient invalide dans ' + nom); R0[i].push(v); } }
      return R0;
    }
  }
  function fmFrac(x) { if (Math.abs(x) < 1e-12) return '0'; var fr = M.fraction(x, 1000); return fr ? M.fracTexte(fr) : fm(x); }
  function afficherMat(R0) {
    return '<div class="mat-res" style="grid-template-columns:repeat(' + R0[0].length + ',auto)">' + R0.map(function (l) { return l.map(function (v) { return '<span>' + esc(fmFrac(v)) + '</span>'; }).join(''); }).join('') + '</div>';
  }

  /* ============================================================
     6. CONVERSIONS
     ============================================================ */
  var UNITES = {
    'Longueur': { base: 'm', u: [['km', 1000], ['hm', 100], ['dam', 10], ['m', 1], ['dm', 0.1], ['cm', 0.01], ['mm', 0.001], ['µm', 1e-6], ['nm', 1e-9], ['mile', 1609.344], ['yard', 0.9144], ['pied', 0.3048], ['pouce', 0.0254], ['année-lumière', 9.4607304725808e15], ['unité astronomique', 1.495978707e11]] },
    'Aire': { u: [['km²', 1e6], ['ha', 1e4], ['a', 100], ['m²', 1], ['dm²', 0.01], ['cm²', 1e-4], ['mm²', 1e-6]] },
    'Volume': { u: [['m³', 1], ['hL', 0.1], ['dm³ = L', 0.001], ['dL', 1e-4], ['cL', 1e-5], ['cm³ = mL', 1e-6], ['mm³', 1e-9]] },
    'Masse': { u: [['t', 1000], ['kg', 1], ['hg', 0.1], ['g', 0.001], ['mg', 1e-6], ['µg', 1e-9], ['livre', 0.45359237], ['once', 0.028349523125]] },
    'Durée': { u: [['an (365 j)', 31536000], ['semaine', 604800], ['jour', 86400], ['h', 3600], ['min', 60], ['s', 1], ['ms', 0.001]] },
    'Vitesse': { u: [['km/h', 1 / 3.6], ['m/s', 1], ['nœud', 1852 / 3600], ['mph', 0.44704], ['c (lumière)', 299792458]] },
    'Énergie': { u: [['J', 1], ['kJ', 1000], ['Wh', 3600], ['kWh', 3.6e6], ['cal', 4.184], ['kcal', 4184], ['eV', 1.602176634e-19]] },
    'Données': { u: [['bit', 0.125], ['octet', 1], ['ko', 1e3], ['Mo', 1e6], ['Go', 1e9], ['To', 1e12], ['Kio', 1024], ['Mio', 1048576], ['Gio', 1073741824]] },
    'Température': { temp: true, u: [['°C'], ['K'], ['°F']] },
    'Angle': { u: [['degré', Math.PI / 180], ['radian', 1], ['grade', Math.PI / 200], ['tour', 2 * Math.PI], ['minute d\'arc', Math.PI / 10800], ['seconde d\'arc', Math.PI / 648000]] }
  };
  function vConversions(corps) {
    var c = etat(), cv = c.convData || {};
    var h = sousOnglets([['bases', 'Bases'], ['unites', 'Unités'], ['fractions', 'Fractions'], ['temps', 'Heures']], c.conv, 'conv');
    if (c.conv === 'bases') {
      h += '<div class="bases">' + [['10', 'Décimal'], ['2', 'Binaire'], ['8', 'Octal'], ['16', 'Hexadécimal']].map(function (b) { return '<label>' + b[1] + ' (base ' + b[0] + ')<input class="input mono" data-base="' + b[0] + '" spellcheck="false" autocomplete="off"></label>'; }).join('') + '</div>' +
        '<p class="small muted">Tape dans n\'importe quel champ : les autres se mettent à jour. Entiers positifs ou négatifs, aussi grands que tu veux.</p>';
    } else if (c.conv === 'unites') {
      var cat = cv.cat || 'Longueur', U0 = UNITES[cat];
      var opts = function (sel) { return U0.u.map(function (u, i) { return '<option value="' + i + '"' + (i === sel ? ' selected' : '') + '>' + esc(u[0]) + '</option>'; }).join(''); };
      var de = cv.de != null && cv.cat === cat ? cv.de : 0, vers = cv.vers != null && cv.cat === cat ? cv.vers : Math.min(1, U0.u.length - 1);
      h += '<div class="form-l"><label>Grandeur<select class="input" id="cv-cat">' + Object.keys(UNITES).map(function (k) { return '<option' + (k === cat ? ' selected' : '') + '>' + k + '</option>'; }).join('') + '</select></label></div>' +
        '<div class="conv"><input class="input" id="cv-val" value="' + esc(cv.val || '1') + '" aria-label="valeur"><select class="input" id="cv-de" aria-label="unité de départ">' + opts(de) + '</select><button type="button" class="cb" id="cv-inv" aria-label="Inverser les unités">⇄</button><select class="input" id="cv-vers" aria-label="unité d\'arrivée">' + opts(vers) + '</select></div>' +
        '<div class="res big" id="cv-res" aria-live="polite"></div><div class="small muted" id="cv-tout"></div>';
    } else if (c.conv === 'fractions') {
      h += '<div class="form-l"><label class="large">Décimal → fraction<input class="input" id="fr-d" value="' + esc(cv.frd || '0,375') + '"></label></div><div class="res" id="fr-dr"></div>' +
        '<div class="form-l"><label class="large">Écriture décimale périodique : partie fixe et période (ex. 0,1 et 6 pour 0,1666…)</label></div><div class="form-l"><label>Début<input class="input" id="fr-pf" value="' + esc(cv.frpf || '0,1') + '"></label><label>Période<input class="input" id="fr-pp" value="' + esc(cv.frpp || '6') + '"></label></div><div class="res" id="fr-pr"></div>' +
        '<div class="form-l"><label class="large">Fraction → décimal et nombre mixte<input class="input" id="fr-f" value="' + esc(cv.frf || '22/7') + '"></label></div><div class="res" id="fr-fr"></div>';
    } else {
      h += '<div class="form-l"><label>Heures<input class="input" id="tp-h" value="' + esc(cv.th || '2') + '"></label><label>Minutes<input class="input" id="tp-m" value="' + esc(cv.tm || '30') + '"></label><label>Secondes<input class="input" id="tp-s" value="' + esc(cv.ts || '0') + '"></label></div><div class="res" id="tp-r1"></div>' +
        '<div class="form-l"><label class="large">Durée décimale en heures<input class="input" id="tp-d" value="' + esc(cv.td || '1,75') + '"></label></div><div class="res" id="tp-r2"></div>';
    }
    corps.innerHTML = h;
    corps.onclick = function (e) {
      var s = e.target.closest('[data-conv]'); if (s) { c.conv = s.getAttribute('data-conv'); sauver(); vConversions(corps); return; }
      if (e.target.closest('#cv-inv')) { var a = U.$('#cv-de', corps), b = U.$('#cv-vers', corps), t = a.value; a.value = b.value; b.value = t; maj(); }
    };
    corps.onchange = function (e) { if (e.target.id === 'cv-cat') { cv.cat = e.target.value; cv.de = null; cv.vers = null; c.convData = cv; sauver(); vConversions(corps); } else maj(e); };
    corps.oninput = maj;
    maj();
    function maj(e) {
      try {
        if (c.conv === 'bases') {
          var src = e && e.target && e.target.getAttribute && e.target.getAttribute('data-base');
          var champs = U.$$('[data-base]', corps);
          if (!src) { src = '10'; if (!champs[0].value) champs[0].value = cv.dec || '2026'; }
          var el = U.$('[data-base="' + src + '"]', corps), v = el.value.trim().replace(/\s/g, '');
          var neg = v[0] === '-'; if (neg) v = v.slice(1);
          var valide = { '10': /^\d+$/, '2': /^[01]+$/, '8': /^[0-7]+$/, '16': /^[0-9a-fA-F]+$/ }[src];
          champs.forEach(function (ch) { ch.classList.remove('err-in'); });
          if (!v) { champs.forEach(function (ch) { if (ch !== el) ch.value = ''; }); return; }
          if (!valide.test(v)) { el.classList.add('err-in'); return; }
          var big = BigInt(({ '10': '', '2': '0b', '8': '0o', '16': '0x' })[src] + v);
          champs.forEach(function (ch) { if (ch !== el) { var b = +ch.getAttribute('data-base'); ch.value = (neg ? '-' : '') + big.toString(b).toUpperCase(); } });
          cv.dec = (neg ? '-' : '') + big.toString(10);
        } else if (c.conv === 'unites') {
          var cat = cv.cat || 'Longueur', U0 = UNITES[cat], x = evalNum(U.$('#cv-val', corps).value);
          var de = +U.$('#cv-de', corps).value, vers = +U.$('#cv-vers', corps).value;
          cv.val = U.$('#cv-val', corps).value; cv.de = de; cv.vers = vers; cv.cat = cat;
          var res = U.$('#cv-res', corps), tout = U.$('#cv-tout', corps);
          if (isNaN(x)) { res.textContent = 'Valeur invalide'; tout.textContent = ''; return; }
          var conv = function (val, a, b) {
            if (U0.temp) { var k = a === 0 ? val + 273.15 : a === 1 ? val : (val - 32) * 5 / 9 + 273.15; return b === 0 ? k - 273.15 : b === 1 ? k : (k - 273.15) * 9 / 5 + 32; }
            return val * U0.u[a][1] / U0.u[b][1];
          };
          res.textContent = fm(x) + ' ' + U0.u[de][0] + ' = ' + fm(conv(x, de, vers)) + ' ' + U0.u[vers][0];
          tout.textContent = U0.u.map(function (u, i) { return i === de ? null : fm(conv(x, de, i)) + ' ' + u[0]; }).filter(Boolean).join('  ·  ');
        } else if (c.conv === 'fractions') {
          cv.frd = U.$('#fr-d', corps).value; cv.frf = U.$('#fr-f', corps).value; cv.frpf = U.$('#fr-pf', corps).value; cv.frpp = U.$('#fr-pp', corps).value;
          var d = evalNum(cv.frd), fr = isNaN(d) ? null : M.fraction(d, 1e7);
          U.$('#fr-dr', corps).textContent = isNaN(d) ? 'Valeur invalide' : fr ? fm(d) + ' = ' + M.fracTexte(fr) : 'Pas de fraction simple trouvée';
          /* périodique : x = début + période répétée à partir de la dernière décimale du début */
          var debut = cv.frpf.trim().replace('.', ','), per = cv.frpp.trim();
          if (/^-?\d+(,\d*)?$/.test(debut) && /^\d+$/.test(per)) {
            var dec = (debut.split(',')[1] || ''), entierS = debut.split(',')[0];
            var nNonPer = dec.length, nPer = per.length;
            var A0 = BigInt(entierS.replace('-', '') + dec + per), B0 = BigInt(entierS.replace('-', '') + dec);
            var num0 = A0 - B0, den0 = BigInt('9'.repeat(nPer) + '0'.repeat(nNonPer));
            var gg = function (a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }, g0 = gg(num0, den0);
            U.$('#fr-pr', corps).textContent = debut + per + per + '… = ' + (debut[0] === '-' ? '−' : '') + (num0 / g0) + '/' + (den0 / g0);
          } else U.$('#fr-pr', corps).textContent = 'Début : un nombre comme 0,1 ; période : des chiffres comme 6';
          var f2 = evalNum(cv.frf);
          if (isNaN(f2)) U.$('#fr-fr', corps).textContent = 'Fraction invalide';
          else { var fr2 = M.fraction(f2, 1e7), ent = Math.trunc(f2); U.$('#fr-fr', corps).textContent = '= ' + fm(f2) + (fr2 && fr2.d !== 1 && Math.abs(ent) >= 1 ? '  =  ' + ent + ' + ' + M.fracTexte({ n: Math.abs(fr2.n) - Math.abs(ent) * fr2.d, d: fr2.d }) : ''); }
        } else {
          cv.th = U.$('#tp-h', corps).value; cv.tm = U.$('#tp-m', corps).value; cv.ts = U.$('#tp-s', corps).value; cv.td = U.$('#tp-d', corps).value;
          var hh = evalNum(cv.th) || 0, mm = evalNum(cv.tm) || 0, ss = evalNum(cv.ts) || 0, tot = hh * 3600 + mm * 60 + ss;
          U.$('#tp-r1', corps).textContent = '= ' + fm(tot / 3600) + ' h = ' + fm(tot / 60) + ' min = ' + fm(tot) + ' s';
          var dd = evalNum(cv.td);
          if (isNaN(dd)) U.$('#tp-r2', corps).textContent = 'Valeur invalide';
          else { var s0 = Math.round(Math.abs(dd) * 3600); U.$('#tp-r2', corps).textContent = '= ' + Math.floor(s0 / 3600) + ' h ' + Math.floor(s0 % 3600 / 60) + ' min ' + (s0 % 60) + ' s'; }
        }
        c.convData = cv; sauver();
      } catch (er) { /* saisie en cours */ }
    }
  }

  window.Calculatrice = { monter: monter, redessiner: function () { if (gEtat && racineEl && etat().onglet === 'graphe') dessiner(); } };
})();
