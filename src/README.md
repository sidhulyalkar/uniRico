# Readable Source Mirror

This directory is the human-readable counterpart to the compact root `index.html` used for the js13k-oriented build.

## Files

- `index.html` — development shell that loads the source as separate files
- `style.css` — extracted page / HUD styling
- `levels.js` — reusable field rigs and all 40 level definitions
- `game.js` — formatted game runtime, physics, rendering, audio, menus, input, and loop

## Why preserve some compact names?

The current competition build has already been aggressively optimized. Renaming every symbol in a second copy would make it harder to compare the readable mirror against the exact shipping artifact and easier for the two implementations to drift apart.

Instead, this directory improves readability through:

- file separation
- formatting
- section headers
- comments around the compact level format
- a detailed descriptive symbol map in [`../docs/SOURCE_GUIDE.md`](../docs/SOURCE_GUIDE.md)

This makes the implementation inspectable without pretending the byte-golfed runtime was authored as a conventional large application.

## Running this version

Serve the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/src/
```

The development shell loads the files in this order:

```text
style.css
levels.js
game.js
```

`game.js` expects the level constants from `levels.js` to already exist.

## Where to start

If you're learning from the code, read:

1. `levels.js`
2. [`../docs/SOURCE_GUIDE.md`](../docs/SOURCE_GUIDE.md)
3. `game.js`
4. [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md)

The root `index.html` is best read last, once you understand what has been compressed.

## Release discipline

The readable mirror is documentation / development source. The root `index.html` remains the size-conscious runtime that is packed into the js13k ZIP.

Whenever behavior changes, both views should be kept aligned before a release is frozen.
