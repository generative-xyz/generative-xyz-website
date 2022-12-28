var CACHE_DYNAMIC_NAME = 'supper-cache';

self.addEventListener('fetch', function(event) {

  if (event.request.destination === 'image' || event.request.destination === 'video') {
    event.respondWith(caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                });
            })
            .catch(function(err) {
              console.log('___sw', err);
            });
        }
      }));
  }

});