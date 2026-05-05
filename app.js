/* ═══════════════════════════════════════════════
   PROTOCOL — Valorant Training System v6.0
   Architecture: JSON data + in-memory state (+ skill localStorage persistence)
═══════════════════════════════════════════════ */

/* ═══ STATE (data loaded at runtime, user state persisted to localStorage) ═══ */
const appState = {
  // Loaded data
  DRILLS: [],
  CONCEPTS_BY_BLOCK: {},
  SKILL_TREE: [],
  DRILL_POOLS: { peek: [], aim: [], movement: [], mental: [] },
  SESSION_PLANS: {},
  DEATH_CAUSES: [],

  // User state (persisted to localStorage under STATE_STORAGE_KEY)
  skillState: {},           // skill id -> 'yes'|'no'|'unsure'|null
  masteredDrills: new Set(),  // drill ids user has marked as mastered
  learnedConcepts: new Set(), // concept ids user has marked as learned
  sessionLogs: [],           // array of logged sessions
  sessionDeaths: [],         // deaths logged THIS session
  allDeaths: [],             // all deaths across sessions
  streak: 0,
  lastSessionDate: null,
  completedToday: false,
  onboardingDismissed: false,
  drillRotationIndex: 0,
};

const STATE_STORAGE_KEY = 'valo-training.state.v1';
const VALID_SKILL_STATES = new Set(['yes', 'no', 'unsure', null]);

// ── Persistence helpers ──────────────────────────────────────────────────────
function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STATE_STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== 'object') return;

    // skillState — validate each value
    if (saved.skillState && typeof saved.skillState === 'object') {
      appState.SKILL_TREE.forEach(skill => {
        const v = Object.hasOwn(saved.skillState, skill.id) ? saved.skillState[skill.id] : null;
        appState.skillState[skill.id] = VALID_SKILL_STATES.has(v) ? v : null;
      });
    }
    // Sets stored as arrays
    if (Array.isArray(saved.masteredDrills)) appState.masteredDrills = new Set(saved.masteredDrills);
    if (Array.isArray(saved.learnedConcepts)) appState.learnedConcepts = new Set(saved.learnedConcepts);
    // Arrays
    if (Array.isArray(saved.sessionLogs)) appState.sessionLogs = saved.sessionLogs;
    if (Array.isArray(saved.allDeaths)) appState.allDeaths = saved.allDeaths;
    // Primitives
    if (typeof saved.streak === 'number') appState.streak = saved.streak;
    if (saved.lastSessionDate) appState.lastSessionDate = saved.lastSessionDate;
    if (typeof saved.completedToday === 'boolean') appState.completedToday = saved.completedToday;
    if (typeof saved.onboardingDismissed === 'boolean') appState.onboardingDismissed = saved.onboardingDismissed;
    if (typeof saved.drillRotationIndex === 'number') appState.drillRotationIndex = saved.drillRotationIndex;
  } catch (err) {
    console.warn('Failed to load persisted state:', err);
  }
}

function persistState() {
  try {
    const payload = {
      skillState: appState.skillState,
      masteredDrills: [...appState.masteredDrills],
      learnedConcepts: [...appState.learnedConcepts],
      sessionLogs: appState.sessionLogs,
      allDeaths: appState.allDeaths,
      streak: appState.streak,
      lastSessionDate: appState.lastSessionDate,
      completedToday: appState.completedToday,
      onboardingDismissed: appState.onboardingDismissed,
      drillRotationIndex: appState.drillRotationIndex,
    };
    localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('Failed to persist state:', err);
  }
}

// Keep old name as alias so existing callsites don't break
function persistSkillState() { persistState(); }

/* ═══ NAVIGATION ═══ */
let currentView = 'home';

function initNavigation() {
  // Sidebar nav items + mobile
  document.addEventListener('click', e => {
    const navItem = e.target.closest('[data-view]');
    if (!navItem) return;
    const view = navItem.dataset.view;
    if (view) switchView(view);
  });

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('visible');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
    });
  }
}

function switchView(view) {
  currentView = view;
  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === view);
  });
  // Show/hide views
  document.querySelectorAll('.view').forEach(v => { v.style.display = 'none'; v.classList.remove('active'); });
  const viewEl = document.getElementById('view-' + view);
  if (viewEl) {
    viewEl.style.display = 'block';
    viewEl.classList.add('active');
  }
  // Close mobile menu
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.remove('visible');
  // Re-render view-specific content
  if (view === 'home') renderHome();
  if (view === 'getstarted') renderGetStarted();
  if (view === 'drills') renderDrills(currentDrillFilter);
  if (view === 'concepts') renderConcepts();
  if (view === 'skills') renderSkillsTab();
  if (view === 'tracker') renderLogs();
  if (view === 'logger') renderCauseButtons();
  // Scroll top
  document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ═══ DARK MODE ═══ */
function initTheme() {
  const root = document.documentElement;
  let theme = root.getAttribute('data-theme') ||
    (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', theme);

  const setIcon = (t) => {
    const svg = t === 'dark'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> <span>Light mode</span>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> <span>Dark mode</span>';
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => { btn.innerHTML = svg; });
  };
  setIcon(theme);

  document.addEventListener('click', e => {
    if (e.target.closest('[data-theme-toggle]')) {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      setIcon(theme);
    }
  });
}

/* ═══ DATA LOADING ═══ */
async function loadAllData() {
  try {
    const [drills, concepts, skills, pools, plans, deaths] = await Promise.all([
      fetch('data/drills.json').then(r => r.json()),
      fetch('data/concepts.json').then(r => r.json()),
      fetch('data/skills.json').then(r => r.json()),
      fetch('data/drill-pools.json').then(r => r.json()),
      fetch('data/session-plans.json').then(r => r.json()),
      fetch('data/death-causes.json').then(r => r.json()),
    ]);
    appState.DRILLS = drills;
    appState.CONCEPTS_BY_BLOCK = concepts;
    appState.SKILL_TREE = skills;
    appState.DRILL_POOLS = pools;
    appState.SESSION_PLANS = plans;
    appState.DEATH_CAUSES = deaths;
    // Init skill state
    skills.forEach(s => { appState.skillState[s.id] = null; });
    loadPersistedState();
    return true;
  } catch (err) {
    console.error('Data load failed:', err);
    return false;
  }
}

/* ═══ TOAST ═══ */
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' toast-' + type : '');
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => { t.className = 'toast'; }, 3000);
}

/* ═══ STREAK ═══ */
function updateStreak(markedToday = false) {
  if (markedToday) {
    const today = new Date().toDateString();
    if (appState.lastSessionDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (appState.lastSessionDate === yesterday) {
        appState.streak++;
      } else if (!appState.lastSessionDate) {
        appState.streak = 1;
      } else {
        appState.streak = 1; // reset streak
      }
      appState.lastSessionDate = today;
    }
  }
  const countEl = document.getElementById('streak-count');
  if (countEl) {
    countEl.textContent = appState.streak;
    countEl.className = 'streak-count' + (appState.streak >= 2 ? ' streak-active' : '');
  }
}

function updateSidebarProgress() {
  const total = appState.SKILL_TREE.length;
  const mastered = appState.SKILL_TREE.filter(s => appState.skillState[s.id] === 'yes').length;
  const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

  const bar = document.getElementById('sidebar-progress-bar');
  const pctEl = document.getElementById('sidebar-mastery-pct');
  if (bar) bar.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
}

