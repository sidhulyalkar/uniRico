# uniRico v0.15.0 readable source

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

`levels.js` encodes the mechanic-driven v0.13 campaign. A visible interactive element is expected to be traversed/collided with by the encoded route, except the documented full-height portal gate walls in Levels 3, 13, and 15.

`tests/solution-smoke.js` performs real target-by-target completion validation. `tests/mechanic-coverage.js` verifies intended-route mechanic coverage and specifically protects Level 20's wind + spin + prism mix. `tests/mechanic-feedback.js` protects the data-driven level briefing and once-per-shot cause/effect echoes. `tests/target-language.js` protects the timer-only HUD and ring/order/bounce visual grammar.

`src/index.html` runs this readable build. The competition candidate is a separately frozen one-file artifact.

The transient title card derives its mechanic legend from `MK` / `MN` in `core.js`. `mi()` in `physics.js` emits the first live interaction echo for each mechanic bit and stays silent when `sim` is enabled.
