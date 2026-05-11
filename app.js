/* ═══════════════════════════════════════════════════════════
   PROTOCOL v2 — App logic
   ═══════════════════════════════════════════════════════════ */

/* ── Inline data (representative subset) ───────── */
const DRILLS = [
  { id: 'two-step-peek', cat: 'peek', name: 'Two-Step Peek', short: 'Two committed steps, hand off mouse, preemptive stop.', tags: ['Core', 'Beginner'], cue: 'Two steps, lift, wait.' },
  { id: 'idle-crosshair', cat: 'peek', name: 'Idle Crosshair', short: 'Lift hand off mouse during peek — no blending motion + aim.', tags: ['Core', 'Aim'], cue: 'Hand off the mouse until stopped.' },
  { id: 'slice-fallback', cat: 'peek', name: 'Slice & Fall Back', short: 'Peek tight, gather info, fall back instantly.', tags: ['Peek', 'Intermediate'], cue: 'Close to wall, stop early, gather only.' },
  { id: 'deadzone-stop', cat: 'aim', name: 'Deadzone Stop Timing', short: 'Fully stopped before first bullet — no mid-decel firing.', tags: ['Core', 'Aim'], cue: 'Stop, then shoot. Never overlap.' },
  { id: 'odin-head-height', cat: 'aim', name: 'Odin Head-Height Drill', short: 'Trace at head level across the range, never below.', tags: ['Aim'], cue: 'Crosshair at head. Always.' },
  { id: 'shoot-then-move', cat: 'movement', name: 'Shoot-Then-Move', short: 'Move immediately after every shot — zero gap.', tags: ['Core', 'Movement'], cue: 'Fire, drift, fire.' },
  { id: 'deliberate-dm', cat: 'movement', name: 'Deliberate DM', short: 'Pause 1s before every angle. DM as drill, not kill farm.', tags: ['Core', 'DM'], cue: 'Slow is smooth.' },
  { id: 'breath-reset', cat: 'mental', name: 'Breath Reset', short: 'Box breath between rounds — physiology, not mindset.', tags: ['Mental'], cue: '4-4-4-4. Then peek.' },
  { id: 'mass-protocol', cat: 'movement', name: 'MASS Protocol', short: 'Move-Aim-Stop-Shoot in one fluid sequence.', tags: ['Movement', 'Intermediate'], cue: 'M-A-S-S.' },
];

const CONCEPTS = [
  { id: 'angle-advantage', block: 1, name: 'Angle Advantage Rule', preview: 'Further from wall = spots enemy first.' },
  { id: 'trace-vs-preaim', block: 1, name: 'Trace vs. Pre-Aim Decision', preview: 'Trace when advantaged, pre-aim when disadvantaged.' },
  { id: 'acoustic-hold', block: 1, name: 'Acoustic-Based Hold Width', preview: 'Footsteps = hold wide. Silence = hold tight.' },
  { id: 'peekers-advantage', block: 1, name: "Peeker's Advantage", preview: '~100ms timing gap. Commit fully — no half-swings.' },
  { id: 'poisoned-angles', block: 1, name: 'Poisoned Angles', preview: 'Re-peek = reposition. Static spots get pre-fired.' },
  { id: 'first-bullet', block: 2, name: 'First-Bullet Accuracy Physics', preview: 'Decel curve: ~250ms before crosshair fully reset.' },
  { id: 'cns-fatigue', block: 3, name: 'CNS Fatigue', preview: 'Overwarming degrades match performance. Stop fresh.' },
  { id: 'green-mode', block: 3, name: 'Green Mode', preview: 'The relaxed-but-alert state. Tense hands = miss.' },
  { id: 'ufos', block: 4, name: 'UFOs Position Check', preview: 'Utility-Flash-Off-angle-Stack-Escape. Score before holding.' },
];

