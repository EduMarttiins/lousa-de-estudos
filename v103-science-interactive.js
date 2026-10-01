/* Lousa de Estudos v107 — Ciências 5º ano — folhetos em formato visual interativo */
(()=>{
  if(window.__lousaV103InteractiveFolhetos)return;
  window.__lousaV103InteractiveFolhetos=true;
  const VERSION=107;
  const customTypes=new Set(['visualX','visualClassify','visualFill','visualFoods','visualWordSearch','visualBinary','visualTF']);

  function stateKey(q,suffix){
    try{return key(q.id,suffix)}catch(e){return 'lousa:'+String(q.id||'atividade')+':'+suffix}
  }
  function readState(q,suffix,fallback){
    try{
      const raw=localStorage.getItem(stateKey(q,suffix));
      return raw?JSON.parse(raw):fallback;
    }catch(e){return fallback}
  }
  function writeState(q,suffix,value){
    try{localStorage.setItem(stateKey(q,suffix),JSON.stringify(value))}catch(e){}
  }
  function isDone(q){
    try{return typeof isSubmitted==='function'?isSubmitted(q):localStorage.getItem(stateKey(q,'submitted'))==='1'}catch(e){return false}
  }
  function finish(q,message){
    try{localStorage.setItem(stateKey(q,'submitted'),'1')}catch(e){}
    try{if(typeof updateProgress==='function')updateProgress()}catch(e){}
    try{if(typeof toast==='function')toast(message||'Atividade concluída.')}catch(e){}
  }
  function unfinish(q){
    try{localStorage.removeItem(stateKey(q,'submitted'))}catch(e){}
    try{if(typeof updateProgress==='function')updateProgress()}catch(e){}
  }
  function makeShell(q,num,title,instruction){
    const card=document.createElement('article');
    card.className='question v103Worksheet';
    const head=document.createElement('div');
    head.className='v103WorksheetHead';
    head.innerHTML='<div class="badge">'+num+'</div><div><div class="qMeta">Atividade do folheto</div><strong>'+title+'</strong><p>'+instruction+'</p></div>';
    const body=document.createElement('div');body.className='v103WorksheetBody';
    const feedback=document.createElement('div');feedback.className='v103WorksheetFeedback';
    const footer=document.createElement('div');footer.className='v103WorksheetFooter';
    card.appendChild(head);card.appendChild(body);card.appendChild(feedback);card.appendChild(footer);
    return {card,body,feedback,footer};
  }
  function makeButton(label,cls){
    const b=document.createElement('button');b.type='button';b.className=cls||'v103Action';b.textContent=label;return b;
  }
  function setFeedback(box,text,kind){
    box.textContent=text||'';
    box.className='v103WorksheetFeedback'+(kind?' '+kind:'');
  }

  function buildX(q,num){
    const ui=makeShell(q,num,'Marque com X','Toque somente nas atitudes que ajudam a combater a desnutrição e a obesidade infantil.');
    const saved=readState(q,'marks',[]);
    const selected=new Set(Array.isArray(saved)?saved:[]);
    const rows=[];
    q.items.forEach((item,i)=>{
      const row=document.createElement('button');row.type='button';row.className='v103CheckRow';row.innerHTML='<span class="v103CheckBox">'+(selected.has(i)?'✕':'')+'</span><span>'+item.text+'</span>';
      row.addEventListener('click',()=>{if(isDone(q))return;selected.has(i)?selected.delete(i):selected.add(i);row.querySelector('.v103CheckBox').textContent=selected.has(i)?'✕':'';row.classList.remove('needReview');writeState(q,'marks',[...selected]);});
      rows.push(row);ui.body.appendChild(row);
    });
    const submit=makeButton('Concluir atividade','btn primary');
    const reset=makeButton('Limpar','btn secondary');
    submit.addEventListener('click',()=>{
      const wrong=q.items.map((item,i)=>selected.has(i)!==!!item.correct?i:-1).filter(i=>i>=0);
      rows.forEach((r,i)=>r.classList.toggle('needReview',wrong.includes(i)));
      if(wrong.length){setFeedback(ui.feedback,'Revise '+wrong.length+' item(ns) destacados e tente novamente.','warn');return}
      finish(q,'Atividade concluída.');setFeedback(ui.feedback,'Muito bem. As atitudes corretas foram identificadas.','ok');submit.disabled=true;reset.disabled=true;rows.forEach(r=>r.disabled=true);
    });
    reset.addEventListener('click',()=>{if(isDone(q))return;selected.clear();writeState(q,'marks',[]);rows.forEach(r=>{r.querySelector('.v103CheckBox').textContent='';r.classList.remove('needReview')});setFeedback(ui.feedback,'','')});
    ui.footer.appendChild(submit);ui.footer.appendChild(reset);
    if(isDone(q)){submit.disabled=true;reset.disabled=true;rows.forEach(r=>r.disabled=true);setFeedback(ui.feedback,'Atividade concluída.','ok')}
    return ui.card;
  }

  function buildClassify(q,num){
    const ui=makeShell(q,num,'Observe e classifique','Escolha se cada hábito ajuda a prevenir a desnutrição, a obesidade ou os dois.');
    const answers=readState(q,'answers',{});
    const rows=[];
    q.items.forEach((item,i)=>{
      const row=document.createElement('div');row.className='v103ClassifyRow';
      row.innerHTML='<div class="v103HabitIcon">'+item.icon+'</div><div class="v103HabitText">'+item.text+'</div><div class="v103ChoiceGroup"></div>';
      const group=row.querySelector('.v103ChoiceGroup');
      q.options.forEach((opt,idx)=>{
        const b=makeButton(opt,'v103Choice');
        if(String(answers[i])===String(idx))b.classList.add('active');
        b.addEventListener('click',()=>{if(isDone(q))return;answers[i]=idx;writeState(q,'answers',answers);group.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');row.classList.remove('needReview')});
        group.appendChild(b);
      });
      rows.push(row);ui.body.appendChild(row);
    });
    const submit=makeButton('Registrar respostas','btn primary');
    submit.addEventListener('click',()=>{
      const missing=q.items.map((_,i)=>answers[i]===undefined?i:-1).filter(i=>i>=0);
      rows.forEach((r,i)=>r.classList.toggle('needReview',missing.includes(i)));
      if(missing.length){setFeedback(ui.feedback,'Responda todos os hábitos antes de concluir.','warn');return}
      finish(q,'Respostas registradas.');setFeedback(ui.feedback,'Respostas registradas como no folheto.','ok');submit.disabled=true;rows.forEach(r=>r.querySelectorAll('button').forEach(b=>b.disabled=true));
    });
    ui.footer.appendChild(submit);
    if(isDone(q)){submit.disabled=true;rows.forEach(r=>r.querySelectorAll('button').forEach(b=>b.disabled=true));setFeedback(ui.feedback,'Atividade concluída.','ok')}
    return ui.card;
  }

  function buildFill(q,num){
    const ui=makeShell(q,num,'Complete as frases','Use as palavras do quadro para completar cada espaço.');
    const bank=document.createElement('div');bank.className='v103WordBank';bank.innerHTML='<strong>Palavras do quadro</strong><div>'+q.words.map(w=>'<span>'+w+'</span>').join('')+'</div>';ui.body.appendChild(bank);
    const answers=readState(q,'answers',{});
    const rows=[];
    q.items.forEach((item,i)=>{
      const row=document.createElement('label');row.className='v103FillRow';
      const before=document.createElement('span');before.textContent=item.before;
      const select=document.createElement('select');select.innerHTML='<option value="">Escolha</option>'+q.words.map((w,idx)=>'<option value="'+idx+'">'+w+'</option>').join('');
      if(answers[i]!==undefined&&answers[i]!==null)select.value=String(answers[i]);
      const after=document.createElement('span');after.textContent=item.after||'';
      select.addEventListener('change',()=>{if(isDone(q))return;answers[i]=select.value===''?null:Number(select.value);writeState(q,'answers',answers);row.classList.remove('needReview')});
      row.appendChild(before);row.appendChild(select);row.appendChild(after);rows.push({row,select});ui.body.appendChild(row);
    });
    const submit=makeButton('Conferir','btn primary');
    const reset=makeButton('Limpar','btn secondary');
    submit.addEventListener('click',()=>{
      const wrong=q.items.map((item,i)=>Number(answers[i])!==Number(item.correct)?i:-1).filter(i=>i>=0);
      rows.forEach((o,i)=>o.row.classList.toggle('needReview',wrong.includes(i)));
      if(wrong.length){setFeedback(ui.feedback,'Revise os espaços destacados e tente novamente.','warn');return}
      finish(q,'Atividade concluída.');setFeedback(ui.feedback,'Muito bem. Todas as frases foram completadas.','ok');submit.disabled=true;reset.disabled=true;rows.forEach(o=>o.select.disabled=true);
    });
    reset.addEventListener('click',()=>{if(isDone(q))return;Object.keys(answers).forEach(k=>delete answers[k]);writeState(q,'answers',{});rows.forEach(o=>{o.select.value='';o.row.classList.remove('needReview')});setFeedback(ui.feedback,'','')});
    ui.footer.appendChild(submit);ui.footer.appendChild(reset);
    if(isDone(q)){submit.disabled=true;reset.disabled=true;rows.forEach(o=>o.select.disabled=true);setFeedback(ui.feedback,'Atividade concluída.','ok')}
    return ui.card;
  }

  function buildFoods(q,num){
    const ui=makeShell(q,num,'Vamos conhecer os alimentos?','Pinte de verde os alimentos saudáveis e de vermelho os alimentos que devem ser consumidos com moderação.');
    const palette=document.createElement('div');palette.className='v103Palette';
    const green=makeButton('● Verde','v103Color green active');
    const red=makeButton('● Vermelho','v103Color red');
    palette.appendChild(green);palette.appendChild(red);ui.body.appendChild(palette);const hint=document.createElement('div');hint.className='v103PaintHint';hint.innerHTML='<strong>Como fazer:</strong> escolha uma cor e toque em cada alimento para pintá-lo.';ui.body.appendChild(hint);
    let active='green';
    function choose(color){active=color;green.classList.toggle('active',color==='green');red.classList.toggle('active',color==='red')}
    green.addEventListener('click',()=>choose('green'));red.addEventListener('click',()=>choose('red'));
    const grid=document.createElement('div');grid.className='v103FoodGrid';ui.body.appendChild(grid);
    const answers=readState(q,'paint',{});
    const cards=[];
    q.items.forEach((item,i)=>{
      const b=makeButton('','v103FoodCard');
      b.innerHTML='<span class="v103FoodIcon">'+item.icon+'</span><strong>'+item.name+'</strong><span class="v103PaintMark"></span>';
      function paint(){b.classList.remove('paintGreen','paintRed','needReview');if(answers[i]==='green')b.classList.add('paintGreen');if(answers[i]==='red')b.classList.add('paintRed');b.querySelector('.v103PaintMark').textContent=answers[i]==='green'?'VERDE':answers[i]==='red'?'VERMELHO':''}
      paint();
      b.addEventListener('click',()=>{if(isDone(q))return;answers[i]=active;writeState(q,'paint',answers);paint()});
      cards.push(b);grid.appendChild(b);
    });
    const submit=makeButton('Concluir pintura','btn primary');
    const reset=makeButton('Apagar cores','btn secondary');
    submit.addEventListener('click',()=>{
      const missing=q.items.map((_,i)=>answers[i]? -1:i).filter(i=>i>=0);
      if(missing.length){cards.forEach((c,i)=>c.classList.toggle('needReview',missing.includes(i)));setFeedback(ui.feedback,'Pinte todos os alimentos antes de concluir.','warn');return}
      const wrong=q.items.map((item,i)=>answers[i]!==item.correct?i:-1).filter(i=>i>=0);
      cards.forEach((c,i)=>c.classList.toggle('needReview',wrong.includes(i)));
      if(wrong.length){setFeedback(ui.feedback,'Revise '+wrong.length+' alimento(s) destacados. As cores ainda podem ser alteradas.','warn');return}
      finish(q,'Pintura concluída.');setFeedback(ui.feedback,'Muito bem. Todos os alimentos foram classificados.','ok');submit.disabled=true;reset.disabled=true;green.disabled=true;red.disabled=true;cards.forEach(c=>c.disabled=true);
    });
    reset.addEventListener('click',()=>{if(isDone(q))return;Object.keys(answers).forEach(k=>delete answers[k]);writeState(q,'paint',{});cards.forEach(c=>{c.classList.remove('paintGreen','paintRed','needReview');c.querySelector('.v103PaintMark').textContent=''})});
    ui.footer.appendChild(submit);ui.footer.appendChild(reset);
    if(isDone(q)){submit.disabled=true;reset.disabled=true;green.disabled=true;red.disabled=true;cards.forEach(c=>c.disabled=true);setFeedback(ui.feedback,'Atividade concluída.','ok')}
    return ui.card;
  }

  function buildWordSearch(q,num){
    const ui=makeShell(q,num,'Caça palavras','Encontre os alimentos que ajudam a manter a saúde. Depois toque em cada palavra encontrada.');
    const grid=document.createElement('div');grid.className='v103LetterGrid';
    q.rows.forEach(row=>{
      const r=document.createElement('div');r.className='v103LetterRow';
      row.replace(/\s+/g,'').split('').forEach(ch=>{const s=document.createElement('span');s.textContent=ch;r.appendChild(s)});
      grid.appendChild(r);
    });
    ui.body.appendChild(grid);
    const found=new Set(readState(q,'found',[]));
    const list=document.createElement('div');list.className='v103FindWords';
    const buttons=[];
    q.words.forEach((w,i)=>{
      const b=makeButton(w,'v103WordPill'+(found.has(i)?' found':''));
      b.addEventListener('click',()=>{if(isDone(q))return;found.has(i)?found.delete(i):found.add(i);b.classList.toggle('found',found.has(i));writeState(q,'found',[...found])});
      buttons.push(b);list.appendChild(b);
    });
    ui.body.appendChild(list);
    const submit=makeButton('Concluir caça palavras','btn primary');
    submit.addEventListener('click',()=>{
      if(found.size!==q.words.length){setFeedback(ui.feedback,'Ainda faltam '+(q.words.length-found.size)+' palavra(s).','warn');return}
      finish(q,'Caça palavras concluído.');setFeedback(ui.feedback,'Muito bem. Todas as palavras foram encontradas.','ok');submit.disabled=true;buttons.forEach(b=>b.disabled=true);
    });
    ui.footer.appendChild(submit);
    if(isDone(q)){submit.disabled=true;buttons.forEach(b=>b.disabled=true);setFeedback(ui.feedback,'Atividade concluída.','ok')}
    return ui.card;
  }

  function buildBinary(q,num){
    const ui=makeShell(q,num,'Ligue cada situação ao problema correto','Leia cada situação e escolha OBESIDADE ou DESNUTRIÇÃO.');
    const answers=readState(q,'answers',{});
    const rows=[];
    q.items.forEach((item,i)=>{
      const row=document.createElement('div');row.className='v103BinaryRow';
      row.innerHTML='<div class="v103Situation">'+item.text+'</div><div class="v103BinaryChoices"></div>';
      const choices=row.querySelector('.v103BinaryChoices');
      q.options.forEach((opt,idx)=>{
        const b=makeButton(opt,'v103Choice'+(String(answers[i])===String(idx)?' active':''));
        b.addEventListener('click',()=>{if(isDone(q))return;answers[i]=idx;writeState(q,'answers',answers);choices.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');row.classList.remove('needReview')});
        choices.appendChild(b);
      });
      rows.push(row);ui.body.appendChild(row);
    });
    const submit=makeButton('Conferir ligações','btn primary');
    submit.addEventListener('click',()=>{
      const wrong=q.items.map((item,i)=>Number(answers[i])!==Number(item.correct)?i:-1).filter(i=>i>=0);
      rows.forEach((r,i)=>r.classList.toggle('needReview',wrong.includes(i)));
      if(wrong.length){setFeedback(ui.feedback,'Revise as situações destacadas.','warn');return}
      finish(q,'Atividade concluída.');setFeedback(ui.feedback,'Muito bem. Todas as ligações estão corretas.','ok');submit.disabled=true;rows.forEach(r=>r.querySelectorAll('button').forEach(b=>b.disabled=true));
    });
    ui.footer.appendChild(submit);
    if(isDone(q)){submit.disabled=true;rows.forEach(r=>r.querySelectorAll('button').forEach(b=>b.disabled=true));setFeedback(ui.feedback,'Atividade concluída.','ok')}
    return ui.card;
  }

  function buildTF(q,num){
    const ui=makeShell(q,num,'Verdadeiro ou falso','Marque V para verdadeiro e F para falso.');
    const answers=readState(q,'answers',{});
    const rows=[];
    q.items.forEach((item,i)=>{
      const row=document.createElement('div');row.className='v103TFRow';
      row.innerHTML='<div class="v103TFText">'+item.text+'</div><div class="v103TFChoices"></div>';
      const choices=row.querySelector('.v103TFChoices');
      ['V','F'].forEach((opt,idx)=>{
        const b=makeButton(opt,'v103TFButton'+(String(answers[i])===String(idx)?' active':''));
        b.addEventListener('click',()=>{if(isDone(q))return;answers[i]=idx;writeState(q,'answers',answers);choices.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');row.classList.remove('needReview')});
        choices.appendChild(b);
      });
      rows.push(row);ui.body.appendChild(row);
    });
    const submit=makeButton('Conferir','btn primary');
    submit.addEventListener('click',()=>{
      const wrong=q.items.map((item,i)=>Number(answers[i])!==Number(item.correct)?i:-1).filter(i=>i>=0);
      rows.forEach((r,i)=>r.classList.toggle('needReview',wrong.includes(i)));
      if(wrong.length){setFeedback(ui.feedback,'Revise as afirmações destacadas e tente novamente.','warn');return}
      finish(q,'Atividade concluída.');setFeedback(ui.feedback,'Muito bem. Todas as respostas estão corretas.','ok');submit.disabled=true;rows.forEach(r=>r.querySelectorAll('button').forEach(b=>b.disabled=true));
    });
    ui.footer.appendChild(submit);
    if(isDone(q)){submit.disabled=true;rows.forEach(r=>r.querySelectorAll('button').forEach(b=>b.disabled=true));setFeedback(ui.feedback,'Atividade concluída.','ok')}
    return ui.card;
  }

  function buildCustom(q,num){
    if(q.type==='visualX')return buildX(q,num);
    if(q.type==='visualClassify')return buildClassify(q,num);
    if(q.type==='visualFill')return buildFill(q,num);
    if(q.type==='visualFoods')return buildFoods(q,num);
    if(q.type==='visualWordSearch')return buildWordSearch(q,num);
    if(q.type==='visualBinary')return buildBinary(q,num);
    if(q.type==='visualTF')return buildTF(q,num);
    return null;
  }

  const f1X={
    id:'c5_f1_visual_x',type:'visualX',
    items:[
      {text:'Comer frutas, verduras e legumes todos os dias.',correct:true},
      {text:'Preferir refrigerantes e salgadinhos.',correct:false},
      {text:'Beber bastante água.',correct:true},
      {text:'Fazer atividade física regularmente.',correct:true},
      {text:'Dormir bem.',correct:true},
      {text:'Comer apenas doces e fast food.',correct:false},
      {text:'Respeitar os horários das refeições.',correct:true},
      {text:'Assistir muitas horas de TV e celular.',correct:false}
    ]
  };
  const f1Classify={
    id:'c5_f1_visual_classify',type:'visualClassify',
    options:['DESNUTRIÇÃO','OBESIDADE','OS DOIS'],
    items:[
      {icon:'🥗',text:'Comer comida de verdade'},
      {icon:'💧',text:'Beber água'},
      {icon:'🏃',text:'Praticar esportes'},
      {icon:'🍔',text:'Comer fast food todos os dias'},
      {icon:'😴',text:'Dormir bem'}
    ]
  };
  const f1Fill={
    id:'c5_f1_visual_fill',type:'visualFill',
    words:['saudáveis','água','atividade física','frutinhas','equilíbrio'],
    items:[
      {before:'a) Para crescer forte, eu preciso de uma alimentação ',after:'.',correct:0},
      {before:'b) Beber ',after:' todos os dias é muito importante.',correct:1},
      {before:'c) Eu gosto de comer ',after:' como maçã, banana e pera.',correct:3},
      {before:'d) Brincar e fazer ',after:' me deixa mais feliz e saudável.',correct:2},
      {before:'e) O segredo é ter ',after:' em tudo: na comida, na bebida e nas brincadeiras.',correct:4}
    ]
  };
  const f2Foods={
    id:'c5_f2_visual_foods',type:'visualFoods',
    items:[
      {name:'MAÇÃ',icon:'🍎',correct:'green'},
      {name:'BANANA',icon:'🍌',correct:'green'},
      {name:'HAMBÚRGUER',icon:'🍔',correct:'red'},
      {name:'BATATA FRITA',icon:'🍟',correct:'red'},
      {name:'LEGUMES',icon:'🥕',correct:'green'},
      {name:'REFRIGERANTE',icon:'🥤',correct:'red'},
      {name:'PEIXE',icon:'🐟',correct:'green'},
      {name:'DOCES',icon:'🍬',correct:'red'},
      {name:'ARROZ E FEIJÃO',icon:'🍚',correct:'green'},
      {name:'PÃO INTEGRAL',icon:'🍞',correct:'green'},
      {name:'IOGURTE',icon:'🥣',correct:'green'},
      {name:'CHOCOLATE',icon:'🍫',correct:'red'}
    ]
  };
  const f2WordSearch={
    id:'c5_f2_visual_wordsearch',type:'visualWordSearch',
    rows:['ALFRUTASX','VERDURASI','LEGUMESBX','PEIXELATE','AGUABANANA','IOGURTERX','CEREAISDS','PROTEINAS'],
    words:['FRUTAS','VERDURAS','LEGUMES','PEIXE','ÁGUA','BANANA','IOGURTE','CEREAIS','PROTEÍNAS']
  };
  const f2Binary={
    id:'c5_f2_visual_binary',type:'visualBinary',options:['OBESIDADE','DESNUTRIÇÃO'],
    items:[
      {text:'Come muita comida industrializada, quase não pratica atividade física e tem sobrepeso.',correct:0},
      {text:'Não tem acesso a uma alimentação adequada, come pouco e está muito magra.',correct:1},
      {text:'Tem dificuldade de concentração, está cansado e com baixa imunidade.',correct:1}
    ]
  };
  const f2TF={
    id:'c5_f2_visual_tf',type:'visualTF',
    items:[
      {text:'A obesidade pode causar diabetes e doenças do coração.',correct:0},
      {text:'A desnutrição é causada apenas pela falta de alimentos.',correct:1},
      {text:'Comer frutas, verduras e legumes ajuda a prevenir a obesidade e a desnutrição.',correct:0},
      {text:'O refrigerante e os salgadinhos fazem bem para o nosso corpo.',correct:1},
      {text:'A atividade física é importante para manter o peso saudável.',correct:0}
    ]
  };

  function install(){
    try{
      if(typeof subjects==='undefined'||!subjects?.science)return false;
      const f1=subjects.science.lessons.find(l=>String(l?.key||'')==='nutricao-folheto-1');
      const f2=subjects.science.lessons.find(l=>String(l?.key||'')==='nutricao-folheto-2');
      if(!f1||!f2)return false;
      const f1Open=(f1.questions||[]).filter(q=>['c5_f1_04a','c5_f1_04b'].includes(String(q?.id||'')));
      const f2Open=(f2.questions||[]).filter(q=>['c5_f2_05a','c5_f2_05b','c5_f2_05c'].includes(String(q?.id||'')));
      f1.questions=[f1X,f1Classify,f1Fill,...f1Open];
      f2.questions=[f2Foods,f2WordSearch,f2Binary,f2TF,...f2Open];
      f1.desc='Atividades visuais interativas no formato do folheto: marcar, classificar, completar, desenhar e escrever.';
      f2.desc='Atividades visuais interativas no formato do folheto: pintar alimentos, caça palavras, ligar, V ou F e responder.';
      subjects.science.homeDescription='Os dois folhetos de Ciências agora aparecem como atividades visuais interativas, preservando a lógica da folha usada em aula.';
      subjects.science.chips=['9 assuntos','Folhetos interativos','Pintar e marcar','Caça palavras'];
      subjects.science.hint='🔬 Nos dois últimos cards, faça as atividades diretamente no formato visual do folheto.';
      try{if(typeof currentSubjectKey!=='undefined'&&currentSubjectKey==='science')lessons=subjects.science.lessons}catch(e){}
      try{if(typeof renderSubjectCards==='function')renderSubjectCards()}catch(e){}
      try{if(typeof updateProgress==='function')updateProgress()}catch(e){}
      return true;
    }catch(e){return false}
  }

  function wrapRenderer(){
    try{
      if(typeof buildQuestion==='function'&&!buildQuestion.__v103Interactive){
        const previous=buildQuestion;
        const wrapped=function(q,num){
          if(q&&customTypes.has(String(q.type||'')))return buildCustom(q,num);
          return previous.apply(this,arguments);
        };
        wrapped.__v103Interactive=true;
        buildQuestion=wrapped;
      }
    }catch(e){}
    try{
      if(typeof renderLesson==='function'&&!renderLesson.__v103Interactive){
        const previous=renderLesson;
        const wrapped=function(lesson){
          if(['nutricao-folheto-1','nutricao-folheto-2'].includes(String(lesson?.key||'')))install();
          return previous.apply(this,arguments);
        };
        wrapped.__v103Interactive=true;
        renderLesson=wrapped;
      }
    }catch(e){}
  }

  function styles(){
    if(document.getElementById('v103InteractiveStyles'))return;
    const s=document.createElement('style');s.id='v103InteractiveStyles';
    s.textContent=[
      '.v103Worksheet{border:1px solid #e6dcc7;background:#fffdf7;box-shadow:0 12px 28px rgba(80,62,30,.06)}',
      '.v103WorksheetHead{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:start;margin-bottom:14px}',
      '.v103WorksheetHead p{margin:7px 0 0;color:#5f665f;line-height:1.45;font-size:14px}',
      '.v103WorksheetBody{display:flex;flex-direction:column;gap:12px}',
      '.v103WorksheetFooter{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}',
      '.v103WorksheetFeedback{min-height:22px;margin-top:12px;font-size:13px;font-weight:800}.v103WorksheetFeedback.ok{color:#24703d}.v103WorksheetFeedback.warn{color:#9a5e13}',
      '.v103CheckRow{width:100%;display:grid;grid-template-columns:36px 1fr;gap:10px;align-items:center;text-align:left;border:1px solid #ded8c8;background:#fff;padding:11px 12px;border-radius:14px;color:#30372f;font:inherit}',
      '.v103CheckBox{width:30px;height:30px;border:2px solid #5e6b61;border-radius:7px;display:grid;place-items:center;font-size:22px;font-weight:1000}',
      '.v103CheckRow.needReview,.v103ClassifyRow.needReview,.v103FillRow.needReview,.v103BinaryRow.needReview,.v103TFRow.needReview,.v103FoodCard.needReview{outline:3px solid #f1b44c;outline-offset:2px}',
      '.v103ClassifyRow,.v103BinaryRow,.v103TFRow{background:#fff;border:1px solid #e2dfd5;border-radius:16px;padding:12px}',
      '.v103ClassifyRow{display:grid;grid-template-columns:54px 1fr;gap:8px 12px;align-items:center}.v103HabitIcon{font-size:34px;text-align:center}.v103HabitText{font-weight:850}.v103ChoiceGroup{grid-column:1/-1;display:flex;gap:7px;flex-wrap:wrap}',
      '.v103Choice,.v103TFButton{border:1px solid #cbd6cc;background:#f7faf7;color:#33433a;border-radius:999px;padding:9px 12px;font-weight:850}.v103Choice.active,.v103TFButton.active{background:#dff4e5;border-color:#5ca66f;color:#22623a}',
      '.v103WordBank{padding:13px;border-radius:15px;background:#f2f7ea;border:1px dashed #9fbe85}.v103WordBank>div{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px}.v103WordBank span{padding:5px 9px;border-radius:999px;background:#fff;border:1px solid #d4e2c7;font-weight:750;font-size:13px}',
      '.v103FillRow{display:flex;align-items:center;gap:7px;flex-wrap:wrap;background:#fff;border:1px solid #e2dfd5;border-radius:14px;padding:11px 12px;line-height:1.55}.v103FillRow select{border:0;border-bottom:2px solid #76a76e;background:#f7fbf4;padding:7px 9px;font:inherit;font-weight:850;border-radius:7px}',
      '.v103Palette{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}.v103Color{min-width:128px;border:2px solid transparent;border-radius:999px;padding:10px 14px;font-weight:950;background:#fff}.v103Color.green{color:#287a43;border-color:#76b889}.v103Color.red{color:#b73c3c;border-color:#df8f8f}.v103Color.active{box-shadow:0 0 0 4px rgba(61,115,71,.12);transform:translateY(-1px)}',
      '.v103PaintHint{text-align:center;padding:9px 12px;border-radius:12px;background:#fff;border:1px dashed #cfc7b6;color:#5a5f58;font-size:13px;line-height:1.45}.v103PaintHint strong{color:#30372f}.v103FoodGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:760px;width:100%;margin:2px auto 0}.v103FoodCard{min-height:148px;border:2px solid #d9d8d1;border-radius:18px;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:14px 10px;color:#2e352f;box-shadow:0 5px 12px rgba(70,60,40,.05)}.v103FoodIcon{font-size:52px;line-height:1}.v103FoodCard strong{font-size:12px;text-align:center}.v103PaintMark{min-height:16px;font-size:10px;font-weight:1000;letter-spacing:.3px}.v103FoodCard.paintGreen{background:#e8f7e9;border-color:#55a86a;color:#236d39}.v103FoodCard.paintRed{background:#fdeaea;border-color:#d85f5f;color:#9f3434}',
      '.v103LetterGrid{align-self:center;max-width:100%;overflow:auto;background:#fff;border:2px solid #b6c99e;border-radius:16px;padding:10px}.v103LetterRow{display:grid;grid-auto-flow:column;grid-auto-columns:30px;gap:3px;margin:3px 0}.v103LetterRow span{width:30px;height:30px;display:grid;place-items:center;border-radius:5px;background:#f8fbf3;font-weight:950;font-size:14px;color:#3d503a}',
      '.v103FindWords{display:flex;gap:7px;flex-wrap:wrap;justify-content:center}.v103WordPill{border:1px solid #bbcbaa;background:#fff;border-radius:999px;padding:8px 11px;font-weight:900;color:#4d6247}.v103WordPill.found{background:#dff4e5;border-color:#59a66d;color:#24663b}.v103WordPill.found:before{content:"✓ ";}',
      '.v103Situation,.v103TFText{font-weight:750;line-height:1.5}.v103BinaryChoices,.v103TFChoices{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.v103TFButton{min-width:48px;font-size:16px}',
      '@media(max-width:760px){.v103FoodGrid{grid-template-columns:repeat(2,1fr)}}',
      '@media(max-width:520px){.v103FoodGrid{grid-template-columns:repeat(2,1fr)}.v103FoodCard{min-height:120px}.v103FoodIcon{font-size:42px}.v103LetterRow{grid-auto-columns:27px}.v103LetterRow span{width:27px;height:27px;font-size:13px}}'
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

  styles();wrapRenderer();install();stamp();
  let tries=0;
  const timer=setInterval(()=>{tries++;wrapRenderer();if(install()||tries>28)clearInterval(timer)},120);
})();