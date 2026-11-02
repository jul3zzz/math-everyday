/* Problèmes longs de 2nde : un par leçon, à questions enchaînées. Étoiles : ★★ difficile, ★★★ très difficile. */
(function () {
  var r = String.raw;
  addProblemes('2nde', {
    '2nde-intervalles': { titre: 'Intervalles et distances', etoiles: 2,
      enonce: r`<p>La valeur absolue $|x - a|$ mesure la distance entre $x$ et $a$ sur la droite des réels.</p>`,
      questions: [
        { q: r`L'ensemble des $x$ tels que $|x - 3| \leqslant 2$ est un intervalle $[a\,;\,b]$. Donne $b$.`, type: 'num', rep: 5, corr: r`Les réels à distance au plus $2$ de $3$ : $[1\,;\,5]$.` },
        { q: r`Combien d'entiers appartiennent à $]-2{,}5\,;\,4]$ ?`, type: 'num', rep: 7, corr: r`$-2, -1, 0, 1, 2, 3, 4$ : $7$ entiers.` },
        { q: r`Quelle est la longueur de l'intervalle $[-3\,;\,5] \cap \,]2\,;\,8]$ ?`, type: 'num', rep: 3, corr: r`L'intersection est $]2\,;\,5]$, de longueur $5 - 2 = 3$.` },
        { q: r`Résous $|x + 1| = 4$ (solutions séparées par ;).`, type: 'liste', rep: [3, -5], corr: r`Distance $4$ entre $x$ et $-1$ : $x = -1 + 4 = 3$ ou $x = -1 - 4 = -5$.` }
      ] },
    '2nde-racines-puissances': { titre: 'Puissances et radicaux sans calculatrice', etoiles: 3,
      enonce: r`<p>Donne des résultats exacts, sans calculatrice.</p>`,
      questions: [
        { q: r`Calcule $\dfrac{2^{10} \times 4^3}{8^4}$.`, type: 'num', rep: 16, corr: r`Tout en puissances de $2$ : $\dfrac{2^{10} \times 2^6}{2^{12}} = 2^{4} = 16$.` },
        { q: r`$(\sqrt3 + \sqrt2)^2 = a + b\sqrt6$. Donne $a$.`, type: 'num', rep: 5, corr: r`$3 + 2\sqrt6 + 2 = 5 + 2\sqrt6$.` },
        { q: r`Calcule $\dfrac{1}{\sqrt2 - 1}$ (forme exacte acceptée).`, type: 'num', rep: Math.SQRT2 + 1, tol: 0.001, corr: r`On multiplie par la quantité conjuguée : $\dfrac{\sqrt2 + 1}{(\sqrt2)^2 - 1} = \sqrt2 + 1$.` },
        { q: r`$\sqrt{50} + \sqrt{32} - \sqrt{18} = a\sqrt2$. Donne $a$.`, type: 'num', rep: 6, corr: r`$5\sqrt2 + 4\sqrt2 - 3\sqrt2 = 6\sqrt2$.` }
      ] },
    '2nde-tableaux-signes': { titre: 'Signes et inéquations', etoiles: 3,
      enonce: r`<p>On étudie le signe d'expressions à l'aide de tableaux de signes.</p>`,
      questions: [
        { q: r`Combien d'entiers vérifient $(2x - 6)(-x + 1) \gt 0$ ?`, type: 'num', rep: 1, corr: r`Racines $3$ et $1$. Le produit est positif entre les racines (coefficient de $x^2$ négatif) : $]1\,;\,3[$. Seul l'entier $2$ convient.` },
        { q: r`Quel est le plus grand entier solution de $\dfrac{x + 2}{x - 4} \leqslant 0$ ?`, type: 'num', rep: 3, corr: r`Le quotient est négatif ou nul sur $[-2\,;\,4[$ ($4$ est interdit) : le plus grand entier est $3$.` },
        { q: r`Quel est l'ensemble des solutions de $x^2 \gt 9$ ?`, type: 'qcm', choix: [r`$]-\infty\,;\,-3[\, \cup \,]3\,;\,+\infty[$`, r`$]3\,;\,+\infty[$`, r`$]-3\,;\,3[$`, r`$]-\infty\,;\,3[$`], rep: 0, corr: r`$x^2 - 9 = (x - 3)(x + 3) \gt 0$ à l'extérieur des racines.` },
        { q: r`Combien d'entiers vérifient $(x - 1)^2 \lt 4$ ?`, type: 'num', rep: 3, corr: r`$-2 \lt x - 1 \lt 2 \iff -1 \lt x \lt 3$ : les entiers $0$, $1$, $2$.` }
      ] },
    '2nde-fonctions': { titre: 'L\'enclos contre le mur', etoiles: 2,
      enonce: r`<p>Avec $40$ m de grillage, on clôture un enclos rectangulaire adossé à un mur (le mur forme le 4ᵉ côté). On note $x$ la largeur (les deux côtés perpendiculaires au mur) ; la longueur est $40 - 2x$.</p>`,
      questions: [
        { q: r`L'aire est $A(x) = x(40 - 2x)$. Calcule $A(5)$ (en m²).`, type: 'num', rep: 150, corr: r`$5 \times 30 = 150$ m².` },
        { q: r`$x$ appartient à $]0\,;\,b[$. Quelle est la valeur de $b$ ?`, type: 'num', rep: 20, corr: r`Il faut $40 - 2x \gt 0$, soit $x \lt 20$.` },
        { q: r`Quelle est l'aire maximale (en m²) ?`, type: 'num', rep: 200, corr: r`$A(x) = -2x^2 + 40x = -2(x - 10)^2 + 200$ : le maximum est $200$ m².` },
        { q: r`Pour quelle largeur (en m) est-il atteint ?`, type: 'num', rep: 10, corr: r`Pour $x = 10$ m (et une longueur de $20$ m).` }
      ] },
    '2nde-fonctions-reference': { titre: 'Les fonctions de référence au travail', etoiles: 2,
      enonce: r`<p>Carré, inverse, racine carrée : utilise leurs courbes et leurs variations.</p>`,
      questions: [
        { q: r`Résous $x^2 = 7$ (solutions séparées par ;).`, type: 'liste', rep: [Math.sqrt(7), -Math.sqrt(7)], tol: 0.001, corr: r`$x = \sqrt7$ ou $x = -\sqrt7$.` },
        { q: r`Pour $x \gt 0$, l'inéquation $\dfrac1x \gt 4$ équivaut à $x \lt a$. Donne $a$.`, type: 'num', rep: 0.25, corr: r`La fonction inverse est décroissante sur $]0\,;\,+\infty[$ : $\dfrac1x \gt \dfrac{1}{1/4} \iff x \lt \dfrac14$.` },
        { q: r`Quand $x$ parcourt $[2\,;\,5]$, quelle est la plus petite valeur de $\dfrac1x$ ?`, type: 'num', rep: 0.2, corr: r`Décroissante : minimum en $x = 5$, $\dfrac15 = 0{,}2$.` },
        { q: r`Résous $\sqrt{x} = 9$.`, type: 'num', rep: 81, corr: r`$x = 9^2 = 81$.` }
      ] },
    '2nde-variations': { titre: 'Les variations d\'un trinôme', etoiles: 3,
      enonce: r`<p>On étudie $f(x) = -2x^2 + 8x - 3$ sur l'intervalle $[0\,;\,5]$.</p>`,
      questions: [
        { q: r`Calcule $f(2)$.`, type: 'num', rep: 5, corr: r`$-8 + 16 - 3 = 5$.` },
        { q: r`Quel est le maximum de $f$ sur $[0\,;\,5]$ ?`, type: 'num', rep: 5, corr: r`$f(x) = -2(x - 2)^2 + 5$ : croissante sur $[0\,;\,2]$, décroissante sur $[2\,;\,5]$, maximum $5$.` },
        { q: r`Quel est le minimum de $f$ sur $[0\,;\,5]$ ?`, type: 'num', rep: -13, corr: r`On compare les bornes : $f(0) = -3$ et $f(5) = -50 + 40 - 3 = -13$. Minimum $-13$.` },
        { q: r`Combien de solutions l'équation $f(x) = 0$ a-t-elle sur $[0\,;\,5]$ ?`, type: 'num', rep: 2, corr: r`$f$ passe de $-3$ à $5$ (croissante) puis de $5$ à $-13$ (décroissante) : elle s'annule une fois sur chaque morceau, $2$ solutions.` }
      ] },
    '2nde-vecteurs': { titre: 'Le parallélogramme dans le repère', etoiles: 2,
      enonce: r`<p>Dans un repère orthonormé : $A(1\,;\,2)$, $B(4\,;\,-1)$ et $C(6\,;\,3)$.</p>`,
      questions: [
        { q: r`Quelle est l'abscisse du vecteur $\overrightarrow{AB}$ ?`, type: 'num', rep: 3, corr: r`$\overrightarrow{AB}(4 - 1\,;\,-1 - 2) = (3\,;\,-3)$.` },
        { q: r`$D$ est tel que $ABCD$ est un parallélogramme. Quelle est l'ordonnée de $D$ ?`, type: 'num', rep: 6, corr: r`$\overrightarrow{AB} = \overrightarrow{DC}$ : $D = C - \overrightarrow{AB} = (6 - 3\,;\,3 + 3) = (3\,;\,6)$.` },
        { q: r`Quelle est l'abscisse du centre du parallélogramme ?`, type: 'num', rep: 3.5, corr: r`C'est le milieu de $[AC]$ : $\dfrac{1 + 6}{2} = 3{,}5$.` },
        { q: r`Calcule $AB$ (valeur exacte ou arrondie au centième).`, type: 'num', rep: 3 * Math.SQRT2, tol: 0.006, corr: r`$\sqrt{3^2 + (-3)^2} = \sqrt{18} = 3\sqrt2 \approx 4{,}24$.` }
      ] },
    '2nde-colinearite': { titre: 'Alignés ou pas ?', etoiles: 3,
      enonce: r`<p>Dans un repère : $A(-1\,;\,2)$, $B(3\,;\,4)$ et $C(7\,;\,6)$.</p>`,
      questions: [
        { q: r`Les points $A$, $B$, $C$ sont-ils alignés ?`, type: 'qcm', choix: [r`Oui`, r`Non`], rep: 0, corr: r`$\overrightarrow{AB}(4\,;\,2)$ et $\overrightarrow{AC}(8\,;\,4) = 2\overrightarrow{AB}$ : colinéaires, donc alignés.` },
        { q: r`Pour quelle valeur de $m$ les vecteurs $\vec u(2\,;\,m)$ et $\vec v(6\,;\,9)$ sont-ils colinéaires ?`, type: 'num', rep: 3, corr: r`$\det = 2 \times 9 - 6m = 0 \iff m = 3$.` },
        { q: r`Le point $D(5\,;\,y)$ est sur la droite $(AB)$. Donne $y$.`, type: 'num', rep: 5, corr: r`$\overrightarrow{AD}(6\,;\,y - 2)$ colinéaire à $(4\,;\,2)$ : $4(y - 2) - 12 = 0$, donc $y = 5$.` },
        { q: r`Le point $E(m\,;\,0)$ est sur $(AB)$. Donne $m$.`, type: 'num', rep: -5, corr: r`$\overrightarrow{AE}(m + 1\,;\,-2)$ : $4 \times (-2) - 2(m + 1) = 0 \iff m + 1 = -4 \iff m = -5$.` }
      ] },
    '2nde-droites': { titre: 'Deux droites qui se croisent', etoiles: 2,
      enonce: r`<p>La droite $d$ passe par $A(1\,;\,3)$ et $B(3\,;\,7)$ ; la droite $d'$ a pour équation $y = -x + 10$.</p>`,
      questions: [
        { q: r`Quel est le coefficient directeur de $d$ ?`, type: 'num', rep: 2, corr: r`$\dfrac{7 - 3}{3 - 1} = 2$.` },
        { q: r`Quelle est l'ordonnée à l'origine de $d$ ?`, type: 'num', rep: 1, corr: r`$y = 2x + p$ avec $3 = 2 + p$ : $p = 1$.` },
        { q: r`Quelle est l'abscisse du point d'intersection de $d$ et $d'$ ?`, type: 'num', rep: 3, corr: r`$2x + 1 = -x + 10 \iff 3x = 9 \iff x = 3$ (c'est le point $(3\,;\,7)$, c'est-à-dire $B$).` },
        { q: r`La droite parallèle à $d$ passant par $(0\,;\,-4)$ passe par le point d'abscisse $5$ et d'ordonnée… ?`, type: 'num', rep: 6, corr: r`Même coefficient directeur : $y = 2x - 4$, et $2 \times 5 - 4 = 6$.` }
      ] },
    '2nde-systemes': { titre: 'Les tarifs du cinéma', etoiles: 3,
      enonce: r`<p>Une famille paie $46$ € pour $2$ adultes et $3$ enfants ; une autre paie $41$ € pour $3$ adultes et $1$ enfant.</p>`,
      questions: [
        { q: r`Quel est le prix d'une place adulte (en €) ?`, type: 'num', rep: 11, corr: r`$\begin{cases} 2a + 3e = 46 \\ 3a + e = 41 \end{cases}$. De la 2ᵉ : $e = 41 - 3a$. Dans la 1ʳᵉ : $2a + 123 - 9a = 46 \iff 7a = 77 \iff a = 11$.` },
        { q: r`Quel est le prix d'une place enfant (en €) ?`, type: 'num', rep: 8, corr: r`$e = 41 - 33 = 8$ €. Vérification : $22 + 24 = 46$. ✔` },
        { q: r`Combien paie une famille de $4$ adultes et $5$ enfants (en €) ?`, type: 'num', rep: 84, corr: r`$44 + 40 = 84$ €.` },
        { q: r`Résous $\begin{cases} x + y = 10 \\ x - y = 4 \end{cases}$. Donne $x$.`, type: 'num', rep: 7, corr: r`En ajoutant : $2x = 14$, $x = 7$ (et $y = 3$).` }
      ] },
    '2nde-evolutions': { titre: 'Hausses en cascade', etoiles: 2,
      enonce: r`<p>Les évolutions successives se multiplient : on travaille avec les coefficients multiplicateurs.</p>`,
      questions: [
        { q: r`Deux hausses de $10\,\%$ de suite font une hausse globale de combien de pourcents ?`, type: 'num', rep: 21, unite: '%', corr: r`$1{,}1^2 = 1{,}21$ : $+21\,\%$.` },
        { q: r`Après une hausse de $25\,\%$, quelle baisse (en %) ramène au prix de départ ?`, type: 'num', rep: 20, unite: '%', corr: r`$\dfrac{1}{1{,}25} = 0{,}8$ : une baisse de $20\,\%$.` },
        { q: r`Une ville de $5\,000$ habitants gagne $3\,\%$ par an. Combien d'habitants après $3$ ans (arrondi à l'unité) ?`, type: 'num', rep: 5464, tol: 0.6, corr: r`$5\,000 \times 1{,}03^3 \approx 5\,463{,}6 \approx 5\,464$.` },
        { q: r`Un prix augmente de $44\,\%$ en $2$ ans. Quel est le taux annuel moyen (en %) ?`, type: 'num', rep: 20, unite: '%', corr: r`$(1 + t)^2 = 1{,}44 \iff 1 + t = 1{,}2$ : $20\,\%$ par an (et non $22\,\%$).` }
      ] },
    '2nde-probabilites': { titre: 'Sport et musique', etoiles: 3,
      enonce: r`<p>Dans une classe de $30$ élèves, $18$ font du sport, $12$ de la musique et $5$ font les deux. On choisit un élève au hasard. Réponds par des fractions.</p>`,
      questions: [
        { q: r`Probabilité qu'il fasse sport et musique ?`, type: 'num', rep: 1 / 6, corr: r`$\dfrac{5}{30} = \dfrac16$.` },
        { q: r`Probabilité qu'il fasse sport ou musique ?`, type: 'num', rep: 5 / 6, corr: r`$P(S \cup M) = \dfrac{18 + 12 - 5}{30} = \dfrac{25}{30} = \dfrac56$.` },
        { q: r`Probabilité qu'il ne fasse ni l'un ni l'autre ?`, type: 'num', rep: 1 / 6, corr: r`$1 - \dfrac56 = \dfrac16$ ($5$ élèves).` },
        { q: r`Probabilité qu'il fasse de la musique mais pas de sport ?`, type: 'num', rep: 7 / 30, corr: r`$12 - 5 = 7$ élèves : $\dfrac{7}{30}$.` }
      ] },
    '2nde-statistiques': { titre: 'Le temps de trajet', etoiles: 2,
      enonce: r`<p>Temps de trajet (en min) de $10$ élèves, rangés : $5$ ; $8$ ; $10$ ; $12$ ; $12$ ; $15$ ; $18$ ; $20$ ; $25$ ; $35$.</p>`,
      questions: [
        { q: r`Quelle est la moyenne ?`, type: 'num', rep: 16, unite: 'min', corr: r`Somme $160$, moyenne $16$ min.` },
        { q: r`Quelle est la médiane ?`, type: 'num', rep: 13.5, unite: 'min', corr: r`Moyenne des 5ᵉ et 6ᵉ valeurs : $\dfrac{12 + 15}{2} = 13{,}5$ min.` },
        { q: r`Quel est le premier quartile $Q_1$ ?`, type: 'num', rep: 10, corr: r`$\dfrac{10}{4} = 2{,}5$, on prend la 3ᵉ valeur : $Q_1 = 10$.` },
        { q: r`Quel est l'écart interquartile ?`, type: 'num', rep: 10, corr: r`$Q_3$ : $\dfrac{3 \times 10}{4} = 7{,}5$, la 8ᵉ valeur, $20$. Écart : $20 - 10 = 10$.` }
      ] },
    '2nde-echantillonnage': { titre: 'Le dé est-il truqué ?', etoiles: 3,
      enonce: r`<p>On lance un dé $900$ fois et on obtient « $6$ » $189$ fois. Pour un dé équilibré, $p = \dfrac16$.</p>`,
      questions: [
        { q: r`Quelle est la fréquence observée du $6$ ?`, type: 'num', rep: 0.21, corr: r`$\dfrac{189}{900} = 0{,}21$.` },
        { q: r`Quelle est la borne haute de l'intervalle $\left[p - \dfrac{1}{\sqrt n}\,;\,p + \dfrac{1}{\sqrt n}\right]$ ?`, type: 'num', rep: 0.2, corr: r`$\dfrac{1}{\sqrt{900}} = \dfrac{1}{30}$ et $\dfrac16 + \dfrac{1}{30} = \dfrac{6}{30} = 0{,}2$.` },
        { q: r`Que peut-on en conclure ?`, type: 'qcm', choix: [r`Le dé semble truqué (au risque de $5\,\%$ de se tromper)`, r`Le dé est sûrement équilibré`, r`On ne peut rien dire du tout`, r`Le dé est truqué à coup sûr`], rep: 0, corr: r`$0{,}21$ sort de l'intervalle : un dé équilibré ne ferait cela que dans environ $5\,\%$ des cas. On rejette l'hypothèse « dé équilibré », sans certitude absolue.` },
        { q: r`Combien de personnes faut-il interroger pour une marge de $0{,}025$ ?`, type: 'num', rep: 1600, corr: r`$\dfrac{1}{\sqrt n} = 0{,}025 \iff \sqrt n = 40 \iff n = 1\,600$.` }
      ] }
  });
})();
