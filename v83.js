/* Lousa de Estudos v83 — corrige o indicador de versão legado sem fixar versões futuras */
(()=>{
  if(window.__lousaV83VersionGuard)return;
  window.__lousaV83VersionGuard=true;

  function runtimeVersion(){
    try{
      const meta=Number(document.querySelector('meta[name="app-version"]')?.content||0);
      const query=Number(new URLSearchParams(location.search).get('content')||0);
      const runtime=Number(window.__lousaCurrentContentVersion||0);
      return Math.max(83,meta,query,runtime);
    }catch(e){return Math.max(83,Number(window.__lousaCurrentContentVersion||0))}
  }

  function stamp(){
    try{
      const version=runtimeVersion();
      window.__lousaCurrentContentVersion=Math.max(version,Number(window.__lousaCurrentContentVersion||0));
      const meta=document.querySelector('meta[name="app-version"]');
      if(meta&&Number(meta.content||0)<version)meta.setAttribute('content',String(version));
      document.documentElement.dataset.contentVersion=String(version);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>{el.textContent='v'+version});
    }catch(e){}
  }

  stamp();
  [0,250,700,1500,3200,5200].forEach(ms=>setTimeout(stamp,ms));
  window.__lousaV83Ready=true;
})();