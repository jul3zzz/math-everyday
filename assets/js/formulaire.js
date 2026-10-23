/* Math Everyday — formulaire complet de la 6e à la MPSI, avec recherche et filtre par niveau.
   Utilisable comme page (#/formulaire) et dans le tiroir d'outils. Expose window.Formulaire. */
(function () {
  'use strict';
  var r = String.raw;
  /* [niveau, domaine, nom, formule LaTeX] */
  var F = [
    ['6e', 'Géométrie', 'Périmètre du rectangle', r`P = 2(L + \ell)`],
    ['6e', 'Géométrie', 'Aire du rectangle', r`\mathcal A = L \times \ell`],
    ['6e', 'Géométrie', 'Aire du carré', r`\mathcal A = c^2`],
    ['6e', 'Géométrie', 'Aire du triangle rectangle', r`\mathcal A = \dfrac{a \times b}{2}`],
    ['6e', 'Géométrie', 'Périmètre du cercle', r`P = 2\pi r = \pi d`],
    ['6e', 'Géométrie', 'Volume du pavé droit', r`V = L \times \ell \times h`],
    ['6e', 'Nombres', 'Division euclidienne', r`a = b \times q + r,\quad 0 \leq r \lt b`],
    ['6e', 'Fractions', 'Fraction d\'une quantité', r`\dfrac{a}{b} \text{ de } N = \dfrac{a \times N}{b}`],
    ['6e', 'Fractions', 'Fractions égales', r`\dfrac{a}{b} = \dfrac{a \times k}{b \times k}\ (k \neq 0)`],
    ['6e', 'Données', 'Fréquence', r`f = \dfrac{\text{effectif}}{\text{effectif total}}`],
    ['6e', 'Géométrie', 'Unités de durée', r`1\text{ h} = 60\text{ min} = 3\,600\text{ s}`],
    ['5e', 'Calcul', 'Priorités', r`\text{( )} \;\to\; \times\ \div \;\to\; +\ -`],
    ['5e', 'Fractions', 'Somme (même dénominateur)', r`\dfrac{a}{c} + \dfrac{b}{c} = \dfrac{a + b}{c}`],
    ['5e', 'Géométrie', 'Somme des angles d\'un triangle', r`\widehat A + \widehat B + \widehat C = 180°`],
    ['5e', 'Géométrie', 'Inégalité triangulaire', r`AC \leq AB + BC`],
    ['5e', 'Géométrie', 'Aire du triangle', r`\mathcal A = \dfrac{b \times h}{2}`],
    ['5e', 'Géométrie', 'Aire du parallélogramme', r`\mathcal A = b \times h`],
    ['5e', 'Géométrie', 'Aire du disque', r`\mathcal A = \pi r^2`],
    ['5e', 'Géométrie', 'Volume du prisme / cylindre', r`V = \mathcal B \times h \qquad V_{\text{cyl}} = \pi r^2 h`],
    ['5e', 'Proportionnalité', 'Pourcentage', r`t\,\% \text{ de } N = \dfrac{t}{100} \times N`],
    ['5e', 'Probabilités', 'Équiprobabilité', r`P(A) = \dfrac{\text{issues favorables}}{\text{issues possibles}}`],
    ['4e', 'Relatifs', 'Règle des signes', r`(-) \times (-) = (+) \qquad (-) \times (+) = (-)`],
    ['4e', 'Fractions', 'Produit', r`\dfrac{a}{b} \times \dfrac{c}{d} = \dfrac{ac}{bd}`],
    ['4e', 'Fractions', 'Quotient', r`\dfrac{a}{b} \div \dfrac{c}{d} = \dfrac{a}{b} \times \dfrac{d}{c}`],
    ['4e', 'Puissances', 'Règles de calcul', r`a^m a^n = a^{m+n} \quad \dfrac{a^m}{a^n} = a^{m-n} \quad (a^m)^n = a^{mn}`],
    ['4e', 'Puissances', 'Exposants négatifs et nul', r`a^{-n} = \dfrac{1}{a^n} \qquad a^0 = 1`],
    ['4e', 'Calcul littéral', 'Simple distributivité', r`k(a + b) = ka + kb`],
    ['4e', 'Calcul littéral', 'Double distributivité', r`(a + b)(c + d) = ac + ad + bc + bd`],
    ['4e', 'Géométrie', 'Théorème de Pythagore', r`BC^2 = AB^2 + AC^2 \text{ (rectangle en } A)`],
    ['4e', 'Géométrie', 'Thalès dans le triangle', r`\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}`],
    ['4e', 'Géométrie', 'Volume pyramide / cône', r`V = \dfrac{\mathcal B \times h}{3} \qquad V_{\text{cône}} = \dfrac{\pi r^2 h}{3}`],
    ['4e', 'Proportionnalité', 'Vitesse moyenne', r`v = \dfrac{d}{t} \qquad d = v \times t \qquad t = \dfrac{d}{v}`],
    ['4e', 'Statistiques', 'Moyenne', r`\bar x = \dfrac{x_1 + x_2 + \cdots + x_n}{n}`],
    ['4e', 'Probabilités', 'Événement contraire', r`P(\overline A) = 1 - P(A)`],
    ['3e', 'Calcul littéral', 'Identités remarquables', r`(a \pm b)^2 = a^2 \pm 2ab + b^2 \qquad (a - b)(a + b) = a^2 - b^2`],
    ['3e', 'Équations', 'Produit nul', r`A \times B = 0 \iff A = 0 \text{ ou } B = 0`],
    ['3e', 'Équations', 'Équation x² = a', r`x^2 = a\ (a \gt 0) \iff x = \sqrt a \text{ ou } x = -\sqrt a`],
    ['3e', 'Fonctions', 'Fonction affine', r`f(x) = ax + b \qquad a = \dfrac{f(x_2) - f(x_1)}{x_2 - x_1}`],
    ['3e', 'Proportionnalité', 'Coefficient multiplicateur', r`\text{hausse de } t\,\% : \times\left(1 + \tfrac{t}{100}\right) \quad \text{baisse} : \times\left(1 - \tfrac{t}{100}\right)`],
    ['3e', 'Géométrie', 'Trigonométrie', r`\cos = \dfrac{\text{adj}}{\text{hyp}} \quad \sin = \dfrac{\text{opp}}{\text{hyp}} \quad \tan = \dfrac{\text{opp}}{\text{adj}}`],
    ['3e', 'Géométrie', 'Agrandissement de rapport k', r`\text{longueurs} \times k \quad \text{aires} \times k^2 \quad \text{volumes} \times k^3`],
    ['3e', 'Géométrie', 'Sphère et boule', r`\mathcal A = 4\pi r^2 \qquad V = \dfrac43 \pi r^3`],
    ['3e', 'Arithmétique', 'PGCD (Euclide)', r`\text{PGCD}(a, b) = \text{PGCD}(b, r)`],
    ['2nde', 'Nombres', 'Valeur absolue et distance', r`|x - a| \leq r \iff x \in [a - r\,;a + r]`],
    ['2nde', 'Nombres', 'Racines carrées', r`\sqrt{ab} = \sqrt a \sqrt b \qquad \sqrt{\dfrac ab} = \dfrac{\sqrt a}{\sqrt b}`],
    ['2nde', 'Vecteurs', 'Coordonnées d\'un vecteur', r`\overrightarrow{AB}\begin{pmatrix} x_B - x_A \\ y_B - y_A \end{pmatrix}`],
    ['2nde', 'Vecteurs', 'Distance dans un repère orthonormé', r`AB = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}`],
    ['2nde', 'Vecteurs', 'Milieu', r`I\left(\dfrac{x_A + x_B}{2}\,;\dfrac{y_A + y_B}{2}\right)`],
    ['2nde', 'Vecteurs', 'Relation de Chasles', r`\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}`],
    ['2nde', 'Vecteurs', 'Déterminant et colinéarité', r`\det(\vec u, \vec v) = xy' - yx' = 0 \iff \vec u \parallel \vec v`],
    ['2nde', 'Fonctions', 'Équation de droite', r`y = mx + p \qquad m = \dfrac{y_B - y_A}{x_B - x_A}`],
    ['2nde', 'Fonctions', 'Parité', r`f \text{ paire} : f(-x) = f(x) \qquad f \text{ impaire} : f(-x) = -f(x)`],
    ['2nde', 'Proportionnalité', 'Taux et évolution réciproque', r`t = \dfrac{V_1 - V_0}{V_0} \qquad CM_{\text{réc}} = \dfrac{1}{CM}`],
    ['2nde', 'Probabilités', 'Réunion', r`P(A \cup B) = P(A) + P(B) - P(A \cap B)`],
    ['1re', 'Second degré', 'Discriminant et racines', r`\Delta = b^2 - 4ac \qquad x_{1,2} = \dfrac{-b \pm \sqrt\Delta}{2a}`],
    ['1re', 'Second degré', 'Forme canonique', r`a(x - \alpha)^2 + \beta,\quad \alpha = -\dfrac{b}{2a},\ \beta = f(\alpha)`],
    ['1re', 'Second degré', 'Somme et produit des racines', r`x_1 + x_2 = -\dfrac ba \qquad x_1 x_2 = \dfrac ca`],
    ['1re', 'Suites', 'Suite arithmétique', r`u_n = u_0 + nr \qquad \sum_{k=0}^{n} u_k = (n+1)\dfrac{u_0 + u_n}{2}`],
    ['1re', 'Suites', 'Suite géométrique', r`u_n = u_0 q^n \qquad \sum_{k=0}^{n} q^k = \dfrac{1 - q^{n+1}}{1 - q}`],
    ['1re', 'Dérivation', 'Nombre dérivé', r`f'(a) = \lim_{h \to 0} \dfrac{f(a + h) - f(a)}{h}`],
    ['1re', 'Dérivation', 'Tangente', r`y = f'(a)(x - a) + f(a)`],
    ['1re', 'Dérivation', 'Dérivées usuelles', r`(x^n)' = nx^{n-1} \quad \left(\tfrac1x\right)' = -\tfrac{1}{x^2} \quad (\sqrt x)' = \tfrac{1}{2\sqrt x}`],
    ['1re', 'Dérivation', 'Produit et quotient', r`(uv)' = u'v + uv' \qquad \left(\dfrac uv\right)' = \dfrac{u'v - uv'}{v^2}`],
    ['1re', 'Exponentielle', 'Propriétés', r`e^{a+b} = e^a e^b \quad e^{-a} = \dfrac1{e^a} \quad (e^{u})' = u'e^{u}`],
    ['1re', 'Trigonométrie', 'Cercle trigonométrique', r`\cos^2 x + \sin^2 x = 1 \qquad \pi \text{ rad} = 180°`],
    ['1re', 'Trigonométrie', 'Valeurs remarquables', r`\cos\tfrac\pi6 = \tfrac{\sqrt3}2,\ \cos\tfrac\pi4 = \tfrac{\sqrt2}2,\ \cos\tfrac\pi3 = \tfrac12`],
    ['1re', 'Géométrie', 'Produit scalaire', r`\vec u \cdot \vec v = xx' + yy' = \|\vec u\|\,\|\vec v\|\cos\theta`],
    ['1re', 'Géométrie', 'Al-Kashi', r`BC^2 = AB^2 + AC^2 - 2\,AB \cdot AC \cos\widehat A`],
    ['1re', 'Probabilités', 'Probabilité conditionnelle', r`P_A(B) = \dfrac{P(A \cap B)}{P(A)}`],
    ['1re', 'Probabilités', 'Probabilités totales', r`P(B) = P(A)P_A(B) + P(\overline A)P_{\overline A}(B)`],
    ['1re', 'Probabilités', 'Espérance et variance', r`E(X) = \sum p_i x_i \qquad V(X) = E(X^2) - E(X)^2`],
    ['tle', 'Limites', 'Croissances comparées', r`\lim_{x \to +\infty} \dfrac{e^x}{x^n} = +\infty \qquad \lim_{x \to +\infty} \dfrac{\ln x}{x} = 0`],
    ['tle', 'Limites', 'Limites usuelles en 0', r`\lim_{x \to 0} \dfrac{e^x - 1}{x} = 1 \qquad \lim_{x \to 0} \dfrac{\sin x}{x} = 1`],
    ['tle', 'Logarithme', 'Propriétés du logarithme', r`\ln(ab) = \ln a + \ln b \quad \ln(a^n) = n\ln a \quad (\ln u)' = \dfrac{u'}{u}`],
    ['tle', 'Intégration', 'Intégrale et primitive', r`\int_a^b f(x)\,\mathrm dx = F(b) - F(a)`],
    ['tle', 'Intégration', 'Intégration par parties', r`\int_a^b u v' = \big[uv\big]_a^b - \int_a^b u'v`],
    ['tle', 'Intégration', 'Valeur moyenne', r`\mu = \dfrac{1}{b - a}\int_a^b f(x)\,\mathrm dx`],
    ['tle', 'Intégration', 'Équations différentielles', r`y' = ay + b \iff y = Ce^{ax} - \dfrac ba`],
    ['tle', 'Dénombrement', 'Arrangements et combinaisons', r`A_n^k = \dfrac{n!}{(n-k)!} \qquad \binom nk = \dfrac{n!}{k!(n-k)!}`],
    ['tle', 'Dénombrement', 'Relation de Pascal', r`\binom nk + \binom n{k+1} = \binom{n+1}{k+1}`],
    ['tle', 'Probabilités', 'Loi binomiale', r`P(X = k) = \binom nk p^k (1 - p)^{n-k},\ E = np,\ V = np(1-p)`],
    ['tle', 'Probabilités', 'Inégalité de Bienaymé-Tchebychev', r`P(|X - E(X)| \geq \delta) \leq \dfrac{V(X)}{\delta^2}`],
    ['tle', 'Géométrie', 'Plan de vecteur normal (a ; b ; c)', r`ax + by + cz + d = 0`],
    ['tle', 'Géométrie', 'Distance d\'un point à un plan', r`d = \dfrac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}`],
    ['tle', 'Trigonométrie', 'Dérivées de sin et cos', r`\sin' = \cos \qquad \cos' = -\sin`],
    ['tle', 'Fonctions', 'Convexité', r`f \text{ convexe} \iff f'' \geq 0 \iff f' \text{ croissante}`],
    ['mpsi', 'Logique', 'Négations', r`\neg(\forall x, P) \equiv \exists x, \neg P \qquad \neg(P \Rightarrow Q) \equiv P \wedge \neg Q`],
    ['mpsi', 'Sommes', 'Sommes usuelles', r`\sum_{k=1}^n k = \tfrac{n(n+1)}{2} \quad \sum_{k=1}^n k^2 = \tfrac{n(n+1)(2n+1)}{6} \quad \sum_{k=1}^n k^3 = \tfrac{n^2(n+1)^2}{4}`],
    ['mpsi', 'Sommes', 'Binôme de Newton', r`(a + b)^n = \sum_{k=0}^n \binom nk a^k b^{n-k}`],
    ['mpsi', 'Sommes', 'Factorisation de aⁿ − bⁿ', r`a^n - b^n = (a - b)\sum_{k=0}^{n-1} a^k b^{n-1-k}`],
    ['mpsi', 'Complexes', 'Forme exponentielle', r`z = re^{i\theta},\quad e^{i\theta} = \cos\theta + i\sin\theta`],
    ['mpsi', 'Complexes', 'Formules d\'Euler', r`\cos\theta = \dfrac{e^{i\theta} + e^{-i\theta}}{2} \qquad \sin\theta = \dfrac{e^{i\theta} - e^{-i\theta}}{2i}`],
    ['mpsi', 'Complexes', 'Moivre', r`(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta`],
    ['mpsi', 'Complexes', 'Racines n-ièmes de l\'unité', r`z^n = 1 \iff z = e^{2ik\pi/n},\ 0 \leq k \leq n - 1`],
    ['mpsi', 'Trigonométrie', 'Formules d\'addition', r`\cos(a + b) = \cos a\cos b - \sin a\sin b \quad \sin(a + b) = \sin a\cos b + \cos a\sin b`],
    ['mpsi', 'Trigonométrie', 'Duplication', r`\cos 2a = 2\cos^2 a - 1 = 1 - 2\sin^2 a \qquad \sin 2a = 2\sin a\cos a`],
    ['mpsi', 'Fonctions usuelles', 'Hyperboliques', r`\operatorname{ch}^2 x - \operatorname{sh}^2 x = 1 \qquad \operatorname{ch}' = \operatorname{sh},\ \operatorname{sh}' = \operatorname{ch}`],
    ['mpsi', 'Fonctions usuelles', 'Réciproques circulaires', r`\arcsin' = \dfrac{1}{\sqrt{1 - x^2}} \quad \arccos' = -\dfrac{1}{\sqrt{1-x^2}} \quad \arctan' = \dfrac{1}{1 + x^2}`],
    ['mpsi', 'Analyse', 'Accroissements finis', r`f(b) - f(a) = f'(c)(b - a),\ c \in ]a, b[`],
    ['mpsi', 'Analyse', 'Formule de Leibniz', r`(fg)^{(n)} = \sum_{k=0}^n \binom nk f^{(k)} g^{(n-k)}`],
    ['mpsi', 'Analyse', 'Taylor-Young', r`f(x) = \sum_{k=0}^n \dfrac{f^{(k)}(0)}{k!}x^k + o(x^n)`],
    ['mpsi', 'Analyse', 'DL usuels (1)', r`e^x = \sum_{k=0}^n \dfrac{x^k}{k!} + o(x^n) \qquad \ln(1 + x) = \sum_{k=1}^n \dfrac{(-1)^{k+1}x^k}{k} + o(x^n)`],
    ['mpsi', 'Analyse', 'DL usuels (2)', r`\sin x = x - \dfrac{x^3}{6} + o(x^4) \qquad \cos x = 1 - \dfrac{x^2}{2} + \dfrac{x^4}{24} + o(x^5)`],
    ['mpsi', 'Analyse', 'DL usuels (3)', r`(1 + x)^\alpha = 1 + \alpha x + \dfrac{\alpha(\alpha - 1)}{2}x^2 + o(x^2) \qquad \dfrac1{1-x} = \sum_{k=0}^n x^k + o(x^n)`],
    ['mpsi', 'Intégration', 'Changement de variable', r`\int_\alpha^\beta f(\varphi(t))\varphi'(t)\,\mathrm dt = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,\mathrm dx`],
    ['mpsi', 'Intégration', 'Sommes de Riemann', r`\dfrac1n \sum_{k=1}^n f\left(\dfrac kn\right) \xrightarrow[n \to \infty]{} \int_0^1 f`],
    ['mpsi', 'Arithmétique', 'Bézout et Gauss', r`a \wedge b = 1 \iff \exists u, v,\ au + bv = 1 \qquad a \mid bc,\ a \wedge b = 1 \Rightarrow a \mid c`],
    ['mpsi', 'Arithmétique', 'Petit théorème de Fermat', r`p \text{ premier},\ p \nmid a \Rightarrow a^{p-1} \equiv 1\ [p]`],
    ['mpsi', 'Polynômes', 'Relations coefficients-racines', r`\sum x_i = -\dfrac{a_{n-1}}{a_n} \qquad \prod x_i = (-1)^n \dfrac{a_0}{a_n}`],
    ['mpsi', 'Algèbre linéaire', 'Déterminant 2 × 2', r`\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc`],
    ['mpsi', 'Algèbre linéaire', 'Inverse 2 × 2', r`\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \dfrac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}`],
    ['mpsi', 'Algèbre linéaire', 'Théorème du rang', r`\dim E = \dim \ker f + \operatorname{rg} f`]
  ];
  var filtre = { q: '', niv: '*' };
  function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function rendu(compact) {
    var q = norm(filtre.q);
    var liste = F.filter(function (f) { return (filtre.niv === '*' || f[0] === filtre.niv) && (!q || norm(f[1] + ' ' + f[2] + ' ' + f[3]).indexOf(q) >= 0); });
    var parNiv = {};
    liste.forEach(function (f) { (parNiv[f[0]] = parNiv[f[0]] || []).push(f); });
    var corps = NIVEAUX.filter(function (n) { return parNiv[n.id]; }).map(function (n) {
      var parDom = {};
      parNiv[n.id].forEach(function (f) { (parDom[f[1]] = parDom[f[1]] || []).push(f); });
      return '<section class="fo-niv"><h3>' + U.esc(n.long) + '</h3>' + Object.keys(parDom).map(function (d) {
        return '<div class="fo-dom"><b>' + U.esc(d) + '</b>' + parDom[d].map(function (f) { return '<div class="fo-l"><span class="fo-n">' + U.esc(f[2]) + '</span><div class="fo-f">$$' + f[3] + '$$</div></div>'; }).join('') + '</div>';
      }).join('') + '</section>';
    }).join('');
    return corps || '<p class="muted">Aucune formule ne correspond à « ' + U.esc(filtre.q) + ' ».</p>';
  }
  function monter(el, compact) {
    el.innerHTML = '<div class="fo' + (compact ? ' fo-compact' : '') + '">' +
      '<div class="fo-barre"><label class="sr" for="fo-q">Rechercher une formule</label><input class="input" id="fo-q" type="search" placeholder="Rechercher : Pythagore, dérivée, aire…" value="' + U.esc(filtre.q) + '">' +
      '<div class="fo-nivs">' + [['*', 'Tous']].concat(NIVEAUX.map(function (n) { return [n.id, n.nom]; })).map(function (n) { return '<button type="button" class="n-tag' + (filtre.niv === n[0] ? ' on' : '') + '" data-fniv="' + n[0] + '">' + n[1] + '</button>'; }).join('') + '</div>' +
      '<span class="small muted">' + F.length + ' formules</span></div>' +
      '<div class="fo-corps" id="fo-corps">' + rendu(compact) + '</div></div>';
    U.math(U.$('#fo-corps', el));
    var t;
    U.$('#fo-q', el).oninput = function () { filtre.q = this.value; clearTimeout(t); t = setTimeout(function () { var c = U.$('#fo-corps', el); c.innerHTML = rendu(compact); U.math(c); }, 150); };
    el.querySelector('.fo-nivs').onclick = function (e) { var b = e.target.closest('[data-fniv]'); if (!b) return; filtre.niv = b.getAttribute('data-fniv'); monter(el, compact); };
  }
  function vPage(main) {
    if (!filtre.niv || filtre.niv === '*') { var n = Store.get().niveau; if (n) filtre.niv = n; }
    main.innerHTML = '<section class="page"><div class="wrap"><span class="eyebrow">Formulaire</span><h1>Toutes les formules</h1><p class="muted">De la 6e à la prépa. Aussi disponible à tout moment dans les outils, en bas à droite.</p><div id="fo-page"></div></div></section>';
    monter(U.$('#fo-page', main), false);
  }
  window.Formulaire = { monter: monter, page: vPage, nb: F.length };
})();
