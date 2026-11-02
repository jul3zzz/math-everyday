/* Problèmes longs de 4e : un par leçon, à questions enchaînées. Étoiles : ★★ difficile, ★★★ très difficile. */
(function () {
  var r = String.raw;
  addProblemes('4e', {
    '4e-relatifs-produit': { titre: 'Le jeu des cartes signées', etoiles: 2,
      enonce: r`<p>On dispose de quatre cartes : $+3$, $-5$, $-2$ et $+4$.</p>`,
      questions: [
        { q: r`Quel est le produit des quatre cartes ?`, type: 'num', rep: 120, corr: r`Deux facteurs négatifs : le produit est positif. $3 \times 5 \times 2 \times 4 = 120$.` },
        { q: r`On choisit deux cartes. Quel est le plus petit produit possible ?`, type: 'num', rep: -20, corr: r`Un produit négatif demande une carte positive et une négative ; le plus « grand » en valeur : $(-5) \times 4 = -20$.` },
        { q: r`Et le plus grand produit de deux cartes ?`, type: 'num', rep: 12, corr: r`$3 \times 4 = 12$ bat $(-5) \times (-2) = 10$.` },
        { q: r`Calcule $\dfrac{(-2)^3 \times (-5)}{-4}$.`, type: 'num', rep: -10, corr: r`$(-2)^3 = -8$ ; $(-8) \times (-5) = 40$ ; $40 \div (-4) = -10$.` }
      ] },
    '4e-fractions-produit': { titre: 'Le partage de l\'héritage', etoiles: 3,
      enonce: r`<p>Un héritage est partagé entre trois enfants. L'aîné reçoit les $\dfrac25$ de l'héritage, le cadet les $\dfrac34$ de ce qui reste, et le benjamin le reste.</p>`,
      questions: [
        { q: r`Quelle fraction de l'héritage reste après la part de l'aîné ?`, type: 'num', rep: 3 / 5, corr: r`$1 - \dfrac25 = \dfrac35$.` },
        { q: r`Quelle fraction de l'héritage reçoit le cadet ?`, type: 'num', rep: 9 / 20, corr: r`Les $\dfrac34$ de $\dfrac35$ : $\dfrac34 \times \dfrac35 = \dfrac{9}{20}$.` },
        { q: r`Quelle fraction de l'héritage reçoit le benjamin ?`, type: 'num', rep: 3 / 20, corr: r`$1 - \dfrac{8}{20} - \dfrac{9}{20} = \dfrac{3}{20}$ (c'est aussi $\dfrac14$ de $\dfrac35$).` },
        { q: r`Le benjamin reçoit $4\,500$ €. Quel est le montant total de l'héritage (en €) ?`, type: 'num', rep: 30000, corr: r`$\dfrac{3}{20} \times H = 4\,500$, donc $H = 4\,500 \times \dfrac{20}{3} = 30\,000$ €.` },
        { q: r`Calcule $\dfrac23 \div \dfrac49 - 1$.`, type: 'num', rep: 0.5, corr: r`Diviser, c'est multiplier par l'inverse : $\dfrac23 \times \dfrac94 = \dfrac{18}{12} = \dfrac32$, puis $\dfrac32 - 1 = \dfrac12$.` }
      ] },
    '4e-puissances': { titre: 'Les grains de riz de l\'échiquier', etoiles: 2,
      enonce: r`<p>Selon la légende, on pose $1$ grain de riz sur la 1ʳᵉ case d'un échiquier, $2$ sur la 2ᵉ, $4$ sur la 3ᵉ, et on double à chaque case.</p>`,
      questions: [
        { q: r`Combien de grains y a-t-il sur la 11ᵉ case ?`, type: 'num', rep: 1024, corr: r`Sur la case $n$ il y a $2^{n-1}$ grains : $2^{10} = 1\,024$.` },
        { q: r`Combien de grains y a-t-il en tout sur les $5$ premières cases ?`, type: 'num', rep: 31, corr: r`$1 + 2 + 4 + 8 + 16 = 31 = 2^5 - 1$.` },
        { q: r`Simplifie $\dfrac{10^5 \times 10^{-2}}{10^{-4}}$ en $10^n$. Donne $n$.`, type: 'num', rep: 7, corr: r`$10^{5 + (-2) - (-4)} = 10^{7}$.` },
        { q: r`Calcule $\dfrac{2^5 \times 2^3}{2^6}$.`, type: 'num', rep: 4, corr: r`$2^{5 + 3 - 6} = 2^2 = 4$.` }
      ] },
    '4e-nombres-premiers': { titre: 'Les cigales et les nombres premiers', etoiles: 3,
      enonce: r`<p>Certaines cigales d'Amérique sortent de terre tous les $13$ ans, d'autres tous les $17$ ans. Leurs cycles sont des nombres premiers.</p>`,
      questions: [
        { q: r`Deux espèces sortent ensemble cette année. Dans combien d'années sortiront-elles ensemble à nouveau ?`, type: 'num', rep: 221, corr: r`$13$ et $17$ sont premiers entre eux : le premier multiple commun est $13 \times 17 = 221$ ans.` },
        { q: r`$360 = 2^a \times 3^b \times 5$. Quelle est la valeur de $a$ ?`, type: 'num', rep: 3, corr: r`$360 = 8 \times 45 = 2^3 \times 3^2 \times 5$ : $a = 3$.` },
        { q: r`Quel est le seul nombre premier entre $90$ et $100$ ?`, type: 'num', rep: 97, corr: r`$91 = 7 \times 13$, $93 = 3 \times 31$, $95 = 5 \times 19$, $99 = 9 \times 11$, les pairs sont exclus : il reste $97$.` },
        { q: r`Combien de diviseurs positifs possède $36$ ?`, type: 'num', rep: 9, corr: r`$1, 2, 3, 4, 6, 9, 12, 18, 36$ : $9$ diviseurs. ($36 = 2^2 \times 3^2$, et $(2 + 1)(2 + 1) = 9$.)` },
        { q: r`Écris $\dfrac{84}{126}$ sous forme irréductible.`, type: 'num', rep: 2 / 3, corr: r`$84 = 2^2 \times 3 \times 7$ et $126 = 2 \times 3^2 \times 7$ : on simplifie par $2 \times 3 \times 7 = 42$, et $\dfrac{84}{126} = \dfrac23$.` }
      ] },
    '4e-developper': { titre: 'Le cadre de la photo', etoiles: 2,
      enonce: r`<p>Une photo rectangulaire mesure $x$ cm sur $(x + 4)$ cm. On l'entoure d'une bordure de $2$ cm de large tout autour.</p>`,
      questions: [
        { q: r`Quelle expression donne l'aire totale (photo et bordure) ?`, type: 'qcm', choix: [r`$x^2 + 12x + 32$`, r`$x^2 + 8x + 16$`, r`$x^2 + 6x + 8$`, r`$x^2 + 12x + 16$`], rep: 0, corr: r`Dimensions totales : $(x + 4)$ et $(x + 8)$. $(x + 4)(x + 8) = x^2 + 8x + 4x + 32 = x^2 + 12x + 32$.` },
        { q: r`Pour $x = 10$, quelle est l'aire de la bordure seule (en cm²) ?`, type: 'num', rep: 112, corr: r`Bordure $= (x^2 + 12x + 32) - x(x + 4) = 8x + 32$. Pour $x = 10$ : $112$ cm².` },
        { q: r`Pour quelle valeur de $x$ la bordure a-t-elle une aire de $100$ cm² ?`, type: 'num', rep: 8.5, corr: r`$8x + 32 = 100 \iff 8x = 68 \iff x = 8{,}5$.` },
        { q: r`On développe $(2x - 3)(x + 5)$. Quel est le coefficient de $x$ ?`, type: 'num', rep: 7, corr: r`$2x^2 + 10x - 3x - 15 = 2x^2 + 7x - 15$.` }
      ] },
    '4e-equations': { titre: 'L\'énigme des âges', etoiles: 3,
      enonce: r`<p>Paul a trois fois l'âge de sa fille. Dans $12$ ans, il n'aura plus que le double de son âge.</p>`,
      questions: [
        { q: r`Quel est l'âge de la fille aujourd'hui ?`, type: 'num', rep: 12, corr: r`Avec $x$ l'âge de la fille : $3x + 12 = 2(x + 12) \iff 3x + 12 = 2x + 24 \iff x = 12$.` },
        { q: r`Quel est l'âge de Paul ?`, type: 'num', rep: 36, corr: r`$3 \times 12 = 36$ ans. Dans $12$ ans : $48 = 2 \times 24$. ✔` },
        { q: r`Résous $5(x - 2) = 3x + 7$.`, type: 'num', rep: 8.5, corr: r`$5x - 10 = 3x + 7 \iff 2x = 17 \iff x = 8{,}5$.` },
        { q: r`La somme de deux entiers consécutifs vaut $157$. Quel est le plus petit ?`, type: 'num', rep: 78, corr: r`$n + (n + 1) = 157 \iff 2n = 156 \iff n = 78$.` }
      ] },
    '4e-pythagore': { titre: 'L\'échelle contre le mur', etoiles: 2,
      enonce: r`<p>Une échelle de $5$ m est appuyée contre un mur vertical. Son pied est à $1{,}4$ m du mur.</p>`,
      questions: [
        { q: r`À quelle hauteur (en m) l'échelle touche-t-elle le mur ?`, type: 'num', rep: 4.8, unite: 'm', corr: r`Pythagore : $h^2 = 5^2 - 1{,}4^2 = 25 - 1{,}96 = 23{,}04$, donc $h = 4{,}8$ m.` },
        { q: r`On éloigne le pied pour qu'il soit à $3$ m du mur. De combien de mètres le haut de l'échelle descend-il ?`, type: 'num', rep: 0.8, unite: 'm', corr: r`Nouvelle hauteur : $\sqrt{25 - 9} = 4$ m. Elle descend de $4{,}8 - 4 = 0{,}8$ m.` },
        { q: r`Un triangle de côtés $9$, $12$ et $15$ est-il rectangle ?`, type: 'qcm', choix: [r`Oui`, r`Non`], rep: 0, corr: r`$15^2 = 225$ et $9^2 + 12^2 = 81 + 144 = 225$ : oui, d'après la réciproque de Pythagore.` },
        { q: r`Un écran mesure $80$ cm sur $45$ cm. Quelle est sa diagonale (en cm), arrondie au dixième ?`, type: 'num', rep: 91.8, tol: 0.06, unite: 'cm', corr: r`$\sqrt{80^2 + 45^2} = \sqrt{8\,425} \approx 91{,}8$ cm.` }
      ] },
    '4e-thales': { titre: 'L\'ombre de la tour', etoiles: 3,
      enonce: r`<p>Au même moment, un bâton vertical de $1{,}5$ m a une ombre de $2$ m, et une tour a une ombre de $48$ m. Ensuite : dans un triangle $ABC$, $M \in [AB]$, $N \in [AC]$ et $(MN) \parallel (BC)$, avec $AM = 3$, $AB = 5$ et $BC = 8$ (en cm).</p>`,
      questions: [
        { q: r`Quelle est la hauteur de la tour (en m) ?`, type: 'num', rep: 36, unite: 'm', corr: r`Les rayons du soleil sont parallèles : $\dfrac{h}{48} = \dfrac{1{,}5}{2}$, donc $h = 48 \times 0{,}75 = 36$ m.` },
        { q: r`Calcule $MN$ (en cm).`, type: 'num', rep: 4.8, unite: 'cm', corr: r`$\dfrac{MN}{BC} = \dfrac{AM}{AB} = \dfrac35$, donc $MN = \dfrac35 \times 8 = 4{,}8$ cm.` },
        { q: r`On mesure $AN = 4{,}2$ cm. Calcule $AC$ (en cm).`, type: 'num', rep: 7, unite: 'cm', corr: r`$\dfrac{AN}{AC} = \dfrac35$, donc $AC = 4{,}2 \times \dfrac53 = 7$ cm.` },
        { q: r`Calcule $NC$ (en cm).`, type: 'num', rep: 2.8, unite: 'cm', corr: r`$NC = AC - AN = 7 - 4{,}2 = 2{,}8$ cm.` }
      ] },
    '4e-vitesse': { titre: 'Le marathon', etoiles: 2,
      enonce: r`<p>Un marathon mesure $42{,}195$ km. Une coureuse le termine en $3$ h $30$ min.</p>`,
      questions: [
        { q: r`Quelle est sa vitesse moyenne (en km/h), arrondie au dixième ?`, type: 'num', rep: 12.1, tol: 0.06, unite: 'km/h', corr: r`$3$ h $30$ min $= 3{,}5$ h. $v = \dfrac{42{,}195}{3{,}5} \approx 12{,}06 \approx 12{,}1$ km/h.` },
        { q: r`Combien de minutes met-elle en moyenne pour parcourir $1$ km (au dixième) ?`, type: 'num', rep: 5, tol: 0.06, unite: 'min', corr: r`$210$ min pour $42{,}195$ km : $\dfrac{210}{42{,}195} \approx 4{,}98 \approx 5{,}0$ min par km.` },
        { q: r`Un cycliste roule à $24$ km/h. Combien de minutes met-il pour la même distance (arrondi à la minute) ?`, type: 'num', rep: 105, tol: 0.6, unite: 'min', corr: r`$t = \dfrac{42{,}195}{24} \approx 1{,}758$ h, et $1{,}758 \times 60 \approx 105$ min.` },
        { q: r`Convertis $12$ m/s en km/h.`, type: 'num', rep: 43.2, unite: 'km/h', corr: r`En $1$ h ($3\,600$ s) : $12 \times 3\,600 = 43\,200$ m $= 43{,}2$ km. Donc $43{,}2$ km/h.` }
      ] },
    '4e-statistiques': { titre: 'Les notes du contrôle', etoiles: 2,
      enonce: r`<p>Notes de $10$ élèves : $8$ ; $12$ ; $15$ ; $9$ ; $14$ ; $12$ ; $17$ ; $5$ ; $12$ ; $16$.</p>`,
      questions: [
        { q: r`Quelle est la moyenne ?`, type: 'num', rep: 12, corr: r`Somme : $120$. Moyenne : $120 \div 10 = 12$.` },
        { q: r`Quelle est la médiane ?`, type: 'num', rep: 12, corr: r`Rangées : $5, 8, 9, 12, \mathbf{12}, \mathbf{12}, 14, 15, 16, 17$. Médiane : moyenne des 5ᵉ et 6ᵉ valeurs, $12$.` },
        { q: r`Quelle est l'étendue ?`, type: 'num', rep: 12, corr: r`$17 - 5 = 12$.` },
        { q: r`Un élève absent passe le contrôle et obtient $20$. Quelle est la nouvelle moyenne (arrondie au centième) ?`, type: 'num', rep: 12.73, tol: 0.006, corr: r`$\dfrac{120 + 20}{11} = \dfrac{140}{11} \approx 12{,}73$.` }
      ] },
    '4e-probabilites': { titre: 'La roue de la fête foraine', etoiles: 3,
      enonce: r`<p>Une roue a $12$ secteurs identiques : $1$ « jackpot », $3$ « gagné » et $8$ « perdu ». Une partie coûte $2$ €. « Gagné » rapporte $3$ €, « jackpot » rapporte $10$ € (la mise n'est pas rendue).</p>`,
      questions: [
        { q: r`Quelle est la probabilité de gagner quelque chose ? (fraction)`, type: 'num', rep: 1 / 3, corr: r`$\dfrac{1 + 3}{12} = \dfrac{4}{12} = \dfrac13$.` },
        { q: r`Quelle est la probabilité de perdre ? (fraction)`, type: 'num', rep: 2 / 3, corr: r`$\dfrac{8}{12} = \dfrac23$.` },
        { q: r`Sur $120$ parties, combien de jackpots peut-on espérer ?`, type: 'num', rep: 10, corr: r`$\dfrac{1}{12} \times 120 = 10$.` },
        { q: r`En moyenne, combien le joueur gagne-t-il par partie, mise déduite (en €, au centième) ?`, type: 'num', rep: -5 / 12, tol: 0.006, corr: r`Sur $12$ parties « idéales » : il reçoit $10 + 3 \times 3 = 19$ € et paie $24$ €. Par partie : $\dfrac{19 - 24}{12} = -\dfrac{5}{12} \approx -0{,}42$ €. Le forain gagne.` }
      ] },
    '4e-volumes': { titre: 'Le cornet de glace', etoiles: 3,
      enonce: r`<p>Un cornet a la forme d'un cône de rayon $3$ cm et de hauteur $12$ cm.</p>`,
      questions: [
        { q: r`Le volume du cornet s'écrit $k\pi$ cm³. Donne $k$.`, type: 'num', rep: 36, corr: r`$V = \dfrac{\pi r^2 h}{3} = \dfrac{\pi \times 9 \times 12}{3} = 36\pi$.` },
        { q: r`Quel est ce volume, arrondi au cm³ ?`, type: 'num', rep: 113, tol: 0.6, unite: 'cm³', corr: r`$36\pi \approx 113{,}1$ cm³.` },
        { q: r`Combien de cornets entiers peut-on remplir avec $1$ L de glace ?`, type: 'num', rep: 8, corr: r`$1$ L $= 1\,000$ cm³ ; $1\,000 \div 113{,}1 \approx 8{,}8$ : $8$ cornets pleins.` },
        { q: r`Quel est le volume (en cm³) d'une pyramide à base carrée de côté $6$ cm et de hauteur $10$ cm ?`, type: 'num', rep: 120, unite: 'cm³', corr: r`$\dfrac{6^2 \times 10}{3} = \dfrac{360}{3} = 120$ cm³.` }
      ] },
    '4e-ecriture-scientifique': { titre: 'De la Terre à la Lune', etoiles: 2,
      enonce: r`<p>La Lune est à environ $384\,400$ km de la Terre. La lumière parcourt $3 \times 10^5$ km par seconde. La Terre a une masse de $5{,}97 \times 10^{24}$ kg et la Lune de $7{,}35 \times 10^{22}$ kg.</p>`,
      questions: [
        { q: r`Écris $384\,400$ en écriture scientifique $a \times 10^n$. Donne $n$.`, type: 'num', rep: 5, corr: r`$384\,400 = 3{,}844 \times 10^5$.` },
        { q: r`Combien de secondes met la lumière pour aller de la Lune à la Terre (au centième) ?`, type: 'num', rep: 1.28, tol: 0.006, unite: 's', corr: r`$\dfrac{384\,400}{300\,000} \approx 1{,}28$ s.` },
        { q: r`Combien de fois la Terre est-elle plus lourde que la Lune (arrondi à l'unité) ?`, type: 'num', rep: 81, tol: 0.6, corr: r`$\dfrac{5{,}97 \times 10^{24}}{7{,}35 \times 10^{22}} = \dfrac{5{,}97}{7{,}35} \times 10^2 \approx 0{,}812 \times 100 \approx 81$.` },
        { q: r`$(6 \times 10^{-3}) \times (5 \times 10^{7}) = a \times 10^n$ en écriture scientifique. Donne $a$.`, type: 'num', rep: 3, corr: r`$30 \times 10^{4} = 3 \times 10^{5}$ : $a = 3$.` }
      ] },
    '4e-cosinus': { titre: 'La rampe d\'accès', etoiles: 3,
      enonce: r`<p>Une rampe pour fauteuil roulant mesure $6$ m et fait un angle de $5°$ avec le sol horizontal.</p>`,
      questions: [
        { q: r`Quelle longueur au sol (en m) couvre-t-elle, au centième ?`, type: 'num', rep: 5.98, tol: 0.006, unite: 'm', corr: r`$6 \times \cos 5° \approx 6 \times 0{,}9962 \approx 5{,}98$ m.` },
        { q: r`De quelle hauteur (en m) monte-t-elle, au centième ? (Pythagore)`, type: 'num', rep: 0.52, tol: 0.006, unite: 'm', corr: r`$h = \sqrt{6^2 - 5{,}977^2} \approx \sqrt{0{,}275} \approx 0{,}52$ m.` },
        { q: r`Une autre rampe de $4$ m monte de $0{,}5$ m. Quelle longueur au sol (en m) couvre-t-elle, au centième ?`, type: 'num', rep: 3.97, tol: 0.006, unite: 'm', corr: r`$\sqrt{4^2 - 0{,}5^2} = \sqrt{15{,}75} \approx 3{,}97$ m.` },
        { q: r`Quel angle (en degrés, au dixième) cette deuxième rampe fait-elle avec le sol ?`, type: 'num', rep: 7.2, tol: 0.06, unite: '°', corr: r`$\cos \alpha = \dfrac{3{,}969}{4} \approx 0{,}9922$, donc $\alpha \approx 7{,}2°$.` }
      ] }
  });
})();
