/* Leçons de prépa MPSI (programme de première année, exigence des grandes classes préparatoires). */
(function () {
  var r = String.raw;
  addLecons('mpsi', [
    {
      id: 'mpsi-logique', titre: 'Logique et raisonnements', domaine: 'Fondements',
      resume: 'Quantificateurs, négation, implication, contraposée et grands types de raisonnement.',
      yt: 'logique mathématique quantificateurs MPSI cours',
      cours: r`
<h3>Assertions et connecteurs</h3>
<p>Une assertion est vraie ou fausse. On combine $P$ et $Q$ avec $\neg P$, $P \wedge Q$, $P \vee Q$ (ou inclusif), $P \Rightarrow Q$ (équivalente à $\neg P \vee Q$) et $P \iff Q$.</p>
<div class="prop"><b>Négations</b><p>$\neg(P \wedge Q) \equiv \neg P \vee \neg Q$, &nbsp; $\neg(P \vee Q) \equiv \neg P \wedge \neg Q$, &nbsp; $\neg(P \Rightarrow Q) \equiv P \wedge \neg Q$.</p><p>$\neg(\forall x,\ P(x)) \equiv \exists x,\ \neg P(x)$ &nbsp; et &nbsp; $\neg(\exists x,\ P(x)) \equiv \forall x,\ \neg P(x)$.</p></div>
<div class="ex-box"><b>Exemple : continuité en $0$</b><p>$\forall \varepsilon \gt 0,\ \exists \eta \gt 0,\ \forall x,\ |x| \lt \eta \Rightarrow |f(x) - f(0)| \lt \varepsilon$.</p><p>Négation : $\exists \varepsilon \gt 0,\ \forall \eta \gt 0,\ \exists x,\ |x| \lt \eta \ \wedge\ |f(x) - f(0)| \geq \varepsilon$.</p></div>
<div class="attention"><b>L'ordre des quantificateurs compte</b><p>$\forall x \in \mathbb R,\ \exists y \in \mathbb R,\ y \gt x$ est vrai ; $\exists y \in \mathbb R,\ \forall x \in \mathbb R,\ y \gt x$ est faux.</p></div>
<h3>Raisonnements</h3>
<ul><li><b>Contraposée</b> : $P \Rightarrow Q$ équivaut à $\neg Q \Rightarrow \neg P$. Pour « $n^2$ pair $\Rightarrow n$ pair », on montre « $n$ impair $\Rightarrow n^2$ impair » : $(2k+1)^2 = 2(2k^2 + 2k) + 1$.</li>
<li><b>Absurde</b> : on suppose $\neg P$ et on aboutit à une contradiction. Ex. : $\sqrt2$ est irrationnel.</li>
<li><b>Récurrence</b> (simple, double, forte).</li>
<li><b>Analyse-synthèse</b> : on suppose une solution, on en déduit sa forme (analyse), puis on vérifie que cette forme convient (synthèse). Ex. : toute fonction s'écrit de façon unique comme somme d'une fonction paire et d'une impaire.</li></ul>
<div class="methode"><b>Démonstration : $\sqrt2 \notin \mathbb Q$</b><p>Supposons $\sqrt2 = \dfrac pq$ avec $p, q$ premiers entre eux. Alors $p^2 = 2q^2$ est pair, donc $p$ est pair : $p = 2p'$. Puis $4p'^2 = 2q^2$, donc $q^2 = 2p'^2$ est pair et $q$ aussi. Contradiction avec $p \wedge q = 1$.</p></div>`,
      retenir: [r`$\neg\forall = \exists\neg$ et $\neg\exists = \forall\neg$.`, r`$\neg(P \Rightarrow Q) \equiv P \wedge \neg Q$.`, r`Contraposée, absurde, récurrence, analyse-synthèse.`],
      exos: [
        { q: r`La négation de « $\forall \varepsilon \gt 0,\ \exists N \in \mathbb N,\ \forall n \geq N,\ |u_n| \lt \varepsilon$ » est :`, type: 'qcm', choix: [r`$\exists \varepsilon \gt 0,\ \forall N \in \mathbb N,\ \exists n \geq N,\ |u_n| \geq \varepsilon$`, r`$\forall \varepsilon \gt 0,\ \forall N,\ \exists n \geq N,\ |u_n| \geq \varepsilon$`, r`$\exists \varepsilon \gt 0,\ \exists N,\ \forall n \geq N,\ |u_n| \geq \varepsilon$`, r`$\exists \varepsilon \leq 0,\ \forall N,\ \exists n \lt N,\ |u_n| \geq \varepsilon$`], rep: 0, corr: r`On échange chaque quantificateur et on nie la propriété finale. La condition $n \geq N$ reste (elle fait partie du quantificateur borné) et $\varepsilon \gt 0$ aussi.` },
        { q: r`La contraposée de « si $n^2$ est pair, alors $n$ est pair » est :`, type: 'qcm', choix: [r`si $n$ est impair, alors $n^2$ est impair`, r`si $n$ est pair, alors $n^2$ est pair`, r`si $n^2$ est impair, alors $n$ est impair`, r`$n^2$ est pair et $n$ est impair`], rep: 0, corr: r`La contraposée de $P \Rightarrow Q$ est $\neg Q \Rightarrow \neg P$. La deuxième proposition est la réciproque, la dernière la négation.` },
        { q: r`Sur les 4 lignes de la table de vérité de $P \Rightarrow Q$, combien sont vraies ?`, type: 'num', rep: 3, corr: r`$P \Rightarrow Q$ n'est fausse que lorsque $P$ est vraie et $Q$ fausse : $3$ lignes vraies sur $4$.` }
      ]
    },
    {
      id: 'mpsi-ensembles', titre: 'Ensembles et applications', domaine: 'Fondements',
      resume: 'Parties d\'un ensemble, injections, surjections, bijections, images directe et réciproque.',
      yt: 'injection surjection bijection cours MPSI',
      cours: r`
<div class="def"><b>Ensembles</b><p>$A \subset B$ si tout élément de $A$ est dans $B$. $\mathcal P(E)$ est l'ensemble des parties de $E$ ; si $E$ a $n$ éléments, $\mathcal P(E)$ en a $2^n$. Produit cartésien : $E \times F = \{(x, y) : x \in E,\ y \in F\}$.</p></div>
<div class="def"><b>Injectivité, surjectivité</b><p>$f : E \to F$ est <b>injective</b> si $\forall x, x' \in E,\ f(x) = f(x') \Rightarrow x = x'$ ; <b>surjective</b> si $\forall y \in F,\ \exists x \in E,\ f(x) = y$ ; <b>bijective</b> si les deux, c'est-à-dire si tout $y \in F$ a un unique antécédent.</p></div>
<div class="ex-box"><b>Exemple</b><p>$x \mapsto x^2$ de $\mathbb R$ dans $\mathbb R$ n'est ni injective ($f(-1) = f(1)$) ni surjective ($-1$ n'a pas d'antécédent). De $\mathbb R_+$ dans $\mathbb R_+$, elle est bijective, de réciproque $\sqrt{\cdot}$.</p></div>
<div class="prop"><b>Composition</b><p>La composée de deux injections (resp. surjections, bijections) est une injection (resp. …). Si $g \circ f$ est injective, $f$ l'est ; si $g \circ f$ est surjective, $g$ l'est.</p></div>
<div class="def"><b>Images</b><p>$f(A) = \{f(x) : x \in A\}$ et $f^{-1}(B) = \{x \in E : f(x) \in B\}$ (définie même si $f$ n'est pas bijective).</p></div>
<div class="prop"><b>Dénombrement (finis)</b><p>Si $|E| = p$ et $|F| = n$ : il y a $n^p$ applications de $E$ dans $F$, et $n(n-1)\cdots(n - p + 1)$ injections (si $p \leq n$).</p></div>`,
      retenir: [r`$|\mathcal P(E)| = 2^{|E|}$.`, r`Injective : au plus un antécédent ; surjective : au moins un.`, r`$|F|^{|E|}$ applications de $E$ dans $F$.`],
      exos: [
        { q: r`Un ensemble $E$ a $5$ éléments. Combien $\mathcal P(E)$ a-t-il d'éléments ?`, type: 'num', rep: 32, corr: r`$2^5 = 32$ (chaque élément est dans la partie ou non).` },
        { q: r`Combien y a-t-il d'applications d'un ensemble à $3$ éléments dans un ensemble à $4$ éléments ?`, type: 'num', rep: 64, corr: r`Chacun des $3$ éléments a $4$ images possibles : $4^3 = 64$.` },
        { q: r`Combien d'entre elles sont injectives ?`, type: 'num', rep: 24, corr: r`Images deux à deux distinctes : $4 \times 3 \times 2 = 24$.` }
      ]
    },
    {
      id: 'mpsi-sommes', titre: 'Sommes, produits et binôme de Newton', domaine: 'Calculs',
      resume: 'Manipuler Σ, télescopage, sommes usuelles et formule du binôme.',
      yt: 'somme télescopique binôme de newton MPSI',
      cours: r`
<h3>Sommes usuelles</h3>
$$\sum_{k=1}^{n} k = \frac{n(n+1)}{2} \qquad \sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6} \qquad \sum_{k=1}^{n} k^3 = \left(\frac{n(n+1)}{2}\right)^2$$
<div class="prop"><b>Télescopage</b><p>$\displaystyle\sum_{k=1}^{n}(a_{k+1} - a_k) = a_{n+1} - a_1$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$\dfrac{1}{k(k+1)} = \dfrac1k - \dfrac{1}{k+1}$, donc $\displaystyle\sum_{k=1}^{n}\frac{1}{k(k+1)} = 1 - \frac{1}{n+1}$.</p></div>
<div class="prop"><b>Changement d'indice</b><p>$\displaystyle\sum_{k=0}^{n} a_{n-k} = \sum_{j=0}^{n} a_j$ ($j = n - k$). C'est ainsi que Gauss calcule $1 + \cdots + n$ : $2S = \sum_{k=1}^{n}\big(k + (n + 1 - k)\big) = n(n+1)$.</p></div>
<div class="prop"><b>Binôme de Newton</b><p>Pour $a, b$ complexes (ou dans un anneau où $ab = ba$) : $$(a + b)^n = \sum_{k=0}^{n}\binom nk a^k b^{n-k}.$$</p></div>
<div class="ex-box"><b>Conséquences</b><p>$\displaystyle\sum_{k=0}^{n}\binom nk = 2^n$, &nbsp; $\displaystyle\sum_{k=0}^{n}(-1)^k\binom nk = 0$ ($n \geq 1$), &nbsp; $\displaystyle\sum_{k=0}^{n}\binom nk 2^k = 3^n$.</p></div>
<div class="prop"><b>Factorisation de $a^n - b^n$</b><p>$a^n - b^n = (a - b)\displaystyle\sum_{k=0}^{n-1}a^k b^{n-1-k}$.</p></div>
<div class="def"><b>Sommes doubles</b><p>$\displaystyle\sum_{1 \leq i \leq j \leq n} a_{ij} = \sum_{j=1}^{n}\sum_{i=1}^{j} a_{ij} = \sum_{i=1}^{n}\sum_{j=i}^{n} a_{ij}$ (interversion sur un domaine triangulaire).</p></div>`,
      retenir: [r`$\sum k$, $\sum k^2$, $\sum k^3$ par cœur.`, r`Télescopage : $\sum(a_{k+1} - a_k) = a_{n+1} - a_1$.`, r`$(a+b)^n = \sum\binom nk a^k b^{n-k}$.`],
      exos: [
        { q: r`Calcule $\displaystyle\sum_{k=1}^{10} k^2$.`, type: 'num', rep: 385, corr: r`$\dfrac{10 \times 11 \times 21}{6} = 385$.` },
        { q: r`Calcule $\displaystyle\sum_{k=1}^{99}\frac{1}{k(k+1)}$.`, type: 'num', rep: 0.99, corr: r`Télescopage : $1 - \dfrac{1}{100} = 0{,}99$.` },
        { q: r`Calcule $\displaystyle\sum_{k=0}^{5}\binom 5k 2^k$.`, type: 'num', rep: 243, corr: r`Binôme avec $a = 2$, $b = 1$ : $(2 + 1)^5 = 3^5 = 243$.` }
      ]
    },
    {
      id: 'mpsi-complexes', titre: 'Nombres complexes', domaine: 'Algèbre',
      resume: 'Module, argument, forme exponentielle, formules d\'Euler et de Moivre, racines n-ièmes.',
      yt: 'nombres complexes forme exponentielle racines n-ièmes cours',
      cours: r`
<div class="def"><b>Forme algébrique</b><p>$z = a + ib$, $\bar z = a - ib$, $|z| = \sqrt{a^2 + b^2} = \sqrt{z\bar z}$. On a $|zz'| = |z||z'|$ et l'inégalité triangulaire $|z + z'| \leq |z| + |z'|$.</p></div>
<div class="def"><b>Forme exponentielle</b><p>Tout $z \neq 0$ s'écrit $z = re^{i\theta}$ avec $r = |z| \gt 0$ et $\theta \equiv \arg z\ [2\pi]$, où $e^{i\theta} = \cos\theta + i\sin\theta$. Et $e^{i\theta}e^{i\theta'} = e^{i(\theta + \theta')}$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$1 + i\sqrt3 = 2\left(\dfrac12 + i\dfrac{\sqrt3}{2}\right) = 2e^{i\pi/3}$. Et $1 + i = \sqrt2 e^{i\pi/4}$, donc $(1 + i)^8 = 16e^{2i\pi} = 16$.</p></div>
<div class="prop"><b>Euler et Moivre</b><p>$\cos\theta = \dfrac{e^{i\theta} + e^{-i\theta}}{2}$, $\sin\theta = \dfrac{e^{i\theta} - e^{-i\theta}}{2i}$, et $(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$.</p></div>
<div class="methode"><b>Technique de l'angle moitié</b><p>$e^{ia} + e^{ib} = e^{i\frac{a+b}{2}}\left(e^{i\frac{a-b}{2}} + e^{-i\frac{a-b}{2}}\right) = 2\cos\dfrac{a - b}{2}\,e^{i\frac{a+b}{2}}$.</p></div>
<div class="prop"><b>Racines $n$-ièmes de l'unité</b><p>Les solutions de $z^n = 1$ sont les $\omega_k = e^{2ik\pi/n}$, $0 \leq k \leq n - 1$. Leur somme est nulle pour $n \geq 2$ (somme géométrique de raison $\omega_1 \neq 1$).</p></div>`,
      retenir: [r`$z = re^{i\theta}$ ; $|zz'| = |z||z'|$, $\arg(zz') = \arg z + \arg z'$.`, r`Euler, Moivre, angle moitié.`, r`$z^n = 1 \iff z = e^{2ik\pi/n}$.`],
      exos: [
        { q: r`Calcule $|3 + 4i|$.`, type: 'num', rep: 5, corr: r`$\sqrt{9 + 16} = 5$.` },
        { q: r`Donne un argument de $1 + i\sqrt3$ dans $]-\pi\,;\pi]$ (une expression avec π, ou une valeur décimale).`, type: 'num', rep: Math.PI / 3, tol: 0.002, corr: r`$1 + i\sqrt3 = 2e^{i\pi/3}$ : un argument est $\dfrac\pi3$.` },
        { q: r`Calcule $(1 + i)^8$.`, type: 'num', rep: 16, corr: r`$1 + i = \sqrt2 e^{i\pi/4}$, donc $(1 + i)^8 = (\sqrt2)^8 e^{2i\pi} = 16$.` }
      ]
    },
    {
      id: 'mpsi-fonctions-usuelles', titre: 'Fonctions usuelles', domaine: 'Analyse',
      resume: 'Puissances réelles, fonctions hyperboliques et fonctions trigonométriques réciproques.',
      yt: 'arcsin arccos arctan fonctions hyperboliques cours',
      cours: r`
<div class="def"><b>Puissances réelles</b><p>Pour $x \gt 0$ et $a \in \mathbb R$ : $x^a = e^{a\ln x}$. Croissances comparées : pour $a, b \gt 0$, $\dfrac{(\ln x)^b}{x^a} \to 0$ et $\dfrac{x^a}{e^{bx}} \to 0$ en $+\infty$.</p></div>
<div class="def"><b>Fonctions hyperboliques</b><p>$\operatorname{ch} x = \dfrac{e^x + e^{-x}}{2}$, $\operatorname{sh} x = \dfrac{e^x - e^{-x}}{2}$, $\operatorname{th} x = \dfrac{\operatorname{sh} x}{\operatorname{ch} x}$. On a $\operatorname{ch}^2 - \operatorname{sh}^2 = 1$, $\operatorname{ch}' = \operatorname{sh}$, $\operatorname{sh}' = \operatorname{ch}$.</p></div>
<div class="def"><b>Réciproques circulaires</b><ul>
<li>$\arcsin : [-1, 1] \to [-\frac\pi2, \frac\pi2]$, réciproque de $\sin$ restreinte ; $\arcsin' (x) = \dfrac{1}{\sqrt{1 - x^2}}$ sur $]-1, 1[$.</li>
<li>$\arccos : [-1, 1] \to [0, \pi]$ ; $\arccos'(x) = -\dfrac{1}{\sqrt{1 - x^2}}$.</li>
<li>$\arctan : \mathbb R \to ]-\frac\pi2, \frac\pi2[$ ; $\arctan'(x) = \dfrac{1}{1 + x^2}$.</li></ul></div>
<div class="prop"><b>Relations</b><p>$\arcsin x + \arccos x = \dfrac\pi2$ sur $[-1, 1]$ ; &nbsp; $\arctan x + \arctan\dfrac1x = \dfrac\pi2$ pour $x \gt 0$ (et $-\dfrac\pi2$ pour $x \lt 0$).</p></div>
<div class="methode"><b>Démonstration de la seconde</b><p>$g(x) = \arctan x + \arctan\frac1x$ a pour dérivée $\dfrac{1}{1+x^2} - \dfrac{1}{x^2}\cdot\dfrac{1}{1 + 1/x^2} = 0$ sur $]0, +\infty[$ (intervalle), donc $g$ y est constante, égale à $g(1) = \dfrac\pi4 + \dfrac\pi4$.</p></div>
<div class="attention"><b>Piège</b><p>$\arcsin(\sin x) = x$ seulement si $x \in [-\frac\pi2, \frac\pi2]$ : $\arcsin(\sin\pi) = 0 \neq \pi$.</p></div>`,
      retenir: [r`$x^a = e^{a\ln x}$.`, r`$\operatorname{ch}^2 - \operatorname{sh}^2 = 1$.`, r`$\arctan' = \frac{1}{1 + x^2}$ ; $\arctan x + \arctan\frac1x = \frac\pi2$ ($x \gt 0$).`],
      exos: [
        { q: r`Calcule $\arcsin\dfrac12$ (valeur exacte comme π/6, ou décimale).`, type: 'num', rep: Math.PI / 6, tol: 0.002, corr: r`$\sin\dfrac\pi6 = \dfrac12$ et $\dfrac\pi6 \in \left[-\dfrac\pi2, \dfrac\pi2\right]$, donc $\arcsin\dfrac12 = \dfrac\pi6$.` },
        { q: r`Calcule $\operatorname{ch}^2(3) - \operatorname{sh}^2(3)$.`, type: 'num', rep: 1, corr: r`Pour tout $x$, $\operatorname{ch}^2 x - \operatorname{sh}^2 x = \dfrac{(e^x + e^{-x})^2 - (e^x - e^{-x})^2}{4} = \dfrac{4}{4} = 1$.` },
        { q: r`Calcule $\arctan 2 + \arctan\dfrac12$ (valeur exacte ou décimale).`, type: 'num', rep: Math.PI / 2, tol: 0.002, corr: r`Pour $x \gt 0$, $\arctan x + \arctan\dfrac1x = \dfrac\pi2$.` }
      ]
    },
    {
      id: 'mpsi-suites', titre: 'Suites réelles', domaine: 'Analyse',
      resume: 'Définition formelle de la limite, suites monotones, adjacentes, extraites, récurrentes.',
      yt: 'suites réelles limite epsilon suites adjacentes MPSI',
      cours: r`
<div class="def"><b>Limite</b><p>$u_n \to \ell \iff \forall \varepsilon \gt 0,\ \exists N \in \mathbb N,\ \forall n \geq N,\ |u_n - \ell| \leq \varepsilon$. La limite, si elle existe, est unique.</p></div>
<div class="methode"><b>Démonstration de l'unicité</b><p>Si $u_n \to \ell$ et $u_n \to \ell'$ avec $\ell \neq \ell'$, on prend $\varepsilon = \dfrac{|\ell - \ell'|}{3}$ : pour $n$ assez grand, $|\ell - \ell'| \leq |\ell - u_n| + |u_n - \ell'| \leq \dfrac23|\ell - \ell'|$, absurde.</p></div>
<div class="prop"><b>Théorèmes d'existence</b><ul><li><b>Limite monotone</b> : toute suite croissante majorée converge (vers sa borne supérieure).</li><li><b>Suites adjacentes</b> : si $(u_n)$ croît, $(v_n)$ décroît et $v_n - u_n \to 0$, elles convergent vers la même limite.</li><li><b>Bolzano-Weierstrass</b> : toute suite réelle bornée admet une sous-suite convergente.</li></ul></div>
<div class="ex-box"><b>Exemple</b><p>$u_n = \displaystyle\sum_{k=0}^{n}\frac{1}{k!}$ et $v_n = u_n + \dfrac{1}{n \cdot n!}$ sont adjacentes : elles convergent vers $e$.</p><p>On a aussi $\left(1 + \dfrac1n\right)^n = e^{n\ln(1 + 1/n)} \to e$ car $n\ln\left(1 + \frac1n\right) \to 1$.</p></div>
<div class="methode"><b>Suites $u_{n+1} = f(u_n)$</b><p>Si $f$ est continue et $(u_n)$ converge vers $\ell$, alors $\ell = f(\ell)$ : on cherche les points fixes. Ex. : $u_0 = 0$, $u_{n+1} = \sqrt{2 + u_n}$ est croissante, majorée par $2$ (récurrence), donc converge vers $\ell \geq 0$ avec $\ell = \sqrt{2 + \ell}$, soit $\ell = 2$.</p></div>`,
      retenir: [r`Définition en $\varepsilon$-$N$ à savoir écrire et nier.`, r`Monotone bornée, adjacentes, Bolzano-Weierstrass.`, r`Récurrente : la limite est un point fixe de $f$ continue.`],
      exos: [
        { q: r`Donne la limite de $\left(1 + \dfrac1n\right)^n$ (valeur exacte comme e, ou au millième).`, type: 'num', rep: Math.E, tol: 0.0006, corr: r`$\left(1 + \frac1n\right)^n = \exp\big(n\ln(1 + \frac1n)\big)$ et $n\ln(1 + \frac1n) \to 1$, d'où la limite $e \approx 2{,}718$.` },
        { q: r`$u_0 = 0$ et $u_{n+1} = \sqrt{2 + u_n}$. Vers quelle limite converge $(u_n)$ ?`, type: 'num', rep: 2, corr: r`$(u_n)$ est croissante, majorée par $2$, donc converge vers $\ell \geq 0$ tel que $\ell = \sqrt{2 + \ell}$, soit $\ell^2 - \ell - 2 = 0$, d'où $\ell = 2$.` },
        { q: r`Deux suites $(u_n)$ croissante et $(v_n)$ décroissante telles que $v_n - u_n \to 0$ :`, type: 'qcm', choix: [r`convergent vers la même limite`, r`convergent vers des limites différentes`, r`peuvent diverger`, r`sont constantes`], rep: 0, corr: r`C'est le théorème des suites adjacentes. De plus $u_n \leq \ell \leq v_n$ pour tout $n$.` }
      ]
    },
    {
      id: 'mpsi-limites-continuite', titre: 'Limites et continuité', domaine: 'Analyse',
      resume: 'Définitions en ε-η, caractérisation séquentielle, TVI et théorème des bornes atteintes.',
      yt: 'continuité théorème des bornes atteintes cours MPSI',
      cours: r`
<div class="def"><b>Limite en un point</b><p>$\displaystyle\lim_{x \to a} f(x) = \ell \iff \forall \varepsilon \gt 0,\ \exists \eta \gt 0,\ \forall x \in D,\ |x - a| \leq \eta \Rightarrow |f(x) - \ell| \leq \varepsilon$.</p></div>
<div class="prop"><b>Caractérisation séquentielle</b><p>$f(x) \to \ell$ quand $x \to a$ si et seulement si pour toute suite $(x_n)$ de $D$ tendant vers $a$, $f(x_n) \to \ell$. Très utile pour montrer qu'une limite <b>n'existe pas</b> : $\sin\dfrac1x$ n'a pas de limite en $0$ (prendre $x_n = \frac{1}{n\pi}$ puis $x_n = \frac{1}{2n\pi + \pi/2}$).</p></div>
<div class="ex-box"><b>Limites classiques</b><p>$\dfrac{\sin x}{x} \to 1$, &nbsp; $\dfrac{1 - \cos x}{x^2} \to \dfrac12$, &nbsp; $\dfrac{\ln(1 + x)}{x} \to 1$, &nbsp; $\dfrac{e^x - 1}{x} \to 1$ en $0$.</p></div>
<div class="prop"><b>Grands théorèmes</b><ul><li><b>TVI</b> : l'image d'un intervalle par une fonction continue est un intervalle.</li><li><b>Bornes atteintes</b> : une fonction continue sur un segment $[a, b]$ est bornée et atteint ses bornes. L'image d'un segment est un segment.</li><li><b>Bijection</b> : une fonction continue strictement monotone sur un intervalle $I$ réalise une bijection de $I$ sur $f(I)$, de réciproque continue.</li></ul></div>
<div class="ex-box"><b>Application</b><p>Montrons que $x^{1/x} \to 1$ en $+\infty$ : $x^{1/x} = e^{\ln x / x}$ et $\dfrac{\ln x}{x} \to 0$, donc par continuité de $\exp$ en $0$, $x^{1/x} \to 1$.</p></div>`,
      retenir: [r`Définition $\varepsilon$-$\eta$ et caractérisation séquentielle.`, r`Continue sur un segment $\Rightarrow$ bornée, bornes atteintes.`, r`$\frac{1 - \cos x}{x^2} \to \frac12$.`],
      exos: [
        { q: r`Calcule $\displaystyle\lim_{x \to 0}\frac{1 - \cos x}{x^2}$.`, type: 'num', rep: 0.5, corr: r`$1 - \cos x = 2\sin^2\frac x2$, donc $\dfrac{1 - \cos x}{x^2} = \dfrac12\left(\dfrac{\sin(x/2)}{x/2}\right)^2 \to \dfrac12$.` },
        { q: r`Calcule $\displaystyle\lim_{x \to +\infty} x^{1/x}$.`, type: 'num', rep: 1, corr: r`$x^{1/x} = e^{\ln x/x}$ et $\dfrac{\ln x}{x} \to 0$, donc la limite vaut $e^0 = 1$.` },
        { q: r`Une fonction continue sur un segment $[a, b]$ :`, type: 'qcm', choix: [r`est bornée et atteint ses bornes`, r`est monotone`, r`est dérivable`, r`est bornée mais n'atteint pas forcément ses bornes`], rep: 0, corr: r`Théorème des bornes atteintes (Weierstrass). Elle n'est ni forcément monotone, ni forcément dérivable ($|x|$ sur $[-1, 1]$).` }
      ]
    },
    {
      id: 'mpsi-derivabilite', titre: 'Dérivabilité : Rolle et accroissements finis', domaine: 'Analyse',
      resume: 'Théorème de Rolle, égalité et inégalité des accroissements finis, formule de Leibniz.',
      yt: 'théorème de rolle accroissements finis démonstration',
      cours: r`
<div class="prop"><b>Extremum local</b><p>Si $f$ est dérivable en un point $a$ <b>intérieur</b> à $I$ où elle admet un extremum local, alors $f'(a) = 0$.</p></div>
<div class="prop"><b>Théorème de Rolle</b><p>Si $f$ est continue sur $[a, b]$, dérivable sur $]a, b[$ et $f(a) = f(b)$, alors il existe $c \in ]a, b[$ tel que $f'(c) = 0$.</p></div>
<div class="methode"><b>Démonstration</b><p>$f$ est continue sur le segment, donc atteint un maximum $M$ et un minimum $m$. Si $m = M$, $f$ est constante. Sinon, l'un des deux est atteint en un point $c$ de $]a, b[$ (puisque $f(a) = f(b)$), où $f'(c) = 0$.</p></div>
<div class="prop"><b>Accroissements finis</b><p><b>Égalité</b> : sous les hypothèses de continuité/dérivabilité, $\exists c \in ]a, b[$, $f(b) - f(a) = f'(c)(b - a)$ (appliquer Rolle à $f$ moins la corde).</p><p><b>Inégalité</b> : si $|f'| \leq k$ sur $I$, alors $|f(x) - f(y)| \leq k|x - y|$ : $f$ est $k$-lipschitzienne.</p></div>
<div class="ex-box"><b>Exemple</b><p>$|\sin x - \sin y| \leq |x - y|$ car $|\cos| \leq 1$. Et pour $f(x) = x^2$ sur $[1, 3]$ : $\dfrac{9 - 1}{3 - 1} = 4 = 2c$, donc $c = 2$.</p></div>
<div class="prop"><b>Formule de Leibniz</b><p>$(fg)^{(n)} = \displaystyle\sum_{k=0}^{n}\binom nk f^{(k)}g^{(n-k)}$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$(x^2e^x)^{(n)} = e^x\big(x^2 + 2nx + n(n-1)\big)$, car seules les dérivées d'ordre $0, 1, 2$ de $x^2$ sont non nulles.</p></div>`,
      retenir: [r`Rolle : $f(a) = f(b) \Rightarrow \exists c,\ f'(c) = 0$.`, r`TAF : $f(b) - f(a) = f'(c)(b - a)$.`, r`IAF : $|f'| \leq k \Rightarrow f$ $k$-lipschitzienne.`],
      exos: [
        { q: r`Pour $f(x) = x^2$ sur $[1, 3]$, quel réel $c$ donne l'égalité des accroissements finis ?`, type: 'num', rep: 2, corr: r`$\dfrac{f(3) - f(1)}{3 - 1} = 4 = f'(c) = 2c$, donc $c = 2$.` },
        { q: r`Soit $g(x) = x^2 e^x$. Calcule $g^{(3)}(0)$.`, type: 'num', rep: 6, corr: r`Leibniz : $g^{(n)}(x) = e^x\big(x^2 + 2nx + n(n-1)\big)$, donc $g^{(3)}(0) = 3 \times 2 = 6$.` },
        { q: r`Laquelle de ces hypothèses ne fait PAS partie du théorème de Rolle ?`, type: 'qcm', choix: [r`$f'$ est continue sur $[a, b]$`, r`$f$ est continue sur $[a, b]$`, r`$f$ est dérivable sur $]a, b[$`, r`$f(a) = f(b)$`], rep: 0, corr: r`Rolle ne demande pas que $f$ soit de classe $\mathcal C^1$ : continuité sur le segment, dérivabilité sur l'ouvert, et $f(a) = f(b)$ suffisent.` }
      ]
    },
    {
      id: 'mpsi-dl', titre: 'Développements limités', domaine: 'Analyse',
      resume: 'Taylor-Young, DL usuels, opérations sur les DL et calculs de limites.',
      yt: 'développements limités cours méthode',
      cours: r`
<div class="def"><b>Définition</b><p>$f$ admet un DL à l'ordre $n$ en $0$ s'il existe des réels $a_0, \ldots, a_n$ tels que $f(x) = a_0 + a_1x + \cdots + a_nx^n + o(x^n)$. S'il existe, il est unique.</p></div>
<div class="prop"><b>Taylor-Young</b><p>Si $f$ est de classe $\mathcal C^n$ au voisinage de $0$ : $f(x) = \displaystyle\sum_{k=0}^{n}\frac{f^{(k)}(0)}{k!}x^k + o(x^n)$.</p></div>
<div class="prop"><b>DL usuels en $0$</b>
$$e^x = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + o(x^3) \qquad \ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} + o(x^3)$$
$$\sin x = x - \frac{x^3}{6} + o(x^4) \qquad \cos x = 1 - \frac{x^2}{2} + \frac{x^4}{24} + o(x^5)$$
$$(1 + x)^\alpha = 1 + \alpha x + \frac{\alpha(\alpha - 1)}{2}x^2 + o(x^2)$$
$$\frac{1}{1 - x} = 1 + x + x^2 + \cdots + x^n + o(x^n)$$</div>
<div class="methode"><b>Opérations</b><p>Somme, produit (on tronque), composition (la fonction intérieure doit tendre vers $0$), primitivation terme à terme.</p></div>
<div class="ex-box"><b>Exemple : produit</b><p>$e^x \sin x = \left(1 + x + \frac{x^2}{2}\right)\left(x - \frac{x^3}{6}\right) + o(x^3) = x + x^2 + \frac{x^3}{2} - \frac{x^3}{6} + o(x^3) = x + x^2 + \frac{x^3}{3} + o(x^3)$.</p></div>
<div class="ex-box"><b>Exemple : limite</b><p>$\dfrac{\sin x - x}{x^3} = \dfrac{-x^3/6 + o(x^3)}{x^3} \to -\dfrac16$.</p></div>`,
      retenir: [r`Taylor-Young : coefficients $\frac{f^{(k)}(0)}{k!}$.`, r`Connaître les DL usuels parfaitement.`, r`Pour une limite : DL au premier ordre non nul.`],
      exos: [
        { q: r`Quel est le coefficient de $x^3$ dans le DL à l'ordre $3$ en $0$ de $e^x \sin x$ ? (fraction ou décimal)`, type: 'num', rep: 1 / 3, tol: 0.002, corr: r`$\left(1 + x + \frac{x^2}{2}\right)\left(x - \frac{x^3}{6}\right) = x + x^2 + \left(\frac12 - \frac16\right)x^3 + o(x^3)$ : coefficient $\dfrac13$.` },
        { q: r`Calcule $\displaystyle\lim_{x \to 0}\frac{\sin x - x}{x^3}$ (fraction ou décimal).`, type: 'num', rep: -1 / 6, tol: 0.002, corr: r`$\sin x - x = -\dfrac{x^3}{6} + o(x^3)$, d'où la limite $-\dfrac16$.` },
        { q: r`Calcule $\displaystyle\lim_{x \to 0}\frac{e^x - 1 - x}{x^2}$.`, type: 'num', rep: 0.5, corr: r`$e^x - 1 - x = \dfrac{x^2}{2} + o(x^2)$, d'où la limite $\dfrac12$.` }
      ]
    },
    {
      id: 'mpsi-integration', titre: 'Intégration', domaine: 'Analyse',
      resume: 'Intégration par parties, changement de variable et sommes de Riemann.',
      yt: 'sommes de riemann intégration par parties changement de variable',
      cours: r`
<div class="prop"><b>Théorème fondamental</b><p>Si $f$ est continue sur $I$ et $a \in I$, alors $F : x \mapsto \displaystyle\int_a^x f(t)\,\mathrm dt$ est l'unique primitive de $f$ s'annulant en $a$ ; en particulier $F' = f$.</p></div>
<div class="prop"><b>Intégration par parties</b><p>Pour $u, v$ de classe $\mathcal C^1$ : $\displaystyle\int_a^b u'v = \big[uv\big]_a^b - \int_a^b uv'$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$\displaystyle\int_0^{\pi/2} x\cos x\,\mathrm dx = \big[x\sin x\big]_0^{\pi/2} - \int_0^{\pi/2}\sin x\,\mathrm dx = \frac\pi2 - 1$.</p></div>
<div class="prop"><b>Changement de variable</b><p>Si $\varphi$ est $\mathcal C^1$ sur $[\alpha, \beta]$ et $f$ continue : $\displaystyle\int_{\alpha}^{\beta} f(\varphi(t))\varphi'(t)\,\mathrm dt = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(x)\,\mathrm dx$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$\displaystyle\int_0^1\sqrt{1 - x^2}\,\mathrm dx$ avec $x = \sin t$ : $\displaystyle\int_0^{\pi/2}\cos^2 t\,\mathrm dt = \frac\pi4$ (quart de disque unité).</p></div>
<div class="prop"><b>Sommes de Riemann</b><p>Si $f$ est continue sur $[0, 1]$ : $\displaystyle\frac1n\sum_{k=1}^{n} f\left(\frac kn\right) \xrightarrow[n \to \infty]{} \int_0^1 f(x)\,\mathrm dx$.</p></div>
<div class="ex-box"><b>Exemples</b><p>$\displaystyle\frac{1}{n}\sum_{k=1}^{n}\left(\frac kn\right)^2 \to \int_0^1 x^2\,\mathrm dx = \frac13$. &nbsp; $\displaystyle\sum_{k=1}^{n}\frac{n}{n^2 + k^2} = \frac1n\sum_{k=1}^{n}\frac{1}{1 + (k/n)^2} \to \int_0^1\frac{\mathrm dx}{1 + x^2} = \frac\pi4$.</p></div>`,
      retenir: [r`$\left(\int_a^x f\right)' = f$ pour $f$ continue.`, r`IPP et changement de variable : vérifier les hypothèses $\mathcal C^1$.`, r`Riemann : $\frac1n\sum f(\frac kn) \to \int_0^1 f$.`],
      exos: [
        { q: r`Calcule $\displaystyle\int_0^{\pi/2} x\cos x\,\mathrm dx$ (valeur exacte comme π/2-1, ou au millième).`, type: 'num', rep: Math.PI / 2 - 1, tol: 0.0006, corr: r`IPP : $\big[x\sin x\big]_0^{\pi/2} - \displaystyle\int_0^{\pi/2}\sin x\,\mathrm dx = \dfrac\pi2 - 1 \approx 0{,}571$.` },
        { q: r`Calcule $\displaystyle\lim_{n \to \infty}\frac1n\sum_{k=1}^{n}\left(\frac kn\right)^2$ (fraction ou décimal).`, type: 'num', rep: 1 / 3, tol: 0.002, corr: r`Somme de Riemann de $x \mapsto x^2$ sur $[0, 1]$ : $\displaystyle\int_0^1 x^2\,\mathrm dx = \dfrac13$.` },
        { q: r`Calcule $\displaystyle\int_0^1\frac{\mathrm dx}{1 + x^2}$ (valeur exacte comme π/4, ou au millième).`, type: 'num', rep: Math.PI / 4, tol: 0.0006, corr: r`$\big[\arctan x\big]_0^1 = \dfrac\pi4$.` }
      ]
    },
    {
      id: 'mpsi-arithmetique', titre: 'Arithmétique dans ℤ', domaine: 'Algèbre',
      resume: 'Divisibilité, PGCD, Bézout, Gauss, nombres premiers et congruences.',
      yt: 'arithmétique bézout gauss congruences cours',
      cours: r`
<div class="prop"><b>Division euclidienne</b><p>Pour $a \in \mathbb Z$ et $b \in \mathbb N^*$, il existe un unique couple $(q, r)$ tel que $a = bq + r$ et $0 \leq r \lt b$.</p></div>
<div class="prop"><b>PGCD et Euclide</b><p>$a \wedge b = b \wedge r$. Ex. : $1071 = 2 \times 462 + 147$, $462 = 3 \times 147 + 21$, $147 = 7 \times 21$. Donc $1071 \wedge 462 = 21$.</p></div>
<div class="prop"><b>Bézout</b><p>Il existe $u, v \in \mathbb Z$ tels que $au + bv = a \wedge b$. Et $a \wedge b = 1 \iff \exists u, v,\ au + bv = 1$. On trouve $(u, v)$ en « remontant » l'algorithme d'Euclide.</p></div>
<div class="prop"><b>Gauss</b><p>Si $a \mid bc$ et $a \wedge b = 1$, alors $a \mid c$. Conséquence : si $p$ premier divise $bc$, alors $p \mid b$ ou $p \mid c$.</p></div>
<div class="def"><b>Congruences</b><p>$a \equiv b\ [n] \iff n \mid a - b$. Compatible avec $+$ et $\times$ (et donc les puissances).</p></div>
<div class="ex-box"><b>Exemples</b><p>Inverse de $5$ modulo $17$ : $5 \times 7 = 35 = 2 \times 17 + 1$, donc $5 \times 7 \equiv 1\ [17]$.</p><p>$2^{100}$ modulo $7$ : $2^3 = 8 \equiv 1$, donc $2^{99} = (2^3)^{33} \equiv 1$ et $2^{100} \equiv 2\ [7]$.</p></div>
<div class="prop"><b>Petit théorème de Fermat</b><p>Si $p$ est premier et $p \nmid a$, alors $a^{p-1} \equiv 1\ [p]$.</p></div>`,
      retenir: [r`Euclide : $a \wedge b = b \wedge r$.`, r`Bézout : $a \wedge b = 1 \iff au + bv = 1$.`, r`Gauss, congruences, Fermat.`],
      exos: [
        { q: r`Calcule $1071 \wedge 462$.`, type: 'num', rep: 21, corr: r`$1071 = 2 \times 462 + 147$, $462 = 3 \times 147 + 21$, $147 = 7 \times 21 + 0$. Le PGCD est $21$.` },
        { q: r`Quel est l'inverse de $5$ modulo $17$ (entre $1$ et $16$) ?`, type: 'num', rep: 7, corr: r`$5 \times 7 = 35 = 2 \times 17 + 1 \equiv 1\ [17]$.` },
        { q: r`Quel est le reste de la division euclidienne de $2^{100}$ par $7$ ?`, type: 'num', rep: 2, corr: r`$2^3 \equiv 1\ [7]$, $100 = 3 \times 33 + 1$, donc $2^{100} \equiv 2\ [7]$.` }
      ]
    },
    {
      id: 'mpsi-polynomes', titre: 'Polynômes', domaine: 'Algèbre',
      resume: 'Degré, division euclidienne, racines et multiplicité, relations coefficients-racines.',
      yt: 'polynômes racines multiplicité relations coefficients racines cours',
      cours: r`
<div class="def"><b>Degré</b><p>$\deg(PQ) = \deg P + \deg Q$ et $\deg(P + Q) \leq \max(\deg P, \deg Q)$, avec la convention $\deg 0 = -\infty$.</p></div>
<div class="prop"><b>Division euclidienne</b><p>Pour $B \neq 0$, il existe un unique couple $(Q, R)$ avec $A = BQ + R$ et $\deg R \lt \deg B$. Le reste de la division de $P$ par $X - a$ est $P(a)$.</p></div>
<div class="def"><b>Racines et multiplicité</b><p>$a$ est racine de $P$ $\iff (X - a) \mid P$. Elle est de multiplicité $m$ si $(X - a)^m \mid P$ mais pas $(X - a)^{m+1}$, ce qui équivaut à $P(a) = P'(a) = \cdots = P^{(m-1)}(a) = 0$ et $P^{(m)}(a) \neq 0$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$P = X^3 - 3X + 2$ : $P(1) = 0$, $P' = 3X^2 - 3$ et $P'(1) = 0$, $P''(1) = 6 \neq 0$. Donc $1$ est racine double : $P = (X - 1)^2(X + 2)$.</p></div>
<div class="prop"><b>Factorisation</b><p>Un polynôme de degré $n$ a au plus $n$ racines. Dans $\mathbb C$, tout polynôme non constant est scindé (d'Alembert-Gauss). Dans $\mathbb R$, les irréductibles sont les polynômes de degré $1$ et ceux de degré $2$ à discriminant négatif.</p></div>
<div class="prop"><b>Relations coefficients-racines</b><p>Si $P = a_nX^n + a_{n-1}X^{n-1} + \cdots + a_0$ est scindé de racines $x_1, \ldots, x_n$ : $\sigma_1 = \sum x_i = -\dfrac{a_{n-1}}{a_n}$ et $\sigma_n = \prod x_i = (-1)^n\dfrac{a_0}{a_n}$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$X^3 - 6X^2 + 11X - 6 = (X - 1)(X - 2)(X - 3)$ : somme des racines $6$, produit $6$.</p></div>`,
      retenir: [r`Reste de $P$ par $X - a$ : $P(a)$.`, r`Multiplicité : dérivées successives nulles en $a$.`, r`$\sum x_i = -\frac{a_{n-1}}{a_n}$, $\prod x_i = (-1)^n\frac{a_0}{a_n}$.`],
      exos: [
        { q: r`Quelle est la somme des racines (complexes, comptées avec multiplicité) de $X^3 - 6X^2 + 11X - 6$ ?`, type: 'num', rep: 6, corr: r`$\sigma_1 = -\dfrac{a_2}{a_3} = -\dfrac{-6}{1} = 6$ (les racines sont $1, 2, 3$).` },
        { q: r`Quel est le reste de la division euclidienne de $X^5$ par $X - 2$ ?`, type: 'num', rep: 32, corr: r`Le reste de $P$ par $X - a$ est $P(a)$ : $2^5 = 32$.` },
        { q: r`Quelle est la multiplicité de la racine $1$ dans $P = X^3 - 3X + 2$ ?`, type: 'num', rep: 2, corr: r`$P(1) = 0$, $P'(1) = 3 - 3 = 0$, $P''(1) = 6 \neq 0$ : multiplicité $2$, et $P = (X - 1)^2(X + 2)$.` }
      ]
    }
  ]);
})();
