/* ═══════════════════════════════════════════════
   PROTOCOL — Valorant Training System
   Data + Interactivity
═══════════════════════════════════════════════ */

/* ── NAVIGATION ── */
(function () {
  const tabs = document.querySelectorAll('.nav-tab');
  const views = document.querySelectorAll('.view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const viewId = 'view-' + tab.dataset.view;
      tabs.forEach(t => t.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(viewId).classList.add('active');
    });
  });
})();

/* ── DARK MODE TOGGLE ── */
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = r.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  r.setAttribute('data-theme', d);

  if (t) {
    const setIcon = (theme) => {
      t.innerHTML = theme === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    };
    setIcon(d);
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      setIcon(d);
    });
  }
})();

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */

const DRILLS = [
  {
    id: 'two-step-peek',
    category: 'peek',
    name: 'Two-Step Peek',
    short: 'Exactly two silent steps, then stop before enemy appears.',
    source: 'Zasko — "In one call.. he learnt to fight like an IMMORTAL"',
    error: 'Micro-steps / jitter before the stop. Moving the mouse while strafing (blending motion and aim).',
    explanation: 'Set up FAR from the wall — further than feels natural. Take EXACTLY two full, committed sideways steps using A or D only. Remove all fingers from movement keys BEFORE your crosshair reaches the enemy position. The crosshair must be idle (completely still) during the two steps. Only micro-adjust AFTER full stop.',
    cue: '"Two steps, lift, wait." — Remove fingers before you see the target.',
    condition: 'Drill passes when you can peek 10 consecutive angles with zero mouse movement during the step phase.',
    location: 'Custom game or Range',
    tags: ['Core', 'Beginner', 'Ghost DM']
  },
  {
    id: 'idle-crosshair',
    category: 'aim',
    name: 'Idle Crosshair Drill',
    short: 'The mouse does NOT move while strafing. One small correction after stop.',
    source: 'Zasko — "Hands-Off Mouse Peeking Drill"',
    error: 'Dragging the crosshair while moving. Multiple micro-adjustments after stopping. Over-correcting past the target.',
    explanation: 'Set your crosshair at expected head height. Practice peeking with your right hand completely off the mouse — use only the keyboard to strafe. Your crosshair should arrive on or very near the target purely from positioning. Reintroduce the mouse only for the final single micro-correction after stopping. Build the habit that the mouse is for aiming, the keyboard is for movement — never both at once.',
    cue: '"Hand off the mouse until stopped."',
    condition: 'You need at most one small mouse movement per kill. If you\'re making 3+ corrections, restart the rep.',
    location: 'Range, then Ghost DM',
    tags: ['Core', 'Aim', 'Ghost DM', 'Range']
  },
  {
    id: 'deadzone-stop',
    category: 'movement',
    name: 'Deadzone Stop Timing',
    short: 'Shoot in the 50–160ms window when character speed drops to zero.',
    source: 'Fundamenty / w0rthyTV — Counter-strafe vs. Quick Tap analysis',
    error: 'Shooting while still moving (blue error lines visible). Waiting too long after stop. Jitter from over-counter-strafing.',
    explanation: 'In Valorant, your character reaches full accuracy when movement speed drops below 27.5% of max. This happens either by releasing the movement key (Vandal: ~89ms) or by counter-strafing (Vandal: ~50ms). The difference is only ~20ms — use whichever keeps your crosshair stable. Enable the shooting error graph in the range. Shoot only when lines are yellow. Train: strafe A, release or counter-strafe D, shoot in the yellow window. Phantom allows 2-bullet bursts while strafing at 100ms intervals.',
    cue: '"Release — wait for yellow — click."',
    condition: 'Guardian DM: aim for >60% first-bullet headshots in 5-minute session.',
    location: 'Range (error graph on), then Guardian DM',
    tags: ['Core', 'Movement', 'Guardian DM']
  },
  {
    id: 'slice-fallback',
    category: 'peek',
    name: 'Slice & Fall Back',
    short: 'Peek tightly, gather info, fall back instantly — no commitment.',
    source: 'Zasko — "Get-Out-Of-Jail-Free Slice" / "How To ACTUALLY Move In Valorant"',
    error: 'Standing too far from the wall during the slice. Not pre-stopping before clearing. Committing to a full wide swing on first peek.',
    explanation: 'The slice is your information peek — not your kill peek. Stand CLOSE to the wall (within 30cm). Preemptively stop BEFORE your crosshair clears the corner. This gives you the mini-Jett-dash effect: if 3 enemies are holding, you fall back with zero damage taken. Only commit a wide swing after you confirm: (1) there is one enemy, and (2) their crosshair has been baited tight by your slice. Sequence: Slice → Info → Duck back → Wide swing with broken crosshair.',
    cue: '"Close to wall, stop early, gather only."',
    condition: '5 consecutive angles where you fall back cleanly without taking damage on the slice.',
    location: 'Custom game, any map',
    tags: ['Peek', 'Intermediate', 'Ghost DM']
  },
  {
    id: 'accept-crosshair',
    category: 'aim',
    name: 'Accept the Crosshair',
    short: 'If placement is slightly off during peek, DO NOT fix it mid-motion. Stop and correct after.',
    source: 'Zasko — "You\'re Making Gunfights WAY Harder Than They Should Be.."',
    error: 'Dragging the mouse to reposition crosshair while still moving. "Fidgeting" produces chaotic, inefficient mouse paths.',
    explanation: 'During a peek, if your crosshair lands left of the ideal position — accept it. Be like a tennis player receiving a serve: feet planted, stay idle, react. Do NOT drag the mouse right while strafing. Instead: stop completely → evaluate where the crosshair landed → execute ONE clean flick to the head. This produces a simple linear mouse path versus the messy curve of mid-motion correction.',
    cue: '"Accept, stop, one flick — done."',
    condition: '10 kills in DM where every correction is made only after full stop.',
    location: 'Ghost or Vandal DM',
    tags: ['Aim', 'Intermediate']
  },
  {
    id: 'angle-advantage',
    category: 'peek',
    name: 'Angle Advantage Tracing',
    short: 'Use the ping system to calculate if you should trace or pre-aim a corner.',
    source: 'Zasko — "3 Simple Ways To Improve Your Crosshair Placement"',
    error: 'Tracing when you have angle disadvantage (you get pre-fired). Pre-aiming when you have advantage (you miss the trace).',
    explanation: 'Ping your cover and the enemy\'s cover. If you are 16m away and enemy is 7m away — you have angle advantage. Trace the wall smoothly (they can\'t see you yet). If enemy is closer to their corner than you are — you have disadvantage. Do NOT trace. Instead wide swing or pre-aim the position they\'ll appear. Adjust crosshair depth based on speed: slow walk = hold wide (reaction time buffer), full sprint = tight to wall (angle math favors tight).',
    cue: '"Ping before peeping."',
    condition: 'In custom games, correctly identify advantage/disadvantage on 5 different angles and choose the correct technique each time.',
    location: 'Custom game — practice on live maps',
    tags: ['Peek', 'Intermediate', 'Any DM']
  },
  {
    id: 'anti-mirror-dodge',
    category: 'movement',
    name: 'Anti-Mirror Dodge',
    short: 'If you miss in the open, immediately strafe OPPOSITE to enemy movement.',
    source: 'Zasko — "why you\'re getting destroyed when angle holding"',
    error: 'Standing still after missing. Mirroring the enemy\'s strafe direction (gives them a static target). Panicking and spraying instead of repositioning.',
    explanation: 'When holding an angle in the open and you miss your first shot: do NOT mirror the enemy\'s strafe. If they went right, you go right — that\'s mirroring and it\'s predictable. Instead, go opposite (anti-mirror). This forces the enemy to recalculate their aim track, resets their reaction time advantage, and keeps you evasive. LMB click must be INSTANTLY followed by a movement key — 0ms delay. Do not wait for visual confirmation of the kill.',
    cue: '"Click — move opposite — reset."',
    condition: '5 consecutive duels in DM where every shot is followed by immediate lateral movement.',
    location: 'Any DM',
    tags: ['Movement', 'Intermediate']
  },
  {
    id: 'target-transitions',
    category: 'aim',
    name: 'Target Transitions (Delusional Trust)',
    short: 'Assume first shot killed. Snap to second target with zero delay.',
    source: 'Zasko / Fundamenty — "Mada Makes Fragging EFFORTLESS"',
    error: 'Waiting 150–200ms to visually confirm the first kill before switching. This delay costs the second fight.',
    explanation: 'When facing multiple enemies: shoot target 1, ASSUME it\'s dead, snap to target 2 immediately. Do not wait for the kill animation or audio cue. High-level players call this "delusional trust" in their own mechanics. Your brain should fire → move → evaluate, not fire → evaluate → move. Practice in custom: face two dummy positions, fire one shot at the first, immediately flick to the second. Build the reflex of zero-delay switching.',
    cue: '"Fire and forget. Next target immediately."',
    condition: '3 double-kills in DM within 5 minutes where your crosshair reaches T2 before T1 death animation plays.',
    location: 'Custom game or chaotic DM',
    tags: ['Aim', 'Advanced']
  },
  {
    id: 'text-message-anticipation',
    category: 'mental',
    name: 'Pre-Round Text Message',
    short: 'Before entering a danger area, send your brain a "text message" warning.',
    source: 'Zasko / Fundamenty — "You\'ll Never RUSH Your Shots Again"',
    error: 'Getting surprised = panic reaction = spray, over-flick, missed shot. Surprise is the enemy of aim.',
    explanation: 'Before taking space or entering an angle, mentally visualize exactly what an aggressive enemy swing will look like. "Mid might push through smoke as I walk up." When the enemy actually appears — it\'s not a surprise, it\'s a predicted event. Your brain reacts like a static aim trainer scenario instead of panicking. This is why high-ranked players seem "calm" — they\'ve already processed the scenario mentally. Radiant game sense is just more text messages sent per minute.',
    cue: '"What will I see here? Visualize before moving."',
    condition: 'In 5 ranked rounds, successfully predict and react calmly to at least one "telegraphed" engagement per round.',
    location: 'Ranked / custom',
    tags: ['Mental', 'Any Level']
  },
  {
    id: 'green-pink-split',
    category: 'mental',
    name: 'Green / Pink Mindset Split',
    short: 'NEVER analyze mechanics during ranked. Save Pink mode for training only.',
    source: 'Zasko — "This Subtle Mistake WASTES So Much Time.."',
    error: 'Bringing analytical (Pink) thinking into ranked games. Micromanaging your crosshair or movement creates ~200ms processing delay and destroys flow state.',
    explanation: 'Green mindset = pure performance. Flow state, intuition, pure reaction. No conscious thought about mechanics. Trust "Self 2" — the subconscious doer. Pink mindset = analytical, critical, deliberate. For range, DM drills, VOD review — NOT for ranked. If you catch yourself thinking "where is my crosshair?" during a gunfight, you are in Pink during Green time. This is the single most common error that kills rank potential. The fix: choose ONE cue before ranked, apply it once, then forget mechanics entirely.',
    cue: '"One cue before queue. Then forget mechanics — play chess."',
    condition: 'Complete 3 ranked games without consciously thinking about aim technique mid-gunfight.',
    location: 'Ranked',
    tags: ['Mental', 'Core', 'Any Level']
  },
  {
    id: 'ufos-positioning',
    category: 'peek',
    name: 'UFOs Positioning Score',
    short: 'Score your position out of 5 before every angle hold. Need 2.5+ to proceed.',
    source: 'w0rthyTV — "How RADIANTS POSITION in VALORANT"',
    error: 'Holding death trap angles with score 1/5. Isolated, no escape, no support. This loses more rounds than bad aim.',
    explanation: 'Before holding any angle, run the UFOs audit: (U) Utility — can I request a smoke/flash? (F) Flashes/Friends — can I dodge flashes? Are teammates nearby? (O) On/Off angle — on-angles are pre-fired by default, off-angles give surprise. (S) Support — can a teammate trade me? (E) Escape — do I have immediate cover? Score 0.5 per criterion. Anything below 2.5 is a potential death trap. A score of 5 is a sovereign position.',
    cue: '"Score my position before I commit."',
    condition: 'In VOD review: pause on every death and score your position. If score was below 2.5, reposition was the correct call — not better aim.',
    location: 'Ranked + VOD review',
    tags: ['Mental', 'Intermediate', 'Macro']
  },
  {
    id: 'oh-shit-line',
    category: 'mental',
    name: 'Oh Shit Line Protocol',
    short: 'Identify the boundary where combat is 100% likely. Never cross it distracted.',
    source: 'w0rthyTV — "How To Attack Like A VCT Pro"',
    error: 'Crossing danger thresholds while checking minimap, reloading, or using utility. This causes "shock deaths" — killed while in an animation.',
    explanation: 'Every map has invisible lines — cross them and a fight is guaranteed. Identify these on your maps. Before crossing: finish all animations, stow utility, move eyes from minimap to crosshair, enter Active mode (100% focus on crosshair). The second you cross the Oh Shit Line: no reloading, no map checking, no talking. If you are in an animation and must cross, stop and finish the animation first. Narrate your mode aloud in practice: "Passive... Sentry... ACTIVE."',
    cue: '"Gun out before the threshold."',
    condition: 'For 3 rounds: never die while in an animation or looking at the minimap inside a threat zone.',
    location: 'Ranked + custom',
    tags: ['Mental', 'Macro', 'Any Level']
  },
  {
    id: 'breath-reset',
    category: 'mental',
    name: 'Breath Before Swing',
    short: 'One deep exhale before every intentional peek. Drop heart rate on demand.',
    source: 'w0rthyTV / Fundamenty — diaphragmatic regulation',
    error: 'Elevated heart rate causes "lifting" — physical muscle tension. This loses 80% of fine motor control. Panic = spray, jitter, over-flick.',
    explanation: 'Before every intentional peek (not reactive fights), take one diaphragmatic breath. Inhale for 4 seconds, exhale slowly for 6 seconds. This activates the parasympathetic nervous system, drops heart rate by 5–15 bpm, and restores fine motor precision. In Sheriff DM, practice this before every engagement. Worthy notes that exhaling just before the shot produces measurably better grouping. The physical tension of ranked anxiety (sweaty palms, tight grip) degrades aim more than bad crosshair placement.',
    cue: '"Exhale — then peek."',
    condition: 'In Sheriff DM: take a breath before every fight for one full session. Notice calmness difference.',
    location: 'Sheriff DM, ranked clutches',
    tags: ['Mental', 'Any Level']
  },
  {
    id: 'lmb-to-cover',
    category: 'peek',
    name: 'LMB = Back to Cover',
    short: 'Every click is immediately followed by cover return. Reflexive, not optional.',
    source: 'Zasko — "Shoot-and-Fallback Reflex"',
    error: 'Standing still after firing. Waiting to see if you got the kill (200ms delay). Exposing yourself to trade kills.',
    explanation: 'Program a hard mental reflex: Left Mouse Button = fire + immediately strafe to cover. These must happen in the same motion — 0ms delay between fire and retreat. Waiting to visually confirm the kill before moving costs 150–200ms and allows the enemy to trade you. If cover is unavailable, trigger the Anti-Mirror Dodge instead. Practice in the range: fire 2 shots at a bot → immediately tap A or D to strafe before checking the result. Do NOT look at the kill feed.',
    cue: '"Click and move. Same motion."',
    condition: '10 consecutive kills in DM where you never stand still for more than 200ms after firing.',
    location: 'Any DM',
    tags: ['Peek', 'Core', 'Any Level']
  }
];

