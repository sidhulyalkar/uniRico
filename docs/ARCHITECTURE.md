# uniRico Architecture — v0.20.0

uniRico is an engine-free 2D precision puzzle game built around a 960×600 logical world, fixed-step projectile simulation, procedural Canvas rendering, procedural Web Audio, compact declarative levels, generated symmetry transforms, and a deterministic 13 KB release pipeline.

## Runtime flow

```text
Pointer / keyboard / touch
      ↓
Game + menu state ─────────────→ state-aware audio transport
      ↓
Fixed-step update
      ↓
Projectile physics ← declarative level data / reusable field rigs
      ↓
Ordered cloud resolution
      ↓
Canvas world + transient teaching / feedback
      ↓
Minimal HTML timer HUD
      ↓
localStorage records / progression
```

## Shared simulation authority

Live rainbow flight, trajectory prediction, Help playback, and guided demonstrations all advance the same `_f()` projectile step. Simulation mode suppresses audiovisual effects while preserving collisions, portals, moving geometry, forces, hazards, state transitions, and bounce counting.

This prevents tutorial/preview authority from drifting away from gameplay physics.

## Collision reliability

Moving targets use relative swept-segment collision so fast projectiles cannot tunnel through cloud locks. Portal teleports are explicitly excluded from that sweep.

Moving prisms use swept point-vs-expanded-AABB collision in the wall's moving reference frame. The contacted face is resolved, its normal component reflects relative to wall velocity, and the projectile is separated outside the face to prevent tunneling, sticking, dragging, and incorrect end-cap ejection.

## Campaign invariant

> Every visible interactive mechanic must be used by the intended route, or serve as required gate geometry.

`tests/mechanic-coverage.js` executes every encoded route and records per-instance interaction with walls, portals, wind, slow zones, accelerators, gravity, spin, barriers, charge, magnetic fields, and resonance gates. The only explicit impact exemptions are the full-height portal gates in Levels 3, 13, and 15.

## Difficulty architecture

Difficulty comes from composition, ordered target count, target radius, and trajectory-preview budget `q`, which never increases through the campaign.

```text
01–08  fundamentals
09–15  moving/timed/linked lessons
16–19  first combinations
20–25  two-lock mixed bridge
26–30  three-lock chains
31–35  four-lock advanced
36–39  five-lock endgame
40     six-lock FULL SPECTRUM
41–45  four-lock Reflection Gauntlet
46–49  five-lock reflected endgame
50     six-lock MIRROR FULL SPECTRUM
```

Reusable `F0...F9` rigs make the first 40 levels inexpensive. v0.20.0 extends the same leverage through geometric generation rather than duplicating late-game data.

## Reflection Gauntlet architecture

Levels 41–50 are generated from Levels 31–40 by `rf()`.

A 180° transform maps:

```text
point:      (x,y)       → (W-x,H-y)
rectangle:  (x,y,w,h)   → (W-x-w,H-y-h,w,h)
vector:     (vx,vy)     → (-vx,-vy)
angle:      θ           → θ+π
```

Targets, moving prisms, portal endpoints, wind, gravity/magnet centers, spin/charge/resonance regions, and motion amplitudes are transformed according to their geometry. Scalar route semantics such as bounce counts, speed bands, polarity, and solution delay remain unchanged.

`si()` maps Levels 41–50 back to source solution records from Levels 31–40; `sol()` adds π to the decoded source angle. Because the underlying equations are rotationally symmetric, the transformed solution is a physics proof rather than a separately stored hint.

`tests/solution-smoke.js` then verifies the resulting ten routes independently, while `tests/mechanic-coverage.js` requires every reflected level to preserve and exercise its source mechanic-family set.

## Ordered cloud locks

Targets use:

```text
[x, y, requiredBounces, motionMode, amplitude, speed, phase, radius]
```

Only the active cloud may advance the chain. Future-cloud contact gives `WRONG CLOUD`; incorrect ricochet count gives explicit failure feedback. One white ring identifies the active target, the cloud body contains sequence order, and the dark badge contains the exact required bounce count.

## Input authority

Desktop pointer movement owns the displayed aim direction. Pointerdown fires that already-selected trajectory and cannot silently resample a different coordinate.

Mobile intentionally separates an AIM wheel from FIRE. Releasing AIM preserves the selected direction without launching.

These contracts are protected by adversarial pointer/touch regressions.

## Soundtrack

One recursive Web Audio transport changes arrangement with projectile state:

- planning: sparse orchestral-style harmonic bed;
- live projectile: procedural bass/dubstep state with sub, wobble/formant voices, percussion, risers, and progress-responsive harmony.

Oscillators are finite-lived and explicitly stopped. AudioContext initialization remains interaction-gated.

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

Readable source remains modular even though the submission is one packed HTML file.

## Release compression architecture

The canonical builder measures **final archive bytes**, not only minified JavaScript size:

```text
readable modules
      ↓
Terser 5.50.0
      ├──────────────→ minimal HTML → Zopfli → ZIP A
      ↓
Roadroller 2.1.0 -O0
      ↓
minimal HTML → Zopfli → ZIP B
      ↓
choose min(size(A), size(B))
```

Roadroller `-O0` keeps the model parameters deterministic. A Terser-only candidate remains available as a fallback because additional packing is only useful if the **final DEFLATE archive** is actually smaller.

CI then performs three release gates beyond source tests:

1. rebuild the package and require byte-for-byte equality;
2. extract `index.html` and execute the exact packed runtime in a browser-like VM;
3. verify one root-level `index.html`, no external/network runtime dependency, and size ≤13,312 bytes.

## Current v0.20.0 PR candidate

```text
50 validated levels
11,512 / 13,312 bytes
1,800 bytes remaining
SHA-256: 713114a1185abd266ffdd42664217e06170b22673e9afb5eaa7cb3dd9c9a87ff
```

The exact canonical values are re-recorded by the `main` publisher after merge.
