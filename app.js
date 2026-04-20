/* ═══════════════════════════════════════════════
   PROTOCOL — Valorant Training System
   Data + Interactivity — v4.0 (Why Edition)
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
   DATA — DRILLS
   Only TRUE drills: things you sit down and practice
   with a specific protocol, reps, and pass condition.
   Each drill has a WHY field explaining the mechanism.
═══════════════════════════════════════════════ */

const DRILLS = [

  /* ─── PEEKING ─── */

  {
    id: 'two-step-peek',
    category: 'peek',
    name: 'Two-Step Peek',
    videoUrl: 'https://www.youtube.com/watch?v=a0qO_CDr1GE',
    short: 'Exactly two committed steps, hand off mouse, preemptive stop.',
    source: 'Zasko — "In one call.. he learnt to fight like an IMMORTAL"',
    why: 'Two steps is the exact threshold where you reach maximum horizontal speed without triggering the footstep-sound warning or bullet spread penalty. Any more steps means you\'re decelerating through the shot window with a moving crosshair. The preemptive stop ensures you are at rest before the enemy enters your screen — which turns the fight into a free reaction shot for you rather than a scramble to adjust.',
    error: 'Micro-steps / jitter before the stop. Moving the mouse while strafing (blending motion and aim). Rushing through to 3+ steps.',
    explanation: 'Set up FAR from the wall — further than feels natural. Take EXACTLY two full, committed sideways steps using A or D only. Remove all fingers from movement keys BEFORE your crosshair reaches the enemy position. The crosshair must be idle (completely still) during the two steps. Only micro-adjust AFTER full stop. Verbalize the angle you are set up for before every rep: say "I\'m set up for logs / catwalk / top box..." out loud. This forces deliberate intent.',
    cue: '"Two steps, lift, wait." Verbalize your target angle before each rep.',
    condition: '10 consecutive angles with zero mouse movement during the step phase. On VOD replay, your opponent should see instant death with no warning.',
    location: 'Custom game, any map — showers / catwalk / B main',
    tags: ['Core', 'Beginner', 'Ghost DM']
  },
  {
    id: 'idle-crosshair',
    category: 'peek',
    name: 'Idle Crosshair (Hand-Off-Mouse) Drill',
    videoUrl: 'https://www.youtube.com/watch?v=a0qO_CDr1GE',
    short: 'Walk to angle, physically remove hand from mouse, peek, replace.',
    source: 'Zasko — "You\'re Making Gunfights WAY Harder Than They Should Be" / "In one call.."',
    why: 'Blending mouse movement with strafing creates a curved, unpredictable crosshair path that misses most of the time. Your brain defaults to this habit under pressure. Physically lifting the hand breaks the neural loop completely, forcing the crosshair to land based on your pre-aim position alone — which is how Radiant-level peeking actually works.',
    error: 'Dragging crosshair while moving. Multiple micro-adjustments. Fidgeting after stop.',
    explanation: 'Walk up to an angle in custom game. Place crosshair at head height pointing into the wall. Physically lift your mouse hand off the mouse completely. Take your two steps. Peek. Place hand back on mouse only AFTER the peek is complete. This sounds extreme — that\'s the point. It eliminates the blend of motion and aim that plagues 90% of players. The hand-off forces you to rely on positioning and pre-aim rather than reflexive mouse dragging. Do 15+ reps this way. Then reintroduce the mouse gently for micro-correction only.',
    cue: '"Hand off the mouse until stopped."',
    condition: 'You need at most ONE small mouse movement per kill. If you\'re making 3+ corrections per fight, restart the rep.',
    location: 'Custom game (any map) — slow, deliberate',
    tags: ['Core', 'Aim', 'Ghost DM', 'Range']
  },
  {
    id: 'slice-fallback',
    category: 'peek',
    name: 'Slice & Fall Back',
    videoUrl: 'https://www.youtube.com/watch?v=a0qO_CDr1GE',
    short: 'Peek close to wall, gather info, fall back instantly — zero commitment.',
    source: 'Zasko — "Get-Out-Of-Jail-Free Slice" / "How To ACTUALLY Move In Valorant"',
    why: 'Committing to a wide swing without information is statistically bad: if two enemies are holding, you die. The slice gives you a free data point with near-zero risk because staying close to the wall means you\'re only exposed for a fraction of a second. Think of it as a Jett dash you can do with any agent — you see enemy position, then fall back without taking damage.',
    error: 'Standing too far from the wall during the slice. Not pre-stopping before clearing. Committing to a full wide swing on first peek.',
    explanation: 'The slice is your information peek — not your kill peek. Stand CLOSE to the wall. Preemptively stop BEFORE your crosshair clears the corner. This gives you the mini-Jett-dash effect: if 3 enemies are holding, you fall back with zero damage taken. Only commit a wide swing after you confirm: (1) there is one enemy, and (2) their crosshair has been baited tight by your slice. Drill: slice → info → duck back → wide swing with broken enemy crosshair. Practice on one angle for 10+ reps until fallback is reflexive.',
    cue: '"Close to wall, stop early, gather only."',
    condition: '5 consecutive angles where you fall back cleanly without taking damage on the slice.',
    location: 'Custom game, any map',
    tags: ['Peek', 'Intermediate', 'Ghost DM']
  },
  {
    id: 'slice-wide-combo',
    category: 'peek',
    name: 'Slice → Wide Swing Combo',
    videoUrl: 'https://www.youtube.com/watch?v=a0qO_CDr1GE',
    short: 'Open with slice (info + condition), follow with wide swing (kill).',
    source: 'Zasko — "you\'re killing your own aim" / "if you keep peeking like this, you will NOT rank up"',
    why: 'The slice forces the enemy to commit their crosshair tight to where you appeared. When you then wide swing, their crosshair is displaced — they must flick to re-acquire you. This buys you 100–200ms of free aim time. Radiants do not go straight to the wide swing because they understand it removes the information and conditioning advantage. The combo converts a 50/50 duel into a structured kill.',
    error: 'Going straight to wide swing with zero info. Re-peeking same way twice. Rushing the wide swing before enemy is conditioned.',
    explanation: 'Combo A: slice close → enemy expects re-slice → wide swing out (their crosshair is tight, yours is wide). Combo B: slice → miss → wait 1 second → wide swing (they expected a re-slice, you broke their pattern). Combo C: slice → kill → wide swing quickly (second enemy expects static hold, you go wide). Wide swing technique: face against wall → explode out with conviction → have crosshair on head BEFORE stopping → stop → shoot within 10ms max. Practice on one angle with a friend or custom bots. Drill each combo 10 reps before moving to the next.',
    cue: '"Slice to condition. Wide to kill. Never skip the setup."',
    condition: '10 wide swings where crosshair is on head BEFORE the stop — zero flicks after stopping.',
    location: 'Custom game with friend, or bots',
    tags: ['Peek', 'Intermediate', 'Any DM']
  },
  {
    id: 'sage-wall-peek',
    category: 'peek',
    name: 'Sage Wall Peek Drill',
    videoUrl: 'https://www.youtube.com/watch?v=Ku-n1bAV01Q',
    short: 'Exactly 1–2 shadow steps from a Sage wall — trains silent, precise exposure.',
    source: 'w0rthyTV — "Movement & Peeking Mastery, How To Fix It"',
    why: 'The Sage wall acts as a hard constraint: it physically prevents you from over-exposing while also giving you a surface to practice precise step counts. 1–2 steps is the "shadow zone" in Valorant\'s engine — no footstep audio fires, direction change gives 100% accuracy. The wall enforces this envelope without relying on your own self-discipline.',
    error: 'More than 2 steps (shooting error goes blue). Diagonal movement (WA or WD). Standing still after shot.',
    explanation: 'In the practice range, erect a Sage wall. Position yourself behind it with bots spread in front. Peek in and out using exactly 1–2 steps per direction — no more. 1–2 steps in Valorant is the "shadow step" zone: silent, full accuracy on direction change. Start with the rightmost bot and work progressively left, forcing you to expose tighter and tighter angles. Enable the shooting error indicator — lines must stay yellow. Never blue. Upgrade: add pre-fire movement (switch direction keys going back INTO wall while still maintaining aim line).',
    cue: '"One, two, out — one, two, back."',
    condition: '5 full passes across all bots with shooting error staying yellow every time.',
    location: 'Practice range (enable shooting error graph)',
    tags: ['Movement', 'Beginner', 'Range']
  },
  {
    id: 'teammate-angle-drill',
    category: 'peek',
    name: 'Teammate Angle Drill',
    videoUrl: 'https://www.youtube.com/watch?v=qaSCdJRuYRs',
    short: 'Friend holds common angles statically. You practice peeking with correct timing.',
    source: 'w0rthyTV — "You Move Like A Bot (Movement Guide)"',
    why: 'Bots in the range don\'t have reaction times and never punish your technique — they only test your aim. A human defender forces you to win through movement timing and angle mechanics, not just mechanical skill. If you win by out-aiming instead of out-moving, the drill isn\'t teaching you what you need to improve.',
    error: 'Using diagonal movement (WA/WD). Jiggling instead of committing. Winning by aim instead of movement timing.',
    explanation: 'Have a friend hold a common angle without moving or repositioning. You practice peeking it with correct technique: straight-line single-key movement, pause-peek entry, shadow steps, correct head-height pre-aim. Friend fires as fast as possible. Your goal is not to win by out-aiming — it\'s to win because your movement timing and technique make you harder to hit. Occasionally have the friend play off-angles to expose bad crosshair placement habits. Progress: if you win 60%+ of engagements, move to harder angles.',
    cue: '"Straight line, not diagonal. Technique wins, not aim."',
    condition: 'Win 60%+ of engagements through technique (not out-aiming) across 20-30 reps per angle.',
    location: 'Custom game, any map — 3-5 common angles per session',
    tags: ['Peek', 'Intermediate']
  },
  {
    id: 'pause-peek',
    category: 'peek',
    name: 'Pause-Peek (Priming the Angle)',
    videoUrl: 'https://www.youtube.com/watch?v=MkWKcQDznfM',
    short: 'Run up to angle, brief prime stop, then swing. Used by TenZ, Florescent.',
    source: 'w0rthyTV — "How To Hit CLEAN One Taps"',
    why: 'Running at full speed requires ~2 seconds of deceleration before reaching accurate stop. Pause-peeking removes that deceleration delay by briefly stopping at the entry point — you are already at near-zero velocity when you swing, so your first bullet is accurate from frame 1. The enemy still sees a fast peek because you built momentum before the pause.',
    error: 'Running straight into open angle with no pause (shooting error terrible). Exposing more than half your body. Stopping too far back (too slow).',
    explanation: 'Running at full speed then stopping takes ~2 extra seconds for full deceleration before you can shoot accurately. The pause-peek solves this: run up → brief stop at the entry point → swing out. The brief stop means you\'re shooting from near-stillness with maximum first-shot accuracy, while the momentum from the short run keeps your peek speed high. Drill: on a common angle like A main or catwalk, run up to the entry line, pause-peek, shoot, return. Aim for half-body or less exposed. Repeat 10-15 reps per angle. Watch your shooting error indicator — lines must go yellow on your swing.',
    cue: '"Run up. Here. Out." (3-beat rhythm)',
    condition: 'Pause visible in VOD. Shooting error shows yellow on swing. Half-body or less exposed per rep.',
    location: 'Custom game, common map angles (catwalk, A main, B main)',
    tags: ['Peek', 'Intermediate']
  },

  /* ─── AIM ─── */

  {
    id: 'five-step-warmup',
    category: 'aim',
    name: '5-Step 45-Min Aim Warm-Up',
    videoUrl: 'https://www.youtube.com/watch?v=TYJK849HVuA',
    short: 'Progressive range warm-up from static flicks to cover peeking.',
    source: 'w0rthyTV — "Best Way To Warm Up / Improve Aim In VALORANT"',
    why: 'Motor skills warm up in layers: fine motor control (finger precision) needs to activate before gross motor (full arm movement), and both need to be online before reactive tasks (live DM). Skipping straight to DM is like sprinting before stretching — you\'re practicing with degraded hardware. The 25-perfect-burst milestone exists because your nervous system needs confirmation of the pattern before it locks in.',
    error: 'Rushing through steps. Moving to medium/hard before accuracy is solid on easy. Skipping the 25-perfect-burst step.',
    explanation: 'Total: 45 minutes. Only progress Easy → Medium → Hard when accuracy is solid at current level. Step 1 (Easy bots, standing still): slow flicks to bot heads, 1 bullet each — feel the sensitivity, feel the head connection. Step 2 (Wall burst drill): stop-strafe into a wall (hold A → release → press D = full stop), fire a precise burst. Must achieve 25 PERFECT bursts in a row — reset count if any burst is imperfect. Step 3 (Counter-strafe into bots, Easy): apply step 2 movement to live bots. Stop-strafe → shoot heads. Do until comfortable. Step 4 (Peek from cover): peek straight out from behind wall, shoot head, return. Close range. Step 5 (Distance variation): same as step 4 but vary target distance — feel how accuracy changes (close = burst/tap OK; far = tap only).',
    cue: '"Accuracy first. Speed comes on its own."',
    condition: 'Complete all 5 steps through Hard mode within 45 minutes with consistent accuracy at each.',
    location: 'Practice range',
    tags: ['Aim', 'Beginner', 'Range', 'Warmup']
  },
  {
    id: 'ping-tracking',
    category: 'aim',
    name: 'Ping Tracking Drill',
    videoUrl: 'https://www.youtube.com/watch?v=dnX-3-QXRwI',
    short: 'Ping wall at head level, burst/tap onto it while moving — no drops below.',
    source: 'w0rthyTV — "THE AIM Mistake You Don\'t Know About"',
    why: 'Most players unconsciously apply a downward mouse drag during bursts — a habit from tracking body shots rather than head shots. This creates the "U-shape" pattern where the crosshair drops below the head after shot 2 or 3. The ping gives you an external reference point that reveals this habit instantly, because any U-shape is visually obvious against a static marker.',
    error: 'Crosshair drops below the ping (U-shape error). Pulling down on mouse during single taps. Not waiting for gun reset between bursts.',
    explanation: 'Place a ping on a wall at head level in the range or custom game. Move side to side, burst fire onto each ping — NEVER drop below it. Tap mode: one bullet per ping. Burst mode: 2-3 bullets, full stop, wait for gun animation to reset (crosshair returns to first-bullet position), then burst again. If crosshair drops below the ping → U-shape problem identified → restart, keep higher. This trains you to stop the "pull-down" reflex that most players incorrectly apply even to single-tap shots.',
    cue: '"Stay on the ping. Never go below."',
    condition: 'Zero crosshair drops below the ping across 50 taps or 20 bursts in a full session.',
    location: 'Practice range or custom game',
    tags: ['Aim', 'Beginner', 'Range']
  },
  {
    id: 'yoru-head-level',
    category: 'aim',
    name: 'Yoru Clone Head-Level Study',
    videoUrl: 'https://www.youtube.com/watch?v=EqWREHL4PCE',
    short: 'Place Yoru clone at each angle to see exact head level. Memorize visually.',
    source: 'w0rthyTV — "THE AIM Mistake You Don\'t Know About"',
    why: 'Head level is not constant — it changes based on terrain height, distance, and angle geometry. Guessing head level even by 5 pixels means your first shot misses without you understanding why. The Yoru clone gives a pixel-accurate reference that you can then commit to muscle memory through repeated visualization, which is more durable than conscious adjustment mid-fight.',
    error: 'Guessing head level. Not memorizing — just checking once and forgetting. Only doing it on maps you already play well.',
    explanation: 'In custom game with Yoru selected: place the clone at an angle you struggle with. The clone\'s head shows the exact pixel to pre-aim for that specific angle at that specific distance. Memorize: "Head level for this angle is HERE." Repeat for 5-10 commonly fought angles per session. Focus on your 3-map pool — not every map. Over time, your crosshair placement will become muscle memory rather than guesswork. This directly addresses the U-shape problem by teaching you where head level actually is before you ever start the fight.',
    cue: '"Where\'s the head level here? Lock it in."',
    condition: 'Can pre-place crosshair without conscious thought at memorized angles in ranked.',
    location: 'Custom game, any map',
    tags: ['Aim', 'Beginner', 'Range']
  },
  {
    id: 'deadzone-stop',
    category: 'aim',
    name: 'Deadzone Stop Timing',
    videoUrl: 'https://www.youtube.com/watch?v=edIzYSYt7Bw',
    short: 'Shoot in the 50–160ms window when character speed drops to zero.',
    source: 'w0rthyTV / n0ted — "Counter-Strafe Matters" / Fundamenty research',
    why: 'Valorant\'s accuracy system ties bullet spread directly to movement speed. While moving at full speed, spread can be 3-4x wider than standing still. The accuracy window opens the instant your velocity crosses near-zero — not when you feel stopped. This is why counter-strafing helps: it accelerates velocity back through zero, shortening the dead zone window from ~89ms to ~50ms. Training this timing is not optional — it\'s the physical basis of every duel.',
    error: 'Shooting while still moving (blue error lines). Waiting too long after stop. Jitter from over-counter-strafing.',
    explanation: 'In Valorant, your character reaches full accuracy when movement speed drops to near-zero. This happens either by releasing the movement key (~89ms for Vandal) or counter-strafing (pressing opposite key, ~50ms). The difference is only ~20ms — use whichever keeps your crosshair stable. Enable the shooting error graph in the range. Strafe A, release or counter-strafe D, shoot ONLY when lines are yellow. For the Sheriff drill (from n0ted): strafe exactly 1 unit, immediately press counter-strafe key + click simultaneously. If timing is correct, blue accuracy lines cluster tightly. Progress to 2-unit strafes once 1-unit is consistent.',
    cue: '"Release — wait for yellow — click."',
    condition: 'Guardian DM: aim for >60% first-bullet headshots in 5-minute session. Sheriff: hit 1-unit strafe shots consistently before progressing.',
    location: 'Range (error graph on), then Guardian DM or Sheriff in-game',
    tags: ['Core', 'Movement', 'Guardian DM', 'Sheriff DM']
  },
  {
    id: 'tension-budget',
    category: 'aim',
    name: 'Tension Fizzle (Explosive Launch + Float)',
    videoUrl: 'https://www.youtube.com/watch?v=28yvjExaR80',
    short: 'Flick starts high tension. On arrival, physically release grip to "float".',
    source: 'Zasko — "3 Reasons You Keep Whiffing" / "why calm aim is the biggest lie"',
    why: 'High grip tension during a flick is correct for the launch phase — it generates speed. But maintaining that tension on arrival causes the mouse to overshoot the target because your grip is still pushing. Releasing grip as you arrive converts from "power mode" to "precision mode" mid-flick. This is the actual mechanism behind what pros describe as "floaty" or "calm" aim — it\'s not relaxation, it\'s tension release at the right moment.',
    error: 'Maintaining high grip tension through the entire flick. Over-flicking past the target. Holding grip tight near target = overflick oscillation.',
    explanation: 'There are two phases to every flick. Phase 1 (launch): explosive, directed — high grip tension is correct here. Phase 2 (arrival): as your crosshair approaches the target, physically release your grip and let the mouse "float." Holding high tension through arrival = over-flick. The correction that most pros describe as "floaty" or "calm" aim is actually this tension release at phase 2. Practice in Kovaak "Adjust Track" or "Aim Chainer" — when target changes direction, resist the impulse to hard-flick back. Place crosshair gently. Grip tight → release. Grip tight → release. Repeat.',
    cue: '"Explosive launch. Float on arrival."',
    condition: 'No hard overflick when target changes direction unexpectedly across 10 consecutive reps.',
    location: 'Kovaak (Adjust Track / Aim Chainer), then Valorant range strafing bots',
    tags: ['Aim', 'Intermediate', 'Any DM']
  },
  {
    id: 'n0ted-warmup-protocol',
    category: 'aim',
    name: 'n0ted 3-Exercise Kovaak Warmup',
    videoUrl: 'https://www.youtube.com/watch?v=IcJqOkxYFoc',
    short: 'Micro-adjust → flick prediction → strafe tracking. 30-40 min in Kovaak.',
    source: 'n0ted — "Radiant University EP.2 N0ted\'s Warmup"',
    why: 'The three exercises target three different neural subsystems: micro-adjustments train fine motor precision, flick prediction trains temporal anticipation (where the target will be), and strafe tracking with the edge technique trains your ability to use your own body movement as an aiming tool. Doing all three before ranked primes every relevant subsystem rather than just whichever one you feel like warming up.',
    error: 'Skipping exercise 1 (rushing to harder content). Chasing score instead of rep quality. Not micro-correcting after overflicks.',
    explanation: 'Playlist: search "KovaaKsBottingJumboBattlepass" in Kovaak online playlists (or bit.ly/N0ted). Three exercises, 10-20 min each. Exercise 1 (Micro-Adjust Horizontal Lines): slow start, side-to-side along horizontal line, aim HIGHER than default, increase speed gradually, after every overflick — micro-correct (the correction is the rep). Cue: "Flick then micro-correct." Exercise 2 (Flick Prediction on Bot Spawn): stay at back of range, wait and listen for bot audio cue, flick to where you PREDICT bot will be — perfect horizontal line to head level, micro-adjust if overshot. Use Sheriff (no bullet spam) for accountability. Cue: "First flick correct, or micro-correct. Two acceptable outcomes." Exercise 3 (Strafe Tracking with Edge Technique): strafe left-right while tracking bot head, place crosshair on the OPPOSITE edge of head from your strafe direction — the movement brings crosshair onto head naturally. Cue: "Edge of head, opposite side of your movement."',
    cue: '"Micro-correct every miss. The correction IS the rep."',
    condition: 'Can apply same feeling in Valorant range immediately after session. ~80% accuracy target per exercise.',
    location: 'Kovaak Aim Trainer — KovaaKsBottingJumboBattlepass playlist',
    tags: ['Aim', 'Intermediate', 'Range', 'Warmup']
  },
  {
    id: 'sheriff-drill',
    category: 'aim',
    name: 'Sheriff Counter-Strafe Drill',
    videoUrl: 'https://www.youtube.com/watch?v=edIzYSYt7Bw',
    short: '1-unit strafe, counter-strafe + shoot simultaneously. No forgiveness.',
    source: 'n0ted — "Counter-Strafe Matters.. MORE THAN YOU THINK"',
    why: 'The Sheriff exposes every timing error because it has no forgiveness: a shot 20ms early is a full miss. When you can hit consistent 1-unit strafe shots with the Sheriff, the same timing with a Vandal feels trivially easy. This is the same principle as training with a heavier weight so the game weight feels lighter. The Sheriff drill trains your nervous system to fire at the exact millisecond of velocity zero.',
    error: 'Shooting before counter-strafe is registered. Strafing more than 1 unit (too much deceleration time). Using Vandal/Phantom as a crutch instead.',
    explanation: 'Setup: Valorant range, 100 bots on strafe, equip Sheriff. Step 1: strafe exactly 1 unit (press D). Step 2: immediately press A (counter-strafe) + click/shoot at the same time as pressing A. Step 3: if timing is correct, blue accuracy lines cluster tightly around your shot. Repeat the rhythm: D press → A press + shoot → D press → A press + shoot. Progress to 2-unit strafes only after 1-unit is consistent. If you can hit this drill with the Sheriff, Vandal and Phantom will feel like cheating. The Sheriff removes all forgiveness — every timing error is immediately visible as a miss.',
    cue: '"Press A + click. Same input. Same time."',
    condition: 'Hit 10 consecutive 1-unit strafe shots with the Sheriff before progressing to 2-unit.',
    location: 'Valorant practice range (shooting error graph on)',
    tags: ['Aim', 'Intermediate', 'Sheriff DM']
  },
  {
    id: 'strafe-shoot-style',
    category: 'aim',
    name: 'Strafe-and-Shoot Timing Drill',
    videoUrl: 'https://www.youtube.com/watch?v=ZRUq_kmDBPc',
    short: 'Fire 1–2 bullets at each direction change. A→D window. Never spray.',
    source: 'n0ted — "*No Bs* How to STRAFE & SHOOT n0ted style"',
    why: 'Continuous movement while shooting seems impossible in Valorant because most players try to shoot between direction changes. n0ted\'s method is the opposite: shoot at the direction change — precisely because that\'s the moment of minimum velocity. The enemy sees you moving continuously but your bullets are hitting. This is a technical exploit of Valorant\'s movement accuracy curve that becomes a real skill gap against players still trying to full-stop.',
    error: 'Firing while still building to max speed. Pressing W+D or W+A together (slows you). Spraying more than 2 bullets per window. Lifting fingers from keyboard.',
    explanation: 'This trains n0ted\'s signature shoot-while-strafing method. Build to max speed before engaging (strafe A or D only — never W+A or W+D). At the direction change (A→D or D→A): fire 1-2 bullets within ~50-100ms of the key press. This is the "dead zone" — the moment of minimum velocity when bullets are accurate. Never lift fingers from keyboard — the transition from A to D is a simultaneous press, not a lift-and-move. Phantom: allows 2-3 bullets per window. Vandal: 1 bullet max per window (tight timing). After shooting, continue strafing — never hold still. Practice in range for 10 min, then apply in Ghost DM.',
    cue: '"D to A is where the bullet goes straight. Shoot at the change."',
    condition: 'In Ghost DM: all kills via 1-2 shot bursts at direction changes — zero standing-still shots.',
    location: 'Valorant range → Ghost DM',
    tags: ['Aim', 'Advanced', 'Ghost DM']
  },
  {
    id: 'uncomfortable-flick',
    category: 'aim',
    name: 'Uncomfortable Position Flick Drill',
    videoUrl: 'https://www.youtube.com/watch?v=gR-JNjFg9B8',
    short: 'After kill, stay in that crosshair position. Next rep is from there.',
    source: 'n0ted — "Radiant University EP.3 The TRUTH on Why YOU Keep WHIFFING"',
    why: 'Ranked games never give you comfortable starting positions — enemies appear when your crosshair is already displaced from clearing the last angle. Standard aim training always resets to center, so your "comfortable" flick is a skill that only exists in training. By removing the reset, you build the exact skill the game actually demands: accurate flicks from unpredictable starting angles.',
    error: 'Always resetting crosshair to center after each kill. Only practicing close-range, comfortable positions. Chasing score instead of angle variety.',
    explanation: 'Most players practice flicks from comfortable close-range positions. Real games happen at mid-to-long range from unexpected angles. Drill: in Kovaak or range, after killing a bot, do NOT re-center your crosshair. Stay exactly where it landed. When the next bot spawns, you must flick from that uncomfortable angle. Phase 1 (Wrist Domination): pick a physical reference (edge of mousepad), flick as fast as possible for 180° sweeps — full wrist motion, don\'t care about misses, let wrist teach itself. Phase 2 (Straight Lines): after wrist exercise, transition to precise straight horizontal lines, full wrist, no rushing. Phase 3 (Uncomfortable positions): the main drill — follow bot spawn without resetting.',
    cue: '"The game won\'t let you reset. Practice shouldn\'t either."',
    condition: 'Complete 15+ reps at varied crosshair positions without a single center-reset.',
    location: 'Kovaak — any aim scenario, or Valorant range',
    tags: ['Aim', 'Intermediate', 'Range']
  },
  {
    id: 'target-transitions',
    category: 'aim',
    name: 'Target Transitions (Delusional Trust)',
    videoUrl: 'https://www.youtube.com/watch?v=8YRiCtEByHA',
    short: 'Assume T1 is dead. Snap to T2 with zero delay — before kill animation.',
    source: 'Zasko — "Mada Makes Fragging EFFORTLESS"',
    why: 'Waiting 150–200ms for the kill animation before engaging the next target is one of the most measurable performance gaps between high-Immortal and Radiant. Mada\'s "delusional trust" framework flips the logic: assume the first shot worked, move on instantly. Even if you missed, you are now in a better position for target 2. The 150ms saved on every multi-kill compounds across every round you play.',
    error: 'Waiting 150–200ms to visually confirm the first kill before switching. This delay costs the second fight.',
    explanation: 'When facing multiple enemies: shoot target 1, ASSUME it\'s dead, snap to target 2 immediately. Do not wait for the kill animation or audio cue. Mada\'s protocol: shoot first target → assume kill → immediately aim second (removes 150-200ms wait). Practice in custom: face two dummy positions, fire one shot at the first, immediately flick to the second. The crosshair should reach T2 before T1\'s death animation plays. Build the reflex of fire → move → evaluate, not fire → evaluate → move.',
    cue: '"Fire and forget. Next target immediately."',
    condition: '3 double-kills in DM within 5 minutes where your crosshair reaches T2 before T1 death animation plays.',
    location: 'Custom game or chaotic DM',
    tags: ['Aim', 'Advanced']
  },
  {
    id: 'mass-protocol-dm',
    category: 'aim',
    name: 'MASS Protocol DM',
    videoUrl: 'https://www.youtube.com/watch?v=6j24Kextt0k',
    short: 'Every kill: Move → Aim → Stand Still → Shoot. No exceptions.',
    source: 'w0rthyTV — "How To Aim Like Florescent" / "Why Your Movement Sucks Not Your Aim"',
    why: 'Florescent analysis showed that 22 of 24 rounds required no aim correction at all — the crosshair was already on the head from movement alone. Flicking is the symptom of arriving somewhere without your crosshair already prepared. MASS Protocol retrains the order of operations so movement does 90% of the aiming work and the remaining 10% is a tiny micro-adjustment, not a flick across the screen.',
    error: 'Flick kills (crosshair was not pre-set by movement). Standing still and shooting. Winning the fight through aim rather than movement-based crosshair placement.',
    explanation: 'MASS = Move, Aim, Stand Still, Shoot. This is w0rthy\'s framework for Florescent\'s mechanics: out of 24 rounds reviewed, only 2 were actual flicks (both from bad positioning). Step 1 Move: use WD keys to enter the fight, create angle, get to position — movement IS the aim (90% of winning). Step 2 Aim: small crosshair adjustment at relative head level. Step 3 Stand Still: stop momentum before firing (shadow step or full stop). Step 4 Shoot: tap or burst, not spray. Practice full DM sessions where every single kill follows MASS. Any flick kill = the rep didn\'t count.',
    cue: '"Move first. Never flick. Movement places the crosshair."',
    condition: 'Full DM session (10-15 min) where every kill is Move→Aim→Stop→Shoot. Flick kills noted and counted.',
    location: 'Deathmatch, Ghost or Sheriff preferred',
    tags: ['Aim', 'Core', 'Ghost DM', 'Sheriff DM']
  },
  {
    id: 'odin-head-height',
    category: 'aim',
    name: 'Odin Head-Height Calibration',
    videoUrl: 'https://www.youtube.com/watch?v=1s9OR1Ckj-E',
    short: 'Fire Odin burst at angle, run back, pre-aim the bullet holes — your exact head level.',
    source: 'Zasko — "3 Simple Ways To Improve Your Crosshair Placement"',
    why: 'Most crosshair placement errors come from imprecise head-level guesses that drift 10–20 pixels high or low depending on terrain. The Odin leaves a visible hole pattern at the exact height your crosshair was. Running back and pre-aiming that hole teaches you the correct absolute height for that angle through kinesthetic memory rather than abstract visual estimation.',
    error: 'Doing this once and not repeating for different terrains. Using auto-fire instead of a controlled burst. Checking the holes from wrong distance.',
    explanation: 'Setup: Custom game, any map, equip Odin (high ammo, clear wall marks). Step 1: Walk to the exact peek position you struggle with in ranked. Step 2: Aim at the wall in the direction the enemy would be. Step 3: Fire a controlled 3-5 bullet burst at head height (your best guess). Step 4: Run back to your normal approach distance. Step 5: Pre-aim the bullet hole you left — that is the calibrated head level for this angle. Repeat 5x per session on your 3-5 hardest angles. Transfer: in your next ranked game, recall the bullet-hole position before peeking.',
    cue: '"Where did the holes land? Pre-aim that spot."',
    condition: 'Can pre-aim 5 memorized angles within 1 second of approach without hesitation in ranked.',
    location: 'Custom game, your 3-map pool',
    tags: ['Aim', 'Beginner', 'Range']
  },
  {
    id: 'primie-burst-drill',
    category: 'aim',
    name: 'Primie Burst Drill (Shoot → Move, Zero Gap)',
    videoUrl: 'https://www.youtube.com/watch?v=kJksoAh4Jcg',
    short: 'Shoot, then move with literally zero milliseconds of pause between.',
    source: 'Zasko — "How To ACTUALLY Burst Like PRIMMIE"',
    why: 'Primie\'s signature style is not about accuracy — it\'s about never giving the enemy a static target. Every shot must trigger immediate movement, which forces the enemy to constantly readjust their aim. The 200ms pause most players have after shooting (waiting to see if they hit) is free standing-still time for the enemy to trade. Eliminating that pause is one of the highest-value mechanical changes you can make below Immortal.',
    error: 'Pausing after each shot to evaluate the hit. Shooting then checking the kill feed. Bursting more than 4 bullets before moving (inaccuracy spikes after shot 4).',
    explanation: 'The rule is simple: shoot → press a movement key at exactly the same time (0ms delay). Not "shoot, check, move." Always. Even on misses. Practice in the Valorant range: fire 1 shot at a bot → immediately tap D or A. The movement key press must feel like part of the same action as the mouse click. Apply in DM: fire → move. Fire → move. Zero evaluation window. Build to speed: eventually you can burst 3-4 bullets then instantly strafe, giving the enemy a burst of fire that immediately disappears. Primie-style: burst limit is 4 bullets max — then directional change back to cover.',
    cue: '"Click and move. Same frame. No checking."',
    condition: 'Full DM session where you never stand still for 2+ frames after any shot.',
    location: 'Valorant range → any DM',
    tags: ['Aim', 'Core', 'Any DM']
  },
  {
    id: 'kovaak-transfer',
    category: 'aim',
    name: 'Kovaak → Game Transfer Protocol',
    videoUrl: 'https://www.youtube.com/watch?v=yvRvu6pZ3EM',
    short: 'Kovaak feel → range → custom → DM. Copy-paste the sensation at each step.',
    source: 'Zasko — "Fixing his SHAKY AIM in just 30 minutes"',
    why: 'Aim training in Kovaak builds isolated skill in an artificial environment. The transfer problem — where players can\'t replicate Kovaak performance in ranked — is caused by failing to bridge the contexts. Each step in this protocol reduces the novelty gap slightly: range is closer to real movement, custom removes DM chaos, DM adds enemies. The goal is to carry the exact physical sensation from step to step, not the score or results.',
    error: 'Jumping straight from Kovaak to ranked with no bridge step. Treating each step as a separate activity instead of a continuous feeling transfer.',
    explanation: 'Step 1 (Kovaak): pick ONE scenario type (flicking, tracking, or evasive). Run 10-15 min in free play. Focus on the physical sensation — how does your hand feel when you are doing it correctly? Name it: "floaty," "snappy," "grounded." Step 2 (Valorant range): immediately open range and replicate that same feeling on bots. Do NOT adjust sensitivity or grip — copy the feeling. Step 3 (Custom game): play a custom game alone and find a fight where that feeling shows up naturally. Note the exact moment it clicks. Step 4 (DM): enter DM carrying that feeling. Treat first 2 minutes as a "feeling check" — am I doing it right? Step 5 (Ranked): the feeling is now the one cue you bring into ranked.',
    cue: '"Copy the feeling, not the score. Feel it in each step."',
    condition: 'Can describe in one sentence exactly what the correct physical feeling is. Can identify when you have it and when you don\'t in a DM session.',
    location: 'Kovaak → practice range → custom → DM',
    tags: ['Aim', 'Intermediate', 'Range']
  },

  /* ─── MOVEMENT ─── */

  {
    id: 'anti-mirror-dodge',
    category: 'movement',
    name: 'Anti-Mirror Dodge',
    videoUrl: 'https://www.youtube.com/watch?v=wgQHZjy6TxA',
    short: 'After shooting, strafe OPPOSITE to enemy movement. Never mirror.',
    source: 'Zasko — "why you\'re getting destroyed when angle holding" / n0ted',
    why: 'When you mirror the enemy\'s strafe direction, their tracking becomes trivially easy because your relative motion is zero — you appear static to their aim. Strafing opposite forces them to stop their current tracking motion and reverse direction, which adds a minimum 100–150ms cognitive delay. This is the mechanical basis for making yourself difficult to hit without doing anything mechanically complex.',
    error: 'Standing still after missing. Mirroring the enemy\'s strafe (gives them a static target). Waiting for visual kill confirmation before moving.',
    explanation: 'When holding an angle in the open and you miss your first shot: do NOT mirror the enemy\'s strafe. If they went right and you go right — that\'s mirroring, it\'s predictable. Go opposite (anti-mirror). This forces the enemy to recalibrate their aim track, resets their reaction time advantage, and keeps you evasive. Your LMB click must be INSTANTLY followed by a movement key — 0ms delay. Practice in DM: after every shot, immediately press a direction key. The direction should be opposite to enemy movement. No looking at kill feed. No hesitation.',
    cue: '"Click — move opposite — reset."',
    condition: '5 consecutive duels in DM where every shot is followed by immediate lateral movement, opposite to enemy direction.',
    location: 'Any DM',
    tags: ['Movement', 'Intermediate']
  },
  {
    id: 'lmb-to-cover',
    category: 'movement',
    name: 'LMB = Back to Cover',
    videoUrl: 'https://www.youtube.com/watch?v=wgQHZjy6TxA',
    short: 'Every click is immediately followed by cover retreat. Reflexive.',
    source: 'Zasko — "Shoot-and-Fallback Reflex" / "How to ACTUALLY angle hold properly"',
    why: 'Standing still after firing is the single most common mechanical death in sub-Immortal. The enemy has peeker\'s advantage and is still tracking you while you are reading the kill feed. Treating LMB as the trigger for a movement key converts shooting from a static act to a dynamic one. After building this reflex, you are never in open space after a shot — which means every trade requires the enemy to flick to your new position.',
    error: 'Standing still after firing. Waiting 200ms to see if you got the kill. Exposing yourself to trade kills.',
    explanation: 'Program a hard mental reflex: Left Mouse Button = fire + immediately strafe to cover. These must happen in the same motion — 0ms delay between fire and retreat. Waiting to visually confirm the kill before moving costs 150–200ms and allows the enemy to trade you. If cover is unavailable, trigger the anti-mirror dodge instead. Practice in the range: fire 2 shots at a bot → immediately tap A or D to strafe before checking the result. Do NOT look at the kill feed. Drill this 50 times in range. Then apply in DM: every single shot triggers immediate movement, no exceptions.',
    cue: '"Click and move. Same motion."',
    condition: '10 consecutive kills in DM where you never stand still for more than 200ms after firing.',
    location: 'Range → Any DM',
    tags: ['Peek', 'Core', 'Any Level']
  },
  {
    id: 'shoot-then-move',
    category: 'movement',
    name: 'Shoot-Then-Move (Zero Gap)',
    videoUrl: 'https://www.youtube.com/watch?v=wgQHZjy6TxA',
    short: 'Fire, then IMMEDIATELY press a movement key. Dead time = 0ms.',
    source: 'Zasko — "How To ACTUALLY Burst Like PRIMMIE" / "How To ACTUALLY Move In Valorant"',
    why: 'The 200ms post-shot pause is a deeply wired habit from FPS games where looking at the kill feed is necessary for economy decisions. In Valorant, that habit costs you survivability every single fight. By programming the "shoot = move" reflex, you automatically position yourself out of the pre-aimed crosshair of any trading enemy before they can react to your shot.',
    error: 'Pausing after shot to check hit. Moving then stopping then moving (the 200ms linger habit). Not having a movement key ready before shooting.',
    explanation: 'The most common mistake after firing: pause to evaluate. This 200ms gap is free time for the enemy to trade or reposition. The rule: fire, then INSTANTLY press a movement key. Not "fire, check, then move." Not "fire, see miss, then move." Always. Even if you got the kill — move. Practice: in Valorant range, fire at a bot → press D immediately → fire again → press A immediately. The motion is fire+move as one fluid impulse. Then apply in DM. Zasko calls this "shoot then move, instantaneously; no checking bullet, no hesitation."',
    cue: '"Shoot is the trigger for move. Same frame."',
    condition: 'Full DM session where you never stand still for 2+ frames after shooting. Zero post-shot pauses.',
    location: 'Range → Any DM',
    tags: ['Movement', 'Core', 'Any DM']
  },
  {
    id: 'deliberate-dm',
    category: 'movement',
    name: 'Deliberate DM (Gym Reps Protocol)',
    videoUrl: 'https://www.youtube.com/watch?v=8YRiCtEByHA',
    short: 'Treat every DM peek like a ranked angle. 1-second pause. Far back. 1v1 only.',
    source: 'Zasko — "before you queue, PLEASE do this" / w0rthyTV Measured Fights Protocol',
    why: 'Mindless DM reinforces whatever habits you already have — including the bad ones. The 1-second pause before each angle is deliberate practice: it forces your brain into conscious mode where a new pattern can be laid down. Research shows motor learning requires focused attention to the correct form; automaticity comes after the pattern is installed, not before.',
    error: 'Running around mindlessly. Fighting while exposed to multiple angles. Ignoring kills that were "wrong" reps. Chasing score.',
    explanation: 'Deathmatch should be treated like structured gym reps — slow, deliberate, form-perfect angle clearing. Rules: (1) Tiny 1-second pause between every angle — believe someone is there before peeking. (2) Set up far back from each angle — expose yourself to ONE enemy at a time, not multiple. (3) Peek → micro-adjust → shoot — never move to next angle while mid-fight. (4) Ignore getting shot in the back — reset and maintain perfect form. (5) Wrong reps don\'t count — if you won via a flick or standing still, note it and replay the angle correctly. Zasko\'s daily session: Pre-DM visualizer (watch 2-5 min of a coach\'s DM recording) → warm-up DMs → 3 structured DMs post-comp with deliberate form.',
    cue: '"Every angle: pause, believe someone\'s there, then peek."',
    condition: 'Can send a 5-min DM recording where every single peek has a visible pause and far-back setup.',
    location: 'Deathmatch (any)',
    tags: ['Movement', 'Core', 'Any DM', 'Warmup']
  },
  {
    id: 'dm-minimap-habit',
    category: 'movement',
    name: 'DM Minimap Respawn Habit',
    videoUrl: 'https://www.youtube.com/watch?v=k8B7x5jH_lI',
    short: 'Every respawn with shield: freeze, read minimap, identify 2+ red dots before moving.',
    source: 'w0rthyTV — "How Radiants Look At The Radar/Minimap"',
    why: 'Radiants check the minimap at specific game states as a reflex — post-respawn, post-cover, post-kill. The DM shield window is a controlled opportunity to practice the exact minimap-first reflex without ranking pressure. After 20+ sessions of this habit, you automatically check minimap at these same moments in ranked without conscious thought.',
    error: 'Immediately running after respawn. Never checking minimap. Entering fights without knowing enemy positions.',
    explanation: 'Every time you respawn in DM with the spawn shield active, DO NOT move. Use the shield time to look at the minimap and identify all visible red dots before you start hunting. This trains the exact skill needed in ranked: reading minimap before entering a fight. It forces the "Passive Mode → Active Mode" transition at every life. Build muscle memory of flicking to minimap at specific game states: post-spawn, post-kill, post-cover. After a full session of this, you\'ll automatically check the minimap in ranked without thinking.',
    cue: '"Respawn → minimap → hunt."',
    condition: 'Can name 2+ enemy positions from minimap before engaging on every single respawn during a DM session.',
    location: 'Any deathmatch mode',
    tags: ['Movement', 'Beginner', 'Any DM']
  },

  /* ─── MENTAL ─── */

  {
    id: 'breath-reset',
    category: 'mental',
    name: 'Breath Before Swing',
    videoUrl: 'https://www.youtube.com/watch?v=4xCvMqSB6w8',
    short: 'One deep exhale before every intentional peek. Drops heart rate on demand.',
    source: 'w0rthyTV / Fundamenty — diaphragmatic regulation + Sheriff DM practice',
    why: 'Elevated heart rate causes the muscles around your wrist and fingers to tighten involuntarily. At 120+ BPM this effect reduces fine motor precision by up to 80%. A single diaphragmatic exhale activates the vagus nerve, which drops heart rate by 5–15 BPM within seconds. This is a medical mechanism, not a mental trick — it physically restores the motor control you need for the shot.',
    error: 'Elevated heart rate causes "lifting" — physical muscle tension that loses 80% of fine motor control. Panic = spray, jitter, over-flick.',
    explanation: 'Before every intentional peek (not reactive fights), take one diaphragmatic exhale. Exhale slowly — 4-6 seconds. This activates the parasympathetic nervous system, drops heart rate by 5–15 bpm, and restores fine motor precision. Practice in Sheriff DM: take a breath before every single engagement for one full session. The high-stakes nature of the Sheriff (miss = lose the fight) makes composure immediately measurable. Zasko notes that exhaling just before the shot produces measurably better grouping. This becomes a drillable habit when practiced in Sheriff DM consistently over multiple sessions.',
    cue: '"Exhale — then peek."',
    condition: 'Full Sheriff DM session (10 min) with one breath before every fight. Note the composure difference versus your normal DM.',
    location: 'Sheriff DM, ranked clutches',
    tags: ['Mental', 'Any Level', 'Sheriff DM']
  },
  {
    id: 'green-mode-lock',
    category: 'mental',
    name: 'Green Mode Lock (One Cue Rule)',
    videoUrl: 'https://www.youtube.com/watch?v=k1dXzO0RIBc',
    short: 'Before ranked: choose exactly ONE cue. Apply it round 1. Then forget mechanics.',
    source: 'Zasko — "This Subtle Mistake WASTES So Much Time.." / Green/Pink Mindset',
    why: 'Motor skills (aiming, movement) are executed by your cerebellum and basal ganglia — not your prefrontal cortex (the conscious thinking part). Consciously analyzing aim technique mid-gunfight routes processing through the wrong brain region, which is always slower and degraded compared to automatic execution. Green mode is deliberately suppressing the prefrontal cortex so the faster, trained motor system can operate unimpeded.',
    error: 'Bringing analytical (Pink) thinking into ranked games. Thinking about crosshair position mid-gunfight. Trying to apply 3+ cues at once.',
    explanation: 'Green mindset = pure performance mode. Flow state, intuition, no conscious thought about mechanics. Pink mindset = analytical — for drills, VOD review, range. NEVER Pink during ranked. The fix: before queuing, choose exactly ONE cue from your current drill. Apply it consciously in round 1. Then go Green — play chess, not mechanics. Between rounds: mute game sound, breathe deep, loosen shoulders, release mouse tension. Reset to Green. If you find yourself thinking "where is my crosshair?" during a gunfight — you are in Pink during Green time. This must be practiced as a habit: one cue → trust → Green.',
    cue: '"One cue before queue. Then forget mechanics — play chess."',
    condition: 'Complete 3 ranked games without consciously analyzing aim technique mid-gunfight. Track this in your session log.',
    location: 'Ranked',
    tags: ['Mental', 'Core', 'Any Level']
  },
  {
    id: 'five-why-review',
    category: 'mental',
    name: '5-Why Post-Death Review',
    videoUrl: 'https://www.youtube.com/watch?v=8YRiCtEByHA',
    short: 'After a confusing death: ask "why?" five times to reach the root cause.',
    source: 'Zasko — "You\'ll Never Rank Up Until You Fix This"',
    why: 'The first answer to "why did I die?" is almost always surface-level ("I missed") and addresses only the symptom, not the cause. Surface-level analysis leads to surface-level training decisions. The 5-Why technique, originally from Toyota\'s production system, consistently reaches the underlying structural problem within 5 layers. In Valorant this transforms "I missed" into actionable insights like "I don\'t pre-visualize before peeking B main."',
    error: 'Stopping at "I missed" or "I peeked wrong." The surface answer is never the root cause.',
    explanation: 'After each death in VOD review: ask "why?" five times. Example: Why did I die? → I missed the shot. Why did I miss? → I was moving when I fired. Why was I moving? → I panicked after hearing footsteps. Why did I panic? → I didn\'t pre-visualize the scenario. Why didn\'t I pre-visualize? → I wasn\'t in the right mental state before peeking. Root cause: missing pre-peek mental preparation, not aim. This transforms post-game review from blame ("I missed") into insight ("I need to pre-visualize before pushing B"). One death, five whys, one written insight per session.',
    cue: '"Why? Why? Why? Why? Why? — then write the root."',
    condition: 'Complete one 5-Why chain per VOD review session. Write the root cause in the Tracker. Over 5 sessions, patterns will emerge.',
    location: 'Post-session VOD review',
    tags: ['Mental', 'Intermediate', 'Any Level']
  }
];

