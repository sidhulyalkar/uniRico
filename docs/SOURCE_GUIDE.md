# uniRico v0.8.0 Source Guide

This guide maps the readable public source to the compact release artifact. The competition build uses terse identifiers and packed tuples for compression; the public `src/` tree keeps those identifiers where useful for parity, but separates responsibilities into files and documents the meaning explicitly.

## Recommended reading order

1. `src/levels.js`
2. `src/runtime/core.js`
3. `src/runtime/audio.js`
4. `src/runtime/physics.js`
5. `src/runtime/render-world.js`
6. `src/runtime/render-entities.js`
7. `src/runtime/render-hud.js`
8. `src/runtime/ui.js`
9. `docs/ARCHITECTURE.md`

## Runtime modules

### `core.js`
Owns shared canvas/DOM references, game state, coordinate transforms, persistence, level/attempt reset, score calculation, shared periodic motion, target/wall/portal position helpers, and the swept moving-target contact helper.

### `audio.js`
Owns the procedural Web Audio system. `tk()` is the adaptive recursive transport, `ms()` is the 64-step musical arranger, `mu()` is the filtered mid-bass + clean sub voice, and `$j()` is the compact one-shot oscillator used for percussion and gameplay SFX.

Aiming uses higher bar tempos than flight. Flight becomes slower as reflection count rises. Alternating sixteenth delays introduce swing, while bar-specific masks prevent a mechanically identical loop.

### `physics.js`
Owns projectile reflection, swept moving-prism collision, barriers, portals, one-shot fields, fixed-step projectile advance, target-order resolution, win/fail transitions, assistance playback, and the fixed simulation update.

The moving-wall fix evaluates projectile motion relative to wall motion across the entire tick. Reflection occurs in the moving wall's normal frame, and the projectile is separated just outside the contacted face.

### Rendering modules
`render-world.js` draws environmental systems. `render-entities.js` draws cloud ordering cues, unicorn, prediction, rainbow trail, particles, and traces. `render-hud.js` draws status panels, level select, Help, pause, and completion overlays.

### `ui.js`
Composes the frame, maintains the fixed-step accumulator, handles pointer/keyboard state transitions, and starts the game loop.

## Compact level keys

| Key | Meaning |
|---|---|
| `n` | level name |
| `p` | unicorn position |
| `t` | ordered target tuples |
| `m` | maximum reflection allowance |
| `q` | prediction simulation budget |
| `w` | reflective walls / prisms |
| `o` | rainbow-arch portals |
| `f` | wind fields |
| `z` | dream-cloud slow zones |
| `a` | accelerator zones |
| `g` | gravity wells |
| `s` | spin fields |
| `c` | charge fields |
| `k` | polarity / magnetic fields |
| `b` | timed storm barriers |
| `r` | resonance speed gates |
| `v` | hazards |

Target tuples use:

```text
[x, y, requiredBounces, motionMode, amplitude, speed, phase, radius]
```

## Important compact symbols

| Symbol | Role |
|---|---|
| `$x` | resize canvas / DPR |
| `$L` | pointer → logical-world coordinates |
| `$w` | shared periodic motion |
| `tp` | moving target position |
| `wp` | moving wall position |
| `pp` | portal endpoint position |
| `hit` | swept relative-motion target contact |
| `_i` | unlock/resume Web Audio |
| `tk` | adaptive music transport |
| `ms` | state-aware 64-step arrangement |
| `mu` | sub + filtered mid-bass voice |
| `$j` | compact one-shot synth/SFX |
| `Z` | reflect projectile |
| `_e` | swept moving-wall collision |
| `_f` | one projectile physics tick |
| `$7` | live-shot + ordered-cloud progression |
| `$Q` | fixed simulation update |
| `$H` | cloud targets and order cues |
| `$N` | unicorn renderer |
| `$J` | trajectory prediction |
| `$C` | live rainbow ribbon |
| `$K` | menu/overlay renderer |
| `$U` | pointer action dispatcher |

## Collision invariants

Three invariants matter for reliable play:

1. A fast projectile cannot tunnel through a moving cloud merely because neither endpoint lies inside its radius.
2. A moving prism collision is resolved at the earliest relative-time face crossing rather than by testing only the final overlap.
3. Portal teleportation is not treated as a physical swept segment through the intervening map.

Those are covered by the solution and moving-wall regression tests.

## Music invariants

The soundtrack is state-aware but must remain browser-safe:

- one recursive transport timer;
- AudioContext starts only after user interaction;
- every oscillator has an explicit stop time;
- `S` gates both music and SFX;
- no new voices are emitted while muted;
- no external audio files or libraries.

## Release parity

The readable runtime and frozen standalone build should agree on campaign data, physics, target ordering, scoring, controls, audio behavior, persistence, and visual state transitions. The exact competition ZIP is frozen separately and should be attached to the final tagged GitHub Release; this guide describes the public source used to reason about that artifact.
