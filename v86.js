/* Lousa de Estudos v86 — texto completo com todas as respostas nas lições religiosas */
(()=>{
  if(window.__lousaV86ReligionFullText)return;
  window.__lousaV86ReligionFullText=true;

  const VERSION=86;

  function esc(text){
    return String(text||'').replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
  }

  function fullTextFromQuestions(lesson){
    const seen=new Set();
    const paragraphs=[];
    (lesson?.questions||[]).forEach(q=>{
      const text=String(q?.review||'').replace(/\s+/g,' ').trim();
      if(!text||seen.has(text))return;
      seen.add(text);
      paragraphs.push(text);
    });
    return paragraphs.map((p,i)=>`<p><strong>${i+1}.</strong> ${esc(p)}</p>`).join('');
  }

  function applyFullTexts(){
    try{
      if(window.__lousaV90ReligionExact)return true;
      const subject=subjects?.religion;
      if(!subject||!Array.isArray(subject.lessons))return false;
      subject.lessons.forEach(lesson=>{
        if(!Array.isArray(lesson.questions)||!lesson.questions.length)return;
        lesson.passageTitle='Texto completo para revisão — todas as respostas estão aqui';
        lesson.passage=`<div class="v86StudyNotice"><strong>📚 Como estudar:</strong> leia este texto antes das perguntas. Se tiver dúvida em qualquer questão, volte aqui: a informação necessária para responder está escrita neste texto.</div>${fullTextFromQuestions(lesson)}`;
        lesson.passageVisual=lesson.key?.includes('daniel')
          ? 'Daniel • Babilônia • sonhos • fidelidade • oração • confiança em Deus'
          : 'Karol Józef Wojtyła → sacerdote → bispo → cardeal → Papa João Paulo II';
      });
      return true;
    }catch(e){return false;}
  }

  function addStyles(){
    if(document.getElementById('v86ReligionTextStyle'))return;
    const style=document.createElement('style');
    style.id='v86ReligionTextStyle';
    style.textContent=`
      .v86StudyNotice{margin:0 0 16px;padding:13px 14px;border-radius:15px;background:#fff7d8;border:1px solid #ead79d;color:#5d481c;line-height:1.55}
      .readingText .v86StudyNotice strong{color:#5d481c}
      .readingText p{margin:0 0 12px;line-height:1.7}
      .readingText p:last-child{margin-bottom:0}
    `;
    document.head.appendChild(style);
  }

  function patchRenderLesson(){
    try{
      if(typeof renderLesson!=='function'||renderLesson.__v86ReligionFullText)return;
      const previous=renderLesson;
      const wrapped=function(lesson){
        if(!window.__lousaV90ReligionExact&&String(typeof currentSubjectKey!=='undefined'?currentSubjectKey:'')==='religion')applyFullTexts();
        return previous.apply(this,arguments);
      };
      wrapped.__v86ReligionFullText=true;
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
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>{
        if(!el.classList.contains('pending')&&el.textContent!=='v'+version)el.textContent='v'+version;
      });
    }catch(e){}
  }

  addStyles();
  applyFullTexts();
  patchRenderLesson();
  stampVersion();
  [250,800,1800,3200].forEach(ms=>setTimeout(()=>{
    if(!window.__lousaV90ReligionExact)applyFullTexts();
    patchRenderLesson();
    stampVersion();
  },ms));

  window.__lousaV86Ready=true;
})();
