/* Recipe Box offline support. Bump VERSION when you upload a new index.html or help.html. */
const VERSION='rb-1.6.1';
const ASSETS=["./", "./index.html", "./help.html", "./manifest.webmanifest", "./config.js", "./icons/apple-touch-icon.png", "./icons/favicon-32.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-192.png", "./icons/maskable-512.png", "./fonts/caveat-latin-600-normal.woff2", "./fonts/caveat-latin-700-normal.woff2", "./fonts/courier-prime-latin-400-normal.woff2", "./fonts/courier-prime-latin-700-normal.woff2", "./fonts/libre-franklin-latin-400-normal.woff2", "./fonts/libre-franklin-latin-500-normal.woff2", "./fonts/libre-franklin-latin-600-normal.woff2", "./fonts/libre-franklin-latin-700-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* Online: get the newest copy and save it. Offline, slow, or a server error: use the saved copy.
   Only good, direct answers are saved, so an error page can never replace the app. */
function fresh(req,key){
  const net=fetch(req).then(r=>{if(r.ok&&!r.redirected){const cp=r.clone();caches.open(VERSION).then(c=>c.put(key,cp))}
    return r.ok?r:caches.match(key,{ignoreSearch:true}).then(hit=>hit||r)});
  return Promise.race([net,new Promise((_,rej)=>setTimeout(rej,4000))]).catch(()=>caches.match(key,{ignoreSearch:true}).then(hit=>hit||net));
}
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==location.origin)return;
  const base=new URL('./',self.registration.scope).pathname;const rel=url.pathname.startsWith(base)?url.pathname.slice(base.length):null;
  if(req.mode==='navigate'){
    const page=(rel===''||rel==='index.html')?'./index.html':rel==='help.html'?'./help.html':null;
    if(!page)return; /* other pages (like the privacy policy or a mistyped link) load normally and are never saved */
    e.respondWith(fresh(req,page));return}
  if(rel==='config.js'){e.respondWith(fresh(req,'./config.js'));return}
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(r=>{if(r.ok&&!r.redirected){const cp=r.clone();caches.open(VERSION).then(c=>c.put(req,cp))}return r})))});
