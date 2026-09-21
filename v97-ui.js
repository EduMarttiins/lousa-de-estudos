/* v97 — Matemática 7º ano no formato do livro */
(()=>{
  const VERSION=97;

  function storage(q,part){
    try{return typeof key==='function'?key(q.id,part):'lousa:'+q.id+':'+part}catch(e){return 'lousa:'+q.id+':'+part}
  }
  function submitted(q){
    try{return typeof isSubmitted==='function'?isSubmitted(q):localStorage.getItem(storage(q,'submitted'))==='1'}catch(e){return false}
  }
  function choice(q){
    try{return typeof getChoice==='function'?getChoice(q):localStorage.getItem(storage(q,'choice'))}catch(e){return null}
  }

  function install(){
    if(typeof buildQuestion!=='function'||buildQuestion.__v97BookLayout)return false;
    const previous=buildQuestion;
    const wrapped=function(q,num){
      const card=previous.apply(this,arguments);
      if(!q||!String(q.id||'').startsWith('m7_')||!card)return card;
      card.classList.add('v97BookQuestion');

      /* preserva literalmente o enunciado do livro */
      const strong=card.querySelector('.qTitle strong');
      if(strong){
        strong.textContent=String(q.text||'');
        strong.style.whiteSpace='pre-line';
      }
      const meta=card.querySelector('.qMeta');
      if(meta)meta.style.display='none';

      /* identificação fica fora do enunciado */
      const titleBox=card.querySelector('.qTitle > div:last-child');
      if(titleBox&&q.source&&!card.querySelector('.v97BookSource')){
        const badge=document.createElement('div');
        badge.className='v97BookSource';
        badge.textContent='📘 '+q.source;
        titleBox.insertBefore(badge,strong||titleBox.firstChild);
      }

      /* remove orientações antes da questão: livro → alternativas → lousa */
      card.querySelector('.v97Math7Instruction')?.remove();
      card.querySelector('.studyHelp')?.remove();

      const layout=card.querySelector('.mcqLayout');
      const options=card.querySelector('.options');
      const scratch=card.querySelector('.scratchCard');
      if(layout){
        layout.style.display='block';
        if(options&&options.parentNode===layout)layout.insertBefore(options,layout.firstChild);
        if(scratch&&scratch.parentNode===layout)layout.appendChild(scratch);
      }
      if(options)options.style.display='grid';

      if(scratch){
        const title=scratch.querySelector('.scratchHeader strong');
        const subtitle=scratch.querySelector('.scratchHeader span');
        const hint=scratch.querySelector('.penHint');
        if(title)title.textContent='Whiteboard';
        if(subtitle)subtitle.textContent='Faça a conta ou o rascunho aqui antes de enviar a resposta.';
        if(hint)hint.textContent='Use a caneta do tablet ou o dedo.';
      }

      const actions=card.querySelector('.actions');
      const gate=card.querySelector('.explainGate');
      const explainer=card.querySelector('.explainer');
      if(gate)gate.style.display='none';
      if(explainer)explainer.style.display='none';

      let solution=card.querySelector('.v97BookSolution');
      if(!solution){
        solution=document.createElement('section');
        solution.className='v97BookSolution';
        solution.innerHTML='<button type="button" class="v97SolutionToggle" aria-expanded="false"><span>🧮 Como montar a conta</span><b>Ver resolução</b></button><div class="v97SolutionBody"><div class="v97SolutionLabel">Resolução do livro</div><div class="v97SolutionText"></div><button type="button" class="v97TryAgain">Tentar novamente</button></div>';
        if(actions&&actions.parentNode)actions.parentNode.insertBefore(solution,actions.nextSibling);
        else card.appendChild(solution);

        const toggle=solution.querySelector('.v97SolutionToggle');
        const body=solution.querySelector('.v97SolutionBody');
        toggle.addEventListener('click',()=>{
          const open=solution.classList.toggle('open');
          toggle.setAttribute('aria-expanded',open?'true':'false');
          toggle.querySelector('b').textContent=open?'Ocultar resolução':'Ver resolução';
          if(open)body.scrollIntoView({behavior:'smooth',block:'nearest'});
        });
        solution.querySelector('.v97TryAgain').addEventListener('click',()=>{
          try{
            localStorage.removeItem(storage(q,'submitted'));
            localStorage.removeItem(storage(q,'explained'));
            localStorage.removeItem(storage(q,'choice'));
          }catch(e){}
          card.querySelectorAll('.options input').forEach(input=>{input.checked=false;input.disabled=false});
          card.querySelectorAll('.option').forEach(label=>label.classList.remove('locked','correct','wrong'));
          const submit=card.querySelector('.actions .btn.primary');
          if(submit){submit.textContent='Enviar resposta';submit.disabled=true}
          const seal=card.querySelector('.statusSeal');if(seal)seal.textContent='';
          const feedback=card.querySelector('.feedback');if(feedback)feedback.textContent='Responda primeiro.';
          solution.classList.remove('show','open');
          const t=solution.querySelector('.v97SolutionToggle');if(t){t.setAttribute('aria-expanded','false');t.querySelector('b').textContent='Ver resolução'}
          try{if(typeof updateProgress==='function')updateProgress()}catch(e){}
          card.scrollIntoView({behavior:'smooth',block:'center'});
        });
      }

      const text=solution.querySelector('.v97SolutionText');
      if(text)text.textContent=String(q.explanation||q.expected||'').trim();

      function syncSolution(){
        const sent=submitted(q);
        solution.classList.toggle('show',sent);
        const retry=solution.querySelector('.v97TryAgain');
        const ch=choice(q);
        const wrong=sent&&String(ch)!==String(q.correct);
        if(retry)retry.style.display=wrong?'inline-flex':'none';
      }

      const submit=card.querySelector('.actions .btn.primary');
      if(submit)submit.addEventListener('click',()=>setTimeout(syncSolution,0));
      syncSolution();
      return card;
    };
    wrapped.__v97BookLayout=true;
    buildQuestion=wrapped;
    return true;
  }

  function styles(){
    if(document.getElementById('v97BookStyles'))return;
    const s=document.createElement('style');
    s.id='v97BookStyles';
    s.textContent=`
      .v97BookQuestion .qTitle strong{white-space:pre-line!important;line-height:1.58!important}
      .v97BookSource{display:inline-flex;align-items:center;margin:0 0 9px;padding:5px 9px;border-radius:999px;background:#eef2ff;color:#4338ca;font-size:11px;font-weight:850}
      .v97BookQuestion .mcqLayout{display:block!important}
      .v97BookQuestion .options{display:grid!important;width:100%!important;margin:14px 0 18px!important}
      .v97BookQuestion .scratchCard{display:block!important;width:100%!important;max-width:none!important;margin:0 0 18px!important}
      .v97BookQuestion .scratchBoard,.v97BookQuestion .scratchBoard .canvasWrap{background:#fff!important;background-image:none!important}
      .v97BookQuestion .explainGate,.v97BookQuestion .explainer{display:none!important}
      .v97BookSolution{display:none;margin:14px 0 0;border:1px solid #f0b8d1;border-radius:18px;background:#fff8fc;overflow:hidden}
      .v97BookSolution.show{display:block}
      .v97SolutionToggle{width:100%;border:0;background:#fff0f7;color:#9d174d;padding:15px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;font-weight:900;text-align:left}
      .v97SolutionToggle b{font-size:12px;color:#be185d}
      .v97SolutionBody{display:none;padding:16px 18px 18px}
      .v97BookSolution.open .v97SolutionBody{display:block}
      .v97SolutionLabel{font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;color:#be185d;margin-bottom:9px}
      .v97SolutionText{white-space:pre-line;font-size:15px;line-height:1.65;color:#be185d;font-weight:700}
      .v97TryAgain{margin-top:16px;border:1px solid #cbd5e1;background:#fff;color:#334155;border-radius:12px;padding:10px 14px;font-weight:850}
    `;
    document.head.appendChild(s);
  }

  function stamp(){
    try{
      window.__lousaCurrentContentVersion=VERSION;
      const meta=document.querySelector('meta[name="app-version"]');if(meta)meta.content=String(VERSION);
      document.documentElement.dataset.contentVersion=String(VERSION);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>{el.textContent='v'+VERSION;el.style.visibility='';});
    }catch(e){}
  }

  styles();
  install();
  stamp();
})();