/* v96 — apresentação literal dos enunciados do livro */
(()=>{
  const VERSION=96;
  window.__lousaCurrentContentVersion=VERSION;

  function install(){
    try{
      if(typeof buildQuestion!=='function'||buildQuestion.__v96Literal)return false;
      const previous=buildQuestion;
      const wrapped=function(q,num){
        const card=previous.apply(this,arguments);
        try{
          if(!q||!String(q.id||'').startsWith('m7_')||!card)return card;
          const strong=card.querySelector('.qTitle strong');
          if(strong){
            strong.textContent=String(q.text||'');
            strong.style.whiteSpace='pre-line';
            strong.style.lineHeight='1.55';
          }
          const titleBox=card.querySelector('.qTitle > div:last-child');
          if(titleBox&&q.source&&!card.querySelector('.v96BookSource')){
            const badge=document.createElement('div');
            badge.className='v96BookSource';
            badge.textContent='📘 '+q.source;
            titleBox.insertBefore(badge,strong||titleBox.firstChild);
          }
        }catch(e){}
        return card;
      };
      wrapped.__v96Literal=true;
      buildQuestion=wrapped;
      return true;
    }catch(e){return false}
  }

  function styles(){
    if(document.getElementById('v96LiteralStyles'))return;
    const s=document.createElement('style');
    s.id='v96LiteralStyles';
    s.textContent='.v96BookSource{display:inline-flex;align-items:center;margin:0 0 8px;padding:5px 9px;border-radius:999px;background:#f3e8ff;color:#6b21a8;font-size:11px;font-weight:850}.v94Math7Question .qTitle strong,.v95Math7Question .qTitle strong{white-space:pre-line!important;line-height:1.55!important}';
    document.head.appendChild(s);
  }

  function stamp(){
    try{
      const meta=document.querySelector('meta[name="app-version"]');
      if(meta)meta.setAttribute('content',String(VERSION));
      document.documentElement.dataset.appVersion=String(VERSION);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>{
        el.textContent='v'+VERSION;
        el.style.visibility='';
      });
    }catch(e){}
  }

  styles();
  install();
  stamp();
})();