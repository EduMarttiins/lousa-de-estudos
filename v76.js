/* Lousa de Estudos v76 — restaura texto completo das alternativas e corrige questões do sistema urinário */
(()=>{
  if(window.__lousaV76FullOptions)return;
  window.__lousaV76FullOptions=true;

  const TARGET_SUBJECTS=new Set(['science','portuguese','geography','history']);
  const BAD_SHORT=/^[A-Za-zÀ-ÿ]{1,6}(?:\.{3}|…)$|^.{0,9}$/;
  const GENERIC=/(não existe relação entre os elementos|o conteúdo mostra o contrário|alternativa não corresponde|afirmação contradiz|exemplo que não tem relação|nenhum dos exemplos estudados|exatamente iguais e não possuem nenhuma diferença|não podem ser comparados|ignora as pistas do texto|interpretação não é sustentada)/i;

  const OVERRIDES={
    s_uri9:{
      options:[
        'A urina é formada nos rins, segue pelos ureteres, fica armazenada na bexiga e é eliminada pela uretra.',
        'A urina é formada na bexiga, sobe pelos ureteres até os rins e depois sai pela uretra.',
        'A urina é formada nos rins, passa diretamente para a uretra e só depois chega à bexiga.'
      ],
      correct:0
    },
    s_uri10:{
      options:[
        'A falta de água pode dificultar o funcionamento adequado do organismo e dos rins, deixando a urina mais concentrada.',
        'Beber pouca água facilita a filtração dos rins, elimina resíduos mais rapidamente e deixa a urina mais diluída.',
        'Ficar longos períodos sem beber água não altera o funcionamento dos rins nem a concentração da urina.'
      ],
      correct:0
    }
  };

  function currentSubjectIsTarget(){
    try{return TARGET_SUBJECTS.has(String(currentSubjectKey||''));}catch(e){return false;}
  }

  function normalizeQuestion(q){
    if(!q||!currentSubjectIsTarget())return;
    const fixed=OVERRIDES[String(q.id||'')];
    if(fixed){
      q.options=[...fixed.options];
      q.correct=fixed.correct;
      q.type='mcq';
      q.reviewLabel='🧠 Escolha a melhor resposta';
      return;
    }
    if(!Array.isArray(q.options)||q.options.length<2)return;
    const bad=q.options.some(opt=>BAD_SHORT.test(String(opt||'').trim())||GENERIC.test(String(opt||'')));
    if(!bad)return;

    const exp=String(q.explanation||q.expected||'').replace(/^(Resposta correta|Ideia esperada|Ideia principal|Resultado esperado|Exemplos válidos)\s*:\s*/i,'').trim();
    const theme=String(q.text||'').toLowerCase();
    let wrong=[];
    if(/urina|rim|bexiga|uretr|ureter|hidrata|água/.test(theme)){
      wrong=[
        'A bexiga produz a urina e os rins servem apenas para armazená-la antes da eliminação.',
        'Os ureteres levam a urina para fora do corpo, enquanto a uretra leva a urina dos rins até a bexiga.'
      ];
    }else if(/respira|pulm|alvéol|diafragma|oxig/.test(theme)){
      wrong=[
        'A troca de gases acontece principalmente na traqueia, sem participação dos alvéolos.',
        'Na inspiração o ar sai dos pulmões e, na expiração, o ar entra no corpo.'
      ];
    }else if(/digest|estômago|intestino|alimento/.test(theme)){
      wrong=[
        'A digestão começa apenas no estômago e a boca não participa do processo.',
        'O intestino grosso é o principal local de absorção dos nutrientes dos alimentos.'
      ];
    }else{
      wrong=[
        'Essa opção troca uma informação importante apresentada no texto de revisão.',
        'Essa opção apresenta uma relação diferente da explicada na lição.'
      ];
    }
    const correct=exp||String(q.options[q.correct]||'').trim();
    q.options=[correct,wrong[0],wrong[1]];
    q.correct=0;
    q.type='mcq';
  }

  function setFullLabelText(label,text){
    if(!label)return;
    const input=label.querySelector('input');
    const keep=[];
    if(input)keep.push(input);
    [...label.childNodes].forEach(node=>{if(!keep.includes(node))node.remove();});
    if(input){
      const span=document.createElement('span');
      span.className='v76OptionText';
      span.textContent=String(text||'');
      label.appendChild(span);
    }else{
      label.textContent=String(text||'');
    }
  }

  function syncCard(card,q){
    if(!card||!q||!Array.isArray(q.options)||!currentSubjectIsTarget())return;
    const labels=[...card.querySelectorAll('.option')];
    labels.forEach((label,index)=>{
      if(index<q.options.length)setFullLabelText(label,q.options[index]);
    });
  }

  function syncLesson(lesson){
    if(!lesson||!currentSubjectIsTarget())return;
    const cards=[...document.querySelectorAll('#lessonContent .question')];
    (lesson.questions||[]).forEach((q,index)=>{
      normalizeQuestion(q);
      syncCard(cards[index],q);
    });
  }

  function addStyles(){
    if(document.getElementById('v76FullOptionStyles'))return;
    const style=document.createElement('style');
    style.id='v76FullOptionStyles';
    style.textContent='.option .v76OptionText{display:block;flex:1;min-width:0;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;line-height:1.45}.option{white-space:normal!important;overflow:visible!important;text-overflow:clip!important}';
    document.head.appendChild(style);
  }

  addStyles();

  if(typeof buildQuestion==='function'&&!buildQuestion.__v76Wrapped){
    const previous=buildQuestion;
    const wrapped=function(q,num){
      normalizeQuestion(q);
      const card=previous(q,num);
      syncCard(card,q);
      setTimeout(()=>syncCard(card,q),0);
      setTimeout(()=>syncCard(card,q),120);
      return card;
    };
    wrapped.__v76Wrapped=true;
    buildQuestion=wrapped;
  }

  if(typeof renderLesson==='function'&&!renderLesson.__v76Wrapped){
    const previous=renderLesson;
    const wrapped=function(lesson){
      (lesson?.questions||[]).forEach(normalizeQuestion);
      const result=previous(lesson);
      syncLesson(lesson);
      setTimeout(()=>syncLesson(lesson),0);
      setTimeout(()=>syncLesson(lesson),120);
      setTimeout(()=>syncLesson(lesson),400);
      return result;
    };
    wrapped.__v76Wrapped=true;
    renderLesson=wrapped;
  }

  window.__lousaCurrentContentVersion=76;
  window.__lousaV76Ready=true;
})();
