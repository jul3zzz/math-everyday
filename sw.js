/* Math Everyday — service worker : application installable et lecture hors connexion.
   Pages et fichiers du site : réseau d'abord, copie locale si hors ligne.
   Bibliothèques et polices (cdnjs, Google Fonts) : copie locale d'abord.
   Abonnés : « tout télécharger » range aussi les polices KaTeX, le SDK Firebase et les miniatures
   des vidéos dans un cache à part, conservé d'une version à l'autre. */
var VERSION = 'me-v12';
var HORS_LIGNE = 'me-hors-ligne';
var FICHIERS = [
  '', 'index.html', 'manifest.json', 'favicon.svg', 'icone-192.png', 'icone-512.png', 'icone-masque-512.png',
  'assets/css/base.css', 'assets/css/themes.css', 'assets/css/outils.css', 'assets/css/plus.css', 'assets/css/themes-plus.css', 'assets/css/refonte.css',
  'assets/js/config.js', 'assets/js/core.js', 'assets/js/test.js', 'assets/js/views.js', 'assets/js/progres.js',
  'assets/js/calc-moteur.js', 'assets/js/calculatrice.js', 'assets/js/notes.js', 'assets/js/entrainement.js',
  'assets/js/fiches.js', 'assets/js/brouillon.js', 'assets/js/geometrie.js', 'assets/js/formulaire.js',
  'assets/js/ia.js', 'assets/js/cloud.js', 'assets/js/synchro.js', 'assets/js/social.js',
  'assets/js/calcmental.js', 'assets/js/atelier.js', 'assets/js/premium.js', 'assets/js/outils.js', 'assets/js/installer.js', 'assets/js/verification.js', 'assets/js/app.js',
  'assets/js/data/niveaux.js', 'assets/js/data/placement.js', 'assets/js/data/videos.js', 'assets/js/data/generateurs.js', 'assets/js/data/sujets.js',
  'assets/js/data/lecons-6e.js', 'assets/js/data/lecons-5e.js', 'assets/js/data/lecons-4e.js', 'assets/js/data/lecons-3e.js',
  'assets/js/data/lecons-2nde.js', 'assets/js/data/lecons-1re.js', 'assets/js/data/lecons-tle.js', 'assets/js/data/lecons-mpsi.js'
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
    return Promise.all(cles.filter(function (k) { return k !== VERSION && k !== HORS_LIGNE; }).map(function (k) { return caches.delete(k); }));
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
