self.addEventListener("install", e => {
    console.log("Installed");
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./icons/fav.ico"]);
        })
    );

});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );

});