if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,f)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let d={};const n=e=>i(e,a),r={module:{uri:a},exports:d,require:n};s[a]=Promise.all(c.map((e=>r[e]||n(e)))).then((e=>(f(...e),d)))}}define(["./workbox-b21a483b"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.1f549f7f.js",revision:"482e04d53d7d77f023cda939262bd70e"},{url:"assets/Index.20f6322e.css",revision:"2dba81ad3d5947eedc3848cef0f68183"},{url:"assets/Index.2fc3ec69.css",revision:"e037fa2014632dd1b5d72d7ea4f41a3e"},{url:"assets/Index.861f55db.js",revision:"5cb77cb68aabbb56d7820d4c0a1ea776"},{url:"assets/Index.89714bd4.js",revision:"d11297e868c23a9e5fdd91e1141c7df6"},{url:"assets/Index.9839db1f.css",revision:"5fa12ad9ac14e1881b1b889fd519c6d2"},{url:"assets/Index.9f379360.css",revision:"ef60fbcea97541e0f2906689270c07ef"},{url:"assets/Index.f32ec965.js",revision:"f29fe17d7fb073682b9f1004eb93bfc1"},{url:"assets/index.fd314f8f.css",revision:"acd95e0a3c241a25794b1b80d9d55983"},{url:"assets/Index.fe1862d5.js",revision:"31682ec68e50742b966f4d336a16d976"},{url:"assets/Input.306d18c8.js",revision:"d7ff5c11c6973f89c30ca6894ce7d7b1"},{url:"assets/Input.e704a682.css",revision:"24a182ba9461d3a2e7b583fbf63d60d5"},{url:"assets/kepler_circles.c8f9457e.png",revision:"04cf5983113f7b66ef2047960f92ca1f"},{url:"assets/KeyLabelPair.17067fdb.js",revision:"254862a8d3d3be2a79eefec6254e0eb3"},{url:"assets/KeyLabelPair.1c5a6dfa.css",revision:"5fda5a9e8fce0ce9b47f739c8845a6e9"},{url:"assets/mail-example-hand.88eedc76.png",revision:"05317f382d792ac1ad793cd864660391"},{url:"assets/spaceship.5ba26bba.png",revision:"e903e4ac8d7692c16587024d2a1c75b3"},{url:"favicon.ico",revision:"b0c5780cfe817bd3a27da0392dbf8f15"},{url:"favicon1.ico",revision:"3f96b9e3148c28fed89dccf5c72fe992"},{url:"favicon2.ico",revision:"9fdad4b57b8262deafe510ce8d40899c"},{url:"favicon4.ico",revision:"7ee7a7fad2a680aaedf004ca67be583f"},{url:"img/icons/icon-120x120.png",revision:"b0641ad55c1bcf493372e344ebab059c"},{url:"img/icons/icon-152x152.png",revision:"2015f89f156e1fae39f4c9ab5f02e3f8"},{url:"img/icons/icon-192x192.png",revision:"8ae5fd354e21e4f56379412b4fb54cc0"},{url:"img/icons/icon-512x512.png",revision:"32218ef1d933d4eea3e1078b04572877"},{url:"img/icons/icon-76x76.png",revision:"d485ddc5a341044e3cc1646b65de7ac4"},{url:"img/icons/logo3.png",revision:"4b88da9395ffa99bf6c424b6fcc80a37"},{url:"index.html",revision:"cc39e59be71634f2b92b5e88468add9d"},{url:"logo.png",revision:"3dce426ca96392a4048b96383df39c2e"},{url:"logo2.png",revision:"e61e860c7491d79eedbf9a6b653008f4"},{url:"logo3.png",revision:"4b88da9395ffa99bf6c424b6fcc80a37"},{url:"logo4.png",revision:"a5a6895ee2bc73569317dd26efe9d995"},{url:"robots.txt",revision:"735ab4f94fbcd57074377afca324c813"},{url:"webpushr-sw.js",revision:"f6f7ff6d6b7b7b652cb92a25eb2cef5b"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=service-worker.js.map
