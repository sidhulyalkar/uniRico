# Readable Source Mirror

This directory is the human-readable counterpart to the compact root `index.html` used for the js13k-oriented build.

The goal is not to disguise the fact that the shipped runtime is byte-conscious. The goal is to make the same systems easy to inspect, navigate, and learn from.

## Layout

```text
src/
├── index.html
├── style.css
├── levels.js
├── README.md
└── runtime/
    ├── core.js
    ├── physics.js
    ├── render-world.js
    ├── render-entities.js
    ├── render-hud.js
    └── ui.js
```

### `levels.js`

Contains the reusable `F0...F9` field rigs and all 40 declarative level definitions. It preserves the compact keys from the competition runtime so campaign data can be compared directly.

### `runtime/core.js`

Owns shared state, coordinate conversion, periodic motion helpers, scoring, persistence, level lifecycle, and procedural audio.

### `runtime/physics.js`

Owns projectile construction, reflections, walls, barriers, portals, force fields, target progression, failures, scoring transitions, solution playback, and the fixed simulation update.

### `runtime/render-world.js`

Draws the sky and environmental mechanics: clouds, prisms, arches, wind, dream zones, gravity, spin/charge fields, barriers, resonance gates, and hazards.

### `runtime/render-entities.js`

Draws objective clouds, the unicorn, white trajectory prediction, learned traces, the live rainbow ribbon, and particles.

### `runtime/render-hud.js`

Draws the in-world HUD panels, menus, level select, completion screens, and help UI.

### `runtime/ui.js`

Composes each frame, owns the `requestAnimationFrame` driver, and dispatches pointer / keyboard input across menu states.

## Why preserve some compact names?

The current competition build has already been aggressively optimized. Renaming every symbol in a second copy would make it harder to compare the readable mirror against the exact shipping artifact and easier for the two implementations to drift apart.

Instead, readability comes from:

- explicit file boundaries
- formatting and section headers
- comments around compact data formats
- clear subsystem ownership
- a detailed descriptive symbol map in [`../docs/SOURCE_GUIDE.md`](../docs/SOURCE_GUIDE.md)

For example, the shipping symbol `_f` is documented as the projectile-step function, `$C` as the live rainbow renderer, and `$K` as the menu / overlay renderer. Once that map is known, the development source is much easier to follow while remaining traceable to the tiny build.

## Running this version

Serve the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/src/
```

The development shell loads classic scripts in dependency order:

```text
style.css
levels.js
runtime/core.js
runtime/physics.js
runtime/render-world.js
runtime/render-entities.js
runtime/render-hud.js
runtime/ui.js
```

The scripts intentionally share the normal global lexical environment used by classic browser scripts. This keeps the readable mirror mechanically close to the shipping build without introducing bundler-specific module behavior.

## Recommended reading path

If you're learning from the game, use this order:

1. `levels.js` to understand how puzzles are described
2. [`../docs/SOURCE_GUIDE.md`](../docs/SOURCE_GUIDE.md) for the compact symbol and tuple map
3. `runtime/core.js` for state, coordinates, timing, and lifecycle
4. `runtime/physics.js` for the actual ricochet model
5. `runtime/render-world.js` and `runtime/render-entities.js` for the theme layer
6. `runtime/render-hud.js` and `runtime/ui.js` for menus and player interaction
7. [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) for the design rationale
8. the root `index.html` to see how all of that is compressed into the competition-oriented form

## A useful tracing exercise

To understand one complete shot, follow:

```text
pointer aim
  ↓
$U / $3          fire
  ↓
$i               construct projectile
  ↓
$Q               fixed simulation update
  ↓
$7               advance live shot / target progression
  ↓
_f               one physics tick
  ↓
Z / _e / $O ...  collisions and fields
  ↓
$C               draw rainbow trail
  ↓
win / $4         complete or fail
```

That one chain explains most of the game.

## Release discipline

The readable mirror is development and educational source. The root `index.html` remains the size-conscious runtime that is packed into the js13k ZIP.

Whenever behavior changes:

1. update the readable implementation / documentation;
2. fold the same behavior into the compact build;
3. verify both versions agree;
4. freeze the exact ZIP only after cross-browser testing and size validation.

The submission gate is documented in [`../docs/COMPETITION_CHECKLIST.md`](../docs/COMPETITION_CHECKLIST.md).
