// PullSheet Service Worker v3
const CACHE = 'pullsheet-v3';
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
  // only when offline. This is what actually keeps things fresh after a
  // redeploy — cache-first would keep serving whatever snapshot was
  // captured the first time this service worker installed, forever,
  // regardless of what you later upload to GitHub.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