/* ═══ HOME DASHBOARD ═══ */
function renderHome() {
  // Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Morning grind.' : hour < 17 ? 'Ready to train?' : 'Evening session?';
  const titleEl = document.getElementById('home-title');
  if (titleEl) titleEl.textContent = greeting;

  const subEl = document.getElementById('home-sub');
  if (subEl) {
    const sessions = appState.sessionLogs.length;
    const today = new Date().toDateString();
    const todaySession = appState.sessionLogs.find(s => new Date(s.date).toDateString() === today);
    if (todaySession) {
      subEl.textContent = `Session logged today. Keep the streak going.`;
    } else if (sessions > 0) {
      subEl.textContent = `${sessions} session${sessions > 1 ? 's' : ''} logged. No session yet today.`;
    } else {
      subEl.textContent = `No sessions logged yet. Start with Skill Assessment.`;
    }
  }

  // Stats
  const masteredCount = appState.SKILL_TREE.filter(s => appState.skillState[s.id] === 'yes').length;
  document.getElementById('stat-sessions').textContent = appState.sessionLogs.length;
  document.getElementById('stat-skills').textContent = masteredCount;
  document.getElementById('stat-concepts').textContent = appState.learnedConcepts.size;
  document.getElementById('stat-deaths').textContent = appState.allDeaths.length;

  // Current focus (from skill gaps)
  const focusEl = document.getElementById('home-focus-content');
  if (focusEl) {
    const anyAssessed = appState.SKILL_TREE.some(s => appState.skillState[s.id] !== null);
    if (!anyAssessed) {
      focusEl.innerHTML = `<div class="focus-empty"><p>Rate your skills to get a personalized focus list.</p><button class="btn-secondary" data-view="skills">Go to Skills →</button></div>`;
    } else {
      const plan = getTrainingPlan();
      if (plan.trainNow.length === 0) {
        focusEl.innerHTML = `<div class="focus-empty"><p>All assessed skills mastered. Reassess or add new skills.</p></div>`;
      } else {
        focusEl.innerHTML = plan.trainNow.map(s => `
          <div class="focus-skill-item">
            <span class="focus-skill-tier">T${s.tier}</span>
            <span class="focus-skill-name">${s.name}</span>
            <span class="focus-skill-roi">ROI: ${s.roiWeight}/5</span>
          </div>
        `).join('');
      }
    }
  }

  // Recent sessions
  const recentEl = document.getElementById('home-recent-sessions');
  if (recentEl) {
    if (appState.sessionLogs.length === 0) {
      recentEl.innerHTML = `<div class="focus-empty"><p>No sessions logged yet.</p><button class="btn-secondary" data-view="tracker">Log a session →</button></div>`;
    } else {
      const recent = [...appState.sessionLogs].reverse().slice(0, 4);
      recentEl.innerHTML = recent.map(s => `
        <div class="recent-session-item">
          <span class="recent-session-date">${formatDate(s.date)}</span>
          <div>
            <div class="recent-session-focus">${s.focus || 'No focus selected'}</div>
            ${s.success ? `<div class="recent-session-note">✓ ${s.success}</div>` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // Onboarding checklist
  const ob = document.getElementById('onboarding-card');
  if (ob) {
    if (appState.onboardingDismissed) {
      ob.style.display = 'none';
    } else {
      ob.style.display = 'block';
      updateOnboardingChecks();
    }
  }

  const dismissBtn = document.getElementById('onboarding-dismiss');
  if (dismissBtn) {
    dismissBtn.onclick = () => {
      appState.onboardingDismissed = true;
      persistState();
      document.getElementById('onboarding-card').style.display = 'none';
    };
  }

  updateSidebarProgress();
  updateStreak();
}

function updateOnboardingChecks() {
  const anyAssessed = appState.SKILL_TREE.some(s => appState.skillState[s.id] !== null);
  const sessionsLogged = appState.sessionLogs.length > 0;
  const conceptsRead = appState.learnedConcepts.size > 0;

  setObStep(1, anyAssessed);
  setObStep(2, appState.completedToday);
  setObStep(3, sessionsLogged);
  setObStep(4, conceptsRead);
}

function setObStep(n, done) {
  const step = document.getElementById('ob-step-' + n);
  const check = document.getElementById('ob-check-' + n);
  if (!step || !check) return;
  if (done) {
    step.classList.add('done');
    check.classList.add('checked');
  } else {
    step.classList.remove('done');
    check.classList.remove('checked');
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/* ═══ SKILL TRAINING PLAN ═══ */
function getTrainingPlan() {
  const mastered = new Set(
    appState.SKILL_TREE.filter(s => appState.skillState[s.id] === 'yes').map(s => s.id)
  );
  const available = appState.SKILL_TREE.filter(s => {
    if (appState.skillState[s.id] === 'yes') return false;
    return s.prereqs.every(p => mastered.has(p));
  });
  available.sort((a, b) => {
    if (a.tier !== b.tier) return a.tier - b.tier;
    return b.roiWeight - a.roiWeight;
  });
  return {
    trainNow: available.slice(0, 3),
    queued: available.slice(3),
    done: appState.SKILL_TREE.filter(s => appState.skillState[s.id] === 'yes'),
    total: appState.SKILL_TREE.length
  };
}

/* ═══ DRILL RECOMMENDATION ═══ */
function getRecommendedDrills(mode) {
  const anyAssessed = appState.SKILL_TREE.some(s => appState.skillState[s.id] !== null);
  if (anyAssessed) return getDrillsFromSkillGaps(mode);
  return getDrillsByRotation(mode);
}

function getDrillsByRotation(mode) {
  const { DRILL_POOLS } = appState;
  let primary, secondary;
  const idx = appState.drillRotationIndex;
  if (mode === 'ranked') {
    primary = DRILL_POOLS.peek[idx % DRILL_POOLS.peek.length];
    secondary = DRILL_POOLS.mental[idx % DRILL_POOLS.mental.length];
  } else {
    const aimPool = DRILL_POOLS.aim;
    const movPool = DRILL_POOLS.movement;
    primary = (idx % 2 === 0 ? aimPool : movPool)[idx % (idx % 2 === 0 ? aimPool : movPool).length];
    secondary = (idx % 2 === 0 ? movPool : aimPool)[idx % (idx % 2 === 0 ? movPool : aimPool).length];
  }
  appState.drillRotationIndex++;
  persistState();
  return { primary, secondary, source: 'rotation' };
}

function getDrillsFromSkillGaps(mode) {
  const { DRILL_POOLS } = appState;
  const plan = getTrainingPlan();
  const allPoolDrills = [
    ...DRILL_POOLS.peek, ...DRILL_POOLS.aim,
    ...DRILL_POOLS.movement, ...DRILL_POOLS.mental
  ];
  const findPoolDrill = id => allPoolDrills.find(d => d.id === id) || null;

  const modeOrder = mode === 'ranked'
    ? ['peek', 'mental', 'aim', 'movement']
    : ['aim', 'movement', 'peek', 'mental'];

  const sorted = [...plan.trainNow].sort((a, b) => {
    if (a.tier === 1 && b.tier !== 1) return -1;
    if (b.tier === 1 && a.tier !== 1) return 1;
    return modeOrder.indexOf(a.category) - modeOrder.indexOf(b.category);
  });

  let primarySkill = null, secondarySkill = null;
  for (const s of sorted) {
    const drill = findPoolDrill(s.drillId);
    if (!primarySkill && drill) primarySkill = { drill, skill: s };
    else if (!secondarySkill && drill) { secondarySkill = { drill, skill: s }; break; }
  }

  if (!primarySkill) return getDrillsByRotation(mode);

  return {
    primary: primarySkill.drill,
    secondary: secondarySkill ? secondarySkill.drill : null,
    primarySkillName: primarySkill.skill.name,
    secondarySkillName: secondarySkill ? secondarySkill.skill.name : null,
    source: 'skill-gap'
  };
}

/* ═══ SESSION BUILDER ═══ */
let selectedTime = null, selectedMode = null, selectedDM = 'ghost';

function initSessionBuilder() {
  document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTime = btn.dataset.time;
      const isPost = selectedTime === 'post';
      const is15 = selectedTime === '15';

      // 15 min: show mode picker (same as 30/45/60), but hide DM block
      if (is15) {
        selectedMode = null;
        document.getElementById('mode-block').style.display = 'block';
        document.getElementById('dm-block').style.display = 'none';
        document.getElementById('generate-block').style.display = 'none';
      } else if (isPost) {
        // Off-PC: need to know ranked/training day, no DM
        selectedMode = null;
        document.getElementById('mode-block').style.display = 'block';
        document.getElementById('dm-block').style.display = 'none';
        document.getElementById('generate-block').style.display = 'none';
      } else {
        // 30/45/60: show mode + DM, then generate
        selectedMode = null;
        document.getElementById('mode-block').style.display = 'block';
        document.getElementById('dm-block').style.display = 'block';
        document.getElementById('generate-block').style.display = 'none';
      }
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
      hidePlan();
    });
  });

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedMode = btn.dataset.mode;
      document.getElementById('generate-block').style.display = 'block';
    });
  });

  document.querySelectorAll('.dm-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dm-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDM = btn.dataset.dm;
    });
  });

  document.getElementById('generate-btn')?.addEventListener('click', generatePlan);

  document.getElementById('plan-reset')?.addEventListener('click', () => {
    hidePlan();
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('mode-block').style.display = 'none';
    document.getElementById('dm-block').style.display = 'none';
    document.getElementById('generate-block').style.display = 'none';
    selectedTime = null; selectedMode = null;
  });

  document.getElementById('complete-session-btn')?.addEventListener('click', () => {
    appState.completedToday = true;
    updateStreak(true);
    persistState();
    document.getElementById('session-complete-block').style.display = 'none';
    document.getElementById('session-done-banner').style.display = 'flex';
    updateNavBadges();
    renderHome();
    showToast('Session complete! Great work.', 'success');
  });
}

function hidePlan() {
  document.getElementById('session-plan').style.display = 'none';
}

function generatePlan() {
  const isPost = selectedTime === 'post';
  let key = isPost
    ? (selectedMode === 'training' ? 'post-training' : 'post-ranked')
    : `${selectedTime}-${selectedMode || 'ranked'}`;

  const plan = appState.SESSION_PLANS[key] || appState.SESSION_PLANS['30-ranked'];
  const mode = selectedMode || 'ranked';

  // Cautions
  const cautionList = document.getElementById('caution-list');
  const cautionBlock = document.getElementById('caution-block');
  cautionList.innerHTML = '';
  if (plan.cautions && plan.cautions.length > 0) {
    cautionBlock.style.display = 'flex';
    plan.cautions.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c;
      cautionList.appendChild(li);
    });
  } else {
    cautionBlock.style.display = 'none';
  }

  // Drill recommendations
  const drillRecBlock = document.getElementById('drill-rec-block');
  const primaryCard = document.getElementById('drill-rec-primary');
  const secondaryCard = document.getElementById('drill-rec-secondary');
  const nudgeEl = document.getElementById('drill-rec-nudge');

  if (!isPost) {
    const rec = getRecommendedDrills(mode);
    const { primary, secondary, source, primarySkillName, secondarySkillName } = rec;
    const anyAssessed = appState.SKILL_TREE.some(s => appState.skillState[s.id] !== null);

    // Fix 7: Surface habit reminder for top-priority skill(s) with null drillId
    if (anyAssessed) {
      const trainingPlan = getTrainingPlan();
      const allPoolIds = [
        ...appState.DRILL_POOLS.peek, ...appState.DRILL_POOLS.aim,
        ...appState.DRILL_POOLS.movement, ...appState.DRILL_POOLS.mental
      ].map(d => d.id);
      const habitSkills = trainingPlan.trainNow.filter(s => !s.drillId || !allPoolIds.includes(s.drillId));
      if (habitSkills.length > 0 && nudgeEl) {
        const habitLines = habitSkills.map(s =>
          `<li><strong>${s.name}</strong>${s.note ? ` — ${s.note}` : ''}</li>`
        ).join('');
        nudgeEl.style.display = 'block';
        nudgeEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <strong>Habit reminder</strong> — your top gap(s) below have no dedicated drill. Apply them in every ranked game this session:<ul style="margin:var(--space-2) 0 0 var(--space-4);">${habitLines}</ul>`;
      } else if (nudgeEl) {
        nudgeEl.style.display = 'none';
      }
    } else if (nudgeEl) {
      nudgeEl.style.display = 'block';
      nudgeEl.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> Drill from default rotation. <button class="panel-link" data-view="skills">Assess skills →</button> for personalized recommendations.`;
    }

    const buildCard = (drill, label, skillName) => {
      if (!drill) return '';
      const badge = skillName ? `<div class="drill-rec-skill-badge">Training gap: ${skillName}</div>` : '';
      return `${badge}
        <div class="drill-rec-label" style="font-family:var(--font-mono);font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--text-faint);margin-bottom:var(--space-3)">${label}</div>
        <h3>${drill.name}</h3>
        <p class="drill-rec-where"><strong>Where:</strong> ${drill.where}</p>
        <p class="drill-rec-cue"><strong>Cue:</strong> ${drill.cue}</p>
        <p class="drill-rec-why"><strong>Why:</strong> ${drill.why}</p>
        <button class="drill-rec-open-btn btn-secondary" style="margin-top:var(--space-3)" data-drill-id="${drill.id}">Open full drill →</button>`;
    };

    primaryCard.innerHTML = buildCard(primary, 'PRIMARY DRILL', source === 'skill-gap' ? primarySkillName : null);
    drillRecBlock.style.display = 'block';

    const needsSecondary = ['45', '60'].includes(selectedTime);
    if (needsSecondary && secondary) {
      secondaryCard.innerHTML = buildCard(secondary, 'SECONDARY DRILL', source === 'skill-gap' ? secondarySkillName : null);
      secondaryCard.style.display = 'block';
    } else {
      secondaryCard.style.display = 'none';
    }

    drillRecBlock.querySelectorAll('.drill-rec-open-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const drill = appState.DRILLS.find(d => d.id === btn.dataset.drillId);
        if (drill) openDrillModal(drill);
      });
    });

    document.getElementById('cue-text').textContent = primary ? primary.cue : '';
  } else {
    drillRecBlock.style.display = 'none';
    if (nudgeEl) nudgeEl.style.display = 'none';
    document.getElementById('cue-text').textContent =
      mode === 'training' ? '"The skill is being downloaded right now. Sleep is the transfer."' : '"Tonight\'s goal: consolidation. Rest is training."';
  }

  // DM weapon note
  const dmFocus = {
    ghost: 'Ghost: trains crosshair placement and patience. Low recoil means errors show clearly — any miss is a movement or placement mistake, not recoil.',
    guardian: 'Guardian: trains stop timing and first-shot discipline. One bullet at a time punishes any movement — pure deadzone timing training.',
    sheriff: 'Sheriff: trains composure under pressure. High stakes per shot. Use for counter-strafe precision and pressure rehearsal.',
    vandal: 'Vandal: trains rhythm transfer. Use only when transferring a mastered cue to your main weapon.'
  };
  const dmNoteEl = document.getElementById('dm-focus-note');
  if (dmNoteEl) {
    dmNoteEl.textContent = dmFocus[selectedDM] || '';
    dmNoteEl.style.display = !isPost && selectedDM ? 'block' : 'none';
  }

  // Plan steps
  const stepsEl = document.getElementById('plan-steps');
  stepsEl.innerHTML = '';
  (plan.steps || []).forEach((step, i) => {
    const div = document.createElement('div');
    div.className = 'plan-step';
    div.innerHTML = `
      <div class="step-num-badge">${i + 1}</div>
      <div class="step-content">
        <p class="step-title">${step.title}</p>
        <p class="step-detail">${step.detail}</p>
        <p class="step-time">${step.time}</p>
      </div>`;
    stepsEl.appendChild(div);
  });

  // Session complete block
  document.getElementById('session-complete-block').style.display = 'block';
  document.getElementById('session-done-banner').style.display = 'none';

  const planEl = document.getElementById('session-plan');
  planEl.style.display = 'block';
  planEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ═══ RAMP TIMERS ═══ */
function initRamp() {
  document.querySelectorAll('.ramp-phase').forEach(phase => {
    phase.querySelector('.phase-header')?.addEventListener('click', e => {
      if (e.target.closest('.timer-btn') || e.target.closest('.timer-stop')) return;
      phase.classList.toggle('collapsed');
    });
  });

  const timers = {};
  document.querySelectorAll('.phase-timer-block').forEach((block, idx) => {
    const btn = block.querySelector('.timer-btn');
    const display = block.querySelector('.timer-display');
    const countdown = block.querySelector('.timer-countdown');
    const stopBtn = block.querySelector('.timer-stop');
    if (!btn) return;
    const duration = parseInt(btn.dataset.duration);

    btn.addEventListener('click', () => {
      if (timers[idx]) clearInterval(timers[idx]);
      let remaining = duration;
      btn.style.display = 'none';
      display.style.display = 'flex';
      countdown.textContent = formatTime(remaining);
      timers[idx] = setInterval(() => {
        remaining--;
        countdown.textContent = formatTime(remaining);
        if (remaining <= 0) {
          clearInterval(timers[idx]);
          countdown.textContent = 'Done!';
          countdown.style.color = 'var(--success)';
          setTimeout(() => { btn.style.display = ''; display.style.display = 'none'; countdown.style.color = ''; }, 3000);
        }
      }, 1000);
    });
    stopBtn?.addEventListener('click', () => { if (timers[idx]) clearInterval(timers[idx]); btn.style.display = ''; display.style.display = 'none'; });
  });
}

function formatTime(s) { return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`; }

/* ═══ DRILLS ═══ */
let currentDrillFilter = 'all';

function renderDrills(filter = 'all') {
  currentDrillFilter = filter;
  const grid = document.getElementById('drills-grid');
  if (!grid) return;
  const filtered = filter === 'all' ? appState.DRILLS : appState.DRILLS.filter(d => d.category === filter);
  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);font-size:var(--text-sm)">No drills in this category.</p>';
    return;
  }
  filtered.forEach(drill => {
    const card = document.createElement('div');
    const mastered = appState.masteredDrills.has(drill.id);
    card.className = 'drill-card' + (mastered ? ' mastered-card' : '');
    card.innerHTML = `
      <div class="drill-cat">${drill.category.toUpperCase()}</div>
      <div class="drill-card-name">${drill.name}</div>
      <div class="drill-card-short">${drill.short}</div>
      <div class="drill-card-tags">${(drill.tags || []).map(t => `<span class="drill-tag">${t}</span>`).join('')}</div>`;
    card.addEventListener('click', () => openDrillModal(drill));
    grid.appendChild(card);
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
    btn.onclick = () => renderDrills(btn.dataset.filter);
  });
  updateNavBadges();
}

