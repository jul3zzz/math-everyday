/* Math Everyday — noyau : utilitaires, icônes, logo, stockage, correction des réponses, thèmes. */
(function () {
  'use strict';

  /* ---------------- Utilitaires ---------------- */
  var U = {
    esc: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    $: function (sel, root) { return (root || document).querySelector(sel); },
    $$: function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); },
    today: function (d) {
      d = d || new Date();
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    },
    addDays: function (iso, n) {
      var p = iso.split('-');
      var d = new Date(+p[0], +p[1] - 1, +p[2] + n);
      return U.today(d);
    },
    dateLongue: function (d) {
      return (d || new Date()).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    },
    shuffle: function (a) {
      a = a.slice();
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
      return a;
    },
    plural: function (n, s, p) { return n + ' ' + (n > 1 ? (p || s + 's') : s); },
    /* Rendu KaTeX des délimiteurs $…$ et $$…$$ dans un élément. */
    math: function (root) {
      if (!window.renderMathInElement) return;
      try {
        window.renderMathInElement(root, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false,
          strict: 'ignore',
          ignoredTags: ['script', 'noscript', 'style', 'textarea', 'input']
        });
      } catch (e) { /* le texte brut reste lisible */ }
    }
  };

  /* ---------------- Icônes (traits 1.8, 24×24) ---------------- */
  var P = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
    crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    play: '<path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none"/>',
    playline: '<circle cx="12" cy="12" r="9.5"/><path d="M10 8.5v7l6-3.5z"/>',
    check: '<path d="M4.5 12.5l5 5 10-11"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    unlock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 7.8-1.2"/>',
    flame: '<path d="M12 22c4 0 7-2.8 7-6.8 0-3.4-2.3-5.6-3.6-7.4-.5 1.8-1.5 3-2.6 3.2.4-3.4-1.2-6.6-4.3-9 .2 3.2-1.4 5.3-3 7.3C4.3 10.8 5 13.3 5 15.2 5 19.2 8 22 12 22z"/>',
    clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3.5 2"/>',
    mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/>',
    palette: '<path d="M12 2.5a9.5 9.5 0 1 0 0 19c1.3 0 2-.8 2-1.8 0-1.4-1.3-1.7-1.3-3 0-1 .8-1.7 1.8-1.7H17a4.5 4.5 0 0 0 4.5-4.5C21.5 6.3 17.3 2.5 12 2.5z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10.5" cy="7" r="1.2"/><circle cx="15.5" cy="7.5" r="1.2"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    target: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.5"/>',
    star: '<path d="M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.4L12 17.4l-5.7 3 1.1-6.4L2.8 9.5l6.4-.9z"/>',
    pencil: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.6-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.6 4.5L20 16M20 20v-4h-4"/>',
    shield: '<path d="M12 2.5l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    infinity: '<path d="M7 8.5c-2 0-3.5 1.5-3.5 3.5S5 15.5 7 15.5c3.5 0 6.5-7 10-7 2 0 3.5 1.5 3.5 3.5S19 15.5 17 15.5c-3.5 0-6.5-7-10-7z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6"/>',
    bulb: '<path d="M9 18h6M10 21.5h4M12 2.5a6.5 6.5 0 0 0-4 11.6c.7.6 1 1.4 1 2.4h6c0-1 .3-1.8 1-2.4a6.5 6.5 0 0 0-4-11.6z"/>',
    trash: '<path d="M4 6.5h16M9.5 6.5V4h5v2.5M6.5 6.5l1 14h9l1-14"/>'
  };
  function I(name, cls) {
    return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
  }

  /* ---------------- Logo φ ---------------- */
  var LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true">' +
    '<rect class="lg-shadow" x="7" y="7" width="55" height="55" rx="16"/>' +
    '<rect class="lg-bg" x="3" y="3" width="55" height="55" rx="14"/>' +
    '<circle class="lg-ring" cx="30.5" cy="30.5" r="23" fill="none" stroke-width="1"/>' +
    '<g class="lg-phi" fill="none" stroke-width="4.6" stroke-linecap="round">' +
    '<ellipse cx="30.5" cy="31" rx="13.2" ry="10.6"/>' +
    '<path d="M30.5 12.5v37"/></g></svg>';

  /* Rectangle d'or découpé en carrés + spirale (quarts de cercle). */
  function rectangleOr(w) {
    var phi = (1 + Math.sqrt(5)) / 2;
    var h = w / phi, x = 0, y = 0, W = w, H = h;
    var sq = '', d = '', k = 0, px = 0, py = h;
    d = 'M' + px.toFixed(2) + ' ' + py.toFixed(2);
    for (var i = 0; i < 11; i++) {
      var s, ex, ey;
      if (k === 0) { s = H; sq += r(x, y, s); ex = x + s; ey = y; x += s; W -= s; }
      else if (k === 1) { s = W; sq += r(x, y, s); ex = x + s; ey = y + s; y += s; H -= s; }
      else if (k === 2) { s = H; sq += r(x + W - s, y, s); ex = x + W - s; ey = y + s; W -= s; }
      else { s = W; sq += r(x, y + H - s, s); ex = x; ey = y + H - s; H -= s; }
      d += ' A' + s.toFixed(2) + ' ' + s.toFixed(2) + ' 0 0 1 ' + ex.toFixed(2) + ' ' + ey.toFixed(2);
      k = (k + 1) % 4;
    }
    function r(a, b, s) { return '<rect class="ga-sq" x="' + a.toFixed(2) + '" y="' + b.toFixed(2) + '" width="' + s.toFixed(2) + '" height="' + s.toFixed(2) + '"/>'; }
    return '<svg viewBox="-6 -6 ' + (w + 12) + ' ' + (h + 12) + '" role="img" aria-label="Rectangle d\'or et sa spirale">' +
      sq + '<rect class="ga-frame" x="0" y="0" width="' + w + '" height="' + h.toFixed(2) + '"/>' +
      '<path class="ga-spiral" d="' + d + '"/>' +
      '<text class="ga-phi" x="' + (h * 0.5).toFixed(1) + '" y="' + (h * 0.62).toFixed(1) + '" text-anchor="middle" font-size="' + (h * 0.42).toFixed(0) + '" font-style="italic">φ</text>' +
      '</svg>';
  }

  /* ---------------- Stockage local ---------------- */
  var KEY = 'mathEveryday.v1';
  var defaut = function () {
    return {
      v: 1, theme: null, profil: null, niveau: null, placement: null,
      faites: {}, jour: null, premium: null, notif: { actif: true, heure: '17:30' }
    };
  };
  var etat;
  try { etat = JSON.parse(localStorage.getItem(KEY)) || defaut(); } catch (e) { etat = defaut(); }
  var base = defaut();
  for (var k in base) if (!(k in etat)) etat[k] = base[k];

  var Store = {
    get: function () { return etat; },
    save: function () { try { localStorage.setItem(KEY, JSON.stringify(etat)); } catch (e) { /* stockage indisponible : on reste en mémoire */ } },
    set: function (patch) { for (var k in patch) etat[k] = patch[k]; Store.save(); },
    reset: function () { var t = etat.theme; etat = defaut(); etat.theme = t; Store.save(); },
    estPremium: function () { return !!etat.premium; },
    marquerFaite: function (id, score) {
      var prev = etat.faites[id];
      etat.faites[id] = { date: U.today(), score: score, best: Math.max(score, prev ? prev.best || prev.score : 0) };
      Store.save();
    },
    serie: function () {
      var jours = {};
      for (var id in etat.faites) jours[etat.faites[id].date] = 1;
      var d = U.today(), n = 0;
      if (!jours[d]) d = U.addDays(d, -1);
      while (jours[d]) { n++; d = U.addDays(d, -1); }
      return n;
    }
  };

  /* ---------------- Correction des réponses ---------------- */
  /* Lit une réponse numérique : 3,5 · -2/3 · 5√3 · π/4 · 2^10 · √(2)/2 · 3e² … (petit analyseur, sans eval). */
  function nombre(str) {
    var s = String(str).trim().toLowerCase()
      .replace(/\s+/g, '').replace(/[−–]/g, '-').replace(/,/g, '.').replace(/[×·]/g, '*').replace(/÷/g, '/')
      .replace(/km\/h|m\/s|cm\/s/g, '').replace(/sqrt|racine/g, '√').replace(/pi/g, 'π').replace(/²/g, '^2').replace(/³/g, '^3')
      .replace(/(cm|m|km|dm)\^?[23]?$|€|°|%|min$|kg$|mm$|h$|s$|l$|g$/g, '');
    if (s === '') return NaN;
    var i = 0;
    function voir() { return s[i]; }
    function somme() {
      var v = produit();
      while (voir() === '+' || voir() === '-') { var o = s[i++]; var w = produit(); v = o === '+' ? v + w : v - w; }
      return v;
    }
    function produit() {
      var v = unaire();
      for (;;) {
        var c = voir();
        if (c === '*' || c === '/') { i++; var w = unaire(); v = c === '*' ? v * w : v / w; }
        else if (c && /[\d.(√πe]/.test(c)) { v = v * puissance(); } /* multiplication implicite : 5√3, 2π */
        else return v;
      }
    }
    function unaire() {
      if (voir() === '-') { i++; return -unaire(); }
      if (voir() === '+') { i++; return unaire(); }
      return puissance();
    }
    function puissance() {
      var b = atome();
      if (voir() === '^') { i++; return Math.pow(b, unaire()); }
      return b;
    }
    function atome() {
      var c = voir();
      if (c === '(') { i++; var v = somme(); if (voir() !== ')') throw 0; i++; return v; }
      if (c === '√') { i++; return Math.sqrt(voir() === '(' ? atome() : nb()); }
      if (c === 'π') { i++; return Math.PI; }
      if (c === 'e' && !/\d/.test(s[i + 1] || '')) { i++; return Math.E; }
      return nb();
    }
    function nb() {
      var m = s.slice(i).match(/^\d*\.?\d+/);
      if (!m) throw 0;
      i += m[0].length;
      return parseFloat(m[0]);
    }
    try { var v = somme(); return i === s.length && isFinite(v) ? v : NaN; } catch (e) { return NaN; }
  }
  function texteNorm(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '').replace(/\*/g, '').replace(/×/g, '').replace(/−/g, '-')
      .replace(/²/g, '^2').replace(/³/g, '^3').replace(/,/g, '.');
  }
  var Check = {
    nombre: nombre,
    /* exo : {type:'num'|'qcm'|'liste'|'texte', rep, tol} ; val : saisie (ou index pour qcm) */
    juger: function (exo, val) {
      if (exo.type === 'qcm') return Number(val) === exo.rep;
      if (exo.type === 'num') {
        var v = nombre(val); if (isNaN(v)) return false;
        var tol = exo.tol != null ? exo.tol : 1e-6 * Math.max(1, Math.abs(exo.rep));
        return Math.abs(v - exo.rep) <= tol + 1e-12;
      }
      if (exo.type === 'liste') {
        var parts = String(val).split(/;|\bet\b/).map(function (x) { return nombre(x); }).filter(function (x) { return !isNaN(x); });
        if (parts.length !== exo.rep.length) return false;
        var a = parts.slice().sort(function (p, q) { return p - q; });
        var b = exo.rep.slice().sort(function (p, q) { return p - q; });
        var tl = exo.tol != null ? exo.tol : 1e-6;
        return a.every(function (x, i) { return Math.abs(x - b[i]) <= tl; });
      }
      if (exo.type === 'texte') {
        var n = texteNorm(val);
        return exo.rep.some(function (r) { return texteNorm(r) === n; });
      }
      return false;
    },
    aide: function (exo) {
      if (exo.aide) return exo.aide;
      if (exo.type === 'num') return exo.tol && exo.tol >= 0.005 ? 'Valeur exacte ou arrondie. Tu peux écrire 3/4, √2, π/3, 2^5…' : 'Virgule ou point. Tu peux écrire 3/4, √2, π/3, 2^5…';
      if (exo.type === 'liste') return 'Sépare les valeurs par un point-virgule, ex. : 2 ; -3 (π/3, √2… acceptés)';
      if (exo.type === 'texte') return 'Écris ta réponse sans espaces superflus.';
      return '';
    }
  };

  /* ---------------- Thèmes ---------------- */
  var THEMES = [
    { id: 'minimal', nom: 'Minimaliste', desc: 'Noir et blanc, épuré, sans distraction.' },
    { id: 'enfantin', nom: 'Enfantin', desc: 'Maximaliste, coloré, plein d\'énergie.' },
    { id: 'dore', nom: 'Doré élégant', desc: 'Crème et or, comme un vieux traité de géométrie.' }
  ];
  var Theme = {
    liste: THEMES,
    appliquer: function (id) {
      if (!THEMES.some(function (t) { return t.id === id; })) id = 'minimal';
      document.documentElement.setAttribute('data-theme', id);
      Store.set({ theme: id });
      var b = document.getElementById('theme-btn');
      if (b) b.innerHTML = I('palette') + '<span>' + U.esc(Theme.nom(id)) + '</span>';
    },
    actuel: function () { return document.documentElement.getAttribute('data-theme'); },
    nom: function (id) { var t = THEMES.filter(function (t) { return t.id === id; })[0]; return t ? t.nom : ''; }
  };
  document.documentElement.setAttribute('data-theme', etat.theme || 'minimal');

  /* ---------------- Modale & toast ---------------- */
  var dernierFocus = null;
  var Modal = {
    ouvrir: function (html, opts) {
      opts = opts || {};
      var m = document.getElementById('modal');
      var box = m.querySelector('.modal-box');
      box.classList.toggle('wide', !!opts.large);
      document.getElementById('modal-body').innerHTML = html;
      dernierFocus = document.activeElement;
      m.hidden = false;
      U.math(m);
      var f = m.querySelector('[autofocus], .modal-body button, #modal-body button, #modal-body input') || box;
      setTimeout(function () { f.focus(); }, 30);
      return m;
    },
    fermer: function () {
      var m = document.getElementById('modal');
      if (m.hidden) return;
      m.hidden = true;
      document.getElementById('modal-body').innerHTML = '';
      if (dernierFocus && dernierFocus.focus) dernierFocus.focus();
    }
  };
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) Modal.fermer();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') Modal.fermer(); });

  var tTimer;
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('on');
    clearTimeout(tTimer); tTimer = setTimeout(function () { t.classList.remove('on'); }, 2600);
  }

  window.U = U; window.I = I; window.LOGO = LOGO; window.rectangleOr = rectangleOr;
  window.Store = Store; window.Check = Check; window.Theme = Theme; window.Modal = Modal; window.toast = toast;
  window.LECONS = window.LECONS || [];
  /* Les fichiers data/lecons-*.js appellent addLecons([...]) */
  window.addLecons = function (niveau, liste) {
    liste.forEach(function (l, i) { l.niveau = niveau; l.ordre = i + 1; window.LECONS.push(l); });
  };
})();
