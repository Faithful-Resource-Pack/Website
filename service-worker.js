self.Faithful = {
  version: 1.00,
  cache: false
    /*
       This is here so you can disable caching while in a dev environment for the site.
       It is currently disabled alltogether, as caching the whole site for every page
       navigation will take up a lot of space on the user's device. In the case of the
       Faithful site, I think it's because there are a lot of images.
       - Offroaders123
    */
}
self.addEventListener("activate",event => {
  event.waitUntil(caches.keys().then(versions => Promise.all(versions.map(cache => {
    if (cache !== Faithful.version) return caches.delete(cache);
  }))));
  event.waitUntil(clients.claim());
});
self.addEventListener("fetch",event => {
  event.respondWith(caches.match(event.request).then(response => {
    return response || fetch(event.request).then(async response => {
      if (Faithful.cache) caches.open(Faithful.version).then(cache => cache.put(event.request,response));
      return response.clone();
    });
  }));
});