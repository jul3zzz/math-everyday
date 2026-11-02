/* Math Everyday — service worker : application installable et lecture hors connexion.
   Pages et fichiers du site : réseau d'abord, copie locale si hors ligne.
   Bibliothèques et polices (cdnjs, Google Fonts) : copie locale d'abord.
   Abonnés : « tout télécharger » range aussi les polices KaTeX, le SDK Firebase et les miniatures
   des vidéos dans un cache à part, conservé d'une version à l'autre.
   Rappels : clic sur une notification → ouvre l'appli ; en arrière-plan (Android), la synchronisation
   périodique « rappel » lit l'état écrit par rappels.js dans le cache me-rappel. */
var VERSION = 'me-v15';
var HORS_LIGNE = 'me-hors-ligne';
var RAPPEL = 'me-rappel';
var FICHIERS = [
  '', 'index.html', 'manifest.json', 'favicon.svg', 'icone-192.png', 'icone-512.png', 'icone-masque-512.png',
  'assets/css/base.css', 'assets/css/themes.css', 'assets/css/outils.css', 'assets/css/plus.css', 'assets/css/themes-plus.css', 'assets/css/refonte.css', 'assets/css/epreuves.css',
  'assets/js/config.js', 'assets/js/core.js', 'assets/js/test.js', 'assets/js/views.js', 'assets/js/progres.js',
  'assets/js/calc-moteur.js', 'assets/js/calculatrice.js', 'assets/js/notes.js', 'assets/js/entrainement.js',
  'assets/js/fiches.js', 'assets/js/brouillon.js', 'assets/js/geometrie.js', 'assets/js/formulaire.js',
  'assets/js/ia.js', 'assets/js/cloud.js', 'assets/js/synchro.js', 'assets/js/social.js',
  'assets/js/calcmental.js', 'assets/js/atelier.js', 'assets/js/premium.js', 'assets/js/outils.js', 'assets/js/installer.js', 'assets/js/rappels.js', 'assets/js/verification.js', 'assets/js/epreuves.js', 'assets/js/app.js',
  'assets/js/data/niveaux.js', 'assets/js/data/placement.js', 'assets/js/data/videos.js', 'assets/js/data/generateurs.js', 'assets/js/data/sujets.js',
  'assets/js/data/lecons-6e.js', 'assets/js/data/lecons-5e.js', 'assets/js/data/lecons-4e.js', 'assets/js/data/lecons-3e.js',
  'assets/js/data/lecons-2nde.js', 'assets/js/data/lecons-1re.js', 'assets/js/data/lecons-tle.js', 'assets/js/data/lecons-mpsi.js', 'assets/js/data/lecons-nouvelles.js',
  'assets/js/data/problemes-6e.js', 'assets/js/data/problemes-5e.js', 'assets/js/data/problemes-4e.js', 'assets/js/data/problemes-3e.js', 'assets/js/data/problemes-2nde.js', 'assets/js/data/problemes-1re.js', 'assets/js/data/problemes-tle.js', 'assets/js/data/problemes-mpsi.js'
];
var CDN = [
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js'
];

