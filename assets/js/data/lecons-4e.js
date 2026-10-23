/* Leçons de 4e. */
(function () {
  var r = String.raw;
  addLecons('4e', [
    {
      id: '4e-relatifs-produit', titre: 'Multiplier et diviser des relatifs', domaine: 'Relatifs',
      resume: 'La règle des signes pour les produits et les quotients.',
      yt: 'yvan monka multiplication nombres relatifs 4e',
      cours: r`
<div class="prop"><b>Règle des signes</b><p>Le produit (ou le quotient) de deux nombres relatifs :</p><ul><li>de <b>même signe</b> est <b>positif</b> : $(-6) \times (-7) = 42$ ;</li><li>de <b>signes contraires</b> est <b>négatif</b> : $(-6) \times 7 = -42$.</li></ul><p>On calcule le produit des distances à zéro, puis on place le signe.</p></div>
<div class="prop"><b>Plusieurs facteurs</b><p>Un produit de plusieurs facteurs non nuls est positif si le nombre de facteurs négatifs est <b>pair</b>, négatif s'il est <b>impair</b>.</p></div>
<div class="ex-box"><b>Exemples</b><p>$(-2) \times (-3) \times (-5)$ : trois facteurs négatifs (impair), donc négatif : $-30$.</p><p>$(-48) \div (-6) = 8$ &nbsp; ; &nbsp; $\dfrac{35}{-7} = -5$.</p></div>
<div class="attention"><b>Piège</b><p>La règle des signes concerne les produits et quotients, <b>pas</b> les sommes : $(-3) + (-5) = -8$, alors que $(-3) \times (-5) = 15$.</p></div>`,
      retenir: [r`Même signe : positif. Signes contraires : négatif.`, r`Nombre pair de facteurs négatifs : produit positif.`],
      exos: [
        { q: r`Calcule $(-6) \times 7$.`, type: 'num', rep: -42, corr: r`Signes contraires : négatif. $6 \times 7 = 42$, donc $-42$.` },
        { q: r`Calcule $(-48) \div (-6)$.`, type: 'num', rep: 8, corr: r`Même signe : positif. $48 \div 6 = 8$.` },
        { q: r`Calcule $(-2) \times (-3) \times (-5)$.`, type: 'num', rep: -30, corr: r`Trois facteurs négatifs (nombre impair) : négatif. $2 \times 3 \times 5 = 30$, donc $-30$.` }
      ]
    },
    {
      id: '4e-fractions-produit', titre: 'Multiplier et diviser des fractions', domaine: 'Fractions',
      resume: 'Produit de fractions, inverse d\'un nombre et quotient de fractions.',
      yt: 'yvan monka multiplier diviser fractions 4e',
      cours: r`
<div class="prop"><b>Produit</b><p>On multiplie les numérateurs entre eux et les dénominateurs entre eux : $\dfrac{a}{b} \times \dfrac{c}{d} = \dfrac{a \times c}{b \times d}$.</p></div>
<div class="methode"><b>Simplifier avant de calculer</b><p>$\dfrac{3}{5} \times \dfrac{10}{9} = \dfrac{3 \times 10}{5 \times 9} = \dfrac{3 \times 2 \times 5}{5 \times 3 \times 3} = \dfrac{2}{3}$. On décompose et on barre les facteurs communs.</p></div>
<div class="def"><b>Inverse</b><p>L'inverse d'un nombre $x$ non nul est le nombre $\dfrac{1}{x}$ : leur produit vaut $1$. L'inverse de $\dfrac{a}{b}$ est $\dfrac{b}{a}$.</p></div>
<div class="prop"><b>Quotient</b><p>Diviser par une fraction, c'est multiplier par son inverse : $\dfrac{a}{b} \div \dfrac{c}{d} = \dfrac{a}{b} \times \dfrac{d}{c}$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$\dfrac{4}{7} \div \dfrac{2}{3} = \dfrac{4}{7} \times \dfrac{3}{2} = \dfrac{12}{14} = \dfrac{6}{7}$.</p></div>
<div class="ex-box"><b>Fraction d'une fraction</b><p>Prendre les $\dfrac{2}{3}$ des $\dfrac{3}{4}$ d'un réservoir, c'est calculer $\dfrac{2}{3} \times \dfrac{3}{4} = \dfrac{6}{12} = \dfrac{1}{2}$ du réservoir.</p></div>`,
      retenir: [r`$\frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd}$.`, r`L'inverse de $\frac{a}{b}$ est $\frac{b}{a}$.`, r`Diviser par une fraction = multiplier par son inverse.`],
      exos: [
        { q: r`Calcule $\dfrac{3}{5} \times \dfrac{10}{9}$ (fraction irréductible ou valeur arrondie au centième).`, type: 'num', rep: 2 / 3, tol: 0.005, corr: r`$\dfrac{3 \times 10}{5 \times 9} = \dfrac{30}{45} = \dfrac{2}{3}$.` },
        { q: r`Calcule $\dfrac{4}{7} \div \dfrac{2}{3}$ (fraction irréductible ou valeur arrondie au centième).`, type: 'num', rep: 6 / 7, tol: 0.005, corr: r`$\dfrac{4}{7} \times \dfrac{3}{2} = \dfrac{12}{14} = \dfrac{6}{7} \approx 0{,}86$.` },
        { q: r`Un réservoir est plein aux $\dfrac{3}{4}$. On utilise les $\dfrac{2}{3}$ de son contenu. Quelle fraction du réservoir a-t-on utilisée ?`, type: 'num', rep: 0.5, corr: r`$\dfrac{2}{3} \times \dfrac{3}{4} = \dfrac{6}{12} = \dfrac{1}{2}$ du réservoir.` }
      ]
    },
    {
      id: '4e-puissances', titre: 'Les puissances', domaine: 'Puissances',
      resume: 'Puissances d\'un nombre, puissances de 10 et notation scientifique.',
      yt: 'yvan monka puissances 4e',
      cours: r`
<div class="def"><b>Définition</b><p>Pour un entier $n \geq 1$, $a^n = \underbrace{a \times a \times \cdots \times a}_{n \text{ facteurs}}$. Par convention $a^0 = 1$, et pour $a \neq 0$, $a^{-n} = \dfrac{1}{a^n}$.</p></div>
<div class="ex-box"><b>Exemples</b><p>$2^5 = 32$ &nbsp; ; &nbsp; $(-3)^2 = 9$ &nbsp; ; &nbsp; $-3^2 = -9$ &nbsp; ; &nbsp; $10^{-3} = 0{,}001$.</p></div>
<div class="prop"><b>Règles de calcul</b><p>$a^m \times a^n = a^{m+n}$ &nbsp; ; &nbsp; $\dfrac{a^m}{a^n} = a^{m-n}$ &nbsp; ; &nbsp; $(a^m)^n = a^{m \times n}$.</p></div>
<p>Avec les puissances de $10$ : $10^3 \times 10^{-5} = 10^{-2} = 0{,}01$.</p>
<h3>Notation scientifique</h3>
<div class="def"><b>Définition</b><p>La notation scientifique d'un nombre positif est $a \times 10^n$ avec $1 \leq a \lt 10$ et $n$ entier relatif.</p></div>
<div class="ex-box"><b>Exemples</b><p>$45\,000 = 4{,}5 \times 10^4$ &nbsp; ; &nbsp; $0{,}00072 = 7{,}2 \times 10^{-4}$.</p></div>
<div class="attention"><b>Piège</b><p>$2^3 \neq 2 \times 3$ : $2^3 = 8$. Et $(-3)^2 \neq -3^2$ : les parenthèses changent tout.</p></div>`,
      retenir: [r`$a^m a^n = a^{m+n}$, $\frac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$.`, r`$a^{-n} = \frac{1}{a^n}$ et $a^0 = 1$.`, r`Notation scientifique : $a \times 10^n$ avec $1 \leq a \lt 10$.`],
      exos: [
        { q: r`Calcule $2^5$.`, type: 'num', rep: 32, corr: r`$2 \times 2 \times 2 \times 2 \times 2 = 32$.` },
        { q: r`Calcule $10^3 \times 10^{-5}$ et donne le résultat en écriture décimale.`, type: 'num', rep: 0.01, corr: r`$10^{3 + (-5)} = 10^{-2} = 0{,}01$.` },
        { q: r`La notation scientifique de $45\,000$ est $4{,}5 \times 10^n$. Combien vaut $n$ ?`, type: 'num', rep: 4, corr: r`On déplace la virgule de $4$ rangs : $45\,000 = 4{,}5 \times 10\,000 = 4{,}5 \times 10^4$.` }
      ]
    },
    {
      id: '4e-nombres-premiers', titre: 'Les nombres premiers', domaine: 'Arithmétique',
      resume: 'Reconnaître un nombre premier, décomposer un entier et simplifier des fractions.',
      yt: 'yvan monka nombres premiers décomposition 4e',
      cours: r`
<div class="def"><b>Définition</b><p>Un nombre entier est <b>premier</b> s'il a exactement deux diviseurs : $1$ et lui-même. Les premiers nombres premiers sont $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37\ldots$ ($1$ n'est pas premier).</p></div>
<div class="methode"><b>Tester si un nombre est premier</b><p>On essaie de le diviser par $2, 3, 5, 7, 11\ldots$ tant que le carré du diviseur ne dépasse pas le nombre. Pour $97$ : ni $2$, ni $3$, ni $5$, ni $7$ ne le divisent, et $11^2 = 121 \gt 97$, donc $97$ est premier.</p></div>
<div class="prop"><b>Décomposition</b><p>Tout entier supérieur ou égal à $2$ se décompose de façon unique en produit de facteurs premiers.</p></div>
<div class="ex-box"><b>Exemple</b><p>$84 = 2 \times 42 = 2 \times 2 \times 21 = 2^2 \times 3 \times 7$ &nbsp; et &nbsp; $126 = 2 \times 3^2 \times 7$.</p><p>Donc $\dfrac{84}{126} = \dfrac{2^2 \times 3 \times 7}{2 \times 3^2 \times 7} = \dfrac{2}{3}$.</p></div>
<div class="attention"><b>Piège</b><p>Les nombres impairs ne sont pas tous premiers : $39 = 3 \times 13$, $51 = 3 \times 17$, $57 = 3 \times 19$, $91 = 7 \times 13$.</p></div>`,
      retenir: [r`Premier = exactement deux diviseurs, $1$ et lui-même.`, r`Décomposition unique en facteurs premiers.`, r`Elle permet de simplifier les fractions.`],
      exos: [
        { q: r`Lequel de ces nombres est premier ?`, type: 'qcm', choix: [r`$37$`, r`$39$`, r`$51$`, r`$57$`], rep: 0, corr: r`$39 = 3 \times 13$, $51 = 3 \times 17$, $57 = 3 \times 19$. $37$ n'est divisible ni par $2$, ni par $3$, ni par $5$ (et $7^2 \gt 37$) : il est premier.` },
        { q: r`On écrit $72 = 2^a \times 3^b$. Combien vaut $a$ ?`, type: 'num', rep: 3, corr: r`$72 = 8 \times 9 = 2^3 \times 3^2$, donc $a = 3$ (et $b = 2$).` },
        { q: r`En utilisant les décompositions, la forme irréductible de $\dfrac{84}{126}$ est :`, type: 'qcm', choix: [r`$\dfrac{2}{3}$`, r`$\dfrac{14}{21}$`, r`$\dfrac{4}{6}$`, r`$\dfrac{3}{4}$`], rep: 0, corr: r`$\dfrac{2^2 \times 3 \times 7}{2 \times 3^2 \times 7} = \dfrac{2}{3}$.` }
      ]
    },
    {
      id: '4e-developper', titre: 'Développer et réduire', domaine: 'Calcul littéral',
      resume: 'Simple et double distributivité, réduire une expression.',
      yt: 'yvan monka développer double distributivité 4e',
      cours: r`
<div class="def"><b>Réduire</b><p>Réduire une expression, c'est regrouper les termes de même nature : $3x + 5 - x + 2 = 2x + 7$ et $x^2 + 3x + 2x^2 = 3x^2 + 3x$.</p></div>
<div class="prop"><b>Simple distributivité</b><p>$k(a + b) = ka + kb$ &nbsp; et &nbsp; $k(a - b) = ka - kb$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$3(2x - 5) = 6x - 15$ &nbsp; ; &nbsp; $-2(x - 4) = -2x + 8$.</p></div>
<div class="prop"><b>Double distributivité</b><p>$(a + b)(c + d) = ac + ad + bc + bd$ : chaque terme de la première parenthèse multiplie chaque terme de la seconde.</p></div>
<div class="ex-box"><b>Exemple</b><p>$(x + 3)(x + 5) = x^2 + 5x + 3x + 15 = x^2 + 8x + 15$.</p><p>$(2x + 1)(x - 4) = 2x^2 - 8x + x - 4 = 2x^2 - 7x - 4$.</p></div>
<div class="attention"><b>Piège</b><p>Un signe $-$ devant une parenthèse change tous les signes à l'intérieur : $5 - (x - 3) = 5 - x + 3 = 8 - x$.</p></div>`,
      retenir: [r`$k(a + b) = ka + kb$.`, r`$(a + b)(c + d) = ac + ad + bc + bd$.`, r`On termine toujours en réduisant.`],
      exos: [
        { q: r`Développe $3(2x - 5)$.`, type: 'qcm', choix: [r`$6x - 15$`, r`$6x - 5$`, r`$5x - 15$`, r`$6x + 15$`], rep: 0, corr: r`$3 \times 2x - 3 \times 5 = 6x - 15$.` },
        { q: r`Développe et réduis $(x + 3)(x + 5)$.`, type: 'qcm', choix: [r`$x^2 + 8x + 15$`, r`$x^2 + 15$`, r`$2x + 8$`, r`$x^2 + 15x + 8$`], rep: 0, corr: r`$x^2 + 5x + 3x + 15 = x^2 + 8x + 15$.` },
        { q: r`On développe $(2x + 1)(x - 4)$ sous la forme $ax^2 + bx + c$. Combien vaut $b$ ?`, type: 'num', rep: -7, corr: r`$2x^2 - 8x + x - 4 = 2x^2 - 7x - 4$, donc $b = -7$.` }
      ]
    },
    {
      id: '4e-equations', titre: 'Résoudre une équation du premier degré', domaine: 'Équations',
      resume: 'Isoler l\'inconnue en effectuant la même opération dans les deux membres.',
      yt: 'yvan monka résoudre équation 4e',
      cours: r`
<div class="def"><b>Définition</b><p>Résoudre une équation d'inconnue $x$, c'est trouver toutes les valeurs de $x$ qui rendent l'égalité vraie. Ces valeurs sont les <b>solutions</b>.</p></div>
<div class="prop"><b>Règles</b><p>Une égalité reste vraie si l'on <b>ajoute ou soustrait</b> un même nombre aux deux membres, ou si l'on <b>multiplie ou divise</b> les deux membres par un même nombre <b>non nul</b>.</p></div>
<div class="methode"><b>Méthode</b><p>1. Regrouper les termes en $x$ d'un côté, les nombres de l'autre. 2. Diviser par le coefficient de $x$. 3. Vérifier.</p></div>
<div class="ex-box"><b>Exemple</b><p>$5x + 2 = 2x + 17$</p><p>$5x - 2x = 17 - 2$ &nbsp; (on retire $2x$ et $2$ des deux côtés)</p><p>$3x = 15$ donc $x = 5$.</p><p>Vérification : $5 \times 5 + 2 = 27$ et $2 \times 5 + 17 = 27$. ✓</p></div>
<h3>Mettre un problème en équation</h3>
<p>« Le triple d'un nombre augmenté de $4$ est égal à $25$ » : on note $x$ le nombre, on écrit $3x + 4 = 25$, on résout $3x = 21$, $x = 7$, et on conclut par une phrase.</p>`,
      retenir: [r`Même opération des deux côtés de l'égalité.`, r`Les $x$ d'un côté, les nombres de l'autre.`, r`Toujours vérifier la solution.`],
      exos: [
        { q: r`Résous $3x - 7 = 11$.`, type: 'num', rep: 6, corr: r`$3x = 11 + 7 = 18$, donc $x = 18 \div 3 = 6$.` },
        { q: r`Résous $5x + 2 = 2x + 17$.`, type: 'num', rep: 5, corr: r`$5x - 2x = 17 - 2$, soit $3x = 15$, donc $x = 5$.` },
        { q: r`Le triple d'un nombre augmenté de $4$ est égal à $25$. Quel est ce nombre ?`, type: 'num', rep: 7, corr: r`$3x + 4 = 25 \iff 3x = 21 \iff x = 7$.` }
      ]
    },
    {
      id: '4e-pythagore', titre: 'Le théorème de Pythagore', domaine: 'Géométrie',
      resume: 'Calculer une longueur dans un triangle rectangle et prouver qu\'un triangle est rectangle.',
      yt: 'yvan monka théorème de pythagore 4e',
      cours: r`
<div class="prop"><b>Théorème de Pythagore</b><p>Si un triangle $ABC$ est rectangle en $A$, alors le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés : $BC^2 = AB^2 + AC^2$.</p></div>
<div class="fig"><svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="2"><path d="M30 100V20L170 100z"/><path d="M30 88h12v12" stroke-width="1.5"/><g font-size="13" fill="currentColor" stroke="none"><text x="16" y="114">A</text><text x="18" y="18">B</text><text x="174" y="114">C</text><text x="104" y="54">hypoténuse</text></g></svg></div>
<div class="ex-box"><b>Calculer l'hypoténuse</b><p>$AB = 5$, $AC = 12$ : $BC^2 = 25 + 144 = 169$, donc $BC = \sqrt{169} = 13$.</p></div>
<div class="ex-box"><b>Calculer un côté de l'angle droit</b><p>$BC = 10$, $AB = 6$ : $AC^2 = BC^2 - AB^2 = 100 - 36 = 64$, donc $AC = 8$.</p></div>
<div class="prop"><b>Réciproque</b><p>Si dans un triangle $ABC$, $BC^2 = AB^2 + AC^2$ (avec $[BC]$ le plus grand côté), alors le triangle est rectangle en $A$. Si l'égalité est fausse, il n'est pas rectangle.</p></div>
<div class="attention"><b>Piège</b><p>L'hypoténuse est toujours le côté <b>en face de l'angle droit</b>, et c'est le plus long. Ne pas additionner les longueurs : $5 + 12 \neq 13$ par hasard, c'est $\sqrt{5^2 + 12^2}$.</p></div>`,
      retenir: [r`Rectangle en $A$ $\Rightarrow BC^2 = AB^2 + AC^2$.`, r`Pour un côté de l'angle droit : on soustrait.`, r`Réciproque : on compare le carré du plus grand côté à la somme des deux autres carrés.`],
      exos: [
        { q: r`$ABC$ est rectangle en $A$ avec $AB = 5$ cm et $AC = 12$ cm. Calcule $BC$.`, type: 'num', rep: 13, unite: 'cm', corr: r`$BC^2 = 5^2 + 12^2 = 25 + 144 = 169$, donc $BC = 13$ cm.` },
        { q: r`$ABC$ est rectangle en $A$ avec $BC = 10$ cm et $AB = 6$ cm. Calcule $AC$.`, type: 'num', rep: 8, unite: 'cm', corr: r`$AC^2 = 10^2 - 6^2 = 100 - 36 = 64$, donc $AC = 8$ cm.` },
        { q: r`Quel triangle est rectangle ?`, type: 'qcm', choix: [r`côtés $7$, $24$, $25$`, r`côtés $5$, $6$, $8$`, r`côtés $4$, $5$, $7$`, r`côtés $6$, $8$, $11$`], rep: 0, corr: r`$7^2 + 24^2 = 49 + 576 = 625 = 25^2$ : rectangle. Pour les autres : $61 \neq 64$, $41 \neq 49$, $100 \neq 121$.` }
      ]
    },
    {
      id: '4e-thales', titre: 'Triangles et parallèles : le théorème de Thalès', domaine: 'Géométrie',
      resume: 'Calculer des longueurs quand une droite est parallèle à un côté d\'un triangle.',
      yt: 'yvan monka théorème de thalès 4e',
      cours: r`
<div class="prop"><b>Théorème</b><p>Soit un triangle $ABC$, $M$ un point de $[AB]$ et $N$ un point de $[AC]$. Si les droites $(MN)$ et $(BC)$ sont <b>parallèles</b>, alors :</p>$$\frac{AM}{AB} = \frac{AN}{AC} = \frac{MN}{BC}.$$</div>
<div class="fig"><svg viewBox="0 0 220 130" fill="none" stroke="currentColor" stroke-width="2"><path d="M110 10L20 120h180z"/><path d="M74 54h72"/><g font-size="13" fill="currentColor" stroke="none"><text x="106" y="8">A</text><text x="8" y="126">B</text><text x="204" y="126">C</text><text x="58" y="54">M</text><text x="150" y="54">N</text></g></svg></div>
<p>Le petit triangle $AMN$ est une réduction du grand triangle $ABC$ : toutes ses longueurs sont multipliées par le même nombre.</p>
<div class="methode"><b>Méthode</b><p>1. Citer les droites parallèles et les points alignés. 2. Écrire les trois rapports égaux. 3. Choisir les deux rapports utiles et faire un produit en croix.</p></div>
<div class="ex-box"><b>Exemple</b><p>$AM = 3$, $AB = 5$, $BC = 10$, $(MN) \parallel (BC)$. Alors $\dfrac{3}{5} = \dfrac{MN}{10}$ donc $MN = \dfrac{3 \times 10}{5} = 6$.</p></div>`,
      retenir: [r`$(MN) \parallel (BC)$ $\Rightarrow \frac{AM}{AB} = \frac{AN}{AC} = \frac{MN}{BC}$.`, r`Petit triangle en haut, grand triangle en bas.`, r`On conclut par un produit en croix.`],
      exos: [
        { q: r`$(MN) \parallel (BC)$, $AM = 3$ cm, $AB = 5$ cm, $BC = 10$ cm. Calcule $MN$.`, type: 'num', rep: 6, unite: 'cm', corr: r`$\dfrac{AM}{AB} = \dfrac{MN}{BC}$ donc $\dfrac{3}{5} = \dfrac{MN}{10}$ et $MN = \dfrac{3 \times 10}{5} = 6$ cm.` },
        { q: r`$(MN) \parallel (BC)$, $AM = 2$ cm, $AB = 6$ cm, $AC = 9$ cm. Calcule $AN$.`, type: 'num', rep: 3, unite: 'cm', corr: r`$\dfrac{AN}{AC} = \dfrac{AM}{AB}$ donc $AN = \dfrac{2 \times 9}{6} = 3$ cm.` },
        { q: r`Avec $(MN) \parallel (BC)$, $AN = 4$ cm, $AC = 10$ cm et $MN = 3$ cm. Calcule $BC$.`, type: 'num', rep: 7.5, unite: 'cm', corr: r`$\dfrac{AN}{AC} = \dfrac{MN}{BC}$ donc $\dfrac{4}{10} = \dfrac{3}{BC}$ et $BC = \dfrac{3 \times 10}{4} = 7{,}5$ cm.` }
      ]
    },
    {
      id: '4e-vitesse', titre: 'Vitesse, distance, durée', domaine: 'Proportionnalité',
      resume: 'La vitesse moyenne, les conversions d\'unités et les durées en heures et minutes.',
      yt: 'yvan monka vitesse moyenne 4e',
      cours: r`
<div class="def"><b>Vitesse moyenne</b><p>Si un mobile parcourt une distance $d$ pendant une durée $t$, sa vitesse moyenne est $v = \dfrac{d}{t}$. On en déduit $d = v \times t$ et $t = \dfrac{d}{v}$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$150$ km en $2$ h : $v = \dfrac{150}{2} = 75$ km/h.</p></div>
<div class="methode"><b>Durées : attention à la base 60</b><p>$40$ min $= \dfrac{40}{60}$ h $= \dfrac{2}{3}$ h. $1$ h $30$ min $= 1{,}5$ h. $0{,}25$ h $= 15$ min.</p></div>
<div class="ex-box"><b>Exemple</b><p>À $90$ km/h pendant $40$ min : $d = 90 \times \dfrac{2}{3} = 60$ km.</p></div>
<h3>Convertir des km/h en m/s</h3>
<p>$36$ km/h $= \dfrac{36\,000 \text{ m}}{3\,600 \text{ s}} = 10$ m/s. Pour passer de km/h à m/s, on divise par $3{,}6$.</p>
<div class="attention"><b>Piège</b><p>$1$ h $30$ ne vaut pas $1{,}30$ h mais $1{,}5$ h !</p></div>`,
      retenir: [r`$v = \frac{d}{t}$, $d = v t$, $t = \frac{d}{v}$.`, r`Convertir les minutes en heures : diviser par $60$.`, r`km/h $\to$ m/s : diviser par $3{,}6$.`],
      exos: [
        { q: r`Une voiture parcourt $150$ km en $2$ h. Quelle est sa vitesse moyenne ?`, type: 'num', rep: 75, unite: 'km/h', corr: r`$v = \dfrac{150}{2} = 75$ km/h.` },
        { q: r`Un train roule à $90$ km/h pendant $40$ min. Quelle distance parcourt-il ?`, type: 'num', rep: 60, unite: 'km', corr: r`$40$ min $= \dfrac{2}{3}$ h, donc $d = 90 \times \dfrac{2}{3} = 60$ km.` },
        { q: r`Convertis $36$ km/h en m/s.`, type: 'num', rep: 10, unite: 'm/s', corr: r`$\dfrac{36\,000}{3\,600} = 10$ m/s.` }
      ]
    },
    {
      id: '4e-statistiques', titre: 'Moyenne, médiane et étendue', domaine: 'Statistiques',
      resume: 'Résumer une série statistique par des indicateurs.',
      yt: 'yvan monka moyenne médiane 4e',
      cours: r`
<div class="def"><b>Moyenne</b><p>La moyenne d'une série est la somme des valeurs divisée par l'effectif total : pour $12$, $15$, $9$, $14$, la moyenne est $\dfrac{50}{4} = 12{,}5$.</p></div>
<div class="def"><b>Moyenne pondérée</b><p>Si les valeurs ont des effectifs (ou des coefficients), on multiplie chaque valeur par son effectif avant d'additionner, puis on divise par l'effectif total.</p></div>
<div class="def"><b>Médiane</b><p>La médiane partage la série <b>rangée dans l'ordre croissant</b> en deux groupes de même effectif.</p><ul><li>Effectif impair : c'est la valeur du milieu. $3, 7, \mathbf{8}, 12, 15 \to 8$.</li><li>Effectif pair : c'est la moyenne des deux valeurs centrales. $4, \mathbf{9}, \mathbf{11}, 20 \to 10$.</li></ul></div>
<div class="def"><b>Étendue</b><p>Étendue $=$ plus grande valeur $-$ plus petite valeur. Elle mesure la dispersion.</p></div>
<div class="attention"><b>Piège</b><p>On n'oublie jamais de <b>ranger</b> les valeurs avant de chercher la médiane. Et la médiane résiste aux valeurs extrêmes, contrairement à la moyenne.</p></div>`,
      retenir: [r`Moyenne = somme $\div$ effectif total.`, r`Médiane : série rangée, valeur du milieu.`, r`Étendue = max $-$ min.`],
      exos: [
        { q: r`Calcule la moyenne de la série : $12$ ; $15$ ; $9$ ; $14$.`, type: 'num', rep: 12.5, corr: r`$\dfrac{12 + 15 + 9 + 14}{4} = \dfrac{50}{4} = 12{,}5$.` },
        { q: r`Quelle est la médiane de la série : $12$ ; $3$ ; $15$ ; $8$ ; $7$ ?`, type: 'num', rep: 8, indice: r`Range d'abord les valeurs.`, corr: r`Rangée : $3, 7, 8, 12, 15$. La valeur du milieu est $8$.` },
        { q: r`Quelle est la médiane de la série : $4$ ; $20$ ; $9$ ; $11$ ?`, type: 'num', rep: 10, corr: r`Rangée : $4, 9, 11, 20$. Effectif pair : $\dfrac{9 + 11}{2} = 10$.` }
      ]
    },
    {
      id: '4e-probabilites', titre: 'Probabilités : événements et calculs', domaine: 'Probabilités',
      resume: 'Événement contraire, événements incompatibles et premières expériences à deux épreuves.',
      yt: 'yvan monka probabilités 4e',
      cours: r`
<div class="prop"><b>Rappels</b><p>Une probabilité est comprise entre $0$ et $1$. La somme des probabilités de toutes les issues vaut $1$. Et $P(\overline{A}) = 1 - P(A)$, où $\overline{A}$ est l'événement contraire de $A$.</p></div>
<div class="def"><b>Événements incompatibles</b><p>Deux événements sont incompatibles s'ils ne peuvent pas se produire en même temps. Alors $P(A \text{ ou } B) = P(A) + P(B)$.</p></div>
<div class="ex-box"><b>Exemple</b><p>Une roue a $8$ secteurs identiques, dont $3$ gagnants. $P(\text{gagner}) = \dfrac{3}{8} = 0{,}375$.</p></div>
<h3>Deux épreuves</h3>
<p>On lance deux pièces équilibrées. Les issues sont $PP$, $PF$, $FP$, $FF$ : quatre issues équiprobables. Donc $P(\text{deux piles}) = \dfrac14$ et $P(\text{un pile et un face}) = \dfrac{2}{4} = \dfrac12$.</p>
<div class="attention"><b>Piège</b><p>« Un pile et un face » contient deux issues ($PF$ et $FP$) : sa probabilité n'est pas $\dfrac13$.</p></div>`,
      retenir: [r`$P(\overline{A}) = 1 - P(A)$.`, r`Incompatibles : $P(A \text{ ou } B) = P(A) + P(B)$.`, r`Lister toutes les issues avant de compter.`],
      exos: [
        { q: r`$P(A) = 0{,}35$. Quelle est la probabilité de l'événement contraire de $A$ ?`, type: 'num', rep: 0.65, corr: r`$1 - 0{,}35 = 0{,}65$.` },
        { q: r`Une roue a $8$ secteurs identiques dont $3$ gagnants. Probabilité de gagner (en décimal) ?`, type: 'num', rep: 0.375, corr: r`$\dfrac{3}{8} = 0{,}375$.` },
        { q: r`On lance deux pièces équilibrées. Quelle est la probabilité d'obtenir deux fois pile ?`, type: 'num', rep: 0.25, corr: r`$4$ issues équiprobables ($PP$, $PF$, $FP$, $FF$), une seule favorable : $\dfrac14 = 0{,}25$.` }
      ]
    },
    {
      id: '4e-volumes', titre: 'Volumes de la pyramide et du cône', domaine: 'Géométrie',
      resume: 'Calculer le volume d\'une pyramide et d\'un cône, et convertir des volumes.',
      yt: 'yvan monka volume pyramide cône 4e',
      cours: r`
<div class="prop"><b>Formule</b><p>Le volume d'une pyramide ou d'un cône est le <b>tiers</b> du volume du prisme ou du cylindre de même base et de même hauteur : $V = \dfrac{\text{aire de la base} \times \text{hauteur}}{3}$.</p></div>
<ul><li>Pyramide à base carrée de côté $c$ et de hauteur $h$ : $V = \dfrac{c^2 \times h}{3}$.</li><li>Cône de rayon $r$ et de hauteur $h$ : $V = \dfrac{\pi r^2 h}{3}$.</li></ul>
<div class="ex-box"><b>Exemples</b><p>Pyramide de base carrée de côté $6$ cm, hauteur $10$ cm : $V = \dfrac{36 \times 10}{3} = 120$ cm³.</p><p>Cône de rayon $3$ cm et de hauteur $4$ cm : $V = \dfrac{\pi \times 9 \times 4}{3} = 12\pi \approx 37{,}7$ cm³.</p></div>
<h3>Conversions</h3>
<p>$1$ L $= 1$ dm³ $= 1\,000$ cm³ et $1$ m³ $= 1\,000$ L. Chaque unité de volume est $1\,000$ fois plus grande que la suivante.</p>
<div class="attention"><b>Piège</b><p>La hauteur d'un cône ou d'une pyramide se mesure <b>perpendiculairement</b> à la base, depuis le sommet : ce n'est pas la longueur de l'arête ou de la génératrice.</p></div>`,
      retenir: [r`$V = \frac{B \times h}{3}$ pour la pyramide et le cône.`, r`Cône : $V = \frac{\pi r^2 h}{3}$.`, r`$1$ L $= 1$ dm³ $= 1\,000$ cm³.`],
      exos: [
        { q: r`Calcule le volume d'une pyramide à base carrée de côté $6$ cm et de hauteur $10$ cm.`, type: 'num', rep: 120, unite: 'cm³', corr: r`$V = \dfrac{6^2 \times 10}{3} = \dfrac{360}{3} = 120$ cm³.` },
        { q: r`Calcule le volume d'un cône de rayon $3$ cm et de hauteur $4$ cm, arrondi au dixième.`, type: 'num', rep: 12 * Math.PI, tol: 0.06, unite: 'cm³', corr: r`$V = \dfrac{\pi \times 3^2 \times 4}{3} = 12\pi \approx 37{,}7$ cm³.` },
        { q: r`Combien de cm³ y a-t-il dans $2{,}5$ L ?`, type: 'num', rep: 2500, unite: 'cm³', corr: r`$1$ L $= 1\,000$ cm³, donc $2{,}5$ L $= 2\,500$ cm³.` }
      ]
    }
  ]);
})();