const CONCEPTS_BY_BLOCK = {
  block1: [
    {
      name: 'Two-Step Peek Rule',
      source: 'Zasko — "In one call.. he learnt to fight like an IMMORTAL"',
      preview: 'Exactly two silent steps, preemptive stop before enemy is visible. No micro-steps, no mouse movement during strafe.'
    },
    {
      name: 'Get-Out-Of-Jail-Free Slice',
      source: 'Zasko — "How To ACTUALLY Move In Valorant"',
      preview: 'Stay close to wall during slice. Pre-stop grants you instant fallback without taking damage — mini-Jett-dash.'
    },
    {
      name: 'Angle Advantage Calculation',
      source: 'Zasko — "3 Simple Ways To Improve Your Crosshair Placement"',
      preview: 'Ping your distance vs. enemy\'s distance. Further away = trace the angle. Closer to wall = pre-aim or wide swing.'
    },
    {
      name: 'Rule of Thirds Clearing',
      source: 'Zasko — "How to clear angles FAST but PROPERLY"',
      preview: 'Break every space into 3 visual beats. Clear close angle → off-angle → deep back corner. Never swing everything at once.'
    },
    {
      name: 'Acoustic-Based Hold Width',
      source: 'Zasko — "Stop GUESSING How Wide You Should Hold"',
      preview: 'Running footsteps = hold wide. Silence = hold tight (shift-walkers stop close to wall). Let audio dictate crosshair distance.'
    },
    {
      name: 'Poisoned Angles (Anti-Repeeking)',
      source: 'Zasko — "How Canezerra Can BREAK The Rules"',
      preview: 'Once you\'ve peeked an angle, the enemy anchors at your height. Never re-peek same angle at same elevation — crouch, wide swing, or relocate.'
    },
    {
      name: 'Straight-Line Peeking (No Diagonal)',
      source: 'w0rthyTV — "100-Rep Corner Peek Drill"',
      preview: 'Peeking with W+A or W+D = shorter hitbox travel on enemy screen = easier to one-tap you. Use ONLY A or D.'
    },
    {
      name: 'Slicing the Pie Methodology',
      source: 'w0rthyTV / Fundamenty — full slice breakdown',
      preview: 'Arc around the corner clearing one slice at a time. Stay far from wall. Crosshair leads movement, never trails it.'
    }
  ],
  block2: [
    {
      name: 'Deadzone Stop Timing',
      source: 'w0rthyTV / Fundamenty — Movement Masterclass',
      preview: 'Shoot in the 50–160ms window when character speed drops below 27.5%. Range error graph: wait for yellow lines only.'
    },
    {
      name: 'Counter-Strafe vs. Quick Tap',
      source: 'Fundamenty — "Counter-Strafe analysis"',
      preview: 'Counter-strafe: 50ms to accuracy. Quick tap (just release): 89ms. Difference is 20ms. Use whichever preserves crosshair stability.'
    },
    {
      name: 'Sequential Shoot-Then-Move',
      source: 'Zasko — "How To ACTUALLY Burst Like PRIMMIE"',
      preview: 'Fire, then IMMEDIATELY press a movement key. Dead time between shot and strafe = free frame for the enemy. Eliminate it.'
    },
    {
      name: 'Vandal vs. Phantom Mechanics',
      source: 'Fundamenty — Weapon Mechanics section',
      preview: 'Vandal: single taps at full speed (50–89ms deadzone). Phantom: 2-bullet bursts while strafing (100ms dead-zone). Train them separately.'
    },
    {
      name: 'The Speed Spectrum (Tracing Depth)',
      source: 'Zasko — "How (And When) To ACTUALLY Trace Angles"',
      preview: 'Speed 1 (static hold) = crosshair wide. Speed 10 (peeking at sprint) = crosshair buried tight to wall. Calibrate depth to movement speed.'
    },
    {
      name: 'Accept the Crosshair Rule',
      source: 'Zasko — "You\'re Making Gunfights WAY Harder"',
      preview: 'If crosshair lands slightly off during peek, do NOT reposition mid-motion. Stop. Accept. One clean micro-flick after stop.'
    }
  ],
  block3: [
    {
      name: 'Target Transitions / Delusional Trust',
      source: 'Zasko / Fundamenty — Mada analysis',
      preview: 'Assume T1 is dead. Snap to T2 with 0ms delay. Do not wait for visual/audio kill confirmation. Train this as a reflex.'
    },
    {
      name: 'Text Message Anticipation',
      source: 'Zasko / Fundamenty — "You\'ll Never RUSH Your Shots Again"',
      preview: 'Before taking space, mentally preview what you\'ll see. When it happens — it\'s a predicted event, not a surprise. Panic eliminated.'
    },
    {
      name: 'Green vs. Pink Mindset',
      source: 'Zasko — "This Subtle Mistake WASTES So Much Time"',
      preview: 'Green = ranked: trust automation, play chess. Pink = training only: analytical, deliberate. Never analyze mechanics mid-gunfight.'
    },
    {
      name: 'Pele Protocol (Pre-Round Visualization)',
      source: 'Fundamenty — "Protokół Pelé"',
      preview: 'During buy phase: close eyes, visualize the round. What angle will you hold? What will the enemy do? Be "in the moment from the future."'
    },
    {
      name: 'Tension Fizzle Method',
      source: 'Zasko — "3 Reasons You Keep Whiffing"',
      preview: 'Flick starts explosive + high tension. As crosshair approaches target, tension MUST physically release. Floaty finish = accuracy. High tension near target = overflick.'
    },
    {
      name: '5-Why Reflection Framework',
      source: 'Zasko — "You\'ll Never Rank Up Until You Fix This"',
      preview: 'After death: ask "why?" 5 times. Drives past "I missed" to actual root cause: bad setup → angle disadvantage → wrong pathing → etc.'
    },
    {
      name: 'Breath Reset / Diaphragmatic Regulation',
      source: 'w0rthyTV / Fundamenty',
      preview: 'Anger/pressure causes lifting (muscle tension) = 80% loss of fine motor control. Deep exhale before swing. Physiological regulation restores precision.'
    },
    {
      name: 'Idle Rest After Session',
      source: 'Fundamenty — Konsolidacja pamięci ruchowej',
      preview: '5–10 min of pure inactivity with eyes closed after gaming. Hippocampus replays successful motor sequences in reverse — accelerates retention 20–30%.'
    }
  ],
  block4: [
    {
      name: 'UFOs Positioning Protocol',
      source: 'w0rthyTV — "How RADIANTS POSITION in VALORANT"',
      preview: 'Score every position: Utility / Flash-dodge / On-Off angle / Support / Escape. Need 2.5/5 minimum. Below that = death trap.'
    },
    {
      name: "Oh Shit Line Protocol",
      source: 'w0rthyTV — "How To Attack Like A VCT Pro"',
      preview: 'Invisible threshold where combat is guaranteed. Cross it only with weapon out, animations done, eyes on crosshair, 100% active mode.'
    },
    {
      name: "Driver's Protocol (Awareness Modes)",
      source: 'w0rthyTV — "How To Attack Like A VCT Pro"',
      preview: 'Active (100% crosshair): crossing Oh Shit Line. Sentry (50/50): behind cover. Passive (0%): safe rotations only. Narrate mode aloud in practice.'
    },
    {
      name: 'Tab Key Habit',
      source: 'w0rthyTV — "Assessing vs. Guessing"',
      preview: 'Check scoreboard every buy phase. Know enemy economy and ult status. Operating without this = guessing = panic = degraded aim.'
    },
    {
      name: 'Cat Protocol (Anti-KDA Chase)',
      source: 'w0rthyTV — "SEN SICK and his MISTAKES"',
      preview: 'After a kill: force yourself to S-key back for 3 seconds before making the next decision. You got the kill. Don\'t chase the laser.'
    },
    {
      name: 'Win Condition Hierarchy',
      source: 'w0rthyTV — "Why Pros Buy Sheriffs"',
      preview: '1. Spike (plant/defuse). 2. Time (burn the clock). 3. Kills (only as tool for #1 and #2). Kills without objective = stat-padding that loses rounds.'
    },
    {
      name: 'Teeter-Totter Protocol',
      source: 'w0rthyTV — "SEN SICK and his MISTAKES"',
      preview: 'If one side plays aggressive for info, the other must anchor passively. Never both sides over-extending simultaneously — collapses defense.'
    },
    {
      name: 'Info-Util-Kill-Escape Framework',
      source: 'Zasko — "You\'re WASTING Your Utility"',
      preview: 'Jab (slice for info) → Parry (utility activated) → Kick (wide swing for kill) → Escape. Never throw utility dry without first confirming a target.'
    }
  ]
};

