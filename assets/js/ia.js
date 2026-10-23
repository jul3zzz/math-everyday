/* Math Everyday — « Pourquoi c'est faux ? » : diagnostic automatique de l'erreur (sans IA),
   puis explication par IA quand un service est configuré dans config.js. Expose window.IA. */
(function () {
  'use strict';
  var esc = U.esc;
  function cfg() { return (window.ME_CONFIG && window.ME_CONFIG.ia) || {}; }
  function quota() {
    var s = Store.get(); s.ia = s.ia || { jour: null, n: 0 };
    if (s.ia.jour !== U.today()) { s.ia.jour = U.today(); s.ia.n = 0; }
    return Store.estPremium() ? Infinity : Math.max(0, (cfg().limiteGratuite || 3) - s.ia.n);
  }

  /* Repère les erreurs classiques en comparant la réponse donnée à la réponse attendue. */
  function diagnostic(exo, val) {
    var D = [];
    if (exo.type === 'qcm') {
      D.push('Relis chaque proposition et élimine celles qui sont impossibles : calcule un ordre de grandeur, teste une valeur simple, ou vérifie la propriété du cours en jeu.');
      return D;
    }
    if (exo.type === 'liste') {
      var parts = String(val).split(/;|\bet\b/).map(function (x) { return Check.nombre(x); }).filter(function (x) { return !isNaN(x); });
      if (parts.length < exo.rep.length) D.push('Il manque ' + (exo.rep.length - parts.length) + ' solution' + (exo.rep.length - parts.length > 1 ? 's' : '') + ' : une équation du second degré ou un produit nul en a souvent plusieurs (pense aux valeurs négatives).');
      else if (parts.length > exo.rep.length) D.push('Tu as donné trop de valeurs : vérifie chacune en la remplaçant dans l\'équation.');
      else D.push('Vérifie chaque valeur en la remplaçant dans l\'équation de départ.');
      return D;
    }
    if (exo.type !== 'num') return D;
    var v = Check.nombre(val), a = exo.rep;
    if (isNaN(v)) { D.push('Ta réponse n\'a pas été comprise comme un nombre. Écris par exemple 3,5 ou 7/2 ou √2.'); return D; }
    var proche = function (x, y) { return Math.abs(x - y) <= 1e-6 * Math.max(1, Math.abs(y)); };
    if (a !== 0 && proche(v, -a)) D.push('<b>Erreur de signe.</b> Ta réponse est l\'opposé du bon résultat. Vérifie les règles des signes et les soustractions de nombres négatifs.');
    else if (a !== 0 && [10, 100, 1000, 0.1, 0.01, 0.001].some(function (k) { return proche(v, a * k); })) D.push('<b>Erreur de virgule ou d\'unité.</b> Ta réponse a les bons chiffres mais pas la bonne puissance de 10. Vérifie les conversions et la position de la virgule.');
    else if (a !== 0 && v !== 0 && proche(v, 1 / a)) D.push('<b>Inverse.</b> Tu as trouvé l\'inverse du résultat : as-tu inversé un quotient (numérateur et dénominateur) ?');
    else if (a !== 0 && (proche(v, 2 * a) || proche(v, a / 2))) D.push('<b>Facteur 2.</b> Tu es à un facteur 2 près : un oubli de « ÷ 2 » (aire d\'un triangle, rayon/diamètre, milieu) ou un double produit ?');
    else if (a !== 0 && proche(v * v, a) || proche(v, a * a)) D.push('<b>Carré ou racine.</b> Ta réponse est liée au bon résultat par un carré : as-tu oublié une racine carrée, ou élevé au carré en trop ?');
    else if (Math.abs(v - a) <= 0.05 * Math.max(1, Math.abs(a))) D.push('<b>Presque !</b> Tu es très proche : c\'est sûrement un arrondi trop tôt ou une petite erreur de calcul. Garde les valeurs exactes jusqu\'à la fin.');
    else if (Number.isInteger(a) && Math.abs(v - a) === 1) D.push('<b>Erreur d\'une unité.</b> Attention aux inégalités strictes, aux bornes incluses ou exclues, et aux décomptes (on compte souvent un intervalle de trop ou de moins).');
    else D.push('La démarche n\'est pas la bonne. Reprends la méthode du cours, puis compare ton calcul ligne par ligne avec la correction.');
    if (exo.tol && exo.tol >= 0.005) D.push('Cet exercice accepte une valeur arrondie : vérifie la précision demandée (dixième, centième…).');
    return D;
  }

  function expliquer(exo, val, lecon) {
    var D = diagnostic(exo, val);
    var actif = !!cfg().endpoint, reste = quota();
    Modal.ouvrir('<h2 id="modal-title">Pourquoi c\'est faux ?</h2>' +
      '<div class="ia-q small muted">Ta réponse : <b>' + esc(val || '—') + '</b></div>' +
      '<h3 style="font-size:1rem;margin-top:16px">Diagnostic</h3><ul class="retenir">' + D.map(function (d) { return '<li>' + I('bulb') + '<span>' + d + '</span></li>'; }).join('') + '</ul>' +
      '<h3 style="font-size:1rem;margin-top:16px">Explication personnalisée par IA</h3><div id="ia-zone">' +
      (actif
        ? (reste > 0 ? '<button class="btn btn-sm" type="button" id="ia-go">' + I('star') + 'Demander à l\'IA' + (reste === Infinity ? '' : ' (' + reste + ' restante' + (reste > 1 ? 's' : '') + ' aujourd\'hui)') + '</button>' : '<p class="small muted">Tu as utilisé tes explications IA gratuites du jour. Elles sont illimitées avec l\'abonnement.</p>')
        : '<p class="small muted">Bientôt disponible : une IA t\'expliquera ton erreur pas à pas, à partir de ta réponse. En attendant, le diagnostic ci-dessus et la correction détaillée sont là pour toi.</p>') +
      '</div><div class="btn-row" style="margin-top:16px"><button class="btn btn-2" type="button" data-close>Fermer</button></div>', { large: true });
    var b = U.$('#ia-go');
    if (b) b.onclick = function () {
      var z = U.$('#ia-zone'); z.innerHTML = '<p class="small muted">L\'IA réfléchit…</p>';
      var s = Store.get(); s.ia.n++; Store.save();
      fetch(cfg().endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: exo.q, attendu: exo.type === 'qcm' ? exo.choix[exo.rep] : exo.rep, eleve: val, correction: exo.corr, niveau: lecon ? lecon.niveau : (Store.get().niveau || '') })
      }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (j) { z.innerHTML = '<div class="card card-flat ia-rep">' + esc(j.texte || '').replace(/\n/g, '<br>') + '</div>'; U.math(z); })
        .catch(function () { z.innerHTML = '<p class="err">L\'explication n\'a pas pu être obtenue. Réessaie plus tard.</p>'; });
    };
  }
  window.IA = { expliquer: expliquer, diagnostic: diagnostic };
})();
