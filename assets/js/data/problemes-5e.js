/* Problèmes longs de 5e : un par leçon, à questions enchaînées. Étoiles : ★★ difficile, ★★★ très difficile. */
(function () {
  var r = String.raw;
  addProblemes('5e', {
    '5e-priorites': { titre: 'La sortie au cinéma', etoiles: 2,
      enonce: r`<p>Au cinéma, la place adulte coûte $9{,}50$ €, la place ado $7$ € et un pot de pop-corn $4{,}50$ €. Une famille de $2$ adultes et $3$ ados prend $2$ pots de pop-corn.</p>`,
      questions: [
        { q: r`Quelle expression donne la dépense de la famille ?`, type: 'qcm', choix: [r`$2 \times 9{,}5 + 3 \times 7 + 2 \times 4{,}5$`, r`$(2 + 3) \times (9{,}5 + 7) + 2 \times 4{,}5$`, r`$2 \times 9{,}5 + 3 \times (7 + 2) \times 4{,}5$`, r`$2 + 3 \times 9{,}5 + 7 + 2 \times 4{,}5$`], rep: 0, corr: r`Chaque type de dépense est un produit (nombre $\times$ prix), puis on additionne les trois produits.` },
        { q: r`Combien la famille dépense-t-elle (en €) ?`, type: 'num', rep: 49, corr: r`Les multiplications d'abord : $19 + 21 + 9 = 49$ €.` },
        { q: r`Calcule $A = 7 + 3 \times (12 - 2 \times 4)^2 \div 6$.`, type: 'num', rep: 15, corr: r`Dans la parenthèse : $12 - 8 = 4$. Puissance : $4^2 = 16$. Puis de gauche à droite : $3 \times 16 = 48$, $48 \div 6 = 8$. Enfin $7 + 8 = 15$.` },
        { q: r`Où placer des parenthèses pour que $5 + 3 \times 4 - 2$ vaille $30$ ?`, type: 'qcm', choix: [r`$(5 + 3) \times 4 - 2$`, r`$5 + 3 \times (4 - 2)$`, r`$(5 + 3) \times (4 - 2)$`, r`$5 + (3 \times 4) - 2$`], rep: 0, corr: r`$(5 + 3) \times 4 - 2 = 8 \times 4 - 2 = 32 - 2 = 30$. Les autres donnent $11$, $16$ et $15$.` }
      ] },
    '5e-relatifs': { titre: 'Une semaine en Laponie', etoiles: 2,
      enonce: r`<p>Températures relevées à midi : lundi $-7$ °C, mardi $-3$ °C, mercredi $2$ °C, jeudi $-11$ °C, vendredi $4$ °C.</p>`,
      questions: [
        { q: r`Quelle est la température la plus basse ?`, type: 'num', rep: -11, unite: '°C', corr: r`Le plus petit des nombres est celui qui est le plus à gauche sur la droite graduée : $-11$.` },
        { q: r`Combien de jours la température dépasse-t-elle $-5$ °C ?`, type: 'num', rep: 3, corr: r`$-3$, $2$ et $4$ sont plus grands que $-5$ (mais pas $-7$ ni $-11$) : $3$ jours.` },
        { q: r`Quel est l'écart (en degrés) entre la température la plus haute et la plus basse ?`, type: 'num', rep: 15, corr: r`De $-11$ à $0$ il y a $11$ degrés, puis de $0$ à $4$ il y en a $4$ : $15$ degrés.` },
        { q: r`Samedi, la température est l'opposé de celle de jeudi, diminué de $5$. Combien fait-il ?`, type: 'num', rep: 6, unite: '°C', corr: r`L'opposé de $-11$ est $11$, et $11 - 5 = 6$ °C.` }
      ] },
    '5e-relatifs-addition': { titre: 'Le compte en banque', etoiles: 3,
      enonce: r`<p>Le compte de Yanis est à découvert : $-35$ €. Ensuite : il reçoit $120$ €, paie $48{,}50$ €, paie $72$ €, puis reçoit $15{,}25$ €.</p>`,
      questions: [
        { q: r`Quel est le solde (en €) après les deux premières opérations ?`, type: 'num', rep: 36.5, corr: r`$-35 + 120 - 48{,}50 = 85 - 48{,}50 = 36{,}50$ €.` },
        { q: r`Quel est le solde final (en €) ?`, type: 'num', rep: -20.25, corr: r`$36{,}50 - 72 + 15{,}25 = -35{,}50 + 15{,}25 = -20{,}25$ €.` },
        { q: r`Combien doit-il déposer (en €) pour que son compte affiche $+50$ € ?`, type: 'num', rep: 70.25, corr: r`De $-20{,}25$ à $50$ : $50 - (-20{,}25) = 50 + 20{,}25 = 70{,}25$ €.` },
        { q: r`Calcule $(-8) - (-13) + (-7) - 4$.`, type: 'num', rep: -6, corr: r`Soustraire, c'est ajouter l'opposé : $-8 + 13 - 7 - 4 = 5 - 11 = -6$.` }
      ] },
    '5e-fractions': { titre: 'Le partage du terrain', etoiles: 3,
      enonce: r`<p>Un terrain est partagé : $\dfrac13$ pour le potager, $\dfrac25$ pour la pelouse et le reste pour le verger.</p>`,
      questions: [
        { q: r`Quelle fraction du terrain occupent ensemble le potager et la pelouse ?`, type: 'num', rep: 11 / 15, corr: r`Au même dénominateur $15$ : $\dfrac{5}{15} + \dfrac{6}{15} = \dfrac{11}{15}$.` },
        { q: r`Quelle fraction du terrain occupe le verger ?`, type: 'num', rep: 4 / 15, corr: r`$1 - \dfrac{11}{15} = \dfrac{15}{15} - \dfrac{11}{15} = \dfrac{4}{15}$.` },
        { q: r`Le terrain mesure $900$ m². Quelle est l'aire du verger (en m²) ?`, type: 'num', rep: 240, unite: 'm²', corr: r`$\dfrac{4}{15} \times 900 = 900 \div 15 \times 4 = 60 \times 4 = 240$ m².` },
        { q: r`Quelle partie du terrain est la plus grande ?`, type: 'qcm', choix: [r`La pelouse`, r`Le potager`, r`Le verger`, r`Le potager et le verger sont égaux`], rep: 0, corr: r`En quinzièmes : potager $\dfrac{5}{15}$, pelouse $\dfrac{6}{15}$, verger $\dfrac{4}{15}$. La pelouse l'emporte.` }
      ] },
    '5e-calcul-litteral': { titre: 'Les carrés d\'allumettes', etoiles: 3,
      enonce: r`<p>On aligne des carrés faits d'allumettes, côte à côte : $1$ carré demande $4$ allumettes, $2$ carrés en demandent $7$, $3$ carrés $10$.</p>`,
      questions: [
        { q: r`Combien d'allumettes faut-il pour $4$ carrés ?`, type: 'num', rep: 13, corr: r`Chaque nouveau carré ajoute $3$ allumettes (il partage un côté) : $10 + 3 = 13$.` },
        { q: r`Quelle formule donne le nombre d'allumettes pour $n$ carrés ?`, type: 'qcm', choix: [r`$3n + 1$`, r`$4n$`, r`$3n$`, r`$4n - 1$`], rep: 0, corr: r`Une première allumette verticale, puis $3$ allumettes par carré : $3n + 1$. Vérification : $n = 3$ donne $10$.` },
        { q: r`Combien d'allumettes faut-il pour $50$ carrés ?`, type: 'num', rep: 151, corr: r`$3 \times 50 + 1 = 151$.` },
        { q: r`Avec une boîte de $100$ allumettes, combien de carrés au maximum peut-on aligner ?`, type: 'num', rep: 33, corr: r`Il faut $3n + 1 \leqslant 100$, soit $3n \leqslant 99$ et $n \leqslant 33$. Avec $33$ carrés on utilise exactement $100$ allumettes.` }
      ] },
    '5e-pourcentages': { titre: 'Le voyage scolaire', etoiles: 2,
      enonce: r`<p>Une classe de $24$ élèves prépare un voyage. Sur une carte à l'échelle $\dfrac{1}{200\,000}$, le trajet mesure $7{,}5$ cm. Le voyage coûte $1\,200$ € en tout.</p>`,
      questions: [
        { q: r`Quelle est la longueur réelle du trajet (en km) ?`, type: 'num', rep: 15, unite: 'km', corr: r`$7{,}5 \times 200\,000 = 1\,500\,000$ cm $= 15\,000$ m $= 15$ km.` },
        { q: r`Le collège paie $35\,\%$ du voyage. Combien paie-t-il (en €) ?`, type: 'num', rep: 420, corr: r`$\dfrac{35}{100} \times 1\,200 = 420$ €.` },
        { q: r`Le reste est partagé entre les élèves. Combien paie chacun (en €) ?`, type: 'num', rep: 32.5, corr: r`$1\,200 - 420 = 780$ € à partager : $780 \div 24 = 32{,}50$ €.` },
        { q: r`Le musée augmente son billet de $12$ € de $15\,\%$. Quel est le nouveau prix (en €) ?`, type: 'num', rep: 13.8, corr: r`Hausse : $0{,}15 \times 12 = 1{,}80$ €, nouveau prix $13{,}80$ €.` }
      ] },
    '5e-triangles': { titre: 'Construire ou pas ?', etoiles: 3,
      enonce: r`<p>Un triangle n'est constructible que si chaque côté est plus petit que la somme des deux autres (l'inégalité triangulaire).</p>`,
      questions: [
        { q: r`Avec quelles longueurs peut-on construire un triangle ?`, type: 'qcm', choix: [r`$4$, $5$ et $8$ cm`, r`$3$, $4$ et $8$ cm`, r`$1$, $2$ et $5$ cm`, r`$2$, $3$ et $6$ cm`], rep: 0, corr: r`$8 \lt 4 + 5 = 9$ : ça marche. Pour les autres, le plus grand côté est trop long : $8 \gt 7$, $5 \gt 3$, $6 \gt 5$.` },
        { q: r`Un triangle a deux côtés de $6$ cm et $9$ cm. Quelle est la plus grande longueur entière (en cm) possible pour le troisième ?`, type: 'num', rep: 14, corr: r`Il faut $c \lt 6 + 9 = 15$, donc au plus $14$ cm.` },
        { q: r`Et la plus petite longueur entière possible (en cm) ?`, type: 'num', rep: 4, corr: r`Il faut aussi $9 \lt 6 + c$, soit $c \gt 3$ : au moins $4$ cm.` },
        { q: r`Combien de longueurs entières sont possibles pour ce troisième côté ?`, type: 'num', rep: 11, corr: r`De $4$ à $14$ : $14 - 4 + 1 = 11$ valeurs.` }
      ] },
    '5e-angles-triangle': { titre: 'Le triangle isocèle et la bissectrice', etoiles: 2,
      enonce: r`<p>$ABC$ est isocèle en $A$ avec $\widehat{BAC} = 40°$. La bissectrice de l'angle $\widehat{ABC}$ coupe $[AC]$ en $D$.</p>`,
      questions: [
        { q: r`Combien mesure $\widehat{ABC}$ ?`, type: 'num', rep: 70, unite: '°', corr: r`Les angles à la base sont égaux : $(180° - 40°) \div 2 = 70°$.` },
        { q: r`Combien mesure $\widehat{DBC}$ ?`, type: 'num', rep: 35, unite: '°', corr: r`La bissectrice coupe $\widehat{ABC}$ en deux : $70° \div 2 = 35°$.` },
        { q: r`Combien mesure $\widehat{BDC}$ ?`, type: 'num', rep: 75, unite: '°', corr: r`Dans le triangle $BDC$ : $\widehat{C} = 70°$ et $\widehat{DBC} = 35°$, donc $\widehat{BDC} = 180° - 70° - 35° = 75°$.` },
        { q: r`Combien mesure $\widehat{ADB}$ ?`, type: 'num', rep: 105, unite: '°', corr: r`$A$, $D$, $C$ sont alignés : $\widehat{ADB} = 180° - 75° = 105°$. Vérification dans $ABD$ : $40° + 35° + 105° = 180°$.` }
      ] },
    '5e-parallelogramme': { titre: 'Le parallélogramme ABCD', etoiles: 2,
      enonce: r`<p>$ABCD$ est un parallélogramme avec $AB = 7$ cm, $BC = 4$ cm et $\widehat{ABC} = 110°$. Ses diagonales se coupent en $O$, et $AC = 9{,}6$ cm.</p>`,
      questions: [
        { q: r`Combien mesure $CD$ (en cm) ?`, type: 'num', rep: 7, unite: 'cm', corr: r`Les côtés opposés ont la même longueur : $CD = AB = 7$ cm.` },
        { q: r`Combien mesure $\widehat{BCD}$ ?`, type: 'num', rep: 70, unite: '°', corr: r`Deux angles consécutifs sont supplémentaires : $180° - 110° = 70°$.` },
        { q: r`Quel est le périmètre de $ABCD$ (en cm) ?`, type: 'num', rep: 22, unite: 'cm', corr: r`$2 \times (7 + 4) = 22$ cm.` },
        { q: r`Combien mesure $AO$ (en cm) ?`, type: 'num', rep: 4.8, unite: 'cm', corr: r`Les diagonales se coupent en leur milieu : $AO = 9{,}6 \div 2 = 4{,}8$ cm.` }
      ] },
    '5e-symetrie-centrale': { titre: 'Autour du point O', etoiles: 2,
      enonce: r`<p>On trace des figures et leurs symétriques par rapport à un point $O$.</p>`,
      questions: [
        { q: r`$A$ est à $3{,}5$ cm de $O$, et $A'$ est son symétrique par rapport à $O$. Combien mesure $AA'$ (en cm) ?`, type: 'num', rep: 7, unite: 'cm', corr: r`$O$ est le milieu de $[AA']$ : $AA' = 2 \times 3{,}5 = 7$ cm.` },
        { q: r`Le symétrique d'une droite par rapport à un point est…`, type: 'qcm', choix: [r`une droite parallèle`, r`une droite perpendiculaire`, r`un cercle`, r`un point`], rep: 0, corr: r`La symétrie centrale transforme une droite en une droite parallèle (la même si la droite passe par $O$).` },
        { q: r`Combien de centres de symétrie possède un parallélogramme ?`, type: 'num', rep: 1, corr: r`Un seul : le point d'intersection de ses diagonales.` },
        { q: r`Dans un repère d'origine $O$, quelle est l'ordonnée du symétrique de $M(2\,;\,-5)$ par rapport à $O$ ?`, type: 'num', rep: 5, corr: r`Le symétrique par rapport à l'origine a les coordonnées opposées : $(-2\,;\,5)$.` }
      ] },
    '5e-aires': { titre: 'La piste d\'athlétisme', etoiles: 3,
      enonce: r`<p>Un stade est formé d'un rectangle de $100$ m sur $60$ m, prolongé à chaque bout par un demi-disque de diamètre $60$ m.</p>`,
      questions: [
        { q: r`Quelle est l'aire du rectangle (en m²) ?`, type: 'num', rep: 6000, unite: 'm²', corr: r`$100 \times 60 = 6\,000$ m².` },
        { q: r`Quelle est l'aire des deux demi-disques réunis, arrondie au m² ?`, type: 'num', rep: 2827, tol: 0.6, unite: 'm²', corr: r`Ensemble ils forment un disque de rayon $30$ m : $\pi \times 30^2 = 900\pi \approx 2\,827$ m².` },
        { q: r`Quelle est l'aire totale du stade, arrondie au m² ?`, type: 'num', rep: 8827, tol: 0.6, unite: 'm²', corr: r`$6\,000 + 900\pi \approx 8\,827$ m².` },
        { q: r`Quelle est la longueur d'un tour de stade (en m), arrondie au dixième ?`, type: 'num', rep: 388.5, tol: 0.06, unite: 'm', corr: r`Deux lignes droites de $100$ m et deux demi-cercles qui font un cercle complet de diamètre $60$ m : $200 + 60\pi \approx 200 + 188{,}5 = 388{,}5$ m.` }
      ] },
    '5e-probabilites': { titre: 'Le sac de billes', etoiles: 2,
      enonce: r`<p>Un sac contient $5$ billes rouges, $3$ bleues et $2$ vertes, indiscernables au toucher. On en tire une au hasard.</p>`,
      questions: [
        { q: r`Quelle est la probabilité de tirer une bille rouge ?`, type: 'num', rep: 0.5, corr: r`$\dfrac{5}{10} = 0{,}5$.` },
        { q: r`Quelle est la probabilité de ne pas tirer une bille verte ?`, type: 'num', rep: 0.8, corr: r`$1 - \dfrac{2}{10} = 0{,}8$.` },
        { q: r`Quelle est la probabilité de tirer une bille rouge ou verte ?`, type: 'num', rep: 0.7, corr: r`$\dfrac{5 + 2}{10} = 0{,}7$.` },
        { q: r`Combien de billes bleues faut-il ajouter pour que la probabilité de tirer une bleue soit $\dfrac12$ ?`, type: 'num', rep: 4, corr: r`Avec $x$ billes bleues ajoutées : $\dfrac{3 + x}{10 + x} = \dfrac12$, il faut autant de bleues que d'autres billes. Les autres sont $7$, donc $3 + x = 7$ et $x = 4$.` }
      ] },
    '5e-reperage': { titre: 'La carte au trésor', etoiles: 3,
      enonce: r`<p>Dans un repère, on place $A(-3\,;\,2)$, $B(5\,;\,2)$ et $C(5\,;\,-4)$.</p>`,
      questions: [
        { q: r`Combien mesure $AB$ (en unités) ?`, type: 'num', rep: 8, corr: r`Même ordonnée : $5 - (-3) = 8$.` },
        { q: r`Combien mesure $BC$ (en unités) ?`, type: 'num', rep: 6, corr: r`Même abscisse : $2 - (-4) = 6$.` },
        { q: r`$D$ est le point tel que $ABCD$ est un rectangle. Quelle est l'ordonnée de $D$ ?`, type: 'num', rep: -4, corr: r`$D$ a l'abscisse de $A$ et l'ordonnée de $C$ : $D(-3\,;\,-4)$.` },
        { q: r`Quelle est l'aire du rectangle $ABCD$ (en unités d'aire) ?`, type: 'num', rep: 48, corr: r`$8 \times 6 = 48$.` },
        { q: r`Le trésor est au centre du rectangle. Quelle est son abscisse ?`, type: 'num', rep: 1, corr: r`C'est le milieu de $[AC]$ : abscisse $\dfrac{-3 + 5}{2} = 1$ (et ordonnée $\dfrac{2 + (-4)}{2} = -1$).` }
      ] },
    '5e-prismes': { titre: 'La tente de camping', etoiles: 3,
      enonce: r`<p>Une tente a la forme d'un prisme droit couché : ses bases sont des triangles isocèles de base $2$ m et de hauteur $1{,}5$ m, et elle mesure $3$ m de long.</p>`,
      questions: [
        { q: r`Quelle est l'aire d'une base triangulaire (en m²) ?`, type: 'num', rep: 1.5, unite: 'm²', corr: r`$\dfrac{2 \times 1{,}5}{2} = 1{,}5$ m².` },
        { q: r`Quel est le volume de la tente (en m³) ?`, type: 'num', rep: 4.5, unite: 'm³', corr: r`$V = \mathcal{A}_{\text{base}} \times h = 1{,}5 \times 3 = 4{,}5$ m³ (la « hauteur » du prisme est sa longueur $3$ m).` },
        { q: r`Combien de litres d'air contient-elle ?`, type: 'num', rep: 4500, unite: 'L', corr: r`$1$ m³ $= 1\,000$ L : $4\,500$ L.` },
        { q: r`Une boîte de conserve est un cylindre de rayon $4$ cm et de hauteur $11$ cm. Quel est son volume, arrondi au cm³ ?`, type: 'num', rep: 553, tol: 0.6, unite: 'cm³', corr: r`$\pi \times 4^2 \times 11 = 176\pi \approx 553$ cm³.` }
      ] }
  });
})();
