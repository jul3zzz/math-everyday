/* Leçons de 6e. Les maths sont en LaTeX ($…$) ; jamais de « < » brut : utiliser \lt et \gt. */
(function () {
  var r = String.raw;
  addLecons('6e', [
    {
      id: '6e-decimaux', titre: 'Les nombres décimaux', domaine: 'Nombres',
      resume: 'Lire, écrire, décomposer et comparer des nombres à virgule.',
      yt: 'yvan monka nombres décimaux 6e',
      cours: r`
<p>Un nombre décimal s'écrit avec une <b>partie entière</b> et une <b>partie décimale</b>, séparées par la virgule. Chaque chiffre a une valeur qui dépend de sa position.</p>
<table class="t"><tr><th>centaines</th><th>dizaines</th><th>unités</th><th>,</th><th>dixièmes</th><th>centièmes</th><th>millièmes</th></tr>
<tr><td></td><td>4</td><td>7</td><td>,</td><td>8</td><td>1</td><td>9</td></tr></table>
<p>Dans $47{,}819$ : le chiffre des dixièmes est $8$, celui des centièmes est $1$, celui des millièmes est $9$.</p>
<div class="def"><b>Définition</b><p>Un nombre décimal peut s'écrire comme une fraction dont le dénominateur est $10$, $100$, $1\,000$… On parle de <b>fraction décimale</b> : $3{,}47 = \dfrac{347}{100} = 3 + \dfrac{4}{10} + \dfrac{7}{100}$.</p></div>
<h3>Zéros inutiles</h3>
<p>Ajouter ou retirer des zéros à la fin de la partie décimale ne change pas le nombre : $2{,}5 = 2{,}50 = 2{,}500$. C'est très utile pour comparer.</p>
<div class="methode"><b>Méthode : comparer deux décimaux</b><p>1. On compare les parties entières. 2. Si elles sont égales, on compare les dixièmes, puis les centièmes, etc. Astuce : écrire les deux nombres avec le même nombre de chiffres après la virgule.</p></div>
<div class="ex-box"><b>Exemple</b><p>Comparer $3{,}7$ et $3{,}68$. On écrit $3{,}70$ et $3{,}68$ : même partie entière, puis $7 \gt 6$ au rang des dixièmes. Donc $3{,}7 \gt 3{,}68$.</p></div>
<div class="attention"><b>Piège</b><p>Ce n'est pas le nombre « le plus long » qui est le plus grand : $0{,}8 \gt 0{,}709$ car $8$ dixièmes battent $7$ dixièmes.</p></div>`,
      retenir: [r`La valeur d'un chiffre dépend de sa position : dixièmes, centièmes, millièmes…`, r`$a{,}bc = a + \frac{b}{10} + \frac{c}{100}$`, r`Pour comparer, on égalise le nombre de décimales puis on compare rang par rang.`],
      exos: [
        { q: r`Écris sous forme d'un nombre décimal : $5 + \dfrac{3}{10} + \dfrac{8}{1000}$.`, type: 'num', rep: 5.308,
          indice: r`Il n'y a pas de centièmes : pense à mettre un $0$ à ce rang.`,
          corr: r`$5$ unités, $3$ dixièmes, $0$ centième et $8$ millièmes : $5{,}308$.` },
        { q: r`Quel nombre est compris entre $2{,}3$ et $2{,}4$ ?`, type: 'qcm', choix: [r`$2{,}35$`, r`$2{,}04$`, r`$2{,}41$`, r`$2{,}3$`], rep: 0,
          corr: r`On écrit $2{,}30 \lt 2{,}35 \lt 2{,}40$. $2{,}04$ est plus petit que $2{,}3$, $2{,}41$ est plus grand que $2{,}4$, et $2{,}3$ n'est pas strictement entre les deux.` },
        { q: r`Quel est le chiffre des centièmes de $47{,}819$ ?`, type: 'num', rep: 1,
          corr: r`Après la virgule : $8$ dixièmes, $1$ centième, $9$ millièmes. Le chiffre des centièmes est $1$.` }
      ]
    },
    {
      id: '6e-addsous', titre: 'Additionner et soustraire des décimaux', domaine: 'Nombres',
      resume: 'Poser une opération en alignant les virgules et vérifier avec un ordre de grandeur.',
      yt: 'yvan monka addition soustraction nombres décimaux 6e',
      cours: r`
<p>Pour additionner ou soustraire des nombres décimaux, on aligne les chiffres <b>de même rang</b> : unités sous unités, dixièmes sous dixièmes… donc <b>virgule sous virgule</b>.</p>
<div class="methode"><b>Méthode : poser l'opération</b><p>1. Aligner les virgules. 2. Compléter avec des zéros pour avoir le même nombre de décimales. 3. Calculer comme avec des entiers, en partant de la droite, sans oublier les retenues. 4. Placer la virgule du résultat dans l'alignement.</p></div>
<div class="ex-box"><b>Exemple</b><p>$12{,}7 + 8{,}45$ : on écrit $12{,}70 + 8{,}45 = 21{,}15$.</p><p>$15 - 6{,}38$ : on écrit $15{,}00 - 6{,}38 = 8{,}62$.</p></div>
<h3>Ordre de grandeur</h3>
<p>Avant ou après un calcul, on vérifie avec des nombres arrondis. $12{,}7 + 8{,}45 \approx 13 + 8 = 21$ : le résultat $21{,}15$ est cohérent.</p>
<div class="prop"><b>Propriété</b><p>On peut changer l'ordre des termes d'une addition et les regrouper comme on veut : $4{,}6 + 3{,}7 + 5{,}4 = (4{,}6 + 5{,}4) + 3{,}7 = 10 + 3{,}7 = 13{,}7$.</p></div>
<div class="attention"><b>Piège</b><p>Dans une soustraction, on ne peut pas inverser les termes : $15 - 6{,}38 \neq 6{,}38 - 15$.</p></div>`,
      retenir: [r`Virgule sous virgule, et des zéros pour compléter.`, r`Toujours vérifier avec un ordre de grandeur.`, r`Regrouper astucieusement les termes qui font des nombres ronds.`],
      exos: [
        { q: r`Calcule $12{,}7 + 8{,}45$.`, type: 'num', rep: 21.15, corr: r`$12{,}70 + 8{,}45 = 21{,}15$ (ordre de grandeur : $13 + 8 = 21$).` },
        { q: r`Calcule $15 - 6{,}38$.`, type: 'num', rep: 8.62, indice: r`Écris $15$ sous la forme $15{,}00$.`, corr: r`$15{,}00 - 6{,}38 = 8{,}62$. Vérification : $8{,}62 + 6{,}38 = 15$.` },
        { q: r`Léa a $20$ €. Elle achète un livre à $7{,}85$ € et un stylo à $4{,}60$ €. Combien lui reste-t-il ?`, type: 'num', rep: 7.55, unite: '€',
          corr: r`Dépense : $7{,}85 + 4{,}60 = 12{,}45$ €. Reste : $20 - 12{,}45 = 7{,}55$ €.` }
      ]
    },
    {
      id: '6e-multiplication', titre: 'Multiplier des décimaux', domaine: 'Nombres',
      resume: 'Multiplier par 10, 100, 1 000, par 0,1 et calculer le produit de deux décimaux.',
      yt: 'yvan monka multiplication nombres décimaux 6e',
      cours: r`
<h3>Multiplier par 10, 100, 1 000</h3>
<p>Multiplier par $10$, c'est rendre chaque chiffre $10$ fois plus grand : la virgule se déplace d'<b>un rang vers la droite</b>. Par $100$ : deux rangs. Par $1\,000$ : trois rangs.</p>
<div class="ex-box"><b>Exemples</b><p>$3{,}4 \times 100 = 340$ &nbsp; ; &nbsp; $0{,}052 \times 1\,000 = 52$ &nbsp; ; &nbsp; $7{,}1 \times 10 = 71$.</p></div>
<h3>Multiplier par 0,1 ; 0,01 ; 0,001</h3>
<p>Multiplier par $0{,}1$ revient à diviser par $10$ : la virgule se déplace d'un rang vers la <b>gauche</b>. $45 \times 0{,}1 = 4{,}5$ et $45 \times 0{,}01 = 0{,}45$.</p>
<h3>Produit de deux décimaux</h3>
<div class="methode"><b>Méthode</b><p>1. On multiplie les nombres <b>sans tenir compte des virgules</b>. 2. On compte le nombre total de chiffres après la virgule dans les deux facteurs. 3. Le résultat a autant de chiffres après la virgule.</p></div>
<div class="ex-box"><b>Exemple</b><p>$2{,}5 \times 1{,}3$ : $25 \times 13 = 325$. Il y a $1 + 1 = 2$ chiffres après la virgule, donc $2{,}5 \times 1{,}3 = 3{,}25$.</p></div>
<div class="attention"><b>Piège</b><p>Multiplier ne rend pas toujours « plus grand » : $0{,}6 \times 0{,}7 = 0{,}42$, plus petit que chacun des facteurs.</p></div>`,
      retenir: [r`$\times 10, \times 100, \times 1\,000$ : la virgule va à droite de 1, 2, 3 rangs.`, r`$\times 0{,}1$ revient à $\div 10$.`, r`Nombre de décimales du produit = somme des décimales des facteurs.`],
      exos: [
        { q: r`Calcule $3{,}4 \times 100$.`, type: 'num', rep: 340, corr: r`La virgule se déplace de deux rangs vers la droite : $3{,}4 \to 34 \to 340$.` },
        { q: r`Calcule $2{,}5 \times 1{,}3$.`, type: 'num', rep: 3.25, corr: r`$25 \times 13 = 325$, puis $2$ décimales au total : $3{,}25$.` },
        { q: r`Calcule $0{,}6 \times 0{,}7$.`, type: 'num', rep: 0.42, indice: r`$6 \times 7 = 42$. Combien de décimales en tout ?`, corr: r`$6 \times 7 = 42$ et $1 + 1 = 2$ décimales : $0{,}42$.` }
      ]
    },
    {
      id: '6e-division', titre: 'Division euclidienne et divisibilité', domaine: 'Nombres',
      resume: 'Quotient, reste, multiples, diviseurs et critères de divisibilité.',
      yt: 'yvan monka division euclidienne 6e',
      cours: r`
<div class="def"><b>Définition</b><p>Effectuer la <b>division euclidienne</b> de $a$ (le dividende) par $b$ (le diviseur), c'est trouver deux entiers $q$ (le quotient) et $r$ (le reste) tels que $a = b \times q + r$ avec $r \lt b$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$158 = 7 \times 22 + 4$ et $4 \lt 7$. Le quotient est $22$, le reste est $4$.</p></div>
<h3>Multiples et diviseurs</h3>
<p>Si le reste est nul, $a = b \times q$ : on dit que $a$ est un <b>multiple</b> de $b$, que $b$ est un <b>diviseur</b> de $a$, et que $a$ est <b>divisible</b> par $b$. Par exemple $36 = 4 \times 9$ : $36$ est divisible par $4$ et par $9$.</p>
<div class="prop"><b>Critères de divisibilité</b><ul>
<li>par $2$ : le chiffre des unités est $0, 2, 4, 6$ ou $8$ ;</li>
<li>par $5$ : le chiffre des unités est $0$ ou $5$ ;</li>
<li>par $10$ : le chiffre des unités est $0$ ;</li>
<li>par $3$ : la somme des chiffres est un multiple de $3$ ;</li>
<li>par $9$ : la somme des chiffres est un multiple de $9$.</li></ul></div>
<div class="ex-box"><b>Exemple</b><p>$738$ : $7 + 3 + 8 = 18$, multiple de $9$, donc $738$ est divisible par $9$ (et par $3$). Il finit par $8$ : il est aussi divisible par $2$.</p></div>
<div class="attention"><b>Piège</b><p>Dans les problèmes, réfléchis au sens du reste : pour ranger $150$ œufs par boîtes de $12$, il faut $13$ boîtes, pas $12$ !</p></div>`,
      retenir: [r`$a = b \times q + r$ avec $0 \leq r \lt b$.`, r`Reste nul : $b$ divise $a$.`, r`Somme des chiffres : critères par 3 et par 9.`],
      exos: [
        { q: r`Quel est le reste de la division euclidienne de $158$ par $7$ ?`, type: 'num', rep: 4, corr: r`$7 \times 22 = 154$ et $158 - 154 = 4$. Donc $158 = 7 \times 22 + 4$ : le reste est $4$.` },
        { q: r`Lequel de ces nombres est divisible par $9$ ?`, type: 'qcm', choix: [r`$738$`, r`$745$`, r`$329$`, r`$812$`], rep: 0,
          corr: r`Sommes des chiffres : $738 \to 18$, $745 \to 16$, $329 \to 14$, $812 \to 11$. Seul $18$ est un multiple de $9$.` },
        { q: r`Combien de boîtes de $12$ œufs faut-il au minimum pour ranger $150$ œufs ?`, type: 'num', rep: 13,
          indice: r`Fais la division euclidienne de $150$ par $12$, puis regarde le reste.`,
          corr: r`$150 = 12 \times 12 + 6$. Douze boîtes pleines ne suffisent pas, il reste $6$ œufs : il faut une $13^e$ boîte.` }
      ]
    },
    {
      id: '6e-fractions', titre: 'Les fractions', domaine: 'Fractions',
      resume: 'Comprendre une fraction comme un partage et comme un quotient, et trouver des fractions égales.',
      yt: 'yvan monka fractions 6e',
      cours: r`
<p>Dans la fraction $\dfrac{3}{4}$, $3$ est le <b>numérateur</b> et $4$ le <b>dénominateur</b>. On partage l'unité en $4$ parts égales et on en prend $3$.</p>
<div class="fig"><svg viewBox="0 0 240 50" fill="none" stroke="currentColor" stroke-width="2"><rect x="10" y="10" width="220" height="30"/><rect x="10" y="10" width="165" height="30" fill="currentColor" fill-opacity=".18" stroke="none"/><path d="M65 10v30M120 10v30M175 10v30"/></svg></div>
<div class="def"><b>Fraction et quotient</b><p>$\dfrac{a}{b}$ est le nombre qui, multiplié par $b$, donne $a$. C'est le quotient $a \div b$ : $\dfrac{3}{4} = 3 \div 4 = 0{,}75$.</p></div>
<h3>Fractions égales</h3>
<div class="prop"><b>Propriété</b><p>Une fraction ne change pas si on multiplie (ou divise) son numérateur <b>et</b> son dénominateur par un même nombre non nul : $\dfrac{2}{5} = \dfrac{2 \times 4}{5 \times 4} = \dfrac{8}{20}$.</p></div>
<p><b>Simplifier</b>, c'est diviser en haut et en bas par un diviseur commun : $\dfrac{18}{24} = \dfrac{18 \div 6}{24 \div 6} = \dfrac{3}{4}$. Une fraction qu'on ne peut plus simplifier est dite <b>irréductible</b>.</p>
<div class="ex-box"><b>Exemple</b><p>Comparer $\dfrac{2}{3}$ et $\dfrac{3}{5}$ : on écrit $\dfrac{10}{15}$ et $\dfrac{9}{15}$, donc $\dfrac{2}{3} \gt \dfrac{3}{5}$.</p></div>
<div class="attention"><b>Piège</b><p>On n'ajoute pas un même nombre en haut et en bas : $\dfrac{2}{5} \neq \dfrac{2+1}{5+1}$.</p></div>`,
      retenir: [r`$\dfrac{a}{b} = a \div b$.`, r`On multiplie ou divise numérateur ET dénominateur par le même nombre.`, r`Irréductible = impossible à simplifier davantage.`],
      exos: [
        { q: r`Écris $\dfrac{3}{4}$ sous forme décimale.`, type: 'num', rep: 0.75, corr: r`$3 \div 4 = 0{,}75$.` },
        { q: r`Complète : $\dfrac{2}{5} = \dfrac{\ldots}{20}$.`, type: 'num', rep: 8, corr: r`On passe de $5$ à $20$ en multipliant par $4$, donc le numérateur devient $2 \times 4 = 8$.` },
        { q: r`Quelle est la forme irréductible de $\dfrac{18}{24}$ ?`, type: 'qcm', choix: [r`$\dfrac{3}{4}$`, r`$\dfrac{9}{12}$`, r`$\dfrac{6}{8}$`, r`$\dfrac{2}{3}$`], rep: 0,
          corr: r`$\dfrac{9}{12}$ et $\dfrac{6}{8}$ sont égales à $\dfrac{18}{24}$ mais se simplifient encore. En divisant par $6$ : $\dfrac{3}{4}$, irréductible. $\dfrac{2}{3}$ n'est pas égale.` }
      ]
    },
    {
      id: '6e-fraction-quantite', titre: 'Prendre une fraction d\'une quantité', domaine: 'Fractions',
      resume: 'Calculer les 2/3 de 45, 25 % de 80, et résoudre des problèmes de partage.',
      yt: 'yvan monka fraction d\'une quantité 6e',
      cours: r`
<div class="methode"><b>Méthode</b><p>Pour calculer $\dfrac{a}{b}$ d'une quantité $N$, on divise $N$ par $b$, puis on multiplie par $a$ : $\dfrac{a}{b} \times N = (N \div b) \times a$.</p></div>
<div class="ex-box"><b>Exemple</b><p>Les $\dfrac{2}{3}$ de $45$ : $45 \div 3 = 15$, puis $15 \times 2 = 30$.</p></div>
<p>On peut aussi multiplier d'abord : $(2 \times 45) \div 3 = 90 \div 3 = 30$. Le résultat est le même ; choisis l'ordre qui donne les calculs les plus simples.</p>
<h3>Les pourcentages</h3>
<p>Un pourcentage est une fraction de dénominateur $100$ : $t\,\% = \dfrac{t}{100}$. Quelques pourcentages à connaître :</p>
<table class="t"><tr><th>$50\,\%$</th><th>$25\,\%$</th><th>$10\,\%$</th><th>$75\,\%$</th></tr><tr><td>la moitié</td><td>le quart</td><td>le dixième</td><td>les trois quarts</td></tr></table>
<div class="ex-box"><b>Exemple</b><p>$25\,\%$ de $80$ € : le quart de $80$, soit $20$ €. Et $10\,\%$ de $80$ € : $8$ €.</p></div>`,
      retenir: [r`$\frac{a}{b}$ de $N$ : diviser par $b$, multiplier par $a$.`, r`$t\,\%$ de $N$ $= \frac{t}{100} \times N$.`, r`$50\,\%$ = moitié, $25\,\%$ = quart, $10\,\%$ = dixième.`],
      exos: [
        { q: r`Calcule les $\dfrac{2}{3}$ de $45$.`, type: 'num', rep: 30, corr: r`$45 \div 3 = 15$ puis $15 \times 2 = 30$.` },
        { q: r`Calcule $25\,\%$ de $80$.`, type: 'num', rep: 20, corr: r`$25\,\%$ est le quart : $80 \div 4 = 20$.` },
        { q: r`Un gâteau pèse $600$ g. On en mange les $\dfrac{3}{8}$. Quelle masse de gâteau a été mangée ?`, type: 'num', rep: 225, unite: 'g',
          corr: r`$600 \div 8 = 75$ g pour un huitième, donc $75 \times 3 = 225$ g.` }
      ]
    },
    {
      id: '6e-proportionnalite', titre: 'La proportionnalité', domaine: 'Proportionnalité',
      resume: 'Reconnaître une situation de proportionnalité et calculer une valeur manquante.',
      yt: 'yvan monka proportionnalité 6e',
      cours: r`
<div class="def"><b>Définition</b><p>Deux grandeurs sont <b>proportionnelles</b> quand on passe de l'une à l'autre en multipliant toujours par le même nombre, appelé <b>coefficient de proportionnalité</b>.</p></div>
<table class="t"><tr><th>Masse de pommes (kg)</th><td>1</td><td>4</td><td>6</td></tr><tr><th>Prix (€)</th><td>2,5</td><td>10</td><td>15</td></tr></table>
<p>Ici, on multiplie toujours par $2{,}5$ : le prix est proportionnel à la masse.</p>
<h3>Trois façons de calculer une valeur manquante</h3>
<div class="methode"><b>Passage à l'unité</b><p>$4$ kg coûtent $10$ €, donc $1$ kg coûte $10 \div 4 = 2{,}5$ €, donc $6$ kg coûtent $6 \times 2{,}5 = 15$ €.</p></div>
<div class="methode"><b>Coefficient</b><p>On cherche le nombre par lequel on multiplie la première ligne : $10 \div 4 = 2{,}5$, puis $6 \times 2{,}5 = 15$.</p></div>
<div class="methode"><b>Linéarité</b><p>$6$ kg $= 4$ kg $+ 2$ kg, donc le prix est $10 + 5 = 15$ €. On peut additionner ou multiplier les colonnes.</p></div>
<div class="attention"><b>Piège</b><p>Tout n'est pas proportionnel : l'âge et la taille d'un enfant, par exemple, ne le sont pas.</p></div>`,
      retenir: [r`Proportionnel = même coefficient multiplicateur partout.`, r`Passage à l'unité, coefficient ou linéarité : choisis le plus rapide.`],
      exos: [
        { q: r`$4$ kg de pommes coûtent $10$ €. Combien coûtent $6$ kg ?`, type: 'num', rep: 15, unite: '€', corr: r`$1$ kg coûte $10 \div 4 = 2{,}5$ €, donc $6$ kg coûtent $6 \times 2{,}5 = 15$ €.` },
        { q: r`Une recette demande $250$ g de farine pour $4$ personnes. Combien de grammes pour $10$ personnes ?`, type: 'num', rep: 625, unite: 'g',
          corr: r`Pour $2$ personnes : $125$ g. Pour $10 = 5 \times 2$ personnes : $5 \times 125 = 625$ g.` },
        { q: r`Lequel de ces tableaux est un tableau de proportionnalité ?`, type: 'qcm', choix: [r`$1 \to 3,\ 2 \to 6,\ 5 \to 15$`, r`$1 \to 3,\ 2 \to 5,\ 3 \to 7$`, r`$2 \to 4,\ 3 \to 9,\ 4 \to 16$`, r`$1 \to 2,\ 2 \to 4,\ 3 \to 7$`], rep: 0,
          corr: r`Dans le premier, on multiplie toujours par $3$. Dans les autres, le coefficient change ($3$ puis $2{,}5$ ; $2$ puis $3$ ; $2$ puis $\frac73$).` }
      ]
    },
    {
      id: '6e-droites-cercles', titre: 'Droites, segments et cercles', domaine: 'Géométrie',
      resume: 'Les notations, les droites parallèles et perpendiculaires, le vocabulaire du cercle.',
      yt: 'yvan monka droites parallèles perpendiculaires 6e',
      cours: r`
<h3>Notations</h3>
<ul><li>$(AB)$ : la <b>droite</b> passant par $A$ et $B$ (illimitée des deux côtés) ;</li>
<li>$[AB]$ : le <b>segment</b> d'extrémités $A$ et $B$ ;</li>
<li>$[AB)$ : la <b>demi-droite</b> d'origine $A$ passant par $B$ ;</li>
<li>$AB$ (sans crochet) : la <b>longueur</b> du segment $[AB]$.</li></ul>
<h3>Parallèles et perpendiculaires</h3>
<p>Deux droites <b>perpendiculaires</b> se coupent en formant un angle droit : on note $(d_1) \perp (d_2)$. Deux droites <b>parallèles</b> ne se coupent jamais : $(d_1) \parallel (d_2)$.</p>
<div class="prop"><b>Propriétés</b><ul><li>Si deux droites sont perpendiculaires à une même droite, alors elles sont parallèles.</li><li>Si deux droites sont parallèles, toute perpendiculaire à l'une est perpendiculaire à l'autre.</li></ul></div>
<h3>Le cercle</h3>
<div class="def"><b>Définition</b><p>Le cercle de centre $O$ et de rayon $r$ est l'ensemble des points situés à la distance $r$ de $O$. Un <b>diamètre</b> est une corde qui passe par le centre ; sa longueur est $d = 2r$.</p></div>
<div class="fig"><svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="2"><circle cx="100" cy="60" r="48"/><path d="M52 60h96"/><path d="M100 60l34-34" stroke-dasharray="4 3"/><circle cx="100" cy="60" r="2.5" fill="currentColor"/><text x="92" y="76" font-size="13" fill="currentColor" stroke="none">O</text><text x="120" y="40" font-size="12" fill="currentColor" stroke="none">r</text></svg></div>`,
      retenir: [r`$(AB)$ droite, $[AB]$ segment, $[AB)$ demi-droite, $AB$ longueur.`, r`Deux perpendiculaires à une même droite sont parallèles.`, r`Diamètre $= 2 \times$ rayon.`],
      exos: [
        { q: r`Un cercle a un diamètre de $13$ cm. Quel est son rayon ?`, type: 'num', rep: 6.5, unite: 'cm', corr: r`$r = d \div 2 = 13 \div 2 = 6{,}5$ cm.` },
        { q: r`Comment note-t-on la demi-droite d'origine $A$ passant par $B$ ?`, type: 'qcm', choix: [r`$[AB)$`, r`$(AB)$`, r`$[AB]$`, r`$(AB]$`], rep: 0, corr: r`Le crochet est du côté de l'origine $A$, la parenthèse du côté où elle continue : $[AB)$.` },
        { q: r`On sait que $(d_1) \perp (d)$ et $(d_2) \perp (d)$. Que peut-on dire de $(d_1)$ et $(d_2)$ ?`, type: 'qcm', choix: [r`Elles sont parallèles.`, r`Elles sont perpendiculaires.`, r`Elles se coupent en un point de $(d)$.`, r`On ne peut rien dire.`], rep: 0,
          corr: r`Propriété : si deux droites sont perpendiculaires à une même droite, alors elles sont parallèles.` }
      ]
    },
    {
      id: '6e-angles', titre: 'Les angles', domaine: 'Géométrie',
      resume: 'Nommer, classer et mesurer un angle avec le rapporteur.',
      yt: 'yvan monka angles rapporteur 6e',
      cours: r`
<p>Un angle est formé par deux demi-droites de même origine, appelée <b>sommet</b>. L'angle de sommet $B$ formé par $[BA)$ et $[BC)$ se note $\widehat{ABC}$ : la lettre du sommet est <b>au milieu</b>.</p>
<h3>Les familles d'angles</h3>
<table class="t"><tr><th>aigu</th><th>droit</th><th>obtus</th><th>plat</th></tr><tr><td>entre $0°$ et $90°$</td><td>$90°$</td><td>entre $90°$ et $180°$</td><td>$180°$</td></tr></table>
<div class="methode"><b>Mesurer au rapporteur</b><p>1. Placer le centre du rapporteur sur le sommet. 2. Aligner le zéro d'une graduation sur un côté. 3. Lire sur <b>la même graduation</b> (celle qui part de zéro) la mesure au niveau de l'autre côté.</p></div>
<div class="prop"><b>Angles qui se complètent</b><p>Si deux angles juxtaposés forment un angle plat, leurs mesures font $180°$ au total. S'ils forment un angle droit, elles font $90°$.</p></div>
<div class="ex-box"><b>Exemple</b><p>À $3$ h, les aiguilles d'une horloge forment un angle droit : $90°$. En effet, le cadran ($360°$) est partagé en $12$ heures de $30°$, et $3 \times 30° = 90°$.</p></div>`,
      retenir: [r`Dans $\widehat{ABC}$, le sommet est $B$.`, r`Aigu $\lt 90° \lt$ obtus $\lt 180°$ (plat).`, r`Sur un cadran, une heure correspond à $30°$.`],
      exos: [
        { q: r`Un angle plat est partagé en deux angles. L'un mesure $65°$. Combien mesure l'autre ?`, type: 'num', rep: 115, unite: '°', corr: r`$180° - 65° = 115°$.` },
        { q: r`Un angle de $130°$ est :`, type: 'qcm', choix: [r`obtus`, r`aigu`, r`droit`, r`plat`], rep: 0, corr: r`$90° \lt 130° \lt 180°$ : c'est un angle obtus.` },
        { q: r`Quel angle forment les aiguilles d'une horloge à $2$ h pile ?`, type: 'num', rep: 60, unite: '°', indice: r`Une heure correspond à $360° \div 12$.`, corr: r`$360° \div 12 = 30°$ par heure, donc $2 \times 30° = 60°$.` }
      ]
    },
    {
      id: '6e-perimetres-aires', titre: 'Périmètres et aires', domaine: 'Géométrie',
      resume: 'Calculer le périmètre d\'un rectangle et d\'un cercle, l\'aire d\'un rectangle et d\'un triangle rectangle.',
      yt: 'yvan monka périmètre aire 6e',
      cours: r`
<div class="def"><b>Définitions</b><p>Le <b>périmètre</b> est la longueur du contour d'une figure (en cm, m…). L'<b>aire</b> mesure la surface intérieure (en cm², m²…).</p></div>
<table class="t"><tr><th>Figure</th><th>Périmètre</th><th>Aire</th></tr>
<tr><td>Rectangle $L \times \ell$</td><td>$2(L + \ell)$</td><td>$L \times \ell$</td></tr>
<tr><td>Carré de côté $c$</td><td>$4c$</td><td>$c \times c$</td></tr>
<tr><td>Triangle rectangle</td><td>somme des 3 côtés</td><td>$\dfrac{a \times b}{2}$ ($a, b$ côtés de l'angle droit)</td></tr>
<tr><td>Cercle de rayon $r$</td><td>$2 \times \pi \times r$</td><td>(en 5e)</td></tr></table>
<p>$\pi$ est un nombre qui ne s'écrit pas exactement en décimal : $\pi \approx 3{,}14$.</p>
<div class="ex-box"><b>Exemple</b><p>Un triangle rectangle dont les côtés de l'angle droit mesurent $6$ cm et $9$ cm a une aire de $\dfrac{6 \times 9}{2} = 27$ cm² : c'est la moitié d'un rectangle de $6$ sur $9$.</p></div>
<div class="attention"><b>Piège</b><p>Avant de calculer, vérifie que toutes les longueurs sont dans la <b>même unité</b>.</p></div>`,
      retenir: [r`Rectangle : $P = 2(L + \ell)$, $A = L \times \ell$.`, r`Triangle rectangle : $A = \frac{a \times b}{2}$.`, r`Cercle : $P = 2\pi r$.`],
      exos: [
        { q: r`Calcule le périmètre d'un rectangle de $8$ cm sur $5$ cm.`, type: 'num', rep: 26, unite: 'cm', corr: r`$2 \times (8 + 5) = 2 \times 13 = 26$ cm.` },
        { q: r`Calcule l'aire d'un triangle rectangle dont les côtés de l'angle droit mesurent $6$ cm et $9$ cm.`, type: 'num', rep: 27, unite: 'cm²', corr: r`$\dfrac{6 \times 9}{2} = \dfrac{54}{2} = 27$ cm².` },
        { q: r`Calcule le périmètre d'un cercle de rayon $5$ cm, arrondi au dixième.`, type: 'num', rep: 31.4, tol: 0.06, unite: 'cm', corr: r`$2 \times \pi \times 5 = 10\pi \approx 31{,}4$ cm.` }
      ]
    },
    {
      id: '6e-symetrie', titre: 'La symétrie axiale', domaine: 'Géométrie',
      resume: 'Construire le symétrique d\'une figure et trouver les axes de symétrie.',
      yt: 'yvan monka symétrie axiale 6e',
      cours: r`
<div class="def"><b>Définition</b><p>Deux figures sont <b>symétriques</b> par rapport à une droite $(d)$ si elles se superposent quand on plie la feuille le long de $(d)$. Le symétrique d'un point $A$ est le point $A'$ tel que $(d)$ est la <b>médiatrice</b> de $[AA']$ : $(d)$ coupe $[AA']$ perpendiculairement en son milieu.</p></div>
<div class="fig"><svg viewBox="0 0 220 110" fill="none" stroke="currentColor" stroke-width="2"><path d="M110 5v100" stroke-dasharray="6 4"/><path d="M40 30l40 15-30 35z"/><path d="M180 30l-40 15 30 35z"/><text x="114" y="18" font-size="12" fill="currentColor" stroke="none">(d)</text></svg></div>
<div class="prop"><b>Propriétés</b><p>La symétrie axiale <b>conserve</b> les longueurs, les angles, les aires et l'alignement. Le symétrique d'un segment est un segment de même longueur, celui d'un cercle est un cercle de même rayon.</p></div>
<h3>Axes de symétrie d'une figure</h3>
<p>Une droite est un axe de symétrie d'une figure si la figure est sa propre symétrique.</p>
<table class="t"><tr><th>Figure</th><th>Axes</th></tr><tr><td>Carré</td><td>4</td></tr><tr><td>Rectangle (non carré)</td><td>2</td></tr><tr><td>Triangle équilatéral</td><td>3</td></tr><tr><td>Triangle isocèle (non équilatéral)</td><td>1</td></tr><tr><td>Cercle</td><td>une infinité</td></tr></table>`,
      retenir: [r`$(d)$ est la médiatrice de $[AA']$.`, r`La symétrie conserve longueurs, angles et aires.`, r`Carré : 4 axes ; rectangle : 2 ; triangle équilatéral : 3.`],
      exos: [
        { q: r`Combien d'axes de symétrie possède un carré ?`, type: 'num', rep: 4, corr: r`Les deux diagonales et les deux médiatrices des côtés : $4$ axes.` },
        { q: r`Le segment $[AB]$ mesure $5$ cm. Son symétrique $[A'B']$ par rapport à une droite mesure :`, type: 'qcm', choix: [r`$5$ cm`, r`$10$ cm`, r`$2{,}5$ cm`, r`cela dépend de la droite`], rep: 0, corr: r`La symétrie axiale conserve les longueurs : $A'B' = AB = 5$ cm.` },
        { q: r`Combien d'axes de symétrie possède un triangle équilatéral ?`, type: 'num', rep: 3, corr: r`Chaque médiatrice d'un côté (qui passe par le sommet opposé) est un axe : $3$ axes.` }
      ]
    },
    {
      id: '6e-donnees', titre: 'Lire et organiser des données', domaine: 'Données',
      resume: 'Tableaux, diagrammes en barres et diagrammes circulaires.',
      yt: 'yvan monka diagramme en barres tableau 6e',
      cours: r`
<p>Dans une classe de $25$ élèves, on a demandé le moyen de transport utilisé pour venir au collège.</p>
<table class="t"><tr><th>Transport</th><td>À pied</td><td>Bus</td><td>Vélo</td><th>Total</th></tr><tr><th>Effectif</th><td>8</td><td>12</td><td>5</td><td>25</td></tr></table>
<div class="def"><b>Vocabulaire</b><p>L'<b>effectif</b> d'une valeur est le nombre de fois où elle apparaît. L'<b>effectif total</b> est la somme de tous les effectifs. La <b>fréquence</b> d'une valeur est $\dfrac{\text{effectif}}{\text{effectif total}}$ : ici, celle du bus est $\dfrac{12}{25} = 0{,}48$, soit $48\,\%$.</p></div>
<h3>Diagramme en barres</h3>
<div class="fig"><svg viewBox="0 0 240 130" fill="none" stroke="currentColor" stroke-width="2"><path d="M30 10v100h200"/><rect x="50" y="78" width="36" height="32" fill="currentColor" fill-opacity=".2"/><rect x="110" y="62" width="36" height="48" fill="currentColor" fill-opacity=".35"/><rect x="170" y="90" width="36" height="20" fill="currentColor" fill-opacity=".2"/><g font-size="11" fill="currentColor" stroke="none"><text x="52" y="125">pied</text><text x="117" y="125">bus</text><text x="172" y="125">vélo</text><text x="12" y="66">12</text><text x="18" y="110">0</text></g><path d="M27 62h6" /></svg></div>
<p>La hauteur de chaque barre est proportionnelle à l'effectif.</p>
<h3>Diagramme circulaire</h3>
<div class="methode"><b>Méthode</b><p>Le disque entier ($360°$) représente l'effectif total. L'angle d'une part est proportionnel à son effectif : angle $= \dfrac{\text{effectif}}{\text{effectif total}} \times 360°$.</p></div>`,
      retenir: [r`Fréquence $= \frac{\text{effectif}}{\text{effectif total}}$.`, r`Diagramme circulaire : $360°$ pour l'effectif total.`],
      exos: [
        { q: r`Avec le tableau du cours, combien d'élèves viennent en bus ou à vélo ?`, type: 'num', rep: 17, corr: r`$12 + 5 = 17$ élèves.` },
        { q: r`Quelle est la fréquence des élèves venant à pied ? Donne-la en écriture décimale.`, type: 'num', rep: 0.32, corr: r`$\dfrac{8}{25} = 0{,}32$, soit $32\,\%$.` },
        { q: r`Dans un diagramme circulaire, quel angle (en degrés) correspond aux élèves venant en bus ?`, type: 'num', rep: 172.8, tol: 0.05, unite: '°', corr: r`$\dfrac{12}{25} \times 360° = 0{,}48 \times 360° = 172{,}8°$.` }
      ]
    }
  ]);
})();
