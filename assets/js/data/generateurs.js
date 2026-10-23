/* Générateurs d'exercices : un par leçon. Chaque appel renvoie un exercice neuf
   { q, type, rep, tol?, choix?, corr } avec des nombres tirés au hasard. */
(function () {
  'use strict';
  var r = String.raw;
  function int(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function nz(a, b) { var x; do { x = int(a, b); } while (x === 0); return x; }
  function pick(t) { return t[Math.floor(Math.random() * t.length)]; }
  function arr(x, d) { var f = Math.pow(10, d == null ? 6 : d); return Math.round(x * f) / f; }
  /* écriture LaTeX française d'un nombre */
  function N(x, d) {
    var s = String(arr(x, d == null ? 6 : d));
    if (/e/.test(s)) s = x.toFixed(8).replace(/0+$/, '');
    return s.replace('.', '{,}');
  }
  function P(x, d) { return x < 0 ? '(' + N(x, d) + ')' : N(x, d); }
  function S(x, d) { return x < 0 ? '- ' + N(-x, d) : '+ ' + N(x, d); }
  /* monôme : M(1,'x') = 'x', M(-1,'x') = '-x' ; T = terme suivant avec son signe ; L = (x - a) lisible */
  function M(a, v) { return a === 1 ? v : a === -1 ? '-' + v : a + v; }
  function T(a, v) { return a === 0 ? '' : a === 1 ? '+ ' + v : a === -1 ? '- ' + v : S(a) + v; }
  function Cst(a) { return a === 0 ? '' : ' ' + S(a); }
  function L(a, v) { v = v || 'x'; return a === 0 ? v : '(' + v + ' ' + S(-a) + ')'; }
  function pl(n, mot) { return '$' + n + '$ ' + mot + (n > 1 ? 's' : ''); }
  function pgcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function F(a, b) {
    if (b < 0) { a = -a; b = -b; }
    var g = pgcd(a, b) || 1; a /= g; b /= g;
    return b === 1 ? String(a) : (a < 0 ? '-' : '') + r`\dfrac{` + Math.abs(a) + '}{' + b + '}';
  }
  function comb(n, k) { var x = 1; for (var i = 1; i <= k; i++) x = x * (n - k + i) / i; return Math.round(x); }
  function qcm(q, bonne, autres, corr) {
    var choix = [bonne].concat(autres.filter(function (a, i) { return a !== bonne && autres.indexOf(a) === i; }).slice(0, 3));
    return { q: q, type: 'qcm', choix: choix, rep: 0, corr: corr };
  }

  var G = {
    /* ===================== 6e ===================== */
    '6e-decimaux': function () {
      var u = int(1, 99), d = int(0, 9), c = int(0, 9), m = int(1, 9), x = u + d / 10 + c / 100 + m / 1000;
      return { q: r`Écris sous forme décimale : $` + u + r` + \dfrac{` + d + r`}{10} + \dfrac{` + c + r`}{100} + \dfrac{` + m + r`}{1000}$.`, type: 'num', rep: arr(x, 3), corr: r`$` + u + '$ unités, $' + d + '$ dixièmes, $' + c + '$ centièmes et $' + m + r`$ millièmes : $` + N(x, 3) + '$.' };
    },
    '6e-addsous': function () {
      var a = int(100, 999) / 10, b = int(100, 999) / 100;
      if (Math.random() < 0.5) return { q: r`Calcule $` + N(a) + ' + ' + N(b) + '$.', type: 'num', rep: arr(a + b, 2), corr: 'On aligne les virgules : $' + N(a) + ' + ' + N(b) + ' = ' + N(a + b, 2) + '$.' };
      var A = int(20, 60);
      return { q: r`Calcule $` + A + ' - ' + N(b) + '$.', type: 'num', rep: arr(A - b, 2), corr: '$' + A + '{,}00 - ' + N(b) + ' = ' + N(A - b, 2) + '$.' };
    },
    '6e-multiplication': function () {
      if (Math.random() < 0.4) { var x = int(11, 999) / 100, p = pick([10, 100, 1000]); return { q: r`Calcule $` + N(x) + r` \times ` + p + '$.', type: 'num', rep: arr(x * p, 3), corr: 'La virgule se déplace de ' + (String(p).length - 1) + ' rang(s) vers la droite : $' + N(x * p, 3) + '$.' }; }
      var a = int(11, 99) / 10, b = int(11, 99) / 10;
      return { q: r`Calcule $` + N(a) + r` \times ` + N(b) + '$.', type: 'num', rep: arr(a * b, 2), corr: 'On multiplie sans les virgules : $' + Math.round(a * 10) + r` \times ` + Math.round(b * 10) + ' = ' + Math.round(a * b * 100) + '$, puis $2$ décimales : $' + N(a * b, 2) + '$.' };
    },
    '6e-division': function () {
      var b = int(3, 12), q = int(10, 90), rr = int(0, b - 1), a = b * q + rr;
      return { q: r`Quel est le reste de la division euclidienne de $` + a + '$ par $' + b + '$ ?', type: 'num', rep: rr, corr: '$' + a + ' = ' + b + r` \times ` + q + ' + ' + rr + '$ avec $' + rr + r` \lt ` + b + '$ : le reste est $' + rr + '$.' };
    },
    '6e-fractions': function () {
      var b = int(2, 9), a = int(1, b - 1), k = int(2, 9);
      return { q: r`Complète : $\dfrac{` + a + '}{' + b + r`} = \dfrac{\ldots}{` + b * k + '}$.', type: 'num', rep: a * k, corr: 'On passe de $' + b + '$ à $' + b * k + r`$ en multipliant par $` + k + '$, donc le numérateur devient $' + a + r` \times ` + k + ' = ' + a * k + '$.' };
    },
    '6e-fraction-quantite': function () {
      var b = pick([2, 3, 4, 5, 6, 8, 10]), a = int(1, b - 1), Q = b * int(3, 15);
      return { q: r`Calcule les $\dfrac{` + a + '}{' + b + '}$ de $' + Q + '$.', type: 'num', rep: Q / b * a, corr: '$' + Q + r` \div ` + b + ' = ' + Q / b + '$, puis $' + Q / b + r` \times ` + a + ' = ' + Q / b * a + '$.' };
    },
    '6e-proportionnalite': function () {
      var p = pick([1.5, 2, 2.5, 3, 4, 1.2, 0.8]), q1 = int(2, 6), q2; do { q2 = int(3, 12); } while (q2 === q1);
      return { q: '$' + q1 + '$ kg de fruits coûtent $' + N(q1 * p, 2) + '$ €. Combien coûtent $' + q2 + '$ kg ?', type: 'num', rep: arr(q2 * p, 2), unite: '€', corr: '$1$ kg coûte $' + N(q1 * p, 2) + r` \div ` + q1 + ' = ' + N(p) + '$ €, donc $' + q2 + '$ kg coûtent $' + N(q2 * p, 2) + '$ €.' };
    },
    '6e-droites-cercles': function () {
      var d = int(5, 40) / (Math.random() < 0.5 ? 1 : 2);
      return { q: 'Un cercle a un diamètre de $' + N(d) + '$ cm. Quel est son rayon ?', type: 'num', rep: d / 2, unite: 'cm', corr: '$r = d \\div 2 = ' + N(d / 2) + '$ cm.' };
    },
    '6e-angles': function () {
      if (Math.random() < 0.5) { var a = int(15, 165); return { q: 'Un angle plat est partagé en deux angles. L\'un mesure $' + a + '°$. Combien mesure l\'autre ?', type: 'num', rep: 180 - a, unite: '°', corr: '$180° - ' + a + '° = ' + (180 - a) + '°$.' }; }
      var h = int(1, 6);
      return { q: 'Quel angle forment les aiguilles d\'une horloge à $' + h + '$ h pile ?', type: 'num', rep: 30 * h, unite: '°', corr: 'Une heure correspond à $360° \\div 12 = 30°$, donc $' + h + r` \times 30° = ` + 30 * h + '°$.' };
    },
    '6e-perimetres-aires': function () {
      var L = int(4, 20), l = int(2, L - 1);
      if (Math.random() < 0.5) return { q: 'Calcule le périmètre d\'un rectangle de $' + L + '$ cm sur $' + l + '$ cm.', type: 'num', rep: 2 * (L + l), unite: 'cm', corr: '$2 \\times (' + L + ' + ' + l + ') = ' + 2 * (L + l) + '$ cm.' };
      return { q: 'Calcule l\'aire d\'un triangle rectangle dont les côtés de l\'angle droit mesurent $' + L + '$ cm et $' + l + '$ cm.', type: 'num', rep: L * l / 2, unite: 'cm²', corr: r`$\dfrac{` + L + r` \times ` + l + '}{2} = ' + N(L * l / 2) + '$ cm².' };
    },
    '6e-symetrie': function () {
      var f = pick([['un carré', 4], ['un rectangle (non carré)', 2], ['un triangle équilatéral', 3], ['un losange (non carré)', 2], ['un triangle isocèle (non équilatéral)', 1], ['un hexagone régulier', 6], ['un pentagone régulier', 5]]);
      return { q: 'Combien d\'axes de symétrie possède ' + f[0] + ' ?', type: 'num', rep: f[1], corr: f[0].charAt(0).toUpperCase() + f[0].slice(1) + ' possède $' + f[1] + '$ axe' + (f[1] > 1 ? 's' : '') + ' de symétrie.' };
    },
    '6e-donnees': function () {
      var T = pick([20, 25, 40, 50]), a = int(2, T / 2), b = int(1, T - a - 1);
      return { q: 'Dans un club de $' + T + '$ membres, $' + a + '$ font du tennis, $' + b + '$ du judo et les autres de la natation. Quelle est la fréquence des membres qui font du tennis (en décimal) ?', type: 'num', rep: a / T, corr: r`$\dfrac{` + a + '}{' + T + '} = ' + N(a / T) + '$.' };
    },

    /* ===================== 5e ===================== */
    '5e-priorites': function () {
      var a = int(2, 9), b = int(2, 9), c = int(2, 9), d = int(1, 9), t = int(0, 2), e, v;
      if (t === 0) { e = a + ' + ' + b + r` \times ` + c + ' - ' + d; v = a + b * c - d; }
      else if (t === 1) { e = '(' + a + ' + ' + b + r`) \times ` + c + ' - ' + d; v = (a + b) * c - d; }
      else { e = a * c + ' - ' + c + r` \times (` + b + ' - ' + Math.min(b, d) + ')'; v = a * c - c * (b - Math.min(b, d)); }
      return { q: 'Calcule $' + e + '$.', type: 'num', rep: v, corr: 'Parenthèses d\'abord, puis multiplications, puis additions et soustractions de gauche à droite : $' + e + ' = ' + v + '$.' };
    },
    '5e-relatifs': function () {
      var a = -int(1, 15), b = int(1, 15);
      return { q: 'Sur une droite graduée, $A$ a pour abscisse $' + a + '$ et $B$ pour abscisse $' + b + '$. Calcule la distance $AB$.', type: 'num', rep: b - a, corr: '$AB = ' + b + ' - (' + a + ') = ' + (b - a) + '$.' };
    },
    '5e-relatifs-addition': function () {
      var a = nz(-20, 20), b = nz(-20, 20);
      if (Math.random() < 0.5) return { q: 'Calcule $' + P(a) + ' + ' + P(b) + '$.', type: 'num', rep: a + b, corr: '$' + P(a) + ' + ' + P(b) + ' = ' + (a + b) + '$.' };
      return { q: 'Calcule $' + P(a) + ' - ' + P(b) + '$.', type: 'num', rep: a - b, corr: 'Soustraire, c\'est ajouter l\'opposé : $' + P(a) + ' + ' + P(-b) + ' = ' + (a - b) + '$.' };
    },
    '5e-fractions': function () {
      var b = int(2, 6), k = int(2, 4), a = int(1, 7), c = int(1, 9);
      return { q: r`Calcule $\dfrac{` + a + '}{' + b + r`} + \dfrac{` + c + '}{' + b * k + '}$.', type: 'num', rep: a / b + c / (b * k), tol: 0.005, corr: r`$\dfrac{` + a + '}{' + b + r`} = \dfrac{` + a * k + '}{' + b * k + r`}$, donc la somme vaut $\dfrac{` + (a * k + c) + '}{' + b * k + '} = ' + F(a * k + c, b * k) + '$.' };
    },
    '5e-calcul-litteral': function () {
      var a = int(2, 9), b = nz(-9, 9), x = int(-5, 6);
      return { q: 'Calcule $' + a + 'x^2 ' + T(b, 'x') + '$ pour $x = ' + x + '$.', type: 'num', rep: a * x * x + b * x, corr: '$' + a + r` \times ` + P(x) + '^2 ' + S(b) + r` \times ` + P(x) + ' = ' + a * x * x + ' ' + S(b * x) + ' = ' + (a * x * x + b * x) + '$.' };
    },
    '5e-pourcentages': function () {
      var t = pick([10, 15, 20, 25, 30, 40, 50, 75]), Q = 20 * int(2, 25);
      return { q: 'Calcule $' + t + r`\,\%$ de $` + Q + '$.', type: 'num', rep: t * Q / 100, corr: r`$\dfrac{` + t + r`}{100} \times ` + Q + ' = ' + N(t * Q / 100) + '$.' };
    },
    '5e-triangles': function () {
      var a = int(3, 15), b = int(3, 15);
      return { q: 'Dans un triangle, $AB = ' + a + '$ cm et $BC = ' + b + '$ cm. Quelle est la plus grande valeur entière possible de $AC$ (en cm) ?', type: 'num', rep: a + b - 1, corr: r`Inégalité triangulaire : $AC \lt ` + a + ' + ' + b + ' = ' + (a + b) + '$, donc au plus $' + (a + b - 1) + '$ cm.' };
    },
    '5e-angles-triangle': function () {
      var a = int(20, 100), b = int(15, 160 - a);
      return { q: 'Dans un triangle, deux angles mesurent $' + a + '°$ et $' + b + '°$. Combien mesure le troisième ?', type: 'num', rep: 180 - a - b, unite: '°', corr: '$180 - ' + a + ' - ' + b + ' = ' + (180 - a - b) + '°$.' };
    },
    '5e-parallelogramme': function () {
      var a = int(25, 155);
      return { q: r`$ABCD$ est un parallélogramme et $\widehat{A} = ` + a + r`°$. Combien mesure $\widehat{B}$ ?`, type: 'num', rep: 180 - a, unite: '°', corr: 'Deux angles consécutifs ont une somme de $180°$ : $180 - ' + a + ' = ' + (180 - a) + '°$.' };
    },
    '5e-symetrie-centrale': function () {
      var x = nz(-9, 9), y = nz(-9, 9);
      return { q: 'Quelle est l\'abscisse du symétrique de $A(' + x + r`\,;` + y + ')$ par rapport à l\'origine ?', type: 'num', rep: -x, corr: 'Le symétrique de $(x\\,;y)$ par rapport à l\'origine est $(-x\\,;-y)$, ici $(' + (-x) + r`\,;` + (-y) + ')$.' };
    },
    '5e-aires': function () {
      if (Math.random() < 0.5) { var b = int(3, 20), h = int(2, 15); return { q: 'Calcule l\'aire d\'un triangle de base $' + b + '$ cm et de hauteur $' + h + '$ cm.', type: 'num', rep: b * h / 2, unite: 'cm²', corr: r`$\dfrac{` + b + r` \times ` + h + '}{2} = ' + N(b * h / 2) + '$ cm².' }; }
      var rr = int(2, 12);
      return { q: 'Calcule l\'aire d\'un disque de rayon $' + rr + '$ cm, arrondie au centième.', type: 'num', rep: Math.PI * rr * rr, tol: 0.006, unite: 'cm²', corr: r`$\pi \times ` + rr + '^2 = ' + rr * rr + r`\pi \approx ` + N(arr(Math.PI * rr * rr, 2)) + '$ cm².' };
    },
    '5e-probabilites': function () {
      var T = pick([10, 20, 25, 50]), a = int(1, T / 2), b = T - a;
      return { q: 'Une urne contient $' + a + '$ boules rouges et $' + b + '$ boules bleues. On en tire une au hasard. Quelle est la probabilité qu\'elle soit rouge (en décimal) ?', type: 'num', rep: a / T, corr: r`$\dfrac{` + a + '}{' + T + '} = ' + N(a / T) + '$.' };
    },

    /* ===================== 4e ===================== */
    '4e-relatifs-produit': function () {
      var a = nz(-12, 12), b = nz(-12, 12);
      if (Math.random() < 0.5) return { q: 'Calcule $' + P(a) + r` \times ` + P(b) + '$.', type: 'num', rep: a * b, corr: (a * b > 0 ? 'Même signe : positif' : 'Signes contraires : négatif') + ', $' + P(a) + r` \times ` + P(b) + ' = ' + a * b + '$.' };
      return { q: 'Calcule $' + P(a * b) + r` \div ` + P(b) + '$.', type: 'num', rep: a, corr: '$' + P(a * b) + r` \div ` + P(b) + ' = ' + a + '$ (règle des signes).' };
    },
    '4e-fractions-produit': function () {
      var a = int(1, 9), b = int(2, 9), c = int(1, 9), d = int(2, 9);
      if (Math.random() < 0.5) return { q: r`Calcule $\dfrac{` + a + '}{' + b + r`} \times \dfrac{` + c + '}{' + d + '}$.', type: 'num', rep: a * c / (b * d), tol: 0.005, corr: r`$\dfrac{` + a + r` \times ` + c + '}{' + b + r` \times ` + d + '} = ' + F(a * c, b * d) + '$.' };
      return { q: r`Calcule $\dfrac{` + a + '}{' + b + r`} \div \dfrac{` + c + '}{' + d + '}$.', type: 'num', rep: a * d / (b * c), tol: 0.005, corr: r`On multiplie par l'inverse : $\dfrac{` + a + '}{' + b + r`} \times \dfrac{` + d + '}{' + c + '} = ' + F(a * d, b * c) + '$.' };
    },
    '4e-puissances': function () {
      var m = nz(-6, 8), n = nz(-6, 8);
      if (Math.random() < 0.5) return { q: r`On écrit $10^{` + m + r`} \times 10^{` + n + '}$ sous la forme $10^p$. Combien vaut $p$ ?', type: 'num', rep: m + n, corr: '$10^{' + m + '+' + P(n) + '} = 10^{' + (m + n) + '}$.' };
      var a = int(2, 5), e = int(2, a === 2 ? 8 : 4);
      return { q: 'Calcule $' + a + '^{' + e + '}$.', type: 'num', rep: Math.pow(a, e), corr: '$' + a + '^{' + e + '} = ' + Math.pow(a, e) + '$.' };
    },
    '4e-nombres-premiers': function () {
      var a = int(1, 5), b = int(0, 3), c = int(0, 2), n = Math.pow(2, a) * Math.pow(3, b) * Math.pow(5, c);
      return { q: 'On décompose $' + n + r` = 2^a \times 3^b \times 5^c$. Combien vaut $a$ ?`, type: 'num', rep: a, corr: '$' + n + ' = 2^{' + a + r`} \times 3^{` + b + r`} \times 5^{` + c + '}$, donc $a = ' + a + '$.' };
    },
    '4e-developper': function () {
      var a = nz(1, 5), b = nz(-9, 9), c = nz(1, 5), d = nz(-9, 9);
      return { q: 'On développe $(' + (a === 1 ? '' : a) + 'x ' + S(b) + ')(' + (c === 1 ? '' : c) + 'x ' + S(d) + ')$ sous la forme $ax^2 + bx + c$. Combien vaut $b$ ?', type: 'num', rep: a * d + b * c, corr: 'Double distributivité : $' + a * c + 'x^2 ' + S(a * d) + 'x ' + S(b * c) + 'x ' + S(b * d) + ' = ' + a * c + 'x^2 ' + S(a * d + b * c) + 'x ' + S(b * d) + '$, donc $b = ' + (a * d + b * c) + '$.' };
    },
    '4e-equations': function () {
      var x = nz(-9, 9), a = int(2, 9), c; do { c = int(1, 8); } while (c === a);
      var b = nz(-15, 15), d = a * x + b - c * x;
      return { q: 'Résous $' + a + 'x ' + S(b) + ' = ' + M(c, 'x') + ' ' + S(d) + '$.', type: 'num', rep: x, corr: '$' + a + 'x - ' + c + 'x = ' + d + ' - ' + P(b) + '$ donc $' + (a - c) + 'x = ' + (d - b) + '$ et $x = ' + x + '$.' };
    },
    '4e-pythagore': function () {
      var t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]), k = t[0] === 3 ? int(1, 5) : 1;
      var a = t[0] * k, b = t[1] * k, c = t[2] * k;
      if (Math.random() < 0.5) return { q: '$ABC$ est rectangle en $A$ avec $AB = ' + a + '$ et $AC = ' + b + '$. Calcule $BC$.', type: 'num', rep: c, corr: '$BC^2 = ' + a + '^2 + ' + b + '^2 = ' + c * c + '$, donc $BC = ' + c + '$.' };
      return { q: '$ABC$ est rectangle en $A$ avec $BC = ' + c + '$ et $AB = ' + a + '$. Calcule $AC$.', type: 'num', rep: b, corr: '$AC^2 = ' + c + '^2 - ' + a + '^2 = ' + b * b + '$, donc $AC = ' + b + '$.' };
    },
    '4e-thales': function () {
      var p = int(1, 4), q = int(p + 1, 7), m = int(1, 4), n = int(2, 6);
      return { q: r`$(MN) \parallel (BC)$, $AM = ` + p * m + '$, $AB = ' + q * m + '$ et $BC = ' + q * n + '$. Calcule $MN$.', type: 'num', rep: p * n, corr: r`$\dfrac{AM}{AB} = \dfrac{MN}{BC}$ donc $MN = \dfrac{` + p * m + r` \times ` + q * n + '}{' + q * m + '} = ' + p * n + '$.' };
    },
    '4e-vitesse': function () {
      var v = pick([30, 45, 60, 72, 80, 90, 100, 120]), mn = pick([15, 20, 30, 40, 45, 90]);
      return { q: 'Un véhicule roule à $' + v + '$ km/h pendant $' + mn + '$ min. Quelle distance parcourt-il (en km) ?', type: 'num', rep: v * mn / 60, unite: 'km', corr: '$' + mn + r`$ min $= \dfrac{` + mn + '}{60}$ h, donc $d = ' + v + r` \times \dfrac{` + mn + '}{60} = ' + N(v * mn / 60) + '$ km.' };
    },
    '4e-statistiques': function () {
      var v = [int(5, 18), int(5, 18), int(5, 18), int(5, 18)], s = v[0] + v[1] + v[2] + v[3];
      if (Math.random() < 0.5) return { q: 'Calcule la moyenne de la série : $' + v.join(r`\ ;\ `) + '$.', type: 'num', rep: s / 4, corr: r`$\dfrac{` + s + '}{4} = ' + N(s / 4) + '$.' };
      var w = v.concat([int(5, 18)]), t = w.slice().sort(function (x, y) { return x - y; });
      return { q: 'Quelle est la médiane de la série : $' + w.join(r`\ ;\ `) + '$ ?', type: 'num', rep: t[2], corr: 'Rangée : $' + t.join(r`\ ;\ `) + '$. La valeur du milieu est $' + t[2] + '$.' };
    },
    '4e-probabilites': function () {
      var p = int(5, 95) / 100;
      return { q: '$P(A) = ' + N(p) + '$. Quelle est la probabilité de l\'événement contraire de $A$ ?', type: 'num', rep: arr(1 - p, 2), corr: '$1 - ' + N(p) + ' = ' + N(1 - p, 2) + '$.' };
    },
    '4e-volumes': function () {
      var c = int(2, 12), h = 3 * int(1, 8);
      return { q: 'Calcule le volume d\'une pyramide à base carrée de côté $' + c + '$ cm et de hauteur $' + h + '$ cm.', type: 'num', rep: c * c * h / 3, unite: 'cm³', corr: r`$V = \dfrac{` + c + r`^2 \times ` + h + '}{3} = ' + c * c * h / 3 + '$ cm³.' };
    },

    /* ===================== 3e ===================== */
    '3e-arithmetique': function () {
      var g = int(2, 15), m = int(2, 12), n; do { n = int(2, 12); } while (pgcd(m, n) !== 1 || n === m);
      return { q: 'Calcule le PGCD de $' + g * m + '$ et $' + g * n + '$.', type: 'num', rep: g, corr: '$' + g * m + ' = ' + g + r` \times ` + m + '$ et $' + g * n + ' = ' + g + r` \times ` + n + '$ avec $' + m + '$ et $' + n + '$ premiers entre eux : le PGCD vaut $' + g + '$.' };
    },
    '3e-identites': function () {
      var a = nz(-9, 9);
      if (Math.random() < 0.5) return { q: '$(x ' + S(a) + ')^2 = x^2 + px + q$. Combien vaut $p$ ?', type: 'num', rep: 2 * a, corr: '$(x ' + S(a) + ')^2 = x^2 ' + S(2 * a) + 'x + ' + a * a + '$, donc $p = ' + 2 * a + '$.' };
      var n = pick([99, 101, 102, 98, 49, 51, 999]);
      return { q: 'Calcule $' + n + '^2$ avec une identité remarquable.', type: 'num', rep: n * n, corr: '$' + n + '^2 = ' + n * n + '$ (ex. $(100 - 1)^2 = 10\\,000 - 200 + 1$).' };
    },
    '3e-equation-produit': function () {
      var a = nz(-9, 9), b = nz(-9, 9);
      return { q: 'Résous $(x ' + S(-a) + ')(x ' + S(-b) + ') = 0$.', type: 'liste', rep: a === b ? [a] : [a, b], corr: 'Un produit est nul si l\'un des facteurs est nul : $x = ' + a + '$ ou $x = ' + b + '$.' };
    },
    '3e-inequations': function () {
      var a = int(2, 7), b = int(-10, 10), x0 = int(-5, 8), c = a * x0 + b;
      return { q: 'Quel est le plus petit entier $x$ tel que $' + a + 'x ' + S(b) + r` \gt ` + c + '$ ?', type: 'num', rep: x0 + 1, corr: '$' + a + r`x \gt ` + (c - b) + r` \iff x \gt ` + x0 + '$ : le plus petit entier est $' + (x0 + 1) + '$.' };
    },
    '3e-fonctions': function () {
      var a = nz(-5, 5), b = nz(-9, 9), x = nz(-4, 4);
      return { q: 'Soit $f(x) = x^2 ' + T(a, 'x') + Cst(b) + '$. Calcule $f(' + x + ')$.', type: 'num', rep: x * x + a * x + b, corr: '$f(' + x + ') = ' + P(x) + '^2 ' + S(a) + r` \times ` + P(x) + ' ' + S(b) + ' = ' + (x * x + a * x + b) + '$.' };
    },
    '3e-affines': function () {
      var a = nz(-5, 5), b = nz(-9, 9), x1 = int(-3, 2), x2 = x1 + int(1, 4);
      return { q: '$f$ est affine, $f(' + x1 + ') = ' + (a * x1 + b) + '$ et $f(' + x2 + ') = ' + (a * x2 + b) + '$. Quel est son coefficient directeur ?', type: 'num', rep: a, corr: r`$a = \dfrac{` + (a * x2 + b) + ' - ' + P(a * x1 + b) + '}{' + x2 + ' - ' + P(x1) + '} = ' + a + '$.' };
    },
    '3e-evolutions': function () {
      var t = pick([10, 20, 25, 30, 50]), s = pick([10, 20, 25, 40]), cm = (1 + t / 100) * (1 - s / 100);
      return { q: 'Un prix augmente de $' + t + r`\,\%$ puis baisse de $` + s + r`\,\%$. Quel est le coefficient multiplicateur global ?`, type: 'num', rep: arr(cm, 4), corr: '$' + N(1 + t / 100) + r` \times ` + N(1 - s / 100) + ' = ' + N(cm, 4) + '$.' };
    },
    '3e-thales': function () {
      var k = int(2, 5), AB = int(2, 8), AC = int(2, 9), AM = AB * k;
      return { q: r`Les droites $(BM)$ et $(CN)$ se coupent en $A$, $(BC) \parallel (MN)$, $AB = ` + AB + '$, $AC = ' + AC + '$ et $AM = ' + AM + '$. Calcule $AN$.', type: 'num', rep: AC * k, corr: r`$\dfrac{AN}{AC} = \dfrac{AM}{AB}$, donc $AN = \dfrac{` + AC + r` \times ` + AM + '}{' + AB + '} = ' + AC * k + '$.' };
    },
    '3e-trigonometrie': function () {
      var B = int(15, 75), h = int(4, 20), t = pick(['sin', 'cos']);
      var v = t === 'sin' ? h * Math.sin(B * Math.PI / 180) : h * Math.cos(B * Math.PI / 180);
      return { q: r`$ABC$ est rectangle en $A$, $\widehat{B} = ` + B + '°$ et $BC = ' + h + '$ cm. Calcule ' + (t === 'sin' ? '$AC$' : '$AB$') + ', arrondi au dixième.', type: 'num', rep: v, tol: 0.06, unite: 'cm', corr: (t === 'sin' ? r`$\sin\widehat B = \dfrac{AC}{BC}$ donc $AC = ` : r`$\cos\widehat B = \dfrac{AB}{BC}$ donc $AB = `) + h + ' \\' + t + ' ' + B + r`° \approx ` + N(arr(v, 1)) + '$ cm.' };
    },
    '3e-agrandissement': function () {
      var k = pick([2, 3, 0.5, 1.5, 2.5, 4]);
      if (Math.random() < 0.5) return { q: 'Dans un agrandissement ou une réduction de rapport $' + N(k) + '$, par combien les aires sont-elles multipliées ?', type: 'num', rep: k * k, corr: 'Par $k^2 = ' + N(k * k) + '$.' };
      var V = 8 * int(5, 60);
      return { q: 'Un solide de $' + V + '$ cm³ subit une transformation de rapport $' + N(k) + '$. Quel est son nouveau volume ?', type: 'num', rep: V * k * k * k, unite: 'cm³', corr: 'Les volumes sont multipliés par $k^3 = ' + N(k * k * k) + '$ : $' + N(V * k * k * k) + '$ cm³.' };
    },
    '3e-probabilites': function () {
      var a = int(1, 5), b = int(1, 5), T = a + b;
      return { q: 'Une urne contient ' + pl(a, 'boule rouge') + ' et ' + pl(b, 'boule bleue') + '. On tire deux fois une boule avec remise. Probabilité d\'obtenir deux rouges (décimal arrondi au millième ou fraction) ?', type: 'num', rep: (a / T) * (a / T), tol: 0.0006, corr: r`$\dfrac{` + a + '}{' + T + r`} \times \dfrac{` + a + '}{' + T + '} = ' + F(a * a, T * T) + '$.' };
    },
    '3e-sphere': function () {
      var rr = int(1, 9);
      return { q: 'Calcule le volume d\'une boule de rayon $' + rr + '$ cm, arrondi à l\'unité.', type: 'num', rep: 4 / 3 * Math.PI * rr * rr * rr, tol: 0.6, unite: 'cm³', corr: r`$V = \dfrac43 \pi \times ` + rr + r`^3 \approx ` + Math.round(4 / 3 * Math.PI * rr * rr * rr) + '$ cm³.' };
    },

    /* ===================== 2nde ===================== */
    '2nde-intervalles': function () {
      var a = int(-8, 3) + 0.5, b = int(Math.ceil(a) + 1, 10);
      return { q: 'Combien d\'entiers appartiennent à l\'intervalle $]' + N(a) + r`\,;` + b + ']$ ?', type: 'num', rep: b - Math.ceil(a) + 1, corr: 'Les entiers de $' + Math.ceil(a) + '$ à $' + b + '$ (inclus) : $' + (b - Math.ceil(a) + 1) + '$.' };
    },
    '2nde-racines-puissances': function () {
      var m = pick([2, 3, 5, 6, 7]), a = int(2, 9);
      return { q: r`On écrit $\sqrt{` + a * a * m + r`} = a\sqrt{` + m + '}$. Combien vaut $a$ ?', type: 'num', rep: a, corr: r`$\sqrt{` + a * a * m + r`} = \sqrt{` + a * a + r` \times ` + m + '} = ' + a + r`\sqrt{` + m + '}$.' };
    },
    '2nde-tableaux-signes': function () {
      var a = int(2, 9), b = int(-20, 20), n0 = int(-5, 12), c = a * n0 + b;
      return { q: 'Quel est le plus petit entier $n$ tel que $' + a + 'n ' + S(b) + r` \gt ` + c + '$ ?', type: 'num', rep: n0 + 1, corr: r`$n \gt ` + n0 + '$, donc $n = ' + (n0 + 1) + '$.' };
    },
    '2nde-fonctions': function () {
      var a = nz(-4, 4), b = nz(-9, 9), x = nz(-5, 5);
      return { q: 'Soit $f(x) = ' + M(a, 'x^2') + ' ' + S(b) + '$. Calcule $f(' + x + ')$.', type: 'num', rep: a * x * x + b, corr: '$' + a + r` \times ` + P(x) + '^2 ' + S(b) + ' = ' + (a * x * x + b) + '$.' };
    },
    '2nde-fonctions-reference': function () {
      var k = int(1, 15);
      return { q: 'Résous $x^2 = ' + k * k + '$.', type: 'liste', rep: [k, -k], corr: '$x = ' + k + '$ ou $x = -' + k + '$.' };
    },
    '2nde-variations': function () {
      var a = nz(-6, 6), b = nz(-9, 9), haut = Math.random() < 0.5;
      return { q: 'Quel est le ' + (haut ? 'maximum' : 'minimum') + ' de $f(x) = ' + (haut ? '-' : '') + '(x ' + S(-a) + ')^2 ' + S(b) + '$ sur $\\mathbb R$ ?', type: 'num', rep: b, corr: (haut ? r`$-(x - \ldots)^2 \leq 0$` : r`$(x - \ldots)^2 \geq 0$`) + ', donc l\'' + (haut ? 'extremum' : 'extremum') + ' vaut $' + b + '$, atteint en $x = ' + a + '$.' };
    },
    '2nde-vecteurs': function () {
      var t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]), xa = int(-5, 5), ya = int(-5, 5), sx = pick([1, -1]), sy = pick([1, -1]);
      return { q: 'Dans un repère orthonormé, $A(' + xa + r`\,;` + ya + ')$ et $B(' + (xa + sx * t[0]) + r`\,;` + (ya + sy * t[1]) + ')$. Calcule $AB$.', type: 'num', rep: t[2], corr: r`$AB = \sqrt{` + t[0] + '^2 + ' + t[1] + '^2} = ' + t[2] + '$.' };
    },
    '2nde-colinearite': function () {
      var a = nz(-6, 6), b = nz(-6, 6), m = nz(-4, 4), c = a * m;
      return { q: r`Pour quelle valeur de $k$ les vecteurs $\vec u(` + a + r`\,;` + b + r`)$ et $\vec v(` + c + r`\,;k)$ sont-ils colinéaires ?`, type: 'num', rep: b * m, corr: '$' + a + 'k - ' + P(b) + r` \times ` + P(c) + ' = 0$, donc $k = ' + b * m + '$.' };
    },
    '2nde-droites': function () {
      var m = nz(-5, 5), p = nz(-9, 9), x1 = int(-4, 2), x2 = x1 + int(1, 3);
      return { q: 'La droite passant par $A(' + x1 + r`\,;` + (m * x1 + p) + ')$ et $B(' + x2 + r`\,;` + (m * x2 + p) + ')$ a pour équation $y = mx + p$. Combien vaut $p$ ?', type: 'num', rep: p, corr: '$m = ' + m + '$, puis $' + (m * x1 + p) + ' = ' + m + r` \times ` + P(x1) + ' + p$ donne $p = ' + p + '$.' };
    },
    '2nde-systemes': function () {
      var x = nz(-9, 9), y = nz(-9, 9);
      return { q: r`Résous $\begin{cases} x + y = ` + (x + y) + r` \\ x - y = ` + (x - y) + r` \end{cases}$. Combien vaut $x$ ?`, type: 'num', rep: x, corr: 'En additionnant : $2x = ' + 2 * x + '$, donc $x = ' + x + '$ (et $y = ' + y + '$).' };
    },
    '2nde-evolutions': function () {
      var t = pick([2, 3, 4, 5, 10]), n = int(2, 5), g = (Math.pow(1 + t / 100, n) - 1) * 100;
      return { q: 'Une grandeur augmente de $' + t + r`\,\%$ par an pendant $` + n + r`$ ans. Pourcentage d'augmentation global, arrondi au centième ?`, type: 'num', rep: g, tol: 0.006, unite: '%', corr: '$' + N(1 + t / 100) + '^{' + n + '} \\approx ' + N(arr(1 + g / 100, 4)) + r`$, soit $+` + N(arr(g, 2)) + r`\,\%$.` };
    },
    '2nde-probabilites': function () {
      var a = int(2, 7) / 10, b = int(2, 7) / 10, c = int(1, Math.min(a, b) * 10) / 10;
      return { q: '$P(A) = ' + N(a) + '$, $P(B) = ' + N(b) + r`$ et $P(A \cap B) = ` + N(c) + r`$. Calcule $P(A \cup B)$.`, type: 'num', rep: arr(a + b - c, 2), corr: '$' + N(a) + ' + ' + N(b) + ' - ' + N(c) + ' = ' + N(a + b - c, 2) + '$.' };
    },

    /* ===================== 1re ===================== */
    '1re-second-degre': function () {
      var a = nz(-8, 8), b; do { b = nz(-8, 8); } while (b === a);
      return { q: 'Résous $x^2 ' + T(-(a + b), 'x') + Cst(a * b) + ' = 0$.', type: 'liste', rep: [a, b], corr: r`$\Delta = ` + (a - b) * (a - b) + '$, racines $' + Math.min(a, b) + '$ et $' + Math.max(a, b) + '$ (on vérifie : somme $' + (a + b) + '$, produit $' + a * b + '$).' };
    },
    '1re-signe-trinome': function () {
      var a = int(-6, 2), b = a + int(2, 7);
      return { q: 'Combien d\'entiers $x$ vérifient $-' + L(a) + L(b) + r` \geq 0$ ?`, type: 'num', rep: b - a + 1, corr: 'Le trinôme (coefficient $-1$) est positif entre ses racines $' + a + '$ et $' + b + '$ : $' + (b - a + 1) + '$ entiers.' };
    },
    '1re-suites': function () {
      var u0 = int(-3, 5), q = int(2, 3), rr = nz(-3, 3), u = u0;
      for (var i = 0; i < 3; i++) u = q * u + rr;
      return { q: '$u_0 = ' + u0 + '$ et $u_{n+1} = ' + q + 'u_n ' + S(rr) + '$. Calcule $u_3$.', type: 'num', rep: u, corr: 'On calcule terme à terme : $u_1 = ' + (q * u0 + rr) + '$, $u_2 = ' + (q * (q * u0 + rr) + rr) + '$, $u_3 = ' + u + '$.' };
    },
    '1re-arith-geo': function () {
      if (Math.random() < 0.5) { var u0 = int(-20, 20), rr = nz(-7, 7), n = int(5, 40); return { q: '$(u_n)$ est arithmétique, $u_0 = ' + u0 + '$, raison $' + rr + '$. Calcule $u_{' + n + '}$.', type: 'num', rep: u0 + n * rr, corr: '$u_{' + n + '} = ' + u0 + ' + ' + n + r` \times ` + P(rr) + ' = ' + (u0 + n * rr) + '$.' }; }
      var q = int(2, 3), m = int(5, 9);
      return { q: 'Calcule $1 + ' + q + ' + ' + q + '^2 + \\cdots + ' + q + '^{' + m + '}$.', type: 'num', rep: (Math.pow(q, m + 1) - 1) / (q - 1), corr: r`$\dfrac{` + q + '^{' + (m + 1) + '} - 1}{' + q + ' - 1} = ' + (Math.pow(q, m + 1) - 1) / (q - 1) + '$.' };
    },
    '1re-nombre-derive': function () {
      var a = nz(-5, 5), x = nz(-5, 5);
      return { q: 'Pour $f(x) = ' + M(a, 'x^2') + '$, calcule $f\'(' + x + ')$.', type: 'num', rep: 2 * a * x, corr: '$f\'(x) = ' + 2 * a + 'x$, donc $f\'(' + x + ') = ' + 2 * a * x + '$.' };
    },
    '1re-derivees': function () {
      var a = nz(-4, 4), b = nz(-5, 5), c = nz(-9, 9), x = nz(-3, 3);
      return { q: '$f(x) = ' + M(a, 'x^3') + ' ' + T(b, 'x^2') + ' ' + T(c, 'x') + '$. Calcule $f\'(' + x + ')$.', type: 'num', rep: 3 * a * x * x + 2 * b * x + c, corr: '$f\'(x) = ' + 3 * a + 'x^2 ' + S(2 * b) + 'x ' + S(c) + '$, donc $f\'(' + x + ') = ' + (3 * a * x * x + 2 * b * x + c) + '$.' };
    },
    '1re-variations': function () {
      var h = nz(-6, 6), c = nz(-9, 9), b = -2 * h;
      return { q: 'Quel est le minimum de $f(x) = x^2 ' + S(b) + 'x ' + S(c) + '$ sur $\\mathbb R$ ?', type: 'num', rep: c - h * h, corr: '$f\'(x) = 2x ' + S(b) + '$ s\'annule en $' + h + '$ ; minimum $f(' + h + ') = ' + (c - h * h) + '$.' };
    },
    '1re-exponentielle': function () {
      var a = nz(-6, 6), b = nz(-6, 6), c = nz(-6, 6);
      return { q: r`On écrit $\dfrac{e^{` + a + r`} \times e^{` + b + '}}{e^{' + c + '}} = e^p$. Combien vaut $p$ ?', type: 'num', rep: a + b - c, corr: '$p = ' + a + ' + ' + P(b) + ' - ' + P(c) + ' = ' + (a + b - c) + '$.' };
    },
    '1re-trigonometrie': function () {
      var v = pick([[r`\dfrac{\pi}{6}`, Math.PI / 6], [r`\dfrac{\pi}{4}`, Math.PI / 4], [r`\dfrac{\pi}{3}`, Math.PI / 3], [r`\dfrac{2\pi}{3}`, 2 * Math.PI / 3], [r`\dfrac{3\pi}{4}`, 3 * Math.PI / 4], [r`\dfrac{5\pi}{6}`, 5 * Math.PI / 6], [r`\pi`, Math.PI], [r`-\dfrac{\pi}{3}`, -Math.PI / 3]]), f = pick(['cos', 'sin']);
      var val = f === 'cos' ? Math.cos(v[1]) : Math.sin(v[1]);
      if (Math.abs(val) < 1e-12) val = 0;
      return { q: 'Combien vaut $\\' + f + r`\left(` + v[0] + r`\right)$ ? (valeur exacte ou arrondie au centième)`, type: 'num', rep: val, tol: 0.005, corr: 'Valeur remarquable du cercle trigonométrique : $\\' + f + r`\left(` + v[0] + r`\right) \approx ` + N(arr(val, 4)) + '$.' };
    },
    '1re-produit-scalaire': function () {
      var a = nz(-6, 6), b = nz(-6, 6), c = nz(-6, 6), d = nz(-6, 6);
      return { q: r`Calcule $\vec u \cdot \vec v$ pour $\vec u(` + a + r`\,;` + b + r`)$ et $\vec v(` + c + r`\,;` + d + ')$.', type: 'num', rep: a * c + b * d, corr: '$' + a + r` \times ` + P(c) + ' + ' + P(b) + r` \times ` + P(d) + ' = ' + (a * c + b * d) + '$.' };
    },
    '1re-proba-conditionnelles': function () {
      var pa = int(2, 8) / 10, pb = int(1, 9) / 10, pc = int(1, 9) / 10;
      return { q: '$P(A) = ' + N(pa) + '$, $P_A(B) = ' + N(pb) + r`$ et $P_{\overline A}(B) = ` + N(pc) + '$. Calcule $P(B)$.', type: 'num', rep: arr(pa * pb + (1 - pa) * pc, 4), corr: '$' + N(pa) + r` \times ` + N(pb) + ' + ' + N(1 - pa) + r` \times ` + N(pc) + ' = ' + N(pa * pb + (1 - pa) * pc, 4) + '$.' };
    },
    '1re-variables-aleatoires': function () {
      var g = int(5, 20), p = int(1, 4) / 10, l = int(1, 5);
      return { q: 'On gagne $' + g + '$ € avec probabilité $' + N(p) + '$, sinon on perd $' + l + '$ €. Calcule l\'espérance du gain.', type: 'num', rep: arr(g * p - l * (1 - p), 4), unite: '€', corr: '$E = ' + g + r` \times ` + N(p) + ' - ' + l + r` \times ` + N(1 - p) + ' = ' + N(g * p - l * (1 - p), 4) + '$ €.' };
    },

    /* ===================== Terminale ===================== */
    'tle-recurrence': function () {
      var q = int(2, 3), n = int(3, 9), v = Math.pow(q, n) - 1;
      return { q: '$u_0 = 0$ et $u_{n+1} = ' + q + 'u_n + ' + (q - 1) + '$. On montre par récurrence que $u_n = ' + q + '^n - 1$. Calcule $u_{' + n + '}$.', type: 'num', rep: v, corr: '$u_{' + n + '} = ' + q + '^{' + n + '} - 1 = ' + v + '$.' };
    },
    'tle-limites-suites': function () {
      var a = nz(-9, 9), b = int(1, 9), c = nz(-9, 9), d = nz(-9, 9);
      return { q: r`Calcule $\displaystyle\lim_{n \to +\infty} \frac{` + M(a, 'n^2') + ' ' + T(c, 'n') + '}{' + M(b, 'n^2') + ' ' + S(d) + '}$ (fraction ou décimal).', type: 'num', rep: a / b, tol: 0.005, corr: 'On factorise par $n^2$ : la limite vaut $' + F(a, b) + '$.' };
    },
    'tle-limites-fonctions': function () {
      var a = nz(-9, 9), b = nz(-9, 9), c = int(1, 9), d = nz(-9, 9);
      return { q: 'La courbe de $f(x) = \\dfrac{' + M(a, 'x') + ' ' + S(b) + '}{' + M(c, 'x') + ' ' + S(d) + '}$ admet une asymptote horizontale $y = k$. Combien vaut $k$ ? (fraction ou décimal)', type: 'num', rep: a / c, tol: 0.005, corr: 'En $\\pm\\infty$, $f(x) \\to ' + F(a, c) + '$.' };
    },
    'tle-continuite': function () {
      var k = int(2, 30), f = function (x) { return x * x * x + x - k; }, lo = 0, hi = 4;
      for (var i = 0; i < 60; i++) { var m = (lo + hi) / 2; if (f(m) < 0) lo = m; else hi = m; }
      return { q: 'L\'équation $x^3 + x = ' + k + '$ a une unique solution $\\alpha$. Donne une valeur approchée de $\\alpha$ au dixième.', type: 'num', rep: lo, tol: 0.06, corr: '$x \\mapsto x^3 + x$ est continue et strictement croissante, d\'où l\'unicité ; par balayage, $\\alpha \\approx ' + N(arr(lo, 2)) + '$.' };
    },
    'tle-convexite': function () {
      var a = 3 * nz(-4, 4);
      return { q: 'En quelle abscisse la courbe de $f(x) = x^3 ' + S(a) + 'x^2$ a-t-elle un point d\'inflexion ?', type: 'num', rep: -a / 3, corr: '$f\'\'(x) = 6x ' + S(2 * a) + '$ s\'annule et change de signe en $x = ' + (-a / 3) + '$.' };
    },
    'tle-logarithme': function () {
      if (Math.random() < 0.5) { var q = pick([2, 3, 1.5, 1.1]), M0 = pick([100, 500, 1000, 5000]), n = Math.floor(Math.log(M0) / Math.log(q)) + 1; return { q: 'Quel est le plus petit entier $n$ tel que $' + N(q) + '^n \\gt ' + M0 + '$ ?', type: 'num', rep: n, corr: '$n \\gt \\dfrac{\\ln ' + M0 + '}{\\ln ' + N(q) + '} \\approx ' + N(arr(Math.log(M0) / Math.log(q), 2)) + '$, donc $n = ' + n + '$.' }; }
      var k = nz(-9, 9);
      return { q: 'Calcule $\\ln\\left(e^{' + k + '}\\right)$.', type: 'num', rep: k, corr: '$\\ln(e^x) = x$, donc $' + k + '$.' };
    },
    'tle-primitives': function () {
      var a = 3 * int(1, 3), b = 2 * nz(-4, 4), c = nz(-9, 9);
      return { q: '$F$ est la primitive de $f(x) = ' + a + 'x^2 ' + S(b) + 'x$ telle que $F(0) = ' + c + '$. Calcule $F(1)$.', type: 'num', rep: a / 3 + b / 2 + c, corr: '$F(x) = ' + a / 3 + 'x^3 ' + S(b / 2) + 'x^2 ' + S(c) + '$, donc $F(1) = ' + (a / 3 + b / 2 + c) + '$.' };
    },
    'tle-integrales': function () {
      var c = nz(-6, 6), d = nz(-9, 9), a = int(-3, 2), b = a + int(1, 4);
      var I = c / 2 * (b * b - a * a) + d * (b - a);
      return { q: 'Calcule $\\displaystyle\\int_{' + a + '}^{' + b + '} (' + M(c, 'x') + ' ' + S(d) + ')\\,\\mathrm dx$.', type: 'num', rep: I, corr: '$\\left[' + N(c / 2) + 'x^2 ' + S(d) + 'x\\right]_{' + a + '}^{' + b + '} = ' + N(I) + '$.' };
    },
    'tle-denombrement': function () {
      var n = int(5, 14), k = int(2, Math.min(5, n - 1));
      if (Math.random() < 0.5) return { q: 'De combien de façons peut-on choisir $' + k + '$ personnes parmi $' + n + '$ (sans ordre) ?', type: 'num', rep: comb(n, k), corr: '$\\dbinom{' + n + '}{' + k + '} = ' + comb(n, k) + '$.' };
      var A = 1; for (var i = 0; i < k; i++) A *= n - i;
      return { q: 'De combien de façons peut-on attribuer $' + k + '$ places de podium distinctes parmi $' + n + '$ concurrents ?', type: 'num', rep: A, corr: 'L\'ordre compte, sans répétition : $' + Array.from({ length: k }, function (_, i) { return n - i; }).join(r` \times `) + ' = ' + A + '$.' };
    },
    'tle-binomiale': function () {
      var n = int(2, 6), p = int(1, 9) / 10;
      if (Math.random() < 0.5) return { q: '$X \\sim \\mathcal B(' + n + r`\,;` + N(p) + ')$. Calcule $P(X = 0)$ (arrondi au millième).', type: 'num', rep: Math.pow(1 - p, n), tol: 0.0006, corr: '$P(X = 0) = ' + N(1 - p) + '^{' + n + '} \\approx ' + N(arr(Math.pow(1 - p, n), 4)) + '$.' };
      var m = int(10, 100);
      return { q: '$X \\sim \\mathcal B(' + m + r`\,;` + N(p) + ')$. Calcule $V(X)$.', type: 'num', rep: arr(m * p * (1 - p), 4), corr: '$np(1-p) = ' + m + r` \times ` + N(p) + r` \times ` + N(1 - p) + ' = ' + N(m * p * (1 - p), 4) + '$.' };
    },
    'tle-espace': function () {
      var t = pick([[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [2, 10, 11, 15]]), s = function (x) { return pick([1, -1]) * x; };
      return { q: r`Calcule la norme de $\vec u(` + s(t[0]) + r`\,;` + s(t[1]) + r`\,;` + s(t[2]) + ')$.', type: 'num', rep: t[3], corr: '$\\sqrt{' + t[0] * t[0] + ' + ' + t[1] * t[1] + ' + ' + t[2] * t[2] + '} = ' + t[3] + '$.' };
    },
    'tle-trigo': function () {
      var k = pick([-5, -4, -3, -2, 2, 3, 4, 5, 6]), f = pick(['sin', 'cos']), x0 = 0;
      if (f === 'cos') return { q: 'Soit $f(x) = \\cos(' + k + 'x)$. Calcule $f\'\'(0)$.', type: 'num', rep: -k * k, corr: '$f\'(x) = ' + (-k) + '\\sin(' + k + 'x)$ et $f\'\'(x) = ' + (-k * k) + '\\cos(' + k + 'x)$, donc $f\'\'(0) = ' + (-k * k) + '$.' };
      return { q: 'Soit $f(x) = \\sin(' + k + 'x)$. Calcule $f\'(' + x0 + ')$.', type: 'num', rep: k, corr: '$f\'(x) = ' + k + '\\cos(' + k + 'x)$, donc $f\'(0) = ' + k + '$.' };
    },

    /* ===================== MPSI ===================== */
    'mpsi-logique': function () {
      var p = Math.random() < 0.5, q = Math.random() < 0.5, f = pick([
        [r`P \Rightarrow Q`, !p || q], [r`\neg P \vee Q`, !p || q], [r`(P \Rightarrow Q) \wedge \neg Q`, (!p || q) && !q], [r`P \iff Q`, p === q], [r`\neg(P \wedge Q)`, !(p && q)], [r`(P \vee Q) \Rightarrow P`, !(p || q) || p]
      ]);
      var V = function (b) { return b ? 'vraie' : 'fausse'; };
      return qcm('$P$ est ' + V(p) + ' et $Q$ est ' + V(q) + '. L\'assertion $' + f[0] + '$ est :', f[1] ? 'vraie' : 'fausse', [f[1] ? 'fausse' : 'vraie'], 'On évalue avec la table de vérité : $' + f[0] + '$ est ' + V(f[1]) + ' (rappel : $P \\Rightarrow Q$ n\'est fausse que si $P$ vraie et $Q$ fausse).');
    },
    'mpsi-ensembles': function () {
      var p = int(2, 5), n = int(p, 7), t = int(0, 2);
      if (t === 0) return { q: 'Combien y a-t-il d\'applications d\'un ensemble à $' + p + '$ éléments dans un ensemble à $' + n + '$ éléments ?', type: 'num', rep: Math.pow(n, p), corr: '$' + n + '^{' + p + '} = ' + Math.pow(n, p) + '$.' };
      if (t === 1) { var A = 1; for (var i = 0; i < p; i++) A *= n - i; return { q: 'Combien y a-t-il d\'injections d\'un ensemble à $' + p + '$ éléments dans un ensemble à $' + n + '$ éléments ?', type: 'num', rep: A, corr: '$' + Array.from({ length: p }, function (_, i) { return n - i; }).join(r` \times `) + ' = ' + A + '$.' }; }
      return { q: 'Un ensemble $E$ a $' + n + '$ éléments. Combien d\'éléments a $\\mathcal P(E)$ ?', type: 'num', rep: Math.pow(2, n), corr: '$2^{' + n + '} = ' + Math.pow(2, n) + '$.' };
    },
    'mpsi-sommes': function () {
      var n = int(5, 30), t = int(0, 2);
      if (t === 0) return { q: 'Calcule $\\displaystyle\\sum_{k=1}^{' + n + '} k$.', type: 'num', rep: n * (n + 1) / 2, corr: '$\\dfrac{' + n + r` \times ` + (n + 1) + '}{2} = ' + n * (n + 1) / 2 + '$.' };
      if (t === 1) return { q: 'Calcule $\\displaystyle\\sum_{k=1}^{' + n + '} k^2$.', type: 'num', rep: n * (n + 1) * (2 * n + 1) / 6, corr: '$\\dfrac{n(n+1)(2n+1)}{6} = ' + n * (n + 1) * (2 * n + 1) / 6 + '$.' };
      return { q: 'Calcule $\\displaystyle\\sum_{k=1}^{' + n + '} \\frac{1}{k(k+1)}$ (fraction ou décimal).', type: 'num', rep: 1 - 1 / (n + 1), tol: 0.0005, corr: 'Télescopage : $1 - \\dfrac{1}{' + (n + 1) + '} = ' + F(n, n + 1) + '$.' };
    },
    'mpsi-complexes': function () {
      if (Math.random() < 0.5) { var t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]); return { q: 'Calcule $|' + pick([1, -1]) * t[0] + ' ' + S(pick([1, -1]) * t[1]) + 'i|$.', type: 'num', rep: t[2], corr: '$\\sqrt{' + t[0] * t[0] + ' + ' + t[1] * t[1] + '} = ' + t[2] + '$.' }; }
      var k = 2 * int(1, 6);
      return { q: 'Calcule $(1 + i)^{' + k + '}$ (c\'est un réel).', type: 'num', rep: Math.round(Math.pow(2, k / 2) * Math.cos(k * Math.PI / 4)), corr: '$1 + i = \\sqrt2 e^{i\\pi/4}$, donc $(1+i)^{' + k + '} = 2^{' + k / 2 + '} e^{i' + k + '\\pi/4} = ' + Math.round(Math.pow(2, k / 2) * Math.cos(k * Math.PI / 4)) + '$.' };
    },
    'mpsi-fonctions-usuelles': function () {
      var v = pick([[r`\dfrac12`, Math.PI / 6, 'arcsin'], [r`\dfrac{\sqrt2}{2}`, Math.PI / 4, 'arcsin'], [r`\dfrac{\sqrt3}{2}`, Math.PI / 3, 'arcsin'], [r`\dfrac12`, Math.PI / 3, 'arccos'], ['0', Math.PI / 2, 'arccos'], ['-1', Math.PI, 'arccos'], ['1', Math.PI / 4, 'arctan'], [r`\sqrt3`, Math.PI / 3, 'arctan'], ['-1', -Math.PI / 4, 'arctan']]);
      return { q: 'Calcule $\\' + v[2] + r`\left(` + v[0] + r`\right)$ (expression avec π, ou décimal).`, type: 'num', rep: v[1], tol: 0.002, corr: 'Valeur remarquable : $\\' + v[2] + '\\left(' + v[0] + '\\right) \\approx ' + N(arr(v[1], 4)) + '$.' };
    },
    'mpsi-suites': function () {
      var m = int(2, 6), a = m * (m - 1);
      return { q: '$u_0 = 0$ et $u_{n+1} = \\sqrt{' + a + ' + u_n}$. Vers quelle limite converge $(u_n)$ ?', type: 'num', rep: m, corr: 'La suite est croissante et majorée par $' + m + '$ ; sa limite $\\ell \\geq 0$ vérifie $\\ell^2 = ' + a + ' + \\ell$, donc $\\ell = ' + m + '$.' };
    },
    'mpsi-limites-continuite': function () {
      var a = int(2, 7);
      return { q: 'Calcule $\\displaystyle\\lim_{x \\to 0} \\frac{1 - \\cos(' + a + 'x)}{x^2}$ (fraction ou décimal).', type: 'num', rep: a * a / 2, tol: 0.001, corr: '$1 - \\cos u \\sim \\dfrac{u^2}{2}$, donc la limite vaut $\\dfrac{' + a * a + '}{2}$.' };
    },
    'mpsi-derivabilite': function () {
      var a = int(-5, 3), b = a + int(1, 6);
      return { q: 'Pour $f(x) = x^2$ sur $[' + a + r`\,;` + b + ']$, quel réel $c$ donne l\'égalité des accroissements finis ?', type: 'num', rep: (a + b) / 2, corr: '$\\dfrac{f(' + b + ') - f(' + a + ')}{' + b + ' - ' + P(a) + '} = ' + (a + b) + ' = 2c$, donc $c = ' + N((a + b) / 2) + '$.' };
    },
    'mpsi-dl': function () {
      var a = nz(-4, 4);
      return { q: 'Quel est le coefficient de $x^2$ dans le DL à l\'ordre 2 en $0$ de $e^{' + M(a, 'x') + '}$ ? (fraction ou décimal)', type: 'num', rep: a * a / 2, tol: 0.001, corr: '$e^{u} = 1 + u + \\dfrac{u^2}{2} + o(u^2)$ avec $u = ' + a + 'x$ : coefficient $\\dfrac{' + a * a + '}{2}$.' };
    },
    'mpsi-integration': function () {
      var p = int(1, 6);
      return { q: 'Calcule $\\displaystyle\\lim_{n \\to \\infty} \\frac1n \\sum_{k=1}^{n} \\left(\\frac kn\\right)^{' + p + '}$ (fraction ou décimal).', type: 'num', rep: 1 / (p + 1), tol: 0.001, corr: 'Somme de Riemann : $\\displaystyle\\int_0^1 x^{' + p + '}\\,\\mathrm dx = \\dfrac{1}{' + (p + 1) + '}$.' };
    },
    'mpsi-arithmetique': function () {
      var pr = pick([7, 11, 13, 17, 19, 23]), a = int(2, pr - 1), inv = 1;
      while ((a * inv) % pr !== 1) inv++;
      return { q: 'Quel est l\'inverse de $' + a + '$ modulo $' + pr + '$ (entre $1$ et $' + (pr - 1) + '$) ?', type: 'num', rep: inv, corr: '$' + a + r` \times ` + inv + ' = ' + a * inv + ' = ' + Math.floor(a * inv / pr) + r` \times ` + pr + ' + 1$.' };
    },
    'mpsi-polynomes': function () {
      if (Math.random() < 0.5) { var a = int(-3, 3), n = int(2, 7); return { q: 'Quel est le reste de la division euclidienne de $X^{' + n + '}$ par $' + (a === 0 ? 'X' : 'X ' + S(-a)) + '$ ?', type: 'num', rep: Math.pow(a, n), corr: 'Le reste de $P$ par $X - a$ est $P(a) = ' + P(a) + '^{' + n + '} = ' + Math.pow(a, n) + '$.' }; }
      var x1 = nz(-4, 4), x2 = nz(-4, 4), x3 = nz(-4, 4), s = x1 + x2 + x3, s2 = x1 * x2 + x1 * x3 + x2 * x3, pr = x1 * x2 * x3;
      return { q: 'Quelle est la somme des racines de $X^3 ' + T(-s, 'X^2') + ' ' + T(s2, 'X') + Cst(-pr) + '$ ?', type: 'num', rep: s, corr: '$\\sigma_1 = -\\dfrac{a_2}{a_3} = ' + s + '$ (racines $' + x1 + '$, $' + x2 + '$, $' + x3 + '$).' };
    }
  };
  window.GENERATEURS = G;
})();
