/* Lousa de Estudos — atualização automática segura a partir da v83 */
(() => {
  if (window.__lousaAutoUpdate) return;
  window.__lousaAutoUpdate = true;

  let checking = false;
  let updating = false;
  let lastCheck = 0;
  let pendingVersion = 0;
  let navigationObserver = null;
  const MIN_CHECK_INTERVAL = 15000;
  const PERIODIC_CHECK = 300000;
  const PENDING_KEY = 'lousa:autoUpdate:pendingVersion';

  function currentVersion() {
    const metaVersion = Number(document.querySelector('meta[name="app-version"]')?.content || 0);
    const params = new URLSearchParams(location.search);
    const queryVersion = Number(params.get('content') || 0);
    const runtimeVersion = Number(window.__lousaCurrentContentVersion || 0);
    return Math.max(metaVersion, queryVersion, runtimeVersion);
  }

  function addStyles() {
    if (document.getElementById('lousaUpdateStyles')) return;
    const style = document.createElement('style');
    style.id = 'lousaUpdateStyles';
    style.textContent = `
      .lousaVersionOnly{position:fixed;left:5px;bottom:max(4px,env(safe-area-inset-bottom));z-index:105000;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;font-size:9px;line-height:1;color:#7a857e;background:rgba(255,255,255,.78);border-radius:7px;padding:3px 5px;box-shadow:0 2px 7px rgba(15,23,42,.06);pointer-events:none;opacity:.86}
      .lousaVersionOnly.pending{color:#7a5a10;background:rgba(255,249,219,.92)}
      @media(max-width:520px){.lousaVersionOnly{font-size:8.5px}}
    `;
    document.head.appendChild(style);
  }

  function versionLabel() {
    addStyles();
    document.querySelector('.lousaManualUpdate')?.remove();
    let label = document.querySelector('.lousaVersionOnly');
    if (!label) {
      label = document.createElement('div');
      label.className = 'lousaVersionOnly';
      document.body.appendChild(label);
    }
    return label;
  }

  function stampVersion() {
    const version = currentVersion();
    const label = versionLabel();
    if (pendingVersion > version) {
      label.textContent = 'v' + version + ' • v' + pendingVersion + ' disponível';
      label.classList.add('pending');
    } else {
      label.textContent = 'v' + version;
      label.classList.remove('pending');
    }
    try {
      document.documentElement.dataset.contentVersion = String(version);
      const meta = document.querySelector('meta[name="app-version"]');
      if (meta && Number(meta.content || 0) < version) meta.content = String(version);
    } catch (error) {}
  }

  function lessonIsOpen() {
    try {
      const topic = document.getElementById('topicView');
      if (topic?.classList.contains('show')) return true;
      const lessonContent = document.getElementById('lessonContent');
      if (lessonContent && lessonContent.querySelector('.question')) {
        const rect = lessonContent.getBoundingClientRect();
        const style = getComputedStyle(lessonContent);
        if (style.display !== 'none' && style.visibility !== 'hidden' && rect.height > 0) return true;
      }
    } catch (error) {}
    return false;
  }

  function safeToUpdateNow() {
    return !lessonIsOpen();
  }

  function savePending(version) {
    pendingVersion = Math.max(pendingVersion, Number(version || 0));
    try {
      if (pendingVersion > currentVersion()) localStorage.setItem(PENDING_KEY, String(pendingVersion));
      else localStorage.removeItem(PENDING_KEY);
    } catch (error) {}
    stampVersion();
  }

  function restorePending() {
    try {
      const saved = Number(localStorage.getItem(PENDING_KEY) || 0);
      if (saved > currentVersion()) pendingVersion = saved;
      else localStorage.removeItem(PENDING_KEY);
    } catch (error) {}
  }

  function navigateToUpdate(version) {
    if (updating) return;
    updating = true;
    try { localStorage.removeItem(PENDING_KEY); } catch (error) {}
    const target = new URL('./start.html', location.href);
    target.searchParams.set('pwa', '1');
    target.searchParams.set('update', '1');
    target.searchParams.set('from', 'auto');
    target.searchParams.set('target', String(version || pendingVersion || 'latest'));
    target.searchParams.set('ts', String(Date.now()));
    location.replace(target.toString());
  }

  function applyPendingIfSafe() {
    const current = currentVersion();
    if (pendingVersion > current && safeToUpdateNow()) {
      navigateToUpdate(pendingVersion);
      return true;
    }
    stampVersion();
    return false;
  }

  async function checkForUpdate(force = false) {
    if (checking || updating) return;
    const now = Date.now();
    if (!force && now - lastCheck < MIN_CHECK_INTERVAL) return;
    lastCheck = now;
    checking = true;
    try {
      const response = await fetch('./app-version.json?auto=' + now, { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      const remote = Number(data?.contentVersion || 0);
      const current = currentVersion();
      if (remote > current) {
        savePending(remote);
        applyPendingIfSafe();
      } else {
        pendingVersion = 0;
        try { localStorage.removeItem(PENDING_KEY); } catch (error) {}
        stampVersion();
      }
    } catch (error) {
      stampVersion();
    } finally {
      checking = false;
    }
  }

  function patchNavigation() {
    try {
      if (typeof showSubjects === 'function' && !showSubjects.__autoUpdateWrapped) {
        const previous = showSubjects;
        const wrapped = function() {
          const result = previous.apply(this, arguments);
          setTimeout(() => {
            if (!applyPendingIfSafe()) checkForUpdate(true);
          }, 120);
          return result;
        };
        wrapped.__autoUpdateWrapped = true;
        showSubjects = wrapped;
      }
    } catch (error) {}
  }

  function observeNavigation() {
    try {
      const topic = document.getElementById('topicView');
      if (!topic || navigationObserver) return;
      navigationObserver = new MutationObserver(() => {
        if (!lessonIsOpen()) {
          setTimeout(() => {
            if (!applyPendingIfSafe()) checkForUpdate(false);
          }, 80);
        }
      });
      navigationObserver.observe(topic, { attributes: true, attributeFilter: ['class', 'style'] });
    } catch (error) {}
  }

  function init() {
    restorePending();
    patchNavigation();
    observeNavigation();
    stampVersion();
    setTimeout(() => checkForUpdate(true), 700);
    setTimeout(() => stampVersion(), 5200);

    window.addEventListener('focus', () => checkForUpdate(false));
    window.addEventListener('pageshow', () => checkForUpdate(false));
    window.addEventListener('online', () => checkForUpdate(true));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkForUpdate(false);
    });

    setInterval(() => checkForUpdate(false), PERIODIC_CHECK);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
