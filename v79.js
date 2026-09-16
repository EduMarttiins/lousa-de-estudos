/* Lousa de Estudos v79 — precisão de linguagem no sistema digestório */
(()=>{
  if(window.__lousaV79DigestiveWording)return;
  window.__lousaV79DigestiveWording=true;

  const NEW_TEXT='Onde começa o processo de digestão?';
  const NEW_OPTIONS=['Na boca','No estômago','No intestino delgado'];
  const NEW_EXPLANATION='A digestão começa na boca. Os dentes cortam e trituram os alimentos, e a saliva ajuda a amolecê-los para que possam ser ingeridos com mais facilidade.';

  function norm(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}

  function isTarget(q){
    const t=norm(q?.text);
    return t.includes('em qual orgao a digestao comeca')||t.includes('onde comeca o processo de digestao');
  }

  function patchQuestion(q){
    if(!q||!isTarget(q))return false;
    q.text=NEW_TEXT;
    q.type='mcq';
    q.options=[...NEW_OPTIONS];
    q.correct=0;
    q.explanation=NEW_EXPLANATION;
    q.expected='Resposta correta: na boca.';
    q.reviewLabel='📖 Responda pelo texto do livro';
    q.review='O livro explica em qual parte do sistema digestório a digestão se inicia.';
    q.__v79DigestiveWording=true;
    return true;
  }

  function patchLesson(lesson){
    if(!lesson)return false;
    let changed=false;
    (lesson.questions||[]).forEach(q=>{if(patchQuestion(q))changed=true});
    return changed;
  }

  function patchAll(){
    try{(subjects?.science?.lessons||[]).forEach(patchLesson)}catch(e){}
  }

  function syncCard(card,q){
    if(!card||!q||!isTarget(q))return;
    const title=card.querySelector('.questionText,.question-text,h3,h4');
    if(title)title.textContent=NEW_TEXT;
    const labels=[...card.querySelectorAll('.option')];
    labels.forEach((label,i)=>{
      if(i>=NEW_OPTIONS.length)return;
      const input=label.querySelector('input');
      [...label.childNodes].forEach(node=>{if(node!==input)node.remove()});
      const span=document.createElement('span');
      span.className='v79OptionText';
      span.textContent=NEW_OPTIONS[i];
      label.appendChild(span);
    });
  }

  function syncLesson(lesson){
    if(!lesson)return;
    patchLesson(lesson);
    const cards=[...document.querySelectorAll('#lessonContent .question')];
    (lesson.questions||[]).forEach((q,i)=>{if(isTarget(q))syncCard(cards[i],q)});
  }

  patchAll();

  if(typeof buildQuestion==='function'&&!buildQuestion.__v79Wrapped){
    const previous=buildQuestion;
    buildQuestion=function(q,num){
      patchQuestion(q);
      const card=previous(q,num);
      patchQuestion(q);
      syncCard(card,q);
      return card;
    };
    buildQuestion.__v79Wrapped=true;
  }

  if(typeof renderLesson==='function'&&!renderLesson.__v79Wrapped){
    const previous=renderLesson;
    renderLesson=function(lesson){
      patchLesson(lesson);
      const result=previous(lesson);
      patchLesson(lesson);
      syncLesson(lesson);
      [0,150,500,1000,1800].forEach(ms=>setTimeout(()=>{patchLesson(lesson);syncLesson(lesson)},ms));
      return result;
    };
    renderLesson.__v79Wrapped=true;
  }

  [0,150,500,1200,2200].forEach(ms=>setTimeout(patchAll,ms));
  window.__lousaCurrentContentVersion=79;
  window.__lousaV79Ready=true;
})();
