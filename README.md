# 🦄🌈 uniRico v0.20.0

<p align="center">
  <img src="docs/banner.svg" alt="uniRico — Rainbow Ricochet" width="100%">
</p>

<p align="center">
  <strong>A 13 KB, 50-level puzzle game about aiming a unicorn horn, bending one rainbow through a strange sky, and making every ricochet count.</strong>
</p>

<p align="center"><strong>THE SKY GOT GRUMPY · YOU HAVE A HORN · FIX IT</strong></p>

Built for **js13kGames 2026** around **Unicorns and Rainbows**, targeting **Desktop + Mobile**.

<p align="center">
  <a href="https://sidhulyalkar.com/arcade/unirico"><strong>▶ PLAY uniRico</strong></a>
</p>

---

## How to play in 30 seconds

uniRico is **read → aim → ricochet → restore**.

1. **Find the cloud with the white ring.** That is the cloud you must hit now.
2. **Read the dark badge above it.** The badge is the exact number of wall/prism ricochets required before impact.
3. **Aim the unicorn's horn.** The dotted line is the trajectory you are choosing.
4. **Fire.** Desktop click fires the exact displayed trajectory. Mobile uses a separate AIM wheel and FIRE button.
5. **Hit numbered clouds in order.** Restore the full chain to clear the level.

If a cloud's badge says **2**, bounce exactly twice before reaching it. One is wrong. Three is wrong. The puzzle is not just *where* the rainbow lands, but **how it gets there**.

### The three visual rules

| What you see | What it means |
| --- | --- |
| **White ring** | Hit this cloud now |
| **Number inside cloud** | Required hit order |
| **Dark badge above cloud** | Exact ricochets required before impact |

The rest of the campaign keeps recombining those rules with prisms, portals, wind, storms, gravity, spin, magnetism, moving targets, speed gates, and increasingly long cloud chains.

---

## Controls

### Desktop

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

### Mobile

| Input | Action |
| --- | --- |
| **Drag lower-left AIM wheel** | Choose launch angle |
| **Release AIM wheel** | Keep the angle; releasing never fires |
| **Tap lower-right FIRE** | Launch the selected rainbow |
| `MENU` | Pause |
| Pause controls | Toggle sound / trajectory preview |

AIM and FIRE are intentionally separate on touch screens. Fine adjustment should never accidentally commit a shot.

---

# The design idea

The central question behind uniRico is:

> **How much puzzle depth can one rainbow projectile create if every system modifies the same deterministic shot?**

Instead of spending the 13 KB budget on dozens of disconnected mechanics, the game grows outward from one reusable interaction:

**aim → transform the path → satisfy a route constraint → reach the correct target.**

A prism changes direction. A portal changes location. Wind changes velocity. Gravity continuously bends the path. Spin changes future rebounds. Magnetism attracts or repels a charged rainbow. Moving clouds turn geometry into timing. Ordered cloud chains turn one bank shot into a route-planning problem.

Every mechanic speaks the same underlying language, so later puzzles ask the player to **compose knowledge**, not learn another game.

## Why the theme is gameplay

The theme is structurally fused into the mechanics:

- the **unicorn horn** is the launcher;
- the **rainbow** is projectile, trajectory, trail, and musical feedback;
- **grumpy clouds** are ordered locks that recover when solved;
- **prisms** create literal rainbow ricochets;
- **rainbow arches** teleport the shot;
- weather, celestial forces, stardust, charge, polarity, and resonance manipulate that same rainbow flight.

Remove the unicorns and rainbows and the game's mechanical language disappears with them.

---

# Designed around trust

A precision puzzle game stops being fun as soon as the player stops trusting its trajectory, collisions, rules, or tutorial. A large part of uniRico's development therefore went into **making the game trustworthy instead of merely making it larger**.

## The line you see is the shot you get

Desktop aiming has one authority:

**pointer movement chooses the trajectory → click fires that exact trajectory.**

Click cannot silently retarget the horn. A permanent adversarial regression deliberately moves the pointer to one coordinate and injects the firing `pointerdown` at a completely different coordinate. The launched rainbow must still preserve the displayed aim.

## One simulation, four jobs

The same fixed-step projectile engine powers:

1. live gameplay;
2. trajectory preview;
3. Help / deterministic solution playback;
4. first-seen mechanic demonstrations.

