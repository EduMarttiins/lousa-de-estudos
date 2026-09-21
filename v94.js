/* Lousa de Estudos v94 — textos completos de Geografia + runtime estável */
(()=>{
  if(window.__lousaV94Stable)return;
  window.__lousaV94Stable=true;
  const VERSION=94, SEP='§';
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

  const GEO_TEXTS={
    cidades:{
      title:'Crescimento das cidades — texto completo para estudar',
      visual:'campo → cidade • expansão urbana • serviços públicos • planejamento',
      passage:`<div class="v94StudyLead"><strong>📚 Como estudar:</strong> leia este texto antes das questões. As informações necessárias para responder estão explicadas aqui.</div>
      <h3>Crescimento e expansão urbana</h3>
      <p><strong>Expansão urbana</strong> é a ampliação das áreas urbanizadas, ou seja, quando a cidade passa a ocupar uma área maior. O crescimento das cidades está ligado ao aumento da população urbana. Um dos movimentos que contribuiu para esse processo foi o <strong>êxodo rural</strong>, que é a saída de pessoas do campo para viver nas cidades, muitas vezes em busca de trabalho e melhores condições de vida.</p>
      <h3>Problemas quando a cidade cresce sem planejamento</h3>
      <p>Quando a população e a área urbana crescem rapidamente, aumenta a necessidade de <strong>moradia, transporte, escolas, unidades de saúde, saneamento e outros serviços públicos</strong>. Se o planejamento e a infraestrutura não acompanham esse crescimento, bairros periféricos podem ter menos serviços e equipamentos públicos.</p>
      <p>O crescimento urbano também pode aumentar o <strong>trânsito e os congestionamentos</strong>, porque mais pessoas e veículos passam a usar as mesmas vias. A produção de <strong>lixo</strong> pode crescer, assim como problemas de poluição e redução de áreas verdes.</p>
      <p>A dificuldade de acesso a moradias adequadas pode levar famílias a ocupar <strong>terrenos inadequados, áreas de risco ou locais sem infraestrutura suficiente</strong>. Por isso, moradia e planejamento urbano estão relacionados.</p>
      <h3>O papel das políticas públicas</h3>
      <p>Políticas públicas podem ampliar transporte coletivo, saneamento, escolas, serviços de saúde, moradias adequadas e áreas verdes. O principal desafio é fazer a cidade crescer com <strong>planejamento, infraestrutura, acesso a serviços e cuidado ambiental</strong>, tornando o espaço urbano mais justo e sustentável.</p>`
    },
    desigualdade:{
      title:'Desigualdades socioeconômicas — texto completo para estudar',
      visual:'renda • educação • moradia • saúde • trabalho • políticas públicas',
      passage:`<div class="v94StudyLead"><strong>📚 Como estudar:</strong> todas as ideias usadas nas questões estão reunidas neste texto.</div>
      <h3>O que é desigualdade socioeconômica?</h3>
      <p><strong>Desigualdade socioeconômica</strong> acontece quando pessoas ou grupos não têm as mesmas condições de vida, oportunidades e acesso a recursos. Ela pode ser percebida nas diferenças de <strong>renda, educação, moradia, saúde, emprego, transporte, saneamento e outros serviços básicos</strong>.</p>
      <h3>Por que essas desigualdades existem?</h3>
      <p>As desigualdades têm causas <strong>históricas, econômicas, sociais, políticas e geográficas</strong>. No Brasil, processos iniciados no período colonial, como a exploração dos povos indígenas e a escravização de africanos, deixaram consequências que ajudam a compreender desigualdades atuais.</p>
      <p>Diferenças de salário e a dificuldade de conseguir emprego formal são exemplos de fatores <strong>econômicos</strong>. A falta de saneamento, serviços de saúde, transporte e moradia adequada mostra desigualdades <strong>sociais e de infraestrutura</strong>.</p>
      <h3>Desigualdade no espaço</h3>
      <p>Ela pode aparecer entre diferentes regiões do país e também entre <strong>bairros da mesma cidade</strong>. O contraste entre uma área com moradias precárias e um bairro rico pode revelar diferenças de renda, infraestrutura, serviços e oportunidades, mesmo quando os lugares estão próximos.</p>
      <h3>Como reduzir as desigualdades?</h3>
      <p>Políticas públicas de educação, saúde, moradia, saneamento, transporte e geração de oportunidades podem reduzir desigualdades. Quando esses investimentos não chegam de forma suficiente a determinados grupos ou bairros, as diferenças podem aumentar. A <strong>participação da sociedade</strong> também é importante para cobrar direitos, apresentar necessidades e acompanhar as ações públicas.</p>`
    },
    diversidade:{
      title:'Diferenças étnicas e culturais — texto completo para estudar',
      visual:'povos indígenas • povos africanos • europeus • imigração • diversidade',
      passage:`<div class="v94StudyLead"><strong>📚 Como estudar:</strong> use este texto para revisar a formação cultural brasileira e as desigualdades estudadas no livro.</div>
      <h3>A formação da diversidade brasileira</h3>
      <p>A cultura brasileira foi formada pela presença e contribuição de muitos povos. Os <strong>povos indígenas</strong> são povos originários, pois já viviam neste território antes da colonização europeia. Povos africanos foram trazidos à força durante a escravidão. Europeus e, em outros períodos, imigrantes de várias partes do mundo também participaram da formação da sociedade brasileira.</p>
      <p>Esse encontro entre povos <strong>não aconteceu sempre de maneira pacífica</strong>. A história inclui colonização, escravidão, conflitos, violência e também muitas formas de resistência.</p>
      <h3>Diversidade não é desigualdade</h3>
      <p><strong>Diversidade cultural</strong> significa a existência de diferentes costumes, conhecimentos, religiões, comidas, músicas, festas, línguas e modos de viver. Já a <strong>desigualdade social</strong> existe quando certos grupos têm menos acesso a direitos, recursos e oportunidades. Ser diferente culturalmente não deveria significar ter menos direitos.</p>
      <h3>Desigualdades étnico-raciais</h3>
      <p>As desigualdades que atingem de forma mais intensa populações <strong>preta, parda e indígena</strong> estão relacionadas a processos históricos e sociais. O termo <strong>racismo estrutural</strong> ajuda a compreender desigualdades raciais que permanecem nas estruturas e oportunidades da sociedade, indo além de um caso isolado de preconceito.</p>
      <p>A cor da pele ou a origem de uma pessoa <strong>não determina que alguém seja melhor ou pior</strong>. Todas as pessoas têm a mesma dignidade e direitos. Valorizar culturas que foram pouco reconhecidas historicamente ajuda a combater preconceitos e apagamentos e a reconhecer a contribuição desses povos para o Brasil.</p>
      <p>Música, culinária, festas, religiões, palavras e costumes são exemplos de manifestações culturais brasileiras que receberam contribuições de diferentes povos.</p>`
    },
    saopaulo:{
      title:'Diversidade cultural em São Paulo — texto completo para estudar',
      visual:'imigração • migração interna • capoeira • macarronada • artes marciais',
      passage:`<div class="v94StudyLead"><strong>📚 Como estudar:</strong> o texto explica os conceitos e os exemplos culturais usados nas perguntas.</div>
      <h3>Imigração e migração interna</h3>
      <p><strong>Imigração</strong> é a entrada de pessoas vindas de outro país para morar em um novo lugar. Já a <strong>migração interna</strong> acontece quando as pessoas mudam de região ou de estado, mas continuam dentro do mesmo país.</p>
      <p>A população de São Paulo foi formada pela chegada de pessoas de muitas origens. Houve imigração internacional e também migração de brasileiros vindos de outras regiões e estados, muitas vezes em busca de trabalho e melhores condições de vida. Esses movimentos ajudaram a formar uma sociedade culturalmente diversa.</p>
      <h3>Marcas culturais de diferentes povos</h3>
      <p>Os grupos que chegam a um lugar levam costumes, comidas, músicas, festas, religiões, conhecimentos e outras práticas. No conteúdo estudado, a <strong>capoeira</strong> é ligada às culturas africanas e afro-brasileiras; a <strong>macarronada</strong> aparece associada à influência italiana; e práticas de <strong>artes marciais</strong> aparecem relacionadas à influência japonesa. A viola caipira também faz parte das manifestações culturais presentes no estado de São Paulo.</p>
      <p>Por isso, duas manifestações culturais que podem ser citadas são, por exemplo, capoeira e macarronada, ou viola caipira e artes marciais.</p>
      <h3>Visibilidade e valorização</h3>
      <p>Nem todas as culturas receberam o mesmo reconhecimento ao longo da história. Desigualdades e preconceitos fizeram com que algumas manifestações fossem menos valorizadas ou tivessem menor visibilidade. Conhecer e respeitar diferentes heranças culturais ajuda a reconhecer a importância de todos os grupos que participaram da formação da sociedade.</p>`
    },
    jornal:{
      title:'Desigualdade social nas notícias — texto completo para estudar',
      visual:'fonte • dados • pobreza • serviços básicos • leitura crítica',
      passage:`<div class="v94StudyLead"><strong>📚 Como estudar:</strong> observe os números e também o que eles significam para a vida das pessoas.</div>
      <h3>Desigualdade e acesso a direitos</h3>
      <p>A desigualdade social está relacionada à <strong>má distribuição de renda e de oportunidades</strong>. Ela também aparece quando parte da população tem mais dificuldade de acessar serviços básicos, como <strong>saúde, educação, transporte e saneamento</strong>. Pobreza, desemprego e desnutrição podem estar relacionados a esse cenário de desigualdade.</p>
      <h3>O que os dados da notícia mostram?</h3>
      <p>A reportagem estudada compara dados de pobreza. Em <strong>2022</strong>, eram citadas cerca de <strong>67,7 milhões</strong> de pessoas abaixo da linha de pobreza. Em <strong>2023</strong>, esse número caiu para cerca de <strong>59,0 milhões</strong>. Portanto, houve <strong>diminuição</strong>, com uma diferença de aproximadamente <strong>8,7 milhões de pessoas</strong>.</p>
      <p>Uma melhora no indicador não significa que o problema foi resolvido: ainda havia milhões de pessoas em situação de pobreza e as desigualdades continuavam existindo.</p>
      <h3>Quem pode ser mais afetado?</h3>
      <p>O conteúdo chama atenção para grupos que podem ser atingidos de forma mais intensa pelas desigualdades, como <strong>crianças, adolescentes, idosos, mulheres e pessoas pretas ou pardas</strong>.</p>
      <h3>Como ler uma notícia de forma crítica?</h3>
      <p>É importante verificar a <strong>fonte</strong> da informação para saber de onde vêm os dados e poder avaliar sua confiabilidade. Os números ajudam a comparar períodos, grupos e regiões e dão dimensão ao problema. Um leitor crítico também pode perguntar: de que período são os dados? quais grupos ou regiões são mais afetados? qual é a fonte? quais fatores ajudam a explicar o resultado?</p>`
    },
    tecnologia:{
      title:'Tecnologia, trabalho e desemprego — texto completo para estudar',
      visual:'desocupação • automação • novas profissões • qualificação • acesso digital',
      passage:`<div class="v94StudyLead"><strong>📚 Como estudar:</strong> este texto reúne os conceitos necessários para responder às questões sobre tecnologia e trabalho.</div>
      <h3>Taxa de desocupação</h3>
      <p>A <strong>taxa de desocupação</strong> é um indicador usado para mostrar a porcentagem de pessoas em idade de trabalhar que estão desempregadas no grupo considerado. Gráficos com taxas por região ajudam a comparar onde a desocupação é maior ou menor.</p>
      <h3>Tecnologia muda o trabalho</h3>
      <p>O avanço tecnológico pode <strong>substituir algumas tarefas</strong> realizadas por trabalhadores, mas também pode criar <strong>novas funções, profissões e áreas de trabalho</strong>. O autopagamento ou autoatendimento em lojas é um exemplo de <strong>automação</strong>: a tecnologia passa a realizar parte de uma tarefa que antes dependia diretamente de um trabalhador.</p>
      <p>Ao mesmo tempo, áreas como <strong>Engenharia, Robótica, Medicina, Computação e Educação</strong> passam por mudanças e podem gerar novas demandas de trabalho.</p>
      <h3>Qualificação e acesso</h3>
      <p>Novas tecnologias exigem que muitas pessoas aprendam novos conhecimentos e formas de trabalhar. Por isso, a <strong>qualificação profissional</strong> e a capacidade de aprender a usar ferramentas e tecnologias são importantes. Ter acesso a computadores, internet e outros recursos tecnológicos também pode influenciar as oportunidades de estudo e trabalho.</p>
      <p>Um efeito positivo da tecnologia pode ser a criação de novas profissões e oportunidades. Um possível efeito negativo da automação é a redução ou substituição de determinadas tarefas, exigindo que trabalhadores se requalifiquem. Para as profissões do futuro, saber aprender novas ferramentas e desenvolver habilidades digitais pode ser importante.</p>`
    }
  };

  let religionSubject=null;
  function installReligion(){
    try{
      if(typeof subjects==='undefined'||!subjects)return false;
      if(!religionSubject){
        const base=subjects.religion||{};
        religionSubject={...base,key:'religion',title:'Ensino Religioso',emoji:'🙏',homeDescription:'Leia o texto completo e responda às perguntas exatamente como aparecem no material impresso.',hint:'💡 As respostas estão no próprio texto da lição.',chips:['São João Paulo II','Livro de Daniel','Perguntas do material impresso'],lessons:religionLessons(),__v93Stable:true};
      }else religionSubject.lessons=religionLessons();
      subjects.religion=religionSubject;
      return true;
    }catch(e){return false}
  }

  function installGeographyTexts(){
    try{
      if(typeof subjects==='undefined'||!subjects?.geography||!Array.isArray(subjects.geography.lessons))return false;
      subjects.geography.lessons.forEach(lesson=>{
        const item=GEO_TEXTS[lesson?.key];
        if(!item)return;
        lesson.passageTitle=item.title;
        lesson.passage=item.passage;
        lesson.passageVisual=item.visual;
      });
      subjects.geography.homeDescription='Leia o texto de revisão de cada lição e depois responda. As informações necessárias estão explicadas no próprio conteúdo.';
      subjects.geography.hint='🌍 Se tiver dúvida em uma questão, volte ao texto da lição: ele foi ampliado para ajudar a encontrar a resposta.';
      return true;
    }catch(e){return false}
  }

  function patchUnlock(){
    try{
      if(typeof isLessonUnlocked==='function'&&!isLessonUnlocked.__v93Religion){
        const previous=isLessonUnlocked;
        const wrapped=function(index){if(String(typeof currentSubjectKey!=='undefined'?currentSubjectKey:'')==='religion')return true;return previous.apply(this,arguments)};
        wrapped.__v93Religion=true; isLessonUnlocked=wrapped;
      }
    }catch(e){}
  }

  function patchTheme(){
    try{
      if(typeof applySubjectTheme==='function'&&!applySubjectTheme.__v93Religion){
        const previous=applySubjectTheme;
        const wrapped=function(subject){const out=previous.apply(this,arguments);if(subject&&subject.key==='religion'){const subtitle=document.getElementById('brandSubtitle');if(subtitle)subtitle.textContent='5º ano • revisão de Ensino Religioso'}return out};
        wrapped.__v93Religion=true; applySubjectTheme=wrapped;
      }
    }catch(e){}
  }

  function styles(){
    if(document.getElementById('v93StudyStyles'))return;
    const s=document.createElement('style'); s.id='v93StudyStyles';
    s.textContent='.subjectCard.religion{background:linear-gradient(145deg,#fffdf5 0%,#fff5d9 100%);border-color:#ead7a4}.readingText .v90StudyLead,.readingText .v94StudyLead{margin:0 0 18px;padding:14px 15px;border:1px solid #d7e8dd;background:#f2fbf5;border-radius:16px;line-height:1.6;color:#284234}.readingText h3{margin:22px 0 8px;font-size:1.08em;line-height:1.35;color:#26352d}.readingText h3:first-of-type{margin-top:6px}.readingText p{margin:0 0 12px;line-height:1.72}.readingText .v90Sources{margin-top:22px;padding:12px 14px;border-radius:14px;background:#f7f7f7;border:1px solid #e5e7eb;font-size:.82em;line-height:1.55;color:#667085}';
    document.head.appendChild(s);
  }


  let selectedGrade=(localStorage.getItem('lousa:selectedGrade')==='7'?'7':'5');
  let math5Snapshot=null;
  let gradeSystemInstalled=false;

  function snapshotMath5(){
    try{
      if(!math5Snapshot&&typeof subjects!=='undefined'&&subjects.math){
        const m=subjects.math;
        math5Snapshot={key:'math',emoji:m.emoji,title:m.title,subtitle:m.subtitle,accent:m.accent,dark:m.dark,soft:m.soft,bg:m.bg,blue:m.blue,blueSoft:m.blueSoft,lineSoft:m.lineSoft,lessons:m.lessons,homeTitle:m.homeTitle,homeDescription:m.homeDescription,chips:Array.isArray(m.chips)?m.chips.slice():[],hint:m.hint};
      }
      return !!math5Snapshot;
    }catch(e){return false}
  }

  function applyGradeData(){
    try{
      if(!snapshotMath5()||typeof subjects==='undefined'||!subjects.math)return false;
      const source=selectedGrade==='7'?window.__v94Math7Subject:math5Snapshot;
      if(!source)return false;
      const target=subjects.math;
      ['key','emoji','title','subtitle','accent','dark','soft','bg','blue','blueSoft','lineSoft','lessons','homeTitle','homeDescription','chips','hint'].forEach(k=>{
        if(source[k]!==undefined)target[k]=Array.isArray(source[k])?source[k].slice():source[k];
      });
      return true;
    }catch(e){return false}
  }

  function gradeSubjects(){
    try{
      if(typeof subjects==='undefined')return [];
      if(selectedGrade==='7')return subjects.math?[subjects.math]:[];
      return Object.values(subjects);
    }catch(e){return []}
  }

  function syncGradeHero(){
    try{
      const view=document.getElementById('subjectView'); if(!view)return;
      const title=view.querySelector('h2');
      const desc=view.querySelector(':scope > p');
      if(title)title.textContent=selectedGrade==='7'?'Matérias do 7º ano':'Escolha a matéria';
      if(desc)desc.textContent=selectedGrade==='7'
        ?'Revisão preparatória para a Prova Paulista do 3º bimestre. Nesta primeira etapa, o 7º ano tem Matemática.'
        :'Revisões do 5º ano organizadas por matéria, com textos de estudo, atividades e explicações.';
      document.querySelectorAll('#v94GradePicker .v94GradeBtn').forEach(btn=>{
        const active=btn.dataset.grade===selectedGrade;
        btn.classList.toggle('active',active);
        btn.setAttribute('aria-pressed',active?'true':'false');
      });
    }catch(e){}
  }

  function ensureGradePicker(){
    try{
      const view=document.getElementById('subjectView'),grid=document.getElementById('subjectGrid');
      if(!view||!grid)return;
      let host=document.getElementById('v94GradePicker');
      if(!host){
        host=document.createElement('div');
        host.id='v94GradePicker';
        host.className='v94GradePicker';
        host.innerHTML='<div class="v94GradeTitle"><strong>Qual ano vamos revisar?</strong><span>Escolha o ano escolar antes da matéria.</span></div><div class="v94GradeActions"><button type="button" class="v94GradeBtn" data-grade="5">5º ano</button><button type="button" class="v94GradeBtn" data-grade="7">7º ano</button></div>';
        grid.parentNode.insertBefore(host,grid);
        host.querySelectorAll('.v94GradeBtn').forEach(btn=>btn.addEventListener('click',()=>{
          selectedGrade=btn.dataset.grade==='7'?'7':'5';
          localStorage.setItem('lousa:selectedGrade',selectedGrade);
          applyGradeData();
          try{resetTheme()}catch(e){}
          try{renderSubjectCards()}catch(e){}
          try{updateProgress()}catch(e){}
          window.scrollTo({top:0,behavior:'smooth'});
        }));
      }
      syncGradeHero();
    }catch(e){}
  }

  function gradeStyles(){
    if(document.getElementById('v94GradeStyles'))return;
    const s=document.createElement('style');s.id='v94GradeStyles';
    s.textContent='.v94GradePicker{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:18px 0 24px;padding:16px 18px;border:1px solid var(--lineSoft,#e5e7eb);border-radius:20px;background:#fff;box-shadow:0 8px 24px rgba(15,23,42,.05)}.v94GradeTitle{display:flex;flex-direction:column;gap:4px}.v94GradeTitle strong{font-size:1rem}.v94GradeTitle span{font-size:.86rem;color:#64748b}.v94GradeActions{display:flex;gap:8px;flex-wrap:wrap}.v94GradeBtn{appearance:none;border:1px solid #cbd5e1;background:#fff;color:#334155;border-radius:999px;padding:10px 16px;font-weight:800;font-size:.95rem;cursor:pointer}.v94GradeBtn.active{background:#1d4ed8;color:#fff;border-color:#1d4ed8;box-shadow:0 7px 16px rgba(29,78,216,.18)}@media(max-width:640px){.v94GradePicker{align-items:flex-start;flex-direction:column}.v94GradeActions{width:100%}.v94GradeBtn{flex:1}}';
    s.textContent+=' .v94Math7Question .v41MathSteps{display:none!important}.v94Math7Question .v50AnswerBox{display:none!important}.v94Math7Question .options{display:grid!important}.v94Math7Question .scratchCard{display:block!important}.v94Math7Question .scratchBoard,.v94Math7Question .scratchBoard .canvasWrap{background:#fff!important;background-image:none!important}.v94Math7Instruction{display:grid;gap:7px;margin:12px 0 14px;padding:14px 16px;border:1px solid #bfdbfe;border-radius:16px;background:#eff6ff;color:#334155;font-size:13px;line-height:1.45}.v94Math7Instruction strong{color:#1d4ed8;font-size:14px}.v94Math7Instruction span{display:block}.v94Math7Instruction em{font-style:normal;font-weight:900;color:#1d4ed8}';
    document.head.appendChild(s);
  }

  function installGradeSystem(){
    try{
      applyGradeData();
      if(gradeSystemInstalled){ensureGradePicker();return}
      gradeSystemInstalled=true;

      if(typeof renderSubjectCards==='function'&&!renderSubjectCards.__v94Grade){
        const previous=renderSubjectCards;
        const wrapped=function(){
          applyGradeData();
          const out=previous.apply(this,arguments);
          if(selectedGrade==='7'){
            document.querySelectorAll('#subjectGrid .subjectCard').forEach(card=>{if(card.dataset.subject!=='math')card.remove()});
          }
          ensureGradePicker();syncGradeHero();
          return out;
        };
        wrapped.__v94Grade=true;renderSubjectCards=wrapped;
      }

      if(typeof applySubjectTheme==='function'&&!applySubjectTheme.__v94Grade){
        const previous=applySubjectTheme;
        const wrapped=function(subject){
          const out=previous.apply(this,arguments);
          if(selectedGrade==='7'&&subject&&subject.key==='math'){
            const sub=document.getElementById('brandSubtitle');if(sub)sub.textContent='7º ano • Prova Paulista • 3º bimestre';
          }
          return out;
        };
        wrapped.__v94Grade=true;applySubjectTheme=wrapped;
      }

      if(typeof resetTheme==='function'&&!resetTheme.__v94Grade){
        const previous=resetTheme;
        const wrapped=function(){
          const out=previous.apply(this,arguments);
          const sub=document.getElementById('brandSubtitle');
          if(sub)sub.textContent=selectedGrade==='7'?'7º ano • Prova Paulista • 3º bimestre':'5º ano • revisão completa do 3º bimestre';
          return out;
        };
        wrapped.__v94Grade=true;resetTheme=wrapped;
      }

      if(typeof updateProgress==='function'&&!updateProgress.__v94Grade){
        const previous=updateProgress;
        const wrapped=function(){
          const out=previous.apply(this,arguments);
          try{
            if(!currentSubjectKey){
              const list=gradeSubjects();
              const total=list.reduce((sum,subject)=>sum+subjectQuestionCount(subject),0);
              const done=list.reduce((sum,subject)=>sum+subjectDoneCount(subject),0);
              const textEl=document.getElementById('progressText'),bar=document.getElementById('progressBar'),label=document.getElementById('progressLabelText');
              if(textEl)textEl.textContent=done+' de '+total;
              if(bar)bar.style.width=(total?done/total*100:0)+'%';
              if(label)label.textContent=selectedGrade==='7'?'Progresso do 7º ano':'Progresso do 5º ano';
            }
          }catch(e){}
          return out;
        };
        wrapped.__v94Grade=true;updateProgress=wrapped;
      }

      ensureGradePicker();
    }catch(e){}
  }


  function installMath7QuestionUI(){
    try{
      if(typeof shouldShowScratchpad==='function'&&!shouldShowScratchpad.__v94Math7){
        const previous=shouldShowScratchpad;
        const wrapped=function(q){
          if(String(q&&q.id||'').startsWith('m7_'))return true;
          return previous.apply(this,arguments);
        };
        wrapped.__v94Math7=true;
        shouldShowScratchpad=wrapped;
      }

      if(typeof buildQuestion==='function'&&!buildQuestion.__v94Math7){
        const previous=buildQuestion;
        const wrapped=function(q,num){
          const card=previous.apply(this,arguments);
          if(!q||!String(q.id||'').startsWith('m7_')||!card)return card;
          card.classList.add('v94Math7Question');

          const oldNumeric=card.querySelector('.v50AnswerBox');
          if(oldNumeric)oldNumeric.remove();
          card.classList.remove('v50NumericMath');

          const options=card.querySelector('.options');
          if(options)options.style.removeProperty('display');

          if(!card.querySelector('.v94Math7Instruction')){
            const note=document.createElement('div');
            note.className='v94Math7Instruction';
            note.innerHTML='<strong>O que fazer nesta questão:</strong><span><b>1.</b> Use a lousa branca para fazer a conta ou rascunhar.</span><span><b>2.</b> Marque uma das 3 alternativas.</span><span><b>3.</b> Toque em <em>Enviar resposta</em>.</span>';
            const layout=card.querySelector('.mcqLayout')||options;
            if(layout&&layout.parentNode)layout.parentNode.insertBefore(note,layout);
            else card.insertBefore(note,card.querySelector('.actions')||null);
          }

          const scratch=card.querySelector('.scratchCard');
          if(scratch){
            const title=scratch.querySelector('.scratchHeader strong');
            const subtitle=scratch.querySelector('.scratchHeader span');
            const hint=scratch.querySelector('.penHint');
            if(title)title.textContent='Whiteboard para fazer a conta';
            if(subtitle)subtitle.textContent='Monte a conta, faça o rascunho e só depois escolha a alternativa.';
            if(hint)hint.textContent='Use a caneta do tablet ou o dedo. Esta lousa é só para o seu cálculo.';
          }
          return card;
        };
        wrapped.__v94Math7=true;
        buildQuestion=wrapped;
      }
    }catch(e){console.warn('v94: interface do 7º ano',e)}
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
    installReligion(); installGeographyTexts(); patchUnlock(); patchTheme(); styles(); gradeStyles(); installGradeSystem(); installMath7QuestionUI(); stamp();
    try{if(typeof renderSubjectCards==='function')renderSubjectCards()}catch(e){}
    try{if(typeof updateProgress==='function')updateProgress()}catch(e){}
  }

  refresh();
  setTimeout(refresh,250);
  setTimeout(()=>{refresh();document.getElementById('v94VersionBootHide')?.remove()},1200);
  window.__lousaV94Ready=true;
})();
