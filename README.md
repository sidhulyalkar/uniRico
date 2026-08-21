# 🦄🌈 uniRico v0.18.0

<p align="center">
  <img src="docs/banner.svg" alt="uniRico — Rainbow Ricochet" width="100%">
</p>

<p align="center">
  <strong>A 13 KB rainbow-ricochet puzzle game where a magical unicorn bends one rainbow through prisms, portals, weather, gravity, spin, polarity, and grumpy clouds.</strong>
</p>

<p align="center"><strong>THE SKY GOT GRUMPY · YOU HAVE A HORN · FIX IT</strong></p>

Built for **js13kGames 2026** around the theme **Unicorns and Rainbows**, targeting **Desktop + Mobile**.

## v0.18.0 — Competition polish

This pass focuses on the things a judge feels rather than adding another pile of mechanics.

### Adaptive touch controls

Mobile play supports two complementary styles without a setup screen:

- **quick tap** — direct aim + fire
- **drag anywhere, release** — aim by gesture direction, then fire on release

Touch-down no longer accidentally commits a shot. The tap-versus-drag deadzone quietly adapts to each player's observed touch jitter and is stored locally. Sound and trajectory-preview settings are tappable from the pause menu and persist between sessions. Pointer cancellation is handled explicitly so browser interruptions cannot leave a stuck gesture or accidental shot behind.

### Rainbow-aware procedural music

The soundtrack is generated entirely with Web Audio, and the music now follows the same language as the puzzle:

- a **six-note rainbow palette** drives ricochet, cloud-resolution, and victory feedback;
- ordered-cloud progress gently lifts the flight harmony;
- bounce count changes wobble behavior;
- a master dynamics-compressor bus reduces harsh stacked-oscillator peaks when supported;
- bass retains a clean sub while filtered upper harmonics keep the groove audible on small speakers.

The macro arc is intentionally dramatic: **quiet orchestral planning → fire → dubstep drop → harmonic ricochet → cloud-chain rise → resolution**.

### Judge-friendly recovery

After the third failed shot in a level, the game gives one small contextual nudge toward `MENU → HELP`. Help can show an aim guide, play a mirrored demonstration, or run the encoded solution using the same physics model as live play. The puzzle is not silently made easier; the player is simply shown where the escape hatch lives.

## Why the theme is gameplay

uniRico is not a physics game wearing unicorn stickers.

The **unicorn's horn is the launcher**. The **rainbow is the projectile, trajectory, trail, and musical feedback**. The **grumpy clouds are the ordered targets** and visibly cheer up when restored. **Prisms** create literal rainbow ricochets. **Rainbow arches** teleport the shot. Weather and celestial magic bend the same rainbow in increasingly strange ways.

Removing the theme would remove the game.

## The cloud language

The opening ribbon teaches the exact visual grammar used during play:

| Cue | Meaning |
| --- | --- |
| White ring | current cloud |
| Number inside cloud | hit order |
| Dark badge above | exact wall/prism bounces required before impact |

The active play HUD is intentionally just the timer. Objective information lives on the objects themselves instead of covering the arena with text.

## What the campaign teaches

The 40-level campaign builds from one clean bank shot into interacting magical systems:

- boundary and prism ricochets
- moving prisms
- timed storm barriers
- rainbow-arch portals
- wind fields
- dream-cloud slow zones
- stardust acceleration
- moonbow gravity
- persistent spin
- charge + magnetic polarity
- resonance / speed gates
- moving cloud targets
- ordered cloud chains with exact bounce requirements

### Difficulty curriculum

| Levels | Design goal | Ordered locks |
| --- | --- | ---: |
| 1–8 | one fundamental at a time | 1 |
| 9–15 | moving / timed / linked lessons | 1–2 |
| 16–19 | first combinations | 2–3 |
| 20–25 | mixed-system bridge | 2 |
| 26–30 | multi-system chains | 3 |
| 31–35 | advanced chains | 4 |
| 36–39 | endgame sequences | 5 |
| 40 | `FULL SPECTRUM` | 6 |

Trajectory-preview assistance is monotonically non-increasing across the campaign. Later levels demand more precise understanding without secretly changing the simulation.

## Controls

### Desktop

| Input | Action |
| --- | --- |
| Mouse / pointer | aim |
| Click | fire immediately |
| `M` / `Esc` | pause / menu |
| `R` | restart level |
| `H` | help |
| `P` | trajectory preview |
| `S` | music + SFX |
| `Space` / `Enter` | continue after completion |

### Mobile

| Input | Action |
| --- | --- |
| Quick tap | direct aim + fire |
| Drag anywhere | preview a relative aim direction |
| Release after drag | fire exactly once |
| `MENU` | pause |
| Pause buttons | Sound / Path toggles |

The learned touch deadzone, Sound setting, Path setting, level progress, stars, and records persist locally.

## Audio

No audio files are shipped. The score and all feedback are synthesized at runtime.

