# uniRico Source Guide

This document is the bridge between the **readable public source** in `src/` and the compact single-file build in `index.html`.

The game is size-constrained, so the shipping runtime deliberately uses short identifiers and packed data. The public repository should still be useful to another developer who wants to learn how the game works. Rather than pretending the byte-conscious artifact is conventional application code, this guide explains its structure directly.

---

## Recommended reading order

1. [`README.md`](../README.md) — what the game is and why the systems exist
2. [`src/levels.js`](../src/levels.js) — the declarative campaign data
3. [`src/runtime/core.js`](../src/runtime/core.js) — state, motion, lifecycle, records, audio
4. [`src/runtime/physics.js`](../src/runtime/physics.js) — projectile simulation and cloud progression
5. [`src/runtime/render-world.js`](../src/runtime/render-world.js) — environment / mechanics rendering
6. [`src/runtime/render-entities.js`](../src/runtime/render-entities.js) — unicorn, clouds, traces, rainbow projectile
7. [`src/runtime/render-hud.js`](../src/runtime/render-hud.js) — HUD, menus, levels, help
8. [`src/runtime/ui.js`](../src/runtime/ui.js) — frame composition and input
9. [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) — design and engine-level explanation
10. [`index.html`](../index.html) — the actual compact single-file runtime

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

The readable mirror maps those concepts onto files:

```text
levels.js
runtime/core.js
runtime/physics.js
runtime/render-world.js
runtime/render-entities.js
runtime/render-hud.js
runtime/ui.js
```

Those systems are folded into one script in the competition-oriented build.

---

# 2. World and timing

The logical game world is:

```text
960 × 600
```

The canvas scales to fit the browser while pointer coordinates are converted back into this logical space. Level geometry, collision detection, prediction, and rendering therefore operate in one stable coordinate system.

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

`F0` through `F9` in [`src/levels.js`](../src/levels.js) are reusable mechanical environments.

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

The main implementation lives in [`src/runtime/physics.js`](../src/runtime/physics.js).

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

| Compact symbol | Descriptive meaning | Readable file |
|---|---|---|
| `$x` | resize canvas / update device pixel ratio | `runtime/core.js` |
| `tr` | calculate logical-world scale and offset | `runtime/core.js` |
| `$L` | convert pointer event to world coordinates | `runtime/core.js` |
| `O` | get current level | `runtime/core.js` |
| `A` | get mechanic array or empty array | `runtime/core.js` |
| `$w` | shared periodic motion function | `runtime/core.js` |
| `tp` | target position at simulation time | `runtime/core.js` |
| `wp` | wall position at simulation time | `runtime/core.js` |
| `pp` | portal endpoint position at simulation time | `runtime/core.js` |

## Records / lifecycle

| Compact symbol | Descriptive meaning | Readable file |
|---|---|---|
| `$2` | recompute campaign totals | `runtime/core.js` |
| `$o` | persist records / current level | `runtime/core.js` |
| `_c` | format simulation time | `runtime/core.js` |
| `$Y` | level par time | `runtime/core.js` |
| `sol` | decode compact solution angle / delay | `runtime/core.js` |
| `$Z` | calculate score and star rank | `runtime/core.js` |
| `$0` | refresh HUD | `runtime/core.js` |
| `$1` | reset current attempt | `runtime/core.js` |
| `$b` | launch / enter a level | `runtime/core.js` |

## Audio / feedback

| Compact symbol | Descriptive meaning | Readable file |
|---|---|---|
| `_i` | get/resume AudioContext | `runtime/core.js` |
| `$j` | synthesize a short tone | `runtime/core.js` |
| `$u` | spawn particle burst | `runtime/core.js` |
| `_d` | spawn floating feedback text | `runtime/core.js` |

## Physics

| Compact symbol | Descriptive meaning | Readable file |
|---|---|---|
| `Z` | reflect projectile velocity and count bounce | `runtime/physics.js` |
| `_e` | moving-wall collision | `runtime/physics.js` |
| `$E` | timed-barrier collision | `runtime/physics.js` |
| `$O` | portal transfer / portal hold behavior | `runtime/physics.js` |
| `$D` | one-shot accelerator / spin / charge field transitions | `runtime/physics.js` |
| `_f` | advance one projectile simulation tick | `runtime/physics.js` |
| `$i` | construct a new projectile | `runtime/physics.js` |

## Shot / target lifecycle

| Compact symbol | Descriptive meaning | Readable file |
|---|---|---|
| `$3` | fire current aimed shot | `runtime/physics.js` |
| `$z` | archive previous path | `runtime/physics.js` |
| `$4` | fail / end a missed shot | `runtime/physics.js` |
| `win` | score and complete the level | `runtime/physics.js` |
| `$5` | advance to next level / finish campaign | `runtime/physics.js` |
| `$6` | enter automated help playback | `runtime/physics.js` |
| `$p` | finish solution / mirrored playback | `runtime/physics.js` |
| `$7` | advance live shot and validate current cloud | `runtime/physics.js` |
| `$Q` | one fixed simulation update | `runtime/physics.js` |

## Environment rendering

