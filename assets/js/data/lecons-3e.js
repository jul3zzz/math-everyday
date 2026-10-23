/* Leçons de 3e. */
(function () {
  var r = String.raw;
  addLecons('3e', [
    {
      id: '3e-arithmetique', titre: 'Arithmétique : PGCD et problèmes de partage', domaine: 'Arithmétique',
      resume: 'Diviseurs communs, plus grand diviseur commun et fractions irréductibles.',
      yt: 'yvan monka pgcd arithmétique 3e',
      cours: r`
<div class="def"><b>Définition</b><p>Le <b>PGCD</b> de deux entiers est leur plus grand diviseur commun. Deux entiers dont le PGCD vaut $1$ sont dits <b>premiers entre eux</b>.</p></div>
<div class="methode"><b>Avec les décompositions</b><p>$48 = 2^4 \times 3$ et $180 = 2^2 \times 3^2 \times 5$. On garde les facteurs communs avec le plus petit exposant : $\text{PGCD} = 2^2 \times 3 = 12$.</p></div>
<div class="methode"><b>Algorithme d'Euclide</b><p>$\text{PGCD}(a, b) = \text{PGCD}(b, r)$ où $r$ est le reste de la division de $a$ par $b$. Le dernier reste non nul est le PGCD.</p><p>$180 = 48 \times 3 + 36$ ; $48 = 36 \times 1 + 12$ ; $36 = 12 \times 3 + 0$. Donc $\text{PGCD}(180, 48) = 12$.</p></div>
<h3>Problèmes de partage</h3>
<div class="ex-box"><b>Exemple</b><p>Un fleuriste a $84$ roses et $126$ tulipes. Il veut faire le plus grand nombre de bouquets identiques en utilisant toutes les fleurs. Le nombre de bouquets doit diviser $84$ et $126$ : le maximum est $\text{PGCD}(84, 126) = 42$. Chaque bouquet contient alors $84 \div 42 = 2$ roses et $126 \div 42 = 3$ tulipes.</p></div>
<div class="prop"><b>Fraction irréductible</b><p>En divisant numérateur et dénominateur par leur PGCD, on obtient directement la fraction irréductible : $\dfrac{48}{180} = \dfrac{4}{15}$.</p></div>`,
      retenir: [r`PGCD : plus grand diviseur commun.`, r`Euclide : on remplace $(a, b)$ par $(b, r)$ jusqu'au reste nul.`, r`« Le plus grand nombre de lots identiques » $\to$ PGCD.`],
      exos: [
        { q: r`Calcule le PGCD de $48$ et $180$.`, type: 'num', rep: 12, corr: r`$48 = 2^4 \times 3$, $180 = 2^2 \times 3^2 \times 5$, donc $\text{PGCD} = 2^2 \times 3 = 12$.` },
        { q: r`Un fleuriste a $84$ roses et $126$ tulipes. Quel est le plus grand nombre de bouquets identiques qu'il peut faire en utilisant toutes les fleurs ?`, type: 'num', rep: 42, corr: r`C'est le PGCD de $84$ et $126$. Euclide : $126 = 84 \times 1 + 42$, $84 = 42 \times 2 + 0$. Donc $42$ bouquets.` },
        { q: r`Dans ce cas, combien de tulipes contient chaque bouquet ?`, type: 'num', rep: 3, corr: r`$126 \div 42 = 3$ tulipes (et $84 \div 42 = 2$ roses).` }
      ]
    },
    {
      id: '3e-identites', titre: 'Identités remarquables et factorisation', domaine: 'Calcul littéral',
      resume: 'Développer avec les identités remarquables et factoriser une expression.',
      yt: 'yvan monka identités remarquables 3e',
      cours: r`
<div class="prop"><b>Les trois identités remarquables</b>$$(a + b)^2 = a^2 + 2ab + b^2$$$$(a - b)^2 = a^2 - 2ab + b^2$$$$(a - b)(a + b) = a^2 - b^2$$</div>
<div class="ex-box"><b>Développer</b><p>$(x + 5)^2 = x^2 + 10x + 25$ &nbsp; ; &nbsp; $(3x - 2)^2 = 9x^2 - 12x + 4$.</p><p>Calcul mental : $101^2 = (100 + 1)^2 = 10\,000 + 200 + 1 = 10\,201$.</p></div>
<div class="def"><b>Factoriser</b><p>Factoriser, c'est transformer une somme en produit. C'est l'opération inverse du développement.</p></div>
<div class="methode"><b>Deux techniques</b><p><b>Facteur commun</b> : $ka + kb = k(a + b)$. Ex. : $(x+1)(2x-3) + (x+1)(x+4) = (x+1)\big[(2x-3)+(x+4)\big] = (x+1)(3x+1)$.</p><p><b>Identité remarquable</b> : $4x^2 - 25 = (2x)^2 - 5^2 = (2x - 5)(2x + 5)$.</p></div>
<div class="attention"><b>Piège</b><p>$(a + b)^2 \neq a^2 + b^2$ : on oublie souvent le double produit $2ab$. Exemple : $(3 + 4)^2 = 49$ mais $3^2 + 4^2 = 25$.</p></div>`,
      retenir: [r`$(a \pm b)^2 = a^2 \pm 2ab + b^2$.`, r`$a^2 - b^2 = (a - b)(a + b)$.`, r`Factoriser : chercher un facteur commun ou une identité.`],
      exos: [
        { q: r`Développe $(x + 5)^2$.`, type: 'qcm', choix: [r`$x^2 + 10x + 25$`, r`$x^2 + 25$`, r`$x^2 + 5x + 25$`, r`$2x + 10$`], rep: 0, corr: r`$(x + 5)^2 = x^2 + 2 \times x \times 5 + 5^2 = x^2 + 10x + 25$.` },
        { q: r`Calcule $101^2$ de tête avec une identité remarquable.`, type: 'num', rep: 10201, corr: r`$(100 + 1)^2 = 100^2 + 2 \times 100 \times 1 + 1^2 = 10\,201$.` },
        { q: r`Factorise $4x^2 - 25$.`, type: 'qcm', choix: [r`$(2x - 5)(2x + 5)$`, r`$(2x - 5)^2$`, r`$(4x - 5)(4x + 5)$`, r`$4(x - 5)(x + 5)$`], rep: 0, corr: r`$4x^2 - 25 = (2x)^2 - 5^2 = (2x - 5)(2x + 5)$.` }
      ]
    },
    {
      id: '3e-equation-produit', titre: 'Équations produit nul et équations x² = a', domaine: 'Équations',
      resume: 'Résoudre une équation en se ramenant à un produit de facteurs.',
      yt: 'yvan monka équation produit nul 3e',
      cours: r`
<div class="prop"><b>Propriété du produit nul</b><p>Un produit de facteurs est nul si et seulement si l'un au moins de ses facteurs est nul : $A \times B = 0 \iff A = 0$ ou $B = 0$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$(2x - 6)(x + 4) = 0 \iff 2x - 6 = 0$ ou $x + 4 = 0 \iff x = 3$ ou $x = -4$.</p><p>L'équation a deux solutions : $3$ et $-4$.</p></div>
<div class="methode"><b>Méthode</b><p>Si l'équation n'est pas déjà un produit nul : tout passer d'un côté pour avoir $\ldots = 0$, puis <b>factoriser</b>, puis appliquer la propriété.</p></div>
<div class="ex-box"><b>Exemple</b><p>$(x - 1)^2 - 9 = 0 \iff (x - 1 - 3)(x - 1 + 3) = 0 \iff (x - 4)(x + 2) = 0$, donc $x = 4$ ou $x = -2$.</p></div>
<div class="prop"><b>Équation $x^2 = a$</b><ul><li>si $a \gt 0$ : deux solutions, $\sqrt{a}$ et $-\sqrt{a}$ ;</li><li>si $a = 0$ : une solution, $0$ ;</li><li>si $a \lt 0$ : aucune solution (un carré est toujours positif).</li></ul></div>
<div class="attention"><b>Piège</b><p>$x^2 = 49$ a <b>deux</b> solutions : $7$ et $-7$. N'oublie pas la négative !</p></div>`,
      retenir: [r`$AB = 0 \iff A = 0$ ou $B = 0$.`, r`Se ramener à « produit $= 0$ » en factorisant.`, r`$x^2 = a$ ($a \gt 0$) : $x = \pm\sqrt{a}$.`],
      exos: [
        { q: r`Résous $(2x - 6)(x + 4) = 0$.`, type: 'liste', rep: [3, -4], corr: r`$2x - 6 = 0 \iff x = 3$ ; $x + 4 = 0 \iff x = -4$. Solutions : $3$ et $-4$.` },
        { q: r`Résous $x^2 = 49$.`, type: 'liste', rep: [7, -7], corr: r`$49 \gt 0$ : deux solutions, $\sqrt{49} = 7$ et $-7$.` },
        { q: r`Résous $(x - 1)^2 - 9 = 0$.`, type: 'liste', rep: [4, -2], indice: r`Reconnais $a^2 - b^2$ avec $a = x - 1$ et $b = 3$.`, corr: r`$(x - 1 - 3)(x - 1 + 3) = (x - 4)(x + 2) = 0$, donc $x = 4$ ou $x = -2$.` }
      ]
    },
    {
      id: '3e-inequations', titre: 'Les inéquations', domaine: 'Équations',
      resume: 'Résoudre une inéquation du premier degré et représenter ses solutions.',
      yt: 'yvan monka inéquations 3e',
      cours: r`
<p>Une inéquation est une inégalité avec une inconnue, par exemple $3x - 5 \gt 7$. Ses solutions forment en général un ensemble infini de nombres.</p>
<div class="prop"><b>Règles</b><ul><li>On peut ajouter ou soustraire un même nombre aux deux membres : le sens ne change pas.</li><li>On peut multiplier ou diviser par un même nombre <b>positif</b> : le sens ne change pas.</li><li>Si on multiplie ou divise par un nombre <b>négatif</b>, on <b>change le sens</b> de l'inégalité.</li></ul></div>
<div class="ex-box"><b>Exemples</b><p>$3x - 5 \gt 7 \iff 3x \gt 12 \iff x \gt 4$.</p><p>$-2x + 3 \leq 11 \iff -2x \leq 8 \iff x \geq -4$ &nbsp; (division par $-2$ : le sens change).</p></div>
<div class="fig"><svg viewBox="0 0 260 40" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 20h240"/><path d="M90 20h160" stroke-width="5" stroke-opacity=".35"/><text x="84" y="38" font-size="12" fill="currentColor" stroke="none">−4</text><path d="M86 12v16M86 12h6M86 28h6"/></svg></div>
<p>Les solutions de $x \geq -4$ : tous les nombres à droite de $-4$, crochet tourné vers les solutions car $-4$ est inclus.</p>
<div class="ex-box"><b>Problème</b><p>Formule A : $20$ € d'abonnement $+ 2$ € par séance. Formule B : $5$ € par séance. B est moins chère quand $5n \lt 20 + 2n \iff 3n \lt 20 \iff n \lt 6{,}67$ : jusqu'à $6$ séances.</p></div>`,
      retenir: [r`On résout comme une équation…`, r`… mais diviser par un négatif inverse le sens.`],
      exos: [
        { q: r`Résous $3x - 5 \gt 7$. Quel est le plus petit entier solution ?`, type: 'num', rep: 5, corr: r`$3x \gt 12 \iff x \gt 4$. L'inégalité est stricte, donc $4$ n'est pas solution : le plus petit entier solution est $5$.` },
        { q: r`Les solutions de $-2x + 3 \leq 11$ sont :`, type: 'qcm', choix: [r`$x \geq -4$`, r`$x \leq -4$`, r`$x \geq 4$`, r`$x \leq 7$`], rep: 0, corr: r`$-2x \leq 8$, puis on divise par $-2$ (négatif) en changeant le sens : $x \geq -4$.` },
        { q: r`Formule A : $20$ € $+ 2$ € par séance. Formule B : $5$ € par séance. Jusqu'à combien de séances la formule B est-elle strictement moins chère ?`, type: 'num', rep: 6, corr: r`$5n \lt 20 + 2n \iff 3n \lt 20 \iff n \lt \tfrac{20}{3} \approx 6{,}67$. Donc jusqu'à $6$ séances.` }
      ]
    },
    {
      id: '3e-fonctions', titre: 'La notion de fonction', domaine: 'Fonctions',
      resume: 'Image, antécédent, tableau de valeurs et courbe représentative.',
      yt: 'yvan monka notion de fonction image antécédent 3e',
      cours: r`
<div class="def"><b>Définition</b><p>Une <b>fonction</b> $f$ est un procédé qui, à un nombre $x$, associe un unique nombre noté $f(x)$. On écrit $f : x \mapsto f(x)$.</p></div>
<div class="def"><b>Image et antécédent</b><p>Si $f(3) = 7$, on dit que $7$ est <b>l'image</b> de $3$ par $f$, et que $3$ est <b>un antécédent</b> de $7$. Un nombre a toujours une seule image, mais peut avoir zéro, un ou plusieurs antécédents.</p></div>
<div class="ex-box"><b>Exemple</b><p>$f(x) = x^2 - 3x$. L'image de $-2$ : $f(-2) = (-2)^2 - 3 \times (-2) = 4 + 6 = 10$.</p><p>Antécédents de $0$ : $x^2 - 3x = 0 \iff x(x - 3) = 0 \iff x = 0$ ou $x = 3$.</p></div>
<h3>Courbe représentative</h3>
<p>Dans un repère, la courbe de $f$ est l'ensemble des points de coordonnées $(x\,;f(x))$. Lire une image : on part de l'abscisse, on monte jusqu'à la courbe, on lit l'ordonnée. Lire un antécédent : on part de l'ordonnée, on va jusqu'à la courbe, on lit l'abscisse.</p>
<table class="t"><tr><th>$x$</th><td>$-2$</td><td>$0$</td><td>$1$</td><td>$3$</td></tr><tr><th>$f(x)$</th><td>$10$</td><td>$0$</td><td>$-2$</td><td>$0$</td></tr></table>`,
      retenir: [r`$f(a) = b$ : $b$ est l'image de $a$, $a$ un antécédent de $b$.`, r`Une seule image, éventuellement plusieurs antécédents.`, r`Image : on calcule. Antécédent : on résout.`],
      exos: [
        { q: r`Soit $f(x) = x^2 - 3x$. Calcule l'image de $-2$.`, type: 'num', rep: 10, corr: r`$f(-2) = 4 - 3 \times (-2) = 4 + 6 = 10$.` },
        { q: r`Avec la même fonction, quels sont les antécédents de $0$ ?`, type: 'liste', rep: [0, 3], corr: r`$x^2 - 3x = 0 \iff x(x - 3) = 0 \iff x = 0$ ou $x = 3$.` },
        { q: r`On sait que $g(5) = -1$. Quelle phrase est juste ?`, type: 'qcm', choix: [r`$-1$ est l'image de $5$ par $g$.`, r`$5$ est l'image de $-1$ par $g$.`, r`$-1$ est un antécédent de $5$.`, r`$5$ est l'unique antécédent de $-1$.`], rep: 0, corr: r`$g(5) = -1$ : l'image de $5$ est $-1$, et $5$ est <i>un</i> antécédent de $-1$ (il peut y en avoir d'autres).` }
      ]
    },
    {
      id: '3e-affines', titre: 'Fonctions linéaires et affines', domaine: 'Fonctions',
      resume: 'Coefficient directeur, ordonnée à l\'origine et détermination d\'une fonction affine.',
      yt: 'yvan monka fonction affine 3e',
      cours: r`
<div class="def"><b>Définitions</b><p>Une fonction <b>affine</b> s'écrit $f(x) = ax + b$. Si $b = 0$, elle est <b>linéaire</b> : $f(x) = ax$ (situation de proportionnalité). Si $a = 0$, elle est constante.</p></div>
<div class="prop"><b>Représentation graphique</b><p>La courbe d'une fonction affine est une <b>droite</b>. $a$ est le <b>coefficient directeur</b> (la pente), $b$ l'<b>ordonnée à l'origine</b> (la droite passe par $(0\,;b)$). Une fonction linéaire est représentée par une droite passant par l'origine.</p></div>
<ul><li>$a \gt 0$ : la droite monte (fonction croissante) ;</li><li>$a \lt 0$ : elle descend (fonction décroissante).</li></ul>
<div class="prop"><b>Calculer $a$</b><p>Si $f(x_1) = y_1$ et $f(x_2) = y_2$, alors $a = \dfrac{y_2 - y_1}{x_2 - x_1}$ : les accroissements de $f(x)$ sont proportionnels à ceux de $x$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$f(1) = 5$ et $f(3) = 11$ : $a = \dfrac{11 - 5}{3 - 1} = 3$. Puis $f(1) = 3 \times 1 + b = 5$ donc $b = 2$ : $f(x) = 3x + 2$.</p></div>`,
      retenir: [r`Affine : $ax + b$ ; linéaire : $ax$.`, r`$a = \frac{y_2 - y_1}{x_2 - x_1}$, puis $b$ avec un point.`, r`La courbe est une droite de pente $a$ passant par $(0\,;b)$.`],
      exos: [
        { q: r`$f$ est affine avec $f(1) = 5$ et $f(3) = 11$. On écrit $f(x) = ax + b$. Combien vaut $b$ ?`, type: 'num', rep: 2, corr: r`$a = \dfrac{11 - 5}{3 - 1} = 3$. Puis $3 \times 1 + b = 5$ donc $b = 2$.` },
        { q: r`$g$ est linéaire et $g(4) = 10$. Calcule $g(6)$.`, type: 'num', rep: 15, corr: r`$g(x) = ax$ avec $4a = 10$, donc $a = 2{,}5$ et $g(6) = 15$.` },
        { q: r`La droite représentant $f(x) = -2x + 3$ :`, type: 'qcm', choix: [r`descend et passe par $(0\,;3)$`, r`monte et passe par $(0\,;3)$`, r`descend et passe par l'origine`, r`monte et passe par $(0\,;-2)$`], rep: 0, corr: r`$a = -2 \lt 0$ : la droite descend. $b = 3$ : elle coupe l'axe des ordonnées en $(0\,;3)$.` }
      ]
    },
    {
      id: '3e-evolutions', titre: 'Pourcentages d\'évolution', domaine: 'Proportionnalité',
      resume: 'Hausses, baisses, coefficient multiplicateur et évolutions successives.',
      yt: 'yvan monka pourcentage augmentation diminution 3e',
      cours: r`
<div class="prop"><b>Coefficient multiplicateur</b><p>Augmenter de $t\,\%$, c'est multiplier par $1 + \dfrac{t}{100}$. Diminuer de $t\,\%$, c'est multiplier par $1 - \dfrac{t}{100}$.</p></div>
<div class="ex-box"><b>Exemples</b><p>$80$ € augmenté de $15\,\%$ : $80 \times 1{,}15 = 92$ €.</p><p>$80$ € diminué de $30\,\%$ : $80 \times 0{,}7 = 56$ €.</p></div>
<div class="methode"><b>Retrouver la valeur initiale</b><p>Après une baisse de $30\,\%$, un prix vaut $56$ €. Le prix initial $P$ vérifie $P \times 0{,}7 = 56$, donc $P = 56 \div 0{,}7 = 80$ €. On <b>divise</b> par le coefficient.</p></div>
<div class="prop"><b>Évolutions successives</b><p>Les coefficients se <b>multiplient</b> : une hausse de $10\,\%$ puis de $20\,\%$ donne $1{,}1 \times 1{,}2 = 1{,}32$, soit une hausse globale de $32\,\%$ (et non $30\,\%$).</p></div>
<div class="attention"><b>Piège</b><p>Une hausse de $20\,\%$ suivie d'une baisse de $20\,\%$ ne ramène pas au prix de départ : $1{,}2 \times 0{,}8 = 0{,}96$, soit une baisse de $4\,\%$.</p></div>`,
      retenir: [r`Hausse de $t\,\%$ : $\times(1 + \frac{t}{100})$ ; baisse : $\times(1 - \frac{t}{100})$.`, r`Valeur initiale : on divise par le coefficient.`, r`Évolutions successives : on multiplie les coefficients.`],
      exos: [
        { q: r`Un article coûte $80$ €. Son prix augmente de $15\,\%$. Quel est son nouveau prix ?`, type: 'num', rep: 92, unite: '€', corr: r`$80 \times 1{,}15 = 92$ €.` },
        { q: r`Après une baisse de $30\,\%$, un article coûte $56$ €. Quel était son prix initial ?`, type: 'num', rep: 80, unite: '€', corr: r`$P \times 0{,}7 = 56$ donc $P = 56 \div 0{,}7 = 80$ €.` },
        { q: r`Un loyer augmente de $10\,\%$, puis de $20\,\%$. Quel est le pourcentage d'augmentation global ?`, type: 'num', rep: 32, unite: '%', corr: r`$1{,}1 \times 1{,}2 = 1{,}32$, soit $+32\,\%$.` }
      ]
    },
    {
      id: '3e-thales', titre: 'Le théorème de Thalès et sa réciproque', domaine: 'Géométrie',
      resume: 'Configurations triangle et papillon, et démonstration de parallélisme.',
      yt: 'yvan monka théorème de thalès réciproque 3e',
      cours: r`
<div class="prop"><b>Théorème de Thalès</b><p>Soient deux droites $(BM)$ et $(CN)$ sécantes en $A$. Si $(BC) \parallel (MN)$, alors $\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}$.</p></div>
<p>Cela marche quand $M$ et $N$ sont du même côté de $A$ que $B$ et $C$ (configuration « triangle »), mais aussi de l'autre côté (configuration « papillon »).</p>
<div class="fig"><svg viewBox="0 0 240 120" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 20L220 100M20 100L220 20"/><path d="M20 20v80M220 20v80" stroke-width="2.5"/><g font-size="13" fill="currentColor" stroke="none"><text x="114" y="52">A</text><text x="6" y="16">B</text><text x="6" y="112">C</text><text x="224" y="112">M</text><text x="224" y="16">N</text></g></svg></div>
<div class="ex-box"><b>Exemple (papillon)</b><p>$(BC) \parallel (MN)$, $AB = 4$, $AC = 6$, $AM = 10$. Alors $\dfrac{AN}{AC} = \dfrac{AM}{AB}$, donc $AN = \dfrac{6 \times 10}{4} = 15$.</p></div>
<div class="prop"><b>Réciproque</b><p>Si les points $A, B, M$ d'une part et $A, C, N$ d'autre part sont alignés <b>dans le même ordre</b>, et si $\dfrac{AM}{AB} = \dfrac{AN}{AC}$, alors $(BC) \parallel (MN)$.</p></div>
<div class="methode"><b>Contraposée</b><p>Si $\dfrac{AM}{AB} \neq \dfrac{AN}{AC}$, alors les droites ne sont pas parallèles. On calcule les deux rapports séparément.</p></div>`,
      retenir: [r`Parallèles $\Rightarrow$ rapports égaux.`, r`Rapports égaux + même ordre $\Rightarrow$ parallèles.`, r`Rapports différents $\Rightarrow$ pas parallèles.`],
      exos: [
        { q: r`$(BM)$ et $(CN)$ se coupent en $A$, $(BC) \parallel (MN)$, $AB = 4$ cm, $AC = 6$ cm et $AM = 10$ cm. Calcule $AN$.`, type: 'num', rep: 15, unite: 'cm', corr: r`$\dfrac{AN}{AC} = \dfrac{AM}{AB}$ donc $AN = \dfrac{6 \times 10}{4} = 15$ cm.` },
        { q: r`$A, M, B$ et $A, N, C$ sont alignés dans cet ordre. $AM = 3$, $AB = 5$, $AN = 4{,}5$, $AC = 7{,}5$. Les droites $(MN)$ et $(BC)$ sont-elles parallèles ?`, type: 'qcm', choix: [r`Oui`, r`Non`, r`On ne peut pas savoir`], rep: 0, corr: r`$\dfrac{AM}{AB} = \dfrac{3}{5} = 0{,}6$ et $\dfrac{AN}{AC} = \dfrac{4{,}5}{7{,}5} = 0{,}6$. Les rapports sont égaux et l'ordre est le même : d'après la réciproque, $(MN) \parallel (BC)$.` },
        { q: r`Un bâton vertical de $1{,}5$ m a une ombre de $2$ m. Au même moment, un arbre a une ombre de $12$ m. Quelle est la hauteur de l'arbre ?`, type: 'num', rep: 9, unite: 'm', corr: r`Les rayons du soleil sont parallèles : configuration de Thalès. $\dfrac{h}{1{,}5} = \dfrac{12}{2}$ donc $h = 1{,}5 \times 6 = 9$ m.` }
      ]
    },
    {
      id: '3e-trigonometrie', titre: 'La trigonométrie', domaine: 'Géométrie',
      resume: 'Cosinus, sinus et tangente dans le triangle rectangle.',
      yt: 'yvan monka trigonométrie 3e',
      cours: r`
<p>Dans un triangle rectangle, pour un angle aigu $\widehat{B}$, on nomme le côté <b>adjacent</b> (qui touche l'angle, hors hypoténuse), le côté <b>opposé</b> (en face) et l'<b>hypoténuse</b>.</p>
<div class="prop"><b>Formules</b>$$\cos\widehat{B} = \frac{\text{adjacent}}{\text{hypoténuse}} \qquad \sin\widehat{B} = \frac{\text{opposé}}{\text{hypoténuse}} \qquad \tan\widehat{B} = \frac{\text{opposé}}{\text{adjacent}}$$<p>Moyen mnémotechnique : <b>CAH SOH TOA</b>.</p></div>
<div class="fig"><svg viewBox="0 0 220 120" fill="none" stroke="currentColor" stroke-width="2"><path d="M30 100h160V20z"/><path d="M178 100v-12h12" stroke-width="1.5"/><path d="M60 100a30 30 0 0 0-3-12" stroke-width="1.5"/><g font-size="12" fill="currentColor" stroke="none"><text x="16" y="112">B</text><text x="194" y="112">A</text><text x="194" y="18">C</text><text x="90" y="116">adjacent</text><text x="196" y="64">opposé</text><text x="72" y="52">hypoténuse</text></g></svg></div>
<div class="ex-box"><b>Calculer une longueur</b><p>$ABC$ rectangle en $A$, $\widehat{B} = 35°$, $BC = 10$. On cherche $AC$ (opposé à $\widehat{B}$) avec l'hypoténuse : $\sin 35° = \dfrac{AC}{10}$ donc $AC = 10 \sin 35° \approx 5{,}7$.</p></div>
<div class="ex-box"><b>Calculer un angle</b><p>$AB = 4$, $BC = 8$ : $\cos\widehat{B} = \dfrac{4}{8} = 0{,}5$, donc $\widehat{B} = \arccos(0{,}5) = 60°$ (touche $\cos^{-1}$ de la calculatrice, en degrés).</p></div>
<div class="attention"><b>Piège</b><p>Vérifie que ta calculatrice est en mode <b>degrés</b>.</p></div>`,
      retenir: [r`CAH : $\cos = \frac{A}{H}$, SOH : $\sin = \frac{O}{H}$, TOA : $\tan = \frac{O}{A}$.`, r`Pour un angle : touches $\cos^{-1}$, $\sin^{-1}$, $\tan^{-1}$.`],
      exos: [
        { q: r`$ABC$ est rectangle en $A$, $\widehat{B} = 35°$ et $BC = 10$ cm. Calcule $AC$, arrondi au dixième.`, type: 'num', rep: 10 * Math.sin(35 * Math.PI / 180), tol: 0.06, unite: 'cm', corr: r`$AC$ est opposé à $\widehat B$ : $\sin 35° = \dfrac{AC}{10}$, donc $AC = 10 \sin 35° \approx 5{,}7$ cm.` },
        { q: r`$ABC$ est rectangle en $A$, $AB = 4$ cm et $BC = 8$ cm. Combien mesure $\widehat{B}$ ?`, type: 'num', rep: 60, unite: '°', corr: r`$\cos\widehat{B} = \dfrac{AB}{BC} = \dfrac{4}{8} = 0{,}5$, donc $\widehat{B} = 60°$.` },
        { q: r`$ABC$ est rectangle en $A$, $AB = 5$ m et $\widehat{B} = 40°$. Calcule $AC$, arrondi au dixième.`, type: 'num', rep: 5 * Math.tan(40 * Math.PI / 180), tol: 0.06, unite: 'm', corr: r`$\tan 40° = \dfrac{AC}{AB}$ donc $AC = 5 \tan 40° \approx 4{,}2$ m.` }
      ]
    },
    {
      id: '3e-agrandissement', titre: 'Agrandissements, réductions et homothéties', domaine: 'Géométrie',
      resume: 'L\'effet d\'un rapport k sur les longueurs, les aires et les volumes.',
      yt: 'yvan monka agrandissement réduction 3e',
      cours: r`
<div class="def"><b>Définition</b><p>Dans un agrandissement ou une réduction de rapport $k$, toutes les longueurs sont multipliées par $k$. Si $k \gt 1$ c'est un agrandissement, si $0 \lt k \lt 1$ une réduction. Les angles sont conservés.</p></div>
<div class="prop"><b>Effet sur les aires et les volumes</b><p>Les <b>aires</b> sont multipliées par $k^2$ et les <b>volumes</b> par $k^3$.</p></div>
<div class="ex-box"><b>Exemples</b><p>Rapport $3$ : un segment de $4$ cm devient $12$ cm ; une aire est multipliée par $9$.</p><p>Réduction de rapport $\dfrac12$ d'un solide de $400$ cm³ : $400 \times \left(\dfrac12\right)^3 = 50$ cm³.</p></div>
<h3>Homothétie</h3>
<p>L'homothétie de centre $O$ et de rapport $k$ transforme un point $M$ en $M'$ tel que $O$, $M$, $M'$ sont alignés et $OM' = |k| \times OM$. Si $k \gt 0$, $M'$ est du même côté que $M$ ; si $k \lt 0$, de l'autre côté de $O$. Une homothétie produit un agrandissement ou une réduction.</p>
<div class="attention"><b>Piège</b><p>Doubler les longueurs ne double pas l'aire : il la <b>quadruple</b> ($2^2 = 4$), et le volume est multiplié par $8$.</p></div>`,
      retenir: [r`Longueurs $\times k$, aires $\times k^2$, volumes $\times k^3$.`, r`Les angles sont conservés.`],
      exos: [
        { q: r`Dans un agrandissement de rapport $3$, un segment de $4$ cm devient :`, type: 'num', rep: 12, unite: 'cm', corr: r`$4 \times 3 = 12$ cm.` },
        { q: r`Dans un agrandissement de rapport $2{,}5$, par combien les aires sont-elles multipliées ?`, type: 'num', rep: 6.25, corr: r`Par $k^2 = 2{,}5^2 = 6{,}25$.` },
        { q: r`Un solide de $400$ cm³ subit une réduction de rapport $\dfrac{1}{2}$. Quel est son nouveau volume ?`, type: 'num', rep: 50, unite: 'cm³', corr: r`$400 \times \left(\dfrac12\right)^3 = 400 \times \dfrac18 = 50$ cm³.` }
      ]
    },
    {
      id: '3e-probabilites', titre: 'Probabilités : expériences à deux épreuves', domaine: 'Probabilités',
      resume: 'Arbres de probabilités, tirages avec remise et calculs de probabilités composées.',
      yt: 'yvan monka probabilités arbre 3e',
      cours: r`
<p>Quand une expérience aléatoire se déroule en deux étapes, on la représente par un <b>arbre</b>. Sur chaque branche, on écrit la probabilité correspondante.</p>
<div class="prop"><b>Règles de l'arbre</b><ul><li>La somme des probabilités des branches issues d'un même nœud vaut $1$.</li><li>La probabilité d'un chemin est le <b>produit</b> des probabilités le long du chemin.</li><li>La probabilité d'un événement est la <b>somme</b> des probabilités des chemins qui le réalisent.</li></ul></div>
<div class="ex-box"><b>Exemple</b><p>Une urne contient $2$ boules rouges et $3$ bleues. On tire une boule, on la <b>remet</b>, on en tire une seconde.</p><p>$P(RR) = \dfrac25 \times \dfrac25 = \dfrac{4}{25} = 0{,}16$.</p><p>$P(\text{deux couleurs différentes}) = P(RB) + P(BR) = \dfrac25 \times \dfrac35 + \dfrac35 \times \dfrac25 = \dfrac{12}{25} = 0{,}48$.</p></div>
<div class="attention"><b>Piège</b><p>Sans remise, la composition de l'urne change au second tirage : les probabilités de la deuxième étape ne sont plus les mêmes.</p></div>`,
      retenir: [r`Le long d'un chemin : on multiplie.`, r`Entre plusieurs chemins : on additionne.`, r`Avec ou sans remise : bien relire l'énoncé.`],
      exos: [
        { q: r`Urne : $2$ rouges, $3$ bleues. Deux tirages avec remise. Probabilité d'obtenir deux rouges ?`, type: 'num', rep: 0.16, corr: r`$\dfrac25 \times \dfrac25 = \dfrac{4}{25} = 0{,}16$.` },
        { q: r`Même expérience. Probabilité d'obtenir deux boules de couleurs différentes ?`, type: 'num', rep: 0.48, corr: r`$P(RB) + P(BR) = \dfrac{6}{25} + \dfrac{6}{25} = \dfrac{12}{25} = 0{,}48$.` },
        { q: r`On lance un dé équilibré puis une pièce. Probabilité d'obtenir $6$ et pile ? (fraction ou arrondi au centième)`, type: 'num', rep: 1 / 12, tol: 0.004, corr: r`$\dfrac16 \times \dfrac12 = \dfrac{1}{12} \approx 0{,}08$.` }
      ]
    },
    {
      id: '3e-sphere', titre: 'Sphère, boule et sections de solides', domaine: 'Géométrie',
      resume: 'Aire de la sphère, volume de la boule et sections par un plan.',
      yt: 'yvan monka sphère boule volume 3e',
      cours: r`
<div class="def"><b>Définitions</b><p>La <b>sphère</b> de centre $O$ et de rayon $r$ est l'ensemble des points de l'espace situés à la distance $r$ de $O$. La <b>boule</b> est l'ensemble des points situés à une distance inférieure ou égale à $r$ (la sphère et son intérieur).</p></div>
<div class="prop"><b>Formules</b><p>Aire de la sphère : $\mathcal{A} = 4\pi r^2$. &nbsp; Volume de la boule : $V = \dfrac{4}{3}\pi r^3$.</p></div>
<div class="ex-box"><b>Exemple</b><p>Boule de rayon $3$ cm : $V = \dfrac43 \pi \times 27 = 36\pi \approx 113{,}1$ cm³.</p></div>
<h3>Sections</h3>
<div class="prop"><b>Section d'une sphère par un plan</b><p>C'est un cercle. Si le plan est à la distance $d$ du centre (avec $d \lt r$), le rayon $\rho$ du cercle vérifie, par Pythagore : $\rho^2 = r^2 - d^2$.</p></div>
<div class="fig"><svg viewBox="0 0 200 130" fill="none" stroke="currentColor" stroke-width="2"><circle cx="100" cy="70" r="55"/><ellipse cx="100" cy="37" rx="44" ry="9"/><path d="M100 70V37h44" stroke-width="1.5"/><path d="M100 70l44-33" stroke-dasharray="4 3" stroke-width="1.5"/><g font-size="12" fill="currentColor" stroke="none"><text x="86" y="84">O</text><text x="86" y="56">d</text><text x="122" y="32">ρ</text><text x="126" y="62">r</text></g></svg></div>
<p>Autres sections : un pavé coupé parallèlement à une face donne un rectangle ; un cylindre coupé parallèlement à sa base donne un disque ; une pyramide coupée parallèlement à sa base donne une réduction de la base.</p>`,
      retenir: [r`Sphère : $4\pi r^2$ ; boule : $\frac43\pi r^3$.`, r`Section de sphère : cercle de rayon $\sqrt{r^2 - d^2}$.`],
      exos: [
        { q: r`Calcule le volume d'une boule de rayon $3$ cm, arrondi au dixième.`, type: 'num', rep: 36 * Math.PI, tol: 0.06, unite: 'cm³', corr: r`$\dfrac43 \pi \times 3^3 = 36\pi \approx 113{,}1$ cm³.` },
        { q: r`Calcule l'aire d'une sphère de rayon $5$ cm, arrondie à l'unité.`, type: 'num', rep: 100 * Math.PI, tol: 0.6, unite: 'cm²', corr: r`$4\pi \times 5^2 = 100\pi \approx 314$ cm².` },
        { q: r`Une sphère de rayon $5$ cm est coupée par un plan situé à $3$ cm du centre. Quel est le rayon de la section ?`, type: 'num', rep: 4, unite: 'cm', corr: r`$\rho^2 = 5^2 - 3^2 = 16$, donc $\rho = 4$ cm.` }
      ]
    }
  ]);
})();
