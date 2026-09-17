/* Lousa de Estudos — indicador estável de versão; atualização somente na inicialização */
(()=>{
  if(window.__lousaAutoUpdate)return;
  window.__lousaAutoUpdate=true;

  function currentVersion(){
    const meta=Number(document.querySelector('meta[name="app-version"]')?.content||0);
    const query=Number(new URLSearchParams(location.search).get('content')||0);
    const runtime=Number(window.__lousaCurrentContentVersion||0);
    return Math.max(meta,query,runtime,89);
  }

  function addStyles(){
    if(document.getElementById('lousaUpdateStyles'))return;
    const style=document.createElement('style');
    style.id='lousaUpdateStyles';
    style.textContent=`
      .lousaVersionOnly{position:fixed;left:5px;bottom:max(4px,env(safe-area-inset-bottom));z-index:105000;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;font-size:9px;line-height:1;color:#7a857e;background:rgba(255,255,255,.78);border-radius:7px;padding:4px 6px;box-shadow:0 2px 7px rgba(15,23,42,.06);opacity:.9;border:0;pointer-events:none}
      @media(max-width:520px){.lousaVersionOnly{font-size:8.5px}}
    `;
    document.head.appendChild(style);
  }

  function stamp(){
    addStyles();
    let label=document.querySelector('.lousaVersionOnly');
    if(!label){
      label=document.createElement('div');
      label.className='lousaVersionOnly';
      document.body.appendChild(label);
    }
    const version=currentVersion();
    window.__lousaCurrentContentVersion=version;
    const meta=document.querySelector('meta[name="app-version"]');
    if(meta)meta.setAttribute('content',String(version));
    document.documentElement.dataset.contentVersion=String(version);
    label.textContent='v'+version;
    label.classList.remove('pending');
  }

  function init(){
    try{localStorage.removeItem('lousa:autoUpdate:pendingVersion')}catch(e){}
    stamp();
    [500,1200,2500,5000].forEach(ms=>setTimeout(stamp,ms));
    window.addEventListener('pageshow',stamp);
    window.addEventListener('focus',stamp);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();