/* ── SESSION PLANS ── */
const SESSION_PLANS = {
  '15-ranked': {
    cautions: [
      'Do NOT play more than one DM — CNS potentiation fades in 10 minutes, extra DMs waste the effect',
      'Do NOT chase records or DM score — you are activating, not proving yourself',
      'Do NOT extend this session "just a bit longer" — you will fatigue before ranked starts',
      'Do NOT check social media between RAMP end and ranked queue'
    ],
    steps: [
      { time: '0–3 min', title: 'Range — Raise', detail: 'Loose shooting at medium bots. Head height only. No pressure. Wake up the hands.' },
      { time: '3–6 min', title: 'Range — Activate + Mobilize', detail: 'Ghost or Sheriff: slow tracking, micro-corrections. Wide swipes across the pad. Full arm range of motion.' },
      { time: '6–13 min', title: 'Potentiate DM — ONE focus only', detail: 'Pick your DM weapon. One mechanical cue only. Do not try to win. Finish fresh.' },
      { time: '13–15 min', title: 'Queue Immediately', detail: 'No delay. The CNS activation window is closing. Apply your one cue in the first round.' }
    ],
    cues: [
      '"Two steps — stop — wait." (apply when peeking every single angle)',
      '"Idle mouse. Keyboard moves, mouse waits." (crosshair discipline)',
      '"Click and move. Same motion." (LMB = cover reflex)',
      '"Gun out before the threshold." (Oh Shit Line in every round)'
    ]
  },
  '15-training': {
    cautions: [
      'This is warmup only — if you only have 15 min, go ranked day mode instead',
      'Do NOT train new mechanics without a specific cue — vague practice builds vague habits'
    ],
    steps: [
      { time: '0–5 min', title: 'Range — Full RAMP', detail: 'Raise → Activate → Mobilize at a relaxed pace. Focus on hand feel.' },
      { time: '5–15 min', title: 'One drill only', detail: 'Pick ONE drill from the Drill Library. Apply it with full focus. Do not switch drills.' }
    ],
    cues: [
      '"One drill. One cue. One session." — no scope creep'
    ]
  },
  '30-ranked': {
    cautions: [
      'Do NOT add more drills because one session felt good — stick to ONE drill concept',
      'Do NOT use a rifle for DM if you\'re drilling placement — Ghost or Sheriff only',
      'Do NOT skip the review — 5 min of honest analysis outperforms 30 min of mindless play'
    ],
    steps: [
      { time: '0–5 min', title: 'Range — RAMP (Raise + Activate + Mobilize)', detail: 'Bots at range, Ghost tracking, wide pad swipes. Don\'t rush this.' },
      { time: '5–15 min', title: 'Drill Focus — ONE mechanic', detail: 'Choose from Drill Library. Apply that mechanic with deliberate repetition. Fail cleanly — errors are neuroplasticity triggers.' },
      { time: '15–23 min', title: 'Potentiate DM — chosen weapon + same cue', detail: 'Transfer your drill concept into live DM. Use Ghost, Guardian, or Sheriff. One cue. Not playing to win.' },
      { time: '23–28 min', title: 'Quick Review — 3–5 deaths', detail: 'What died for? Mechanical error or tactical error? Apply the 5-Why framework once. Don\'t spiral.' },
      { time: '28–30 min', title: 'Pre-Ranked Reset', detail: 'Set ONE cue for ranked. Take 3 deep breaths. Queue.' }
    ],
    cues: [
      '"Two steps, idle crosshair, stop before the target." (core peek cue)',
      '"Yellow lines only — release first, then click." (stop timing)',
      '"Exhale before every intentional swing." (composure)',
      '"UFOs 2.5+ before I commit to any position." (macro)'
    ]
  },
  '30-training': {
    cautions: [
      'Training day: no ranked pressure. Focus is on mechanics, not results',
      'Do NOT play ranked after a hard training session — you\'ve used Pink mode, Green mode won\'t switch cleanly'
    ],
    steps: [
      { time: '0–5 min', title: 'Range — Full RAMP', detail: 'All four phases at relaxed pace. No rushing the Potentiate today.' },
      { time: '5–15 min', title: 'Drill Block A — Core mechanic', detail: 'One drill from Peek or Aim category. Full deliberate reps.' },
      { time: '15–25 min', title: 'DM Transfer — same mechanic', detail: 'Guardian or Ghost DM. Apply the drill\'s cue in live chaos. Errors are good — triggers neuroplasticity.' },
      { time: '25–30 min', title: 'Reflection + Off-PC plan', detail: '5-Why one death. Write one mistake and one success in Tracker.' }
    ],
    cues: [
      '"I am training today. Errors are the point. Every mistake is a repetition."'
    ]
  },
  '45-ranked': {
    cautions: [
      'Do NOT warmup longer than 15 min before ranked — everything after that is training, not warmup',
      'Do NOT do more than 2 drills — cognitive overload degrades transfer',
      'Do NOT tilt on the first ranked loss — you\'ve trained, trust the process for a minimum 3-game sample'
    ],
    steps: [
      { time: '0–5 min', title: 'Range — RAMP (full)', detail: 'Raise, Activate, Mobilize — all phases clean. Set the foundation.' },
      { time: '5–15 min', title: 'Drill A — Primary mechanic', detail: 'Today\'s main skill. Deliberate, slow reps. Build the groove before speed.' },
      { time: '15–25 min', title: 'Drill B — Secondary mechanic', detail: 'Only if Drill A felt solid. Otherwise continue Drill A. Confirm before upgrading.' },
      { time: '25–33 min', title: 'Potentiate DM — chosen weapon', detail: 'Transfer both mechanics into live DM. Ghost, Guardian, or Sheriff. One primary cue.' },
      { time: '33–38 min', title: 'Review — 3–5 kills + 3–5 deaths', detail: 'Were deaths mechanical or tactical? Were kills from training or luck? Be honest.' },
      { time: '38–45 min', title: 'Pre-ranked reset', detail: 'ONE cue. Three breaths. Pele visualization of first round. Queue.' }
    ],
    cues: [
      '"Two-step peek → accept crosshair → LMB to cover." (full core sequence)',
      '"Exhale, text message, one cue — then chess." (mental stack)',
      '"UFOs 2.5+ or I reposition. No death traps." (macro)'
    ]
  },
  '45-training': {
    cautions: [
      'No ranked today — honor the training day commitment',
      'Do NOT practice 5 things — one or two mechanics, drilled deeply'
    ],
    steps: [
      { time: '0–5 min', title: 'Range — Full RAMP', detail: 'Take your time through all 4 phases.' },
      { time: '5–18 min', title: 'Drill Block A', detail: 'Core mechanic. High reps. Fail, reset, repeat. Errors are the neuroplasticity signal.' },
      { time: '18–30 min', title: 'DM Transfer — Drill A in live chaos', detail: 'Use Ghost or Guardian. One cue only. Ignore DM score.' },
      { time: '30–40 min', title: 'Drill Block B — secondary', detail: 'Second mechanic from same category. Don\'t jump categories in one session.' },
      { time: '40–45 min', title: 'Log + Reflection', detail: 'Open Tracker. Write: 1 mistake, 1 success, cue rating. Then idle rest (no phone, 5 min).' }
    ],
    cues: [
      '"Today is Pink mode. Analytical, deliberate, mistake-positive."'
    ]
  },
  '60-ranked': {
    cautions: [
      'With 60 min, the temptation to over-train is high — still STOP warmup at 15 min',
      'Do NOT VOD review more than 5 minutes before ranked — you\'ll bring Pink mode into Green session',
      'Do NOT try 3+ drills — go deep on one or two'
    ],
    steps: [
      { time: '0–5 min', title: 'Range — Full RAMP', detail: 'Complete all four RAMP phases with care. Finish feeling activated, not warmed-up by fatigue.' },
      { time: '5–20 min', title: 'Drill A — Deep work', detail: 'Deliberate reps. Highest focus of the session. If you nail the drill, rest 60 seconds before continuing.' },
      { time: '20–32 min', title: 'DM Transfer — Apply Drill A', detail: 'Ghost, Guardian, or Sheriff. One cue. No score pressure. Note errors for review.' },
      { time: '32–40 min', title: 'Drill B or VOD prep', detail: 'If feeling sharp: add Drill B. If tired: switch to 8 min of VOD review of past ranked session.' },
      { time: '40–50 min', title: 'Potentiate DM — match intensity', detail: 'Final DM at ranked pace. This is the last CNS primer. Queue within 10 min after this ends.' },
      { time: '50–55 min', title: 'Pre-ranked mental prep', detail: 'Pele visualization: 1 round imagined in full. Set ONE cue. 3 deep breaths. Ready.' },
      { time: '55–60 min', title: 'Queue', detail: 'Green mode. Trust the work. Play chess, not mechanics.' }
    ],
    cues: [
      '"Today\'s cue: [your chosen drill cue]. Everything else is subconscious."'
    ]
  },
  '60-training': {
    cautions: [
      'No ranked — protect training day integrity',
      'Track everything in Tracker — 60 min without notes is 60 min half-wasted'
    ],
    steps: [
      { time: '0–5 min', title: 'Range — Full RAMP', detail: 'Quality over speed on all four phases.' },
      { time: '5–25 min', title: 'Drill A — Deep deliberate practice', detail: 'Core skill. High reps with full conscious attention. Pink mode at maximum. No rushing.' },
      { time: '25–40 min', title: 'DM Block — Guardian + Ghost', detail: 'First 7 min Guardian (stop timing). Switch to Ghost for 8 min (placement). One cue per weapon.' },
      { time: '40–50 min', title: 'Drill B — secondary mechanic', detail: 'Adjacent skill. Build on Drill A. Don\'t jump to a completely unrelated category.' },
      { time: '50–55 min', title: 'VOD review — 5 min', detail: 'One VOD clip, one death. 5-Why. One insight written down. Stop there.' },
      { time: '55–60 min', title: 'Tracker + Idle Rest', detail: 'Log the session. Then 5 min eyes closed — hippocampus consolidation begins.' }
    ],
    cues: [
      '"Deep work mode. One thing, done properly."'
    ]
  },
  'post-ranked': {
    cautions: [],
    steps: [
      { time: '0–10 min', title: 'Idle Rest', detail: 'Eyes closed. No phone, no input. Your hippocampus is replaying today\'s motor sequences. This is free skill consolidation — do not skip it.' },
      { time: '10–25 min', title: 'Mental Visualization', detail: 'Replay correct scenarios from today. Visualize the exact two-step peek done right, the breath before swing, the clean crosshair. 15 min of this = up to 35% additional skill gain. Upper motor neurons activate identically to physical practice.' },
      { time: '25+ min', title: 'Prioritize Sleep', detail: 'Motor memory is consolidated in NREM2 (sleep spindles). Players who sleep 8h after training show 20–30% better accuracy next session. No sleep = no consolidation. This is where the skill actually gets stored.' }
    ],
    cues: [
      '"Tonight\'s goal: consolidation. Rest is training."'
    ]
  },
  'post-training': {
    cautions: [],
    steps: [
      { time: '0–10 min', title: 'Idle Rest — mandatory', detail: 'No stimulus. Sit still with eyes closed. Let the hippocampus run its reverse replay of today\'s motor patterns.' },
      { time: '10–20 min', title: 'Visualization Training', detail: 'Imagine the drill you trained today, done perfectly. Slow, deliberate mental reps. Neuroscience: same upper motor neurons activate as in physical practice.' },
      { time: '20+ min', title: 'Sleep', detail: 'Everything you drilled today gets consolidated into permanent motor memory during NREM2. Protect this phase above all else.' }
    ],
    cues: [
      '"The skill is being downloaded right now. Sleep is the transfer."'
    ]
  }
};

