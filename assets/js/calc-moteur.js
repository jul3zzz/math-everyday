/* Math Everyday — moteur de calcul de la calculatrice.
   Analyseur d'expressions (sans eval) travaillant en nombres complexes, fonctions usuelles,
   formes spéciales (dérivée, intégrale, somme, résolution), formes exactes, algèbre linéaire,
   racines de polynômes et statistiques. Expose window.Moteur. */
(function () {
  'use strict';

  /* ---------------- Nombres complexes ---------------- */
  function C(re, im) { return { re: re, im: im || 0 }; }
  var Cx = {
    add: function (a, b) { return C(a.re + b.re, a.im + b.im); },
    sub: function (a, b) { return C(a.re - b.re, a.im - b.im); },
    mul: function (a, b) { return C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re); },
    div: function (a, b) {
      var d = b.re * b.re + b.im * b.im;
      if (d === 0) throw new Error('Division par zéro');
      return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
    },
    abs: function (a) { return Math.hypot(a.re, a.im); },
    arg: function (a) { return Math.atan2(a.im, a.re); },
    exp: function (a) { var r = Math.exp(a.re); return C(r * Math.cos(a.im), r * Math.sin(a.im)); },
    log: function (a) {
      if (a.re === 0 && a.im === 0) throw new Error('ln(0) n\'existe pas');
      return C(Math.log(Cx.abs(a)), Cx.arg(a));
    },
    pow: function (a, b) {
      if (b.im === 0 && a.im === 0) {
        if (a.re >= 0 || Number.isInteger(b.re)) return C(Math.pow(a.re, b.re), 0);
        /* racine impaire d'un négatif : on garde la valeur réelle (ex. (-8)^(1/3) = -2) */
        var inv = 1 / b.re;
        if (Math.abs(inv - Math.round(inv)) < 1e-9 && Math.round(inv) % 2 !== 0) return C(-Math.pow(-a.re, b.re), 0);
      }
      if (a.re === 0 && a.im === 0) {
        if (b.re > 0) return C(0, 0);
        throw new Error('0 à une puissance négative');
      }
      return Cx.exp(Cx.mul(b, Cx.log(a)));
    },
    sqrt: function (a) {
      if (a.im === 0 && a.re >= 0) return C(Math.sqrt(a.re), 0);
      var r = Cx.abs(a);
      var re = Math.sqrt((r + a.re) / 2), im = Math.sqrt((r - a.re) / 2);
      return C(re, a.im < 0 ? -im : im);
    },
    sin: function (a) { return C(Math.sin(a.re) * Math.cosh(a.im), Math.cos(a.re) * Math.sinh(a.im)); },
    cos: function (a) { return C(Math.cos(a.re) * Math.cosh(a.im), -Math.sin(a.re) * Math.sinh(a.im)); },
    neg: function (a) { return C(-a.re, -a.im); },
    conj: function (a) { return C(a.re, -a.im); },
    estReel: function (a) { return Math.abs(a.im) <= 1e-12 * Math.max(1, Math.abs(a.re)); }
  };

  /* ---------------- Analyse lexicale ---------------- */
  var FONCS_SPECIALES = { deriv: 1, derivee: 1, integ: 1, integrale: 1, somme: 1, sum: 1, produit: 1, prod: 1, resoudre: 1, solve: 1 };

  function lexer(src) {
    var s = String(src)
      .replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/')
      .replace(/≤/g, '<=').replace(/ /g, ' ');
    var t = [], i = 0;
    while (i < s.length) {
      var c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      var m = s.slice(i).match(/^(\d+(?:[.,]\d*)?|[.,]\d+)(?:ᴇ([+-]?\d+))?/);
      if (m) {
        var v = parseFloat(m[1].replace(',', '.'));
        if (m[2] != null) v *= Math.pow(10, parseInt(m[2], 10));
        t.push({ k: 'num', v: v }); i += m[0].length; continue;
      }
      m = s.slice(i).match(/^[A-Za-zα-ωΑ-Ωπφθ_][A-Za-z0-9α-ωΑ-Ωπφθ_]*/);
      if (m) { t.push({ k: 'id', v: m[0] }); i += m[0].length; continue; }
      if ('+-*/^()!%;=√∛²³°'.indexOf(c) >= 0) { t.push({ k: 'op', v: c }); i++; continue; }
      if (c === 'ᴇ') { t.push({ k: 'op', v: '*' }); t.push({ k: 'num', v: 10 }); t.push({ k: 'op', v: '^' }); i++; continue; }
      throw new Error('Caractère inconnu : « ' + c + ' »');
    }
    return t;
  }

  /* ---------------- Analyse syntaxique (descente récursive) ---------------- */
  function parser(src) {
    var t = lexer(src), p = 0;
    function voir() { return t[p]; }
    function est(k, v) { var x = t[p]; return x && x.k === k && (v == null || x.v === v); }
    function prendre(k, v) { if (!est(k, v)) throw new Error(v ? '« ' + v + ' » attendu' : 'Expression incomplète'); return t[p++]; }
    function debutAtome() {
      var x = voir(); if (!x) return false;
      if (x.k === 'num' || x.k === 'id') return !(x.k === 'id' && x.v === 'mod');
      return x.k === 'op' && (x.v === '(' || x.v === '√' || x.v === '∛');
    }
    function instruction() {
      if (est('id') && t[p + 1] && t[p + 1].k === 'op' && t[p + 1].v === '=' && !FONCTIONS[t[p].v]) {
        var n = t[p].v; p += 2;
        return { t: 'aff', n: n, a: somme() };
      }
      return somme();
    }
    function somme() {
      var a = produit();
      while (est('op', '+') || est('op', '-')) { var o = t[p++].v; a = { t: 'bin', op: o, a: a, b: produit() }; }
      return a;
    }
    function produit() {
      var a = unaire();
      for (;;) {
        if (est('op', '*') || est('op', '/')) { var o = t[p++].v; a = { t: 'bin', op: o, a: a, b: unaire() }; }
        else if (est('id', 'mod')) { p++; a = { t: 'appel', f: 'mod', args: [a, unaire()] }; }
        else if (debutAtome()) a = { t: 'bin', op: '*', a: a, b: puissance() };
        else return a;
      }
    }
    function unaire() {
      if (est('op', '-')) { p++; return { t: 'neg', a: unaire() }; }
      if (est('op', '+')) { p++; return unaire(); }
      return puissance();
    }
    function puissance() {
      var b = postfixe();
      if (est('op', '^')) { p++; return { t: 'bin', op: '^', a: b, b: unaire() }; }
      return b;
    }
    function postfixe() {
      var a = atome();
      for (;;) {
        if (est('op', '!')) { p++; a = { t: 'appel', f: 'fact', args: [a] }; }
        else if (est('op', '%')) { p++; a = { t: 'bin', op: '/', a: a, b: { t: 'num', v: 100 } }; }
        else if (est('op', '²')) { p++; a = { t: 'bin', op: '^', a: a, b: { t: 'num', v: 2 } }; }
        else if (est('op', '³')) { p++; a = { t: 'bin', op: '^', a: a, b: { t: 'num', v: 3 } }; }
        else if (est('op', '°')) { p++; a = { t: 'deg', a: a }; }
        else return a;
      }
    }
    function atome() {
      var x = voir();
      if (!x) throw new Error('Expression incomplète');
      if (x.k === 'num') { p++; return { t: 'num', v: x.v }; }
      if (x.k === 'op' && x.v === '(') { p++; var e = somme(); prendre('op', ')'); return e; }
      if (x.k === 'op' && x.v === '√') { p++; return { t: 'appel', f: 'sqrt', args: [postfixe()] }; }
      if (x.k === 'op' && x.v === '∛') { p++; return { t: 'appel', f: 'cbrt', args: [postfixe()] }; }
      if (x.k === 'id') {
        p++;
        var nom = x.v, bas = nom.toLowerCase();
        if (est('op', '(') && (FONCTIONS[bas] || FONCS_SPECIALES[bas])) {
          p++;
          var args = [];
          if (!est('op', ')')) { args.push(somme()); while (est('op', ';')) { p++; args.push(somme()); } }
          prendre('op', ')');
          return { t: FONCS_SPECIALES[bas] ? 'special' : 'appel', f: bas, args: args };
        }
        if (FONCTIONS[bas] && !est('op', '(') && debutAtome()) {
          /* sin x, ln 2 : argument sans parenthèses */
          return { t: 'appel', f: bas, args: [puissance()] };
        }
        return { t: 'var', n: nom };
      }
      throw new Error('Symbole inattendu : « ' + x.v + ' »');
    }
    var arbre = instruction();
    if (p < t.length) throw new Error(t[p].v === ')' ? 'Parenthèse fermante en trop' : 'Symbole inattendu : « ' + t[p].v + ' »');
    return arbre;
  }

  /* ---------------- Fonctions ---------------- */
  var ctx = { angle: 'deg', vars: {} };
  function versRad(x) { return ctx.angle === 'deg' ? x * Math.PI / 180 : ctx.angle === 'grad' ? x * Math.PI / 200 : x; }
  function depuisRad(x) { return ctx.angle === 'deg' ? x * 180 / Math.PI : ctx.angle === 'grad' ? x * 200 / Math.PI : x; }
  function reel(z, nom) { if (!Cx.estReel(z)) throw new Error((nom || 'Cette fonction') + ' attend un nombre réel'); return z.re; }
  function entier(z, nom) { var x = reel(z, nom); if (Math.abs(x - Math.round(x)) > 1e-9) throw new Error((nom || 'Cette fonction') + ' attend un entier'); return Math.round(x); }
  function R(x) { return C(x, 0); }
  function trig(f, inv) {
    return function (z) {
      if (Cx.estReel(z)) {
        var x = z.re;
        if (!inv) return R(f(versRad(x)));
        var y = f(x);
        if (isNaN(y)) throw new Error('Valeur hors du domaine de définition');
        return R(depuisRad(y));
      }
      if (inv) throw new Error('Fonction réciproque réservée aux réels');
      var s = Cx.sin(z), c = Cx.cos(z);
      if (f === Math.sin) return s;
      if (f === Math.cos) return c;
      return Cx.div(s, c);
    };
  }
  function factorielle(n) {
    if (n < 0) throw new Error('Factorielle d\'un négatif');
    if (n > 170) throw new Error('Nombre trop grand');
    var r = 1; for (var i = 2; i <= n; i++) r *= i; return r;
  }
  function gammaLanczos(x) {
    if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gammaLanczos(1 - x));
    var g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    x -= 1; var a = c[0], t = x + g + 0.5;
    for (var i = 1; i < 9; i++) a += c[i] / (x + i);
    return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
  }
  function comb(n, k) {
    if (k < 0 || k > n) return 0;
    k = Math.min(k, n - k); var r = 1;
    for (var i = 1; i <= k; i++) r = r * (n - k + i) / i;
    return Math.round(r);
  }
  function pgcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function erf(x) {
    /* Approximation d'Abramowitz-Stegun 7.1.26 raffinée (erreur < 1,2e-7) */
    var s = x < 0 ? -1 : 1; x = Math.abs(x);
    var t = 1 / (1 + 0.5 * x);
    var y = 1 - t * Math.exp(-x * x - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return s * y;
  }
  function phiNormale(x) { return 0.5 * (1 + erf(x / Math.SQRT2)); }

  var FONCTIONS = {
    sin: trig(Math.sin), cos: trig(Math.cos),
    tan: function (z) {
      if (Cx.estReel(z)) {
        var demi = ctx.angle === 'deg' ? 90 : ctx.angle === 'grad' ? 100 : Math.PI / 2;
        var q = z.re / demi;
        if (Math.abs(q - Math.round(q)) < 1e-12 && Math.round(q) % 2 !== 0) throw new Error('tan n\'est pas définie ici');
      }
      return trig(Math.tan)(z);
    },
    cot: function (z) { return Cx.div(R(1), FONCTIONS.tan(z)); },
    sec: function (z) { return Cx.div(R(1), FONCTIONS.cos(z)); },
    csc: function (z) { return Cx.div(R(1), FONCTIONS.sin(z)); },
    asin: trig(Math.asin, true), acos: trig(Math.acos, true), atan: trig(Math.atan, true),
    arcsin: trig(Math.asin, true), arccos: trig(Math.acos, true), arctan: trig(Math.atan, true),
    acot: function (z) { var x = reel(z, 'acot'); return R(depuisRad(Math.atan(1 / x))); },
    atan2: function (y, x) { return R(depuisRad(Math.atan2(reel(y), reel(x)))); },
    sinh: function (z) { return R(Math.sinh(reel(z, 'sinh'))); }, cosh: function (z) { return R(Math.cosh(reel(z, 'cosh'))); },
    tanh: function (z) { return R(Math.tanh(reel(z, 'tanh'))); },
    sh: function (z) { return R(Math.sinh(reel(z, 'sh'))); }, ch: function (z) { return R(Math.cosh(reel(z, 'ch'))); }, th: function (z) { return R(Math.tanh(reel(z, 'th'))); },
    asinh: function (z) { return R(Math.asinh(reel(z))); }, acosh: function (z) { return R(Math.acosh(reel(z))); }, atanh: function (z) { return R(Math.atanh(reel(z))); },
    exp: function (z) { return Cx.exp(z); },
    ln: function (z) { if (Cx.estReel(z) && z.re < 0 && ctx.reel) throw new Error('ln d\'un nombre négatif'); return Cx.log(z); },
    log: function (z, b) {
      var l = Cx.log(z);
      return Cx.div(l, Cx.log(b || R(10)));
    },
    log2: function (z) { return Cx.div(Cx.log(z), R(Math.LN2)); },
    logb: function (z, b) { return Cx.div(Cx.log(z), Cx.log(b)); },
    sqrt: function (z) { if (ctx.reel && Cx.estReel(z) && z.re < 0) throw new Error('Racine carrée d\'un nombre négatif (passe en mode complexe)'); return Cx.sqrt(z); },
    racine: function (z) { return FONCTIONS.sqrt(z); },
    cbrt: function (z) { return R(Math.cbrt(reel(z, '∛'))); },
    root: function (z, n) { var k = reel(n, 'root'); var x = reel(z, 'root'); if (x < 0 && Math.round(k) % 2 === 1) return R(-Math.pow(-x, 1 / k)); if (x < 0) throw new Error('Racine paire d\'un négatif'); return R(Math.pow(x, 1 / k)); },
    abs: function (z) { return R(Cx.abs(z)); },
    arg: function (z) { return R(depuisRad(Cx.arg(z))); },
    conj: function (z) { return Cx.conj(z); },
    re: function (z) { return R(z.re); }, im: function (z) { return R(z.im); },
    floor: function (z) { return R(Math.floor(reel(z, 'floor'))); }, ent: function (z) { return R(Math.floor(reel(z, 'ent'))); },
    ceil: function (z) { return R(Math.ceil(reel(z, 'ceil'))); },
    round: function (z, n) { var k = n ? entier(n) : 0; var f = Math.pow(10, k); return R(Math.round(reel(z, 'round') * f) / f); },
    trunc: function (z) { return R(Math.trunc(reel(z))); },
    frac: function (z) { var x = reel(z); return R(x - Math.trunc(x)); },
    sign: function (z) { return R(Math.sign(reel(z))); },
    fact: function (z) { var x = reel(z, '!'); if (Number.isInteger(x)) return R(factorielle(x)); return R(gammaLanczos(x + 1)); },
    gamma: function (z) { return R(gammaLanczos(reel(z, 'gamma'))); },
    ncr: function (n, k) { return R(comb(entier(n, 'nCr'), entier(k, 'nCr'))); },
    comb: function (n, k) { return FONCTIONS.ncr(n, k); },
    binom: function (n, k) { return FONCTIONS.ncr(n, k); },
    npr: function (n, k) { var a = entier(n), b = entier(k); if (b > a || b < 0) return R(0); var r = 1; for (var i = a - b + 1; i <= a; i++) r *= i; return R(r); },
    arr: function (n, k) { return FONCTIONS.npr(n, k); },
    mod: function (a, b) { var x = reel(a, 'mod'), y = reel(b, 'mod'); if (y === 0) throw new Error('Modulo 0'); return R(((x % y) + y) % y); },
    quotient: function (a, b) { var x = reel(a), y = reel(b); return R(Math.floor(x / y)); },
    pgcd: function () { var r = 0; for (var i = 0; i < arguments.length; i++) r = pgcd(r, entier(arguments[i], 'pgcd')); return R(r); },
    gcd: function () { return FONCTIONS.pgcd.apply(null, arguments); },
    ppcm: function () { var r = 1; for (var i = 0; i < arguments.length; i++) { var x = entier(arguments[i], 'ppcm'); r = Math.abs(r * x) / pgcd(r, x); } return R(r); },
    lcm: function () { return FONCTIONS.ppcm.apply(null, arguments); },
    min: function () { return R(Math.min.apply(null, [].map.call(arguments, function (z) { return reel(z); }))); },
    max: function () { return R(Math.max.apply(null, [].map.call(arguments, function (z) { return reel(z); }))); },
    moy: function () { var s = 0; for (var i = 0; i < arguments.length; i++) s += reel(arguments[i]); return R(s / arguments.length); },
    mean: function () { return FONCTIONS.moy.apply(null, arguments); },
    hyp: function (a, b) { return R(Math.hypot(reel(a), reel(b))); },
    rand: function () { return R(Math.random()); },
    alea: function () { return R(Math.random()); },
    randint: function (a, b) { var x = entier(a), y = entier(b); return R(x + Math.floor(Math.random() * (y - x + 1))); },
    deg: function (z) { return R(reel(z) * 180 / Math.PI); },
    rad: function (z) { return R(reel(z) * Math.PI / 180); },
    premier: function (z) { var n = entier(z, 'premier'); if (n < 2) return R(0); for (var d = 2; d * d <= n; d++) if (n % d === 0) return R(0); return R(1); },
    binompdf: function (n, p, k) { var N = entier(n), K = entier(k), P = reel(p); return R(comb(N, K) * Math.pow(P, K) * Math.pow(1 - P, N - K)); },
    binomcdf: function (n, p, k) { var s = 0, K = entier(k); for (var j = 0; j <= K; j++) s += FONCTIONS.binompdf(n, p, R(j)).re; return R(Math.min(1, s)); },
    normcdf: function (a, b, mu, sigma) { var m = mu ? reel(mu) : 0, s = sigma ? reel(sigma) : 1; return R(phiNormale((reel(b) - m) / s) - phiNormale((reel(a) - m) / s)); },
    normpdf: function (x, mu, sigma) { var m = mu ? reel(mu) : 0, s = sigma ? reel(sigma) : 1, u = (reel(x) - m) / s; return R(Math.exp(-u * u / 2) / (s * Math.sqrt(2 * Math.PI))); },
    invnorm: function (p, mu, sigma) {
      var P = reel(p), m = mu ? reel(mu) : 0, s = sigma ? reel(sigma) : 1;
      if (P <= 0 || P >= 1) throw new Error('invnorm attend une probabilité entre 0 et 1');
      var lo = -10, hi = 10;
      for (var i = 0; i < 100; i++) { var mid = (lo + hi) / 2; if (phiNormale(mid) < P) lo = mid; else hi = mid; }
      return R(m + s * (lo + hi) / 2);
    },
    poissonpdf: function (l, k) { var L = reel(l), K = entier(k); return R(Math.exp(-L) * Math.pow(L, K) / factorielle(K)); }
  };

  var CONSTANTES = {
    pi: Math.PI, π: Math.PI, e: Math.E, phi: (1 + Math.sqrt(5)) / 2, φ: (1 + Math.sqrt(5)) / 2, tau: 2 * Math.PI
  };

  /* ---------------- Évaluation ---------------- */
  function evaluer(n, env) {
    switch (n.t) {
      case 'num': return R(n.v);
      case 'var': {
        if (env && n.n in env) return env[n.n];
        if (n.n === 'i') return C(0, 1);
        if (n.n in ctx.vars) return ctx.vars[n.n];
        if (n.n in CONSTANTES) return R(CONSTANTES[n.n]);
        if (n.n === 'Ans' || n.n === 'ans') return ctx.vars.Ans || R(0);
        throw new Error('Variable inconnue : ' + n.n);
      }
      case 'neg': return Cx.neg(evaluer(n.a, env));
      case 'deg': return R(reel(evaluer(n.a, env)) * (ctx.angle === 'deg' ? 1 : ctx.angle === 'grad' ? 200 / 180 : Math.PI / 180));
      case 'bin': {
        var a = evaluer(n.a, env), b = evaluer(n.b, env);
        if (n.op === '+') return Cx.add(a, b);
        if (n.op === '-') return Cx.sub(a, b);
        if (n.op === '*') return Cx.mul(a, b);
        if (n.op === '/') return Cx.div(a, b);
        if (n.op === '^') return Cx.pow(a, b);
        break;
      }
      case 'appel': {
        var f = FONCTIONS[n.f];
        if (!f) throw new Error('Fonction inconnue : ' + n.f);
        return f.apply(null, n.args.map(function (x) { return evaluer(x, env); }));
      }
      case 'special': return special(n, env);
      case 'aff': {
        if (n.n in CONSTANTES || n.n === 'i') throw new Error('« ' + n.n + ' » est une constante');
        var v = evaluer(n.a, env); ctx.vars[n.n] = v; return v;
      }
    }
    throw new Error('Expression invalide');
  }

  /* Fonction réelle de x à partir d'un arbre (pour dérivées, intégrales, tracés). */
  function fx(arbre, nomVar, env) {
    nomVar = nomVar || 'x';
    return function (x) {
      var e = Object.assign({}, env || {}); e[nomVar] = R(x);
      var z = evaluer(arbre, e);
      return Cx.estReel(z) ? z.re : NaN;
    };
  }
  function derivee(f, a) {
    var h = 1e-4 * Math.max(1, Math.abs(a));
    /* différences centrées d'ordre 4 */
    return (-f(a + 2 * h) + 8 * f(a + h) - 8 * f(a - h) + f(a - 2 * h)) / (12 * h);
  }
  function simpson(f, a, b) { var c = (a + b) / 2; return (b - a) / 6 * (f(a) + 4 * f(c) + f(b)); }
  function integrale(f, a, b) {
    if (a === b) return 0;
    var signe = 1; if (a > b) { var t = a; a = b; b = t; signe = -1; }
    function rec(a, b, fa, fm, fb, tout, eps, prof) {
      var m = (a + b) / 2, lm = (a + m) / 2, rm = (m + b) / 2;
      var flm = f(lm), frm = f(rm);
      var g = (m - a) / 6 * (fa + 4 * flm + fm), d = (b - m) / 6 * (fm + 4 * frm + fb);
      if (prof <= 0 || Math.abs(g + d - tout) <= 15 * eps) return g + d + (g + d - tout) / 15;
      return rec(a, m, fa, flm, fm, g, eps / 2, prof - 1) + rec(m, b, fm, frm, fb, d, eps / 2, prof - 1);
    }
    var fa = f(a), fb = f(b), fm = f((a + b) / 2);
    if (!isFinite(fa)) fa = f(a + 1e-9 * (b - a)); if (!isFinite(fb)) fb = f(b - 1e-9 * (b - a));
    var r = rec(a, b, fa, fm, fb, (b - a) / 6 * (fa + 4 * fm + fb), 1e-10, 40);
    if (!isFinite(r)) throw new Error('Intégrale non calculable (fonction non bornée ?)');
    return signe * r;
  }
  function racine(f, x0) {
    var x = x0;
    for (var i = 0; i < 100; i++) {
      var y = f(x), d = derivee(f, x);
      if (!isFinite(y)) break;
      if (Math.abs(y) < 1e-13) return x;
      if (!d || !isFinite(d)) break;
      var nx = x - y / d;
      if (Math.abs(nx - x) < 1e-13 * Math.max(1, Math.abs(x))) return nx;
      x = nx;
    }
    if (isFinite(f(x)) && Math.abs(f(x)) < 1e-8) return x;
    throw new Error('Pas de solution trouvée près de ' + x0);
  }
  /* Toutes les racines d'une fonction sur [a ; b] (changements de signe + raffinement). */
  function racinesIntervalle(f, a, b, n) {
    n = n || 2000; var res = [], h = (b - a) / n, x0 = a, y0 = f(a);
    for (var k = 1; k <= n; k++) {
      var x1 = a + k * h, y1 = f(x1);
      if (isFinite(y0) && isFinite(y1)) {
        if (y0 === 0) res.push(x0);
        else if (y0 * y1 < 0) {
          var lo = x0, hi = x1, flo = y0;
          for (var it = 0; it < 80; it++) { var mid = (lo + hi) / 2, fm = f(mid); if (flo * fm <= 0) hi = mid; else { lo = mid; flo = fm; } }
          var r = (lo + hi) / 2;
          if (Math.abs(f(r)) < 1e-6 * Math.max(1, Math.abs(y0), Math.abs(y1))) res.push(r);
        }
      }
      x0 = x1; y0 = y1;
    }
    if (isFinite(y0) && y0 === 0) res.push(x0);
    return res.filter(function (x, i) { return i === 0 || Math.abs(x - res[i - 1]) > 1e-9; });
  }
  function special(n, env) {
    var f = n.f, A = n.args;
    var val = function (k) { return reel(evaluer(A[k], env)); };
    if (f === 'deriv' || f === 'derivee') {
      if (A.length < 2) throw new Error('deriv(expression ; a)');
      return R(derivee(fx(A[0], 'x', env), val(1)));
    }
    if (f === 'integ' || f === 'integrale') {
      if (A.length < 3) throw new Error('integ(expression ; a ; b)');
      return R(integrale(fx(A[0], 'x', env), val(1), val(2)));
    }
    if (f === 'somme' || f === 'sum' || f === 'produit' || f === 'prod') {
      if (A.length < 3) throw new Error(f + '(expression en k ; début ; fin)');
      var a = Math.round(val(1)), b = Math.round(val(2));
      if (b - a > 1e6) throw new Error('Trop de termes');
      var estSomme = f === 'somme' || f === 'sum', acc = estSomme ? R(0) : R(1);
      for (var k = a; k <= b; k++) {
        var e = Object.assign({}, env || {}); e.k = R(k);
        var z = evaluer(A[0], e);
        acc = estSomme ? Cx.add(acc, z) : Cx.mul(acc, z);
      }
      return acc;
    }
    if (f === 'resoudre' || f === 'solve') {
      if (!A.length) throw new Error('resoudre(expression = 0 ; départ)');
      return R(racine(fx(A[0], 'x', env), A.length > 1 ? val(1) : 1));
    }
    throw new Error('Fonction inconnue');
  }

  /* ---------------- Mise en forme ---------------- */
  function fmtReel(x, chiffres) {
    chiffres = chiffres || 12;
    if (!isFinite(x)) return x > 0 ? '∞' : x < 0 ? '−∞' : 'indéfini';
    if (Math.abs(x) < 1e-15) return '0';
    var ax = Math.abs(x);
    var s;
    if (ax >= 1e12 || ax < 1e-6) {
      var exp = Math.floor(Math.log10(ax)), m = x / Math.pow(10, exp);
      if (Math.abs(m) >= 9.9999999999995) { m /= 10; exp++; }
      s = trim(m.toPrecision(Math.min(chiffres, 12))) + ' ×10^' + exp;
    } else {
      s = trim(Number(x.toPrecision(chiffres)).toString());
      if (/e/.test(s)) s = trim(x.toFixed(10));
    }
    return s.replace('.', ',').replace(/^-/, '−');
  }
  function trim(s) { return s.indexOf('.') >= 0 && s.indexOf('e') < 0 ? s.replace(/0+$/, '').replace(/\.$/, '') : s; }
  function fmt(z, chiffres) {
    if (Cx.estReel(z)) return fmtReel(z.re, chiffres);
    var re = Math.abs(z.re) < 1e-14 * Math.abs(z.im) ? 0 : z.re;
    var im = z.im, sIm = fmtReel(Math.abs(im), chiffres);
    var partIm = (sIm === '1' ? '' : sIm) + 'i';
    if (re === 0) return (im < 0 ? '−' : '') + partIm;
    return fmtReel(re, chiffres) + (im < 0 ? ' − ' : ' + ') + partIm;
  }
  /* Fraction approchée par fractions continues. */
  function fraction(x, maxDen) {
    maxDen = maxDen || 100000;
    if (!isFinite(x)) return null;
    var signe = x < 0 ? -1 : 1; x = Math.abs(x);
    var h1 = 1, h0 = 0, k1 = 0, k0 = 1, b = x;
    for (var i = 0; i < 40; i++) {
      var a = Math.floor(b);
      var h2 = a * h1 + h0, k2 = a * k1 + k0;
      if (k2 > maxDen) break;
      h0 = h1; h1 = h2; k0 = k1; k1 = k2;
      if (Math.abs(x - h1 / k1) < 1e-11 * Math.max(1, x)) return { n: signe * h1, d: k1 };
      b = 1 / (b - a);
      if (!isFinite(b)) break;
    }
    return Math.abs(x - h1 / k1) < 1e-11 * Math.max(1, x) ? { n: signe * h1, d: k1 } : null;
  }
  function fracTexte(fr) { return fr.d === 1 ? String(fr.n).replace('-', '−') : (fr.n < 0 ? '−' : '') + Math.abs(fr.n) + '/' + fr.d; }
  /* Forme exacte probable : p/q, p√n/q, pπ/q. */
  function formeExacte(z) {
    if (!Cx.estReel(z)) return null;
    var x = z.re;
    if (!isFinite(x) || Math.abs(x) < 1e-15 || Math.abs(x) > 1e9) return null;
    var fr = fraction(x, 10000);
    if (fr && fr.d !== 1) return fracTexte(fr);
    if (fr) return null;
    var fp = fraction(x / Math.PI, 1000);
    if (fp && Math.abs(fp.n) <= 1000) {
      var num = Math.abs(fp.n) === 1 ? 'π' : Math.abs(fp.n) + 'π';
      return (fp.n < 0 ? '−' : '') + num + (fp.d === 1 ? '' : '/' + fp.d);
    }
    var rac = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];
    for (var i = 0; i < rac.length; i++) {
      var q = fraction(x / Math.sqrt(rac[i]), 1000);
      if (q && Math.abs(q.n) <= 1000) {
        var nn = Math.abs(q.n) === 1 ? '√' + rac[i] : Math.abs(q.n) + '√' + rac[i];
        return (q.n < 0 ? '−' : '') + nn + (q.d === 1 ? '' : '/' + q.d);
      }
    }
    var fe = fraction(x / Math.E, 100);
    if (fe && Math.abs(fe.n) <= 100) return (fe.n < 0 ? '−' : '') + (Math.abs(fe.n) === 1 ? '' : Math.abs(fe.n)) + 'e' + (fe.d === 1 ? '' : '/' + fe.d);
    return null;
  }

  /* ---------------- Algèbre linéaire ---------------- */
  var Mat = {
    copie: function (A) { return A.map(function (l) { return l.slice(); }); },
    id: function (n) { var I = []; for (var i = 0; i < n; i++) { I.push([]); for (var j = 0; j < n; j++) I[i].push(i === j ? 1 : 0); } return I; },
    add: function (A, B, s) { s = s || 1; if (A.length !== B.length || A[0].length !== B[0].length) throw new Error('Dimensions différentes'); return A.map(function (l, i) { return l.map(function (v, j) { return v + s * B[i][j]; }); }); },
    mul: function (A, B) {
      if (A[0].length !== B.length) throw new Error('Produit impossible : colonnes de A ≠ lignes de B');
      return A.map(function (l) { return B[0].map(function (_, j) { var s = 0; for (var k = 0; k < B.length; k++) s += l[k] * B[k][j]; return s; }); });
    },
    scal: function (A, k) { return A.map(function (l) { return l.map(function (v) { return v * k; }); }); },
    tr: function (A) { return A[0].map(function (_, j) { return A.map(function (l) { return l[j]; }); }); },
    trace: function (A) { var s = 0; for (var i = 0; i < Math.min(A.length, A[0].length); i++) s += A[i][i]; return s; },
    det: function (A) {
      if (A.length !== A[0].length) throw new Error('Le déterminant demande une matrice carrée');
      var M = Mat.copie(A), n = M.length, d = 1;
      for (var c = 0; c < n; c++) {
        var p = c; for (var r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
        if (Math.abs(M[p][c]) < 1e-14) return 0;
        if (p !== c) { var t = M[p]; M[p] = M[c]; M[c] = t; d = -d; }
        d *= M[c][c];
        for (var r2 = c + 1; r2 < n; r2++) { var f = M[r2][c] / M[c][c]; for (var k = c; k < n; k++) M[r2][k] -= f * M[c][k]; }
      }
      return d;
    },
    inv: function (A) {
      var n = A.length; if (n !== A[0].length) throw new Error('Matrice non carrée');
      var M = A.map(function (l, i) { return l.concat(Mat.id(n)[i]); });
      for (var c = 0; c < n; c++) {
        var p = c; for (var r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
        if (Math.abs(M[p][c]) < 1e-12) throw new Error('Matrice non inversible (déterminant nul)');
        var t = M[p]; M[p] = M[c]; M[c] = t;
        var piv = M[c][c]; for (var k = 0; k < 2 * n; k++) M[c][k] /= piv;
        for (var r2 = 0; r2 < n; r2++) if (r2 !== c) { var f = M[r2][c]; for (var k2 = 0; k2 < 2 * n; k2++) M[r2][k2] -= f * M[c][k2]; }
      }
      return M.map(function (l) { return l.slice(n); });
    },
    puiss: function (A, k) {
      if (A.length !== A[0].length) throw new Error('Matrice non carrée');
      if (k < 0) { A = Mat.inv(A); k = -k; }
      var R0 = Mat.id(A.length), B = Mat.copie(A);
      while (k > 0) { if (k & 1) R0 = Mat.mul(R0, B); B = Mat.mul(B, B); k >>= 1; }
      return R0;
    },
    rang: function (A) {
      var M = Mat.copie(A), rows = M.length, cols = M[0].length, rg = 0;
      for (var c = 0; c < cols && rg < rows; c++) {
        var p = rg; for (var r = rg + 1; r < rows; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
        if (Math.abs(M[p][c]) < 1e-10) continue;
        var t = M[p]; M[p] = M[rg]; M[rg] = t;
        for (var r2 = rg + 1; r2 < rows; r2++) { var f = M[r2][c] / M[rg][c]; for (var k = c; k < cols; k++) M[r2][k] -= f * M[rg][k]; }
        rg++;
      }
      return rg;
    },
    /* Résout A x = b ; renvoie { type: 'unique'|'aucune'|'infinite', x } */
    systeme: function (A, b) {
      var n = A.length, M = A.map(function (l, i) { return l.concat([b[i]]); });
      var rA = Mat.rang(A), rM = Mat.rang(M);
      if (rA < rM) return { type: 'aucune' };
      if (rA < A[0].length) return { type: 'infinite' };
      var x = Mat.mul(Mat.inv(A), b.map(function (v) { return [v]; })).map(function (l) { return l[0]; });
      return { type: 'unique', x: x };
    }
  };

  /* Racines d'un polynôme (coefficients du plus haut degré au constant) — Durand-Kerner. */
  function racinesPoly(coefs) {
    while (coefs.length && Math.abs(coefs[0]) < 1e-15) coefs = coefs.slice(1);
    var n = coefs.length - 1;
    if (n < 1) throw new Error('Il faut un polynôme de degré au moins 1');
    var a = coefs.map(function (c) { return c / coefs[0]; });
    if (n === 1) return [C(-a[1], 0)];
    if (n === 2) {
      var d = a[1] * a[1] - 4 * a[2];
      if (d >= 0) { var s = Math.sqrt(d); return [C((-a[1] - s) / 2, 0), C((-a[1] + s) / 2, 0)]; }
      var t = Math.sqrt(-d) / 2; return [C(-a[1] / 2, -t), C(-a[1] / 2, t)];
    }
    var z = [], seed = C(0.4, 0.9);
    for (var i = 0; i < n; i++) z.push(Cx.pow(seed, R(i)));
    function P(x) { var r = R(1); for (var k = 1; k <= n; k++) r = Cx.add(Cx.mul(r, x), R(a[k])); return r; }
    for (var it = 0; it < 2000; it++) {
      var bouge = 0;
      for (var j = 0; j < n; j++) {
        var den = R(1);
        for (var k = 0; k < n; k++) if (k !== j) den = Cx.mul(den, Cx.sub(z[j], z[k]));
        var dz = Cx.div(P(z[j]), den);
        z[j] = Cx.sub(z[j], dz);
        bouge = Math.max(bouge, Cx.abs(dz));
      }
      if (bouge < 1e-14) break;
    }
    /* Nettoyage : parties imaginaires infimes -> réelles */
    return z.map(function (r) {
      if (Math.abs(r.im) < 1e-9 * Math.max(1, Math.abs(r.re))) r = C(r.re, 0);
      if (Math.abs(r.re) < 1e-12) r = C(0, r.im);
      return r;
    }).sort(function (u, v) { return u.re - v.re || u.im - v.im; });
  }

  /* ---------------- Statistiques ---------------- */
  function stats(valeurs, effectifs) {
    var v = [];
    valeurs.forEach(function (x, i) { var n = effectifs ? effectifs[i] : 1; for (var k = 0; k < n; k++) v.push(x); });
    if (!v.length) throw new Error('Aucune donnée');
    var tri = v.slice().sort(function (a, b) { return a - b; });
    var N = tri.length, s = 0, s2 = 0;
    tri.forEach(function (x) { s += x; s2 += x * x; });
    var moy = s / N, varp = s2 / N - moy * moy; if (varp < 0) varp = 0;
    function quantile(p) { return tri[Math.max(0, Math.ceil(p * N) - 1)]; }
    var med = N % 2 ? tri[(N - 1) / 2] : (tri[N / 2 - 1] + tri[N / 2]) / 2;
    var comptes = {}, maxC = 0;
    tri.forEach(function (x) { comptes[x] = (comptes[x] || 0) + 1; maxC = Math.max(maxC, comptes[x]); });
    var modes = Object.keys(comptes).filter(function (k) { return comptes[k] === maxC; }).map(Number);
    return {
      n: N, somme: s, moyenne: moy, mediane: med, q1: quantile(0.25), q3: quantile(0.75),
      min: tri[0], max: tri[N - 1], etendue: tri[N - 1] - tri[0], variance: varp, ecartType: Math.sqrt(varp),
      varianceEch: N > 1 ? varp * N / (N - 1) : NaN, ecartTypeEch: N > 1 ? Math.sqrt(varp * N / (N - 1)) : NaN,
      modes: maxC > 1 ? modes : []
    };
  }
  function regression(xs, ys) {
    var n = xs.length; if (n < 2 || ys.length !== n) throw new Error('Il faut autant de x que de y (au moins 2)');
    var mx = 0, my = 0; for (var i = 0; i < n; i++) { mx += xs[i]; my += ys[i]; } mx /= n; my /= n;
    var sxy = 0, sxx = 0, syy = 0;
    for (var j = 0; j < n; j++) { sxy += (xs[j] - mx) * (ys[j] - my); sxx += (xs[j] - mx) * (xs[j] - mx); syy += (ys[j] - my) * (ys[j] - my); }
    if (sxx === 0) throw new Error('Tous les x sont égaux');
    var a = sxy / sxx;
    return { a: a, b: my - a * mx, r: syy ? sxy / Math.sqrt(sxx * syy) : 1, mx: mx, my: my };
  }

  /* ---------------- API ---------------- */
  window.Moteur = {
    C: C, Cx: Cx, parser: parser, evaluer: evaluer, fx: fx,
    calculer: function (src, opts) {
      opts = opts || {};
      ctx.angle = opts.angle || 'deg';
      ctx.reel = !opts.complexe;
      ctx.vars = opts.vars || ctx.vars;
      var z = evaluer(parser(src));
      if (!isFinite(z.re) || !isFinite(z.im)) {
        if (isNaN(z.re)) throw new Error('Résultat indéfini');
      }
      if (ctx.reel && !Cx.estReel(z)) throw new Error('Résultat non réel (active le mode complexe)');
      return z;
    },
    fonctionDe: function (src, nomVar) {
      var arbre = parser(src);
      return function (x) {
        try { var e = {}; e[nomVar || 'x'] = R(x); var z = evaluer(arbre, e); return Cx.estReel(z) ? z.re : NaN; } catch (er) { return NaN; }
      };
    },
    regler: function (o) { if (o.angle) ctx.angle = o.angle; if (o.vars) ctx.vars = o.vars; ctx.reel = o.complexe ? false : true; },
    fmt: fmt, fmtReel: fmtReel, fraction: fraction, fracTexte: fracTexte, formeExacte: formeExacte,
    derivee: derivee, integrale: integrale, racine: racine, racinesIntervalle: racinesIntervalle,
    Mat: Mat, racinesPoly: racinesPoly, stats: stats, regression: regression,
    phiNormale: phiNormale, comb: comb, FONCTIONS: FONCTIONS, CONSTANTES: CONSTANTES
  };
})();