/* ═══════════════════════════════════════════════
   DATA — CONCEPTS
   Frameworks, mental models, and principles.
   Each concept has WHY, rankThreshold, preview.
═══════════════════════════════════════════════ */

const CONCEPTS_BY_BLOCK = {
  block1: {
    title: 'Peeking & Angle Mechanics',
    subtitle: 'Core knowledge for every duel — how fights are opened, won, and lost.',
    items: [
      {
        name: 'Angle Advantage Rule',
        videoUrl: 'https://www.youtube.com/watch?v=eMk_GNeXE1I',
        source: 'Zasko — "3 Simple Ways To Improve Your Crosshair Placement"',
        rankThreshold: 'all',
        why: 'Whoever is closer to the corner gets revealed first — their body enters the opponent\'s screen before they can see the opponent\'s body. This is geometry, not aim. Understanding this means you can win duels before they start by simply adjusting your distance from the wall.',
        preview: 'Further from wall = spots enemy first. Ping your distance vs. enemy\'s. Closer to wall = disadvantage. Adjust: trace when advantaged, pre-aim or wide swing when not.'
      },
      {
        name: 'Trace vs. Pre-Aim Decision',
        videoUrl: 'https://www.youtube.com/watch?v=w_ao9DAeZyc',
        source: 'Zasko — "How (And When) To ACTUALLY Trace Angles"',
        rankThreshold: 'all',
        why: 'Using the wrong technique for your angle advantage is one of the most common mechanical errors. Tracing at a disadvantage angle means your crosshair lags behind and the enemy gets a free first shot. Pre-aiming when you have advantage means you hold a static position that the enemy can learn and pre-fire. The trace/pre-aim decision must be context-driven, not habitual.',
        preview: 'Trace = transitional state between holding and peeking (angle advantage). Pre-aim = for disadvantage positions. Speed controls depth: fast movement = tight to wall; slow = hold wide.'
      },
      {
        name: 'Acoustic-Based Hold Width',
        videoUrl: 'https://www.youtube.com/watch?v=iM5Q6bPh7ns',
        source: 'Zasko — "Stop GUESSING How Wide You Should Hold"',
        rankThreshold: 'all',
        why: 'Running footsteps reveal two key facts: the enemy is approaching (not lurking) and they are near full sprint speed. Wide-holding against a sprinting enemy is correct because their first shot will be inaccurate from movement, giving you the first-shot window. Silence means a lurker who has preemptively stopped — holding tight forces them to react to a pixel change rather than your silhouette.',
        preview: 'Running footsteps = hold WIDE (click timing). Silence / shift-walking = hold TIGHT (react to pixel change). Let audio dictate crosshair distance. Noise = wide; silence = tight.'
      },
      {
        name: 'Peeker\'s Advantage — How It Actually Works',
        videoUrl: 'https://www.youtube.com/watch?v=QNh0xj1EyH0',
        source: 'n0ted — "How RADIANT\'s Abuse Peekers Advantage" / w0rthyTV',
        rankThreshold: 'all',
        why: 'This is not a myth or a feel — it\'s a measurable stack of delays that compound. The peeker\'s action time (decision already made) vs. the holder\'s reaction time (still processing) plus server lag means the holder is always operating on outdated information. Knowing this changes how you approach both sides: as a peeker, go one step further. As a holder, move actively so the peeker becomes the reactor.',
        preview: 'The peeker sees enemy before enemy can respond. Stack of delays: your decision → input → internet → server → enemy screen → enemy brain → enemy shot. Go one step beyond the intended peek angle. Enemy screen shows you late — you\'ve already aimed and fired.'
      },
      {
        name: 'Poisoned Angles (Anti-Repeeking)',
        videoUrl: 'https://www.youtube.com/watch?v=rJsKx3HYEc0',
        source: 'Zasko — "How Canezerra Can BREAK The Rules"',
        rankThreshold: 'all',
        why: 'Human memory for spatial positions is fast and accurate. The moment you show yourself at an angle, the enemy has sub-100ms crosshair memory at that exact pixel. Re-peeking there gives them a pre-aimed first shot — you lose peeker\'s advantage and hand it to the defender. The angle is "poisoned" until you reset with utility or a completely different approach geometry.',
        preview: 'Once you\'ve peeked an angle, the enemy anchors crosshair at your height. Never re-peek same angle at same elevation — crouch, wide swing, or relocate. Break their crosshair conditioning.'
      },
      {
        name: 'Straight-Line Only Peeking (No Diagonal)',
        videoUrl: 'https://www.youtube.com/watch?v=Ku-n1bAV01Q',
        source: 'w0rthyTV — "You Move Like A Bot" / Knight Protocol',
        rankThreshold: 'all',
        why: 'Diagonal movement (WA or WD) triggers Valorant\'s speed penalty for simultaneous perpendicular inputs — your character moves slower AND your first-shot accuracy worsens. When entering a fight, both costs are catastrophic. Single-key movement (A or D only) maintains maximum speed and accuracy. If the corner geometry forces a diagonal approach, the Knight Protocol (forward then lateral) gives a straight-line peek from a different position.',
        preview: 'Diagonal movement (WA/WD) = slower speed + worse accuracy. Only use A or D when peeking. If tight corner prevents straight line: move slightly forward first, then strafe — like a chess knight.'
      },
      {
        name: 'Never Repeat an Angle Without Utility',
        videoUrl: 'https://www.youtube.com/watch?v=rJsKx3HYEc0',
        source: 'w0rthyTV — "Why You Get 1 Tapped Holding Angles"',
        rankThreshold: 'all',
        why: 'After you\'ve been seen at an angle, the enemy has your exact pixel memorized and will pre-fire it on your next approach. This is pattern recognition operating at millisecond speed — no amount of mechanical skill overcomes being pre-fired at the same location. Utility (flash, cloud, smoke) physically disrupts the visual information they\'re relying on. Without it, you are giving them a free first shot.',
        preview: 'After taking a fight on an angle, the enemy knows your exact pixel. Never return dry. Flash underneath first, or cloud burst, or move to a completely different angle. "Don\'t do it dry."'
      },
      {
        name: 'On-Angle vs. Off-Angle',
        videoUrl: 'https://www.youtube.com/watch?v=Plmts9TSpas',
        source: 'w0rthyTV — UFOs Framework / "How To Win ALL Your Gunfights With ANGLES"',
        rankThreshold: 'all',
        why: 'On-angles are locations where enemies have pre-built crosshair placement from repetition. At Ascendant+, pre-fires on common angles are trained muscle memory — you lose regardless of your reaction time because the enemy is already aimed. Off-angles remove this crosshair placement advantage entirely and convert the holder into the reactor. The value compounds with round time: the less time remaining, the more rushing enemies skip their off-angle checks.',
        preview: 'On-angles: where enemies pre-place crosshairs → fight by peeking in/out constantly. Off-angles: where enemies don\'t expect you → free peeker\'s advantage reversal. Round time matters: 15 sec left = rush = off-angle works; 1:20 left = methodical check = on-angle risk.'
      },
      {
        name: 'Peeking Mechanics Are a Combo, Not Improvisation',
        videoUrl: 'https://www.youtube.com/watch?v=QNh0xj1EyH0',
        source: 'Zasko — "you\'re killing your own aim" / "How to ACTUALLY angle hold properly"',
        rankThreshold: 'all',
        why: 'Improvised peeking has high variance — sometimes it works, usually it doesn\'t. Pre-programmed "if-then" combos (slice → condition → wide swing) remove improvisation and decision latency from the equation. The combo fires automatically under pressure because it was installed through deliberate practice, not assembled in real-time. This is why Zasko compares it to Muay Thai: a trained fighter doesn\'t think about their combinations mid-fight.',
        preview: '4 tools: Slice, Wide Swing, Angle Hold, Jiggle/Jump peek. Never open with wide swing (no info). Always slice first (info + condition). Wide swing requires a setup. Treat combos like Muay Thai: pre-programmed if-then sequences, not improvised chaos.'
      },
      {
        name: 'Left-Side Penalty Awareness',
        videoUrl: 'https://www.youtube.com/watch?v=QNh0xj1EyH0',
        source: 'n0ted — "Radiant University EP.4 noted\'s peeking guide"',
        rankThreshold: 'sub-immortal',
        why: 'The gun model sits on the right side of the screen. On a left-side peek, your model is exposed to the enemy before your crosshair reaches them — the physics of the camera offset work against you. Right-side peeks have the opposite geometry. Understanding this means you should actively seek right-side angles, and when forced onto a left side, use utility or shoulder baiting to compensate before committing.',
        preview: 'Gun model is offset right. Left-side peeks expose more of your body before you see the enemy. Right-side peeks preferred. For unavoidable left-side peeks: shoulder bait + wide swing, or flash. Always stand far from wall to maximize angle advantage on either side.'
      },
      {
        name: 'Knight Protocol (L-Shape Peeking)',
        videoUrl: 'https://www.youtube.com/watch?v=qaSCdJRuYRs',
        source: 'w0rthyTV — "You Move Like A Bot (Movement Guide)"',
        rankThreshold: 'all',
        why: 'Tight corners naturally tempt diagonal movement because the geometry seems to require it. But pressing both WA or WD simultaneously cuts your speed and degrades first-shot accuracy at the worst possible moment. The Knight move (forward a step, then lateral) gives you the same angle exposure with straight-line movement — faster, more accurate, and harder for the enemy to track.',
        preview: 'When tight walls prevent a straight-line peek: move slightly forward to create separation, then strafe laterally — like a chess knight\'s L-shape. Eliminates the diagonal movement penalty (WA/WD) while still clearing the angle.'
      },
      {
        name: 'Overstaying Your Welcome',
        videoUrl: 'https://www.youtube.com/watch?v=1Mmi3ka50SM',
        source: 'w0rthyTV — "Why You CANT Hold Angles In VALORANT"',
        rankThreshold: 'all',
        why: 'Each additional second in a compromised position increases the probability of a coordinated push or a utility flush. Your life is worth two points: the body and the position it controls. Dying while overstaying costs both. The moment you\'ve extracted value (a kill, information, or a forced rotate), the math says leave — because the value of staying drops to near-zero while the risk stays at 100%.',
        preview: 'After a kill or utility use, leave immediately. Your life = 2 points (body + position). Every second extra drops your escape probability. Signs you\'re overstaying: spent utility, multiple enemies aware, team committed elsewhere.'
      }
    ]
  },
  block2: {
    title: 'Movement & Mechanics Physics',
    subtitle: 'What actually happens to your character\'s accuracy and speed — the science under the mechanics.',
    items: [
      {
        name: 'Movement Speed Curve',
        videoUrl: 'https://www.youtube.com/watch?v=Ku-n1bAV01Q',
        source: 'n0ted — "Valorant Movement MASTERCLASS" / "Counter-Strafe Matters"',
        rankThreshold: 'all',
        why: 'Valorant\'s accuracy isn\'t binary (moving vs. stopped) — it follows an exponential deceleration curve. This means accuracy begins to recover before you reach a full stop, and the recovery happens fastest in the first ~50ms of a direction change. Knowing this lets you deliberately shoot earlier in the deceleration window rather than waiting for a full stop that takes twice as long.',
        preview: 'Speed follows an exponential curve, not linear. Accuracy window exists at the instant of direction change (near-zero velocity). Shoot during deceleration phase of the curve — not during acceleration. Counter-strafing tightens bullet clusters ~30% vs. release-only.'
      },
      {
        name: 'Shadow Stepping (2-Step Rule)',
        videoUrl: 'https://www.youtube.com/watch?v=Ku-n1bAV01Q',
        source: 'w0rthyTV — "Movement & Peeking Mastery"',
        rankThreshold: 'all',
        why: 'Three steps triggers Valorant\'s footstep audio system. Two steps does not — you are moving at sprint speed but producing zero audio. This is not a bug, it\'s a game mechanic that Radiant players exploit deliberately. Shadow stepping allows silent repositioning at angles without the audio warning that lets enemies pre-fire or dodge.',
        preview: '1–2 steps in any direction = silent + full accuracy on direction change. 3+ steps = audible footsteps + shooting error blue line. Shadow step is not walking — it\'s short burst sprinting that stays under the noise/inaccuracy threshold.'
      },
      {
        name: 'Crosshair Acceptance Rule',
        videoUrl: 'https://www.youtube.com/watch?v=edIzYSYt7Bw',
        source: 'Zasko — "You\'re Making Gunfights WAY Harder Than They Should Be"',
        rankThreshold: 'all',
        why: 'Mid-motion crosshair correction creates a curved, chaotic path that is nearly impossible to control precisely. Stopping completely first converts the correction into a linear micro-flick — which is a fundamentally simpler movement your fine motor system can execute with high precision. The "Goalie Stance" analogy: a still goalkeeper can dive in any direction; one already leaning can\'t redirect.',
        preview: 'During a peek, if crosshair lands slightly off — DO NOT fix it mid-motion. Stop completely. Accept where it landed. Execute ONE clean micro-flick after full stop. Moving the mouse while strafing = messy curved path. Stop → one linear flick = clean.'
      },
      {
        name: 'Vandal vs. Phantom Mechanics',
        videoUrl: 'https://www.youtube.com/watch?v=ZRUq_kmDBPc',
        source: 'Fundamenty / n0ted',
        rankThreshold: 'all',
        why: 'The Vandal and Phantom have different forgiveness windows at the dead zone. Phantom allows 2-3 bullets per direction change window (~80ms); Vandal allows only 1 bullet (~50ms). Training Phantom builds timing intuition and volume; training Vandal forces timing precision but will feel impossible until your Phantom timing is solid. Switching weapons randomly in DM builds no timing consistency for either.',
        preview: 'Vandal: 1 bullet per dead-zone window (tight, ~50ms timing). Phantom: 2–3 bullets per window (more forgiving, ~80ms window). Train them in separate DM sessions. Ghost DM → crosshair placement habits. Guardian DM → stop timing (punishes any movement).'
      },
      {
        name: 'Don\'t Lift Your Fingers',
        videoUrl: 'https://www.youtube.com/watch?v=ZRUq_kmDBPc',
        source: 'n0ted — "How to Unf*ck Your Aim Part II"',
        rankThreshold: 'all',
        why: 'Physically lifting a finger from a key to press the opposite direction adds ~30–60ms of physical transit time — the finger must travel up, across, and down. This window is long enough to cost you accuracy timing in a fast strafe sequence. Keeping all four movement fingers resting on their keys at all times means direction changes happen through simultaneous key engagement with zero travel time.',
        preview: 'Never lift your hand when changing direction (A→D). The time spent lifting = the time you\'re dead. The correct way: A key held → D immediately engaged (simultaneously), no physical lift. Fingers are on keys at all times.'
      },
      {
        name: 'Crouch — When to Use It (and When Not To)',
        videoUrl: 'https://www.youtube.com/watch?v=gR-JNjFg9B8',
        source: 'Zasko — "He Already Had INSANE Mechs"',
        rankThreshold: 'sub-immortal',
        why: 'Crouching as an accuracy crutch is punished at higher ranks because enemies have trained the ability to instantly re-aim at crouched head level. Below Immortal, random crouch mid-burst occasionally confuses spray-and-pray opponents — but above Immortal, the enemy\'s crosshair follows you down faster than you can crouch. Use crouch tactically (to break conditioning) not mechanically (for accuracy).',
        preview: 'Crouch tap peek: light tap only (don\'t hold). Exploits enemy expectation of full crouch-spray — gives split-second head advantage. Heavy crouch commit: only in isolated fights, known position, no shoulder threats. ELO rule: low ELO avoid crouch (body spray risk); Immortal 2+ exploit via taps/heavies.'
      },
      {
        name: 'Aim Is 90% Movement',
        videoUrl: 'https://www.youtube.com/watch?v=wgQHZjy6TxA',
        source: 'w0rthyTV — MASS Protocol analysis of Florescent',
        rankThreshold: 'all',
        why: 'Florescent analysis proves this empirically: 22 out of 24 rounds, the crosshair was already on the target before any mouse movement. Movement-based crosshair placement works because your WASD keys can move your character—and therefore your crosshair—horizontally across the screen faster and more predictably than your mouse can flick. Flicking is compensating for failed movement; it\'s not a reliable primary strategy.',
        preview: 'Florescent: out of 24 rounds reviewed, only 2 were actual flicks. Everything else was movement-based crosshair placement. The crosshair doesn\'t move from your mouse — your strafe moves it to the target. Flicking is the symptom of bad positioning, not the solution.'
      },
      {
        name: 'Hyper Tap (Hall Effect Keyboards)',
        videoUrl: 'https://www.youtube.com/watch?v=edIzYSYt7Bw',
        source: 'n0ted — "Hyper Tap is ADDICTING"',
        rankThreshold: 'immortal',
        why: 'Traditional keyboards require 1–4mm of physical key travel before registering a press, adding 10–25ms of input lag per direction change. Hall Effect keyboards can trigger at 0.01mm, reducing this to near-zero. In a strafe sequence with 5+ direction changes per second, this compounds to a measurable accuracy window advantage. Not essential below Immortal, but at high elo where every millisecond matters, it is a legitimate edge.',
        preview: 'Hall Effect keyboards set to 0.01–0.10mm actuation enable direction changes from a touch, not a press. Allows faster A/D strafe windows. Not a macro — just hardware-enabled precision. Worth considering at Immortal+ when every millisecond compounds.'
      }
    ]
  },
  block3: {
    title: 'Mental Frameworks & Performance',
    subtitle: 'The cognitive and psychological layer — what your mind does in fights and between them.',
    items: [
      {
        name: 'Green / Pink Mindset',
        videoUrl: 'https://www.youtube.com/watch?v=k1dXzO0RIBc',
        source: 'Zasko — "This Subtle Mistake WASTES So Much Time"',
        rankThreshold: 'all',
        why: 'Motor skill execution uses different neural pathways than analytical thinking. Bringing conscious analysis into a gunfight literally activates the wrong part of your brain — the prefrontal cortex is slower and less efficient for motor execution than the trained automatic system. Green/Pink is not about attitude; it\'s about routing your neural processing to the correct system for the task.',
        preview: 'Green = performance mode: flow state, intuition, trust mechanics. For warm-up, comp, DM. Pink = learning mode: analytical, deliberate, critical. For drills, VOD review, end-of-session training ONLY. Mechanics = motor skill — cannot improve by thinking mid-gunfight. Game sense = CAN improve by thinking during comp.'
      },
      {
        name: 'Text Message Anticipation',
        videoUrl: 'https://www.youtube.com/watch?v=28yvjExaR80',
        source: 'Zasko — "You\'ll Never RUSH Your Shots Again"',
        rankThreshold: 'all',
        why: 'Surprise is the single largest driver of panic and missed shots. When an enemy appears unexpectedly, your startle reflex activates before your trained motor response — the reflex wins. Pre-visualizing scenarios before they happen removes the element of surprise. When the event occurs, your brain processes it as "this is what I predicted" rather than "unexpected threat," bypassing the startle response entirely.',
        preview: 'Before taking space, mentally preview what you\'ll see. "Mid might push through smoke as I walk up." When enemy appears — it\'s a predicted event, not a surprise. Panic eliminated. Radiant game sense is just more text messages sent per minute. Collect scenarios after deaths, prepare for them next round.'
      },
      {
        name: 'Inner Game / Self 1 vs. Self 2',
        videoUrl: 'https://www.youtube.com/watch?v=8YRiCtEByHA',
        source: 'Zasko — "You\'ll Never Rank Up Until You Fix This" (Inner Game of Tennis)',
        rankThreshold: 'all',
        why: 'The Inner Game of Tennis framework (Timothy Gallwey) identifies that critical self-talk (Self 1) actively degrades performance by pulling conscious attention into motor execution that runs better automatically. Tilt is not just an emotion — it is a specific neural interference pattern where Self 1 hijacks the motor execution system. The fix (non-judgmental observation) is neuroscience: it prevents the interference without suppressing it.',
        preview: 'Self 1 (critic/thinker) causes tilt when dominant. Self 2 (doer/body) is what executes perfectly. Goal in ranked: give all control to Self 2. Tilt = Self 1 hijacking Self 2. Fix: observe without judgment, just notice what happens. Missing a shot = feedback, not failure.'
      },
      {
        name: '0% Excuses / 100% Responsibility',
        videoUrl: 'https://www.youtube.com/watch?v=-ufd8fmvZLA',
        source: 'w0rthyTV — "AIM is NOT Your Issue, THIS is"',
        rankThreshold: 'all',
        why: 'Blaming creates a fixed attribution (it was their fault) that closes the loop without generating a solution. Taking responsibility creates an open attribution (what could I do differently?) that forces problem-solving. The two mental states produce different subsequent brain states: blame activates the amygdala (emotional, reactive), while responsibility activates the prefrontal cortex (analytical, solution-seeking). Over 100+ games, this difference compounds into very different trajectories.',
        preview: '"If we blame, we stay the same." Taking responsibility = solutions-based thinking = growth. Blaming = fixed mindset = stuck at current rank. Applied: when teammate does wrong, ask "How was I responsible for that outcome?" Tilt is rooted in victimhood — looking for something to blame.'
      },
      {
        name: 'Investing RR (Reframe Losses)',
        videoUrl: 'https://www.youtube.com/watch?v=MBO9jUMjCPE',
        source: 'w0rthyTV — coaching content',
        rankThreshold: 'all',
        why: 'The emotional pain of losing RR (ranking points) triggers the same neural response as a financial loss — loss aversion. This creates tilt through a neurological mechanism, not a weakness of character. Reframing a loss as "investing RR into information about my current weaknesses" changes the emotional tagging of the event from negative to neutral-to-positive. This is not cope — it\'s a measurable change in how the prefrontal cortex processes the outcome.',
        preview: 'Reframe losses from "losing RR" to "investing RR." Every loss contains information that a win conceals. You always get something from a loss. Benefits of loss: mistakes are visible (hidden in wins), humbles ego, makes eventual success more meaningful.'
      },
      {
        name: 'Mental Diet (Copium Analogy)',
        videoUrl: 'https://www.youtube.com/watch?v=EjcOqzbO24c',
        source: 'w0rthyTV — "How MENTAL Affects your AIM"',
        rankThreshold: 'all',
        why: 'Blame and negative self-talk are habitual thought patterns — every time you complete the blame loop, you strengthen the neural pathway for that pattern. It becomes easier to blame next time. This compounds over hundreds of games until blame is the automatic first response to any death. Like diet: each individual instance seems harmless, but the cumulative effect is the habit that controls your performance ceiling.',
        preview: 'What you feed your mental compounds. Blaming teammates = eating cake every day — day 1 feels good, day 30 you\'re in the graveyard. Bad mental = up to 80% loss of fine motor control (elevated heart rate, muscle tension). Fix: redirect energy to strategy after every death, not blame.'
      },
      {
        name: 'Pele Protocol (Pre-Round Visualization)',
        videoUrl: 'https://www.youtube.com/watch?v=-ufd8fmvZLA',
        source: 'Fundamenty — "Protokół Pelé"',
        rankThreshold: 'all',
        why: 'Motor neuron research (Jeannerod, 2001) shows that visualization activates the same upper motor neurons as physical practice. Elite athletes like Pelé famously visualized every ball contact before matches. In FPS terms: visualizing the peek, the stop, the headshot primes the motor pathways so that when the situation occurs, the execution feels like recall rather than improvisation.',
        preview: 'During buy phase: close eyes, visualize the round. What angle will you hold? What will enemy do? Imagine the exact scenarios before they happen. "Be in the moment from the future." Motor neurons activate identically during visualization as during physical practice — it\'s free training.'
      },
      {
        name: 'Flow State Triggers',
        videoUrl: 'https://www.youtube.com/watch?v=k1dXzO0RIBc',
        source: 'Zasko — "You\'ll Never Rank Up Until You Fix This"',
        rankThreshold: 'all',
        why: 'Flow state (Csikszentmihalyi) is defined by four conditions: clear goal, immediate feedback, challenge at skill level, and loss of self-consciousness. All four are engineerable. The reset ritual between rounds directly addresses self-consciousness (breathe, loosen, release). Choosing one cue before queue creates the clear goal. Understanding these triggers means flow is not luck — it\'s a repeatable state you build conditions for.',
        preview: 'Flow emerges when: trust mechanics (not analyzing them), clear goal, immediate feedback, challenge slightly above skill level. Between rounds: mute sound, breathe, water, posture reset. The reset ritual IS the flow trigger. Don\'t skip it even in casual games.'
      },
      {
        name: 'Pre-Round Fight Planning',
        videoUrl: 'https://www.youtube.com/watch?v=8LPOwGfsw6U',
        source: 'OD26 — "Why Everyone Hates Reyna Players"',
        rankThreshold: 'sub-immortal',
        why: 'Entering a round without a specific fight intention means your first contact becomes improvised and reactionary. Decision latency in the moment costs 200–400ms that is not recoverable once the fight starts. Pre-programming the fight (who you want to duel, from where, with what utility) converts that decision from real-time improvisation into a pre-committed plan with zero latency.',
        preview: 'Before every round: decide what fight you want. Not "play aggressively" — a specific angle, specific utility setup, specific route. No plan = random results regardless of mechanics. Win condition: choose one thing you can do that meaningfully improves round win probability.'
      },
      {
        name: 'Hindsight vs. Technique',
        videoUrl: 'https://www.youtube.com/watch?v=6j24Kextt0k',
        source: 'OD26 — "We Cured This Clove\'s Ranked Anxiety"',
        rankThreshold: 'all',
        why: 'Reviewing your own play and beating yourself up for "bad" decisions is often analytically incorrect. Many deaths come from hindsight bias — you only know it was a mistake because you saw the outcome. Technique mistakes (things you could have identified live: bad crosshair, wrong movement) are the only actionable review targets. Separating the two prevents false improvement signals and wasted drilling.',
        preview: 'Hindsight = info you only had after the outcome (not a mistake — cannot learn from it). Technique = something identifiable live (actionable, drill this). VOD review: only focus on decisions you could have recognized in real time. Beating yourself up for hindsight deaths is not growth — it is noise.'
      }
    ]
  },
  block4: {
    title: 'Positioning, Game Sense & Macro',
    subtitle: 'The higher-level game: where to be, when to fight, and how to read the map.',
    items: [
      {
        name: 'UFOs Positioning Framework',
        videoUrl: 'https://www.youtube.com/watch?v=3_0ajFbCcUA',
        source: 'w0rthyTV — "How RADIANTS POSITION in VALORANT"',
        rankThreshold: 'all',
        why: 'Most positioning decisions are made on instinct ("this feels fine"). UFOs converts instinct into a scored checklist, making positioning errors visible and correctable. The framework\'s power is in VOD review: pausing at each death and scoring the position reveals patterns (e.g., "I always die in 0-escape positions") that were invisible without the structure.',
        preview: '5 yes/no questions: (U) Utility — can teammate support? (F) Flash-dodge — can you dodge? (O) On/Off angle — off is better. (S) Support/Trade — teammate to trade you? (E) Escape — cover immediately available? Score 0.5 per criterion. Below 2.5/5 = death trap. Use in VOD review: pause on every death and score your position.'
      },
      {
        name: 'OH SH*T Line',
        videoUrl: 'https://www.youtube.com/watch?v=eMk_GNeXE1I',
        source: 'w0rthyTV — coaching sessions / TikTok',
        rankThreshold: 'all',
        why: 'Every weapon and position has a range where it excels. Crossing the OH SH*T Line is when you are now fighting with your weapon\'s disadvantages instead of its advantages. For an Operator player: the line is where close-range negates the one-shot advantage. For any player: it\'s the position from which retreat is no longer possible. Knowing the line before you need it means you never cross it accidentally.',
        preview: 'Invisible spatial boundary where combat nature changes. Cross it only with gun out, animations finished, eyes on crosshair, 100% active mode. For Operator: the line where close range nullifies your one-shot advantage — don\'t cross it. Practice: narrate mode aloud. "Passive... Sentry... ACTIVE."'
      },
      {
        name: 'Driver\'s Protocol (Awareness Modes)',
        videoUrl: 'https://www.youtube.com/watch?v=Plmts9TSpas',
        source: 'w0rthyTV — "How Radiants Look At The Radar/Minimap"',
        rankThreshold: 'all',
        why: 'Radiant players do not have superior minimap awareness — they have scheduled minimap awareness. They know exactly which game states allow a minimap glance without dying. Checking minimap during Active mode (live threat present) costs you a gunfight. Never checking it leaves you flying blind on rotations. The three modes create a clear rule for when each type of information-gathering is safe.',
        preview: 'Active (100% crosshair): crossing danger line, live threat. Sentry (50/50): behind cover — peek in/out, minimap flicks when covered. Passive (0%): safe rotations only. Rubbernecking: after shots fired, flick eyes to kill feed → scoreboard → minimap. Sequence: Kill feed → Scoreboard → Minimap → Crosshair → back to fight.'
      },
      {
        name: 'Dead Zone Protocol',
        videoUrl: 'https://www.youtube.com/watch?v=3_0ajFbCcUA',
        source: 'w0rthyTV — "How to TRIGGER DISCIPLINE like a RADIANT"',
        rankThreshold: 'all',
        why: 'Dead zones are invisible in real time — standing and watching a hallway feels productive because you\'re "covering." The question "am I supporting my team\'s effort right now?" is a direct forcing function that exposes dead zone behavior. For controllers in particular, the wait time between fights is actually prime utility pre-positioning time, and recognizing the dead zone converts wasted time into map control.',
        preview: 'Dead zone = standing somewhere doing nothing useful for your team. Your Actions Per Minute contribute 0% support. Question: "Am I supporting my team\'s effort, working against it, or doing nothing?" Controllers especially: use wait time to pre-position smokes, prepare utility, read minimap for rotations.'
      },
      {
        name: 'Numbers Game Framework',
        videoUrl: 'https://www.youtube.com/watch?v=3_0ajFbCcUA',
        source: 'w0rthyTV — Trigger Discipline analysis',
        rankThreshold: 'all',
        why: 'The decision to shoot or hold fire in a disadvantaged numbers situation is one of the highest-leverage decisions in a round. Taking a bad trade in a 3v5 can convert it into a 2v5 in seconds. The Numbers Game framework provides the expected-value calculation in advance so that when the situation occurs, the answer is already known: never fight when outnumbered unless you can kill without being seen.',
        preview: 'In a 3v5, one kill barely improves win probability — but 3 undetected kills could win the round. The calculation: expected value of shooting vs. expected value of not shooting. If losing in numbers AND undetected: DO NOT shoot unless you can multi-frag. Trigger discipline is knowing when holding fire is worth more than taking a shot.'
      },
      {
        name: 'Win Condition Hierarchy',
        videoUrl: 'https://www.youtube.com/watch?v=eMk_GNeXE1I',
        source: 'w0rthyTV — "Why Pros Buy Sheriffs"',
        rankThreshold: 'all',
        why: 'Most sub-Immortal players optimize for kills because kills feel good and are visible feedback. But rounds are won by objectives, not KDA. Understanding that kills are only valuable when they serve the spike (plant/defuse) or time (burning the clock) re-orients every decision in the round. A player who dies planting the spike gave more value than a player who got three kills and lost the round.',
        preview: 'Priority: 1. Spike (plant/defuse). 2. Time (burn the clock). 3. Kills (only as tool for #1 and #2). Kills without objective = stat-padding that loses rounds. Pros buy Sheriffs specifically because the alternative is eco pistols — the Sheriff wins the round via burst damage, not average damage.'
      },
      {
        name: 'Swing Protocol (OD26)',
        videoUrl: 'https://www.youtube.com/watch?v=QBL2NXSZDCA',
        source: 'OD26 — "Learn How To SWING" / coaching sessions',
        rankThreshold: 'all',
        why: 'Half-swings are the worst of both worlds: you expose yourself without the speed of a committed swing and without the protection of full cover. A committed swing uses peeker\'s advantage; a half-swing hands it away. Timing swings to teammate pressure works because enemy attention is physically divided — they cannot track two simultaneous threats as effectively as one, and the first look at your teammate creates the flicker window for your swing.',
        preview: 'Wide swing = full commitment — don\'t half-swing. Time swings to teammate pressure (swing when enemy attention is on teammate). Never dry swing when you can use utility first. After a swing: move immediately — never hold the spot you swung from. Game sense underpins swinging: know where enemies are before committing.'
      },
      {
        name: 'Autopilot Prevention',
        videoUrl: 'https://www.youtube.com/watch?v=8LPOwGfsw6U',
        source: 'OD26 — "This Raze Couldn\'t Stop Auto Piloting"',
        rankThreshold: 'all',
        why: 'Autopilot occurs when you execute patterns from muscle memory without updating them to the current game state. This is cognitively efficient (saves mental resources) but produces consistently wrong decisions in a dynamic game where conditions change every round. The 5-second buy-phase check breaks autopilot by forcing one moment of deliberate situational awareness per round — cheap cost, high value.',
        preview: 'Autopilot = running the same routine without reading the current game state. Each round is different: enemy positions change, economy changes, team composure changes. Before each round, take 5 seconds during buy phase to assess: "What is the most important thing I can do this round?"'
      },
      {
        name: 'Info → Utility → Commit',
        videoUrl: 'https://www.youtube.com/watch?v=a0qO_CDr1GE',
        source: 'Zasko — "You\'re WASTING Your Utility"',
        rankThreshold: 'all',
        why: 'Utility used without confirmed information is wasted in two ways: it misses the target and it signals your position without payoff. The Info→Util→Commit sequence guarantees that every piece of utility is aimed at a confirmed target, which means every utility use has positive expected value. Dry utility usage (no information before throwing) is one of the most common errors that coaches identify in sub-Immortal VODs.',
        preview: 'Formula for utility usage: Info (slice/teammate/noise) → Util (pop at confirmed position) → Commit (wide swing for kill). Never throw utility dry without confirming a target. Install combos as subconscious if-then statements: pick one combo → drill range → drill custom → implement in TDM → drill daily → subconscious.'
      },
      {
        name: 'Neutral Space Framework',
        videoUrl: 'https://www.youtube.com/watch?v=Plmts9TSpas',
        source: 'OD26 — "This Top 1% Aimer Had No Brain"',
        rankThreshold: 'sub-immortal',
        why: 'Neutral space (the area between spawn barriers) is the primary map control battleground. Teams that contest it gain information, force enemies to commit resources, and create execute opportunities. Teams that ignore it give the enemy free map control and predictable spawn-to-site distance advantages. OD26 identifies ignoring neutral space as one of the most common high-ceiling limiting factors in sub-Immortal players.',
        preview: 'Contest or gather info on the space between spawn barriers every round — ignoring it gives enemy free map control. This is not just for IGLs: every player should have a neutral-space habit. Check it early, force the enemy to react to you rather than vice versa.'
      },
      {
        name: 'Numbers Advantage Rule',
        videoUrl: 'https://www.youtube.com/watch?v=3_0ajFbCcUA',
        source: 'OD26 — "This Top 1% Aimer Had No Brain"',
        rankThreshold: 'sub-immortal',
        why: 'Statistical win probability changes non-linearly with numbers advantage. +1 in numbers (e.g., 3v2) in ranked is not a dominant advantage — individual mechanical variation makes the outcome nearly 50/50. +2 (e.g., 4v2) raises win probability to ~92%, making the tactical decision simple: group up and execute. Understanding this prevents solo plays and "hero moments" that statistically lose more than they win.',
        preview: '+2 in numbers = ~92% win probability. +1 is unreliable in ranked — individual mechanics create near-50/50 outcomes. In a 3v1: fight together — enemy\'s only win is isolating you into three separate 1v1s. In +2: locate then execute as a unit, never split. Always know your numbers before committing to a fight.'
      },
      {
        name: 'Mada\'s Multi-Frag Protocol',
        videoUrl: 'https://www.youtube.com/watch?v=cjuc9ix02-w',
        source: 'Zasko — "Mada Makes Fragging EFFORTLESS"',
        rankThreshold: 'immortal',
        why: 'The 150–200ms kill-confirmation delay is a hardwired habit from games where kill confirmation is required for an action (looting, objectives). In Valorant, kills require no confirmation — the game continues immediately. Training "assume the kill" repurposes those 150ms as aiming time on target 2. Across all multi-enemy scenarios in a ranked game, this compounds to a significant mechanical advantage.',
        preview: 'In multi-enemy fights: shoot T1 → assume dead → immediately snap to T2. Do not wait for kill animation or audio confirmation. Mada removes 150–200ms per kill this way. Practice: custom game, fire one shot at T1 dummy, snap to T2 before animation plays. Build the reflex — fire and forget.'
      },
      {
        name: 'Idle Rest After Session',
        videoUrl: 'https://www.youtube.com/watch?v=8YRiCtEByHA',
        source: 'Fundamenty — Motor Learning Research',
        rankThreshold: 'all',
        why: 'Motor memory consolidation begins immediately after practice and continues during the following rest period. Research shows the hippocampus replays successful motor sequences in reverse during the first minutes of rest, accelerating pattern storage. Jumping straight to social media or another activity interrupts this consolidation window. 5–10 minutes of quiet inactivity is literally free skill gain.',
        preview: '5–10 min of pure inactivity with eyes closed after gaming. Hippocampus replays successful motor sequences in reverse — accelerates retention 20–30%. Free skill consolidation. NREM2 sleep spindles (20-30 min after waking): consolidate motor memory by 20-30% next session. Protect sleep above all training decisions.'
      }
    ]
  }
};


