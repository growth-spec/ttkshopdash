/**
 * Service Worker — TikTok Shop Dashboard PWA (Next.js).
 *
 * Estratégia:
 * - /api/*          → sempre da rede (network-only)
 * - HTML (rotas)    → network-first com fallback para cache (oferece offline)
 * - estáticos       → cache-first com revalidação em background
 *
 * IMPORTANTE: ao alterar arquivos, incremente CACHE_VERSION para forçar atualização.
 */

const CACHE_VERSION = 'v2';
const CACHE_NAME = `tiktok-shop-${CACHE_VERSION}`;

const PRECACHE = [
  '/',
  '/data',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/style.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names
          .filter(n => n.startsWith('tiktok-shop-') && n !== CACHE_NAME)
          .map(n => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  // API e dados — sempre da rede (sem cache)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => new Response(JSON.stringify({}), {
        headers: { 'Content-Type': 'application/json' }
      }))
    );
    return;
  }

  // Navegação HTML — network-first
  const isNavigation = request.mode === 'navigate' ||
                       (request.headers.get('accept') || '').includes('text/html');
  if (isNavigation) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then(c => c || caches.match('/')))
    );
    return;
  }

  // Estáticos — cache-first
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        // Stale-while-revalidate
        fetch(request).then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(c => c.put(request, response));
          }
        }).catch(() => {});
        return cached;
      }
      return fetch(request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
        }
        return response;
      }).catch(() => new Response('', { status: 504 }));
    })
  );
});