self.addEventListener('install', function (e) {
  var base = self.registration.scope;
  e.waitUntil(caches.open(VERSION).then(function (c) {
    return c.addAll(FICHIERS.map(function (f) { return base + f; })).then(function () {
      return Promise.all(CDN.map(function (u) { return c.add(new Request(u, { mode: 'cors' })).catch(function () { /* facultatif */ }); }));
    });
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (cles) {
    return Promise.all(cles.filter(function (k) { return k !== VERSION && k !== HORS_LIGNE && k !== RAPPEL; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

/* « Tout télécharger » (abonnés) : la page envoie la liste des adresses à garder. */
self.addEventListener('message', function (e) {
  var d = e.data || {}, port = e.ports && e.ports[0];
  if (d.type !== 'tout' || !Array.isArray(d.urls)) return;
  e.waitUntil(caches.open(HORS_LIGNE).then(function (c) {
    return Promise.all(d.urls.map(function (u) {
      if (!/^https:\/\/(cdnjs\.cloudflare\.com|i\.ytimg\.com|www\.gstatic\.com)\//.test(u)) return 0;
      return fetch(new Request(u, { mode: /ytimg/.test(u) ? 'no-cors' : 'cors' })).then(function (r) {
        return r.ok || r.type === 'opaque' ? c.put(u, r).then(function () { return 1; }) : 0;
      }).catch(function () { return 0; });
    }));
  }).then(function (res) {
    var ok = res.reduce(function (a, b) { return a + b; }, 0);
    if (port) port.postMessage({ ok: ok, ko: d.urls.length - ok });
  }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (/youtube|googlevideo/.test(url.hostname) || /\.mp4$/.test(url.pathname)) return;
  var externe = url.origin !== self.location.origin;
  if (externe && /i\.ytimg\.com|www\.gstatic\.com/.test(url.hostname)) {
    /* miniatures et SDK : copie téléchargée si elle existe, sinon réseau sans rien garder */
    e.respondWith(caches.match(req, { ignoreVary: true }).then(function (r) { return r || fetch(req); }));
    return;
  }
  if (externe && !/cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(url.hostname)) return;
  if (externe) {
    /* bibliothèques et polices : cache d'abord */
    e.respondWith(caches.match(req).then(function (r) {
      return r || fetch(req).then(function (rep) {
        var copie = rep.clone(); caches.open(VERSION).then(function (c) { c.put(req, copie); }); return rep;
      });
    }));
    return;
  }
  /* fichiers du site : réseau d'abord, cache en secours */
  e.respondWith(fetch(req).then(function (rep) {
    if (rep && rep.ok) { var copie = rep.clone(); caches.open(VERSION).then(function (c) { c.put(req, copie); }); }
    return rep;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: true }).then(function (r) {
      return r || (req.mode === 'navigate' ? caches.match(self.registration.scope + 'index.html') : undefined);
    });
  }));
});

/* Clic sur un rappel : on revient dans l'appli déjà ouverte, sinon on l'ouvre sur la page du jour. */
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var cible = self.registration.scope + ((e.notification.data && e.notification.data.url) || '#/aujourdhui');
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (fen) {
    for (var i = 0; i < fen.length; i++) if (fen[i].url.indexOf(self.registration.scope) === 0 && 'focus' in fen[i]) { fen[i].navigate(cible).catch(function () {}); return fen[i].focus(); }
    return self.clients.openWindow(cible);
  }));
});

/* Rappel en arrière-plan (Android, appli installée) : une fois par jour, après l'heure choisie, si la leçon n'est pas faite. */
self.addEventListener('periodicsync', function (e) {
  if (e.tag !== 'rappel') return;
  e.waitUntil(caches.open(RAPPEL).then(function (c) {
    return c.match('etat').then(function (r) { return r ? r.json() : null; }).then(function (s) {
      var n = new Date(), jour = n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
      if (!s || !s.actif || s.fait === jour || s.dernier === jour) return;
      var h = String(s.heure || '17:30').split(':');
      if (n.getHours() * 60 + n.getMinutes() < (+h[0]) * 60 + (+h[1] || 0)) return;
      s.dernier = jour;
      return c.put('etat', new Response(JSON.stringify(s), { headers: { 'Content-Type': 'application/json' } })).then(function () {
        return self.registration.showNotification('Ta leçon du jour t\'attend', {
          body: (s.prenom ? s.prenom + ', tes' : 'Tes') + ' 3 leçons sont prêtes : 30 minutes et c\'est bouclé.',
          icon: 'icone-192.png', badge: 'icone-192.png', tag: 'rappel', data: { url: '#/aujourdhui' }
        });
      });
    });
  }));
});
