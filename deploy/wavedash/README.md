# Wavedash deployment

Wavedash requires browser games to call `Wavedash.init()` once the game is ready. The host injects `window.Wavedash`, so uniRico performs the readiness handshake from the repository root `index.html` after all game scripts have initialized.

The v0.15.0 repository entrypoint retains that handshake while using the new timer-only HUD and ring-based cloud objective language.

```js
let w=window.Wavedash;
if(w){
  w.updateLoadProgressZeroToOne(1);
  w.init();
}
```

## Upload from GitHub

For the smallest clean upload, use `dist/uniRico-v0.15.0-wavedash.zip` after the workflow has generated it. The archive contains the root entrypoint plus the readable source files required by that entrypoint.

The Wavedash adapter is guarded, so ordinary local/browser play works unchanged when `window.Wavedash` is absent.

## Separation from js13k

The official one-file js13k candidate remains platform-neutral. Host-specific readiness code lives only in the GitHub/Wavedash entrypoint and Wavedash deployment artifact, so the competition hash and byte budget remain independent.
