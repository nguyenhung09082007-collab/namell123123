/* Lưu & khôi phục vị trí thẻ Kanban bằng localStorage (chạy TRƯỚC script gốc của trang) */
(function () {
  const KEY = 'studyplan.kanban.v1';
  const view = document.getElementById('kanban-view');
  if (!view) return;
  const areas = () => ({
    todo: document.querySelector('#col-todo .task-drop-area'),
    doing: document.querySelector('#col-doing .task-drop-area'),
    done: document.querySelector('#col-done .task-drop-area')
  });
  const recount = () => document.querySelectorAll('.kanban-column').forEach(c => {
    const b = c.querySelector('.column-count');
    if (b) b.textContent = c.querySelectorAll('.task-card').length;
  });
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) {
      const A = areas();
      const existing = {};
      document.querySelectorAll('.task-card').forEach(c => (existing[c.dataset.id] = c));
      const keep = new Set();
      saved.forEach(item => {
        let card = existing[item.id];
        if (!card) {
          const tmp = document.createElement('div');
          tmp.innerHTML = item.html;
          card = tmp.firstElementChild;
        }
        keep.add(item.id);
        A[item.status].appendChild(card);
      });
      Object.keys(existing).forEach(id => { if (!keep.has(id)) existing[id].remove(); });
      recount();
    }
  } catch (e) { console.warn('Không khôi phục được dữ liệu', e); }
  function save() {
    try {
      const out = [];
      document.querySelectorAll('.kanban-column').forEach(col => {
        col.querySelectorAll('.task-card').forEach(c => out.push({
          id: c.dataset.id, status: col.dataset.status, html: c.outerHTML
        }));
      });
      localStorage.setItem(KEY, JSON.stringify(out));
    } catch (e) {}
  }
  new MutationObserver(save).observe(view, { childList: true, subtree: true });
  window.resetStudyPlanData = () => { localStorage.removeItem(KEY); location.reload(); };
})();
