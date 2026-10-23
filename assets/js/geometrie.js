/* Math Everyday — géométrie interactive : points, segments, droites, demi-droites, cercles, milieux,
   perpendiculaires, parallèles, intersections, polygones, longueurs, angles et aires. Les objets
   construits suivent quand on déplace les points. Expose window.Geometrie. */
(function () {
  'use strict';
  var esc = function (s) { return U.esc(s); };
  var OUTILS = [
    ['deplacer', 'Déplacer', 'Fais glisser un point libre, ou le fond pour te déplacer.'],
    ['point', 'Point', 'Clique pour placer un point.'],
    ['segment', 'Segment', 'Clique deux points.'],
    ['droite', 'Droite', 'Clique deux points.'],
    ['demi', 'Demi-droite', 'Clique l\'origine puis un second point.'],
    ['cercle', 'Cercle', 'Clique le centre puis un point du cercle.'],
    ['milieu', 'Milieu', 'Clique deux points.'],
    ['perp', 'Perpendiculaire', 'Clique une droite, puis un point.'],
    ['para', 'Parallèle', 'Clique une droite, puis un point.'],
    ['inter', 'Intersection', 'Clique deux lignes (droites ou cercles).'],
    ['poly', 'Polygone', 'Clique les sommets, puis à nouveau le premier.'],
    ['long', 'Longueur', 'Clique deux points.'],
    ['angle', 'Angle', 'Clique trois points : le sommet en deuxième.'],
    ['suppr', 'Supprimer', 'Clique un objet pour le supprimer (et ce qui en dépend).']
  ];
  var el, cv, ctx, dpr = 1, outil = 'deplacer', sel = [], souris = null, drag = null, histo = [], futur = [];

  function etat() {
    var s = Store.get();
    s.geo = s.geo || { objs: [], vue: { ox: null, oy: null, sc: 40 }, grille: true, axes: true, aimant: true, n: 0 };
    return s.geo;
  }
  function memoriser() { histo.push(JSON.stringify(etat().objs)); if (histo.length > 80) histo.shift(); futur = []; }
  function sauver() { Store.save(); }

  /* ---------------- Calcul géométrique ---------------- */
  function obj(id) { var o = etat().objs; for (var i = 0; i < o.length; i++) if (o[i].id === id) return o[i]; return null; }
  function sub(a, b) { return { x: a.x - b.x, y: a.y - b.y }; }
  function norm(v) { var l = Math.hypot(v.x, v.y) || 1; return { x: v.x / l, y: v.y / l }; }
  function calc() {
    var V = {};
    etat().objs.forEach(function (o) {
      try {
        var r = null;
        if (o.t === 'point') r = { k: 'pt', x: o.x, y: o.y };
        else if (o.t === 'milieu') { var a = V[o.a], b = V[o.b]; if (a && b) r = { k: 'pt', x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }
        else if (o.t === 'inter') r = intersection(V[o.o1], V[o.o2], o.i);
        else if (o.t === 'segment' || o.t === 'droite' || o.t === 'demi') { var A = V[o.a], B = V[o.b]; if (A && B && Math.hypot(B.x - A.x, B.y - A.y) > 1e-9) r = { k: 'ligne', genre: o.t, p: A, q: B, d: norm(sub(B, A)) }; }
        else if (o.t === 'perp' || o.t === 'para') { var L = V[o.l], P = V[o.p]; if (L && P && L.k === 'ligne') { var d = o.t === 'para' ? L.d : { x: -L.d.y, y: L.d.x }; r = { k: 'ligne', genre: 'droite', p: P, q: { x: P.x + d.x, y: P.y + d.y }, d: d }; } }
        else if (o.t === 'cercle') { var C = V[o.c], Q = V[o.p]; if (C && Q) r = { k: 'cercle', c: C, r: Math.hypot(Q.x - C.x, Q.y - C.y) }; }
        else if (o.t === 'poly') { var pts = o.pts.map(function (id) { return V[id]; }); if (pts.every(Boolean)) { var aire = 0; for (var i = 0; i < pts.length; i++) { var u = pts[i], w = pts[(i + 1) % pts.length]; aire += u.x * w.y - w.x * u.y; } r = { k: 'poly', pts: pts, aire: Math.abs(aire) / 2, perim: pts.reduce(function (s, u, j) { var w = pts[(j + 1) % pts.length]; return s + Math.hypot(w.x - u.x, w.y - u.y); }, 0) }; } }
        else if (o.t === 'long') { var M1 = V[o.a], M2 = V[o.b]; if (M1 && M2) r = { k: 'mesure', a: M1, b: M2, v: Math.hypot(M2.x - M1.x, M2.y - M1.y) }; }
        else if (o.t === 'angle') { var P1 = V[o.a], S = V[o.b], P2 = V[o.c]; if (P1 && S && P2) { var u1 = sub(P1, S), u2 = sub(P2, S), ang = Math.abs(Math.atan2(u1.x * u2.y - u1.y * u2.x, u1.x * u2.x + u1.y * u2.y)) * 180 / Math.PI; r = { k: 'angle', a: P1, s: S, c: P2, v: ang }; } }
        if (r) V[o.id] = r;
      } catch (e) { /* objet non défini dans cette position */ }
    });
    return V;
  }
  function intersection(g1, g2, i) {
    if (!g1 || !g2) return null;
    var pts = [];
    if (g1.k === 'ligne' && g2.k === 'ligne') {
      var den = g1.d.x * g2.d.y - g1.d.y * g2.d.x;
      if (Math.abs(den) < 1e-12) return null;
      var t = ((g2.p.x - g1.p.x) * g2.d.y - (g2.p.y - g1.p.y) * g2.d.x) / den;
      pts = [{ x: g1.p.x + t * g1.d.x, y: g1.p.y + t * g1.d.y }];
    } else if (g1.k === 'cercle' && g2.k === 'cercle') {
      var dx = g2.c.x - g1.c.x, dy = g2.c.y - g1.c.y, d = Math.hypot(dx, dy);
      if (d > g1.r + g2.r + 1e-9 || d < Math.abs(g1.r - g2.r) - 1e-9 || d === 0) return null;
      var a = (g1.r * g1.r - g2.r * g2.r + d * d) / (2 * d), h = Math.sqrt(Math.max(0, g1.r * g1.r - a * a));
      var mx = g1.c.x + a * dx / d, my = g1.c.y + a * dy / d;
      pts = [{ x: mx + h * dy / d, y: my - h * dx / d }, { x: mx - h * dy / d, y: my + h * dx / d }];
    } else {
      var L = g1.k === 'ligne' ? g1 : g2, Cc = g1.k === 'cercle' ? g1 : g2;
      if (L.k !== 'ligne' || Cc.k !== 'cercle') return null;
      var fx = L.p.x - Cc.c.x, fy = L.p.y - Cc.c.y, b = fx * L.d.x + fy * L.d.y, c = fx * fx + fy * fy - Cc.r * Cc.r, disc = b * b - c;
      if (disc < -1e-12) return null;
      var s = Math.sqrt(Math.max(0, disc));
      pts = [{ x: L.p.x + (-b - s) * L.d.x, y: L.p.y + (-b - s) * L.d.y }, { x: L.p.x + (-b + s) * L.d.x, y: L.p.y + (-b + s) * L.d.y }];
    }
    var p = pts[Math.min(i || 0, pts.length - 1)];
    return p ? { k: 'pt', x: p.x, y: p.y } : null;
  }

  /* ---------------- Vue ---------------- */
  function vue() { var v = etat().vue; if (v.ox == null) { v.ox = cv.clientWidth / 2; v.oy = cv.clientHeight / 2; } return v; }
  function X(x) { var v = vue(); return v.ox + x * v.sc; }
  function Y(y) { var v = vue(); return v.oy - y * v.sc; }
  function monde(px, py) { var v = vue(); return { x: (px - v.ox) / v.sc, y: (v.oy - py) / v.sc }; }
  function aimanter(p) { if (!etat().aimant) return p; var pas = 0.5; return { x: Math.round(p.x / pas) * pas, y: Math.round(p.y / pas) * pas }; }

  var COUL = { ligne: '#2563eb', cercle: '#9333ea', poly: 'rgba(37,99,235,.12)', libre: '#2563eb', dep: '#334155', mesure: '#b45309', sel: '#dc2626' };
  function dessiner() {
    if (!ctx || !document.body.contains(cv)) return;
    var w = cv.clientWidth, h = cv.clientHeight, g = etat(), V = calc(), v = vue();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
    if (g.grille) {
      var pas = v.sc >= 25 ? 1 : v.sc >= 10 ? 5 : 10;
      ctx.strokeStyle = 'rgba(100,116,139,.18)'; ctx.lineWidth = 1; ctx.beginPath();
      var m0 = monde(0, h), m1 = monde(w, 0);
      for (var gx = Math.ceil(m0.x / pas) * pas; gx <= m1.x; gx += pas) { ctx.moveTo(Math.round(X(gx)) + 0.5, 0); ctx.lineTo(Math.round(X(gx)) + 0.5, h); }
      for (var gy = Math.ceil(m0.y / pas) * pas; gy <= m1.y; gy += pas) { ctx.moveTo(0, Math.round(Y(gy)) + 0.5); ctx.lineTo(w, Math.round(Y(gy)) + 0.5); }
      ctx.stroke();
    }
    if (g.axes) {
      ctx.strokeStyle = 'rgba(30,41,59,.55)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(0, Y(0)); ctx.lineTo(w, Y(0)); ctx.moveTo(X(0), 0); ctx.lineTo(X(0), h); ctx.stroke();
      ctx.fillStyle = 'rgba(30,41,59,.7)'; ctx.font = '11px system-ui'; ctx.fillText('O', X(0) - 12, Y(0) + 14);
    }
    var ids = etat().objs;
    /* polygones d'abord */
    ids.forEach(function (o) { var r = V[o.id]; if (r && r.k === 'poly') { ctx.fillStyle = COUL.poly; ctx.strokeStyle = COUL.ligne; ctx.lineWidth = 1.6; ctx.beginPath(); r.pts.forEach(function (p, i) { if (i) ctx.lineTo(X(p.x), Y(p.y)); else ctx.moveTo(X(p.x), Y(p.y)); }); ctx.closePath(); ctx.fill(); ctx.stroke(); } });
    ids.forEach(function (o) {
      var r = V[o.id]; if (!r) return;
      var choisi = sel.indexOf(o.id) >= 0;
      if (r.k === 'ligne') {
        ctx.strokeStyle = choisi ? COUL.sel : COUL.ligne; ctx.lineWidth = choisi ? 3 : 1.8; ctx.beginPath();
        var big = 4000 / v.sc;
        var a = r.genre === 'segment' || r.genre === 'demi' ? r.p : { x: r.p.x - big * r.d.x, y: r.p.y - big * r.d.y };
        var b = r.genre === 'segment' ? r.q : { x: r.p.x + big * r.d.x, y: r.p.y + big * r.d.y };
        ctx.moveTo(X(a.x), Y(a.y)); ctx.lineTo(X(b.x), Y(b.y)); ctx.stroke();
        if (o.t === 'perp') { var P = r.p, L0 = V[o.l]; if (L0) { var I0 = intersection(r, L0, 0); if (I0) { var e = 9, u = r.d, n = L0.d; ctx.lineWidth = 1.2; ctx.beginPath(); var ix = X(I0.x), iy = Y(I0.y); ctx.moveTo(ix + e * n.x, iy - e * n.y); ctx.lineTo(ix + e * n.x + e * u.x, iy - e * n.y - e * u.y); ctx.lineTo(ix + e * u.x, iy - e * u.y); ctx.stroke(); } } }
      } else if (r.k === 'cercle') {
        ctx.strokeStyle = choisi ? COUL.sel : COUL.cercle; ctx.lineWidth = choisi ? 3 : 1.8; ctx.beginPath(); ctx.arc(X(r.c.x), Y(r.c.y), r.r * v.sc, 0, 2 * Math.PI); ctx.stroke();
      } else if (r.k === 'mesure') {
        var mx = X((r.a.x + r.b.x) / 2), my = Y((r.a.y + r.b.y) / 2);
        ctx.strokeStyle = COUL.mesure; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(X(r.a.x), Y(r.a.y)); ctx.lineTo(X(r.b.x), Y(r.b.y)); ctx.stroke(); ctx.setLineDash([]);
        etiquette(fmt(r.v), mx, my - 8, COUL.mesure);
      } else if (r.k === 'angle') {
        var sx = X(r.s.x), sy = Y(r.s.y), a1 = Math.atan2(-(r.a.y - r.s.y), r.a.x - r.s.x), a2 = Math.atan2(-(r.c.y - r.s.y), r.c.x - r.s.x);
        var d0 = a2 - a1; while (d0 > Math.PI) d0 -= 2 * Math.PI; while (d0 < -Math.PI) d0 += 2 * Math.PI;
        ctx.strokeStyle = COUL.mesure; ctx.fillStyle = 'rgba(180,83,9,.12)'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.arc(sx, sy, 22, a1, a1 + d0, d0 < 0); ctx.closePath(); ctx.fill(); ctx.stroke();
        var am = a1 + d0 / 2; etiquette(fmt(r.v) + '°', sx + 40 * Math.cos(am), sy + 40 * Math.sin(am) + 4, COUL.mesure);
      }
    });
    /* points par-dessus */
    ids.forEach(function (o) {
      var r = V[o.id]; if (!r || r.k !== 'pt') return;
      var choisi = sel.indexOf(o.id) >= 0, libre = o.t === 'point';
      ctx.fillStyle = choisi ? COUL.sel : libre ? COUL.libre : COUL.dep;
      ctx.beginPath(); ctx.arc(X(r.x), Y(r.y), libre ? 5 : 4, 0, 2 * Math.PI); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
      etiquette(o.nom, X(r.x) + 8, Y(r.y) - 8, '#0f172a', true);
    });
    /* aperçu de construction */
    if (souris && sel.length && ['segment', 'droite', 'demi', 'cercle', 'long', 'poly', 'angle', 'milieu'].indexOf(outil) >= 0) {
      var dernier = V[sel[sel.length - 1]];
      if (dernier && dernier.k === 'pt') {
        ctx.strokeStyle = 'rgba(220,38,38,.6)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.4; ctx.beginPath();
        if (outil === 'cercle') ctx.arc(X(dernier.x), Y(dernier.y), Math.hypot(souris.x - dernier.x, souris.y - dernier.y) * v.sc, 0, 2 * Math.PI);
        else { ctx.moveTo(X(dernier.x), Y(dernier.y)); ctx.lineTo(X(souris.x), Y(souris.y)); }
        ctx.stroke(); ctx.setLineDash([]);
      }
    }
    listeObjets(V);
  }
  function etiquette(t, x, y, c, gras) {
    ctx.font = (gras ? '600 ' : '') + '13px system-ui, sans-serif';
    var w = ctx.measureText(t).width;
    ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(x - 2, y - 12, w + 4, 16);
    ctx.fillStyle = c; ctx.fillText(t, x, y);
  }
  function fmt(x) { return (Math.round(x * 100) / 100).toString().replace('.', ','); }

  function listeObjets(V) {
    var z = U.$('#geo-liste', el); if (!z) return;
    var lignes = etat().objs.map(function (o) {
      var r = V[o.id], txt;
      if (!r) txt = o.nom + ' : non défini';
      else if (r.k === 'pt') txt = o.nom + '(' + fmt(r.x) + ' ; ' + fmt(r.y) + ')';
      else if (r.k === 'ligne') txt = o.nom + (o.t === 'segment' ? ' : longueur ' + fmt(Math.hypot(r.q.x - r.p.x, r.q.y - r.p.y)) : '');
      else if (r.k === 'cercle') txt = o.nom + ' : rayon ' + fmt(r.r) + ', aire ' + fmt(Math.PI * r.r * r.r);
      else if (r.k === 'poly') txt = o.nom + ' : aire ' + fmt(r.aire) + ', périmètre ' + fmt(r.perim);
      else if (r.k === 'mesure') txt = o.nom + ' = ' + fmt(r.v);
      else if (r.k === 'angle') txt = o.nom + ' = ' + fmt(r.v) + '°';
      return '<li>' + esc(txt) + '</li>';
    });
    z.innerHTML = lignes.length ? lignes.join('') : '<li class="muted">Aucun objet. Choisis un outil et clique sur la feuille.</li>';
  }

  /* ---------------- Interaction ---------------- */
  function pointSous(px, py, V) {
    var best = null, bd = 12;
    etat().objs.forEach(function (o) { var r = V[o.id]; if (r && r.k === 'pt') { var d = Math.hypot(X(r.x) - px, Y(r.y) - py); if (d < bd) { bd = d; best = o.id; } } });
    return best;
  }
  function courbeSous(px, py, V, types) {
    var best = null, bd = 8, m = monde(px, py), v = vue();
    etat().objs.forEach(function (o) {
      var r = V[o.id]; if (!r || types.indexOf(r.k) < 0) return;
      var d;
      if (r.k === 'ligne') {
        var t = (m.x - r.p.x) * r.d.x + (m.y - r.p.y) * r.d.y;
        if (r.genre === 'segment') t = Math.max(0, Math.min(Math.hypot(r.q.x - r.p.x, r.q.y - r.p.y), t));
        if (r.genre === 'demi') t = Math.max(0, t);
        d = Math.hypot(m.x - r.p.x - t * r.d.x, m.y - r.p.y - t * r.d.y) * v.sc;
      } else if (r.k === 'cercle') d = Math.abs(Math.hypot(m.x - r.c.x, m.y - r.c.y) - r.r) * v.sc;
      else if (r.k === 'poly' || r.k === 'mesure' || r.k === 'angle') d = 999;
      if (d < bd) { bd = d; best = o.id; }
    });
    return best;
  }
  function nomPoint() {
    var g = etat(), pris = {}; g.objs.forEach(function (o) { pris[o.nom] = 1; });
    var L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var k = 0; ; k++) for (var i = 0; i < 26; i++) { var n = L[i] + (k ? k : ''); if (!pris[n]) return n; }
  }
  function ajouter(o) { var g = etat(); g.n = (g.n || 0) + 1; o.id = 'o' + g.n + '_' + Date.now().toString(36); g.objs.push(o); return o.id; }
  function pointA(px, py, V) {
    var id = pointSous(px, py, V);
    if (id) return id;
    var m = aimanter(monde(px, py));
    return ajouter({ t: 'point', x: m.x, y: m.y, nom: nomPoint() });
  }
  function nomDe(id) { var o = obj(id); return o ? o.nom : '?'; }
  function supprimer(id) {
    var g = etat(), a = {}; a[id] = 1;
    var change = true;
    while (change) {
      change = false;
      g.objs.forEach(function (o) {
        if (a[o.id]) return;
        var deps = [o.a, o.b, o.c, o.p, o.l, o.o1, o.o2].concat(o.pts || []);
        if (deps.some(function (d) { return d && a[d]; })) { a[o.id] = 1; change = true; }
      });
    }
    g.objs = g.objs.filter(function (o) { return !a[o.id]; });
  }
  function clic(px, py) {
    var V = calc(), id;
    if (outil === 'suppr') {
      id = pointSous(px, py, V) || courbeSous(px, py, V, ['ligne', 'cercle']) || objetMesureSous(px, py, V);
      if (id) { memoriser(); supprimer(id); sauver(); }
      return;
    }
    if (outil === 'point') { memoriser(); var exist = pointSous(px, py, V); if (!exist) { var cb = courbeSous(px, py, V, ['ligne', 'cercle']); var m = aimanter(monde(px, py)); ajouter({ t: 'point', x: m.x, y: m.y, nom: nomPoint() }); } sauver(); return; }
    if (outil === 'perp' || outil === 'para') {
      if (!sel.length) { id = courbeSous(px, py, V, ['ligne']); if (id) sel = [id]; else toast('Clique d\'abord sur une droite ou un segment.'); return; }
      memoriser(); var p = pointA(px, py, calc());
      var base = obj(sel[0]);
      ajouter({ t: outil, l: sel[0], p: p, nom: (outil === 'perp' ? 'perp. à ' : 'para. à ') + base.nom + ' par ' + nomDe(p) });
      sel = []; sauver(); return;
    }
    if (outil === 'inter') {
      id = courbeSous(px, py, V, ['ligne', 'cercle']);
      if (!id) { toast('Clique sur une droite, un segment ou un cercle.'); return; }
      if (sel.indexOf(id) < 0) sel.push(id);
      if (sel.length === 2) {
        memoriser();
        var g1 = V[sel[0]], g2 = V[sel[1]], n = g1.k === 'ligne' && g2.k === 'ligne' ? 1 : 2, faits = 0;
        for (var i = 0; i < n; i++) if (intersection(g1, g2, i)) { ajouter({ t: 'inter', o1: sel[0], o2: sel[1], i: i, nom: nomPoint() }); faits++; }
        if (!faits) toast('Ces deux lignes ne se coupent pas.');
        sel = []; sauver();
      }
      return;
    }
    /* outils à base de points */
    var besoin = { segment: 2, droite: 2, demi: 2, cercle: 2, milieu: 2, long: 2, angle: 3 }[outil];
    if (outil === 'poly') {
      var cible = pointSous(px, py, V);
      if (sel.length >= 3 && cible === sel[0]) { memoriser(); ajouter({ t: 'poly', pts: sel.slice(), nom: 'poly ' + sel.map(nomDe).join('') }); sel = []; sauver(); return; }
      if (!sel.length) memoriser();
      sel.push(pointA(px, py, V)); sauver(); return;
    }
    if (!besoin) return;
    if (!sel.length) memoriser();
    var pid = pointA(px, py, V);
    if (sel.length && sel[sel.length - 1] === pid) return;
    sel.push(pid);
    if (sel.length === besoin) {
      var A = sel[0], B = sel[1], nA = nomDe(A), nB = nomDe(B);
      if (outil === 'segment') ajouter({ t: 'segment', a: A, b: B, nom: '[' + nA + nB + ']' });
      if (outil === 'droite') ajouter({ t: 'droite', a: A, b: B, nom: '(' + nA + nB + ')' });
      if (outil === 'demi') ajouter({ t: 'demi', a: A, b: B, nom: '[' + nA + nB + ')' });
      if (outil === 'cercle') ajouter({ t: 'cercle', c: A, p: B, nom: 'cercle de centre ' + nA });
      if (outil === 'milieu') ajouter({ t: 'milieu', a: A, b: B, nom: nomPoint() });
      if (outil === 'long') ajouter({ t: 'long', a: A, b: B, nom: nA + nB });
      if (outil === 'angle') ajouter({ t: 'angle', a: A, b: B, c: sel[2], nom: 'angle ' + nA + nB + nomDe(sel[2]) });
      sel = [];
    }
    sauver();
  }
  function objetMesureSous(px, py, V) {
    var best = null;
    etat().objs.forEach(function (o) {
      var r = V[o.id]; if (!r) return;
      if (r.k === 'mesure' && Math.hypot(X((r.a.x + r.b.x) / 2) - px, Y((r.a.y + r.b.y) / 2) - 8 - py) < 18) best = o.id;
      if (r.k === 'angle' && Math.hypot(X(r.s.x) - px, Y(r.s.y) - py) < 30) best = o.id;
      if (r.k === 'poly') { var m = monde(px, py), dedans = false; for (var i = 0, j = r.pts.length - 1; i < r.pts.length; j = i++) { var a = r.pts[i], b = r.pts[j]; if ((a.y > m.y) !== (b.y > m.y) && m.x < (b.x - a.x) * (m.y - a.y) / (b.y - a.y) + a.x) dedans = !dedans; } if (dedans) best = best || o.id; }
    });
    return best;
  }

  function monter(conteneur) {
    el = conteneur;
    var g = etat();
    el.innerHTML = '<div class="geo">' +
      '<div class="geo-outils" role="toolbar" aria-label="Outils de construction">' + OUTILS.map(function (o) { return '<button type="button" class="cb' + (o[0] === outil ? ' on' : '') + '" data-geo="' + o[0] + '" title="' + esc(o[2]) + '" aria-pressed="' + (o[0] === outil) + '">' + o[1] + '</button>'; }).join('') + '</div>' +
      '<div class="geo-aide small muted" id="geo-aide"></div>' +
      '<div class="geo-cadre"><canvas id="geo-cv" aria-label="Feuille de géométrie"></canvas></div>' +
      '<div class="geo-bas"><label class="switch"><input type="checkbox" id="geo-grille"' + (g.grille ? ' checked' : '') + '> Grille</label><label class="switch"><input type="checkbox" id="geo-axes"' + (g.axes ? ' checked' : '') + '> Axes</label><label class="switch"><input type="checkbox" id="geo-aim"' + (g.aimant ? ' checked' : '') + '> Magnétisme</label>' +
      '<span class="spacer"></span><button type="button" class="cb" id="geo-ann">↶ Annuler</button><button type="button" class="cb" id="geo-ref">↷</button><button type="button" class="cb" data-zgeo="1.25">Zoom +</button><button type="button" class="cb" data-zgeo="0.8">Zoom −</button><button type="button" class="cb" id="geo-centre">Recentrer</button><button type="button" class="cb" id="geo-tout">Tout effacer</button><button type="button" class="cb" id="geo-png">Image</button></div>' +
      '<div class="geo-objets"><b>Objets et mesures</b><ul id="geo-liste"></ul></div></div>';
    cv = U.$('#geo-cv', el); ctx = cv.getContext('2d');
    aide(); taille(); lier();
  }
  function aide() { var o = OUTILS.filter(function (x) { return x[0] === outil; })[0]; var z = U.$('#geo-aide', el); if (z) z.textContent = o[2] + (sel.length ? ' (' + sel.length + ' sélectionné' + (sel.length > 1 ? 's' : '') + ', Échap pour annuler)' : ''); }
  function taille() {
    if (!cv || !document.body.contains(cv)) return;
    dpr = window.devicePixelRatio || 1;
    cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr;
    dessiner();
  }
  function lier() {
    var depart = null;
    cv.addEventListener('pointerdown', function (e) {
      var r = cv.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top, V = calc();
      depart = { px: px, py: py, bouge: false };
      cv.setPointerCapture(e.pointerId);
      if (outil === 'deplacer') {
        var id = pointSous(px, py, V), o = id && obj(id);
        if (o && o.t === 'point') { memoriser(); drag = { id: id }; }
        else { var v = vue(); drag = { pan: true, ox: v.ox, oy: v.oy }; }
      }
    });
    cv.addEventListener('pointermove', function (e) {
      var r = cv.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
      souris = monde(px, py);
      if (depart && Math.hypot(px - depart.px, py - depart.py) > 4) depart.bouge = true;
      if (drag && depart) {
        if (drag.id) { var m = aimanter(monde(px, py)), o = obj(drag.id); o.x = m.x; o.y = m.y; }
        else if (drag.pan) { var v = vue(); v.ox = drag.ox + px - depart.px; v.oy = drag.oy + py - depart.py; }
      }
      dessiner();
    });
    cv.addEventListener('pointerup', function () {
      if (depart && !depart.bouge && outil !== 'deplacer') clic(depart.px, depart.py);
      if (drag) sauver();
      drag = null; depart = null; aide(); dessiner();
    });
    cv.addEventListener('pointerleave', function () { souris = null; dessiner(); });
    cv.addEventListener('wheel', function (e) {
      e.preventDefault();
      var r = cv.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top, v = vue(), m = monde(px, py);
      v.sc = Math.max(5, Math.min(300, v.sc * (e.deltaY > 0 ? 0.9 : 1.1)));
      v.ox = px - m.x * v.sc; v.oy = py + m.y * v.sc; dessiner(); sauver();
    }, { passive: false });
    el.querySelector('.geo').addEventListener('click', function (e) {
      var g = etat(), b = e.target.closest('[data-geo]');
      if (b) { outil = b.getAttribute('data-geo'); sel = []; U.$$('[data-geo]', el).forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); }); aide(); dessiner(); return; }
      var z = e.target.closest('[data-zgeo]');
      if (z) { var v = vue(), k = +z.getAttribute('data-zgeo'), cx = cv.clientWidth / 2, cy = cv.clientHeight / 2, m = monde(cx, cy); v.sc = Math.max(5, Math.min(300, v.sc * k)); v.ox = cx - m.x * v.sc; v.oy = cy + m.y * v.sc; dessiner(); sauver(); return; }
      if (e.target.closest('#geo-ann')) { if (histo.length) { futur.push(JSON.stringify(g.objs)); g.objs = JSON.parse(histo.pop()); sel = []; dessiner(); sauver(); } return; }
      if (e.target.closest('#geo-ref')) { if (futur.length) { histo.push(JSON.stringify(g.objs)); g.objs = JSON.parse(futur.pop()); dessiner(); sauver(); } return; }
      if (e.target.closest('#geo-centre')) { g.vue = { ox: null, oy: null, sc: 40 }; dessiner(); sauver(); return; }
      if (e.target.closest('#geo-tout')) { if (g.objs.length && confirm('Effacer toute la figure ?')) { memoriser(); g.objs = []; sel = []; dessiner(); sauver(); } return; }
      if (e.target.closest('#geo-png')) { var a = document.createElement('a'); a.href = cv.toDataURL('image/png'); a.download = 'figure.png'; document.body.appendChild(a); a.click(); a.remove(); }
    });
    U.$('#geo-grille', el).onchange = function () { etat().grille = this.checked; dessiner(); sauver(); };
    U.$('#geo-axes', el).onchange = function () { etat().axes = this.checked; dessiner(); sauver(); };
    U.$('#geo-aim', el).onchange = function () { etat().aimant = this.checked; sauver(); };
  }
  var ecoute = false;
  window.Geometrie = {
    monter: function (c) {
      monter(c);
      if (!ecoute) {
        ecoute = true;
        window.addEventListener('resize', taille);
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sel.length && cv && document.body.contains(cv)) { sel = []; aide(); dessiner(); e.stopPropagation(); } }, true);
      }
    },
    redessiner: taille
  };
})();