function openDrillModal(drill) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!overlay || !content) return;

  const mastered = appState.masteredDrills.has(drill.id);
  content.innerHTML = `
    <div class="drill-cat">${(drill.category || '').toUpperCase()}</div>
    <h2>${drill.name}</h2>
    <p style="font-size:var(--text-sm);color:var(--text-muted);margin-top:var(--space-2)">${drill.short}</p>

    <div class="modal-section">
      <p class="modal-section-label">WHY THIS DRILL</p>
      <div class="why-block">${drill.why || ''}</div>
    </div>

    <div class="modal-section">
      <p class="modal-section-label">HOW TO DO IT</p>
      <p>${drill.explanation || ''}</p>
    </div>

    <div class="modal-section">
      <p class="modal-section-label">CUE</p>
      <div class="cue-highlight">${drill.cue || ''}</div>
    </div>

    <div class="modal-section">
      <p class="modal-section-label">COMMON ERRORS</p>
      <p>${drill.error || ''}</p>
    </div>

    <div class="modal-section">
      <p class="modal-section-label">PASS CONDITION</p>
      <div class="condition-box">${drill.condition || ''}</div>
    </div>

    <div class="modal-section">
      <p class="modal-section-label">WHERE TO PRACTICE</p>
      <p>${drill.location || ''}</p>
    </div>

    <div class="modal-section">
      <p class="modal-section-label">SOURCE</p>
      <p style="font-size:var(--text-xs);color:var(--text-muted)">${drill.source || ''}</p>
      ${drill.videoUrl ? `<a class="modal-video-link" href="${drill.videoUrl}" target="_blank" rel="noopener">▶ Watch Source Video</a>` : ''}
    </div>

    <div class="modal-mastery-toggle">
      <button class="mastery-toggle-btn ${mastered ? 'mastered' : ''}" id="mastery-toggle-btn">
        ${mastered ? '✓ Mastered' : 'Mark as Mastered'}
      </button>
      <span class="mastery-toggle-label">${mastered ? 'Removes from active training queue' : 'Mark when you can pass the condition consistently'}</span>
    </div>`;

  document.getElementById('mastery-toggle-btn')?.addEventListener('click', () => {
    if (appState.masteredDrills.has(drill.id)) {
      appState.masteredDrills.delete(drill.id);
      showToast(`${drill.name} removed from mastered`, '');
    } else {
      appState.masteredDrills.add(drill.id);
      showToast(`${drill.name} marked as mastered!`, 'success');
    }
    persistState();
    overlay.style.display = 'none';
    renderDrills(currentDrillFilter);
    updateNavBadges();
    updateSidebarProgress();
  });

  overlay.style.display = 'flex';

  document.getElementById('modal-close')?.addEventListener('click', () => { overlay.style.display = 'none'; });
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.style.display = 'none'; });
}