/* ═══════════════════════════════════════════════
   DATA — SESSION PLANS
═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   DRILL ROTATION — cycles through drill pools
   so each session has a specific recommended drill.
═══════════════════════════════════════════════ */
const DRILL_POOLS = {
  peek: [
    {
      id: 'two-step-peek',
      name: 'Two-Step Peek',
      cue: '"Two steps, lift hand, stop before crosshair arrives." Say the angle out loud before each rep.',
      where: 'Custom game or Ghost DM. Pick ONE angle. Repeat 15–20 deliberate reps.',
      why: 'Foundation of every peek — most players blend movement and aiming simultaneously, which is why first shots miss. This drill forces them apart. Until this is automatic, every other peek drill is built on sand.'
    },
    {
      id: 'idle-crosshair',
      name: 'Idle Crosshair (Hand-Off-Mouse)',
      cue: '"Keyboard moves. Hand completely off mouse until stopped."',
      where: 'Custom game. Physically lift your mouse hand off the mouse, take two steps to peek, then put hand back only after you have stopped.',
      why: 'Eliminates the most common mechanical habit: blending mouse movement with key movement. Feels extreme on purpose. If this feels impossible, that reveals exactly how bad the blend habit is.'
    },
    {
      id: 'slice-fallback',
      name: 'Slice & Fall Back',
      cue: '"Close to wall, stop early, expose only a sliver — then fall back. No commit yet."',
      where: 'Ghost DM or custom. Stand close to the corner. Flash just your gun model around the edge, then fall back immediately. Never go wide on the first show.',
      why: 'The slice is your information peek — not your kill peek. Going straight to a full wide swing is a coin flip. This drills the information-first habit that separates structured peeking from gambling.'
    },
    {
      id: 'slice-wide-combo',
      name: 'Slice → Wide Swing Combo',
      cue: '"Slice to bait their aim tight. Wide swing to catch them out of position."',
      where: 'Custom game with a friend holding an angle. Full sequence: expose sliver → fall back → wide swing. 10 reps each combo variant.',
      why: 'The slice baits the enemy crosshair narrow. The wide swing then catches them displaced. This is the complete peek sequence — slice for info and conditioning, wide for the kill.'
    },
    {
      id: 'pause-peek',
      name: 'Pause-Peek (Priming the Angle)',
      cue: '"Run up. Brief stop here. Then out." — 3-beat rhythm.',
      where: 'Common ranked angles in custom or Ghost DM. Run to entry point, pause 0.1 seconds at entry, then swing out. Watch shooting error indicator — must be yellow, not blue.',
      why: 'Running at full speed requires ~2 seconds of deceleration before you can shoot accurately. The pause removes that delay — you are already near-zero velocity when you swing, so your first bullet is accurate from frame 1.'
    }
  ],
  aim: [
    {
      id: 'deadzone-stop',
      name: 'Deadzone Stop Timing',
      cue: '"Release key → wait for yellow lines → click. In that order. Never fire on blue."',
      where: 'Valorant range. Enable shooting error graph (Settings → Gameplay → Show Bullet Spread Indicators). Strafe A or D, then stop — wait until the spread lines turn yellow before firing.',
      why: 'Yellow lines = bullet goes exactly where aimed. Blue lines = bullet will miss. Most players fire while blue without knowing it. This drill builds the wait-for-yellow reflex that accurate first shots require — it is the single most impactful timing habit.'
    },
    {
      id: 'ping-tracking',
      name: 'Ping Tracking Drill',
      cue: '"Stay on the ping. Never let crosshair drop below it."',
      where: 'Valorant range. Place a ping on a wall at head height. Burst fire onto it — crosshair must never drop below the ping. Reset count if it does.',
      why: 'Reveals if you have the unconscious "U-shape" habit — dragging the crosshair down after shot 1. Most players do this without knowing. Once visible, it is fixable. Especially important for Vandal users where shot 2 position matters.'
    },
    {
      id: 'mass-protocol-dm',
      name: 'MASS Protocol DM',
      cue: '"Move → Aim (small adjustment) → Stand Still → Shoot. Any flick kill = rep does not count."',
      where: 'Ghost DM for 10–15 min. Every kill must follow the 4 steps. Track flick kills separately — they reveal how often you revert to the wrong habit.',
      why: 'This is how Radiant+ players actually aim. Florescent hit headshots in 22 of 24 rounds without a single mouse flick — movement placed the crosshair, mouse only micro-adjusted. Flicking is compensating for bad positioning, not a primary strategy.'
    },
    {
      id: 'sheriff-drill',
      name: 'Sheriff Counter-Strafe Drill',
      cue: '"Press A + click at the same moment. Same input, same frame."',
      where: 'Valorant range. 100 bots on strafe. Equip Sheriff. Strafe D one unit, then press A + shoot simultaneously. The spread lines should cluster tight if timing is correct.',
      why: 'The Sheriff has zero forgiveness — 20ms early = full miss. If you can consistently hit 1-unit strafe shots with the Sheriff, Vandal timing feels easy. Same principle as training with a heavier weight so the game weight feels light.'
    },
    {
      id: 'strafe-shoot-style',
      name: 'Strafe-and-Shoot Timing',
      cue: '"Direction change is where the bullet goes straight. Shoot at the A→D crossover, not after."',
      where: 'Valorant range 10 min, then Ghost DM. Strafe A/D continuously — fire only at the direction change, never while traveling in either direction. Phantom allows 2–3 bullets per window; Vandal allows 1.',
      why: 'Shooting at the direction change — not after a full stop — fires accurately while you appear to be moving continuously. The enemy sees movement but your bullets land. This is the mechanical basis of the "always moving" playstyle used by n0ted and Primie.'
    },
    {
      id: 'odin-head-height',
      name: 'Odin Head-Height Calibration',
      cue: '"Where did the bullet holes land? Pre-aim exactly that spot next time."',
      where: 'Custom game, equip Odin (high ammo, marks walls clearly). Walk to 5 angles you struggle with in ranked. Fire 3–5 bullets at your best-guess head height. The bullet marks on the wall are your calibration reference.',
      why: 'Guessing head level by even 5 pixels means your first shot misses without you understanding why. This drill gives you pixel-accurate visual references for your specific angles that you can memorize and pre-aim consistently.'
    },
    {
      id: 'uncomfortable-flick',
      name: 'Uncomfortable Position Flick',
      cue: '"Game never resets your crosshair. Practice starts exactly where it lands."',
      where: 'Kovaak or Valorant range. After killing a bot, do NOT recenter. Flick to next target from wherever crosshair stopped. 15+ reps per session.',
      why: 'Standard aim training always resets to center — building a skill that only exists in controlled conditions. Ranked fights start with your crosshair displaced from the last angle cleared. This drill builds the skill the game actually demands.'
    },
    {
      id: 'primie-burst-drill',
      name: 'Primie Burst Drill (Shoot → Move)',
      cue: '"Click and movement key at the same time. Same frame. Zero evaluation gap."',
      where: 'Range first: fire 1 shot → tap D immediately. Then any DM: fire 1–4 bullets → strafe immediately. Count how many shots you stood still after.',
      why: 'Standing still after any shot is the most common mechanical death in sub-Immortal. The enemy still has peeker\'s advantage and is tracking your static position while you check the kill feed. Left-click must become the trigger to move — automatically, every time.'
    }
  ],
  movement: [
    {
      id: 'shoot-then-move',
      name: 'Shoot-Then-Move (Zero Gap)',
      cue: '"Left-click and a direction key at the exact same time. Every shot. No exceptions."',
      where: 'Any DM. After every shot, a movement key must be pressed at the same moment. Count how many times you fire and stand still — those are the death traps.',
      why: 'The enemy has peeker\'s advantage and is tracking you while you read the kill feed. Left-click is the trigger to move — not the end of the action. This reflex alone eliminates the most common death cause in sub-Immortal.'
    },
    {
      id: 'anti-mirror-dodge',
      name: 'Anti-Mirror Dodge',
      cue: '"Enemy strafes left → you strafe right. Always opposite direction."',
      where: 'Any DM. After each shot, observe enemy strafe direction and immediately move the opposite way. Drill this reaction as a reflex.',
      why: 'Mirroring the enemy\'s strafe makes your relative motion zero — you appear static to their aim. Moving opposite forces them to reverse tracking direction, adding 100–150ms of cognitive delay. Makes you harder to hit without doing anything mechanically complex.'
    },
    {
      id: 'deliberate-dm',
      name: 'Deliberate DM (Gym Reps Protocol)',
      cue: '"1-second pause before every angle. Believe someone is there. Wrong reps do not count."',
      where: 'Any DM. Set up far from each angle — expose yourself to ONE enemy at a time. 1-second pause before every peek. Ignore your score. Replay any rep where you won via a flick or luck.',
      why: 'Random DM reps build random habits. Slow deliberate peeking with perfect form in DM is what transfers to ranked. Speed is a result of correct mechanics repeating — not a separate thing to chase. This is Zasko\'s core DM methodology.'
    },
    {
      id: 'dm-minimap-habit',
      name: 'DM Minimap Respawn Habit',
      cue: '"Respawn → do NOT move → look at minimap → identify red dots → then hunt."',
      where: 'Any DM. Every single respawn: stay still during spawn shield, find every red dot on minimap, plan your route, then move. Every respawn is one rep.',
      why: 'Radiants check the minimap at specific game states as a trained reflex — post-spawn, post-kill, post-cover. DM respawns are free repetitions of that exact reflex at zero risk. After 20+ sessions, this habit auto-fires in ranked without thought.'
    },
    {
      id: 'lmb-to-cover',
      name: 'LMB = Back to Cover',
      cue: '"Fire is the trigger to move. Left-click + movement key. Same frame, every shot."',
      where: 'Any DM or custom. Every time you fire, treat the shot as the trigger to immediately move toward the nearest cover. Make it one reflex, not two separate decisions.',
      why: 'After any shot, you are stationary and exposed. The enemy is still tracking. Making movement automatic after every shot means you are never standing in the open after firing — every trade requires the enemy to flick to your new position.'
    }
  ],
  mental: [
    {
      id: 'green-mode-lock',
      name: 'Green Mode Lock (One Cue Rule)',
      cue: '"Pick ONE cue before queuing. Apply it consciously in round 1. Then forget mechanics — play positions."',
      where: 'Before ranked. Write your one cue on paper or in the Tracker. Apply it intentionally in round 1. For the rest of the game: play positions, reads, and macro — not mechanics.',
      why: 'Thinking about crosshair placement mid-gunfight is called Pink Mode — it actively degrades motor execution that runs better automatically. One cue gives your analytical mind a job so it stops interfering with your body\'s execution.'
    },
    {
      id: 'breath-reset',
      name: 'Breath Before Swing',
      cue: '"One slow exhale before every intentional peek. Not optional."',
      where: 'Ranked or DM. Before every swing you consciously decide to take — exhale fully. Track how many times you forget to exhale. That number is your panic frequency.',
      why: 'Elevated heart rate (120+ BPM) reduces fine motor precision by up to 80% through involuntary muscle tension. One diaphragmatic exhale activates the vagus nerve and drops heart rate 5–15 BPM in seconds. This is biology — not motivation advice.'
    },
    {
      id: 'five-why-review',
      name: '5-Why Post-Death Review',
      cue: '"Why? Why? Why? Why? Why? — then write the root cause. Stop at the root."',
      where: 'After VOD review. Pick one death. Ask "why did I die?" 5 times — each answer becomes the next question. Write the root cause (answer 5) in the Tracker.',
      why: 'The first answer is always the symptom. The fifth answer is always the structural cause. Surface analysis produces surface improvements. Structural analysis changes how you actually play. One 5-Why session per review is more valuable than 30 minutes of passive rewatching.'
    }
  ]
};

