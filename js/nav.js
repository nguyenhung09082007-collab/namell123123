/* StudyPlan - điều hướng dùng chung giữa các trang */
(function () {
  const ROUTES = {
    'bang-dieu-khien': 'index.html',
    'ke-hoach-va-nhiem-vu': 'kanban.html',
    'bam-gio-pomodoro': 'pomodoro.html',
    'phu-huynh-xem': 'parent.html'
  };
  function toast(msg) {
    let t = document.getElementById('sp-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'sp-toast';
      t.style.cssText = 'position:fixed;top:24px;right:24px;z-index:9999;background:#1e1b4b;color:#fff;padding:12px 18px;border-radius:14px;font:500 14px "Plus Jakarta Sans",sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.2);transform:translateX(120%);transition:transform .3s ease-out';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => (t.style.transform = 'translateX(0)'));
    clearTimeout(t._h);
    t._h = setTimeout(() => (t.style.transform = 'translateX(120%)'), 2200);
  }
  document.querySelectorAll('a[data-path]').forEach(a => {
    const key = a.getAttribute('data-path');
    if (ROUTES[key]) a.setAttribute('href', ROUTES[key]);
    else a.addEventListener('click', e => { e.preventDefault(); toast('Trang "' + a.textContent.trim().replace(/Chỉ xem/, '') + '" sắp ra mắt'); });
  });
  /* các nút "Thêm nhiệm vụ" ở trang khác dẫn về Kanban */
  const add = document.getElementById('open-new-task-btn');
  if (add && !location.pathname.endsWith('kanban.html')) add.addEventListener('click', () => (location.href = 'kanban.html'));
  /* hiệu ứng vào trang */
  document.body.style.animation = 'spFade .35s ease-out';
  const st = document.createElement('style');
  st.textContent = '@keyframes spFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){body{animation:none!important}}';
  document.head.appendChild(st);
})();
