# uniRico v0.12.0 readable source

The readable source mirrors the standalone competition build while keeping systems split by responsibility.

## Load order

```text
levels.js
runtime/core.js
runtime/audio.js
runtime/physics.js
runtime/render-world.js
runtime/render-entities.js
runtime/render-hud.js
runtime/ui.js
```

The split is designed for inspection rather than bundling. All modules are classic scripts and share the same small runtime state used by the one-file competition artifact.

The live HTML HUD intentionally contains only elapsed time and the active `NEXT / NEED` requirement. The level name and tagline are drawn by `render-hud.js` as a bottom-centered transient title card for roughly 3.5 seconds, then disappear.

See `../docs/SOURCE_GUIDE.md` for the compact-symbol map and system walkthrough.
