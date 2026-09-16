/* Lousa de Estudos v75 — alternativas contextualizadas nas matérias não matemáticas */
(()=>{
  if(window.__lousaV75ContextOptions)return;
  window.__lousaV75ContextOptions=true;

  const SUBJECTS=['science','portuguese','geography','history'];
  const GENERIC_RE=/(não existe relação entre os elementos|o conteúdo mostra o contrário|alternativa não corresponde|afirmação contradiz|exemplo que não tem relação|nenhum dos exemplos estudados|exatamente iguais e não possuem nenhuma diferença|não podem ser comparados|ignora as pistas do texto|interpretação não é sustentada|não corresponde ao funcionamento estudado|essa ideia não aparece no conteúdo|relação que não corresponde ao tema estudado|contexto histórico apresentado|mistura informações que não fazem parte)/i;
  const META_EXPECTED_RE=/^(Ideia esperada|Ideia principal|Resultado esperado|Exemplos válidos|Uma resposta possível|Resposta pessoal|A resposta é pessoal)\s*:/i;

  const BANKS={
    'science:orgaos':[
      'Os órgãos do corpo trabalham de forma totalmente isolada e não formam sistemas.',
      'O corpo humano é formado apenas por cabeça, braços e pernas, sem outras regiões.',
      'Os sistemas são formados antes dos órgãos e não dependem de células nem tecidos.',
      'Todos os órgãos realizam exatamente a mesma função no organismo.'
    ],
    'science:respiratorio':[
      'O ar segue do nariz diretamente para o estômago antes de chegar aos pulmões.',
      'A troca de oxigênio e gás carbônico acontece principalmente na traqueia.',
      'Inspirar significa expulsar o ar dos pulmões e expirar significa puxá-lo para dentro.',
      'O diafragma não participa dos movimentos de entrada e saída do ar.'
    ],
    'science:cardiovascular':[
      'As veias levam o sangue para fora do coração e as artérias sempre o trazem de volta.',
      'O coração apenas armazena sangue e não participa do bombeamento pelo corpo.',
      'Os capilares são os maiores vasos do corpo e não realizam trocas com os tecidos.',
      'Os glóbulos vermelhos têm como principal função defender o organismo contra microrganismos.'
    ],
    'science:urinario':[
      'A urina é formada na bexiga e depois segue pelos ureteres até chegar aos rins.',
      'Os rins apenas armazenam a urina e não participam da filtração do sangue.',
      'A uretra transporta a urina dos rins até a bexiga e os ureteres levam a urina para fora do corpo.',
      'Beber pouca água facilita a filtração dos rins e torna desnecessária a eliminação de resíduos.'
    ],
    'science:digestorio':[
      'A digestão começa somente no estômago e a boca não participa desse processo.',
      'O intestino grosso é o principal responsável por absorver os nutrientes dos alimentos.',
      'O esôfago produz a bile e a vesícula biliar bombeia o alimento para o estômago.',
      'O alimento vai da boca diretamente ao intestino grosso, sem passar pelo estômago.'
    ],
    'science:alimentos':[
      'Todos os alimentos têm a mesma origem e fornecem exatamente os mesmos nutrientes.',
      'Carboidratos servem apenas para defesa do organismo e não fornecem energia.',
      'Proteínas não participam da construção nem da reparação dos tecidos do corpo.',
      'Vitaminas e sais minerais não têm função de regulação no organismo.'
    ],
    'science:saudavel':[
      'Uma alimentação saudável deve ter sempre os mesmos alimentos e evitar variedade.',
      'Beber água pode ser substituído completamente por refrigerantes na hidratação diária.',
      'Para ser saudável basta escolher um único grupo de alimentos e consumi-lo todos os dias.',
      'Sono e atividade física não têm relação com os cuidados gerais de saúde.'
    ],
    'science:disturbios':[
      'Desnutrição significa excesso de nutrientes e sempre acontece por comer demais.',
      'A obesidade tem uma única causa e não envolve hábitos, ambiente ou outros fatores.',
      'Problemas nutricionais não têm relação com alimentação, atividade física ou hidratação.',
      'Dietas muito restritivas sem orientação sempre fornecem todos os nutrientes necessários.'
    ],

    'portuguese:pistas':[
      'O problema principal da história acontece porque a gansa deixa de botar ovos sem motivo.',
      'A história ensina que querer tudo de uma vez sempre traz resultados melhores.',
      'O camponês perde sua riqueza porque decide vender a fazenda e abandonar a gansa.',
      'A ganância do camponês não interfere no final da história.'
    ],
    'portuguese:entrelinhas':[
      'A expressão “Bingo!” indica que o teste fracassou e causou um problema grave.',
      'Voos tripulados são voos realizados sem nenhuma pessoa a bordo.',
      'A tecnologia não provocou nenhuma mudança na forma de preparar alimentos no espaço.',
      'As primeiras refeições espaciais eram iguais às refeições comuns feitas na Terra.'
    ],
    'portuguese:ideia':[
      'O texto tem como assunto principal uma receita de mandioca.',
      'A narrativa fala principalmente sobre uma viagem de Mani para outra aldeia.',
      'O texto é uma notícia porque apresenta fatos comprovados cientificamente.',
      'Os detalhes sobre Mani são mais importantes do que a origem da mandioca para resumir a história.'
    ],
    'portuguese:fatoopiniao':[
      'Uma opinião sempre pode ser comprovada por datas e registros objetivos.',
      'Um fato depende apenas do gosto e da avaliação pessoal de quem escreve.',
      'A frase “a comida é deliciosa” é um fato porque toda pessoa precisa concordar com ela.',
      'Datas e acontecimentos verificáveis são exemplos de opinião pessoal.'
    ],
    'portuguese:pistaspalavras':[
      'No trecho estudado, “ele” se refere ao clima e não ao ar.',
      'A expressão “além disso” indica oposição entre duas ideias.',
      'A expressão “por outro lado” serve apenas para repetir a mesma informação.',
      'Pronomes como “ele” não retomam palavras já mencionadas no texto.'
    ],
    'portuguese:humor':[
      'O humor acontece porque a comida realmente é trocada por uma receita completamente diferente.',
      'A graça da cena desaparece porque o gato sabe desde o começo que nada mudou.',
      'As imagens da tirinha não ajudam a entender as falas nem a situação.',
      'O ponto de exclamação indica ausência de emoção nas falas dos personagens.'
    ],
    'portuguese:finalidade':[
      'O cartaz tem como objetivo principal contar uma história de aventura.',
      'As letras em destaque servem para esconder a informação mais importante.',
      'Informações como data, horário ou orientação não ajudam o leitor a agir.',
      'Um cartaz de saúde tem a mesma finalidade de uma receita culinária.'
    ],
    'portuguese:sequencia':[
      'A ordem dos acontecimentos pode ser trocada livremente sem mudar a compreensão da história.',
      'Na história de Mani, as raízes aparecem antes do nascimento da personagem.',
      'Palavras como “depois” e “mais tarde” não indicam passagem do tempo.',
      'O nome da mandioca aparece antes de todos os acontecimentos narrados.'
    ],
    'portuguese:narrador':[
      'O narrador é sempre o mesmo personagem que vive o conflito principal.',
      'As aspas indicam apenas o título de uma história e nunca fala ou pensamento.',
      'O ponto de interrogação mostra certeza e não pode indicar dúvida.',
      'A pontuação não altera o modo como uma fala deve ser entendida.'
    ],
    'portuguese:referencias':[
      'No texto, “ele” retoma a semente e “ela” retoma o jardim.',
      'Pronomes são usados para aumentar a repetição de nomes no texto.',
      'A palavra “ela” se refere ao vaso, e não a Clara.',
      'Entender a referência dos pronomes não interfere na compreensão das ações.'
    ],
    'portuguese:resumo':[
      'Um bom resumo deve copiar todos os detalhes do texto original.',
      'Resumir significa escolher apenas informações secundárias e retirar a ideia principal.',
      'Usar palavras próprias mostra menos compreensão do que copiar frases inteiras.',
      'Listas longas de exemplos são sempre mais importantes do que a ideia central.'
    ],
    'portuguese:desafiofinal':[
      'O ar não participa do clima nem pode transportar microrganismos.',
      'Na tirinha, a comida é realmente trocada antes de o gato mudar de opinião.',
      'O cartaz de saúde foi feito apenas para divertir o leitor.',
      'A expressão “além disso” indica oposição e não acréscimo.'
    ],

    'geography:cidades':[
      'O crescimento urbano sempre elimina problemas de transporte e infraestrutura.',
      'Êxodo rural significa a mudança de pessoas da cidade para o campo.',
      'Bairros que crescem rapidamente não precisam de planejamento nem serviços públicos.',
      'A expansão urbana reduz automaticamente a produção de lixo e os engarrafamentos.'
    ],
    'geography:desigualdade':[
      'Desigualdade socioeconômica significa que todas as pessoas têm as mesmas oportunidades.',
      'Renda, educação, moradia e saúde não têm relação com desigualdade social.',
      'Desigualdades atuais não possuem nenhuma ligação com processos históricos.',
      'Bairros de uma mesma cidade sempre apresentam condições de vida iguais.'
    ],
    'geography:diversidade':[
      'A cultura brasileira foi formada por um único povo e sem conflitos históricos.',
      'Diversidade cultural e desigualdade social significam exatamente a mesma coisa.',
      'As desigualdades raciais são naturais e não têm relação com processos históricos.',
      'Povos indígenas não contribuíram para a formação cultural do Brasil.'
    ],
    'geography:saopaulo':[
      'Imigração é a mudança entre estados do mesmo país, sem cruzar fronteiras nacionais.',
      'Migração interna acontece somente quando uma pessoa muda de país.',
      'A diversidade cultural de São Paulo foi formada por um único grupo de origem.',
      'Comidas, músicas e práticas culturais não são influenciadas pelos movimentos migratórios.'
    ],
    'geography:jornal':[
      'Uma queda no número de pessoas em situação de pobreza significa que toda desigualdade acabou.',
      'A fonte de uma notícia não ajuda a avaliar a origem ou a confiabilidade dos dados.',
      'Números e percentuais não permitem comparar mudanças entre anos diferentes.',
      'Desigualdade social está ligada apenas ao clima e não à renda ou às oportunidades.'
    ],
    'geography:tecnologia':[
      'A tecnologia só elimina empregos e nunca cria novas funções ou profissões.',
      'Automação significa realizar todas as tarefas sem qualquer uso de tecnologia.',
      'Qualificação profissional se torna menos importante quando surgem novas tecnologias.',
      'Acesso a ferramentas digitais não influencia oportunidades de estudo ou trabalho.'
    ],

    'history:tempo':[
      'Tempo da natureza é medido apenas por relógios digitais e calendários.',
      'Tempo cronológico não usa horas, dias, meses nem anos.',
      'Tempo histórico é organizado somente pelas estações do ano.',
      'Relógio de sol funciona sem luz do Sol e sem observar sombras.'
    ],
    'history:povos_tempo':[
      'Fases da Lua, chuvas e estações não podem ser usadas como referências de tempo.',
      'A tradição oral impede a transmissão de memórias entre gerações.',
      'Griôs não têm relação com histórias, genealogias ou conhecimentos comunitários.',
      'Colheitas, rituais e festivais não funcionam como marcos de tempo em nenhuma comunidade.'
    ],
    'history:indigenas':[
      'O calendário lunar é baseado no movimento de carros e máquinas.',
      'Todos os povos indígenas marcam o tempo exatamente da mesma forma.',
      'Mitos não transmitem conhecimentos, crenças ou valores culturais.',
      'Plantio e colheita não podem ser organizados pela observação das chuvas.'
    ],
    'history:memorias':[
      'Memória histórica serve apenas para lembrar fatos pessoais do dia a dia.',
      'A África é um único país com uma única cultura.',
      'Oralidade, músicas e danças não ajudam a preservar memória cultural.',
      'Marcos de memória são acontecimentos sem importância para a sociedade.'
    ],
    'history:herancas':[
      'Sankofa representa a ideia de esquecer o passado completamente.',
      'Adinkras são apenas objetos sem significado cultural.',
      'A cultura brasileira não recebeu nenhuma influência de povos africanos.',
      'Máscaras, culinária, música e religiões não podem transmitir heranças culturais.'
    ]
  };

  const FALLBACK={
    science:[
      'Essa alternativa troca funções entre estruturas estudadas na própria lição.',
      'Essa alternativa apresenta uma sequência incorreta dos processos explicados na lição.',
      'Essa alternativa atribui ao órgão uma função diferente da que aparece no conteúdo.'
    ],
    portuguese:[
      'Essa interpretação muda uma informação importante do texto lido.',
      'Essa resposta usa uma pista do texto de forma incorreta.',
      'Essa alternativa confunde a ideia principal com um detalhe secundário.'
    ],
    geography:[
      'Essa alternativa inverte uma relação apresentada no conteúdo geográfico da lição.',
      'Essa resposta confunde causa e consequência do processo estudado.',
      'Essa alternativa desconsidera uma informação importante apresentada na revisão.'
    ],
    history:[
      'Essa alternativa troca o significado dos conceitos históricos estudados na lição.',
      'Essa resposta apresenta uma sequência ou relação histórica incorreta.',
      'Essa alternativa confunde uma prática cultural com outra explicada no conteúdo.'
    ]
  };

  function hash(value){
    let h=2166136261;
    for(const ch of String(value||'')){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}
    return h>>>0;
  }

  function compact(value,max=230){
    let text=String(value||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    text=text
      .replace(/^(Resposta correta|Ideia esperada|Ideia principal|Resultado esperado|Exemplos válidos)\s*:\s*/i,'')
      .replace(/^Uma boa resposta (?:pode|deve) (?:dizer|explicar|mostrar|citar|trazer) (?:que )?/i,'')
      .replace(/^Uma resposta possível é\s*/i,'')
      .replace(/^A resposta é pessoal,?\s*(?:mas\s*)?/i,'')
      .replace(/^Pode citar\s+/i,'Exemplos corretos incluem ')
      .trim();
    if(text.length<=max)return text;
    const cut=text.slice(0,max);
    const stop=Math.max(cut.lastIndexOf('. '),cut.lastIndexOf('; '),cut.lastIndexOf(', '));
    return (stop>110?cut.slice(0,stop+1):cut.trim()+'…');
  }

  function correctAnswer(q){
    const explanation=compact(q?.explanation);
    if(explanation && !/^deve |^apresentar |^relacionar |^diferenciar |^destacar |^explicar |^citar /i.test(explanation))return explanation;
    const everyday=compact(q?.everyday?.example);
    if(everyday)return everyday;
    const expected=compact(q?.expected);
    if(expected)return expected;
    return 'A resposta que corresponde corretamente ao conteúdo explicado na lição.';
  }

  function isGenerated(q){
    if(!q || !Array.isArray(q.options))return false;
    if(q.options.some(opt=>GENERIC_RE.test(String(opt||''))))return true;
    const expected=String(q.expected||'').trim();
    return META_EXPECTED_RE.test(expected);
  }

  function subjectAndLesson(lesson){
    for(const subjectKey of SUBJECTS){
      const list=subjects?.[subjectKey]?.lessons||[];
      if(list.includes(lesson))return {subjectKey,lessonKey:String(lesson?.key||'')};
    }
    return null;
  }

  function chooseDistractors(subjectKey,lessonKey,q,correct){
    const pool=(BANKS[subjectKey+':'+lessonKey]||FALLBACK[subjectKey]||[])
      .map(compact)
      .filter(Boolean)
      .filter(x=>x.toLowerCase()!==String(correct).toLowerCase());
    if(pool.length<2)return ['Uma afirmação relacionada ao tema, mas com uma função trocada.','Uma afirmação relacionada ao tema, mas com a sequência incorreta.'];
    const start=hash(q?.id||q?.text)%pool.length;
    const first=pool[start];
    let second=pool[(start+1)%pool.length];
    if(second===first)second=pool[(start+2)%pool.length];
    return [first,second];
  }

  function setOptions(subjectKey,lessonKey,q){
    const correct=correctAnswer(q);
    const wrong=chooseDistractors(subjectKey,lessonKey,q,correct);
    const values=[correct,wrong[0],wrong[1]];
    const shift=hash((q?.id||q?.text)+':v75')%3;
    const options=[values[shift],values[(shift+1)%3],values[(shift+2)%3]];
    q.options=options;
    q.correct=options.indexOf(correct);
    q.type='mcq';
    q.reviewLabel='🧠 Escolha a melhor resposta';
    q.review='Leia o texto de revisão e compare alternativas que tratam do mesmo assunto antes de marcar.';
    return String(q.id||'');
  }

  function repairLesson(subjectKey,lesson){
    const changed=[];
    const lessonKey=String(lesson?.key||'');
    (lesson?.questions||[]).forEach(q=>{
      if(isGenerated(q))changed.push(setOptions(subjectKey,lessonKey,q));
    });
    return changed.filter(Boolean);
  }

  function audit(){
    const generic=[];
    const changed=[];
    try{
      SUBJECTS.forEach(subjectKey=>{
        (subjects?.[subjectKey]?.lessons||[]).forEach(lesson=>{
          changed.push(...repairLesson(subjectKey,lesson));
          (lesson?.questions||[]).forEach(q=>{
            if(Array.isArray(q.options) && q.options.some(opt=>GENERIC_RE.test(String(opt||''))))generic.push(String(q.id||q.text||'sem-id'));
          });
        });
      });
    }catch(e){console.warn('v75 audit',e);}

    try{
      if(changed.length && !localStorage.getItem('lousaV75OptionsMigration')){
        const ids=new Set(changed);
        const remove=[];
        for(let i=0;i<localStorage.length;i++){
          const key=localStorage.key(i);
          if(!key)continue;
          for(const id of ids){if(id && key.includes(id)){remove.push(key);break;}}
        }
        remove.forEach(key=>localStorage.removeItem(key));
        localStorage.setItem('lousaV75OptionsMigration','1');
      }
    }catch(e){}

    window.__lousaV75RepairedCount=changed.length;
    window.__lousaV75RemainingGeneric=generic;
    return {changed,generic};
  }

  audit();

  if(typeof renderLesson==='function' && !renderLesson.__v75Wrapped){
    const previous=renderLesson;
    const wrapped=function(lesson){
      const info=subjectAndLesson(lesson);
      if(info)repairLesson(info.subjectKey,lesson);
      return previous(lesson);
    };
    wrapped.__v75Wrapped=true;
    renderLesson=wrapped;
  }

  window.__lousaV75Ready=true;
})();
