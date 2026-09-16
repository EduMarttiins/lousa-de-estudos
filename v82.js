/* Lousa de Estudos v82 — mantém a distribuição das respostas corretas após todas as camadas antigas */
(()=>{
  if(window.__lousaV82FinalAnswerBalance)return;
  window.__lousaV82FinalAnswerBalance=true;

  const TARGETS=['science','portuguese','geography','history'];
  const PREFIX='cienciasRev3:';
  let activeLesson=null;
  let activeSubject='';
  let observer=null;
  let scheduled=false;
  let syncing=false;

  function hash(value){
    let h=2166136261;
    for(const ch of String(value||'')){
      h^=ch.charCodeAt(0);
      h=Math.imul(h,16777619);
    }
    return h>>>0;
  }

  function choiceKey(q){return PREFIX+String(q?.id||'')+':choice'}
  function selectedTextKey(q){return PREFIX+'v81:selected:'+String(q?.id||'')}

  function savedSelectedText(q){
    try{return localStorage.getItem(selectedTextKey(q))||''}catch(e){return ''}
  }

  function remapSavedChoice(q){
    const text=savedSelectedText(q);
    if(!text||!Array.isArray(q?.options))return;
    const index=q.options.findIndex(option=>String(option)===String(text));
    if(index<0)return;
    try{localStorage.setItem(choiceKey(q),String(index))}catch(e){}
  }

  function targetPositions(subjectKey,lesson){
    const map=new Map();
    const questions=(lesson?.questions||[]).filter(q=>q&&q.type==='mcq'&&Array.isArray(q.options)&&q.options.length>=2);
    const counts=[];
    let previous=-1;

    questions.forEach((q,index)=>{
      const length=q.options.length;
      while(counts.length<length)counts.push(0);
      const positions=Array.from({length},(_,i)=>i);
      const least=Math.min(...positions.map(i=>counts[i]||0));
      let candidates=positions.filter(i=>(counts[i]||0)===least);
      if(candidates.length>1&&candidates.includes(previous))candidates=candidates.filter(i=>i!==previous);
      candidates.sort((a,b)=>{
        const base=subjectKey+':'+String(lesson?.key||'')+':'+String(q.id||index)+':';
        return hash(base+a)-hash(base+b);
      });
      const target=candidates[0]??0;
      map.set(q,target);
      counts[target]=(counts[target]||0)+1;
      previous=target;
    });
    return map;
  }

  function moveCorrect(q,target){
    if(!q||q.type!=='mcq'||!Array.isArray(q.options)||q.options.length<2)return false;
    const current=Number(q.correct);
    if(!Number.isInteger(current)||current<0||current>=q.options.length)return false;
    target=Math.max(0,Math.min(Number(target)||0,q.options.length-1));

    const correctText=q.options[current];
    if(current!==target){
      const others=q.options.filter((_,index)=>index!==current);
      const next=[...others];
      next.splice(target,0,correctText);
      q.options=next;
      q.correct=target;
      remapSavedChoice(q);
      return true;
    }
    remapSavedChoice(q);
    return false;
  }

  function enforceLesson(subjectKey,lesson){
    if(!TARGETS.includes(subjectKey)||!lesson)return;
    const targets=targetPositions(subjectKey,lesson);
    (lesson.questions||[]).forEach(q=>{
      if(targets.has(q))moveCorrect(q,targets.get(q));
    });
  }

  function setLabelText(label,text){
    if(!label)return false;
    const input=label.querySelector('input[type="radio"]');
    const current=[...label.childNodes].filter(node=>node!==input).map(node=>node.textContent||'').join('').trim();
    const wanted=String(text??'').trim();
    if(current===wanted)return false;
    [...label.childNodes].forEach(node=>{if(node!==input)node.remove()});
    const span=document.createElement('span');
    span.className='v82OptionText';
    span.textContent=wanted;
    label.appendChild(span);
    return true;
  }

  function syncCard(card,q){
    if(!card||!q||!Array.isArray(q.options))return;
    const labels=[...card.querySelectorAll('.option')];
    labels.forEach((label,index)=>{
      if(index<q.options.length)setLabelText(label,q.options[index]);
    });

    let selected=null;
    try{
      const raw=localStorage.getItem(choiceKey(q));
      if(raw!==null&&raw!=='')selected=Number(raw);
    }catch(e){}
    labels.forEach((label,index)=>{
      const input=label.querySelector('input[type="radio"]');
      if(input&&Number.isInteger(selected))input.checked=index===selected;
    });
  }

  function syncVisible(){
    if(syncing||!activeLesson||!TARGETS.includes(activeSubject))return;
    syncing=true;
    try{
      enforceLesson(activeSubject,activeLesson);
      const cards=[...document.querySelectorAll('#lessonContent .question')];
      (activeLesson.questions||[]).forEach((q,index)=>syncCard(cards[index],q));
    }finally{
      syncing=false;
    }
  }

  function scheduleSync(delay=0){
    if(delay>0){setTimeout(()=>scheduleSync(0),delay);return;}
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{
      scheduled=false;
      syncVisible();
    });
  }

  function observeLesson(){
    const root=document.getElementById('lessonContent');
    if(!root)return;
    if(observer)observer.disconnect();
    observer=new MutationObserver(()=>{
      if(!syncing)scheduleSync(0);
    });
    observer.observe(root,{childList:true,subtree:true,characterData:true});
  }

  function patchRender(){
    try{
      if(typeof buildQuestion==='function'&&!buildQuestion.__v82Wrapped){
        const previous=buildQuestion;
        const wrapped=function(q,num){
          const card=previous.apply(this,arguments);
          try{
            const subject=String(currentSubjectKey||'');
            if(TARGETS.includes(subject)&&activeLesson){
              enforceLesson(subject,activeLesson);
              syncCard(card,q);
            }
          }catch(e){}
          return card;
        };
        wrapped.__v82Wrapped=true;
        buildQuestion=wrapped;
      }

      if(typeof renderLesson==='function'&&!renderLesson.__v82Wrapped){
        const previous=renderLesson;
        const wrapped=function(lesson){
          activeLesson=lesson;
          activeSubject=String(currentSubjectKey||'');
          if(TARGETS.includes(activeSubject))enforceLesson(activeSubject,lesson);
          const result=previous.apply(this,arguments);
          if(TARGETS.includes(activeSubject)){
            syncVisible();
            observeLesson();
            [0,100,300,700,1050,1400,2000,3000].forEach(ms=>scheduleSync(ms));
          }
          return result;
        };
        wrapped.__v82Wrapped=true;
        renderLesson=wrapped;
      }
    }catch(e){console.warn('v82 wrappers',e)}
  }

  function enforceAll(){
    try{
      TARGETS.forEach(subject=>{
        (subjects?.[subject]?.lessons||[]).forEach(lesson=>enforceLesson(subject,lesson));
      });
    }catch(e){console.warn('v82 enforceAll',e)}
  }

  if(!document.getElementById('v82Styles')){
    const style=document.createElement('style');
    style.id='v82Styles';
    style.textContent='.option .v82OptionText{display:block;flex:1;min-width:0;white-space:normal;line-height:1.42}';
    document.head.appendChild(style);
  }

  patchRender();
  enforceAll();
  [150,400,900,1600,2600].forEach(ms=>setTimeout(()=>{patchRender();enforceAll();syncVisible()},ms));

  window.__lousaCurrentContentVersion=82;
  window.__lousaV82Ready=true;
})();