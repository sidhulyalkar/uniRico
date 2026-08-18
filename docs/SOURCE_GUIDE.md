# uniRico v0.11.0 Source Guide

The shipping game is byte-conscious, but its architecture is straightforward when read as separate systems.

## Runtime pipeline

```text
pointer / keyboard
      ↓
game + menu state
      ↓
fixed-step projectile simulation
      ↓
fields / walls / portals / hazards
      ↓
swept ordered-cloud collision
      ↓
Canvas feedback + Web Audio
```

## Level keys

| Key | Meaning |
|---|---|
| `n` | level name |
| `p` | unicorn position |
| `t` | ordered cloud targets |
| `m` | maximum bounce allowance |
| `q` | trajectory preview budget |
| `w` | prism walls |
| `o` | rainbow portals |
| `f` | wind |
| `z` | slow dream clouds |
| `a` | accelerators |
| `g` | gravity / moonbow wells |
| `s` | spin fields |
| `b` | timed storm barriers |
| `c` | charge zones |
| `k` | magnetic/polarity fields |
| `r` | resonance speed gates |
| `v` | hazards |

Targets use:

```text
[x, y, requiredBounces, motionMode, amplitude, speed, phase, radius]
```

## v0.11 HUD lifecycle

The live HTML HUD is deliberately minimal: it contains only `#time` and `#next`. `$0()` refreshes the objective whenever a level resets or target order advances, while the fixed-step loop updates the timer. `ui.js` hides the entire live HUD whenever the game is paused or showing menu/help/completion states.

Campaign statistics are still computed in `$2()`, but they are presented on the main menu, completion screens, and the pause stats section rather than occupying the playfield.

The Canvas HUD function `$8()` remains intentionally transient. For approximately the first 3.5 seconds of active play it draws one centered level-introduction card containing the level name and tagline, then fades away.

## v0.10+ music state machine

`audio.js` uses one recursive transport (`tk`) and chooses its arrangement from whether `B`, the live projectile, exists.

- **Planning (`B == null`)**: slow harmonic motion using long sine/triangle voices and no drum grid.
- **Flight (`B != null`)**: the Wobble Warfare four-bar dubstep phrase with sub, kicks, sharp snare, hats, wobble/formant bass, yoi responses, transitions, and reflection-weighted pacing.

The state transition requires no separate song player: the next transport tick sees the new projectile state and changes both tempo and orchestration.

## Important compact functions

| Symbol | Role |
|---|---|
| `tp` | moving target position |
| `wp` | moving wall position |
| `pp` | portal endpoint position |
| `hit` | swept projectile-vs-moving-cloud collision |
| `_f` | one projectile physics step |
| `$7` | ordered cloud hit progression |
| `$H` | cloud rendering / ordering cues |
| `$J` | trajectory preview |
| `$C` | live rainbow projectile |
| `$Q` | fixed simulation update |

## v0.4 collision fix

The old target check was effectively:

```text
is projectile position inside target circle after this tick?
```

That could miss a tiny cloud when a fast shot crossed the entire circle between ticks.

The new `hit()` helper works in **relative motion space**. It subtracts target movement from projectile movement and finds the closest point on that relative segment to the target origin. A hit is registered whenever the segment crosses the effective target radius.

Portal jumps are deliberately excluded from segment sweeping, because teleportation is not physical travel between the portal endpoints.

## Ordering semantics

Only the active cloud may advance the chain. If a future unresolved cloud is physically hit first, the attempt now reports the mistake instead of silently ignoring the contact. Already-completed happy clouds remain harmless to pass through.

## Campaign progression

The current campaign uses target count as an additional teaching lever:

```text
1–19   mostly one-lock lessons
20     first full mixed field
21–25  two-lock practice
26–30  three-lock practice
31–40  advanced chains
```

This keeps the mechanical vocabulary rich without forcing a six-to-nine-lock precision chain immediately after the tutorial material.

## Procedural soundtrack (v0.10+ retained in v0.11.0)

The soundtrack is generated in `src/runtime/audio.js`; there is still no audio asset file. v0.11.0 combines a sparse orchestral planning bed with the dubstep-specific synthesis developed in Wobble Warfare: stronger sub fundamentals, variable-rate resonant wobble sweeps, high-Q band-pass formants, yoi-style response stabs, and sharper half-time percussion.

- `_i()` creates / resumes `AudioContext` and starts exactly one adaptive transport timer.
- `$j()` is the short one-shot oscillator used by game SFX, drums, digital ticks, and transition sweeps. Its final argument controls the end/start pitch ratio, allowing either downward percussion sweeps or upward risers.
- `mu()` is the bass voice. A saw/square mid-bass passes through a resonant filter while a sine at the musical root bypasses the filter as the clean sub. The `w` bitfield selects waveform, wobble timing/resonance, and optional band-pass formant mode.
- `ms()` advances either the sparse planning pattern or the dense 64-step / four-bar flight arrangement, depending on whether a rainbow is live.
- `mt` stores the single recursive timer so repeated game SFX cannot accidentally create multiple music transports.
- `mb` is the music step counter.

The transport reschedules every sixteenth note. Planning uses a slower mid-70-BPM harmonic pulse with long overlapping sine/triangle voices and no drum grid. A live rainbow switches into a denser ~96–114-BPM dubstep pocket; reflections slightly weight that pocket further. Alternating step delays add swing. The flight arrangement still uses one encoded 64-character bass phrase and compact bitmasks, which is cheaper than a conventional note/event object graph while allowing state, bar, groove, and transition variation.

The bar structure is intentionally asymmetric:

```text
bar 1  establish groove
bar 2  busier variation + rising transition
bar 3  lower-root/heavier drop phrase
bar 4  denser trap hats + glitch ending
```

Small low-probability digital and bass accents introduce controlled randomness while leaving the core phrase recognizable. The live rainbow also triggers a call-response bass fill at a fixed step, linking soundtrack activity to gameplay without changing the deterministic physics simulation.

Browser autoplay rules are respected because `_i()` is first reached through normal user-triggered game audio. Setting `$y` false makes music and SFX synthesis return before creating new audio nodes.