/* ═══════════════════════════════════════════════
   SESSION BUILDER
═══════════════════════════════════════════════ */
let selectedTime = null;
let selectedMode = null;
let selectedDM = 'ghost';

// Time buttons
document.querySelectorAll('.time-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedTime = btn.dataset.time;

    const modeBlock = document.getElementById('mode-block');
    const dmBlock = document.getElementById('dm-block');
    const genBlock = document.getElementById('generate-block');

    if (selectedTime === 'post') {
      modeBlock.style.display = 'block';
      dmBlock.style.display = 'none';
      genBlock.style.display = 'block';
    } else {
      modeBlock.style.display = 'block';
      dmBlock.style.display = selectedTime !== '15' ? 'block' : 'none';
      genBlock.style.display = 'none';
      selectedMode = null;
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
    }

    hidePlan();
  });
});

// Mode buttons
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMode = btn.dataset.mode;
    document.getElementById('generate-block').style.display = 'block';
  });
});

// DM buttons
document.querySelectorAll('.dm-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.dm-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedDM = btn.dataset.dm;
  });
});

// Generate button
document.getElementById('generate-btn').addEventListener('click', () => {
  generatePlan();
});

// Reset button
document.getElementById('plan-reset').addEventListener('click', () => {
  hidePlan();
  document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('mode-block').style.display = 'none';
  document.getElementById('dm-block').style.display = 'none';
  document.getElementById('generate-block').style.display = 'none';
  selectedTime = null;
  selectedMode = null;
});

