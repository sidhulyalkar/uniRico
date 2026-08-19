# uniRico v0.16.0 readable source

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

`levels.js` encodes the mechanic-driven campaign. A visible interactive element is expected to be traversed/collided with by the encoded route, except the documented full-height portal gate walls in Levels 3, 13, and 15.

`tests/solution-smoke.js` performs real target-by-target completion validation. `tests/mechanic-coverage.js` verifies intended-route mechanic coverage. `tests/mechanic-feedback.js` protects the data-driven level briefing and once-per-shot cause/effect echoes. `tests/target-language.js` protects the timer-only HUD and ring/order/bounce visual grammar. `tests/menu-rules.js` protects the new first-menu explanation of that grammar.

`render-hud.js::$T()` draws the onboarding example using the same visual language as live targets: white ring = current cloud, number inside cloud = order, number above = exact bounces. Once Play begins, the legend disappears and the live HUD returns to timer-only presentation.

`src/index.html` runs this readable build. The competition candidate is a separately frozen one-file artifact.
