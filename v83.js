/* Lousa de Estudos v83 — corrige o indicador de versão legado */
(()=>{
  if(window.__lousaV83VersionGuard)return;
  window.__lousaV83VersionGuard=true;
  const VERSION=83;

  function stamp(){
    try{
      window.__lousaCurrentContentVersion=Math.max(VERSION,Number(window.__lousaCurrentContentVersion||0));
      const meta=document.querySelector('meta[name="app-version"]');
      if(meta)meta.setAttribute('content',String(VERSION));
      document.documentElement.dataset.contentVersion=String(VERSION);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>{el.textContent='v'+VERSION});
    }catch(e){}
  }

  stamp();
  [0,250,700,1500,3200,5200].forEach(ms=>setTimeout(stamp,ms));
  window.__lousaV83Ready=true;
})();