/* ═══ CONCEPTS ═══ */
function renderConcepts() {
  const blocks = { block1: 'block1', block2: 'block2', block3: 'block3', block4: 'block4' };
  Object.keys(blocks).forEach(key => {
    const el = document.getElementById('concepts-' + key);
    if (!el) return;
    const blockData = appState.CONCEPTS_BY_BLOCK[key];
    let items = [];
    if (Array.isArray(blockData?.items)) {
      items = blockData.items;
    } else if (Array.isArray(blockData)) {
      items = blockData;
    }
    // Skip re-render if already populated — preserves expanded state
    if (el.children.length > 0 && items.length > 0) return;
    el.innerHTML = '';
    items.forEach((concept, idx) => {
      const learned = appState.learnedConcepts.has(concept.id || (key + '-' + idx));
      const conceptId = concept.id || (key + '-' + idx);
      const item = document.createElement('div');
      item.className = 'concept-item' + (learned ? ' learned-concept' : '');
      item.dataset.conceptId = conceptId;
      item.innerHTML = `
        <div class="concept-header">
          <span class="concept-name">${concept.name}</span>
          ${concept.rankThreshold ? `<span class="rank-badge">${concept.rankThreshold}</span>` : ''}
          ${learned ? '<span class="learned-check-icon">✓</span>' : ''}
        </div>
        <p class="concept-why">${concept.why || ''}</p>
        <div class="concept-body">
          ${concept.preview ? `<p>${concept.preview}</p>` : ''}
          ${concept.source ? `<p class="concept-source-note">Source: ${concept.source}</p>` : ''}
          ${concept.videoUrl ? `<a class="concept-video-link" href="${concept.videoUrl}" target="_blank" rel="noopener">▶ Watch source video</a>` : ''}
          <button class="concept-learned-btn ${learned ? 'active' : ''}" data-concept-id="${conceptId}">
            ${learned ? '✓ Learned — remove' : 'Mark as learned'}
          </button>
        </div>`;

      item.querySelector('.concept-header').addEventListener('click', () => {
        item.classList.toggle('expanded');
      });

      item.querySelector('.concept-learned-btn').addEventListener('click', e => {
        e.stopPropagation();
        if (appState.learnedConcepts.has(conceptId)) {
          appState.learnedConcepts.delete(conceptId);
          item.classList.remove('learned-concept');
          e.target.classList.remove('active');
          e.target.textContent = 'Mark as learned';
          showToast('Removed from learned', '');
        } else {
          appState.learnedConcepts.add(conceptId);
          item.classList.add('learned-concept');
          e.target.classList.add('active');
          e.target.textContent = '✓ Learned — remove';
          showToast('Concept learned!', 'success');
        }
        persistState();
        document.getElementById('stat-concepts').textContent = appState.learnedConcepts.size;
        updateNavBadges();
      });
      el.appendChild(item);
    });
  });
  updateNavBadges();
}

