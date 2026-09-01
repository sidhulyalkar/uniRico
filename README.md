# 🦄🌈 uniRico v0.20.0

<p align="center">
  <img src="docs/banner.svg" alt="uniRico - Rainbow Ricochet" width="100%">
</p>

<p align="center">
  <strong>A 50-level deterministic rainbow-ricochet puzzle game built for js13kGames 2026.</strong><br>
  Aim a unicorn horn. Bend one rainbow through a strange sky. Make every bounce count.
</p>

<p align="center"><strong>THE SKY GOT GRUMPY · YOU HAVE A HORN · FIX IT</strong></p>

<p align="center">
  <a href="https://sidhulyalkar.com/arcade/unirico"><strong>▶ Website showcase</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/sidhulyalkar/uniRico/raw/refs/heads/main/dist/uniRico-local.html"><strong>⬇ Download latest local HTML</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/sidhulyalkar/uniRico/raw/refs/heads/main/dist/uniRico-js13k.zip"><strong>📦 Download js13k ZIP</strong></a>
</p>

<p align="center">
  <a href="https://github.com/sidhulyalkar/uniRico/actions/workflows/competition.yml"><img alt="Competition candidate" src="https://github.com/sidhulyalkar/uniRico/actions/workflows/competition.yml/badge.svg?branch=main"></a>
</p>

## At a glance

| | |
| --- | --- |
| **Campaign** | 50 deterministic puzzle levels |
| **Competition target** | js13kGames 2026, Desktop + Mobile |
| **Canonical submission** | **11,512 / 13,312 bytes** |
| **Free ZIP headroom** | **1,800 bytes** |
| **Runtime assets** | Procedural Canvas + Web Audio, no external runtime dependencies |
| **Physics authority** | One fixed-step engine for play, preview, Help, tutorials, and tests |
| **Final challenge** | Level 50: **MIRROR FULL SPECTRUM**, six ordered locks |
| **Quick local test** | `dist/uniRico-local.html`, self-contained and directly openable |

> **The core design question:** How much puzzle depth can one rainbow projectile create if every system modifies the same deterministic shot?

uniRico grows from a simple bank shot into a compact physics language. Prisms redirect the rainbow. Portals relocate it. Wind changes velocity. Gravity bends the path continuously. Spin alters later rebounds. Magnetism attracts or repels a charged shot. Moving clouds turn geometry into timing. Ordered target chains turn one shot into route planning.

The game does not keep introducing unrelated minigames. It keeps asking you to compose a deeper route through the same trusted system.

---

# Play in 30 seconds

uniRico is:

**read → aim → ricochet → restore**

1. **Find the cloud with the white ring.** That is the cloud you must hit now.
2. **Read the dark badge above it.** That is the exact number of wall/prism ricochets required before impact.
3. **Read the number inside the cloud.** Clouds must be restored in order.
4. **Aim the unicorn horn.** The dotted trajectory is the shot you are choosing.
5. **Fire and satisfy the route.** Restore the full cloud chain to clear the level.

If a target badge says **2**, the rainbow must ricochet exactly twice before impact. One is wrong. Three is wrong. The puzzle is not merely *where* the shot lands. It is **how the rainbow gets there**.

### The three visual rules

| What you see | What it means |
| --- | --- |
| **White ring** | Hit this cloud now |
| **Number inside cloud** | Required hit order |
| **Dark badge above cloud** | Exact ricochets required before impact |

Everything else expands that grammar.

---

# Why uniRico is interesting

## 1. The theme is the mechanic

The **unicorn horn** is the launcher. The **rainbow** is projectile, preview, trail, and musical feedback. **Grumpy clouds** are ordered locks that visibly recover when solved. **Prisms** create literal rainbow ricochets. **Rainbow arches** teleport the shot.

Remove the unicorns and rainbows and the mechanical language collapses with them. The theme is not a skin placed on top of a physics game.

## 2. One simulation does almost everything

The same authoritative fixed-step projectile model powers:

- live gameplay;
- the dotted trajectory preview;
- deterministic Help / solution playback;
- first-seen mechanic demonstrations;
- automated campaign proofs.

The tutorial is not a fake animation. Help does not secretly use easier rules. The preview does not approximate another world. **The line you learn from is the same world you have to master.**

## 3. Compression created more game instead of less code

v0.20.0 expanded uniRico from 40 to **50 levels** while shrinking the canonical ZIP from **13,227 bytes to 11,512 bytes**.

That happened by treating compression as a design tool, not a final cleanup pass.

The clearest example is the **Reflection Gauntlet**. Levels 41-50 are exact 180° spatial transformations of Levels 31-40. Launch points, targets, walls, moving geometry, portals, force vectors, gravity/magnet centers, gates, and solution angles rotate consistently.

That turns symmetry into a content primitive: ten new mastery puzzles reuse compact source geometry and proof data instead of shipping ten duplicate maps.

## 4. Trust is treated as a gameplay feature

A precision ricochet game becomes frustrating the moment the trajectory, controls, collision rules, or tutorial feel unreliable.

