# uniRico Source Guide

This document is the bridge between the **readable public source** in `src/` and the compact single-file build in `index.html`.

The game is size-constrained, so the shipping runtime deliberately uses short identifiers and packed data. The public repository should still be useful to another developer who wants to learn how the game works. Rather than pretending the byte-conscious artifact is conventional application code, this guide explains its structure directly.

---

## Recommended reading order

1. [`README.md`](../README.md) — what the game is and why the systems exist
2. [`src/levels.js`](../src/levels.js) — the declarative campaign data
3. [`src/game.js`](../src/game.js) — formatted runtime source
4. [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) — design and engine-level explanation
5. [`index.html`](../index.html) — the actual compact single-file runtime

The files in `src/` are a readability mirror of the current v0.3.0 runtime. They preserve compact identifiers where doing so makes comparison with the shipped artifact easier.

---

# 1. Mental model

Treat the runtime as seven conceptual modules:

```text
1. Level data
2. Global game state + persistence
3. Motion helpers
4. Projectile physics + target logic
5. Rendering + procedural audio
6. Menus / assistance / input
7. Fixed-step simulation loop
```

Those modules live in one script in the competition build, but they are conceptually separate.

---

# 2. World and timing

The logical game world is:

```text
960 × 600
```

The canvas scales to fit the browser while pointer coordinates are converted back into this logical space. That means level geometry, collision detection, prediction, and rendering all operate in one stable coordinate system.

Gameplay advances in approximately **16.667 ms fixed simulation steps** inside a `requestAnimationFrame` loop. The render rate can vary while the projectile model remains comparatively stable.

---

# 3. Level object keys

The level format is intentionally terse because it is repeated forty times.

| Key | Meaning |
|---|---|
| `n` | level name |
| `p` | unicorn / launcher position `[x,y]` |
| `t` | ordered cloud targets |
| `m` | maximum reflection allowance |
| `q` | trajectory-preview simulation budget |
| `w` | walls / reflective prisms |
| `o` | rainbow arches / portal pairs |
| `f` | wind fields |
| `z` | dream-cloud slow zones |
| `a` | acceleration / stardust zones |
| `g` | gravity / moonbow fields |
| `s` | spin fields |
| `b` | timed storm barriers |
| `c` | charge fields |
| `k` | polarity / magnetic fields |
| `r` | resonance-speed gates |
| `v` | void / storm hazards |

Missing mechanic arrays mean that mechanic is absent from the level.

---

# 4. Target tuple

Cloud targets use:

```text
[x, y, requiredBounces, motionMode, amplitude, speed, phase, radius]
```

Only the leading values required by a target need to be supplied.

For example:

```js
[790, 80, 1]
```

means a stationary target at `(790,80)` that must be reached after exactly one reflection.

The later tuple fields animate targets using the shared motion function.

---

# 5. Motion modes

The same small periodic-motion helper is shared by targets, moving walls, and portal endpoints.

Conceptually:

| Mode | Motion |
|---|---|
| `0` | stationary |
| `1` | horizontal sine |
| `2` | vertical sine |
| `3` | circular / elliptical |
| `4` | compound figure-like motion |

Reusing the same primitive across multiple mechanic families is one of the central byte-saving ideas in uniRico.

---

# 6. Shared field rigs

`F0` through `F9` in `src/levels.js` are reusable mechanical environments.

A later campaign level can write:

```js
{ n: "...", p: [...], t: [...], ...F3, m: 4, q: 56 }
```

instead of repeating all of the walls, gates, portals, fields, and hazards that make up that environment.

This creates recurring puzzle motifs and saves compressed bytes at the same time.

---

# 7. Projectile state

A live shot stores a compact state vector. Conceptually it contains:

```text
position
previous position
velocity
reflection count
current cloud index
portal cooldown
portal hold state
spin
charge polarity
one-shot field bookkeeping
age
recorded path points
```

The exact compact property names are less important than the lifecycle:

```text
create shot
  ↓
apply continuous fields
  ↓
advance position
  ↓
resolve walls / barriers
  ↓
resolve portals
  ↓
apply one-shot field transitions
  ↓
validate gates / hazards
  ↓
check active cloud target
```

---

# 8. Why prediction and the live shot agree

The trajectory preview does **not** use a simplified second physics model.

It creates a simulated projectile and advances it through the same step function used by the real rainbow, with visual/audio side effects disabled.

That is a key correctness property for the game:

> the prediction should describe the same world the committed shot will actually travel through.

The preview can still become less informative on difficult levels because each level limits how long the preview is simulated.

---

# 9. Runtime symbol map

The compact build uses short names to save bytes. The table below gives the descriptive meaning of the important top-level functions.

## Layout / data helpers

| Compact symbol | Descriptive meaning |
|---|---|
| `$x` | resize canvas / update device pixel ratio |
| `tr` | calculate logical-world scale and offset |
| `$L` | convert pointer event to world coordinates |
| `O` | get current level |
| `A` | get mechanic array or empty array |
| `$w` | shared periodic motion function |
| `tp` | target position at simulation time |
| `wp` | wall position at simulation time |
| `pp` | portal endpoint position at simulation time |

## Records / lifecycle

| Compact symbol | Descriptive meaning |
|---|---|
| `$2` | recompute campaign totals |
| `$o` | persist records / current level |
| `_c` | format simulation time |
| `$Y` | level par time |
| `sol` | decode compact solution angle / delay |
| `$Z` | calculate score and star rank |
| `$0` | refresh HUD |
| `$1` | reset current attempt |
| `$b` | launch / enter a level |

## Audio / feedback

| Compact symbol | Descriptive meaning |
|---|---|
| `_i` | get/resume AudioContext |
| `$j` | synthesize a short tone |
| `$u` | spawn particle burst |
| `_d` | spawn floating feedback text |