const SKILLS = [
  { id: 'stop-timing', name: 'Stop Timing', tier: 1, drillId: 'deadzone-stop' },
  { id: 'crosshair-placement', name: 'Crosshair Placement', tier: 1, drillId: 'odin-head-height' },
  { id: 'shoot-then-move', name: 'Shoot-Then-Move', tier: 1, drillId: 'shoot-then-move' },
  { id: 'two-step', name: 'Two-Step Peek', tier: 1, drillId: 'two-step-peek' },
  { id: 'breath', name: 'Breath Control', tier: 1, drillId: 'breath-reset' },
  { id: 'slice', name: 'Slice & Fall Back', tier: 2, drillId: 'slice-fallback' },
  { id: 'deliberate-dm', name: 'Deliberate DM', tier: 2, drillId: 'deliberate-dm' },
];

const CAUSES = [
  { id: 'bad-peek', label: 'Bad Peek', sub: 'wide too fast, no setup' },
  { id: 'crossfire', label: 'Crossfire / 2v1', sub: 'two enemies at once' },
  { id: 'off-angle', label: 'Off-Angle', sub: 'enemy unexpected spot' },
  { id: 'panic-spray', label: 'Panic Spray', sub: 'tense hands, no idle crosshair' },
  { id: 'low-crosshair', label: 'Low Crosshair', sub: 'aiming at body, not head' },
  { id: 'overcommit', label: 'Overcommit', sub: 'no fallback plan' },
  { id: 'no-utility', label: 'No Utility', sub: 'walked in dry' },
  { id: 'bad-trade', label: 'Bad Trade', sub: 'no teammate to trade' },
  { id: 'overpeek', label: 'Re-Peeked', sub: 'they were waiting' },
];

const PATH = [
  { id: 'angle-advantage', name: 'Angle Advantage Rule', tag: 'Block 1', required: true },
  { id: 'trace-vs-preaim', name: 'Trace vs. Pre-Aim', tag: 'Block 1', required: true },
  { id: 'acoustic-hold', name: 'Acoustic Hold Width', tag: 'Block 1', required: true },
  { id: 'peekers-advantage', name: "Peeker's Advantage", tag: 'Block 1', required: true },
  { id: 'poisoned-angles', name: 'Poisoned Angles', tag: 'Block 1' },
  { id: 'first-bullet', name: 'First-Bullet Physics', tag: 'Block 2' },
  { id: 'cns-fatigue', name: 'CNS Fatigue', tag: 'Block 3' },
  { id: 'green-mode', name: 'Green Mode', tag: 'Block 3' },
  { id: 'ufos', name: 'UFOs Position Check', tag: 'Support' },
];

const PLAN_TEMPLATES = {
  15: [
    { name: 'RAMP — Raise + Activate', mins: 5, kind: 'ramp' },
    { name: 'Idle Crosshair quick reps', mins: 5, kind: 'drill' },
    { name: 'Ghost DM @ tournament pace', mins: 5, kind: 'dm' },
  ],
  30: [
    { name: 'RAMP Protocol (auto-flow)', mins: 12, kind: 'ramp' },
    { name: 'Two-Step Peek — 15 reps', mins: 8, kind: 'drill' },
    { name: 'Ghost DM — apply cue', mins: 10, kind: 'dm' },
  ],
  45: [
    { name: 'RAMP Protocol (auto-flow)', mins: 12, kind: 'ramp' },
    { name: 'Two-Step Peek — 15 reps', mins: 10, kind: 'drill' },
    { name: 'Idle Crosshair — 15 reps', mins: 8, kind: 'drill' },
    { name: 'Ghost DM — apply cue', mins: 12, kind: 'dm' },
    { name: 'VOD review (1 round)', mins: 3, kind: 'review' },
  ],
  60: [
    { name: 'RAMP Protocol (auto-flow)', mins: 13, kind: 'ramp' },
    { name: 'Two-Step Peek — 15 reps', mins: 10, kind: 'drill' },
    { name: 'Idle Crosshair — 15 reps', mins: 10, kind: 'drill' },
    { name: 'Deliberate DM — Ghost', mins: 15, kind: 'dm' },
    { name: 'VOD review (3 rounds, 5-Why)', mins: 12, kind: 'review' },
  ],
};

