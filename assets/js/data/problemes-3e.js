/* Problèmes longs de 3e : un par leçon, à questions enchaînées. Étoiles : ★★ difficile, ★★★ très difficile. */
(function () {
  var r = String.raw;
  addProblemes('3e', {
    '3e-arithmetique': { titre: 'Les bouquets du fleuriste', etoiles: 3,
      enonce: r`<p>Un fleuriste a $126$ roses et $210$ tulipes. Il veut faire le plus grand nombre possible de bouquets identiques, en utilisant toutes les fleurs.</p>`,
      questions: [
        { q: r`Combien de bouquets fait-il ?`, type: 'num', rep: 42, corr: r`Il faut le PGCD de $126$ et $210$. Euclide : $210 = 126 \times 1 + 84$, $126 = 84 \times 1 + 42$, $84 = 42 \times 2$. PGCD $= 42$ bouquets.` },
        { q: r`Combien de roses par bouquet ?`, type: 'num', rep: 3, corr: r`$126 \div 42 = 3$.` },
        { q: r`Combien de tulipes par bouquet ?`, type: 'num', rep: 5, corr: r`$210 \div 42 = 5$.` },
        { q: r`Écris $\dfrac{126}{210}$ sous forme irréductible.`, type: 'num', rep: 3 / 5, corr: r`On divise par le PGCD : $\dfrac{126 \div 42}{210 \div 42} = \dfrac35$.` }
      ] },
    '3e-identites': { titre: 'Le calcul mental astucieux', etoiles: 2,
      enonce: r`<p>Les identités remarquables permettent de calculer très vite de tête.</p>`,
      questions: [
        { q: r`Calcule $101^2$ avec $(a + b)^2$.`, type: 'num', rep: 10201, corr: r`$(100 + 1)^2 = 10\,000 + 200 + 1 = 10\,201$.` },
        { q: r`Calcule $99 \times 101$ avec $(a - b)(a + b)$.`, type: 'num', rep: 9999, corr: r`$(100 - 1)(100 + 1) = 100^2 - 1 = 9\,999$.` },
        { q: r`Factorise $9x^2 - 25$.`, type: 'qcm', choix: [r`$(3x - 5)(3x + 5)$`, r`$(3x - 5)^2$`, r`$(9x - 5)(x + 5)$`, r`$(3x - 25)(3x + 1)$`], rep: 0, corr: r`$9x^2 - 25 = (3x)^2 - 5^2 = (3x - 5)(3x + 5)$.` },
        { q: r`On développe $(2x - 3)^2$. Quel est le coefficient de $x$ ?`, type: 'num', rep: -12, corr: r`$(2x)^2 - 2 \times 2x \times 3 + 9 = 4x^2 - 12x + 9$.` }
      ] },
    '3e-equation-produit': { titre: 'Les équations qui cachent un produit', etoiles: 3,
      enonce: r`<p>Pour chaque équation, donne toutes les solutions séparées par un point-virgule.</p>`,
      questions: [
        { q: r`Résous $(x - 4)(3x + 6) = 0$.`, type: 'liste', rep: [4, -2], corr: r`Un produit est nul si l'un des facteurs l'est : $x = 4$ ou $3x + 6 = 0 \iff x = -2$.` },
        { q: r`Résous $x^2 = 49$.`, type: 'liste', rep: [7, -7], corr: r`$x = 7$ ou $x = -7$.` },
        { q: r`Résous $(2x + 1)^2 - 9 = 0$.`, type: 'liste', rep: [1, -2], corr: r`$a^2 - b^2$ : $(2x + 1 - 3)(2x + 1 + 3) = (2x - 2)(2x + 4) = 0$, donc $x = 1$ ou $x = -2$.` },
        { q: r`Trouve tous les nombres dont le carré est égal à $5$ fois le nombre lui-même.`, type: 'liste', rep: [0, 5], corr: r`$x^2 = 5x \iff x^2 - 5x = 0 \iff x(x - 5) = 0$ : $x = 0$ ou $x = 5$. Attention, diviser par $x$ ferait perdre la solution $0$.` }
      ] },
    '3e-inequations': { titre: 'Choisir son forfait', etoiles: 2,
      enonce: r`<p>Forfait A : $15$ € par mois plus $0{,}05$ € par SMS. Forfait B : $25$ € par mois, SMS illimités.</p>`,
      questions: [
        { q: r`Combien coûte le forfait A pour $120$ SMS (en €) ?`, type: 'num', rep: 21, corr: r`$15 + 0{,}05 \times 120 = 15 + 6 = 21$ €.` },
        { q: r`À partir de combien de SMS le forfait B est-il strictement plus avantageux ?`, type: 'num', rep: 201, corr: r`$15 + 0{,}05x \gt 25 \iff 0{,}05x \gt 10 \iff x \gt 200$ : dès $201$ SMS.` },
        { q: r`Résous $3x - 7 \leqslant 5x + 9$. Quelle est la plus petite solution ?`, type: 'num', rep: -8, corr: r`$-2x \leqslant 16 \iff x \geqslant -8$ (on divise par $-2$ : le sens change).` },
        { q: r`Combien d'entiers vérifient $-2 \lt x \leqslant 3$ ?`, type: 'num', rep: 5, corr: r`$-1, 0, 1, 2, 3$ : $5$ entiers ($-2$ est exclu).` }
      ] },
    '3e-fonctions': { titre: 'Une fonction à apprivoiser', etoiles: 2,
      enonce: r`<p>On considère la fonction $f : x \mapsto x^2 - 4x + 1$.</p>`,
      questions: [
        { q: r`Calcule $f(3)$.`, type: 'num', rep: -2, corr: r`$9 - 12 + 1 = -2$.` },
        { q: r`Quelle est l'image de $-1$ ?`, type: 'num', rep: 6, corr: r`$(-1)^2 - 4 \times (-1) + 1 = 1 + 4 + 1 = 6$.` },
        { q: r`Donne les antécédents de $1$ (séparés par ;).`, type: 'liste', rep: [0, 4], corr: r`$x^2 - 4x + 1 = 1 \iff x(x - 4) = 0$ : $0$ et $4$.` },
        { q: r`Calcule $f(2)$ (c'est la plus petite valeur de $f$).`, type: 'num', rep: -3, corr: r`$4 - 8 + 1 = -3$. En effet $f(x) = (x - 2)^2 - 3 \geqslant -3$.` }
      ] },
    '3e-affines': { titre: 'Quel taxi prendre ?', etoiles: 3,
      enonce: r`<p>Taxi A : $4$ € de prise en charge puis $1{,}50$ € par km. Taxi B : $2{,}50$ € par km, sans prise en charge. On note $x$ la distance en km.</p>`,
      questions: [
        { q: r`Combien coûte le taxi A pour $10$ km (en €) ?`, type: 'num', rep: 19, corr: r`$f(x) = 1{,}5x + 4$ : $f(10) = 19$ €.` },
        { q: r`Pour quelle distance les deux taxis coûtent-ils le même prix (en km) ?`, type: 'num', rep: 4, corr: r`$1{,}5x + 4 = 2{,}5x \iff x = 4$ km.` },
        { q: r`Pour $12$ km, combien économise-t-on en prenant le taxi le moins cher (en €) ?`, type: 'num', rep: 8, corr: r`A : $22$ € ; B : $30$ €. Économie : $8$ € avec A.` },
        { q: r`Une fonction affine $g$ vérifie $g(2) = 7$ et $g(5) = 16$. Que vaut $g(0)$ ?`, type: 'num', rep: 1, corr: r`Coefficient : $\dfrac{16 - 7}{5 - 2} = 3$. Puis $g(2) = 6 + b = 7$, donc $b = g(0) = 1$.` }
      ] },
    '3e-evolutions': { titre: 'Le prix du vélo', etoiles: 2,
      enonce: r`<p>Un vélo coûte $450$ €. Son prix augmente de $20\,\%$, puis baisse de $20\,\%$.</p>`,
      questions: [
        { q: r`Quel est le prix après la hausse (en €) ?`, type: 'num', rep: 540, corr: r`$450 \times 1{,}2 = 540$ €.` },
        { q: r`Quel est le prix après la baisse (en €) ?`, type: 'num', rep: 432, corr: r`$540 \times 0{,}8 = 432$ €.` },
        { q: r`Quelle est l'évolution globale en pourcentage ?`, type: 'num', rep: -4, unite: '%', corr: r`Coefficient global $1{,}2 \times 0{,}8 = 0{,}96$ : une baisse de $4\,\%$, pas un retour au prix de départ !` },
        { q: r`Après une baisse de $25\,\%$, un article coûte $60$ €. Quel était son prix initial (en €) ?`, type: 'num', rep: 80, corr: r`$P \times 0{,}75 = 60$, donc $P = 60 \div 0{,}75 = 80$ €.` }
      ] },
    '3e-thales': { titre: 'Mesurer la rivière', etoiles: 3,
      enonce: r`<p>Les points $A$, $M$, $B$ sont alignés, ainsi que $A$, $N$, $C$, et $(MN) \parallel (BC)$. On a $AM = 4$ m, $MB = 6$ m et $MN = 3$ m. Ensuite, une figure « papillon » : $(AB) \parallel (CD)$, les droites $(AD)$ et $(BC)$ se coupent en $O$, avec $OA = 4$, $OD = 10$ et $AB = 6$.</p>`,
      questions: [
        { q: r`Calcule $BC$ (en m).`, type: 'num', rep: 7.5, unite: 'm', corr: r`$AB = 10$. Thalès : $\dfrac{BC}{MN} = \dfrac{AB}{AM} = \dfrac{10}{4}$, donc $BC = 3 \times 2{,}5 = 7{,}5$ m.` },
        { q: r`Dans un autre triangle, $AM = 4$, $AB = 10$, $AN = 2{,}8$ et $AC = 7$. Les droites $(MN)$ et $(BC)$ sont-elles parallèles ?`, type: 'qcm', choix: [r`Oui`, r`Non`], rep: 0, corr: r`$\dfrac{AM}{AB} = 0{,}4$ et $\dfrac{AN}{AC} = 0{,}4$, les points sont dans le même ordre : par la réciproque de Thalès, oui.` },
        { q: r`Dans le papillon, calcule $CD$.`, type: 'num', rep: 15, corr: r`$\dfrac{CD}{AB} = \dfrac{OD}{OA} = \dfrac{10}{4}$, donc $CD = 6 \times 2{,}5 = 15$.` },
        { q: r`Si $OB = 5$, combien mesure $OC$ ?`, type: 'num', rep: 12.5, corr: r`$\dfrac{OC}{OB} = 2{,}5$, donc $OC = 12{,}5$.` }
      ] },
    '3e-trigonometrie': { titre: 'Le cerf-volant et l\'arbre', etoiles: 3,
      enonce: r`<p>Le fil d'un cerf-volant, bien tendu, mesure $50$ m et fait un angle de $35°$ avec le sol.</p>`,
      questions: [
        { q: r`À quelle hauteur vole le cerf-volant (en m, au dixième) ?`, type: 'num', rep: 28.7, tol: 0.06, unite: 'm', corr: r`$h = 50 \times \sin 35° \approx 50 \times 0{,}5736 \approx 28{,}7$ m.` },
        { q: r`À quelle distance au sol est-il de la main (en m, au dixième) ?`, type: 'num', rep: 41, tol: 0.06, unite: 'm', corr: r`$d = 50 \times \cos 35° \approx 50 \times 0{,}8192 \approx 41{,}0$ m.` },
        { q: r`À $20$ m d'un arbre, on voit son sommet sous un angle de $40°$. Quelle est sa hauteur (en m, au dixième) ?`, type: 'num', rep: 16.8, tol: 0.06, unite: 'm', corr: r`$\tan 40° = \dfrac{h}{20}$, donc $h = 20 \tan 40° \approx 16{,}8$ m.` },
        { q: r`Dans un triangle rectangle, les côtés de l'angle droit mesurent $3$ et $4$. Quel est l'angle opposé au côté $3$ (en degrés, au dixième) ?`, type: 'num', rep: 36.9, tol: 0.06, unite: '°', corr: r`$\tan \alpha = \dfrac34$, donc $\alpha \approx 36{,}9°$.` }
      ] },
    '3e-agrandissement': { titre: 'La maquette de la maison', etoiles: 2,
      enonce: r`<p>Un architecte construit une maquette d'une maison à l'échelle $\dfrac{1}{50}$.</p>`,
      questions: [
        { q: r`Un mur mesure $24$ cm sur la maquette. Quelle est sa longueur réelle (en m) ?`, type: 'num', rep: 12, unite: 'm', corr: r`$24 \times 50 = 1\,200$ cm $= 12$ m.` },
        { q: r`Le sol de la maquette a une aire de $400$ cm². Quelle est l'aire réelle (en m²) ?`, type: 'num', rep: 100, unite: 'm²', corr: r`Les aires sont multipliées par $50^2 = 2\,500$ : $1\,000\,000$ cm² $= 100$ m².` },
        { q: r`La maquette a un volume de $0{,}9$ dm³. Quel est le volume réel (en m³) ?`, type: 'num', rep: 112.5, unite: 'm³', corr: r`Les volumes sont multipliés par $50^3 = 125\,000$ : $112\,500$ dm³ $= 112{,}5$ m³.` },
        { q: r`Par une homothétie de rapport $-2$, quelle est la longueur de l'image d'un segment de $3$ cm ?`, type: 'num', rep: 6, unite: 'cm', corr: r`Les longueurs sont multipliées par $|-2| = 2$ : $6$ cm (la figure est en plus « retournée »).` }
      ] },
    '3e-probabilites': { titre: 'Deux dés et une urne', etoiles: 3,
      enonce: r`<p>On lance deux dés équilibrés à six faces et on regarde la somme. Toutes les réponses sont des fractions.</p>`,
      questions: [
        { q: r`Quelle est la probabilité d'obtenir une somme de $7$ ?`, type: 'num', rep: 1 / 6, corr: r`Sur $36$ issues, $6$ donnent $7$ : $(1,6), (2,5), \dots, (6,1)$. $\dfrac{6}{36} = \dfrac16$.` },
        { q: r`Quelle est la probabilité d'obtenir une somme de $8$ ?`, type: 'num', rep: 5 / 36, corr: r`$(2,6), (3,5), (4,4), (5,3), (6,2)$ : $\dfrac{5}{36}$.` },
        { q: r`Quelle est la probabilité d'obtenir au moins un $6$ ?`, type: 'num', rep: 11 / 36, corr: r`Contraire : aucun $6$, $\dfrac{25}{36}$. Donc $1 - \dfrac{25}{36} = \dfrac{11}{36}$.` },
        { q: r`Une urne contient $3$ boules rouges et $2$ bleues. On tire deux boules sans remise. Probabilité d'avoir deux rouges ?`, type: 'num', rep: 3 / 10, corr: r`$\dfrac35 \times \dfrac24 = \dfrac{6}{20} = \dfrac{3}{10}$.` }
      ] },
    '3e-sphere': { titre: 'Du ballon à la Terre', etoiles: 2,
      enonce: r`<p>Un ballon de basket est une sphère de rayon $11$ cm. La Terre est (presque) une sphère de rayon $6\,371$ km.</p>`,
      questions: [
        { q: r`Quel est le volume du ballon, arrondi au cm³ ?`, type: 'num', rep: 5575, tol: 0.6, unite: 'cm³', corr: r`$\dfrac43 \pi \times 11^3 = \dfrac{5\,324}{3}\pi \approx 5\,575$ cm³.` },
        { q: r`Quelle est l'aire de sa surface, arrondie au cm² ?`, type: 'num', rep: 1521, tol: 0.6, unite: 'cm²', corr: r`$4\pi \times 11^2 = 484\pi \approx 1\,521$ cm².` },
        { q: r`On coupe le ballon par un plan à $6$ cm du centre. Quel est le rayon de la section (au centième) ?`, type: 'num', rep: Math.sqrt(85), tol: 0.006, unite: 'cm', corr: r`Pythagore : $r = \sqrt{11^2 - 6^2} = \sqrt{85} \approx 9{,}22$ cm.` },
        { q: r`Quelle est la longueur de l'équateur terrestre, arrondie au km ?`, type: 'num', rep: 40030, tol: 0.6, unite: 'km', corr: r`$2\pi \times 6\,371 \approx 40\,030$ km.` }
      ] },
    '3e-racines': { titre: 'Racines et diagonales', etoiles: 3,
      enonce: r`<p>Les racines carrées apparaissent dès qu'on calcule une diagonale. Donne les résultats exacts.</p>`,
      questions: [
        { q: r`La diagonale d'un carré de côté $5$ s'écrit $a\sqrt2$. Donne $a$.`, type: 'num', rep: 5, corr: r`Pythagore : $d^2 = 25 + 25 = 50$, $d = \sqrt{50} = \sqrt{25 \times 2} = 5\sqrt2$.` },
        { q: r`Calcule $\sqrt{12} \times \sqrt{27}$.`, type: 'num', rep: 18, corr: r`$\sqrt{12 \times 27} = \sqrt{324} = 18$.` },
        { q: r`Calcule $(\sqrt5 + 1)(\sqrt5 - 1)$.`, type: 'num', rep: 4, corr: r`$(a + b)(a - b) = a^2 - b^2 = 5 - 1 = 4$.` },
        { q: r`$\dfrac{10}{\sqrt5}$ s'écrit $a\sqrt5$. Donne $a$.`, type: 'num', rep: 2, corr: r`$\dfrac{10\sqrt5}{5} = 2\sqrt5$.` },
        { q: r`Quelle est l'aire d'un rectangle de côtés $\sqrt8$ et $\sqrt{18}$ ?`, type: 'num', rep: 12, corr: r`$\sqrt{8 \times 18} = \sqrt{144} = 12$.` }
      ] },
    '3e-transformations': { titre: 'Le triangle qui voyage', etoiles: 2,
      enonce: r`<p>Dans un repère orthonormé : $A(1\,;\,1)$, $B(3\,;\,1)$ et $C(1\,;\,4)$.</p>`,
      questions: [
        { q: r`Par la translation qui transforme $A$ en $B$, quelle est l'abscisse de l'image de $C$ ?`, type: 'num', rep: 3, corr: r`On ajoute $2$ aux abscisses : $C'(3\,;\,4)$.` },
        { q: r`Par la rotation de centre $A$ et d'angle $90°$ (sens inverse des aiguilles d'une montre), quelle est l'ordonnée de l'image de $B$ ?`, type: 'num', rep: 3, corr: r`$B$ est à $2$ unités à droite de $A$ ; tourné d'un quart de tour, il passe à $2$ unités au-dessus : $B'(1\,;\,3)$.` },
        { q: r`Quelle est l'aire du triangle image de $ABC$ par cette rotation ?`, type: 'num', rep: 3, corr: r`$ABC$ est rectangle en $A$ : $\dfrac{2 \times 3}{2} = 3$. Une rotation conserve les aires : $3$.` },
        { q: r`Quelle est l'abscisse du symétrique de $C$ par rapport à l'origine ?`, type: 'num', rep: -1, corr: r`Coordonnées opposées : $(-1\,;\,-4)$.` }
      ] }
  });
})();
