/* Lousa de Estudos v102 — Ciências 5º ano — folhetos exatos de desnutrição e obesidade infantil */
(()=>{
  if(window.__lousaV102Folhetos)return;
  window.__lousaV102Folhetos=true;
  const VERSION=102;

  const f1WordBank='saudáveis • água • atividade física • frutinhas • equilíbrio';

  const folheto1={
    key:'nutricao-folheto-1',
    emoji:'🍎',
    title:'Juntos contra a desnutrição e a obesidade infantil',
    subtitle:'Folheto 1 • alimentação, água, movimento e rotina',
    desc:'Conteúdo e atividades reproduzidos na mesma sequência do folheto usado em aula.',
    mission:'Ciências • 5º ano • Folheto 1',
    passageTitle:'Juntos contra a desnutrição e a obesidade infantil!',
    passage:[
      '<div class="v102Sheet">',
        '<div class="v102SheetTitle">JUNTOS CONTRA A<br>DESNUTRIÇÃO E A<br>OBESIDADE INFANTIL!</div>',
        '<div class="v102SheetSub">Pequenas atitudes fazem uma grande diferença!</div>',
        '<div class="v102TwoCols">',
          '<section class="v102Box green"><h3>O que é desnutrição?</h3><p>É quando o corpo não recebe a quantidade certa de nutrientes, como vitaminas, minerais, proteínas, carboidratos e gorduras boas.</p><p>Pode causar fraqueza, baixa imunidade, problemas de crescimento e dificuldade de concentração.</p></section>',
          '<section class="v102Box red"><h3>O que é obesidade?</h3><p>É o excesso de gordura no corpo, causado principalmente por uma alimentação desequilibrada e pouca atividade física.</p><p>Pode trazer problemas de saúde, como diabetes, pressão alta, problemas no coração e nas articulações.</p></section>',
        '</div>',
        '<h3 class="v102CenterTitle">COMO PODEMOS COMBATER NO NOSSO DIA A DIA?</h3>',
        '<div class="v102Tips">',
          '<div><b>COMA ALIMENTOS SAUDÁVEIS!</b><span>Dê preferência a frutas, verduras, legumes, feijão, arroz, carnes magras e alimentos naturais.</span></div>',
          '<div><b>EVITE ULTRAPROCESSADOS!</b><span>Salgadinhos, refrigerantes, biscoitos recheados e fast food em excesso aumentam o risco de obesidade e tiram os nutrientes do nosso corpo.</span></div>',
          '<div><b>BEBA ÁGUA!</b><span>A água ajuda no bom funcionamento do corpo, melhora a digestão e evita o consumo excessivo de refrigerantes e sucos industrializados.</span></div>',
          '<div><b>PRATIQUE ATIVIDADE FÍSICA!</b><span>Brincar, correr, dançar e se movimentar faz bem ao coração, fortalece os músculos e ajuda a controlar o peso.</span></div>',
          '<div><b>TENHA UMA ROTINA ALIMENTAR!</b><span>Faça as principais refeições do dia: café da manhã, almoço, jantar e lanches saudáveis.</span></div>',
        '</div>',
        '<div class="v102Bottom">ALIMENTAÇÃO EQUILIBRADA + MOVIMENTO + BOAS ESCOLHAS = UMA INFÂNCIA MAIS SAUDÁVEL!</div>',
      '</div>'
    ].join(''),
    passageVisual:'',
    questions:[
      {id:'c5_f1_01a',type:'mcq',reviewLabel:'Atividade 1',review:'Marque com um X as atitudes que ajudam a combater a desnutrição e a obesidade infantil.',text:'Comer frutas, verduras e legumes todos os dias.',options:['Marcar com X','Não marcar'],correct:0,explanation:'Esta é uma atitude saudável.',expected:'Marcar com X.'},
      {id:'c5_f1_01b',type:'mcq',reviewLabel:'Atividade 1',review:'Marque com um X as atitudes que ajudam a combater a desnutrição e a obesidade infantil.',text:'Preferir refrigerantes e salgadinhos.',options:['Marcar com X','Não marcar'],correct:1,explanation:'Esta atitude não deve ser marcada.',expected:'Não marcar.'},
      {id:'c5_f1_01c',type:'mcq',reviewLabel:'Atividade 1',review:'Marque com um X as atitudes que ajudam a combater a desnutrição e a obesidade infantil.',text:'Beber bastante água.',options:['Marcar com X','Não marcar'],correct:0,explanation:'Esta é uma atitude saudável.',expected:'Marcar com X.'},
      {id:'c5_f1_01d',type:'mcq',reviewLabel:'Atividade 1',review:'Marque com um X as atitudes que ajudam a combater a desnutrição e a obesidade infantil.',text:'Fazer atividade física regularmente.',options:['Marcar com X','Não marcar'],correct:0,explanation:'Esta é uma atitude saudável.',expected:'Marcar com X.'},
      {id:'c5_f1_01e',type:'mcq',reviewLabel:'Atividade 1',review:'Marque com um X as atitudes que ajudam a combater a desnutrição e a obesidade infantil.',text:'Dormir bem.',options:['Marcar com X','Não marcar'],correct:0,explanation:'Esta é uma atitude saudável.',expected:'Marcar com X.'},
      {id:'c5_f1_01f',type:'mcq',reviewLabel:'Atividade 1',review:'Marque com um X as atitudes que ajudam a combater a desnutrição e a obesidade infantil.',text:'Comer apenas doces e fast food.',options:['Marcar com X','Não marcar'],correct:1,explanation:'Esta atitude não deve ser marcada.',expected:'Não marcar.'},
      {id:'c5_f1_01g',type:'mcq',reviewLabel:'Atividade 1',review:'Marque com um X as atitudes que ajudam a combater a desnutrição e a obesidade infantil.',text:'Respeitar os horários das refeições.',options:['Marcar com X','Não marcar'],correct:0,explanation:'Esta é uma atitude saudável.',expected:'Marcar com X.'},
      {id:'c5_f1_01h',type:'mcq',reviewLabel:'Atividade 1',review:'Marque com um X as atitudes que ajudam a combater a desnutrição e a obesidade infantil.',text:'Assistir muitas horas de TV e celular.',options:['Marcar com X','Não marcar'],correct:1,explanation:'Esta atitude não deve ser marcada.',expected:'Não marcar.'},

      {id:'c5_f1_02a',type:'open',reviewLabel:'Atividade 2',review:'Observe as imagens e escreva se cada hábito ajuda a prevenir a desnutrição, a obesidade ou os dois.',text:'Comer comida de verdade:',explanation:'Responda conforme a atividade do folheto.',expected:'Resposta conforme orientação da professora.'},
      {id:'c5_f1_02b',type:'open',reviewLabel:'Atividade 2',review:'Observe as imagens e escreva se cada hábito ajuda a prevenir a desnutrição, a obesidade ou os dois.',text:'Beber água:',explanation:'Responda conforme a atividade do folheto.',expected:'Resposta conforme orientação da professora.'},
      {id:'c5_f1_02c',type:'open',reviewLabel:'Atividade 2',review:'Observe as imagens e escreva se cada hábito ajuda a prevenir a desnutrição, a obesidade ou os dois.',text:'Praticar esportes:',explanation:'Responda conforme a atividade do folheto.',expected:'Resposta conforme orientação da professora.'},
      {id:'c5_f1_02d',type:'open',reviewLabel:'Atividade 2',review:'Observe as imagens e escreva se cada hábito ajuda a prevenir a desnutrição, a obesidade ou os dois.',text:'Comer fast food todos os dias:',explanation:'Responda conforme a atividade do folheto.',expected:'Resposta conforme orientação da professora.'},
      {id:'c5_f1_02e',type:'open',reviewLabel:'Atividade 2',review:'Observe as imagens e escreva se cada hábito ajuda a prevenir a desnutrição, a obesidade ou os dois.',text:'Dormir bem:',explanation:'Responda conforme a atividade do folheto.',expected:'Resposta conforme orientação da professora.'},

      {id:'c5_f1_03a',type:'open',reviewLabel:'Atividade 3',review:'Complete as frases com as palavras do quadro. '+f1WordBank,text:'a) Para crescer forte, eu preciso de uma alimentação __________.',explanation:'Use uma palavra do quadro.',expected:'saudáveis'},
      {id:'c5_f1_03b',type:'open',reviewLabel:'Atividade 3',review:'Complete as frases com as palavras do quadro. '+f1WordBank,text:'b) Beber __________ todos os dias é muito importante.',explanation:'Use uma palavra do quadro.',expected:'água'},
      {id:'c5_f1_03c',type:'open',reviewLabel:'Atividade 3',review:'Complete as frases com as palavras do quadro. '+f1WordBank,text:'c) Eu gosto de comer __________ como maçã, banana e pera.',explanation:'Use uma palavra do quadro.',expected:'frutinhas'},
      {id:'c5_f1_03d',type:'open',reviewLabel:'Atividade 3',review:'Complete as frases com as palavras do quadro. '+f1WordBank,text:'d) Brincar e fazer __________ me deixa mais feliz e saudável.',explanation:'Use uma palavra do quadro.',expected:'atividade física'},
      {id:'c5_f1_03e',type:'open',reviewLabel:'Atividade 3',review:'Complete as frases com as palavras do quadro. '+f1WordBank,text:'e) O segredo é ter __________ em tudo: na comida, na bebida e nas brincadeiras.',explanation:'Use uma palavra do quadro.',expected:'equilíbrio'},

      {id:'c5_f1_04a',type:'open',reviewLabel:'Atividade 4',review:'Desenhe e escreva duas atitudes que você pode fazer no seu dia a dia para ajudar a combater a desnutrição e a obesidade infantil.',text:'Minha primeira atitude:',explanation:'Faça como no folheto.',expected:'Resposta pessoal.'},
      {id:'c5_f1_04b',type:'open',reviewLabel:'Atividade 4',review:'Desenhe e escreva duas atitudes que você pode fazer no seu dia a dia para ajudar a combater a desnutrição e a obesidade infantil.',text:'Minha segunda atitude:',explanation:'Faça como no folheto.',expected:'Resposta pessoal.'}
    ]
  };

  const wordSearchRows=[
    'A L F R U T A S X',
    'V E R D U R A S I',
    'L E G U M E S B X',
    'P E I X E L A T E',
    'A G U A B A N A N A',
    'I O G U R T E R X',
    'C E R E A I S D S',
    'P R O T E I N A S'
  ];

  const folheto2={
    key:'nutricao-folheto-2',
    emoji:'🥦',
    title:'Obesidade e desnutrição',
    subtitle:'Folheto 2 • alimentos, hábitos e prevenção',
    desc:'Conteúdo e atividades reproduzidos na mesma sequência do segundo folheto usado em aula.',
    mission:'Ciências • 5º ano • Folheto 2',
    passageTitle:'Obesidade e desnutrição',
    passage:[
      '<div class="v102Sheet">',
        '<div class="v102SheetTitle second">OBESIDADE E DESNUTRIÇÃO</div>',
        '<div class="v102SheetSub">Dois problemas que afetam a saúde, mas que podem ser evitados com informação e bons hábitos!</div>',
        '<div class="v102TwoCols">',
          '<section class="v102Box red"><h3>O que é obesidade?</h3><p>A obesidade acontece quando o corpo acumula muita gordura. Isso pode ocorrer por causa de uma alimentação rica em ultraprocessados, doces e refrigerantes, e pela falta de atividade física.</p><p>A obesidade pode causar vários problemas de saúde, como diabetes, pressão alta, doenças do coração e dificuldades para respirar.</p></section>',
          '<section class="v102Box blue"><h3>O que é desnutrição?</h3><p>A desnutrição acontece quando o corpo não recebe a quantidade certa de nutrientes, como proteínas, vitaminas e minerais.</p><p>Isso pode ser causado por uma alimentação pouco variada, falta de alimentos ou problemas de saúde.</p><p>A desnutrição pode causar fraqueza, baixo peso, dificuldade de aprendizado e maior risco de doenças.</p></section>',
        '</div>',
        '<div class="v102ActivityBox"><b>2 • Encontre no caça palavras os alimentos que ajudam a manter a saúde.</b><div class="v102WordSearch">'+wordSearchRows.map(r=>'<div>'+r+'</div>').join('')+'</div><div class="v102Words">FRUTAS • VERDURAS • LEGUMES • PEIXE • ÁGUA • BANANA • IOGURTE • CEREAIS • PROTEÍNAS</div></div>',
        '<div class="v102Bottom yellow">ESCOLHA HOJE O QUE FAZ BEM PARA O SEU CORPO!</div>',
      '</div>'
    ].join(''),
    passageVisual:'',
    questions:[
      {id:'c5_f2_01a',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'MAÇÃ',options:['Verde','Vermelho'],correct:0,explanation:'No folheto, maçã deve ser pintada de verde.',expected:'Verde.'},
      {id:'c5_f2_01b',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'BANANA',options:['Verde','Vermelho'],correct:0,explanation:'No folheto, banana deve ser pintada de verde.',expected:'Verde.'},
      {id:'c5_f2_01c',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'HAMBÚRGUER',options:['Verde','Vermelho'],correct:1,explanation:'No folheto, hambúrguer deve ser consumido com moderação.',expected:'Vermelho.'},
      {id:'c5_f2_01d',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'BATATA FRITA',options:['Verde','Vermelho'],correct:1,explanation:'No folheto, batata frita deve ser consumida com moderação.',expected:'Vermelho.'},
      {id:'c5_f2_01e',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'LEGUMES',options:['Verde','Vermelho'],correct:0,explanation:'No folheto, legumes devem ser pintados de verde.',expected:'Verde.'},
      {id:'c5_f2_01f',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'REFRIGERANTE',options:['Verde','Vermelho'],correct:1,explanation:'No folheto, refrigerante deve ser consumido com moderação.',expected:'Vermelho.'},
      {id:'c5_f2_01g',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'PEIXE',options:['Verde','Vermelho'],correct:0,explanation:'No folheto, peixe deve ser pintado de verde.',expected:'Verde.'},
      {id:'c5_f2_01h',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'DOCES',options:['Verde','Vermelho'],correct:1,explanation:'No folheto, doces devem ser consumidos com moderação.',expected:'Vermelho.'},
      {id:'c5_f2_01i',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'ARROZ E FEIJÃO',options:['Verde','Vermelho'],correct:0,explanation:'No folheto, arroz e feijão devem ser pintados de verde.',expected:'Verde.'},
      {id:'c5_f2_01j',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'PÃO INTEGRAL',options:['Verde','Vermelho'],correct:0,explanation:'No folheto, pão integral deve ser pintado de verde.',expected:'Verde.'},
      {id:'c5_f2_01k',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'IOGURTE',options:['Verde','Vermelho'],correct:0,explanation:'No folheto, iogurte deve ser pintado de verde.',expected:'Verde.'},
      {id:'c5_f2_01l',type:'mcq',reviewLabel:'Atividade 1 • Vamos conhecer os alimentos?',review:'Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.',text:'CHOCOLATE',options:['Verde','Vermelho'],correct:1,explanation:'No folheto, chocolate deve ser consumido com moderação.',expected:'Vermelho.'},

      {id:'c5_f2_02',type:'open',reviewLabel:'Atividade 2',review:'Encontre no caça palavras os alimentos que ajudam a manter a saúde. O caça palavras está acima, exatamente como no folheto.',text:'Encontre no caça palavras: FRUTAS, VERDURAS, LEGUMES, PEIXE, ÁGUA, BANANA, IOGURTE, CEREAIS e PROTEÍNAS.',explanation:'Localize as palavras no caça palavras.',expected:'FRUTAS, VERDURAS, LEGUMES, PEIXE, ÁGUA, BANANA, IOGURTE, CEREAIS e PROTEÍNAS.'},

      {id:'c5_f2_03a',type:'mcq',reviewLabel:'Atividade 3',review:'Ligue cada situação ao problema correto.',text:'Come muita comida industrializada, quase não pratica atividade física e tem sobrepeso.',options:['OBESIDADE','DESNUTRIÇÃO'],correct:0,explanation:'A situação do folheto deve ser ligada a obesidade.',expected:'OBESIDADE.'},
      {id:'c5_f2_03b',type:'mcq',reviewLabel:'Atividade 3',review:'Ligue cada situação ao problema correto.',text:'Não tem acesso a uma alimentação adequada, come pouco e está muito magra.',options:['OBESIDADE','DESNUTRIÇÃO'],correct:1,explanation:'A situação do folheto deve ser ligada a desnutrição.',expected:'DESNUTRIÇÃO.'},
      {id:'c5_f2_03c',type:'mcq',reviewLabel:'Atividade 3',review:'Ligue cada situação ao problema correto.',text:'Tem dificuldade de concentração, está cansado e com baixa imunidade.',options:['OBESIDADE','DESNUTRIÇÃO'],correct:1,explanation:'A situação do folheto deve ser ligada a desnutrição.',expected:'DESNUTRIÇÃO.'},

      {id:'c5_f2_04a',type:'mcq',reviewLabel:'Atividade 4',review:'Marque V verdadeiro ou F falso.',text:'A obesidade pode causar diabetes e doenças do coração.',options:['V','F'],correct:0,explanation:'Verdadeiro.',expected:'V.'},
      {id:'c5_f2_04b',type:'mcq',reviewLabel:'Atividade 4',review:'Marque V verdadeiro ou F falso.',text:'A desnutrição é causada apenas pela falta de alimentos.',options:['V','F'],correct:1,explanation:'Falso.',expected:'F.'},
      {id:'c5_f2_04c',type:'mcq',reviewLabel:'Atividade 4',review:'Marque V verdadeiro ou F falso.',text:'Comer frutas, verduras e legumes ajuda a prevenir a obesidade e a desnutrição.',options:['V','F'],correct:0,explanation:'Verdadeiro.',expected:'V.'},
      {id:'c5_f2_04d',type:'mcq',reviewLabel:'Atividade 4',review:'Marque V verdadeiro ou F falso.',text:'O refrigerante e os salgadinhos fazem bem para o nosso corpo.',options:['V','F'],correct:1,explanation:'Falso.',expected:'F.'},
      {id:'c5_f2_04e',type:'mcq',reviewLabel:'Atividade 4',review:'Marque V verdadeiro ou F falso.',text:'A atividade física é importante para manter o peso saudável.',options:['V','F'],correct:0,explanation:'Verdadeiro.',expected:'V.'},

      {id:'c5_f2_05a',type:'open',reviewLabel:'Atividade 5 • Responda',review:'Responda como no folheto.',text:'1. Quais são os principais hábitos que podem causar obesidade?',explanation:'Responda com base no texto do folheto.',expected:'Alimentação rica em ultraprocessados, doces e refrigerantes e falta de atividade física.'},
      {id:'c5_f2_05b',type:'open',reviewLabel:'Atividade 5 • Responda',review:'Responda como no folheto.',text:'2. O que o corpo precisa para se manter saudável?',explanation:'Responda com base no texto do folheto.',expected:'Uma alimentação adequada com nutrientes e bons hábitos de saúde.'},
      {id:'c5_f2_05c',type:'open',reviewLabel:'Atividade 5 • Responda',review:'Responda como no folheto.',text:'3. Como você pode cuidar da sua alimentação no dia a dia?',explanation:'Responda como no folheto.',expected:'Resposta pessoal coerente com alimentação equilibrada e bons hábitos.'}
    ]
  };

  const allExact=[...folheto1.questions,...folheto2.questions];
  const exactType=new Map(allExact.map(q=>[q.id,q.type]));
  const exactText=new Map(allExact.map(q=>[q.id,q.text]));

  function isTarget(q){return !!(q&&exactType.has(String(q.id||'')))}

  function lockQuestion(q){
    if(!isTarget(q))return;
    const id=String(q.id||'');
    const wantedType=exactType.get(id);
    const wantedText=exactText.get(id);
    try{
      if(!q.__v102TypeLocked){
        Object.defineProperty(q,'type',{configurable:true,enumerable:true,get(){return wantedType},set(){}});
        Object.defineProperty(q,'__v102TypeLocked',{value:true,enumerable:false,configurable:true});
      }
    }catch(e){q.type=wantedType}
    try{
      if(!q.__v102TextLocked){
        Object.defineProperty(q,'text',{configurable:true,enumerable:true,get(){return wantedText},set(){}});
        Object.defineProperty(q,'__v102TextLocked',{value:true,enumerable:false,configurable:true});
      }
    }catch(e){q.text=wantedText}
  }

  function lockLesson(l){(l?.questions||[]).forEach(lockQuestion)}

  function install(){
    try{
      if(typeof subjects==='undefined'||!subjects?.science)return false;
      lockLesson(folheto1);lockLesson(folheto2);
      const list=subjects.science.lessons||[];
      const kept=list.filter(item=>!['disturbios','nutricao-folheto-1','nutricao-folheto-2'].includes(String(item?.key||'')));
      const insertAt=Math.min(kept.length,7);
      kept.splice(insertAt,0,folheto1,folheto2);
      subjects.science.lessons=kept;
      subjects.science.homeDescription='As atividades de desnutrição e obesidade infantil foram organizadas em dois cards e reproduzem o conteúdo e a sequência dos dois folhetos da aula.';
      subjects.science.chips=['9 assuntos','Folheto 1 completo','Folheto 2 completo','Conteúdo da aula'];
      subjects.science.hint='🔬 Nos dois últimos cards, siga as atividades na mesma ordem dos folhetos.';
      try{if(typeof currentSubjectKey!=='undefined'&&currentSubjectKey==='science')lessons=subjects.science.lessons}catch(e){}
      try{if(typeof renderSubjectCards==='function')renderSubjectCards()}catch(e){}
      try{if(typeof updateProgress==='function')updateProgress()}catch(e){}
      return true;
    }catch(e){return false}
  }

  function guards(){
    try{
      if(typeof buildQuestion==='function'&&!buildQuestion.__v102Exact){
        const previous=buildQuestion;
        const wrapped=function(q,num){lockQuestion(q);const out=previous.apply(this,arguments);lockQuestion(q);return out};
        wrapped.__v102Exact=true;buildQuestion=wrapped;
      }
    }catch(e){}
    try{
      if(typeof renderLesson==='function'&&!renderLesson.__v102Exact){
        const previous=renderLesson;
        const wrapped=function(l){if(['nutricao-folheto-1','nutricao-folheto-2'].includes(String(l?.key||'')))lockLesson(l);const out=previous.apply(this,arguments);if(['nutricao-folheto-1','nutricao-folheto-2'].includes(String(l?.key||'')))lockLesson(l);return out};
        wrapped.__v102Exact=true;renderLesson=wrapped;
      }
    }catch(e){}
  }

  function addStyles(){
    if(document.getElementById('v102ExactSheetStyles'))return;
    const s=document.createElement('style');
    s.id='v102ExactSheetStyles';
    s.textContent=[
      '.v102Sheet{padding:18px;border-radius:22px;background:#fffdf7;border:1px solid #e8e3d4}',
      '.v102SheetTitle{text-align:center;font-weight:1000;font-size:25px;line-height:1.05;color:#2972b8;letter-spacing:.2px}',
      '.v102SheetTitle.second{color:#d14d45;font-size:27px}',
      '.v102SheetSub{text-align:center;margin:8px auto 17px;font-weight:850;color:#68726a;font-size:13px;line-height:1.4}',
      '.v102TwoCols{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
      '.v102Box{padding:14px;border-radius:16px;border:2px solid #dce8dd;background:#fff}',
      '.v102Box.green{border-color:#9dce9d}.v102Box.red{border-color:#e5a5ad}.v102Box.blue{border-color:#8bb9e4}',
      '.v102Box h3{margin:0 0 7px;font-size:17px}.v102Box.green h3{color:#3d8d4f}.v102Box.red h3{color:#c84c5d}.v102Box.blue h3{color:#3b77ba}',
      '.v102Box p{margin:0 0 8px!important;line-height:1.55!important;font-size:13px!important}',
      '.v102CenterTitle{text-align:center;color:#2b6f9b;margin:18px 0 10px!important;font-size:17px!important}',
      '.v102Tips{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}',
      '.v102Tips div{padding:11px;border-radius:14px;border:1px solid #dfe8df;background:#fff;display:flex;flex-direction:column;gap:6px}',
      '.v102Tips b{font-size:11px;line-height:1.25;color:#3a6f48}.v102Tips span{font-size:10.5px;line-height:1.38;color:#58625d}',
      '.v102Bottom{margin-top:15px;padding:11px;border-radius:14px;background:#dff4e5;text-align:center;font-weight:950;color:#287548;font-size:12px;line-height:1.35}',
      '.v102Bottom.yellow{background:#fff0a6;color:#8c6a14}',
      '.v102ActivityBox{margin-top:16px;padding:14px;border-radius:16px;border:1px solid #b6d09e;background:#f7fff0;color:#44543f;font-size:12px;line-height:1.5}',
      '.v102WordSearch{margin:12px auto 8px;width:max-content;max-width:100%;padding:10px 12px;border-radius:10px;background:#fff;border:1px solid #ccd9c3;font:800 15px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:3px;overflow:auto}',
      '.v102Words{font-size:11px;font-weight:850;color:#587052;text-align:center}',
      '@media(max-width:760px){.v102TwoCols{grid-template-columns:1fr}.v102Tips{grid-template-columns:1fr 1fr}.v102SheetTitle{font-size:21px}.v102SheetTitle.second{font-size:23px}}',
      '@media(max-width:460px){.v102Tips{grid-template-columns:1fr}.v102WordSearch{font-size:13px;letter-spacing:2px}}'
    ].join('');
    document.head.appendChild(s);
  }

  function stamp(){
    try{
      window.__lousaCurrentContentVersion=VERSION;
      const meta=document.querySelector('meta[name="app-version"]');if(meta)meta.content=String(VERSION);
      document.documentElement.dataset.contentVersion=String(VERSION);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>{el.textContent='v'+VERSION;el.style.visibility=''});
    }catch(e){}
  }

  addStyles();guards();install();stamp();
  let tries=0;
  const timer=setInterval(()=>{tries++;guards();if(install()||tries>24)clearInterval(timer)},120);
})();
