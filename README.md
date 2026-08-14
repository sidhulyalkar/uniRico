# 🦄🌈 uniRico

**A tiny rainbow-ricochet puzzle game about a magical unicorn, grumpy storm clouds, and fixing the sky one impossible shot at a time.**

Built for **js13kGames 2026** around the theme **Unicorns and Rainbows**.

<p align="center">
  <img src="docs/cover.jpg" alt="uniRico cover art" width="900">
</p>

<p align="center">
  <strong>THE SKY GOT GRUMPY · YOU HAVE A HORN · FIX IT</strong>
</p>

## ✨ What is uniRico?

uniRico is a compact HTML5 Canvas puzzle game where you aim a unicorn's horn and fire a fading rainbow projectile through a magical sky. The shot can ricochet from prisms, pass through rainbow arches, bend in wind, curve around moonbow gravity fields, pick up spin or charge, and interact with other magical effects.

The goal is not to destroy enemies. Each level contains **angry gray storm clouds** that need to be reached in the correct order and with the correct number of bounces. Hit them correctly and the rainbow cheers them up, turning them into happy white clouds.

The core fantasy is deliberately simple:

> **Aim horn → fire rainbow → ricochet through sky magic → cheer up the clouds.**

## 🎮 Current release

**v0.3.0**

The current version contains:

- 40 handcrafted puzzle levels
- A procedural unicorn launcher drawn entirely with Canvas
- A six-band rainbow projectile with a fading ribbon tail
- Angry storm-cloud targets that become happy when cleared
- Exact-bounce puzzle logic
- Moving targets and moving reflectors
- Rainbow-arch portals
- Wind / cloud gust fields
- Dream-cloud slow zones
- Stardust acceleration zones
- Moonbow gravity fields
- Spin and magnetic charge mechanics
- Pulsing storm barriers
- Aurora resonance gates
- Procedural particles, sparkles, clouds, rainbows, and audio
- Local best scores, stars, shots, and completion records
- Level select
- Help tools including aim hints, mirrored demonstrations, and full solution playback
- No external runtime assets or libraries

The game is intentionally a single self-contained HTML file at runtime.

## 🕹️ Controls

| Input | Action |
|---|---|
| Mouse / pointer | Aim the unicorn horn |
| Click / tap | Fire the rainbow |
| `M` / `Esc` | Pause / menu |
| `R` | Restart level |
| `H` | Help |
| `P` | Toggle trajectory preview |
| `S` | Toggle sound |
| `[` / `]` | Previous / next level during development/testing |

## ☁️ Gameplay language

uniRico uses familiar menu terminology while keeping the whimsical vocabulary inside the game itself.

- **LEVELS** opens level select
- **RESTART LEVEL** restarts the current puzzle
- **HELP** opens assistance tools
- **SHOW AIM** points the horn toward the encoded solution angle
- **WATCH MIRRORED SHOT** demonstrates the maneuver in mirrored form for practice
- **WATCH SOLUTION** demonstrates the actual solution
- **SOLUTION PATH** displays a learned solution trace

This keeps navigation readable while allowing the playfield itself to remain unabashedly unicorn-shaped.

## 🌈 Thematic systems

The original physics vocabulary has been translated into one coherent sky-magic world.

| Gameplay function | uniRico presentation |
|---|---|
| Launcher | Unicorn + glowing horn |
| Projectile | Fading six-band rainbow |
| Targets | Grumpy storm clouds → happy clouds |
| Reflectors | Rainbow-edged prisms |
| Portals | Rainbow arches |
| Wind | Cloud gusts / magical air currents |
| Slow fields | Dream clouds |
| Acceleration | Stardust / sunburst magic |
| Gravity | Moonbow fields |
| Spin | Swirling unicorn magic |
| Charge / polarity | Magical charge fields |
| Timed barriers | Storm walls / lightning |
| Resonance | Aurora gates |
| Failure hazards | Dark storm-cloud / night-sky hazards |
| Prediction | Bright white dotted trajectory |
| Successful history | Rainbow traces and sparkles |

## 🧠 Puzzle design

Every target encodes a required bounce count. A shot must reach the current cloud with exactly that number of reflections before the level can advance to the next cloud.

Later levels combine this rule with moving geometry and continuous forces. The result is less about twitch shooting and more about **reading a dynamic system, predicting the future path, and committing to one precise magical ricochet**.

