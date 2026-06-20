// ── STORAGE ───────────────────────────────────────────────────────
let todos = JSON.parse(localStorage.getItem('rn_todos') || '[]');
let notes = JSON.parse(localStorage.getItem('rn_notes') || '[]');

const save = () => {
  localStorage.setItem('rn_todos', JSON.stringify(todos));
  localStorage.setItem('rn_notes', JSON.stringify(notes));
};

// ── STATE ─────────────────────────────────────────────────────────
let activeTab    = 'todo';
let activeFilter = 'all';
let selectedId   = null;
let saveTimer    = null;

// ── UTILS ─────────────────────────────────────────────────────────
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

const fmt = (ts) =>
  new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

const escHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// ── RENDER SIDEBAR ────────────────────────────────────────────────
function renderSidebar() {
  const list    = document.getElementById('item-list');
  const countEl = document.getElementById('sidebar-count');

  let items = activeTab === 'todo' ? [...todos] : [...notes];

  if (activeTab === 'todo') {
    if (activeFilter === 'active') items = items.filter(t => !t.done);
    else if (activeFilter === 'done')  items = items.filter(t => t.done);
    else if (activeFilter === 'high')  items = items.filter(t => t.priority === 'high');
  } else {
    if (activeFilter !== 'all') items = items.filter(n => n.category === activeFilter);
  }

  countEl.textContent = `${items.length} item${items.length !== 1 ? 's' : ''}`;

  if (!items.length) {
    list.innerHTML = '<div class="empty-state">Nothing here.<br>Create something new.</div>';
    return;
  }

  list.innerHTML = items.map(item => {
    const sel = item.id === selectedId ? 'selected' : '';

    if (activeTab === 'todo') {
      return `
        <div class="list-item ${sel}" data-id="${item.id}">
          <div class="item-check ${item.done ? 'done' : ''}" data-check="${item.id}"></div>
          <div class="item-info">
            <div class="item-title ${item.done ? 'done' : ''}">${escHtml(item.title || 'Untitled')}</div>
            <div class="item-meta">${fmt(item.updatedAt)}</div>
          </div>
          <div class="priority-dot p-${item.priority}"></div>
        </div>`;
    } else {
      return `
        <div class="list-item ${sel}" data-id="${item.id}">
          <div class="item-info">
            <div class="item-title">${escHtml(item.title || 'Untitled')}</div>
            <div class="item-meta">${item.category} · ${fmt(item.updatedAt)}</div>
          </div>
        </div>`;
    }
  }).join('');

  // click handlers
  list.querySelectorAll('.list-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.dataset.check) { toggleDone(e.target.dataset.check); return; }
      selectItem(el.dataset.id);
    });
  });

  list.querySelectorAll('[data-check]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDone(el.dataset.check);
    });
  });
}

// ── SELECT ITEM ───────────────────────────────────────────────────
function selectItem(id) {
  selectedId = id;
  renderSidebar();

  const item = activeTab === 'todo'
    ? todos.find(t => t.id === id)
    : notes.find(n => n.id === id);

  if (!item) return;

  document.getElementById('panel-title').textContent = item.title || 'Untitled';
  document.getElementById('panel-sub').textContent   = `Last edited ${fmt(item.updatedAt)}`;
  document.getElementById('delete-btn').style.display = 'block';

  if (activeTab === 'todo') renderTodoEditor(item);
  else renderNoteEditor(item);
}

// ── TODO EDITOR ───────────────────────────────────────────────────
function renderTodoEditor(item) {
  document.getElementById('editor-area').innerHTML = `
    <div class="form-section">
      <div class="form-row">
        <div class="field-group">
          <label class="field-label">Title</label>
          <input class="field-input" id="ed-title" value="${escHtml(item.title || '')}" placeholder="Task title" />
        </div>
        <div class="field-group">
          <label class="field-label">Priority</label>
          <select class="field-select" id="ed-priority">
            <option value="low"    ${item.priority === 'low'    ? 'selected' : ''}>Low</option>
            <option value="medium" ${item.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high"   ${item.priority === 'high'   ? 'selected' : ''}>High</option>
          </select>
        </div>
        <div class="field-group">
          <label class="field-label">Status</label>
          <select class="field-select" id="ed-status">
            <option value="active" ${!item.done ? 'selected' : ''}>Active</option>
            <option value="done"   ${ item.done ? 'selected' : ''}>Done</option>
          </select>
        </div>
      </div>
      <hr class="divider" />
      <div class="field-group">
        <label class="field-label">Notes</label>
        <textarea class="body-input" id="ed-body" placeholder="Add details, context, links...">${escHtml(item.body || '')}</textarea>
      </div>
    </div>`;

  const autoSave = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const t = todos.find(t => t.id === item.id);
      if (!t) return;
      t.title    = document.getElementById('ed-title').value;
      t.priority = document.getElementById('ed-priority').value;
      t.done     = document.getElementById('ed-status').value === 'done';
      t.body     = document.getElementById('ed-body').value;
      t.updatedAt = Date.now();
      save();
      document.getElementById('panel-title').textContent = t.title || 'Untitled';
      document.getElementById('panel-sub').textContent   = 'Last edited just now';
      renderSidebar();
      updateStats();
    }, 400);
  };

  ['ed-title', 'ed-priority', 'ed-status', 'ed-body'].forEach(id => {
    document.getElementById(id).addEventListener('input',  autoSave);
    document.getElementById(id).addEventListener('change', autoSave);
  });
}

