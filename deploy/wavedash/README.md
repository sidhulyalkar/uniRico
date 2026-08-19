# Wavedash deployment build

Wavedash requires browser games to call `Wavedash.init()` once the game is ready. The SDK is injected by the host, so uniRico keeps this handshake in a dedicated platform build instead of changing the official js13k artifact.

## Upload this ZIP

```text
dist/uniRico-v0.14.0-wavedash.zip
```

The archive contains exactly one top-level `index.html` and is ready for manual upload in the Wavedash developer portal.

Do **not** upload GitHub's generic repository **Download ZIP** archive. That archive contains source, docs, tests, and an outer repository directory rather than the purpose-built web artifact.

## Adapter

The Wavedash build is the same v0.14.0 standalone game with this final readiness handshake after the game runtime initializes:

```js
let w=window.Wavedash;
if(w){
  w.updateLoadProgressZeroToOne(1);
  w.init();
}
```

uniRico has no asynchronous external assets, so it reports 100% only after the canvas runtime, HUD, game state, and animation loop are initialized. `init()` then tells Wavedash to dismiss its loading screen and reveal the game.

The adapter is guarded by `if(w)`, so the Wavedash build also remains playable when opened outside Wavedash.

## Separation from js13k

The official js13k candidate remains unchanged and platform-neutral. Wavedash integration is deliberately isolated so host-specific code cannot alter the competition hash or byte budget.