Desktop input therefore has one explicit authority:

**pointer movement chooses the trajectory → click fires that exact trajectory**

Click cannot silently re-aim the horn. A permanent adversarial test deliberately aims at one coordinate and injects `pointerdown` somewhere else. The shot must still preserve the displayed trajectory exactly.

Mobile follows the same philosophy with a separate **AIM wheel** and **FIRE** button. Releasing AIM never fires.

---

# The 50-level campaign

The campaign is structured as a curriculum, then a mastery exam.

| Levels | Design goal | Ordered locks |
| --- | --- | ---: |
| **1-8** | Fundamentals, demonstrated then practiced | 1 |
| **9-15** | Moving, timed, and linked lessons | 1-2 |
| **16-19** | First combinations | 2-3 |
| **20-25** | Mixed-system bridge | 2 |
| **26-30** | Multi-system chains | 3 |
| **31-35** | Advanced routing | 4 |
| **36-39** | Endgame sequences | 5 |
| **40** | **FULL SPECTRUM** | 6 |
| **41-45** | Reflection Gauntlet: reversed advanced routes | 4 |
| **46-49** | Reflected endgame mastery | 5 |
| **50** | **MIRROR FULL SPECTRUM** | 6 |

Trajectory assistance never increases as the campaign advances.

### Mechanic vocabulary

The same rainbow path is recombined with:

- boundary and prism ricochets;
- moving prisms;
- timed storm barriers;
- rainbow-arch portals;
- wind fields;
- dream-cloud slow zones;
- stardust acceleration;
- moonbow gravity;
- persistent spin;
- charge and magnetic polarity;
- resonance / speed gates;
- moving cloud targets;
- ordered cloud chains;
- exact ricochet requirements.

The goal is not mechanical quantity. The goal is **combinatorial leverage**.

---

# Teaching without spending the game on tutorial text

The first visit to Levels **1-12** begins with a short, input-locked demonstration using that level's already-validated solution.

The game:

1. names the new idea;
2. runs the real solution at accelerated simulation speed;
3. resets the puzzle;
4. hands control back with **YOUR TURN**.

Level 1 establishes the entire visual grammar directly inside the playfield:

- white ring = current target;
- number = order;
- dark badge = exact ricochets;
- wall/prism reflection increments the count;
- matching the required count restores the cloud.

This creates a compact loop:

**watch → reproduce → internalize → combine**

After repeated failed shots, the game points toward `MENU → HELP` rather than silently lowering difficulty. Help reuses the same deterministic simulation and encoded valid solutions.

---

# Controls

## Desktop

| Input | Action |
| --- | --- |
| **Move mouse / pointer** | Choose the visible trajectory |
| **Click** | Fire the currently displayed trajectory |
| `R` | Restart |
| `H` | Help / solution demonstration |
| `P` | Toggle trajectory preview |
| `S` | Toggle music + SFX |
| `M` / `Esc` | Pause / menu |
| `Space` / `Enter` | Continue |

## Mobile

| Input | Action |
| --- | --- |
| **Drag lower-left AIM wheel** | Choose launch angle |
| **Release AIM wheel** | Keep the angle, never fire |
| **Tap lower-right FIRE** | Launch the selected rainbow |
| `MENU` | Pause |
| Pause controls | Toggle sound / trajectory preview |

AIM and FIRE are deliberately separate. Fine adjustment should never accidentally commit a shot.

---

# Procedural audiovisual identity

There are no shipped image or audio assets in the standard runtime.

Canvas generates the game world, unicorn, clouds, mechanics, trajectory language, and rainbow trail. Web Audio generates the score and effects.

The soundtrack follows the physical shot:

**quiet orchestral planning → FIRE → bass-music drop → harmonic ricochet → cloud-chain rise → resolution**

Bounce, cloud-success, and victory cues share a six-note rainbow palette. Ordered-cloud progress raises harmonic energy. A compressor-backed mix bus controls stacked peaks where supported.

The audio system is another example of the project's governing strategy: one compact subsystem should reinforce gameplay, theme, feedback, and atmosphere at once.

---

# How 13 KB becomes a 50-level game

The byte budget rewards systems that do several jobs.

uniRico leans on:

- **one deterministic physics model** for play, preview, tutorial, Help, and proof;
- **tuple-encoded level data** instead of per-level scripts;
- **procedural Canvas art** instead of image assets;
- **procedural Web Audio** instead of audio files;
- **world-embedded visual rules** instead of large tutorial UI;
- **encoded valid solutions** that double as tests, tutorials, and Help playback;
- **reusable forces and geometry** composed into many puzzle families;
- **rotational generation** for ten verified mastery remixes;
- **one responsive control model** rather than separate desktop/mobile games.

The design rule is simple:

> **Do not merely make code smaller. Make every byte do more.**

---

# Compression engineering

The release builder optimizes the **actual final ZIP**, not an intermediate source-size number.

It builds two deterministic candidates:

