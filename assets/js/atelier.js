/* Math Everyday — mode libre (atelier, réservé aux abonnés) : une feuille où l'on mélange
   géométrie (points, segments, droites, cercles, polygones, milieux, perpendiculaires, parallèles,
   intersections, mesures), fonctions y = f(x), équations x² + y² = 9, curseurs, textes et formules,
   avec une barre de saisie, la calculatrice et des exercices générés (sur la figure ou par chapitre).
   Expose window.Atelier. */
(function () {
  'use strict';
  var esc = U.esc;
  var COUL = ['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c', '#0891b2', '#be185d', '#4b5563'];
  var OUTILS = [
    ['deplacer', 'Déplacer', 'Fais glisser un point, un texte ou le fond.'],
    ['point', 'Point', 'Clique pour placer un point.'],
    ['segment', 'Segment', 'Clique deux points.'],
    ['droite', 'Droite', 'Clique deux points.'],
    ['cercle', 'Cercle', 'Clique le centre puis un point du cercle.'],
    ['poly', 'Polygone', 'Clique les sommets puis à nouveau le premier.'],
    ['milieu', 'Milieu', 'Clique deux points.'],
    ['perp', 'Perpendiculaire', 'Clique une droite puis un point.'],
    ['para', 'Parallèle', 'Clique une droite puis un point.'],
    ['inter', 'Intersection', 'Clique deux lignes (droite, cercle, courbe).'],
    ['long', 'Longueur', 'Clique deux points.'],
    ['angle', 'Angle', 'Clique trois points, le sommet en deuxième.'],
    ['texte', 'Texte', 'Clique où placer un texte ou une formule.'],
    ['suppr', 'Supprimer', 'Clique un objet à supprimer.']
  ];
  var el, cv, ctx, dpr = 1, outil = 'deplacer', sel = [], souris = null, drag = null, histo = [], futur = [];

  function etat() {
    var s = Store.get();
    s.atelier = s.atelier || { objs: [], vue: { ox: null, oy: null, sc: 40 }, grille: true, axes: true, aimant: true, n: 0 };
    return s.atelier;
  }
  function sauver() { Store.save(); }
  function memoriser() { histo.push(JSON.stringify(etat().objs)); if (histo.length > 100) histo.shift(); futur = []; }
  function obj(id) { var o = etat().objs; for (var i = 0; i < o.length; i++) if (o[i].id === id) return o[i]; return null; }
  function parNom(n) { var o = etat().objs; for (var i = 0; i < o.length; i++) if (o[i].nom === n) return o[i]; return null; }
  function ajouter(o) { var g = etat(); g.n = (g.n || 0) + 1; o.id = 'a' + g.n + '_' + Date.now().toString(36); if (o.c == null) o.c = COUL[(g.n - 1) % COUL.length]; g.objs.push(o); return o.id; }
  function nomLibre(prefixe, maj) {
    var pris = {}; etat().objs.forEach(function (o) { pris[o.nom] = 1; });
    if (maj) { var L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; for (var k = 0; ; k++) for (var i = 0; i < 26; i++) { var n = L[i] + (k ? k : ''); if (!pris[n]) return n; } }
    for (var j = 1; ; j++) if (!pris[prefixe + j]) return prefixe + j;
  }

  /* ---------------- Évaluation des expressions ---------------- */
  function env() {
    var e = {};
    etat().objs.forEach(function (o) { if (o.t === 'curseur') e[o.nom] = Moteur.C(o.v, 0); });
    return e;
  }
  function compiler(src) { Moteur.regler({ angle: 'rad', vars: {} }); return Moteur.parser(src); }
  function fonction1(arbre) {
    var E = env();
    return function (x) { try { E.x = Moteur.C(x, 0); var z = Moteur.evaluer(arbre, E); return Moteur.Cx.estReel(z) ? z.re : NaN; } catch (e) { return NaN; } };
  }
  function fonction2(arbre) {
    var E = env();
    return function (x, y) { try { E.x = Moteur.C(x, 0); E.y = Moteur.C(y, 0); var z = Moteur.evaluer(arbre, E); return Moteur.Cx.estReel(z) ? z.re : NaN; } catch (e) { return NaN; } };
  }
  function nombre(src) { try { Moteur.regler({ angle: 'rad', vars: env() }); var z = Moteur.evaluer(Moteur.parser(String(src)), env()); return z.re; } catch (e) { return NaN; } }

  /* ---------------- Géométrie calculée ---------------- */
  function sub(a, b) { return { x: a.x - b.x, y: a.y - b.y }; }
  function norm(v) { var l = Math.hypot(v.x, v.y) || 1; return { x: v.x / l, y: v.y / l }; }
  var cacheArbres = {};
  function arbreDe(o) { var k = o.id + '|' + o.expr; if (!cacheArbres[k]) { try { cacheArbres[k] = compiler(o.expr); } catch (e) { cacheArbres[k] = null; } } return cacheArbres[k]; }
  function calc() {
    Moteur.regler({ angle: 'rad', vars: {} });
    var V = {};
    etat().objs.forEach(function (o) {
      try {
        var r = null;
        if (o.t === 'point') r = { k: 'pt', x: o.x, y: o.y };
        else if (o.t === 'milieu') { var a = V[o.a], b = V[o.b]; if (a && b) r = { k: 'pt', x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; }
        else if (o.t === 'inter') r = intersection(V[o.o1], V[o.o2], o.i, o.gx);
        else if (o.t === 'segment' || o.t === 'droite' || o.t === 'demi') { var A = V[o.a], B = V[o.b]; if (A && B && Math.hypot(B.x - A.x, B.y - A.y) > 1e-9) r = { k: 'ligne', genre: o.t, p: A, q: B, d: norm(sub(B, A)) }; }
        else if (o.t === 'perp' || o.t === 'para') { var L = V[o.l], P = V[o.p]; if (L && P && L.k === 'ligne') { var d = o.t === 'para' ? L.d : { x: -L.d.y, y: L.d.x }; r = { k: 'ligne', genre: 'droite', p: P, q: { x: P.x + d.x, y: P.y + d.y }, d: d }; } }
        else if (o.t === 'cercle') { var Cc = V[o.c]; if (Cc) { var rr = o.p ? (V[o.p] ? Math.hypot(V[o.p].x - Cc.x, V[o.p].y - Cc.y) : NaN) : nombre(o.r); if (rr > 0) r = { k: 'cercle', c: Cc, r: rr }; } }
        else if (o.t === 'poly') { var pts = o.pts.map(function (id) { return V[id]; }); if (pts.every(Boolean)) { var aire = 0, per = 0; for (var i = 0; i < pts.length; i++) { var u = pts[i], w = pts[(i + 1) % pts.length]; aire += u.x * w.y - w.x * u.y; per += Math.hypot(w.x - u.x, w.y - u.y); } r = { k: 'poly', pts: pts, aire: Math.abs(aire) / 2, perim: per }; } }
        else if (o.t === 'long') { var M1 = V[o.a], M2 = V[o.b]; if (M1 && M2) r = { k: 'mesure', a: M1, b: M2, v: Math.hypot(M2.x - M1.x, M2.y - M1.y) }; }
        else if (o.t === 'angle') { var P1 = V[o.a], S = V[o.b], P2 = V[o.c]; if (P1 && S && P2) { var u1 = sub(P1, S), u2 = sub(P2, S); r = { k: 'angle', a: P1, s: S, c: P2, v: Math.abs(Math.atan2(u1.x * u2.y - u1.y * u2.x, u1.x * u2.x + u1.y * u2.y)) * 180 / Math.PI }; } }
        else if (o.t === 'fonction') { var ar = arbreDe(o); if (ar) r = { k: 'courbe', f: fonction1(ar) }; }
        else if (o.t === 'equation') { var ar2 = arbreDe(o); if (ar2) r = { k: 'implicite', F: fonction2(ar2) }; }
        else if (o.t === 'texte') r = { k: 'texte', x: o.x, y: o.y };
        else if (o.t === 'curseur') r = { k: 'curseur', v: o.v };
        if (r) V[o.id] = r;
      } catch (e) { /* non défini */ }
    });
    return V;
  }
  function intersection(g1, g2, i, gx) {
    if (!g1 || !g2) return null;
    if (g1.k === 'courbe' || g2.k === 'courbe') {
      /* courbe avec courbe ou droite : on cherche les zéros de la différence près de gx */
      var f = g1.k === 'courbe' ? g1.f : null, h = g2.k === 'courbe' ? g2.f : null;
      var autre = g1.k === 'courbe' ? g2 : g1;
      var diff;
      if (f && h) diff = function (x) { return f(x) - h(x); };
      else if (autre.k === 'ligne' && Math.abs(autre.d.x) > 1e-9) { var c = f || h, m = autre.d.y / autre.d.x; diff = function (x) { return c(x) - (autre.p.y + m * (x - autre.p.x)); }; }
      else return null;
      var c0 = gx != null ? gx : 0, best = null;
      var zs = Moteur.racinesIntervalle(diff, c0 - 50, c0 + 50, 4000);
      zs.forEach(function (z) { if (best == null || Math.abs(z - c0) < Math.abs(best - c0)) best = z; });
      if (best == null) return null;
      var F = f || h; return { k: 'pt', x: best, y: F(best) };
    }
    var pts = [];
    if (g1.k === 'ligne' && g2.k === 'ligne') {
      var den = g1.d.x * g2.d.y - g1.d.y * g2.d.x;
      if (Math.abs(den) < 1e-12) return null;
      var t = ((g2.p.x - g1.p.x) * g2.d.y - (g2.p.y - g1.p.y) * g2.d.x) / den;
      pts = [{ x: g1.p.x + t * g1.d.x, y: g1.p.y + t * g1.d.y }];
    } else if (g1.k === 'cercle' && g2.k === 'cercle') {
      var dx = g2.c.x - g1.c.x, dy = g2.c.y - g1.c.y, d = Math.hypot(dx, dy);
      if (d > g1.r + g2.r + 1e-9 || d < Math.abs(g1.r - g2.r) - 1e-9 || d === 0) return null;
      var a = (g1.r * g1.r - g2.r * g2.r + d * d) / (2 * d), hh = Math.sqrt(Math.max(0, g1.r * g1.r - a * a)), mx = g1.c.x + a * dx / d, my = g1.c.y + a * dy / d;
      pts = [{ x: mx + hh * dy / d, y: my - hh * dx / d }, { x: mx - hh * dy / d, y: my + hh * dx / d }];
    } else {
      var Li = g1.k === 'ligne' ? g1 : g2, Ci = g1.k === 'cercle' ? g1 : g2;
      if (Li.k !== 'ligne' || Ci.k !== 'cercle') return null;
      var fx = Li.p.x - Ci.c.x, fy = Li.p.y - Ci.c.y, b = fx * Li.d.x + fy * Li.d.y, cc = fx * fx + fy * fy - Ci.r * Ci.r, disc = b * b - cc;
      if (disc < -1e-12) return null;
      var s = Math.sqrt(Math.max(0, disc));
      pts = [{ x: Li.p.x + (-b - s) * Li.d.x, y: Li.p.y + (-b - s) * Li.d.y }, { x: Li.p.x + (-b + s) * Li.d.x, y: Li.p.y + (-b + s) * Li.d.y }];
    }
    var p = pts[Math.min(i || 0, pts.length - 1)];
    return p ? { k: 'pt', x: p.x, y: p.y } : null;
  }

  /* ---------------- Vue ---------------- */
  /* L'origine est gardée en pixels : quand la feuille change de taille (autre écran, fenêtre
     redimensionnée), on la décale de la moitié de l'écart pour garder le même centre. */
  function vue() {
    var v = etat().vue, w = cv.clientWidth, h = cv.clientHeight;
    if (!w || !h) return v.ox == null ? { ox: 0, oy: 0, sc: v.sc || 40 } : v;
    if (v.ox == null) { v.ox = w / 2; v.oy = h / 2; }
    else if (v.w != null && (v.w !== w || v.h !== h)) { v.ox += (w - v.w) / 2; v.oy += (h - v.h) / 2; }
    v.w = w; v.h = h;
    return v;
  }
  function X(x) { var v = vue(); return v.ox + x * v.sc; }
  function Y(y) { var v = vue(); return v.oy - y * v.sc; }
  function monde(px, py) { var v = vue(); return { x: (px - v.ox) / v.sc, y: (v.oy - py) / v.sc }; }
  function aimanter(p) { if (!etat().aimant) return p; var pas = vue().sc >= 30 ? 0.5 : 1; return { x: Math.round(p.x / pas) * pas, y: Math.round(p.y / pas) * pas }; }
  function fmt(x) { return (Math.round(x * 100) / 100).toString().replace('.', ','); }
  function pasGrille(sc) { var px = 40 / sc, p = Math.pow(10, Math.floor(Math.log10(px))), n = px / p; return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * p; }

  function dessiner() {
    if (!ctx || !document.body.contains(cv)) return;
    var w = cv.clientWidth, h = cv.clientHeight, g = etat(), v = vue(), V = calc();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
    var m0 = monde(0, h), m1 = monde(w, 0), pas = pasGrille(v.sc);
    if (g.grille) {
      ctx.strokeStyle = 'rgba(100,116,139,.16)'; ctx.lineWidth = 1; ctx.beginPath();
      for (var gx = Math.ceil(m0.x / pas) * pas; gx <= m1.x; gx += pas) { ctx.moveTo(Math.round(X(gx)) + 0.5, 0); ctx.lineTo(Math.round(X(gx)) + 0.5, h); }
      for (var gy = Math.ceil(m0.y / pas) * pas; gy <= m1.y; gy += pas) { ctx.moveTo(0, Math.round(Y(gy)) + 0.5); ctx.lineTo(w, Math.round(Y(gy)) + 0.5); }
      ctx.stroke();
    }
    if (g.axes) {
      ctx.strokeStyle = 'rgba(30,41,59,.6)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(0, Y(0)); ctx.lineTo(w, Y(0)); ctx.moveTo(X(0), 0); ctx.lineTo(X(0), h); ctx.stroke();
      ctx.fillStyle = 'rgba(30,41,59,.75)'; ctx.font = '11px system-ui, sans-serif'; ctx.textAlign = 'center';
      var ay = Math.min(Math.max(Y(0) + 14, 12), h - 4), ax = Math.min(Math.max(X(0) - 6, 18), w - 4);
      for (var tx = Math.ceil(m0.x / pas) * pas; tx <= m1.x; tx += pas) if (Math.abs(tx) > pas / 2) ctx.fillText(fmt(+tx.toPrecision(8)), X(tx), ay);
      ctx.textAlign = 'right';
      for (var ty = Math.ceil(m0.y / pas) * pas; ty <= m1.y; ty += pas) if (Math.abs(ty) > pas / 2) ctx.fillText(fmt(+ty.toPrecision(8)), ax, Y(ty) + 4);
      ctx.textAlign = 'left';
    }
    var objs = g.objs.filter(function (o) { return !o.cache; });
    objs.forEach(function (o) { var r = V[o.id]; if (r && r.k === 'poly') { ctx.fillStyle = hexA(o.c, 0.14); ctx.strokeStyle = o.c; ctx.lineWidth = 1.8; ctx.beginPath(); r.pts.forEach(function (p, i) { if (i) ctx.lineTo(X(p.x), Y(p.y)); else ctx.moveTo(X(p.x), Y(p.y)); }); ctx.closePath(); ctx.fill(); ctx.stroke(); } });
    objs.forEach(function (o) {
      var r = V[o.id]; if (!r) return;
      var choisi = sel.indexOf(o.id) >= 0;
      ctx.strokeStyle = choisi ? '#dc2626' : o.c; ctx.lineWidth = choisi ? 3 : 2;
      if (r.k === 'ligne') {
        var big = 5000 / v.sc;
        var a = r.genre === 'segment' || r.genre === 'demi' ? r.p : { x: r.p.x - big * r.d.x, y: r.p.y - big * r.d.y };
        var b = r.genre === 'segment' ? r.q : { x: r.p.x + big * r.d.x, y: r.p.y + big * r.d.y };
        ctx.beginPath(); ctx.moveTo(X(a.x), Y(a.y)); ctx.lineTo(X(b.x), Y(b.y)); ctx.stroke();
      } else if (r.k === 'cercle') {
        ctx.beginPath(); ctx.arc(X(r.c.x), Y(r.c.y), r.r * v.sc, 0, 2 * Math.PI); ctx.stroke();
      } else if (r.k === 'courbe') {
        ctx.beginPath(); var deb = true, prev = null;
        for (var px = 0; px <= w; px += 1) {
          var xx = monde(px, 0).x, yy = r.f(xx);
          if (!isFinite(yy) || (prev != null && Math.abs(Y(yy) - Y(prev)) > h)) { deb = true; prev = isFinite(yy) ? yy : null; continue; }
          var py = Math.max(-h, Math.min(2 * h, Y(yy)));
          if (deb) { ctx.moveTo(px, py); deb = false; } else ctx.lineTo(px, py);
          prev = yy;
        }
        ctx.stroke();
        etiquette(o.nom, w - 60, Math.max(14, Math.min(h - 6, Y(r.f(monde(w - 60, 0).x)) - 8)), o.c, true);
      } else if (r.k === 'implicite') {
        implicite(r.F, w, h);
      } else if (r.k === 'mesure') {
        ctx.strokeStyle = o.c; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(X(r.a.x), Y(r.a.y)); ctx.lineTo(X(r.b.x), Y(r.b.y)); ctx.stroke(); ctx.setLineDash([]);
        etiquette(fmt(r.v), X((r.a.x + r.b.x) / 2), Y((r.a.y + r.b.y) / 2) - 8, o.c);
      } else if (r.k === 'angle') {
        var sx = X(r.s.x), sy = Y(r.s.y), a1 = Math.atan2(-(r.a.y - r.s.y), r.a.x - r.s.x), a2 = Math.atan2(-(r.c.y - r.s.y), r.c.x - r.s.x), d0 = a2 - a1;
        while (d0 > Math.PI) d0 -= 2 * Math.PI; while (d0 < -Math.PI) d0 += 2 * Math.PI;
        ctx.fillStyle = hexA(o.c, 0.14); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.arc(sx, sy, 22, a1, a1 + d0, d0 < 0); ctx.closePath(); ctx.fill(); ctx.stroke();
        var am = a1 + d0 / 2; etiquette(fmt(r.v) + '°', sx + 40 * Math.cos(am), sy + 40 * Math.sin(am) + 4, o.c);
      }
    });
    objs.forEach(function (o) {
      var r = V[o.id]; if (!r || r.k !== 'pt') return;
      var libre = o.t === 'point', choisi = sel.indexOf(o.id) >= 0;
      ctx.fillStyle = choisi ? '#dc2626' : libre ? o.c : '#334155';
      ctx.beginPath(); ctx.arc(X(r.x), Y(r.y), libre ? 5 : 4, 0, 2 * Math.PI); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
      etiquette(o.nom, X(r.x) + 8, Y(r.y) - 8, '#0f172a', true);
    });
    if (souris && sel.length && ['segment', 'droite', 'cercle', 'long', 'poly', 'angle', 'milieu'].indexOf(outil) >= 0) {
      var der = V[sel[sel.length - 1]];
      if (der && der.k === 'pt') {
        ctx.strokeStyle = 'rgba(220,38,38,.6)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.4; ctx.beginPath();
        if (outil === 'cercle') ctx.arc(X(der.x), Y(der.y), Math.hypot(souris.x - der.x, souris.y - der.y) * v.sc, 0, 2 * Math.PI);
        else { ctx.moveTo(X(der.x), Y(der.y)); ctx.lineTo(X(souris.x), Y(souris.y)); }
        ctx.stroke(); ctx.setLineDash([]);
      }
    }
    textes(V);
    liste(V);
  }
  /* Courbe implicite F(x, y) = 0 par « marching squares ». */
  function implicite(F, w, h) {
    var c = 6, nx = Math.ceil(w / c) + 1, ny = Math.ceil(h / c) + 1, val = [];
    for (var j = 0; j < ny; j++) { val.push([]); for (var i = 0; i < nx; i++) { var m = monde(i * c, j * c); val[j].push(F(m.x, m.y)); } }
    ctx.beginPath();
    for (var j2 = 0; j2 < ny - 1; j2++) for (var i2 = 0; i2 < nx - 1; i2++) {
      var a = val[j2][i2], b = val[j2][i2 + 1], cc = val[j2 + 1][i2 + 1], d = val[j2 + 1][i2];
      if (![a, b, cc, d].every(isFinite)) continue;
      var pts = [], x0 = i2 * c, y0 = j2 * c;
      function bord(v1, v2, p1, p2) { if ((v1 > 0) !== (v2 > 0)) { var t = v1 / (v1 - v2); pts.push([p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])]); } }
      bord(a, b, [x0, y0], [x0 + c, y0]); bord(b, cc, [x0 + c, y0], [x0 + c, y0 + c]); bord(cc, d, [x0 + c, y0 + c], [x0, y0 + c]); bord(d, a, [x0, y0 + c], [x0, y0]);
      /* on écarte les « sauts » des fonctions discontinues (1/x…) */
      if (pts.length >= 2 && Math.max(Math.abs(a), Math.abs(b), Math.abs(cc), Math.abs(d)) < 1e6) {
        ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[1][0], pts[1][1]);
        if (pts.length === 4) { ctx.moveTo(pts[2][0], pts[2][1]); ctx.lineTo(pts[3][0], pts[3][1]); }
      }
    }
    ctx.stroke();
  }
  function hexA(c, a) { var m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(c || '#2563eb'); return m ? 'rgba(' + parseInt(m[1], 16) + ',' + parseInt(m[2], 16) + ',' + parseInt(m[3], 16) + ',' + a + ')' : c; }
  function etiquette(t, x, y, c, gras) {
    ctx.font = (gras ? '600 ' : '') + '13px system-ui, sans-serif';
    var w = ctx.measureText(t).width;
    ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(x - 2, y - 12, w + 4, 16);
    ctx.fillStyle = c; ctx.fillText(t, x, y);
  }
  /* Textes et formules : calque HTML au-dessus du canvas (rendu KaTeX). */
  function textes(V) {
    var cal = U.$('#at-textes', el); if (!cal) return;
    var vus = {};
    etat().objs.forEach(function (o) {
      if (o.t !== 'texte' || o.cache) return;
      vus[o.id] = 1;
      var d = cal.querySelector('[data-txt="' + o.id + '"]');
      if (!d) { d = document.createElement('div'); d.className = 'at-txt'; d.setAttribute('data-txt', o.id); cal.appendChild(d); }
      if (d.getAttribute('data-src') !== o.tex) { d.setAttribute('data-src', o.tex); d.innerHTML = esc(o.tex).replace(/\n/g, '<br>'); U.math(d); }
      d.style.left = X(o.x) + 'px'; d.style.top = Y(o.y) + 'px'; d.style.color = o.c;
      d.classList.toggle('choisi', sel.indexOf(o.id) >= 0);
    });
    U.$$('.at-txt', cal).forEach(function (d) { if (!vus[d.getAttribute('data-txt')]) d.remove(); });
  }

  /* ---------------- Panneau des objets ---------------- */
  function decrire(o, V) {
    var r = V[o.id];
    if (o.t === 'fonction') return o.nom + '(x) = ' + o.src;
    if (o.t === 'equation') return o.src;
    if (o.t === 'curseur') return o.nom + ' = ' + fmt(o.v);
    if (o.t === 'texte') return '« ' + (o.tex.length > 26 ? o.tex.slice(0, 25) + '…' : o.tex) + ' »';
    if (!r) return o.nom + ' : non défini';
    if (r.k === 'pt') return o.nom + '(' + fmt(r.x) + ' ; ' + fmt(r.y) + ')';
    if (r.k === 'ligne') {
      var lab = o.lib || o.nom;
      if (o.t === 'segment') return lab + ' : longueur ' + fmt(Math.hypot(r.q.x - r.p.x, r.q.y - r.p.y));
      if (Math.abs(r.d.x) < 1e-9) return lab + ' : x = ' + fmt(r.p.x);
      var m = r.d.y / r.d.x, p = r.p.y - m * r.p.x;
      return lab + ' : y = ' + fmt(m) + 'x ' + (p >= 0 ? '+ ' : '− ') + fmt(Math.abs(p));
    }
    if (r.k === 'cercle') return (o.lib || o.nom) + ' : rayon ' + fmt(r.r) + ', aire ' + fmt(Math.PI * r.r * r.r);
    if (r.k === 'poly') return (o.lib || o.nom) + ' : aire ' + fmt(r.aire) + ', périmètre ' + fmt(r.perim);
    if (r.k === 'mesure') return o.nom + ' = ' + fmt(r.v);
    if (r.k === 'angle') return o.nom + ' = ' + fmt(r.v) + '°';
    return o.nom;
  }
  function liste(V) {
    var z = U.$('#at-liste', el); if (!z) return;
    var objs = etat().objs;
    if (!objs.length) { z.innerHTML = '<p class="small muted" style="margin:6px 2px">Tape une commande ci-dessus (par exemple <code>f(x) = x^2 - 2</code>, <code>A = (1 ; 2)</code> ou <code>x^2 + y^2 = 9</code>) ou utilise les outils.</p>'; return; }
    var clef = objs.map(function (o) { return o.id + o.cache + o.c; }).join('|');
    if (z.getAttribute('data-clef') !== clef) {
      z.setAttribute('data-clef', clef);
      z.innerHTML = objs.map(function (o) {
        return '<div class="at-o" data-o="' + o.id + '"><button type="button" class="at-pastille' + (o.cache ? ' off' : '') + '" data-vis="' + o.id + '" style="--fc:' + o.c + '" aria-label="Afficher ou masquer" title="Afficher ou masquer"></button>' +
          '<span class="at-d"></span>' +
          (o.t === 'curseur' ? '<input type="range" class="at-cur" data-cur="' + o.id + '" min="' + o.min + '" max="' + o.max + '" step="' + o.pas + '" value="' + o.v + '" aria-label="Curseur ' + esc(o.nom) + '">' : '') +
          '<button type="button" class="at-x" data-supp="' + o.id + '" aria-label="Supprimer" title="Supprimer">×</button></div>';
      }).join('');
    }
    objs.forEach(function (o) { var d = z.querySelector('[data-o="' + o.id + '"] .at-d'); if (d) d.textContent = decrire(o, V); });
  }

  /* ---------------- Barre de saisie (commandes) ---------------- */
  function arguments_(s) {
    var out = [], prof = 0, cur = '', sep = s.indexOf(';') >= 0 ? ';' : ',';
    for (var i = 0; i < s.length; i++) { var c = s[i]; if (c === '(') prof++; if (c === ')') prof--; if (c === sep && prof === 0) { out.push(cur.trim()); cur = ''; } else cur += c; }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  function pointParNom(n) { var o = parNom(n); if (!o) throw new Error('Point « ' + n + ' » inconnu'); return o.id; }
  function ligneParNom(n) { var o = parNom(n); if (!o) throw new Error('Objet « ' + n + ' » inconnu'); return o.id; }
  function executer(src) {
    src = src.trim().replace(/[−–]/g, '-').replace(/²/g, '^2').replace(/³/g, '^3');
    if (!src) return;
    var m, g = etat();
    memoriser();
    try {
      /* Point : A = (1 ; 2) */
      if ((m = /^([A-Z][A-Za-z0-9']*)\s*=\s*\((.+)\)$/.exec(src))) {
        var c = arguments_(m[2]); if (c.length !== 2) throw new Error('Un point s\'écrit A = (x ; y)');
        var px = nombre(c[0].replace(',', '.')), py = nombre(c[1].replace(',', '.'));
        if (!isFinite(px) || !isFinite(py)) throw new Error('Coordonnées invalides');
        var ex = parNom(m[1]); if (ex && ex.t === 'point') { ex.x = px; ex.y = py; } else ajouter({ t: 'point', x: px, y: py, nom: m[1] });
        return fini();
      }
      /* Fonction nommée : f(x) = … */
      if ((m = /^([a-z][a-z0-9]*)\s*\(\s*x\s*\)\s*=\s*(.+)$/.exec(src))) { compiler(m[2]); var fx = parNom(m[1]); if (fx && fx.t === 'fonction') { fx.expr = m[2]; fx.src = m[2]; } else ajouter({ t: 'fonction', nom: m[1], expr: m[2], src: m[2] }); return fini(); }
      /* Commandes : Segment(A, B), Cercle(A, 3)… */
      if ((m = /^([A-Za-zéèàêîôûç]+)\s*\((.*)\)$/.exec(src)) && COMMANDES[norme(m[1])]) { COMMANDES[norme(m[1])](arguments_(m[2])); return fini(); }
      if (src.indexOf('=') >= 0) {
        var cotes = src.split('=');
        if (cotes.length !== 2) throw new Error('Un seul signe = attendu');
        var g0 = cotes[0].trim(), d0 = cotes[1].trim();
        /* y = expression en x : fonction */
        if (g0 === 'y' && !/\by\b/.test(d0)) { compiler(d0); ajouter({ t: 'fonction', nom: nomLibre('f'), expr: d0, src: d0 }); return fini(); }
        /* curseur : a = 2 */
        if (/^[a-z][a-z0-9]*$/.test(g0) && g0 !== 'x' && g0 !== 'y' && !/\b[xy]\b/.test(d0)) {
          var val = nombre(d0); if (!isFinite(val)) throw new Error('Valeur invalide');
          var cu = parNom(g0);
          if (cu && cu.t === 'curseur') cu.v = val;
          else ajouter({ t: 'curseur', nom: g0, v: val, min: Math.min(-10, Math.floor(val * 2)), max: Math.max(10, Math.ceil(val * 2)), pas: 0.1, c: '#4b5563' });
          return fini();
        }
        /* équation en x et y : courbe implicite */
        if (/\b[xy]\b/.test(src)) { var expr = '(' + g0 + ')-(' + d0 + ')'; compiler(expr); ajouter({ t: 'equation', nom: nomLibre('eq'), expr: expr, src: src }); return fini(); }
      }
      /* sinon : simple calcul */
      Moteur.regler({ angle: 'rad', vars: env() });
      var z = Moteur.evaluer(Moteur.parser(src), env());
      histo.pop();
      var ex2 = Moteur.formeExacte(z);
      resultat(src + ' = ' + Moteur.fmt(z) + (ex2 && ex2 !== Moteur.fmt(z) ? '  (= ' + ex2 + ')' : ''));
      return true;
    } catch (e) {
      histo.pop();
      resultat(e.message || 'Commande non comprise', true);
      return false;
    }
    function fini() { sauver(); dessiner(); resultat(''); return true; }
  }
  function norme(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  var COMMANDES = {
    segment: function (a) { var A = pointParNom(a[0]), B = pointParNom(a[1]); ajouter({ t: 'segment', a: A, b: B, nom: nomLibre('s'), lib: '[' + a[0] + a[1] + ']' }); },
    droite: function (a) { var A = pointParNom(a[0]), B = pointParNom(a[1]); ajouter({ t: 'droite', a: A, b: B, nom: nomLibre('d'), lib: '(' + a[0] + a[1] + ')' }); },
    demidroite: function (a) { var A = pointParNom(a[0]), B = pointParNom(a[1]); ajouter({ t: 'demi', a: A, b: B, nom: nomLibre('d'), lib: '[' + a[0] + a[1] + ')' }); },
    cercle: function (a) {
      var C = pointParNom(a[0]), o2 = parNom(a[1]);
      if (o2) ajouter({ t: 'cercle', c: C, p: o2.id, nom: nomLibre('c'), lib: 'cercle de centre ' + a[0] });
      else { if (!isFinite(nombre(a[1]))) throw new Error('Rayon invalide'); ajouter({ t: 'cercle', c: C, r: a[1], nom: nomLibre('c'), lib: 'cercle de centre ' + a[0] + ', rayon ' + a[1] }); }
    },
    milieu: function (a) { ajouter({ t: 'milieu', a: pointParNom(a[0]), b: pointParNom(a[1]), nom: nomLibre('', true) }); },
    polygone: function (a) { if (a.length < 3) throw new Error('Il faut au moins 3 points'); ajouter({ t: 'poly', pts: a.map(pointParNom), nom: nomLibre('p'), lib: a.join('') }); },
    triangle: function (a) { COMMANDES.polygone(a); },
    perpendiculaire: function (a) { ajouter({ t: 'perp', l: ligneParNom(a[0]), p: pointParNom(a[1]), nom: nomLibre('d'), lib: 'perp. à ' + a[0] + ' par ' + a[1] }); },
    parallele: function (a) { ajouter({ t: 'para', l: ligneParNom(a[0]), p: pointParNom(a[1]), nom: nomLibre('d'), lib: 'para. à ' + a[0] + ' par ' + a[1] }); },
    intersection: function (a) { var o1 = ligneParNom(a[0]), o2 = ligneParNom(a[1]), V = calc(), n = 0; for (var i = 0; i < 2; i++) if (intersection(V[o1], V[o2], i, 0)) { ajouter({ t: 'inter', o1: o1, o2: o2, i: i, gx: 0, nom: nomLibre('', true) }); n++; if (V[o1].k === 'ligne' && V[o2].k === 'ligne') break; } if (!n) throw new Error('Pas d\'intersection'); },
    longueur: function (a) { ajouter({ t: 'long', a: pointParNom(a[0]), b: pointParNom(a[1]), nom: a[0] + a[1] }); },
    distance: function (a) { COMMANDES.longueur(a); },
    angle: function (a) { ajouter({ t: 'angle', a: pointParNom(a[0]), b: pointParNom(a[1]), c: pointParNom(a[2]), nom: 'angle ' + a.join('') }); },
    texte: function (a) { var v = vue(), m = monde(cv.clientWidth / 2, cv.clientHeight / 2); ajouter({ t: 'texte', x: m.x, y: m.y, tex: a.join(', ').replace(/^"|"$/g, ''), nom: nomLibre('t'), c: '#111827' }); }
  };
  function resultat(t, erreur) { var z = U.$('#at-res', el); if (!z) return; z.textContent = t; z.className = 'at-res' + (erreur ? ' err' : ''); }

  /* ---------------- Clics sur la feuille ---------------- */
  function pointSous(px, py, V) {
    var best = null, bd = 12;
    etat().objs.forEach(function (o) { var r = V[o.id]; if (r && r.k === 'pt' && !o.cache) { var d = Math.hypot(X(r.x) - px, Y(r.y) - py); if (d < bd) { bd = d; best = o.id; } } });
    return best;
  }
  function courbeSous(px, py, V, types) {
    var best = null, bd = 8, m = monde(px, py), v = vue();
    etat().objs.forEach(function (o) {
      var r = V[o.id]; if (!r || o.cache || types.indexOf(r.k) < 0) return;
      var d = 999;
      if (r.k === 'ligne') {
        var t = (m.x - r.p.x) * r.d.x + (m.y - r.p.y) * r.d.y;
        if (r.genre === 'segment') t = Math.max(0, Math.min(Math.hypot(r.q.x - r.p.x, r.q.y - r.p.y), t));
        if (r.genre === 'demi') t = Math.max(0, t);
        d = Math.hypot(m.x - r.p.x - t * r.d.x, m.y - r.p.y - t * r.d.y) * v.sc;
      } else if (r.k === 'cercle') d = Math.abs(Math.hypot(m.x - r.c.x, m.y - r.c.y) - r.r) * v.sc;
      else if (r.k === 'courbe') { var y = r.f(m.x); if (isFinite(y)) d = Math.abs(Y(y) - py); }
      if (d < bd) { bd = d; best = o.id; }
    });
    return best;
  }
  function pointA(px, py, V) {
    var id = pointSous(px, py, V); if (id) return id;
    var m = aimanter(monde(px, py));
    return ajouter({ t: 'point', x: m.x, y: m.y, nom: nomLibre('', true) });
  }
  function nomDe(id) { var o = obj(id); return o ? o.nom : '?'; }
  function supprimer(id) {
    var g = etat(), a = {}, ch = true; a[id] = 1;
    while (ch) { ch = false; g.objs.forEach(function (o) { if (a[o.id]) return; var deps = [o.a, o.b, o.c, o.p, o.l, o.o1, o.o2].concat(o.pts || []); if (deps.some(function (d) { return d && a[d]; })) { a[o.id] = 1; ch = true; } }); }
    g.objs = g.objs.filter(function (o) { return !a[o.id]; });
  }
  function clic(px, py) {
    var V = calc(), id;
    if (outil === 'suppr') {
      id = pointSous(px, py, V) || courbeSous(px, py, V, ['ligne', 'cercle', 'courbe']);
      if (id) { memoriser(); supprimer(id); sauver(); }
      return;
    }
    if (outil === 'point') { memoriser(); if (!pointSous(px, py, V)) { var m = aimanter(monde(px, py)); ajouter({ t: 'point', x: m.x, y: m.y, nom: nomLibre('', true) }); } sauver(); return; }
    if (outil === 'texte') {
      var m2 = monde(px, py);
      var t = prompt('Texte à placer. Pour une formule, écris-la entre $…$, par exemple : Aire = $\\pi r^2$');
      if (t) { memoriser(); ajouter({ t: 'texte', x: m2.x, y: m2.y, tex: t.slice(0, 300), nom: nomLibre('t'), c: '#111827' }); sauver(); }
      return;
    }
    if (outil === 'perp' || outil === 'para') {
      if (!sel.length) { id = courbeSous(px, py, V, ['ligne']); if (id) sel = [id]; else toast('Clique d\'abord sur une droite ou un segment.'); return; }
      memoriser(); var p = pointA(px, py, calc()), base = obj(sel[0]);
      ajouter({ t: outil, l: sel[0], p: p, nom: nomLibre('d'), lib: (outil === 'perp' ? 'perp. à ' : 'para. à ') + (base.lib || base.nom) + ' par ' + nomDe(p) });
      sel = []; sauver(); return;
    }
    if (outil === 'inter') {
      id = courbeSous(px, py, V, ['ligne', 'cercle', 'courbe']);
      if (!id) { toast('Clique sur une droite, un cercle ou une courbe.'); return; }
      if (sel.indexOf(id) < 0) sel.push(id);
      if (sel.length === 2) {
        memoriser();
        var g1 = V[sel[0]], g2 = V[sel[1]], gx = monde(px, py).x, n = (g1.k === 'cercle' || g2.k === 'cercle') && g1.k !== 'courbe' && g2.k !== 'courbe' ? 2 : 1, faits = 0;
        for (var i = 0; i < n; i++) if (intersection(g1, g2, i, gx)) { ajouter({ t: 'inter', o1: sel[0], o2: sel[1], i: i, gx: gx, nom: nomLibre('', true) }); faits++; }
        if (!faits) toast('Pas d\'intersection trouvée.');
        sel = []; sauver();
      }
      return;
    }
    var besoin = { segment: 2, droite: 2, cercle: 2, milieu: 2, long: 2, angle: 3 }[outil];
    if (outil === 'poly') {
      var cible = pointSous(px, py, V);
      if (sel.length >= 3 && cible === sel[0]) { memoriser(); ajouter({ t: 'poly', pts: sel.slice(), nom: nomLibre('p'), lib: sel.map(nomDe).join('') }); sel = []; sauver(); return; }
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
      if (outil === 'segment') ajouter({ t: 'segment', a: A, b: B, nom: nomLibre('s'), lib: '[' + nA + nB + ']' });
      if (outil === 'droite') ajouter({ t: 'droite', a: A, b: B, nom: nomLibre('d'), lib: '(' + nA + nB + ')' });
      if (outil === 'cercle') ajouter({ t: 'cercle', c: A, p: B, nom: nomLibre('c'), lib: 'cercle de centre ' + nA });
      if (outil === 'milieu') ajouter({ t: 'milieu', a: A, b: B, nom: nomLibre('', true) });
      if (outil === 'long') ajouter({ t: 'long', a: A, b: B, nom: nA + nB });
      if (outil === 'angle') ajouter({ t: 'angle', a: A, b: B, c: sel[2], nom: 'angle ' + nA + nB + nomDe(sel[2]) });
      sel = [];
    }
    sauver();
  }

  /* ---------------- Exercices ---------------- */
  function exerciceFigure() {
    var V = calc(), objs = etat().objs, c = [], r2 = function (x) { return Math.round(x * 100) / 100; };
    function pt(o) { return V[o.id] && V[o.id].k === 'pt' ? V[o.id] : null; }
    var pts = objs.filter(function (o) { return pt(o); });
    objs.forEach(function (o) {
      var r = V[o.id]; if (!r) return;
      if (r.k === 'poly') {
        c.push({ q: 'Calcule l\'aire du polygone $' + o.lib + '$ (arrondie au centième si besoin).', type: 'num', rep: r.aire, tol: 0.011, corr: 'Avec les coordonnées des sommets (formule du lacet, ou en découpant en triangles), l\'aire vaut $' + fmt(r.aire) + '$.' });
        c.push({ q: 'Calcule le périmètre du polygone $' + o.lib + '$ (arrondi au centième).', type: 'num', rep: r.perim, tol: 0.011, corr: 'On additionne les longueurs des côtés, chacune calculée avec $\\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$ : périmètre $\\approx ' + fmt(r.perim) + '$.' });
      }
      if (r.k === 'ligne' && o.t === 'segment') { var L = Math.hypot(r.q.x - r.p.x, r.q.y - r.p.y), dx = r2(r.q.x - r.p.x), dy = r2(r.q.y - r.p.y); c.push({ q: 'Calcule la longueur du segment $' + o.lib + '$ (valeur exacte comme √13, ou arrondie au centième).', type: 'num', rep: L, tol: 0.011, corr: '$\\sqrt{(' + fmt(dx) + ')^2 + (' + fmt(dy) + ')^2} \\approx ' + fmt(L) + '$.' }); }
      if (r.k === 'ligne' && Math.abs(r.d.x) > 1e-9) { var m = r.d.y / r.d.x; c.push({ q: 'Quel est le coefficient directeur de la droite ' + (o.lib || o.nom) + ' ? (fraction ou décimal)', type: 'num', rep: m, tol: 0.011, corr: '$m = \\dfrac{\\Delta y}{\\Delta x} \\approx ' + fmt(m) + '$.' }); }
      if (r.k === 'cercle') { c.push({ q: 'Calcule l\'aire du disque délimité par le ' + o.lib + ' (arrondie au centième).', type: 'num', rep: Math.PI * r.r * r.r, tol: 0.011, corr: '$\\pi r^2$ avec $r \\approx ' + fmt(r.r) + '$ : $\\approx ' + fmt(Math.PI * r.r * r.r) + '$.' }); c.push({ q: 'Calcule le périmètre du ' + o.lib + ' (arrondi au centième).', type: 'num', rep: 2 * Math.PI * r.r, tol: 0.011, corr: '$2\\pi r \\approx ' + fmt(2 * Math.PI * r.r) + '$.' }); }
      if (r.k === 'angle') c.push({ q: 'Combien mesure l\'' + o.nom + ' (en degrés, arrondi à l\'unité) ?', type: 'num', rep: r.v, tol: 0.6, corr: 'Par le produit scalaire ou la trigonométrie : $\\approx ' + Math.round(r.v) + '°$.' });
      if (r.k === 'courbe') {
        var f = r.f, x0 = [-2, -1, 1, 2, 3][Math.floor(Math.random() * 5)];
        if (isFinite(f(x0))) c.push({ q: 'Calcule $' + o.nom + '(' + x0 + ')$ pour $' + o.nom + '(x) = ' + o.src.replace(/\*/g, '\\times ') + '$.', type: 'num', rep: f(x0), tol: 0.011, corr: 'On remplace $x$ par $' + x0 + '$ : $' + o.nom + '(' + x0 + ') \\approx ' + fmt(f(x0)) + '$.' });
        var zs = Moteur.racinesIntervalle(f, -20, 20, 4000);
        if (zs.length) c.push({ q: 'Donne une solution de l\'équation $' + o.nom + '(x) = 0$ (arrondie au centième). ' + (zs.length > 1 ? 'Il y en a ' + zs.length + ' entre −20 et 20 : une seule suffit.' : ''), type: 'une', rep: zs, tol: 0.011, corr: 'Les zéros de $' + o.nom + '$ sont les abscisses des points où la courbe coupe l\'axe des abscisses : $x \\approx ' + zs.map(fmt).join('\\ ;\\ ') + '$.' });
        var dv = Moteur.derivee(f, 1);
        if (isFinite(dv)) c.push({ q: 'Quel est le nombre dérivé de $' + o.nom + '$ en $1$ (arrondi au centième) ?', type: 'num', rep: dv, tol: 0.011, corr: 'C\'est la pente de la tangente en $x = 1$ : $' + o.nom + '\'(1) \\approx ' + fmt(dv) + '$.' });
      }
    });
    if (pts.length >= 2) { var A = pts[0], B = pts[1], vA = V[A.id], vB = V[B.id]; c.push({ q: 'Quelle est l\'abscisse du milieu de $[' + A.nom + B.nom + ']$ ?', type: 'num', rep: (vA.x + vB.x) / 2, tol: 0.011, corr: '$\\dfrac{x_' + A.nom + ' + x_' + B.nom + '}{2} = ' + fmt((vA.x + vB.x) / 2) + '$.' }); }
    var fs = objs.filter(function (o) { return V[o.id] && V[o.id].k === 'courbe'; });
    if (fs.length >= 2) { var f1 = V[fs[0].id].f, f2 = V[fs[1].id].f, zi = Moteur.racinesIntervalle(function (x) { return f1(x) - f2(x); }, -20, 20, 4000); if (zi.length) c.push({ q: 'Donne l\'abscisse d\'un point d\'intersection des courbes de $' + fs[0].nom + '$ et $' + fs[1].nom + '$ (arrondie au centième).', type: 'une', rep: zi, tol: 0.011, corr: 'On résout $' + fs[0].nom + '(x) = ' + fs[1].nom + '(x)$ : $x \\approx ' + zi.map(fmt).join('\\ ;\\ ') + '$.' }); }
    return c.length ? c[Math.floor(Math.random() * c.length)] : null;
  }
  function afficherExo(e, titre) {
    var z = U.$('#at-exo-zone', el);
    if (!e) { z.innerHTML = '<p class="small muted">Trace d\'abord quelque chose : un polygone, un cercle, une fonction… L\'exercice portera sur ta figure.</p>'; return; }
    z.innerHTML = '<p class="small muted" style="margin:0 0 8px">' + esc(titre) + '</p><div id="at-exo"></div>';
    Exo.monter(U.$('#at-exo', el), e, { num: 1, essais: 2 });
  }

  /* ---------------- Montage de la page ---------------- */
  function vPage(main) {
    if (!Store.connecte()) { location.hash = '#/compte'; return; }
    if (!Store.estPremium()) {
      main.innerHTML = '<section class="page"><div class="wrap wrap-narrow"><span class="eyebrow">Mode libre · abonnés</span><h1>Ta feuille de maths sans limites</h1>' +
        '<div class="card">' + Mascotte.bulle('Trace des fonctions et des équations, construis des figures, écris des formules et génère des exercices sur ce que tu dessines. Le mode libre fait partie de l\'abonnement.', 'content') +
        '<ul class="retenir"><li>' + I('chart') + '<span>Fonctions $y = f(x)$, équations comme $x^2 + y^2 = 9$, curseurs pour faire varier un paramètre.</span></li><li>' + I('target') + '<span>Points, segments, droites, cercles, polygones, milieux, perpendiculaires, intersections, longueurs, angles, aires.</span></li><li>' + I('pencil') + '<span>Textes et formules posés directement sur la feuille, calculatrice intégrée.</span></li><li>' + I('refresh') + '<span>Exercices générés sur ta figure ou sur le chapitre de ton choix.</span></li></ul>' +
        '<div class="btn-row" style="margin-top:16px"><a class="btn" href="#/abonnement">' + I('crown') + 'Voir les offres</a><button class="btn btn-ghost" type="button" data-outil="geometrie">Essayer la géométrie simple (gratuite)</button></div></div></div></section>';
      U.math(main);
      return;
    }
    var g = etat();
    main.innerHTML = '<section class="atelier">' +
      '<aside class="at-algebre"><form id="at-f" class="at-saisie" autocomplete="off"><label class="sr" for="at-in">Commande</label><input class="input mono" id="at-in" placeholder="f(x) = x^2 - 2   ·   A = (1 ; 2)   ·   x^2 + y^2 = 9" spellcheck="false"><button class="btn btn-sm" type="submit">OK</button></form>' +
      '<div class="at-res" id="at-res" aria-live="polite"></div>' +
      '<details class="at-aide"><summary>Commandes</summary><ul class="small">' +
      '<li><code>f(x) = 2x + 1</code>, <code>y = sin(x)</code> : fonctions</li><li><code>x^2 + y^2 = 9</code>, <code>x = 3</code>, <code>y^2 = x</code> : équations</li><li><code>A = (1 ; 2)</code> : point</li><li><code>a = 2</code> : curseur (utilisable dans les fonctions)</li>' +
      '<li><code>Segment(A, B)</code>, <code>Droite(A, B)</code>, <code>DemiDroite(A, B)</code></li><li><code>Cercle(A, 3)</code> ou <code>Cercle(A, B)</code>, <code>Polygone(A, B, C)</code>, <code>Milieu(A, B)</code></li><li><code>Perpendiculaire(d1, A)</code>, <code>Parallele(d1, A)</code>, <code>Intersection(f, d1)</code></li><li><code>Longueur(A, B)</code>, <code>Angle(A, B, C)</code>, <code>Texte("Aire = $\\pi r^2$")</code></li><li>Un calcul seul, par ex. <code>sqrt(2)*3</code>, donne son résultat.</li></ul></details>' +
      '<div class="at-liste" id="at-liste"></div></aside>' +
      '<div class="at-centre"><div class="geo-outils" role="toolbar" aria-label="Outils">' + OUTILS.map(function (o) { return '<button type="button" class="cb' + (o[0] === outil ? ' on' : '') + '" data-at="' + o[0] + '" title="' + esc(o[2]) + '">' + o[1] + '</button>'; }).join('') + '</div>' +
      '<div class="geo-aide small muted" id="at-aide"></div>' +
      '<div class="at-cadre"><canvas id="at-cv" aria-label="Feuille du mode libre"></canvas><div class="at-textes" id="at-textes"></div></div>' +
      '<div class="geo-bas"><label class="switch"><input type="checkbox" id="at-grille"' + (g.grille ? ' checked' : '') + '> Grille</label><label class="switch"><input type="checkbox" id="at-axes"' + (g.axes ? ' checked' : '') + '> Axes</label><label class="switch"><input type="checkbox" id="at-aim"' + (g.aimant ? ' checked' : '') + '> Magnétisme</label><span class="spacer"></span>' +
      '<button type="button" class="cb" id="at-ann">↶ Annuler</button><button type="button" class="cb" id="at-ref">↷</button><button type="button" class="cb" data-z="1.25">Zoom +</button><button type="button" class="cb" data-z="0.8">Zoom −</button><button type="button" class="cb" id="at-centre">Recentrer</button><button type="button" class="cb" id="at-tout">Tout effacer</button><button type="button" class="cb" id="at-png">Image</button></div></div>' +
      '<aside class="at-droite"><div class="seg" role="tablist"><button type="button" class="seg-b" data-pan="exo" aria-selected="true">Exercices</button><button type="button" class="seg-b" data-pan="calc" aria-selected="false">Calculatrice</button></div>' +
      '<div id="at-pan-exo"><div class="btn-row"><button class="btn btn-sm" type="button" id="at-exo-fig">' + I('target') + 'Sur ma figure</button></div>' +
      '<div class="form-l" style="margin-top:10px"><label class="large">Chapitre<select class="input" id="at-chap">' + NIVEAUX.map(function (n) { return '<optgroup label="' + esc(n.long) + '">' + LECONS.filter(function (l) { return l.niveau === n.id; }).map(function (l) { return '<option value="' + l.id + '"' + (l.niveau === Store.get().niveau && l.ordre === 1 ? ' selected' : '') + '>' + esc(l.titre) + '</option>'; }).join('') + '</optgroup>'; }).join('') + '</select></label><button class="btn btn-2 btn-sm" type="button" id="at-exo-chap">Générer</button></div>' +
      '<div id="at-exo-zone" style="margin-top:12px"></div></div><div id="at-pan-calc" hidden></div></aside></section>';
    cv = U.$('#at-cv', main); ctx = cv.getContext('2d'); el = main;
    U.math(U.$('.at-aide', main));
    /* colonnes de gauche (commandes) et de droite (exercices, calculatrice) : largeur réglable */
    var sec = U.$('.atelier', main);
    Redim.activer(sec, U.$('.at-algebre', main), { nom: 'at-g', cote: 'droite', min: 200, max: 560, defaut: 280 });
    Redim.activer(sec, U.$('.at-droite', main), { nom: 'at-d', cote: 'gauche', min: 240, max: 620, defaut: 320 });
    aide(); taille(); lier(main);
    if (!g.objs.length) exemple();
  }
  function exemple() {
    ['f(x) = x^2/4 - 2', 'A = (-2 ; 1)', 'B = (3 ; 1)', 'C = (1 ; 4)', 'Polygone(A, B, C)', 'x^2 + y^2 = 16'].forEach(executer);
    histo = [];
    resultat('Exemple chargé : modifie-le, ou « Tout effacer » pour repartir de zéro.');
  }
  function aide() { var o = OUTILS.filter(function (x) { return x[0] === outil; })[0], z = U.$('#at-aide', el); if (z) z.textContent = o[2] + (sel.length ? ' (' + sel.length + ' sélectionné' + (sel.length > 1 ? 's' : '') + ', Échap pour annuler)' : ''); }
  function taille() { if (!cv || !document.body.contains(cv)) return; dpr = window.devicePixelRatio || 1; cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr; dessiner(); }
  function lier(main) {
    var depart = null;
    U.$('#at-f', main).onsubmit = function (e) { e.preventDefault(); var i = U.$('#at-in', main); if (executer(i.value)) i.value = ''; };
    cv.addEventListener('pointerdown', function (e) {
      var rc = cv.getBoundingClientRect(), px = e.clientX - rc.left, py = e.clientY - rc.top, V = calc();
      depart = { px: px, py: py, bouge: false }; cv.setPointerCapture(e.pointerId);
      if (outil === 'deplacer') {
        var id = pointSous(px, py, V), o = id && obj(id);
        if (o && o.t === 'point') { memoriser(); drag = { id: id }; }
        else { var v = vue(); drag = { pan: true, ox: v.ox, oy: v.oy }; }
      }
    });
    cv.addEventListener('pointermove', function (e) {
      var rc = cv.getBoundingClientRect(), px = e.clientX - rc.left, py = e.clientY - rc.top;
      souris = monde(px, py);
      if (depart && Math.hypot(px - depart.px, py - depart.py) > 4) depart.bouge = true;
      if (drag && depart) {
        if (drag.id) { var m = aimanter(monde(px, py)), o = obj(drag.id); o.x = m.x; o.y = m.y; }
        else if (drag.pan) { var v = vue(); v.ox = drag.ox + px - depart.px; v.oy = drag.oy + py - depart.py; }
      }
      dessiner();
    });
    cv.addEventListener('pointerup', function () { if (depart && !depart.bouge && outil !== 'deplacer') clic(depart.px, depart.py); if (drag) sauver(); drag = null; depart = null; aide(); dessiner(); });
    cv.addEventListener('pointerleave', function () { souris = null; dessiner(); });
    cv.addEventListener('wheel', function (e) { e.preventDefault(); var rc = cv.getBoundingClientRect(), px = e.clientX - rc.left, py = e.clientY - rc.top, v = vue(), m = monde(px, py); v.sc = Math.max(4, Math.min(400, v.sc * (e.deltaY > 0 ? 0.9 : 1.1))); v.ox = px - m.x * v.sc; v.oy = py + m.y * v.sc; dessiner(); sauver(); }, { passive: false });
    /* textes déplaçables */
    U.$('#at-textes', main).addEventListener('pointerdown', function (e) {
      var d = e.target.closest('.at-txt'); if (!d) return;
      var o = obj(d.getAttribute('data-txt')); if (!o) return;
      if (outil === 'suppr') { memoriser(); supprimer(o.id); sauver(); dessiner(); return; }
      if (outil !== 'deplacer') return;
      e.preventDefault(); memoriser();
      var rc = cv.getBoundingClientRect(), x0 = e.clientX, y0 = e.clientY, ox = o.x, oy = o.y, sc = vue().sc;
      function bouge(ev) { o.x = ox + (ev.clientX - x0) / sc; o.y = oy - (ev.clientY - y0) / sc; dessiner(); }
      function fin() { document.removeEventListener('pointermove', bouge); document.removeEventListener('pointerup', fin); sauver(); }
      document.addEventListener('pointermove', bouge); document.addEventListener('pointerup', fin);
    });
    U.$('#at-textes', main).addEventListener('dblclick', function (e) {
      var d = e.target.closest('.at-txt'); if (!d) return; var o = obj(d.getAttribute('data-txt')); if (!o) return;
      var t = prompt('Modifier le texte :', o.tex); if (t != null) { memoriser(); o.tex = t.slice(0, 300); sauver(); dessiner(); }
    });
    main.addEventListener('click', function (e) {
      var g = etat(), b = e.target.closest('[data-at]');
      if (b) { outil = b.getAttribute('data-at'); sel = []; U.$$('[data-at]', main).forEach(function (x) { x.classList.toggle('on', x === b); }); aide(); dessiner(); return; }
      var z = e.target.closest('[data-z]');
      if (z) { var v = vue(), k = +z.getAttribute('data-z'), cx = cv.clientWidth / 2, cy = cv.clientHeight / 2, m = monde(cx, cy); v.sc = Math.max(4, Math.min(400, v.sc * k)); v.ox = cx - m.x * v.sc; v.oy = cy + m.y * v.sc; dessiner(); sauver(); return; }
      if (e.target.closest('#at-ann')) { if (histo.length) { futur.push(JSON.stringify(g.objs)); g.objs = JSON.parse(histo.pop()); sel = []; dessiner(); sauver(); } return; }
      if (e.target.closest('#at-ref')) { if (futur.length) { histo.push(JSON.stringify(g.objs)); g.objs = JSON.parse(futur.pop()); dessiner(); sauver(); } return; }
      if (e.target.closest('#at-centre')) { g.vue = { ox: null, oy: null, sc: 40 }; dessiner(); sauver(); return; }
      if (e.target.closest('#at-tout')) { if (g.objs.length && confirm('Effacer toute la feuille ?')) { memoriser(); g.objs = []; sel = []; dessiner(); sauver(); } return; }
      if (e.target.closest('#at-png')) { var a = document.createElement('a'); a.href = cv.toDataURL('image/png'); a.download = 'mode-libre.png'; document.body.appendChild(a); a.click(); a.remove(); return; }
      var vis = e.target.closest('[data-vis]'); if (vis) { var o = obj(vis.getAttribute('data-vis')); o.cache = !o.cache; sauver(); dessiner(); return; }
      var sp = e.target.closest('[data-supp]'); if (sp) { memoriser(); supprimer(sp.getAttribute('data-supp')); sauver(); dessiner(); return; }
      var pan = e.target.closest('[data-pan]');
      if (pan) { var p = pan.getAttribute('data-pan'); U.$$('[data-pan]', main).forEach(function (x) { x.setAttribute('aria-selected', x === pan); }); U.$('#at-pan-exo', main).hidden = p !== 'exo'; U.$('#at-pan-calc', main).hidden = p !== 'calc'; if (p === 'calc') Calculatrice.monter(U.$('#at-pan-calc', main)); return; }
      if (e.target.closest('#at-exo-fig')) { afficherExo(exerciceFigure(), 'Exercice sur ta figure'); return; }
      if (e.target.closest('#at-exo-chap')) { var id = U.$('#at-chap', main).value, L = Vues.lecon_(id), gen = GENERATEURS[id]; afficherExo(gen ? gen() : L.exos[0], L.titre); return; }
    });
    main.addEventListener('input', function (e) {
      var c = e.target.closest('[data-cur]'); if (!c) return;
      var o = obj(c.getAttribute('data-cur')); o.v = +c.value; dessiner();
      clearTimeout(c._t); c._t = setTimeout(sauver, 400);
    });
    U.$('#at-grille', main).onchange = function () { etat().grille = this.checked; dessiner(); sauver(); };
    U.$('#at-axes', main).onchange = function () { etat().axes = this.checked; dessiner(); sauver(); };
    U.$('#at-aim', main).onchange = function () { etat().aimant = this.checked; sauver(); };
  }
  var ecoute = false;
  window.Atelier = {
    page: function (main) {
      vPage(main);
      if (!ecoute) {
        ecoute = true;
        window.addEventListener('resize', taille);
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sel.length && cv && document.body.contains(cv)) { sel = []; aide(); dessiner(); e.stopPropagation(); } }, true);
      }
    },
    executer: function (s) { return executer(s); }
  };
})();