function hidePlan() {
  document.getElementById('session-plan').style.display = 'none';
}

function generatePlan() {
  let key;
  if (selectedTime === 'post') {
    key = selectedMode === 'training' ? 'post-training' : 'post-ranked';
  } else {
    key = `${selectedTime}-${selectedMode || 'ranked'}`;
  }

  const plan = SESSION_PLANS[key] || SESSION_PLANS['30-ranked'];
  const planEl = document.getElementById('session-plan');

  // Render cautions
  const cautionList = document.getElementById('caution-list');
  cautionList.innerHTML = '';
  const cautionBlock = document.getElementById('caution-block');

  if (plan.cautions.length > 0) {
    cautionBlock.style.display = 'flex';
    plan.cautions.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c;
      cautionList.appendChild(li);
    });
  } else {
    cautionBlock.style.display = 'none';
  }

  // Render steps
  const stepsEl = document.getElementById('plan-steps');
  stepsEl.innerHTML = '';
  plan.steps.forEach(step => {
    const div = document.createElement('div');
    div.className = 'plan-step';
    div.innerHTML = `
      <div class="step-time-badge">${step.time}</div>
      <div class="step-content">
        <p class="step-title">${step.title}</p>
        <p class="step-detail">${step.detail}</p>
      </div>
    `;
    stepsEl.appendChild(div);
  });

  // DM note injection
  const dmNames = { ghost: 'Ghost', guardian: 'Guardian', sheriff: 'Sheriff', vandal: 'Vandal' };
  const dmFocus = {
    ghost: 'crosshair placement and patience (forgiving recoil, trains idle crosshair)',
    guardian: 'stop timing and one-tap discipline (punishes movement, pure deadzone training)',
    sheriff: 'composure and anti-panic (high stakes, trains breath control and pressure resistance)',
    vandal: 'rhythm transfer (only use this when moving drill cues to match weapon)'
  };

  // Render cue
  const cues = plan.cues;
  const cueText = document.getElementById('cue-text');
  const randomCue = cues[Math.floor(Math.random() * cues.length)];
  cueText.textContent = randomCue;

  planEl.style.display = 'block';
  planEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ═══════════════════════════════════════════════
   RAMP — PHASE TOGGLES + TIMERS
