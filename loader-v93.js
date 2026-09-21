(async()=>{
  try{
    const response=await fetch('./index.html?raw=v93&ts='+Date.now(),{cache:'no-store'});
    if(!response.ok)throw new Error('Falha ao carregar a base do aplicativo');
    let html=await response.text();
    html=html.replace(/<meta name="app-version" content="[^"]*">/,'<meta name="app-version" content="93">');
    html=html.replace(/\.\/manifest\.webmanifest(?:\?[^"']*)?/g,'./manifest.webmanifest?v=93');
    html=html.replace(/\.\/icons\/lousa-icon\.svg(?:\?[^"']*)?/g,'./icons/lousa-icon-512.png?v=93');
    html=html.replace(/type="image\/svg\+xml"/g,'type="image/png"');
    html=html.replace(/<link rel="stylesheet" href="\.\/(?:v3[5-9]|v4[0-9]|v5[0-9]|v6[0-9]|v7[0-9]|v8[0-9]|v9[0-9]|pwa-v3[9]|pwa-v4[0-9]|pwa-v5[0-9]|pwa-v6[0-9]|pwa-v7[0-9]|pwa-v8[0-9]|pwa-v9[0-9])\.css\?v=[^"']+">\s*/g,'');
    html=html.replace(/<script src="\.\/(?:v3[5-9]|v4[0-9]|v5[0-9]|v6[0-9]|v7[0-9]|v8[0-9]|v9[0-9]|pwa-v3[9]|pwa-v4[0-9]|pwa-v5[0-9]|pwa-v6[0-9]|pwa-v7[0-9]|pwa-v8[0-9]|pwa-v9[0-9])\.js\?v=[^"']+"(?: defer)?><\/script>\s*/g,'');
    html=html.replace('</head>','\n<link rel="stylesheet" href="./v37.css?v=93">\n<link rel="stylesheet" href="./pwa-v39.css?v=93">\n<style id="v93VersionBootHide">.lousaVersionOnly{visibility:hidden!important}</style>\n</head>');

    const before=['./v37.js?v=93','./v41.js?v=93','./v50.js?v=93','./v54.js?v=93'];
    const after=[
      './v55.js?v=93','./v56.js?v=93','./v57.js?v=93','./v58.js?v=93','./v59.js?v=93','./v60.js?v=93',
      './v62.js?v=93','./v63.js?v=93','./v64.js?v=93','./v65.js?v=93','./v66.js?v=93','./v67.js?v=93',
      './v68.js?v=93','./v69.js?v=93','./v70-data-01.js?v=93','./v70-data-02.js?v=93','./v70-data-03.js?v=93',
      './v70-data-04.js?v=93','./v70-data-05.js?v=93','./v70-data-06.js?v=93','./v70-data-07.js?v=93','./v70-data-08.js?v=93',
      './v70-data-09.js?v=93','./v70-data-10.js?v=93','./v70-data-11.js?v=93','./v70.js?v=93','./v71.js?v=93','./v72.js?v=93','./v73.js?v=93','./v74.js?v=93','./v75.js?v=93','./v76.js?v=93','./v77.js?v=93','./v78.js?v=93','./v79.js?v=93','./v80.js?v=93','./v81.js?v=93','./v82.js?v=93',
      './v90-jp.js?v=93','./v90-dn.js?v=93','./v93-math7.js?v=93','./v93.js?v=93'
    ];
    const tags=list=>list.map(src=>'<script src="'+src+'"><\/script>').join('\n');
    const snapshot='<script>window.__lousaCurrentContentVersion=93;try{window.__lousaV68PortugueseSnapshot=JSON.parse(JSON.stringify(portugueseLessons));}catch(e){window.__lousaV68PortugueseSnapshot=[];}<\/script>';
    html=html.replace('</body>','\n'+tags(before)+'\n'+snapshot+'\n'+tags(after)+'\n</body>');
    document.open();document.write(html);document.close();
  }catch(error){
    const card=document.querySelector('.v68card');
    if(card)card.innerHTML='<strong>Não foi possível abrir agora.</strong><p>Feche o aplicativo e abra novamente.</p>';
    console.error(error);
  }
})();
