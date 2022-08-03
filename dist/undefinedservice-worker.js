/** @format */

if (!self.define) {
   let e,
      i = {};
   const c = (c, s) => (
      (c = new URL(c + ".js", s).href),
      i[c] ||
         new Promise((i) => {
            if ("document" in self) {
               const e = document.createElement("script");
               (e.src = c), (e.onload = i), document.head.appendChild(e);
            } else (e = c), importScripts(c), i();
         }).then(() => {
            let e = i[c];
            if (!e) throw new Error(`Module ${c} didn’t register its module`);
            return e;
         })
   );
   self.define = (s, a) => {
      const n = e || ("document" in self ? document.currentScript.src : "") || location.href;
      if (i[n]) return;
      let d = {};
      const o = (e) => c(e, n),
         r = { module: { uri: n }, exports: d, require: o };
      i[n] = Promise.all(s.map((e) => r[e] || o(e))).then((e) => (a(...e), d));
   };
}
define(["./workbox-b21a483b"], function (e) {
   "use strict";
   self.addEventListener("message", (e) => {
      e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
   }),
      e.precacheAndRoute(
         [
            { url: "assets/Index.047f3a99.js", revision: "d46eb21e647bfffc032a900b11a260d0" },
            { url: "assets/Index.08c0b663.js", revision: "1b91d2b9f267d63379686789e6896d0b" },
            { url: "assets/Index.13f6c936.css", revision: "8723e1b506dbe76a5f46b222cfa8c13d" },
            { url: "assets/Index.15d3ecb9.css", revision: "83b832d6a0b18bd6c75f37cc823c2d89" },
            { url: "assets/Index.3e70ddd3.css", revision: "0c2ba474b326e07e58956bd62e8d66c0" },
            { url: "assets/index.6ed0954b.css", revision: "d3d4e407947a0e9f2db3bdc9a428fd0e" },
            { url: "assets/Index.9bec5d90.css", revision: "62767b7cbaf8036f744ca3cf9d25e26e" },
            { url: "assets/Index.b03c0e76.js", revision: "a5952e9ee2d87cc7409fe61fb9ba6d69" },
            { url: "assets/Index.e36a0f18.js", revision: "4ebfc2dd057645f6f8f11c8a52b9fe93" },
            { url: "assets/index.fb1180db.js", revision: "a70c707eb18c464e0aa1cce53a3f2c7b" },
            { url: "assets/Input.e32d164d.js", revision: "d21ebb2732a4c94f8b6902bc220257c4" },
            { url: "assets/Input.eb86a833.css", revision: "5d04b8e1d01d9ea1f44ece5d1a9583c0" },
            { url: "assets/kepler_circles.c8f9457e.png", revision: "04cf5983113f7b66ef2047960f92ca1f" },
            { url: "assets/mail-example-hand.88eedc76.png", revision: "05317f382d792ac1ad793cd864660391" },
            { url: "assets/spaceship.5ba26bba.png", revision: "e903e4ac8d7692c16587024d2a1c75b3" },
            { url: "favicon.ico", revision: "b0c5780cfe817bd3a27da0392dbf8f15" },
            { url: "favicon1.ico", revision: "3f96b9e3148c28fed89dccf5c72fe992" },
            { url: "favicon2.ico", revision: "9fdad4b57b8262deafe510ce8d40899c" },
            { url: "favicon4.ico", revision: "7ee7a7fad2a680aaedf004ca67be583f" },
            { url: "img/icons/android-chrome-192x192.png", revision: "f130a0b70e386170cf6f011c0ca8c4f4" },
            { url: "img/icons/android-chrome-512x512.png", revision: "0ff1bc4d14e5c9abcacba7c600d97814" },
            { url: "img/icons/android-chrome-maskable-192x192.png", revision: "845a39478d0e2d4d5d32a092de2de250" },
            { url: "img/icons/android-chrome-maskable-512x512.png", revision: "2695f5feb66cdb0c6f09d0e415824cf9" },
            { url: "img/icons/apple-touch-icon-120x120.png", revision: "936d6e411cabd71f0e627011c3f18fe2" },
            { url: "img/icons/apple-touch-icon-152x152.png", revision: "1a034e64d80905128113e5272a5ab95e" },
            { url: "img/icons/apple-touch-icon-180x180.png", revision: "c43cd371a49ee4ca17ab3a60e72bdd51" },
            { url: "img/icons/apple-touch-icon-60x60.png", revision: "9a2b5c0f19de617685b7b5b42464e7db" },
            { url: "img/icons/apple-touch-icon-76x76.png", revision: "af28d69d59284dd202aa55e57227b11b" },
            { url: "img/icons/apple-touch-icon.png", revision: "66830ea6be8e7e94fb55df9f7b778f2e" },
            { url: "img/icons/favicon-16x16.png", revision: "4bb1a55479d61843b89a2fdafa7849b3" },
            { url: "img/icons/favicon-32x32.png", revision: "98b614336d9a12cb3f7bedb001da6fca" },
            { url: "img/icons/msapplication-icon-144x144.png", revision: "b89032a4a5a1879f30ba05a13947f26f" },
            { url: "img/icons/mstile-150x150.png", revision: "058a3335d15a3eb84e7ae3707ba09620" },
            { url: "img/icons/safari-pinned-tab.svg", revision: "4e857233cbd3bb2d2db4f78bed62a52f" },
            { url: "index.html", revision: "2262ee27664d17596b6d05bd5851579a" },
            { url: "logo.png", revision: "3dce426ca96392a4048b96383df39c2e" },
            { url: "logo2.png", revision: "e61e860c7491d79eedbf9a6b653008f4" },
            { url: "logo3.png", revision: "4b88da9395ffa99bf6c424b6fcc80a37" },
            { url: "logo4.png", revision: "a5a6895ee2bc73569317dd26efe9d995" },
            { url: "robots.txt", revision: "b6216d61c03e6ce0c9aea6ca7808f7ca" },
         ],
         { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
      );
});
//# sourceMappingURL=service-worker.js.map
