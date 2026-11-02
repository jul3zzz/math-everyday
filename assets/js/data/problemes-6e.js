/* Problèmes longs de 6e : un par leçon, à questions enchaînées. Étoiles : ★★ difficile, ★★★ très difficile.
   Servent dans la leçon (bloc « Le problème »), les défis de la semaine et l'olympiade du mois. */
(function () {
  var r = String.raw;
  addProblemes('6e', {
    '6e-decimaux': { titre: 'Le concours de saut en longueur', etoiles: 2,
      enonce: r`<p>Cinq élèves ont sauté : Léa $3{,}07$ m, Tom $3{,}7$ m, Inès $3{,}075$ m, Noé $3{,}68$ m et Sami $3{,}1$ m.</p>`,
      questions: [
        { q: r`Quelle est la longueur du meilleur saut (en m) ?`, type: 'num', rep: 3.7, corr: r`On écrit tout avec $3$ décimales : $3{,}070$ ; $3{,}700$ ; $3{,}075$ ; $3{,}680$ ; $3{,}100$. Le plus grand est $3{,}7$ m (Tom).` },
        { q: r`Qui monte sur la troisième marche du podium ?`, type: 'qcm', choix: [r`Sami`, r`Inès`, r`Noé`, r`Léa`], rep: 0, corr: r`Classement : $3{,}700 \gt 3{,}680 \gt 3{,}100 \gt 3{,}075 \gt 3{,}070$. Troisième : Sami avec $3{,}1$ m.` },
        { q: r`Quel est l'écart (en m) entre le premier et le dernier ?`, type: 'num', rep: 0.63, corr: r`$3{,}70 - 3{,}07 = 0{,}63$ m.` },
        { q: r`Un sixième élève saute exactement au milieu d'Inès et de Sami. Quelle est la longueur de son saut (en m) ?`, type: 'num', rep: 3.0875, corr: r`Le milieu de $3{,}075$ et $3{,}1$ : $(3{,}075 + 3{,}100) \div 2 = 6{,}175 \div 2 = 3{,}0875$ m.` }
      ] },
    '6e-addsous': { titre: 'Le budget de la sortie', etoiles: 2,
      enonce: r`<p>La classe dispose de $250$ € pour une sortie. Elle paie le car $137{,}50$ €, les entrées $64{,}80$ € et le goûter $23{,}85$ €.</p>`,
      questions: [
        { q: r`Combien la classe dépense-t-elle en tout (en €) ?`, type: 'num', rep: 226.15, corr: r`$137{,}50 + 64{,}80 + 23{,}85 = 226{,}15$ €.` },
        { q: r`Combien d'argent reste-t-il (en €) ?`, type: 'num', rep: 23.85, corr: r`$250 - 226{,}15 = 23{,}85$ €.` },
        { q: r`Le car coûte finalement $12{,}75$ € de moins. Combien reste-t-il maintenant (en €) ?`, type: 'num', rep: 36.6, corr: r`On récupère $12{,}75$ € : $23{,}85 + 12{,}75 = 36{,}60$ €.` },
        { q: r`En arrondissant chacune des trois dépenses de départ à l'unité, quel total estimé obtient-on ?`, type: 'num', rep: 227, corr: r`$137{,}50 \approx 138$ ; $64{,}80 \approx 65$ ; $23{,}85 \approx 24$. Total estimé : $138 + 65 + 24 = 227$ €, très proche du vrai total $226{,}15$ €.` }
      ] },
    '6e-multiplication': { titre: 'Les courses au marché', etoiles: 2,
      enonce: r`<p>Au marché, Lina achète $3{,}2$ kg de pommes à $2{,}35$ € le kg, $0{,}4$ kg de fromage à $18{,}90$ € le kg et $4$ baguettes à $1{,}15$ € l'une.</p>`,
      questions: [
        { q: r`Combien coûtent les pommes (en €) ?`, type: 'num', rep: 7.52, corr: r`$3{,}2 \times 2{,}35 = 7{,}52$ € (on calcule $32 \times 235 = 7\,520$ puis on place $3$ décimales).` },
        { q: r`Combien coûte le fromage (en €) ?`, type: 'num', rep: 7.56, corr: r`$0{,}4 \times 18{,}90 = 7{,}56$ €.` },
        { q: r`Combien coûtent les baguettes (en €) ?`, type: 'num', rep: 4.6, corr: r`$4 \times 1{,}15 = 4{,}60$ €.` },
        { q: r`Elle paie avec un billet de $20$ €. Combien lui rend-on (en €) ?`, type: 'num', rep: 0.32, corr: r`Total : $7{,}52 + 7{,}56 + 4{,}60 = 19{,}68$ €. On lui rend $20 - 19{,}68 = 0{,}32$ €.` }
      ] },
    '6e-division': { titre: 'Mille œufs à ranger', etoiles: 3,
      enonce: r`<p>Une ferme ramasse $1\,000$ œufs par jour et les range dans des boîtes.</p>`,
      questions: [
        { q: r`Avec des boîtes de $12$, combien de boîtes pleines remplit-on ?`, type: 'num', rep: 83, corr: r`$1\,000 = 12 \times 83 + 4$ : $83$ boîtes pleines.` },
        { q: r`Combien d'œufs restent alors hors des boîtes ?`, type: 'num', rep: 4, corr: r`Le reste de la division euclidienne : $1\,000 - 996 = 4$ œufs.` },
        { q: r`On veut des boîtes toutes pareilles, sans aucun reste, avec entre $10$ et $30$ œufs par boîte. Donne un nombre d'œufs par boîte possible.`, type: 'une', rep: [10, 20, 25], aide: 'Une valeur suffit.', corr: r`Il faut un diviseur de $1\,000$ entre $10$ et $30$ : $10$, $20$ ou $25$ (car $1\,000 = 10 \times 100 = 20 \times 50 = 25 \times 40$).` },
        { q: r`Quel est le plus petit nombre d'œufs, supérieur à $1\,000$, que l'on peut ranger exactement en boîtes de $12$ et aussi exactement en boîtes de $18$ ?`, type: 'num', rep: 1008, corr: r`Il faut un multiple commun de $12$ et $18$. Les multiples communs sont les multiples de $36$. $36 \times 27 = 972$ et $36 \times 28 = 1\,008$ : la réponse est $1\,008$.` }
      ] },
    '6e-fractions': { titre: 'La tablette de chocolat', etoiles: 2,
      enonce: r`<p>Une tablette compte $24$ carrés. Léo en mange $\dfrac14$, Zoé $\dfrac13$ et Max $\dfrac16$ (fractions de la tablette entière).</p>`,
      questions: [
        { q: r`Combien de carrés Léo mange-t-il ?`, type: 'num', rep: 6, corr: r`$\dfrac14$ de $24$ : $24 \div 4 = 6$ carrés.` },
        { q: r`Combien de carrés reste-t-il quand les trois ont mangé ?`, type: 'num', rep: 6, corr: r`Zoé : $24 \div 3 = 8$ ; Max : $24 \div 6 = 4$. Ils mangent $6 + 8 + 4 = 18$ carrés, il en reste $6$.` },
        { q: r`Quelle fraction de la tablette reste-t-il ? (fraction ou décimal)`, type: 'num', rep: 0.25, corr: r`$\dfrac{6}{24} = \dfrac14 = 0{,}25$.` },
        { q: r`Quelle fraction est égale à la part de Zoé ?`, type: 'qcm', choix: [r`$\dfrac26$`, r`$\dfrac36$`, r`$\dfrac14$`, r`$\dfrac46$`], rep: 0, corr: r`$\dfrac13 = \dfrac{1 \times 2}{3 \times 2} = \dfrac26$.` }
      ] },
    '6e-fraction-quantite': { titre: 'La cantine de la 6e B', etoiles: 2,
      enonce: r`<p>La 6e B compte $28$ élèves. Les $\dfrac34$ sont demi-pensionnaires. Parmi les demi-pensionnaires, les $\dfrac27$ viennent en bus.</p>`,
      questions: [
        { q: r`Combien d'élèves sont demi-pensionnaires ?`, type: 'num', rep: 21, corr: r`$\dfrac34 \times 28 = 28 \div 4 \times 3 = 21$.` },
        { q: r`Combien de demi-pensionnaires viennent en bus ?`, type: 'num', rep: 6, corr: r`$\dfrac27 \times 21 = 21 \div 7 \times 2 = 6$.` },
        { q: r`Combien d'élèves ne mangent pas à la cantine ?`, type: 'num', rep: 7, corr: r`$28 - 21 = 7$.` },
        { q: r`Quelle fraction de toute la classe représentent les demi-pensionnaires venant en bus ? (fraction)`, type: 'num', rep: 3 / 14, corr: r`$\dfrac{6}{28} = \dfrac{3}{14}$. On peut aussi faire $\dfrac27 \times \dfrac34 = \dfrac{6}{28}$.` }
      ] },
    '6e-proportionnalite': { titre: 'Les crêpes de la Chandeleur', etoiles: 3,
      enonce: r`<p>Pour $12$ crêpes, il faut $250$ g de farine, $4$ œufs et $0{,}5$ L de lait.</p>`,
      questions: [
        { q: r`Quelle masse de farine (en g) faut-il pour $30$ crêpes ?`, type: 'num', rep: 625, corr: r`$30 = 12 \times 2{,}5$ : $250 \times 2{,}5 = 625$ g.` },
        { q: r`Combien d'œufs faut-il pour $30$ crêpes ?`, type: 'num', rep: 10, corr: r`$4 \times 2{,}5 = 10$ œufs.` },
        { q: r`Avec $1$ L de lait (et assez du reste), combien de crêpes peut-on faire ?`, type: 'num', rep: 24, corr: r`$1$ L, c'est $2 \times 0{,}5$ L : $2 \times 12 = 24$ crêpes.` },
        { q: r`On a $1$ kg de farine et $14$ œufs, et autant de lait que l'on veut. Combien de crêpes au maximum peut-on faire ?`, type: 'num', rep: 42, corr: r`La farine permet $\dfrac{1\,000}{250} \times 12 = 48$ crêpes ; les œufs seulement $\dfrac{14}{4} \times 12 = 42$. C'est l'ingrédient qui manque le premier qui décide : $42$ crêpes.` }
      ] },
    '6e-droites-cercles': { titre: 'Deux cercles qui se croisent', etoiles: 2,
      enonce: r`<p>$[AB]$ mesure $6$ cm. On trace le cercle $\mathcal{C}_1$ de centre $A$ et de rayon $6$ cm, et le cercle $\mathcal{C}_2$ de centre $B$ et de même rayon. Ils se coupent en $E$ et $F$.</p>`,
      questions: [
        { q: r`Combien mesure $AE$ (en cm) ?`, type: 'num', rep: 6, corr: r`$E$ est sur $\mathcal{C}_1$, de centre $A$ et de rayon $6$ cm, donc $AE = 6$ cm.` },
        { q: r`Quelle est la nature du triangle $ABE$ ?`, type: 'qcm', choix: [r`Équilatéral`, r`Isocèle mais pas équilatéral`, r`Rectangle`, r`Quelconque`], rep: 0, corr: r`$AE = 6$ (rayon de $\mathcal{C}_1$), $BE = 6$ (rayon de $\mathcal{C}_2$) et $AB = 6$ : trois côtés égaux.` },
        { q: r`Quel est le périmètre du quadrilatère $AEBF$ (en cm) ?`, type: 'num', rep: 24, corr: r`$AE = EB = BF = FA = 6$ cm : c'est un losange de périmètre $4 \times 6 = 24$ cm.` },
        { q: r`On trace maintenant le cercle de centre $A$ et de rayon $3$ cm, et celui de centre $B$ et de rayon $2$ cm. Combien de points communs ont-ils ?`, type: 'num', rep: 0, corr: r`Les points du premier sont à au plus $3$ cm de $A$, ceux du second à au plus $2$ cm de $B$. Comme $3 + 2 = 5 \lt 6 = AB$, les cercles ne se touchent pas : $0$ point commun.` }
      ] },
    '6e-angles': { titre: 'Les aiguilles de l\'horloge', etoiles: 3,
      enonce: r`<p>Le cadran d'une horloge est un cercle partagé en $12$ parts égales par les heures.</p>`,
      questions: [
        { q: r`Quel angle (en degrés) sépare deux graduations d'heures voisines ?`, type: 'num', rep: 30, unite: '°', corr: r`$360° \div 12 = 30°$.` },
        { q: r`De combien de degrés tourne l'aiguille des minutes en $20$ minutes ?`, type: 'num', rep: 120, unite: '°', corr: r`Elle fait un tour ($360°$) en $60$ min, donc $6°$ par minute : $20 \times 6° = 120°$.` },
        { q: r`À $4$ h pile, quel est l'angle (en degrés) entre les deux aiguilles ?`, type: 'num', rep: 120, unite: '°', corr: r`Les aiguilles montrent $12$ et $4$ : $4$ graduations, soit $4 \times 30° = 120°$.` },
        { q: r`À $3$ h $30$, quel est l'angle (en degrés) entre les deux aiguilles ?`, type: 'num', rep: 75, unite: '°', corr: r`L'aiguille des minutes est sur le $6$ ($180°$ depuis le $12$). Celle des heures a fait la moitié du chemin entre $3$ et $4$ : $3{,}5 \times 30° = 105°$. Angle : $180° - 105° = 75°$.` }
      ] },
    '6e-perimetres-aires': { titre: 'Le jardin et le bassin', etoiles: 3,
      enonce: r`<p>Un jardin rectangulaire mesure $12$ m sur $8$ m. On y creuse un bassin carré de $3$ m de côté ; le reste devient de la pelouse.</p>`,
      questions: [
        { q: r`Quelle est l'aire du jardin (en m²) ?`, type: 'num', rep: 96, unite: 'm²', corr: r`$12 \times 8 = 96$ m².` },
        { q: r`Quelle est l'aire de la pelouse (en m²) ?`, type: 'num', rep: 87, unite: 'm²', corr: r`Bassin : $3 \times 3 = 9$ m². Pelouse : $96 - 9 = 87$ m².` },
        { q: r`On clôture le jardin en laissant un portail de $1{,}5$ m sans grillage. Quelle longueur de grillage (en m) faut-il ?`, type: 'num', rep: 38.5, unite: 'm', corr: r`Périmètre : $2 \times (12 + 8) = 40$ m. Sans le portail : $40 - 1{,}5 = 38{,}5$ m.` },
        { q: r`Un sac de gazon couvre $15$ m². Combien de sacs faut-il acheter pour la pelouse ?`, type: 'num', rep: 6, corr: r`$87 \div 15 = 5{,}8$ : $5$ sacs ne suffisent pas ($75$ m²), il en faut $6$.` }
      ] },
    '6e-symetrie': { titre: 'Le papillon symétrique', etoiles: 2,
      enonce: r`<p>Un papillon est dessiné symétrique par rapport à la droite $(d)$. Le point $A$ d'une aile est à $3$ cm de $(d)$ ; son symétrique est $A'$.</p>`,
      questions: [
        { q: r`Combien mesure $AA'$ (en cm) ?`, type: 'num', rep: 6, corr: r`$(d)$ est la médiatrice de $[AA']$ : $A'$ est aussi à $3$ cm de $(d)$, donc $AA' = 6$ cm.` },
        { q: r`Le segment $[AB]$ de l'aile mesure $4{,}5$ cm. Combien mesure son symétrique $[A'B']$ (en cm) ?`, type: 'num', rep: 4.5, corr: r`La symétrie axiale conserve les longueurs : $4{,}5$ cm.` },
        { q: r`L'angle $\widehat{ABC}$ mesure $37°$. Combien mesure son symétrique $\widehat{A'B'C'}$ ?`, type: 'num', rep: 37, unite: '°', corr: r`La symétrie conserve les angles : $37°$.` },
        { q: r`Combien d'axes de symétrie possède un rectangle qui n'est pas un carré ?`, type: 'qcm', choix: [r`$2$`, r`$4$`, r`$1$`, r`$0$`], rep: 0, corr: r`Les deux médiatrices de ses côtés. Les diagonales ne sont pas des axes (sauf pour un carré, qui en a $4$).` }
      ] },
    '6e-donnees': { titre: 'Le sondage des loisirs', etoiles: 2,
      enonce: r`<p>On a demandé leur loisir préféré à $40$ élèves : sport $14$, lecture $6$, jeux vidéo $12$, musique $8$.</p>`,
      questions: [
        { q: r`Quelle est la fréquence des jeux vidéo (en décimal) ?`, type: 'num', rep: 0.3, corr: r`$\dfrac{12}{40} = 0{,}3$.` },
        { q: r`Quel pourcentage d'élèves préfère la musique ?`, type: 'num', rep: 20, unite: '%', corr: r`$\dfrac{8}{40} = 0{,}2 = 20\,\%$.` },
        { q: r`Dans un diagramme circulaire, quel angle (en degrés) représente le sport ?`, type: 'num', rep: 126, unite: '°', corr: r`$\dfrac{14}{40} \times 360° = 0{,}35 \times 360° = 126°$.` },
        { q: r`$10$ élèves de plus répondent, tous « lecture ». Quelle est la nouvelle fréquence de la lecture ?`, type: 'num', rep: 0.32, corr: r`Lecture : $6 + 10 = 16$ sur $40 + 10 = 50$ : $\dfrac{16}{50} = 0{,}32$.` }
      ] },
    '6e-solides': { titre: 'Remplir l\'aquarium', etoiles: 3,
      enonce: r`<p>Un aquarium en forme de pavé droit mesure $60$ cm de long, $30$ cm de large et $40$ cm de haut.</p>`,
      questions: [
        { q: r`Quel est son volume (en cm³) ?`, type: 'num', rep: 72000, unite: 'cm³', corr: r`$60 \times 30 \times 40 = 72\,000$ cm³.` },
        { q: r`Quelle est sa contenance (en L) ?`, type: 'num', rep: 72, unite: 'L', corr: r`$1$ L $= 1\,000$ cm³ : $72\,000 \div 1\,000 = 72$ L.` },
        { q: r`On le remplit d'eau jusqu'aux $\dfrac34$ de sa hauteur. Combien de litres d'eau contient-il ?`, type: 'num', rep: 54, unite: 'L', corr: r`Hauteur d'eau : $\dfrac34 \times 40 = 30$ cm. Volume : $60 \times 30 \times 30 = 54\,000$ cm³, soit $54$ L.` },
        { q: r`On pose au fond un rocher de $2{,}7$ L (il est entièrement sous l'eau). De combien de centimètres l'eau monte-t-elle ?`, type: 'num', rep: 1.5, unite: 'cm', corr: r`Le rocher pousse $2\,700$ cm³ d'eau vers le haut, sur une surface de $60 \times 30 = 1\,800$ cm². L'eau monte de $2\,700 \div 1\,800 = 1{,}5$ cm.` }
      ] },
    '6e-durees': { titre: 'Le voyage en train', etoiles: 2,
      enonce: r`<p>Un TGV part de Paris à $7\text{h}48$ et arrive à Lyon à $9\text{h}47$. La correspondance pour Marseille part de Lyon à $10\text{h}15$ et arrive à $11\text{h}56$.</p>`,
      questions: [
        { q: r`Combien de minutes dure le trajet Paris–Lyon ?`, type: 'num', rep: 119, unite: 'min', corr: r`De $7\text{h}48$ à $8\text{h}00$ : $12$ min ; de $8\text{h}00$ à $9\text{h}47$ : $107$ min. Total $119$ min, soit $1$ h $59$ min.` },
        { q: r`Combien de minutes attend-on à Lyon ?`, type: 'num', rep: 28, unite: 'min', corr: r`De $9\text{h}47$ à $10\text{h}15$ : $13 + 15 = 28$ min.` },
        { q: r`Combien de minutes dure tout le voyage, de Paris à Marseille ?`, type: 'num', rep: 248, unite: 'min', corr: r`De $7\text{h}48$ à $11\text{h}48$ : $4$ h, puis $8$ min. $4 \times 60 + 8 = 248$ min.` },
        { q: r`Le TGV arrive à Lyon avec $25$ minutes de retard. Combien de minutes reste-t-il pour attraper la correspondance ?`, type: 'num', rep: 3, unite: 'min', corr: r`Arrivée à $9\text{h}47 + 25 \text{ min} = 10\text{h}12$. Il reste $3$ minutes : il faudra courir !` }
      ] }
  });
})();
