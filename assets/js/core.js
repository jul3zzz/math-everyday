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
    trash: '<path d="M4 6.5h16M9.5 6.5V4h5v2.5M6.5 6.5l1 14h9l1-14"/>',
    compass: '<circle cx="12" cy="4.5" r="2"/><path d="M11 6.3L5 21M13 6.3L19 21M7.2 15h9.6"/>',
    download: '<path d="M12 3.5v12M7 10.5l5 5 5-5M4 20.5h16"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    chevron: '<path d="M7 10l5 5 5-5"/>',
    calc: '<rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><rect x="7.5" y="5.5" width="9" height="4" rx="1"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01M16 16.5h.01M8 19.5h.01M12 19.5h4"/>',
    sparkle:'<path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9z"/><path d="M19 17v4M17 19h4"/>'
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
  /* Plusieurs comptes par appareil : racine = { theme, comptes: { mail: { hash, sel, data } }, actif }.
     Store.get() renvoie les données du compte connecté (ou d'un invité, non sauvegardé). */
  /* 26/10/2026 : nouveau départ, tous les comptes existants sont effacés (vérification par e-mail obligatoire) */
  ['mathEveryday.v1', 'mathEveryday.v2', 'mathEveryday.fauxcloud'].forEach(function (k) { try { localStorage.removeItem(k); } catch (e) { /* rien */ } });
  var KEY = 'mathEveryday.v3';
  var defaut = function () {
    return {
      profil: null, niveau: null, placement: null, classe: null,
      faites: {}, jour: null, premium: null, notif: { actif: true, heure: '17:30' },
      notes: [], carnets: ['Général'], calc: { hist: [], vars: {}, angle: 'deg' }
    };
  };
  function completer(d) { var b = defaut(); for (var k in b) if (!(k in d)) d[k] = b[k]; return d; }
  var racine;
  try { racine = JSON.parse(localStorage.getItem(KEY)); } catch (e) { racine = null; }
  if (!racine) {
    racine = { v: 3, theme: null, comptes: {}, actif: null };
    /* Reprise de la version 1 (un seul profil, sans mot de passe) */
    try {
      var v1 = JSON.parse(localStorage.getItem('mathEveryday.v1'));
      if (v1) {
        racine.theme = v1.theme || null;
        if (v1.profil && v1.profil.mail) {
          var m1 = v1.profil.mail.toLowerCase();
          delete v1.theme; delete v1.v;
          racine.comptes[m1] = { hash: null, sel: null, data: completer(v1) };
          racine.actif = m1;
        }
      }
    } catch (e) { /* rien à reprendre */ }
  }
  var etat = racine.actif && racine.comptes[racine.actif] ? completer(racine.comptes[racine.actif].data) : defaut();

  function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, '0'); }).join(''); }
  function hacher(sel, mdp) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(sel + ':' + mdp)).then(hex);
  }
  function nouveauSel() { var a = new Uint8Array(16); crypto.getRandomValues(a); return hex(a.buffer); }

  var Store = {
    get: function () { return etat; },
    save: function (sansHorodatage) {
      if (racine.actif && racine.comptes[racine.actif]) { if (!sansHorodatage) etat._maj = Date.now(); racine.comptes[racine.actif].data = etat; }
      try { localStorage.setItem(KEY, JSON.stringify(racine)); } catch (e) { /* stockage indisponible : on reste en mémoire */ }
      if (Store.apresSauvegarde && racine.actif) Store.apresSauvegarde(etat);
    },
    /* accès internes pour la synchronisation en ligne (synchro.js) */
    _defaut: function () { return defaut(); },
    _activer: function (mail, data, infos) {
      mail = mail.toLowerCase();
      racine.comptes[mail] = Object.assign(racine.comptes[mail] || { hash: null, sel: null }, infos || {}, { data: completer(data) });
      racine.actif = mail; etat = racine.comptes[mail].data;
      try { localStorage.setItem(KEY, JSON.stringify(racine)); } catch (e) { /* mémoire seule */ }
    },
    _local: function (mail) { var c = racine.comptes[String(mail).toLowerCase()]; return c ? c.data : null; },
    _quitter: function () { racine.actif = null; etat = defaut(); try { localStorage.setItem(KEY, JSON.stringify(racine)); } catch (e) { /* mémoire seule */ } },
    set: function (patch) { for (var k in patch) etat[k] = patch[k]; Store.save(); },
    theme: function () { return racine.theme; },
    setTheme: function (id) { racine.theme = id; Store.save(); },
    connecte: function () { return !!(racine.actif && racine.comptes[racine.actif]); },
    existe: function (mail) { return !!racine.comptes[String(mail).trim().toLowerCase()]; },
    nbComptes: function () { return Object.keys(racine.comptes).length; },
    /* infos : { nom, mail, mdp, classe, notif } — renvoie une promesse */
    creerCompte: function (infos) {
      var mail = infos.mail.trim().toLowerCase();
      if (racine.comptes[mail]) return Promise.reject(new Error('existe'));
      var sel = nouveauSel();
      return hacher(sel, infos.mdp).then(function (h) {
        var d = defaut();
        d.profil = { nom: infos.nom, mail: mail, cree: U.today() };
        d.classe = infos.classe;
        d.notif = infos.notif;
        racine.comptes[mail] = { hash: h, sel: sel, data: d };
        racine.actif = mail; etat = d; Store.save();
      });
    },
    connexion: function (mail, mdp) {
      mail = String(mail).trim().toLowerCase();
      var c = racine.comptes[mail];
      if (!c) return Promise.reject(new Error('inconnu'));
      if (!c.hash) { /* compte repris de la v1 : le premier mot de passe saisi devient le sien */
        c.sel = nouveauSel();
        return hacher(c.sel, mdp).then(function (h) { c.hash = h; racine.actif = mail; etat = completer(c.data); Store.save(); });
      }
      return hacher(c.sel, mdp).then(function (h) {
        if (h !== c.hash) throw new Error('mdp');
        racine.actif = mail; etat = completer(c.data); Store.save();
      });
    },
    changerMdp: function (ancien, nouveau) {
      var c = racine.comptes[racine.actif];
      return hacher(c.sel, ancien).then(function (h) {
        if (c.hash && h !== c.hash) throw new Error('mdp');
        c.sel = nouveauSel();
        return hacher(c.sel, nouveau);
      }).then(function (h2) { c.hash = h2; Store.save(); });
    },
    changerMail: function (nouveau) {
      nouveau = nouveau.trim().toLowerCase();
      if (nouveau === racine.actif) return true;
      if (racine.comptes[nouveau]) return false;
      racine.comptes[nouveau] = racine.comptes[racine.actif];
      delete racine.comptes[racine.actif];
      racine.actif = nouveau; etat.profil.mail = nouveau; Store.save();
      return true;
    },
    deconnexion: function () { Store.save(); racine.actif = null; etat = defaut(); Store.save(); },
    supprimerCompte: function () { delete racine.comptes[racine.actif]; racine.actif = null; etat = defaut(); Store.save(); },
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
      if (exo.type === 'une') {
        /* plusieurs bonnes réponses possibles : chaque valeur donnée doit en faire partie */
        var vals = String(val).split(/;|\bet\b/).map(function (x) { return nombre(x); }).filter(function (x) { return !isNaN(x); });
        var t1 = exo.tol != null ? exo.tol : 1e-6;
        return vals.length > 0 && vals.every(function (x) { return exo.rep.some(function (r) { return Math.abs(x - r) <= t1; }); });
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
      if (exo.type === 'une') return 'Une valeur suffit (arrondi accepté). Tu peux en donner plusieurs séparées par ;';
      return '';
    }
  };

  /* ---------------- Thèmes ---------------- */
  var THEMES = [
    { id: 'minimal', nom: 'Minimaliste', desc: 'Noir et blanc, épuré, sans distraction.' },
    { id: 'enfantin', nom: 'Enfantin', desc: 'Maximaliste, coloré, plein d\'énergie.' },
    { id: 'dore', nom: 'Doré élégant', desc: 'Crème et or, comme un vieux traité de géométrie.' },
    { id: 'tableau', nom: 'Tableau noir', desc: 'Ardoise verte et craie, comme en classe.', premium: true },
    { id: 'cahier', nom: 'Cahier d\'écolier', desc: 'Papier quadrillé, marge rouge et stylo bleu.', premium: true },
    { id: 'nuit', nom: 'Nuit douce', desc: 'Bleu nuit apaisant pour travailler le soir.', premium: true }
  ];
  var Theme = {
    liste: THEMES,
    premium: function (id) { return THEMES.some(function (t) { return t.id === id && t.premium; }); },
    appliquer: function (id) {
      if (!THEMES.some(function (t) { return t.id === id; })) id = 'minimal';
      if (Theme.premium(id) && !Store.estPremium()) id = 'minimal';
      document.documentElement.setAttribute('data-theme', id);
      Store.setTheme(id);
      var b = document.getElementById('theme-btn');
      if (b) b.innerHTML = I('palette') + '<span>' + U.esc(Theme.nom(id)) + '</span>';
    },
    actuel: function () { return document.documentElement.getAttribute('data-theme'); },
    nom: function (id) { var t = THEMES.filter(function (t) { return t.id === id; })[0]; return t ? t.nom : ''; }
  };
  document.documentElement.setAttribute('data-theme', racine.theme || 'minimal');

  /* ---------------- Affichage personnalisé (propre à l'appareil) ----------------
     taille du texte, espacement, mode clair/sombre et couleur d'accent (design Minimaliste),
     côté du panneau d'outils. Posés en attributs sur <html>, lus par refonte.css. */
  var CLE_AFF = 'mathEveryday.affichage';
  var AFF_DEFAUT = { taille: 'm', espace: 'normal', mode: 'auto', accent: 'encre', cote: 'droite' };
  var AFF_CHOIX = {
    taille: [['s', 'Petite'], ['m', 'Normale'], ['l', 'Grande'], ['xl', 'Très grande']],
    espace: [['compact', 'Compact'], ['normal', 'Normal'], ['aere', 'Aéré']],
    mode: [['auto', 'Auto'], ['clair', 'Clair'], ['sombre', 'Sombre']],
    accent: [['encre', 'Encre'], ['bleu', 'Bleu'], ['vert', 'Vert'], ['violet', 'Violet'], ['orange', 'Orange'], ['rose', 'Rose']],
    cote: [['droite', 'À droite'], ['gauche', 'À gauche']]
  };
  var Affichage = {
    CHOIX: AFF_CHOIX,
    get: function () {
      var a = {};
      try { a = JSON.parse(localStorage.getItem(CLE_AFF) || '{}') || {}; } catch (e) { a = {}; }
      for (var k in AFF_DEFAUT) if (!AFF_CHOIX[k].some(function (c) { return c[0] === a[k]; })) a[k] = AFF_DEFAUT[k];
      return a;
    },
    set: function (cle, val) {
      var a = Affichage.get(); a[cle] = val;
      try { localStorage.setItem(CLE_AFF, JSON.stringify(a)); } catch (e) { /* stockage indisponible */ }
      Affichage.appliquer();
      if (window.Outils && Outils.recaler) Outils.recaler();
    },
    appliquer: function () {
      var a = Affichage.get(), h = document.documentElement;
      for (var k in a) h.setAttribute('data-' + k, a[k]);
    }
  };
  Affichage.appliquer();

  /* ---------------- Panneaux latéraux redimensionnables ----------------
     Redim.activer(conteneur, panneau, { nom, cote, min, max, defaut }) pose une poignée sur le bord
     du panneau ; la largeur va dans la variable CSS --l-<nom> du conteneur et reste mémorisée.
     Glisser, flèches gauche / droite au clavier, double-clic pour revenir à la taille d'origine. */
  var CLE_TAILLES = 'mathEveryday.tailles';
  function tailles() { try { return JSON.parse(localStorage.getItem(CLE_TAILLES) || '{}') || {}; } catch (e) { return {}; } }
  var Redim = {
    activer: function (conteneur, panneau, o) {
      var v = '--l-' + o.nom, t = tailles();
      function poser(w, garder) {
        var max = Math.min(o.max, Math.max(o.min, conteneur.clientWidth - 320));
        w = Math.round(Math.max(o.min, Math.min(max, w)));
        conteneur.style.setProperty(v, w + 'px');
        if (garder) { var tt = tailles(); tt[o.nom] = w; try { localStorage.setItem(CLE_TAILLES, JSON.stringify(tt)); } catch (e) { /* rien */ } }
        window.dispatchEvent(new Event('resize'));
        return w;
      }
      if (t[o.nom]) conteneur.style.setProperty(v, t[o.nom] + 'px');
      var p = document.createElement('div');
      p.className = 'redim-p ' + o.cote;
      p.setAttribute('role', 'separator'); p.setAttribute('aria-orientation', 'vertical'); p.tabIndex = 0;
      p.setAttribute('aria-label', 'Largeur du panneau (flèches gauche et droite)');
      p.title = 'Glisser pour changer la largeur · double-clic : taille d\'origine';
      panneau.appendChild(p);
      var dep = null, sens = o.cote === 'droite' ? 1 : -1;
      p.addEventListener('pointerdown', function (e) { e.preventDefault(); dep = { x: e.clientX, w: panneau.getBoundingClientRect().width }; p.setPointerCapture(e.pointerId); document.body.classList.add('redim'); });
      p.addEventListener('pointermove', function (e) { if (dep) poser(dep.w + sens * (e.clientX - dep.x), false); });
      p.addEventListener('pointerup', function () { if (!dep) return; poser(panneau.getBoundingClientRect().width, true); dep = null; document.body.classList.remove('redim'); });
      p.addEventListener('dblclick', function () { poser(o.defaut, true); });
      p.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        poser(panneau.getBoundingClientRect().width + (e.key === 'ArrowRight' ? 24 : -24) * sens, true);
      });
    }
  };
  window.Redim = Redim;

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
  window.Affichage = Affichage;
  window.Store = Store; window.Check = Check; window.Theme = Theme; window.Modal = Modal; window.toast = toast;
  window.LECONS = window.LECONS || [];
  /* Les fichiers data/lecons-*.js appellent addLecons([...]) */
  window.addLecons = function (niveau, liste) {
    liste.forEach(function (l, i) { l.niveau = niveau; l.ordre = i + 1; window.LECONS.push(l); });
  };
})();
