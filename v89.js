/* Lousa de Estudos v89 — autoridade única de versão e estabilidade */
(()=>{
  if(window.__lousaV89Stable)return;
  window.__lousaV89Stable=true;
  const VERSION=89;
  let correcting=false;

  function stamp(){
    if(correcting)return;
    correcting=true;
    try{
      window.__lousaCurrentContentVersion=VERSION;
      const meta=document.querySelector('meta[name="app-version"]');
      if(meta)meta.setAttribute('content',String(VERSION));
      document.documentElement.dataset.contentVersion=String(VERSION);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>{
        el.classList.remove('pending');
        el.textContent='v'+VERSION;
      });
    }catch(e){}
    correcting=false;
  }

  function showStableVersion(){
    try{document.getElementById('v89VersionBootHide')?.remove()}catch(e){}
    stamp();
  }

  stamp();
  const observer=new MutationObserver(()=>queueMicrotask(stamp));
  try{observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['content','data-content-version']})}catch(e){}
  [0,100,250,500,900,1500,2200,3200,4200,5200,6200].forEach(ms=>setTimeout(stamp,ms));
  setTimeout(showStableVersion,5600);
  window.addEventListener('pageshow',stamp);
  window.addEventListener('focus',stamp);
  window.__lousaV89Ready=true;
})();