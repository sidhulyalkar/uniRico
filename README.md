# 🦄🌈 uniRico v0.19.1

<p align="center">
  <img src="docs/banner.svg" alt="uniRico — Rainbow Ricochet" width="100%">
</p>

<p align="center">
  <strong>A tiny 13 KB puzzle game about doing one thing extremely well: aiming a unicorn horn, bending a rainbow through a strange sky, and making every ricochet count.</strong>
</p>

<p align="center"><strong>THE SKY GOT GRUMPY · YOU HAVE A HORN · FIX IT</strong></p>

Built for **js13kGames 2026** around the theme **Unicorns and Rainbows**, targeting **Desktop + Mobile**.

<p align="center">
  <a href="https://sidhulyalkar.com/arcade/unirico"><strong>▶ PLAY uniRico</strong></a>
</p>

---

## How to play in 30 seconds

uniRico is a game of **read → aim → ricochet → restore**.

1. **Find the cloud with the white ring.** That is your current target.
2. **Read its dark badge.** That number is the exact number of wall/prism ricochets your rainbow must make before hitting it.
3. **Aim the horn.** The dotted trajectory shows where the rainbow will travel.
4. **Fire.** On desktop, click launches the exact trajectory you were looking at. On mobile, use the AIM wheel and then tap FIRE.
5. **Hit the numbered clouds in order.** Restore the whole chain to clear the level.

That is the complete foundation. The rest of the game keeps twisting those rules with prisms, portals, wind, storms, gravity, spin, magnetism, moving targets, speed gates, and increasingly elaborate cloud chains.

### The three visual rules that matter

| What you see | What it means |
| --- | --- |
| **White ring around a cloud** | Hit this cloud now |
| **Number inside the cloud** | Its position in the required hit order |
| **Dark badge above the cloud** | Exact ricochets required before impact |

If the target says **2**, bounce exactly twice before reaching it. One bounce is wrong. Three bounces are wrong. The puzzle is not merely *where* the shot lands, but **how it gets there**.

---

## Controls

### Desktop

| Input | Action |
| --- | --- |
| **Move mouse / pointer** | Aim and choose the visible trajectory |
| **Click** | Fire the currently displayed trajectory |
| `R` | Restart level |
| `H` | Help / solution demonstration |
| `P` | Toggle trajectory preview |
| `S` | Toggle music + SFX |
| `M` / `Esc` | Pause / menu |
| `Space` / `Enter` | Continue |

### Mobile

| Input | Action |
| --- | --- |
| **Drag lower-left AIM wheel** | Choose launch angle |
| **Release AIM wheel** | Keep that angle; releasing never fires |
| **Tap lower-right FIRE** | Launch the selected rainbow |
| `MENU` | Pause |
| Pause controls | Toggle sound / path preview |

The mobile controls are intentionally split into **AIM** and **FIRE**. Fine aiming should not accidentally commit the shot.

---

# The idea

The central design question behind uniRico was:

> **How much puzzle depth can one rainbow projectile create if every system modifies the same deterministic shot?**

Instead of spending the 13 KB budget on dozens of unrelated mechanics, the game grows outward from one extremely reusable interaction:

**aim a projectile → transform its path → satisfy a route constraint → reach the correct target.**

A prism changes the direction. A portal changes the location. Wind changes the velocity. Gravity continuously bends the path. Spin alters future rebounds. Magnetism curves the shot toward or away from charged objects. Moving clouds turn a geometric problem into a timing problem. Ordered cloud chains turn one successful bank shot into a sequence-planning problem.

Every new mechanic speaks the same underlying language, so the player can keep recombining knowledge instead of learning a new game every few levels.

## Why the theme is gameplay, not decoration

The theme is structurally fused into the mechanics:

- the **unicorn horn** is the launcher;
- the **rainbow** is the projectile, trajectory, trail, and musical feedback;
- **grumpy clouds** are ordered locks that visibly recover when solved;
- **prisms** create literal rainbow ricochets;
- **rainbow arches** are portals;
- weather, celestial forces, stardust, polarity, and resonance all manipulate the same rainbow flight.

Removing the unicorns and rainbows would not leave the same game with a different skin. It would remove the game's visual language and much of its mechanical identity.

---

# Designed around trust

