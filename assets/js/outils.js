/* Math Everyday — tiroir d'outils (calculatrice, notes, brouillon, géométrie, formulaire), ouvert
   depuis n'importe quelle page. Boutons flottants, raccourcis Alt+C / Alt+N / Alt+B / Alt+G / Alt+F,
   largeur réglable à la souris, mode plein écran. */
(function () {
  'use strict';
  function ic(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }
  var ICONES = {
    calc: ic('<rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><rect x="7.5" y="5.5" width="9" height="4" rx="1"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01M16 16.5h.01M8 19.5h.01M12 19.5h4"/>'),
    notes: ic('<path d="M14.5 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7.5z"/><path d="M14.5 2.5v5h5M8 12.5h8M8 16h5"/>'),
    brouillon: ic('<path d="M3 17c3-6 5 2 8-3s4 1 6-2 3 2 4 1"/><path d="M4 21h16"/>'),
    geometrie: ic('<path d="M4 20L12 4l8 16z"/><circle cx="12" cy="14" r="3.5"/>'),
    formulaire: ic('<path d="M5 4h14v16H5z"/><path d="M8 8h3M8 12h8M8 16h5M14 7l2 2-2 2"/>'),
    plus: ic('<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>'),
    agrandir: ic('<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>'),
    reduire: ic('<path d="M20 10h-6V4M4 14h6v6M14 10l7-7M10 14l-7 7"/>')
  };
  var OUTILS = [
    ['calc', 'Calculatrice', 'c', 460], ['notes', 'Notes', 'n', 780], ['brouillon', 'Brouillon', 'b', 720],
    ['geometrie', 'Géométrie', 'g', 760], ['formulaire', 'Formulaire', 'f', 560]
  ];
  var el, ouvert = null, grand = false, contexte = { lecon: null }, dernierAutre = 'brouillon';

  function prefs() { var s = Store.get(); s.outilsUi = s.outilsUi || {}; return s.outilsUi; }
  function largeur(o) { var p = prefs(), d = OUTILS.filter(function (x) { return x[0] === o; })[0]; return p['l_' + o] || d[3]; }

  function init() {
    var fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = '<button type="button" class="fab-b" data-outil="calc" aria-label="Ouvrir la calculatrice (Alt+C)" title="Calculatrice (Alt+C)">' + ICONES.calc + '<span>Calculatrice</span></button>' +
      '<button type="button" class="fab-b" data-outil="notes" aria-label="Ouvrir les notes (Alt+N)" title="Notes (Alt+N)">' + ICONES.notes + '<span>Notes</span></button>' +
      '<button type="button" class="fab-b" data-outil="@autre" aria-label="Autres outils : brouillon, géométrie, formulaire" title="Brouillon, géométrie, formulaire">' + ICONES.plus + '<span>Outils</span></button>';
    document.body.appendChild(fab);
    el = document.createElement('aside');
    el.className = 'outils'; el.id = 'outils'; el.hidden = true;
    el.setAttribute('aria-label', 'Outils');
    el.innerHTML = '<div class="outils-poignee" title="Glisser pour redimensionner" aria-hidden="true"></div>' +
      '<div class="outils-h"><div class="outils-tabs" role="tablist">' +
      OUTILS.map(function (o) { return '<button type="button" role="tab" class="outils-tab" data-outil="' + o[0] + '" title="' + o[1] + ' (Alt+' + o[2].toUpperCase() + ')">' + ICONES[o[0]] + '<span>' + o[1] + '</span></button>'; }).join('') + '</div>' +
      '<span class="spacer"></span>' +
      '<button type="button" class="nt-b" id="outils-grand" aria-label="Plein écran" title="Plein écran">' + ICONES.agrandir + '</button>' +
      '<button type="button" class="nt-b" id="outils-fermer" aria-label="Fermer les outils" title="Fermer (Échap)">' + ic('<path d="M6 6l12 12M18 6L6 18"/>') + '</button></div>' +
      OUTILS.map(function (o) { return '<div class="outils-c" id="outils-' + o[0] + '" hidden></div>'; }).join('');
    document.body.appendChild(el);

    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-outil]');
      if (!b) return;
      var o = b.getAttribute('data-outil');
      if (o === '@autre') o = dernierAutre;
      if (ouvert === o && b.closest('.fab')) fermer(); else ouvrir(o);
    });
    U.$('#outils-fermer', el).onclick = fermer;
    U.$('#outils-grand', el).onclick = function () { grand = !grand; appliquerLargeur(); this.innerHTML = grand ? ICONES.reduire : ICONES.agrandir; this.setAttribute('aria-label', grand ? 'Taille normale' : 'Plein écran'); };
    document.addEventListener('keydown', function (e) {
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        var t = OUTILS.filter(function (o) { return e.key.toLowerCase() === o[2]; })[0];
        if (t) { e.preventDefault(); ouvert === t[0] ? fermer() : ouvrir(t[0]); return; }
      }
      if (e.key === 'Escape' && ouvert && document.getElementById('modal').hidden) {
        if (e.target.closest && e.target.closest('.pop')) return;
        fermer();
      }
    });
    /* redimensionnement */
    var poignee = U.$('.outils-poignee', el), dep = null;
    poignee.addEventListener('pointerdown', function (e) { dep = { x: e.clientX, w: el.offsetWidth }; poignee.setPointerCapture(e.pointerId); document.body.classList.add('redim'); });
    poignee.addEventListener('pointermove', function (e) {
      if (!dep) return;
      var w = Math.max(340, Math.min(window.innerWidth - 40, dep.w + dep.x - e.clientX));
      el.style.width = w + 'px';
      prefs()['l_' + ouvert] = w;
      redessiner();
    });
    poignee.addEventListener('pointerup', function () { if (dep) { dep = null; document.body.classList.remove('redim'); Store.save(); redessiner(); } });
    window.addEventListener('resize', function () { if (ouvert === 'notes' && window.Notes) Notes.adapter(); });
  }
  function redessiner() {
    if (ouvert === 'notes' && window.Notes) Notes.adapter();
    if (ouvert === 'calc' && window.Calculatrice) Calculatrice.redessiner();
    if (ouvert === 'brouillon' && window.Brouillon) Brouillon.redessiner();
    if (ouvert === 'geometrie' && window.Geometrie) Geometrie.redessiner();
  }
  function appliquerLargeur() {
    el.classList.toggle('grand', grand);
    el.style.width = grand ? '' : largeur(ouvert) + 'px';
    setTimeout(redessiner, 0);
  }

  function ouvrir(o) {
    if (ouvert === 'notes' && window.Notes) Notes.enregistrer();
    ouvert = o;
    if (o !== 'calc' && o !== 'notes') dernierAutre = o;
    el.hidden = false;
    document.body.classList.add('outils-ouverts');
    U.$$('.outils-tab', el).forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-outil') === o); });
    OUTILS.forEach(function (x) { U.$('#outils-' + x[0], el).hidden = x[0] !== o; });
    appliquerLargeur();
    var c = U.$('#outils-' + o, el);
    if (o === 'calc') Calculatrice.monter(c);
    else if (o === 'notes') Notes.monter(c, contexte);
    else if (o === 'brouillon') Brouillon.monter(c);
    else if (o === 'geometrie') Geometrie.monter(c);
    else if (o === 'formulaire') Formulaire.monter(c, true);
  }
  function fermer() {
    if (ouvert === 'notes' && window.Notes) Notes.enregistrer();
    ouvert = null; el.hidden = true;
    document.body.classList.remove('outils-ouverts');
  }

  window.Outils = {
    init: init, ouvrir: ouvrir, fermer: fermer,
    route: function (r, param) {
      contexte.lecon = r === 'lecon' ? param : null;
      /* le mode libre a sa propre calculatrice : sur téléphone, les boutons flottants gêneraient la feuille */
      document.body.classList.toggle('route-atelier', r === 'atelier');
      if (window.Notes) Notes.contexte(contexte);
      /* un changement de compte (connexion / déconnexion) remonte l'outil ouvert */
      if (ouvert) ouvrir(ouvert);
    }
  };
})();
