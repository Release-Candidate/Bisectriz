const t="Bisectriz-0.1.0-1717767103512",o=[{"revision":null,"url":"404.html"},{"revision":null,"url":"apple-touch-icon.png"},{"revision":null,"url":"browserconfig.xml"},{"revision":null,"url":"DejaVuSans-Bold.ttf"},{"revision":null,"url":"DejaVuSans-BoldOblique.ttf"},{"revision":null,"url":"DejaVuSans-Oblique.ttf"},{"revision":null,"url":"DejaVuSans.ttf"},{"revision":null,"url":"favicon-16x16.png"},{"revision":null,"url":"favicon-32x32.png"},{"revision":null,"url":"favicon.ico"},{"revision":null,"url":"favicon.svg"},{"revision":null,"url":"icons/icon-192.png"},{"revision":null,"url":"icons/icon-512.png"},{"revision":null,"url":"icons/icon.svg"},{"revision":null,"url":"icons/maskable_128.png"},{"revision":null,"url":"icons/maskable_144.png"},{"revision":null,"url":"icons/maskable_16.png"},{"revision":null,"url":"icons/maskable_192.png"},{"revision":null,"url":"icons/maskable_256.png"},{"revision":null,"url":"icons/maskable_32.png"},{"revision":null,"url":"icons/maskable_48.png"},{"revision":null,"url":"icons/maskable_512.png"},{"revision":null,"url":"icons/maskable_72.png"},{"revision":null,"url":"icons/maskable_96.png"},{"revision":null,"url":"icons/transparent_128.png"},{"revision":null,"url":"icons/transparent_144.png"},{"revision":null,"url":"icons/transparent_16.png"},{"revision":null,"url":"icons/transparent_192.png"},{"revision":null,"url":"icons/transparent_256.png"},{"revision":null,"url":"icons/transparent_32.png"},{"revision":null,"url":"icons/transparent_48.png"},{"revision":null,"url":"icons/transparent_512.png"},{"revision":null,"url":"icons/transparent_72.png"},{"revision":null,"url":"icons/transparent_96.png"},{"revision":null,"url":"index-0toTXdtU.js"},{"revision":null,"url":"index-CAny5GNl.css"},{"revision":null,"url":"index.html"},{"revision":null,"url":"manifest.json"},{"revision":null,"url":"mstile-144x144.png"},{"revision":null,"url":"mstile-150x150.png"},{"revision":null,"url":"mstile-310x150.png"},{"revision":null,"url":"mstile-310x310.png"},{"revision":null,"url":"mstile-70x70.png"},{"revision":null,"url":"safari-pinned-tab.svg"},{"revision":null,"url":"sw.js"},{"revision":null,"url":"/"}].map(e=>"/Bisectriz/http/"+e.url);async function r(){await(await caches.open(t)).addAll(o),console.log(`[Service Worker] installed files to ${t}`)}addEventListener("install",e=>{e.waitUntil(r())});async function i(){const e=await caches.keys();await Promise.all(e.map(c=>c!==t&&caches.delete(c))),console.log("[Service Worker] activated")}addEventListener("activate",e=>e.waitUntil(i()));async function s(e){const c=await caches.match(e,{ignoreSearch:!0});if(c)return console.log(`[Service Worker] cache hit: ${e.url}`),c;console.log(`[Service Worker] fetching ${e.url}`);const n=await fetch(e).catch(a);return n.ok?n:(console.log(`[Service Worker] haven't found ${e.url}`),a("URL not found"))}addEventListener("fetch",e=>e.respondWith(s(e.request)));async function a(e){return console.log(`[Service Worker] Error: "${e}"`),caches.match("/404.html")}
//# sourceMappingURL=sw.js.map
