const CACHE_NAME = "quiz-app-v1";

const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/quiz.html",
    "/css/index_style.css",
    "/css/quiz_style.css",
    "/js/app.js",
    "/js/darkMode.js",
    "/js/index.js",
    "/js/quiz.js",
    "/js/utils.js",
    "/manifest.json"
];

// Install - Precache important files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
});

// Fetch - Load from cache, then the internet
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});

// Delete old cache if PWA is updated
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
});