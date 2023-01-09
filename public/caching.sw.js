const CACHE_VERSION = '1.0.1';
const CURRENT_CACHES = {
    assets: `assets-cache-v${CACHE_VERSION}`,
};

self.addEventListener("activate", (event) => {
    const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
    event.waitUntil(
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
              if (!expectedCacheNamesSet.has(cacheName)) {
                  return caches.delete(cacheName);
              }
          })
        )
      )
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.open(CURRENT_CACHES.assets).then((cache) => {
          return cache
            .match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request.clone()).then((response) => {
                    if (
                      response.status < 400 &&
                      response.headers.has("content-type") &&
                      (response.headers.get("content-type").match(/^font\//i) || response.headers.get("content-type").match(/^image\//i))
                    ) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                });
            })
            .catch((error) => {
                throw error;
            });
      })
    );
});
