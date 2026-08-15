# Readable source mirror

`src/` is the human-readable development view of **uniRico v0.8.0**. The exact js13k submission artifact is aggressively compact, but the public repository keeps the same systems split by responsibility so another developer can inspect the design without first decoding byte-golfed JavaScript.

## Load order

```text
levels.js
runtime/core.js
runtime/audio.js
runtime/physics.js
runtime/render-world.js
runtime/render-entities.js
runtime/render-hud.js
runtime/ui.js
```

The files are classic browser scripts. `core.js` establishes shared state and helpers, later modules extend that shared runtime, and `ui.js` boots the frame loop after every dependency is loaded.

## Module responsibilities

- `levels.js` — compact field rigs and all 40 campaign stages.
- `runtime/core.js` — DOM/canvas state, persistence, motion helpers, scoring, and attempt lifecycle.
- `runtime/audio.js` — state-aware procedural soundtrack and synthesized SFX.
- `runtime/physics.js` — projectile simulation, swept moving-wall collision, cloud ordering, portals, fields, success/failure.
- `runtime/render-world.js` — sky and environmental mechanic rendering.
- `runtime/render-entities.js` — cloud ordering cues, unicorn, prediction, rainbow trail, particles.
- `runtime/render-hud.js` — HUD, level select, menus, Help overlays.
- `runtime/ui.js` — frame composition, pointer/keyboard input, fixed-step loop boot.

## Run it

From the repository root:

```bash
python3 -m http.server 8000
```

Then open either the repository root or `http://localhost:8000/src/`.

## Why compact identifiers remain

The readable mirror intentionally keeps several short identifiers used by the competition artifact. This makes behavioral comparisons and regression debugging much easier than maintaining two independently renamed implementations. [`../docs/SOURCE_GUIDE.md`](../docs/SOURCE_GUIDE.md) provides the descriptive symbol map and explains the tuple formats.

## Regression discipline

Whenever behavior changes, run:

```bash
node tests/solution-smoke.js
node tests/moving-wall-collision.js
node tests/audio-sequencer.js
```

The release candidate should preserve 40/40 encoded solution playback, moving-prism collision stability, and finite Web Audio node lifetimes before the compact archive is frozen.
