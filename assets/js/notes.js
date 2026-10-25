/* Math Everyday — notes : carnets, étiquettes, couleurs, épinglage, recherche, éditeur riche
   (styles, polices, tailles, couleurs, surligneur, listes, cases à cocher, tableaux, formules LaTeX,
   encadrés de cours, liens), mise en page de la feuille, export et impression. Expose window.Notes. */
(function () {
  'use strict';
  var esc = function (s) { return U.esc(s); };

  var COULEURS_NOTE = [['', 'Aucune'], ['#f59e0b', 'Ambre'], ['#ef4444', 'Rouge'], ['#22c55e', 'Vert'], ['#3b82f6', 'Bleu'], ['#a855f7', 'Violet'], ['#ec4899', 'Rose'], ['#14b8a6', 'Turquoise']];
  var PALETTE_TEXTE = ['#111827', '#6b7280', '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#0d9488', '#2563eb', '#7c3aed', '#db2777'];
  var PALETTE_FOND = ['#fef08a', '#bbf7d0', '#bae6fd', '#fbcfe8', '#fed7aa', '#ddd6fe', '#e5e7eb', 'transparent'];
  var POLICES = [['', 'Police par défaut'], ['Geist, system-ui, sans-serif', 'Sans'], ['"EB Garamond", Georgia, serif', 'Serif'], ['"Geist Mono", ui-monospace, monospace', 'Mono'], ['Caveat, "Comic Sans MS", cursive', 'Manuscrite'], ['Fredoka, system-ui, sans-serif', 'Arrondie']];
  var TAILLES = [['0.8em', 'Petite'], ['1em', 'Normale'], ['1.25em', 'Grande'], ['1.6em', 'Très grande'], ['2.1em', 'Énorme']];
  var PAPIERS = [['uni', 'Uni'], ['ligne', 'Ligné'], ['seyes', 'Seyès (grands carreaux)'], ['carreaux', 'Petits carreaux'], ['points', 'Pointillé']];
  var ENCADRES = [['def', 'Définition'], ['prop', 'Propriété'], ['methode', 'Méthode'], ['attention', 'Attention'], ['exemple', 'Exemple']];

  var racine = null, courante = null, contexte = { lecon: null }, timer = null, compact = false, vueEditeur = false;

  function st() { var s = Store.get(); s.notes = s.notes || []; s.carnets = s.carnets && s.carnets.length ? s.carnets : ['Général']; return s; }
  function filtres() { var s = st(); s.notesUi = s.notesUi || { carnet: '*', tri: 'modif', q: '' }; return s.notesUi; }
  function idNote() { return 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function maintenant() { return new Date().toISOString(); }
  function dateCourte(iso) {
    var d = new Date(iso), auj = new Date();
    if (d.toDateString() === auj.toDateString()) return 'aujourd\'hui ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: d.getFullYear() === auj.getFullYear() ? undefined : 'numeric' });
  }

  /* ---------------- Nettoyage HTML (liste blanche) ---------------- */
  var BALISES = { P: 1, DIV: 1, BR: 1, B: 1, STRONG: 1, I: 1, EM: 1, U: 1, S: 1, STRIKE: 1, SUB: 1, SUP: 1, SPAN: 1, FONT: 1, H1: 1, H2: 1, H3: 1, BLOCKQUOTE: 1, PRE: 1, CODE: 1, UL: 1, OL: 1, LI: 1, A: 1, HR: 1, TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TD: 1, TH: 1 };
  var STYLES_OK = ['color', 'background-color', 'font-family', 'font-size', 'text-align', 'text-decoration', 'text-decoration-line', 'font-weight', 'font-style', 'margin-left', 'padding-left'];
  var CLASSES_OK = /^(n-check|fait|n-math|n-bloc|n-box|n-def|n-prop|n-methode|n-attention|n-exemple)$/;
  function nettoyer(html) {
    var doc = new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html');
    var src = doc.body.firstChild;
    (function marcher(el) {
      Array.prototype.slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType === 3) return;
        if (n.nodeType !== 1 || !BALISES[n.tagName]) {
          if (n.nodeType === 1 && !/^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|SVG|MATH|TEMPLATE|LINK|META)$/.test(n.tagName)) {
            marcher(n);
            while (n.firstChild) el.insertBefore(n.firstChild, n);
          }
          el.removeChild(n); return;
        }
        Array.prototype.slice.call(n.attributes).forEach(function (a) {
          var nom = a.name.toLowerCase(), v = a.value;
          if (nom === 'style') {
            var garde = v.split(';').map(function (d) { return d.trim(); }).filter(function (d) {
              var p = d.split(':')[0].trim().toLowerCase();
              return STYLES_OK.indexOf(p) >= 0 && !/url\(|expression|javascript/i.test(d);
            }).join('; ');
            if (garde) n.setAttribute('style', garde); else n.removeAttribute('style');
          } else if (nom === 'class') {
            var c = v.split(/\s+/).filter(function (x) { return CLASSES_OK.test(x); }).join(' ');
            if (c) n.setAttribute('class', c); else n.removeAttribute('class');
          } else if (nom === 'href' && n.tagName === 'A') {
            if (!/^(https?:|mailto:|#\/)/i.test(v.trim())) n.removeAttribute('href');
            else { n.setAttribute('target', '_blank'); n.setAttribute('rel', 'noopener'); }
          } else if (nom === 'data-tex' || nom === 'data-bloc' || nom === 'colspan' || nom === 'rowspan' || (n.tagName === 'FONT' && /^(color|face|size)$/.test(nom))) {
            /* conservé */
          } else if (nom === 'contenteditable' && n.classList.contains('n-math')) {
            n.setAttribute('contenteditable', 'false');
          } else if (nom === 'target' || nom === 'rel') {
            /* géré avec href */
          } else n.removeAttribute(a.name);
        });
        if (n.classList && n.classList.contains('n-math')) { n.innerHTML = ''; n.setAttribute('contenteditable', 'false'); return; }
        marcher(n);
      });
    })(src);
    return src.innerHTML;
  }
  function rendreMaths(el) {
    U.$$('.n-math', el).forEach(function (m) {
      var tex = m.getAttribute('data-tex') || '';
      try { katex.render(tex, m, { throwOnError: false, displayMode: m.getAttribute('data-bloc') === '1' }); }
      catch (e) { m.textContent = tex; }
    });
  }
  function texteBrut(html) { var d = document.createElement('div'); d.innerHTML = html; U.$$('.n-math', d).forEach(function (m) { m.textContent = ' ' + (m.getAttribute('data-tex') || '') + ' '; }); return (d.innerText || d.textContent || '').replace(/\s+\n/g, '\n').trim(); }

  /* ---------------- Montage ---------------- */
  function monter(el, ctx) {
    racine = el; contexte = ctx || contexte;
    if (!Store.connecte()) {
      el.innerHTML = '<div class="notes-vide">' + I('pencil') + '<h3>Tes notes t\'attendent</h3><p class="muted">Crée ton compte gratuit pour prendre des notes pendant les leçons : elles sont enregistrées dans ton espace.</p><a class="btn" href="#/compte">Créer mon compte</a> <a class="btn btn-2" href="#/compte/connexion">Se connecter</a></div>';
      return;
    }
    el.innerHTML = '<div class="notes"><aside class="nl" id="nl"></aside><section class="ne" id="ne"></section></div>';
    /* liste des notes : largeur réglable */
    Redim.activer(U.$('.notes', el), U.$('#nl', el), { nom: 'notes', cote: 'droite', min: 200, max: 480, defaut: 270 });
    var s = st();
    if (!courante || !s.notes.some(function (n) { return n.id === courante; })) {
      var tri = trier(s.notes.slice());
      courante = tri.length ? tri[0].id : null;
    }
    adapter();
    liste();
    editeur();
  }
  function adapter() {
    if (!racine) return;
    compact = racine.clientWidth < 700;
    var n = U.$('.notes', racine); if (!n) return;
    n.classList.toggle('compact', compact);
    n.classList.toggle('voir-editeur', compact && vueEditeur);
  }

  function trier(arr) {
    var f = filtres();
    arr.sort(function (a, b) {
      if (!!b.epingle !== !!a.epingle) return b.epingle ? 1 : -1;
      if (f.tri === 'titre') return (a.titre || '').localeCompare(b.titre || '', 'fr');
      if (f.tri === 'cree') return a.cree < b.cree ? 1 : -1;
      return a.modif < b.modif ? 1 : -1;
    });
    return arr;
  }
  function liste() {
    var s = st(), f = filtres(), q = (f.q || '').toLowerCase();
    var notes = trier(s.notes.filter(function (n) {
      if (f.carnet !== '*' && n.carnet !== f.carnet) return false;
      if (f.carnet === '*' && f.tag && (n.tags || []).indexOf(f.tag) < 0) return false;
      if (!q) return true;
      return ((n.titre || '') + ' ' + texteBrut(n.html) + ' ' + (n.tags || []).join(' ')).toLowerCase().indexOf(q) >= 0;
    }));
    var tags = {}; s.notes.forEach(function (n) { (n.tags || []).forEach(function (t) { tags[t] = 1; }); });
    var nl = U.$('#nl', racine);
    nl.innerHTML =
      '<div class="nl-h"><button type="button" class="btn btn-sm" id="n-new">' + I('pencil') + 'Nouvelle note</button></div>' +
      '<label class="sr" for="n-q">Rechercher</label><input class="input n-q" id="n-q" type="search" placeholder="Rechercher…" value="' + esc(f.q || '') + '">' +
      '<div class="nl-f"><select class="input" id="n-carnet" aria-label="Carnet"><option value="*">Tous les carnets</option>' + s.carnets.map(function (c) { return '<option' + (c === f.carnet ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('') + '<option value="+">+ Nouveau carnet…</option></select>' +
      '<select class="input" id="n-tri" aria-label="Trier"><option value="modif"' + (f.tri === 'modif' ? ' selected' : '') + '>Récentes</option><option value="cree"' + (f.tri === 'cree' ? ' selected' : '') + '>Création</option><option value="titre"' + (f.tri === 'titre' ? ' selected' : '') + '>A → Z</option></select></div>' +
      (Object.keys(tags).length ? '<div class="nl-tags">' + Object.keys(tags).sort().map(function (t) { return '<button type="button" class="n-tag' + (f.tag === t ? ' on' : '') + '" data-tag="' + esc(t) + '">#' + esc(t) + '</button>'; }).join('') + '</div>' : '') +
      '<div class="nl-l">' + (notes.length ? notes.map(function (n) {
        var ex = texteBrut(n.html).slice(0, 90);
        return '<button type="button" class="nl-i' + (n.id === courante ? ' on' : '') + '" data-note="' + n.id + '" style="--nc:' + (n.couleur || 'transparent') + '">' +
          '<span class="nl-t">' + (n.epingle ? I('star', 'nl-pin') : '') + esc(n.titre || 'Sans titre') + '</span>' +
          '<span class="nl-x">' + esc(ex || 'Note vide') + '</span>' +
          '<span class="nl-d">' + esc(dateCourte(n.modif)) + ' · ' + esc(n.carnet || 'Général') + '</span></button>';
      }).join('') : '<p class="small muted nl-vide">' + (s.notes.length ? 'Aucune note ne correspond.' : 'Aucune note pour l\'instant.') + '</p>') + '</div>' +
      '<p class="nl-c small muted">' + s.notes.length + ' note' + (s.notes.length > 1 ? 's' : '') + '</p>' +
      '<button type="button" class="btn btn-ghost btn-sm nl-cahier" id="n-cahier">' + I(Store.estPremium() ? 'download' : 'crown') + 'Tout le cahier en PDF</button>';
    nl.onclick = function (e) {
      if (e.target.closest('#n-new')) { nouvelle(); return; }
      if (e.target.closest('#n-cahier')) { imprimerCahier(); return; }
      var t = e.target.closest('[data-tag]'); if (t) { f.tag = f.tag === t.getAttribute('data-tag') ? null : t.getAttribute('data-tag'); Store.save(); liste(); return; }
      var b = e.target.closest('[data-note]'); if (b) { enregistrer(); courante = b.getAttribute('data-note'); vueEditeur = true; adapter(); liste(); editeur(); }
    };
    U.$('#n-q', nl).oninput = function () { f.q = this.value; var pos = this.selectionStart; liste(); var q2 = U.$('#n-q', racine); q2.focus(); q2.setSelectionRange(pos, pos); };
    U.$('#n-tri', nl).onchange = function () { f.tri = this.value; Store.save(); liste(); };
    U.$('#n-carnet', nl).onchange = function () {
      if (this.value === '+') { var nom = (prompt('Nom du nouveau carnet :') || '').trim().slice(0, 40); if (nom && s.carnets.indexOf(nom) < 0) s.carnets.push(nom); f.carnet = nom || f.carnet; }
      else f.carnet = this.value;
      Store.save(); liste();
    };
  }

  function nouvelle(depuis) {
    enregistrer();
    var s = st(), f = filtres(), L = contexte.lecon ? Vues.lecon_(contexte.lecon) : null;
    var n = depuis || {
      id: idNote(), titre: L ? L.titre : '', html: '', carnet: f.carnet !== '*' ? f.carnet : (L ? niv(L.niveau).long : 'Général'),
      tags: L ? [L.domaine.toLowerCase()] : [], couleur: '', epingle: false, cree: maintenant(), modif: maintenant(), lecon: L ? L.id : null,
      page: { papier: 'uni', police: '', taille: 16, interligne: 1.6, largeur: 'normale' }
    };
    if (n.carnet && s.carnets.indexOf(n.carnet) < 0) s.carnets.push(n.carnet);
    s.notes.push(n); courante = n.id; vueEditeur = true; Store.save();
    adapter(); liste(); editeur();
    var t = U.$('#ne-titre', racine); if (t && !n.titre) t.focus(); else { var z = U.$('#ne-zone', racine); if (z) z.focus(); }
  }
  function note() { var s = st(); for (var i = 0; i < s.notes.length; i++) if (s.notes[i].id === courante) return s.notes[i]; return null; }

  /* ---------------- Éditeur ---------------- */
  function sel(id, opts, titre) { return '<select class="input nt-sel" id="' + id + '" title="' + esc(titre) + '" aria-label="' + esc(titre) + '">' + opts + '</select>'; }
  function btn(cmd, ic, titre, extra) { return '<button type="button" class="nt-b" data-cmd="' + cmd + '" title="' + esc(titre) + '" aria-label="' + esc(titre) + '"' + (extra || '') + '>' + ic + '</button>'; }
  function editeur() {
    var ne = U.$('#ne', racine), n = note();
    if (!n) {
      ne.innerHTML = '<div class="notes-vide">' + I('pencil') + '<h3>Aucune note sélectionnée</h3><p class="muted">Crée ta première note : résumé de cours, formules, exercices ratés…</p><button type="button" class="btn" id="n-new2">Nouvelle note</button></div>';
      U.$('#n-new2', ne).onclick = function () { nouvelle(); };
      return;
    }
    var s = st(), pg = n.page = n.page || { papier: 'uni', police: '', taille: 16, interligne: 1.6, largeur: 'normale' };
    var L = n.lecon ? Vues.lecon_(n.lecon) : null;
    ne.innerHTML =
      '<div class="ne-h">' +
      (compact ? '<button type="button" class="nt-b" id="ne-retour" aria-label="Retour à la liste">' + I('back') + '</button>' : '') +
      '<label class="sr" for="ne-titre">Titre</label><input class="ne-titre" id="ne-titre" value="' + esc(n.titre) + '" placeholder="Titre de la note" maxlength="120">' +
      '<button type="button" class="nt-b' + (n.epingle ? ' on' : '') + '" id="ne-pin" title="Épingler en haut" aria-pressed="' + !!n.epingle + '">' + I('star') + '</button>' +
      '<div class="ne-menu-w"><button type="button" class="nt-b" id="ne-plus" aria-haspopup="true" title="Plus d\'actions">⋯</button><div class="pop" id="ne-pop-plus" hidden>' +
      '<button type="button" data-act="dupliquer">Dupliquer</button><button type="button" data-act="html">Exporter en HTML</button><button type="button" data-act="txt">Exporter en texte</button><button type="button" data-act="imprimer">Imprimer</button><button type="button" data-act="suppr" class="danger">Supprimer la note</button></div></div>' +
      '</div>' +
      '<div class="ne-meta">' +
      '<select class="input" id="ne-carnet" aria-label="Carnet">' + s.carnets.map(function (c) { return '<option' + (c === n.carnet ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('') + '</select>' +
      '<input class="input" id="ne-tags" value="' + esc((n.tags || []).join(', ')) + '" placeholder="étiquettes, séparées par des virgules" aria-label="Étiquettes">' +
      '<div class="ne-coul" role="radiogroup" aria-label="Couleur de la note">' + COULEURS_NOTE.map(function (c) { return '<button type="button" role="radio" class="sw' + (c[0] ? '' : ' sw-none') + '" data-coul="' + c[0] + '" style="--sw:' + (c[0] || 'transparent') + '" aria-checked="' + ((n.couleur || '') === c[0]) + '" title="' + c[1] + '"></button>'; }).join('') + '</div>' +
      (L ? '<a class="chip" href="#/lecon/' + L.id + '">' + I('book') + esc(L.titre) + '</a>' : '') +
      '</div>' +
      '<div class="nt" role="toolbar" aria-label="Mise en forme">' +
      btn('undo', '↶', 'Annuler (Ctrl+Z)') + btn('redo', '↷', 'Rétablir (Ctrl+Y)') + '<span class="nt-sep"></span>' +
      sel('nt-bloc', '<option value="p">Paragraphe</option><option value="h1">Titre 1</option><option value="h2">Titre 2</option><option value="h3">Titre 3</option><option value="blockquote">Citation</option><option value="pre">Code</option>', 'Style de paragraphe') +
      sel('nt-police', POLICES.map(function (p) { return '<option value="' + esc(p[0]) + '">' + p[1] + '</option>'; }).join(''), 'Police') +
      sel('nt-taille', '<option value="">Taille</option>' + TAILLES.map(function (t) { return '<option value="' + t[0] + '">' + t[1] + '</option>'; }).join(''), 'Taille du texte') +
      '<span class="nt-sep"></span>' +
      btn('bold', '<b>G</b>', 'Gras (Ctrl+B)') + btn('italic', '<i>I</i>', 'Italique (Ctrl+I)') + btn('underline', '<u>S</u>', 'Souligné (Ctrl+U)') + btn('strikeThrough', '<s>ab</s>', 'Barré') +
      btn('superscript', 'x²', 'Exposant') + btn('subscript', 'x₂', 'Indice') +
      '<span class="nt-sep"></span>' +
      '<div class="ne-menu-w">' + btn('@couleur', '<span class="nt-a">A<i style="background:#dc2626"></i></span>', 'Couleur du texte', ' aria-haspopup="true"') + '<div class="pop pop-sw" id="pop-couleur" hidden>' + PALETTE_TEXTE.map(function (c) { return '<button type="button" class="sw" data-fore="' + c + '" style="--sw:' + c + '" aria-label="' + c + '"></button>'; }).join('') + '<label class="sw-perso">Autre <input type="color" id="fore-perso" value="#2563eb"></label></div></div>' +
      '<div class="ne-menu-w">' + btn('@surligne', '<span class="nt-hl">ab</span>', 'Surligneur', ' aria-haspopup="true"') + '<div class="pop pop-sw" id="pop-surligne" hidden>' + PALETTE_FOND.map(function (c) { return '<button type="button" class="sw' + (c === 'transparent' ? ' sw-none' : '') + '" data-hilite="' + c + '" style="--sw:' + c + '" aria-label="' + (c === 'transparent' ? 'Aucun' : c) + '"></button>'; }).join('') + '</div></div>' +
      '<span class="nt-sep"></span>' +
      btn('justifyLeft', ic('al'), 'Aligner à gauche') + btn('justifyCenter', ic('ac'), 'Centrer') + btn('justifyRight', ic('ar'), 'Aligner à droite') + btn('justifyFull', ic('aj'), 'Justifier') +
      '<span class="nt-sep"></span>' +
      btn('insertUnorderedList', ic('ul'), 'Liste à puces') + btn('insertOrderedList', ic('ol'), 'Liste numérotée') + btn('@check', ic('ck'), 'Liste de cases à cocher') + btn('outdent', ic('out'), 'Diminuer le retrait') + btn('indent', ic('in'), 'Augmenter le retrait') +
      '<span class="nt-sep"></span>' +
      btn('@math', '<b>∑</b>', 'Insérer une formule') +
      '<div class="ne-menu-w">' + btn('@tableau', ic('tb'), 'Insérer un tableau', ' aria-haspopup="true"') + '<div class="pop" id="pop-tableau" hidden><div class="tb-grille" id="tb-grille"></div><div class="small muted" id="tb-dim">1 × 1</div></div></div>' +
      '<div class="ne-menu-w">' + btn('@encadre', ic('bx'), 'Encadré de cours', ' aria-haspopup="true"') + '<div class="pop" id="pop-encadre" hidden>' + ENCADRES.map(function (e) { return '<button type="button" data-box="' + e[0] + '">' + e[1] + '</button>'; }).join('') + '</div></div>' +
      btn('@lien', ic('ln'), 'Insérer un lien') + btn('insertHorizontalRule', '—', 'Ligne de séparation') +
      btn('removeFormat', ic('cl'), 'Effacer la mise en forme') +
      '<span class="nt-sep"></span>' +
      '<div class="ne-menu-w">' + btn('@page', I('gear'), 'Mise en page de la feuille', ' aria-haspopup="true"') + '<div class="pop pop-page" id="pop-page" hidden>' +
      '<label>Papier<select class="input" data-pg="papier">' + PAPIERS.map(function (p) { return '<option value="' + p[0] + '"' + (pg.papier === p[0] ? ' selected' : '') + '>' + p[1] + '</option>'; }).join('') + '</select></label>' +
      '<label>Police de la note<select class="input" data-pg="police">' + POLICES.map(function (p) { return '<option value="' + esc(p[0]) + '"' + (pg.police === p[0] ? ' selected' : '') + '>' + p[1] + '</option>'; }).join('') + '</select></label>' +
      '<label>Taille du texte : <b id="pg-t">' + pg.taille + ' px</b><input type="range" min="12" max="26" step="1" data-pg="taille" value="' + pg.taille + '"></label>' +
      '<label>Interligne : <b id="pg-i">' + pg.interligne + '</b><input type="range" min="1.1" max="2.4" step="0.1" data-pg="interligne" value="' + pg.interligne + '"></label>' +
      '<label>Largeur<select class="input" data-pg="largeur"><option value="etroite"' + (pg.largeur === 'etroite' ? ' selected' : '') + '>Étroite</option><option value="normale"' + (pg.largeur === 'normale' ? ' selected' : '') + '>Normale</option><option value="large"' + (pg.largeur === 'large' ? ' selected' : '') + '>Pleine largeur</option></select></label>' +
      '<label class="switch"><input type="checkbox" data-pg="marge"' + (pg.marge ? ' checked' : '') + '> Marge rouge (cahier)</label>' +
      '</div></div>' +
      '</div>' +
      '<div class="ne-feuille-w"><div class="ne-feuille" id="ne-feuille"><div class="ne-zone" id="ne-zone" contenteditable="true" spellcheck="true" role="textbox" aria-multiline="true" aria-label="Contenu de la note" data-vide="Écris ta note ici… (formules : bouton ∑)"></div></div></div>' +
      '<div class="ne-pied"><span id="ne-compte"></span><span class="spacer"></span><span id="ne-etat">Enregistré</span></div>';
    var zone = U.$('#ne-zone', ne);
    zone.innerHTML = nettoyer(n.html || '');
    rendreMaths(zone);
    appliquerPage();
    compter();
    try { document.execCommand('styleWithCSS', false, true); document.execCommand('defaultParagraphSeparator', false, 'p'); } catch (e) { /* navigateur ancien */ }
    lierEditeur(ne, zone, n);
  }
  function ic(n) {
    var P = {
      al: '<path d="M4 6h16M4 10h10M4 14h16M4 18h10"/>', ac: '<path d="M4 6h16M7 10h10M4 14h16M7 18h10"/>', ar: '<path d="M4 6h16M10 10h10M4 14h16M10 18h10"/>', aj: '<path d="M4 6h16M4 10h16M4 14h16M4 18h16"/>',
      ul: '<circle cx="5" cy="7" r="1.3"/><circle cx="5" cy="12" r="1.3"/><circle cx="5" cy="17" r="1.3"/><path d="M9 7h11M9 12h11M9 17h11"/>',
      ol: '<path d="M9 7h11M9 12h11M9 17h11M4 5.5l1.5-1v4.5M3.8 14.5c.4-.8 2.4-.9 2.4.3 0 .9-2.4 1.6-2.4 2.7h2.5"/>',
      ck: '<rect x="3" y="4.5" width="5" height="5" rx="1"/><path d="M3.8 7l1.3 1.3L7.5 5.5"/><rect x="3" y="14" width="5" height="5" rx="1"/><path d="M11 7h9M11 16.5h9"/>',
      out: '<path d="M4 6h16M10 10h10M10 14h10M4 18h16M7 10l-3 2 3 2"/>', in: '<path d="M4 6h16M10 10h10M10 14h10M4 18h16M4 10l3 2-3 2"/>',
      tb: '<rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15M15 4.5v15"/>',
      bx: '<rect x="3.5" y="5" width="17" height="14" rx="1.5"/><path d="M7 5v14" stroke-width="3"/><path d="M10.5 10h7M10.5 14h5"/>',
      ln: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
      cl: '<path d="M6 5h12M12 5l-3 14M15 13l5 5M20 13l-5 5"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + P[n] + '</svg>';
  }
  function appliquerPage() {
    var n = note(); if (!n) return;
    var pg = n.page, f = U.$('#ne-feuille', racine);
    f.className = 'ne-feuille papier-' + pg.papier + ' larg-' + pg.largeur + (pg.marge ? ' marge' : '');
    f.style.setProperty('--n-taille', pg.taille + 'px');
    f.style.setProperty('--n-ligne', pg.interligne);
    f.style.fontFamily = pg.police || '';
    var t = U.$('#pg-t', racine), i = U.$('#pg-i', racine);
    if (t) t.textContent = pg.taille + ' px'; if (i) i.textContent = pg.interligne;
  }
  function compter() {
    var n = note(), el = U.$('#ne-compte', racine), z = U.$('#ne-zone', racine); if (!n || !el || !z) return;
    var t = (z.innerText || '').trim(), mots = t ? t.split(/\s+/).length : 0;
    el.textContent = mots + ' mot' + (mots > 1 ? 's' : '') + ' · ' + t.length + ' caractère' + (t.length > 1 ? 's' : '') + ' · modifiée ' + dateCourte(n.modif);
  }
  function enregistrer() {
    clearTimeout(timer);
    var n = note(), z = racine && U.$('#ne-zone', racine);
    if (!n || !z) return;
    var html = nettoyer(z.innerHTML);
    var titre = (U.$('#ne-titre', racine) || {}).value;
    if (html !== n.html || (titre != null && titre !== n.titre)) {
      n.html = html; if (titre != null) n.titre = titre; n.modif = maintenant(); Store.save();
    }
    var e = U.$('#ne-etat', racine); if (e) e.textContent = 'Enregistré';
  }
  function plusTard() {
    var e = U.$('#ne-etat', racine); if (e) e.textContent = 'Modification…';
    clearTimeout(timer); timer = setTimeout(function () { enregistrer(); compter(); majItem(); }, 600);
  }
  function majItem() {
    var n = note(), b = n && U.$('[data-note="' + n.id + '"]', racine);
    if (!b) return;
    b.querySelector('.nl-t').innerHTML = (n.epingle ? I('star', 'nl-pin') : '') + esc(n.titre || 'Sans titre');
    b.querySelector('.nl-x').textContent = texteBrut(n.html).slice(0, 90) || 'Note vide';
    b.querySelector('.nl-d').textContent = dateCourte(n.modif) + ' · ' + (n.carnet || 'Général');
  }

  var selSauvee = null;
  function garderSel() { var s = window.getSelection(); if (s.rangeCount && U.$('#ne-zone', racine).contains(s.anchorNode)) selSauvee = s.getRangeAt(0).cloneRange(); }
  function remettreSel() { var z = U.$('#ne-zone', racine); z.focus(); if (selSauvee) { var s = window.getSelection(); s.removeAllRanges(); s.addRange(selSauvee); } }
  function cmd(c, v) { remettreSel(); document.execCommand(c, false, v == null ? null : v); garderSel(); plusTard(); }
  function insererHTML(h) { remettreSel(); document.execCommand('insertHTML', false, h); garderSel(); plusTard(); }
  function fermerPops(sauf) { U.$$('.pop', racine).forEach(function (p) { if (p !== sauf) p.hidden = true; }); }

  function lierEditeur(ne, zone, n) {
    zone.addEventListener('input', function () { plusTard(); });
    zone.addEventListener('keyup', garderSel);
    zone.addEventListener('mouseup', garderSel);
    zone.addEventListener('blur', function () { garderSel(); enregistrer(); });
    zone.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); enregistrer(); toast('Note enregistrée'); }
      if (e.key === 'Tab') { e.preventDefault(); document.execCommand(e.shiftKey ? 'outdent' : 'indent'); }
    });
    zone.addEventListener('paste', function (e) {
      var d = e.clipboardData; if (!d) return;
      e.preventDefault();
      var h = d.getData('text/html');
      if (h) document.execCommand('insertHTML', false, nettoyer(h));
      else document.execCommand('insertText', false, d.getData('text/plain'));
    });
    zone.addEventListener('click', function (e) {
      var m = e.target.closest('.n-math');
      if (m) { formule(m); return; }
      var li = e.target.closest('.n-check > li');
      if (li && e.offsetX < 26) { li.classList.toggle('fait'); plusTard(); }
    });
    U.$('#ne-titre', ne).oninput = plusTard;
    U.$('#ne-pin', ne).onclick = function () { n.epingle = !n.epingle; this.classList.toggle('on', n.epingle); this.setAttribute('aria-pressed', n.epingle); Store.save(); liste(); };
    var r = U.$('#ne-retour', ne); if (r) r.onclick = function () { enregistrer(); vueEditeur = false; adapter(); liste(); };
    U.$('#ne-carnet', ne).onchange = function () { n.carnet = this.value; n.modif = maintenant(); Store.save(); liste(); };
    U.$('#ne-tags', ne).onchange = function () { n.tags = this.value.split(',').map(function (t) { return t.trim().replace(/^#/, '').toLowerCase(); }).filter(Boolean).slice(0, 12); Store.save(); liste(); };
    U.$('.ne-coul', ne).onclick = function (e) { var b = e.target.closest('[data-coul]'); if (!b) return; n.couleur = b.getAttribute('data-coul'); U.$$('[data-coul]', ne).forEach(function (x) { x.setAttribute('aria-checked', x === b); }); Store.save(); liste(); };
    /* barre d'outils */
    var nt = U.$('.nt', ne);
    nt.addEventListener('mousedown', function (e) { if (e.target.closest('.nt-b, .sw, [data-box], .tb-c')) e.preventDefault(); });
    nt.onclick = function (e) {
      var b = e.target.closest('[data-cmd]');
      if (b) {
        var c = b.getAttribute('data-cmd');
        if (c[0] !== '@') { fermerPops(); cmd(c); return; }
        var pops = { '@couleur': 'pop-couleur', '@surligne': 'pop-surligne', '@tableau': 'pop-tableau', '@encadre': 'pop-encadre', '@page': 'pop-page' };
        if (pops[c]) { garderSel(); var p = U.$('#' + pops[c], ne); fermerPops(p); p.hidden = !p.hidden; if (c === '@tableau') grilleTableau(); return; }
        fermerPops();
        if (c === '@check') { cmd('insertUnorderedList'); var s = window.getSelection(), ul = s.anchorNode && (s.anchorNode.nodeType === 1 ? s.anchorNode : s.anchorNode.parentNode).closest('ul'); if (ul) ul.classList.toggle('n-check'); plusTard(); return; }
        if (c === '@math') { garderSel(); formule(null); return; }
        if (c === '@lien') {
          garderSel();
          var url = prompt('Adresse du lien (https://…) :', 'https://');
          if (url && /^https?:\/\/\S+$/i.test(url.trim())) {
            var txt = selSauvee && selSauvee.toString();
            if (txt) cmd('createLink', url.trim()); else insererHTML('<a href="' + esc(url.trim()) + '">' + esc(url.trim()) + '</a>&nbsp;');
          } else if (url) toast('Adresse invalide : elle doit commencer par https://');
          return;
        }
      }
      var f = e.target.closest('[data-fore]'); if (f) { cmd('foreColor', f.getAttribute('data-fore')); fermerPops(); return; }
      var hl = e.target.closest('[data-hilite]'); if (hl) { cmd('hiliteColor', hl.getAttribute('data-hilite')); fermerPops(); return; }
      var bx = e.target.closest('[data-box]'); if (bx) {
        var k = bx.getAttribute('data-box'), lib = ENCADRES.filter(function (x) { return x[0] === k; })[0][1];
        insererHTML('<div class="n-box n-' + k + '"><p><b>' + lib + '</b></p><p>…</p></div><p></p>'); fermerPops(); return;
      }
      var cell = e.target.closest('.tb-c'); if (cell) {
        var L = +cell.getAttribute('data-l'), C = +cell.getAttribute('data-c'), h = '<table><tbody>';
        for (var i = 0; i < L; i++) { h += '<tr>'; for (var j = 0; j < C; j++) h += i === 0 ? '<th>&nbsp;</th>' : '<td>&nbsp;</td>'; h += '</tr>'; }
        insererHTML(h + '</tbody></table><p></p>'); fermerPops(); return;
      }
    };
    U.$('#fore-perso', ne).onchange = function () { cmd('foreColor', this.value); fermerPops(); };
    U.$('#nt-bloc', ne).onchange = function () { cmd('formatBlock', '<' + this.value + '>'); this.value = 'p'; };
    U.$('#nt-police', ne).onchange = function () { if (this.value) cmd('fontName', this.value); else cmd('removeFormat'); this.selectedIndex = 0; };
    U.$('#nt-taille', ne).onchange = function () {
      var t = this.value; if (!t) return;
      remettreSel(); document.execCommand('fontSize', false, '7');
      U.$$('font[size="7"], span[style*="xxx-large"]', zone).forEach(function (f) {
        var sp = document.createElement('span'); sp.style.fontSize = t; while (f.firstChild) sp.appendChild(f.firstChild); f.parentNode.replaceChild(sp, f);
      });
      this.selectedIndex = 0; garderSel(); plusTard();
    };
    var pop = U.$('#pop-page', ne);
    pop.oninput = pop.onchange = function (e) {
      var k = e.target.getAttribute('data-pg'); if (!k) return;
      n.page[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.type === 'range' ? +e.target.value : e.target.value;
      Store.save(); appliquerPage();
    };
    /* menu ⋯ */
    var plus = U.$('#ne-pop-plus', ne);
    U.$('#ne-plus', ne).onclick = function () { fermerPops(plus); plus.hidden = !plus.hidden; };
    plus.onclick = function (e) {
      var a = e.target.closest('[data-act]'); if (!a) return;
      plus.hidden = true; enregistrer();
      var act = a.getAttribute('data-act');
      if (act === 'dupliquer') { var cp = JSON.parse(JSON.stringify(n)); cp.id = idNote(); cp.titre = (n.titre || 'Sans titre') + ' (copie)'; cp.cree = cp.modif = maintenant(); cp.epingle = false; nouvelle(cp); toast('Note dupliquée'); }
      else if (act === 'html') telecharger((n.titre || 'note') + '.html', exportHTML(n), 'text/html');
      else if (act === 'txt') telecharger((n.titre || 'note') + '.txt', (n.titre ? n.titre + '\n' + '='.repeat(n.titre.length) + '\n\n' : '') + texteBrut(n.html), 'text/plain');
      else if (act === 'imprimer') imprimer(n);
      else if (act === 'suppr') {
        Modal.ouvrir('<h2 id="modal-title">Supprimer « ' + esc(n.titre || 'Sans titre') + ' » ?</h2><p class="muted">La note sera définitivement effacée.</p><div class="btn-row"><button class="btn" type="button" id="m-supn">Supprimer</button><button class="btn btn-2" type="button" data-close autofocus>Annuler</button></div>');
        U.$('#m-supn').onclick = function () { var s = st(); s.notes = s.notes.filter(function (x) { return x.id !== n.id; }); courante = null; vueEditeur = false; Store.save(); Modal.fermer(); monter(racine); toast('Note supprimée'); };
      }
    };
    ne.addEventListener('click', function (e) { if (!e.target.closest('.ne-menu-w')) fermerPops(); });
  }
  function grilleTableau() {
    var g = U.$('#tb-grille', racine), d = U.$('#tb-dim', racine), h = '';
    for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) h += '<button type="button" class="tb-c" data-l="' + i + '" data-c="' + j + '" aria-label="' + i + ' lignes, ' + j + ' colonnes"></button>';
    g.innerHTML = h;
    g.onmouseover = function (e) {
      var c = e.target.closest('.tb-c'); if (!c) return;
      var L = +c.getAttribute('data-l'), C = +c.getAttribute('data-c');
      U.$$('.tb-c', g).forEach(function (x) { x.classList.toggle('on', +x.getAttribute('data-l') <= L && +x.getAttribute('data-c') <= C); });
      d.textContent = L + ' × ' + C;
    };
  }

  /* ---------------- Formules LaTeX ---------------- */
  var RACCOURCIS = [['\\frac{a}{b}', 'a/b'], ['\\sqrt{x}', '√'], ['x^{n}', 'xⁿ'], ['x_{n}', 'xₙ'], ['\\sum_{k=1}^{n}', 'Σ'], ['\\int_{a}^{b} f(x)\\,dx', '∫'], ['\\lim_{x \\to +\\infty}', 'lim'], ['\\vec{u}', 'u⃗'], ['\\pi', 'π'], ['\\infty', '∞'], ['\\leq', '≤'], ['\\geq', '≥'], ['\\neq', '≠'], ['\\approx', '≈'], ['\\in', '∈'], ['\\mathbb{R}', 'ℝ'], ['\\mathbb{N}', 'ℕ'], ['\\Rightarrow', '⇒'], ['\\iff', '⇔'], ['\\forall', '∀'], ['\\exists', '∃'], ['\\alpha', 'α'], ['\\Delta', 'Δ'], ['\\times', '×'], ['\\binom{n}{k}', '(n k)'], ['\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}', 'matrice'], ['\\begin{cases} x + y = 1 \\\\ x - y = 0 \\end{cases}', 'système'], ['\\overline{z}', 'z̄']];
  function formule(existant) {
    var tex = existant ? existant.getAttribute('data-tex') : '', bloc = existant ? existant.getAttribute('data-bloc') === '1' : false;
    Modal.ouvrir('<h2 id="modal-title">' + (existant ? 'Modifier la formule' : 'Insérer une formule') + '</h2>' +
      '<p class="small muted">Écris en LaTeX, comme dans les leçons. Exemple : <code>\\frac{1}{2}x^2 + \\sqrt{3}</code></p>' +
      '<div class="fx-rac">' + RACCOURCIS.map(function (r) { return '<button type="button" class="cb" data-tex="' + esc(r[0]) + '">' + esc(r[1]) + '</button>'; }).join('') + '</div>' +
      '<label class="sr" for="fx-src">Code LaTeX</label><textarea class="input fx-src" id="fx-src" rows="3" spellcheck="false" autofocus>' + esc(tex) + '</textarea>' +
      '<label class="switch" style="margin:10px 0"><input type="checkbox" id="fx-bloc"' + (bloc ? ' checked' : '') + '> Formule centrée sur sa propre ligne</label>' +
      '<div class="fx-apercu" id="fx-apercu" aria-live="polite"></div>' +
      '<div class="btn-row"><button class="btn" type="button" id="fx-ok">' + (existant ? 'Mettre à jour' : 'Insérer') + '</button>' + (existant ? '<button class="btn btn-2" type="button" id="fx-suppr">Supprimer</button>' : '') + '<button class="btn btn-ghost" type="button" data-close>Annuler</button></div>', { large: true });
    var src = U.$('#fx-src'), ap = U.$('#fx-apercu'), cb = U.$('#fx-bloc');
    function maj() { try { katex.render(src.value || '\\text{aperçu}', ap, { throwOnError: true, displayMode: cb.checked }); } catch (e) { ap.innerHTML = '<span class="err">' + esc(e.message.replace('KaTeX parse error: ', '')) + '</span>'; } }
    src.oninput = maj; cb.onchange = maj; maj();
    U.$('.fx-rac').onclick = function (e) {
      var b = e.target.closest('[data-tex]'); if (!b) return;
      var a = src.selectionStart, z = src.selectionEnd; src.value = src.value.slice(0, a) + b.getAttribute('data-tex') + src.value.slice(z); src.focus(); maj();
    };
    U.$('#fx-ok').onclick = function () {
      var t = src.value.trim(); if (!t) { Modal.fermer(); return; }
      if (existant) { existant.setAttribute('data-tex', t); existant.setAttribute('data-bloc', cb.checked ? '1' : '0'); rendreMaths(existant.parentNode); Modal.fermer(); plusTard(); return; }
      Modal.fermer();
      insererHTML('<span class="n-math" contenteditable="false" data-bloc="' + (cb.checked ? 1 : 0) + '" data-tex="' + esc(t) + '"></span>&nbsp;');
      rendreMaths(U.$('#ne-zone', racine));
    };
    var sp = U.$('#fx-suppr'); if (sp) sp.onclick = function () { existant.remove(); Modal.fermer(); plusTard(); };
  }

  /* ---------------- Export & impression ---------------- */
  function exportHTML(n) {
    var d = document.createElement('div'); d.innerHTML = n.html; rendreMaths(d);
    return '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>' + esc(n.titre || 'Note') + '</title>' +
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">' +
      '<style>body{font-family:' + (n.page && n.page.police ? n.page.police : 'Georgia,serif') + ';max-width:760px;margin:40px auto;padding:0 20px;line-height:1.6;color:#111}table{border-collapse:collapse}td,th{border:1px solid #999;padding:6px 10px}.n-box{border:1px solid #ccc;border-left:4px solid #555;padding:8px 14px;margin:12px 0}.n-check{list-style:none}.n-check li.fait{text-decoration:line-through;opacity:.6}</style></head><body>' +
      '<h1>' + esc(n.titre || 'Note') + '</h1>' + d.innerHTML + '<p style="color:#888;font-size:12px;margin-top:40px">Exporté depuis Math Everyday</p></body></html>';
  }
  function telecharger(nom, contenu, type) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([contenu], { type: type + ';charset=utf-8' }));
    a.download = nom.replace(/[\\/:*?"<>|]+/g, '-');
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }
  function imprimer(n) {
    var zone = document.getElementById('impression') || document.body.appendChild(Object.assign(document.createElement('div'), { id: 'impression' }));
    zone.innerHTML = '<h1>' + esc(n.titre || 'Note') + '</h1><div class="ne-zone">' + n.html + '</div>';
    rendreMaths(zone);
    document.body.classList.add('imprime-note');
    window.print();
    setTimeout(function () { document.body.classList.remove('imprime-note'); }, 500);
  }

  /* Cahier complet (abonnés) : toutes les notes rangées par carnet, puis les pages du brouillon.
     La boîte d'impression du navigateur propose « Enregistrer en PDF ». */
  function imprimerCahier() {
    if (!Store.estPremium()) {
      Modal.ouvrir('<h2 id="modal-title">Cahier en ligne + PDF</h2>' + Mascotte.bulle('Avec l\'abonnement, tes notes et ton brouillon te suivent sur tous tes appareils, et tu peux exporter tout ton cahier en un seul PDF.', 'content') + '<div class="btn-row"><a class="btn" href="#/abonnement" data-close>' + I('crown') + 'Voir les offres</a></div>');
      return;
    }
    enregistrer();
    var s = st(), nom = s.profil ? s.profil.nom : '';
    if (!s.notes.length && !(window.Brouillon && Brouillon.imagePage(0))) { toast('Ton cahier est vide pour l\'instant.'); return; }
    var carnets = {};
    s.notes.slice().sort(function (a, b) { return a.cree < b.cree ? -1 : 1; }).forEach(function (n) { (carnets[n.carnet || 'Général'] = carnets[n.carnet || 'Général'] || []).push(n); });
    var html = '<div class="cahier-garde"><h1>Cahier de maths</h1><p>' + esc(nom) + '</p><p>' + s.notes.length + ' note' + (s.notes.length > 1 ? 's' : '') + ' · imprimé le ' + new Date().toLocaleDateString('fr-FR') + '</p></div>';
    Object.keys(carnets).forEach(function (c) {
      html += '<h1 class="cahier-carnet">' + esc(c) + '</h1>' + carnets[c].map(function (n) { return '<section class="cahier-note"><h2>' + esc(n.titre || 'Sans titre') + '</h2><div class="ne-zone">' + n.html + '</div></section>'; }).join('');
    });
    var imgs = [];
    if (window.Brouillon) for (var i = 0; i < Brouillon.nbPages(); i++) { var im = Brouillon.imagePage(i); if (im) imgs.push(im); }
    if (imgs.length) html += '<h1 class="cahier-carnet">Brouillon</h1>' + imgs.map(function (src, k) { return '<section class="cahier-note"><h2>Page ' + (k + 1) + '</h2><img src="' + src + '" alt="Page de brouillon ' + (k + 1) + '" style="max-width:100%"></section>'; }).join('');
    var zone = document.getElementById('impression') || document.body.appendChild(Object.assign(document.createElement('div'), { id: 'impression' }));
    zone.innerHTML = html;
    rendreMaths(zone);
    document.body.classList.add('imprime-note');
    toast('Choisis « Enregistrer en PDF » dans la fenêtre d\'impression.');
    setTimeout(function () { window.print(); setTimeout(function () { document.body.classList.remove('imprime-note'); }, 500); }, 300);
  }

  window.Notes = {
    imprimerCahier: imprimerCahier,
    monter: monter, adapter: function () { var avant = compact; adapter(); if (avant !== compact && racine && U.$('#ne', racine)) editeur(); },
    enregistrer: enregistrer, nouvelleDepuisLecon: function () { nouvelle(); }, contexte: function (c) { contexte = c; }
  };
})();