**Planning:** slower overlapping sine/triangle harmony with deliberately sparse percussion-free space for reading the puzzle.

**Shot in flight:** procedural bass music with clean sub, wobble/formant bass, yoi-style responses, irregular kicks, half-time snare, hats, swing, risers, fills, and phrase variation.

**Gameplay harmony:** bounces and cloud resolutions use a shared rainbow note palette so the route accumulates a musical identity as well as a visual one.

## Presentation

- procedural Canvas rendering instead of sprite assets
- dark blue layered sky, clouds, glitter, and distant rainbow arcs
- rainbow trail whose endpoint is the live projectile
- mechanic-specific visual vocabularies
- transient level name + mechanic briefing that fades after ~3.5 seconds
- one-shot mechanic echoes exactly when the rainbow activates a system
- `PERFECT PATH!` feedback for first-shot clears
- local level records, stars, timing, and score

## One simulation, three jobs

The fixed-step projectile engine powers:

1. the live rainbow;
2. the trajectory preview;
3. the Help / solution demonstrations.

That makes assistance trustworthy. A preview does not use simplified fake geometry, and an encoded solution must actually survive the same collision rules the player does.

## Submission package

The canonical competition submission is always:

```text
dist/uniRico-js13k.zip
```

Do **not** submit the Wavedash deployment ZIP for the standard Desktop/Mobile entry.

Whenever packaged game source reaches `main`, GitHub Actions rebuilds the canonical ZIP, verifies it is at most **13,312 bytes**, verifies that its exact archive membership is:

```text
index.html
```

with `index.html` at the ZIP root, rejects external/network runtime dependencies, records SHA-256 and source provenance, and commits the validated package back to `dist/`.

Companion evidence files:

```text
dist/uniRico-js13k.zip.sha256
dist/uniRico-js13k-build.txt
```

## Validation

The readable source includes regression coverage for:

- **40/40 encoded solutions** completing every ordered target chain
- per-instance mechanic coverage of the intended solutions
- non-increasing preview assistance
- swept moving-cloud collision
- swept moving-prism collision and moving-frame reflection
- moving walls entering a projectile path
- anti-sticking post-impact separation
- wrong-order / wrong-bounce failure behavior
- mechanic-feedback suppression during prediction
- orchestral-to-dubstep transport switching
- oscillator cleanup and mute gating
- theme-linked rainbow harmony / mix bus
- adaptive touch tap, drag-release, cancel, persistence, and mouse parity
- mobile-accessible Sound / Path controls
- contextual Help nudge after repeated misses
- target-language contrast and menu onboarding
- Wavedash handshake
- exact root-level `index.html`, offline package integrity, and 13 KB ceiling

The final gates that cannot be automated are tracked in [`docs/COMPETITION_CHECKLIST.md`](docs/COMPETITION_CHECKLIST.md): physical iPhone/Android feel, Chrome/Firefox playthroughs, and real phone/laptop/headphone mix checks.

The full judge-facing design critique lives in [`docs/COMPETITION_AUDIT_2026.md`](docs/COMPETITION_AUDIT_2026.md).

## Build the competition ZIP locally

Requirements:

```bash
python3 -m pip install zopfli
npm install -g terser@5.50.0
```

Then:

```bash
python3 tools/build_js13k_zip.py
```

The local build uses the same deterministic source assembly as CI, but the **submission source of truth is the validated `dist/uniRico-js13k.zip` on `main`** so the uploaded bytes can be matched directly to the recorded source commit and SHA-256.

## Run the readable build

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/src/
```

## Repository layout

```text
uniRico/
├── index.html                     # hosted / Wavedash entrypoint
├── dist/
│   ├── uniRico-js13k.zip          # canonical Desktop/Mobile submission
│   ├── uniRico-js13k.zip.sha256
│   └── uniRico-js13k-build.txt
├── src/
│   ├── index.html                 # readable development entrypoint
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
├── tests/                         # physics, UX, audio, mobile regressions
├── tools/
│   └── build_js13k_zip.py
├── docs/
│   ├── COMPETITION_AUDIT_2026.md
│   ├── COMPETITION_CHECKLIST.md
│   ├── ARCHITECTURE.md
│   └── SOURCE_GUIDE.md
└── .github/workflows/
    ├── competition.yml
    └── build-wavedash.yml
```

## Competition philosophy

13 KB rewards leverage. uniRico gets its depth by composing a small number of reusable primitives:

- one physics model;
- one motion primitive shared by targets, prisms, and portal endpoints;
- compact tuple-encoded levels;
- procedural art;
- procedural music;
- visual rules embedded into world objects;
- input adaptation learned without a calibration screen.

The goal is not to look impressive *for 13 KB*. The goal is to feel like a complete little game that happens to fit inside 13 KB.

<p align="center">🦄 <strong>Aim the horn. Bend the rainbow. Fix the sky.</strong> 🌈</p>
