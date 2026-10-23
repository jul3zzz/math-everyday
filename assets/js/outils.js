/* Math Everyday — tiroir d'outils (calculatrice + notes), ouvert depuis n'importe quelle page.
   Boutons flottants, raccourcis Alt+C / Alt+N, largeur réglable à la souris, mode plein écran. */
(function () {
  'use strict';
  var ICONES = {
    calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><rect x="7.5" y="5.5" width="9" height="4" rx="1"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01M16 16.5h.01M8 19.5h.01M12 19.5h4"/></svg>',
    notes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7.5z"/><path d="M14.5 2.5v5h5M8 12.5h8M8 16h5"/></svg>',
    agrandir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>',
    reduire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M20 10h-6V4M4 14h6v6M14 10l7-7M10 14l-7 7"/></svg>'
  };
  var el, ouvert = null, monte = {}, grand = false, contexte = { lecon: null };

  function prefs() { var s = Store.get(); s.outilsUi = s.outilsUi || { lCalc: 460, lNotes: 780 }; return s.outilsUi; }

  function init() {
    var fab = document.createElement('div');
    fab.className = 'fab';
    fab.innerHTML = '<button type="button" class="fab-b" data-outil="calc" aria-label="Ouvrir la calculatrice (Alt+C)" title="Calculatrice (Alt+C)">' + ICONES.calc + '<span>Calculatrice</span></button>' +
      '<button type="button" class="fab-b" data-outil="notes" aria-label="Ouvrir les notes (Alt+N)" title="Notes (Alt+N)">' + ICONES.notes + '<span>Notes</span></button>';
    document.body.appendChild(fab);
    el = document.createElement('aside');
    el.className = 'outils'; el.id = 'outils'; el.hidden = true;
    el.setAttribute('aria-label', 'Outils');
    el.innerHTML = '<div class="outils-poignee" title="Glisser pour redimensionner" aria-hidden="true"></div>' +
      '<div class="outils-h"><div class="outils-tabs" role="tablist">' +
      '<button type="button" role="tab" class="outils-tab" data-outil="calc">' + ICONES.calc + 'Calculatrice</button>' +
      '<button type="button" role="tab" class="outils-tab" data-outil="notes">' + ICONES.notes + 'Notes</button></div>' +
      '<span class="spacer"></span>' +
      '<button type="button" class="nt-b" id="outils-grand" aria-label="Plein écran" title="Plein écran">' + ICONES.agrandir + '</button>' +
      '<button type="button" class="nt-b" id="outils-fermer" aria-label="Fermer les outils" title="Fermer (Échap)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="outils-c" id="outils-calc" hidden></div><div class="outils-c" id="outils-notes" hidden></div>';
    document.body.appendChild(el);

    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-outil]');
      if (!b) return;
      var o = b.getAttribute('data-outil');
      if (ouvert === o && b.closest('.fab')) fermer(); else ouvrir(o);
    });
    U.$('#outils-fermer', el).onclick = fermer;
    U.$('#outils-grand', el).onclick = function () { grand = !grand; appliquerLargeur(); this.innerHTML = grand ? ICONES.reduire : ICONES.agrandir; this.setAttribute('aria-label', grand ? 'Taille normale' : 'Plein écran'); };
    document.addEventListener('keydown', function (e) {
      if (e.altKey && !e.ctrlKey && (e.key === 'c' || e.key === 'C')) { e.preventDefault(); ouvert === 'calc' ? fermer() : ouvrir('calc'); }
      if (e.altKey && !e.ctrlKey && (e.key === 'n' || e.key === 'N')) { e.preventDefault(); ouvert === 'notes' ? fermer() : ouvrir('notes'); }
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
      prefs()[ouvert === 'notes' ? 'lNotes' : 'lCalc'] = w;
      if (ouvert === 'notes' && window.Notes) Notes.adapter(); else if (window.Calculatrice) Calculatrice.redessiner();
    });
    poignee.addEventListener('pointerup', function () { if (dep) { dep = null; document.body.classList.remove('redim'); Store.save(); } });
    window.addEventListener('resize', function () { if (ouvert === 'notes' && window.Notes) Notes.adapter(); });
  }

  function appliquerLargeur() {
    var p = prefs();
    el.classList.toggle('grand', grand);
    el.style.width = grand ? '' : (ouvert === 'notes' ? p.lNotes : p.lCalc) + 'px';
    setTimeout(function () { if (ouvert === 'notes' && window.Notes) Notes.adapter(); if (ouvert === 'calc' && window.Calculatrice) Calculatrice.redessiner(); }, 0);
  }

  function ouvrir(o) {
    if (ouvert === 'notes' && window.Notes) Notes.enregistrer();
    ouvert = o;
    el.hidden = false;
    document.body.classList.add('outils-ouverts');
    U.$$('.outils-tab', el).forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-outil') === o); });
    U.$$('.fab-b').forEach(function (t) { t.classList.toggle('on', t.getAttribute('data-outil') === o); });
    U.$('#outils-calc', el).hidden = o !== 'calc';
    U.$('#outils-notes', el).hidden = o !== 'notes';
    appliquerLargeur();
    if (o === 'calc') { Calculatrice.monter(U.$('#outils-calc', el)); monte.calc = true; }
    if (o === 'notes') { Notes.monter(U.$('#outils-notes', el), contexte); monte.notes = true; }
  }
  function fermer() {
    if (ouvert === 'notes' && window.Notes) Notes.enregistrer();
    ouvert = null; el.hidden = true;
    document.body.classList.remove('outils-ouverts');
    U.$$('.fab-b').forEach(function (t) { t.classList.remove('on'); });
  }

  window.Outils = {
    init: init, ouvrir: ouvrir, fermer: fermer,
    route: function (r, param) {
      contexte.lecon = r === 'lecon' ? param : null;
      if (window.Notes) Notes.contexte(contexte);
      /* un changement de compte (connexion / déconnexion) remonte les outils ouverts */
      if (ouvert) ouvrir(ouvert);
    }
  };
})();