/* Rotation index — cycles through drill pools across sessions */
let drillRotationIndex = 0;

function getRecommendedDrills(mode, timeSlot) {
  let primaryPool, secondaryPool;
  if (mode === 'ranked') {
    primaryPool = DRILL_POOLS.peek;
    secondaryPool = DRILL_POOLS.mental;
  } else {
    primaryPool = drillRotationIndex % 2 === 0 ? DRILL_POOLS.aim : DRILL_POOLS.movement;
    secondaryPool = drillRotationIndex % 2 === 0 ? DRILL_POOLS.movement : DRILL_POOLS.aim;
  }
  const primary = primaryPool[drillRotationIndex % primaryPool.length];
  const secondary = secondaryPool[(drillRotationIndex + 1) % secondaryPool.length];
  drillRotationIndex++;
  return { primary, secondary };
}

const SESSION_PLANS = {
  '15-ranked': {
    cautions: [
      'Do NOT play more than one DM — CNS warmup fades fast, extra DMs waste the effect',
      'Do NOT chase DM score — you are activating the nervous system, not proving yourself',
      'Do NOT extend beyond 15 min — you will fatigue before ranked starts',
      'Do NOT check your phone between RAMP end and ranked queue'
    ],
    steps: [
      { time: '0–3 min', title: 'RAMP — Raise', detail: 'Valorant range. Loose shots at medium bots. Head height only. No pressure — wake up the hands.' },
      { time: '3–6 min', title: 'RAMP — Activate + Mobilize', detail: 'Ghost DM or range. Slow tracking shots, micro-corrections. Wide mouse swipes across the full pad to warm up arm range of motion.' },
      { time: '6–13 min', title: 'Potentiate DM — your drill cue only', detail: 'DM with your chosen weapon. Apply only your ONE drill cue (shown above). Do not try to win. Stop while still feeling sharp — not exhausted.' },
      { time: '13–15 min', title: 'Queue ranked immediately', detail: 'No delay. CNS activation window closes fast. Three deep breaths, recall your ONE cue, queue.' }
    ]
  },
  '15-training': {
    cautions: [
      '15 min is warmup territory only — switch to Ranked mode if you only have 15 min',
      'Do NOT jump in without a specific cue in mind — vague practice builds vague habits'
    ],
    steps: [
      { time: '0–5 min', title: 'RAMP — Raise + Activate', detail: 'Range: loose shots → tracking. Get hands warm. Do not rush.' },
      { time: '5–15 min', title: 'Drill — high reps', detail: 'Your recommended drill (shown above). Apply the cue with full focus. Count reps. Do not switch drills mid-session.' }
    ]
  },
  '30-ranked': {
    cautions: [
      'Do NOT switch drills mid-session — stick to ONE mechanic so it has time to transfer',
      'Do NOT use a rifle for DM if drilling crosshair placement — Ghost or Sheriff only',
      'Do NOT skip the review — 5 honest minutes beats 30 mindless ones'
    ],
    steps: [
      { time: '0–5 min', title: 'RAMP — full (all 4 phases)', detail: 'Range: loose bots → Ghost tracking → wide pad swipes → brief potentiate DM. Finish the full RAMP. Do not rush.' },
      { time: '5–15 min', title: 'Drill A — deliberate reps', detail: 'Your primary drill (shown above). Slow, intentional reps — say the cue out loud before each one. Errors are good: they are the learning signal.' },
      { time: '15–23 min', title: 'DM — same cue in live chaos', detail: 'Your chosen weapon. Carry only the drill cue. Ignore your score. Every kill should use the drill mechanic — if you win via a flick, that rep does not count.' },
      { time: '23–28 min', title: 'Review — 3–5 deaths, honest', detail: 'Was each death mechanical (missed timing, bad stop) or tactical (positioning, info)? Apply 5-Why to ONE death. Write the root cause in the Tracker.' },
      { time: '28–30 min', title: 'Pre-ranked reset', detail: 'ONE cue out loud or written. Three slow exhales. Visualize one round going correctly. Queue.' }
    ]
  },
  '30-training': {
    cautions: [
      'Training day = no ranked. Pink mode (analytical) does not switch cleanly to Green mode — do not play ranked after',
      'Do NOT practice more than 2 things — one mechanic drilled properly beats five touched once'
    ],
    steps: [
      { time: '0–5 min', title: 'RAMP — all 4 phases', detail: 'All phases at a relaxed pace. Today you are not rushing to queue.' },
      { time: '5–15 min', title: 'Drill A — deliberate reps', detail: 'Your primary drill (shown above). High reps. Say the cue out loud. The mistake IS the rep — fail, reset, repeat.' },
      { time: '15–25 min', title: 'DM transfer — same mechanic', detail: 'Ghost or Guardian DM. Carry only the drill cue. Count kills that used the mechanic vs. kills that did not. Score is irrelevant.' },
      { time: '25–30 min', title: 'Reflection + log', detail: 'Open Tracker. Write: 1 thing that worked, 1 thing to fix, cue for next session. Then 5 min idle (eyes closed, no phone) — consolidation.' }
    ]
  },
  '45-ranked': {
    cautions: [
      'Stop warmup at 15 min no matter how good you feel — everything after is training, not warmup',
      'Do NOT run more than 2 drills — cognitive overload degrades transfer to ranked',
      'Do NOT tilt after the first loss — trust the process for a minimum 3-game sample'
    ],
    steps: [
      { time: '0–5 min', title: 'RAMP — all 4 phases', detail: 'Raise, Activate, Mobilize, Potentiate — all four, full quality.' },
      { time: '5–15 min', title: 'Drill A — primary mechanic', detail: 'Your primary drill (shown above). Slow, deliberate reps. Say the cue before each rep. Build the groove before building speed.' },
      { time: '15–25 min', title: 'Drill B — secondary mechanic', detail: 'Your secondary drill (shown above). Only start B if A felt solid — otherwise continue A. Do not jump categories.' },
      { time: '25–33 min', title: 'Potentiate DM — chosen weapon', detail: 'Transfer both mechanics into live DM. One primary cue only. Not playing to win — playing to carry the drill mechanic into chaos.' },
      { time: '33–38 min', title: 'Review — kills + deaths', detail: 'Were kills from the drill mechanic or from flicking? Were deaths mechanical or tactical? Write one finding in the Tracker.' },
      { time: '38–45 min', title: 'Pre-ranked reset', detail: 'ONE cue from Drill A. Three exhales. Visualize one round — the drill mechanic executed correctly. Queue.' }
    ]
  },
  '45-training': {
    cautions: [
      'No ranked today — honor the training day commitment',
      'Do NOT do more than 2 drills — depth beats breadth every time'
    ],
    steps: [
      { time: '0–5 min', title: 'RAMP — all 4 phases', detail: 'All phases, relaxed pace. No rush today.' },
      { time: '5–18 min', title: 'Drill A — deep reps', detail: 'Your primary drill. High reps. Wrong reps do not count — redo them. The error IS the signal.' },
      { time: '18–30 min', title: 'DM transfer — Drill A in chaos', detail: 'Ghost or Guardian DM. Only the drill cue matters. Score is irrelevant — count drill mechanic kills vs. non-mechanic kills.' },
      { time: '30–40 min', title: 'Drill B — secondary', detail: 'Your secondary drill. Stay in the same category as Drill A where possible. Do not jump from aim to mental in one session.' },
      { time: '40–45 min', title: 'Log + idle rest', detail: 'Open Tracker: write 1 mistake, 1 success, cue for next session. Then 5 min eyes closed, no phone — free consolidation.' }
    ]
  },
  '60-ranked': {
    cautions: [
      'Still stop warmup at 15 min even with 60 min — over-warming burns CNS capacity before ranked',
      'Do NOT VOD review more than 5 min before ranked — Pink mode does not switch off cleanly',
      'Do NOT run 3+ drills — go deep on two'
    ],
    steps: [
      { time: '0–5 min', title: 'RAMP — full, all 4 phases', detail: 'All phases with full quality. Finish feeling sharp and activated, not fatigued.' },
      { time: '5–20 min', title: 'Drill A — deep focus', detail: 'Your primary drill (shown above). Maximum deliberate attention. If you hit the completion condition, rest 60 seconds, then continue.' },
      { time: '20–32 min', title: 'DM transfer — Drill A', detail: 'Ghost, Guardian, or Sheriff. ONE cue only. Log mechanical errors for the review step. No score pressure.' },
      { time: '32–40 min', title: 'Drill B or VOD', detail: 'If sharp: run Drill B (shown above). If tired: 8 min VOD — one clip, one death, one insight only. Do not do both.' },
      { time: '40–50 min', title: 'Final DM — ranked pace', detail: 'Last CNS primer. Treat it like ranked speed — not warmup pace. Queue within 10 min of finishing.' },
      { time: '50–55 min', title: 'Pre-ranked mental prep', detail: 'Eyes closed: visualize one full round with your drill mechanic executed correctly. ONE cue. Three exhales.' },
      { time: '55–60 min', title: 'Queue', detail: 'Green mode. Trust the work. Play positions and chess — not mechanics.' }
    ]
  },
  '60-training': {
    cautions: [
      'No ranked — protect training day integrity',
      'Track everything in Tracker — 60 min without notes is 60 min half-wasted'
    ],
    steps: [
      { time: '0–5 min', title: 'RAMP — all 4 phases', detail: 'Quality over speed on all phases.' },
      { time: '5–25 min', title: 'Drill A — deep deliberate practice', detail: 'Your primary drill. Maximum conscious attention. Pink mode at full. No rushing past the completion condition.' },
      { time: '25–40 min', title: 'DM block — Guardian + Ghost', detail: 'First 7 min: Guardian DM (trains stop timing — one clean shot per full stop, punishes any movement). Switch to Ghost for 8 min (trains placement and reading). Same drill cue for both.' },
      { time: '40–50 min', title: 'Drill B — secondary', detail: 'Your secondary drill. Stay adjacent to Drill A in category. Build on what you drilled, not something completely unrelated.' },
      { time: '50–55 min', title: 'VOD review — 5 min hard cap', detail: 'One clip. One death. 5-Why method. Write root cause in Tracker. Stop at 5 min — do not spiral.' },
      { time: '55–60 min', title: 'Tracker + idle rest', detail: 'Log the session. Then 5 min eyes closed, no phone — hippocampus consolidates today\'s motor sequences.' }
    ]
  },
  'post-ranked': {
    cautions: [],
    steps: [
      { time: '0–10 min', title: 'Idle rest — mandatory', detail: 'Eyes closed. No phone, no input. Your hippocampus is currently replaying today\'s motor sequences in reverse — this is how motor memory forms. Checking a screen disrupts this window.' },
      { time: '10–25 min', title: 'Mental visualization', detail: 'Replay the correct versions of your drill from today — the two-step peek done right, the breath before swing, the clean stop-and-shoot. 15 min = up to 35% additional skill consolidation. Upper motor neurons activate identically to physical practice.' },
      { time: '25+ min', title: 'Prioritize sleep', detail: 'Motor memory consolidates during NREM2 sleep (sleep spindles). 8h after training = 20–30% better accuracy next session. No sleep = no consolidation. This is where the skill actually gets stored.' }
    ]
  },
  'post-training': {
    cautions: [],
    steps: [
      { time: '0–10 min', title: 'Idle rest — mandatory', detail: 'No stimulus. Eyes closed. Let the hippocampus replay today\'s drill sequences. Checking your phone breaks this consolidation window.' },
      { time: '10–20 min', title: 'Visualization', detail: 'Imagine the drill you just trained — done perfectly. Slow, deliberate mental reps. Upper motor neurons activate identically to physical practice. This is free training.' },
      { time: '20+ min', title: 'Sleep', detail: 'Everything you drilled consolidates into permanent motor memory during NREM2. Protect sleep above all training decisions.' }
    ]
  }
};

