# Wavedash deployment

Wavedash requires browser games to call `Wavedash.init()` once the game is ready. The host injects `window.Wavedash`, so uniRico now performs the readiness handshake from the repository root `index.html` after all game scripts have initialized.

```js
let w=window.Wavedash;
if(w){
  w.updateLoadProgressZeroToOne(1);
  w.init();
}
```

uniRico has no asynchronous external assets, so the host is moved directly to 100% only after the canvas runtime, HUD, game state, and animation loop are ready. `init()` then tells Wavedash to dismiss its loading screen and reveal the game.

## Upload from GitHub

1. Open the repository on the `main` branch.
2. Choose **Code → Download ZIP**.
3. Upload that new ZIP as a new Wavedash build.

The repository root entrypoint now contains the host handshake, while normal local/browser play remains unchanged because the integration is guarded by `if (window.Wavedash)`.

## Clean deployment artifact

For a smaller upload, a deployment archive can contain only:

```text
index.html
src/style.css
src/levels.js
src/runtime/*.js
```

The included `.github/workflows/build-wavedash.yml` defines that reproducible packaging step.

## Separation from js13k

This integration changes the readable repository entrypoint only. The frozen one-file js13k competition artifact remains separate and platform-neutral, so Wavedash-specific code does not consume competition bytes or alter its recorded hash.
