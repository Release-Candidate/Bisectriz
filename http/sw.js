const t = "Gregor-0.1.0-1698870473889", o = [{"revision":"8824eaf645df647dbc642d0c0c82f368","url":"404.html"},{"revision":"b515d4bee63ff0ad70d32b2fd28130e2","url":"apple-touch-icon.png"},{"revision":null,"url":"assets/index-9f3c92bd.js"},{"revision":null,"url":"assets/index-f28a500a.css"},{"revision":null,"url":"assets/solid-123b04bc.svg"},{"revision":"ce6f244caf48879114a1a862d14138d4","url":"browserconfig.xml"},{"revision":"6a8d4ee529abce7ff6be3282025859cb","url":"favicon-16x16.png"},{"revision":"86bd581621a69e93af910a6688d637f7","url":"favicon-32x32.png"},{"revision":"b9bf0528197b77a31016c40b60d3c94c","url":"favicon.ico"},{"revision":"71cb70e11f9ca33eec35eae8217ba0eb","url":"favicon.svg"},{"revision":"58e8954378fa61e33afd6ce2eb057bcc","url":"icons/icon-192.png"},{"revision":"ed7c1ba7584e9cdbb85a159b26f14758","url":"icons/icon-512.png"},{"revision":"71cb70e11f9ca33eec35eae8217ba0eb","url":"icons/icon.svg"},{"revision":"bcb0ab0b2d043ddec24827edc5fc5234","url":"icons/maskable_128.png"},{"revision":"5ca35108a2e29ef40b8a17668ca0df1b","url":"icons/maskable_144.png"},{"revision":"287c1069497d44610b91a07a3554d854","url":"icons/maskable_16.png"},{"revision":"c795d16e62bc20782fc48b87912329b0","url":"icons/maskable_192.png"},{"revision":"1b7a84839407f013fa8a03c6f00ea1f0","url":"icons/maskable_256.png"},{"revision":"ed01d3ef489ed933ff2ab686a8d679c4","url":"icons/maskable_32.png"},{"revision":"f20dfb69d4d272f10d48f5e578207aea","url":"icons/maskable_48.png"},{"revision":"ac82a6568ef9d6a3ca199d6cebe80681","url":"icons/maskable_512.png"},{"revision":"a65b0d317b5a4f70310259ed9bcb4fff","url":"icons/maskable_72.png"},{"revision":"abf74e73df7f7764445a30d978ba2882","url":"icons/maskable_96.png"},{"revision":"23d6a988a68515149e14640a53612f69","url":"icons/transparent_128.png"},{"revision":"119d1b0deb3d83a00ab682f14bd3a652","url":"icons/transparent_144.png"},{"revision":"1b6a287146ec727cf8fc82ab6887b386","url":"icons/transparent_16.png"},{"revision":"90d7aca53a929cb6cec01636f62033e3","url":"icons/transparent_192.png"},{"revision":"64f1e154930f32b59e682f64acfbae34","url":"icons/transparent_256.png"},{"revision":"8e75489b3c7d0a21e5b6dc18e9c96a02","url":"icons/transparent_32.png"},{"revision":"a9fe5dcdafb80569fb0af3dbb57f4135","url":"icons/transparent_48.png"},{"revision":"cd472e9c9c3757763176247a4f0cca5b","url":"icons/transparent_512.png"},{"revision":"5f68cbc4a2b9018bb39a730047f1cfab","url":"icons/transparent_72.png"},{"revision":"35fc8e479ac0a366c679cd05d8e647bd","url":"icons/transparent_96.png"},{"revision":"677086c22556c3b45bd044fe58a6bb87","url":"index.html"},{"revision":"f7ba7ed4907e918f5204f75a089e02f8","url":"manifest.json"},{"revision":"8d2e45c59b2113ce6d9799ad177f155e","url":"mstile-144x144.png"},{"revision":"6f25a637dfa46104fe2fd039ccb77e39","url":"mstile-150x150.png"},{"revision":"37ac7a0ac4a39cea0b05044c83fb27ed","url":"mstile-310x150.png"},{"revision":"e0af84828db8ce8733320ce39bb995f4","url":"mstile-310x310.png"},{"revision":"714692fb931627babcab1ceda6f56d8a","url":"mstile-70x70.png"},{"revision":"b78bd2c01d6b5cf295679b5d28ae206f","url":"safari-pinned-tab.svg"},{"revision":"8e3a10e157f75ada21ab742c022d5430","url":"vite.svg"},{"revision":null,"url":"sw.js"},{"revision":null,"url":"/"}].map((e) => "/Gregor/http/" + e.url);
async function r() {
  await (await caches.open(t)).addAll(o), console.log(`[Service Worker] installed files to ${t}`);
}
addEventListener("install", (e) => {
  e.waitUntil(r());
});
async function i() {
  const e = await caches.keys();
  await Promise.all(e.map((c) => c !== t && caches.delete(c))), console.log("[Service Worker] activated");
}
addEventListener("activate", (e) => e.waitUntil(i()));
async function s(e) {
  const c = await caches.match(e, {
    ignoreSearch: !0
  });
  if (c)
    return console.log(`[Service Worker] cache hit: ${e.url}`), c;
  console.log(`[Service Worker] fetching ${e.url}`);
  const n = await fetch(e).catch(a);
  return n.ok ? n : (console.log(`[Service Worker] haven't found ${e.url}`), a("URL not found"));
}
addEventListener(
  "fetch",
  (e) => e.respondWith(s(e.request))
);
async function a(e) {
  return console.log(`[Service Worker] Error: "${e}"`), caches.match("/404.html");
}
//# sourceMappingURL=sw.js.map
