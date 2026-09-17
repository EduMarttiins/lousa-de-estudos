/* Lousa de Estudos v85 — força Ensino Religioso como múltipla escolha na renderização */
(()=>{
  if(window.__lousaV85ReligionMcq)return;
  window.__lousaV85ReligionMcq=true;

  const VERSION=85;
  const PREFIX='cienciasRev3:';

  function isReligionQuestion(q){
    const id=String(q?.id||'');
    return String(typeof currentSubjectKey!=='undefined'?currentSubjectKey:'')==='religion'||id.startsWith('rel_jp')||id.startsWith('rel_dn');
  }

  function normalizeQuestion(q){
    if(!q||!isReligionQuestion(q))return;
    q.type='mcq';
    if(!Array.isArray(q.options))q.options=[];
    if(q.options.length>3)q.options=q.options.slice(0,3);
    const correct=Number(q.correct);
    if(!Number.isInteger(correct)||correct<0||correct>=q.options.length)q.correct=0;
  }

  function normalizeAll(){
    try{
      const subject=subjects?.religion;
      (subject?.lessons||[]).forEach(lesson=>(lesson.questions||[]).forEach(normalizeQuestion));
    }catch(e){}
  }

  function clearOldHandwrittenState(){
    try{
      const subject=subjects?.religion;
      (subject?.lessons||[]).forEach(lesson=>(lesson.questions||[]).forEach(q=>{
        normalizeQuestion(q);
        const choiceKey=PREFIX+q.id+':choice';
        const hasChoice=localStorage.getItem(choiceKey)!==null;
        if(!hasChoice){
          ['submitted','explained','canvas','scratch'].forEach(suffix=>localStorage.removeItem(PREFIX+q.id+':'+suffix));
        }
      }));
    }catch(e){}
  }

  function withLockedMcq(q,fn){
    if(!isReligionQuestion(q))return fn();
    normalizeQuestion(q);
    const fixedOptions=Array.isArray(q.options)?q.options.slice():[];
    const fixedCorrect=Number(q.correct)||0;
    const oldType=Object.getOwnPropertyDescriptor(q,'type');
    const oldOptions=Object.getOwnPropertyDescriptor(q,'options');
    const oldCorrect=Object.getOwnPropertyDescriptor(q,'correct');
    let locked=false;
    try{
      Object.defineProperty(q,'type',{configurable:true,enumerable:true,get(){return 'mcq'},set(){}});
      Object.defineProperty(q,'options',{configurable:true,enumerable:true,get(){return fixedOptions},set(){}});
      Object.defineProperty(q,'correct',{configurable:true,enumerable:true,get(){return fixedCorrect},set(){}});
      locked=true;
    }catch(e){}
    try{return fn();}
    finally{
      if(locked){
        try{delete q.type;delete q.options;delete q.correct}catch(e){}
        try{
          if(oldType)Object.defineProperty(q,'type',oldType);else q.type='mcq';
          if(oldOptions)Object.defineProperty(q,'options',oldOptions);else q.options=fixedOptions;
          if(oldCorrect)Object.defineProperty(q,'correct',oldCorrect);else q.correct=fixedCorrect;
        }catch(e){}
      }
      q.type='mcq';q.options=fixedOptions;q.correct=fixedCorrect;
    }
  }

  function installBuildGuard(){
    try{
      if(typeof buildQuestion!=='function'||buildQuestion.__v85ReligionMcq)return;
      const previous=buildQuestion;
      const wrapped=function(q,num){
        return withLockedMcq(q,()=>{
          const card=previous.apply(this,arguments);
          try{
            if(isReligionQuestion(q)&&card){
              const meta=card.querySelector('.qMeta');
              if(meta)meta.textContent='Múltipla escolha';
            }
          }catch(e){}
          return card;
        });
      };
      wrapped.__v85ReligionMcq=true;
      buildQuestion=wrapped;
    }catch(e){}
  }

  function installRenderGuard(){
    try{
      if(typeof renderLesson!=='function'||renderLesson.__v85ReligionMcq)return;
      const previous=renderLesson;
      const wrapped=function(lesson){
        if(String(typeof currentSubjectKey!=='undefined'?currentSubjectKey:'')==='religion'){
          (lesson?.questions||[]).forEach(normalizeQuestion);
        }
        return previous.apply(this,arguments);
      };
      wrapped.__v85ReligionMcq=true;
      renderLesson=wrapped;
    }catch(e){}
  }

  function stampVersion(){
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

  normalizeAll();
  clearOldHandwrittenState();
  installBuildGuard();
  installRenderGuard();
  stampVersion();
  [250,800,1800,3200,5200].forEach(ms=>setTimeout(()=>{
    normalizeAll();installBuildGuard();installRenderGuard();stampVersion();
  },ms));

  window.__lousaV85Ready=true;
})();