## Physics

| Compact symbol | Descriptive meaning |
|---|---|
| `Z` | reflect projectile velocity and count bounce |
| `_e` | moving-wall collision |
| `$E` | timed-barrier collision |
| `$O` | portal transfer / portal hold behavior |
| `$D` | one-shot accelerator / spin / charge field transitions |
| `_f` | advance one projectile simulation tick |
| `$i` | construct a new projectile |

## Shot / target lifecycle

| Compact symbol | Descriptive meaning |
|---|---|
| `$3` | fire current aimed shot |
| `$z` | archive previous path |
| `$4` | fail / end a missed shot |
| `win` | score and complete the level |
| `$5` | advance to next level / finish campaign |
| `$6` | enter automated help playback |
| `$p` | finish solution / mirrored playback |
| `$7` | advance live shot and validate current cloud |

## Update

| Compact symbol | Descriptive meaning |
|---|---|
| `$Q` | one fixed simulation update |

## Rendering

| Compact symbol | Descriptive meaning |
|---|---|
| `$M` | transform canvas into logical world coordinates |
| `K` | circle helper |
| `_h` | sky background / atmosphere |
| `$G` | motion guide rendering |
| `$R` | prisms / walls |
| `$I` | rainbow arches / portals |
| `fans` | wind-field rendering |
| `$S` | dream-cloud / accelerator zones |
| `$P` | gravity and polarity fields |
| `$v` | spin / charge zones |
| `$B` | barriers, resonance gates, hazards |
| `$H` | cloud targets |
| `$N` | unicorn launcher |
| `$J` | white trajectory prediction |
| `ghost` | historical / learned traces |
| `$C` | live rainbow projectile and tail |
| `fx` | particles and floating text |
| `$8` | in-game information panels |
| `_g` | menu button helper |
| `$9` | best-record text |
| `$f` | level-grid hover / selection index |
| `$A` | level-select screen |
| `$K` | menus / overlays |
| `_a` | compose one rendered frame |
| `_b` | requestAnimationFrame driver |

## Input

| Compact symbol | Descriptive meaning |
|---|---|
| `$U` | pointer click / menu action dispatcher |

The keyboard handler is registered at the bottom of the runtime and performs the same state transitions for shortcuts.

---

# 10. Important global state

A few compact top-level variables are worth knowing when tracing execution:

| Symbol | Meaning |
|---|---|
| `L` | current level index |
| `F` | current mode / menu state |
| `B` | active projectile or `null` |
| `J` | global simulation clock used by moving mechanics |
| `Y` | elapsed level time |
| `V` | local performance records |
| `$e` | current aim position |
| `$d` | shot count |
| `$q` | recent failed-shot traces |
| `$g` | particle list |
| `$r` | floating text list |
| `$l` | learned solution trace |

These names are kept compact only in the size-conscious runtime. When reasoning about the code, substitute the descriptive names mentally.

---

# 11. Rendering order

The frame compositor intentionally draws systems in layers so the playfield remains readable.

At a high level:

```text
sky
previous traces
trajectory preview
force fields
wind / zones / barriers
prisms
rainbow arches
cloud targets
unicorn
live rainbow projectile
particles / feedback
HUD information
menus / overlays
```

That order prevents the rainbow trail from disappearing behind most environmental effects and keeps objective clouds readable.

---

# 12. Assistance system

uniRico has three progressively stronger forms of help:

### Show Aim
Moves the aim direction to the encoded solution angle. Timing may still matter.

### Watch Mirrored Shot
Runs a mirrored demonstration. This teaches the shape of the maneuver without placing the exact answer directly over the live puzzle.

### Watch Solution
Runs the encoded solution and stores a trace that the player can practice against.

The solution payload is packed into a small base64-backed representation in the compact build.

---

# 13. Menu modes

The compact runtime stores menu / play state numerically.

Conceptually the states are:

```text
main menu
active gameplay
level complete
campaign complete
paused
level select
help
solution playback
```

When reading input logic, first identify the current mode, then follow the corresponding button / shortcut branch.

---

# 14. Where to make common edits

## Change a level
Edit `src/levels.js` and the corresponding compact data in the production build when preparing a release.

## Change physics
Start in the projectile step function (`_f` in the compact runtime), then inspect the helpers for the mechanic you are modifying.

## Change projectile appearance
Look at `$C` and `ghost` in `src/game.js`.

## Change clouds / objectives
Look at `$H`, the target-validation section of `$7`, and the particle feedback helpers.

## Change menus
Look at `$K`, `$A`, `_g`, `$U`, and the keyboard handler.

## Change the unicorn
Look at `$N`.

## Change audio
Look at `_i` and `$j`.

---

# 15. Development mirror vs. submission artifact

The files in `src/` are **for humans**.

The root `index.html` is **for the byte budget**.

They currently represent the same v0.3.0 behavior, but only the root single-file build is the competition-oriented artifact. Future gameplay changes should ideally be made in readable source first and then folded into the compact release build.

A proper post-jam build pipeline could automate that transformation. For the current competition phase, the repository deliberately favors simplicity and traceability over introducing a large toolchain solely to generate a 13KB file.

---

# 16. The main engineering lesson

The important part of uniRico's implementation is not any individual abbreviated function name. It is the reuse strategy:

- one motion primitive animates several mechanic families;
- one projectile simulation powers both prediction and reality;
- compact tuples represent many level variants;
- reusable rigs create mechanically dense late levels;
- procedural Canvas art replaces image assets;
- procedural Web Audio replaces audio files;
- one emotional theme maps abstract constraints into readable game objects.

That is where most of the project's 13KB design value lives.