/* ═══════════════════════════════════════════════
   SESSION BUILDER
═══════════════════════════════════════════════ */
let selectedTime = null;
let selectedMode = null;
let selectedDM = 'ghost';

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

document.getElementById('generate-btn').addEventListener('click', generatePlan);
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
  const mode = selectedMode || 'ranked';
  const isPost = selectedTime === 'post';

  const planEl = document.getElementById('session-plan');

  /* ── Cautions ── */
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

  /* ── Drill recommendation cards ── */
  const drillRecBlock = document.getElementById('drill-rec-block');
  const primaryCard = document.getElementById('drill-rec-primary');
  const secondaryCard = document.getElementById('drill-rec-secondary');

  if (!isPost) {
    const { primary, secondary } = getRecommendedDrills(mode, selectedTime);

    function drillCardHTML(drill, label) {
      const drillObj = DRILLS.find(d => d.id === drill.id);
      const drillLink = drillObj ? `<button class="drill-rec-open-btn" data-drill-id="${drill.id}">Open full drill →</button>` : '';
      return `
        <div class="drill-rec-label">${label}</div>
        <div class="drill-rec-name">${drill.name}</div>
        <div class="drill-rec-where"><strong>Where:</strong> ${drill.where}</div>
        <div class="drill-rec-why"><strong>Why this today:</strong> ${drill.why}</div>
        <div class="drill-rec-cue">Cue: ${drill.cue}</div>
        ${drillLink}
      `;
    }

    primaryCard.innerHTML = drillCardHTML(primary, 'PRIMARY DRILL');
    drillRecBlock.style.display = 'block';

    const needsSecondary = ['45', '60'].includes(selectedTime);
    if (needsSecondary) {
      secondaryCard.innerHTML = drillCardHTML(secondary, 'SECONDARY DRILL');
      secondaryCard.style.display = 'block';
    } else {
      secondaryCard.style.display = 'none';
    }

    /* Wire up open-drill buttons */
    drillRecBlock.querySelectorAll('.drill-rec-open-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const drill = DRILLS.find(d => d.id === btn.dataset.drillId);
        if (drill) openDrillModal(drill);
      });
    });

    /* Set cue card to the primary drill\'s cue */
    document.getElementById('cue-text').textContent = primary.cue;
  } else {
    drillRecBlock.style.display = 'none';
    document.getElementById('cue-text').textContent = mode === 'training'
      ? '"The skill is being downloaded right now. Sleep is the transfer."'
      : '"Tonight\'s goal: consolidation. Rest is training."';
  }

  /* ── DM weapon note ── */
  const dmFocus = {
    ghost: 'Ghost DM: trains crosshair placement and patience. Low recoil means errors show clearly — any miss is a movement or placement mistake, not recoil. Use for MASS Protocol and Deliberate DM.',
    guardian: 'Guardian DM: trains stop timing and first-shot discipline. One-shot-kill means any movement = miss. Pure deadzone timing training. Best weapon for drilling stop timing.',
    sheriff: 'Sheriff DM: trains composure and counter-strafe precision. High damage + slow fire rate = one mistake is immediately punishing. Use for the Sheriff Counter-Strafe drill and pressure rehearsal.',
    vandal: 'Vandal DM: trains rhythm transfer. One bullet per dead-zone window (tight ~50ms timing). Use only when ready to transfer a mastered cue to your main weapon.'
  };
  const dmNoteEl = document.getElementById('dm-focus-note');
  if (dmNoteEl && selectedDM) {
    dmNoteEl.textContent = dmFocus[selectedDM] || '';
    dmNoteEl.style.display = !isPost ? 'block' : 'none';
  }

  /* ── Plan steps ── */
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

    <div class="modal-why-block">
      <div class="modal-why-label">WHY this works</div>
      <p class="modal-why-text">${drill.why}</p>
    </div>

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
    ${drill.videoUrl ? `<a class="drill-video-link" href="${drill.videoUrl}" target="_blank" rel="noopener">▶ Watch Source Video</a>` : ''}
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
const RANK_LABELS = {
  'all': null,
  'sub-immortal': { text: 'Sub-Immortal Priority', color: 'var(--warning)' },
  'immortal': { text: 'Immortal+ Focus', color: 'var(--accent)' }
};

