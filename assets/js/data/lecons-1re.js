/* Leçons de Première (spécialité mathématiques). */
(function () {
  var r = String.raw;
  addLecons('1re', [
    {
      id: '1re-second-degre', titre: 'Le second degré : forme canonique et discriminant', domaine: 'Second degré',
      resume: 'Mettre un trinôme sous forme canonique et résoudre ax² + bx + c = 0.',
      yt: 'yvan monka second degré discriminant première',
      cours: r`
<div class="def"><b>Trinôme</b><p>Une fonction polynôme de degré $2$ s'écrit $f(x) = ax^2 + bx + c$ avec $a \neq 0$.</p></div>
<div class="prop"><b>Forme canonique</b><p>$f(x) = a(x - \alpha)^2 + \beta$ avec $\alpha = -\dfrac{b}{2a}$ et $\beta = f(\alpha)$. Le sommet de la parabole est $S(\alpha\,;\beta)$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$x^2 - 6x + 11 = (x - 3)^2 - 9 + 11 = (x - 3)^2 + 2$. Comme $a = 1 \gt 0$, le minimum est $2$, atteint en $x = 3$.</p></div>
<div class="prop"><b>Discriminant</b><p>$\Delta = b^2 - 4ac$.</p><ul><li>$\Delta \gt 0$ : deux racines $x_{1,2} = \dfrac{-b \pm \sqrt\Delta}{2a}$ ;</li><li>$\Delta = 0$ : une racine double $x_0 = -\dfrac{b}{2a}$ ;</li><li>$\Delta \lt 0$ : aucune racine réelle.</li></ul></div>
<div class="ex-box"><b>Exemple</b><p>$x^2 - 5x + 6 = 0$ : $\Delta = 25 - 24 = 1$, donc $x = \dfrac{5 \pm 1}{2}$, soit $x = 2$ ou $x = 3$.</p></div>
<div class="methode"><b>Démonstration (idée)</b><p>$ax^2 + bx + c = a\left[\left(x + \dfrac{b}{2a}\right)^2 - \dfrac{\Delta}{4a^2}\right]$. Si $\Delta \geq 0$, on reconnaît une différence de deux carrés et on factorise.</p></div>`,
      retenir: [r`$\Delta = b^2 - 4ac$.`, r`$x_{1,2} = \frac{-b \pm \sqrt\Delta}{2a}$ si $\Delta \gt 0$.`, r`Sommet en $\alpha = -\frac{b}{2a}$.`],
      exos: [
        { q: r`Résous $x^2 - 5x + 6 = 0$.`, type: 'liste', rep: [2, 3], corr: r`$\Delta = 25 - 24 = 1$, donc $x = \dfrac{5 - 1}{2} = 2$ ou $x = \dfrac{5 + 1}{2} = 3$.` },
        { q: r`Quel est le minimum de $f(x) = x^2 - 6x + 11$ sur $\mathbb R$ ?`, type: 'num', rep: 2, corr: r`$f(x) = (x - 3)^2 + 2$ et $a \gt 0$ : le minimum est $2$, atteint en $3$.` },
        { q: r`Calcule le discriminant de $3x^2 + 2x + 1$.`, type: 'num', rep: -8, corr: r`$\Delta = 2^2 - 4 \times 3 \times 1 = 4 - 12 = -8 \lt 0$ : pas de racine réelle.` }
      ]
    },
    {
      id: '1re-signe-trinome', titre: 'Signe d\'un trinôme et factorisation', domaine: 'Second degré',
      resume: 'Le trinôme est du signe de a, sauf entre ses racines.',
      yt: 'yvan monka signe d\'un trinôme inéquation second degré',
      cours: r`
<div class="prop"><b>Factorisation</b><p>Si $\Delta \gt 0$ : $ax^2 + bx + c = a(x - x_1)(x - x_2)$. Si $\Delta = 0$ : $a(x - x_0)^2$. Si $\Delta \lt 0$ : pas de factorisation dans $\mathbb R$.</p></div>
<div class="prop"><b>Signe</b><p>Le trinôme est <b>du signe de $a$ à l'extérieur des racines</b> et du signe contraire entre les racines. Si $\Delta \leq 0$, il est du signe de $a$ partout (s'annulant éventuellement en $x_0$).</p></div>
<div class="ex-box"><b>Exemple</b><p>$-x^2 + x + 6$ : $\Delta = 1 + 24 = 25$, racines $\dfrac{-1 \pm 5}{-2}$, soit $-2$ et $3$. Ici $a = -1 \lt 0$ : le trinôme est négatif à l'extérieur et <b>positif entre $-2$ et $3$</b>.</p><p>Donc $-x^2 + x + 6 \geq 0 \iff x \in [-2\,;3]$.</p></div>
<div class="ex-box"><b>Factoriser</b><p>$2x^2 - 8x + 6$ : racines $1$ et $3$ (car $\Delta = 64 - 48 = 16$), donc $2x^2 - 8x + 6 = 2(x - 1)(x - 3)$.</p></div>
<div class="attention"><b>Piège</b><p>Ne pas oublier le coefficient $a$ devant la forme factorisée !</p></div>`,
      retenir: [r`$a(x - x_1)(x - x_2)$ si $\Delta \gt 0$.`, r`Signe de $a$ à l'extérieur des racines.`],
      exos: [
        { q: r`L'ensemble des solutions de $-x^2 + x + 6 \geq 0$ est :`, type: 'qcm', choix: [r`$[-2\,;3]$`, r`$]-\infty\,;-2] \cup [3\,;+\infty[$`, r`$[-3\,;2]$`, r`$\mathbb R$`], rep: 0, corr: r`Racines $-2$ et $3$, $a \lt 0$ : positif entre les racines, d'où $[-2\,;3]$.` },
        { q: r`Combien d'entiers vérifient $-x^2 + x + 6 \geq 0$ ?`, type: 'num', rep: 6, corr: r`Les entiers de $[-2\,;3]$ : $-2, -1, 0, 1, 2, 3$, soit $6$.` },
        { q: r`La forme factorisée de $2x^2 - 8x + 6$ est :`, type: 'qcm', choix: [r`$2(x - 1)(x - 3)$`, r`$(x - 1)(x - 3)$`, r`$2(x + 1)(x + 3)$`, r`$(2x - 1)(x - 3)$`], rep: 0, corr: r`$\Delta = 16$, racines $\dfrac{8 \pm 4}{4}$ soit $1$ et $3$, puis on n'oublie pas $a = 2$.` }
      ]
    },
    {
      id: '1re-suites', titre: 'Les suites numériques', domaine: 'Suites',
      resume: 'Suites définies explicitement ou par récurrence, sens de variation.',
      yt: 'yvan monka suites numériques généralités première',
      cours: r`
<div class="def"><b>Définition</b><p>Une suite $(u_n)$ associe à chaque entier naturel $n$ un réel $u_n$.</p><ul><li><b>Forme explicite</b> : $u_n = f(n)$, par exemple $u_n = n^2 - 3$ ; on calcule directement $u_5 = 22$.</li><li><b>Récurrence</b> : on donne $u_0$ et une relation $u_{n+1} = g(u_n)$ ; il faut calculer les termes un par un.</li></ul></div>
<div class="ex-box"><b>Exemple</b><p>$u_0 = 3$ et $u_{n+1} = 2u_n - 1$ : $u_1 = 5$, $u_2 = 9$, $u_3 = 17$.</p></div>
<div class="def"><b>Sens de variation</b><p>$(u_n)$ est <b>croissante</b> si $u_{n+1} \geq u_n$ pour tout $n$, <b>décroissante</b> si $u_{n+1} \leq u_n$.</p></div>
<div class="methode"><b>Méthodes</b><ul><li>Étudier le signe de $u_{n+1} - u_n$.</li><li>Si $u_n = f(n)$ avec $f$ monotone sur $[0\,;+\infty[$, $(u_n)$ a le même sens de variation.</li><li>Si tous les termes sont strictement positifs, comparer $\dfrac{u_{n+1}}{u_n}$ à $1$.</li></ul></div>
<div class="ex-box"><b>Exemple</b><p>$u_n = \dfrac{1}{n + 1}$ : $u_{n+1} - u_n = \dfrac{1}{n+2} - \dfrac{1}{n+1} = \dfrac{-1}{(n+1)(n+2)} \lt 0$. La suite est décroissante.</p></div>`,
      retenir: [r`Explicite : calcul direct. Récurrence : terme après terme.`, r`Variation : signe de $u_{n+1} - u_n$.`],
      exos: [
        { q: r`$u_n = n^2 - 3$. Calcule $u_5$.`, type: 'num', rep: 22, corr: r`$u_5 = 25 - 3 = 22$.` },
        { q: r`$u_0 = 3$ et $u_{n+1} = 2u_n - 1$. Calcule $u_3$.`, type: 'num', rep: 17, corr: r`$u_1 = 5$, $u_2 = 9$, $u_3 = 17$.` },
        { q: r`La suite $u_n = \dfrac{1}{n + 1}$ est :`, type: 'qcm', choix: [r`strictement décroissante`, r`strictement croissante`, r`constante`, r`ni croissante ni décroissante`], rep: 0, corr: r`$u_{n+1} - u_n = \dfrac{-1}{(n+1)(n+2)} \lt 0$.` }
      ]
    },
    {
      id: '1re-arith-geo', titre: 'Suites arithmétiques et géométriques', domaine: 'Suites',
      resume: 'Terme général et sommes de termes consécutifs.',
      yt: 'yvan monka suites arithmétiques géométriques somme première',
      cours: r`
<div class="def"><b>Suite arithmétique</b><p>$u_{n+1} = u_n + r$ (on ajoute toujours la raison $r$). Terme général : $u_n = u_0 + nr$.</p></div>
<div class="def"><b>Suite géométrique</b><p>$u_{n+1} = q \times u_n$ (on multiplie toujours par la raison $q$). Terme général : $u_n = u_0 \times q^n$.</p></div>
<div class="prop"><b>Sommes</b>$$1 + 2 + \cdots + n = \frac{n(n+1)}{2} \qquad 1 + q + q^2 + \cdots + q^n = \frac{1 - q^{n+1}}{1 - q}\ (q \neq 1)$$</div>
<div class="methode"><b>Démonstration de la somme géométrique</b><p>Si $S = 1 + q + \cdots + q^n$, alors $qS = q + q^2 + \cdots + q^{n+1}$. En soustrayant, tout se simplifie : $S - qS = 1 - q^{n+1}$.</p></div>
<div class="ex-box"><b>Exemples</b><p>$u_0 = 7$, $r = -2$ : $u_{20} = 7 - 40 = -33$.</p><p>$1 + 2 + 4 + \cdots + 2^9 = \dfrac{1 - 2^{10}}{1 - 2} = 1\,023$.</p><p>Un capital de $1\,000$ € placé à $5\,\%$ par an : $u_n = 1\,000 \times 1{,}05^n$, donc $u_3 \approx 1\,157{,}63$ €.</p></div>`,
      retenir: [r`Arithmétique : $u_n = u_0 + nr$.`, r`Géométrique : $u_n = u_0 q^n$.`, r`$\sum_{k=0}^{n} q^k = \frac{1 - q^{n+1}}{1 - q}$.`],
      exos: [
        { q: r`$(u_n)$ est arithmétique de premier terme $u_0 = 7$ et de raison $-2$. Calcule $u_{20}$.`, type: 'num', rep: -33, corr: r`$u_{20} = 7 + 20 \times (-2) = -33$.` },
        { q: r`Calcule $1 + 2 + 4 + 8 + \cdots + 2^9$.`, type: 'num', rep: 1023, corr: r`Somme géométrique de raison $2$ avec $10$ termes : $\dfrac{1 - 2^{10}}{1 - 2} = 2^{10} - 1 = 1\,023$.` },
        { q: r`On place $1\,000$ € à $5\,\%$ par an (intérêts composés). Quel est le capital au bout de $3$ ans, arrondi au centime ?`, type: 'num', rep: 1157.625, tol: 0.006, unite: '€', corr: r`$1\,000 \times 1{,}05^3 = 1\,157{,}625 \approx 1\,157{,}63$ €.` }
      ]
    },
    {
      id: '1re-nombre-derive', titre: 'Nombre dérivé et tangente', domaine: 'Dérivation',
      resume: 'Taux de variation, limite quand h tend vers 0, équation de la tangente.',
      yt: 'yvan monka nombre dérivé tangente première',
      cours: r`
<div class="def"><b>Taux de variation</b><p>Entre $a$ et $a + h$ : $\tau(h) = \dfrac{f(a + h) - f(a)}{h}$. C'est la pente de la sécante.</p></div>
<div class="def"><b>Nombre dérivé</b><p>Si $\tau(h)$ tend vers un réel $\ell$ quand $h$ tend vers $0$, on dit que $f$ est <b>dérivable</b> en $a$ et $f'(a) = \ell$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$f(x) = x^2$ en $a = 3$ : $\dfrac{(3 + h)^2 - 9}{h} = \dfrac{6h + h^2}{h} = 6 + h \to 6$. Donc $f'(3) = 6$.</p></div>
<div class="prop"><b>Tangente</b><p>$f'(a)$ est le coefficient directeur de la tangente à la courbe au point d'abscisse $a$. Son équation est : $$y = f'(a)(x - a) + f(a).$$</p></div>
<div class="ex-box"><b>Exemple</b><p>Pour $f(x) = x^2$ en $a = 1$ : $f(1) = 1$ et $f'(1) = 2$, donc $y = 2(x - 1) + 1 = 2x - 1$.</p></div>
<div class="attention"><b>Piège</b><p>On ne peut pas « remplacer $h$ par $0$ » dans $\dfrac{f(a+h) - f(a)}{h}$ directement : il faut d'abord simplifier par $h$.</p></div>`,
      retenir: [r`$f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}$.`, r`Tangente : $y = f'(a)(x - a) + f(a)$.`],
      exos: [
        { q: r`Pour $f(x) = x^2$, calcule $f'(3)$ à l'aide du taux de variation.`, type: 'num', rep: 6, corr: r`$\dfrac{(3 + h)^2 - 9}{h} = 6 + h \to 6$.` },
        { q: r`La tangente à la courbe de $f(x) = x^2$ au point d'abscisse $1$ a pour équation $y = mx + p$. Combien vaut $p$ ?`, type: 'num', rep: -1, corr: r`$y = f'(1)(x - 1) + f(1) = 2(x - 1) + 1 = 2x - 1$, donc $p = -1$.` },
        { q: r`Graphiquement, $f'(a)$ est :`, type: 'qcm', choix: [r`le coefficient directeur de la tangente en $a$`, r`l'ordonnée du point d'abscisse $a$`, r`l'ordonnée à l'origine de la tangente`, r`l'aire sous la courbe`], rep: 0, corr: r`$f'(a)$ est la pente de la tangente à $\mathcal C_f$ au point d'abscisse $a$.` }
      ]
    },
    {
      id: '1re-derivees', titre: 'Fonctions dérivées et opérations', domaine: 'Dérivation',
      resume: 'Dérivées usuelles, somme, produit, quotient et composée affine.',
      yt: 'yvan monka dérivées usuelles produit quotient première',
      cours: r`
<table class="t"><tr><th>$f(x)$</th><td>$k$</td><td>$x^n$</td><td>$\dfrac1x$</td><td>$\sqrt x$</td></tr><tr><th>$f'(x)$</th><td>$0$</td><td>$nx^{n-1}$</td><td>$-\dfrac{1}{x^2}$</td><td>$\dfrac{1}{2\sqrt x}$</td></tr></table>
<div class="prop"><b>Opérations</b>$$(u + v)' = u' + v' \qquad (ku)' = ku' \qquad (uv)' = u'v + uv'$$$$\left(\frac1v\right)' = -\frac{v'}{v^2} \qquad \left(\frac uv\right)' = \frac{u'v - uv'}{v^2} \qquad \big(g(ax + b)\big)' = a\,g'(ax + b)$$</div>
<div class="ex-box"><b>Exemples</b><p>$f(x) = 3x^4 - 2x^2 + 7$ : $f'(x) = 12x^3 - 4x$, donc $f'(1) = 8$.</p><p>$g(x) = (2x + 1)(x - 3)$ : $g'(x) = 2(x - 3) + (2x + 1) \times 1 = 4x - 5$.</p><p>$h(x) = \dfrac{1}{x^2 + 1}$ : $h'(x) = -\dfrac{2x}{(x^2 + 1)^2}$.</p></div>
<div class="attention"><b>Piège</b><p>$(uv)' \neq u'v'$ ! Avec $u = v = x$ : $(x^2)' = 2x$ mais $u'v' = 1$.</p></div>`,
      retenir: [r`$(x^n)' = nx^{n-1}$.`, r`$(uv)' = u'v + uv'$ ; $\left(\frac uv\right)' = \frac{u'v - uv'}{v^2}$.`],
      exos: [
        { q: r`$f(x) = 3x^4 - 2x^2 + 7$. Calcule $f'(1)$.`, type: 'num', rep: 8, corr: r`$f'(x) = 12x^3 - 4x$, donc $f'(1) = 12 - 4 = 8$.` },
        { q: r`$g(x) = (2x + 1)(x - 3)$. Calcule $g'(2)$.`, type: 'num', rep: 3, corr: r`$g'(x) = 2(x - 3) + (2x + 1) = 4x - 5$, donc $g'(2) = 3$.` },
        { q: r`$h(x) = \dfrac{1}{x^2 + 1}$. Calcule $h'(1)$.`, type: 'num', rep: -0.5, corr: r`$h'(x) = -\dfrac{2x}{(x^2 + 1)^2}$, donc $h'(1) = -\dfrac{2}{4} = -0{,}5$.` }
      ]
    },
    {
      id: '1re-variations', titre: 'Dérivée et variations', domaine: 'Dérivation',
      resume: 'Le signe de la dérivée donne le sens de variation et les extremums.',
      yt: 'yvan monka dérivée variations extremum première',
      cours: r`
<div class="prop"><b>Théorème</b><p>Soit $f$ dérivable sur un intervalle $I$.</p><ul><li>Si $f' \geq 0$ sur $I$, $f$ est croissante sur $I$.</li><li>Si $f' \leq 0$ sur $I$, $f$ est décroissante sur $I$.</li><li>Si $f' = 0$ sur $I$, $f$ est constante.</li></ul></div>
<div class="prop"><b>Extremum local</b><p>Si $f'$ s'annule en $a$ <b>en changeant de signe</b>, $f$ admet un extremum local en $a$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$f(x) = x^3 - 3x$ : $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$.</p></div>
<table class="t"><tr><th>$x$</th><td>$-\infty$</td><td></td><td>$-1$</td><td></td><td>$1$</td><td></td><td>$+\infty$</td></tr><tr><th>$f'(x)$</th><td></td><td>$+$</td><td>$0$</td><td>$-$</td><td>$0$</td><td>$+$</td><td></td></tr><tr><th>$f$</th><td></td><td>↗</td><td>$2$</td><td>↘</td><td>$-2$</td><td>↗</td><td></td></tr></table>
<p>Maximum local $2$ en $-1$, minimum local $-2$ en $1$.</p>
<div class="attention"><b>Piège</b><p>$f'(a) = 0$ ne suffit pas : pour $x^3$, $f'(0) = 0$ mais pas d'extremum (pas de changement de signe).</p></div>`,
      retenir: [r`Signe de $f'$ $\Rightarrow$ variations de $f$.`, r`Extremum : $f'$ s'annule en changeant de signe.`],
      exos: [
        { q: r`$f(x) = x^3 - 3x$. Quelle est la valeur du maximum local de $f$ ?`, type: 'num', rep: 2, corr: r`$f'(x) = 3(x - 1)(x + 1)$ : $f$ croît, puis décroît après $-1$. Maximum local $f(-1) = -1 + 3 = 2$.` },
        { q: r`Si $f'(x) \gt 0$ pour tout $x$ de $I$, alors :`, type: 'qcm', choix: [r`$f$ est strictement croissante sur $I$`, r`$f$ est positive sur $I$`, r`$f$ est décroissante sur $I$`, r`$f$ admet un maximum sur $I$`], rep: 0, corr: r`Le signe de la dérivée donne le sens de variation, pas le signe de $f$.` },
        { q: r`Quel est le minimum de $f(x) = x^2 - 4x + 1$ sur $\mathbb R$ ?`, type: 'num', rep: -3, corr: r`$f'(x) = 2x - 4$ s'annule en $2$ en passant de $-$ à $+$ : minimum $f(2) = 4 - 8 + 1 = -3$.` }
      ]
    },
    {
      id: '1re-exponentielle', titre: 'La fonction exponentielle', domaine: 'Exponentielle',
      resume: 'Définition par f\' = f, propriétés algébriques et dérivée de e^(kx).',
      yt: 'yvan monka fonction exponentielle première',
      cours: r`
<div class="def"><b>Définition</b><p>Il existe une unique fonction $f$ dérivable sur $\mathbb R$ telle que $f' = f$ et $f(0) = 1$ : c'est la fonction <b>exponentielle</b>, notée $\exp$ ou $x \mapsto e^x$. On a $e = e^1 \approx 2{,}718$.</p></div>
<div class="prop"><b>Propriétés algébriques</b><p>Pour tous réels $a, b$ et tout entier $n$ : $e^{a + b} = e^a e^b$, $e^{-a} = \dfrac{1}{e^a}$, $e^{a - b} = \dfrac{e^a}{e^b}$, $(e^a)^n = e^{na}$.</p></div>
<div class="prop"><b>Signe et variations</b><p>$e^x \gt 0$ pour tout $x$, et $\exp$ est strictement croissante. Donc $e^a = e^b \iff a = b$ et $e^a \lt e^b \iff a \lt b$.</p></div>
<div class="prop"><b>Dérivée</b><p>$(e^{kx})' = k e^{kx}$ et plus généralement $(e^{u})' = u' e^{u}$.</p></div>
<div class="ex-box"><b>Exemples</b><p>$\dfrac{e^3 \times e^{-1}}{e^2} = e^{3 - 1 - 2} = e^0 = 1$.</p><p>$e^{2x} = e^6 \iff 2x = 6 \iff x = 3$.</p></div>`,
      retenir: [r`$e^{a+b} = e^a e^b$, $e^0 = 1$, $e^x \gt 0$.`, r`$\exp$ strictement croissante : on peut « simplifier » les exponentielles.`, r`$(e^{kx})' = ke^{kx}$.`],
      exos: [
        { q: r`Simplifie $\dfrac{e^3 \times e^{-1}}{e^2}$.`, type: 'num', rep: 1, corr: r`$e^{3 - 1 - 2} = e^0 = 1$.` },
        { q: r`Résous $e^{2x} = e^6$.`, type: 'num', rep: 3, corr: r`$\exp$ est strictement croissante donc injective : $2x = 6$, $x = 3$.` },
        { q: r`Soit $f(x) = e^{3x}$. Calcule $f'(0)$.`, type: 'num', rep: 3, corr: r`$f'(x) = 3e^{3x}$, donc $f'(0) = 3e^0 = 3$.` }
      ]
    },
    {
      id: '1re-trigonometrie', titre: 'Trigonométrie : le cercle trigonométrique', domaine: 'Trigonométrie',
      resume: 'Radians, cosinus et sinus d\'un réel, valeurs remarquables.',
      yt: 'yvan monka cercle trigonométrique radian première',
      cours: r`
<div class="def"><b>Radian</b><p>Sur le cercle de rayon $1$, un angle de $1$ radian intercepte un arc de longueur $1$. Un tour complet vaut $2\pi$ rad, donc $180° = \pi$ rad. Pour convertir : $x_{\text{rad}} = \dfrac{\pi}{180} \times x_{\text{deg}}$.</p></div>
<div class="def"><b>Cosinus et sinus</b><p>On enroule la droite réelle sur le cercle trigonométrique : au réel $x$ correspond un point $M$. Ses coordonnées sont $(\cos x\,;\sin x)$. On a toujours $\cos^2 x + \sin^2 x = 1$.</p></div>
<table class="t"><tr><th>$x$</th><td>$0$</td><td>$\frac\pi6$</td><td>$\frac\pi4$</td><td>$\frac\pi3$</td><td>$\frac\pi2$</td></tr><tr><th>$\cos x$</th><td>$1$</td><td>$\frac{\sqrt3}2$</td><td>$\frac{\sqrt2}2$</td><td>$\frac12$</td><td>$0$</td></tr><tr><th>$\sin x$</th><td>$0$</td><td>$\frac12$</td><td>$\frac{\sqrt2}2$</td><td>$\frac{\sqrt3}2$</td><td>$1$</td></tr></table>
<div class="prop"><b>Angles associés</b><p>$\cos(-x) = \cos x$, $\sin(-x) = -\sin x$, $\cos(\pi - x) = -\cos x$, $\sin(\pi - x) = \sin x$, $\cos(\pi + x) = -\cos x$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$\cos\dfrac{3\pi}{4} = \cos\left(\pi - \dfrac\pi4\right) = -\dfrac{\sqrt2}{2}$.</p></div>`,
      retenir: [r`$\pi$ rad $= 180°$.`, r`$M(x) = (\cos x\,;\sin x)$ et $\cos^2 + \sin^2 = 1$.`, r`Connaître le tableau des valeurs remarquables par cœur.`],
      exos: [
        { q: r`$150°$ en radians vaut :`, type: 'qcm', choix: [r`$\dfrac{5\pi}{6}$`, r`$\dfrac{3\pi}{4}$`, r`$\dfrac{2\pi}{3}$`, r`$\dfrac{5\pi}{3}$`], rep: 0, corr: r`$150 \times \dfrac{\pi}{180} = \dfrac{5\pi}{6}$.` },
        { q: r`Combien vaut $\sin\dfrac{\pi}{6}$ ?`, type: 'num', rep: 0.5, corr: r`Valeur remarquable : $\sin\dfrac\pi6 = \dfrac12$.` },
        { q: r`Combien vaut $\cos\dfrac{3\pi}{4}$ ? (valeur exacte comme -√2/2, ou arrondi au centième)`, type: 'num', rep: -Math.SQRT1_2, tol: 0.005, corr: r`$\cos\left(\pi - \dfrac\pi4\right) = -\cos\dfrac\pi4 = -\dfrac{\sqrt2}{2} \approx -0{,}71$.` }
      ]
    },
    {
      id: '1re-produit-scalaire', titre: 'Le produit scalaire', domaine: 'Géométrie',
      resume: 'Trois expressions du produit scalaire, orthogonalité et formule d\'Al-Kashi.',
      yt: 'yvan monka produit scalaire première',
      cours: r`
<div class="def"><b>Expressions du produit scalaire</b><ul><li>Avec un angle : $\vec u \cdot \vec v = \|\vec u\|\,\|\vec v\| \cos(\vec u, \vec v)$.</li><li>En repère orthonormé : $\vec u(x\,;y) \cdot \vec v(x'\,;y') = xx' + yy'$.</li><li>Avec les normes : $\vec u \cdot \vec v = \dfrac12\left(\|\vec u + \vec v\|^2 - \|\vec u\|^2 - \|\vec v\|^2\right)$.</li></ul></div>
<div class="prop"><b>Orthogonalité</b><p>$\vec u \perp \vec v \iff \vec u \cdot \vec v = 0$.</p></div>
<div class="ex-box"><b>Exemples</b><p>$\vec u(3\,;4)$, $\vec v(-4\,;3)$ : $\vec u \cdot \vec v = -12 + 12 = 0$, ils sont orthogonaux.</p><p>$\|\vec u\| = 2$, $\|\vec v\| = 5$, angle $60°$ : $\vec u \cdot \vec v = 2 \times 5 \times \dfrac12 = 5$.</p></div>
<div class="prop"><b>Formule d'Al-Kashi</b><p>Dans un triangle $ABC$ : $BC^2 = AB^2 + AC^2 - 2\,AB \times AC \times \cos\widehat{A}$. C'est une généralisation de Pythagore.</p></div>
<div class="ex-box"><b>Exemple</b><p>$AB = 5$, $AC = 7$, $\widehat A = 60°$ : $BC^2 = 25 + 49 - 35 = 39$, donc $BC = \sqrt{39} \approx 6{,}24$.</p></div>`,
      retenir: [r`$\vec u \cdot \vec v = xx' + yy'$ (repère orthonormé).`, r`$\vec u \cdot \vec v = \|\vec u\|\|\vec v\|\cos\theta$.`, r`Orthogonaux $\iff$ produit scalaire nul.`],
      exos: [
        { q: r`Calcule $\vec u \cdot \vec v$ pour $\vec u(3\,;4)$ et $\vec v(-4\,;3)$.`, type: 'num', rep: 0, corr: r`$3 \times (-4) + 4 \times 3 = 0$ : les vecteurs sont orthogonaux.` },
        { q: r`$\|\vec u\| = 2$, $\|\vec v\| = 5$ et l'angle $(\vec u, \vec v)$ mesure $60°$. Calcule $\vec u \cdot \vec v$.`, type: 'num', rep: 5, corr: r`$2 \times 5 \times \cos 60° = 10 \times \dfrac12 = 5$.` },
        { q: r`Dans $ABC$, $AB = 5$, $AC = 7$ et $\widehat{A} = 60°$. Calcule $BC$ (valeur exacte ou arrondi au centième).`, type: 'num', rep: Math.sqrt(39), tol: 0.006, corr: r`Al-Kashi : $BC^2 = 25 + 49 - 2 \times 5 \times 7 \times \dfrac12 = 39$, donc $BC = \sqrt{39} \approx 6{,}24$.` }
      ]
    },
    {
      id: '1re-proba-conditionnelles', titre: 'Probabilités conditionnelles', domaine: 'Probabilités',
      resume: 'P_A(B), arbres pondérés, formule des probabilités totales et indépendance.',
      yt: 'yvan monka probabilités conditionnelles arbre première',
      cours: r`
<div class="def"><b>Définition</b><p>Si $P(A) \neq 0$, la probabilité de $B$ sachant $A$ est $P_A(B) = \dfrac{P(A \cap B)}{P(A)}$. Donc $P(A \cap B) = P(A) \times P_A(B)$.</p></div>
<div class="prop"><b>Arbre pondéré</b><p>Sur les branches de second niveau, on écrit des probabilités conditionnelles. La probabilité d'un chemin est le produit des branches.</p></div>
<div class="prop"><b>Probabilités totales</b><p>Si $A$ et $\overline A$ forment une partition : $P(B) = P(A \cap B) + P(\overline A \cap B) = P(A)P_A(B) + P(\overline A)P_{\overline A}(B)$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$P(A) = 0{,}3$, $P_A(B) = 0{,}6$, $P_{\overline A}(B) = 0{,}2$.</p><p>$P(B) = 0{,}3 \times 0{,}6 + 0{,}7 \times 0{,}2 = 0{,}18 + 0{,}14 = 0{,}32$.</p><p>« Retourner » le conditionnement : $P_B(A) = \dfrac{P(A \cap B)}{P(B)} = \dfrac{0{,}18}{0{,}32} = 0{,}5625$.</p></div>
<div class="def"><b>Indépendance</b><p>$A$ et $B$ sont indépendants si $P(A \cap B) = P(A) \times P(B)$, c'est-à-dire (si $P(A) \neq 0$) $P_A(B) = P(B)$ : savoir que $A$ est réalisé ne change rien pour $B$.</p></div>`,
      retenir: [r`$P(A \cap B) = P(A) P_A(B)$.`, r`Probabilités totales : somme des chemins menant à $B$.`, r`Indépendance : $P(A \cap B) = P(A)P(B)$.`],
      exos: [
        { q: r`$P(A) = 0{,}3$, $P_A(B) = 0{,}6$ et $P_{\overline A}(B) = 0{,}2$. Calcule $P(B)$.`, type: 'num', rep: 0.32, corr: r`$0{,}3 \times 0{,}6 + 0{,}7 \times 0{,}2 = 0{,}18 + 0{,}14 = 0{,}32$.` },
        { q: r`Avec les mêmes données, calcule $P_B(A)$.`, type: 'num', rep: 0.5625, corr: r`$P_B(A) = \dfrac{P(A \cap B)}{P(B)} = \dfrac{0{,}18}{0{,}32} = 0{,}5625$.` },
        { q: r`$P(A) = 0{,}4$, $P(B) = 0{,}5$ et $P(A \cap B) = 0{,}2$. Les événements $A$ et $B$ sont-ils indépendants ?`, type: 'qcm', choix: [r`Oui`, r`Non`, r`On ne peut pas savoir`], rep: 0, corr: r`$P(A) \times P(B) = 0{,}4 \times 0{,}5 = 0{,}2 = P(A \cap B)$ : ils sont indépendants.` }
      ]
    },
    {
      id: '1re-variables-aleatoires', titre: 'Variables aléatoires', domaine: 'Probabilités',
      resume: 'Loi de probabilité, espérance, variance et écart type.',
      yt: 'yvan monka variable aléatoire espérance première',
      cours: r`
<div class="def"><b>Définition</b><p>Une <b>variable aléatoire</b> $X$ associe un nombre réel à chaque issue. Sa <b>loi</b> est la donnée des valeurs $x_i$ et des probabilités $p_i = P(X = x_i)$, avec $\sum p_i = 1$.</p></div>
<div class="prop"><b>Indicateurs</b>$$E(X) = \sum_i p_i x_i \qquad \sigma(X) = \sqrt{V(X)}$$$$V(X) = \sum_i p_i\big(x_i - E(X)\big)^2 = E(X^2) - E(X)^2$$</div>
<div class="ex-box"><b>Exemple : un jeu</b><p>On gagne $10$ € avec probabilité $0{,}1$, $2$ € avec probabilité $0{,}3$, et on perd $3$ € avec probabilité $0{,}6$.</p><p>$E(X) = 10 \times 0{,}1 + 2 \times 0{,}3 - 3 \times 0{,}6 = 1 + 0{,}6 - 1{,}8 = -0{,}2$.</p><p>En moyenne, sur un grand nombre de parties, on perd $0{,}20$ € par partie : le jeu est défavorable.</p></div>
<div class="prop"><b>Linéarité</b><p>$E(aX + b) = aE(X) + b$ et $V(aX + b) = a^2 V(X)$.</p></div>`,
      retenir: [r`$E(X) = \sum p_i x_i$ : la moyenne à long terme.`, r`$V(X) = E(X^2) - E(X)^2$.`, r`$E(aX + b) = aE(X) + b$.`],
      exos: [
        { q: r`On gagne $10$ € avec probabilité $0{,}1$, $2$ € avec probabilité $0{,}3$ et on perd $3$ € avec probabilité $0{,}6$. Calcule l'espérance du gain.`, type: 'num', rep: -0.2, unite: '€', corr: r`$1 + 0{,}6 - 1{,}8 = -0{,}2$ €.` },
        { q: r`$X$ est le résultat d'un dé équilibré à $6$ faces. Calcule $E(X)$.`, type: 'num', rep: 3.5, corr: r`$\dfrac{1 + 2 + 3 + 4 + 5 + 6}{6} = \dfrac{21}{6} = 3{,}5$.` },
        { q: r`$X$ prend les valeurs $0$ et $2$, chacune avec probabilité $\dfrac12$. Calcule $V(X)$.`, type: 'num', rep: 1, corr: r`$E(X) = 1$, $E(X^2) = \dfrac{0 + 4}{2} = 2$, donc $V(X) = 2 - 1 = 1$.` }
      ]
    }
  ]);
})();
