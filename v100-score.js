/* Lousa de Estudos v100 — placar de acertos e erros em Educação Física */
(()=>{
  if(window.__lousaV100ScoreBars)return;
  window.__lousaV100ScoreBars=true;
  const VERSION=100;
  const SUBJECT='physicalEducation';

  function targetSubject(){
    try{return typeof subjects!=='undefined'?subjects?.[SUBJECT]:null}catch(e){return null}
  }

  function mcqQuestions(source){
    if(!source)return [];
    if(Array.isArray(source.questions))return source.questions.filter(q=>q&&q.type==='mcq');
    if(Array.isArray(source.lessons))return source.lessons.flatMap(l=>(l.questions||[]).filter(q=>q&&q.type==='mcq'));
    return [];
  }

  function stats(source){
    const qs=mcqQuestions(source);
    let correct=0,wrong=0,answered=0;
    qs.forEach(q=>{
      let sent=false,choice=null;
      try{sent=typeof isSubmitted==='function'?isSubmitted(q):false}catch(e){}
      if(!sent)return;
      answered++;
      try{choice=typeof getChoice==='function'?getChoice(q):null}catch(e){}
      if(String(choice)===String(q.correct))correct++;else wrong++;
    });
    return {correct,wrong,answered,total:qs.length,pending:Math.max(0,qs.length-answered)};
  }

  function barMarkup(s,compact=false){
    const pc=s.total?s.correct/s.total*100:0;
    const pw=s.total?s.wrong/s.total*100:0;
    const pp=Math.max(0,100-pc-pw);
    return '<div class="v100Score '+(compact?'compact':'')+'">'+
      '<div class="v100ScoreHead"><strong>'+(compact?'Desempenho':'Resultado da lição')+'</strong><span>'+s.answered+' de '+s.total+' respondidas</span></div>'+
      '<div class="v100ScoreCounts">'+
        '<span class="ok"><b>'+s.correct+'</b> acertos</span>'+
        '<span class="bad"><b>'+s.wrong+'</b> erros</span>'+
        '<span class="pending"><b>'+s.pending+'</b> faltam</span>'+
      '</div>'+
      '<div class="v100Track" role="img" aria-label="'+s.correct+' acertos, '+s.wrong+' erros e '+s.pending+' questões pendentes">'+
        '<span class="ok" style="width:'+pc+'%"></span>'+
        '<span class="bad" style="width:'+pw+'%"></span>'+
        '<span class="pending" style="width:'+pp+'%"></span>'+
      '</div>'+
    '</div>';
  }

  function decorateSubjectCard(){
    const subject=targetSubject();
    if(!subject)return;
    const card=document.querySelector('#subjectGrid .subjectCard[data-subject="'+SUBJECT+'"]');
    if(!card)return;
    let host=card.querySelector('.v100SubjectScoreHost');
    if(!host){
      host=document.createElement('div');
      host.className='v100SubjectScoreHost';
      const foot=card.querySelector('.subjectFoot');
      if(foot)card.insertBefore(host,foot);else card.appendChild(host);
    }
    host.innerHTML=barMarkup(stats(subject),true);
  }

  function decorateLesson(lesson){
    if(!lesson||!mcqQuestions(lesson).some(q=>/^ef5_gin_/.test(String(q.id||''))))return;
    const root=document.getElementById('lessonContent');
    if(!root)return;
    let host=root.querySelector('.v100LessonScoreHost');
    if(!host){
      host=document.createElement('section');
      host.className='v100LessonScoreHost';
      root.appendChild(host);
    }
    host.innerHTML=barMarkup(stats(lesson),false);
  }

  function syncVisible(){
    try{decorateSubjectCard()}catch(e){}
    try{
      if(typeof activeLesson!=='undefined'&&activeLesson)decorateLesson(activeLesson);
    }catch(e){}
  }

  function installWrappers(){
    try{
      if(typeof renderSubjectCards==='function'&&!renderSubjectCards.__v100ScoreBars){
        const previous=renderSubjectCards;
        const wrapped=function(){
          const out=previous.apply(this,arguments);
          decorateSubjectCard();
          return out;
        };
        wrapped.__v100ScoreBars=true;
        renderSubjectCards=wrapped;
      }
    }catch(e){}

    try{
      if(typeof renderLesson==='function'&&!renderLesson.__v100ScoreBars){
        const previous=renderLesson;
        const wrapped=function(lesson){
          const out=previous.apply(this,arguments);
          decorateLesson(lesson);
          return out;
        };
        wrapped.__v100ScoreBars=true;
        renderLesson=wrapped;
      }
    }catch(e){}

    try{
      if(typeof updateProgress==='function'&&!updateProgress.__v100ScoreBars){
        const previous=updateProgress;
        const wrapped=function(){
          const out=previous.apply(this,arguments);
          syncVisible();
          return out;
        };
        wrapped.__v100ScoreBars=true;
        updateProgress=wrapped;
      }
    }catch(e){}
  }

  function styles(){
    if(document.getElementById('v100ScoreStyles'))return;
    const s=document.createElement('style');
    s.id='v100ScoreStyles';
    s.textContent=`
      .v100SubjectScoreHost{width:100%;margin:16px 0 5px;text-align:left}
      .v100Score{width:100%;box-sizing:border-box;border:1px solid #e3ebe6;border-radius:20px;background:linear-gradient(180deg,#ffffff 0%,#f8fbf9 100%);padding:17px 18px;box-shadow:0 8px 20px rgba(25,55,38,.06)}
      .v100Score.compact{padding:12px 14px;border-radius:16px;background:#fbfdfc;box-shadow:none}
      .v100ScoreHead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
      .v100ScoreHead strong{font-size:14px;color:#26382e;font-weight:900}
      .v100ScoreHead span{font-size:12px;color:#728078;font-weight:800}
      .v100ScoreCounts{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:9px}
      .v100ScoreCounts span{display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:6px 9px;font-size:12px;font-weight:850;line-height:1}
      .v100ScoreCounts span.ok{background:#e9f8ef;color:#18713d}
      .v100ScoreCounts span.bad{background:#fff0f0;color:#b33a3a}
      .v100ScoreCounts span.pending{background:#f1f4f2;color:#647067}
      .v100ScoreCounts b{font-size:13px}
      .v100Track{height:11px;border-radius:999px;overflow:hidden;display:flex;background:#edf1ee;box-shadow:inset 0 0 0 1px rgba(20,40,28,.04)}
      .v100Track span{display:block;height:100%;transition:width .25s ease}
      .v100Track span.ok{background:#2f9d59}
      .v100Track span.bad{background:#e25555}
      .v100Track span.pending{background:#dfe6e1}
      .v100LessonScoreHost{margin:22px 0 8px}
      .v100LessonScoreHost .v100Score{border-color:#d8e7dc}
      .subjectCard[data-subject="physicalEducation"] .v100SubjectScoreHost{grid-column:1 / -1}
      @media(max-width:520px){
        .v100ScoreHead{align-items:flex-start;flex-direction:column;gap:3px}
        .v100ScoreCounts{gap:6px}
        .v100ScoreCounts span{font-size:11px}
      }
    `;
    document.head.appendChild(s);
  }

  function stamp(){
    try{
      window.__lousaCurrentContentVersion=VERSION;
      const meta=document.querySelector('meta[name="app-version"]');
      if(meta)meta.content=String(VERSION);
      document.documentElement.dataset.contentVersion=String(VERSION);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>{el.textContent='v'+VERSION;el.style.visibility='';});
    }catch(e){}
  }

  styles();
  installWrappers();
  syncVisible();
  stamp();

  document.addEventListener('click',event=>{
    if(event.target?.closest?.('.question'))setTimeout(syncVisible,80);
  },true);
})();