The 40-level campaign gradually layers mechanics rather than introducing them all at once. Early levels establish reflection and timing; later levels combine portals, wind, gravity, spin, charge, resonance, moving targets, and reduced trajectory foresight.

## 📸 Screenshots

### Main menu

![uniRico main menu](docs/screenshots/menu.jpg)

### Multi-system puzzle

![uniRico complex gameplay](docs/screenshots/gameplay-complex.jpg)

### Rainbow arches and cloud targets

![uniRico portal gameplay](docs/screenshots/gameplay-portal.jpg)

## 🗂️ Repository layout

```text
uniRico/
├── index.html                         # Complete playable v0.3.0 game
├── README.md
├── CHANGELOG.md
├── .gitignore
├── docs/
│   ├── cover.jpg
│   └── screenshots/
│       ├── menu.jpg
│       ├── gameplay-complex.jpg
│       └── gameplay-portal.jpg
├── releases/
│   └── uniRico-v0.3.0-js13k.zip      # Frozen 13KB-class release artifact
└── scripts/
    └── check-size.mjs                 # Checks archive against the 13 KiB limit
```

## 🚀 Running locally

There is no install step.

### Option 1: open directly

Open `index.html` in a modern browser.

### Option 2: use a local server

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

The game has no package dependencies, build framework, external font, sprite sheet, image dependency, or network requirement.

## 📦 js13kGames size target

The standard js13kGames archive ceiling is **13 KiB = 13,312 bytes**.

Current frozen v0.3.0 archive:

```text
releases/uniRico-v0.3.0-js13k.zip
13,155 bytes
157 bytes remaining
SHA-256: 1588b481c786939a99dd360409b42eb425889cec1b04fc52ba66acf7b9c5264e
```

Run the local size check with:

```bash
node scripts/check-size.mjs
```

The repository contains readable project documentation and the exact compact runtime artifact separately so development history does not need to fit inside the competition ZIP.

## 🧬 Technical approach

uniRico is deliberately engine-free.

- **Rendering:** HTML5 Canvas 2D
- **Audio:** procedural Web Audio oscillators
- **Input:** Pointer Events + keyboard
- **Persistence:** `localStorage`
- **Physics:** custom deterministic 2D projectile simulation
- **Assets:** runtime visuals are procedurally drawn
- **Dependencies:** none
- **Runtime entry point:** `index.html`

The trajectory preview and live projectile use the same simulation rules. That is important for a precision ricochet game: the guide should describe the same world the actual rainbow travels through.

Level data is compact and declarative. Shared field rigs are reused across advanced levels to conserve bytes while still allowing combinations of moving walls, portals, gusts, gravity, slow zones, acceleration, spin, charge, barriers, resonance gates, and hazards.

## 🎨 Visual direction

The visual design aims for **cute clarity rather than decorative overload**:

- a darker twilight-blue playfield keeps white prediction lines readable
- pale cloud-shaped HUD panels keep status text legible
- rainbow effects are reserved for meaningful motion and success feedback
- environmental systems remain visually distinct even when several overlap
- storm clouds clearly communicate unresolved targets
- happy white clouds communicate restoration immediately

The game should look magical without making the player decode the interface.

## 🧪 Release checks

Before freezing a competition build, the release candidate should pass:

1. Exact ZIP size check
2. `index.html` at archive root
3. No external resource requests
4. Chrome smoke test
5. Firefox smoke test
6. No console errors
7. Early, middle, and late-level playthrough checks
8. Pause / Help / Levels / Restart checks
9. Solution playback check
10. Local record persistence check
11. Resize / different desktop window size check
12. SHA-256 freeze of the exact submitted archive

## 🛣️ Direction

The current design priorities are:

- keep the central rainbow ricochet readable and satisfying
- make every mechanic feel native to unicorn / rainbow / sky magic
- teach bounce-count logic with minimal text
- preserve meaningful difficulty instead of turning the game into a visual toy
- use every byte for mechanics, feedback, or clarity
- keep the final Desktop submission comfortably inside the js13kGames limit

## 🏆 Built for js13kGames 2026

uniRico is being developed for the **Desktop** category of **js13kGames 2026**, whose theme is **Unicorns and Rainbows**.

Competition page: https://js13kgames.com/2026/

The project is public so the game's evolution, code, size constraints, and design decisions can be inspected openly.

---

<p align="center">
  🦄 <strong>Aim the horn. Bend the rainbow. Fix the sky.</strong> 🌈
</p>
