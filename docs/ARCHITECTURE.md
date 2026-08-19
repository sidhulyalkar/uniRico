# uniRico Architecture — v0.15.0

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
Minimal HTML timer HUD
      ↓
localStorage records / progression
```

## Shared simulation

The white trajectory predictor and live rainbow both use the same `_f()` physics step. Simulation mode suppresses audiovisual side effects but retains walls, portals, moving geometry, continuous forces, hazards, state changes, and bounce counting.

## Collision reliability

Moving targets use relative swept-segment collision so fast rainbows cannot tunnel through small cloud locks. Portal teleports are explicitly excluded from that sweep.

Moving prisms use swept point-vs-expanded-AABB collision in the wall's moving reference frame. The earliest contacted face is resolved, only the normal component is reflected using wall velocity, and the projectile is separated just outside the face. This prevents tunneling, sticky repeat contacts, wall dragging, and wrong-angle end-cap ejections.

## v0.13 campaign invariant

> Every visible interactive mechanic must be used by the intended route, or serve as required gate geometry.

`tests/mechanic-coverage.js` executes each encoded route and records per-instance interaction with walls, portals, wind, slow zones, accelerators, gravity, spin, barriers, charge, magnetic fields, and resonance gates.

The only explicit impact exemptions are full-height portal gate walls on Levels 3, 13, and 15. They prevent ordinary traversal between the two sides of the arena.

## Difficulty architecture

Difficulty uses four independent levers: mechanic composition, ordered target count, target radius, and a trajectory-preview budget `q` that never increases as the campaign advances.

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

Only the active cloud may advance the chain. Hitting a future unresolved cloud gives explicit `WRONG CLOUD` feedback. The renderer now carries order spatially: one white ring marks the active cloud, the sequence number is embedded on the cloud body, and the circular badge above an unresolved cloud contains only its required bounce count.

## HUD lifecycle

Persistent HTML play UI contains only elapsed time. Active-target state and bounce requirements are rendered directly on the clouds, removing objective prose from the HUD. A bottom-centered level title card appears for roughly 3.5 seconds and fades. Level identity, shots, stars, and total score live on pause/menu/completion surfaces.

## Mechanic-legibility layer

`MK` stores compact level keys and `MN` stores their player-facing names. `ml(level)` scans actual level data and builds the second line of the transient title card, so a stage such as Level 20 announces `PRISM · WIND · SPIN` without maintaining a separate tutorial table.

The projectile carries a small interaction bitmask. `mi(ball, mechanicIndex, sim)` runs only on the first live activation of each mechanic in a shot and emits a short floating label, five particles, and a pitch-coded triangle blip. When `sim=1`, `mi()` is silent and does not mutate the feedback bitmask.

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

## Frozen v0.15.0 candidate

```text
12,582 / 13,312 bytes
730 bytes remaining
SHA-256: b5c3961fb596d9921e9b3bd8d0208beb7fc9b4bfcd44b13d99199fd539d11a80
```
