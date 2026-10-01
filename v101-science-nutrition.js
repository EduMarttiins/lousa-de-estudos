/* Lousa de Estudos v101 — Ciências 5º ano — Desnutrição e obesidade infantil */
(()=>{
  if(window.__lousaV101Nutrition)return;
  window.__lousaV101Nutrition=true;
  const VERSION=101;

  const passage=[
    '<div class="v101NutriHero"><div class="v101NutriTitle">🥗 Juntos contra a desnutrição e a obesidade infantil</div><div class="v101NutriSub">Pequenas atitudes fazem diferença. Alimentação equilibrada, movimento, água e rotina ajudam o corpo a crescer e funcionar bem.</div></div>',
    '<div class="v101NutriGrid">',
      '<section class="v101NutriCard green"><h3>O que é desnutrição?</h3><p>Para esta lição, vamos usar a palavra <strong>desnutrição</strong> para falar da situação em que o corpo não recebe ou não consegue aproveitar energia e nutrientes em quantidade adequada.</p><p>Isso pode acontecer por alimentação insuficiente ou pouco variada e também por doenças que atrapalham o aproveitamento dos nutrientes.</p><p>Quando não é cuidada, pode prejudicar o <strong>crescimento, a força, a concentração e as defesas do organismo</strong>.</p></section>',
      '<section class="v101NutriCard red"><h3>O que é obesidade?</h3><p><strong>Obesidade</strong> é o acúmulo excessivo de gordura corporal que pode prejudicar a saúde.</p><p>Ela não tem uma causa única. Pode envolver alimentação, atividade física, sono, ambiente, fatores familiares, biológicos e outros aspectos da vida.</p><p>Em crianças, não devemos julgar pela aparência. A avaliação deve ser feita por <strong>profissionais de saúde</strong>, considerando idade, crescimento e desenvolvimento.</p></section>',
    '</div>',
    '<div class="v101NutriCare"><h3>Como podemos prevenir e cuidar no dia a dia?</h3><div class="v101NutriCareGrid">',
      '<div class="v101Mini"><b>🍎 Prefira alimentos de verdade</b><span>Frutas, verduras, legumes, arroz, feijão, ovos, carnes, leite e outros alimentos in natura ou minimamente processados.</span></div>',
      '<div class="v101Mini"><b>🥤 Evite excesso de ultraprocessados</b><span>Refrigerantes, salgadinhos, biscoitos recheados e outros ultraprocessados não devem dominar a alimentação.</span></div>',
      '<div class="v101Mini"><b>💧 Beba água</b><span>A água participa do funcionamento do corpo e deve ser a principal bebida para matar a sede.</span></div>',
      '<div class="v101Mini"><b>🏃 Movimente o corpo</b><span>Brincar, correr, dançar, andar de bicicleta e praticar esportes são formas de atividade física.</span></div>',
      '<div class="v101Mini"><b>🕒 Tenha rotina alimentar</b><span>Fazer as refeições com calma e manter horários organizados ajuda a construir bons hábitos.</span></div>',
    '</div></div>',
    '<div class="v101NutriNote"><strong>⚠️ Importante</strong><span>Crianças não devem fazer dietas restritivas ou tentar perder peso por conta própria. Quando houver preocupação com crescimento, alimentação ou peso, a família deve procurar orientação de um profissional de saúde.</span></div>'
  ].join('');

  const lesson={
    key:'disturbios',
    emoji:'🥗',
    title:'Desnutrição e obesidade infantil',
    subtitle:'alimentação, prevenção e bons hábitos',
    desc:'Aprenda o que são desnutrição e obesidade infantil e revise atitudes que ajudam a cuidar da saúde no dia a dia.',
    mission:'Ciências • 5º ano • Desnutrição e obesidade infantil',
    passageTitle:'Juntos contra a desnutrição e a obesidade infantil',
    passage:passage,
    passageVisual:'🥗 alimentação equilibrada  +  💧 água  +  🏃 movimento  +  🕒 rotina  =  cuidado com a saúde',
    questions:[
      {id:'c5_nutri_01',type:'mcq',reviewLabel:'1️⃣ Entenda o conceito',review:'Pense no que acontece quando o corpo não recebe ou não consegue aproveitar os nutrientes de que precisa.',text:'O que é desnutrição, no sentido estudado nesta lição?',options:['Quando o corpo não recebe ou não aproveita nutrientes em quantidade adequada','Quando a pessoa bebe água durante o dia','Quando a pessoa pratica atividade física'],correct:0,explanation:'Desnutrição pode acontecer quando faltam energia e nutrientes ou quando o corpo não consegue aproveitá-los adequadamente.',expected:'Resposta correta: quando o corpo não recebe ou não aproveita nutrientes em quantidade adequada.'},
      {id:'c5_nutri_02',type:'mcq',reviewLabel:'2️⃣ Entenda o conceito',review:'A obesidade envolve acúmulo excessivo de gordura corporal e pode ter vários fatores envolvidos.',text:'Qual alternativa explica melhor o que é obesidade?',options:['Uma doença causada somente por comer doces','Acúmulo excessivo de gordura corporal que pode prejudicar a saúde','Falta de vitaminas causada apenas por não beber água'],correct:1,explanation:'A obesidade é uma condição complexa e não tem uma única causa. O excesso de gordura corporal pode aumentar riscos à saúde.',expected:'Resposta correta: acúmulo excessivo de gordura corporal que pode prejudicar a saúde.'},
      {id:'c5_nutri_03',type:'mcq',reviewLabel:'3️⃣ Escolha alimentos saudáveis',review:'O material da aula destaca alimentos mais próximos de sua forma natural.',text:'Qual grupo apresenta alimentos que podem fazer parte de uma alimentação equilibrada?',options:['Refrigerante, salgadinho e biscoito recheado','Frutas, verduras, legumes, arroz e feijão','Somente doces e fast food'],correct:1,explanation:'Frutas, verduras, legumes, arroz e feijão são exemplos de alimentos que podem compor refeições variadas e equilibradas.',expected:'Resposta correta: frutas, verduras, legumes, arroz e feijão.'},
      {id:'c5_nutri_04',type:'mcq',reviewLabel:'4️⃣ Observe o hábito',review:'Ultraprocessados podem fazer parte de alguns momentos, mas não devem ser a base da alimentação.',text:'Qual atitude ajuda a cuidar melhor da saúde?',options:['Trocar a água por refrigerante todos os dias','Comer salgadinho e biscoito recheado em todas as refeições','Preferir alimentos variados e reduzir o consumo de ultraprocessados'],correct:2,explanation:'Uma alimentação saudável prioriza alimentos in natura ou minimamente processados e reduz a presença de ultraprocessados no dia a dia.',expected:'Resposta correta: preferir alimentos variados e reduzir o consumo de ultraprocessados.'},
      {id:'c5_nutri_05',type:'mcq',reviewLabel:'5️⃣ Verdadeiro ou falso',review:'Lembre que a atividade física é uma das partes de uma rotina saudável.',text:'Verdadeiro ou falso: brincar, correr, dançar e praticar esportes são formas de atividade física.',options:['Verdadeiro','Falso','Somente quando há competição'],correct:0,explanation:'Atividade física inclui vários movimentos do corpo. Brincadeiras ativas, dança, caminhada, corrida e esportes são exemplos.',expected:'Resposta correta: verdadeiro.'},
      {id:'c5_nutri_06',type:'mcq',reviewLabel:'6️⃣ Complete a ideia',review:'Uma alimentação saudável não depende de um único alimento.',text:'Complete a frase: Para crescer e se desenvolver, a criança precisa de uma alimentação...',options:['variada e equilibrada','formada somente por um tipo de alimento','sem água e sem frutas'],correct:0,explanation:'A variedade ajuda a oferecer diferentes nutrientes, e o equilíbrio evita excessos e faltas.',expected:'Resposta correta: variada e equilibrada.'},
      {id:'c5_nutri_07',type:'mcq',reviewLabel:'7️⃣ Ligue a situação ao problema',review:'Observe os sinais descritos e pense em falta de nutrientes.',text:'Uma criança recebe pouca quantidade e pouca variedade de alimentos por muito tempo e apresenta fraqueza e dificuldade de crescimento. Esse quadro pode estar relacionado principalmente a:',options:['Desnutrição','Maior condicionamento físico','Hidratação adequada'],correct:0,explanation:'A falta prolongada de energia e nutrientes pode causar fraqueza e prejudicar o crescimento.',expected:'Resposta correta: desnutrição.'},
      {id:'c5_nutri_08',type:'mcq',reviewLabel:'8️⃣ Pense na prevenção',review:'Não precisamos diagnosticar ninguém. A pergunta é sobre hábitos que ajudam a proteger a saúde.',text:'Qual conjunto de atitudes ajuda a prevenir problemas nutricionais?',options:['Alimentação variada, água, atividade física e rotina de refeições','Pular refeições, beber pouco líquido e ficar sempre parado','Comer somente alimentos ultraprocessados'],correct:0,explanation:'Saúde nutricional depende do conjunto de hábitos. Alimentação variada, água, movimento e rotina organizada são atitudes protetoras.',expected:'Resposta correta: alimentação variada, água, atividade física e rotina de refeições.'},
      {id:'c5_nutri_09',type:'mcq',reviewLabel:'9️⃣ Escolha a melhor mudança',review:'Pense em uma mudança simples e possível no dia a dia.',text:'Uma criança costuma tomar refrigerante e comer salgadinhos todos os dias. Qual mudança é mais saudável?',options:['Aumentar ainda mais os ultraprocessados','Substituir parte desses alimentos por água, frutas e refeições mais variadas','Parar de comer completamente sem orientação'],correct:1,explanation:'A melhor estratégia é melhorar gradualmente a qualidade da alimentação, sem dietas radicais ou restrições feitas por conta própria.',expected:'Resposta correta: substituir parte desses alimentos por água, frutas e refeições mais variadas.'},
      {id:'c5_nutri_10',type:'mcq',reviewLabel:'🔟 Cuidado e respeito',review:'Em crianças, peso e crescimento precisam ser avaliados considerando idade e desenvolvimento.',text:'Quem deve avaliar se uma criança apresenta desnutrição, excesso de peso ou obesidade?',options:['Qualquer pessoa olhando apenas para a aparência','Somente os colegas da escola','Profissionais de saúde, com avaliação adequada do crescimento e da saúde'],correct:2,explanation:'A aparência não é suficiente para diagnóstico. A avaliação infantil deve considerar crescimento, idade, desenvolvimento e outros dados de saúde.',expected:'Resposta correta: profissionais de saúde, com avaliação adequada do crescimento e da saúde.'}
    ]
  };

  function isTargetQuestion(q){return !!(q&&/^c5_nutri_/.test(String(q.id||'')))}

  function lockQuestion(q){
    if(!isTargetQuestion(q))return;
    if(!q.__v101OriginalText)q.__v101OriginalText=String(q.text||'');
    try{
      if(!q.__v101TypeLocked){
        let current='mcq';
        Object.defineProperty(q,'type',{configurable:true,enumerable:true,get(){return current},set(next){if(String(next||'').toLowerCase()==='open')return;current=String(next||'mcq')}});
        Object.defineProperty(q,'__v101TypeLocked',{value:true,writable:false,configurable:true,enumerable:false});
      }
    }catch(e){q.type='mcq'}
    try{
      if(!q.__v101TextLocked){
        let original=String(q.__v101OriginalText||q.text||'');
        Object.defineProperty(q,'text',{configurable:true,enumerable:true,get(){return original},set(next){const value=String(next||'');if(/^Explique\b/i.test(value)||/\bcom suas palavras\b/i.test(value))return;original=value||original}});
        Object.defineProperty(q,'__v101TextLocked',{value:true,writable:false,configurable:true,enumerable:false});
      }
    }catch(e){q.text=q.__v101OriginalText||q.text}
    q.type='mcq';
  }

  function lockLesson(item){(item?.questions||[]).forEach(lockQuestion)}

  function installLesson(){
    try{
      if(typeof subjects==='undefined'||!subjects?.science)return false;
      lockLesson(lesson);
      const list=subjects.science.lessons||[];
      const index=list.findIndex(item=>item?.key==='disturbios');
      if(index>=0)list.splice(index,1,lesson);else list.push(lesson);
      subjects.science.homeDescription='Oito temas de Ciências com revisão visual e 10 atividades por lição. A lição de desnutrição e obesidade infantil segue o conteúdo do material da aula.';
      subjects.science.chips=['8 assuntos','10 atividades por card','Múltipla escolha','Explicação após o envio'];
      subjects.science.hint='🔬 Leia o resumo de cada tema e depois responda às questões.';
      try{if(typeof renderSubjectCards==='function')renderSubjectCards()}catch(e){}
      try{if(typeof updateProgress==='function')updateProgress()}catch(e){}
      return true;
    }catch(e){return false}
  }

  function installGuards(){
    try{
      if(typeof buildQuestion==='function'&&!buildQuestion.__v101Nutrition){
        const previous=buildQuestion;
        const wrapped=function(q,num){lockQuestion(q);const card=previous.apply(this,arguments);lockQuestion(q);return card};
        wrapped.__v101Nutrition=true;buildQuestion=wrapped;
      }
    }catch(e){}
    try{
      if(typeof renderLesson==='function'&&!renderLesson.__v101Nutrition){
        const previous=renderLesson;
        const wrapped=function(item){if(item?.key==='disturbios')lockLesson(item);const result=previous.apply(this,arguments);if(item?.key==='disturbios')lockLesson(item);return result};
        wrapped.__v101Nutrition=true;renderLesson=wrapped;
      }
    }catch(e){}
  }

  function styles(){
    if(document.getElementById('v101NutritionStyles'))return;
    const s=document.createElement('style');s.id='v101NutritionStyles';
    s.textContent=[
      '.v101NutriHero{padding:18px 20px;border-radius:20px;background:linear-gradient(135deg,#ecfdf5 0%,#eff6ff 100%);border:1px solid #d5eadc;margin-bottom:16px}',
      '.v101NutriTitle{font-size:20px;font-weight:950;color:#1f5135;line-height:1.25}',
      '.v101NutriSub{margin-top:7px;color:#52655a;font-size:14px;line-height:1.55}',
      '.v101NutriGrid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:14px 0}',
      '.v101NutriCard{padding:17px 18px;border-radius:18px;border:1px solid #e3e8e5}',
      '.v101NutriCard.green{background:#f0fdf4;border-color:#cfead8}',
      '.v101NutriCard.red{background:#fff5f5;border-color:#f1d1d1}',
      '.v101NutriCard h3{margin:0 0 9px;font-size:17px}',
      '.v101NutriCard.green h3{color:#207444}.v101NutriCard.red h3{color:#b03b45}',
      '.v101NutriCard p{margin:0 0 9px!important;line-height:1.62!important}',
      '.v101NutriCare{margin-top:16px;padding:18px;border-radius:20px;background:#fffdf1;border:1px solid #eee3aa}',
      '.v101NutriCare h3{margin:0 0 13px!important;color:#7a6115!important}',
      '.v101NutriCareGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:9px}',
      '.v101Mini{padding:12px;border-radius:15px;background:#fff;border:1px solid #eee8c9;display:flex;flex-direction:column;gap:6px}',
      '.v101Mini b{font-size:12px;line-height:1.35;color:#4c4b2a}.v101Mini span{font-size:11px;line-height:1.45;color:#6c6c59}',
      '.v101NutriNote{display:flex;gap:10px;margin-top:15px;padding:14px 15px;border-radius:16px;background:#f8fafc;border:1px solid #dce3e8;color:#46515a;font-size:12px;line-height:1.55}',
      '.v101NutriNote strong{white-space:nowrap;color:#8a5317}',
      '@media(max-width:760px){.v101NutriGrid{grid-template-columns:1fr}.v101NutriCareGrid{grid-template-columns:1fr 1fr}}',
      '@media(max-width:470px){.v101NutriCareGrid{grid-template-columns:1fr}.v101NutriNote{flex-direction:column}}'
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

  styles();
  installGuards();
  installLesson();
  stamp();

  let tries=0;
  const timer=setInterval(()=>{tries++;installGuards();if(installLesson()||tries>20)clearInterval(timer)},120);
})();
