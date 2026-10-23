/* Leçons de Seconde. */
(function () {
  var r = String.raw;
  addLecons('2nde', [
    {
      id: '2nde-intervalles', titre: 'Ensembles de nombres, intervalles et valeur absolue', domaine: 'Nombres',
      resume: 'ℕ, ℤ, 𝔻, ℚ, ℝ, les intervalles et la distance entre deux réels.',
      yt: 'yvan monka intervalles valeur absolue seconde',
      cours: r`
<div class="def"><b>Les ensembles de nombres</b><p>$\mathbb N \subset \mathbb Z \subset \mathbb D \subset \mathbb Q \subset \mathbb R$ : entiers naturels, entiers relatifs, décimaux, rationnels (quotients d'entiers), réels. $\dfrac13 \in \mathbb Q$ mais $\dfrac13 \notin \mathbb D$ ; $\sqrt2$ et $\pi$ sont réels mais pas rationnels : ils sont <b>irrationnels</b>.</p></div>
<h3>Intervalles</h3>
<table class="t"><tr><th>Inégalité</th><th>Intervalle</th></tr><tr><td>$a \leq x \leq b$</td><td>$[a\,;b]$</td></tr><tr><td>$a \lt x \leq b$</td><td>$]a\,;b]$</td></tr><tr><td>$x \geq a$</td><td>$[a\,;+\infty[$</td></tr><tr><td>$x \lt b$</td><td>$]-\infty\,;b[$</td></tr></table>
<p>Le crochet est tourné vers l'intérieur si la borne est incluse, vers l'extérieur sinon. Du côté de $\pm\infty$, le crochet est toujours ouvert.</p>
<div class="def"><b>Valeur absolue</b><p>$|x|$ est la distance entre $x$ et $0$ : $|x| = x$ si $x \geq 0$ et $|x| = -x$ si $x \lt 0$. Plus généralement, $|x - a|$ est la <b>distance</b> entre $x$ et $a$ sur la droite réelle.</p></div>
<div class="prop"><b>Propriété</b><p>Pour $r \gt 0$ : $|x - a| \leq r \iff x \in [a - r\,;a + r]$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$|x - 2| \lt 3$ : les réels à une distance de $2$ strictement inférieure à $3$, c'est-à-dire $x \in\ ]-1\,;5[$.</p></div>`,
      retenir: [r`$\mathbb N \subset \mathbb Z \subset \mathbb D \subset \mathbb Q \subset \mathbb R$.`, r`Crochet ouvert : borne exclue, et toujours en $\pm\infty$.`, r`$|x - a| \leq r \iff a - r \leq x \leq a + r$.`],
      exos: [
        { q: r`L'ensemble des réels $x$ tels que $|x - 2| \lt 3$ est :`, type: 'qcm', choix: [r`$]-1\,;5[$`, r`$[-1\,;5]$`, r`$]-3\,;3[$`, r`$]2\,;5[$`], rep: 0, corr: r`Distance à $2$ strictement inférieure à $3$ : $2 - 3 \lt x \lt 2 + 3$, soit $]-1\,;5[$.` },
        { q: r`Combien d'entiers relatifs appartiennent à l'intervalle $]-2{,}5\,;4]$ ?`, type: 'num', rep: 7, corr: r`$-2, -1, 0, 1, 2, 3, 4$ : $7$ entiers ($4$ est inclus).` },
        { q: r`À quel plus petit ensemble appartient $\sqrt{2}$ ?`, type: 'qcm', choix: [r`$\mathbb R$`, r`$\mathbb Q$`, r`$\mathbb D$`, r`$\mathbb Z$`], rep: 0, corr: r`$\sqrt2$ est irrationnel : il n'est pas dans $\mathbb Q$, seulement dans $\mathbb R$.` }
      ]
    },
    {
      id: '2nde-racines-puissances', titre: 'Puissances et racines carrées', domaine: 'Nombres',
      resume: 'Règles de calcul sur les puissances et simplification de racines carrées.',
      yt: 'yvan monka racine carrée simplifier seconde',
      cours: r`
<div class="prop"><b>Puissances</b><p>Pour $a, b$ non nuls et $m, n$ entiers relatifs : $a^m a^n = a^{m+n}$, $\dfrac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$, $(ab)^n = a^n b^n$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$(2^3)^2 \times 2^{-4} = 2^6 \times 2^{-4} = 2^2 = 4$.</p></div>
<div class="def"><b>Racine carrée</b><p>Pour $a \geq 0$, $\sqrt a$ est l'unique nombre positif dont le carré vaut $a$.</p></div>
<div class="prop"><b>Propriétés</b><p>Pour $a, b \geq 0$ : $\sqrt{ab} = \sqrt a \sqrt b$ et, si $b \gt 0$, $\sqrt{\dfrac ab} = \dfrac{\sqrt a}{\sqrt b}$. Mais en général $\sqrt{a + b} \neq \sqrt a + \sqrt b$ (essaie $\sqrt{9 + 16}$).</p></div>
<div class="methode"><b>Simplifier une racine</b><p>On fait apparaître le plus grand carré parfait : $\sqrt{72} = \sqrt{36 \times 2} = 6\sqrt2$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$\sqrt{12} + \sqrt{27} = 2\sqrt3 + 3\sqrt3 = 5\sqrt3$.</p></div>
<div class="methode"><b>Supprimer une racine au dénominateur</b><p>$\dfrac{1}{\sqrt3} = \dfrac{\sqrt3}{3}$ (on multiplie en haut et en bas par $\sqrt3$).</p></div>`,
      retenir: [r`$\sqrt{ab} = \sqrt a\sqrt b$ mais $\sqrt{a + b} \neq \sqrt a + \sqrt b$.`, r`Simplifier : extraire le plus grand carré parfait.`],
      exos: [
        { q: r`$\sqrt{72}$ est égal à :`, type: 'qcm', choix: [r`$6\sqrt2$`, r`$8\sqrt3$`, r`$2\sqrt{18}$`, r`$36\sqrt2$`], rep: 0, corr: r`$72 = 36 \times 2$ donc $\sqrt{72} = 6\sqrt2$. ($2\sqrt{18}$ est égal mais pas simplifié au maximum.)` },
        { q: r`Calcule $(2^3)^2 \times 2^{-4}$.`, type: 'num', rep: 4, corr: r`$2^{6} \times 2^{-4} = 2^{2} = 4$.` },
        { q: r`$\sqrt{12} + \sqrt{27}$ est égal à :`, type: 'qcm', choix: [r`$5\sqrt3$`, r`$\sqrt{39}$`, r`$6\sqrt3$`, r`$13\sqrt3$`], rep: 0, corr: r`$\sqrt{12} = 2\sqrt3$ et $\sqrt{27} = 3\sqrt3$, donc la somme vaut $5\sqrt3$.` }
      ]
    },
    {
      id: '2nde-tableaux-signes', titre: 'Tableaux de signes et inéquations', domaine: 'Équations',
      resume: 'Étudier le signe d\'un produit ou d\'un quotient pour résoudre une inéquation.',
      yt: 'yvan monka tableau de signes inéquation produit seconde',
      cours: r`
<div class="prop"><b>Signe de $ax + b$</b><p>Pour $a \neq 0$, $ax + b$ s'annule en $x = -\dfrac ba$ ; il est du <b>signe de $a$</b> à droite de cette valeur, et du signe contraire à gauche.</p></div>
<div class="methode"><b>Inéquation produit</b><p>Pour résoudre $(x - 3)(2x + 4) \leq 0$ : 1. chercher les valeurs qui annulent chaque facteur ($3$ et $-2$) ; 2. dresser un tableau avec une ligne par facteur ; 3. appliquer la règle des signes dans la dernière ligne.</p></div>
<table class="t"><tr><th>$x$</th><td>$-\infty$</td><td></td><td>$-2$</td><td></td><td>$3$</td><td></td><td>$+\infty$</td></tr>
<tr><th>$x - 3$</th><td></td><td>$-$</td><td>|</td><td>$-$</td><td>$0$</td><td>$+$</td><td></td></tr>
<tr><th>$2x + 4$</th><td></td><td>$-$</td><td>$0$</td><td>$+$</td><td>|</td><td>$+$</td><td></td></tr>
<tr><th>produit</th><td></td><td>$+$</td><td>$0$</td><td>$-$</td><td>$0$</td><td>$+$</td><td></td></tr></table>
<p>Donc $(x - 3)(2x + 4) \leq 0 \iff x \in [-2\,;3]$.</p>
<div class="prop"><b>Quotient</b><p>Même méthode pour $\dfrac{A}{B}$, mais la valeur qui annule $B$ est <b>interdite</b> : on la marque d'une double barre et on l'exclut toujours des solutions.</p></div>
<div class="ex-box"><b>Exemple</b><p>$\dfrac{x + 1}{x - 2} \gt 0 \iff x \in\ ]-\infty\,;-1[\ \cup\ ]2\,;+\infty[$.</p></div>`,
      retenir: [r`$ax + b$ a le signe de $a$ après sa racine.`, r`Un facteur par ligne, puis règle des signes.`, r`Valeur interdite d'un quotient : double barre, toujours exclue.`],
      exos: [
        { q: r`L'ensemble des solutions de $(x - 3)(2x + 4) \leq 0$ est :`, type: 'qcm', choix: [r`$[-2\,;3]$`, r`$]-\infty\,;-2] \cup [3\,;+\infty[$`, r`$]-2\,;3[$`, r`$[-3\,;2]$`], rep: 0, corr: r`Racines $-2$ et $3$ ; le produit est négatif entre les racines, et nul en ces valeurs (inégalité large) : $[-2\,;3]$.` },
        { q: r`L'ensemble des solutions de $\dfrac{x + 1}{x - 2} \gt 0$ est :`, type: 'qcm', choix: [r`$]-\infty\,;-1[\ \cup\ ]2\,;+\infty[$`, r`$]-1\,;2[$`, r`$]-\infty\,;-1]\ \cup\ [2\,;+\infty[$`, r`$]2\,;+\infty[$`], rep: 0, corr: r`Le quotient est positif à l'extérieur des valeurs $-1$ et $2$ ; inégalité stricte et $2$ interdit : $]-\infty\,;-1[\ \cup\ ]2\,;+\infty[$.` },
        { q: r`Quel est le plus petit entier $n$ tel que $3n - 7 \gt 20$ ?`, type: 'num', rep: 10, corr: r`$3n \gt 27 \iff n \gt 9$, donc le plus petit entier est $10$.` }
      ]
    },
    {
      id: '2nde-fonctions', titre: 'Généralités sur les fonctions', domaine: 'Fonctions',
      resume: 'Ensemble de définition, courbe représentative et parité.',
      yt: 'yvan monka généralités fonctions seconde',
      cours: r`
<div class="def"><b>Ensemble de définition</b><p>C'est l'ensemble des réels $x$ pour lesquels $f(x)$ existe. Deux pièges classiques : on ne divise pas par $0$, et on ne prend la racine carrée que d'un nombre positif.</p></div>
<div class="ex-box"><b>Exemples</b><p>$f(x) = \dfrac{1}{x - 4}$ est définie sur $\mathbb R \setminus \{4\}$ ($4$ est une valeur interdite).</p><p>$g(x) = \sqrt{x - 1}$ est définie sur $[1\,;+\infty[$.</p></div>
<div class="def"><b>Courbe</b><p>La courbe $\mathcal C_f$ est l'ensemble des points $M(x\,;y)$ avec $x \in D_f$ et $y = f(x)$. Un point $A(a\,;b)$ est sur $\mathcal C_f$ si et seulement si $f(a) = b$.</p></div>
<div class="def"><b>Parité</b><p>Sur un ensemble symétrique par rapport à $0$ :</p><ul><li>$f$ est <b>paire</b> si $f(-x) = f(x)$ : sa courbe est symétrique par rapport à l'axe des ordonnées (ex. $x^2$) ;</li><li>$f$ est <b>impaire</b> si $f(-x) = -f(x)$ : sa courbe est symétrique par rapport à l'origine (ex. $x^3$, $\frac1x$).</li></ul></div>
<div class="ex-box"><b>Exemple</b><p>$f(x) = 2x^2 - 1$ : $f(-3) = 2 \times 9 - 1 = 17$, et $f(-x) = 2x^2 - 1 = f(x)$ : $f$ est paire.</p></div>`,
      retenir: [r`Pas de division par $0$, pas de racine de négatif.`, r`$A(a\,;b) \in \mathcal C_f \iff f(a) = b$.`, r`Paire : $f(-x) = f(x)$ ; impaire : $f(-x) = -f(x)$.`],
      exos: [
        { q: r`Quelle est la valeur interdite de $f(x) = \dfrac{3}{x - 4}$ ?`, type: 'num', rep: 4, corr: r`Le dénominateur s'annule pour $x = 4$.` },
        { q: r`Soit $f(x) = 2x^2 - 1$. Calcule $f(-3)$.`, type: 'num', rep: 17, corr: r`$2 \times (-3)^2 - 1 = 18 - 1 = 17$.` },
        { q: r`La fonction $x \mapsto x^3 - x$ définie sur $\mathbb R$ est :`, type: 'qcm', choix: [r`impaire`, r`paire`, r`ni paire ni impaire`, r`paire et impaire`], rep: 0, corr: r`$f(-x) = -x^3 + x = -(x^3 - x) = -f(x)$ : elle est impaire.` }
      ]
    },
    {
      id: '2nde-fonctions-reference', titre: 'Les fonctions de référence', domaine: 'Fonctions',
      resume: 'Carré, inverse, racine carrée, cube : variations et comparaisons.',
      yt: 'yvan monka fonctions de référence carré inverse seconde',
      cours: r`
<table class="t"><tr><th>Fonction</th><th>Définie sur</th><th>Variations</th></tr>
<tr><td>$x^2$</td><td>$\mathbb R$</td><td>décroissante sur $]-\infty\,;0]$, croissante sur $[0\,;+\infty[$</td></tr>
<tr><td>$\dfrac1x$</td><td>$\mathbb R^*$</td><td>décroissante sur $]-\infty\,;0[$ et sur $]0\,;+\infty[$</td></tr>
<tr><td>$\sqrt x$</td><td>$[0\,;+\infty[$</td><td>croissante</td></tr>
<tr><td>$x^3$</td><td>$\mathbb R$</td><td>croissante</td></tr></table>
<div class="prop"><b>Comparer grâce aux variations</b><p>Une fonction croissante conserve l'ordre ; une fonction décroissante l'inverse. Par exemple, si $0 \lt a \lt b$ alors $a^2 \lt b^2$, $\sqrt a \lt \sqrt b$ et $\dfrac1a \gt \dfrac1b$.</p></div>
<div class="prop"><b>Équation $x^2 = k$</b><p>Si $k \gt 0$ : deux solutions $\pm\sqrt k$. Si $k = 0$ : une seule. Si $k \lt 0$ : aucune.</p></div>
<div class="ex-box"><b>Exemple</b><p>Sur $[-2\,;3]$, la fonction carré atteint son minimum $0$ en $0$ et son maximum $9$ en $3$ (car $3^2 = 9 \gt (-2)^2 = 4$).</p></div>
<div class="attention"><b>Piège</b><p>« La fonction inverse est décroissante sur $\mathbb R^*$ » est <b>faux</b> : $-1 \lt 1$ et pourtant $\frac{1}{-1} \lt \frac11$. Elle est décroissante sur chacun des deux intervalles séparément.</p></div>`,
      retenir: [r`Croissante : conserve l'ordre ; décroissante : l'inverse.`, r`Pour $x^2$ sur un intervalle contenant $0$, le minimum vaut $0$.`],
      exos: [
        { q: r`Si $0 \lt a \lt b$, alors :`, type: 'qcm', choix: [r`$\dfrac1a \gt \dfrac1b$`, r`$\dfrac1a \lt \dfrac1b$`, r`$a^2 \gt b^2$`, r`$\sqrt a \gt \sqrt b$`], rep: 0, corr: r`La fonction inverse est décroissante sur $]0\,;+\infty[$ : elle inverse l'ordre.` },
        { q: r`Résous $x^2 = 16$.`, type: 'liste', rep: [4, -4], corr: r`$16 \gt 0$ : $x = 4$ ou $x = -4$.` },
        { q: r`Quel est le maximum de $x \mapsto x^2$ sur $[-2\,;3]$ ?`, type: 'num', rep: 9, corr: r`La fonction décroît sur $[-2\,;0]$ (de $4$ à $0$) puis croît sur $[0\,;3]$ (de $0$ à $9$). Le maximum est $9$.` }
      ]
    },
    {
      id: '2nde-variations', titre: 'Variations et extremums', domaine: 'Fonctions',
      resume: 'Fonction croissante, décroissante, tableau de variations, minimum et maximum.',
      yt: 'yvan monka variations extremum fonction seconde',
      cours: r`
<div class="def"><b>Définitions</b><p>$f$ est <b>croissante</b> sur $I$ si pour tous $a \leq b$ de $I$, $f(a) \leq f(b)$. Elle est <b>décroissante</b> si $f(a) \geq f(b)$.</p></div>
<div class="def"><b>Extremums</b><p>$M$ est le <b>maximum</b> de $f$ sur $I$ s'il existe $x_0 \in I$ avec $f(x_0) = M$ et $f(x) \leq M$ pour tout $x \in I$. Même chose pour le minimum avec $\geq$.</p></div>
<div class="methode"><b>Avec une forme canonique</b><p>$f(x) = (x - 1)^2 + 3$ : un carré est toujours positif ou nul, donc $f(x) \geq 3$, avec égalité pour $x = 1$. Le minimum de $f$ est $3$, atteint en $1$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$g(x) = -x^2 + 4x = -(x^2 - 4x) = -\big((x - 2)^2 - 4\big) = 4 - (x - 2)^2$. Donc $g(x) \leq 4$ : le maximum est $4$, atteint en $x = 2$.</p></div>
<table class="t"><tr><th>$x$</th><td>$-\infty$</td><td></td><td>$2$</td><td></td><td>$+\infty$</td></tr><tr><th>$g$</th><td></td><td>↗</td><td>$4$</td><td>↘</td><td></td></tr></table>`,
      retenir: [r`Croissante : $a \leq b \Rightarrow f(a) \leq f(b)$.`, r`Forme $(x - \alpha)^2 + \beta$ : extremum $\beta$ en $\alpha$.`],
      exos: [
        { q: r`Quel est le minimum de $f(x) = (x - 1)^2 + 3$ sur $\mathbb R$ ?`, type: 'num', rep: 3, corr: r`$(x - 1)^2 \geq 0$ donc $f(x) \geq 3$, avec égalité pour $x = 1$.` },
        { q: r`Quel est le maximum de $g(x) = -x^2 + 4x$ sur $\mathbb R$ ?`, type: 'num', rep: 4, corr: r`$g(x) = 4 - (x - 2)^2 \leq 4$, avec égalité en $x = 2$.` },
        { q: r`$f$ est décroissante sur $[0\,;5]$, $f(0) = 7$ et $f(5) = -2$. Sur $[0\,;5]$ :`, type: 'qcm', choix: [r`le minimum est $-2$`, r`le minimum est $7$`, r`le maximum est $-2$`, r`$f(3) \gt 7$`], rep: 0, corr: r`Décroissante : le maximum est au début ($f(0) = 7$) et le minimum à la fin ($f(5) = -2$).` }
      ]
    },
    {
      id: '2nde-vecteurs', titre: 'Les vecteurs', domaine: 'Vecteurs',
      resume: 'Translation, égalité de vecteurs, relation de Chasles et coordonnées.',
      yt: 'yvan monka vecteurs seconde',
      cours: r`
<div class="def"><b>Définition</b><p>Le vecteur $\overrightarrow{AB}$ représente la translation qui envoie $A$ sur $B$. Il est caractérisé par une <b>direction</b>, un <b>sens</b> et une <b>norme</b> (longueur) notée $\|\overrightarrow{AB}\| = AB$.</p></div>
<div class="prop"><b>Égalité et parallélogramme</b><p>$\overrightarrow{AB} = \overrightarrow{DC} \iff ABCD$ est un parallélogramme (éventuellement aplati).</p></div>
<div class="prop"><b>Relation de Chasles</b><p>Pour tous points $A, B, C$ : $\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$.</p></div>
<h3>Coordonnées</h3>
<div class="prop"><b>Formules</b><p>Si $A(x_A\,;y_A)$ et $B(x_B\,;y_B)$ : $\overrightarrow{AB}\begin{pmatrix} x_B - x_A \\ y_B - y_A \end{pmatrix}$, et dans un repère orthonormé, $AB = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$. Le milieu de $[AB]$ a pour coordonnées $\left(\dfrac{x_A + x_B}{2}\,;\dfrac{y_A + y_B}{2}\right)$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$A(1\,;2)$, $B(4\,;-2)$ : $\overrightarrow{AB}(3\,;-4)$ et $AB = \sqrt{9 + 16} = 5$.</p></div>
<div class="ex-box"><b>Quatrième sommet</b><p>$ABCD$ parallélogramme avec $A(1\,;1)$, $B(4\,;2)$, $C(5\,;5)$ : $\overrightarrow{AD} = \overrightarrow{BC}(1\,;3)$ donc $D(2\,;4)$.</p></div>`,
      retenir: [r`$\overrightarrow{AB} = \overrightarrow{DC} \iff ABCD$ parallélogramme.`, r`Chasles : $\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$.`, r`$\overrightarrow{AB}(x_B - x_A\,;y_B - y_A)$.`],
      exos: [
        { q: r`$A(1\,;2)$ et $B(4\,;-2)$ dans un repère orthonormé. Calcule $AB$.`, type: 'num', rep: 5, corr: r`$\overrightarrow{AB}(3\,;-4)$, donc $AB = \sqrt{3^2 + 4^2} = 5$.` },
        { q: r`$\overrightarrow{AB} + \overrightarrow{BC} + \overrightarrow{CA}$ est égal à :`, type: 'qcm', choix: [r`$\vec 0$`, r`$2\overrightarrow{AC}$`, r`$\overrightarrow{AB}$`, r`$\overrightarrow{CA}$`], rep: 0, corr: r`Chasles : $\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}$, puis $\overrightarrow{AC} + \overrightarrow{CA} = \overrightarrow{AA} = \vec 0$.` },
        { q: r`$ABCD$ est un parallélogramme avec $A(1\,;1)$, $B(4\,;2)$ et $C(5\,;5)$. Les coordonnées de $D$ sont :`, type: 'qcm', choix: [r`$(2\,;4)$`, r`$(8\,;6)$`, r`$(0\,;-2)$`, r`$(4\,;2)$`], rep: 0, corr: r`$\overrightarrow{AD} = \overrightarrow{BC} = (1\,;3)$, donc $D = (1 + 1\,;1 + 3) = (2\,;4)$.` }
      ]
    },
    {
      id: '2nde-colinearite', titre: 'Colinéarité et alignement', domaine: 'Vecteurs',
      resume: 'Le déterminant de deux vecteurs pour prouver un alignement ou un parallélisme.',
      yt: 'yvan monka colinéarité déterminant seconde',
      cours: r`
<div class="def"><b>Colinéarité</b><p>Deux vecteurs $\vec u$ et $\vec v$ sont <b>colinéaires</b> s'il existe un réel $k$ tel que $\vec v = k\vec u$ (ou si $\vec u = \vec 0$). Ils ont alors la même direction.</p></div>
<div class="prop"><b>Déterminant</b><p>Pour $\vec u(x\,;y)$ et $\vec v(x'\,;y')$ : $\det(\vec u, \vec v) = xy' - yx'$. Et $\vec u$, $\vec v$ sont colinéaires $\iff \det(\vec u, \vec v) = 0$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$\vec u(2\,;5)$, $\vec v(3\,;-1)$ : $\det = 2 \times (-1) - 5 \times 3 = -17 \neq 0$, non colinéaires.</p></div>
<div class="prop"><b>Applications</b><ul><li>$A$, $B$, $C$ sont <b>alignés</b> $\iff \overrightarrow{AB}$ et $\overrightarrow{AC}$ sont colinéaires.</li><li>$(AB) \parallel (CD) \iff \overrightarrow{AB}$ et $\overrightarrow{CD}$ sont colinéaires.</li></ul></div>
<div class="ex-box"><b>Exemple</b><p>$A(0\,;1)$, $B(2\,;5)$, $C(4\,;9)$ : $\overrightarrow{AB}(2\,;4)$, $\overrightarrow{AC}(4\,;8)$, $\det = 2 \times 8 - 4 \times 4 = 0$. Les points sont alignés.</p></div>`,
      retenir: [r`$\det(\vec u, \vec v) = xy' - yx'$.`, r`Colinéaires $\iff \det = 0$.`, r`Alignement : $\overrightarrow{AB}$, $\overrightarrow{AC}$ colinéaires.`],
      exos: [
        { q: r`Calcule $\det(\vec u, \vec v)$ pour $\vec u(2\,;5)$ et $\vec v(3\,;-1)$.`, type: 'num', rep: -17, corr: r`$2 \times (-1) - 5 \times 3 = -2 - 15 = -17$.` },
        { q: r`Pour quelle valeur de $k$ les vecteurs $\vec u(3\,;-6)$ et $\vec v(-2\,;k)$ sont-ils colinéaires ?`, type: 'num', rep: 4, corr: r`$\det = 3k - (-6)(-2) = 3k - 12 = 0 \iff k = 4$.` },
        { q: r`Les points $A(0\,;1)$, $B(2\,;5)$ et $C(4\,;9)$ sont-ils alignés ?`, type: 'qcm', choix: [r`Oui`, r`Non`], rep: 0, corr: r`$\overrightarrow{AB}(2\,;4)$ et $\overrightarrow{AC}(4\,;8)$ : $\det = 16 - 16 = 0$. Ils sont alignés.` }
      ]
    },
    {
      id: '2nde-droites', titre: 'Équations de droites', domaine: 'Géométrie',
      resume: 'Équation réduite, coefficient directeur, vecteur directeur et droites parallèles.',
      yt: 'yvan monka équation de droite seconde',
      cours: r`
<div class="prop"><b>Équation réduite</b><p>Toute droite non verticale a une équation de la forme $y = mx + p$ : $m$ est le <b>coefficient directeur</b>, $p$ l'<b>ordonnée à l'origine</b>. Une droite verticale a une équation $x = c$.</p></div>
<div class="prop"><b>Coefficient directeur</b><p>Si $A(x_A\,;y_A)$ et $B(x_B\,;y_B)$ avec $x_A \neq x_B$ : $m = \dfrac{y_B - y_A}{x_B - x_A}$.</p></div>
<div class="ex-box"><b>Exemple</b><p>Droite par $A(1\,;3)$ et $B(3\,;7)$ : $m = \dfrac{7 - 3}{3 - 1} = 2$. Puis $3 = 2 \times 1 + p$ donc $p = 1$ : $y = 2x + 1$.</p></div>
<div class="prop"><b>Équation cartésienne</b><p>Toute droite a une équation $ax + by + c = 0$ ; le vecteur $\vec u(-b\,;a)$ en est un <b>vecteur directeur</b>.</p></div>
<div class="prop"><b>Parallélisme</b><p>Deux droites d'équations $y = mx + p$ et $y = m'x + p'$ sont parallèles $\iff m = m'$.</p></div>
<div class="ex-box"><b>Intersection</b><p>$y = 2x + 1$ et $y = -x + 7$ : $2x + 1 = -x + 7 \iff x = 2$, puis $y = 5$. Point d'intersection $(2\,;5)$.</p></div>`,
      retenir: [r`$y = mx + p$ avec $m = \frac{\Delta y}{\Delta x}$.`, r`$ax + by + c = 0$ : vecteur directeur $(-b\,;a)$.`, r`Parallèles $\iff$ même coefficient directeur.`],
      exos: [
        { q: r`La droite passant par $A(1\,;3)$ et $B(3\,;7)$ a pour équation $y = mx + p$. Combien vaut $p$ ?`, type: 'num', rep: 1, corr: r`$m = \dfrac{4}{2} = 2$ et $3 = 2 + p$ donc $p = 1$.` },
        { q: r`Quel est le coefficient directeur de la droite d'équation $2x - 3y + 5 = 0$ ?`, type: 'num', rep: 2 / 3, tol: 0.005, corr: r`$3y = 2x + 5 \iff y = \dfrac23 x + \dfrac53$ : $m = \dfrac23$.` },
        { q: r`Les droites $y = 2x + 1$ et $y = -x + 7$ se coupent en un point. Quelle est son ordonnée ?`, type: 'num', rep: 5, corr: r`$2x + 1 = -x + 7 \iff 3x = 6 \iff x = 2$, puis $y = 2 \times 2 + 1 = 5$.` }
      ]
    },
    {
      id: '2nde-systemes', titre: 'Systèmes de deux équations', domaine: 'Équations',
      resume: 'Résoudre un système linéaire par substitution ou par combinaison.',
      yt: 'yvan monka système d\'équations seconde',
      cours: r`
<p>Un système de deux équations linéaires à deux inconnues correspond à deux droites. Ses solutions sont les coordonnées de leurs points communs.</p>
<div class="prop"><b>Nombre de solutions</b><p>Pour $\begin{cases} ax + by = c \\ a'x + b'y = c' \end{cases}$ : si $ab' - ba' \neq 0$, une <b>unique</b> solution (droites sécantes). Sinon, aucune solution (droites strictement parallèles) ou une infinité (droites confondues).</p></div>
<div class="methode"><b>Substitution</b><p>$\begin{cases} 2x + 3y = 12 \\ x - y = 1 \end{cases}$ : la seconde donne $x = y + 1$. On remplace : $2(y + 1) + 3y = 12 \iff 5y = 10 \iff y = 2$, puis $x = 3$.</p></div>
<div class="methode"><b>Combinaison</b><p>On multiplie les équations pour qu'une inconnue disparaisse en les additionnant ou soustrayant.</p></div>
<div class="ex-box"><b>Problème</b><p>$3$ cafés et $2$ croissants coûtent $7{,}70$ € ; $2$ cafés et $3$ croissants $7{,}80$ €. En additionnant : $5c + 5k = 15{,}5$, donc $c + k = 3{,}1$. En soustrayant : $c - k = -0{,}1$. Donc $c = 1{,}5$ € et $k = 1{,}6$ €.</p></div>`,
      retenir: [r`$ab' - ba' \neq 0$ : une seule solution.`, r`Substitution : isoler une inconnue et remplacer.`, r`Combinaison : éliminer une inconnue.`],
      exos: [
        { q: r`Résous $\begin{cases} 2x + 3y = 12 \\ x - y = 1 \end{cases}$. Combien vaut $x$ ?`, type: 'num', rep: 3, corr: r`$x = y + 1$, donc $2y + 2 + 3y = 12$, $y = 2$ et $x = 3$.` },
        { q: r`$3$ cafés et $2$ croissants coûtent $7{,}70$ € ; $2$ cafés et $3$ croissants coûtent $7{,}80$ €. Quel est le prix d'un croissant ?`, type: 'num', rep: 1.6, unite: '€', corr: r`Somme : $c + k = 3{,}1$ ; différence : $c - k = -0{,}1$. Donc $k = 1{,}6$ €.` },
        { q: r`Combien de solutions a le système $\begin{cases} 2x - y = 3 \\ -4x + 2y = 1 \end{cases}$ ?`, type: 'qcm', choix: [r`aucune`, r`une seule`, r`une infinité`, r`deux`], rep: 0, corr: r`$ab' - ba' = 2 \times 2 - (-1)(-4) = 0$ : droites parallèles. La seconde équation donne $2x - y = -\tfrac12 \neq 3$ : elles sont strictement parallèles, aucune solution.` }
      ]
    },
    {
      id: '2nde-evolutions', titre: 'Évolutions successives et réciproques', domaine: 'Proportionnalité',
      resume: 'Taux d\'évolution, coefficient multiplicateur, évolution réciproque.',
      yt: 'yvan monka évolutions successives réciproque seconde',
      cours: r`
<div class="def"><b>Taux d'évolution</b><p>Quand une grandeur passe de $V_0$ à $V_1$, le taux d'évolution est $t = \dfrac{V_1 - V_0}{V_0}$ et le coefficient multiplicateur $CM = \dfrac{V_1}{V_0} = 1 + t$.</p></div>
<div class="ex-box"><b>Exemple</b><p>De $80$ à $92$ : $t = \dfrac{12}{80} = 0{,}15$, soit $+15\,\%$.</p></div>
<div class="prop"><b>Évolutions successives</b><p>Le coefficient global est le <b>produit</b> des coefficients : $CM = CM_1 \times CM_2 \times \cdots$. Trois hausses de $5\,\%$ : $1{,}05^3 \approx 1{,}1576$, soit environ $+15{,}76\,\%$.</p></div>
<div class="prop"><b>Évolution réciproque</b><p>Pour revenir à la valeur de départ après une évolution de coefficient $CM$, il faut une évolution de coefficient $\dfrac{1}{CM}$.</p></div>
<div class="ex-box"><b>Exemple</b><p>Après $+25\,\%$ ($CM = 1{,}25$), il faut un coefficient $\dfrac{1}{1{,}25} = 0{,}8$, soit une baisse de $20\,\%$ (et non de $25\,\%$).</p></div>`,
      retenir: [r`$t = \frac{V_1 - V_0}{V_0}$ et $CM = 1 + t$.`, r`Successives : on multiplie les $CM$.`, r`Réciproque : $\frac{1}{CM}$.`],
      exos: [
        { q: r`Un prix passe de $80$ € à $92$ €. Quel est le taux d'évolution, en pourcentage ?`, type: 'num', rep: 15, unite: '%', corr: r`$\dfrac{92 - 80}{80} = 0{,}15$, soit $15\,\%$.` },
        { q: r`Un prix augmente de $25\,\%$. De quel pourcentage doit-il baisser pour revenir à sa valeur initiale ?`, type: 'num', rep: 20, unite: '%', corr: r`$\dfrac{1}{1{,}25} = 0{,}8$ : une baisse de $20\,\%$.` },
        { q: r`Une population augmente de $5\,\%$ par an pendant $3$ ans. Quel est le pourcentage d'augmentation global, arrondi au centième ?`, type: 'num', rep: 15.7625, tol: 0.006, unite: '%', corr: r`$1{,}05^3 = 1{,}157625$, soit $+15{,}76\,\%$.` }
      ]
    },
    {
      id: '2nde-probabilites', titre: 'Probabilités : réunion et intersection', domaine: 'Probabilités',
      resume: 'Univers, événements, A∩B, A∪B et la formule P(A∪B).',
      yt: 'yvan monka probabilités réunion intersection seconde',
      cours: r`
<div class="def"><b>Vocabulaire</b><p>L'<b>univers</b> $\Omega$ est l'ensemble des issues. $A \cap B$ (« $A$ et $B$ ») est réalisé quand les deux le sont ; $A \cup B$ (« $A$ ou $B$ ») quand au moins l'un l'est. $\overline A$ est le contraire de $A$.</p></div>
<div class="prop"><b>Formule fondamentale</b><p>$P(A \cup B) = P(A) + P(B) - P(A \cap B)$. On retire l'intersection, comptée deux fois.</p></div>
<div class="ex-box"><b>Exemple</b><p>On tire une carte dans un jeu de $32$ cartes. $R$ : « roi » ($4$ cartes), $C$ : « cœur » ($8$ cartes). $R \cap C$ : le roi de cœur ($1$ carte). $P(R \cup C) = \dfrac{4}{32} + \dfrac{8}{32} - \dfrac{1}{32} = \dfrac{11}{32}$.</p></div>
<div class="ex-box"><b>Deux dés</b><p>On lance deux dés : $36$ issues équiprobables. La somme vaut $7$ pour $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ : $P = \dfrac{6}{36} = \dfrac16$.</p></div>
<div class="attention"><b>Piège</b><p>« Ou » en maths est inclusif : $A \cup B$ comprend le cas où les deux se produisent.</p></div>`,
      retenir: [r`$P(A \cup B) = P(A) + P(B) - P(A \cap B)$.`, r`$P(\overline A) = 1 - P(A)$.`, r`Tableau ou liste exhaustive des issues pour bien compter.`],
      exos: [
        { q: r`$P(A) = 0{,}5$, $P(B) = 0{,}4$ et $P(A \cap B) = 0{,}2$. Calcule $P(A \cup B)$.`, type: 'num', rep: 0.7, corr: r`$0{,}5 + 0{,}4 - 0{,}2 = 0{,}7$.` },
        { q: r`On tire une carte dans un jeu de $32$. Probabilité de tirer un roi ou un cœur ? (fraction ou décimal)`, type: 'num', rep: 11 / 32, tol: 0.001, corr: r`$\dfrac{4 + 8 - 1}{32} = \dfrac{11}{32} \approx 0{,}344$.` },
        { q: r`On lance deux dés équilibrés. Probabilité que la somme fasse $7$ ? (fraction ou arrondi au centième)`, type: 'num', rep: 1 / 6, tol: 0.004, corr: r`$6$ issues favorables sur $36$ : $\dfrac16 \approx 0{,}17$.` }
      ]
    }
  ]);
})();
