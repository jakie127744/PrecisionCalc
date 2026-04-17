const CACHE_NAME = 'precision-calc-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './og-image.png',
  './icon-512.png',
  './js/registry.js',
  './js/app.js',
  './js/tools/mortgage.js',
  './js/tools/compound.js',
  './js/tools/bmi.js',
  './js/tools/kitchen.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
