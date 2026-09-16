/* Lousa de Estudos v77 — alternativas curtas, simples e relacionadas ao conteúdo */
(()=>{
  if(window.__lousaV77ShortOptions)return;
  window.__lousaV77ShortOptions=true;

  const TARGETS=['science','portuguese','geography','history'];
  let originalMaps=null;
  let lastRenderedLesson=null;

  /* Questões diretas do sistema urinário: opções curtas e do mesmo conteúdo. */
  const SCIENCE_DIRECT={
    q7:{options:['Bexiga','Rins','Ureteres'],correct:0},
    s_uri3:{options:['Rins','Bexiga','Ureteres'],correct:0},
    s_uri4:{options:['Ureteres','Rins','Bexiga'],correct:0},
    s_uri5:{options:['Uretra','Ureteres','Bexiga'],correct:0},
    s_uri6:{options:['Armazenar urina','Filtrar o sangue','Transportar a urina'],correct:0},
    s_uri7:{options:['Ajuda os rins','Substitui a alimentação','Impede a filtração'],correct:0}
  };

  /* Perguntas de Ciências que eram dissertativas e passaram a ser múltipla escolha. */
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
    s_uri10:{options:['Porque os rins precisam de água','Porque a bexiga produz água','Porque a água impede a urina'],correct:0},

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
      (lesson.questions||[]).forEach(q=>map.set(String(q.id||''),q));
    });
    return map;
  }

  function extractArray(source,name,nextName){
    const marker='const '+name+'=';
    const next='const '+nextName+'=';
    const start=source.indexOf(marker);
    const end=source.indexOf(next,start+marker.length);
    if(start<0||end<0)return [];
    const raw=source.slice(start+marker.length,end).trim().replace(/;\s*$/,'');
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
      if(lastRenderedLesson)syncLesson(lastRenderedLesson);
      window.__lousaV77OriginalsReady=true;
    }catch(e){
      console.warn('v77 originals',e);
      applyScienceOverrides();
      if(lastRenderedLesson)syncLesson(lastRenderedLesson);
    }
  }

  function setChoice(q,item){
    q.options=[...item.options];
    q.correct=item.correct;
    q.type='mcq';
    q.reviewLabel='🧠 Escolha a melhor resposta';
  }

  function restoreQuestion(subjectKey,q){
    if(!q||!TARGETS.includes(subjectKey))return;
    const id=String(q.id||'');

    /* Estes exemplos seguem exatamente o padrão pedido: Ureteres / Rins / Bexiga. */
    if(subjectKey==='science'&&SCIENCE_DIRECT[id]){
      setChoice(q,SCIENCE_DIRECT[id]);
      return;
    }

    /* Questões que já eram múltipla escolha voltam às alternativas originais do livro/app,
       que são curtas. Assim, palavras como Cérebro, Lenda e Ureteres não são alongadas. */
    const original=originalMaps?.[subjectKey]?.get(id);
    if(original?.type==='mcq'&&Array.isArray(original.options)){
      q.options=[...original.options];
      q.correct=Number(original.correct)||0;
      q.type='mcq';
      return;
    }

    if(subjectKey==='science'&&SCIENCE_OPEN[id]){
      setChoice(q,SCIENCE_OPEN[id]);
      q.review='Leia a pergunta e escolha a alternativa mais adequada.';
    }
  }

  function applyLesson(subjectKey,lesson){
    if(!TARGETS.includes(subjectKey)||!lesson)return;
    (lesson.questions||[]).forEach(q=>restoreQuestion(subjectKey,q));
  }

  function applyAll(){
    try{TARGETS.forEach(key=>(subjects?.[key]?.lessons||[]).forEach(lesson=>applyLesson(key,lesson)))}catch(e){}
  }

  function applyScienceOverrides(){
    try{
      (subjects?.science?.lessons||[]).forEach(lesson=>{
        (lesson.questions||[]).forEach(q=>{
          const id=String(q.id||'');
          const item=SCIENCE_DIRECT[id]||SCIENCE_OPEN[id];
          if(item)setChoice(q,item);
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

  function addStyles(){
    if(document.getElementById('v77ShortOptionStyles'))return;
    const style=document.createElement('style');
    style.id='v77ShortOptionStyles';
    style.textContent='.option .v77OptionText{display:block;flex:1;min-width:0;white-space:normal;line-height:1.4}.option{min-height:58px!important;align-items:center!important}.option input{flex:0 0 auto!important;margin-top:0!important}';
    document.head.appendChild(style);
  }

  addStyles();
  applyScienceOverrides();

  /* A v77 roda depois da v76 para desfazer qualquer alongamento feito pela regra antiga. */
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
      lastRenderedLesson=lesson;
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
