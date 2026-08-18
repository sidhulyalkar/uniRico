# uniRico Architecture — v0.14.0

uniRico is an engine-free 2D precision puzzle game built around a 960×600 logical world, fixed-step projectile simulation, procedural Canvas rendering, procedural Web Audio, compact declarative levels, and a deterministic 13KB release pipeline.

## Runtime flow

```text
Pointer / keyboard
      ↓
Game + menu state ─────────────→ state-aware audio transport
      ↓
Fixed-step update
      ↓
Projectile physics ← level data / reusable field rigs
      ↓
Ordered cloud resolution
      ↓
Canvas world + transient level reveal
      ↓
Minimal HTML timer/objective HUD
      ↓
localStorage records / progression
```

## Shared simulation

The white trajectory predictor and live rainbow both use the same `_f()` physics step. Simulation mode suppresses audiovisual side effects but retains walls, portals, moving geometry, continuous forces, hazards, state changes, and bounce counting.

## Collision reliability

Moving targets use relative swept-segment collision so fast rainbows cannot tunnel through small cloud locks. Portal teleports are explicitly excluded from that sweep.

Moving prisms use swept point-vs-expanded-AABB collision in the wall's moving reference frame. The earliest contacted face is resolved, only the normal component is reflected using wall velocity, and the projectile is separated just outside the face. This prevents tunneling, sticky repeat contacts, wall dragging, and wrong-angle end-cap ejections.

## v0.13 campaign invariant

The campaign now has a source-level design invariant:

> Every visible interactive mechanic must be used by the intended route, or serve as required gate geometry.

`tests/mechanic-coverage.js` executes each encoded route and records per-instance interaction with walls, portals, wind, slow zones, accelerators, gravity, spin, barriers, charge, magnetic fields, and resonance gates.

The only explicit impact exemptions are full-height portal gate walls on Levels 3, 13, and 15. They are still necessary because they prevent ordinary traversal between the two sides of the arena.

Development audits additionally search both broad aim/delay grids and dense neighborhoods around the intended solution. The v0.14 campaign retains the v0.13 mechanic-driven geometry and has no sampled winning route that bypasses a required mechanic.

## Difficulty architecture

Difficulty is not left to level numbering alone. Four independent levers are encoded in level data:

1. **mechanic composition** grows from single-system lessons into linked systems;
2. **ordered target count** increases from 1 to 6;
3. **target radius** tightens from large tutorial locks to 6px finale locks;
4. **trajectory-preview budget `q`** never increases as the campaign advances.

Campaign tiers:

```text
01–08  fundamentals
09–15  moving/timed/linked lessons
16–19  first combinations
20–25  two-lock mixed bridge
26–30  three-lock chains
31–35  four-lock advanced
36–39  five-lock endgame
40     six-lock full-spectrum finale
```

Reusable `F0...F9` rigs keep this progression affordable under the ZIP budget while letting later levels recombine known mechanical families.

## Ordered cloud locks

Targets use:

```text
[x, y, requiredBounces, motionMode, amplitude, speed, phase, radius]
```

Only the active cloud may advance the chain. Hitting a future unresolved cloud gives explicit `WRONG CLOUD · NEXT N` feedback. The renderer reinforces order with bright outlines, badges, bounce labels, and next-target guidance.

## HUD lifecycle

Persistent play UI contains only elapsed time and the active `NEXT/NEED` requirement. A bottom-centered level title card appears for roughly 3.5 seconds and fades. Level identity, shots, stars, and total score live on pause/menu/completion surfaces.

## Mechanic-legibility layer

v0.14 uses one compact mechanic vocabulary for both pre-flight briefing and live cause/effect feedback. `MK` stores the compact level keys and `MN` stores their player-facing names. `ml(level)` scans actual level data and builds the second line of the transient title card, so a stage such as Level 20 announces `PRISM · WIND · SPIN` without maintaining a separate tutorial table.

The projectile also carries a small interaction bitmask. `mi(ball, mechanicIndex, sim)` runs only on the first live activation of each mechanic in a shot and emits a short floating label, five particles, and a pitch-coded triangle blip. Continuous fields can therefore be sampled every fixed step without spamming feedback.

When `sim=1`, `mi()` is silent and does not mutate the feedback bitmask. Prediction, Help/Solution playback, mechanic-coverage testing, and the true-solution regression continue to share the same physics without presentation side effects.

First-shot completion adds one presentation-only reward: `PERFECT PATH!` plus a higher resolving chime. Scoring and physics remain unchanged.

## Soundtrack

One recursive Web Audio transport changes orchestration based on live projectile state.

- No projectile: slower orchestral-style harmonic planning bed.
- Projectile alive: Wobble Warfare dubstep with root sub, wobble/formant bass, yoi responses, irregular kicks, sharp half-time snare, hats, risers, growls, swing, and phrase transitions.

Oscillators are finite-lived and explicitly stopped. AudioContext initialization remains interaction-gated for browser autoplay compatibility.

## Readable-source split

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

The public source is readable and modular. The competition package is a separate one-file artifact generated with deterministic Zopfli ZIP packaging.

## Frozen v0.14.0 candidate

```text
12,802 / 13,312 bytes
510 bytes remaining
SHA-256: 035c105cdcfa333cc2e38eb86dc964b2c7a400b3ed85055b8e9b4573dbba15a5
```
