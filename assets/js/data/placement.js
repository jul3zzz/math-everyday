/* Banque du test de niveau : 8 QCM par niveau.
   La bonne réponse est TOUJOURS c[0] ; l'ordre est mélangé à l'affichage. */
(function () {
  var r = String.raw;
  window.PLACEMENT = [
    /* ---------- 6e ---------- */
    { n: '6e', d: 'Nombres', q: r`Combien vaut $3{,}7 + 2{,}45$ ?`, c: [r`$6{,}15$`, r`$5{,}82$`, r`$6{,}12$`, r`$5{,}115$`] },
    { n: '6e', d: 'Nombres', q: r`Quel est le plus grand nombre ?`, c: [r`$0{,}8$`, r`$0{,}75$`, r`$0{,}709$`, r`$0{,}79$`] },
    { n: '6e', d: 'Fractions', q: r`Combien valent les $\dfrac{3}{4}$ de $20$ ?`, c: [r`$15$`, r`$12$`, r`$16$`, r`$5$`] },
    { n: '6e', d: 'Nombres', q: r`Dans la division euclidienne de $47$ par $6$, on obtient :`, c: [r`quotient $7$, reste $5$`, r`quotient $7$, reste $4$`, r`quotient $6$, reste $11$`, r`quotient $8$, reste $1$`] },
    { n: '6e', d: 'Géométrie', q: r`Aire d'un rectangle de $7$ cm sur $4$ cm ?`, c: [r`$28\text{ cm}^2$`, r`$22\text{ cm}^2$`, r`$11\text{ cm}^2$`, r`$24\text{ cm}^2$`] },
    { n: '6e', d: 'Géométrie', q: r`Un angle droit mesure :`, c: [r`$90°$`, r`$180°$`, r`$45°$`, r`$360°$`] },
    { n: '6e', d: 'Proportionnalité', q: r`3 cahiers coûtent $4{,}50$ €. Combien coûtent 5 cahiers ?`, c: [r`$7{,}50$ €`, r`$6{,}50$ €`, r`$7$ €`, r`$9$ €`] },
    { n: '6e', d: 'Fractions', q: r`Quelle fraction est égale à $\dfrac{2}{3}$ ?`, c: [r`$\dfrac{4}{6}$`, r`$\dfrac{3}{4}$`, r`$\dfrac{2}{6}$`, r`$\dfrac{6}{4}$`] },

    /* ---------- 5e ---------- */
    { n: '5e', d: 'Calcul', q: r`Combien vaut $5 + 3 \times 4$ ?`, c: [r`$17$`, r`$32$`, r`$27$`, r`$60$`] },
    { n: '5e', d: 'Relatifs', q: r`Combien vaut $(-7) + 4$ ?`, c: [r`$-3$`, r`$3$`, r`$-11$`, r`$11$`] },
    { n: '5e', d: 'Fractions', q: r`Combien vaut $\dfrac{1}{3} + \dfrac{1}{6}$ ?`, c: [r`$\dfrac{1}{2}$`, r`$\dfrac{2}{9}$`, r`$\dfrac{1}{18}$`, r`$\dfrac{2}{3}$`] },
    { n: '5e', d: 'Calcul littéral', q: r`Si $x = 3$, combien vaut $2x^2$ ?`, c: [r`$18$`, r`$36$`, r`$12$`, r`$9$`] },
    { n: '5e', d: 'Géométrie', q: r`Un triangle a deux angles de $50°$ et $60°$. Le troisième mesure :`, c: [r`$70°$`, r`$80°$`, r`$90°$`, r`$110°$`] },
    { n: '5e', d: 'Proportionnalité', q: r`Combien valent $20\,\%$ de $45$ ?`, c: [r`$9$`, r`$4{,}5$`, r`$25$`, r`$20$`] },
    { n: '5e', d: 'Géométrie', q: r`Peut-on construire un triangle de côtés $3$ cm, $4$ cm et $8$ cm ?`, c: [r`Non, car $3 + 4 \lt 8$`, r`Oui, toujours`, r`Oui, car $8 \gt 4 \gt 3$`, r`Seulement s'il est rectangle`] },
    { n: '5e', d: 'Probabilités', q: r`On lance un dé équilibré à 6 faces. Probabilité d'obtenir un nombre pair ?`, c: [r`$\dfrac{1}{2}$`, r`$\dfrac{1}{6}$`, r`$\dfrac{1}{3}$`, r`$\dfrac{2}{3}$`] },

    /* ---------- 4e ---------- */
    { n: '4e', d: 'Relatifs', q: r`Combien vaut $(-3) \times (-5)$ ?`, c: [r`$15$`, r`$-15$`, r`$-8$`, r`$8$`] },
    { n: '4e', d: 'Fractions', q: r`Combien vaut $\dfrac{2}{3} \times \dfrac{9}{4}$ ?`, c: [r`$\dfrac{3}{2}$`, r`$\dfrac{11}{7}$`, r`$\dfrac{1}{2}$`, r`$\dfrac{27}{8}$`] },
    { n: '4e', d: 'Puissances', q: r`Combien vaut $10^3 \times 10^4$ ?`, c: [r`$10^7$`, r`$10^{12}$`, r`$100^7$`, r`$10^1$`] },
    { n: '4e', d: 'Calcul littéral', q: r`Développer $3(x + 4)$ donne :`, c: [r`$3x + 12$`, r`$3x + 4$`, r`$x + 12$`, r`$3x + 7$`] },
    { n: '4e', d: 'Équations', q: r`Quelle est la solution de $2x + 5 = 13$ ?`, c: [r`$x = 4$`, r`$x = 9$`, r`$x = 6{,}5$`, r`$x = 3$`] },
    { n: '4e', d: 'Géométrie', q: r`Un triangle rectangle a des côtés de l'angle droit de $6$ et $8$. L'hypoténuse mesure :`, c: [r`$10$`, r`$14$`, r`$48$`, r`$100$`] },
    { n: '4e', d: 'Proportionnalité', q: r`Une voiture roule à $90$ km/h pendant $2$ h $30$ min. Distance parcourue ?`, c: [r`$225$ km`, r`$180$ km`, r`$207$ km`, r`$270$ km`] },
    { n: '4e', d: 'Arithmétique', q: r`La décomposition de $60$ en produit de facteurs premiers est :`, c: [r`$2^2 \times 3 \times 5$`, r`$2 \times 30$`, r`$4 \times 15$`, r`$2 \times 3 \times 10$`] },

    /* ---------- 3e ---------- */
    { n: '3e', d: 'Calcul littéral', q: r`Factoriser $x^2 - 9$ donne :`, c: [r`$(x-3)(x+3)$`, r`$(x-3)^2$`, r`$(x-9)(x+1)$`, r`$x(x-9)$`] },
    { n: '3e', d: 'Équations', q: r`Les solutions de $(x-2)(x+5) = 0$ sont :`, c: [r`$2$ et $-5$`, r`$-2$ et $5$`, r`$2$ et $5$`, r`$10$`] },
    { n: '3e', d: 'Fonctions', q: r`Soit $f(x) = 3x - 2$. L'image de $4$ par $f$ est :`, c: [r`$10$`, r`$14$`, r`$2$`, r`$6$`] },
    { n: '3e', d: 'Arithmétique', q: r`Le PGCD de $24$ et $36$ est :`, c: [r`$12$`, r`$6$`, r`$72$`, r`$4$`] },
    { n: '3e', d: 'Géométrie', q: r`Dans un triangle $ABC$ rectangle en $A$, $\cos\widehat{B}$ est égal à :`, c: [r`$\dfrac{AB}{BC}$`, r`$\dfrac{AC}{BC}$`, r`$\dfrac{AC}{AB}$`, r`$\dfrac{BC}{AB}$`] },
    { n: '3e', d: 'Proportionnalité', q: r`Un prix augmente de $20\,\%$ puis baisse de $20\,\%$. Au total, il a :`, c: [r`baissé de $4\,\%$`, r`retrouvé sa valeur initiale`, r`augmenté de $4\,\%$`, r`baissé de $20\,\%$`] },
    { n: '3e', d: 'Probabilités', q: r`On lance deux fois un dé équilibré. Probabilité d'obtenir deux 6 ?`, c: [r`$\dfrac{1}{36}$`, r`$\dfrac{1}{12}$`, r`$\dfrac{1}{3}$`, r`$\dfrac{1}{6}$`] },
    { n: '3e', d: 'Géométrie', q: r`Dans un agrandissement de rapport $3$, les aires sont multipliées par :`, c: [r`$9$`, r`$3$`, r`$6$`, r`$27$`] },

    /* ---------- 2nde ---------- */
    { n: '2nde', d: 'Nombres', q: r`$\sqrt{50}$ est égal à :`, c: [r`$5\sqrt{2}$`, r`$25\sqrt{2}$`, r`$10\sqrt{5}$`, r`$2\sqrt{5}$`] },
    { n: '2nde', d: 'Nombres', q: r`L'ensemble des réels $x$ tels que $|x - 3| \leq 2$ est :`, c: [r`$[1\,;5]$`, r`$[-1\,;5]$`, r`$[3\,;5]$`, r`$]-\infty\,;5]$`] },
    { n: '2nde', d: 'Fonctions', q: r`Sur $[-3\,;2]$, le minimum de $f(x) = x^2$ vaut :`, c: [r`$0$`, r`$4$`, r`$9$`, r`$-9$`] },
    { n: '2nde', d: 'Vecteurs', q: r`Les vecteurs $\vec u(2\,;-1)$ et $\vec v(-6\,;3)$ sont :`, c: [r`colinéaires`, r`non colinéaires`, r`égaux`, r`opposés`] },
    { n: '2nde', d: 'Fonctions', q: r`La droite passant par $A(0\,;1)$ et $B(2\,;5)$ a pour équation :`, c: [r`$y = 2x + 1$`, r`$y = \tfrac12 x + 1$`, r`$y = 2x + 5$`, r`$y = 4x + 1$`] },
    { n: '2nde', d: 'Équations', q: r`La solution du système $\begin{cases} x + y = 7 \\ x - y = 1 \end{cases}$ est :`, c: [r`$(4\,;3)$`, r`$(3\,;4)$`, r`$(5\,;2)$`, r`$(6\,;1)$`] },
    { n: '2nde', d: 'Proportionnalité', q: r`Un prix baisse de $10\,\%$ deux fois de suite. Coefficient multiplicateur global ?`, c: [r`$0{,}81$`, r`$0{,}8$`, r`$0{,}9$`, r`$0{,}2$`] },
    { n: '2nde', d: 'Équations', q: r`Sur $]-2\,;1[$, le produit $(x-1)(x+2)$ est :`, c: [r`strictement négatif`, r`strictement positif`, r`nul`, r`de signe variable`] },

    /* ---------- 1re ---------- */
    { n: '1re', d: 'Second degré', q: r`Le discriminant de $2x^2 - 3x + 1$ vaut :`, c: [r`$1$`, r`$17$`, r`$-1$`, r`$9$`] },
    { n: '1re', d: 'Dérivation', q: r`La dérivée de $f(x) = x^3 - 4x$ est :`, c: [r`$3x^2 - 4$`, r`$3x^2 - 4x$`, r`$x^2 - 4$`, r`$3x - 4$`] },
    { n: '1re', d: 'Suites', q: r`Suite arithmétique : $u_0 = 5$, raison $3$. Combien vaut $u_{10}$ ?`, c: [r`$35$`, r`$38$`, r`$30$`, r`$15$`] },
    { n: '1re', d: 'Suites', q: r`Suite géométrique : $u_0 = 2$, raison $3$. Combien vaut $u_4$ ?`, c: [r`$162$`, r`$54$`, r`$486$`, r`$14$`] },
    { n: '1re', d: 'Exponentielle', q: r`$e^2 \times e^3$ est égal à :`, c: [r`$e^5$`, r`$e^6$`, r`$2e^5$`, r`$e^{2/3}$`] },
    { n: '1re', d: 'Trigonométrie', q: r`$\cos\left(\dfrac{\pi}{3}\right)$ vaut :`, c: [r`$\dfrac12$`, r`$\dfrac{\sqrt3}{2}$`, r`$\dfrac{\sqrt2}{2}$`, r`$0$`] },
    { n: '1re', d: 'Géométrie', q: r`Le produit scalaire de $\vec u(1\,;2)$ et $\vec v(3\,;-1)$ vaut :`, c: [r`$1$`, r`$5$`, r`$-1$`, r`$7$`] },
    { n: '1re', d: 'Probabilités', q: r`$P(A) = 0{,}5$ et $P_A(B) = 0{,}4$. Combien vaut $P(A \cap B)$ ?`, c: [r`$0{,}2$`, r`$0{,}9$`, r`$0{,}1$`, r`$0{,}8$`] },

    /* ---------- Tle ---------- */
    { n: 'tle', d: 'Limites', q: r`$\displaystyle\lim_{x \to +\infty} \frac{2x+1}{x-3}$ vaut :`, c: [r`$2$`, r`$+\infty$`, r`$-\dfrac13$`, r`$1$`] },
    { n: 'tle', d: 'Logarithme', q: r`$\ln\left(e^3\right)$ vaut :`, c: [r`$3$`, r`$e^3$`, r`$\dfrac13$`, r`$\ln 3$`] },
    { n: 'tle', d: 'Intégration', q: r`Une primitive de $f(x) = 2x + 1$ est :`, c: [r`$x^2 + x$`, r`$2$`, r`$x^2 + 1$`, r`$2x^2 + x$`] },
    { n: 'tle', d: 'Intégration', q: r`$\displaystyle\int_0^1 x\,\mathrm dx$ vaut :`, c: [r`$\dfrac12$`, r`$1$`, r`$2$`, r`$0$`] },
    { n: 'tle', d: 'Dénombrement', q: r`De combien de façons peut-on choisir 2 personnes parmi 5 (sans ordre) ?`, c: [r`$10$`, r`$20$`, r`$25$`, r`$5$`] },
    { n: 'tle', d: 'Probabilités', q: r`$X$ suit la loi binomiale $\mathcal B(10\,;0{,}3)$. Son espérance vaut :`, c: [r`$3$`, r`$0{,}3$`, r`$2{,}1$`, r`$7$`] },
    { n: 'tle', d: 'Logarithme', q: r`La dérivée de $x \mapsto \ln(x^2+1)$ est :`, c: [r`$\dfrac{2x}{x^2+1}$`, r`$\dfrac{1}{x^2+1}$`, r`$2x\ln(x^2+1)$`, r`$\ln(2x)$`] },
    { n: 'tle', d: 'Limites', q: r`$\displaystyle\lim_{n \to +\infty} 0{,}5^n$ vaut :`, c: [r`$0$`, r`$1$`, r`$+\infty$`, r`$0{,}5$`] },

    /* ---------- MPSI ---------- */
    { n: 'mpsi', d: 'Complexes', q: r`Le module de $1 + i$ est :`, c: [r`$\sqrt2$`, r`$2$`, r`$1$`, r`$0$`] },
    { n: 'mpsi', d: 'Logique', q: r`La négation de « $\forall x \in \mathbb R,\ f(x) \gt 0$ » est :`, c: [r`$\exists x \in \mathbb R,\ f(x) \leq 0$`, r`$\forall x \in \mathbb R,\ f(x) \leq 0$`, r`$\exists x \in \mathbb R,\ f(x) \lt 0$`, r`$\forall x \in \mathbb R,\ f(x) \lt 0$`] },
    { n: 'mpsi', d: 'Sommes', q: r`$\displaystyle\sum_{k=1}^{n} k$ est égal à :`, c: [r`$\dfrac{n(n+1)}{2}$`, r`$\dfrac{n^2}{2}$`, r`$\dfrac{n(n-1)}{2}$`, r`$\dfrac{(n+1)^2}{2}$`] },
    { n: 'mpsi', d: 'Analyse', q: r`Le développement limité à l'ordre 2 en $0$ de $e^x$ est :`, c: [r`$1 + x + \dfrac{x^2}{2} + o(x^2)$`, r`$1 + x + x^2 + o(x^2)$`, r`$1 + x - \dfrac{x^2}{2} + o(x^2)$`, r`$x + \dfrac{x^2}{2} + o(x^2)$`] },
    { n: 'mpsi', d: 'Analyse', q: r`$\displaystyle\lim_{x \to 0} \frac{\sin x}{x}$ vaut :`, c: [r`$1$`, r`$0$`, r`$+\infty$`, r`Elle n'existe pas`] },
    { n: 'mpsi', d: 'Ensembles', q: r`L'application $f : \mathbb R \to \mathbb R,\ x \mapsto x^2$ est :`, c: [r`ni injective ni surjective`, r`injective mais pas surjective`, r`surjective mais pas injective`, r`bijective`] },
    { n: 'mpsi', d: 'Sommes', q: r`Le coefficient de $x^2$ dans $(1+x)^5$ est :`, c: [r`$10$`, r`$5$`, r`$20$`, r`$25$`] },
    { n: 'mpsi', d: 'Intégration', q: r`$\displaystyle\int_0^1 x\,e^x\,\mathrm dx$ vaut :`, c: [r`$1$`, r`$e$`, r`$e - 1$`, r`$0$`] }
  ];
})();
