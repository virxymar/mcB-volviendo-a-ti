const CACHE_NAME = "mcb-pwa-v3";

const URLS_TO_CACHE = [
  "/mcB-volviendo-a-ti/",
  "/mcB-volviendo-a-ti/index.html",
  "/mcB-volviendo-a-ti/pago.html",
  "/mcB-volviendo-a-ti/app.html",
  "/mcB-volviendo-a-ti/course.html",
  "/mcB-volviendo-a-ti/styles.css",
  "/mcB-volviendo-a-ti/logotipo3d.png",
  "/mcB-volviendo-a-ti/firma.png",
  "/mcB-volviendo-a-ti/icon-192.png",
  "/mcB-volviendo-a-ti/icon-512.png",
  "/mcB-volviendo-a-ti/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/mcB-volviendo-a-ti/app.html");
          }
        })
      );
    })
  );
});