/* ═══ TRACKER ═══ */
function initTracker() {
  const dateInput = document.getElementById('log-date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

  document.getElementById('save-log')?.addEventListener('click', () => {
    const date = document.getElementById('log-date')?.value;
    const minutes = document.getElementById('log-minutes')?.value;
    const focus = document.getElementById('log-focus')?.value;
    const mistake = document.getElementById('log-mistake')?.value;
    const success = document.getElementById('log-success')?.value;
    const cueSuccess = document.querySelector('input[name="cue-success"]:checked')?.value;
    const dmNote = document.getElementById('log-dm-note')?.value;
    const vodInsight = document.getElementById('log-vod-insight')?.value;

    if (!date || !focus) {
      showToast('Please select a date and focus', 'error');
      return;
    }

    const entry = { date, minutes, focus, mistake, success, cueSuccess, dmNote, vodInsight, loggedAt: Date.now() };
    appState.sessionLogs.push(entry);
    updateStreak(true);
    persistState();
    renderLogs();
    showToast('Session logged!', 'success');

    // Clear form
    document.getElementById('log-focus').value = '';
    document.getElementById('log-minutes').value = '';
    document.getElementById('log-mistake').value = '';
    document.getElementById('log-success').value = '';
    document.getElementById('log-dm-note').value = '';
    document.getElementById('log-vod-insight').value = '';
    document.querySelectorAll('input[name="cue-success"]').forEach(r => r.checked = false);

    updateNavBadges();
    renderHome();
  });
}

function renderLogs() {
  const list = document.getElementById('history-list');
  if (!list) return;
  if (appState.sessionLogs.length === 0) {
    list.innerHTML = '<div class="focus-empty"><p>No sessions logged yet. Start your first session above.</p></div>';
    return;
  }
  const entries = [...appState.sessionLogs].reverse();
  list.innerHTML = '';
  entries.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'history-entry';
    div.innerHTML = `
      <div class="history-entry-date">${entry.date}${entry.minutes ? ` · ${entry.minutes} min` : ''}</div>
      <div class="history-entry-focus">${entry.focus || 'No focus'}</div>
      <div class="history-entry-notes">
        ${entry.mistake ? `<span style="color:var(--accent)">✗ ${entry.mistake}</span>` : ''}
        ${entry.mistake && entry.success ? ' · ' : ''}
        ${entry.success ? `<span style="color:var(--success)">✓ ${entry.success}</span>` : ''}
        ${entry.vodInsight ? `<div style="margin-top:var(--space-2);color:var(--text-muted)">VOD: ${entry.vodInsight}</div>` : ''}
      </div>`;
    list.appendChild(div);
  });
}

/* ═══ DEATH LOGGER ═══ */
let selectedCause = null;

function initDeathLogger() {
  document.querySelectorAll('.logger-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.logger-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.loggerTab;
      document.getElementById('logger-round-panel').style.display = tab === 'round' ? 'block' : 'none';
      document.getElementById('logger-summary-panel').style.display = tab === 'summary' ? 'block' : 'none';
      if (tab === 'summary') renderSummary();
    });
  });

  document.getElementById('log-death-btn')?.addEventListener('click', logDeath);
  document.getElementById('skip-death-btn')?.addEventListener('click', skipDeath);
}

function renderCauseButtons() {
  const grid = document.getElementById('death-cause-grid');
  if (!grid) return;
  // Re-render if data is loaded but grid is empty (or was rendered with empty data)
  if (grid.children.length > 0 && appState.DEATH_CAUSES.length > 0) return; // already rendered with real data
  grid.innerHTML = '';
  if (appState.DEATH_CAUSES.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);font-size:var(--text-sm);grid-column:1/-1">Loading causes...</p>';
    return;
  }
  appState.DEATH_CAUSES.forEach(cause => {
    const btn = document.createElement('button');
    btn.className = 'death-cause-btn';
    btn.dataset.id = cause.id;
    btn.innerHTML = `<strong>${cause.label}</strong><br><span style="font-size:var(--text-xs);color:var(--text-muted);font-weight:400">${cause.sublabel}</span>`;
    btn.addEventListener('click', () => selectCause(cause));
    grid.appendChild(btn);
  });
}

