/* Lousa de Estudos v89 — autoridade única de versão e estabilidade */
(()=>{
  if(window.__lousaV89Stable)return;
  window.__lousaV89Stable=true;
  const BASE_VERSION=89;
  let correcting=false;

  function currentVersion(){
    try{
      const meta=Number(document.querySelector('meta[name="app-version"]')?.content||0);
      const query=Number(new URLSearchParams(location.search).get('content')||0);
      const runtime=Number(window.__lousaCurrentContentVersion||0);
      return Math.max(BASE_VERSION,meta,query,runtime);
    }catch(e){return Math.max(BASE_VERSION,Number(window.__lousaCurrentContentVersion||0))}
  }

  function stamp(){
    if(correcting)return;
    correcting=true;
    try{
      const version=currentVersion();
      if(Number(window.__lousaCurrentContentVersion||0)<version)window.__lousaCurrentContentVersion=version;
      const meta=document.querySelector('meta[name="app-version"]');
      if(meta&&Number(meta.content||0)!==version)meta.setAttribute('content',String(version));
      if(document.documentElement.dataset.contentVersion!==String(version))document.documentElement.dataset.contentVersion=String(version);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>{
        el.classList.remove('pending');
        if(el.textContent!=='v'+version)el.textContent='v'+version;
      });
    }catch(e){}
    correcting=false;
  }

  function showStableVersion(){
    try{
      document.getElementById('v89VersionBootHide')?.remove();
      document.getElementById('v90VersionBootHide')?.remove();
    }catch(e){}
    stamp();
  }

  stamp();
  const observer=new MutationObserver(()=>queueMicrotask(stamp));
  try{
    observer.observe(document.documentElement,{
      subtree:true,childList:true,characterData:true,attributes:true,
      attributeFilter:['content','data-content-version']
    });
  }catch(e){}
  [0,100,250,500,900,1500,2200,3200,4200,5200,6200].forEach(ms=>setTimeout(stamp,ms));
  setTimeout(showStableVersion,5600);
  window.addEventListener('pageshow',stamp);
  window.addEventListener('focus',stamp);
  window.__lousaV89Ready=true;
})();
