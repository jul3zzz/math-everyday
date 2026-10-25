/* Math Everyday — brouillon à dessiner : stylo (sensible à la pression), surligneur, gomme,
   règle, compas, plusieurs pages, fonds (blanc, carreaux, lignes, repère), annuler/rétablir, export PNG.
   Expose window.Brouillon. */
(function () {
  'use strict';
  var COULEURS = ['#111827', '#2563eb', '#dc2626', '#16a34a', '#ea580c', '#9333ea'];
  var OUTILS = [['stylo', 'Stylo'], ['surligneur', 'Surligneur'], ['gomme', 'Gomme'], ['regle', 'Règle'], ['compas', 'Compas']];
  var FONDS = [['blanc', 'Blanc'], ['carreaux', 'Carreaux'], ['lignes', 'Lignes'], ['repere', 'Repère']];
  var el, cv, ctx, dpr = 1, enCours = null, outil = 'stylo', couleur = COULEURS[0], epaisseur = 3, refaire = [];

  function etat() {
    var s = Store.get();
    s.brouillon = s.brouillon || { pages: [{ traits: [] }], cur: 0, fond: 'carreaux' };
    var b = s.brouillon; if (!b.pages.length) b.pages.push({ traits: [] }); b.cur = Math.min(b.cur, b.pages.length - 1);
    return b;
  }
  function pageCour() { var b = etat(); return b.pages[b.cur]; }
  function sauver() { try { Store.save(); } catch (e) { toast('Brouillon trop lourd pour être enregistré : efface une page.'); } }

  function ic(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }
  var ICONES = {
    stylo: ic('<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>'),
    surligneur: ic('<path d="M9 15l-4 4h5l2-2M9 15l8-8 3 3-8 8z"/><path d="M4 21h16" stroke-width="3" opacity=".45"/>'),
    gomme: ic('<path d="M8 20h12M5 14l8-8a2 2 0 0 1 3 0l3 3a2 2 0 0 1 0 3l-7 7H9z"/>'),
    regle: ic('<rect x="2.5" y="8" width="19" height="8" rx="1" transform="rotate(-20 12 12)"/><path d="M7 10.5l.7 2M10 9.5l.7 2M13 8.3l.7 2M16 7.2l.7 2"/>'),
    compas: ic('<circle cx="12" cy="4.5" r="1.6"/><path d="M11 6l-5 14M13 6l4.2 11.5M17.2 17.5l1.6 2.5"/><path d="M8 14h8" opacity=".6"/>')
  };

  function monter(conteneur) {
    el = conteneur;
    var b = etat();
    el.innerHTML = '<div class="br">' +
      '<div class="br-barre" role="toolbar" aria-label="Outils de dessin">' +
      OUTILS.map(function (o) { return '<button type="button" class="nt-b' + (o[0] === outil ? ' on' : '') + '" data-outil-br="' + o[0] + '" title="' + o[1] + '" aria-label="' + o[1] + '" aria-pressed="' + (o[0] === outil) + '">' + ICONES[o[0]] + '</button>'; }).join('') +
      '<span class="nt-sep"></span>' +
      COULEURS.map(function (c) { return '<button type="button" class="sw" data-coul-br="' + c + '" style="--sw:' + c + '" aria-checked="' + (c === couleur) + '" role="radio" aria-label="Couleur ' + c + '"></button>'; }).join('') +
      '<label class="br-ep" title="Épaisseur"><span class="sr">Épaisseur</span><input type="range" min="1" max="16" value="' + epaisseur + '" id="br-ep"></label>' +
      '<span class="nt-sep"></span>' +
      '<button type="button" class="nt-b" id="br-annuler" title="Annuler" aria-label="Annuler">↶</button><button type="button" class="nt-b" id="br-refaire" title="Rétablir" aria-label="Rétablir">↷</button>' +
      '<select class="input nt-sel" id="br-fond" aria-label="Fond">' + FONDS.map(function (f) { return '<option value="' + f[0] + '"' + (f[0] === b.fond ? ' selected' : '') + '>' + f[1] + '</option>'; }).join('') + '</select>' +
      '<button type="button" class="cb" id="br-effacer">Effacer la page</button><button type="button" class="cb" id="br-png">Exporter en image</button>' +
      '</div>' +
      '<div class="br-pages" id="br-pages"></div>' +
      '<div class="br-cadre"><canvas id="br-cv" aria-label="Feuille de brouillon : dessine avec la souris, le doigt ou un stylet"></canvas><div class="br-info" id="br-info"></div></div>' +
      '</div>';
    cv = U.$('#br-cv', el); ctx = cv.getContext('2d');
    pages();
    taille();
    lier();
  }
  function pages() {
    var b = etat(), z = U.$('#br-pages', el);
    z.innerHTML = b.pages.map(function (p, i) { return '<button type="button" class="cb' + (i === b.cur ? ' on' : '') + '" data-page="' + i + '">Page ' + (i + 1) + '</button>'; }).join('') +
      '<button type="button" class="cb" id="br-plus">+ Page</button>' + (b.pages.length > 1 ? '<button type="button" class="cb" id="br-moins">Supprimer cette page</button>' : '');
  }
  function taille() {
    if (!cv || !document.body.contains(cv)) return;
    dpr = window.devicePixelRatio || 1;
    var w = cv.clientWidth, h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    dessiner();
  }
  function couleursFond() {
    var cs = getComputedStyle(document.documentElement);
    return { fond: '#ffffff', grille: 'rgba(100,116,139,.22)', axe: 'rgba(30,41,59,.55)' , ink: cs.getPropertyValue('--ink').trim() };
  }
  function dessiner() {
    if (!ctx) return;
    var w = cv.clientWidth, h = cv.clientHeight, b = etat(), c = couleursFond();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = c.fond; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = c.grille; ctx.lineWidth = 1; ctx.beginPath();
    if (b.fond === 'carreaux' || b.fond === 'repere') { for (var x = 0.5; x < w; x += 24) { ctx.moveTo(x, 0); ctx.lineTo(x, h); } for (var y = 0.5; y < h; y += 24) { ctx.moveTo(0, y); ctx.lineTo(w, y); } }
    if (b.fond === 'lignes') { for (var y2 = 32.5; y2 < h; y2 += 32) { ctx.moveTo(0, y2); ctx.lineTo(w, y2); } }
    ctx.stroke();
    if (b.fond === 'repere') {
      var ox = Math.round(w / 2 / 24) * 24 + 0.5, oy = Math.round(h / 2 / 24) * 24 + 0.5;
      ctx.strokeStyle = c.axe; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, h); ctx.stroke();
      ctx.fillStyle = c.axe; ctx.font = '11px system-ui'; ctx.fillText('O', ox - 12, oy + 14); ctx.fillText('1', ox + 21, oy + 14); ctx.fillText('1', ox - 10, oy - 20);
    }
    pageCour().traits.forEach(trait);
    if (enCours) trait(enCours);
  }
  function trait(t) {
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = t.c;
    if (t.t === 'surligneur') { ctx.globalAlpha = 0.32; ctx.lineCap = 'square'; }
    if (t.t === 'stylo' || t.t === 'surligneur') {
      var p = t.p;
      if (p.length === 1) { ctx.fillStyle = t.c; ctx.beginPath(); ctx.arc(p[0][0], p[0][1], t.w / 2, 0, 2 * Math.PI); ctx.fill(); ctx.restore(); return; }
      for (var i = 1; i < p.length; i++) {
        var a = p[i - 1], b = p[i], pr = t.t === 'stylo' ? (0.45 + (b[2] || 0.5)) : 1;
        ctx.lineWidth = t.w * pr;
        ctx.beginPath();
        if (i > 1) { var m0 = [(p[i - 2][0] + a[0]) / 2, (p[i - 2][1] + a[1]) / 2], m1 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; ctx.moveTo(m0[0], m0[1]); ctx.quadraticCurveTo(a[0], a[1], m1[0], m1[1]); }
        else { ctx.moveTo(a[0], a[1]); ctx.lineTo((a[0] + b[0]) / 2, (a[1] + b[1]) / 2); }
        ctx.stroke();
      }
      var l = p[p.length - 1], l2 = p[p.length - 2]; ctx.beginPath(); ctx.moveTo((l2[0] + l[0]) / 2, (l2[1] + l[1]) / 2); ctx.lineTo(l[0], l[1]); ctx.stroke();
    } else if (t.t === 'regle') {
      ctx.lineWidth = t.w; ctx.beginPath(); ctx.moveTo(t.a[0], t.a[1]); ctx.lineTo(t.b[0], t.b[1]); ctx.stroke();
    } else if (t.t === 'compas') {
      ctx.lineWidth = t.w; ctx.beginPath(); ctx.arc(t.a[0], t.a[1], Math.hypot(t.b[0] - t.a[0], t.b[1] - t.a[1]), 0, 2 * Math.PI); ctx.stroke();
      ctx.fillStyle = t.c; ctx.beginPath(); ctx.arc(t.a[0], t.a[1], 2.2, 0, 2 * Math.PI); ctx.fill();
    }
    ctx.restore();
  }
  function pos(e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top, e.pressure && e.pointerType === 'pen' ? e.pressure : 0.5]; }
  function gommer(pt) {
    var p = pageCour(), R = Math.max(8, epaisseur * 2), avant = p.traits.length;
    p.traits = p.traits.filter(function (t) {
      if (t.p) return !t.p.some(function (q) { return Math.hypot(q[0] - pt[0], q[1] - pt[1]) < R; });
      if (t.t === 'regle') return distSeg(pt, t.a, t.b) >= R;
      if (t.t === 'compas') return Math.abs(Math.hypot(pt[0] - t.a[0], pt[1] - t.a[1]) - Math.hypot(t.b[0] - t.a[0], t.b[1] - t.a[1])) >= R;
      return true;
    });
    if (p.traits.length !== avant) dessiner();
  }
  function distSeg(p, a, b) {
    var dx = b[0] - a[0], dy = b[1] - a[1], l = dx * dx + dy * dy, t = l ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l)) : 0;
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
  }
  function info(t) {
    var z = U.$('#br-info', el); if (!z) return;
    if (!t) { z.textContent = ''; return; }
    var d = Math.hypot(t.b[0] - t.a[0], t.b[1] - t.a[1]) / 24;
    var ang = Math.atan2(t.a[1] - t.b[1], t.b[0] - t.a[0]) * 180 / Math.PI;
    z.textContent = t.t === 'regle' ? 'Longueur ≈ ' + d.toFixed(1).replace('.', ',') + ' carreaux · angle ≈ ' + Math.round(ang) + '°' : 'Rayon ≈ ' + d.toFixed(1).replace('.', ',') + ' carreaux';
  }
  function lier() {
    var annule = [];
    cv.addEventListener('pointerdown', function (e) {
      e.preventDefault(); cv.setPointerCapture(e.pointerId); refaire = [];
      var p = pos(e);
      if (outil === 'gomme') { enCours = { t: 'gomme' }; gommer(p); return; }
      if (outil === 'regle' || outil === 'compas') { enCours = { t: outil, c: couleur, w: Math.max(1.5, epaisseur * 0.7), a: [p[0], p[1]], b: [p[0], p[1]] }; return; }
      enCours = { t: outil, c: couleur, w: outil === 'surligneur' ? epaisseur * 4 : epaisseur, p: [p] };
    });
    cv.addEventListener('pointermove', function (e) {
      if (!enCours) return;
      var co = e.getCoalescedEvents ? e.getCoalescedEvents() : null;
      var evts = co && co.length ? co : [e];
      evts.forEach(function (ev) {
        var p = pos(ev);
        if (enCours.t === 'gomme') { gommer(p); return; }
        if (enCours.a) { enCours.b = [p[0], p[1]]; if (e.shiftKey && enCours.t === 'regle') { var dx = p[0] - enCours.a[0], dy = p[1] - enCours.a[1], ang = Math.round(Math.atan2(dy, dx) / (Math.PI / 12)) * Math.PI / 12, L = Math.hypot(dx, dy); enCours.b = [enCours.a[0] + L * Math.cos(ang), enCours.a[1] + L * Math.sin(ang)]; } info(enCours); return; }
        var q = enCours.p[enCours.p.length - 1];
        if (Math.hypot(p[0] - q[0], p[1] - q[1]) >= 1.2) enCours.p.push([Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10, Math.round(p[2] * 100) / 100]);
      });
      dessiner();
    });
    function finir() {
      if (!enCours) return;
      if (enCours.t !== 'gomme') pageCour().traits.push(enCours);
      enCours = null; info(null); dessiner(); sauver();
    }
    cv.addEventListener('pointerup', finir);
    cv.addEventListener('pointercancel', finir);
    el.querySelector('.br-barre').onclick = function (e) {
      var o = e.target.closest('[data-outil-br]');
      if (o) { outil = o.getAttribute('data-outil-br'); U.$$('[data-outil-br]', el).forEach(function (x) { var on = x === o; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); }); return; }
      var c = e.target.closest('[data-coul-br]');
      if (c) { couleur = c.getAttribute('data-coul-br'); U.$$('[data-coul-br]', el).forEach(function (x) { x.setAttribute('aria-checked', x === c); }); if (outil === 'gomme') outil = 'stylo'; return; }
      if (e.target.closest('#br-annuler')) { var t = pageCour().traits.pop(); if (t) { refaire.push(t); dessiner(); sauver(); } return; }
      if (e.target.closest('#br-refaire')) { var r = refaire.pop(); if (r) { pageCour().traits.push(r); dessiner(); sauver(); } return; }
      if (e.target.closest('#br-effacer')) { if (pageCour().traits.length && confirm('Effacer toute la page ?')) { pageCour().traits = []; dessiner(); sauver(); } return; }
      if (e.target.closest('#br-png')) { exporter(); return; }
    };
    U.$('#br-ep', el).oninput = function () { epaisseur = +this.value; };
    U.$('#br-fond', el).onchange = function () { etat().fond = this.value; dessiner(); sauver(); };
    U.$('#br-pages', el).onclick = function (e) {
      var b = etat(), p = e.target.closest('[data-page]');
      if (p) { b.cur = +p.getAttribute('data-page'); refaire = []; pages(); dessiner(); sauver(); return; }
      if (e.target.closest('#br-plus')) { if (b.pages.length >= 10) { toast('10 pages maximum'); return; } b.pages.push({ traits: [] }); b.cur = b.pages.length - 1; pages(); dessiner(); sauver(); return; }
      if (e.target.closest('#br-moins')) { if (confirm('Supprimer la page ' + (b.cur + 1) + ' ?')) { b.pages.splice(b.cur, 1); b.cur = Math.max(0, b.cur - 1); pages(); dessiner(); sauver(); } }
    };
  }
  function exporter() {
    var a = document.createElement('a');
    a.href = cv.toDataURL('image/png');
    a.download = 'brouillon-page-' + (etat().cur + 1) + '.png';
    document.body.appendChild(a); a.click(); a.remove();
  }
  /* image PNG d'une page, pour le cahier complet en PDF */
  function imagePage(i) {
    var page = etat().pages[i];
    if (!page || !page.traits.length) return null;
    var w = 0, h = 0;
    page.traits.forEach(function (t) { (t.p || [t.a, t.b]).forEach(function (q) { w = Math.max(w, q[0]); h = Math.max(h, q[1]); }); if (t.t === 'compas') { var r = Math.hypot(t.b[0] - t.a[0], t.b[1] - t.a[1]); w = Math.max(w, t.a[0] + r); h = Math.max(h, t.a[1] + r); } });
    var c = document.createElement('canvas'), ancien = ctx;
    c.width = Math.ceil(Math.max(480, w + 30)); c.height = Math.ceil(Math.max(320, h + 30));
    ctx = c.getContext('2d'); ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, c.width, c.height);
    page.traits.forEach(trait);
    ctx = ancien;
    return c.toDataURL('image/png');
  }
  var dejaEcoute = false;
  window.Brouillon = {
    imagePage: imagePage,
    nbPages: function () { return etat().pages.length; },
    monter: function (c) {
      monter(c);
      if (!dejaEcoute) {
        dejaEcoute = true;
        window.addEventListener('resize', taille);
        document.addEventListener('keydown', function (e) {
          if (!cv || !document.body.contains(cv) || !cv.offsetParent) return;
          if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.target.closest('input,textarea,[contenteditable]')) { e.preventDefault(); U.$('#br-annuler', el).click(); }
        });
      }
    },
    redessiner: taille
  };
})();
