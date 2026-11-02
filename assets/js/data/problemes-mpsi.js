/* Problèmes longs de MPSI : un par leçon, à questions enchaînées. Étoiles : ★★ difficile, ★★★ très difficile. */
(function () {
  var r = String.raw;
  addProblemes('mpsi', {
    'mpsi-logique': { titre: 'Quantificateurs et contraposées', etoiles: 2,
      enonce: r`<p>Manipuler proprement les quantificateurs et les implications.</p>`,
      questions: [
        { q: r`Quelle est la négation de « $\forall x \in \mathbb{R},\ \exists y \in \mathbb{R},\ y \gt x^2$ » ?`, type: 'qcm', choix: [r`$\exists x \in \mathbb{R},\ \forall y \in \mathbb{R},\ y \leqslant x^2$`, r`$\forall x \in \mathbb{R},\ \forall y \in \mathbb{R},\ y \leqslant x^2$`, r`$\exists x \in \mathbb{R},\ \exists y \in \mathbb{R},\ y \lt x^2$`, r`$\exists x \in \mathbb{R},\ \forall y \in \mathbb{R},\ y \lt x^2$`], rep: 0, corr: r`On échange $\forall$ et $\exists$ et on nie la propriété finale : $\neg(y \gt x^2) \iff y \leqslant x^2$.` },
        { q: r`Quelle est la contraposée de « si $n^2$ est pair, alors $n$ est pair » ?`, type: 'qcm', choix: [r`Si $n$ est impair, alors $n^2$ est impair`, r`Si $n$ est pair, alors $n^2$ est pair`, r`Si $n^2$ est impair, alors $n$ est impair`, r`$n$ est pair et $n^2$ est impair`], rep: 0, corr: r`La contraposée de $P \Rightarrow Q$ est $\neg Q \Rightarrow \neg P$. Elle se démontre facilement : $(2k + 1)^2 = 2(2k^2 + 2k) + 1$.` },
        { q: r`Dans la table de vérité de $P \Rightarrow Q$ (4 lignes), combien de lignes valent « vrai » ?`, type: 'num', rep: 3, corr: r`$P \Rightarrow Q$ n'est faux que si $P$ est vrai et $Q$ faux.` },
        { q: r`On démontre que $n^2 + n$ est toujours pair. Que vaut $\dfrac{n^2 + n}{2}$ pour $n = 20$ ?`, type: 'num', rep: 210, corr: r`$n^2 + n = n(n + 1)$ est le produit de deux entiers consécutifs, donc pair. Pour $n = 20$ : $\dfrac{420}{2} = 210$.` }
      ] },
    'mpsi-ensembles': { titre: 'Compter les applications', etoiles: 3,
      enonce: r`<p>$E$ et $F$ désignent des ensembles finis.</p>`,
      questions: [
        { q: r`Combien d'éléments a $\mathcal{P}(\{1, 2, 3, 4\})$ ?`, type: 'num', rep: 16, corr: r`$2^4 = 16$ parties.` },
        { q: r`Combien d'applications d'un ensemble à $3$ éléments vers un ensemble à $4$ éléments ?`, type: 'num', rep: 64, corr: r`Chaque élément de départ a $4$ images possibles : $4^3 = 64$.` },
        { q: r`Combien d'entre elles sont injectives ?`, type: 'num', rep: 24, corr: r`Images distinctes : $4 \times 3 \times 2 = 24$.` },
        { q: r`Combien de surjections de $\{1, 2, 3, 4\}$ sur $\{a, b\}$ ?`, type: 'num', rep: 14, corr: r`Toutes les applications ($2^4 = 16$) sauf les deux constantes : $14$.` },
        { q: r`L'application $x \mapsto x^2$ de $\mathbb{R}$ dans $\mathbb{R}$ est…`, type: 'qcm', choix: [r`ni injective ni surjective`, r`injective mais pas surjective`, r`surjective mais pas injective`, r`bijective`], rep: 0, corr: r`$(-1)^2 = 1^2$ : pas injective. $-1$ n'a pas d'antécédent : pas surjective.` }
      ] },
    'mpsi-sommes': { titre: 'Sommes classiques et télescopage', etoiles: 2,
      enonce: r`<p>Calcule ces sommes sans les écrire terme à terme.</p>`,
      questions: [
        { q: r`Calcule $\displaystyle\sum_{k=1}^{20} k$.`, type: 'num', rep: 210, corr: r`$\dfrac{20 \times 21}{2} = 210$.` },
        { q: r`Calcule $\displaystyle\sum_{k=0}^{10} \binom{10}{k}$.`, type: 'num', rep: 1024, corr: r`Binôme avec $a = b = 1$ : $2^{10} = 1\,024$.` },
        { q: r`Calcule $\displaystyle\sum_{k=1}^{10} k^2$.`, type: 'num', rep: 385, corr: r`$\dfrac{n(n + 1)(2n + 1)}{6} = \dfrac{10 \times 11 \times 21}{6} = 385$.` },
        { q: r`Calcule $\displaystyle\sum_{k=1}^{99} \dfrac{1}{k(k + 1)}$.`, type: 'num', rep: 0.99, corr: r`$\dfrac{1}{k(k + 1)} = \dfrac1k - \dfrac{1}{k + 1}$ : la somme télescope en $1 - \dfrac{1}{100} = 0{,}99$.` },
        { q: r`Quel est le coefficient de $x^3$ dans $(1 + 2x)^5$ ?`, type: 'num', rep: 80, corr: r`$\binom53 \times 2^3 = 10 \times 8 = 80$.` }
      ] },
    'mpsi-complexes': { titre: 'Modules, arguments et racines de l\'unité', etoiles: 3,
      enonce: r`<p>Travaille de préférence sous forme exponentielle.</p>`,
      questions: [
        { q: r`Calcule $|3 + 4i|$.`, type: 'num', rep: 5, corr: r`$\sqrt{9 + 16} = 5$.` },
        { q: r`Calcule $(1 + i)^8$.`, type: 'num', rep: 16, corr: r`$1 + i = \sqrt2\,e^{i\pi/4}$, donc $(1 + i)^8 = 16\,e^{2i\pi} = 16$.` },
        { q: r`Donne l'argument principal (dans $]-\pi\,;\,\pi]$) de $1 + i\sqrt3$.`, type: 'num', rep: Math.PI / 3, tol: 0.001, corr: r`$1 + i\sqrt3 = 2\left(\dfrac12 + i\dfrac{\sqrt3}{2}\right) = 2e^{i\pi/3}$.` },
        { q: r`Que vaut la somme des $5$ racines cinquièmes de l'unité ?`, type: 'num', rep: 0, corr: r`$\displaystyle\sum_{k=0}^{4} \omega^k = \dfrac{1 - \omega^5}{1 - \omega} = 0$ avec $\omega = e^{2i\pi/5} \neq 1$.` },
        { q: r`Quelle est la partie réelle de $\dfrac{1}{1 + i}$ ?`, type: 'num', rep: 0.5, corr: r`$\dfrac{1 - i}{(1 + i)(1 - i)} = \dfrac{1 - i}{2}$.` }
      ] },
    'mpsi-fonctions-usuelles': { titre: 'Arctangente et compagnie', etoiles: 2,
      enonce: r`<p>Valeurs exactes attendues (π/4, √3… acceptés).</p>`,
      questions: [
        { q: r`Calcule $\mathrm{ch}^2(x) - \mathrm{sh}^2(x)$.`, type: 'num', rep: 1, corr: r`$\dfrac{(e^x + e^{-x})^2 - (e^x - e^{-x})^2}{4} = \dfrac{4}{4} = 1$.` },
        { q: r`Calcule $\arctan 1 + \arctan\dfrac12 + \arctan\dfrac13$.`, type: 'num', rep: Math.PI / 2, tol: 0.001, corr: r`$\tan\left(\arctan\frac12 + \arctan\frac13\right) = \dfrac{1/2 + 1/3}{1 - 1/6} = 1$, et la somme est dans $]0\,;\,\pi/2[$, donc vaut $\dfrac{\pi}{4}$. Total : $\dfrac{\pi}{2}$.` },
        { q: r`Calcule $\lim\limits_{x \to 0} \dfrac{\sin x}{x}$.`, type: 'num', rep: 1, corr: r`C'est le nombre dérivé de $\sin$ en $0$ : $\cos 0 = 1$.` },
        { q: r`Calcule $\arcsin\left(\sin\dfrac{3\pi}{4}\right)$.`, type: 'num', rep: Math.PI / 4, tol: 0.001, corr: r`$\sin\dfrac{3\pi}{4} = \sin\dfrac{\pi}{4}$ et $\dfrac{\pi}{4} \in \left[-\dfrac{\pi}{2}\,;\,\dfrac{\pi}{2}\right]$ : $\dfrac{\pi}{4}$ (et non $\dfrac{3\pi}{4}$).` }
      ] },
    'mpsi-suites': { titre: 'La méthode de Héron', etoiles: 3,
      enonce: r`<p>On pose $u_0 = 1$ et $u_{n+1} = \dfrac12\left(u_n + \dfrac{2}{u_n}\right)$. Puis on étudie une suite récurrente linéaire d'ordre $2$.</p>`,
      questions: [
        { q: r`Calcule $u_1$.`, type: 'num', rep: 1.5, corr: r`$\dfrac12(1 + 2) = 1{,}5$.` },
        { q: r`Calcule $u_2$ (fraction ou au dix-millième).`, type: 'num', rep: 17 / 12, tol: 0.0001, corr: r`$\dfrac12\left(\dfrac32 + \dfrac43\right) = \dfrac{17}{12} \approx 1{,}4167$.` },
        { q: r`Vers quelle limite converge $(u_n)$ ? (valeur exacte)`, type: 'num', rep: Math.SQRT2, tol: 0.0001, corr: r`La limite $\ell \gt 0$ vérifie $\ell = \dfrac12\left(\ell + \dfrac2\ell\right) \iff \ell^2 = 2$ : $\sqrt2$. La convergence est quadratique.` },
        { q: r`$v_0 = 0$, $v_1 = 1$ et $v_{n+2} = v_{n+1} + 2v_n$. Calcule $v_{10}$.`, type: 'num', rep: 341, corr: r`Équation caractéristique $r^2 = r + 2$ : $r = 2$ ou $-1$. $v_n = \dfrac{2^n - (-1)^n}{3}$, donc $v_{10} = \dfrac{1\,024 - 1}{3} = 341$.` }
      ] },
    'mpsi-limites-continuite': { titre: 'Limites remarquables', etoiles: 2,
      enonce: r`<p>Calcule les limites (valeurs exactes, e accepté).</p>`,
      questions: [
        { q: r`Calcule $\lim\limits_{x \to 0} \dfrac{e^x - 1}{x}$.`, type: 'num', rep: 1, corr: r`Taux d'accroissement de $\exp$ en $0$ : $1$.` },
        { q: r`Calcule $\lim\limits_{x \to +\infty} \left(1 + \dfrac1x\right)^x$ (au millième).`, type: 'num', rep: Math.E, tol: 0.001, corr: r`$\exp\left(x\ln\left(1 + \frac1x\right)\right)$ et $x\ln\left(1 + \frac1x\right) \to 1$ : la limite est $e$.` },
        { q: r`Calcule $\lim\limits_{x \to 0^+} x\ln x$.`, type: 'num', rep: 0, corr: r`Croissances comparées : $0$.` },
        { q: r`$f(x) = \dfrac{x^2 - 1}{x - 1}$ pour $x \neq 1$. Par quelle valeur la prolonger par continuité en $1$ ?`, type: 'num', rep: 2, corr: r`$f(x) = x + 1 \to 2$.` }
      ] },
    'mpsi-derivabilite': { titre: 'Rolle et accroissements finis', etoiles: 3,
      enonce: r`<p>Utilise les théorèmes de Rolle et des accroissements finis.</p>`,
      questions: [
        { q: r`$f(x) = x^x = e^{x\ln x}$ sur $]0\,;\,+\infty[$. Calcule $f'(1)$.`, type: 'num', rep: 1, corr: r`$f'(x) = (\ln x + 1)x^x$, donc $f'(1) = 1$.` },
        { q: r`$g(x) = x^3 - 3x$ vérifie $g(-\sqrt3) = g(\sqrt3) = 0$. Donne le réel $c \gt 0$ que fournit le théorème de Rolle.`, type: 'num', rep: 1, corr: r`$g'(c) = 3c^2 - 3 = 0 \iff c = \pm 1$, et $c = 1 \in ]0\,;\,\sqrt3[$.` },
        { q: r`Accroissements finis pour $h(x) = x^2$ sur $[1\,;\,3]$ : quel est le réel $c$ ?`, type: 'num', rep: 2, corr: r`$h'(c) = \dfrac{9 - 1}{3 - 1} = 4 = 2c$, donc $c = 2$ (le milieu, propre aux paraboles).` },
        { q: r`Calcule la dérivée cinquième de $x \mapsto e^{2x}$ en $0$.`, type: 'num', rep: 32, corr: r`$\left(e^{2x}\right)^{(n)} = 2^n e^{2x}$ : $2^5 = 32$.` }
      ] },
    'mpsi-dl': { titre: 'Développements limités en série', etoiles: 3,
      enonce: r`<p>Utilise les développements limités usuels en $0$.</p>`,
      questions: [
        { q: r`Quel est le coefficient de $x^2$ dans le DL de $e^x\cos x$ à l'ordre $2$ ?`, type: 'num', rep: 0, corr: r`$\left(1 + x + \frac{x^2}{2}\right)\left(1 - \frac{x^2}{2}\right) = 1 + x + 0 \cdot x^2 + o(x^2)$.` },
        { q: r`Calcule $\lim\limits_{x \to 0} \dfrac{\sin x - x}{x^3}$ (fraction).`, type: 'num', rep: -1 / 6, corr: r`$\sin x = x - \dfrac{x^3}{6} + o(x^3)$ : la limite vaut $-\dfrac16$.` },
        { q: r`Calcule $\lim\limits_{x \to 0} \dfrac{1 - \cos x}{x^2}$.`, type: 'num', rep: 0.5, corr: r`$\cos x = 1 - \dfrac{x^2}{2} + o(x^2)$ : $\dfrac12$.` },
        { q: r`Calcule $\lim\limits_{x \to 0} \dfrac{\ln(1 + x) - x}{x^2}$.`, type: 'num', rep: -0.5, corr: r`$\ln(1 + x) = x - \dfrac{x^2}{2} + o(x^2)$ : $-\dfrac12$.` },
        { q: r`Quel est le coefficient de $x^3$ dans le DL de $\tan x$ ? (fraction)`, type: 'num', rep: 1 / 3, corr: r`$\tan x = x + \dfrac{x^3}{3} + o(x^3)$ (par exemple avec $\tan' = 1 + \tan^2$).` }
      ] },
    'mpsi-integration': { titre: 'Intégrales et sommes de Riemann', etoiles: 2,
      enonce: r`<p>Intégrations par parties, linéarisation et sommes de Riemann.</p>`,
      questions: [
        { q: r`Calcule $\displaystyle\int_0^1 xe^x\,\mathrm dx$.`, type: 'num', rep: 1, corr: r`Par parties : $\big[xe^x\big]_0^1 - \displaystyle\int_0^1 e^x\,\mathrm dx = e - (e - 1) = 1$.` },
        { q: r`Calcule $\displaystyle\int_1^e \ln x\,\mathrm dx$.`, type: 'num', rep: 1, corr: r`Primitive $x\ln x - x$ : $(e - e) - (0 - 1) = 1$.` },
        { q: r`Calcule $\displaystyle\int_0^{\pi/2} \cos^2 x\,\mathrm dx$ (valeur exacte ou au millième).`, type: 'num', rep: Math.PI / 4, tol: 0.001, corr: r`$\cos^2 x = \dfrac{1 + \cos 2x}{2}$ : $\dfrac{\pi}{4}$.` },
        { q: r`Calcule $\lim\limits_{n \to +\infty} \dfrac1n\displaystyle\sum_{k=1}^{n} \dfrac kn$.`, type: 'num', rep: 0.5, corr: r`Somme de Riemann de $x \mapsto x$ sur $[0\,;\,1]$ : $\displaystyle\int_0^1 x\,\mathrm dx = \dfrac12$.` }
      ] },
    'mpsi-arithmetique': { titre: 'Euclide, Gauss et les congruences', etoiles: 3,
      enonce: r`<p>Arithmétique dans $\mathbb{Z}$ : divisions euclidiennes et calculs modulo $n$.</p>`,
      questions: [
        { q: r`Calcule $\mathrm{pgcd}(462, 1\,071)$.`, type: 'num', rep: 21, corr: r`$1\,071 = 2 \times 462 + 147$ ; $462 = 3 \times 147 + 21$ ; $147 = 7 \times 21$. Le pgcd est $21$.` },
        { q: r`Combien de diviseurs positifs possède $1\,071$ ?`, type: 'num', rep: 12, corr: r`$1\,071 = 3^2 \times 7 \times 17$ : $(2 + 1)(1 + 1)(1 + 1) = 12$.` },
        { q: r`Quel est le reste de $2^{100}$ dans la division par $7$ ?`, type: 'num', rep: 2, corr: r`$2^3 = 8 \equiv 1 \pmod 7$ et $100 = 3 \times 33 + 1$ : $2^{100} \equiv 2$.` },
        { q: r`Résous $5x \equiv 3 \pmod{11}$ avec $0 \leqslant x \leqslant 10$.`, type: 'num', rep: 5, corr: r`L'inverse de $5$ modulo $11$ est $9$ ($45 = 4 \times 11 + 1$) : $x \equiv 27 \equiv 5$. Vérification : $25 = 2 \times 11 + 3$.` },
        { q: r`Quel est le chiffre des unités de $3^{2026}$ ?`, type: 'num', rep: 9, corr: r`Les unités de $3^n$ forment le cycle $3, 9, 7, 1$ (période $4$). $2026 = 4 \times 506 + 2$ : chiffre $9$.` }
      ] },
    'mpsi-polynomes': { titre: 'Un polynôme et ses racines', etoiles: 2,
      enonce: r`<p>On considère $P = X^3 - 6X^2 + 11X - 6$.</p>`,
      questions: [
        { q: r`Calcule $P(1)$.`, type: 'num', rep: 0, corr: r`$1 - 6 + 11 - 6 = 0$ : $1$ est racine.` },
        { q: r`Donne les trois racines de $P$ (séparées par ;).`, type: 'liste', rep: [1, 2, 3], corr: r`$P = (X - 1)(X^2 - 5X + 6) = (X - 1)(X - 2)(X - 3)$.` },
        { q: r`Calcule la somme des carrés des racines sans les utiliser.`, type: 'num', rep: 14, corr: r`$\sigma_1^2 - 2\sigma_2 = 36 - 22 = 14$ (et $1 + 4 + 9 = 14$).` },
        { q: r`Le reste de la division de $X^5$ par $X^2 - 1$ est $aX + b$. Donne $a$.`, type: 'num', rep: 1, corr: r`$X^2 \equiv 1$ donc $X^5 = X \cdot (X^2)^2 \equiv X$ : reste $X$, $a = 1$ et $b = 0$.` }
      ] },
    'mpsi-matrices': { titre: 'Puissances d\'une matrice', etoiles: 3,
      enonce: r`<p>On pose $A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$, $J = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$, de sorte que $A = I_2 + J$.</p>`,
      questions: [
        { q: r`Calcule $\det A$.`, type: 'num', rep: 3, corr: r`$4 - 1 = 3$ : $A$ est inversible.` },
        { q: r`Quel est le coefficient $(1,1)$ de $A^2$ ?`, type: 'num', rep: 5, corr: r`$A^2 = \begin{pmatrix} 5 & 4 \\ 4 & 5 \end{pmatrix}$.` },
        { q: r`Quel est le coefficient $(1,2)$ de $A^{-1}$ ? (fraction)`, type: 'num', rep: -1 / 3, corr: r`$A^{-1} = \dfrac13\begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}$.` },
        { q: r`On a $J^2 = 2J$ et $I_2J = JI_2$, d'où $A^n = I_2 + \dfrac{3^n - 1}{2}J$. Quel est le coefficient $(1,2)$ de $A^5$ ?`, type: 'num', rep: 121, corr: r`Par le binôme, $J^k = 2^{k-1}J$, et $\displaystyle\sum_{k \geqslant 1} \binom nk 2^{k-1} = \dfrac{3^n - 1}{2}$. Pour $n = 5$ : $\dfrac{243 - 1}{2} = 121$.` }
      ] },
    'mpsi-equadiff': { titre: 'Trois équations différentielles', etoiles: 3,
      enonce: r`<p>Résous chaque équation puis calcule la valeur demandée.</p>`,
      questions: [
        { q: r`$y' + 2y = 6$ et $y(0) = 0$. Calcule $y(1)$ (au millième).`, type: 'num', rep: 3 - 3 * Math.exp(-2), tol: 0.001, corr: r`Solution particulière constante $3$ : $y = 3 + \lambda e^{-2x}$ et $y(0) = 0$ donne $\lambda = -3$. $y(1) = 3 - 3e^{-2} \approx 2{,}594$.` },
        { q: r`Pour $y'' - 4y' + 4y = 0$, quelle est la racine (double) de l'équation caractéristique ?`, type: 'num', rep: 2, corr: r`$r^2 - 4r + 4 = (r - 2)^2$ : $y = (\lambda x + \mu)e^{2x}$.` },
        { q: r`$y'' + 9y = 0$, $y(0) = 1$, $y'(0) = 0$. Calcule $y\left(\dfrac{\pi}{3}\right)$.`, type: 'num', rep: -1, corr: r`$y = \cos 3x$, et $\cos \pi = -1$.` },
        { q: r`Pour $y'' - y = e^{2x}$, on cherche $y_p = ke^{2x}$. Donne $k$ (fraction).`, type: 'num', rep: 1 / 3, corr: r`$4k - k = 1$, donc $k = \dfrac13$ ($2$ n'est pas racine de $r^2 - 1$).` }
      ] }
  });
})();
