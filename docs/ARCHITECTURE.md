# uniRico Architecture — v0.11.0

uniRico is an engine-free 2D precision puzzle game built around a 960×600 logical world, fixed-step projectile simulation, procedural Canvas rendering, procedural Web Audio, compact declarative levels, and a deterministic 13KB release pipeline.

## Runtime flow

```text
Pointer / keyboard
      ↓
Game + menu state ─────────────→ adaptive audio transport
      ↓
Fixed-step update
      ↓
Projectile physics ← level data / reusable field rigs
      ↓
Ordered cloud resolution
      ↓
Canvas world + transient level intro
      ↓
Minimal HTML live HUD
      ↓
localStorage records / progression
```

## Shared simulation

The white trajectory predictor and live rainbow both use the same `_f()` physics step. Simulation mode disables audiovisual side effects while retaining walls, portals, continuous forces, hazards, moving geometry, and bounce counting. This keeps the aiming guide aligned with real gameplay.

## Swept collision reliability

Moving cloud targets use relative swept-segment contact so fast projectiles cannot tunnel through small targets between fixed steps. Portal teleports are excluded from that sweep so a discontinuous jump is never interpreted as a giant collision segment.

Moving prisms use swept point-vs-expanded-AABB collision in the wall's moving frame. The earliest contacted face is resolved, only the normal velocity component is reflected using wall surface velocity, and the projectile is separated just outside the face. This prevents sticking, dragging, end-cap ejection, and high-speed tunneling.

## Ordered cloud locks

Targets encode a required reflection count. Only the active cloud can advance the ordered chain. Contact with a later unresolved cloud produces explicit `WRONG CLOUD · NEXT N` feedback.

The renderer reinforces order with white silhouettes, an active halo, numbered badges, bounce labels, and a connector toward the following target.

## v0.11 minimal HUD lifecycle

The in-level interface deliberately contains only two persistent facts:

```text
elapsed time · NEXT X/X · NEED X BOUNCES
```

The HTML HUD is a small translucent single-line pill. It no longer carries the logo, level counter, shot count, cumulative stars, or cumulative score. `ui.js` hides the pill completely whenever the game is paused or showing Help, Levels, completion, or main-menu states.

Orientation is transient. For roughly the first 3.5 seconds of a level, `$8()` draws one Canvas card containing `LEVEL XX · NAME` and the gameplay tagline, then fades it away.

Statistics are moved to deliberate information surfaces instead of the playfield: the pause menu shows current level, timer, shot count, cumulative stars, and cumulative score; main-menu and completion screens retain campaign and result data.

## Campaign structure

Levels 1–19 teach individual systems. Levels 20–30 are a mixed-mechanic bridge with larger targets and longer preview windows. Levels 31–40 restore the dense multi-target endgame. Shared `F0...F9` rigs let advanced levels reuse mechanical environments without repeating large arrays.

## State-aware soundtrack

When no projectile exists, one recursive Web Audio transport plays a slower orchestral-style planning bed built from overlapping sine and triangle voices. When the player fires, the same transport switches immediately into the denser Wobble Warfare dubstep arrangement with root sub, wobble/formant bass, yoi responses, irregular kicks, sharp half-time snare, hats, risers, growls, swing, and phrase-end stutters.

Every oscillator is short-lived and gets an explicit stop time. The master `S` toggle prevents new voices while muted, and the AudioContext is created/resumed only after normal player interaction.

## Readable source split

```text
src/levels.js
src/runtime/core.js
src/runtime/audio.js
src/runtime/physics.js
src/runtime/render-world.js
src/runtime/render-entities.js
src/runtime/render-hud.js
src/runtime/ui.js
```

The public source keeps responsibilities inspectable while preserving compact identifiers where they make comparison with the one-file submission artifact easier.

## Release pipeline

`tools/build_js13k_zip.py` creates a deterministic Zopfli-compressed archive containing exactly one root-level `index.html`, verifies round-trip extraction, reports byte count, and prints SHA-256.

The v0.11.0 candidate is **13,227 bytes**, leaving **85 bytes** below the 13,312-byte ceiling.

SHA-256:

```text
0491d53468f83a89a27f13f6899a40d76e008781c4d9360bf36ee4cbdddba032
```

A final current-Chrome/current-Firefox human gameplay and audio pass remains part of the submission freeze.
