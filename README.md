# 🦄🌈 uniRico v0.19.1

<p align="center">
  <img src="docs/banner.svg" alt="uniRico — Rainbow Ricochet" width="100%">
</p>

<p align="center">
  <strong>A 13 KB rainbow-ricochet puzzle game where a magical unicorn bends one rainbow through prisms, portals, weather, gravity, spin, polarity, and grumpy clouds.</strong>
</p>

<p align="center"><strong>THE SKY GOT GRUMPY · YOU HAVE A HORN · FIX IT</strong></p>

Built for **js13kGames 2026** around **Unicorns and Rainbows**, targeting **Desktop + Mobile**.

## v0.19.1 — The line you see is the shot you get

Desktop aiming now has one authority: the visible trajectory. Mouse movement chooses the launch angle and click fires that exact already-displayed angle. The click-down event cannot silently retarget the horn at a different coordinate immediately before launch.

This specifically hardens embedded/iframe play and synthetic pointer environments, while also eliminating ordinary click-position jitter. An adversarial regression aims at one point, injects the fire down-event at a completely different point, and requires the launched shot to preserve the displayed aim.

The v0.19.0 mobile control deck remains unchanged: the AIM wheel selects an angle and the separate FIRE button launches it.

## v0.19.0 — Learn fast, aim precisely

### Guided mechanic demos

The first visit to each of Levels **1–12** begins with a very short, input-locked demonstration using that level's already-validated intended solution. The demonstration runs at roughly 2× simulation speed, labels the new mechanic, then resets the level and hands control back with **YOUR TURN**.

Level 1 explicitly teaches the complete cloud grammar:

- **white ring = current cloud**
- **number inside = hit order**
- **dark badge above = exact ricochets required**
- a wall/prism reflection increments the ricochet count
- matching the badge when the rainbow reaches the cloud unlocks it

Ricochets are counted visibly during the demo, so the relationship between *reflection → count → unlock* is shown rather than merely described.

The early campaign still keeps its one-mechanic-at-a-time levels. The demo is followed immediately by the real puzzle, giving the player observation → imitation → mastery instead of a long tutorial modal.

### Precision mobile control deck

Mobile aiming is deliberately decoupled from firing:

- **AIM wheel, lower left** — drag the knob around the ring to choose the rainbow's launch angle
- **FIRE button, lower right** — launch using the selected angle

Releasing the aim wheel never fires. Touching elsewhere in the arena never fires. This makes fine adjustments, repeated attempts, and one-handed coordination much less brittle. The mobile control deck appears after touch input is detected.

The transient level card moves upward on mobile so it cannot cover the controls. Sound and trajectory-preview toggles remain tappable from Pause and persist locally.

### Rainbow-aware procedural music

All music and SFX are synthesized with Web Audio. A six-note rainbow palette connects ricochets, cloud restoration, and victory cues; ordered-cloud progress lifts flight harmony; bounce count changes wobble phrasing; and a compressor-backed mix bus reduces harsh stacked peaks. The macro arc is:

**quiet orchestral planning → fire → dubstep drop → harmonic ricochet → cloud-chain rise → resolution**

### Judge-friendly recovery

After a third failed shot, the game points once toward `MENU → HELP`. Help can show aim, play a mirrored demonstration, or run the encoded solution using the same deterministic physics as live play. Difficulty is not secretly lowered.

## Why the theme is gameplay

The **unicorn's horn is the launcher**. The **rainbow is the projectile, trajectory, trail, and musical feedback**. **Grumpy clouds are ordered locks** that cheer up when restored. **Prisms** create literal rainbow ricochets. **Rainbow arches** teleport the shot. Weather and celestial systems then bend that same rainbow in increasingly strange ways.

Removing the theme would remove the game.

## Cloud language

| Cue | Meaning |
| --- | --- |
| White ring | current cloud |
| Number inside cloud | hit order |
| Dark badge above | exact wall/prism ricochets required before impact |

The live HUD stays timer-only. Objective information lives on the puzzle objects themselves.

## Campaign

The 40 levels build from one bank shot into interacting systems:

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
- ordered cloud chains with exact ricochet requirements

