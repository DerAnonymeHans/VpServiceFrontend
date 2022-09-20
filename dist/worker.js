/** @format */

console.log("Service worker loaded");
const CACHE_NAME = "kepleraner-cache-v1";
const API_URL = "https://vp-service-api.herokuapp.com";

self.addEventListener("push", (e) => {
   const data = e.data.json();
   console.log("SW: received push");
   fetch(API_URL + "/User/ConfirmPush", { method: "POST", body: JSON.stringify(data.data) });
   console.log("SW:", data);
   self.registration.showNotification(data.title, data);
});

self.addEventListener("install", (e) => {
   e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         console.log("Start caching");
         cache.addAll().then(() => self.skipWaiting());
      })
   );
});

self.addEventListener("activate", (e) => {
   e.waitUntil(
      caches.keys().then((cacheNames) => {
         return Promise.all(
            cacheNames.map((cache) => {
               if (cache !== CACHE_NAME) {
                  console.log("SW: Clear old Cache");
                  return caches.delete(cache);
               }
            })
         );
      })
   );
});

self.addEventListener("fetch", (e) => {
   console.log("SW: Responsing fetch");
   e.respondWith(
      fetch(e.request)
         .then((res) => {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => {
               cache.put(e.request, resClone);
            });
            return res;
         })
         .catch((err) => caches.match(e.request).then((res) => res))
   );
});