| Compact symbol | Descriptive meaning | Readable file |
|---|---|---|
| `$M` | transform canvas into logical world coordinates | `runtime/render-world.js` |
| `K` | circle helper | `runtime/render-world.js` |
| `Cld` | procedural cloud helper | `runtime/render-world.js` |
| `_h` | sky background / atmosphere | `runtime/render-world.js` |
| `$G` | motion guide rendering | `runtime/render-world.js` |
| `$R` | prisms / walls | `runtime/render-world.js` |
| `$I` | rainbow arches / portals | `runtime/render-world.js` |
| `fans` | wind-field rendering | `runtime/render-world.js` |
| `$S` | dream-cloud / accelerator zones | `runtime/render-world.js` |
| `$P` | gravity and polarity fields | `runtime/render-world.js` |
| `$v` | spin / charge zones | `runtime/render-world.js` |
| `$B` | barriers, resonance gates, hazards | `runtime/render-world.js` |

## Entity / trajectory rendering

| Compact symbol | Descriptive meaning | Readable file |
|---|---|---|
| `$H` | cloud targets | `runtime/render-entities.js` |
| `$N` | unicorn launcher | `runtime/render-entities.js` |
| `$J` | white trajectory prediction | `runtime/render-entities.js` |
| `ghost` | historical / learned traces | `runtime/render-entities.js` |
| `$C` | live rainbow projectile and tail | `runtime/render-entities.js` |
| `fx` | particles and floating text | `runtime/render-entities.js` |

## HUD / menus

| Compact symbol | Descriptive meaning | Readable file |
|---|---|---|
| `$8` | in-game information panels | `runtime/render-hud.js` |
| `_g` | menu button helper | `runtime/render-hud.js` |
| `$9` | best-record text | `runtime/render-hud.js` |
| `$f` | level-grid hover / selection index | `runtime/render-hud.js` |
| `$A` | level-select screen | `runtime/render-hud.js` |
| `$K` | menus / overlays | `runtime/render-hud.js` |

## Frame / input

| Compact symbol | Descriptive meaning | Readable file |
|---|---|---|
| `_a` | compose one rendered frame | `runtime/ui.js` |
| `_b` | requestAnimationFrame driver | `runtime/ui.js` |
| `$U` | pointer click / menu action dispatcher | `runtime/ui.js` |

The keyboard handler is registered at the bottom of `runtime/ui.js` and performs the same state transitions for shortcuts.

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

uniRico has three progressively stronger forms of help.

### Show Aim
Moves the aim direction to the encoded solution angle. Timing may still matter.

### Watch Mirrored Shot
Runs a mirrored demonstration. This teaches the shape of the maneuver without placing the exact answer directly over the live puzzle.

### Watch Solution
Runs the encoded solution and stores a trace that the player can practice against.

The solution payload is packed into a small base64-backed representation in the compact build.

---

# 13. Menu modes

The compact runtime stores menu / play state numerically. Conceptually the states are:

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

When reading input logic, first identify the current mode, then follow the corresponding button / shortcut branch in `runtime/ui.js` and the rendered state in `runtime/render-hud.js`.

---

# 14. Where to make common edits

## Change a level
Edit [`src/levels.js`](../src/levels.js) and keep the corresponding compact data aligned when preparing a release.

## Change physics
Start in `_f` inside [`src/runtime/physics.js`](../src/runtime/physics.js), then inspect the helper for the mechanic being modified.

## Change projectile appearance
Look at `$C` and `ghost` in [`src/runtime/render-entities.js`](../src/runtime/render-entities.js).

## Change clouds / objectives
Look at `$H` in `render-entities.js`, then the target-validation section of `$7` in `physics.js`.

## Change menus
Look at `$K`, `$A`, and `_g` in `render-hud.js`, then `$U` and the keyboard handler in `ui.js`.

## Change the unicorn
Look at `$N` in `render-entities.js`.

## Change audio
Look at `_i` and `$j` in `core.js`.

---

# 15. Trace one shot end to end

A useful exercise is to follow one click through the implementation:

```text
pointer aim
  ↓
$U / $3          input + fire
  ↓
$i               construct projectile
  ↓
$Q               fixed simulation update
  ↓
$7               live-shot / cloud progression
  ↓
_f               one physics tick
  ↓
Z / _e / $O ...  reflection, wall, portal, fields
  ↓
$C               draw fading rainbow ribbon
  ↓
win / $4         complete or fail
```

That one lifecycle explains most of the game.

---

# 16. Development mirror vs. submission artifact

The files in `src/` are **for humans**.

The root `index.html` is **for the byte budget**.

They represent the same v0.3.0 gameplay architecture, but only the root single-file build is the competition-oriented artifact. Future gameplay changes should ideally be made in readable source first and then folded into the compact release build.

A post-jam pipeline could automate that transformation. During the competition phase, the repository favors simplicity and traceability over introducing a large toolchain solely to generate a 13KB file.

---

# 17. The main engineering lesson

The important part of uniRico's implementation is not any individual abbreviated function name. It is the reuse strategy:

- one motion primitive animates several mechanic families;
- one projectile simulation powers both prediction and reality;
- compact tuples represent many level variants;
- reusable rigs create mechanically dense late levels;
- procedural Canvas art replaces image assets;
- procedural Web Audio replaces audio files;
- one emotional theme maps abstract constraints into readable game objects.

That is where most of the project's 13KB design value lives.