function selectCause(cause) {
  selectedCause = cause;
  document.querySelectorAll('.death-cause-btn').forEach(b => b.classList.toggle('selected', b.dataset.id === cause.id));
  const diag = document.getElementById('death-diagnosis');
  const content = document.getElementById('diagnosis-content');
  diag.style.display = 'block';
  content.innerHTML = `
    <h3>${cause.label}</h3>
    <p class="diagnosis-explain">${cause.explain}</p>
    <div class="diagnosis-fix"><strong>Fix:</strong> ${cause.framework}</div>
    <p style="font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-3);font-style:italic">Cue: ${cause.cue}</p>`;
  diag.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function logDeath() {
  if (!selectedCause) return;
  appState.sessionDeaths.push({ causeId: selectedCause.id, label: selectedCause.label, time: Date.now() });
  appState.allDeaths.push({ causeId: selectedCause.id, label: selectedCause.label, time: Date.now() });
  document.getElementById('stat-deaths').textContent = appState.allDeaths.length;
  persistState();
  resetLoggerUI();
  showToast('Death logged', '');
  updateNavBadges();
}

function skipDeath() { resetLoggerUI(); }

function resetLoggerUI() {
  selectedCause = null;
  document.querySelectorAll('.death-cause-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('death-diagnosis').style.display = 'none';
}

function renderSummary() {
  const el = document.getElementById('summary-content');
  if (!el) return;
  if (appState.sessionDeaths.length === 0) {
    el.innerHTML = '<p class="summary-empty">No deaths logged yet this session.</p>';
    return;
  }
  const counts = {};
  appState.sessionDeaths.forEach(d => { counts[d.label] = (counts[d.label] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  el.innerHTML = `<div class="summary-grid">
    ${sorted.map(([label, count]) => `
      <div class="summary-item">
        <div class="summary-item-name">${label}</div>
        <div class="summary-item-count">${count}</div>
      </div>`).join('')}
  </div>
  <p style="margin-top:var(--space-4);font-size:var(--text-sm);color:var(--text-muted)">
    Most frequent: <strong>${sorted[0][0]}</strong> — focus your next drill session on this.
  </p>`;
}

/* ═══ SKILLS TAB ═══ */
const TIER_LABELS = { 1: 'Tier 1 — Foundation', 2: 'Tier 2 — Core', 3: 'Tier 3 — Intermediate', 4: 'Tier 4 — Advanced' };
const CATEGORY_LABELS = { aim: 'Aim', peek: 'Peeking', movement: 'Movement', mental: 'Mental' };

function renderSkillsTab() {
  const cardsBlock = document.getElementById('skill-cards-block');
  if (!cardsBlock) return;
  cardsBlock.innerHTML = '';

  const mastered = new Set(appState.SKILL_TREE.filter(s => appState.skillState[s.id] === 'yes').map(s => s.id));
  const tiers = [1, 2, 3, 4];

  tiers.forEach(tier => {
    const tierSkills = appState.SKILL_TREE.filter(s => s.tier === tier);
    if (tierSkills.length === 0) return;

    const section = document.createElement('div');
    section.className = 'skill-tier-section';
    section.innerHTML = `<p class="skill-tier-label">${TIER_LABELS[tier] || 'Tier ' + tier}</p>
      <div class="skill-cards-row" id="tier-${tier}-cards"></div>`;
    cardsBlock.appendChild(section);

    const row = section.querySelector('.skill-cards-row');
    tierSkills.forEach(skill => {
      const state = appState.skillState[skill.id];
      const prereqsMet = skill.prereqs.every(p => mastered.has(p));
      const card = document.createElement('div');
      card.className = 'skill-card' + (state === 'yes' ? ' skill-yes' : state === 'no' ? ' skill-no' : '');
      const prereqText = !prereqsMet && skill.prereqs.length > 0
        ? `<p class="skill-card-prereqs">Requires: ${skill.prereqs.map(p => { const ps = appState.SKILL_TREE.find(s => s.id === p); return ps ? ps.name : p; }).join(', ')}</p>` : '';

      card.innerHTML = `
        <div class="skill-card-header">
          <span class="skill-card-name">${skill.name}</span>
          <span class="skill-roi-badge">ROI ${skill.roiWeight}/5</span>
        </div>
        <p class="skill-card-question">${skill.assessQuestion}</p>
        ${prereqText}
        <div class="skill-assess-btns">
          <button class="skill-assess-btn yes-btn ${state === 'yes' ? 'active' : ''}" data-id="${skill.id}" data-val="yes">✓ Got it</button>
          <button class="skill-assess-btn unsure-btn ${state === 'unsure' ? 'active' : ''}" data-id="${skill.id}" data-val="unsure">~ Sometimes</button>
          <button class="skill-assess-btn no-btn ${state === 'no' ? 'active' : ''}" data-id="${skill.id}" data-val="no">✗ Not yet</button>
        </div>`;

      card.querySelectorAll('.skill-assess-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const prevState = appState.skillState[skill.id];
          const newVal = btn.dataset.val;
          appState.skillState[skill.id] = prevState === newVal ? null : newVal;
          persistSkillState();
          renderSkillsTab();
          renderSkillPlan();
          updateSkillProgress();
          updateSidebarProgress();
          updateNavBadges();
          if (currentView === 'home') renderHome();
        });
      });
      row.appendChild(card);
    });
  });

  renderSkillPlan();
  updateSkillProgress();
  updateSidebarProgress();
}

function updateSkillProgress() {
  const total = appState.SKILL_TREE.length;
  const assessed = appState.SKILL_TREE.filter(s => appState.skillState[s.id] !== null).length;
  const mastered = appState.SKILL_TREE.filter(s => appState.skillState[s.id] === 'yes').length;
  const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

  const block = document.getElementById('skill-progress-block');
  const label = document.getElementById('skill-progress-label');
  const pctEl = document.getElementById('skill-mastery-pct');
  const bar = document.getElementById('skill-progress-bar');

  if (block) block.style.display = assessed > 0 ? 'block' : 'none';
  if (label) label.textContent = `${assessed} / ${total} assessed`;
  if (pctEl) pctEl.textContent = `${pct}% mastered`;
  if (bar) bar.style.width = pct + '%';
}

function renderSkillPlan() {
  const block = document.getElementById('skill-plan-block');
  if (!block) return;
  const anyAssessed = appState.SKILL_TREE.some(s => appState.skillState[s.id] !== null);
  if (!anyAssessed) { block.style.display = 'none'; return; }
  block.style.display = 'block';

  const plan = getTrainingPlan();
  const renderList = (items, elId, className) => {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = items.map(s => `
      <div class="skill-plan-item ${className}">
        <span class="skill-plan-roi">T${s.tier}</span>
        <span class="skill-plan-name">${s.name}</span>
        <span class="skill-plan-category">${CATEGORY_LABELS[s.category] || s.category}</span>
        ${s.drillId ? `<button class="skill-plan-drill-btn" data-drill-id="${s.drillId}">Open drill →</button>` : ''}
      </div>`).join('');
    el.querySelectorAll('.skill-plan-drill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = appState.DRILLS.find(x => x.id === btn.dataset.drillId);
        if (d) openDrillModal(d);
      });
    });
  };

  renderList(plan.trainNow, 'skill-plan-now', '');
  const queuedHead = document.getElementById('skill-queued-heading');
  const queuedEl = document.getElementById('skill-plan-queued');
  if (queuedHead) queuedHead.style.display = plan.queued.length > 0 ? 'block' : 'none';
  if (queuedEl) { queuedEl.style.display = plan.queued.length > 0 ? 'block' : 'none'; renderList(plan.queued, 'skill-plan-queued', 'queued-item'); }
  const doneHead = document.getElementById('skill-done-heading');
  const doneEl = document.getElementById('skill-plan-done');
  if (doneHead) doneHead.style.display = plan.done.length > 0 ? 'block' : 'none';
  if (doneEl) { doneEl.style.display = plan.done.length > 0 ? 'block' : 'none'; renderList(plan.done, 'skill-plan-done', 'done-item'); }
}

/* ═══ NAV BADGES ═══ */
function updateNavBadges() {
  // Skills badge: number of unassessed skills
  const unassessed = appState.SKILL_TREE.filter(s => appState.skillState[s.id] === null).length;
  const skillsBadge = document.getElementById('nav-badge-skills');
  if (skillsBadge) {
    if (unassessed > 0 && appState.SKILL_TREE.some(s => appState.skillState[s.id] !== null)) {
      skillsBadge.textContent = unassessed;
      skillsBadge.classList.add('visible');
    } else {
      skillsBadge.classList.remove('visible');
    }
  }

  // Drills badge: mastered drills count
  const masteredCount = appState.masteredDrills.size;
  const drillsBadge = document.getElementById('nav-badge-drills');
  if (drillsBadge) {
    if (masteredCount > 0) {
      drillsBadge.textContent = masteredCount + '✓';
      drillsBadge.classList.add('visible');
    } else {
      drillsBadge.classList.remove('visible');
    }
  }

  // Concepts badge: learned count
  const learnedCount = appState.learnedConcepts.size;
  const conceptsBadge = document.getElementById('nav-badge-concepts');
  if (conceptsBadge) {
    if (learnedCount > 0) {
      conceptsBadge.textContent = learnedCount + '✓';
      conceptsBadge.classList.add('visible');
    } else {
      conceptsBadge.classList.remove('visible');
    }
  }
}

/* ═══ APP INIT ═══ */
async function initApp() {
  initTheme();
  initNavigation();

  const ok = await loadAllData();
  const loading = document.getElementById('app-loading');
  if (loading) loading.remove(); // fully remove, not just hide

  if (!ok) {
    const mc = document.getElementById('main-content');
    if (mc) mc.innerHTML = `<div style="padding:4rem 2rem;text-align:center;color:var(--text-muted)"><p>Failed to load training data. Please refresh the page.</p></div>`;
    return;
  }

  // Wire up all interactive components BEFORE rendering
  initSessionBuilder();
  initRamp();
  initTracker();
  initDeathLogger();

  // Render data-dependent views
  renderHome();
  renderConcepts();
  renderSkillsTab();
  renderLogs();

  // Show home view
  switchView('home');
  updateNavBadges();
}

