/* Problèmes longs de 1re (spécialité) : un par leçon, à questions enchaînées. Étoiles : ★★ difficile, ★★★ très difficile. */
(function () {
  var r = String.raw;
  addProblemes('1re', {
    '1re-second-degre': { titre: 'Le trinôme sous toutes ses formes', etoiles: 2,
      enonce: r`<p>On considère $f(x) = 2x^2 - 8x + 6$.</p>`,
      questions: [
        { q: r`Calcule le discriminant $\Delta$.`, type: 'num', rep: 16, corr: r`$\Delta = (-8)^2 - 4 \times 2 \times 6 = 64 - 48 = 16$.` },
        { q: r`Donne les racines (séparées par ;).`, type: 'liste', rep: [1, 3], corr: r`$x = \dfrac{8 \pm 4}{4}$ : $1$ et $3$.` },
        { q: r`La forme canonique est $2(x - \alpha)^2 + \beta$. Donne $\beta$.`, type: 'num', rep: -2, corr: r`$\alpha = \dfrac{8}{4} = 2$ et $\beta = f(2) = 8 - 16 + 6 = -2$ : $f(x) = 2(x - 2)^2 - 2$.` },
        { q: r`Pour quelle valeur $m \gt 0$ l'équation $x^2 + mx + 9 = 0$ a-t-elle une racine double ?`, type: 'num', rep: 6, corr: r`$\Delta = m^2 - 36 = 0 \iff m = \pm 6$, et $m \gt 0$ donne $6$.` }
      ] },
    '1re-signe-trinome': { titre: 'Le bénéfice de l\'entreprise', etoiles: 3,
      enonce: r`<p>Une entreprise fabrique $x$ centaines d'objets. Son bénéfice, en centaines d'euros, est $B(x) = -x^2 + 60x - 500$.</p>`,
      questions: [
        { q: r`Combien d'entiers vérifient $-x^2 + 5x - 4 \geqslant 0$ ?`, type: 'num', rep: 4, corr: r`Racines $1$ et $4$, coefficient de $x^2$ négatif : le trinôme est positif entre les racines, sur $[1\,;\,4]$. Entiers : $1, 2, 3, 4$.` },
        { q: r`Le trinôme $x^2 - 2x + 5$ est strictement positif…`, type: 'qcm', choix: [r`pour tout réel $x$`, r`seulement pour $x \gt 1$`, r`jamais`, r`seulement entre ses racines`], rep: 0, corr: r`$\Delta = 4 - 20 = -16 \lt 0$ : il garde le signe de $a = 1$, toujours positif.` },
        { q: r`L'entreprise est rentable ($B(x) \geqslant 0$) sur $[a\,;\,b]$. Donne $a$.`, type: 'num', rep: 10, corr: r`$\Delta = 3\,600 - 2\,000 = 1\,600$, racines $\dfrac{-60 \pm 40}{-2}$ : $10$ et $50$. Rentable pour $x \in [10\,;\,50]$.` },
        { q: r`Quel est le bénéfice maximal (en centaines d'euros) ?`, type: 'num', rep: 400, corr: r`Au sommet $x = 30$ : $B(30) = -900 + 1\,800 - 500 = 400$, soit $40\,000$ €.` }
      ] },
    '1re-suites': { titre: 'Une suite qui triple', etoiles: 3,
      enonce: r`<p>On définit $u_0 = 2$ et, pour tout $n$, $u_{n+1} = 3u_n - 1$.</p>`,
      questions: [
        { q: r`Calcule $u_1$.`, type: 'num', rep: 5, corr: r`$3 \times 2 - 1 = 5$.` },
        { q: r`Calcule $u_3$.`, type: 'num', rep: 41, corr: r`$u_2 = 14$, $u_3 = 3 \times 14 - 1 = 41$.` },
        { q: r`On pose $v_n = u_n - \dfrac12$. La suite $(v_n)$ est géométrique ; quelle est sa raison ?`, type: 'num', rep: 3, corr: r`$v_{n+1} = 3u_n - 1 - \dfrac12 = 3\left(u_n - \dfrac12\right) = 3v_n$.` },
        { q: r`En déduire $u_5$.`, type: 'num', rep: 365, corr: r`$v_0 = \dfrac32$, donc $v_n = \dfrac32 \times 3^n$ et $u_n = \dfrac32 \times 3^n + \dfrac12$. $u_5 = 1{,}5 \times 243 + 0{,}5 = 365$.` }
      ] },
    '1re-arith-geo': { titre: 'Deux propositions de salaire', etoiles: 2,
      enonce: r`<p>On propose à Inès un salaire de $1\,500$ € par mois la première année, avec soit (A) une hausse de $40$ € par an, soit (B) une hausse de $2\,\%$ par an. On note $u_n$ et $v_n$ le salaire mensuel après $n$ années.</p>`,
      questions: [
        { q: r`Calcule $u_{10}$ (en €).`, type: 'num', rep: 1900, corr: r`Arithmétique : $u_{10} = 1\,500 + 10 \times 40 = 1\,900$ €.` },
        { q: r`Calcule $v_{10}$ (en €, au centime).`, type: 'num', rep: 1828.49, tol: 0.006, corr: r`Géométrique : $v_{10} = 1\,500 \times 1{,}02^{10} \approx 1\,828{,}49$ €. À court terme, A est meilleur.` },
        { q: r`Calcule $1 + 2 + 3 + \dots + 100$.`, type: 'num', rep: 5050, corr: r`$\dfrac{100 \times 101}{2} = 5\,050$ (la somme de Gauss).` },
        { q: r`Calcule $1 + 2 + 4 + \dots + 2^9$.`, type: 'num', rep: 1023, corr: r`Somme géométrique : $\dfrac{2^{10} - 1}{2 - 1} = 1\,023$.` }
      ] },
    '1re-nombre-derive': { titre: 'La tangente à la parabole', etoiles: 3,
      enonce: r`<p>On étudie $f(x) = x^2$ et sa courbe $\mathcal{P}$.</p>`,
      questions: [
        { q: r`Calcule le taux d'accroissement de $f$ entre $3$ et $3{,}1$.`, type: 'num', rep: 6.1, corr: r`$\dfrac{3{,}1^2 - 9}{0{,}1} = \dfrac{0{,}61}{0{,}1} = 6{,}1$. En général $\dfrac{(3 + h)^2 - 9}{h} = 6 + h$.` },
        { q: r`Quelle est la valeur de $f'(3)$ ?`, type: 'num', rep: 6, corr: r`$6 + h \to 6$ quand $h \to 0$.` },
        { q: r`La tangente en $3$ a pour équation $y = 6x + p$. Donne $p$.`, type: 'num', rep: -9, corr: r`$y = f'(3)(x - 3) + f(3) = 6x - 18 + 9 = 6x - 9$.` },
        { q: r`En quel point (abscisse) la tangente est-elle parallèle à la droite $y = -4x + 1$ ?`, type: 'num', rep: -2, corr: r`Il faut $f'(a) = 2a = -4$, donc $a = -2$.` }
      ] },
    '1re-derivees': { titre: 'Dériver sans se tromper', etoiles: 2,
      enonce: r`<p>Calcule les nombres dérivés demandés avec les formules du cours.</p>`,
      questions: [
        { q: r`$f(x) = x^3 - 3x^2 + 2$. Calcule $f'(2)$.`, type: 'num', rep: 0, corr: r`$f'(x) = 3x^2 - 6x$, $f'(2) = 12 - 12 = 0$ : tangente horizontale.` },
        { q: r`$g(x) = \dfrac{2x + 1}{x - 1}$. Calcule $g'(2)$.`, type: 'num', rep: -3, corr: r`$g'(x) = \dfrac{2(x - 1) - (2x + 1)}{(x - 1)^2} = \dfrac{-3}{(x - 1)^2}$, donc $g'(2) = -3$.` },
        { q: r`$h(x) = x\sqrt{x}$. Calcule $h'(4)$.`, type: 'num', rep: 3, corr: r`$h'(x) = \sqrt x + x \times \dfrac{1}{2\sqrt x} = \dfrac32\sqrt x$, $h'(4) = 3$.` },
        { q: r`$k(x) = (3x - 2)^2$. Calcule $k'(1)$.`, type: 'num', rep: 6, corr: r`$k'(x) = 3 \times 2(3x - 2)$, $k'(1) = 6 \times 1 = 6$.` }
      ] },
    '1re-variations': { titre: 'La boîte sans couvercle', etoiles: 3,
      enonce: r`<p>Dans un carton carré de $30$ cm de côté, on découpe aux quatre coins un carré de côté $x$ cm, puis on replie les bords. Le volume de la boîte est $V(x) = x(30 - 2x)^2$ pour $x \in [0\,;\,15]$.</p>`,
      questions: [
        { q: r`Calcule $V(3)$ (en cm³).`, type: 'num', rep: 1728, corr: r`$3 \times 24^2 = 3 \times 576 = 1\,728$ cm³.` },
        { q: r`$V'(x) = (30 - 2x)(30 - 6x)$. En quelle valeur de $]0\,;\,15[$ s'annule-t-elle ?`, type: 'num', rep: 5, corr: r`$30 - 6x = 0 \iff x = 5$ (l'autre racine $15$ est exclue). $V'$ est positive avant $5$ et négative après.` },
        { q: r`Quel est le volume maximal (en cm³) ?`, type: 'num', rep: 2000, corr: r`$V(5) = 5 \times 20^2 = 2\,000$ cm³, soit $2$ L.` },
        { q: r`Calcule $V(2)$ (en cm³).`, type: 'num', rep: 1352, corr: r`$2 \times 26^2 = 2 \times 676 = 1\,352$ cm³.` }
      ] },
    '1re-exponentielle': { titre: 'Exponentielle : équations et minimum', etoiles: 2,
      enonce: r`<p>On utilise $e^a = e^b \iff a = b$ et $(e^u)' = u'e^u$.</p>`,
      questions: [
        { q: r`Résous $e^{2x} = e^{6}$.`, type: 'num', rep: 3, corr: r`$2x = 6$, $x = 3$.` },
        { q: r`Résous $e^{x} \times e^{x + 1} = e^{9}$.`, type: 'num', rep: 4, corr: r`$e^{2x + 1} = e^9 \iff 2x + 1 = 9 \iff x = 4$.` },
        { q: r`$f(x) = xe^x$. Calcule $f'(0)$.`, type: 'num', rep: 1, corr: r`$f'(x) = e^x + xe^x = (1 + x)e^x$, $f'(0) = 1$.` },
        { q: r`Quel est le minimum de $f$ sur $\mathbb{R}$ (valeur exacte ou au millième) ?`, type: 'num', rep: -1 / Math.E, tol: 0.0006, corr: r`$f'$ s'annule en $-1$ en changeant de signe : minimum $f(-1) = -e^{-1} \approx -0{,}368$.` }
      ] },
    '1re-trigonometrie': { titre: 'Le tour du cercle trigonométrique', etoiles: 2,
      enonce: r`<p>Les réponses sont des valeurs exactes (tu peux écrire π/3, √2/2…).</p>`,
      questions: [
        { q: r`Calcule $\cos\dfrac{\pi}{3}$.`, type: 'num', rep: 0.5, corr: r`$\dfrac12$.` },
        { q: r`Quel réel de $[0\,;\,2\pi[$ a un cosinus nul et un sinus égal à $-1$ ?`, type: 'num', rep: 3 * Math.PI / 2, tol: 0.001, corr: r`Le point le plus bas du cercle : $\dfrac{3\pi}{2}$.` },
        { q: r`Calcule $\sin\dfrac{5\pi}{6}$.`, type: 'num', rep: 0.5, corr: r`$\sin(\pi - x) = \sin x$, donc $\sin\dfrac{5\pi}{6} = \sin\dfrac{\pi}{6} = \dfrac12$.` },
        { q: r`Résous $\cos x = \dfrac{\sqrt2}{2}$ dans $]-\pi\,;\,\pi]$ (séparées par ;).`, type: 'liste', rep: [Math.PI / 4, -Math.PI / 4], tol: 0.001, corr: r`$x = \dfrac{\pi}{4}$ ou $x = -\dfrac{\pi}{4}$.` }
      ] },
    '1re-produit-scalaire': { titre: 'Al-Kashi en action', etoiles: 3,
      enonce: r`<p>Dans un triangle $ABC$ : $AB = 5$, $AC = 8$ et $\widehat{BAC} = 60°$.</p>`,
      questions: [
        { q: r`Calcule $\overrightarrow{AB} \cdot \overrightarrow{AC}$.`, type: 'num', rep: 20, corr: r`$5 \times 8 \times \cos 60° = 40 \times \dfrac12 = 20$.` },
        { q: r`Calcule $BC$.`, type: 'num', rep: 7, corr: r`Al-Kashi : $BC^2 = 25 + 64 - 2 \times 20 = 49$, donc $BC = 7$.` },
        { q: r`Les vecteurs $\vec u(2\,;\,3)$ et $\vec v(-6\,;\,4)$ sont-ils orthogonaux ?`, type: 'qcm', choix: [r`Oui`, r`Non`], rep: 0, corr: r`$\vec u \cdot \vec v = -12 + 12 = 0$.` },
        { q: r`Pour quelle valeur de $m$ les vecteurs $(m\,;\,2)$ et $(3\,;\,-6)$ sont-ils orthogonaux ?`, type: 'num', rep: 4, corr: r`$3m - 12 = 0 \iff m = 4$.` }
      ] },
    '1re-proba-conditionnelles': { titre: 'Le test de dépistage', etoiles: 3,
      enonce: r`<p>Une maladie touche $2\,\%$ de la population. Le test est positif pour $95\,\%$ des malades, et (à tort) pour $3\,\%$ des personnes saines. On note $M$ « être malade » et $T$ « test positif ».</p>`,
      questions: [
        { q: r`Calcule $P(M \cap T)$.`, type: 'num', rep: 0.019, corr: r`$0{,}02 \times 0{,}95 = 0{,}019$.` },
        { q: r`Calcule $P(T)$.`, type: 'num', rep: 0.0484, corr: r`Probabilités totales : $0{,}019 + 0{,}98 \times 0{,}03 = 0{,}019 + 0{,}0294 = 0{,}0484$.` },
        { q: r`Une personne a un test positif. Quelle est la probabilité qu'elle soit malade (au centième) ?`, type: 'num', rep: 0.39, tol: 0.006, corr: r`$P_T(M) = \dfrac{0{,}019}{0{,}0484} \approx 0{,}39$. Surprenant : la plupart des positifs sont sains, car la maladie est rare.` },
        { q: r`Calcule $P_{\overline{M}}(\overline{T})$.`, type: 'num', rep: 0.97, corr: r`$1 - 0{,}03 = 0{,}97$.` }
      ] },
    '1re-variables-aleatoires': { titre: 'Le jeu de dé', etoiles: 2,
      enonce: r`<p>On lance un dé : un $6$ fait gagner $10$ €, un $4$ ou un $5$ fait gagner $2$ €, sinon on perd $3$ €. $X$ est le gain.</p>`,
      questions: [
        { q: r`Calcule $E(X)$ (fraction ou au millième).`, type: 'num', rep: 5 / 6, tol: 0.001, corr: r`$E(X) = \dfrac{10}{6} + 2 \times \dfrac26 - 3 \times \dfrac36 = \dfrac{10 + 4 - 9}{6} = \dfrac56$.` },
        { q: r`Calcule $P(X \gt 0)$.`, type: 'num', rep: 0.5, corr: r`$4$, $5$ ou $6$ : $\dfrac36 = \dfrac12$.` },
        { q: r`Calcule $V(X)$ (au centième).`, type: 'num', rep: 22.5 - 25 / 36, tol: 0.006, corr: r`$E(X^2) = \dfrac{100 + 2 \times 4 + 3 \times 9}{6} = \dfrac{135}{6} = 22{,}5$, puis $V = 22{,}5 - \left(\dfrac56\right)^2 \approx 21{,}81$.` },
        { q: r`Combien faudrait-il faire payer pour jouer pour que le jeu soit équitable (en €, fraction ou au millième) ?`, type: 'num', rep: 5 / 6, tol: 0.001, corr: r`Il faut retirer $E(X)$ : une mise de $\dfrac56 \approx 0{,}83$ €.` }
      ] },
    '1re-cercles': { titre: 'Cercle et tangente', etoiles: 3,
      enonce: r`<p>On considère le cercle $\mathcal{C}$ d'équation $x^2 + y^2 - 4x + 6y - 12 = 0$.</p>`,
      questions: [
        { q: r`Quel est le rayon de $\mathcal{C}$ ?`, type: 'num', rep: 5, corr: r`$(x - 2)^2 - 4 + (y + 3)^2 - 9 - 12 = 0 \iff (x - 2)^2 + (y + 3)^2 = 25$.` },
        { q: r`Quelle est l'ordonnée du centre $\Omega$ ?`, type: 'num', rep: -3, corr: r`$\Omega(2\,;\,-3)$.` },
        { q: r`Le point $A(5\,;\,1)$ est-il sur $\mathcal{C}$ ?`, type: 'qcm', choix: [r`Oui`, r`Non`], rep: 0, corr: r`$(5 - 2)^2 + (1 + 3)^2 = 9 + 16 = 25$ : oui.` },
        { q: r`La tangente en $A$ coupe l'axe des ordonnées en quel point (ordonnée) ?`, type: 'num', rep: 4.75, corr: r`Elle est perpendiculaire à $\overrightarrow{\Omega A}(3\,;\,4)$ : $3(x - 5) + 4(y - 1) = 0$, soit $3x + 4y - 19 = 0$. En $x = 0$ : $y = \dfrac{19}{4} = 4{,}75$.` }
      ] },
    '1re-seuils': { titre: 'Quatre seuils à trouver', etoiles: 2,
      enonce: r`<p>Pour chaque question, cherche le plus petit entier $n$ qui convient (calculatrice ou tableau de valeurs autorisés).</p>`,
      questions: [
        { q: r`$u_n = 200 \times 0{,}9^n$. Plus petit $n$ tel que $u_n \lt 50$ ?`, type: 'num', rep: 14, corr: r`Il faut $0{,}9^n \lt 0{,}25$ : $0{,}9^{13} \approx 0{,}254$ et $0{,}9^{14} \approx 0{,}229$. Donc $n = 14$.` },
        { q: r`$u_0 = 1$ et $u_{n+1} = u_n + 2n + 1$. Plus petit $n$ tel que $u_n \gt 1\,000$ ?`, type: 'num', rep: 32, corr: r`$u_1 = 2$, $u_2 = 5$, $u_3 = 10$ : $u_n = n^2 + 1$. $31^2 + 1 = 962$ et $32^2 + 1 = 1\,025$. Donc $n = 32$.` },
        { q: r`Plus petit $n$ tel que $1 + 2 + \dots + n \gt 500$ ?`, type: 'num', rep: 32, corr: r`$\dfrac{n(n + 1)}{2} \gt 500$ : $\dfrac{31 \times 32}{2} = 496$ et $\dfrac{32 \times 33}{2} = 528$. Donc $32$.` },
        { q: r`Un capital placé à $4\,\%$ par an : au bout de combien d'années a-t-il doublé ?`, type: 'num', rep: 18, corr: r`$1{,}04^{17} \approx 1{,}948$ et $1{,}04^{18} \approx 2{,}026$ : $18$ ans.` }
      ] }
  });
})();