═══════════════════════════════════════════════ */
document.querySelectorAll('.ramp-phase').forEach(phase => {
  const header = phase.querySelector('.phase-header');
  header.addEventListener('click', (e) => {
    if (e.target.closest('.timer-btn') || e.target.closest('.timer-stop')) return;
    phase.classList.toggle('collapsed');
  });
});

// Timers
const timers = {};

document.querySelectorAll('.phase-timer-block').forEach((block, idx) => {
  const btn = block.querySelector('.timer-btn');
  const display = block.querySelector('.timer-display');
  const countdown = block.querySelector('.timer-countdown');
  const stopBtn = block.querySelector('.timer-stop');
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
        setTimeout(() => {
          btn.style.display = '';
          display.style.display = 'none';
          countdown.style.color = '';
        }, 3000);
      }
    }, 1000);
  });

  stopBtn.addEventListener('click', () => {
    if (timers[idx]) clearInterval(timers[idx]);
    btn.style.display = '';
    display.style.display = 'none';
  });
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ═══════════════════════════════════════════════
   DRILLS — RENDER + FILTER + MODAL
═══════════════════════════════════════════════ */
function renderDrills(filter = 'all') {
  const grid = document.getElementById('drills-grid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? DRILLS : DRILLS.filter(d => d.category === filter);

  filtered.forEach(drill => {
    const catLabels = { peek: 'Peeking', aim: 'Aim', movement: 'Movement', mental: 'Mental' };
    const card = document.createElement('div');
    card.className = 'drill-card';
    card.innerHTML = `
      <div class="drill-category drill-cat-${drill.category}">${catLabels[drill.category]}</div>
      <p class="drill-name">${drill.name}</p>
      <p class="drill-short">${drill.short}</p>
      <div class="drill-tags">${drill.tags.map(t => `<span class="drill-tag">${t}</span>`).join('')}</div>
    `;
    card.addEventListener('click', () => openDrillModal(drill));
    grid.appendChild(card);
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDrills(btn.dataset.filter);
  });
});