```text
Terser 5.50.0 → minimal HTML → Zopfli
Terser 5.50.0 → Roadroller 2.1.0 -O0 → minimal HTML → Zopfli
```

The smaller final ZIP wins.

Roadroller uses deterministic `-O0` parameters instead of stochastic search. Release CI then builds everything again and requires byte-for-byte equality.

### v0.20.0 canonical package

| Property | Value |
| --- | --- |
| Campaign | **50 levels** |
| Packed strategy | **Roadroller + Zopfli** |
| ZIP size | **11,512 / 13,312 bytes** |
| Remaining headroom | **1,800 bytes** |
| Archive | root-level `index.html` only |
| Runtime network dependencies | **none** |
| ZIP SHA-256 | `713114a1185abd266ffdd42664217e06170b22673e9afb5eaa7cb3dd9c9a87ff` |
| Local HTML size | **15,358 bytes** |
| Local HTML SHA-256 | `5584ffd817af47108bd5fec97a0c669ace2b8249143a6a6b717cf21ec2c00c6f` |
| Current package source | `7df719558462bae381c8e02b5d606e3d190fbb1c` |

For comparison, v0.19.1 occupied **13,227 bytes with 85 bytes free**. v0.20.0 adds ten levels while reducing the submission by **1,715 bytes**.

Exact provenance is recorded in [`dist/uniRico-js13k-build.txt`](dist/uniRico-js13k-build.txt).

---

# Release confidence

The size limit is tiny. The confidence bar is not.

Automated coverage includes:

- **50/50 encoded solutions** completing every ordered target chain;
- intended mechanic-use coverage across all 50 levels;
- Reflection Gauntlet source/mechanic correspondence;
- non-increasing trajectory assistance through Level 50;
- swept moving-cloud and moving-prism collisions;
- moving-frame reflection and anti-sticking behavior;
- wrong-order and wrong-ricochet rules;
- guided mechanic demos and clean **YOUR TURN** handoff;
- tutorial repeat suppression;
- authoritative desktop displayed-trajectory → fired-shot behavior;
- AIM-wheel mapping, release-without-fire, and separate mobile FIRE behavior;
- accidental playfield-touch suppression;
- procedural audio transport and cleanup;
- deterministic package reproduction;
- exact packed-runtime startup execution;
- exact root-level archive membership;
- offline/no-network runtime enforcement;
- hard **13,312-byte** release ceiling.

The competition publisher also emits a directly testable `dist/uniRico-local.html` and proves it is byte-for-byte identical to the `index.html` inside the canonical submission ZIP.

Human release checks are tracked in [`docs/COMPETITION_CHECKLIST.md`](docs/COMPETITION_CHECKLIST.md).

---

# Download and run

## Fastest: open the exact packed game locally

Download:

[`dist/uniRico-local.html`](https://github.com/sidhulyalkar/uniRico/raw/refs/heads/main/dist/uniRico-local.html)

Then double-click it. No server, install step, or network connection is required.

## Readable development build

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/src/
```

## Rebuild the competition package

```bash
python3 -m pip install zopfli
npm install -g terser@5.50.0 roadroller@2.1.0
python3 tools/build_js13k_zip.py
```

For an official submission, use the validated artifact from `main`:

```text
dist/uniRico-js13k.zip
```

Do not hand-pack a separate release archive.

---

# Repository map

| Path | Purpose |
| --- | --- |
| [`src/`](src/) | Readable game source |
| [`src/runtime/`](src/runtime/) | Simulation, rendering, audio, UI, input |
| [`tests/`](tests/) | Physics, solutions, controls, audio, campaign, package regressions |
| [`tools/build_js13k_zip.py`](tools/build_js13k_zip.py) | Deterministic competition packer |
| [`dist/`](dist/) | Canonical submission ZIP, local HTML, hashes, provenance |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Runtime and systems architecture |
| [`docs/SOURCE_GUIDE.md`](docs/SOURCE_GUIDE.md) | Codebase orientation |
| [`docs/COMPETITION_AUDIT_2026.md`](docs/COMPETITION_AUDIT_2026.md) | Competition-focused design audit |
| [`docs/COMPETITION_CHECKLIST.md`](docs/COMPETITION_CHECKLIST.md) | Human/device release gates |
| [`docs/FINAL_CANDIDATE.md`](docs/FINAL_CANDIDATE.md) | Canonical release evidence |
| [`CHANGELOG.md`](CHANGELOG.md) | Version history |

---

# The project in one sentence

uniRico started as a rainbow bank-shot prototype and became a **50-level deterministic puzzle campaign** by repeatedly asking one question:

> **Can this next byte make the game clearer, deeper, more expressive, or more trustworthy?**

The resulting priorities are:

**clear visual grammar · deterministic physics · composable mechanics · tutorials built from real solutions · precise desktop/mobile controls · procedural audiovisual identity · compression-aware level design · ruthless release validation**

<p align="center">
  🦄 <strong>Aim the horn. Bend the rainbow. Fix the sky.</strong> 🌈
</p>
