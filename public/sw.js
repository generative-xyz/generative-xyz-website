const cache = {}
const referrers = {}

async function fetchUrl(url, file) {
  const record = await fetch(url)
  const options = /\.m?js([#?].*)?$/.test(file) ? { headers: { 'content-type': 'text/javascript' } } : undefined
  return new Response(record.body, options);
}

self.addEventListener("fetch", async (event) => {
  try {
    const url = new URL(event.request.referrer);
    const id = url.searchParams.get("id");

    if (id && cache[id] && referrers[id]) {
      if (`${url.origin}${url.pathname}` === referrers[id].base) {
        event.respondWith(async function () {
          const path = event.request.url.replace(referrers[id].root, "");

          if (!cache[id][path]) return null;

          return await fetchUrl(cache[id][path].url, event.request.url)
        }())
      }
    } else {
      const cacheId = Object.keys(cache).pop();
      const moduleName = event.request.url.split('/').pop();

      if (cacheId && moduleName && cache[cacheId][moduleName] && cache[cacheId][moduleName].url && event.request.url) {
        event.respondWith(async function () {
          return await fetchUrl(cache[cacheId][moduleName].url, event.request.url)
        }());
      }
    }
  } catch (e) {
    console.log(e);
  }
})

self.addEventListener("message", async (event) => {
  if (event?.data?.type === "REGISTER_REFERRER") {
    referrers[event.data.data.id] = event.data.data.referrer
  }

  if (event?.data?.type === "REGISTER_URLS") {
    const data = event.data.data
    cache[data.id] = data.record
  }

  if (event?.data?.type === "REGISTER_HTML") {
    const data = event.data.data
    cache[data.id] = data.html;
  }

  if (event?.data?.type === "GET_INDEX") {
    const id = event.data.data

    if (cache[id] && cache[id]["index.html"]) {
      const html = await cache[id]["index.html"].blob.text()
      event.source.postMessage({
        type: "INDEX_HTML_CONTENTS",
        data: html
      })
    }
  }

  if (event?.data?.type === "GET_RAW_HTML") {
    const id = event.data.data

    if (cache[id]) {
      const html = await cache[id];
      event.source.postMessage({
        type: "INDEX_HTML_CONTENTS",
        data: html
      })
    }
  }
})

const CACHE_VERSION = 1;
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