The tutorial is not a fake animation. Help does not secretly use easier physics. The preview does not approximate another world. **The game teaches with the exact rules the player has to master.**

## Failure should teach

After repeated failed shots, the game points toward `MENU → HELP` rather than silently lowering difficulty. Help can reveal the intended aim or replay an encoded valid solution through the real simulation.

The loop is:

**attempt → diagnose → observe → retry → master.**

---

# Teaching 50 levels inside 13 KB

The first visit to Levels **1–12** begins with a short input-locked demonstration using that level's already-tested solution. The game labels the mechanic, runs the real solution at accelerated simulation speed, resets, then hands control back with **YOUR TURN**.

Level 1 demonstrates the complete cloud grammar directly in the world:

- white ring = current target;
- number = order;
- dark badge = exact ricochets;
- wall/prism reflections increment the count;
- matching the badge at impact restores the cloud.

That produces a compact learning loop:

**watch → reproduce → internalize → combine.**

The live HUD stays intentionally sparse because the puzzle objects themselves carry the rules.

---

# The 50-level campaign

The campaign begins with a simple bank shot and ends with a compressed **Reflection Gauntlet** that reverses the spatial logic of the hardest puzzles.

### Mechanic vocabulary

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
- ordered cloud chains
- exact ricochet requirements

### Progression

| Levels | Design goal | Ordered locks |
| --- | --- | ---: |
| **1–8** | Fundamentals, demonstrated then practiced | 1 |
| **9–15** | Moving, timed, and linked lessons | 1–2 |
| **16–19** | First combinations | 2–3 |
| **20–25** | Mixed-system bridge | 2 |
| **26–30** | Multi-system chains | 3 |
| **31–35** | Advanced routing | 4 |
| **36–39** | Endgame sequences | 5 |
| **40** | **FULL SPECTRUM** | 6 |
| **41–45** | Reflection Gauntlet: reversed advanced routes | 4 |
| **46–49** | Reflected endgame mastery | 5 |
| **50** | **MIRROR FULL SPECTRUM** | 6 |

Trajectory assistance never increases as the campaign advances. Levels 41–50 tighten it further.

## Reflection Gauntlet: level design as compression

Levels **41–50** are generated as exact **180° spatial transformations of Levels 31–40**.

This is not a screenshot flip. The game rotates the launch point, ordered targets, walls, moving prisms, portals, force fields, gravity/magnet centers, resonance gates, and relevant motion/force vectors. The encoded solution angle is rotated by π while its timing is preserved.

A 180° rotation is a symmetry of uniRico's deterministic projectile model. That lets ten new late-game spatial problems reuse the same compact source geometry and proof data rather than shipping ten duplicate maps.

The regression suite then solves all ten transformed levels from scratch and requires their visible mechanics to be exercised by the intended route. In other words, **symmetry is both a game mechanic and a compression primitive**.

---

# Audio is part of the rainbow

All music and SFX are synthesized at runtime with Web Audio. No audio assets are shipped.

A six-note rainbow palette ties together ricochets, cloud restoration, and victory cues. Cloud progress raises harmonic energy. Bounce count changes the flight groove. A compressor-backed mix bus controls stacked peaks.

The macro arc follows the physical shot:

**quiet orchestral planning → FIRE → dubstep drop → harmonic ricochet → cloud-chain rise → resolution**

---

# How 13 KB becomes a full game

js13kGames rewards leverage. uniRico gets depth by making systems do several jobs:

- **one deterministic physics model** for play, preview, tutorials, and Help;
- **tuple-encoded level data** instead of per-level scripts;
- **procedural Canvas art** instead of image assets;
- **procedural Web Audio** instead of audio files;
- **world-embedded visual rules** instead of large tutorial UI;
- **encoded valid solutions** that double as tests, tutorials, and Help playback;
- **reusable environmental forces** composed into many puzzle families;
- **rotational generation** that turns ten existing mastery layouts into ten new verified spatial problems;
- **one mobile control model** instead of a second game implementation.

The governing rule is:

> **Do not merely make code smaller. Make each system more useful.**

The goal is not to feel impressive *for 13 KB*. The goal is to feel like a complete little game that happens to fit there.

---

# Compression engineering

v0.20.0 treats compression as an optimization problem over the **actual final ZIP**, not over pretty-looking minified-source numbers.

The deterministic builder now produces competing candidates:

