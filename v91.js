/* Lousa de Estudos v91 — runtime estável, sem atualização automática durante o uso */
(()=>{
  if(window.__lousaV91Stable)return;
  window.__lousaV91Stable=true;
  const VERSION=91, SEP='§';
  const JP_DATA=window.__v90JP_DATA||'', DN_DATA=window.__v90DN_DATA||'';
  const JP_PASSAGE=window.__v90JP_PASSAGE||'', DN_PASSAGE=window.__v90DN_PASSAGE||'';

  function buildQuestions(data,prefix){
    return String(data||'').split('\n').filter(Boolean).map((line,i)=>{
      const [text,answer,w1,w2]=line.split(SEP);
      const correct=(i+1)%3;
      const options=[null,null,null];
      const free=[0,1,2].filter(x=>x!==correct);
      options[correct]=answer; options[free[0]]=w1; options[free[1]]=w2;
      return {id:prefix+String(i+1).padStart(2,'0'),type:'mcq',reviewLabel:'📖 Consulte o texto acima',review:'Se tiver dúvida, volte ao texto de estudo antes de marcar a alternativa.',text,options,correct,explanation:'Resposta correta: '+answer+'.',expected:'Resposta correta: '+answer+'.'};
    });
  }

  function religionLessons(){
    return [
      {key:'joao-paulo-ii',emoji:'🕊️',title:'São João Paulo II',subtitle:'perguntas do material impresso',desc:'Texto completo de estudo e as mesmas perguntas da folha.',mission:'Ensino Religioso • São João Paulo II',passageTitle:'São João Paulo II — texto completo para estudar',passage:JP_PASSAGE,passageVisual:'Karol Józef Wojtyła • fé • coragem • juventude • paz',questions:buildQuestions(JP_DATA,'rel90_jp')},
      {key:'daniel',emoji:'📖',title:'Livro de Daniel',subtitle:'perguntas do material impresso',desc:'Texto completo de estudo e as mesmas perguntas da folha.',mission:'Ensino Religioso • Livro de Daniel',passageTitle:'Livro de Daniel — texto completo para estudar',passage:DN_PASSAGE,passageVisual:'Daniel • Babilônia • sonhos • fidelidade • oração • justiça',questions:buildQuestions(DN_DATA,'rel90_dn')}
    ];
  }

  let religionSubject=null;
  function installReligion(){
    try{
      if(typeof subjects==='undefined'||!subjects)return false;
      if(!religionSubject){
        const base=subjects.religion||{};
        religionSubject={...base,key:'religion',title:'Ensino Religioso',emoji:'🙏',homeDescription:'Leia o texto completo e responda às perguntas exatamente como aparecem no material impresso.',hint:'💡 As respostas estão no próprio texto da lição.',chips:['São João Paulo II','Livro de Daniel','Perguntas do material impresso'],lessons:religionLessons(),__v91Stable:true};
      }else religionSubject.lessons=religionLessons();
      subjects.religion=religionSubject;
      return true;
    }catch(e){return false;}
  }

  function patchUnlock(){
    try{
      if(typeof isLessonUnlocked==='function'&&!isLessonUnlocked.__v91Religion){
        const previous=isLessonUnlocked;
        const wrapped=function(index){if(String(typeof currentSubjectKey!=='undefined'?currentSubjectKey:'')==='religion')return true;return previous.apply(this,arguments)};
        wrapped.__v91Religion=true; isLessonUnlocked=wrapped;
      }
    }catch(e){}
  }

  function patchTheme(){
    try{
      if(typeof applySubjectTheme==='function'&&!applySubjectTheme.__v91Religion){
        const previous=applySubjectTheme;
        const wrapped=function(subject){const out=previous.apply(this,arguments);if(subject&&subject.key==='religion'){const subtitle=document.getElementById('brandSubtitle');if(subtitle)subtitle.textContent='5º ano • revisão de Ensino Religioso'}return out};
        wrapped.__v91Religion=true; applySubjectTheme=wrapped;
      }
    }catch(e){}
  }

  function styles(){
    if(document.getElementById('v91ReligionStyles'))return;
    const s=document.createElement('style'); s.id='v91ReligionStyles';
    s.textContent='.subjectCard.religion{background:linear-gradient(145deg,#fffdf5 0%,#fff5d9 100%);border-color:#ead7a4}.readingText .v90StudyLead{margin:0 0 18px;padding:14px 15px;border:1px solid #d7e8dd;background:#f2fbf5;border-radius:16px;line-height:1.6;color:#284234}.readingText h3{margin:22px 0 8px;font-size:1.08em;line-height:1.35;color:#26352d}.readingText h3:first-of-type{margin-top:6px}.readingText p{margin:0 0 12px;line-height:1.72}.readingText .v90Sources{margin-top:22px;padding:12px 14px;border-radius:14px;background:#f7f7f7;border:1px solid #e5e7eb;font-size:.82em;line-height:1.55;color:#667085}';
    document.head.appendChild(s);
  }

  function stamp(){
    try{
      window.__lousaCurrentContentVersion=VERSION;
      const meta=document.querySelector('meta[name="app-version"]'); if(meta)meta.content=String(VERSION);
      document.documentElement.dataset.contentVersion=String(VERSION);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>{el.textContent='v'+VERSION;el.classList.remove('pending')});
    }catch(e){}
  }

  function refresh(){
    installReligion(); patchUnlock(); patchTheme(); styles(); stamp();
    try{if(typeof renderSubjectCards==='function')renderSubjectCards()}catch(e){}
    try{if(typeof updateProgress==='function')updateProgress()}catch(e){}
  }

  refresh();
  setTimeout(refresh,250);
  setTimeout(()=>{refresh();document.getElementById('v91VersionBootHide')?.remove()},1200);
  window.__lousaV91Ready=true;
})();
