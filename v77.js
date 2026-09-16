/* Lousa de Estudos v77 — alternativas curtas, simples e relacionadas ao conteúdo */
(()=>{
  if(window.__lousaV77ShortOptions)return;
  window.__lousaV77ShortOptions=true;

  const TARGETS=['science','portuguese','geography','history'];
  let originalMaps=null;

  /* Perguntas de Ciências que eram dissertativas no livro-base e agora precisam de
     múltipla escolha curta. As erradas pertencem ao mesmo assunto da pergunta. */
  const SCIENCE_OPEN={
    q2:{options:['Órgãos trabalhando juntos','Um órgão sozinho','Apenas ossos'],correct:0},
    s_org9:{options:['Porque trabalham em sistemas','Porque todos fazem a mesma função','Porque ficam separados'],correct:0},
    s_org10:{options:['Coração — bombeia sangue','Estômago — bombeia sangue','Rins — fazem respiração'],correct:0},

    q4:{options:['Troca de gases','Digestão','Formação da urina'],correct:0},
    s_resp9:{options:['Inspirar: ar entra; expirar: ar sai','Inspirar: ar sai; expirar: ar entra','Os dois fazem o ar entrar'],correct:0},
    s_resp10:{options:['Nariz → traqueia → brônquios → alvéolos','Nariz → estômago → alvéolos','Boca → rins → pulmões'],correct:0},

    q6:{options:['Artérias saem; veias voltam','Veias saem; artérias voltam','As duas levam só ao estômago'],correct:0},
    s_card9:{options:['Levar oxigênio e nutrientes','Produzir urina','Digestionar alimentos'],correct:0},
    s_card10:{options:['Artérias saem, veias voltam, capilares trocam','Todos fazem a mesma função','Capilares armazenam sangue'],correct:0},

    q8:{options:['Ajuda os rins a filtrar resíduos','Faz a bexiga produzir urina','Impede a formação da urina'],correct:0},
    s_uri9:{options:['Rins → ureteres → bexiga → uretra','Bexiga → rins → uretra','Rins → bexiga → ureteres'],correct:0},
    s_uri10:{options:['Porque os rins precisam de água','Porque a bexiga para de funcionar','Porque a água impede a urina'],correct:0},

    q10:{options:['Delgado: nutrientes; grosso: água','Delgado: urina; grosso: sangue','Os dois fazem a mesma função'],correct:0},
    s_dig9:{options:['Boca → esôfago → estômago → intestinos','Boca → pulmões → intestinos','Estômago → boca → intestinos'],correct:0},
    s_dig10:{options:['Delgado: nutrientes; grosso: água','Delgado: água; grosso: oxigênio','Os dois só armazenam alimento'],correct:0},

    s_ali9:{options:['Leite, banana e água','Banana, leite e água','Água, banana e leite'],correct:0},
    s_ali10:{options:['Cada nutriente tem uma função','Todos os nutrientes são iguais','Só carboidrato é necessário'],correct:0},

    q13:{options:['Variada e equilibrada','Só doces','Sempre a mesma comida'],correct:0},
    s_sau9:{options:['Fruta, iogurte e água','Bala e refrigerante','Só salgadinho'],correct:0},
    s_sau10:{options:['Alimentos diferentes têm nutrientes diferentes','Todo alimento tem o mesmo nutriente','Variedade faz mal'],correct:0},

    q16:{options:['Alimentação saudável e atividade física','Refrigerante e sedentarismo','Pular refeições e dormir pouco'],correct:0},
    s_dis9:{options:['Desnutrição: falta; obesidade: excesso de gordura','As duas são iguais','Desnutrição: excesso; obesidade: falta'],correct:0},
    s_dis10:{options:['Boa alimentação, água e atividade física','Só doces, pouco sono e pouca água','Pular refeições e ficar parado'],correct:0}
  };

  function subjectForLesson(lesson){
    try{
      for(const key of TARGETS){
        if((subjects?.[key]?.lessons||[]).includes(lesson))return key;
      }
    }catch(e){}
    return '';
  }

  function buildMap(lessons){
    const map=new Map();
    (lessons||[]).forEach(lesson=>{
      (lesson.questions||[]).forEach(q=>map.set(String(q.id||''),{question:q,lessonKey:String(lesson.key||'')}));
    });
    return map;
  }

  function extractArray(source,name,nextName){
    const marker='const '+name+'=';
    const next='const '+nextName+'=';
    const start=source.indexOf(marker);
    const end=source.indexOf(next,start+marker.length);
    if(start<0||end<0)return [];
    let raw=source.slice(start+marker.length,end).trim().replace(/;\s*$/,'');
    try{return JSON.parse(raw)}catch(e){console.warn('v77 parse '+name,e);return []}
  }

  async function loadOriginals(){
    try{
      const response=await fetch('./index.html?raw=v77&ts='+Date.now(),{cache:'no-store'});
      if(!response.ok)throw new Error('base indisponível');
      const source=await response.text();
      originalMaps={
        science:buildMap(extractArray(source,'scienceLessons','portugueseLessons')),
        portuguese:buildMap(extractArray(source,'portugueseLessons','mathLessons')),
        geography:buildMap(extractArray(source,'geographyLessons','historyLessons')),
        history:buildMap(extractArray(source,'historyLessons','subjects'))
      };
      applyAll();
      syncVisibleLesson();
      window.__lousaV77OriginalsReady=true;
    }catch(e){
      console.warn('v77 originals',e);
      /* Mesmo sem baixar a base, as perguntas abertas de Ciências recebem as opções curtas. */
      applyScienceOpen();
      syncVisibleLesson();
    }
  }

  function restoreQuestion(subjectKey,q){
    if(!q||!TARGETS.includes(subjectKey))return;
    const id=String(q.id||'');
    const original=originalMaps?.[subjectKey]?.get(id)?.question;

    /* Questão que já nasceu como múltipla escolha: usa exatamente as alternativas
       curtas do conteúdo original. Isso desfaz a regra da v76 que alongava palavras. */
    if(original?.type==='mcq' && Array.isArray(original.options)){
      q.options=[...original.options];
      q.correct=Number(original.correct)||0;
      q.type='mcq';
      return;
    }

    /* Questão originalmente aberta em Ciências: versão curta criada para múltipla escolha. */
    if(subjectKey==='science' && SCIENCE_OPEN[id]){
      q.options=[...SCIENCE_OPEN[id].options];
      q.correct=SCIENCE_OPEN[id].correct;
      q.type='mcq';
      q.reviewLabel='🧠 Escolha a melhor resposta';
      q.review='Leia a pergunta e escolha a alternativa mais adequada.';
    }
  }

  function applyLesson(subjectKey,lesson){
    if(!TARGETS.includes(subjectKey)||!lesson)return;
    (lesson.questions||[]).forEach(q=>restoreQuestion(subjectKey,q));
  }

  function applyAll(){
    try{
      TARGETS.forEach(key=>(subjects?.[key]?.lessons||[]).forEach(lesson=>applyLesson(key,lesson)));
    }catch(e){console.warn('v77 apply',e)}
  }

  function applyScienceOpen(){
    try{
      (subjects?.science?.lessons||[]).forEach(lesson=>{
        (lesson.questions||[]).forEach(q=>{
          const item=SCIENCE_OPEN[String(q.id||'')];
          if(!item)return;
          q.options=[...item.options];q.correct=item.correct;q.type='mcq';
        });
      });
    }catch(e){}
  }

  function replaceOptionText(label,text){
    if(!label)return;
    const input=label.querySelector('input');
    [...label.childNodes].forEach(node=>{if(node!==input)node.remove()});
    const span=document.createElement('span');
    span.className='v77OptionText';
    span.textContent=String(text||'');
    label.appendChild(span);
  }

  function syncCard(card,q){
    if(!card||!q||!Array.isArray(q.options))return;
    const labels=[...card.querySelectorAll('.option')];
    labels.forEach((label,i)=>{if(i<q.options.length)replaceOptionText(label,q.options[i])});
  }

  function syncLesson(lesson){
    if(!lesson)return;
    const subjectKey=subjectForLesson(lesson);
    if(!TARGETS.includes(subjectKey))return;
    applyLesson(subjectKey,lesson);
    const cards=[...document.querySelectorAll('#lessonContent .question')];
    (lesson.questions||[]).forEach((q,i)=>syncCard(cards[i],q));
  }

  function syncVisibleLesson(){
    try{
      const key=String(currentSubjectKey||'');
      if(!TARGETS.includes(key))return;
      const visible=document.querySelector('.topicView.show');
      if(!visible)return;
      const lesson=(subjects?.[key]?.lessons||[]).find(l=>{
        const el=document.querySelector('[data-topic="'+String(l.key||'')+'"]');
        return el&&el.classList.contains('active');
      });
      if(lesson)syncLesson(lesson);
    }catch(e){}
  }

  function addStyles(){
    if(document.getElementById('v77ShortOptionStyles'))return;
    const style=document.createElement('style');
    style.id='v77ShortOptionStyles';
    style.textContent='.option .v77OptionText{display:block;flex:1;min-width:0;white-space:normal;line-height:1.4}.option{min-height:58px!important;align-items:center!important}.option input{flex:0 0 auto!important;margin-top:0!important}';
    document.head.appendChild(style);
  }

  addStyles();
  applyScienceOpen();

  /* v77 fica por fora dos wrappers antigos. Assim, mesmo que a v76 altere uma opção
     durante a montagem, v77 restaura a alternativa curta depois. */
  if(typeof buildQuestion==='function'&&!buildQuestion.__v77Wrapped){
    const previous=buildQuestion;
    const wrapped=function(q,num){
      const card=previous(q,num);
      try{
        const key=String(currentSubjectKey||'');
        restoreQuestion(key,q);
        syncCard(card,q);
        setTimeout(()=>{restoreQuestion(key,q);syncCard(card,q)},0);
        setTimeout(()=>{restoreQuestion(key,q);syncCard(card,q)},150);
      }catch(e){}
      return card;
    };
    wrapped.__v77Wrapped=true;
    buildQuestion=wrapped;
  }

  if(typeof renderLesson==='function'&&!renderLesson.__v77Wrapped){
    const previous=renderLesson;
    const wrapped=function(lesson){
      const result=previous(lesson);
      syncLesson(lesson);
      setTimeout(()=>syncLesson(lesson),0);
      setTimeout(()=>syncLesson(lesson),150);
      setTimeout(()=>syncLesson(lesson),450);
      return result;
    };
    wrapped.__v77Wrapped=true;
    renderLesson=wrapped;
  }

  loadOriginals();
  window.__lousaCurrentContentVersion=77;
  window.__lousaV77Ready=true;
})();
