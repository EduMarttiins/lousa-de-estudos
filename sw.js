const VERSION='97-book-layout-after-submit';
const CACHE='lousa-de-estudos-v'+VERSION;
const ASSETS=[
  './start.html','./rescue.html','./index.html','./v68.html','./loader-v97.js?v=97',
  './v37.css?v=97','./pwa-v39.css?v=97','./v37.js?v=97','./v41.js?v=97','./v50.js?v=97','./v54.js?v=97',
  './v55.js?v=97','./v56.js?v=97','./v57.js?v=97','./v58.js?v=97','./v59.js?v=97','./v60.js?v=97',
  './v62.js?v=97','./v63.js?v=97','./v64.js?v=97','./v65.js?v=97','./v66.js?v=97','./v67.js?v=97','./v68.js?v=97','./v69.js?v=97',
  './v70-data-01.js?v=97','./v70-data-02.js?v=97','./v70-data-03.js?v=97','./v70-data-04.js?v=97','./v70-data-05.js?v=97','./v70-data-06.js?v=97','./v70-data-07.js?v=97','./v70-data-08.js?v=97','./v70-data-09.js?v=97','./v70-data-10.js?v=97','./v70-data-11.js?v=97',
  './v70.js?v=97','./v71.js?v=97','./v72.js?v=97','./v73.js?v=97','./v74.js?v=97','./v75.js?v=97','./v76.js?v=97','./v77.js?v=97','./v78.js?v=97','./v79.js?v=97','./v80.js?v=97','./v81.js?v=97','./v82.js?v=97',
  './v90-jp.js?v=97','./v90-dn.js?v=97','./v97-math7.js?v=97','./v97-core.js?v=97','./v97-ui.js?v=97','./manifest.webmanifest?v=97','./icons/lousa-icon-192.png?v=97','./icons/lousa-icon-512.png?v=97'
];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(ASSETS);})());});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('lousa-de-estudos-v')&&k!==CACHE).map(k=>caches.delete(k)));})());});
async function networkFirst(request){try{const response=await fetch(request,{cache:'no-store'});if(response&&response.ok){const cache=await caches.open(CACHE);cache.put(request,response.clone()).catch(()=>{});}return response;}catch(error){const cached=await caches.match(request,{ignoreSearch:true});if(cached)return cached;throw error;}}
self.addEventListener('fetch',event=>{
  const request=event.request;if(request.method!=='GET')return;
  const url=new URL(request.url);if(url.origin!==self.location.origin)return;
  if(request.mode==='navigate'||url.pathname.endsWith('/app-version.json')||url.pathname.endsWith('/start.html')||url.pathname.endsWith('/rescue.html')||url.pathname.endsWith('/v68.html')||url.pathname.endsWith('/loader-v97.js')||url.pathname.endsWith('/v97-math7.js')||url.pathname.endsWith('/v97-core.js')||url.pathname.endsWith('/v97-ui.js')){event.respondWith(networkFirst(request));return;}
  event.respondWith(networkFirst(request));
});
