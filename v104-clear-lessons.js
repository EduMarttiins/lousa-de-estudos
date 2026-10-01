/* Lousa de Estudos v104 */
(()=>{
  if(window.__lousaV104)return;
  window.__lousaV104=true;

  function clearSubjects(){
    if(typeof subjects==='undefined'||!subjects)return;
    Object.values(subjects).forEach(subject=>{
      if(!subject)return;
      subject.lessons=[];
      subject.homeTitle='Nenhuma lição cadastrada';
      subject.homeDescription='As lições anteriores foram removidas. A matéria está pronta para receber novos conteúdos.';
      subject.chips=['0 lições'];
      subject.hint='Nenhuma lição disponível no momento.';
    });
    try{lessons=[];}catch(e){}
    try{activeLesson=null;}catch(e){}
  }

  function showEmpty(){
    const grid=document.getElementById('topicGrid');
    if(!grid)return;
    grid.innerHTML='<div class="v104Empty"><strong>Nenhuma lição cadastrada</strong><p>Esta matéria está pronta para receber novos conteúdos.</p></div>';
  }

  clearSubjects();

  try{
    const oldOpen=openSubject;
    openSubject=function(){
      clearSubjects();
      const out=oldOpen.apply(this,arguments);
      clearSubjects();
      showEmpty();
      return out;
    };
  }catch(e){}

  try{
    renderTopicCards=function(){clearSubjects();showEmpty();};
  }catch(e){}

  const style=document.createElement('style');
  style.textContent='.v104Empty{grid-column:1/-1;padding:32px 22px;border:1px dashed #cbd5e1;border-radius:22px;background:#fff;text-align:center}.v104Empty strong{display:block;font-size:20px;margin-bottom:8px}.v104Empty p{margin:0;color:#64748b}';
  document.head.appendChild(style);

  setTimeout(()=>{
    clearSubjects();
    try{renderSubjectCards();updateProgress();}catch(e){}
  },0);
})();