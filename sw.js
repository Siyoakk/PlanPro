// sw.js – Einfacher Cache für statische Dateien
const CACHE_NAME = "siyoplan-v1";
const urlsToCache = [
  "/PlanPro/",
  "/PlanPro/index.html",
  "/PlanPro/manifest.json",
  "/PlanPro/icons/icon-192.png",
  "/PlanPro/icons/icon-512.png"
  // Fügen Sie hier weitere statische Dateien hinzu, falls vorhanden (z. B. externe Fonts oder lokale Bilder)
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Falls im Cache gefunden: zurückgeben, sonst Netzwerk
      return response || fetch(event.request).catch(() => {
        // Optional: Offline-Fallback-Seite anzeigen
        if (event.request.destination === "document") {
          return caches.match("/PlanPro/offline.html");
        }
        return null;
      });
    })
  );
});