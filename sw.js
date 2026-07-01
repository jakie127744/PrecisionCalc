const CACHE_NAME = 'precision-calc-v3';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './og-image.jpg',
  './icon-512.png',
  './js/registry.js',
  './js/app.js',
  './js/tools/mortgage.js',
  './js/tools/compound.js',
  './js/tools/bmi.js',
  './js/tools/kitchen.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for page navigations (HTML), so deploys show up immediately.
// Cache-first for everything else (CSS/JS/images), for speed and offline support.
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
