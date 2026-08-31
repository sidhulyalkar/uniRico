# uniRico v0.20.0 Source Guide

The shipping game is aggressively byte-conscious, but the public source remains split into readable responsibilities.

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

## 50-level campaign

Levels 1–40 are compact declarative puzzles from `src/levels.js`. Levels 41–50 are generated in `core.js` by `rf(level,index)`, which creates exact 180° spatial transformations of Levels 31–40.

The reflection transform rotates point geometry with `(W-x,H-y)`, rectangle geometry with `(W-x-width,H-y-height)`, negates directional forces/motion amplitudes where required, rotates both portal endpoints, and preserves scalar properties such as polarity, speed bands, bounce requirements, and spin under 180° rotation. `sol()` reuses the source level's encoded angle/delay and adds π to the launch angle.

This makes the final ten levels new reversed spatial problems without storing ten duplicate late-game maps or ten duplicate solution records.

## Mechanic-driven invariant

The intended route of every level must interact with every visible mechanic instance, with three documented gate exceptions: the full-height walls in Levels 3, 13, and 15 force portal traversal.

`tests/mechanic-coverage.js` executes all 50 intended routes and records per-instance interactions. Reflection levels must preserve the mechanic-family set of their source level.

## Difficulty curve

Difficulty uses mechanic composition, ordered target count, target radius, and trajectory-preview budget `q`. Preview assistance is monotonically non-increasing through all 50 levels.

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

Level 20 `FIRST MIX` remains a regression anchor: its intended solution must use wind, spin, and prism interaction.

## True solution regression

`tests/solution-smoke.js` decodes the stored solution angle/delay, advances `_f()` directly, checks every active cloud in order, checks exact bounce counts, and fails on physics death, wrong order, wrong bounce, or timeout.

The test now proves **50/50 routes**, verifies target-count correspondence for Levels 41–50, requires the reflected names, and locks Level 50 to `MIRROR FULL SPECTRUM` with six ordered targets.

## Mechanic vocabulary

```text
w o f z a g s b c k r v
↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
PRISM ARCH WIND DREAM BOOST MOON SPIN STORM CHARGE MAGNET AURORA VOID
```

`ml(level)` derives the transient mechanic briefing from actual level data. `mi(ball,index,sim)` emits a once-per-shot live mechanic echo while simulation mode remains silent.

## Important compact functions

| Symbol | Role |
|---|---|
| `rf` | generate a reflected mastery level |
| `si` | map reflected level index back to source solution data |
| `sol` | decode launch angle/delay and rotate reflected solutions by π |
| `tp` | moving target position |
| `wp` | moving wall position |
| `pp` | portal endpoint position |
| `hit` | swept projectile-vs-moving-target collision |
| `_f` | one projectile physics step |
| `$7` | ordered cloud progression |
| `$H` | cloud rendering / target grammar |
| `$J` | trajectory preview |
| `$C` | live rainbow projectile |
| `$Q` | fixed simulation update |
| `ml` | transient mechanic briefing |
| `mi` | once-per-shot mechanic feedback |

## HUD and target language

The live HTML HUD contains only `#time`. Objective information is embedded in the cloud geometry:

```text
white ring        = active cloud
number on cloud   = sequence order
number above      = required bounce count
```

## Audio

`audio.js` uses one state-aware recursive Web Audio transport. Planning is sparse and orchestral; live flight shifts into procedural bass music. No audio samples or external assets ship.

## Competition build

`tools/build_js13k_zip.py` first minifies the readable modules with pinned Terser 5.50.0. It then builds both a Terser-only candidate and a deterministic Roadroller 2.1.0 `-O0` candidate, applies Zopfli DEFLATE to each complete HTML payload, and selects the smaller **final ZIP**.

Release CI builds the archive twice and requires byte-for-byte identity, then extracts and executes the exact packed runtime before accepting the candidate. The current 50-level PR candidate is **11,512 / 13,312 bytes**, leaving **1,800 bytes** free.
