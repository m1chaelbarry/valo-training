# PROTOCOL — Valorant Training System

A browser-based training planner and tracker for Valorant, built with plain HTML, CSS, and JavaScript.

## Features

- Daily training/session planning
- RAMP warmup flow
- Drill, concept, and skill views
- Session logging and death logging
- Dark/light theme toggle

## Tech Stack

- `index.html`
- `style.css`
- `app.js`
- JSON data files in `data/`

No framework or build step is required.

## Getting Started

Because the app loads local JSON via `fetch`, run it through a local HTTP server (not `file://`).

```bash
cd /home/runner/work/valo-training/valo-training
python3 -m http.server 8000
```

Then open:

`http://localhost:8000`

## Project Structure

```text
valo-training/
├── index.html
├── style.css
├── app.js
└── data/
    ├── concepts.json
    ├── death-causes.json
    ├── drill-pools.json
    ├── drills.json
    ├── session-plans.json
    └── skills.json
```
