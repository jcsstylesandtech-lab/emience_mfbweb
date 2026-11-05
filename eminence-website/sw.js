/* Eminence Microfinance Bank: service worker for faster repeat visits and offline support.
   Bump VERSION whenever the site's files change (keep it equal to the ?v= tag in the pages). */
const VERSION = "20261105";
const PREFIX = "eminence-";
const CORE = `${PREFIX}core-${VERSION}`;
const PAGES = `${PREFIX}pages-${VERSION}`;
const IMAGES = `${PREFIX}images`;
const MAX_IMAGES = 60;

const PRECACHE = [
  "./", "index.html", "personal.html", "business.html", "about.html", "services.html", "contact.html",
  "privacy.html", "terms.html", "cookies.html", "offline.html", "404.html",
  `assets/css/styles.css?v=${VERSION}`, `assets/js/main.js?v=${VERSION}`,
  `assets/js/vendor/lenis.min.js?v=${VERSION}`, `assets/js/vendor/lucide.min.js?v=${VERSION}`,
  "assets/img/eminence-logo.png", "assets/img/eminence-icon.webp", "assets/img/eminence-icon-transparent.png",
  "assets/img/preloader-navy.png", "assets/img/preloader-teal.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CORE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  const keep = [CORE, PAGES, IMAGES];
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && !keep.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function trimImages() {
  const cache = await caches.open(IMAGES);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - MAX_IMAGES; i++) await cache.delete(keys[i]);
}

// Pages: always try the network first so visitors see the latest content; fall back to the copy, then the offline page
async function networkFirst(request) {
  const cache = await caches.open(PAGES);
  try {
    const res = await Promise.race([
      fetch(request),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
    ]);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch (_) {
    return (await caches.match(request, { ignoreSearch: true })) || caches.match("offline.html");
  }
}

// Images: serve the saved copy instantly and refresh it in the background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(IMAGES);
  const cached = await cache.match(request);
  const network = fetch(request).then((res) => {
    if (res.ok) cache.put(request, res.clone()).then(trimImages);
    return res;
  }).catch(() => cached);
  return cached || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // leave Google Maps, fonts and app-store links to the browser

  if (request.mode === "navigate") return event.respondWith(networkFirst(request));
  if (request.destination === "image") return event.respondWith(staleWhileRevalidate(request));
  // CSS and JS carry a version tag, so a saved copy is always correct
  event.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((res) => {
    if (res.ok) caches.open(CORE).then((c) => c.put(request, res.clone()));
    return res;
  })));
});
