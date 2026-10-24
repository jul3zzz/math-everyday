/* Math Everyday — service worker : application installable et lecture hors connexion.
   Pages et fichiers du site : réseau d'abord, copie locale si hors ligne.
   Bibliothèques et polices (cdnjs, Google Fonts) : copie locale d'abord. */
var VERSION = 'me-v4';
var FICHIERS = [
  '', 'index.html', 'manifest.json', 'favicon.svg', 'icone-192.png', 'icone-512.png', 'icone-masque-512.png',
  'assets/css/base.css', 'assets/css/themes.css', 'assets/css/outils.css', 'assets/css/plus.css',
  'assets/js/config.js', 'assets/js/core.js', 'assets/js/test.js', 'assets/js/views.js', 'assets/js/progres.js',
  'assets/js/calc-moteur.js', 'assets/js/calculatrice.js', 'assets/js/notes.js', 'assets/js/entrainement.js',
  'assets/js/fiches.js', 'assets/js/brouillon.js', 'assets/js/geometrie.js', 'assets/js/formulaire.js',
  'assets/js/ia.js', 'assets/js/cloud.js', 'assets/js/synchro.js', 'assets/js/social.js', 'assets/js/outils.js', 'assets/js/app.js',
  'assets/js/data/niveaux.js', 'assets/js/data/placement.js', 'assets/js/data/videos.js', 'assets/js/data/generateurs.js',
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
    return Promise.all(cles.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (/youtube|ytimg|googlevideo/.test(url.hostname)) return;
  var externe = url.origin !== self.location.origin;
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
