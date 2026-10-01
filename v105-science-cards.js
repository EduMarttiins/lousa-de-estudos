/* Lousa de Estudos v105 — Ciências 5º ano — cards visuais */
(()=>{
  if(window.__lousaV105ScienceCards)return;
  window.__lousaV105ScienceCards=true;
  const VERSION=105;

  const obesityCard=`
  <div class="v105Sheet" role="img" aria-label="Card O que é obesidade">
    <svg viewBox="0 0 1200 760" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="paperO"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="8" result="n"/><feBlend in="SourceGraphic" in2="n" mode="multiply"/></filter>
      </defs>
      <rect x="22" y="88" width="1156" height="642" rx="44" fill="#fffdf7" stroke="#e98686" stroke-width="9"/>
      <rect x="62" y="126" width="620" height="105" rx="42" fill="#d94646"/>
      <text x="95" y="197" font-family="Comic Sans MS, Trebuchet MS, sans-serif" font-size="60" font-weight="800" fill="#fff">O que é obesidade?</text>
      <foreignObject x="78" y="265" width="710" height="415">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;font-size:33px;line-height:1.34;font-weight:700;color:#333">
          A obesidade acontece quando o corpo acumula muita gordura. Isso pode ocorrer por causa de uma alimentação rica em ultraprocessados, doces e refrigerantes, e pela falta de atividade física. A obesidade pode causar vários problemas de saúde, como diabetes, pressão alta, doenças do coração e dificuldades para respirar.
        </div>
      </foreignObject>
      <g transform="translate(820 195)">
        <ellipse cx="165" cy="480" rx="152" ry="36" fill="#61b9e9"/>
        <path d="M50 466 L278 442 L295 520 L70 544 Z" fill="#58b1e3" stroke="#2387bf" stroke-width="9"/>
        <rect x="125" y="466" width="92" height="35" rx="17" fill="#f5f1e7" stroke="#777" stroke-width="5"/>
        <circle cx="175" cy="100" r="72" fill="#f0c39c" stroke="#3b2b24" stroke-width="6"/>
        <path d="M105 95 Q92 25 160 8 Q235 3 253 73 Q211 42 177 52 Q140 37 105 95" fill="#443127"/>
        <path d="M228 43 Q282 45 282 91 Q274 126 235 118 Z" fill="#443127"/>
        <circle cx="277" cy="78" r="28" fill="#443127"/>
        <path d="M252 67 Q273 39 296 49" stroke="#df759b" stroke-width="9" fill="none"/>
        <circle cx="147" cy="102" r="6" fill="#2e2926"/><circle cx="201" cy="102" r="6" fill="#2e2926"/>
        <path d="M159 135 Q176 124 195 135" stroke="#8c5f50" stroke-width="5" fill="none"/>
        <rect x="103" y="161" width="144" height="218" rx="48" fill="#dc6992" stroke="#a84d70" stroke-width="6"/>
        <path d="M110 196 Q66 210 69 330 Q73 363 101 348" fill="#f0c39c" stroke="#3b2b24" stroke-width="6"/>
        <path d="M242 196 Q286 210 282 330 Q278 363 250 348" fill="#f0c39c" stroke="#3b2b24" stroke-width="6"/>
        <rect x="104" y="344" width="66" height="95" fill="#7944a8"/><rect x="178" y="344" width="68" height="95" fill="#7944a8"/>
        <path d="M120 430 L162 430 L158 477 L115 477 Z" fill="#f0c39c"/><path d="M188 430 L231 430 L237 477 L194 477 Z" fill="#f0c39c"/>
        <path d="M103 474 Q142 452 175 480 L165 505 L96 502 Z" fill="#d83f78" stroke="#5b3c3c" stroke-width="6"/>
        <path d="M187 478 Q224 452 257 484 L246 509 L179 505 Z" fill="#d83f78" stroke="#5b3c3c" stroke-width="6"/>
      </g>
      <g transform="translate(55 4)">
        <rect x="0" y="8" width="145" height="78" rx="16" fill="#287bc1"/><circle cx="28" cy="4" r="16" fill="#edc4a3"/><circle cx="118" cy="4" r="16" fill="#edc4a3"/>
        <path d="M252 25 L330 25 L320 96 L262 96 Z" fill="#d84739"/><g stroke="#f5c342" stroke-width="12"><path d="M267 20L263 78"/><path d="M286 12L284 78"/><path d="M305 17L304 78"/><path d="M324 15L320 78"/></g>
        <rect x="360" y="6" width="58" height="90" rx="12" fill="#cf413a"/><rect x="371" y="-6" width="38" height="18" rx="5" fill="#ddd"/>
        <path d="M476 73 Q520 18 589 52 Q611 68 627 95 L470 95 Q463 83 476 73Z" fill="#d99a3b" stroke="#9b6323" stroke-width="4"/>
        <path d="M485 72 L610 72" stroke="#5b9f49" stroke-width="12"/><path d="M497 81 L598 81" stroke="#e8c13d" stroke-width="10"/>
      </g>
    </svg>
  </div>`;

  const malnutritionCard=`
  <div class="v105Sheet" role="img" aria-label="Card O que é desnutrição">
    <svg viewBox="0 0 1200 650" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="22" y="38" width="1156" height="588" rx="44" fill="#fffdf7" stroke="#5aa9df" stroke-width="9"/>
      <rect x="60" y="82" width="710" height="105" rx="42" fill="#4e9cdc"/>
      <text x="92" y="153" font-family="Comic Sans MS, Trebuchet MS, sans-serif" font-size="57" font-weight="800" fill="#fff">O que é desnutrição?</text>
      <foreignObject x="72" y="220" width="790" height="360">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;font-size:33px;line-height:1.33;font-weight:700;color:#333">
          A desnutrição acontece quando o corpo não recebe a quantidade certa de nutrientes, como proteínas, vitaminas e minerais. Isso pode ser causado por uma alimentação pobre em nutrientes, falta de alimentos ou problemas de saúde. A desnutrição pode causar fraqueza, baixo peso, dificuldade de aprendizado e maior risco de doenças.
        </div>
      </foreignObject>
      <g transform="translate(890 100)">
        <circle cx="120" cy="88" r="62" fill="#efbd83" stroke="#3d3028" stroke-width="6"/>
        <path d="M62 81 Q58 20 112 7 Q174 5 187 60 Q158 44 135 46 Q99 27 62 81" fill="#342c28"/>
        <circle cx="93" cy="88" r="6" fill="#2c2927"/><circle cx="143" cy="88" r="6" fill="#2c2927"/>
        <path d="M101 118 Q119 106 139 118" stroke="#8d5d45" stroke-width="5" fill="none"/>
        <path d="M86 153 Q121 138 157 154 L167 310 Q121 329 76 309 Z" fill="#50ad4a" stroke="#3d823c" stroke-width="6"/>
        <path d="M79 170 Q54 207 65 283" stroke="#efbd83" stroke-width="25" stroke-linecap="round"/><path d="M160 170 Q183 212 175 286" stroke="#efbd83" stroke-width="25" stroke-linecap="round"/>
        <path d="M84 306 L116 306 L109 430 L77 430 Z" fill="#a85f37"/><path d="M127 306 L159 306 L166 430 L134 430 Z" fill="#a85f37"/>
        <path d="M75 427 Q94 417 113 429" stroke="#8e603d" stroke-width="12" stroke-linecap="round"/><path d="M132 429 Q150 418 170 431" stroke="#8e603d" stroke-width="12" stroke-linecap="round"/>
      </g>
      <g transform="translate(265 0)">
        <ellipse cx="0" cy="16" rx="25" ry="13" fill="#e8902f"/><ellipse cx="55" cy="15" rx="25" ry="13" fill="#df4545"/><ellipse cx="110" cy="16" rx="27" ry="13" fill="#edc332"/><ellipse cx="168" cy="16" rx="26" ry="13" fill="#59a7d7"/>
      </g>
    </svg>
  </div>`;

  const lesson={
    key:'ciencias-cards-obesidade-desnutricao',
    emoji:'🥗',
    title:'Obesidade e desnutrição',
    subtitle:'Ciências • 5º ano',
    desc:'Revise os dois conceitos usando os mesmos cards visuais do material de aula.',
    mission:'Ciências • 5º ano • Revisão visual',
    passageTitle:'Obesidade e desnutrição',
    passage:'<div class="v105CardsWrap">'+obesityCard+malnutritionCard+'</div>',
    passageVisual:'',
    questions:[]
  };

  function install(){
    try{
      if(typeof subjects==='undefined'||!subjects)return false;
      Object.keys(subjects).forEach(key=>{
        try{
          const s=subjects[key];
          if(!s||typeof s!=='object')return;
          try{delete s.lessons}catch(e){}
          s.lessons=[];
          s.homeTitle='Nenhuma lição cadastrada';
          s.homeDescription='Esta matéria está pronta para receber novos conteúdos.';
          s.chips=['0 lições'];
          s.hint='Nenhuma lição disponível no momento.';
        }catch(e){}
      });
      if(!subjects.science)return false;
      subjects.science.lessons=[lesson];
      subjects.science.homeTitle='Ciências • 5º ano';
      subjects.science.homeDescription='Revisão visual com os cards de obesidade e desnutrição usados no material de aula.';
      subjects.science.chips=['1 lição','5º ano','Revisão visual'];
      subjects.science.hint='🔬 Abra o card e revise as duas explicações visuais.';
      try{if(typeof currentSubjectKey!=='undefined'&&currentSubjectKey==='science')lessons=subjects.science.lessons}catch(e){}
      try{if(typeof renderSubjectCards==='function')renderSubjectCards()}catch(e){}
      try{if(typeof updateProgress==='function')updateProgress()}catch(e){}
      return true;
    }catch(e){return false}
  }

  function styles(){
    if(document.getElementById('v105ScienceCardStyles'))return;
    const s=document.createElement('style');s.id='v105ScienceCardStyles';
    s.textContent=[
      '.v105CardsWrap{display:flex;flex-direction:column;gap:18px;margin:8px 0 18px}',
      '.v105Sheet{width:100%;overflow:hidden;background:#fff;border-radius:18px;box-shadow:0 10px 26px rgba(43,54,49,.08)}',
      '.v105Sheet svg{display:block;width:100%;height:auto}',
      '@media(max-width:560px){.v105CardsWrap{gap:13px}.v105Sheet{border-radius:13px}}'
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

  styles();install();stamp();
  let tries=0;
  const timer=setInterval(()=>{tries++;if(install()||tries>30)clearInterval(timer)},120);
})();