document.addEventListener('DOMContentLoaded', initApp);

/* ═══════════════════════════════════════════════
   GET STARTED — ROI-ranked onboarding path
═══════════════════════════════════════════════ */

// Curated learning path — ordered by impact on rank, not topic order.
// Each concept links to its source video and maps to a skill or drill.
const ONBOARDING_STAGES = [
  {
    id: 'stage-1',
    number: '01',
    title: 'The Foundation — Why You Lose Duels',
    subtitle: 'Most players lose fights before they peek. These 5 concepts explain why.',
    timeEstimate: '~45 min of watching',
    color: 'accent',
    concepts: [
      {
        id: 'ob-angle-advantage',
        name: 'Angle Advantage Rule',
        why: 'The single highest-ROI concept in the game. Controlling how much of your body is exposed before you shoot decides most duels before they start.',
        videoUrl: 'https://www.youtube.com/watch?v=eMk_GNeXE1I',
        videoId: 'eMk_GNeXE1I',
        source: 'w0rthy',
        timestamp: '0:00',
        relatedSkill: 'two-step-peek',
        relatedDrill: 'two-step-peek',
        tags: ['peeking', 'angles'],
      },
      {
        id: 'ob-peekers-advantage',
        name: "Peeker's Advantage — How It Works",
        why: 'You will always be slightly late on defense. Understanding this stops you from over-holding and teaches you to use PA offensively instead of fighting it.',
        videoUrl: 'https://www.youtube.com/watch?v=QNh0xj1EyH0',
        videoId: 'QNh0xj1EyH0',
        source: 'w0rthy',
        timestamp: '0:00',
        relatedSkill: 'two-step-peek',
        relatedDrill: 'pause-peek',
        tags: ['peeking', 'mechanics'],
      },
      {
        id: 'ob-stop-timing',
        name: 'Stop Timing (First Bullet Accuracy)',
        why: 'ROI 5/5. Most aim problems are not crosshair placement — they are firing while moving. Fix this one habit and your hit rate improves immediately.',
        videoUrl: 'https://www.youtube.com/watch?v=Ku-n1bAV01Q',
        videoId: 'Ku-n1bAV01Q',
        source: 'w0rthy',
        timestamp: '0:00',
        relatedSkill: 'stop-timing',
        relatedDrill: 'deadzone-stop',
        tags: ['aim', 'movement'],
      },
      {
        id: 'ob-shadow-step',
        name: 'Shadow Stepping (2-Step Rule)',
        why: 'The mechanical foundation of every clean peek. Without this you are either spraying moving or stopping too early. This is the peek, executed correctly.',
        videoUrl: 'https://www.youtube.com/watch?v=Ku-n1bAV01Q',
        videoId: 'Ku-n1bAV01Q',
        source: 'w0rthy',
        timestamp: '2:30',
        relatedSkill: 'two-step-peek',
        relatedDrill: 'two-step-peek',
        tags: ['movement', 'peeking'],
      },
      {
        id: 'ob-crosshair-placement',
        name: 'Crosshair Placement (Head Level Always)',
        why: 'ROI 5/5. Every duel you aim at chest level, you need to correct upward while also counter-strafing. Placing crosshair at head height removes one entire correction.',
        videoUrl: 'https://www.youtube.com/watch?v=wgQHZjy6TxA',
        videoId: 'wgQHZjy6TxA',
        source: 'n0ted',
        timestamp: '0:00',
        relatedSkill: 'crosshair-placement',
        relatedDrill: 'odin-head-height',
        tags: ['aim', 'crosshair'],
      },
    ],
  },
  {
    id: 'stage-2',
    number: '02',
    title: 'The Mental Layer — Why You Choke',
    subtitle: 'Mechanics are only half the game. These concepts address the mental blocks that cap your rank.',
    timeEstimate: '~40 min of watching',
    color: 'blue',
    concepts: [
      {
        id: 'ob-green-pink',
        name: 'Green / Pink Mindset',
        why: 'The most practical mental framework in the game. Green = curious, adapting, learning. Pink = tilt, ego, excuses. You play exactly as well as you mentally allow yourself to.',
        videoUrl: 'https://www.youtube.com/watch?v=k1dXzO0RIBc',
        videoId: 'k1dXzO0RIBc',
        source: 'Zasko III',
        timestamp: '0:00',
        relatedSkill: 'tension-fizzle',
        relatedDrill: 'green-mode-lock',
        tags: ['mental', 'mindset'],
      },
      {
        id: 'ob-text-message',
        name: 'Text Message Anticipation',
        why: 'Most deaths happen because you react to a sound or movement without a plan. Text Message teaches you to pre-decide your response — turning panic into protocol.',
        videoUrl: 'https://www.youtube.com/watch?v=28yvjExaR80',
        videoId: '28yvjExaR80',
        source: 'Zasko III',
        timestamp: '0:00',
        relatedSkill: 'text-message',
        relatedDrill: 'text-message-drill',
        tags: ['mental', 'decision-making'],
      },
      {
        id: 'ob-breath-control',
        name: 'Breath Control (Physiology, Not Mindset)',
        why: 'ROI 4/5. Adrenaline physically tightens your hand and narrows your vision. A 2-second breath reset before a swing is not soft — it is a biological interrupt that removes tremor.',
        videoUrl: 'https://www.youtube.com/watch?v=k1dXzO0RIBc',
        videoId: 'k1dXzO0RIBc',
        source: 'Zasko III',
        timestamp: '3:00',
        relatedSkill: 'breath-control',
        relatedDrill: 'breath-reset',
        tags: ['mental', 'mechanics'],
      },
      {
        id: 'ob-pele-protocol',
        name: 'Pele Protocol (Pre-Round Visualization)',
        why: 'Visualization activates the same upper motor neurons as physical practice. 15 minutes of mental reps = measurable improvement the next session.',
        videoUrl: 'https://www.youtube.com/watch?v=MBO9jUMjCPE',
        videoId: 'MBO9jUMjCPE',
        source: 'w0rthy',
        timestamp: '0:00',
        relatedSkill: 'anti-mirror',
        relatedDrill: 'visualization-drill',
        tags: ['mental', 'preparation'],
      },
      {
        id: 'ob-zero-excuses',
        name: '0% Excuses / 100% Responsibility',
        why: 'Every death has a mechanical or decisional root cause you could have controlled. The moment you find one excuse, you stop learning. This concept is the gatekeeper to all other improvement.',
        videoUrl: 'https://www.youtube.com/watch?v=MBO9jUMjCPE',
        videoId: 'MBO9jUMjCPE',
        source: 'w0rthy',
        timestamp: '0:00',
        relatedSkill: 'tension-fizzle',
        tags: ['mental', 'accountability'],
      },
    ],
  },
  {
    id: 'stage-3',
    number: '03',
    title: 'Game Sense — Why You Die in the Right Position',
    subtitle: 'You can have perfect mechanics and still lose every round with bad positioning and information use.',
    timeEstimate: '~35 min of watching',
    color: 'success',
    concepts: [
      {
        id: 'ob-ufos',
        name: 'UFOs Positioning Framework',
        why: 'The simplest high-impact game sense framework. Unfair Fucking Outstanding Spots — positions where you win the angle before the peek starts. Most players play fair angles by default.',
        videoUrl: 'https://www.youtube.com/watch?v=3_0ajFbCcUA',
        videoId: '3_0ajFbCcUA',
        source: 'w0rthy',
        timestamp: '0:00',
        relatedSkill: 'ufos-check',
        tags: ['game-sense', 'positioning'],
      },
      {
        id: 'ob-drivers-protocol',
        name: "Driver's Protocol (Awareness Modes)",
        why: 'You cannot process minimap, util, and your crosshair simultaneously. This framework teaches you to switch between focused and ambient modes intentionally — like driving a car.',
        videoUrl: 'https://www.youtube.com/watch?v=k8B7x5jH_lI',
        videoId: 'k8B7x5jH_lI',
        source: 'w0rthy',
        timestamp: '0:00',
        relatedSkill: 'minimap-habit',
        relatedDrill: 'dm-minimap-habit',
        tags: ['game-sense', 'awareness'],
      },
      {
        id: 'ob-ohshit-line',
        name: 'OH SH*T Line',
        why: 'The line on any map where one more step means you are exposed to 3+ angles. Most players cross it without knowing. Knowing where your OH SH*T line is eliminates a class of avoidable deaths.',
        videoUrl: 'https://www.youtube.com/watch?v=eMk_GNeXE1I',
        videoId: 'eMk_GNeXE1I',
        source: 'w0rthy',
        timestamp: '4:00',
        tags: ['game-sense', 'positioning'],
      },
      {
        id: 'ob-info-utility',
        name: 'Info → Utility → Commit',
        why: 'Committing to a site without info is gambling. This 3-step framework ensures you always know why you are pushing — not just reacting to the clock.',
        videoUrl: 'https://www.youtube.com/watch?v=a0qO_CDr1GE',
        videoId: 'a0qO_CDr1GE',
        source: 'OD26',
        timestamp: '0:00',
        tags: ['game-sense', 'macro'],
      },
      {
        id: 'ob-shoot-move',
        name: 'Shoot-Then-Move (Zero Gap)',
        why: 'ROI 5/5. Every time you move before your bullet lands, you wasted the shot. The sequence is: stop → shoot → move. The gap between shoot and move should be zero.',
        videoUrl: 'https://www.youtube.com/watch?v=edIzYSYt7Bw',
        videoId: 'edIzYSYt7Bw',
        source: 'w0rthy',
        timestamp: '0:00',
        relatedSkill: 'shoot-then-move',
        relatedDrill: 'shoot-then-move',
        tags: ['aim', 'movement'],
      },
    ],
  },
];

