# uniRico v0.15.0 Source Guide

The shipping game is byte-conscious, but the readable source is split into familiar responsibilities.

## Runtime pipeline

```text
input → state → fixed-step physics → ordered locks → rendering/audio → records
```

## Level keys

| Key | Meaning |
|---|---|
| `n` | level name |
| `p` | unicorn position |
| `t` | ordered cloud targets |
| `m` | maximum bounce allowance |
| `q` | trajectory-preview budget |
| `w` | prism walls |
| `o` | rainbow portals |
| `f` | wind |
| `z` | dream-cloud slow zones |
| `a` | accelerators |
| `g` | gravity / moonbow wells |
| `s` | spin fields |
| `b` | timed storm barriers |
| `c` | charge zones |
| `k` | magnetic / polarity fields |
| `r` | resonance speed gates |
| `v` | hazards |

Target tuples are:

```text
[x, y, requiredBounces, motionMode, amplitude, speed, phase, radius]
```

## Mechanic-driven campaign

The intended route of each level is required to interact with every visible mechanic instance, with three documented exceptions: the full-height walls in Levels 3, 13, and 15 are **portal gates**. Their job is to make ordinary cross-arena travel impossible.

This invariant is tested in `tests/mechanic-coverage.js`.

## Difficulty curve

The campaign uses four explicit difficulty levers: more interacting systems, more ordered targets, smaller cloud radii, and shorter `q` trajectory previews. `q` is monotonically non-increasing across all 40 levels.

Level 20 `FIRST MIX` is a regression anchor: its intended solution must use its wind field, spin field, and prism wall.

## True solution regression

`tests/solution-smoke.js` decodes the stored solution angle/delay, advances `_f()` directly, checks every active cloud in order, checks exact required bounce counts, and fails on physics death, wrong order, wrong bounce, or timeout. This verifies actual completion for all 40 encoded routes.

## Mechanic vocabulary and feedback

`core.js` defines one compact key/name vocabulary shared by presentation and live feedback:

```text
w o f z a g s b c k r v
↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
PRISM ARCH WIND DREAM BOOST MOON SPIN STORM CHARGE MAGNET AURORA VOID
```

`ml(level)` scans the current level and builds the second line of the transient title card. Motion-only target lessons add `MOVING CLOUD`.

`mi(ball, mechanicIndex, sim)` is the live cause/effect hook. The projectile carries a small bitmask `u`; on the first activation of a mechanic during a real shot, `mi()` records the bit and emits a floating name, five particles, and a small pitched blip. When `sim` is true, `mi()` does nothing.

## Important compact functions

| Symbol | Role |
|---|---|
| `tp` | moving target position |
| `wp` | moving wall position |
| `pp` | portal endpoint position |
| `hit` | swept projectile-vs-moving-target collision |
| `_f` | one projectile physics step |
| `$7` | ordered cloud progression |
| `$H` | cloud rendering, order numbers, bounce badges, active ring |
| `$J` | trajectory preview |
| `$C` | live rainbow projectile |
| `$Q` | fixed simulation update |
| `ml` | build the transient mechanic briefing |
| `mi` | once-per-shot live mechanic echo |

## HUD and target language

The live HTML HUD contains only `#time`. Objective prose has been removed. `$H()` renders the target grammar directly in the world:

```text
white ring        = active cloud
number on cloud   = sequence order
number above      = required bounce count
```

The bottom-centered Canvas title card is temporary and fades after roughly 3.5 seconds. Pause/menu/completion views own the nonessential statistics.

## Audio

`audio.js` has one state-aware recursive transport. Planning uses sparse orchestral sine/triangle harmony. A live shot switches into procedural dubstep with sub, wobble/formant bass, yoi responses, sharp percussion, and phrase transitions. The audio graph remains asset-free and autoplay-safe.
