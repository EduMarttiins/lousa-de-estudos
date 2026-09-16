/* Lousa de Estudos v81 — distribui a posição das respostas corretas sem alterar o conteúdo */
(()=>{
  if(window.__lousaV81BalancedAnswers)return;
  window.__lousaV81BalancedAnswers=true;

  const TARGET_SUBJECTS=['science','portuguese','geography','history'];
  const PREFIX81='cienciasRev3:';
  const targetByQuestion=new WeakMap();
  let activeLesson81=null;

  function hash(value){
    let h=2166136261;
    for(const ch of String(value||'')){
      h^=ch.charCodeAt(0);
      h=Math.imul(h,16777619);
    }
    return h>>>0;
  }

  function choiceKey(q){return PREFIX81+String(q?.id||'')+':choice'}
  function submittedKey(q){return PREFIX81+String(q?.id||'')+':submitted'}
  function selectedTextKey(q){return PREFIX81+'v81:selected:'+String(q?.id||'')}

  function readSavedChoice(q){
    try{
      const raw=localStorage.getItem(choiceKey(q));
      if(raw===null||raw==='')return null;
      const n=Number(raw);
      return Number.isInteger(n)?n:null;
    }catch(e){return null}
  }

  function captureSelectedText(q){
    if(!q||!Array.isArray(q.options))return '';
    try{
      const cached=localStorage.getItem(selectedTextKey(q));
      if(cached!==null)return cached;
      const index=readSavedChoice(q);
      if(index!==null&&q.options[index]!==undefined){
        const text=String(q.options[index]);
        localStorage.setItem(selectedTextKey(q),text);
        return text;
      }
    }catch(e){}
    return '';
  }

  function writeSelectedIndex(q,text){
    if(!q||!Array.isArray(q.options)||!text)return;
    const index=q.options.findIndex(option=>String(option)===String(text));
    if(index<0)return;
    try{localStorage.setItem(choiceKey(q),String(index))}catch(e){}
  }

  function makeTargets(subjectKey,lesson){
    if(!lesson||!TARGET_SUBJECTS.includes(subjectKey))return;
    const questions=(lesson.questions||[]).filter(q=>q&&q.type==='mcq'&&Array.isArray(q.options)&&q.options.length>=2);
    const counts=new Map();
    let previous=-1;

    questions.forEach((q,index)=>{
      const positions=Array.from({length:q.options.length},(_,i)=>i);
      const least=Math.min(...positions.map(pos=>counts.get(pos)||0));
      let candidates=positions.filter(pos=>(counts.get(pos)||0)===least);
      if(candidates.length>1&&candidates.includes(previous))candidates=candidates.filter(pos=>pos!==previous);
      candidates.sort((a,b)=>{
        const ha=hash(subjectKey+':'+String(lesson.key||'')+':'+String(q.id||index)+':'+a);
        const hb=hash(subjectKey+':'+String(lesson.key||'')+':'+String(q.id||index)+':'+b);
        return ha-hb;
      });
      const target=candidates[0]??0;
      targetByQuestion.set(q,target);
      counts.set(target,(counts.get(target)||0)+1);
      previous=target;
    });
  }

  function reorderQuestion(q,target){
    if(!q||q.type!=='mcq'||!Array.isArray(q.options)||q.options.length<2)return;
    const oldCorrect=Number(q.correct);
    if(!Number.isInteger(oldCorrect)||oldCorrect<0||oldCorrect>=q.options.length)return;
    target=Math.max(0,Math.min(Number(target)||0,q.options.length-1));

    const selectedText=captureSelectedText(q);
    if(oldCorrect===target){
      if(selectedText)writeSelectedIndex(q,selectedText);
      return;
    }

    const pairs=q.options.map((text,index)=>({text,index,correct:index===oldCorrect}));
    const correctPair=pairs.find(item=>item.correct);
    if(!correctPair)return;
    const others=pairs.filter(item=>!item.correct);
    const reordered=[...others];
    reordered.splice(target,0,correctPair);
    q.options=reordered.map(item=>item.text);
    q.correct=target;

    if(selectedText)writeSelectedIndex(q,selectedText);
  }

  function applyLesson(subjectKey,lesson){
    if(!lesson||!TARGET_SUBJECTS.includes(subjectKey))return;
    makeTargets(subjectKey,lesson);
    (lesson.questions||[]).forEach(q=>{
      if(!q||q.type!=='mcq'||!Array.isArray(q.options))return;
      reorderQuestion(q,targetByQuestion.get(q)??0);
    });
  }

  function applyAll(){
    try{
      TARGET_SUBJECTS.forEach(subjectKey=>{
        (subjects?.[subjectKey]?.lessons||[]).forEach(lesson=>applyLesson(subjectKey,lesson));
      });
    }catch(e){console.warn('v81 applyAll',e)}
  }

  function replaceOptionText(label,text){
    if(!label)return;
    const input=label.querySelector('input');
    [...label.childNodes].forEach(node=>{if(node!==input)node.remove()});
    const span=document.createElement('span');
    span.className='v81OptionText';
    span.textContent=String(text??'');
    label.appendChild(span);
  }

  function syncCard(card,q){
    if(!card||!q||!Array.isArray(q.options))return;
    const labels=[...card.querySelectorAll('.option')];
    const selected=readSavedChoice(q);
    let submitted=false;
    try{submitted=localStorage.getItem(submittedKey(q))==='1'}catch(e){}

    labels.forEach((label,index)=>{
      if(index<q.options.length)replaceOptionText(label,q.options[index]);
      const input=label.querySelector('input[type="radio"]');
      if(input)input.checked=selected!==null&&index===selected;
      label.classList.remove('correct','wrong');
    });

    if(submitted&&selected!==null){
      if(selected===Number(q.correct))labels[selected]?.classList.add('correct');
      else{
        labels[selected]?.classList.add('wrong');
        labels[Number(q.correct)]?.classList.add('correct');
      }
    }
  }

  function syncLesson(subjectKey,lesson){
    if(!lesson||!TARGET_SUBJECTS.includes(subjectKey))return;
    applyLesson(subjectKey,lesson);
    const cards=[...document.querySelectorAll('#lessonContent .question')];
    (lesson.questions||[]).forEach((q,index)=>syncCard(cards[index],q));
  }

  function installWrappers(){
    try{
      if(typeof buildQuestion==='function'&&!buildQuestion.__v81Wrapped){
        const previous=buildQuestion;
        const wrapped=function(q,num){
          const card=previous(q,num);
          try{
            const subjectKey=String(currentSubjectKey||'');
            if(TARGET_SUBJECTS.includes(subjectKey)){
              const target=targetByQuestion.get(q);
              if(target!==undefined)reorderQuestion(q,target);
              syncCard(card,q);
            }
          }catch(e){}
          return card;
        };
        wrapped.__v81Wrapped=true;
        buildQuestion=wrapped;
      }

      if(typeof renderLesson==='function'&&!renderLesson.__v81Wrapped){
        const previous=renderLesson;
        const wrapped=function(lesson){
          activeLesson81=lesson;
          const subjectKey=String(currentSubjectKey||'');
          if(TARGET_SUBJECTS.includes(subjectKey))makeTargets(subjectKey,lesson);
          const result=previous(lesson);
          if(TARGET_SUBJECTS.includes(subjectKey)){
            syncLesson(subjectKey,lesson);
            [0,100,300,700].forEach(ms=>setTimeout(()=>syncLesson(subjectKey,lesson),ms));
          }
          return result;
        };
        wrapped.__v81Wrapped=true;
        renderLesson=wrapped;
      }
    }catch(e){console.warn('v81 wrappers',e)}
  }

  document.addEventListener('change',event=>{
    try{
      const input=event.target?.closest?.('input[type="radio"]');
      if(!input||!activeLesson81||!TARGET_SUBJECTS.includes(String(currentSubjectKey||'')))return;
      const card=input.closest('.question');
      if(!card)return;
      const cards=[...document.querySelectorAll('#lessonContent .question')];
      const q=activeLesson81.questions?.[cards.indexOf(card)];
      if(!q||!Array.isArray(q.options))return;
      const radios=[...card.querySelectorAll('input[type="radio"]')];
      const index=radios.indexOf(input);
      if(index<0||q.options[index]===undefined)return;
      localStorage.setItem(selectedTextKey(q),String(q.options[index]));
    }catch(e){}
  },true);

  if(!document.getElementById('v81AnswerStyles')){
    const style=document.createElement('style');
    style.id='v81AnswerStyles';
    style.textContent='.option .v81OptionText{display:block;flex:1;min-width:0;white-space:normal;line-height:1.42}';
    document.head.appendChild(style);
  }

  installWrappers();
  applyAll();
  [120,350,800,1600,2600].forEach(ms=>setTimeout(()=>{
    installWrappers();
    applyAll();
    try{
      if(activeLesson81)syncLesson(String(currentSubjectKey||''),activeLesson81);
    }catch(e){}
  },ms));

  window.__lousaCurrentContentVersion=81;
  window.__lousaV81Ready=true;
})();