/* Nouvelles leçons (novembre 2026) : 2 par niveau, ajoutées à la fin de chaque niveau.
   Champ « nouveau » : les abonnés les découvrent 30 jours avant tout le monde.
   Les maths sont en LaTeX ($…$) ; jamais de « < » brut : utiliser \lt et \gt. */
(function () {
  var r = String.raw, N = '2026-11-02';

  addLecons('6e', [
    {
      id: '6e-solides', titre: 'Pavé droit, cube et volumes', domaine: 'Géométrie', nouveau: N,
      resume: 'Reconnaître les solides, dessiner un patron et calculer le volume d\'un pavé droit.',
      yt: 'yvan monka volume pavé droit cube 6e',
      cours: r`
<p>Un <b>pavé droit</b> (ou parallélépipède rectangle) est un solide dont les $6$ faces sont des rectangles. Il a $8$ sommets et $12$ arêtes. Un <b>cube</b> est un pavé droit dont toutes les faces sont des carrés.</p>
<div class="fig"><svg viewBox="0 0 220 130" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 50h120v70H20z"/><path d="M20 50l40-30h120l-40 30M140 120l40-30V20"/><path d="M20 120l40-30h120M60 20v70" stroke-dasharray="5 4"/><g font-size="12" fill="currentColor" stroke="none"><text x="70" y="136">L</text><text x="164" y="112">l</text><text x="4" y="90">h</text></g></svg></div>
<div class="def"><b>Patron</b><p>Le <b>patron</b> d'un solide est une figure plane qui, une fois pliée, permet de fabriquer le solide sans recouvrement. Le patron d'un cube est formé de $6$ carrés ; il en existe $11$ différents.</p></div>
<h3>Le volume</h3>
<p>Le volume mesure la place occupée par un solide. L'unité de base est le <b>centimètre cube</b> ($\text{cm}^3$) : le volume d'un cube de $1$ cm d'arête.</p>
<div class="prop"><b>Formules</b><p>Pavé droit de longueur $L$, largeur $l$ et hauteur $h$ : $V = L \times l \times h$. Cube d'arête $a$ : $V = a \times a \times a = a^3$.</p></div>
<div class="ex-box"><b>Exemple</b><p>Une boîte mesure $8$ cm sur $5$ cm sur $3$ cm : $V = 8 \times 5 \times 3 = 120\ \text{cm}^3$. On peut y ranger $120$ petits cubes de $1$ cm.</p></div>
<div class="methode"><b>Contenances</b><p>$1\ \text{L} = 1\ \text{dm}^3 = 1\,000\ \text{cm}^3$ et $1\ \text{mL} = 1\ \text{cm}^3$. Un aquarium de $1\,000\ \text{cm}^3$ contient donc $1$ litre d'eau.</p></div>
<div class="attention"><b>Piège</b><p>Toutes les longueurs doivent être dans la même unité avant de multiplier : $2$ m $\times$ $30$ cm, c'est $200 \times 30$ en cm.</p></div>`,
      retenir: [r`Pavé droit : $6$ faces rectangulaires, $8$ sommets, $12$ arêtes.`, r`$V_{\text{pavé}} = L \times l \times h$ et $V_{\text{cube}} = a^3$.`, r`$1\ \text{L} = 1\ \text{dm}^3 = 1\,000\ \text{cm}^3$.`],
      exos: [
        { q: r`Calcule le volume (en $\text{cm}^3$) d'un pavé droit de dimensions $7$ cm, $4$ cm et $2{,}5$ cm.`, type: 'num', rep: 70, unite: 'cm³', corr: r`$V = 7 \times 4 \times 2{,}5 = 28 \times 2{,}5 = 70\ \text{cm}^3$.` },
        { q: r`Combien d'arêtes possède un cube ?`, type: 'num', rep: 12, corr: r`Comme tout pavé droit, un cube a $12$ arêtes : $4$ en haut, $4$ en bas et $4$ verticales.` },
        { q: r`Un aquarium a pour dimensions $40$ cm, $25$ cm et $30$ cm. Quelle est sa contenance en litres ?`, type: 'num', rep: 30, unite: 'L', corr: r`$V = 40 \times 25 \times 30 = 30\,000\ \text{cm}^3$, et $1\ \text{L} = 1\,000\ \text{cm}^3$, donc $30$ L.` }
      ]
    },
    {
      id: '6e-durees', titre: 'Durées et horaires', domaine: 'Nombres', nouveau: N,
      resume: 'Convertir des durées, calculer une heure d\'arrivée ou une durée écoulée.',
      yt: 'yvan monka calculer des durées 6e',
      cours: r`
<p>On mesure le temps en heures (h), minutes (min) et secondes (s). Attention : ce n'est <b>pas</b> un système décimal.</p>
<div class="def"><b>Conversions</b><p>$1\ \text{h} = 60\ \text{min}$, $1\ \text{min} = 60\ \text{s}$, donc $1\ \text{h} = 3\,600\ \text{s}$. Une journée dure $24$ h.</p></div>
<div class="methode"><b>Méthode : calculer une durée</b><p>Pour aller de $8\text{h}45$ à $11\text{h}20$, on avance par étapes : de $8\text{h}45$ à $9\text{h}00$ il y a $15$ min, de $9\text{h}00$ à $11\text{h}00$ il y a $2$ h, puis $20$ min. Total : $2\text{ h }35\text{ min}$.</p></div>
<div class="methode"><b>Méthode : ajouter une durée</b><p>On ajoute les heures et les minutes séparément, puis on convertit : $14\text{h}50 + 1\text{h}25 = 15\text{h}75 = 16\text{h}15$ car $75\ \text{min} = 1\text{ h }15\text{ min}$.</p></div>
<div class="attention"><b>Piège</b><p>$1{,}5$ h ne vaut pas $1$ h $50$ min mais $1$ h $30$ min, car $0{,}5\ \text{h} = 0{,}5 \times 60 = 30$ min. De même $0{,}25\ \text{h} = 15$ min.</p></div>
<div class="ex-box"><b>Exemple</b><p>Un film de $135$ min commence à $20\text{h}40$. $135\ \text{min} = 2\text{ h }15\text{ min}$, il finit à $22\text{h}55$.</p></div>`,
      retenir: [r`$1\ \text{h} = 60\ \text{min} = 3\,600\ \text{s}$.`, r`Pour une durée : avancer par étapes jusqu'à l'heure ronde.`, r`$0{,}5\ \text{h} = 30\ \text{min}$, $0{,}25\ \text{h} = 15\ \text{min}$.`],
      exos: [
        { q: r`Combien de minutes y a-t-il dans $3$ h $25$ min ?`, type: 'num', rep: 205, unite: 'min', corr: r`$3 \times 60 + 25 = 180 + 25 = 205$ min.` },
        { q: r`Un train part à $9\text{h}47$ et arrive à $12\text{h}05$. Combien de minutes dure le trajet ?`, type: 'num', rep: 138, unite: 'min', corr: r`De $9\text{h}47$ à $10\text{h}00$ : $13$ min ; de $10\text{h}00$ à $12\text{h}00$ : $120$ min ; puis $5$ min. Total $138$ min, soit $2\text{ h }18\text{ min}$.` },
        { q: r`Combien de minutes représentent $2{,}75$ h ?`, type: 'num', rep: 165, unite: 'min', corr: r`$2{,}75 \times 60 = 165$ min, soit $2$ h $45$ min.` }
      ]
    }
  ]);

  addLecons('5e', [
    {
      id: '5e-reperage', titre: 'Se repérer dans le plan', domaine: 'Relatifs', nouveau: N,
      resume: 'Lire et placer des points avec des coordonnées positives ou négatives.',
      yt: 'yvan monka repérage dans le plan 5e',
      cours: r`
<p>Un <b>repère</b> du plan est formé de deux droites graduées perpendiculaires qui se coupent en l'<b>origine</b> $O$ : l'axe horizontal des <b>abscisses</b> et l'axe vertical des <b>ordonnées</b>.</p>
<div class="fig"><svg viewBox="0 0 200 160" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 80h180M100 150V10"/><path d="M186 76l4 4-4 4M96 14l4-4 4 4"/><circle cx="140" cy="40" r="3.5" fill="currentColor"/><circle cx="60" cy="120" r="3.5" fill="currentColor"/><path d="M140 40v40M140 40h-40M60 120V80M60 120h40" stroke-dasharray="3 3"/><g font-size="11" fill="currentColor" stroke="none"><text x="146" y="36">A(2 ; 2)</text><text x="22" y="138">B(−2 ; −2)</text><text x="104" y="94">O</text></g></svg></div>
<div class="def"><b>Coordonnées</b><p>Chaque point $M$ est repéré par un couple $(x\,;\,y)$ : $x$ est son <b>abscisse</b> (lue sur l'axe horizontal), $y$ son <b>ordonnée</b> (lue sur l'axe vertical). On écrit $M(x\,;\,y)$, toujours l'abscisse en premier.</p></div>
<div class="methode"><b>Les quatre quarts</b><p>En haut à droite : $x \gt 0$ et $y \gt 0$. En haut à gauche : $x \lt 0$ et $y \gt 0$. En bas à gauche : les deux négatives. En bas à droite : $x \gt 0$ et $y \lt 0$. Un point de l'axe des abscisses a une ordonnée nulle.</p></div>
<div class="ex-box"><b>Exemple</b><p>Le point $C(-3\,;\,1)$ : on part de $O$, on va de $3$ unités vers la gauche, puis $1$ vers le haut.</p></div>
<div class="prop"><b>Distances sur un axe</b><p>Deux points de même ordonnée $A(-2\,;\,3)$ et $B(4\,;\,3)$ sont sur une même horizontale ; leur distance est $4 - (-2) = 6$ unités.</p></div>`,
      retenir: [r`$M(x\,;\,y)$ : abscisse d'abord, ordonnée ensuite.`, r`Le signe des coordonnées indique le quart du plan.`, r`Même ordonnée : distance $=$ différence des abscisses.`],
      exos: [
        { q: r`Le point $P$ est à $4$ unités à gauche de l'axe des ordonnées et $2$ unités sous l'axe des abscisses. Quelle est son abscisse ?`, type: 'num', rep: -4, corr: r`À gauche : abscisse négative, $x = -4$ (et $y = -2$) : $P(-4\,;\,-2)$.` },
        { q: r`Quelle est la distance entre $A(-3\,;\,5)$ et $B(6\,;\,5)$ ?`, type: 'num', rep: 9, corr: r`Même ordonnée : $6 - (-3) = 9$ unités.` },
        { q: r`Dans quel quart du plan se trouve $D(2\,;\,-7)$ ?`, type: 'qcm', choix: [r`En bas à droite`, r`En haut à droite`, r`En bas à gauche`, r`En haut à gauche`], rep: 0, corr: r`$x = 2 \gt 0$ (à droite) et $y = -7 \lt 0$ (en bas).` }
      ]
    },
    {
      id: '5e-prismes', titre: 'Prismes droits et cylindres', domaine: 'Géométrie', nouveau: N,
      resume: 'Décrire un prisme ou un cylindre, et calculer son volume avec l\'aire de la base.',
      yt: 'yvan monka volume prisme cylindre 5e',
      cours: r`
<p>Un <b>prisme droit</b> a deux <b>bases</b> superposables et parallèles (des polygones) et des <b>faces latérales</b> rectangulaires. Un <b>cylindre</b> a deux bases qui sont des disques.</p>
<div class="fig"><svg viewBox="0 0 240 130" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 110h70l-35-30z"/><path d="M20 110V40M90 110V40M55 80V10M20 40h70l-35-30z"/><ellipse cx="180" cy="30" rx="35" ry="10"/><path d="M145 30v80M215 30v80"/><path d="M145 110a35 10 0 0 0 70 0"/><path d="M145 110a35 10 0 0 1 70 0" stroke-dasharray="4 4"/></svg></div>
<div class="prop"><b>Volume</b><p>Pour un prisme droit comme pour un cylindre : $V = \mathcal{A}_{\text{base}} \times h$, où $h$ est la hauteur (la distance entre les deux bases). Pour un cylindre de rayon $r$ : $V = \pi r^2 h$.</p></div>
<div class="ex-box"><b>Exemple</b><p>Prisme dont la base est un triangle rectangle de côtés $3$ cm et $4$ cm, de hauteur $10$ cm : $\mathcal{A}_{\text{base}} = \dfrac{3 \times 4}{2} = 6\ \text{cm}^2$, donc $V = 6 \times 10 = 60\ \text{cm}^3$.</p></div>
<div class="methode"><b>Aire latérale</b><p>Déplié, l'ensemble des faces latérales forme un rectangle de longueur le <b>périmètre de la base</b> et de largeur $h$ : $\mathcal{A}_{\text{lat}} = P_{\text{base}} \times h$. Pour un cylindre : $2\pi r \times h$.</p></div>
<div class="attention"><b>Piège</b><p>La « hauteur » d'un prisme couché n'est pas forcément verticale : c'est l'arête latérale, perpendiculaire aux bases.</p></div>`,
      retenir: [r`$V = \mathcal{A}_{\text{base}} \times h$ (prisme droit ou cylindre).`, r`Cylindre : $V = \pi r^2 h$.`, r`Aire latérale $=$ périmètre de la base $\times\ h$.`],
      exos: [
        { q: r`Un prisme droit a une base d'aire $12\ \text{cm}^2$ et une hauteur de $7$ cm. Quel est son volume en $\text{cm}^3$ ?`, type: 'num', rep: 84, unite: 'cm³', corr: r`$V = 12 \times 7 = 84\ \text{cm}^3$.` },
        { q: r`Volume d'un cylindre de rayon $5$ cm et de hauteur $4$ cm, arrondi au $\text{cm}^3$ ?`, type: 'num', rep: 314, tol: 0.6, unite: 'cm³', corr: r`$V = \pi \times 5^2 \times 4 = 100\pi \approx 314\ \text{cm}^3$.` },
        { q: r`Un prisme a pour base un triangle de côtés $3$, $4$ et $5$ cm et une hauteur de $9$ cm. Quelle est son aire latérale en $\text{cm}^2$ ?`, type: 'num', rep: 108, unite: 'cm²', corr: r`Périmètre de la base $3 + 4 + 5 = 12$ cm, donc $\mathcal{A}_{\text{lat}} = 12 \times 9 = 108\ \text{cm}^2$.` }
      ]
    }
  ]);

  addLecons('4e', [
    {
      id: '4e-ecriture-scientifique', titre: 'Écriture scientifique et ordres de grandeur', domaine: 'Puissances', nouveau: N,
      resume: 'Écrire les très grands et très petits nombres avec les puissances de 10.',
      yt: 'yvan monka écriture scientifique 4e',
      cours: r`
<p>Les sciences manipulent des nombres immenses (la distance Terre–Soleil, environ $150\,000\,000$ km) ou minuscules (la taille d'une bactérie, environ $0{,}000\,002$ m). On les écrit avec des puissances de $10$.</p>
<div class="def"><b>Écriture scientifique</b><p>Tout nombre décimal non nul s'écrit de façon unique $a \times 10^n$ avec $1 \leqslant a \lt 10$ et $n$ un entier relatif. Exemples : $150\,000\,000 = 1{,}5 \times 10^8$ et $0{,}000\,002 = 2 \times 10^{-6}$.</p></div>
<div class="methode"><b>Méthode</b><p>On place la virgule juste après le premier chiffre non nul, puis on compte de combien de rangs elle a bougé. Vers la gauche : exposant positif. Vers la droite : exposant négatif. $0{,}00347 = 3{,}47 \times 10^{-3}$.</p></div>
<div class="prop"><b>Calculer</b><p>On regroupe les nombres et les puissances : $(3 \times 10^4) \times (5 \times 10^{-7}) = 15 \times 10^{-3} = 1{,}5 \times 10^{-2}$. On utilise $10^a \times 10^b = 10^{a+b}$ et $\dfrac{10^a}{10^b} = 10^{a-b}$.</p></div>
<div class="ex-box"><b>Ordre de grandeur</b><p>On arrondit $a$ à l'unité : la Terre pèse environ $5{,}97 \times 10^{24}$ kg, soit de l'ordre de $6 \times 10^{24}$ kg. Pour comparer deux nombres, on compare d'abord les exposants.</p></div>
<div class="attention"><b>Piège</b><p>$25 \times 10^3$ n'est pas une écriture scientifique ($25 \geqslant 10$) : c'est $2{,}5 \times 10^4$.</p></div>`,
      retenir: [r`$a \times 10^n$ avec $1 \leqslant a \lt 10$.`, r`Virgule vers la gauche : $n \gt 0$ ; vers la droite : $n \lt 0$.`, r`$10^a \times 10^b = 10^{a+b}$, $\dfrac{10^a}{10^b} = 10^{a-b}$.`],
      exos: [
        { q: r`Écris $0{,}000\,73$ en écriture scientifique $a \times 10^n$. Quel est l'exposant $n$ ?`, type: 'num', rep: -4, corr: r`$0{,}000\,73 = 7{,}3 \times 10^{-4}$ : la virgule a avancé de $4$ rangs vers la droite.` },
        { q: r`Calcule $(4 \times 10^5) \times (3 \times 10^{-2})$ et donne le résultat en écriture décimale.`, type: 'num', rep: 12000, corr: r`$12 \times 10^{3} = 12\,000$ (soit $1{,}2 \times 10^4$).` },
        { q: r`La lumière parcourt $3 \times 10^5$ km par seconde. Combien de km parcourt-elle en $500$ s ? Donne l'exposant $n$ de l'écriture scientifique du résultat.`, type: 'num', rep: 8, corr: r`$3 \times 10^5 \times 5 \times 10^2 = 15 \times 10^7 = 1{,}5 \times 10^8$ km : $n = 8$ (c'est la distance Terre–Soleil !).` }
      ]
    },
    {
      id: '4e-cosinus', titre: 'Le cosinus d\'un angle aigu', domaine: 'Trigonométrie', nouveau: N,
      resume: 'Dans un triangle rectangle, relier un angle au côté adjacent et à l\'hypoténuse.',
      yt: 'yvan monka cosinus 4e',
      cours: r`
<p>Dans un triangle rectangle, les longueurs des côtés et les angles ne sont pas indépendants. Le <b>cosinus</b> fait le lien.</p>
<div class="fig"><svg viewBox="0 0 220 130" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 110h170V20z"/><path d="M178 110v-12h12"/><path d="M50 110a30 30 0 0 0-3-13"/><g font-size="12" fill="currentColor" stroke="none"><text x="8" y="124">A</text><text x="194" y="124">B</text><text x="194" y="20">C</text><text x="56" y="102">α</text><text x="96" y="126">adjacent</text><text x="62" y="56">hypoténuse</text></g></svg></div>
<div class="def"><b>Définition</b><p>Dans le triangle $ABC$ rectangle en $B$, pour l'angle aigu $\widehat{BAC}$ : $\cos \widehat{BAC} = \dfrac{\text{côté adjacent}}{\text{hypoténuse}} = \dfrac{AB}{AC}$.</p></div>
<div class="prop"><b>Propriétés</b><p>Le cosinus d'un angle aigu est toujours compris entre $0$ et $1$ (l'hypoténuse est le plus grand côté). Plus l'angle est grand, plus son cosinus est petit : $\cos 0° = 1$, $\cos 60° = 0{,}5$, $\cos 90° = 0$.</p></div>
<div class="methode"><b>Calculer une longueur</b><p>Si $\widehat{A} = 40°$ et $AC = 8$ cm : $AB = AC \times \cos 40° \approx 8 \times 0{,}766 \approx 6{,}1$ cm. Si on connaît $AB$ : $AC = \dfrac{AB}{\cos \widehat{A}}$.</p></div>
<div class="methode"><b>Calculer un angle</b><p>Si $AB = 5$ et $AC = 10$ : $\cos \widehat{A} = 0{,}5$, la calculatrice (touche $\cos^{-1}$ ou « Arccos ») donne $\widehat{A} = 60°$.</p></div>
<div class="attention"><b>Piège</b><p>La calculatrice doit être en <b>degrés</b>. Et le côté adjacent dépend de l'angle choisi : celui de $\widehat{C}$ est $BC$.</p></div>`,
      retenir: [r`$\cos \alpha = \dfrac{\text{adjacent}}{\text{hypoténuse}}$ (triangle rectangle).`, r`$0 \lt \cos \alpha \lt 1$ pour un angle aigu.`, r`Calculatrice en degrés ; $\cos^{-1}$ pour retrouver l'angle.`],
      exos: [
        { q: r`$ABC$ est rectangle en $B$, $AB = 6$ et $AC = 10$. Calcule $\cos \widehat{BAC}$.`, type: 'num', rep: 0.6, corr: r`$\cos \widehat{BAC} = \dfrac{AB}{AC} = \dfrac{6}{10} = 0{,}6$.` },
        { q: r`$DEF$ est rectangle en $E$, $\widehat{D} = 30°$ et $DF = 12$ cm. Calcule $DE$, arrondie au dixième.`, type: 'num', rep: 10.4, tol: 0.06, unite: 'cm', corr: r`$DE = DF \times \cos 30° \approx 12 \times 0{,}866 \approx 10{,}4$ cm.` },
        { q: r`Un triangle rectangle a un côté adjacent de $4$ cm et une hypoténuse de $8$ cm. Quelle est la mesure de l'angle (en degrés) ?`, type: 'num', rep: 60, tol: 0.1, unite: '°', corr: r`$\cos \alpha = \dfrac{4}{8} = 0{,}5$, donc $\alpha = 60°$.` }
      ]
    }
  ]);

  addLecons('3e', [
    {
      id: '3e-racines', titre: 'Racines carrées : calculs et simplifications', domaine: 'Nombres', nouveau: N,
      resume: r`Calculer avec $\sqrt{a}$, simplifier $\sqrt{72}$ et rendre un dénominateur entier.`,
      yt: 'yvan monka racine carrée simplifier 3e',
      cours: r`
<div class="def"><b>Définition</b><p>Pour $a \geqslant 0$, $\sqrt{a}$ est le nombre <b>positif</b> dont le carré vaut $a$ : $(\sqrt{a})^2 = a$. Ainsi $\sqrt{49} = 7$ et $\sqrt{0{,}25} = 0{,}5$. La racine d'un nombre négatif n'existe pas.</p></div>
<div class="prop"><b>Règles</b><p>Pour $a \geqslant 0$ et $b \gt 0$ : $\sqrt{a \times b} = \sqrt{a} \times \sqrt{b}$ et $\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}$. Et $\sqrt{a^2} = a$ si $a \geqslant 0$.</p></div>
<div class="methode"><b>Simplifier</b><p>On cherche le plus grand carré parfait qui divise le nombre : $\sqrt{72} = \sqrt{36 \times 2} = 6\sqrt{2}$ ; $\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$.</p></div>
<div class="ex-box"><b>Additionner</b><p>On ne peut additionner que des « mêmes racines » : $\sqrt{72} + \sqrt{50} = 6\sqrt{2} + 5\sqrt{2} = 11\sqrt{2}$.</p></div>
<div class="methode"><b>Dénominateur entier</b><p>$\dfrac{6}{\sqrt{3}} = \dfrac{6\sqrt{3}}{\sqrt{3} \times \sqrt{3}} = \dfrac{6\sqrt{3}}{3} = 2\sqrt{3}$.</p></div>
<div class="attention"><b>Piège</b><p>$\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$ : $\sqrt{9 + 16} = \sqrt{25} = 5$ alors que $\sqrt{9} + \sqrt{16} = 7$.</p></div>`,
      retenir: [r`$\sqrt{ab} = \sqrt{a}\sqrt{b}$, mais $\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$.`, r`Simplifier : sortir le plus grand carré parfait, $\sqrt{72} = 6\sqrt{2}$.`, r`$\dfrac{1}{\sqrt{a}} = \dfrac{\sqrt{a}}{a}$.`],
      exos: [
        { q: r`Simplifie $\sqrt{48}$ sous la forme $a\sqrt{3}$. Quelle est la valeur de $a$ ?`, type: 'num', rep: 4, corr: r`$\sqrt{48} = \sqrt{16 \times 3} = 4\sqrt{3}$.` },
        { q: r`Calcule $\sqrt{18} \times \sqrt{8}$.`, type: 'num', rep: 12, corr: r`$\sqrt{18 \times 8} = \sqrt{144} = 12$.` },
        { q: r`Écris $\sqrt{75} - \sqrt{12}$ sous la forme $a\sqrt{3}$. Donne $a$.`, type: 'num', rep: 3, corr: r`$\sqrt{75} = 5\sqrt{3}$ et $\sqrt{12} = 2\sqrt{3}$, donc $5\sqrt{3} - 2\sqrt{3} = 3\sqrt{3}$.` }
      ]
    },
    {
      id: '3e-transformations', titre: 'Translations et rotations', domaine: 'Géométrie', nouveau: N,
      resume: 'Faire glisser ou tourner une figure, et savoir ce qui est conservé.',
      yt: 'yvan monka translation rotation 3e',
      cours: r`
<p>Une <b>transformation</b> déplace chaque point d'une figure selon une règle. Au collège on en étudie quatre : symétrie axiale, symétrie centrale, <b>translation</b> et <b>rotation</b>.</p>
<div class="def"><b>Translation</b><p>La translation qui transforme $A$ en $B$ fait <b>glisser</b> toute la figure dans la direction de $(AB)$, dans le sens de $A$ vers $B$, sur la longueur $AB$. L'image $M'$ de $M$ vérifie : $ABM'M$ est un parallélogramme.</p></div>
<div class="def"><b>Rotation</b><p>La rotation de centre $O$ et d'angle $\alpha$ fait <b>tourner</b> chaque point autour de $O$ : $OM' = OM$ et $\widehat{MOM'} = \alpha$, dans le sens indiqué (inverse des aiguilles d'une montre par défaut).</p></div>
<div class="fig"><svg viewBox="0 0 240 120" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 90l30-40 25 40z"/><path d="M110 90l30-40 25 40z" stroke-dasharray="5 3"/><path d="M50 50h85" stroke-width="1.4"/><path d="M128 46l7 4-7 4"/><circle cx="200" cy="90" r="3" fill="currentColor"/><path d="M200 90l30-25M200 90l-5-40" stroke-width="1.4"/><path d="M222 72a28 28 0 0 0-24-20" stroke-dasharray="3 3"/></svg></div>
<div class="prop"><b>Ce qui est conservé</b><p>Les translations et rotations (comme les symétries) conservent les <b>longueurs</b>, les <b>angles</b>, les <b>aires</b>, le parallélisme et l'alignement : l'image d'une figure lui est superposable.</p></div>
<div class="ex-box"><b>Exemple</b><p>La rotation de centre $O$ et d'angle $180°$ est la symétrie centrale de centre $O$. Une rotation de $90°$ transforme un carré de centre $O$ en lui-même.</p></div>
<div class="methode"><b>Repérer une transformation</b><p>Figure seulement déplacée, même orientation : translation. Figure tournée autour d'un point : rotation. Figure « retournée » comme dans un miroir : symétrie axiale.</p></div>`,
      retenir: [r`Translation : glissement (direction, sens, longueur).`, r`Rotation : centre, angle, sens.`, r`Elles conservent longueurs, angles et aires.`],
      exos: [
        { q: r`Par une rotation, un segment de $7$ cm a pour image un segment de longueur… (en cm)`, type: 'num', rep: 7, unite: 'cm', corr: r`Une rotation conserve les longueurs : $7$ cm.` },
        { q: r`Quelle rotation de centre $O$ est la même transformation que la symétrie de centre $O$ ? Donne son angle en degrés.`, type: 'num', rep: 180, unite: '°', corr: r`Faire un demi-tour, c'est tourner de $180°$.` },
        { q: r`Par la translation qui transforme $A(1\,;\,2)$ en $B(4\,;\,-1)$, quelle est l'abscisse de l'image de $C(-2\,;\,5)$ ?`, type: 'num', rep: 1, corr: r`On ajoute $+3$ en abscisse et $-3$ en ordonnée : $C'(-2 + 3\,;\,5 - 3) = (1\,;\,2)$.` }
      ]
    }
  ]);

  addLecons('2nde', [
    {
      id: '2nde-statistiques', titre: 'Statistiques : moyenne, écart type et quartiles', domaine: 'Statistiques', nouveau: N,
      resume: 'Résumer une série par sa position (moyenne, médiane) et sa dispersion (écart type, quartiles).',
      yt: 'yvan monka écart type quartiles seconde',
      cours: r`
<p>Une série statistique se résume par deux types d'indicateurs : ceux de <b>position</b> (où sont les valeurs ?) et ceux de <b>dispersion</b> (sont-elles serrées ou étalées ?).</p>
<div class="def"><b>Moyenne pondérée</b><p>Valeurs $x_1, \dots, x_p$ d'effectifs $n_1, \dots, n_p$ et d'effectif total $N$ : $\bar{x} = \dfrac{n_1 x_1 + \dots + n_p x_p}{N}$.</p></div>
<div class="def"><b>Écart type</b><p>La variance est la moyenne des carrés des écarts à la moyenne : $V = \dfrac{1}{N}\sum n_i (x_i - \bar{x})^2$. L'écart type est $\sigma = \sqrt{V}$ : plus il est grand, plus la série est dispersée autour de la moyenne.</p></div>
<div class="def"><b>Quartiles</b><p>Les valeurs étant rangées dans l'ordre croissant, $Q_1$ est la plus petite valeur telle qu'au moins $25\,\%$ des valeurs lui soient inférieures ou égales ; $Q_3$ de même avec $75\,\%$. L'<b>écart interquartile</b> $Q_3 - Q_1$ mesure l'étalement de la moitié centrale.</p></div>
<div class="ex-box"><b>Exemple</b><p>Série $2, 4, 4, 5, 7, 8, 12, 14$ ($N = 8$). Moyenne $\dfrac{56}{8} = 7$. Médiane $\dfrac{5 + 7}{2} = 6$. $Q_1$ : $25\,\%$ de $8$ $= 2$, c'est la 2ᵉ valeur, $4$. $Q_3$ : $75\,\%$ de $8 = 6$, la 6ᵉ valeur, $8$. Écart interquartile $4$.</p></div>
<div class="attention"><b>Piège</b><p>La moyenne est sensible aux valeurs extrêmes, pas la médiane : ajouter un $100$ à la série change beaucoup $\bar{x}$ mais peu la médiane.</p></div>`,
      retenir: [r`$\bar{x} = \dfrac{\sum n_i x_i}{N}$ ; $\sigma = \sqrt{\dfrac{1}{N}\sum n_i (x_i - \bar{x})^2}$.`, r`$Q_1$ : rang $\lceil N/4 \rceil$ ; $Q_3$ : rang $\lceil 3N/4 \rceil$.`, r`Moyenne + écart type, ou médiane + quartiles.`],
      exos: [
        { q: r`Un élève a eu $12$ (coefficient $2$), $15$ (coefficient $1$) et $9$ (coefficient $3$). Quelle est sa moyenne ?`, type: 'num', rep: 11, corr: r`$\dfrac{2 \times 12 + 15 + 3 \times 9}{6} = \dfrac{24 + 15 + 27}{6} = \dfrac{66}{6} = 11$.` },
        { q: r`Calcule l'écart type de la série $2 ; 4 ; 6 ; 8$ (valeur exacte ou arrondie au centième).`, type: 'num', rep: Math.sqrt(5), tol: 0.006, corr: r`$\bar{x} = 5$ ; écarts $-3, -1, 1, 3$ ; carrés $9, 1, 1, 9$ ; $V = \dfrac{20}{4} = 5$ ; $\sigma = \sqrt{5} \approx 2{,}24$.` },
        { q: r`Série rangée : $3, 5, 6, 6, 9, 10, 11, 12, 15, 20$. Donne $Q_3$.`, type: 'num', rep: 12, corr: r`$N = 10$, $75\,\%$ de $10 = 7{,}5$, on prend la 8ᵉ valeur : $Q_3 = 12$.` }
      ]
    },
    {
      id: '2nde-echantillonnage', titre: 'Échantillonnage et fluctuation', domaine: 'Probabilités', nouveau: N,
      resume: 'Comprendre que la fréquence observée varie d\'un échantillon à l\'autre, et de combien.',
      yt: 'yvan monka échantillonnage fluctuation seconde',
      cours: r`
<p>On répète $n$ fois, de façon indépendante, une expérience où un événement a une probabilité $p$. La <b>fréquence observée</b> $f$ change d'un échantillon à l'autre : c'est la <b>fluctuation d'échantillonnage</b>.</p>
<div class="prop"><b>Loi des grands nombres (version simple)</b><p>Plus $n$ est grand, plus la fréquence observée $f$ se rapproche de la probabilité $p$.</p></div>
<div class="prop"><b>Précision</b><p>Pour $n$ assez grand, dans environ $95\,\%$ des échantillons, $f$ est à moins de $\dfrac{1}{\sqrt{n}}$ de $p$. Autrement dit, $f \in \left[p - \dfrac{1}{\sqrt{n}}\,;\,p + \dfrac{1}{\sqrt{n}}\right]$ le plus souvent.</p></div>
<div class="ex-box"><b>Exemple</b><p>On lance $400$ fois une pièce équilibrée ($p = 0{,}5$). $\dfrac{1}{\sqrt{400}} = 0{,}05$ : on s'attend à une fréquence de « pile » entre $0{,}45$ et $0{,}55$ dans $95\,\%$ des cas.</p></div>
<div class="methode"><b>Estimer une proportion</b><p>Inversement, si l'on observe $f$ sur un échantillon de taille $n$, la vraie proportion $p$ est probablement dans $\left[f - \dfrac{1}{\sqrt{n}}\,;\,f + \dfrac{1}{\sqrt{n}}\right]$. Pour gagner en précision (diviser la marge par $2$), il faut $4$ fois plus d'observations.</p></div>
<div class="attention"><b>Piège</b><p>Après $5$ « pile » de suite, « face » n'est pas plus probable : la pièce n'a pas de mémoire. C'est sur un très grand nombre de lancers que la fréquence se stabilise.</p></div>`,
      retenir: [r`La fréquence fluctue, mais se rapproche de $p$ quand $n$ grandit.`, r`Marge de fluctuation à $95\,\%$ : environ $\dfrac{1}{\sqrt{n}}$.`, r`Diviser la marge par $2$ : $4$ fois plus d'observations.`],
      exos: [
        { q: r`On lance $2\,500$ fois un dé équilibré. Quelle est la marge $\dfrac{1}{\sqrt{n}}$ ?`, type: 'num', rep: 0.02, corr: r`$\sqrt{2\,500} = 50$, donc $\dfrac{1}{50} = 0{,}02$.` },
        { q: r`Un sondage sur $900$ personnes donne $52\,\%$ de « oui ». Quelle est la borne basse de l'intervalle d'estimation (en décimal) ?`, type: 'num', rep: 0.52 - 1 / 30, tol: 0.002, corr: r`$\dfrac{1}{\sqrt{900}} = \dfrac{1}{30} \approx 0{,}033$, donc $p \in [0{,}487\,;\,0{,}553]$ environ : borne basse $\approx 0{,}487$.` },
        { q: r`Avec $100$ personnes, la marge est $0{,}1$. Combien de personnes faut-il interroger pour une marge de $0{,}025$ ?`, type: 'num', rep: 1600, corr: r`$\dfrac{1}{\sqrt{n}} = 0{,}025 \iff \sqrt{n} = 40 \iff n = 1\,600$ (marge divisée par $4$, donc $16$ fois plus).` }
      ]
    }
  ]);

  addLecons('1re', [
    {
      id: '1re-cercles', titre: 'Géométrie repérée : équations de cercles', domaine: 'Géométrie', nouveau: N,
      resume: 'Écrire l\'équation d\'un cercle, retrouver son centre et son rayon, couper une droite et un cercle.',
      yt: 'yvan monka équation de cercle première',
      cours: r`
<p>Dans un repère orthonormé, la distance entre $A(x_A\,;\,y_A)$ et $B(x_B\,;\,y_B)$ est $AB = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.</p>
<div class="prop"><b>Équation d'un cercle</b><p>Le cercle de centre $\Omega(a\,;\,b)$ et de rayon $r$ est l'ensemble des points $M(x\,;\,y)$ tels que $\Omega M = r$, soit : $(x - a)^2 + (y - b)^2 = r^2$.</p></div>
<div class="methode"><b>Retrouver centre et rayon</b><p>Avec $x^2 + y^2 - 6x + 4y - 3 = 0$, on complète les carrés : $x^2 - 6x = (x - 3)^2 - 9$ et $y^2 + 4y = (y + 2)^2 - 4$. L'équation devient $(x - 3)^2 + (y + 2)^2 = 16$ : centre $(3\,;\,-2)$, rayon $4$.</p></div>
<div class="prop"><b>Cercle de diamètre $[AB]$</b><p>$M$ est sur le cercle de diamètre $[AB]$ si et seulement si $\overrightarrow{MA} \cdot \overrightarrow{MB} = 0$ (angle droit en $M$).</p></div>
<div class="methode"><b>Intersection avec une droite</b><p>On remplace $y$ par l'expression donnée par la droite dans l'équation du cercle : on obtient une équation du second degré en $x$. Selon le signe de $\Delta$, la droite coupe le cercle en $2$, $1$ (tangente) ou $0$ point.</p></div>
<div class="attention"><b>Piège</b><p>Toute équation $x^2 + y^2 + \dots = 0$ n'est pas un cercle : si après complétion on trouve $(x - a)^2 + (y - b)^2 = k$ avec $k \lt 0$, il n'y a aucun point.</p></div>`,
      retenir: [r`Cercle : $(x - a)^2 + (y - b)^2 = r^2$.`, r`Compléter les carrés pour lire centre et rayon.`, r`Droite et cercle : équation du second degré, discuter selon $\Delta$.`],
      exos: [
        { q: r`Quel est le rayon du cercle d'équation $(x + 1)^2 + (y - 5)^2 = 49$ ?`, type: 'num', rep: 7, corr: r`$r^2 = 49$ donc $r = 7$ (et le centre est $(-1\,;\,5)$).` },
        { q: r`Le cercle $x^2 + y^2 - 8x + 2y + 8 = 0$ a pour centre $(a\,;\,b)$ et rayon $r$. Donne $r$.`, type: 'num', rep: 3, corr: r`$(x - 4)^2 - 16 + (y + 1)^2 - 1 + 8 = 0 \iff (x - 4)^2 + (y + 1)^2 = 9$ : centre $(4\,;\,-1)$, $r = 3$.` },
        { q: r`Combien de points d'intersection ont le cercle $x^2 + y^2 = 25$ et la droite $y = x + 1$ ?`, type: 'num', rep: 2, corr: r`$x^2 + (x + 1)^2 = 25 \iff 2x^2 + 2x - 24 = 0 \iff x^2 + x - 12 = 0$, $\Delta = 49 \gt 0$ : deux points, $x = 3$ et $x = -4$, soit $(3\,;\,4)$ et $(-4\,;\,-3)$.` }
      ]
    },
    {
      id: '1re-seuils', titre: 'Suites : seuils et algorithmes', domaine: 'Suites', nouveau: N,
      resume: 'Trouver à partir de quel rang une suite dépasse un seuil, avec une boucle « tant que ».',
      yt: 'yvan monka algorithme de seuil suite première python',
      cours: r`
<p>Une question classique : « à partir de quel rang $n$ a-t-on $u_n \gt S$ ? ». Quand on ne sait pas résoudre l'inéquation, on calcule les termes un par un avec un <b>algorithme de seuil</b>.</p>
<div class="methode"><b>L'algorithme (Python)</b><p><code>u = 1000 ; n = 0</code><br><code>while u &lt;= 2000 :</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;u = 1.05 * u ; n = n + 1</code><br><code>print(n)</code><br>Il affiche le premier rang où $u_n \gt 2\,000$ pour $u_{n+1} = 1{,}05\,u_n$, $u_0 = 1\,000$.</p></div>
<div class="ex-box"><b>Exemple</b><p>Un capital de $1\,000$ € placé à $5\,\%$ par an : $u_n = 1\,000 \times 1{,}05^n$. On trouve $1{,}05^{14} \approx 1{,}98$ et $1{,}05^{15} \approx 2{,}08$ : le capital double au bout de $15$ ans.</p></div>
<div class="prop"><b>Suites arithmétiques</b><p>Pour $u_n = u_0 + nr$ avec $r \gt 0$, on résout directement : $u_0 + nr \gt S \iff n \gt \dfrac{S - u_0}{r}$, et on prend le premier entier qui convient.</p></div>
<div class="methode"><b>Suites géométriques</b><p>Pour $u_n = u_0 q^n$, on teste les puissances à la calculatrice (tableau de valeurs). En terminale, le logarithme permettra de résoudre exactement $q^n \gt k$.</p></div>
<div class="attention"><b>Piège</b><p>Dans la boucle, la condition est celle pour <b>continuer</b> : pour trouver le premier $u_n \gt S$, on boucle <b>tant que</b> $u \leqslant S$.</p></div>`,
      retenir: [r`Seuil : boucler tant que la condition n'est pas atteinte, compter les tours.`, r`Arithmétique : résoudre $u_0 + nr \gt S$.`, r`Géométrique : tableau de valeurs de $q^n$.`],
      exos: [
        { q: r`$u_n = 3 + 7n$. Quel est le plus petit $n$ tel que $u_n \gt 100$ ?`, type: 'num', rep: 14, corr: r`$3 + 7n \gt 100 \iff n \gt \dfrac{97}{7} \approx 13{,}86$, donc $n = 14$ ($u_{14} = 101$).` },
        { q: r`$u_0 = 1$ et $u_{n+1} = 2u_n$. Quel est le plus petit $n$ tel que $u_n \gt 1\,000$ ?`, type: 'num', rep: 10, corr: r`$u_n = 2^n$ ; $2^9 = 512$ et $2^{10} = 1\,024$ : $n = 10$.` },
        { q: r`Une population de $500$ bactéries diminue de $20\,\%$ par heure. Au bout de combien d'heures passe-t-elle sous $100$ ?`, type: 'num', rep: 8, corr: r`$u_n = 500 \times 0{,}8^n$ ; $0{,}8^7 \approx 0{,}210$ donne $\approx 105$, $0{,}8^8 \approx 0{,}168$ donne $\approx 84$ : $8$ heures.` }
      ]
    }
  ]);

  addLecons('tle', [
    {
      id: 'tle-grands-nombres', titre: 'Sommes de variables aléatoires et loi des grands nombres', domaine: 'Probabilités', nouveau: N,
      resume: 'Espérance et variance d\'une somme, inégalité de Bienaymé-Tchebychev, moyenne d\'échantillon.',
      yt: 'yvan monka loi des grands nombres bienaymé tchebychev terminale',
      cours: r`
<div class="prop"><b>Linéarité</b><p>Pour toutes variables aléatoires $X$ et $Y$ et réels $a$, $b$ : $E(X + Y) = E(X) + E(Y)$ et $E(aX + b) = aE(X) + b$. Pour la variance : $V(aX + b) = a^2 V(X)$, et si $X$ et $Y$ sont <b>indépendantes</b>, $V(X + Y) = V(X) + V(Y)$.</p></div>
<div class="def"><b>Échantillon</b><p>Un échantillon de taille $n$ est une liste $X_1, \dots, X_n$ de variables indépendantes de même loi, d'espérance $\mu$ et de variance $\sigma^2$. Sa moyenne est $M_n = \dfrac{X_1 + \dots + X_n}{n}$, avec $E(M_n) = \mu$ et $V(M_n) = \dfrac{\sigma^2}{n}$.</p></div>
<div class="prop"><b>Inégalité de Bienaymé-Tchebychev</b><p>Pour tout $\delta \gt 0$ : $P\big(|X - E(X)| \geqslant \delta\big) \leqslant \dfrac{V(X)}{\delta^2}$.</p></div>
<div class="prop"><b>Loi faible des grands nombres</b><p>Pour tout $\delta \gt 0$ : $P\big(|M_n - \mu| \geqslant \delta\big) \leqslant \dfrac{\sigma^2}{n\delta^2} \xrightarrow[n \to +\infty]{} 0$. La moyenne d'échantillon se rapproche de l'espérance.</p></div>
<div class="ex-box"><b>Exemple</b><p>$X$ : nombre de « 6 » en $600$ lancers d'un dé, $X \sim \mathcal{B}(600, \tfrac16)$, $E(X) = 100$, $V(X) = 600 \times \tfrac16 \times \tfrac56 = \tfrac{250}{3}$. Alors $P(|X - 100| \geqslant 20) \leqslant \dfrac{250/3}{400} \approx 0{,}21$.</p></div>
<div class="attention"><b>Piège</b><p>$V(X + Y) = V(X) + V(Y)$ demande l'indépendance. Et $V(X - Y) = V(X) + V(Y)$ (et non la différence) quand $X$ et $Y$ sont indépendantes.</p></div>`,
      retenir: [r`$E$ est linéaire ; $V(aX + b) = a^2 V(X)$ ; $V(X + Y) = V(X) + V(Y)$ si indépendantes.`, r`$P(|X - E(X)| \geqslant \delta) \leqslant \dfrac{V(X)}{\delta^2}$.`, r`$V(M_n) = \dfrac{\sigma^2}{n}$ : la moyenne se concentre autour de $\mu$.`],
      exos: [
        { q: r`$E(X) = 4$ et $V(X) = 9$. Calcule $V(-2X + 5)$.`, type: 'num', rep: 36, corr: r`$V(-2X + 5) = (-2)^2 V(X) = 4 \times 9 = 36$.` },
        { q: r`$X$ et $Y$ indépendantes, $V(X) = 3$ et $V(Y) = 5$. Que vaut $V(X - Y)$ ?`, type: 'num', rep: 8, corr: r`$V(X - Y) = V(X) + (-1)^2 V(Y) = 3 + 5 = 8$.` },
        { q: r`Avec $V(X) = 4$, quel majorant l'inégalité de Bienaymé-Tchebychev donne-t-elle pour $P(|X - E(X)| \geqslant 5)$ ?`, type: 'num', rep: 0.16, corr: r`$\dfrac{V(X)}{\delta^2} = \dfrac{4}{25} = 0{,}16$.` }
      ]
    },
    {
      id: 'tle-orthogonalite', titre: 'Orthogonalité et distances dans l\'espace', domaine: 'Géométrie', nouveau: N,
      resume: 'Produit scalaire dans l\'espace, vecteur normal, équation cartésienne d\'un plan et projeté orthogonal.',
      yt: 'yvan monka équation cartésienne plan vecteur normal terminale',
      cours: r`
<p>Dans un repère orthonormé de l'espace, le produit scalaire de $\vec u(x\,;\,y\,;\,z)$ et $\vec v(x'\,;\,y'\,;\,z')$ est $\vec u \cdot \vec v = xx' + yy' + zz'$, et $\|\vec u\| = \sqrt{x^2 + y^2 + z^2}$.</p>
<div class="prop"><b>Orthogonalité</b><p>$\vec u \perp \vec v \iff \vec u \cdot \vec v = 0$. Une droite est orthogonale à un plan si elle est orthogonale à deux droites sécantes de ce plan.</p></div>
<div class="def"><b>Vecteur normal</b><p>Un vecteur $\vec n$ non nul est <b>normal</b> au plan $\mathcal{P}$ s'il est orthogonal à tous les vecteurs du plan. Si $\vec n(a\,;\,b\,;\,c)$ est normal à $\mathcal{P}$, alors $\mathcal{P}$ a une équation $ax + by + cz + d = 0$.</p></div>
<div class="methode"><b>Équation d'un plan</b><p>Plan passant par $A(1\,;\,2\,;\,-1)$ de vecteur normal $\vec n(2\,;\,-1\,;\,3)$ : $2x - y + 3z + d = 0$ et $A$ dedans donne $2 - 2 - 3 + d = 0$, donc $d = 3$ : $2x - y + 3z + 3 = 0$.</p></div>
<div class="methode"><b>Projeté orthogonal et distance</b><p>Le projeté $H$ de $M$ sur $\mathcal{P}$ est sur la droite passant par $M$ dirigée par $\vec n$ : $H = M + t\,\vec n$, et on trouve $t$ en écrivant $H \in \mathcal{P}$. La distance de $M$ au plan est $MH$, c'est la plus courte.</p></div>
<div class="attention"><b>Piège</b><p>Deux droites orthogonales de l'espace ne sont pas forcément sécantes (on dit « perpendiculaires » seulement si elles se coupent).</p></div>`,
      retenir: [r`$\vec u \cdot \vec v = xx' + yy' + zz'$ ; orthogonaux $\iff$ produit nul.`, r`$\vec n(a\,;\,b\,;\,c)$ normal $\Rightarrow$ plan $ax + by + cz + d = 0$.`, r`Projeté : $H = M + t\vec n$ avec $H \in \mathcal{P}$.`],
      exos: [
        { q: r`Calcule $\vec u \cdot \vec v$ pour $\vec u(1\,;\,-2\,;\,3)$ et $\vec v(4\,;\,5\,;\,2)$.`, type: 'num', rep: 0, corr: r`$4 - 10 + 6 = 0$ : les vecteurs sont orthogonaux.` },
        { q: r`Le plan passant par $A(2\,;\,0\,;\,1)$ de vecteur normal $\vec n(1\,;\,3\,;\,-2)$ a une équation $x + 3y - 2z + d = 0$. Donne $d$.`, type: 'num', rep: 0, corr: r`$2 + 0 - 2 + d = 0$, donc $d = 0$ : le plan passe par l'origine.` },
        { q: r`Quelle est la distance du point $M(1\,;\,2\,;\,3)$ au plan $z = 0$ ?`, type: 'num', rep: 3, corr: r`Le projeté est $H(1\,;\,2\,;\,0)$ et $MH = 3$.` }
      ]
    }
  ]);

  addLecons('mpsi', [
    {
      id: 'mpsi-matrices', titre: 'Calcul matriciel', domaine: 'Algèbre', nouveau: N,
      resume: 'Produit de matrices, matrices inversibles, puissances et lien avec les systèmes linéaires.',
      yt: 'calcul matriciel produit inverse cours prépa',
      cours: r`
<div class="def"><b>Produit</b><p>Si $A \in \mathcal{M}_{n,p}(\mathbb{K})$ et $B \in \mathcal{M}_{p,q}(\mathbb{K})$, $AB \in \mathcal{M}_{n,q}(\mathbb{K})$ est définie par $(AB)_{ij} = \displaystyle\sum_{k=1}^{p} a_{ik}b_{kj}$ : ligne $i$ de $A$ « contre » colonne $j$ de $B$.</p></div>
<div class="prop"><b>Règles</b><p>Le produit est associatif et distributif, mais <b>pas commutatif</b> en général, et $AB = 0$ n'implique pas $A = 0$ ou $B = 0$. Si $AB = BA$, la formule du binôme s'applique : $(A + B)^n = \displaystyle\sum_{k=0}^{n} \binom{n}{k} A^k B^{n-k}$.</p></div>
<div class="def"><b>Inversibilité</b><p>$A \in \mathcal{M}_n(\mathbb{K})$ est inversible s'il existe $B$ avec $AB = BA = I_n$. Pour $n = 2$ : $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ est inversible si et seulement si $ad - bc \neq 0$, et son inverse est $\dfrac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.</p></div>
<div class="methode"><b>Système linéaire</b><p>Le système $AX = Y$ a une unique solution pour tout $Y$ si et seulement si $A$ est inversible, et alors $X = A^{-1}Y$. Le pivot de Gauss sur $(A \mid I_n)$ donne $(I_n \mid A^{-1})$.</p></div>
<div class="ex-box"><b>Puissances</b><p>$N = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ vérifie $N^2 = 0$ (nilpotente). Pour $A = I_2 + N$, comme $I_2$ et $N$ commutent : $A^n = I_2 + nN = \begin{pmatrix} 1 & n \\ 0 & 1 \end{pmatrix}$.</p></div>
<div class="attention"><b>Piège</b><p>$(A + B)^2 = A^2 + AB + BA + B^2$, qui ne vaut $A^2 + 2AB + B^2$ que si $A$ et $B$ commutent. Et $(AB)^{-1} = B^{-1}A^{-1}$ (l'ordre s'inverse).</p></div>`,
      retenir: [r`$(AB)_{ij} = \sum_k a_{ik}b_{kj}$ ; produit non commutatif.`, r`$2 \times 2$ : inversible $\iff ad - bc \neq 0$.`, r`Binôme seulement si $AB = BA$ ; $(AB)^{-1} = B^{-1}A^{-1}$.`],
      exos: [
        { q: r`Calcule le coefficient en ligne $1$, colonne $2$ de $\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}$.`, type: 'num', rep: 22, corr: r`Ligne $1$ par colonne $2$ : $1 \times 6 + 2 \times 8 = 22$.` },
        { q: r`Pour quelle valeur de $m$ la matrice $\begin{pmatrix} 2 & m \\ 3 & 6 \end{pmatrix}$ n'est-elle pas inversible ?`, type: 'num', rep: 4, corr: r`$\det = 12 - 3m = 0 \iff m = 4$.` },
        { q: r`Avec $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$, quel est le coefficient en haut à droite de $A^{10}$ ?`, type: 'num', rep: 10, corr: r`$A = I_2 + N$ avec $N^2 = 0$ et $I_2N = NI_2$, donc $A^{10} = I_2 + 10N$ : le coefficient vaut $10$.` }
      ]
    },
    {
      id: 'mpsi-equadiff', titre: 'Équations différentielles linéaires', domaine: 'Analyse', nouveau: N,
      resume: 'Résoudre $y\' + a(x)y = b(x)$ et $y\'\' + ay\' + by = f$ à coefficients constants.',
      yt: 'équations différentielles linéaires premier second ordre cours prépa',
      cours: r`
<div class="prop"><b>Premier ordre</b><p>Sur un intervalle $I$, avec $a$ et $b$ continues : les solutions de $y' + a(x)y = 0$ sont $y = \lambda e^{-A(x)}$ où $A$ est une primitive de $a$. Celles de $y' + a(x)y = b(x)$ sont $y = y_p + \lambda e^{-A}$, avec $y_p$ une solution particulière.</p></div>
<div class="methode"><b>Variation de la constante</b><p>On cherche $y_p = \lambda(x)e^{-A(x)}$ : on trouve $\lambda'(x) = b(x)e^{A(x)}$. Exemple : $y' + y = x$ ; $y_p = x - 1$ convient, donc $y = x - 1 + \lambda e^{-x}$.</p></div>
<div class="prop"><b>Second ordre à coefficients constants</b><p>Pour $y'' + ay' + by = 0$, on résout l'équation caractéristique $r^2 + ar + b = 0$. Deux racines réelles $r_1 \neq r_2$ : $y = \lambda e^{r_1 x} + \mu e^{r_2 x}$. Racine double $r$ : $y = (\lambda x + \mu)e^{rx}$. Racines $\alpha \pm i\omega$ : $y = e^{\alpha x}(\lambda\cos \omega x + \mu \sin \omega x)$.</p></div>
<div class="ex-box"><b>Exemple</b><p>$y'' + 4y = 0$ : $r^2 + 4 = 0$, $r = \pm 2i$, donc $y = \lambda \cos 2x + \mu \sin 2x$. Avec $y(0) = 1$ et $y'(0) = 0$ : $y = \cos 2x$.</p></div>
<div class="methode"><b>Second membre exponentiel</b><p>Pour $y'' + ay' + by = Ce^{mx}$ : si $m$ n'est pas racine, on cherche $y_p = ke^{mx}$ ; racine simple : $y_p = kxe^{mx}$ ; racine double : $y_p = kx^2 e^{mx}$.</p></div>
<div class="attention"><b>Piège</b><p>Un problème de Cauchy (valeurs de $y$ et $y'$ en un point) a une <b>unique</b> solution : les constantes se calculent sur la solution générale complète, pas sur la seule partie homogène.</p></div>`,
      retenir: [r`$y' + ay = b$ : $y = y_p + \lambda e^{-A}$.`, r`$y'' + ay' + by = 0$ : équation caractéristique $r^2 + ar + b = 0$.`, r`Second membre $e^{mx}$ : $ke^{mx}$, $kxe^{mx}$ ou $kx^2 e^{mx}$.`],
      exos: [
        { q: r`La solution de $y' = 3y$ avec $y(0) = 2$ vaut $y(x) = 2e^{kx}$. Donne $k$.`, type: 'num', rep: 3, corr: r`$y' - 3y = 0$, $y = \lambda e^{3x}$ et $y(0) = \lambda = 2$.` },
        { q: r`Pour $y'' - 5y' + 6y = 0$, donne la somme des racines de l'équation caractéristique.`, type: 'num', rep: 5, corr: r`$r^2 - 5r + 6 = (r - 2)(r - 3)$ : racines $2$ et $3$, de somme $5$. Solutions $\lambda e^{2x} + \mu e^{3x}$.` },
        { q: r`$y'' + y = 0$, $y(0) = 0$, $y'(0) = 2$. Calcule $y(\pi/2)$.`, type: 'num', rep: 2, corr: r`$y = \lambda \cos x + \mu \sin x$ ; $y(0) = \lambda = 0$ et $y'(0) = \mu = 2$ : $y = 2\sin x$, donc $y(\pi/2) = 2$.` }
      ]
    }
  ]);
})();
