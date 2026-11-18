// 인터넷이 약할 때도 열리도록: 먼저 네트워크, 안 되면 저장해 둔 것
const C = 'sp27-v3';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'index.html', 'data.bin', 'gal.bin', 'manifest.webmanifest', 'icon-192.png']))); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.hostname.endsWith('tile.openstreetmap.org') || (u.hostname === 'tiles.openfreemap.org' && !u.pathname.startsWith('/styles') && !u.pathname.startsWith('/fonts'))) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