A puzzle game falls apart the moment the player stops believing the trajectory, collisions, rules, or tutorial.

A surprising amount of uniRico's development therefore went into **making the game trustworthy rather than merely adding more features**.

## The line you see is the shot you get

v0.19.1 fixes a subtle desktop input-authority problem that could appear in embedded/iframe play or synthetic pointer environments.

Previously, the dotted path used the latest pointer movement, while the click-down event could re-sample a slightly different coordinate immediately before launch. A player could line up one shot and fire another.

Now there is one clear contract:

**pointer movement chooses the trajectory → click fires that exact trajectory.**

The click itself cannot silently retarget the horn.

A permanent adversarial regression deliberately aims at one coordinate and fires with a `pointerdown` injected at a completely different coordinate. The test fails unless the launched rainbow preserves the displayed aim exactly.

## One simulation, four jobs

The same fixed-step projectile simulation drives:

1. **live gameplay**;
2. **trajectory preview**;
3. **Help / deterministic solution playback**;
4. **first-seen mechanic demonstrations**.

That is an important design rule, not just an implementation convenience.

The tutorial does not show a fake animation. Help does not secretly use easier physics. The trajectory preview does not approximate a different world. **The game teaches with the same rules the player must actually master.**

## Failure should teach, not merely punish

After repeated failed attempts, uniRico nudges the player toward `MENU → HELP` rather than lowering the difficulty behind the scenes.

Help can reveal aim information or replay an encoded valid solution using the real simulation. The intended loop is:

**attempt → understand the mistake → observe → retry → master.**

---

# Teaching a 40-level game inside 13 KB

A major challenge was not simply fitting 40 puzzles into the budget. It was making 40 puzzles **understandable without spending the budget on walls of tutorial text**.

## Guided mechanic demonstrations

The first visit to each of Levels **1–12** begins with a short, input-locked demonstration using that level's already-validated intended solution.

The game:

1. labels the new idea;
2. runs the real solution at accelerated simulation speed;
3. visibly counts relevant ricochets;
4. resets the puzzle;
5. hands control back with **YOUR TURN**.

That creates a compact learning loop:

**watch → reproduce → internalize → combine later.**

Level 1 teaches the entire cloud grammar directly in the world:

- white ring = current target;
- number inside = hit order;
- dark badge = exact ricochets required;
- wall/prism reflection increments that count;
- reaching the target with the correct count restores it.

The HUD stays intentionally sparse. The puzzle pieces themselves carry the rules.

---

# The campaign

The 40 levels start with a simple bank shot and gradually build into interacting systems.

### Core mechanic vocabulary

- boundary ricochets
- prism reflections
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

### Progression philosophy

| Levels | What the player is learning | Ordered locks |
| --- | --- | ---: |
| **1–8** | Fundamentals, shown then practiced | 1 |
| **9–15** | Moving, timed, and linked lessons | 1–2 |
| **16–19** | First mechanic combinations | 2–3 |
| **20–25** | Mixed-system bridge | 2 |
| **26–30** | Multi-system chains | 3 |
| **31–35** | Advanced routing chains | 4 |
| **36–39** | Endgame sequences | 5 |
| **40** | **FULL SPECTRUM** | 6 |

The difficulty curve is designed around **composition**, not bigger numbers. Late levels are difficult because systems interact, not because the game simply makes the projectile faster or hides more information.

Trajectory assistance also never increases as the campaign advances. The player's growing skill is expected to carry the later puzzles.

---

# Audio is part of the rainbow

All music and sound effects are synthesized at runtime with Web Audio. There are no shipped audio assets hiding outside the budget.

A six-note rainbow palette connects ricochets, cloud restoration, and victory cues. Ordered-cloud progress raises the harmonic energy. Bounce count influences wobble phrasing. A compressor-backed mix bus keeps stacked events from becoming harsh.

The intended musical arc mirrors the physical shot:

**quiet orchestral planning → FIRE → dubstep drop → harmonic ricochet → cloud-chain rise → resolution**

The goal was to make successful routing *sound* increasingly inevitable as the player completes a chain.

---

# Building a full game inside 13 KB

js13kGames rewards leverage. Every byte has to do several jobs.

uniRico gets most of its depth from a small set of systems that compose aggressively:

