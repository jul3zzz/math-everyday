/* Leçons de Terminale (spécialité mathématiques). */
(function () {
  var r = String.raw;
  addLecons('tle', [
    {
      id: 'tle-recurrence', titre: 'Le raisonnement par récurrence', domaine: 'Suites',
      resume: 'Démontrer une propriété pour tous les entiers : initialisation et hérédité.',
      yt: 'yvan monka raisonnement par récurrence terminale',
      cours: r`
<div class="prop"><b>Principe de récurrence</b><p>Soit $\mathcal P(n)$ une propriété dépendant d'un entier $n$. Si :</p><ul><li><b>Initialisation</b> : $\mathcal P(n_0)$ est vraie ;</li><li><b>Hérédité</b> : pour tout $n \geq n_0$, si $\mathcal P(n)$ est vraie, alors $\mathcal P(n + 1)$ est vraie ;</li></ul><p>alors $\mathcal P(n)$ est vraie pour tout $n \geq n_0$. C'est l'effet domino.</p></div>
<div class="ex-box"><b>Exemple</b><p>$u_0 = 0$ et $u_{n+1} = 2u_n + 1$. Montrons que $u_n = 2^n - 1$ pour tout $n$.</p><p><b>Initialisation</b> : $2^0 - 1 = 0 = u_0$. ✓</p><p><b>Hérédité</b> : supposons $u_n = 2^n - 1$ pour un certain $n$. Alors $u_{n+1} = 2(2^n - 1) + 1 = 2^{n+1} - 1$. ✓</p><p><b>Conclusion</b> : pour tout $n \in \mathbb N$, $u_n = 2^n - 1$.</p></div>
<div class="ex-box"><b>Divisibilité</b><p>Montrons que $3^n - 1$ est pair. Init. : $3^0 - 1 = 0$ est pair. Hérédité : $3^{n+1} - 1 = 3(3^n - 1) + 2$ ; si $3^n - 1$ est pair, $3(3^n - 1)$ aussi, donc la somme avec $2$ est paire.</p></div>
<div class="attention"><b>Piège</b><p>Dans l'hérédité, on ne suppose pas « pour tout $n$ » (c'est ce qu'on veut prouver), mais <b>pour un $n$ fixé</b>.</p></div>`,
      retenir: [r`Initialisation + hérédité $\Rightarrow$ vrai pour tout $n \geq n_0$.`, r`Dans l'hérédité, on utilise l'hypothèse $\mathcal P(n)$ pour un $n$ fixé.`],
      exos: [
        { q: r`$u_0 = 0$ et $u_{n+1} = 2u_n + 1$. On a démontré que $u_n = 2^n - 1$. Calcule $u_5$.`, type: 'num', rep: 31, corr: r`$u_5 = 2^5 - 1 = 31$ (vérifiable : $0, 1, 3, 7, 15, 31$).` },
        { q: r`Dans une récurrence, l'étape d'hérédité consiste à montrer :`, type: 'qcm', choix: [r`que si $\mathcal P(n)$ est vraie pour un certain $n$, alors $\mathcal P(n+1)$ l'est aussi`, r`que $\mathcal P(n)$ est vraie pour tout $n$`, r`que $\mathcal P(0)$ est vraie`, r`que $\mathcal P(n+1)$ implique $\mathcal P(n)$`], rep: 0, corr: r`L'hérédité est l'implication $\mathcal P(n) \Rightarrow \mathcal P(n+1)$ pour un $n$ quelconque fixé.` },
        { q: r`On démontre par récurrence que $\displaystyle\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$. Calcule $1^2 + 2^2 + \cdots + 10^2$.`, type: 'num', rep: 385, corr: r`$\dfrac{10 \times 11 \times 21}{6} = 385$.` }
      ]
    },
    {
      id: 'tle-limites-suites', titre: 'Limites de suites', domaine: 'Suites',
      resume: 'Opérations sur les limites, formes indéterminées, comparaison et gendarmes.',
      yt: 'yvan monka limite de suite terminale',
      cours: r`
<div class="def"><b>Définitions</b><p>$(u_n)$ tend vers $\ell$ si tout intervalle ouvert contenant $\ell$ contient tous les termes à partir d'un certain rang. Elle tend vers $+\infty$ si tout intervalle $]A\,;+\infty[$ contient tous les termes à partir d'un certain rang.</p></div>
<div class="prop"><b>Formes indéterminées</b><p>« $\infty - \infty$ », « $0 \times \infty$ », « $\dfrac{\infty}{\infty}$ », « $\dfrac00$ ». Pour les lever : factoriser par le terme dominant, ou multiplier par la quantité conjuguée.</p></div>
<div class="ex-box"><b>Exemple</b><p>$\dfrac{3n^2 - n}{n^2 + 1} = \dfrac{n^2(3 - \frac1n)}{n^2(1 + \frac{1}{n^2})} \to 3$.</p><p>$\sqrt{n + 1} - \sqrt n = \dfrac{1}{\sqrt{n+1} + \sqrt n} \to 0$.</p></div>
<div class="prop"><b>Théorèmes</b><ul><li><b>Gendarmes</b> : si $v_n \leq u_n \leq w_n$ et $v_n, w_n \to \ell$, alors $u_n \to \ell$.</li><li><b>Comparaison</b> : si $u_n \geq v_n$ et $v_n \to +\infty$, alors $u_n \to +\infty$.</li><li><b>Suites géométriques</b> : si $|q| \lt 1$, $q^n \to 0$ ; si $q \gt 1$, $q^n \to +\infty$.</li><li><b>Convergence monotone</b> : une suite croissante et majorée converge.</li></ul></div>
<div class="ex-box"><b>Gendarmes</b><p>$-\dfrac1n \leq \dfrac{(-1)^n}{n} \leq \dfrac1n$, donc $\dfrac{(-1)^n}{n} \to 0$.</p></div>`,
      retenir: [r`Lever une FI : factoriser par le terme dominant ou conjuguer.`, r`Gendarmes pour les suites oscillantes encadrées.`, r`Croissante et majorée $\Rightarrow$ convergente.`],
      exos: [
        { q: r`Calcule $\displaystyle\lim_{n \to +\infty} \frac{3n^2 - n}{n^2 + 1}$.`, type: 'num', rep: 3, corr: r`On factorise par $n^2$ : $\dfrac{3 - 1/n}{1 + 1/n^2} \to 3$.` },
        { q: r`Calcule $\displaystyle\lim_{n \to +\infty} \left(\sqrt{n + 1} - \sqrt{n}\right)$.`, type: 'num', rep: 0, indice: r`Multiplie et divise par la quantité conjuguée.`, corr: r`$\sqrt{n+1} - \sqrt n = \dfrac{(n + 1) - n}{\sqrt{n+1} + \sqrt n} = \dfrac{1}{\sqrt{n+1} + \sqrt n} \to 0$.` },
        { q: r`La suite $u_n = \dfrac{(-1)^n}{n}$ :`, type: 'qcm', choix: [r`converge vers $0$`, r`n'a pas de limite`, r`diverge vers $+\infty$`, r`converge vers $1$`], rep: 0, corr: r`Gendarmes : $-\dfrac1n \leq u_n \leq \dfrac1n$ et les deux bornes tendent vers $0$.` }
      ]
    },
    {
      id: 'tle-limites-fonctions', titre: 'Limites de fonctions et asymptotes', domaine: 'Fonctions',
      resume: 'Limites aux bornes, asymptotes et croissances comparées.',
      yt: 'yvan monka limites de fonctions asymptote terminale',
      cours: r`
<div class="def"><b>Asymptotes</b><ul><li>Si $\displaystyle\lim_{x \to +\infty} f(x) = \ell$, la droite $y = \ell$ est asymptote <b>horizontale</b> en $+\infty$.</li><li>Si $\displaystyle\lim_{x \to a} f(x) = \pm\infty$, la droite $x = a$ est asymptote <b>verticale</b>.</li></ul></div>
<div class="ex-box"><b>Exemples</b><p>$\displaystyle\lim_{x \to +\infty}\frac{3x - 1}{x + 2} = 3$ : asymptote horizontale $y = 3$.</p><p>$\displaystyle\lim_{x \to 2^+}\frac{1}{x - 2} = +\infty$ : asymptote verticale $x = 2$.</p></div>
<div class="prop"><b>Croissances comparées</b><p>L'exponentielle l'emporte sur les puissances, qui l'emportent sur le logarithme :</p>$$\lim_{x \to +\infty}\frac{e^x}{x^n} = +\infty \qquad \lim_{x \to +\infty} x^n e^{-x} = 0 \qquad \lim_{x \to +\infty}\frac{\ln x}{x} = 0 \qquad \lim_{x \to 0^+} x\ln x = 0$$</div>
<div class="prop"><b>Composition</b><p>Si $\displaystyle\lim_{x \to a} u(x) = b$ et $\displaystyle\lim_{X \to b} g(X) = c$, alors $\displaystyle\lim_{x \to a} g(u(x)) = c$. Ex. : $e^{-x^2} \to 0$ en $+\infty$ car $-x^2 \to -\infty$.</p></div>`,
      retenir: [r`Limite finie en $\pm\infty$ : asymptote horizontale.`, r`Limite infinie en $a$ : asymptote verticale $x = a$.`, r`$e^x$ l'emporte sur $x^n$ qui l'emporte sur $\ln x$.`],
      exos: [
        { q: r`Calcule $\displaystyle\lim_{x \to +\infty} x e^{-x}$.`, type: 'num', rep: 0, corr: r`Croissances comparées : $xe^{-x} = \dfrac{x}{e^x} \to 0$.` },
        { q: r`$\displaystyle\lim_{x \to 2,\,x \gt 2} \frac{1}{x - 2}$ vaut :`, type: 'qcm', choix: [r`$+\infty$`, r`$-\infty$`, r`$0$`, r`$\dfrac12$`], rep: 0, corr: r`Pour $x \gt 2$, $x - 2 \to 0^+$, donc $\dfrac{1}{x-2} \to +\infty$.` },
        { q: r`La courbe de $f(x) = \dfrac{3x - 1}{x + 2}$ admet une asymptote horizontale d'équation $y = c$. Combien vaut $c$ ?`, type: 'num', rep: 3, corr: r`$\dfrac{3x - 1}{x + 2} = \dfrac{3 - 1/x}{1 + 2/x} \to 3$ en $\pm\infty$.` }
      ]
    },
    {
      id: 'tle-continuite', titre: 'Continuité et théorème des valeurs intermédiaires', domaine: 'Fonctions',
      resume: 'Prouver qu\'une équation a une solution et l\'approcher.',
      yt: 'yvan monka théorème des valeurs intermédiaires terminale',
      cours: r`
<div class="def"><b>Continuité</b><p>$f$ est continue en $a$ si $\displaystyle\lim_{x \to a} f(x) = f(a)$. Intuitivement : on trace la courbe sans lever le crayon. Les fonctions usuelles (polynômes, exp, ln, racine, quotients…) sont continues sur leur ensemble de définition. Toute fonction dérivable est continue.</p></div>
<div class="prop"><b>Théorème des valeurs intermédiaires</b><p>Si $f$ est <b>continue</b> sur $[a\,;b]$, alors pour tout $k$ compris entre $f(a)$ et $f(b)$, l'équation $f(x) = k$ admet <b>au moins</b> une solution dans $[a\,;b]$.</p></div>
<div class="prop"><b>Corollaire (bijection)</b><p>Si de plus $f$ est <b>strictement monotone</b> sur $[a\,;b]$, la solution est <b>unique</b>.</p></div>
<div class="ex-box"><b>Exemple</b><p>$f(x) = x^3 + x - 1$ est continue et strictement croissante ($f'(x) = 3x^2 + 1 \gt 0$). $f(0) = -1 \lt 0$ et $f(1) = 1 \gt 0$ : l'équation $f(x) = 0$ a une unique solution $\alpha \in [0\,;1]$.</p><p>Par balayage : $f(0{,}6) \approx -0{,}18$ et $f(0{,}7) \approx 0{,}04$, donc $0{,}6 \lt \alpha \lt 0{,}7$ et $\alpha \approx 0{,}68$.</p></div>
<div class="attention"><b>Piège</b><p>Sans continuité, le théorème ne s'applique pas : une fonction en escalier peut « sauter » par-dessus la valeur $k$.</p></div>`,
      retenir: [r`Continue + valeurs de part et d'autre de $k$ $\Rightarrow$ au moins une solution.`, r`+ strictement monotone $\Rightarrow$ une seule.`, r`Dichotomie ou balayage pour approcher la solution.`],
      exos: [
        { q: r`Combien de solutions l'équation $x^3 + x - 1 = 0$ admet-elle sur $\mathbb R$ ?`, type: 'num', rep: 1, corr: r`$f(x) = x^3 + x - 1$ est continue, strictement croissante ($f' \gt 0$), de limites $-\infty$ et $+\infty$ : exactement une solution.` },
        { q: r`Donne une valeur approchée au dixième de la solution $\alpha$ de $x^3 + x - 1 = 0$.`, type: 'num', rep: 0.6823, tol: 0.05, corr: r`$f(0{,}6) \lt 0 \lt f(0{,}7)$, et $f(0{,}68) \approx -0{,}005$, $f(0{,}69) \approx 0{,}02$ : $\alpha \approx 0{,}68$, soit $0{,}7$ au dixième.` },
        { q: r`Quelle hypothèse est indispensable pour appliquer le théorème des valeurs intermédiaires sur $[a\,;b]$ ?`, type: 'qcm', choix: [r`$f$ est continue sur $[a\,;b]$`, r`$f$ est croissante sur $[a\,;b]$`, r`$f(a) = f(b)$`, r`$f$ est positive`], rep: 0, corr: r`La continuité est l'hypothèse essentielle. La monotonie ne sert qu'à obtenir l'unicité.` }
      ]
    },
    {
      id: 'tle-convexite', titre: 'Convexité et dérivée seconde', domaine: 'Fonctions',
      resume: 'Fonction convexe ou concave, point d\'inflexion.',
      yt: 'yvan monka convexité point d\'inflexion terminale',
      cours: r`
<div class="def"><b>Définition</b><p>$f$ est <b>convexe</b> sur $I$ si sa courbe est située au-dessus de chacune de ses tangentes (et en dessous de ses cordes). Elle est <b>concave</b> si c'est l'inverse.</p></div>
<div class="prop"><b>Caractérisation</b><p>Pour $f$ deux fois dérivable : $f$ convexe $\iff f'$ croissante $\iff f'' \geq 0$ sur $I$. Et $f$ concave $\iff f'' \leq 0$.</p></div>
<div class="def"><b>Point d'inflexion</b><p>C'est un point où la courbe traverse sa tangente : la convexité change. Il correspond à un changement de signe de $f''$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$f(x) = x^3 - 3x^2 + 1$ : $f'(x) = 3x^2 - 6x$, $f''(x) = 6x - 6$. $f''$ change de signe en $x = 1$ : point d'inflexion $(1\,;f(1)) = (1\,;-1)$. $f$ est concave sur $]-\infty\,;1]$ et convexe sur $[1\,;+\infty[$.</p></div>
<div class="prop"><b>Inégalités de convexité</b><p>$e^x$ est convexe donc au-dessus de sa tangente en $0$ : $e^x \geq 1 + x$ pour tout $x$. $\ln$ est concave : $\ln x \leq x - 1$ pour tout $x \gt 0$.</p></div>`,
      retenir: [r`Convexe $\iff f'' \geq 0$ ; concave $\iff f'' \leq 0$.`, r`Inflexion : $f''$ change de signe.`, r`$e^x \geq 1 + x$ et $\ln x \leq x - 1$.`],
      exos: [
        { q: r`$f(x) = x^3 - 6x^2$. En quelle abscisse la courbe a-t-elle un point d'inflexion ?`, type: 'num', rep: 2, corr: r`$f''(x) = 6x - 12$ s'annule et change de signe en $x = 2$.` },
        { q: r`$f(x) = x^3 - 3x^2 + 1$. Quelle est l'ordonnée de son point d'inflexion ?`, type: 'num', rep: -1, corr: r`$f''(x) = 6x - 6$ change de signe en $1$, et $f(1) = 1 - 3 + 1 = -1$.` },
        { q: r`Une fonction $f$ est convexe sur $I$ si et seulement si :`, type: 'qcm', choix: [r`$f'$ est croissante sur $I$`, r`$f$ est croissante sur $I$`, r`$f'$ est positive sur $I$`, r`$f$ est positive sur $I$`], rep: 0, corr: r`Convexe $\iff f'$ croissante $\iff f'' \geq 0$.` }
      ]
    },
    {
      id: 'tle-logarithme', titre: 'La fonction logarithme népérien', domaine: 'Logarithme',
      resume: 'Réciproque de l\'exponentielle, propriétés algébriques, équations et inéquations.',
      yt: 'yvan monka fonction logarithme népérien terminale',
      cours: r`
<div class="def"><b>Définition</b><p>Pour $x \gt 0$, $\ln x$ est l'unique réel $y$ tel que $e^y = x$. Ainsi $e^{\ln x} = x$ pour $x \gt 0$ et $\ln(e^y) = y$ pour tout $y$. On a $\ln 1 = 0$ et $\ln e = 1$.</p></div>
<div class="prop"><b>Propriétés algébriques</b><p>Pour $a, b \gt 0$ et $n \in \mathbb Z$ : $\ln(ab) = \ln a + \ln b$, $\ln\dfrac ab = \ln a - \ln b$, $\ln(a^n) = n\ln a$, $\ln\sqrt a = \dfrac12\ln a$.</p></div>
<div class="prop"><b>Étude</b><p>$\ln$ est dérivable sur $]0\,;+\infty[$ avec $(\ln x)' = \dfrac1x \gt 0$ : strictement croissante. $\displaystyle\lim_{x \to 0^+}\ln x = -\infty$ et $\displaystyle\lim_{x \to +\infty}\ln x = +\infty$. Plus généralement $(\ln u)' = \dfrac{u'}{u}$.</p></div>
<div class="ex-box"><b>Exemples</b><p>$\ln 8 = \ln 2^3 = 3\ln 2$.</p><p>$\ln x = 2 \iff x = e^2 \approx 7{,}389$.</p><p>Plus petit entier $n$ tel que $2^n \gt 1\,000$ : $n\ln 2 \gt \ln 1\,000 \iff n \gt \dfrac{\ln 1\,000}{\ln 2} \approx 9{,}97$, donc $n = 10$.</p></div>`,
      retenir: [r`$\ln(ab) = \ln a + \ln b$, $\ln(a^n) = n\ln a$.`, r`$(\ln u)' = \frac{u'}{u}$.`, r`Pour isoler un exposant : appliquer $\ln$.`],
      exos: [
        { q: r`$\ln 8$ est égal à :`, type: 'qcm', choix: [r`$3\ln 2$`, r`$8\ln 1$`, r`$\ln 2 + \ln 4 + \ln 2$`, r`$(\ln 2)^3$`], rep: 0, corr: r`$\ln 8 = \ln(2^3) = 3\ln 2$. (Attention : $\ln 2 + \ln 4 + \ln 2 = \ln 16$.)` },
        { q: r`Résous $\ln x = 2$ (valeur exacte comme e^2, ou arrondi au millième).`, type: 'num', rep: Math.exp(2), tol: 0.0006, corr: r`$x = e^2 \approx 7{,}389$.` },
        { q: r`Quel est le plus petit entier $n$ tel que $2^n \gt 1\,000$ ?`, type: 'num', rep: 10, corr: r`$n \gt \dfrac{\ln 1\,000}{\ln 2} \approx 9{,}97$, donc $n = 10$ ($2^{10} = 1\,024$).` }
      ]
    },
    {
      id: 'tle-primitives', titre: 'Primitives et équations différentielles', domaine: 'Intégration',
      resume: 'Primitives usuelles et résolution de y\' = ay et y\' = ay + b.',
      yt: 'yvan monka primitives équations différentielles terminale',
      cours: r`
<div class="def"><b>Primitive</b><p>$F$ est une primitive de $f$ sur $I$ si $F' = f$. Deux primitives diffèrent d'une constante. Toute fonction continue admet des primitives.</p></div>
<table class="t"><tr><th>$f(x)$</th><td>$x^n$ ($n \neq -1$)</td><td>$\dfrac1x$</td><td>$e^{ax}$</td><td>$u'e^u$</td><td>$\dfrac{u'}{u}$</td></tr><tr><th>$F(x)$</th><td>$\dfrac{x^{n+1}}{n+1}$</td><td>$\ln x$</td><td>$\dfrac{e^{ax}}{a}$</td><td>$e^u$</td><td>$\ln |u|$</td></tr></table>
<div class="ex-box"><b>Exemple</b><p>Primitive de $f(x) = 3x^2 + 2x$ telle que $F(0) = 1$ : $F(x) = x^3 + x^2 + C$ et $F(0) = C = 1$, donc $F(x) = x^3 + x^2 + 1$.</p></div>
<div class="prop"><b>Équations différentielles</b><ul><li>Les solutions de $y' = ay$ sont $y(x) = Ce^{ax}$, $C \in \mathbb R$.</li><li>Les solutions de $y' = ay + b$ ($a \neq 0$) sont $y(x) = Ce^{ax} - \dfrac ba$. La fonction constante $-\dfrac ba$ est la solution d'équilibre.</li></ul></div>
<div class="ex-box"><b>Exemple</b><p>$y' = 2y$ avec $y(0) = 3$ : $y(x) = 3e^{2x}$, donc $y(1) = 3e^2 \approx 22{,}17$.</p><p>$y' = -y + 4$ : $y(x) = Ce^{-x} + 4$ ; toutes les solutions tendent vers $4$.</p></div>`,
      retenir: [r`$F' = f$ ; une primitive à une constante près.`, r`$y' = ay \iff y = Ce^{ax}$.`, r`$y' = ay + b \iff y = Ce^{ax} - \frac ba$.`],
      exos: [
        { q: r`$F$ est la primitive de $f(x) = 3x^2 + 2x$ telle que $F(0) = 1$. Calcule $F(1)$.`, type: 'num', rep: 3, corr: r`$F(x) = x^3 + x^2 + 1$, donc $F(1) = 3$.` },
        { q: r`$y$ vérifie $y' = 2y$ et $y(0) = 3$. Calcule $y(1)$ (valeur exacte comme 3e^2, ou arrondi au centième).`, type: 'num', rep: 3 * Math.exp(2), tol: 0.006, corr: r`$y(x) = 3e^{2x}$, donc $y(1) = 3e^2 \approx 22{,}17$.` },
        { q: r`Quelle est la solution constante de l'équation $y' = -y + 4$ ?`, type: 'num', rep: 4, corr: r`Une constante $c$ vérifie $0 = -c + 4$, donc $c = 4$.` }
      ]
    },
    {
      id: 'tle-integrales', titre: 'Le calcul intégral', domaine: 'Intégration',
      resume: 'Intégrale et aire, calcul par primitive, linéarité, intégration par parties et valeur moyenne.',
      yt: 'yvan monka calcul intégral terminale',
      cours: r`
<div class="def"><b>Intégrale et aire</b><p>Pour $f$ continue et positive sur $[a\,;b]$, $\displaystyle\int_a^b f(x)\,\mathrm dx$ est l'aire du domaine compris entre la courbe, l'axe des abscisses et les droites $x = a$ et $x = b$ (en unités d'aire).</p></div>
<div class="prop"><b>Calcul</b><p>Si $F$ est une primitive de $f$ : $\displaystyle\int_a^b f(x)\,\mathrm dx = \big[F(x)\big]_a^b = F(b) - F(a)$.</p></div>
<div class="ex-box"><b>Exemples</b><p>$\displaystyle\int_1^3 (2x + 1)\,\mathrm dx = \big[x^2 + x\big]_1^3 = 12 - 2 = 10$.</p><p>$\displaystyle\int_0^{\ln 2} e^x\,\mathrm dx = e^{\ln 2} - e^0 = 2 - 1 = 1$.</p></div>
<div class="prop"><b>Propriétés</b><p>Linéarité, relation de Chasles $\int_a^b + \int_b^c = \int_a^c$, positivité et croissance (si $f \leq g$ sur $[a,b]$ avec $a \leq b$, alors $\int_a^b f \leq \int_a^b g$).</p></div>
<div class="prop"><b>Intégration par parties</b><p>$\displaystyle\int_a^b u v' = \big[uv\big]_a^b - \int_a^b u'v$. Ex. : $\displaystyle\int_0^1 xe^x\,\mathrm dx = \big[xe^x\big]_0^1 - \int_0^1 e^x\,\mathrm dx = e - (e - 1) = 1$.</p></div>
<div class="def"><b>Valeur moyenne</b><p>$\mu = \dfrac{1}{b - a}\displaystyle\int_a^b f(x)\,\mathrm dx$. Pour $x^2$ sur $[0\,;3]$ : $\mu = \dfrac13 \times 9 = 3$.</p></div>`,
      retenir: [r`$\int_a^b f = F(b) - F(a)$.`, r`IPP : $\int uv' = [uv] - \int u'v$.`, r`Valeur moyenne : $\frac{1}{b-a}\int_a^b f$.`],
      exos: [
        { q: r`Calcule $\displaystyle\int_1^3 (2x + 1)\,\mathrm dx$.`, type: 'num', rep: 10, corr: r`$\big[x^2 + x\big]_1^3 = (9 + 3) - (1 + 1) = 10$.` },
        { q: r`Calcule $\displaystyle\int_0^{\ln 2} e^x\,\mathrm dx$.`, type: 'num', rep: 1, corr: r`$\big[e^x\big]_0^{\ln 2} = 2 - 1 = 1$.` },
        { q: r`Calcule la valeur moyenne de $f(x) = x^2$ sur $[0\,;3]$.`, type: 'num', rep: 3, corr: r`$\dfrac13\displaystyle\int_0^3 x^2\,\mathrm dx = \dfrac13\left[\dfrac{x^3}{3}\right]_0^3 = \dfrac13 \times 9 = 3$.` }
      ]
    },
    {
      id: 'tle-denombrement', titre: 'Dénombrement', domaine: 'Dénombrement',
      resume: 'k-uplets, arrangements, permutations et combinaisons.',
      yt: 'yvan monka dénombrement combinaisons terminale',
      cours: r`
<div class="prop"><b>Principe multiplicatif</b><p>Si un choix se fait en plusieurs étapes indépendantes, avec $n_1$ possibilités puis $n_2$ puis…, le nombre total est $n_1 \times n_2 \times \cdots$.</p></div>
<table class="t"><tr><th>Situation</th><th>Ordre ?</th><th>Répétitions ?</th><th>Nombre</th></tr>
<tr><td>$k$-uplets d'un ensemble à $n$ éléments</td><td>oui</td><td>oui</td><td>$n^k$</td></tr>
<tr><td>Arrangements (k-uplets distincts)</td><td>oui</td><td>non</td><td>$\dfrac{n!}{(n-k)!}$</td></tr>
<tr><td>Permutations</td><td>oui</td><td>non</td><td>$n!$</td></tr>
<tr><td>Combinaisons (parties à $k$ éléments)</td><td>non</td><td>non</td><td>$\dbinom nk = \dfrac{n!}{k!(n-k)!}$</td></tr></table>
<div class="ex-box"><b>Exemples</b><p>Codes à $4$ chiffres : $10^4 = 10\,000$.</p><p>Podium (or, argent, bronze) parmi $8$ coureurs : $8 \times 7 \times 6 = 336$.</p><p>Délégation de $3$ élèves parmi $10$ : $\dbinom{10}{3} = \dfrac{10 \times 9 \times 8}{3 \times 2 \times 1} = 120$.</p></div>
<div class="prop"><b>Propriétés des combinaisons</b><p>$\dbinom nk = \dbinom n{n-k}$, relation de Pascal $\dbinom nk + \dbinom n{k+1} = \dbinom{n+1}{k+1}$, et $\displaystyle\sum_{k=0}^{n}\binom nk = 2^n$ (nombre de parties d'un ensemble à $n$ éléments).</p></div>`,
      retenir: [r`Ordre + répétitions : $n^k$.`, r`Ordre sans répétition : $\frac{n!}{(n-k)!}$.`, r`Sans ordre : $\binom nk$.`],
      exos: [
        { q: r`Combien existe-t-il de codes à $4$ chiffres (de $0000$ à $9999$) ?`, type: 'num', rep: 10000, corr: r`$4$-uplets de $\{0, \ldots, 9\}$ : $10^4 = 10\,000$.` },
        { q: r`De combien de façons peut-on attribuer l'or, l'argent et le bronze à $3$ des $8$ finalistes ?`, type: 'num', rep: 336, corr: r`L'ordre compte, sans répétition : $8 \times 7 \times 6 = 336$.` },
        { q: r`Combien de délégations de $3$ élèves peut-on former dans une classe de $10$ ?`, type: 'num', rep: 120, corr: r`$\dbinom{10}{3} = \dfrac{10 \times 9 \times 8}{6} = 120$.` }
      ]
    },
    {
      id: 'tle-binomiale', titre: 'La loi binomiale', domaine: 'Probabilités',
      resume: 'Épreuve de Bernoulli, schéma de Bernoulli et loi binomiale B(n, p).',
      yt: 'yvan monka loi binomiale terminale',
      cours: r`
<div class="def"><b>Bernoulli</b><p>Une épreuve de Bernoulli a deux issues : succès (probabilité $p$) et échec ($1 - p$). Répéter $n$ fois la même épreuve de façon <b>indépendante</b> forme un schéma de Bernoulli.</p></div>
<div class="prop"><b>Loi binomiale</b><p>Le nombre $X$ de succès suit la loi $\mathcal B(n\,;p)$ :</p>$$P(X = k) = \binom nk p^k (1 - p)^{n-k}, \quad k \in \{0, \ldots, n\}.$$<p>$E(X) = np$, $V(X) = np(1 - p)$.</p></div>
<div class="ex-box"><b>Exemples</b><p>$X \sim \mathcal B(5\,;0{,}5)$ : $P(X = 2) = \dbinom52 \times 0{,}5^5 = \dfrac{10}{32} = 0{,}3125$.</p><p>$X \sim \mathcal B(4\,;0{,}2)$ : $P(X \geq 1) = 1 - P(X = 0) = 1 - 0{,}8^4 = 0{,}5904$.</p></div>
<div class="methode"><b>« Au moins un »</b><p>On passe presque toujours par l'événement contraire « aucun ».</p></div>
<div class="attention"><b>Piège</b><p>Sans indépendance (tirages sans remise dans une petite urne), ce n'est pas une loi binomiale.</p></div>`,
      retenir: [r`$P(X = k) = \binom nk p^k(1-p)^{n-k}$.`, r`$E(X) = np$, $V(X) = np(1-p)$.`, r`« Au moins un » : $1 - P(X = 0)$.`],
      exos: [
        { q: r`$X \sim \mathcal B(5\,;0{,}5)$. Calcule $P(X = 2)$.`, type: 'num', rep: 0.3125, corr: r`$\dbinom52 \times 0{,}5^2 \times 0{,}5^3 = 10 \times \dfrac{1}{32} = 0{,}3125$.` },
        { q: r`$X \sim \mathcal B(4\,;0{,}2)$. Calcule $P(X \geq 1)$.`, type: 'num', rep: 0.5904, corr: r`$1 - 0{,}8^4 = 1 - 0{,}4096 = 0{,}5904$.` },
        { q: r`$X \sim \mathcal B(20\,;0{,}3)$. Calcule $V(X)$.`, type: 'num', rep: 4.2, corr: r`$V(X) = 20 \times 0{,}3 \times 0{,}7 = 4{,}2$.` }
      ]
    },
    {
      id: 'tle-espace', titre: 'Géométrie dans l\'espace', domaine: 'Géométrie',
      resume: 'Vecteurs de l\'espace, produit scalaire, plans et équations cartésiennes.',
      yt: 'yvan monka équation cartésienne d\'un plan terminale',
      cours: r`
<div class="def"><b>Repère de l'espace</b><p>Un vecteur a trois coordonnées $\vec u(x\,;y\,;z)$. Dans un repère orthonormé, $\|\vec u\| = \sqrt{x^2 + y^2 + z^2}$ et $\vec u \cdot \vec v = xx' + yy' + zz'$.</p></div>
<div class="prop"><b>Droite</b><p>La droite passant par $A$ et dirigée par $\vec u$ a pour représentation paramétrique $\begin{cases} x = x_A + t a \\ y = y_A + t b \\ z = z_A + t c \end{cases}$, $t \in \mathbb R$.</p></div>
<div class="prop"><b>Plan et vecteur normal</b><p>Un vecteur $\vec n \neq \vec 0$ est <b>normal</b> à un plan s'il est orthogonal à tous ses vecteurs. Le plan de vecteur normal $\vec n(a\,;b\,;c)$ a une équation de la forme $ax + by + cz + d = 0$.</p></div>
<div class="ex-box"><b>Exemple</b><p>Plan passant par $A(1\,;0\,;2)$ et de vecteur normal $\vec n(2\,;-1\,;3)$ : $2x - y + 3z + d = 0$ et $A$ vérifie $2 + 6 + d = 0$, donc $d = -8$.</p></div>
<div class="prop"><b>Projeté orthogonal et distance</b><p>Le projeté orthogonal $H$ d'un point $M$ sur un plan réalise la plus courte distance de $M$ au plan. On le trouve en coupant le plan par la droite passant par $M$ et dirigée par $\vec n$.</p></div>`,
      retenir: [r`$\vec u \cdot \vec v = xx' + yy' + zz'$.`, r`Plan de normale $(a\,;b\,;c)$ : $ax + by + cz + d = 0$.`, r`Droite : $A + t\vec u$.`],
      exos: [
        { q: r`Calcule la norme de $\vec u(1\,;2\,;2)$.`, type: 'num', rep: 3, corr: r`$\sqrt{1 + 4 + 4} = \sqrt9 = 3$.` },
        { q: r`Le plan passant par $A(1\,;0\,;2)$ de vecteur normal $\vec n(2\,;-1\,;3)$ a pour équation $2x - y + 3z + d = 0$. Combien vaut $d$ ?`, type: 'num', rep: -8, corr: r`$2 \times 1 - 0 + 3 \times 2 + d = 0 \iff d = -8$.` },
        { q: r`Les vecteurs $\vec u(1\,;0\,;-1)$ et $\vec v(2\,;3\,;2)$ sont-ils orthogonaux ?`, type: 'qcm', choix: [r`Oui`, r`Non`], rep: 0, corr: r`$\vec u \cdot \vec v = 2 + 0 - 2 = 0$ : ils sont orthogonaux.` }
      ]
    },
    {
      id: 'tle-trigo', titre: 'Fonctions sinus et cosinus', domaine: 'Trigonométrie',
      resume: 'Périodicité, parité, dérivées et équations trigonométriques.',
      yt: 'yvan monka fonctions sinus cosinus terminale',
      cours: r`
<div class="prop"><b>Propriétés</b><p>$\cos$ et $\sin$ sont définies sur $\mathbb R$, <b>$2\pi$-périodiques</b>, à valeurs dans $[-1\,;1]$. $\cos$ est paire, $\sin$ est impaire.</p></div>
<div class="prop"><b>Dérivées</b><p>$\cos' = -\sin$ et $\sin' = \cos$. Plus généralement $\big(\cos(ax + b)\big)' = -a\sin(ax + b)$ et $\big(\sin(ax + b)\big)' = a\cos(ax + b)$.</p></div>
<div class="prop"><b>Limite remarquable</b><p>$\displaystyle\lim_{x \to 0}\frac{\sin x}{x} = 1$ : c'est le nombre dérivé de $\sin$ en $0$, qui vaut $\cos 0 = 1$.</p></div>
<div class="ex-box"><b>Période</b><p>$x \mapsto \cos(2x)$ est $\pi$-périodique, car $\cos(2(x + \pi)) = \cos(2x + 2\pi) = \cos(2x)$.</p></div>
<div class="methode"><b>Équation $\cos x = a$</b><p>Sur $[0\,;2\pi[$ : $\cos x = \dfrac12 \iff x = \dfrac\pi3$ ou $x = 2\pi - \dfrac\pi3 = \dfrac{5\pi}{3}$. Penser au cercle : deux points symétriques par rapport à l'axe des abscisses.</p></div>`,
      retenir: [r`$\cos' = -\sin$, $\sin' = \cos$.`, r`$\cos(ax)$ est $\frac{2\pi}{a}$-périodique.`, r`$\frac{\sin x}{x} \to 1$ en $0$.`],
      exos: [
        { q: r`Soit $f(x) = \sin(3x)$. Calcule $f'(0)$.`, type: 'num', rep: 3, corr: r`$f'(x) = 3\cos(3x)$, donc $f'(0) = 3$.` },
        { q: r`La plus petite période positive de $x \mapsto \cos(2x)$ est :`, type: 'qcm', choix: [r`$\pi$`, r`$2\pi$`, r`$4\pi$`, r`$\dfrac\pi2$`], rep: 0, corr: r`$\cos(2x)$ est $\dfrac{2\pi}{2} = \pi$-périodique.` },
        { q: r`Résous $\cos x = \dfrac12$ sur $[0\,;2\pi[$.`, type: 'liste', rep: [Math.PI / 3, 5 * Math.PI / 3], tol: 0.005, corr: r`$x = \dfrac\pi3$ ou $x = \dfrac{5\pi}{3}$.` }
      ]
    }
  ]);
})();
