/* Lousa de Estudos v80 — restaura acesso a Zerar lições na tela Escolha a matéria */
(()=>{
  if(window.__lousaV80ResetAccess)return;
  window.__lousaV80ResetAccess=true;

  function addStyles(){
    if(document.getElementById('v80ResetStyles'))return;
    const style=document.createElement('style');
    style.id='v80ResetStyles';
    style.textContent=`
      .v80ResetHost{display:flex;justify-content:center;margin:18px auto 4px;padding:0 4px}
      .v80ResetButton{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:42px;padding:0 16px;border:1px solid #efdcdc;border-radius:14px;background:#fffafa;color:#8a3030;font-weight:900;font-size:12px;box-shadow:0 5px 14px rgba(80,35,35,.05)}
      .v80ResetButton:hover,.v80ResetButton:focus-visible{outline:none;border-color:#d8aaaa;background:#fff4f4}
      .footer #v26ResetBtn{display:none!important}
      @media(max-width:520px){.v80ResetButton{width:100%;max-width:300px}}
    `;
    document.head.appendChild(style);
  }

  function subjectPageVisible(){
    const view=document.getElementById('subjectView');
    if(!view)return false;
    const style=getComputedStyle(view);
    return style.display!=='none' && style.visibility!=='hidden';
  }

  function ensureOriginalReset(){
    let original=document.getElementById('v26ResetBtn');
    if(!original && typeof v26BuildResetUi==='function'){
      try{v26BuildResetUi()}catch(e){console.warn('v80 reset ui',e)}
      original=document.getElementById('v26ResetBtn');
    }
    return original;
  }

  function ensureHost(){
    const subjectView=document.getElementById('subjectView');
    if(!subjectView)return null;
    let host=document.getElementById('v80ResetHost');
    if(!host){
      host=document.createElement('div');
      host.id='v80ResetHost';
      host.className='v80ResetHost';
      const grid=document.getElementById('subjectGrid');
      if(grid)grid.insertAdjacentElement('afterend',host);else subjectView.appendChild(host);
    }
    return host;
  }

  function ensureButton(){
    const host=ensureHost();
    const original=ensureOriginalReset();
    if(!host||!original)return false;
    let button=document.getElementById('v80ResetButton');
    if(!button){
      button=document.createElement('button');
      button.type='button';
      button.id='v80ResetButton';
      button.className='v80ResetButton';
      button.innerHTML='<span aria-hidden="true">↺</span><span>Zerar lições</span>';
      button.addEventListener('click',()=>{
        const reset=ensureOriginalReset();
        if(reset)reset.click();
      });
      host.appendChild(button);
    }
    host.style.display=subjectPageVisible()?'flex':'none';
    return true;
  }

  function sync(){
    addStyles();
    if(!ensureButton())setTimeout(sync,180);
    const host=document.getElementById('v80ResetHost');
    if(host)host.style.display=subjectPageVisible()?'flex':'none';
  }

  function observe(){
    const subjectView=document.getElementById('subjectView');
    if(subjectView){
      new MutationObserver(()=>sync()).observe(subjectView,{attributes:true,attributeFilter:['style','class']});
    }
    new MutationObserver(()=>sync()).observe(document.body,{attributes:true,attributeFilter:['class']});
  }

  function patchNavigation(){
    try{
      if(typeof showSubjects==='function'&&!showSubjects.__v80ResetWrapped){
        const previous=showSubjects;
        const wrapped=function(){const out=previous.apply(this,arguments);setTimeout(sync,0);setTimeout(sync,150);return out};
        wrapped.__v80ResetWrapped=true;showSubjects=wrapped;
      }
      if(typeof openSubject==='function'&&!openSubject.__v80ResetWrapped){
        const previous=openSubject;
        const wrapped=function(){const out=previous.apply(this,arguments);setTimeout(sync,0);return out};
        wrapped.__v80ResetWrapped=true;openSubject=wrapped;
      }
    }catch(e){console.warn('v80 navigation',e)}
  }

  function init(){addStyles();patchNavigation();sync();observe();[200,600,1200].forEach(ms=>setTimeout(sync,ms));}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();

  window.__lousaCurrentContentVersion=80;
  window.__lousaV80Ready=true;
})();