function renderConcepts() {
  Object.entries(CONCEPTS_BY_BLOCK).forEach(([blockKey, block]) => {
    const blockNum = blockKey.replace('block', '');
    const container = document.getElementById(`concepts-block${blockNum}`);
    if (!container) return;

    const titleEl = container.closest('.concept-block')?.querySelector('.concept-block-title');
    const subtitleEl = container.closest('.concept-block')?.querySelector('.concept-block-subtitle');
    if (titleEl && block.title) titleEl.textContent = block.title;
    if (subtitleEl && block.subtitle) subtitleEl.textContent = block.subtitle;

    container.innerHTML = '';
    block.items.forEach(concept => {
      const rankInfo = RANK_LABELS[concept.rankThreshold];
      const rankBadge = rankInfo
        ? `<span class="concept-rank-badge" style="color:${rankInfo.color};border-color:${rankInfo.color}">${rankInfo.text}</span>`
        : '';

      const item = document.createElement('div');
      item.className = 'concept-item';
      item.innerHTML = `
        <div class="concept-source">${concept.source}</div>
        <div class="concept-name-row">
          <div class="concept-name">${concept.name}</div>
          ${rankBadge}
        </div>
        <div class="concept-why"><span class="concept-why-label">WHY:</span> ${concept.why}</div>
        <div class="concept-preview">${concept.preview}</div>
        ${concept.videoUrl ? `<a class="concept-video-link" href="${concept.videoUrl}" target="_blank" rel="noopener">▶ Watch</a>` : ''}
      `;
      container.appendChild(item);
    });
  });
}