| Levels | Design goal | Ordered locks |
| --- | --- | ---: |
| 1–8 | fundamentals, demonstrated then practiced | 1 |
| 9–15 | moving / timed / linked lessons | 1–2 |
| 16–19 | first combinations | 2–3 |
| 20–25 | mixed-system bridge | 2 |
| 26–30 | multi-system chains | 3 |
| 31–35 | advanced chains | 4 |
| 36–39 | endgame sequences | 5 |
| 40 | `FULL SPECTRUM` | 6 |

Trajectory-preview assistance never increases as the campaign advances.

## Controls

### Desktop

| Input | Action |
| --- | --- |
| Mouse / pointer movement | choose the visible trajectory |
| Click | fire the currently displayed trajectory |
| `M` / `Esc` | pause / menu |
| `R` | restart |
| `H` | help |
| `P` | trajectory preview |
| `S` | music + SFX |
| `Space` / `Enter` | continue |

### Mobile

| Input | Action |
| --- | --- |
| Drag around lower-left AIM ring | choose launch angle |
| Release AIM ring | keep selected angle; **does not fire** |
| Lower-right FIRE button | launch rainbow |
| `MENU` | pause |
| Pause buttons | Sound / Path toggles |

## One simulation, four jobs

The fixed-step projectile engine powers:

1. live shots;
2. trajectory preview;
3. Help / solution demonstrations;
4. first-seen mechanic tutorials.

That keeps every teaching path trustworthy. The tutorial is not an animation that cheats the real physics.

## Submission package

The canonical standard competition upload is always:

```text
dist/uniRico-js13k.zip
```

Do **not** submit the Wavedash deployment ZIP for the standard Desktop/Mobile entry.

For every qualifying game-source change on `main`, GitHub Actions rebuilds the package and rejects it unless:

- ZIP size is at most **13,312 bytes**
- archive membership is exactly `['index.html']`
- `index.html` is at the ZIP root
- CSS and JavaScript are self-contained
- no external/network runtime dependency is present
- the full regression suite passes

The v0.19.1 PR candidate qualifies at **13,227 / 13,312 bytes**, leaving **85 bytes** of compressed headroom. Its SHA-256 is `2f9bceeaab568d3653a949052478b851c3420e6e65acbd45260b77d9d19fef2c`.

Companion evidence:

```text
dist/uniRico-js13k.zip.sha256
dist/uniRico-js13k-build.txt
```

## Validation

Automated coverage includes:

- **40/40 encoded solutions** completing every ordered target chain
- mechanic-use coverage of intended solutions
- non-increasing trajectory assistance
- swept moving-cloud / moving-prism collision
- moving-frame reflection and anti-sticking separation
- wrong-order / wrong-ricochet failure behavior
- procedural audio transport, oscillator cleanup, rainbow harmony, and mix bus
- Level 1 guided-demo completion and clean **YOUR TURN** handoff
- per-session tutorial repeat suppression and subsequent mechanic demo
- desktop displayed-trajectory → fired-shot authority under deliberately mismatched pointerdown coordinates
- AIM-wheel angle mapping
- aim release without firing
- separate FIRE behavior
- accidental playfield-touch suppression
- mobile-safe level-card placement
- exact root-level `index.html`, offline integrity, and 13 KB ceiling

Human-only release checks remain in [`docs/COMPETITION_CHECKLIST.md`](docs/COMPETITION_CHECKLIST.md), especially fresh-player comprehension, real iPhone/Android ergonomics, Chrome/Firefox play, and speaker/headphone mix.

## Build locally

```bash
python3 -m pip install zopfli
npm install -g terser@5.50.0
python3 tools/build_js13k_zip.py
```

For the official submission, use the validated `dist/uniRico-js13k.zip` on `main`, not a separately hand-packed archive.

## Run readable build

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/src/`.

## Competition philosophy

13 KB rewards leverage. uniRico gets depth by composing reusable primitives: one deterministic physics model, compact tuple-encoded levels, procedural art, procedural music, world-embedded rules, mechanic demonstrations built from real solutions, and one precise touch control deck.

The goal is not to look impressive *for 13 KB*. The goal is to feel like a complete little game that happens to fit inside 13 KB.

<p align="center">🦄 <strong>Aim the horn. Bend the rainbow. Fix the sky.</strong> 🌈</p>
