# 🦄🌈 uniRico v0.10.0

<p align="center">
  <img src="docs/banner.svg" alt="uniRico — Rainbow Ricochet" width="100%">
</p>

<p align="center">
  <strong>A 13KB rainbow-ricochet puzzle game where a magical unicorn bends rainbows through a sky full of prisms, portals, gravity, wind, and grumpy clouds.</strong>
</p>

<p align="center">
  <strong>THE SKY GOT GRUMPY · YOU HAVE A HORN · FIX IT</strong>
</p>

Built for **js13kGames 2026** around the theme **Unicorns and Rainbows**.

## v0.10.0 — cleaner sky, orchestral calm, dubstep launch

This release focuses on making the playfield easier to read while giving the soundtrack a stronger relationship to the player's decision cycle.

### Cleaner in-level presentation

The two large Canvas HUD ovals are gone as permanent fixtures.

- The **level name + tagline** now appear in one centered introduction card at the start of a level.
- That card remains fully visible, then fades away after roughly **3.5 seconds**, leaving the playfield unobstructed.
- The previous right-side white objective oval has been removed completely.
- `NEXT X/X · NEED X BOUNCES` now lives inside the persistent cream/yellow top HUD, centered beneath level, time, shots, stars, and score.
- The objective row updates immediately when a cloud is cleared or when a failed attempt resets the chain.

The result is a much less crowded arena once the player has oriented themselves.

### Two musical worlds

The procedural soundtrack now deliberately separates **thinking** from **commitment**.

**Before the shot:** a slower orchestral-style planning bed runs around the mid-70 BPM range. Long sine and triangle voices overlap into four-bar harmonic motion, with no kick/snare grid competing with trajectory planning.

**After firing:** the music snaps into the procedural dubstep engine. The shot state retains the deep root sub, irregular kicks, sharp half-time snare, wobble/formant bass, yoi-style answers, hats, risers, growls, swing, and phrase-end stutters introduced by Wobble Warfare.

This creates a deliberate musical arc:

```text
study the sky → calm harmonic space → click → bass drop → rainbow chaos
```

The music is still generated entirely through Web Audio. There are **no music files, samples, libraries, or network assets**.

## Gameplay

Aim the unicorn's horn, fire a rainbow, and reach each active cloud with exactly the required number of reflections. Later levels combine:

- moving targets and moving prisms
- rainbow-arch portals
- wind fields
- dream-cloud slow zones
- stardust accelerators
- moonbow gravity
- spin
- charge and magnetic polarity
- pulsing storm barriers
- resonance-speed gates
- dark hazards

The campaign contains **40 levels**. Levels 20–30 form a gentler mixed-mechanic bridge so players practice interacting systems before the final ten levels become dense multi-system machines.

## Readability and feedback

Target order is deliberately redundant:

- the active cloud has the strongest outline and `NEXT` badge;
- unresolved dark clouds have a white silhouette for contrast;
- a subtle connector points toward the next unresolved target;
- the top HUD states the current target number and required bounce count;
- hitting a future cloud first produces explicit wrong-order feedback.

Cloud contact and moving-wall contact use swept collision tests so small moving targets and thin moving prisms cannot be skipped between simulation ticks.

## Controls

| Input | Action |
|---|---|
| Mouse / pointer | Aim |
| Click / tap | Fire |
| `M` / `Esc` | Pause / menu |
| `R` | Restart level |
| `H` | Help |
| `P` | Toggle trajectory preview |
| `S` | Toggle music + SFX |
| `[` / `]` | Previous / next level during development |
| `Space` / `Enter` | Continue after completion |

## Repository layout

```text
uniRico/
├── index.html                         # Readable browser entry point
├── README.md
├── CHANGELOG.md
├── src/
│   ├── index.html
│   ├── style.css
│   ├── levels.js
│   └── runtime/
│       ├── core.js
│       ├── audio.js
│       ├── physics.js
│       ├── render-world.js
│       ├── render-entities.js
│       ├── render-hud.js
│       └── ui.js
├── tests/
│   ├── solution-smoke.js
│   ├── moving-wall-collision.js
│   ├── audio-sequencer.js
│   ├── module-load.js
│   └── hud-layout.js
├── tools/
│   └── build_js13k_zip.py
└── docs/
    ├── banner.svg
    ├── SOURCE_GUIDE.md
    ├── ARCHITECTURE.md
    └── COMPETITION_CHECKLIST.md
```

The readable source is split by responsibility. The actual js13k artifact is rebuilt separately as a single self-contained `index.html` and compressed into a deterministic ZIP.

## Audio architecture

The soundtrack uses one recursive transport rather than a fixed interval. Each transport tick looks at live game state:

```text
no projectile
    ↓
slow orchestral planning phrase

projectile alive
    ↓
procedural dubstep drop
    ↓
wobble / formant / yoi phrase selection
    ↓
reflection count subtly changes pacing
```

Every oscillator has an explicit stop time. Muting audio prevents new synthesis voices from being created. Browser autoplay rules are respected by creating/resuming the AudioContext only after normal player interaction.

## Running locally

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

For the readable source shell directly:

```text
http://localhost:8000/src/
```

## Validation

v0.10.0 is covered by automated regression checks for:

- all **40/40 encoded solution trajectories**
- high-speed and moving-prism swept collisions
- moving-wall reflection in the wall's own reference frame
- post-impact separation / anti-sticking behavior
- the orchestral-vs-dubstep tempo-state transition
- Web Audio oscillator lifecycle and mute gating
- deep sub, high-frequency percussion, formant filters, and transition automation
- HUD objective placement and update logic
- the disappearing level-intro card
- removal of the old right-side objective oval
- JavaScript syntax for every readable runtime module
- exact js13k archive structure and size

A final human **current Chrome + current Firefox** gameplay/audio pass remains part of the release checklist before official submission.

## Current js13k candidate

```text
13,291 / 13,312 bytes
21 bytes remaining
SHA-256: 7198d7e13f5f5f4dbaab983f77c404956b9c42b98b5f641d80b88075976ecb23
```

The competition ZIP contains exactly one root-level `index.html`.

## Engineering idea

uniRico gets most of its complexity through reuse rather than asset count:

- one deterministic projectile simulation powers both the live shot and trajectory preview;
- one compact motion primitive animates targets, prisms, and portal endpoints;
- reusable field rigs create dense late-game environments;
- procedural Canvas rendering replaces sprites;
- procedural Web Audio replaces music and SFX assets;
- compact tuples encode the 40-level campaign.

The tiny build is the constraint. **This repository is the explanation.**

<p align="center">
  🦄 <strong>Aim the horn. Bend the rainbow. Fix the sky.</strong> 🌈
</p>