renderConcepts();

/* ═══════════════════════════════════════════════
   TRACKER
═══════════════════════════════════════════════ */
const dateInput = document.getElementById('log-date');
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

let logs = [];

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
      ${log.vodInsight ? `<div class="history-vod-insight">VOD: ${log.vodInsight}</div>` : ''}
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
    cueSuccess: cueRadio ? cueRadio.value : null,
    vodInsight: (document.getElementById('log-vod-insight') || {}).value?.trim() || ''
  };

  logs.push(log);
  renderLogs();

  document.getElementById('log-minutes').value = '';
  document.getElementById('log-focus').value = '';
  document.getElementById('log-mistake').value = '';
  document.getElementById('log-success').value = '';
  document.getElementById('log-dm-note').value = '';
  if (document.getElementById('log-vod-insight')) document.getElementById('log-vod-insight').value = '';
  document.querySelectorAll('input[name="cue-success"]').forEach(r => r.checked = false);
});

renderLogs();

/* ═══════════════════════════════════════════════
   DEATH LOGGER
   In-memory only. Fast mid-game UI.
═══════════════════════════════════════════════ */

const DEATH_CAUSES = [
  {
    id: 'bad-peek',
    label: 'Bad Peek',
    sublabel: 'went wide too fast, no setup',
    questions: [
      'Did you show just a sliver of your body first (slice) to get information before committing?',
      'Were you standing far enough from the wall to see the enemy before they see you?',
      'Did you say out loud what angle you were about to peek before you peeked it?'
    ],
    explain: 'Slicing = briefly exposing just your gun/shoulder to force the enemy to reveal their position, then falling back without committing. Wide swing = the full commitment peek after you already know where they are. Going straight to wide swing with no setup is what gets you killed.',
    framework: 'Practice: Two-Step Peek drill (2 steps, lift hand, wait) + Slice & Fall Back drill',
    cue: 'Info first. The wide swing is the finishing move — never the opener.'
  },
  {
    id: 'crossfire',
    label: 'Crossfire / 2v1',
    sublabel: 'caught by two enemies at once',
    questions: [
      'Did you mentally score your position before holding it? (U=teammate utility, F=flash escape, O=off-angle, S=teammate to trade, E=escape route)',
      'Was there a teammate positioned to trade your death if you died?',
      'Did you expose yourself to two angles at once instead of isolating one fight?',
      'Did you use any utility (flash, smoke) to isolate a 1v1 before committing?'
    ],
    explain: 'UFOs is a 5-question position check: U=can a teammate use utility for me? F=can I dodge a flash? O=am I on an off-angle (unexpected spot)? S=can a teammate trade my death? E=do I have a cover escape? Score 0.5 per yes. Under 2.5/5 = bad spot, leave. Info→Util→Commit means: gather information first, throw utility at confirmed enemy position, then swing.',
    framework: 'Practice: UFOs positioning check (Concepts tab) + Info → Util → Commit sequence',
    cue: 'Never take a 2v1 without utility to isolate it. The slice tells you what you\'re walking into.'
  },
  {
    id: 'off-angle',
    label: 'Off-Angle',
    sublabel: 'enemy was in an unexpected spot',
    questions: [
      'Before peeking, did you say out loud where you expected the enemy to be?',
      'Were you fully focused on the fight (active mode) or just walking through?',
      'Did you check the minimap in the last 2 seconds before entering that area?'
    ],
    explain: 'Text Message Anticipation = before entering any space, mentally "send yourself a text" predicting where enemies are: "enemy could be on the left box" — when they appear there, it is a predicted event, not a surprise, so you react instead of panic. Active mode = gun out, crosshair at head level, full focus. Passive mode = running without focus. OH SH*T Line = the invisible boundary past which you can no longer escape — once you cross it, you must be in full active mode.',
    framework: 'Practice: Mental visualization before entering (Concepts tab) + always check minimap before entering new space',
    cue: 'If you didn\'t predict them there, you weren\'t mentally prepared for that space.'
  },
  {
    id: 'utility-death',
    label: 'Utility Death',
    sublabel: 'killed by flash, molly, or nade',
    questions: [
      'Were you in a covered position when the utility landed?',
      'Did you have a flash-dodge escape available before holding that spot? (F in UFOs: can you dodge a flash?)',
      'Were you caught in an animation (reloading, planting) in open space?'
    ],
    explain: 'UFOs F-check = before holding any position, ask "can I dodge a flash from here?" — if no, the position is incomplete. The OH SH*T Line is the point past which you can no longer retreat to safety: if you cross it while reloading or with gun away, you die to utility you cannot react to. Always have cover available and gun ready before crossing into contested space.',
    framework: 'Practice: UFOs positioning check (Concepts tab) + never cross danger zones while reloading',
    cue: 'You can\'t dodge what you didn\'t see coming. Check your escape cover before you hold any spot.'
  },
  {
    id: 'reposition-fail',
    label: 'Repositioning Failed',
    sublabel: 'caught while moving between positions',
    questions: [
      'After firing your shot, did you instantly press a movement key — or did you pause to check the kill feed?',
      'Did you strafe in the opposite direction of the enemy\'s strafe after the shot?',
      'Did you have your gun ready and crosshair at head level while crossing open space?'
    ],
    explain: 'LMB = Back to Cover means: left-click (fire) is the trigger to immediately press a movement key toward cover — same frame, no delay. Anti-Mirror Dodge: if the enemy strafes left, you strafe right — this makes their tracking fail because you\'re moving against their aim direction. OH SH*T Line: the boundary where open space becomes dangerous — only cross it in full active mode with gun ready.',
    framework: 'Practice: Shoot-Then-Move drill + Anti-Mirror Dodge drill (Drills tab)',
    cue: 'Every shot = movement. Left-click and a direction key at the same time, every time.'
  },
  {
    id: 'info-disadvantage',
    label: 'Peeked Without Info',
    sublabel: 'committed without knowing what was there',
    questions: [
      'Before peeking, did you say out loud what you expected to see (enemy position, angle)?',
      'Did you check the minimap in the last 2 seconds before peeking to see teammate sightlines?',
      'Did you show just a sliver (slice) first to force enemy reveal before fully committing?'
    ],
    explain: 'Text Message Anticipation = before every peek, mentally "send yourself a text" predicting the scenario: "someone is holding left box." If they\'re there — predicted, react calmly. If not — new information, adjust. Minimap check = teammates on the minimap give you information (enemy spotted, sounds heard) — use it as your scouting tool before committing. Slicing = flash-peek the corner with just your gun tip to force the enemy to reveal position, then fall back.',
    framework: 'Practice: Slice & Fall Back drill + always verbalize the angle before every peek',
    cue: 'Never peek into the unknown. Slice for information first, then commit with a plan.'
  },
  {
    id: 'missed-first',
    label: 'Missed First Shot',
    sublabel: 'first bullet didn\'t connect',
    questions: [
      'Were you fully stopped — zero velocity — when you fired? (The shooting error indicator in Valorant should be yellow/closed, not blue/open)',
      'Did you fire while still moving, or immediately after releasing the movement key?',
      'Did your crosshair drift past the target and you fired anyway instead of resetting?'
    ],
    explain: 'Deadzone Stop Timing = every weapon has a "dead zone" — a brief window after you fully stop where your first bullet is 100% accurate. Fire inside this window (when the error lines are yellow/closed) = hit. Fire early while still decelerating (lines still blue/open) = miss. Crosshair Acceptance Rule = if your crosshair overshoots the target, stop completely and make one clean small adjustment — never chase the target with a moving mouse.',
    framework: 'Practice: Deadzone Stop Timing drill + Sheriff Counter-Strafe drill (Drills tab)',
    cue: 'Release key → wait for yellow indicator → click. That exact order, every single shot.'
  },
  {
    id: 'panic-spray',
    label: 'Panic Spray',
    sublabel: 'lost composure, sprayed instead of tapping',
    questions: [
      'Did you take one slow exhale before peeking or entering that fight?',
      'Were you thinking about your mechanics mid-fight (crosshair position, counter-strafing) instead of just playing?',
      'Did the enemy appear where you didn\'t expect them, catching you off guard?'
    ],
    explain: 'Breath Before Swing = one diaphragmatic exhale before any high-stakes fight physically drops your heart rate 5-15 BPM, which restores fine motor control — this is biology, not a mental trick. Green Mode = performance mode where you trust your mechanics and play instinctively; the opposite is Pink Mode (analytical, for drills only). Thinking about mechanics mid-fight puts you in Pink Mode during Green time — this causes panic spray. Predicting enemy positions before the round (visualizing "they might be on left box") prevents surprise, which is the root cause of panic.',
    framework: 'Practice: Breath Before Swing drill + Green Mode Lock drill (Drills tab)',
    cue: 'Panic = surprise. Predict their position before every round. Exhale before every swing.'
  },
  {
    id: 'held-too-long',
    label: 'Held Too Long',
    sublabel: 'stayed in a bad position too long',
    questions: [
      'Did you score your position before holding it? (U, F, O, S, E — under 2.5/5 means leave)',
      'Did you have a clear escape route available when you decided to keep holding?',
      'Did you know how many enemies were alive and where they were before holding?'
    ],
    explain: 'UFOs position score: ask 5 yes/no questions about any spot — U=teammate utility coverage, F=flash escape, O=am I off-angle, S=teammate to trade me, E=escape cover available. Score 0.5 per yes. Under 2.5/5 = death trap, relocate before enemies force you out. Minimap check = before holding any position, look at minimap to confirm enemy count and approximate location — holding blind is gambling. Numbers Game = if you\'re outnumbered 2:1 or worse, the math says rotate or fall back, not hold.',
    framework: 'Practice: UFOs Framework (Concepts tab) + always know enemy count before holding',
    cue: 'UFOs under 2.5 = death trap. Leave before you\'re forced to — after is too late.'
  },
  {
    id: 'traded-out',
    label: 'Traded Out',
    sublabel: 'died right after a teammate, or was the trade bait',
    questions: [
      'Was there a teammate in a position to trade your death within 1-2 seconds?',
      'Did you check that a teammate could actually reach you (S = Support in UFOs) before taking that fight?',
      'Was the enemy pre-aiming your exact angle because it\'s a common spot they\'ve seen before?'
    ],
    explain: 'UFOs S-check = before taking any fight, ask "is there a teammate who can trade my death?" — if no, your death removes 1 player and gives 0 value. A trade death only has value if someone converts it into a kill within 2 seconds. On-angle = a position where enemies have pre-built crosshair placement from habits (common spots), meaning they\'re already aimed at you before they even see you. Off-angles = unexpected spots that remove their pre-aim advantage.',
    framework: 'Practice: UFOs positioning check + move to off-angles (Concepts tab)',
    cue: 'A trade death is worth something only if a teammate can answer it immediately. Check first.'
  },
  {
    id: 'overstayed',
    label: 'Overstayed Position',
    sublabel: 'got value, but didn\'t leave',
    questions: [
      'Had you already gotten a kill or gathered useful information from that position?',
      'Was your escape cover route still available, or had it been cut off?',
      'Were multiple enemies already tracking your location when you died?'
    ],
    explain: 'Each position has a value timeline: it peaks when enemies first encounter you (surprise + off-angle advantage), then drops sharply once they know exactly where you are. After your first kill or info, the position is compromised — enemies will coordinate on your location. The Overstaying concept from the Concepts tab: your life = 2 points (body + position control). After extracting value, staying drops your contribution to near zero while your death risk stays at 100%.',
    framework: 'Practice: Overstaying Your Welcome concept (Concepts tab) + check escape route after every kill',
    cue: 'Your value was already extracted. Every second after that was gambling your life for nothing.'
  },
  {
    id: 'no-plan',
    label: 'No Pre-Round Plan',
    sublabel: 'ran into the round without a specific intention',
    questions: [
      'Before the round started, did you decide one specific fight you wanted — which angle, with what utility?',
      'Did you assess the round state in buy phase (enemy economy, your team\'s comp, what worked last round)?',
      'Were you automatically repeating the same play as the previous round without thinking?'
    ],
    explain: 'Pre-Round Fight Planning = during buy phase, decide one specific thing: "I will take mid control using a smoke, then peek short if mid is clear." A vague intention like "play aggressive" produces random results. Autopilot = running the same route, the same angle, the same timing as last round by default — enemies pattern-match this within 3 rounds and pre-aim it. Each round, the enemy economy, team positions, and tendencies change — your plan must change with it.',
    framework: 'Practice: Pre-Round Fight Planning concept + Autopilot Prevention concept (Concepts tab)',
    cue: 'No plan means random results regardless of your mechanics. 5 seconds in buy phase changes everything.'
  }
];

