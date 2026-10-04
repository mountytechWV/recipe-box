/* Recipe Box offline support. Bump VERSION when you upload a new index.html. */
const VERSION='rb-1.4.0';
const ASSETS=["./", "./index.html", "./help.html", "./manifest.webmanifest", "./config.js", "./icons/apple-touch-icon.png", "./icons/favicon-32.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-192.png", "./icons/maskable-512.png", "./fonts/caveat-latin-600-normal.woff2", "./fonts/caveat-latin-700-normal.woff2", "./fonts/courier-prime-latin-400-normal.woff2", "./fonts/courier-prime-latin-700-normal.woff2", "./fonts/libre-franklin-latin-400-normal.woff2", "./fonts/libre-franklin-latin-500-normal.woff2", "./fonts/libre-franklin-latin-600-normal.woff2", "./fonts/libre-franklin-latin-700-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==location.origin)return;
  if(req.mode==='navigate'||url.pathname.endsWith('/config.js')){
    const page=url.pathname.endsWith('/help.html')?'./help.html':'./index.html';
    /* online: get the newest app; offline or slow: use the saved copy */
    e.respondWith(Promise.race([fetch(req).then(r=>{const cp=r.clone();const key=req.mode==='navigate'?page:req;caches.open(VERSION).then(c=>c.put(key,cp));return r}),new Promise((_,rej)=>setTimeout(rej,4000))]).catch(()=>caches.match(req.mode==='navigate'?page:req,{ignoreSearch:true})));return}
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(r=>{if(r.ok){const cp=r.clone();caches.open(VERSION).then(c=>c.put(req,cp))}return r})))});
