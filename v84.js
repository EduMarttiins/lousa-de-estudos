/* Lousa de Estudos v84 — Ensino Religioso: São João Paulo II e Livro de Daniel */
(()=>{
  if(window.__lousaV84Religion)return;
  window.__lousaV84Religion=true;

  const VERSION=84;
  const makeQ=(id,review,text,options,correct,explanation,visual='')=>({
    id,
    type:'mcq',
    reviewLabel:'🙏 Antes de responder',
    review,
    reviewVisual:visual,
    text,
    options,
    correct,
    explanation,
    expected:'Resposta correta: '+options[correct]+'.'
  });

  const joaoPauloQuestions=[
    makeQ('rel_jp01','São João Paulo II nasceu com o nome Karol Józef Wojtyła. Esse é o nome que recebeu antes de se tornar sacerdote, bispo, cardeal e Papa.','Qual era o nome de nascimento de São João Paulo II?',['Giovanni Battista Montini','Karol Józef Wojtyła','Jorge Mario Bergoglio'],1,'O nome de nascimento de São João Paulo II era Karol Józef Wojtyła.','Karol Józef Wojtyła → São João Paulo II'),
    makeQ('rel_jp02','Karol Józef Wojtyła nasceu em Wadowice, uma cidade da Polônia, em 18 de maio de 1920.','Em que cidade e país São João Paulo II nasceu?',['Cracóvia, Polônia','Roma, Itália','Wadowice, Polônia'],2,'Ele nasceu em Wadowice, na Polônia.','📍 Wadowice • Polônia'),
    makeQ('rel_jp03','A data de nascimento de Karol Józef Wojtyła foi 18 de maio de 1920.','Qual é a data de nascimento de São João Paulo II?',['18 de maio de 1920','22 de outubro de 1920','2 de abril de 1920'],0,'São João Paulo II nasceu em 18 de maio de 1920.','📅 18/05/1920'),
    makeQ('rel_jp04','Seu lema episcopal foi “Totus Tuus”, expressão latina ligada à sua devoção a Maria e que pode ser entendida como “Todo teu, Maria”.','Qual era o lema de São João Paulo II?',['Ora et labora','Totus Tuus','Pax et Bonum'],1,'O lema de João Paulo II era “Totus Tuus”.','Totus Tuus → “Todo teu, Maria”'),
    makeQ('rel_jp05','Na juventude, durante a ocupação nazista da Polônia, Karol trabalhou em uma pedreira e depois na fábrica química Solvay. Também participou de atividades culturais clandestinas.','Que tipo de trabalho Karol exerceu antes de entrar no seminário?',['Foi professor universitário em Roma','Foi militar do exército italiano','Trabalhou em uma pedreira e em uma fábrica química'],2,'Antes do seminário, ele trabalhou em uma pedreira e na fábrica Solvay.','⛏️ pedreira • 🏭 fábrica'),
    makeQ('rel_jp06','Durante a ocupação nazista, o seminário de Cracóvia funcionava de modo clandestino. Karol ingressou nesse seminário ligado ao arcebispo Adam Stefan Sapieha.','Como ele conseguiu entrar no seminário durante a ocupação nazista?',['Ingressou em um seminário clandestino em Cracóvia','Viajou para um seminário na França','Esperou o fim da guerra para começar'],0,'Ele entrou no seminário clandestino de Cracóvia durante a ocupação nazista.','🕯️ seminário clandestino'),
    makeQ('rel_jp07','Karol Wojtyła foi ordenado sacerdote em 1º de novembro de 1946.','Em que ano ele foi ordenado padre?',['1958','1946','1978'],1,'Ele foi ordenado sacerdote em 1946.','✝️ 1946 → sacerdote'),
    makeQ('rel_jp08','Antes de ser Papa, Karol Wojtyła foi bispo auxiliar, depois arcebispo de Cracóvia e, mais tarde, cardeal.','Quais cargos ele ocupou antes de ser Papa?',['Diácono, monge e abade','Papa auxiliar, patriarca e diácono','Bispo, arcebispo e cardeal'],2,'Sua trajetória passou por bispo, arcebispo e cardeal antes do pontificado.','Bispo → Arcebispo → Cardeal → Papa'),
    makeQ('rel_jp09','Karol Wojtyła foi eleito Papa em 16 de outubro de 1978 e adotou o nome João Paulo II.','Em que data São João Paulo II foi eleito Papa?',['16 de outubro de 1978','22 de outubro de 1978','2 de abril de 2005'],0,'Ele foi eleito Papa em 16 de outubro de 1978.','📅 16/10/1978'),
    makeQ('rel_jp10','João Paulo II foi o primeiro Papa não italiano em 455 anos. Sua eleição marcou uma mudança importante na história recente da Igreja.','Qual fato tornou sua eleição especialmente marcante?',['Foi o primeiro Papa nascido em Roma','Foi o primeiro Papa não italiano em 455 anos','Foi o primeiro Papa a usar o nome João'],1,'A eleição chamou atenção porque ele foi o primeiro Papa não italiano em 455 anos.','🇵🇱 Polônia → Vaticano'),
    makeQ('rel_jp11','Seu pontificado durou cerca de 26 anos, de 1978 até sua morte, em 2005. Foi um dos pontificados mais longos da história contemporânea.','Por aproximadamente quantos anos João Paulo II governou a Igreja Católica?',['15 anos','20 anos','26 anos'],2,'Seu pontificado durou aproximadamente 26 anos.','1978 → 2005 ≈ 26 anos'),
    makeQ('rel_jp12','João Paulo II realizou numerosas viagens apostólicas e visitou cerca de 129 países. Por isso ficou conhecido como um Papa muito próximo de povos de diferentes lugares.','Aproximadamente quantos países ele visitou durante seu pontificado?',['129 países','29 países','59 países'],0,'João Paulo II visitou cerca de 129 países durante o pontificado.','🌍 cerca de 129 países'),
    makeQ('rel_jp13','As Jornadas Mundiais da Juventude aproximaram jovens de vários países para momentos de fé, oração, catequese e encontro com o Papa.','Qual era um dos principais objetivos das Jornadas Mundiais da Juventude?',['Organizar competições esportivas entre países','Reunir jovens para celebrar e aprofundar a fé','Escolher novos cardeais'],1,'As Jornadas Mundiais da Juventude foram criadas para reunir jovens em torno da fé e da vida cristã.','JMJ → jovens + fé + encontro'),
    makeQ('rel_jp14','Em 13 de maio de 1981, João Paulo II sofreu um atentado na Praça de São Pedro, no Vaticano. Ele sobreviveu aos tiros.','Quando e onde ocorreu o atentado contra João Paulo II?',['2 de abril de 2005, em Cracóvia','16 de outubro de 1978, em Roma','13 de maio de 1981, na Praça de São Pedro'],2,'O atentado ocorreu em 13 de maio de 1981, na Praça de São Pedro.','📅 13/05/1981 • Praça de São Pedro'),
    makeQ('rel_jp15','João Paulo II disse que atribuía sua sobrevivência à proteção de Nossa Senhora, relacionando o fato especialmente a Nossa Senhora de Fátima.','A que ele atribuía sua sobrevivência ao atentado?',['À proteção de Nossa Senhora','A uma mudança de viagem de última hora','A não ter sido atingido'],0,'Ele relacionou sua sobrevivência à proteção de Nossa Senhora, especialmente Nossa Senhora de Fátima.','🙏 Nossa Senhora de Fátima'),
    makeQ('rel_jp16','Nos últimos anos de vida, João Paulo II enfrentou a doença de Parkinson e outras limitações de saúde, continuando seu ministério publicamente.','Qual doença o afetou nos últimos anos de vida?',['Tuberculose','Doença de Parkinson','Malária'],1,'João Paulo II sofreu com a doença de Parkinson nos últimos anos.','🩺 Parkinson'),
    makeQ('rel_jp17','São João Paulo II faleceu em 2 de abril de 2005. Seus restos mortais estão na Basílica de São Pedro, no Vaticano.','Em que data São João Paulo II faleceu?',['18 de maio de 2005','22 de outubro de 2005','2 de abril de 2005'],2,'João Paulo II faleceu em 2 de abril de 2005.','📅 02/04/2005'),
    makeQ('rel_jp18','João Paulo II foi canonizado em 27 de abril de 2014. Sua memória litúrgica é celebrada em 22 de outubro.','Qual é a data da memória litúrgica de São João Paulo II?',['22 de outubro','27 de abril','18 de maio'],0,'A memória litúrgica de São João Paulo II é celebrada em 22 de outubro.','🕊️ 22 de outubro')
  ];

  const danielQuestions=[
    makeQ('rel_dn01','O personagem central do Livro de Daniel é Daniel, um jovem judeu levado para a Babilônia.','Quem é o personagem principal do Livro de Daniel?',['Nabucodonosor','Daniel','Dario'],1,'Daniel é o personagem principal do livro.','📖 Livro de Daniel'),
    makeQ('rel_dn02','Daniel foi levado para a Babilônia. A história mostra sua fidelidade a Deus mesmo vivendo longe de sua terra.','Para onde Daniel foi levado?',['Jerusalém','Egito','Babilônia'],2,'Daniel foi levado para a Babilônia.','Jerusalém → Babilônia'),
    makeQ('rel_dn03','Os três companheiros de Daniel são Ananias, Misael e Azarias. Na Babilônia, eles também ficaram conhecidos como Sidrac, Misac e Abdenago.','Quem eram os três companheiros de Daniel?',['Ananias, Misael e Azarias','Pedro, Tiago e João','Dario, Ciro e Baltasar'],0,'Os companheiros de Daniel eram Ananias, Misael e Azarias.','Ananias • Misael • Azarias'),
    makeQ('rel_dn04','Daniel pediu legumes e água em vez da comida e bebida da mesa real, mantendo fidelidade às suas convicções.','O que Daniel pediu para comer e beber?',['Pão e vinho','Legumes e água','Carne e leite'],1,'Daniel pediu legumes e água.','🥬 legumes + 💧 água'),
    makeQ('rel_dn05','O mapa destaca que a sabedoria de Daniel vinha de Deus. Essa sabedoria aparece quando ele interpreta sonhos e enfrenta situações difíceis.','Quem deu sabedoria a Daniel?',['Os sacerdotes da Babilônia','O rei Nabucodonosor','Deus'],2,'Segundo a narrativa, Deus deu sabedoria a Daniel.','🙏 Deus → sabedoria'),
    makeQ('rel_dn06','Nabucodonosor teve o sonho da grande estátua. Daniel explicou o significado do sonho e falou sobre reinos sucessivos.','Quem teve o sonho da grande estátua?',['Nabucodonosor','Dario','Baltasar'],0,'O sonho da grande estátua foi de Nabucodonosor.','👑 Nabucodonosor → sonho'),
    makeQ('rel_dn07','Na grande estátua do sonho, a cabeça era de ouro; outras partes eram de prata, bronze, ferro e uma mistura de ferro e barro.','Qual era o material da cabeça da grande estátua?',['Prata','Ouro','Ferro'],1,'A cabeça da estátua era de ouro.','🥇 cabeça = ouro'),
    makeQ('rel_dn08','Uma pedra destruiu a grande estátua. No esquema, essa pedra representa o Reino de Deus, que permanece.','O que a pedra representa no sonho da grande estátua?',['O exército da Babilônia','O templo de Jerusalém','O Reino de Deus'],2,'A pedra representa o Reino de Deus.','🪨 pedra → Reino de Deus'),
    makeQ('rel_dn09','Sidrac, Misac e Abdenago foram lançados na fornalha porque se recusaram a adorar a estátua.','Quem se recusou a adorar a estátua?',['Sidrac, Misac e Abdenago','Daniel, Dario e Baltasar','Nabucodonosor, Ciro e Dario'],0,'Sidrac, Misac e Abdenago se recusaram a adorar a estátua.','🔥 Sidrac • Misac • Abdenago'),
    makeQ('rel_dn10','Os três jovens foram lançados na fornalha ardente, mas não foram queimados. Nabucodonosor ficou admirado com o que viu.','O que aconteceu com os três jovens dentro da fornalha?',['Foram imediatamente libertados pelo rei antes do fogo','Não foram queimados','Apagaram a fornalha com água'],1,'A narrativa afirma que eles não foram queimados.','🔥 → protegidos'),
    makeQ('rel_dn11','Nabucodonosor também sonhou com uma grande árvore. Daniel explicou que a árvore representava o próprio rei e que Deus podia humilhar os soberbos.','Quem era representado pela árvore no sonho?',['Daniel','Dario','O rei Nabucodonosor'],2,'A árvore representava o rei Nabucodonosor.','🌳 árvore → Nabucodonosor'),
    makeQ('rel_dn12','Na história da escrita na parede, o rei era Baltasar. As palavras eram “Mene, Tequel e Peres”, e Daniel foi chamado para interpretá-las.','Quais eram as palavras escritas na parede?',['Mene, Tequel e Peres','Sidrac, Misac e Abdenago','Ouro, prata e bronze'],0,'As palavras eram “Mene, Tequel e Peres”.','✍️ MENE • TEQUEL • PERES'),
    makeQ('rel_dn13','Na história da cova dos leões, o rei era Dario. Daniel continuava rezando três vezes por dia voltado para Jerusalém.','Quantas vezes Daniel rezava por dia?',['Uma vez','Três vezes','Sete vezes'],1,'Daniel rezava três vezes por dia.','🙏 manhã • dia • noite'),
    makeQ('rel_dn14','Daniel foi lançado na cova dos leões, mas Deus o protegeu enviando seu anjo.','Quem protegeu Daniel na cova dos leões?',['Os soldados de Dario','Seus três companheiros','Deus, enviando seu anjo'],2,'Segundo o relato, Deus protegeu Daniel enviando seu anjo.','🦁 + 👼 → Daniel protegido'),
    makeQ('rel_dn15','Nas visões de Daniel aparecem quatro feras, apresentadas no mapa como símbolo de quatro reinos. Também aparece o “Ancião dos Dias”, identificado como Deus.','O que as quatro feras representam nas visões de Daniel?',['Quatro reinos','Quatro profetas','Quatro cidades'],0,'As quatro feras representam quatro reinos.','🐾🐾🐾🐾 → quatro reinos'),
    makeQ('rel_dn16','Na narrativa de Susana, dois anciãos a acusaram injustamente. Daniel a defendeu e interrogou os acusadores separadamente, revelando a mentira.','Como Daniel descobriu a mentira contra Susana?',['Procurando uma carta escondida','Interrogando os acusadores separadamente','Pedindo ao rei que esquecesse o caso'],1,'Daniel interrogou os acusadores separadamente e mostrou que seus relatos não combinavam.','⚖️ perguntas separadas → verdade'),
    makeQ('rel_dn17','Na história de Bel, Daniel mostrou que o ídolo não comia as oferendas. Cinzas espalhadas no chão revelaram pegadas e a fraude dos sacerdotes.','O que Daniel usou para descobrir a fraude relacionada a Bel?',['Uma espada','Um sonho','Cinzas no chão e as pegadas'],2,'As cinzas no chão permitiram perceber as pegadas e revelar a fraude.','👣 cinzas → pegadas → fraude'),
    makeQ('rel_dn18','O mapa resume os temas do Livro de Daniel: fidelidade a Deus, oração, resistência à idolatria, soberania de Deus, justiça e esperança.','Qual conjunto resume melhor os temas importantes do Livro de Daniel?',['Fidelidade, oração, justiça e esperança','Riqueza, guerra, comércio e viagens','Esportes, música, festas e jogos'],0,'Fidelidade, oração, justiça e esperança estão entre os grandes temas destacados no Livro de Daniel.','Fidelidade + Oração + Justiça + Esperança')
  ];

  const religionLessons=[
    {
      key:'joao-paulo-ii',emoji:'🕊️',title:'São João Paulo II',subtitle:'vida, pontificado e legado',
      desc:'Revise os principais fatos da vida de Karol Józef Wojtyła, seu caminho até o pontificado, sua relação com os jovens, o atentado e seu legado.',
      mission:'Ensino Religioso • São João Paulo II',
      passageTitle:'Quem foi São João Paulo II?',
      passage:'Karol Józef Wojtyła nasceu em Wadowice, na Polônia, em 18 de maio de 1920. Viveu a juventude durante a ocupação nazista, trabalhou enquanto estudava e ingressou em um seminário clandestino. Foi ordenado sacerdote em 1946, tornou-se bispo, arcebispo e cardeal e foi eleito Papa em 16 de outubro de 1978. Como João Paulo II, aproximou-se especialmente dos jovens, realizou muitas viagens apostólicas, sofreu um atentado em 1981 e permaneceu à frente da Igreja até sua morte, em 2 de abril de 2005. Foi canonizado em 2014.',
      passageVisual:'Karol Wojtyła → sacerdote → bispo → cardeal → Papa João Paulo II',
      questions:joaoPauloQuestions
    },
    {
      key:'livro-de-daniel',emoji:'🦁',title:'Daniel e o Livro de Daniel',subtitle:'fidelidade, oração e esperança',
      desc:'Revise os principais personagens, sonhos e acontecimentos do Livro de Daniel apresentados no mapa de estudos.',
      mission:'Ensino Religioso • Livro de Daniel',
      passageTitle:'A mensagem de Daniel',
      passage:'O Livro de Daniel apresenta Daniel e seus companheiros vivendo na Babilônia e procurando permanecer fiéis a Deus. Entre os episódios estudados estão o sonho da grande estátua, os três jovens na fornalha, o sonho da árvore, a escrita na parede, Daniel na cova dos leões, as visões de Daniel, Susana e Bel. O mapa destaca como mensagem central a fidelidade, a oração, a confiança em Deus, a justiça e a esperança.',
      passageVisual:'Fidelidade + Oração + Confiança em Deus → mensagem central',
      questions:danielQuestions
    }
  ];

  function installSubject(){
    try{
      if(typeof subjects==='undefined'||!subjects)return false;
      subjects.religion={
        key:'religion',
        emoji:'🙏',
        title:'Ensino Religioso',
        subtitle:'Bíblia, santos e história cristã',
        accent:'#9a6f24',
        dark:'#745018',
        soft:'#fff5d9',
        bg:'#fffaf0',
        blue:'#8a5b20',
        blueSoft:'#fff3d5',
        lineSoft:'#eee1bf',
        homeTitle:'Revisão de Ensino Religioso',
        homeDescription:'Escolha uma das duas lições e revise com calma os fatos principais antes de responder.',
        hint:'💡 As duas lições ficam abertas. Leia primeiro o quadro de revisão e depois responda às alternativas.',
        chips:['São João Paulo II','Livro de Daniel','Fé • história • Bíblia'],
        lessons:religionLessons
      };
      return true;
    }catch(e){console.warn('v84 subject',e);return false}
  }

  function patchTheme(){
    try{
      if(typeof getReviewTheme==='function'&&!getReviewTheme.__v84Religion){
        const previous=getReviewTheme;
        const wrapped=function(){
          if(String(currentSubjectKey||'')==='religion')return{label:'🙏 Revise a história',className:'subjectReligion',fallback:'Leia o quadro de revisão e procure a informação principal antes de responder.'};
          return previous.apply(this,arguments);
        };
        wrapped.__v84Religion=true;
        getReviewTheme=wrapped;
      }
      if(typeof isLessonUnlocked==='function'&&!isLessonUnlocked.__v84Religion){
        const previous=isLessonUnlocked;
        const wrapped=function(index){
          if(String(currentSubjectKey||'')==='religion')return true;
          return previous.apply(this,arguments);
        };
        wrapped.__v84Religion=true;
        isLessonUnlocked=wrapped;
      }
      if(typeof applySubjectTheme==='function'&&!applySubjectTheme.__v84Religion){
        const previous=applySubjectTheme;
        const wrapped=function(subject){
          const out=previous.apply(this,arguments);
          if(subject&&subject.key==='religion'){
            const subtitle=document.getElementById('brandSubtitle');
            if(subtitle)subtitle.textContent='5º ano • revisão de Ensino Religioso';
          }
          return out;
        };
        wrapped.__v84Religion=true;
        applySubjectTheme=wrapped;
      }
    }catch(e){console.warn('v84 theme',e)}
  }

  function addStyles(){
    if(document.getElementById('v84ReligionStyles'))return;
    const style=document.createElement('style');
    style.id='v84ReligionStyles';
    style.textContent=`
      .subjectCard.religion{background:linear-gradient(145deg,#fffdf5 0%,#fff5d9 100%);border-color:#ead7a4}
      .subjectCard.religion .subjectEmoji{background:linear-gradient(180deg,#fff9e8 0%,#ffedbd 100%)}
      .reviewCard.subjectReligion{background:linear-gradient(135deg,#fffdf4 0%,#fff8e7 100%);border-color:#eadfbe}
      .reviewCard.subjectReligion .reviewLabel{background:#fff0c5;border-color:#ead49a;color:#70501c}
    `;
    document.head.appendChild(style);
  }

  function refreshInitial(){
    try{
      if(typeof renderSubjectCards==='function')renderSubjectCards();
      if(typeof updateProgress==='function')updateProgress();
    }catch(e){}
  }

  function stampVersion(){
    try{
      window.__lousaCurrentContentVersion=Math.max(VERSION,Number(window.__lousaCurrentContentVersion||0));
      const meta=document.querySelector('meta[name="app-version"]');
      if(meta&&Number(meta.content||0)<VERSION)meta.content=String(VERSION);
      document.documentElement.dataset.contentVersion=String(VERSION);
      document.querySelectorAll('.lousaVersionOnly').forEach(el=>el.textContent='v'+VERSION);
    }catch(e){}
  }

  addStyles();
  installSubject();
  patchTheme();
  refreshInitial();
  stampVersion();
  [250,700,1500].forEach(ms=>setTimeout(()=>{installSubject();patchTheme();stampVersion()},ms));

  window.__lousaV84Ready=true;
})();