// ── NOTE EDITOR ───────────────────────────────────────────────────
function renderNoteEditor(item) {
  document.getElementById('editor-area').innerHTML = `
    <div class="form-section">
      <div class="form-row-note">
        <div></div>
        <div class="field-group">
          <label class="field-label">Category</label>
          <select class="field-select" id="ed-category">
            <option value="personal" ${item.category === 'personal' ? 'selected' : ''}>Personal</option>
            <option value="work"     ${item.category === 'work'     ? 'selected' : ''}>Work</option>
            <option value="ideas"    ${item.category === 'ideas'    ? 'selected' : ''}>Ideas</option>
          </select>
        </div>
      </div>
      <input class="title-input" id="ed-title" value="${escHtml(item.title || '')}" placeholder="Note title..." />
      <hr class="divider" />
      <textarea class="body-input" id="ed-body" placeholder="Start writing...">${escHtml(item.body || '')}</textarea>
    </div>`;

  const autoSave = () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const n = notes.find(n => n.id === item.id);
      if (!n) return;
      n.title    = document.getElementById('ed-title').value;
      n.category = document.getElementById('ed-category').value;
      n.body     = document.getElementById('ed-body').value;
      n.updatedAt = Date.now();
      save();
      document.getElementById('panel-title').textContent = n.title || 'Untitled';
      document.getElementById('panel-sub').textContent   = 'Last edited just now';
      renderSidebar();
      updateStats();
    }, 400);
  };

  ['ed-title', 'ed-category', 'ed-body'].forEach(id => {
    document.getElementById(id).addEventListener('input',  autoSave);
    document.getElementById(id).addEventListener('change', autoSave);
  });
}

// ── TOGGLE DONE ───────────────────────────────────────────────────
function toggleDone(id) {
  const t = todos.find(t => t.id === id);
  if (!t) return;
  t.done = !t.done;
  t.updatedAt = Date.now();
  save();
  renderSidebar();
  updateStats();
  if (selectedId === id) selectItem(id);
}

// ── CREATE NEW ────────────────────────────────────────────────────
function createNew() {
  if (activeTab === 'todo') {
    const item = {
      id: uid(), title: '', priority: 'medium',
      done: false, body: '', createdAt: Date.now(), updatedAt: Date.now()
    };
    todos.unshift(item);
    save();
    setFilter('all');
    renderSidebar();
    selectItem(item.id);
    setTimeout(() => document.getElementById('ed-title')?.focus(), 50);
  } else {
    const item = {
      id: uid(), title: '', category: 'personal',
      body: '', createdAt: Date.now(), updatedAt: Date.now()
    };
    notes.unshift(item);
    save();
    setFilter('all');
    renderSidebar();
    selectItem(item.id);
    setTimeout(() => document.getElementById('ed-title')?.focus(), 50);
  }
  updateStats();
}

// ── DELETE ────────────────────────────────────────────────────────
function deleteSelected() {
  if (!selectedId) return;
  if (!confirm('Delete this item?')) return;
  if (activeTab === 'todo') todos = todos.filter(t => t.id !== selectedId);
  else notes = notes.filter(n => n.id !== selectedId);
  selectedId = null;
  save();
  renderSidebar();
  resetEditor();
  updateStats();
}

function resetEditor() {
  document.getElementById('panel-title').textContent  = 'Select an item';
  document.getElementById('panel-sub').textContent    = 'Or create a new one';
  document.getElementById('delete-btn').style.display = 'none';
  document.getElementById('editor-area').innerHTML    = `
    <div class="welcome">
      <div class="welcome-icon">✦</div>
      <h3>Nothing selected</h3>
      <p>Pick an item from the sidebar<br>or create something new.</p>
    </div>`;
}

// ── STATS ─────────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('stat-total').textContent       = todos.length;
  document.getElementById('stat-done').textContent        = todos.filter(t => t.done).length;
  document.getElementById('stat-notes-count').textContent = notes.length;
}

// ── FILTER HELPER ─────────────────────────────────────────────────
function setFilter(f) {
  activeFilter = f;
  const selector = activeTab === 'todo' ? '#todo-filters .filter-chip' : '#note-filters .filter-chip';
  document.querySelectorAll(selector).forEach(c =>
    c.classList.toggle('active', c.dataset.filter === f)
  );
}

// ── EVENT LISTENERS ───────────────────────────────────────────────

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activeTab    = btn.dataset.tab;
    selectedId   = null;
    activeFilter = 'all';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('todo-filters').style.display  = activeTab === 'todo'  ? 'flex' : 'none';
    document.getElementById('note-filters').style.display  = activeTab === 'notes' ? 'flex' : 'none';
    setFilter('all');
    renderSidebar();
    resetEditor();
  });
});

// Filter chips
document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    setFilter(chip.dataset.filter);
    renderSidebar();
  });
});

// New / Delete
document.getElementById('new-btn').addEventListener('click', createNew);
document.getElementById('delete-btn').addEventListener('click', deleteSelected);

// ── INIT ──────────────────────────────────────────────────────────
renderSidebar();
updateStats();
