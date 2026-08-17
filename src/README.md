# uniRico v0.10.0 readable source

The readable source mirrors the standalone competition build while keeping systems split by responsibility.

Load order:

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

`index.html` in this directory runs the readable build. The root `index.html` is the repository entry point, while the single-file size-conscious artifact is rebuilt by `tools/build_js13k_zip.py` for the js13k ZIP.

The music is state-aware: planning uses a slow orchestral harmonic bed; firing switches immediately into the procedural wobble/formant dubstep transport.

The persistent cream HUD carries the current `NEXT X/X · NEED X BOUNCES` requirement. The Canvas only shows the level name and tagline briefly at level start, then fades that card away so the arena stays clean.
