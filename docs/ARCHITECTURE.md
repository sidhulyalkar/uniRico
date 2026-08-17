# uniRico Architecture — v0.10.0

uniRico is an engine-free 2D precision puzzle game built around a 960×600 logical world, a custom fixed-step projectile simulation, procedural Canvas art, procedural Web Audio, compact declarative levels, and a deterministic 13KB release pipeline.

## Design constraints

The architecture balances four pressures: the shipped ZIP must stay under 13,312 bytes; trajectory prediction must agree with live physics; the 40-level campaign needs reusable systems with real depth; and the public source should remain understandable despite the compact artifact.

## Runtime flow

```text
Pointer / keyboard
      ↓
Game + menu state ─────────────→ adaptive audio transport
      ↓
Fixed-step update
      ↓
Projectile physics ← level data / moving field rigs
      ↓
Ordered cloud resolution
      ↓
Canvas world + transient intro + HTML HUD
      ↓
localStorage records / progression
```

## Logical world and timing

All level geometry lives in a stable 960×600 coordinate system. The Canvas scales to the browser window and pointer coordinates are transformed back into logical space. Simulation advances in ~16.667 ms fixed steps inside `requestAnimationFrame`, preventing normal render-rate variation from directly changing projectile behavior.

## Shared simulation for prediction and reality

The white trajectory guide advances a simulated projectile through the same `_f()` physics step used by the live rainbow. Side effects such as particles and sound are disabled for simulation, but walls, portals, continuous forces, hazards, and moving geometry follow the same model.

## Moving target collision

Cloud targets can move while the projectile moves. Endpoint-only checks allowed fast shots to pass through small targets between simulation samples, so target contact is evaluated as relative segment motion over the full tick. Portal teleports are exempted from that sweep so a discontinuous jump never becomes a fake collision line across the map.

## Moving prism collision

A moving prism is treated as a swept relative-motion expanded AABB. The engine computes the earliest face crossing in wall-relative coordinates, reflects only the normal velocity component using the wall surface velocity, then moves the projectile slightly outside the face. This prevents sticky repeat collisions, wall dragging, and incorrect end-cap ejections.

## Ordered cloud locks

Each target tuple contains a required reflection count. Only the active target can advance the sequence. Contact with a later unresolved cloud explicitly fails with `WRONG CLOUD · NEXT N`, eliminating ambiguous no-op collisions.

The renderer reinforces ordering with active halos, numbered badges, bounce text, and a connector toward the following target. The persistent HTML HUD also carries `NEXT X/X · NEED X BOUNCES` as a centered second row.

## Clean HUD lifecycle

v0.10 separates orientation information from persistent gameplay information.

At level start, the Canvas renders one centered introduction card containing the level number, name, and gameplay tagline. The card is time-limited to about 3.5 seconds and fades during its final second. After that, the arena is unobstructed.

Persistent state belongs to the cream HTML HUD: level, elapsed time, shot count, stars, score, and the active cloud requirement. The old permanent right-side objective oval is gone.

## Campaign structure

Levels 1–19 teach individual mechanics. Levels 20–30 are a mixed-system bridge with larger targets and longer previews. Levels 31–40 restore the dense multi-target endgame. Shared `F0...F9` rigs let advanced levels reuse mechanical environments rather than repeat large arrays.

## Procedural soundtrack

The v0.10 soundtrack uses one recursive state-aware transport rather than separate song players.

When no projectile exists, the transport runs a slow mid-70-BPM orchestral-style planning bed. Long sine and triangle voices form sparse four-bar harmonic movement with no kick/snare grid, leaving sonic room for trajectory reading.

When the player fires, the same transport switches immediately into the denser Wobble Warfare dubstep arrangement at roughly 96–114 BPM before swing and reflection weighting. The shot state uses a clean root sub, filtered saw/square wobble layers, high-Q band-pass formant voices, yoi-style response stabs, irregular kicks, sharp half-time snares, hats, risers, growls, and a phrase-end stutter.

Every oscillator is short-lived and receives an explicit stop time. The master `S` toggle prevents new voices from being created while muted. Web Audio is initialized only after normal player interaction to respect autoplay rules.

## Readable-source split

The public source loads in this order:

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

This mirrors the conceptual architecture while preserving compact identifiers where they make comparison with the shipping build easier.

## Release pipeline

`tools/build_js13k_zip.py` creates a deterministic Zopfli-compressed archive containing exactly one root-level `index.html`, verifies the extracted bytes, reports the archive size, and prints SHA-256.

The current v0.10.0 frozen candidate is 13,291 bytes, leaving 21 bytes below the 13,312-byte ceiling. The exact submission artifact should be attached to the final tagged release after current Chrome and Firefox manual verification.
