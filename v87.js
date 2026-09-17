/* Lousa de Estudos v87 — recuperação robusta de atualização do PWA */
(()=>{
  if(window.__lousaV87UpdateRecovery)return;
  window.__lousaV87UpdateRecovery=true;
  const VERSION=87;
  function stamp(){
    try{
      const meta=Number(document.querySelector('meta[name="app-version"]')?.content||0);
      const query=Number(new URLSearchParams(location.search).get('content')||0);
      const runtime=Number(window.__lousaCurrentContentVersion||0);
      const version=Math.max(VERSION,meta,query,runtime);
      window.__lousaCurrentContentVersion=version;
      const metaEl=document.querySelector('meta[name="app-version"]');
      if(metaEl&&Number(metaEl.content||0)<version)metaEl.content=String(version);
      document.documentElement.dataset.contentVersion=String(version);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>el.textContent='v'+version);
    }catch(e){}
  }
  stamp();
  [250,800,1800,3500,5500].forEach(ms=>setTimeout(stamp,ms));
  window.__lousaV87Ready=true;
})();
