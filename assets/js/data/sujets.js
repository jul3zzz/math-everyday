/* Sujets complets façon examen (abonnés) : exercices à questions enchaînées, notés sur 20.
   Chaque question : { q, type, rep, tol?, choix?, corr }. Les points de l'exercice sont répartis entre ses questions. */
(function () {
  var r = String.raw;
  window.SUJETS = [
    {
      id: 'brevet-1', niveau: '3e', type: 'Brevet', titre: 'Sujet type brevet n°1', duree: 120,
      exercices: [
        { titre: 'Questionnaire', points: 6, enonce: r`<p>Pour chaque question, une seule réponse est exacte.</p>`, questions: [
          { q: r`La forme factorisée de $x^2 - 25$ est :`, type: 'qcm', choix: [r`$(x - 5)(x + 5)$`, r`$(x - 5)^2$`, r`$(x - 25)(x + 1)$`], rep: 0, corr: r`$a^2 - b^2 = (a - b)(a + b)$ avec $a = x$ et $b = 5$.` },
          { q: r`Le PGCD de $72$ et $120$ est :`, type: 'qcm', choix: [r`$24$`, r`$12$`, r`$8$`], rep: 0, corr: r`$72 = 2^3 \times 3^2$ et $120 = 2^3 \times 3 \times 5$, donc $\text{PGCD} = 2^3 \times 3 = 24$.` },
          { q: r`On lance un dé équilibré à 6 faces. La probabilité d'obtenir un nombre premier est :`, type: 'qcm', choix: [r`$\dfrac12$`, r`$\dfrac13$`, r`$\dfrac23$`], rep: 0, corr: r`Les nombres premiers sont $2$, $3$ et $5$ : $\dfrac36 = \dfrac12$.` }
        ] },
        { titre: 'Géométrie : Pythagore et Thalès', points: 7, enonce: r`<p>$ABC$ est un triangle rectangle en $A$ avec $AB = 6$ cm et $AC = 8$ cm. $M$ est le point de $[AB]$ tel que $AM = 4{,}5$ cm. La parallèle à $(BC)$ passant par $M$ coupe $[AC]$ en $N$.</p>`, questions: [
          { q: r`Calcule $BC$ (en cm).`, type: 'num', rep: 10, corr: r`Pythagore dans $ABC$ rectangle en $A$ : $BC^2 = 6^2 + 8^2 = 100$, donc $BC = 10$ cm.` },
          { q: r`Calcule $AN$ (en cm).`, type: 'num', rep: 6, corr: r`$(MN) \parallel (BC)$ : Thalès donne $\dfrac{AN}{AC} = \dfrac{AM}{AB}$, soit $AN = \dfrac{8 \times 4{,}5}{6} = 6$ cm.` },
          { q: r`Calcule $MN$ (en cm).`, type: 'num', rep: 7.5, corr: r`$\dfrac{MN}{BC} = \dfrac{AM}{AB} = 0{,}75$, donc $MN = 0{,}75 \times 10 = 7{,}5$ cm.` },
          { q: r`Calcule l'aire du triangle $AMN$ (en cm²).`, type: 'num', rep: 13.5, corr: r`$AMN$ est rectangle en $A$ : $\dfrac{4{,}5 \times 6}{2} = 13{,}5$ cm².` }
        ] },
        { titre: 'Fonctions : choisir un tarif', points: 7, enonce: r`<p>Une salle de sport propose deux tarifs. Tarif A : $12$ € par mois plus $1{,}50$ € par séance. Tarif B : $3$ € par séance, sans abonnement. On note $x$ le nombre de séances dans le mois, $f(x)$ le prix avec le tarif A et $g(x)$ le prix avec le tarif B.</p>`, questions: [
          { q: r`Combien coûtent $10$ séances avec le tarif B (en €) ?`, type: 'num', rep: 30, corr: r`$g(x) = 3x$, donc $g(10) = 30$ €.` },
          { q: r`Combien coûtent $10$ séances avec le tarif A (en €) ?`, type: 'num', rep: 27, corr: r`$f(x) = 1{,}5x + 12$, donc $f(10) = 15 + 12 = 27$ €.` },
          { q: r`Pour combien de séances les deux tarifs sont-ils égaux ?`, type: 'num', rep: 8, corr: r`$1{,}5x + 12 = 3x \iff 12 = 1{,}5x \iff x = 8$.` },
          { q: r`À partir de combien de séances (nombre entier) le tarif A est-il strictement plus avantageux ?`, type: 'num', rep: 9, corr: r`$1{,}5x + 12 \lt 3x \iff x \gt 8$ : à partir de $9$ séances.` }
        ] }
      ]
    },
    {
      id: 'brevet-2', niveau: '3e', type: 'Brevet', titre: 'Sujet type brevet n°2', duree: 120,
      exercices: [
        { titre: 'Statistiques', points: 5, enonce: r`<p>Voici les notes d'un élève au premier trimestre : $8$ ; $12$ ; $15$ ; $9$ ; $14$ ; $12$ ; $17$ ; $11$.</p>`, questions: [
          { q: r`Calcule la moyenne de ces notes.`, type: 'num', rep: 12.25, corr: r`Somme $= 98$, et $98 \div 8 = 12{,}25$.` },
          { q: r`Quelle est la médiane de cette série ?`, type: 'num', rep: 12, corr: r`Rangée : $8, 9, 11, 12, 12, 14, 15, 17$. Médiane : $\dfrac{12 + 12}{2} = 12$.` },
          { q: r`Quelle est l'étendue de la série ?`, type: 'num', rep: 9, corr: r`$17 - 8 = 9$.` }
        ] },
        { titre: 'Un cône', points: 5, enonce: r`<p>Un cône de révolution a pour rayon de base $3$ cm et pour hauteur $4$ cm.</p>`, questions: [
          { q: r`Calcule la longueur d'une génératrice (en cm).`, type: 'num', rep: 5, corr: r`Pythagore dans le triangle formé par la hauteur, le rayon et la génératrice : $\sqrt{3^2 + 4^2} = 5$ cm.` },
          { q: r`Calcule le volume du cône (en cm³, arrondi au dixième).`, type: 'num', rep: 12 * Math.PI, tol: 0.06, corr: r`$V = \dfrac{\pi \times 3^2 \times 4}{3} = 12\pi \approx 37{,}7$ cm³.` },
          { q: r`Quel angle (en degrés, arrondi à l'unité) fait une génératrice avec l'axe du cône ?`, type: 'num', rep: Math.atan(3 / 4) * 180 / Math.PI, tol: 0.6, corr: r`$\tan\alpha = \dfrac{3}{4}$, donc $\alpha \approx 37°$.` }
        ] },
        { titre: 'Calcul littéral', points: 5, enonce: r`<p>On considère $A = (2x - 3)^2 - (x + 1)(x - 1)$.</p>`, questions: [
          { q: r`Calcule $A$ pour $x = 2$.`, type: 'num', rep: -2, corr: r`$(4 - 3)^2 - 3 \times 1 = 1 - 3 = -2$.` },
          { q: r`La forme développée et réduite de $A$ est :`, type: 'qcm', choix: [r`$3x^2 - 12x + 10$`, r`$3x^2 - 12x + 8$`, r`$5x^2 - 12x + 10$`], rep: 0, corr: r`$4x^2 - 12x + 9 - (x^2 - 1) = 3x^2 - 12x + 10$.` },
          { q: r`Résous $(x - 3)(2x + 5) = 0$.`, type: 'liste', rep: [3, -2.5], corr: r`$x = 3$ ou $x = -\dfrac52 = -2{,}5$.` }
        ] },
        { titre: 'Probabilités', points: 5, enonce: r`<p>Une urne contient $3$ boules rouges et $5$ boules vertes, indiscernables au toucher.</p>`, questions: [
          { q: r`On tire une boule au hasard. Probabilité qu'elle soit rouge (en décimal) ?`, type: 'num', rep: 0.375, corr: r`$\dfrac38 = 0{,}375$.` },
          { q: r`On tire successivement deux boules <b>sans remise</b>. Probabilité d'obtenir deux rouges (fraction ou arrondi au millième) ?`, type: 'num', rep: 3 / 28, tol: 0.0006, corr: r`$\dfrac38 \times \dfrac27 = \dfrac{6}{56} = \dfrac{3}{28} \approx 0{,}107$.` }
        ] }
      ]
    },
    {
      id: 'bac-1', niveau: 'tle', type: 'Bac', titre: 'Sujet type bac n°1', duree: 240,
      exercices: [
        { titre: 'Suites', points: 6, enonce: r`<p>On considère la suite $(u_n)$ définie par $u_0 = 2$ et $u_{n+1} = 0{,}5\,u_n + 3$. On pose $v_n = u_n - 6$.</p>`, questions: [
          { q: r`Calcule $u_1$.`, type: 'num', rep: 4, corr: r`$u_1 = 0{,}5 \times 2 + 3 = 4$.` },
          { q: r`$(v_n)$ est géométrique. Combien vaut $v_0$ ?`, type: 'num', rep: -4, corr: r`$v_{n+1} = u_{n+1} - 6 = 0{,}5u_n - 3 = 0{,}5(u_n - 6) = 0{,}5\,v_n$ : raison $0{,}5$, et $v_0 = 2 - 6 = -4$.` },
          { q: r`On en déduit $u_n = 6 - 4 \times 0{,}5^n$. Calcule $u_5$.`, type: 'num', rep: 5.875, corr: r`$6 - \dfrac{4}{32} = 6 - 0{,}125 = 5{,}875$.` },
          { q: r`Quel est le plus petit entier $n$ tel que $u_n \gt 5{,}99$ ?`, type: 'num', rep: 9, corr: r`$4 \times 0{,}5^n \lt 0{,}01 \iff 0{,}5^n \lt 0{,}0025 \iff n \gt \dfrac{\ln 0{,}0025}{\ln 0{,}5} \approx 8{,}64$, donc $n = 9$.` }
        ] },
        { titre: 'Fonction exponentielle', points: 5, enonce: r`<p>Soit $f$ définie sur $\mathbb R$ par $f(x) = (x - 1)e^x$. On admet que $f'(x) = xe^x$.</p>`, questions: [
          { q: r`Calcule $f'(1)$ (valeur exacte comme e, ou arrondi au millième).`, type: 'num', rep: Math.E, tol: 0.0006, corr: r`$f'(1) = 1 \times e^1 = e \approx 2{,}718$.` },
          { q: r`Quel est le minimum de $f$ sur $\mathbb R$ ?`, type: 'num', rep: -1, corr: r`$f'(x) = xe^x$ est du signe de $x$ : $f$ décroît puis croît, minimum $f(0) = -1$.` },
          { q: r`Calcule $\displaystyle\int_0^1 xe^x\,\mathrm dx$.`, type: 'num', rep: 1, corr: r`$f$ est une primitive de $xe^x$ : $f(1) - f(0) = 0 - (-1) = 1$.` }
        ] },
        { titre: 'Loi binomiale', points: 4, enonce: r`<p>Un QCM comporte $10$ questions indépendantes ; pour chacune, un élève qui répond au hasard a une probabilité $0{,}2$ de trouver la bonne réponse. $X$ est le nombre de bonnes réponses.</p>`, questions: [
          { q: r`Quelle est l'espérance de $X$ ?`, type: 'num', rep: 2, corr: r`$X \sim \mathcal B(10\,;0{,}2)$, donc $E(X) = 10 \times 0{,}2 = 2$.` },
          { q: r`Calcule $P(X = 0)$ (arrondi au millième).`, type: 'num', rep: Math.pow(0.8, 10), tol: 0.0006, corr: r`$0{,}8^{10} \approx 0{,}107$.` },
          { q: r`Calcule $P(X \geq 1)$ (arrondi au millième).`, type: 'num', rep: 1 - Math.pow(0.8, 10), tol: 0.0006, corr: r`$1 - 0{,}8^{10} \approx 0{,}893$.` }
        ] },
        { titre: 'Géométrie dans l\'espace', points: 5, enonce: r`<p>Dans un repère orthonormé de l'espace : $A(1\,;0\,;2)$, $B(3\,;1\,;0)$ et $C(0\,;2\,;1)$.</p>`, questions: [
          { q: r`Calcule la longueur $AB$.`, type: 'num', rep: 3, corr: r`$\overrightarrow{AB}(2\,;1\,;-2)$, donc $AB = \sqrt{4 + 1 + 4} = 3$.` },
          { q: r`Calcule $\overrightarrow{AB} \cdot \overrightarrow{AC}$.`, type: 'num', rep: 2, corr: r`$\overrightarrow{AC}(-1\,;2\,;-1)$ : $-2 + 2 + 2 = 2$.` },
          { q: r`Mesure de l'angle $\widehat{BAC}$ (en degrés, arrondie à l'unité) ?`, type: 'num', rep: Math.acos(2 / (3 * Math.sqrt(6))) * 180 / Math.PI, tol: 0.6, corr: r`$\cos\widehat{BAC} = \dfrac{2}{3\sqrt6} \approx 0{,}272$, donc $\widehat{BAC} \approx 74°$.` }
        ] }
      ]
    },
    {
      id: 'bac-2', niveau: 'tle', type: 'Bac', titre: 'Sujet type bac n°2', duree: 240,
      exercices: [
        { titre: 'Logarithme', points: 5, enonce: r`<p>Soit $f$ définie sur $]0\,;+\infty[$ par $f(x) = x - \ln x$.</p>`, questions: [
          { q: r`Calcule $f'(2)$.`, type: 'num', rep: 0.5, corr: r`$f'(x) = 1 - \dfrac1x$, donc $f'(2) = \dfrac12$.` },
          { q: r`Quel est le minimum de $f$ ?`, type: 'num', rep: 1, corr: r`$f'$ s'annule en $1$ en changeant de signe : minimum $f(1) = 1 - 0 = 1$.` },
          { q: r`Calcule $\displaystyle\lim_{x \to +\infty} \frac{f(x)}{x}$.`, type: 'num', rep: 1, corr: r`$\dfrac{f(x)}{x} = 1 - \dfrac{\ln x}{x} \to 1$ (croissances comparées).` }
        ] },
        { titre: 'Équation différentielle', points: 5, enonce: r`<p>La température $y(t)$ (en °C) d'un liquide vérifie $y' = -0{,}5\,y + 10$ et $y(0) = 5$.</p>`, questions: [
          { q: r`Quelle est la solution constante de l'équation ?`, type: 'num', rep: 20, corr: r`$0 = -0{,}5\,c + 10 \iff c = 20$.` },
          { q: r`On admet $y(t) = 20 - 15e^{-0{,}5t}$. Calcule $y(2)$ (arrondi au centième).`, type: 'num', rep: 20 - 15 * Math.exp(-1), tol: 0.006, corr: r`$20 - 15e^{-1} \approx 14{,}48$ °C.` },
          { q: r`À partir de quel instant (arrondi au centième) la température dépasse-t-elle $19$ °C ?`, type: 'num', rep: 2 * Math.log(15), tol: 0.006, corr: r`$15e^{-0{,}5t} \lt 1 \iff t \gt 2\ln 15 \approx 5{,}42$.` }
        ] },
        { titre: 'Dénombrement et probabilités', points: 5, enonce: r`<p>Une classe compte $7$ filles et $5$ garçons. On forme au hasard un comité de $3$ élèves.</p>`, questions: [
          { q: r`Combien de comités différents peut-on former ?`, type: 'num', rep: 220, corr: r`$\dbinom{12}{3} = 220$.` },
          { q: r`Probabilité que le comité compte exactement $2$ filles (arrondie au millième) ?`, type: 'num', rep: 105 / 220, tol: 0.0006, corr: r`$\dfrac{\binom72 \binom51}{220} = \dfrac{105}{220} \approx 0{,}477$.` },
          { q: r`Combien de codes à $4$ chiffres tous différents existe-t-il ?`, type: 'num', rep: 5040, corr: r`$10 \times 9 \times 8 \times 7 = 5\,040$.` }
        ] },
        { titre: 'Calcul intégral', points: 5, enonce: r`<p>On s'intéresse aux fonctions $x \mapsto 3x^2 - 2x + 1$, $x \mapsto x^2$ et $x \mapsto x$.</p>`, questions: [
          { q: r`Calcule $\displaystyle\int_0^2 (3x^2 - 2x + 1)\,\mathrm dx$.`, type: 'num', rep: 6, corr: r`$\big[x^3 - x^2 + x\big]_0^2 = 8 - 4 + 2 = 6$.` },
          { q: r`Quelle est la valeur moyenne de $3x^2 - 2x + 1$ sur $[0\,;2]$ ?`, type: 'num', rep: 3, corr: r`$\dfrac{6}{2 - 0} = 3$.` },
          { q: r`Calcule l'aire du domaine compris entre les courbes de $x \mapsto x$ et $x \mapsto x^2$ sur $[0\,;1]$ (fraction ou décimal).`, type: 'num', rep: 1 / 6, tol: 0.001, corr: r`Sur $[0\,;1]$, $x \geq x^2$ : $\displaystyle\int_0^1 (x - x^2)\,\mathrm dx = \dfrac12 - \dfrac13 = \dfrac16$.` }
        ] }
      ]
    },
    {
      id: 'concours-1', niveau: 'mpsi', type: 'Concours', titre: 'Sujet type concours MPSI', duree: 240,
      exercices: [
        { titre: 'Nombres complexes', points: 5, enonce: r`<p>On pose $z = 1 + i\sqrt3$.</p>`, questions: [
          { q: r`Calcule $|z|$.`, type: 'num', rep: 2, corr: r`$\sqrt{1 + 3} = 2$.` },
          { q: r`Donne un argument de $z$ dans $]-\pi\,;\pi]$ (expression avec π, ou décimal).`, type: 'num', rep: Math.PI / 3, tol: 0.002, corr: r`$z = 2\left(\tfrac12 + i\tfrac{\sqrt3}2\right) = 2e^{i\pi/3}$.` },
          { q: r`Calcule $z^6$.`, type: 'num', rep: 64, corr: r`$z^6 = 2^6 e^{2i\pi} = 64$.` }
        ] },
        { titre: 'Sommes et développements limités', points: 5, enonce: r`<p>Pour $n \geq 1$, on pose $u_n = \displaystyle\sum_{k=1}^{n} \frac{1}{k(k+1)}$.</p>`, questions: [
          { q: r`Calcule $u_9$ (fraction ou décimal).`, type: 'num', rep: 0.9, corr: r`Télescopage : $u_n = 1 - \dfrac{1}{n+1}$, donc $u_9 = \dfrac{9}{10}$.` },
          { q: r`Quelle est la limite de $(u_n)$ ?`, type: 'num', rep: 1, corr: r`$\dfrac{1}{n+1} \to 0$, donc $u_n \to 1$.` },
          { q: r`Calcule $\displaystyle\lim_{x \to 0} \frac{e^x - 1 - x - \frac{x^2}{2}}{x^3}$ (fraction ou décimal).`, type: 'num', rep: 1 / 6, tol: 0.001, corr: r`$e^x = 1 + x + \dfrac{x^2}2 + \dfrac{x^3}6 + o(x^3)$, d'où $\dfrac16$.` }
        ] },
        { titre: 'Algèbre linéaire', points: 5, enonce: r`<p>Soit $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$.</p>`, questions: [
          { q: r`Calcule $\det A$.`, type: 'num', rep: 3, corr: r`$2 \times 2 - 1 \times 1 = 3$.` },
          { q: r`Quelles sont les valeurs propres de $A$ ?`, type: 'liste', rep: [1, 3], corr: r`$\chi_A(\lambda) = (2 - \lambda)^2 - 1 = (\lambda - 1)(\lambda - 3)$.` },
          { q: r`Calcule la trace de $A^4$.`, type: 'num', rep: 82, corr: r`$A$ est diagonalisable de valeurs propres $1$ et $3$ : $\operatorname{tr}(A^4) = 1^4 + 3^4 = 82$.` }
        ] },
        { titre: 'Intégration', points: 5, enonce: r`<p>On étudie quelques intégrales classiques.</p>`, questions: [
          { q: r`Calcule $\displaystyle\int_0^{\pi/2} \sin^2 x\,\mathrm dx$ (expression avec π, ou décimal).`, type: 'num', rep: Math.PI / 4, tol: 0.001, corr: r`$\sin^2 x = \dfrac{1 - \cos 2x}{2}$, d'où $\dfrac{\pi}{4}$.` },
          { q: r`Calcule $\displaystyle\int_0^1 x^2 e^x\,\mathrm dx$ (valeur exacte comme e-2, ou arrondi au millième).`, type: 'num', rep: Math.E - 2, tol: 0.0006, corr: r`Deux intégrations par parties : $\big[(x^2 - 2x + 2)e^x\big]_0^1 = e - 2 \approx 0{,}718$.` },
          { q: r`Calcule $\displaystyle\lim_{n \to \infty} \sum_{k=1}^{n} \frac{n}{n^2 + k^2}$ (expression avec π, ou décimal).`, type: 'num', rep: Math.PI / 4, tol: 0.001, corr: r`Somme de Riemann de $\dfrac{1}{1 + x^2}$ sur $[0, 1]$ : $\arctan 1 = \dfrac\pi4$.` }
        ] }
      ]
    }
  ];
})();
