/* Lousa de Estudos v78 — respostas e alternativas ancoradas no conteúdo dos livros */
(()=>{
  if(window.__lousaV78BookGrounded)return;
  window.__lousaV78BookGrounded=true;

  const TARGETS=['science','portuguese','geography','history'];
  let originals=null;
  let lastRenderedLesson=null;

  /* Ajustes curados diretamente do Livro do Estudante — Ciências, Volume 3. */
  const BOOK_OVERRIDES={
    q2:{options:['Grupos de órgãos que trabalham juntos','Células que formam tecidos','Partes externas do corpo'],correct:0},
    s_org9:{options:['Porque os órgãos trabalham juntos','Porque os órgãos são células','Porque os órgãos ficam isolados'],correct:0},
    s_org10:{options:['Coração — mantém o sangue circulando','Pulmões — armazenam urina','Bexiga — filtra o sangue'],correct:0},

    q4:{options:['Troca de gases entre o ar e o sangue','Entrada do alimento no estômago','Armazenamento da urina'],correct:0},
    s_resp9:{options:['Inspiração: entrada de ar; expiração: saída de ar','Inspiração: saída de ar; expiração: entrada de ar','Inspiração e expiração são iguais'],correct:0},
    s_resp10:{options:['Nariz ou boca → traqueia → brônquios → pulmões','Nariz → esôfago → estômago','Boca → rins → bexiga'],correct:0},

    q6:{options:['Artérias levam sangue do coração; veias trazem de volta','Veias levam sangue para fora; artérias trazem de volta','Artérias e veias armazenam o sangue'],correct:0},
    s_card9:{options:['Transportar gases, nutrientes e outras substâncias','Produzir e eliminar urina','Processar os alimentos ingeridos'],correct:0},
    s_card10:{options:['Artérias, veias e capilares são vasos sanguíneos','Artérias, ureteres e brônquios são vasos sanguíneos','Veias, uretra e traqueia são vasos sanguíneos'],correct:0},

    q7:{options:['Bexiga urinária','Rins','Ureteres'],correct:0},
    q8:{options:['Facilita a filtração de resíduos e toxinas pelos rins','Faz a bexiga produzir a urina','Impede a eliminação de toxinas'],correct:0},
    s_uri3:{options:['Rins','Bexiga urinária','Ureteres'],correct:0},
    s_uri4:{options:['Ureteres','Rins','Bexiga urinária'],correct:0},
    s_uri5:{options:['Uretra','Ureteres','Bexiga urinária'],correct:0},
    s_uri6:{options:['Armazenar a urina','Filtrar o sangue','Transportar a urina dos rins'],correct:0},
    s_uri7:{options:['Facilita a filtração pelos rins','Substitui os nutrientes dos alimentos','Faz os ureteres filtrarem o sangue'],correct:0},
    s_uri8:{options:['Rins → ureteres → bexiga → uretra','Bexiga → uretra → rins → ureteres','Ureteres → rins → bexiga → uretra'],correct:0},
    s_uri9:{options:['Rins → ureteres → bexiga → uretra','Bexiga → rins → ureteres → uretra','Uretra → bexiga → rins → ureteres'],correct:0},
    s_uri10:{options:['A água facilita a filtração pelos rins','A água faz a bexiga produzir urina','A água transforma ureteres em filtros'],correct:0},

    q10:{options:['Delgado absorve nutrientes; grosso absorve água','Delgado absorve água; grosso filtra o sangue','Delgado produz urina; grosso digere na boca'],correct:0},
    s_dig9:{options:['Boca → faringe → esôfago → estômago → intestinos','Boca → traqueia → pulmões → intestinos','Estômago → boca → esôfago → intestinos'],correct:0},
    s_dig10:{options:['Delgado absorve nutrientes; grosso absorve água','Delgado absorve água; grosso absorve oxigênio','Os dois armazenam a urina'],correct:0},

    s_ali9:{options:['Leite, banana e água','Água, leite e banana','Banana, água e leite'],correct:0},
    s_ali10:{options:['Nutrientes diferentes exercem funções diferentes','Todos os nutrientes têm a mesma função','Somente carboidratos são necessários'],correct:0},

    q13:{options:['Fornece nutrientes necessários em quantidade adequada','É formada sempre pelos mesmos alimentos','É composta apenas por alimentos industrializados'],correct:0},
    s_sau9:{options:['Fruta, iogurte e água','Bala, refrigerante e salgadinho','Somente um alimento todos os dias'],correct:0},
    s_sau10:{options:['A variedade fornece diferentes nutrientes','A monotonia aumenta todos os nutrientes','Todos os alimentos têm os mesmos nutrientes'],correct:0},

    q16:{options:['Alimentação saudável e atividade física','Excesso de alimentos e falta de exercícios','Pouca água e pouco sono'],correct:0},
    s_dis9:{options:['Desnutrição: falta de nutrientes; obesidade: excesso de massa corpórea','Desnutrição e obesidade são a mesma condição','Desnutrição: excesso de gordura; obesidade: falta de nutrientes'],correct:0},
    s_dis10:{options:['Alimentação saudável, atividade física e água','Excesso de alimentos, pouco exercício e pouca água','Pular refeições, dormir pouco e não brincar'],correct:0}
  };

  function norm(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}
  function stripPrefix(v){return String(v||'').replace(/^(Resposta correta|Ideia esperada|Ideia principal|Resultado esperado|Exemplos válidos|Uma resposta possível)\s*:\s*/i,'').trim()}
  function concise(v,max=105){
    let s=stripPrefix(v).replace(/\s+/g,' ').trim();
    if(!s)return '';
    if(s.length<=max)return s;
    const parts=s.split(/(?<=[.!?])\s+/);
    if(parts[0]&&parts[0].length<=max)return parts[0];
    const cut=s.slice(0,max);
    const p=Math.max(cut.lastIndexOf('; '),cut.lastIndexOf(', '),cut.lastIndexOf(' '));
    return (p>55?cut.slice(0,p):cut).trim();
  }
  function answerFor(q){
    const expected=stripPrefix(q?.expected);
    const meta=/^(um|uma|dois|duas|tr[eê]s|citar|criar|escrever|apresentar|explicar|relacionar|diferenciar|destacar|escolher|resumir)\b/i;
    if(expected&&!meta.test(expected))return concise(expected);
    if(q?.explanation)return concise(q.explanation);
    return concise(expected);
  }
  function hash(v){let h=2166136261;for(const ch of String(v||'')){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}

  function buildMap(lessons){
    const map=new Map();
    (lessons||[]).forEach(lesson=>(lesson.questions||[]).forEach(q=>map.set(String(q.id||''),{question:q,lesson})));
    return map;
  }
  function extractArray(source,name,nextName){
    const marker='const '+name+'='; const next='const '+nextName+'=';
    const start=source.indexOf(marker); const end=source.indexOf(next,start+marker.length);
    if(start<0||end<0)return [];
    const raw=source.slice(start+marker.length,end).trim().replace(/;\s*$/,'');
    try{return JSON.parse(raw)}catch(e){console.warn('v78 parse',name,e);return []}
  }

  function sourceBank(lesson,excludeId){
    const out=[];
    (lesson?.questions||[]).forEach(q=>{
      if(String(q.id||'')===String(excludeId||''))return;
      if(q.type==='mcq'&&Array.isArray(q.options)){
        const a=concise(q.options[Number(q.correct)||0],90); if(a)out.push(a);
      }else{
        const a=answerFor(q); if(a)out.push(a);
      }
    });
    return [...new Map(out.map(x=>[norm(x),x])).values()];
  }

  function groundedOptions(subjectKey,original,lesson){
    const id=String(original?.id||'');
    if(subjectKey==='science'&&BOOK_OVERRIDES[id])return BOOK_OVERRIDES[id];
    const correct=answerFor(original);
    if(!correct)return null;
    const pool=sourceBank(lesson,id).filter(x=>norm(x)!==norm(correct));
    if(pool.length<2)return null;
    const seed=hash(subjectKey+':'+id);
    const first=pool[seed%pool.length];
    let second=pool[(seed*7+3)%pool.length];
    if(norm(second)===norm(first))second=pool.find(x=>norm(x)!==norm(first))||pool[0];
    let options=[correct,first,second];
    const rot=seed%3;
    options=[options[rot],options[(rot+1)%3],options[(rot+2)%3]];
    return {options,correct:options.indexOf(correct)};
  }

  function restoreQuestion(subjectKey,q){
    if(!TARGETS.includes(subjectKey)||!q)return;
    const id=String(q.id||'');
    const entry=originals?.[subjectKey]?.get(id);
    const original=entry?.question;
    const lesson=entry?.lesson;
    if(!original)return;

    if(original.type==='mcq'&&Array.isArray(original.options)){
      /* Questão já existente: preserva o conteúdo original da atividade. */
      q.type='mcq'; q.options=[...original.options]; q.correct=Number(original.correct)||0;
      q.explanation=original.explanation; q.expected=original.expected; q.review=original.review; q.reviewLabel=original.reviewLabel;
      return;
    }

    const grounded=groundedOptions(subjectKey,original,lesson);
    if(!grounded)return;
    q.type='mcq'; q.options=[...grounded.options]; q.correct=grounded.correct;
    q.explanation=original.explanation; q.expected=original.expected;
    q.reviewLabel='📖 Responda pelo texto do livro';
    q.review='Leia o texto da lição e escolha a alternativa que corresponde ao conteúdo estudado.';
    q.__bookGrounded=true;
  }

  function applyAll(){
    try{
      TARGETS.forEach(key=>(subjects?.[key]?.lessons||[]).forEach(lesson=>(lesson.questions||[]).forEach(q=>restoreQuestion(key,q))));
    }catch(e){console.warn('v78 apply',e)}
  }

  function replaceOptionText(label,text){
    if(!label)return;
    const input=label.querySelector('input');
    [...label.childNodes].forEach(node=>{if(node!==input)node.remove()});
    const span=document.createElement('span'); span.className='v78OptionText'; span.textContent=String(text||''); label.appendChild(span);
  }
  function syncCard(card,q){
    if(!card||!q||!Array.isArray(q.options))return;
    const labels=[...card.querySelectorAll('.option')];
    labels.forEach((label,i)=>{if(i<q.options.length)replaceOptionText(label,q.options[i])});
  }
  function syncLesson(lesson){
    if(!lesson)return;
    const key=String(currentSubjectKey||'');
    if(!TARGETS.includes(key))return;
    (lesson.questions||[]).forEach(q=>restoreQuestion(key,q));
    const cards=[...document.querySelectorAll('#lessonContent .question')];
    (lesson.questions||[]).forEach((q,i)=>syncCard(cards[i],q));
  }
  function syncVisible(){if(lastRenderedLesson)syncLesson(lastRenderedLesson)}

  function installWrappers(){
    if(typeof buildQuestion==='function'&&!buildQuestion.__v78Wrapped){
      const previous=buildQuestion;
      buildQuestion=function(q,num){
        try{restoreQuestion(String(currentSubjectKey||''),q)}catch(e){}
        const card=previous(q,num);
        try{restoreQuestion(String(currentSubjectKey||''),q);syncCard(card,q)}catch(e){}
        return card;
      };
      buildQuestion.__v78Wrapped=true;
    }
    if(typeof renderLesson==='function'&&!renderLesson.__v78Wrapped){
      const previous=renderLesson;
      renderLesson=function(lesson){
        lastRenderedLesson=lesson;
        try{(lesson?.questions||[]).forEach(q=>restoreQuestion(String(currentSubjectKey||''),q))}catch(e){}
        const result=previous(lesson);
        syncLesson(lesson);
        [0,120,400,900].forEach(ms=>setTimeout(()=>syncLesson(lesson),ms));
        return result;
      };
      renderLesson.__v78Wrapped=true;
    }
  }

  async function loadOriginals(){
    try{
      const response=await fetch('./index.html?raw=v78&ts='+Date.now(),{cache:'no-store'});
      if(!response.ok)throw new Error('base indisponível');
      const source=await response.text();
      originals={
        science:buildMap(extractArray(source,'scienceLessons','portugueseLessons')),
        portuguese:buildMap(extractArray(source,'portugueseLessons','mathLessons')),
        geography:buildMap(extractArray(source,'geographyLessons','historyLessons')),
        history:buildMap(extractArray(source,'historyLessons','subjects'))
      };
      applyAll(); installWrappers(); syncVisible();
      [100,350,800,1500].forEach(ms=>setTimeout(()=>{applyAll();syncVisible()},ms));
      window.__lousaV78OriginalsReady=true;
    }catch(e){console.warn('v78 originals',e)}
  }

  if(!document.getElementById('v78BookStyles')){
    const style=document.createElement('style'); style.id='v78BookStyles';
    style.textContent='.option .v78OptionText{display:block;flex:1;min-width:0;white-space:normal;line-height:1.42}.option{min-height:58px!important;align-items:center!important}.option input{flex:0 0 auto!important;margin-top:0!important}';
    document.head.appendChild(style);
  }

  installWrappers();
  loadOriginals();
  window.__lousaCurrentContentVersion=78;
  window.__lousaV78Ready=true;
})();
