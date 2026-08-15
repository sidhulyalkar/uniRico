# uniRico Architecture — v0.8.0

uniRico is an engine-free 2D precision puzzle game built around a 960×600 logical world, a custom fixed-step projectile simulation, procedural Canvas art, procedural Web Audio, compact declarative levels, and a deterministic 13KB release pipeline.

## Design constraints

The architecture is shaped by four competing requirements: the shipped ZIP must stay under 13,312 bytes; trajectory prediction must agree with live physics; the 40-level campaign needs enough reusable systems to create real depth; and the public source should remain understandable despite the compact artifact.

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
Canvas rendering + particles + HUD
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

The renderer reinforces ordering with active halos, numbered badges, `NEXT`, bounce text, and a connector toward the following target.

## Campaign structure

Levels 1–19 teach individual mechanics. Levels 20–30 are a mixed-system bridge with larger targets and longer previews. Levels 31–40 restore the dense multi-target endgame. Shared `F0...F9` rigs let advanced levels reuse mechanical environments rather than repeat large arrays.

## Procedural soundtrack

The v0.8 soundtrack is a state machine layered on a recursive timer rather than a fixed BPM loop.

During aiming, four bars move across roughly 122–138 BPM before swing. The arrangement is lighter and syncopated. When a shot is live, the transport drops to roughly 94–106 BPM before bounce-dependent slowdown while increasing voice density. Alternating sixteenth delays create swing, bar-specific masks vary bass and percussion placement, and occasional transition accents keep the phrase from feeling identical every loop.

The bass voice separates a filtered saw/square mid layer from a clean sine sub so low frequencies survive filter sweeps. Kicks, snares, hats, stabs, risers, and game SFX are all synthesized from short-lived oscillators.

## Source/release split

The root and `src/` are optimized for human inspection. The one-file competition package is frozen separately, identified by byte count and SHA-256, and should be attached to the final tagged GitHub Release rather than mixed into the readable source tree.

This prevents the public repo from forcing developers to learn from the byte-golfed file while still keeping the submission artifact traceable.
