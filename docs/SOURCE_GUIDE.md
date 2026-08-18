# uniRico v0.13.0 Source Guide

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

## v0.13 level-design rule

`src/levels.js` is no longer just a collection of pretty mechanical scenes. The intended route of each level is required to interact with every visible mechanic instance, with three documented exceptions: the full-height walls in Levels 3, 13, and 15 are **portal gates**. They do not need to be struck because their job is to make ordinary cross-arena travel impossible.

This invariant is tested in `tests/mechanic-coverage.js`.

## Difficulty curve

The campaign now uses four explicit difficulty levers:

- more interacting systems;
- more ordered targets;
- smaller cloud radii;
- shorter `q` trajectory previews.

`q` is monotonically non-increasing across all 40 levels. Ordered chains progress from tutorial single locks to 2-lock bridge puzzles, 3-lock chains, 4-lock advanced puzzles, 5-lock endgame sequences, and a 6-lock finale.

Level 20 `FIRST MIX` is a regression anchor: its intended solution must use its wind field, spin field, and prism wall.

## True solution regression

Older smoke testing only checked that Help/Solution mode returned to the play state, which could also happen after a failed solution trace. v0.13 replaces that weak signal with target-by-target simulation:

1. decode the stored solution angle and delay;
2. advance `_f()` directly;
3. assert every active cloud is reached in order;
4. assert exact required bounce counts;
5. fail on physics death, wrong order, wrong bounce, or timeout.

This verifies actual completion for all 40 encoded routes.

## Important compact functions

| Symbol | Role |
|---|---|
| `tp` | moving target position |
| `wp` | moving wall position |
| `pp` | portal endpoint position |
| `hit` | swept projectile-vs-moving-target collision |
| `_f` | one projectile physics step |
| `$7` | ordered cloud progression |
| `$H` | cloud rendering / order cues |
| `$J` | trajectory preview |
| `$C` | live rainbow projectile |
| `$Q` | fixed simulation update |

## HUD

The live HTML HUD contains only `#time` and `#next`. The bottom-centered Canvas title card is temporary and fades after roughly 3.5 seconds. Pause/menu/completion views own the nonessential statistics.

## Audio

`audio.js` has one state-aware recursive transport. Planning uses sparse orchestral sine/triangle harmony. A live shot switches into procedural dubstep with sub, wobble/formant bass, yoi responses, sharp percussion, and phrase transitions. The audio graph remains asset-free and autoplay-safe.