/* In-memory death log — no persistence */
let deathLog = [];
let selectedCause = null;

function initDeathLogger() {
  const loggerEl = document.getElementById('view-logger');
  if (!loggerEl) return;

  /* Sub-tab switching */
  loggerEl.querySelectorAll('.logger-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      loggerEl.querySelectorAll('.logger-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.loggerTab;
      document.getElementById('logger-round-panel').style.display = target === 'round' ? '' : 'none';
      document.getElementById('logger-summary-panel').style.display = target === 'summary' ? '' : 'none';
      if (target === 'summary') renderSummary();
    });
  });

  /* Render cause buttons */
  renderCauseButtons();

  /* Log / Skip buttons */
  document.getElementById('log-death-btn').addEventListener('click', logDeath);
  document.getElementById('skip-death-btn').addEventListener('click', skipDeath);
}

function renderCauseButtons() {
  const grid = document.getElementById('death-cause-grid');
  if (!grid) return;
  grid.innerHTML = '';
  DEATH_CAUSES.forEach(cause => {
    const btn = document.createElement('button');
    btn.className = 'cause-btn';
    btn.dataset.causeId = cause.id;
    btn.innerHTML = `<strong>${cause.label}</strong><br><span style="font-size:0.7rem;opacity:0.65">${cause.sublabel}</span>`;
    btn.addEventListener('click', () => selectCause(cause));
    grid.appendChild(btn);
  });
}

function selectCause(cause) {
  selectedCause = cause;

  document.querySelectorAll('.cause-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.causeId === cause.id);
  });

  const diagnosisEl = document.getElementById('death-diagnosis');
  const contentEl = document.getElementById('diagnosis-content');

  const questionsHTML = cause.questions
    .map(q => `<li>${q}</li>`)
    .join('');

  contentEl.innerHTML = `
    <div class="diagnosis-cause-label">${cause.label}</div>
    <ul class="diagnosis-questions">${questionsHTML}</ul>
    <div class="diagnosis-framework">
      <span class="diagnosis-framework-label">Framework</span>
      <span class="diagnosis-framework-content">${cause.framework}</span>
    </div>
    <div class="diagnosis-cue">"${cause.cue}"</div>
  `;

  diagnosisEl.style.display = '';
}

function logDeath() {
  if (!selectedCause) return;
  deathLog.push({
    cause: selectedCause,
    time: new Date().toLocaleTimeString()
  });
  showToast('Death logged. Focus on next round.');
  resetLoggerUI();
}

function skipDeath() {
  showToast('Skipped. Next round.');
  resetLoggerUI();
}

function resetLoggerUI() {
  selectedCause = null;
  document.querySelectorAll('.cause-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('death-diagnosis').style.display = 'none';
}

function showToast(msg) {
  const existing = document.querySelector('.death-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'death-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

function renderSummary() {
  const container = document.getElementById('summary-content');
  if (!container) return;

  if (deathLog.length === 0) {
    container.innerHTML = '<p class="summary-empty">No deaths logged yet this session.</p>';
    return;
  }

  const counts = {};
  deathLog.forEach(entry => {
    const id = entry.cause.id;
    counts[id] = (counts[id] || 0) + 1;
  });

  const sorted = DEATH_CAUSES
    .filter(c => counts[c.id])
    .sort((a, b) => (counts[b.id] || 0) - (counts[a.id] || 0));

  const maxCount = counts[sorted[0].id];
  const topCause = sorted[0];

  const barsHTML = sorted.map(cause => {
    const count = counts[cause.id] || 0;
    const pct = Math.round((count / maxCount) * 100);
    return `
      <div class="summary-stat-row">
        <span class="summary-cause-name">${cause.label}</span>
        <div class="summary-bar-track">
          <div class="summary-bar-fill" style="width:${pct}%"></div>
        </div>
        <span class="summary-count">${count}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <p style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:var(--space-4)">
      ${deathLog.length} death${deathLog.length !== 1 ? 's' : ''} logged this session
    </p>
    ${barsHTML}
    <div class="summary-top-cause">
      <div class="summary-top-label">Most frequent cause</div>
      <div class="summary-top-name">${topCause.label}</div>
      <div class="summary-top-framework">Focus this session: ${topCause.framework}</div>
    </div>
    <button class="summary-clear-btn" id="summary-clear-btn">Clear Session</button>
  `;

  document.getElementById('summary-clear-btn').addEventListener('click', () => {
    deathLog = [];
    renderSummary();
  });
}

/* Init on DOM ready (already loaded) */
initDeathLogger();
