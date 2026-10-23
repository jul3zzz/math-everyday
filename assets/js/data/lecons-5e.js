/* Leçons de 5e. */
(function () {
  var r = String.raw;
  addLecons('5e', [
    {
      id: '5e-priorites', titre: 'Les priorités opératoires', domaine: 'Calcul',
      resume: 'Dans quel ordre effectuer les calculs d\'une expression avec ou sans parenthèses.',
      yt: 'yvan monka priorités opératoires 5e',
      cours: r`
<p>Une même suite de nombres et d'opérations peut donner des résultats différents selon l'ordre des calculs. Pour que tout le monde trouve le même résultat, on suit des <b>règles de priorité</b>.</p>
<div class="prop"><b>Règles</b><ol><li>On effectue d'abord les calculs <b>entre parenthèses</b> (en commençant par les plus intérieures).</li><li>Puis les <b>multiplications et divisions</b>, de gauche à droite.</li><li>Enfin les <b>additions et soustractions</b>, de gauche à droite.</li></ol></div>
<div class="ex-box"><b>Exemple</b><p>$A = 18 - 4 \times 3 + 2 = 18 - 12 + 2 = 6 + 2 = 8$.</p><p>$B = 40 - 2 \times (3 + 4 \times 2) = 40 - 2 \times (3 + 8) = 40 - 2 \times 11 = 40 - 22 = 18$.</p></div>
<div class="methode"><b>Méthode</b><p>Souligne à chaque étape le calcul prioritaire, effectue-le, et recopie le reste de l'expression <b>sans rien oublier</b>. Une ligne = une étape.</p></div>
<h3>Le trait de fraction</h3>
<p>Un trait de fraction joue le rôle de parenthèses : $\dfrac{15 - 3}{4} = (15 - 3) \div 4 = 3$.</p>
<div class="attention"><b>Piège</b><p>$5 + 3 \times 4$ ne vaut pas $8 \times 4 = 32$ mais $5 + 12 = 17$. Et $12 - 5 + 2 = 9$ (de gauche à droite), pas $12 - 7 = 5$.</p></div>`,
      retenir: [r`Parenthèses, puis $\times$ et $\div$, puis $+$ et $-$.`, r`À priorité égale : de gauche à droite.`, r`Un trait de fraction agit comme des parenthèses.`],
      exos: [
        { q: r`Calcule $A = 18 - 4 \times 3 + 2$.`, type: 'num', rep: 8, corr: r`La multiplication d'abord : $18 - 12 + 2$, puis de gauche à droite : $6 + 2 = 8$.` },
        { q: r`Calcule $B = (15 - 3) \div 4 + 2 \times 5$.`, type: 'num', rep: 13, corr: r`$(15 - 3) \div 4 + 2 \times 5 = 12 \div 4 + 10 = 3 + 10 = 13$.` },
        { q: r`Calcule $C = 40 - 2 \times (3 + 4 \times 2)$.`, type: 'num', rep: 18, indice: r`Dans la parenthèse, la multiplication passe avant l'addition.`, corr: r`$3 + 4 \times 2 = 11$, puis $40 - 2 \times 11 = 40 - 22 = 18$.` }
      ]
    },
    {
      id: '5e-relatifs', titre: 'Les nombres relatifs', domaine: 'Relatifs',
      resume: 'Repérer, comparer des nombres positifs et négatifs, et se repérer dans le plan.',
      yt: 'yvan monka nombres relatifs repérage 5e',
      cours: r`
<p>Les nombres <b>relatifs</b> sont les nombres positifs (comme $+3$ ou $5{,}2$) et les nombres négatifs (comme $-4$). Ils servent pour les températures, les altitudes, les dates…</p>
<div class="def"><b>Vocabulaire</b><p>Un nombre relatif a un <b>signe</b> et une <b>distance à zéro</b> : $-4{,}5$ a pour signe $-$ et pour distance à zéro $4{,}5$. Deux nombres qui ont la même distance à zéro et des signes contraires sont <b>opposés</b> : $-4{,}5$ et $4{,}5$.</p></div>
<div class="fig"><svg viewBox="0 0 300 50" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 25h280"/><g stroke-width="1.5"><path d="M30 20v10M60 20v10M90 20v10M120 20v10M150 18v14M180 20v10M210 20v10M240 20v10M270 20v10"/></g><g font-size="11" fill="currentColor" stroke="none" text-anchor="middle"><text x="30" y="46">−4</text><text x="90" y="46">−2</text><text x="150" y="46">0</text><text x="210" y="46">2</text><text x="270" y="46">4</text><text x="60" y="14">A</text><text x="240" y="14">B</text></g><circle cx="60" cy="25" r="3.5" fill="currentColor"/><circle cx="240" cy="25" r="3.5" fill="currentColor"/></svg></div>
<p>Sur cette droite graduée, $A$ a pour <b>abscisse</b> $-3$ et $B$ a pour abscisse $3$. La distance $AB$ est $3 - (-3) = 6$.</p>
<div class="prop"><b>Comparer</b><ul><li>Un nombre négatif est toujours plus petit qu'un nombre positif.</li><li>Entre deux négatifs, le plus petit est celui qui a la <b>plus grande</b> distance à zéro : $-7 \lt -3$.</li></ul></div>
<h3>Repère du plan</h3>
<p>Un point du plan est repéré par deux nombres : son <b>abscisse</b> (sur l'axe horizontal) puis son <b>ordonnée</b> (sur l'axe vertical). On écrit $M(-2\,;3)$.</p>`,
      retenir: [r`Opposé de $a$ : même distance à zéro, signe contraire.`, r`Entre deux négatifs, le plus petit est le plus éloigné de zéro.`, r`$M(x\,;y)$ : abscisse d'abord, ordonnée ensuite.`],
      exos: [
        { q: r`Quel est le plus petit de ces nombres ?`, type: 'qcm', choix: [r`$-7$`, r`$-3$`, r`$0$`, r`$2$`], rep: 0, corr: r`Les négatifs sont plus petits que $0$ et $2$ ; entre $-7$ et $-3$, $-7$ est plus loin de zéro donc plus petit.` },
        { q: r`Sur une droite graduée, $A$ a pour abscisse $-3$ et $B$ pour abscisse $5$. Calcule la distance $AB$.`, type: 'num', rep: 8, corr: r`De $-3$ à $0$ il y a $3$ unités, de $0$ à $5$ il y en a $5$ : $AB = 3 + 5 = 8$.` },
        { q: r`Quel est l'opposé de $-4{,}5$ ?`, type: 'num', rep: 4.5, corr: r`Même distance à zéro, signe contraire : $4{,}5$.` }
      ]
    },
    {
      id: '5e-relatifs-addition', titre: 'Additionner et soustraire des relatifs', domaine: 'Relatifs',
      resume: 'Les règles de signes pour la somme et la différence de deux nombres relatifs.',
      yt: 'yvan monka addition soustraction nombres relatifs 5e',
      cours: r`
<div class="prop"><b>Addition</b><ul><li><b>Même signe</b> : on additionne les distances à zéro et on garde le signe. $(-8) + (-3) = -11$.</li><li><b>Signes contraires</b> : on soustrait les distances à zéro (la plus grande moins la plus petite) et on prend le signe de celui qui a la plus grande distance à zéro. $(-8) + (+3) = -5$.</li></ul></div>
<p>Image utile : $+$ = gagner, $-$ = perdre. Perdre $8$ puis gagner $3$, c'est perdre $5$.</p>
<div class="prop"><b>Soustraction</b><p>Soustraire un nombre, c'est <b>ajouter son opposé</b> : $a - b = a + (-b)$.</p></div>
<div class="ex-box"><b>Exemples</b><p>$(-4) - (-9) = (-4) + (+9) = 5$.</p><p>$3 - 7 = 3 + (-7) = -4$.</p></div>
<div class="methode"><b>Écart de températures</b><p>Pour mesurer une variation, on calcule « arrivée $-$ départ ». De $-6$ °C à $4$ °C : $4 - (-6) = 4 + 6 = 10$ °C de hausse.</p></div>
<div class="attention"><b>Piège</b><p>$(-4) - (-9)$ n'est pas $-13$ : retirer une dette de $9$, c'est s'enrichir de $9$.</p></div>`,
      retenir: [r`Même signe : on ajoute les distances, on garde le signe.`, r`Signes contraires : on soustrait, signe du plus éloigné de zéro.`, r`$a - b = a + (-b)$.`],
      exos: [
        { q: r`Calcule $(-8) + (+3)$.`, type: 'num', rep: -5, corr: r`Signes contraires : $8 - 3 = 5$, et $-8$ est le plus loin de zéro, donc $-5$.` },
        { q: r`Calcule $(-4) - (-9)$.`, type: 'num', rep: 5, corr: r`$(-4) - (-9) = (-4) + 9 = 5$.` },
        { q: r`Le matin il fait $-6$ °C, l'après-midi $4$ °C. De combien de degrés la température a-t-elle augmenté ?`, type: 'num', rep: 10, unite: '°C', corr: r`$4 - (-6) = 4 + 6 = 10$ °C.` }
      ]
    },
    {
      id: '5e-fractions', titre: 'Comparer et additionner des fractions', domaine: 'Fractions',
      resume: 'Mettre au même dénominateur pour comparer, additionner et soustraire.',
      yt: 'yvan monka additionner fractions 5e',
      cours: r`
<div class="prop"><b>Même dénominateur</b><p>Pour additionner (ou soustraire) deux fractions de même dénominateur, on additionne (ou soustrait) les numérateurs et on garde le dénominateur : $\dfrac{3}{7} + \dfrac{2}{7} = \dfrac{5}{7}$.</p></div>
<div class="methode"><b>Dénominateurs différents</b><p>Quand un dénominateur est un multiple de l'autre, on transforme une fraction pour avoir le <b>même dénominateur</b>, puis on applique la règle.</p></div>
<div class="ex-box"><b>Exemple</b><p>$\dfrac{3}{4} + \dfrac{5}{8} = \dfrac{6}{8} + \dfrac{5}{8} = \dfrac{11}{8}$.</p><p>$\dfrac{7}{6} - \dfrac{2}{3} = \dfrac{7}{6} - \dfrac{4}{6} = \dfrac{3}{6} = \dfrac{1}{2}$.</p></div>
<h3>Comparer</h3>
<p>Avec le même dénominateur, la plus grande fraction est celle qui a le plus grand numérateur. Pour comparer $\dfrac{5}{6}$ et $\dfrac{7}{9}$, on prend $18$ comme dénominateur commun : $\dfrac{15}{18} \gt \dfrac{14}{18}$, donc $\dfrac{5}{6} \gt \dfrac{7}{9}$.</p>
<div class="attention"><b>Piège</b><p>On n'additionne jamais les dénominateurs : $\dfrac{1}{2} + \dfrac{1}{3} \neq \dfrac{2}{5}$. En fait, $\dfrac{1}{2} + \dfrac{1}{3} = \dfrac{3}{6} + \dfrac{2}{6} = \dfrac{5}{6}$.</p></div>`,
      retenir: [r`Même dénominateur : on additionne seulement les numérateurs.`, r`Sinon, on met d'abord au même dénominateur.`, r`On simplifie le résultat quand c'est possible.`],
      exos: [
        { q: r`Calcule $\dfrac{3}{4} + \dfrac{5}{8}$. Donne le résultat sous forme de fraction ou de décimal.`, type: 'num', rep: 11 / 8, corr: r`$\dfrac{3}{4} = \dfrac{6}{8}$, donc $\dfrac{6}{8} + \dfrac{5}{8} = \dfrac{11}{8} = 1{,}375$.` },
        { q: r`Calcule $\dfrac{7}{6} - \dfrac{2}{3}$.`, type: 'num', rep: 0.5, corr: r`$\dfrac{2}{3} = \dfrac{4}{6}$, donc $\dfrac{7}{6} - \dfrac{4}{6} = \dfrac{3}{6} = \dfrac{1}{2}$.` },
        { q: r`Quelle est la plus grande fraction ?`, type: 'qcm', choix: [r`$\dfrac{5}{6}$`, r`$\dfrac{7}{9}$`, r`Elles sont égales.`], rep: 0, corr: r`Au dénominateur $18$ : $\dfrac{15}{18}$ et $\dfrac{14}{18}$. Donc $\dfrac{5}{6} \gt \dfrac{7}{9}$.` }
      ]
    },
    {
      id: '5e-calcul-litteral', titre: 'Le calcul littéral', domaine: 'Calcul littéral',
      resume: 'Utiliser des lettres pour écrire une formule, la calculer et tester une égalité.',
      yt: 'yvan monka calcul littéral 5e',
      cours: r`
<p>En mathématiques, une lettre peut désigner un nombre qu'on ne connaît pas encore, ou qui peut varier. Une <b>expression littérale</b> est une expression qui contient des lettres : $3x + 2$, $2 \times (L + \ell)$…</p>
<div class="def"><b>Conventions d'écriture</b><p>On peut supprimer le signe $\times$ devant une lettre ou une parenthèse : $3 \times x = 3x$, $2 \times (L + \ell) = 2(L + \ell)$. On écrit $x \times x = x^2$ (« $x$ au carré ») et $x \times x \times x = x^3$.</p></div>
<div class="methode"><b>Calculer pour une valeur</b><p>On remplace la lettre par sa valeur, en remettant les signes $\times$ : pour $x = 4$, $3x + 2 = 3 \times 4 + 2 = 14$.</p></div>
<h3>Tester une égalité</h3>
<p>Une égalité avec une lettre peut être vraie pour certaines valeurs et fausse pour d'autres. On calcule <b>séparément</b> chaque membre.</p>
<div class="ex-box"><b>Exemple</b><p>$2x + 3 = 5x - 9$ pour $x = 4$ : à gauche $2 \times 4 + 3 = 11$, à droite $5 \times 4 - 9 = 11$. Les deux membres sont égaux : l'égalité est vraie pour $x = 4$.</p></div>
<div class="attention"><b>Piège</b><p>$3x$ avec $x = 4$ vaut $12$, pas $34$ ! Et $x^2$ avec $x = 3$ vaut $9$, pas $6$.</p></div>`,
      retenir: [r`$3x = 3 \times x$ et $x^2 = x \times x$.`, r`Pour calculer, on remplace la lettre et on remet les $\times$.`, r`Tester une égalité : calculer chaque membre séparément.`],
      exos: [
        { q: r`Calcule $3x + 2$ pour $x = 4$.`, type: 'num', rep: 14, corr: r`$3 \times 4 + 2 = 12 + 2 = 14$.` },
        { q: r`Un rectangle a pour longueur $L$ et pour largeur $3$. Quelle expression donne son périmètre ?`, type: 'qcm', choix: [r`$2L + 6$`, r`$3L$`, r`$L + 3$`, r`$2L + 3$`], rep: 0, corr: r`$P = 2 \times (L + 3) = 2L + 6$.` },
        { q: r`Pour quelle valeur de $x$ l'égalité $2x + 3 = 5x - 9$ est-elle vraie ?`, type: 'qcm', choix: [r`$x = 4$`, r`$x = 3$`, r`$x = 2$`, r`$x = 0$`], rep: 0, corr: r`Pour $x = 4$ : $2 \times 4 + 3 = 11$ et $5 \times 4 - 9 = 11$. Pour $3$ : $9 \neq 6$ ; pour $2$ : $7 \neq 1$ ; pour $0$ : $3 \neq -9$.` }
      ]
    },
    {
      id: '5e-pourcentages', titre: 'Proportionnalité, pourcentages et échelles', domaine: 'Proportionnalité',
      resume: 'Appliquer et calculer un pourcentage, utiliser une échelle de carte.',
      yt: 'yvan monka pourcentage 5e',
      cours: r`
<div class="prop"><b>Appliquer un pourcentage</b><p>Prendre $t\,\%$ d'une quantité, c'est la multiplier par $\dfrac{t}{100}$ : $15\,\%$ de $60 = \dfrac{15}{100} \times 60 = 9$.</p></div>
<div class="methode"><b>Calculer un pourcentage</b><p>$18$ élèves sur $24$ font du sport. Proportion : $\dfrac{18}{24} = 0{,}75 = \dfrac{75}{100}$, soit $75\,\%$. On divise la partie par le total, puis on multiplie par $100$.</p></div>
<table class="t"><tr><th>Effectif</th><td>18</td><td>?</td></tr><tr><th>Total</th><td>24</td><td>100</td></tr></table>
<h3>Échelles</h3>
<div class="def"><b>Définition</b><p>Sur un plan à l'échelle $\dfrac{1}{25\,000}$, $1$ cm sur la carte représente $25\,000$ cm en réalité, c'est-à-dire $250$ m. Les distances sur la carte et dans la réalité sont proportionnelles.</p></div>
<div class="ex-box"><b>Exemple</b><p>$4$ cm sur cette carte : $4 \times 25\,000 = 100\,000$ cm $= 1\,000$ m $= 1$ km.</p></div>
<div class="attention"><b>Piège</b><p>Une échelle s'utilise avec la <b>même unité</b> des deux côtés : convertis à la fin, pas au milieu.</p></div>`,
      retenir: [r`$t\,\%$ de $N$ $= \frac{t}{100} \times N$.`, r`Pourcentage = partie $\div$ total $\times 100$.`, r`Échelle $\frac{1}{n}$ : $1$ unité sur le plan = $n$ unités en vrai.`],
      exos: [
        { q: r`Calcule $15\,\%$ de $60$.`, type: 'num', rep: 9, corr: r`$\dfrac{15}{100} \times 60 = 0{,}15 \times 60 = 9$.` },
        { q: r`Dans une classe de $24$ élèves, $18$ font du sport. Quel pourcentage des élèves font du sport ?`, type: 'num', rep: 75, unite: '%', corr: r`$\dfrac{18}{24} = 0{,}75$, soit $75\,\%$.` },
        { q: r`Sur une carte à l'échelle $\dfrac{1}{25\,000}$, deux villages sont à $4$ cm l'un de l'autre. Quelle est la distance réelle, en km ?`, type: 'num', rep: 1, unite: 'km', corr: r`$4 \times 25\,000 = 100\,000$ cm $= 1\,000$ m $= 1$ km.` }
      ]
    },
    {
      id: '5e-triangles', titre: 'Construire un triangle : l\'inégalité triangulaire', domaine: 'Géométrie',
      resume: 'Savoir si un triangle est constructible à partir de ses trois longueurs.',
      yt: 'yvan monka inégalité triangulaire 5e',
      cours: r`
<div class="prop"><b>Inégalité triangulaire</b><p>Dans un triangle $ABC$, chaque côté est plus petit que la somme des deux autres : $AC \lt AB + BC$. Autrement dit, le chemin direct est le plus court.</p></div>
<div class="methode"><b>Méthode : le triangle est-il constructible ?</b><p>On compare la <b>plus grande</b> longueur à la somme des deux autres.</p><ul><li>Si la plus grande est <b>strictement plus petite</b> que la somme : le triangle existe.</li><li>Si elle est <b>égale</b> : le triangle est « aplati », les trois points sont alignés.</li><li>Si elle est <b>plus grande</b> : impossible.</li></ul></div>
<div class="ex-box"><b>Exemples</b><p>$3$ ; $4$ ; $8$ : $3 + 4 = 7 \lt 8$, impossible.</p><p>$3$ ; $4$ ; $7$ : $3 + 4 = 7$, les points sont alignés.</p><p>$5$ ; $6$ ; $9$ : $5 + 6 = 11 \gt 9$, constructible.</p></div>
<h3>Construction au compas</h3>
<p>Pour construire $ABC$ avec $AB = 5$, $AC = 4$ et $BC = 6$ : on trace $[AB]$, puis un arc de centre $A$ et de rayon $4$, un arc de centre $B$ et de rayon $6$. Leur point d'intersection est $C$.</p>`,
      retenir: [r`Chaque côté $\lt$ somme des deux autres.`, r`On teste seulement la plus grande longueur.`, r`Égalité : points alignés (triangle aplati).`],
      exos: [
        { q: r`Avec quelles longueurs peut-on construire un vrai triangle ?`, type: 'qcm', choix: [r`$5$ cm, $6$ cm, $9$ cm`, r`$3$ cm, $4$ cm, $8$ cm`, r`$2$ cm, $3$ cm, $5$ cm`, r`$1$ cm, $1$ cm, $3$ cm`], rep: 0, corr: r`$5 + 6 = 11 \gt 9$ : constructible. Ensuite : $7 \lt 8$ (impossible), $5 = 5$ (aplati), $2 \lt 3$ (impossible).` },
        { q: r`Dans un triangle, $AB = 5$ cm et $BC = 8$ cm. Quelle est la plus grande valeur entière possible (en cm) pour $AC$ ?`, type: 'num', rep: 12, unite: 'cm', indice: r`$AC$ doit être strictement inférieur à $AB + BC$.`, corr: r`$AC \lt 5 + 8 = 13$, donc la plus grande valeur entière est $12$ cm.` },
        { q: r`On a $AB = 3$ cm, $BC = 4$ cm et $AC = 7$ cm. Que peut-on dire des points $A$, $B$, $C$ ?`, type: 'qcm', choix: [r`Ils sont alignés, avec $B$ entre $A$ et $C$.`, r`$ABC$ est un triangle rectangle.`, r`Le triangle est impossible à construire.`, r`$ABC$ est isocèle.`], rep: 0, corr: r`$AB + BC = 7 = AC$ : le triangle est aplati, $B$ est sur le segment $[AC]$.` }
      ]
    },
    {
      id: '5e-angles-triangle', titre: 'La somme des angles d\'un triangle', domaine: 'Géométrie',
      resume: 'Dans tout triangle, la somme des trois angles vaut 180°.',
      yt: 'yvan monka somme des angles d\'un triangle 5e',
      cours: r`
<div class="prop"><b>Propriété</b><p>Dans un triangle, la somme des mesures des trois angles est égale à $180°$ : $\widehat{A} + \widehat{B} + \widehat{C} = 180°$.</p></div>
<p>On peut le voir en découpant les trois coins d'un triangle en papier : mis côte à côte, ils forment un angle plat.</p>
<div class="ex-box"><b>Exemple</b><p>Si $\widehat{A} = 47°$ et $\widehat{B} = 68°$, alors $\widehat{C} = 180° - 47° - 68° = 65°$.</p></div>
<h3>Cas particuliers</h3>
<ul><li><b>Triangle isocèle</b> : les deux angles à la base sont égaux. Si l'angle au sommet mesure $40°$, chaque angle à la base mesure $(180° - 40°) \div 2 = 70°$.</li>
<li><b>Triangle équilatéral</b> : trois angles égaux de $60°$.</li>
<li><b>Triangle rectangle</b> : les deux angles aigus font $90°$ à eux deux. S'il est aussi isocèle, ils mesurent $45°$ chacun.</li></ul>
<div class="attention"><b>Piège</b><p>Un triangle ne peut pas avoir deux angles obtus (ni deux angles droits) : la somme dépasserait $180°$.</p></div>`,
      retenir: [r`$\widehat{A} + \widehat{B} + \widehat{C} = 180°$.`, r`Isocèle : angles à la base égaux. Équilatéral : $60°$ partout.`, r`Rectangle : les deux angles aigus sont complémentaires.`],
      exos: [
        { q: r`Dans un triangle, deux angles mesurent $47°$ et $68°$. Combien mesure le troisième ?`, type: 'num', rep: 65, unite: '°', corr: r`$180 - 47 - 68 = 65°$.` },
        { q: r`Un triangle isocèle a un angle au sommet de $40°$. Combien mesure chacun des angles à la base ?`, type: 'num', rep: 70, unite: '°', corr: r`$(180 - 40) \div 2 = 140 \div 2 = 70°$.` },
        { q: r`Dans un triangle rectangle, un angle aigu mesure $32°$. Combien mesure l'autre angle aigu ?`, type: 'num', rep: 58, unite: '°', corr: r`$180 - 90 - 32 = 58°$ (les deux angles aigus font $90°$ ensemble).` }
      ]
    },
    {
      id: '5e-parallelogramme', titre: 'Le parallélogramme', domaine: 'Géométrie',
      resume: 'Définition, propriétés des côtés, des angles et des diagonales.',
      yt: 'yvan monka parallélogramme propriétés 5e',
      cours: r`
<div class="def"><b>Définition</b><p>Un <b>parallélogramme</b> est un quadrilatère dont les côtés opposés sont parallèles deux à deux.</p></div>
<div class="fig"><svg viewBox="0 0 220 110" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 90L70 20h130l-50 70z"/><path d="M20 90L200 20M70 20l80 70" stroke-dasharray="5 4" stroke-width="1.5"/><g font-size="13" fill="currentColor" stroke="none"><text x="6" y="100">A</text><text x="150" y="104">B</text><text x="204" y="18">C</text><text x="60" y="15">D</text><text x="104" y="68">O</text></g></svg></div>
<div class="prop"><b>Propriétés</b><p>Si $ABCD$ est un parallélogramme, alors :</p><ul><li>ses côtés opposés ont la même longueur : $AB = DC$ et $AD = BC$ ;</li><li>ses <b>diagonales se coupent en leur milieu</b> $O$ ;</li><li>ses angles opposés sont égaux, et deux angles consécutifs ont une somme de $180°$ ;</li><li>le point $O$ est son centre de symétrie.</li></ul></div>
<div class="prop"><b>Pour démontrer qu'un quadrilatère est un parallélogramme</b><p>Il suffit qu'il ait ses diagonales qui se coupent en leur milieu, ou ses côtés opposés de même longueur deux à deux (s'il n'est pas croisé), ou deux côtés opposés parallèles et de même longueur.</p></div>
<div class="ex-box"><b>Exemple</b><p>Dans $ABCD$ parallélogramme, si $\widehat{A} = 70°$, alors $\widehat{C} = 70°$ et $\widehat{B} = \widehat{D} = 180° - 70° = 110°$.</p></div>`,
      retenir: [r`Côtés opposés parallèles et de même longueur.`, r`Les diagonales se coupent en leur milieu.`, r`Angles consécutifs : somme $180°$.`],
      exos: [
        { q: r`$ABCD$ est un parallélogramme et $\widehat{DAB} = 70°$. Combien mesure $\widehat{ABC}$ ?`, type: 'num', rep: 110, unite: '°', corr: r`Deux angles consécutifs ont une somme de $180°$ : $180 - 70 = 110°$.` },
        { q: r`Les diagonales de $ABCD$ se coupent en $O$ et $AC = 10$ cm. Combien mesure $AO$ ?`, type: 'num', rep: 5, unite: 'cm', corr: r`Les diagonales se coupent en leur milieu, donc $AO = AC \div 2 = 5$ cm.` },
        { q: r`Un quadrilatère dont les diagonales se coupent en leur milieu est forcément :`, type: 'qcm', choix: [r`un parallélogramme`, r`un rectangle`, r`un losange`, r`un carré`], rep: 0, corr: r`C'est la propriété caractéristique du parallélogramme. Il n'est pas forcément rectangle ni losange.` }
      ]
    },
    {
      id: '5e-symetrie-centrale', titre: 'La symétrie centrale', domaine: 'Géométrie',
      resume: 'Construire le symétrique d\'un point par rapport à un point et reconnaître un centre de symétrie.',
      yt: 'yvan monka symétrie centrale 5e',
      cours: r`
<div class="def"><b>Définition</b><p>Le symétrique d'un point $A$ par rapport à un point $O$ est le point $A'$ tel que $O$ est le <b>milieu</b> de $[AA']$. C'est un demi-tour autour de $O$.</p></div>
<div class="fig"><svg viewBox="0 0 220 90" fill="none" stroke="currentColor" stroke-width="2"><path d="M30 70L190 20" stroke-dasharray="5 4" stroke-width="1.5"/><circle cx="30" cy="70" r="3.5" fill="currentColor"/><circle cx="110" cy="45" r="3.5" fill="currentColor"/><circle cx="190" cy="20" r="3.5" fill="currentColor"/><g font-size="13" fill="currentColor" stroke="none"><text x="18" y="86">A</text><text x="106" y="66">O</text><text x="194" y="16">A'</text></g><path d="M66 52l4 8M146 28l4 8" stroke-width="1.5"/></svg></div>
<div class="prop"><b>Propriétés</b><p>La symétrie centrale conserve les longueurs, les angles, les aires et l'alignement. De plus, le symétrique d'une droite est une droite <b>parallèle</b>.</p></div>
<h3>Dans un repère</h3>
<p>Le symétrique de $A(x\,;y)$ par rapport à l'origine $O$ est $A'(-x\,;-y)$.</p>
<h3>Centre de symétrie</h3>
<p>Un point $O$ est le centre de symétrie d'une figure si la figure est sa propre image par la symétrie de centre $O$. Le parallélogramme (donc aussi le rectangle, le losange, le carré) et le cercle en ont un ; le triangle n'en a jamais.</p>`,
      retenir: [r`$O$ est le milieu de $[AA']$.`, r`Une droite et son image sont parallèles.`, r`Symétrique de $(x\,;y)$ par rapport à l'origine : $(-x\,;-y)$.`],
      exos: [
        { q: r`$A'$ est le symétrique de $A$ par rapport à $O$, et $AO = 4{,}2$ cm. Combien mesure $AA'$ ?`, type: 'num', rep: 8.4, unite: 'cm', corr: r`$O$ est le milieu de $[AA']$ donc $AA' = 2 \times 4{,}2 = 8{,}4$ cm.` },
        { q: r`Dans un repère, $A(2\,;-5)$. Quelle est l'ordonnée du symétrique de $A$ par rapport à l'origine ?`, type: 'num', rep: 5, corr: r`Le symétrique est $A'(-2\,;5)$ : l'ordonnée est $5$.` },
        { q: r`Laquelle de ces figures possède un centre de symétrie ?`, type: 'qcm', choix: [r`un parallélogramme`, r`un triangle équilatéral`, r`un triangle isocèle`, r`un trapèze quelconque`], rep: 0, corr: r`Le point d'intersection des diagonales est centre de symétrie du parallélogramme. Un triangle n'a jamais de centre de symétrie.` }
      ]
    },
    {
      id: '5e-aires', titre: 'Aires du triangle, du parallélogramme et du disque', domaine: 'Géométrie',
      resume: 'Base, hauteur et la formule de l\'aire du disque.',
      yt: 'yvan monka aire triangle disque 5e',
      cours: r`
<div class="def"><b>Hauteur</b><p>Dans un triangle, la <b>hauteur</b> relative à un côté (la base) est la droite qui passe par le sommet opposé et qui est perpendiculaire à ce côté. Sa longueur est la distance du sommet à la base.</p></div>
<table class="t"><tr><th>Figure</th><th>Aire</th></tr>
<tr><td>Triangle</td><td>$\dfrac{\text{base} \times \text{hauteur}}{2}$</td></tr>
<tr><td>Parallélogramme</td><td>$\text{base} \times \text{hauteur}$</td></tr>
<tr><td>Disque de rayon $r$</td><td>$\pi \times r^2$</td></tr></table>
<div class="fig"><svg viewBox="0 0 220 100" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 85h150L70 15z"/><path d="M70 15v70" stroke-dasharray="5 4" stroke-width="1.5"/><path d="M70 77h8v8" stroke-width="1.5"/><g font-size="12" fill="currentColor" stroke="none"><text x="90" y="98">base</text><text x="74" y="52">h</text></g></svg></div>
<div class="ex-box"><b>Exemples</b><p>Triangle de base $10$ cm et de hauteur $6$ cm : $\dfrac{10 \times 6}{2} = 30$ cm².</p><p>Disque de rayon $3$ cm : $\pi \times 3^2 = 9\pi \approx 28{,}27$ cm².</p></div>
<div class="attention"><b>Piège</b><p>Dans $\pi r^2$, seul le rayon est au carré : $\pi \times 3^2 = \pi \times 9$, pas $(\pi \times 3)^2$. Et attention à ne pas confondre rayon et diamètre !</p></div>`,
      retenir: [r`Triangle : $\frac{b \times h}{2}$. Parallélogramme : $b \times h$.`, r`Disque : $\pi r^2$ (et périmètre $2\pi r$).`],
      exos: [
        { q: r`Calcule l'aire d'un triangle de base $10$ cm et de hauteur $6$ cm.`, type: 'num', rep: 30, unite: 'cm²', corr: r`$\dfrac{10 \times 6}{2} = 30$ cm².` },
        { q: r`Calcule l'aire d'un disque de rayon $3$ cm, arrondie au centième.`, type: 'num', rep: 9 * Math.PI, tol: 0.006, unite: 'cm²', corr: r`$\pi \times 3^2 = 9\pi \approx 28{,}27$ cm².` },
        { q: r`Calcule l'aire d'un disque de diamètre $10$ cm, arrondie à l'unité.`, type: 'num', rep: 25 * Math.PI, tol: 0.6, unite: 'cm²', indice: r`Le rayon est la moitié du diamètre.`, corr: r`$r = 5$ cm, donc $\pi \times 5^2 = 25\pi \approx 79$ cm².` }
      ]
    },
    {
      id: '5e-probabilites', titre: 'Premières probabilités', domaine: 'Probabilités',
      resume: 'Issues, événements et calcul d\'une probabilité dans une situation d\'équiprobabilité.',
      yt: 'yvan monka probabilités 5e',
      cours: r`
<div class="def"><b>Vocabulaire</b><p>Une expérience est <b>aléatoire</b> quand on connaît tous les résultats possibles (les <b>issues</b>) sans savoir lequel va se produire. Un <b>événement</b> est un ensemble d'issues, par exemple « obtenir un nombre pair » au dé.</p></div>
<div class="prop"><b>Équiprobabilité</b><p>Quand toutes les issues ont la même chance de se produire : $P(\text{événement}) = \dfrac{\text{nombre d'issues favorables}}{\text{nombre total d'issues}}$.</p></div>
<div class="ex-box"><b>Exemple</b><p>Une urne contient $3$ boules rouges, $5$ bleues et $2$ vertes ($10$ boules). On en tire une au hasard. $P(\text{bleue}) = \dfrac{5}{10} = \dfrac12$.</p></div>
<ul><li>Une probabilité est toujours comprise entre $0$ (impossible) et $1$ (certain).</li><li>L'événement <b>contraire</b> de $A$ (« non $A$ ») a pour probabilité $1 - P(A)$.</li></ul>
<div class="attention"><b>Piège</b><p>Un dé truqué ou des boules de tailles différentes cassent l'équiprobabilité : la formule ne s'applique plus.</p></div>`,
      retenir: [r`$P = \frac{\text{issues favorables}}{\text{issues possibles}}$ (si équiprobable).`, r`$0 \leq P \leq 1$.`, r`$P(\text{non } A) = 1 - P(A)$.`],
      exos: [
        { q: r`Une urne contient $3$ boules rouges, $5$ bleues et $2$ vertes. Quelle est la probabilité de tirer une boule bleue ?`, type: 'num', rep: 0.5, corr: r`$\dfrac{5}{10} = 0{,}5$.` },
        { q: r`Avec la même urne, quelle est la probabilité de ne pas tirer une boule rouge ?`, type: 'num', rep: 0.7, corr: r`$P(\text{rouge}) = \dfrac{3}{10}$, donc $P(\text{non rouge}) = 1 - 0{,}3 = 0{,}7$.` },
        { q: r`On lance un dé équilibré à 6 faces. Quelle est la probabilité d'obtenir un multiple de $3$ ?`, type: 'num', rep: 1 / 3, tol: 0.005, corr: r`Les multiples de $3$ sont $3$ et $6$ : $\dfrac{2}{6} = \dfrac{1}{3} \approx 0{,}33$.` }
      ]
    }
  ]);
})();
