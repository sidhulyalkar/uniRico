# 🦄🌈 uniRico v0.11.0

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

## v0.11.0 — minimal flight HUD

This release removes almost everything from the persistent in-level interface so the puzzle field stays visible, especially on late levels with targets near the top edge.

### Only the two live facts that matter

During play, the HUD is now a single compact translucent pill containing only:

```text
00:08.6  ·  NEXT 1/3 · NEED 2 BOUNCES
```

The permanent HUD no longer shows the game logo, level counter, shot count, total stars, or total score. The pill is roughly one third of the old width and one third of its height, with a lighter border/background so it obscures far less of the arena. It also disappears completely whenever the game is paused, on the level-select screen, or in Help/menu states.

The existing level-introduction card remains: `LEVEL XX · NAME` plus the short gameplay tagline appears at level start and fades away after roughly **3.5 seconds**. This keeps orientation information transient rather than permanently occupying the arena.

### Stats moved where they belong

The pause screen now becomes the compact stats surface. It shows:

- current level number + name
- current level timer
- current shot count
- cumulative stars
- cumulative score

The main menu continues to show total stars and score, and the completion screen still exposes time, shots, score, and best result. Nothing was removed from the player's records; it was simply moved out of the aiming view.

### Music and physics retained

v0.11.0 keeps the v0.10 musical split intact: slower orchestral planning before a shot and the denser Wobble Warfare dubstep engine once the rainbow launches. Swept moving-cloud and moving-prism collision fixes, the 40-level campaign, and the Levels 20–30 teaching bridge are unchanged.

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
│   └── hud-layout.js
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

v0.11.0 is covered by automated regression checks for:

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
13,227 / 13,312 bytes
85 bytes remaining
SHA-256: 0491d53468f83a89a27f13f6899a40d76e008781c4d9360bf36ee4cbdddba032
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
