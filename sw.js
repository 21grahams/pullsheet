// PullSheet Service Worker v4
const CACHE = 'pullsheet-v4';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('script.google.com')) {
    // Apps Script API calls: always network, never cached
    e.respondWith(fetch(e.request).catch(() => new Response('{"error":"offline"}')));
    return;
  }
  // App shell + static assets: network-first, falling back to the cache
  // only when offline. Only attempt to store real http(s) GET requests —
  // things like browser-extension-injected requests (chrome-extension://)
  // can't be stored in the Cache API and throw if we try.
  const isCacheable = e.request.method === 'GET' && e.request.url.startsWith('http');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (isCacheable) {
          const resClone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, resClone)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
