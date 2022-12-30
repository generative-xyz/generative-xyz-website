const cache = {}
const referrers = {}

async function fetchUrl(url, file) {
  const record = await fetch(url)
  const options = /\.m?js([#?].*)?$/.test(file) ? { headers: { 'content-type': 'text/javascript' } } : undefined
  return new Response(record.body, options);
}

self.addEventListener("install", (event) => {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});

self.addEventListener("fetch", async (event) => {
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

    if (cacheId && moduleName && cache[cacheId][moduleName]) {
      event.respondWith(async function () {
        return await fetchUrl(cache[cacheId][moduleName].url, event.request.url)
      }());
    }
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

    if (cache[id]) {
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
