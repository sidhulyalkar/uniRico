# uniRico v0.13.0 readable source

The readable source mirrors the standalone competition build while separating systems by responsibility.

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

`levels.js` now encodes the mechanic-driven v0.13 campaign. A visible interactive element is expected to be traversed/collided with by the encoded route, except the documented full-height portal gate walls in Levels 3, 13, and 15.

`tests/solution-smoke.js` performs real target-by-target completion validation. `tests/mechanic-coverage.js` verifies intended-route mechanic coverage and specifically protects Level 20's wind + spin + prism mix.

`src/index.html` runs this readable build. The package root `index.html` is the one-file size-conscious js13k artifact.