1. **Terser 5.50.0 → Zopfli DEFLATE**;
2. **Terser → Roadroller 2.1.0 (`-O0`) → Zopfli DEFLATE**.

It then chooses whichever final ZIP is smaller. Roadroller is therefore never assumed to win merely because its JavaScript text is shorter.

The HTML shell also omits optional document wrappers and other bytes that do not help the single-canvas game while retaining UTF-8 and mobile viewport behavior.

For reproducibility, release CI builds the package **twice** and requires byte-for-byte identity. It also extracts `index.html` from the exact ZIP and executes the packed runtime in a browser-like VM, so readable-source success alone is not enough.

### v0.20.0 PR candidate

| Property | Value |
| --- | --- |
| Campaign | **50 levels** |
| Packed strategy | **Roadroller + Zopfli** |
| ZIP size | **11,512 / 13,312 bytes** |
| Remaining headroom | **1,800 bytes** |
| Archive | root-level `index.html` only |
| Runtime network dependencies | **none** |
| Candidate SHA-256 | `713114a1185abd266ffdd42664217e06170b22673e9afb5eaa7cb3dd9c9a87ff` |

For comparison, the qualified v0.19.1 package was **13,227 bytes with only 85 bytes free**. The new compression pipeline simultaneously creates ten additional levels and leaves substantially more safety margin.

These numbers describe the current PR candidate. `main` remains the canonical submission authority after merge and rebuild.

---

# Submission engineering

The standard competition artifact is always:

```text
dist/uniRico-js13k.zip
```

For every qualifying game-source change on `main`, GitHub Actions rejects the release unless:

- ZIP size is at most **13,312 bytes**;
- archive membership is exactly `['index.html']`;
- `index.html` is at the ZIP root;
- CSS and JavaScript are self-contained;
- no external/network runtime dependency exists;
- the readable regression suite passes;
- the packed artifact executes;
- a second independent package build is byte-identical.

Companion provenance files:

```text
dist/uniRico-js13k.zip.sha256
dist/uniRico-js13k-build.txt
```

Do **not** submit the Wavedash deployment ZIP for the normal Desktop/Mobile entry. Use the canonical standard package from `main`.

---

# Validation

The size limit is tiny. The confidence bar is not.

Automated coverage now includes:

- **50/50 encoded solutions** completing every ordered target chain;
- intended mechanic-use coverage across all **50 levels**;
- exact Reflection Gauntlet source/mechanic correspondence;
- non-increasing trajectory assistance through level 50;
- swept moving-cloud / moving-prism collisions;
- moving-frame reflection and anti-sticking separation;
- wrong-order and wrong-ricochet behavior;
- procedural audio transport, oscillator cleanup, rainbow harmony, and compression bus;
- guided mechanic demos and clean **YOUR TURN** handoff;
- tutorial repeat suppression;
- desktop displayed-trajectory → fired-shot authority under adversarial pointer coordinates;
- AIM-wheel mapping, release-without-fire, and separate mobile FIRE behavior;
- accidental playfield-touch suppression;
- mobile-safe HUD/tutorial placement;
- packed-runtime startup validation;
- deterministic package reproduction;
- exact root-level archive membership, offline integrity, and hard size enforcement.

Human release checks live in [`docs/COMPETITION_CHECKLIST.md`](docs/COMPETITION_CHECKLIST.md), especially fresh-player comprehension, real iPhone/Android ergonomics, Chrome/Firefox play, and speaker/headphone mix.

---

# Run and build locally

## Readable build

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/src/`.

## Competition package

```bash
python3 -m pip install zopfli
npm install -g terser@5.50.0 roadroller@2.1.0
python3 tools/build_js13k_zip.py
```

For an official submission, use the validated `dist/uniRico-js13k.zip` from `main`, never a separately hand-packed archive.

---

# The design journey in one sentence

uniRico grew from a rainbow bank-shot prototype into a **50-level deterministic puzzle campaign** by repeatedly asking:

> **Can this next byte make the game clearer, deeper, more expressive, or more trustworthy?**

The resulting priorities are:

**clear visual grammar · deterministic physics · composable mechanics · tutorials built from real solutions · precise desktop/mobile controls · procedural audiovisual identity · compression-aware level design · ruthless release validation.**

<p align="center">
  🦄 <strong>Aim the horn. Bend the rainbow. Fix the sky.</strong> 🌈
</p>
