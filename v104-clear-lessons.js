/* Lousa de Estudos v104 — aplicativo sem lições cadastradas */
(()=>{
  if(window.__lousaV104)return;
  window.__lousaV104=true;
  const locked=new WeakSet();

  function lockSubject(subject){
    if(!subject||typeof subject!=='object'||locked.has(subject))return;
    const empty=[];
    try{
      Object.defineProperty(subject,'lessons',{
        configurable:true,
        enumerable:true,
        get(){return empty;},
        set(){}
      });
    }catch(e){
      subject.lessons=empty;
    }
    subject.homeTitle='Nenhuma lição cadastrada';
    subject.homeDescription='As lições anteriores foram removidas. A matéria está pronta para receber novos conteúdos.';
    subject.chips=['0 lições'];
    subject.hint='Nenhuma lição disponível no momento.';
    locked.add(subject);
  }

  function clearSubjects(){
    try{
      if(typeof subjects!=='undefined'&&subjects)Object.values(subjects).forEach(lockSubject);
    }catch(e){}
    try{lessons=[];}catch(e){}
    try{activeLesson=null;}catch(e){}
  }

  function showEmpty(){
    const grid=document.getElementById('topicGrid');
    if(!grid)return;
    grid.innerHTML='<div class="v104Empty"><div class="v104EmptyIcon">📭</div><strong>Nenhuma lição cadastrada</strong><p>Esta matéria está pronta para receber novos conteúdos.</p></div>';
  }

  const style=document.createElement('style');
  style.id='v104ClearStyles';
  style.textContent='.v104Empty{grid-column:1/-1;padding:32px 22px;border:1px dashed #cbd5e1;border-radius:22px;background:#fff;text-align:center}.v104EmptyIcon{font-size:38px}.v104Empty strong{display:block;font-size:20px;margin:8px 0}.v104Empty p{margin:0;color:#64748b;line-height:1.5}';
  document.head.appendChild(style);

  clearSubjects();

  try{allLessons=function(){clearSubjects();return[];};}catch(e){}

  try{
    const oldRenderSubjects=renderSubjectCards;
    renderSubjectCards=function(){
      clearSubjects();
      const out=oldRenderSubjects.apply(this,arguments);
      document.querySelectorAll('.subjectProgress').forEach(el=>el.textContent='0 de 0 concluídas');
      return out;
    };
  }catch(e){}

  try{
    renderTopicCards=function(){
      clearSubjects();
      showEmpty();
    };
  }catch(e){}

  try{
    const oldOpen=openSubject;
    openSubject=function(){
      clearSubjects();
      const out=oldOpen.apply(this,arguments);
      clearSubjects();
      showEmpty();
      try{updateProgress();}catch(e){}
      return out;
    };
  }catch(e){}

  document.addEventListener('click',()=>{
    setTimeout(()=>{
      clearSubjects();
      document.querySelectorAll('.subjectProgress').forEach(el=>el.textContent='0 de 0 concluídas');
      try{if(typeof updateProgress==='function')updateProgress();}catch(e){}
    },0);
  },true);

  setTimeout(()=>{
    clearSubjects();
    try{renderSubjectCards();}catch(e){}
    try{updateProgress();}catch(e){}
  },0);
})();