- **one deterministic projectile model** shared by play, previews, tutorials, and solutions;
- **compact tuple-encoded level data** rather than bespoke per-level code;
- **procedural canvas art** instead of image assets;
- **procedural Web Audio** instead of music/SFX files;
- **world-embedded UI language** instead of verbose HUD/tutorial panels;
- **encoded valid solutions** that double as tests, tutorials, and Help playback;
- **reusable environmental forces** that can be layered into increasingly complex puzzles;
- **one deliberate mobile control deck** instead of platform-specific game logic.

This was the central compression philosophy:

> **Do not merely make code smaller. Make each system more useful.**

A mechanic that only appears once is expensive. A mechanic that can teach, combine, create audiovisual feedback, and generate multiple puzzle families earns its bytes.

The aim was never to make something that feels impressive *for 13 KB*.

The aim was to make a **complete little game that happens to fit inside 13 KB**.

---

# Submission engineering

The competition artifact is treated as a release product, not a zip file somebody manually makes at the end.

The canonical standard js13kGames upload is always:

```text
dist/uniRico-js13k.zip
```

For every qualifying game-source change on `main`, GitHub Actions rebuilds and rejects the package unless:

- ZIP size is at most **13,312 bytes**;
- archive membership is exactly `['index.html']`;
- `index.html` is at the ZIP root;
- CSS and JavaScript are self-contained;
- no external/network runtime dependency is present;
- the complete regression suite passes.

### Current v0.19.1 competition artifact

| Property | Value |
| --- | --- |
| ZIP size | **13,227 / 13,312 bytes** |
| Remaining headroom | **85 bytes** |
| Archive contents | root-level `index.html` only |
| Runtime dependencies | **none** |
| SHA-256 | `2f9bceeaab568d3653a949052478b851c3420e6e65acbd45260b77d9d19fef2c` |

Companion provenance files:

```text
dist/uniRico-js13k.zip.sha256
dist/uniRico-js13k-build.txt
```

Do **not** submit the Wavedash deployment ZIP for the normal Desktop/Mobile competition entry. Use the validated canonical package above.

---

# Validation and regression coverage

The size limit is tiny. The confidence bar is not.

Automated validation includes:

- **40/40 encoded solutions** completing every ordered target chain;
- mechanic-use coverage for intended solutions;
- non-increasing trajectory assistance;
- swept moving-cloud and moving-prism collision handling;
- moving-frame reflection and anti-sticking separation;
- wrong-order and wrong-ricochet failure behavior;
- procedural audio transport and oscillator cleanup;
- rainbow harmony and mix-bus behavior;
- Level 1 guided-demo completion and clean **YOUR TURN** handoff;
- per-session tutorial repeat suppression;
- subsequent first-seen mechanic demos;
- desktop displayed-trajectory → fired-shot authority under deliberately mismatched click coordinates;
- AIM-wheel angle mapping;
- aim release without firing;
- separate FIRE behavior;
- accidental mobile playfield-touch suppression;
- mobile-safe level-card placement;
- exact root-level archive membership;
- offline/self-contained package integrity;
- hard enforcement of the 13 KB competition ceiling.

Human release checks remain in [`docs/COMPETITION_CHECKLIST.md`](docs/COMPETITION_CHECKLIST.md), including fresh-player comprehension, real iPhone/Android ergonomics, Chrome/Firefox play, and speaker/headphone audio.

---

# Run and build locally

## Run the readable development version

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/src/
```

## Build the competition package

```bash
python3 -m pip install zopfli
npm install -g terser@5.50.0
python3 tools/build_js13k_zip.py
```

For an official submission, use the validated `dist/uniRico-js13k.zip` from `main`, not a separately hand-packed archive.

---

# The design journey in one sentence

uniRico evolved from a small rainbow bank-shot prototype into a 40-level deterministic puzzle campaign by repeatedly asking the same question:

> **Can this next byte make the game clearer, deeper, more expressive, or more trustworthy?**

That led to the final priorities:

**clear visual grammar · deterministic physics · mechanics that compose · tutorials that use real solutions · precise desktop/mobile controls · procedural audiovisual identity · ruthless package validation.**

<p align="center">
  🦄 <strong>Aim the horn. Bend the rainbow. Fix the sky.</strong> 🌈
</p>