// In-memory watched state (persists as long as tab is open; saved to localStorage)
const GS_STORAGE_KEY = 'valo-training.getstarted.v1';

function loadWatchedState() {
  try {
    const raw = localStorage.getItem(GS_STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch { return new Set(); }
}

function saveWatchedState(watched) {
  try { localStorage.setItem(GS_STORAGE_KEY, JSON.stringify([...watched])); } catch {}
}

let watchedConcepts = loadWatchedState();

function getTotalConcepts() {
  return ONBOARDING_STAGES.reduce((n, s) => n + s.concepts.length, 0);
}

function renderGetStarted() {
  const stagesEl = document.getElementById('gs-stages');
  if (!stagesEl) return;

  stagesEl.innerHTML = '';

  ONBOARDING_STAGES.forEach((stage, si) => {
    const watchedInStage = stage.concepts.filter(c => watchedConcepts.has(c.id)).length;
    const allDone = watchedInStage === stage.concepts.length;

    const stageEl = document.createElement('div');
    stageEl.className = 'gs-stage' + (allDone ? ' gs-stage-done' : '');
    stageEl.innerHTML = `
      <div class="gs-stage-header">
        <div class="gs-stage-num gs-stage-num--${stage.color}">${stage.number}</div>
        <div class="gs-stage-meta">
          <h2 class="gs-stage-title">${stage.title}</h2>
          <p class="gs-stage-subtitle">${stage.subtitle}</p>
          <div class="gs-stage-footer">
            <span class="gs-stage-time">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${stage.timeEstimate}
            </span>
            <span class="gs-stage-progress-text">${watchedInStage}/${stage.concepts.length} watched</span>
          </div>
        </div>
        ${allDone ? '<div class="gs-stage-done-badge">✓ Complete</div>' : ''}
      </div>
      <div class="gs-stage-progress-wrap">
        <div class="gs-stage-progress-bar gs-stage-bar--${stage.color}" style="width:${(watchedInStage/stage.concepts.length)*100}%"></div>
      </div>
      <div class="gs-cards" id="gs-cards-${stage.id}"></div>
    `;
    stagesEl.appendChild(stageEl);

    const cardsEl = document.getElementById('gs-cards-' + stage.id);
    stage.concepts.forEach((concept, ci) => {
      const watched = watchedConcepts.has(concept.id);
      const card = document.createElement('div');
      card.className = 'gs-card' + (watched ? ' gs-card-watched' : '');
      card.innerHTML = `
        <div class="gs-card-inner">
          <a class="gs-thumbnail" href="${concept.videoUrl}" target="_blank" rel="noopener" title="Watch on YouTube">
            <img
              src="https://img.youtube.com/vi/${concept.videoId}/hqdefault.jpg"
              alt="${concept.name}"
              loading="lazy"
              onerror="this.parentElement.innerHTML='<div class=\\'gs-thumb-fallback\\'><svg width=\\"32\\" height=\\"32\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\"><polygon points=\\"5 3 19 12 5 21 5 3\\"/></svg></div>'"
            />
            <div class="gs-play-overlay">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            ${concept.timestamp && concept.timestamp !== '0:00' ? `<span class="gs-timestamp">${concept.timestamp}</span>` : ''}
            ${watched ? '<div class="gs-watched-overlay"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>' : ''}
          </a>
          <div class="gs-card-body">
            <div class="gs-card-source">${concept.source || ''}</div>
            <h3 class="gs-card-name">${concept.name}</h3>
            <p class="gs-card-why">${concept.why}</p>
            <div class="gs-card-tags">${(concept.tags || []).map(t => `<span class="gs-tag">${t}</span>`).join('')}</div>
            <div class="gs-card-actions">
              <button class="gs-watch-btn ${watched ? 'watched' : ''}" data-id="${concept.id}">
                ${watched
                  ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Watched'
                  : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Mark as watched'}
              </button>
              ${concept.relatedDrill ? `<button class="gs-drill-btn" data-drill="${concept.relatedDrill}">See drill →</button>` : ''}
            </div>
          </div>
        </div>
      `;

      card.querySelector('.gs-watch-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const id = concept.id;
        if (watchedConcepts.has(id)) {
          watchedConcepts.delete(id);
        } else {
          watchedConcepts.add(id);
        }
        saveWatchedState(watchedConcepts);
        renderGetStarted();
        updateGetStartedProgress();
        updateNavBadges();
      });

      const drillBtn = card.querySelector('.gs-drill-btn');
      if (drillBtn) {
        drillBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const drill = appState.DRILLS.find(d => d.id === drillBtn.dataset.drill);
          if (drill) openDrillModal(drill);
          else switchView('drills');
        });
      }

      cardsEl.appendChild(card);
    });
  });

  updateGetStartedProgress();
}

function updateGetStartedProgress() {
  const total = getTotalConcepts();
  const watched = watchedConcepts.size;
  const pct = total > 0 ? Math.round((watched / total) * 100) : 0;

  const bar = document.getElementById('gs-progress-bar');
  const sub = document.getElementById('gs-progress-subtitle');
  const pctEl = document.getElementById('gs-progress-pct');
  if (bar) bar.style.width = pct + '%';
  if (sub) sub.textContent = `${watched} of ${total} concepts watched`;
  if (pctEl) pctEl.textContent = pct + '%';

  // Remove NEW badge from nav if user has started
  if (watched > 0) {
    const badge = document.getElementById('nav-badge-getstarted');
    if (badge) badge.style.display = 'none';
  }
}