renderDrills();

function openDrillModal(drill) {
  const catLabels = { peek: 'Peeking', aim: 'Aim', movement: 'Movement', mental: 'Mental' };
  const catColors = { peek: 'var(--accent)', aim: 'var(--blue)', movement: 'var(--success)', mental: 'var(--warning)' };

  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div class="modal-category" style="color:${catColors[drill.category]}">${catLabels[drill.category]}</div>
    <h2 class="modal-title">${drill.name}</h2>
    <div class="modal-source">${drill.source}</div>

    <div class="modal-section-label">What it is</div>
    <p class="modal-body">${drill.explanation}</p>

    <div class="modal-section-label">Common mistake</div>
    <div class="modal-error">${drill.error}</div>

    <div class="modal-section-label">Your cue</div>
    <div class="modal-cue">${drill.cue}</div>

    <div class="modal-section-label">Condition to pass</div>
    <div class="modal-condition">${drill.condition}</div>

    <div class="modal-section-label">Where to practice</div>
    <p class="modal-body">${drill.location}</p>
  `;

  document.getElementById('modal-overlay').style.display = 'flex';
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-overlay').style.display = 'none';
});

document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-overlay')) {
    document.getElementById('modal-overlay').style.display = 'none';
  }
});

/* ═══════════════════════════════════════════════
   CONCEPTS — RENDER
═══════════════════════════════════════════════ */
function renderConcepts() {
  Object.entries(CONCEPTS_BY_BLOCK).forEach(([blockKey, concepts]) => {
    const blockNum = blockKey.replace('block', '');
    const container = document.getElementById(`concepts-block${blockNum}`);
    if (!container) return;

    concepts.forEach(concept => {
      const item = document.createElement('div');
      item.className = 'concept-item';
      item.innerHTML = `
        <div class="concept-source">${concept.source}</div>
        <div class="concept-name">${concept.name}</div>
        <div class="concept-preview">${concept.preview}</div>
      `;
      container.appendChild(item);
    });
  });
}

renderConcepts();

/* ═══════════════════════════════════════════════
   TRACKER
═══════════════════════════════════════════════ */
// Set today's date
const dateInput = document.getElementById('log-date');
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

// In-memory log (persisted in sessionStorage for demo)
let logs = JSON.parse(sessionStorage.getItem('valo-logs') || '[]');

function renderLogs() {
  const list = document.getElementById('history-list');
  if (logs.length === 0) {
    list.innerHTML = '<p class="history-empty">No sessions logged yet. Start your first session above.</p>';
    return;
  }

  list.innerHTML = '';
  const sorted = [...logs].reverse();
  sorted.forEach(log => {
    const cueClass = log.cueSuccess === 'yes' ? 'cue-yes' : log.cueSuccess === 'partial' ? 'cue-partial' : 'cue-no';
    const cueLabel = log.cueSuccess === 'yes' ? 'Cue applied' : log.cueSuccess === 'partial' ? 'Cue partial' : 'Cue forgotten';
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="history-date">${log.date} · ${log.minutes} min</div>
      <div class="history-focus">${log.focus || 'No focus set'}</div>
      <div class="history-notes">
        ${log.mistake ? `✗ ${log.mistake}` : ''}
        ${log.mistake && log.success ? ' · ' : ''}
        ${log.success ? `✓ ${log.success}` : ''}
        ${log.dmNote ? ` · DM: ${log.dmNote}` : ''}
      </div>
      ${log.cueSuccess ? `<span class="history-cue-badge ${cueClass}">${cueLabel}</span>` : ''}
    `;
    list.appendChild(item);
  });
}

document.getElementById('save-log').addEventListener('click', () => {
  const cueRadio = document.querySelector('input[name="cue-success"]:checked');
  const log = {
    date: document.getElementById('log-date').value || today,
    minutes: document.getElementById('log-minutes').value || '?',
    focus: document.getElementById('log-focus').value,
    mistake: document.getElementById('log-mistake').value.trim(),
    success: document.getElementById('log-success').value.trim(),
    dmNote: document.getElementById('log-dm-note').value.trim(),
    cueSuccess: cueRadio ? cueRadio.value : null
  };

  logs.push(log);
  sessionStorage.setItem('valo-logs', JSON.stringify(logs));
  renderLogs();

  // Clear form
  document.getElementById('log-minutes').value = '';
  document.getElementById('log-focus').value = '';
  document.getElementById('log-mistake').value = '';
  document.getElementById('log-success').value = '';
  document.getElementById('log-dm-note').value = '';
  document.querySelectorAll('input[name="cue-success"]').forEach(r => r.checked = false);
});

renderLogs();