/* ── State ───────────────────────────────────── */
const state = {
  view: 'today',
  todayState: 'pre',
  theme: 'dark',
  accent: 'orange',
  plan: null,
  planProgress: 0,
  cue: 'Two steps, lift, wait.',
  pathDone: new Set(),
  deaths: [],
  history: [],
  loggerCompact: false,
  origTitle: document.title,
};

const ACCENT_PRESETS = {
  orange: { l: 0.68, c: 0.19, h: 38 },
  cyan:   { l: 0.72, c: 0.14, h: 200 },
  lime:   { l: 0.78, c: 0.18, h: 130 },
  violet: { l: 0.65, c: 0.18, h: 290 },
};

/* ── Storage ───────────────────────────────────── */
const STORAGE = {
  get: (k, d) => { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

function loadState() {
  state.theme    = STORAGE.get('proto_theme',    'dark');
  state.accent   = STORAGE.get('proto_accent',   'orange');
  state.history  = STORAGE.get('proto_history',  []);
  state.deaths   = STORAGE.get('proto_deaths',   []);
  state.pathDone = new Set(STORAGE.get('proto_pathDone', []));
  state.cue      = STORAGE.get('proto_cue',      'Two steps, lift, wait.');
}

function saveState() {
  STORAGE.set('proto_theme',    state.theme);
  STORAGE.set('proto_accent',   state.accent);
  STORAGE.set('proto_history',  state.history);
  STORAGE.set('proto_deaths',   state.deaths);
  STORAGE.set('proto_pathDone', [...state.pathDone]);
  STORAGE.set('proto_cue',      state.cue);
}

/* ── Helpers ───────────────────────────────────── */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmtDate = (d = new Date()) => d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

function showToast(msg, action) {
  const el = $('#toast');
  el.innerHTML = '';
  const span = document.createElement('span'); span.textContent = msg; el.appendChild(span);
  if (action) {
    const btn = document.createElement('button'); btn.textContent = action.label;
    btn.onclick = () => { action.fn(); el.classList.remove('show'); };
    el.appendChild(btn);
  }
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 3500);
}

/* ── View routing ───────────────────────────────────── */
function setView(v) {
  state.view = v;
  $$('.view').forEach(el => el.classList.toggle('active', el.id === `view-${v}`));
  $$('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.view === v));
  $('#sidebar').classList.remove('open');
  if (v === 'logger') renderLogger();
  if (v === 'history') renderHistory('all');
  if (v === 'library') renderLibrary('drills');
  if (v === 'path') renderPath();
}

document.addEventListener('click', e => {
  const navItem = e.target.closest('[data-view]');
  if (navItem) { e.preventDefault(); setView(navItem.dataset.view); }
});

$('#menu-btn').onclick = () => $('#sidebar').classList.toggle('open');

/* ── Theme + accent ───────────────────────────────────── */
function setTheme(t) {
  state.theme = t;
  document.documentElement.setAttribute('data-theme', t);
  $$('[data-tweak="theme"] button').forEach(b => b.classList.toggle('active', b.dataset.val === t));
  // Topbar theme icon
  const icon = $('#theme-icon');
  if (t === 'light') {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
  }
  saveState();
}
function setAccent(name) {
  state.accent = name;
  const p = ACCENT_PRESETS[name];
  document.documentElement.style.setProperty('--accent-l', p.l);
  document.documentElement.style.setProperty('--accent-c', p.c);
  document.documentElement.style.setProperty('--accent-h', p.h);
  $$('[data-tweak="accent"] button').forEach(b => b.classList.toggle('active', b.dataset.val === name));
  saveState();
}

$('#theme-btn').onclick = () => setTheme(state.theme === 'dark' ? 'light' : 'dark');

/* ── Today / state-aware home ───────────────────────────────────── */
function setTodayState(s) {
  state.todayState = s;
  ['pre', 'mid', 'post'].forEach(k => $(`#state-${k}`).classList.toggle('hidden', k !== s));
  const labels = {
    pre: { eyebrow: 'PRE-SESSION', title: 'Plan today\'s session', sub: 'One click — I\'ll build your plan from your skills queue.' },
    mid: { eyebrow: 'IN SESSION', title: 'Today\'s plan — running', sub: 'Tap a step to mark complete. Cue is in your tab title.' },
    post: { eyebrow: 'SESSION COMPLETE', title: 'Log it before you forget', sub: 'Quick log = 30 seconds. Detail is optional.' },
  };
  const L = labels[s];
  $('#today-eyebrow').textContent = L.eyebrow;
  $('#today-title').textContent = L.title;
  $('#today-sub').textContent = L.sub;
  $('#why-card').classList.toggle('hidden', s !== 'mid');
  $('#recent-card').classList.toggle('hidden', s === 'mid');

  if (s === 'mid') document.title = `🎯 ${state.cue} — PROTOCOL`;
  else document.title = state.origTitle;
}

function generatePlan(mins) {
  const tmpl = PLAN_TEMPLATES[mins] || PLAN_TEMPLATES[30];
  state.plan = tmpl.map((s, i) => ({ ...s, idx: i, done: false }));
  state.planProgress = 0;

  // Cue derived from first drill
  const drill = DRILLS.find(d => state.plan.some(s => s.name.toLowerCase().includes(d.name.toLowerCase().split(' ')[0])));
  if (drill) state.cue = drill.cue;
  $('#cue-text').textContent = state.cue;

  renderPlan();

  // Why-this-plan
  $('#why-list').innerHTML = `
    <li>Time budget: <b>${mins} min</b> — fits the chosen template.</li>
    <li>Cue picked from your top training skill: <b>${drill ? drill.name : '—'}</b>.</li>
    <li>Default mode: <b>Ranked day</b> · DM weapon: <b>Ghost</b>.</li>
    <li>Skills queued for today: 2 active, 5 pending.</li>
  `;

  setTodayState('mid');
}

function renderPlan() {
  const list = $('#plan-list');
  list.innerHTML = '';
  state.plan.forEach((step, i) => {
    const row = document.createElement('div');
    row.className = `plan-step ${step.done ? 'done' : ''} ${i === state.planProgress && !step.done ? 'active' : ''}`;
    row.innerHTML = `
      <span class="plan-num">${i + 1}</span>
      <div>
        <div class="plan-name">${step.name}</div>
      </div>
      <span class="plan-meta">${step.mins} min</span>
    `;
    row.onclick = () => {
      step.done = !step.done;
      state.planProgress = state.plan.findIndex(s => !s.done);
      if (state.planProgress === -1) {
        showToast('All steps done. Mark complete?', { label: 'Complete', fn: completeSession });
        state.planProgress = state.plan.length;
      }
      renderPlan();
    };
    list.appendChild(row);
  });
}

function completeSession() {
  setTodayState('post');
  showToast('Nice work — log it before you forget.');
}

$$('.time-btn').forEach(b => b.onclick = () => {
  $$('.time-btn').forEach(x => x.classList.remove('primary'));
  b.classList.add('primary');
  generatePlan(parseInt(b.dataset.time));
});
$('#mark-complete').onclick = completeSession;
$('#reset-plan').onclick = () => setTodayState('pre');
$('#back-pre').onclick = () => setTodayState('pre');
$('#rest-day').onclick = () => {
  showToast('Off-PC protocol: 5min idle rest → 10min visualization → sleep.');
};
$('#edit-defaults').onclick = () => showToast('Mode/DM editor — would open inline picker here.');

$('#save-quicklog').onclick = () => {
  const m = $('#ql-min').value, mistake = $('#ql-mistake').value, win = $('#ql-win').value;
  const cueVal = document.querySelector('input[name="cue-s"]:checked');
  state.history.unshift({
    date: fmtDate(),
    isoDate: new Date().toISOString().slice(0, 10),
    focus: state.cue,
    mins: m || 0,
    mistake: mistake || '—',
    win: win || '—',
    cue: cueVal ? cueVal.value : '—',
  });
  saveState();
  showToast('Logged. Streak +1 🔥');
  setTodayState('pre');
  renderRecent();
  refreshStreak();
};

/* ── Recent / stats ───────────────────────────────────── */
function renderRecent() {
  const list = $('#recent-list');
  list.innerHTML = '';
  const recent = state.history;
  if (!recent.length) {
    // empty-state example row (dimmed)
    const ex = document.createElement('div');
    ex.className = 'recent-row example';
    ex.innerHTML = `
      <span class="recent-date">May 10</span>
      <div class="recent-focus"><b>Two-step peek</b><span class="recent-meta">45 min · cue: partial · "micro-steps before peek"</span></div>
    `;
    list.appendChild(ex);
    return;
  }
  recent.slice(0, 4).forEach(r => {
    const row = document.createElement('div'); row.className = 'recent-row';
    row.innerHTML = `
      <span class="recent-date">${r.date}</span>
      <div class="recent-focus"><b>${r.focus}</b><span class="recent-meta">${r.mins} min · "${r.mistake}"</span></div>
      <span class="recent-meta">cue: ${r.cue || '—'}</span>
    `;
    list.appendChild(row);
  });
}

function computeStreak() {
  if (!state.history.length) return 0;
  const isoDates = state.history.map(h => h.isoDate).filter(Boolean);
  // Fallback for old entries without isoDate: use session count
  if (!isoDates.length) return state.history.length;
  const unique = [...new Set(isoDates)].sort().reverse();
  let n = 1;
  for (let i = 0; i < unique.length - 1; i++) {
    const diff = (new Date(unique[i]) - new Date(unique[i + 1])) / 86400000;
    if (diff === 1) n++;
    else break;
  }
  return n;
}

function refreshStreak() {
  const streak = computeStreak();
  const chip = $('#streak-chip');
  const text = $('#streak-text');
  if (streak === 0) { chip.classList.remove('lit'); text.textContent = 'Day 1 — start →'; }
  else { chip.classList.add('lit'); text.textContent = `${streak}🔥 day streak`; }

  // Stats strip — real values only
  const sessions = state.history.length;
  const concepts = state.pathDone.size;
  // Skill mastery: 1 per 3 sessions, capped at SKILLS.length
  const skills = Math.min(Math.floor(sessions / 3), SKILLS.length);
  const sStreak = streak === 0 ? '—' : `${streak}🔥`;
  $('#s-sessions').textContent = sessions;
  $('#s-skills').textContent = skills;
  $('#s-concepts').textContent = concepts;
  $('#s-streak').textContent = sStreak;
}

/* ── Path (Get Started) ───────────────────────────────────── */
function renderPath() {
  const list = $('#path-list'); list.innerHTML = '';
  PATH.forEach(p => {
    const done = state.pathDone.has(p.id);
    const row = document.createElement('div');
    row.className = `path-item ${done ? 'done' : ''}`;
    row.innerHTML = `
      <button class="check" aria-label="Mark watched">${done ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</button>
      <div>
        <div class="path-name">${p.name}</div>
        <div class="path-tag">${p.tag}${p.required ? ' · Required' : ''}</div>
      </div>
      <button class="path-watch">Watch →</button>
    `;
    row.querySelector('.check').onclick = () => {
      if (done) state.pathDone.delete(p.id); else state.pathDone.add(p.id);
      saveState();
      renderPath(); refreshPathProgress();
      refreshStreak();
    };
    list.appendChild(row);
  });
  refreshPathProgress();
}

function refreshPathProgress() {
  const total = PATH.length;
  const done = state.pathDone.size;
  const pct = Math.round((done / total) * 100);
  // Path view progress bar
  $('#path-bar').style.width = pct + '%';
  $('#path-pct').textContent = `${done} of ${total} · ${pct}%`;
  $('#nav-badge-path').textContent = `${done}/${total}`;
  // Today view continue strip
  const meta = $('#continue-meta');
  const fill = $('#continue-bar-fill');
  if (meta) meta.textContent = `${done} of ${total} concepts watched`;
  if (fill) fill.style.width = pct + '%';
}

/* ── Library (drills/concepts/skills) ───────────────────────────────────── */
function renderLibrary(tab) {
  $$('.lib-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  $$('.lib-panel').forEach(p => p.classList.add('hidden'));
  const panel = $(`#lib-${tab}`);
  panel.classList.remove('hidden');
  panel.innerHTML = '';
  const filter = $('#lib-search').value.toLowerCase();
  const items = tab === 'drills' ? DRILLS : tab === 'concepts' ? CONCEPTS : SKILLS;
  items
    .filter(i => !filter || (i.name + ' ' + (i.short || i.preview || '')).toLowerCase().includes(filter))
    .forEach(i => {
      const card = document.createElement('div');
      card.className = 'drill-card';
      card.innerHTML = `
        <div class="name">${i.name}</div>
        <div class="short">${i.short || i.preview || `Tier ${i.tier} · ${i.drillId}`}</div>
        ${i.tags ? `<div class="tags">${i.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
      `;
      panel.appendChild(card);
    });
}

$$('.lib-tab').forEach(t => t.onclick = () => renderLibrary(t.dataset.tab));
$('#lib-search').oninput = () => {
  const active = $('.lib-tab.active').dataset.tab;
  renderLibrary(active);
};

/* ── History ───────────────────────────────────── */
function renderHistory(filter) {
  $$('.hist-filters .chip').forEach(c => c.classList.toggle('active', c.dataset.hist === filter));
  const list = $('#hist-list'); list.innerHTML = '';
  const sessions = state.history;
  const deaths = state.deaths;
  const items = [];
  if (filter !== 'death') sessions.forEach(s => items.push({ kind: 'session', date: s.date, label: `${s.focus} — ${s.mins} min · "${s.mistake}"` }));
  if (filter !== 'session') deaths.forEach(d => items.push({ kind: 'death', date: d.date, label: `${d.cause}${d.round ? ' · ' + d.round : ''}` }));

  if (!items.length) {
    list.innerHTML = '<div style="padding:24px;color:var(--text-muted);text-align:center;font-family:var(--font-mono);font-size:12px">No history yet — log a session or review a round.</div>';
    return;
  }
  items.forEach(it => {
    const row = document.createElement('div'); row.className = 'hist-row';
    row.innerHTML = `
      <span class="date">${it.date}</span>
      <span class="kind ${it.kind}">${it.kind}</span>
      <span class="label">${it.label}</span>
    `;
    list.appendChild(row);
  });
}
$$('.hist-filters .chip').forEach(c => c.onclick = () => renderHistory(c.dataset.hist));

/* ── Round Review (Logger) ───────────────────────────────────── */
function renderLogger() {
  const grid = $('#cause-grid');
  grid.innerHTML = '';
  CAUSES.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'cause-btn';
    btn.dataset.cause = c.id;
    btn.innerHTML = `
      <span class="key">${i + 1}</span>
      <span class="label">${c.label}</span>
      <span class="sub">${c.sub}</span>
    `;
    btn.onclick = () => logDeath(c);
    grid.appendChild(btn);
  });
  renderLoggerSummary();
}
function logDeath(c) {
  const t = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  const entry = { time: t, cause: c.label, id: c.id, date: fmtDate() };
  state.deaths.unshift(entry);
  saveState();
  showToast(`Logged "${c.label}"`, {
    label: 'Undo',
    fn: () => {
      state.deaths = state.deaths.filter(x => x !== entry);
      saveState();
      renderLoggerSummary();
    }
  });
  renderLoggerSummary();
}
function renderLoggerSummary() {
  const list = $('#logger-summary-list');
  if (!state.deaths.length) {
    list.innerHTML = '<p style="color:var(--text-muted);font-size:13px">No deaths logged this session.</p>';
    return;
  }
  list.innerHTML = '';
  state.deaths.slice(0, 8).forEach((d, i) => {
    const row = document.createElement('div'); row.className = 'death-row';
    row.innerHTML = `
      <span class="time">${d.time}</span>
      <span class="label">${d.cause}</span>
      <button class="undo">Remove</button>
    `;
    row.querySelector('.undo').onclick = () => {
      state.deaths.splice(state.deaths.indexOf(d), 1);
      saveState();
      renderLoggerSummary();
    };
    list.appendChild(row);
  });
}
$$('[data-lmode]').forEach(b => b.onclick = () => {
  $$('[data-lmode]').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  document.body.classList.toggle('compact', b.dataset.lmode === 'compact');
});

/* ── Keyboard: 1–9 in logger, ⌥R anywhere ───────── */
document.addEventListener('keydown', e => {
  // ⌥R / Alt+R → open logger
  if (e.altKey && e.key.toLowerCase() === 'r') {
    e.preventDefault();
    setView('logger');
    return;
  }
  if (state.view !== 'logger') return;
  if (e.target.matches('input, textarea')) return;
  const n = parseInt(e.key);
  if (n >= 1 && n <= 9 && CAUSES[n - 1]) {
    e.preventDefault();
    logDeath(CAUSES[n - 1]);
  }
});

/* ── Tweaks panel ───────────────────────────────────── */
const tweaks = $('#tweaks');
$('#open-tweaks').onclick = () => tweaks.hidden = false;
$('#close-tweaks').onclick = () => tweaks.hidden = true;

$$('[data-tweak]').forEach(group => {
  group.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn || !btn.dataset.val) return;
    const tweak = group.dataset.tweak;
    const val = btn.dataset.val;
    if (tweak === 'theme') setTheme(val);
    if (tweak === 'accent') setAccent(val);
  });
});

// Drag the tweaks panel
(() => {
  const head = $('.tweaks-head'); let sx, sy, ox, oy, dragging = false;
  head.addEventListener('mousedown', e => {
    dragging = true; sx = e.clientX; sy = e.clientY;
    const r = tweaks.getBoundingClientRect(); ox = r.left; oy = r.top;
    tweaks.style.right = 'auto'; tweaks.style.bottom = 'auto';
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    tweaks.style.left = (ox + e.clientX - sx) + 'px';
    tweaks.style.top = (oy + e.clientY - sy) + 'px';
  });
  window.addEventListener('mouseup', () => dragging = false);
})();

/* ── Data fetch (real JSON when served over HTTP) ── */
async function loadData() {
  try {
    const [drills, conceptsRaw, skills, causes] = await Promise.all([
      fetch('data/drills.json').then(r => r.ok ? r.json() : null),
      fetch('data/concepts.json').then(r => r.ok ? r.json() : null),
      fetch('data/skills.json').then(r => r.ok ? r.json() : null),
      fetch('data/death-causes.json').then(r => r.ok ? r.json() : null),
    ]);
    if (drills) {
      DRILLS.length = 0;
      drills.forEach(d => DRILLS.push({
        id: d.id, cat: d.category, name: d.name, short: d.short || '',
        tags: d.tags || [], cue: d.cue || ''
      }));
    }
    if (conceptsRaw) {
      CONCEPTS.length = 0;
      Object.entries(conceptsRaw).forEach(([k, b]) => {
        const blockNum = parseInt(k.replace('block', '')) || 4;
        (b.items || []).forEach(it => CONCEPTS.push({
          id: it.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40),
          block: blockNum, name: it.name, preview: it.preview || ''
        }));
      });
    }
    if (skills) {
      SKILLS.length = 0;
      skills.forEach(s => SKILLS.push({
        id: s.id, name: s.name, tier: s.tier, drillId: s.drillId
      }));
    }
    if (causes) {
      CAUSES.length = 0;
      causes.slice(0, 9).forEach(c => CAUSES.push({
        id: c.id, label: c.label, sub: c.sublabel || ''
      }));
    }
  } catch (e) {
    console.info('Using inline data fallback (open over HTTP for full dataset).');
  }
}

/* ── Init ───────────────────────────────────── */
async function init() {
  $('#today-date').textContent = fmtDate();
  loadState();
  setTheme(state.theme);
  setAccent(state.accent);
  await loadData();
  setTodayState('pre');
  refreshStreak();
  renderRecent();
  refreshPathProgress();
  // If logger/library/path was the deep-linked view, rerender
  if (state.view === 'logger') renderLogger();
  if (state.view === 'library') renderLibrary('drills');
  if (state.view === 'path') renderPath();
}
init();
