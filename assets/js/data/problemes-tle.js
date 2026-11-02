/* Problèmes longs de terminale (spécialité) : un par leçon, à questions enchaînées. Étoiles : ★★ difficile, ★★★ très difficile. */
(function () {
  var r = String.raw;
  addProblemes('tle', {
    'tle-recurrence': { titre: 'Récurrences en série', etoiles: 3,
      enonce: r`<p>On considère la suite $u_0 = 1$, $u_{n+1} = \sqrt{2 + u_n}$, puis deux propriétés classiques démontrées par récurrence.</p>`,
      questions: [
        { q: r`Calcule $u_1$ (valeur exacte ou au millième).`, type: 'num', rep: Math.sqrt(3), tol: 0.001, corr: r`$u_1 = \sqrt{3} \approx 1{,}732$.` },
        { q: r`On montre par récurrence que $1 \leqslant u_n \leqslant u_{n+1} \leqslant 2$ : la suite converge. Quelle est sa limite ?`, type: 'num', rep: 2, corr: r`Croissante et majorée, elle converge vers $\ell$ avec $\ell = \sqrt{2 + \ell}$, donc $\ell^2 - \ell - 2 = 0$ et $\ell = 2$ (car $\ell \geqslant 1$).` },
        { q: r`On démontre que $1 + 3 + 5 + \dots + (2n - 1) = n^2$. Que vaut cette somme pour $n = 15$ ?`, type: 'num', rep: 225, corr: r`$15^2 = 225$. Hérédité : $n^2 + (2n + 1) = (n + 1)^2$.` },
        { q: r`On démontre que $4^n - 1$ est divisible par $3$. Calcule $\dfrac{4^5 - 1}{3}$.`, type: 'num', rep: 341, corr: r`$\dfrac{1\,023}{3} = 341$. Hérédité : $4^{n+1} - 1 = 4(4^n - 1) + 3$.` }
      ] },
    'tle-limites-suites': { titre: 'Limites et seuil', etoiles: 3,
      enonce: r`<p>Calcule les limites, puis cherche un seuil.</p>`,
      questions: [
        { q: r`Calcule $\lim\limits_{n \to +\infty} \dfrac{3n^2 + 1}{n^2 - 5}$.`, type: 'num', rep: 3, corr: r`On factorise par $n^2$ : $\dfrac{3 + 1/n^2}{1 - 5/n^2} \to 3$.` },
        { q: r`Calcule $\lim\limits_{n \to +\infty} \left(\dfrac23\right)^n$.`, type: 'num', rep: 0, corr: r`$0 \lt \dfrac23 \lt 1$ : la suite géométrique tend vers $0$.` },
        { q: r`Calcule $\lim\limits_{n \to +\infty} \left(\sqrt{n + 1} - \sqrt n\right)$.`, type: 'num', rep: 0, corr: r`Avec la quantité conjuguée : $\dfrac{1}{\sqrt{n + 1} + \sqrt n} \to 0$.` },
        { q: r`$u_n = \dfrac{5n + 2}{n + 1}$ tend vers $5$. Plus petit $n$ tel que $|u_n - 5| \lt 0{,}01$ ?`, type: 'num', rep: 300, corr: r`$u_n - 5 = \dfrac{-3}{n + 1}$. Il faut $\dfrac{3}{n + 1} \lt 0{,}01 \iff n + 1 \gt 300 \iff n \gt 299$ : $n = 300$.` }
      ] },
    'tle-limites-fonctions': { titre: 'Asymptotes', etoiles: 2,
      enonce: r`<p>On étudie les comportements aux bornes.</p>`,
      questions: [
        { q: r`Calcule $\lim\limits_{x \to +\infty} \dfrac{2x^2 - 3}{x^2 + 1}$.`, type: 'num', rep: 2, corr: r`Termes de plus haut degré : $\dfrac{2x^2}{x^2} = 2$. La courbe a une asymptote horizontale $y = 2$.` },
        { q: r`Quelle est la limite de $\dfrac{x + 1}{x - 2}$ quand $x \to 2$ avec $x \gt 2$ ?`, type: 'qcm', choix: [r`$+\infty$`, r`$-\infty$`, r`$0$`, r`$3$`], rep: 0, corr: r`Numérateur vers $3 \gt 0$, dénominateur vers $0^+$ : $+\infty$ (asymptote verticale $x = 2$).` },
        { q: r`Calcule $\lim\limits_{x \to +\infty} xe^{-x}$.`, type: 'num', rep: 0, corr: r`Croissances comparées : $\dfrac{x}{e^x} \to 0$.` },
        { q: r`Calcule $\lim\limits_{x \to 0} \dfrac{e^x - 1}{x}$.`, type: 'num', rep: 1, corr: r`C'est le nombre dérivé de $\exp$ en $0$ : $e^0 = 1$.` }
      ] },
    'tle-continuite': { titre: 'Le théorème des valeurs intermédiaires', etoiles: 3,
      enonce: r`<p>On étudie $f(x) = x^3 + x - 3$, strictement croissante sur $\mathbb{R}$.</p>`,
      questions: [
        { q: r`Calcule $f(1)$.`, type: 'num', rep: -1, corr: r`$1 + 1 - 3 = -1$.` },
        { q: r`Calcule $f(2)$.`, type: 'num', rep: 7, corr: r`$8 + 2 - 3 = 7$. Comme $f$ est continue et strictement croissante, $f(x) = 0$ a une unique solution $\alpha \in [1\,;\,2]$.` },
        { q: r`Donne $\alpha$ arrondi au centième.`, type: 'num', rep: 1.21, tol: 0.006, corr: r`$f(1{,}21) \approx -0{,}018$ et $f(1{,}22) \approx 0{,}036$ : $\alpha \approx 1{,}21$ (plus précisément $1{,}2134$).` },
        { q: r`Combien de solutions réelles a l'équation $x^3 - 3x + 1 = 0$ ?`, type: 'num', rep: 3, corr: r`$g(x) = x^3 - 3x + 1$ : $g' = 3(x^2 - 1)$. $g(-1) = 3 \gt 0$ et $g(1) = -1 \lt 0$, avec $g \to \mp\infty$ aux bornes : une solution sur chacun des $3$ intervalles de monotonie.` }
      ] },
    'tle-convexite': { titre: 'Le point d\'inflexion', etoiles: 2,
      enonce: r`<p>On considère $f(x) = x^3 - 6x^2 + 9x + 1$.</p>`,
      questions: [
        { q: r`$f''$ s'annule en changeant de signe en $x = a$. Donne $a$.`, type: 'num', rep: 2, corr: r`$f'(x) = 3x^2 - 12x + 9$, $f''(x) = 6x - 12$, nulle en $2$.` },
        { q: r`Calcule $f(2)$.`, type: 'num', rep: 3, corr: r`$8 - 24 + 18 + 1 = 3$ : le point d'inflexion est $(2\,;\,3)$.` },
        { q: r`Sur quel intervalle $f$ est-elle convexe ?`, type: 'qcm', choix: [r`$[2\,;\,+\infty[$`, r`$]-\infty\,;\,2]$`, r`$[1\,;\,3]$`, r`$\mathbb{R}$`], rep: 0, corr: r`$f''(x) = 6x - 12 \geqslant 0 \iff x \geqslant 2$.` },
        { q: r`Quel est le coefficient directeur de la tangente au point d'inflexion ?`, type: 'num', rep: -3, corr: r`$f'(2) = 12 - 24 + 9 = -3$.` }
      ] },
    'tle-logarithme': { titre: 'Le logarithme pour résoudre', etoiles: 3,
      enonce: r`<p>Le logarithme népérien transforme les puissances en produits : $\ln(a^n) = n\ln a$.</p>`,
      questions: [
        { q: r`Résous $\ln x = 3$ (valeur exacte ou au centième).`, type: 'num', rep: Math.exp(3), tol: 0.006, corr: r`$x = e^3 \approx 20{,}09$.` },
        { q: r`Plus petit entier $n$ tel que $2^n \gt 10^6$ ?`, type: 'num', rep: 20, corr: r`$n\ln 2 \gt 6\ln 10 \iff n \gt \dfrac{6\ln 10}{\ln 2} \approx 19{,}93$ : $n = 20$ ($2^{20} = 1\,048\,576$).` },
        { q: r`Résous $\ln(x + 1) + \ln(x - 1) = \ln 8$ (avec $x \gt 1$).`, type: 'num', rep: 3, corr: r`$\ln\big((x + 1)(x - 1)\big) = \ln 8 \iff x^2 - 1 = 8 \iff x = 3$ (la solution $-3$ est exclue).` },
        { q: r`$f(x) = x\ln x - x$. Calcule $f'(e)$.`, type: 'num', rep: 1, corr: r`$f'(x) = \ln x + 1 - 1 = \ln x$, donc $f'(e) = 1$.` }
      ] },
    'tle-primitives': { titre: 'Primitives et équations différentielles', etoiles: 2,
      enonce: r`<p>Trouve les primitives et les solutions demandées.</p>`,
      questions: [
        { q: r`$F$ est la primitive de $f(x) = 3x^2 + 2x$ telle que $F(1) = 0$. Calcule $F(2)$.`, type: 'num', rep: 10, corr: r`$F(x) = x^3 + x^2 + c$ et $F(1) = 2 + c = 0$, donc $c = -2$. $F(2) = 8 + 4 - 2 = 10$.` },
        { q: r`$y' = -2y$ et $y(0) = 5$. Calcule $y(1)$ (au millième).`, type: 'num', rep: 5 * Math.exp(-2), tol: 0.001, corr: r`$y = 5e^{-2x}$, $y(1) = 5e^{-2} \approx 0{,}677$.` },
        { q: r`Quelle est la solution constante de $y' = 3y + 6$ ?`, type: 'num', rep: -2, corr: r`$y' = 0$ donne $3y + 6 = 0$, $y = -2$. Les solutions sont $y = -2 + Ce^{3x}$.` },
        { q: r`Une primitive de $e^{2x}$ est $ke^{2x}$. Donne $k$.`, type: 'num', rep: 0.5, corr: r`$\left(\dfrac12 e^{2x}\right)' = e^{2x}$.` }
      ] },
    'tle-integrales': { titre: 'Aires et valeurs moyennes', etoiles: 3,
      enonce: r`<p>Calcule les intégrales et interprète-les comme des aires.</p>`,
      questions: [
        { q: r`Calcule $\displaystyle\int_0^2 (3x^2 - 2x)\,\mathrm dx$.`, type: 'num', rep: 4, corr: r`$\big[x^3 - x^2\big]_0^2 = 8 - 4 = 4$.` },
        { q: r`Quelle est l'aire entre les courbes $y = x$ et $y = x^2$ sur $[0\,;\,1]$ ? (fraction)`, type: 'num', rep: 1 / 6, corr: r`$x \geqslant x^2$ sur $[0\,;\,1]$ : $\displaystyle\int_0^1 (x - x^2)\,\mathrm dx = \dfrac12 - \dfrac13 = \dfrac16$.` },
        { q: r`Calcule $\displaystyle\int_0^1 e^x\,\mathrm dx$ (au millième).`, type: 'num', rep: Math.E - 1, tol: 0.001, corr: r`$e - 1 \approx 1{,}718$.` },
        { q: r`Quelle est la valeur moyenne de $x \mapsto x^2$ sur $[0\,;\,3]$ ?`, type: 'num', rep: 3, corr: r`$\dfrac13 \displaystyle\int_0^3 x^2\,\mathrm dx = \dfrac13 \times 9 = 3$.` }
      ] },
    'tle-denombrement': { titre: 'Codes, mots et mains de cartes', etoiles: 2,
      enonce: r`<p>Dénombre en choisissant le bon outil : listes, arrangements, permutations ou combinaisons.</p>`,
      questions: [
        { q: r`Combien de codes à $4$ chiffres (de $0000$ à $9999$) existe-t-il ?`, type: 'num', rep: 10000, corr: r`$10^4 = 10\,000$ listes.` },
        { q: r`Combien d'anagrammes a le mot MATHS ?`, type: 'num', rep: 120, corr: r`$5$ lettres différentes : $5! = 120$.` },
        { q: r`Combien de comités de $3$ personnes peut-on former parmi $10$ ?`, type: 'num', rep: 120, corr: r`$\binom{10}{3} = \dfrac{10 \times 9 \times 8}{6} = 120$.` },
        { q: r`Combien de mains de $5$ cartes (jeu de $32$) contiennent exactement $2$ as ?`, type: 'num', rep: 19656, corr: r`$\binom42 \times \binom{28}{3} = 6 \times 3\,276 = 19\,656$.` }
      ] },
    'tle-binomiale': { titre: 'Combien de six ?', etoiles: 3,
      enonce: r`<p>On lance un dé équilibré $10$ fois ; $X$ compte le nombre de $6$. $X$ suit la loi $\mathcal{B}\left(10, \dfrac16\right)$.</p>`,
      questions: [
        { q: r`Calcule $E(X)$ (fraction ou au millième).`, type: 'num', rep: 10 / 6, tol: 0.001, corr: r`$np = \dfrac{10}{6} = \dfrac53 \approx 1{,}667$.` },
        { q: r`Calcule $P(X = 0)$ (au millième).`, type: 'num', rep: Math.pow(5 / 6, 10), tol: 0.0006, corr: r`$\left(\dfrac56\right)^{10} \approx 0{,}162$.` },
        { q: r`Calcule $P(X \geqslant 1)$ (au millième).`, type: 'num', rep: 1 - Math.pow(5 / 6, 10), tol: 0.0006, corr: r`$1 - 0{,}162 \approx 0{,}838$.` },
        { q: r`Combien de lancers faut-il au minimum pour avoir au moins $99\,\%$ de chances d'obtenir au moins un $6$ ?`, type: 'num', rep: 26, corr: r`$1 - \left(\dfrac56\right)^n \geqslant 0{,}99 \iff n \geqslant \dfrac{\ln 0{,}01}{\ln(5/6)} \approx 25{,}3$ : $n = 26$.` }
      ] },
    'tle-espace': { titre: 'Dans le cube', etoiles: 2,
      enonce: r`<p>$ABCDEFGH$ est un cube d'arête $1$. Dans le repère $(A\,;\,\overrightarrow{AB}, \overrightarrow{AD}, \overrightarrow{AE})$ : $B(1\,;\,0\,;\,0)$, $D(0\,;\,1\,;\,0)$, $E(0\,;\,0\,;\,1)$ et $G(1\,;\,1\,;\,1)$.</p>`,
      questions: [
        { q: r`Calcule la longueur de la grande diagonale $AG$ (au millième).`, type: 'num', rep: Math.sqrt(3), tol: 0.001, corr: r`$\sqrt{1 + 1 + 1} = \sqrt3 \approx 1{,}732$.` },
        { q: r`Calcule $\overrightarrow{AG} \cdot \overrightarrow{BD}$.`, type: 'num', rep: 0, corr: r`$\overrightarrow{AG}(1\,;\,1\,;\,1)$ et $\overrightarrow{BD}(-1\,;\,1\,;\,0)$ : $-1 + 1 + 0 = 0$. Les droites sont orthogonales.` },
        { q: r`Quelle est la cote (3ᵉ coordonnée) du milieu de $[EG]$ ?`, type: 'num', rep: 1, corr: r`$I\left(\dfrac12\,;\,\dfrac12\,;\,1\right)$ : c'est le centre de la face du dessus.` },
        { q: r`Le point $(3\,;\,3\,;\,3)$ est-il sur la droite $(AG)$ ?`, type: 'qcm', choix: [r`Oui`, r`Non`], rep: 0, corr: r`$(AG)$ : $(t\,;\,t\,;\,t)$, $t \in \mathbb{R}$. Avec $t = 3$, oui.` }
      ] },
    'tle-trigo': { titre: 'Sinus et cosinus en analyse', etoiles: 3,
      enonce: r`<p>On utilise $\cos' = -\sin$, $\sin' = \cos$ et $(\cos(ax))' = -a\sin(ax)$.</p>`,
      questions: [
        { q: r`Quelle est la période de $x \mapsto \sin(2x)$ ?`, type: 'qcm', choix: [r`$\pi$`, r`$2\pi$`, r`$\dfrac{\pi}{2}$`, r`$4\pi$`], rep: 0, corr: r`$\sin(2(x + \pi)) = \sin(2x + 2\pi) = \sin(2x)$ : période $\pi$.` },
        { q: r`$f(x) = \cos(3x)$. Calcule $f'\left(\dfrac{\pi}{6}\right)$.`, type: 'num', rep: -3, corr: r`$f'(x) = -3\sin(3x)$, $f'\left(\dfrac{\pi}{6}\right) = -3\sin\dfrac{\pi}{2} = -3$.` },
        { q: r`Résous $\sin x = \dfrac12$ dans $[0\,;\,2\pi]$ (séparées par ;).`, type: 'liste', rep: [Math.PI / 6, 5 * Math.PI / 6], tol: 0.001, corr: r`$x = \dfrac{\pi}{6}$ ou $x = \dfrac{5\pi}{6}$.` },
        { q: r`Calcule $\displaystyle\int_0^{\pi} \sin x\,\mathrm dx$.`, type: 'num', rep: 2, corr: r`$\big[-\cos x\big]_0^{\pi} = 1 + 1 = 2$.` }
      ] },
    'tle-grands-nombres': { titre: 'Pile ou face, mille fois', etoiles: 3,
      enonce: r`<p>On utilise l'inégalité de Bienaymé-Tchebychev : $P(|X - E(X)| \geqslant \delta) \leqslant \dfrac{V(X)}{\delta^2}$.</p>`,
      questions: [
        { q: r`$X \sim \mathcal{B}(100\,;\,0{,}5)$. Quel majorant donne l'inégalité pour $P(|X - 50| \geqslant 10)$ ?`, type: 'num', rep: 0.25, corr: r`$V(X) = 100 \times 0{,}5 \times 0{,}5 = 25$, et $\dfrac{25}{10^2} = 0{,}25$.` },
        { q: r`Pour un dé, $\sigma^2 = \dfrac{35}{12}$. Quelle est la variance de la moyenne $M_{100}$ de $100$ lancers (au dix-millième) ?`, type: 'num', rep: 35 / 1200, tol: 0.0001, corr: r`$V(M_n) = \dfrac{\sigma^2}{n} = \dfrac{35}{1\,200} \approx 0{,}0292$.` },
        { q: r`Avec l'inégalité, combien de lancers faut-il au minimum pour garantir $P(|M_n - 3{,}5| \geqslant 0{,}1) \leqslant 0{,}05$ ?`, type: 'num', rep: 5834, corr: r`Il suffit que $\dfrac{35/12}{n \times 0{,}01} \leqslant 0{,}05 \iff n \geqslant \dfrac{35}{12 \times 0{,}0005} \approx 5\,833{,}3$ : $n = 5\,834$.` },
        { q: r`$E(X) = 2$ et $E(Y) = 5$. Calcule $E(3X - Y)$.`, type: 'num', rep: 1, corr: r`Linéarité : $3 \times 2 - 5 = 1$ (pas besoin d'indépendance).` }
      ] },
    'tle-orthogonalite': { titre: 'Distance d\'un point à un plan', etoiles: 2,
      enonce: r`<p>Le plan $\mathcal{P}$ a pour équation $2x - y + 2z - 3 = 0$, et $M(3\,;\,1\,;\,4)$.</p>`,
      questions: [
        { q: r`Quelle est la norme du vecteur normal $\vec n(2\,;\,-1\,;\,2)$ ?`, type: 'num', rep: 3, corr: r`$\sqrt{4 + 1 + 4} = 3$.` },
        { q: r`Le point $M$ appartient-il à $\mathcal{P}$ ?`, type: 'qcm', choix: [r`Non`, r`Oui`], rep: 0, corr: r`$6 - 1 + 8 - 3 = 10 \neq 0$.` },
        { q: r`Calcule la distance de $M$ à $\mathcal{P}$ (fraction ou au millième).`, type: 'num', rep: 10 / 3, tol: 0.001, corr: r`$H = M + t\vec n$ : $2(3 + 2t) - (1 - t) + 2(4 + 2t) - 3 = 10 + 9t = 0$, donc $t = -\dfrac{10}{9}$. $MH = |t| \times \|\vec n\| = \dfrac{10}{9} \times 3 = \dfrac{10}{3}$.` },
        { q: r`Quelle est l'abscisse du projeté orthogonal $H$ (fraction ou au millième) ?`, type: 'num', rep: 7 / 9, tol: 0.001, corr: r`$x_H = 3 + 2t = 3 - \dfrac{20}{9} = \dfrac79$.` }
      ] }
  });
})();
