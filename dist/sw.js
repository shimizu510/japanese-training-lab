const CACHE='japanese-training-lab-shell-v14';
const SHELL=['/japanese-training-lab/','/japanese-training-lab/assets/styles.css','/japanese-training-lab/assets/app.js?v=2026102220','/japanese-training-lab/assets/coach.css?v=2026102207','/japanese-training-lab/assets/habit.css?v=2026102218','/japanese-training-lab/assets/habit.js?v=2026102218'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin||url.pathname.includes('/Build/')||url.pathname.includes('/StreamingAssets/'))return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(event.request).then(match=>match||caches.match('/japanese-training-lab/'))));
    return;
  }
  if(url.pathname.includes('/assets/'))event.respondWith(caches.match(event.request).then(match=>match||fetch(event.request)));
});
