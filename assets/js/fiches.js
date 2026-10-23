/* Math Everyday — fiches résumé : une page par leçon (points clés, définitions, propriétés,
   méthodes, pièges, un exemple), à imprimer ou enregistrer en PDF. Expose window.Fiches. */
(function () {
  'use strict';
  var esc = U.esc;
  function page(inner, narrow) { return '<section class="page"><div class="wrap' + (narrow ? ' wrap-narrow' : '') + '">' + inner + '</div></section>'; }
  function accessible(l) { var a = Jour.acces(l.id); return a === true; }

  /* Construit le contenu d'une fiche à partir du cours. */
  function contenu(l) {
    var d = document.createElement('div');
    d.innerHTML = l.cours;
    var blocs = U.$$('.def, .prop, .methode, .attention', d).map(function (b) { return b.outerHTML; }).join('');
    var ex = U.$('.ex-box', d);
    return '<article class="fiche">' +
      '<header class="fiche-h"><span class="logo logo-sm">' + LOGO + '</span><span>Math Everyday · ' + esc(niv(l.niveau).long) + ' · ' + esc(l.domaine) + '</span></header>' +
      '<h2>' + esc(l.titre) + '</h2><p class="fiche-r">' + esc(l.resume) + '</p>' +
      (l.retenir && l.retenir.length ? '<div class="fiche-ret"><b>L\'essentiel</b><ul>' + l.retenir.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>' : '') +
      '<div class="fiche-blocs cours">' + blocs + '</div>' +
      (ex ? '<div class="cours">' + ex.outerHTML + '</div>' : '') +
      '<footer class="fiche-f">Leçon ' + l.ordre + ' · fiche de révision · math-everyday</footer></article>';
  }

  function vListe(main, nid) {
    var s = Store.get();
    if (!s.profil) { location.hash = '#/compte'; return; }
    nid = niv(nid) ? nid : (s.niveau || '6e');
    var tabs = NIVEAUX.map(function (n) { return '<a class="tab" role="tab" href="#/fiches/' + n.id + '" aria-selected="' + (n.id === nid) + '" style="text-decoration:none">' + n.nom + '</a>'; }).join('');
    var L = LECONS.filter(function (l) { return l.niveau === nid; });
    var dispo = L.filter(accessible);
    main.innerHTML = page('<span class="eyebrow">Fiches résumé</span><h1>Une page par leçon</h1>' +
      '<p class="muted">L\'essentiel, les définitions, propriétés, méthodes et pièges, plus un exemple. Imprime-les ou choisis « Enregistrer en PDF » dans la fenêtre d\'impression.' + (Store.estPremium() ? '' : ' En formule gratuite, les fiches des leçons que tu as déjà ouvertes sont disponibles.') + '</p>' +
      '<div class="tabs" role="tablist">' + tabs + '</div>' +
      '<div class="btn-row" style="margin-bottom:16px"><button class="btn" type="button" id="fi-tout"' + (dispo.length ? '' : ' disabled') + '>' + I('book') + 'Imprimer les ' + dispo.length + ' fiche' + (dispo.length > 1 ? 's' : '') + ' disponibles</button></div>' +
      '<div class="prog-list">' + L.map(function (l) {
        var ok = accessible(l);
        return '<a class="pl" href="' + (ok ? '#/fiche/' + l.id : '#/abonnement') + '"><span class="pl-n">' + l.ordre + '</span><span class="pl-t"><b>' + esc(l.titre) + '</b><span>' + (ok ? 'Fiche disponible' : 'Abonnés ou leçon à débloquer') + '</span></span>' + I(ok ? 'arrow' : 'lock') + '</a>';
      }).join('') + '</div>');
    U.$('#fi-tout', main).onclick = function () { imprimer(dispo); };
  }
  function vFiche(main, id) {
    var l = Vues.lecon_(id);
    if (!l) { location.hash = '#/fiches'; return; }
    if (!accessible(l)) { location.hash = '#/lecon/' + id; return; }
    main.innerHTML = page('<div class="btn-row no-print" style="margin-bottom:16px"><a class="btn btn-ghost btn-sm" href="#/fiches/' + l.niveau + '">← Toutes les fiches</a><span class="spacer"></span><button class="btn btn-sm" type="button" id="fi-print">' + I('book') + 'Imprimer / PDF</button><a class="btn btn-2 btn-sm" href="#/lecon/' + l.id + '">Voir la leçon</a></div>' + contenu(l), true);
    U.math(main);
    U.$('#fi-print', main).onclick = function () { imprimer([l]); };
  }
  function imprimer(liste) {
    if (!liste.length) return;
    var zone = document.getElementById('impression') || document.body.appendChild(Object.assign(document.createElement('div'), { id: 'impression' }));
    zone.innerHTML = liste.map(contenu).join('');
    U.math(zone);
    document.body.classList.add('imprime-note');
    setTimeout(function () { window.print(); setTimeout(function () { document.body.classList.remove('imprime-note'); }, 500); }, 150);
  }
  window.Fiches = { liste: vListe, fiche: vFiche, imprimer: imprimer };
})();
