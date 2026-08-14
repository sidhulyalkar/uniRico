# js13kGames 2026 Desktop Release Checklist

This checklist is used to freeze a uniRico release candidate before submission.

## Category and theme

- [ ] Submit in the **Desktop** category.
- [ ] Keep the **Unicorns and Rainbows** theme obvious in the first few seconds of play.
- [ ] Make sure the theme remains tied to the central mechanic, not only the title screen or decoration.

## Archive

- [ ] Final ZIP is **≤ 13,312 bytes**.
- [ ] `index.html` exists at the root of the ZIP.
- [ ] Archive extracts cleanly.
- [ ] The exact uploaded archive is retained locally and hashed.

## Runtime independence

- [ ] No external JavaScript.
- [ ] No external CSS.
- [ ] No external fonts.
- [ ] No remote images.
- [ ] No remote audio.
- [ ] No fetch / XHR / WebSocket dependency for the Desktop build.
- [ ] Game remains playable without an internet connection after extraction.

## Browser gate

### Chrome

- [ ] Launch from extracted archive.
- [ ] Main menu renders correctly.
- [ ] Start a level.
- [ ] Fire and ricochet a shot.
- [ ] Complete a level.
- [ ] Open Levels.
- [ ] Open Help.
- [ ] Restart a level.
- [ ] Toggle sound and path preview.
- [ ] Confirm no console errors.

### Firefox

- [ ] Launch from extracted archive.
- [ ] Main menu renders correctly.
- [ ] Start a level.
- [ ] Fire and ricochet a shot.
- [ ] Complete a level.
- [ ] Open Levels.
- [ ] Open Help.
- [ ] Restart a level.
- [ ] Toggle sound and path preview.
- [ ] Confirm no console errors.

## Campaign smoke test

- [ ] Verify Levels 1–5 for onboarding and mechanic readability.
- [ ] Verify at least one portal level.
- [ ] Verify at least one wind level.
- [ ] Verify at least one gravity / moonbow level.
- [ ] Verify spin.
- [ ] Verify charge / magnetism.
- [ ] Verify timed storm barriers.
- [ ] Verify resonance / aurora behavior.
- [ ] Verify an advanced multi-system level.
- [ ] Verify Level 40 and final completion state.

## Prediction correctness

- [ ] White trajectory preview uses the same physics model as the live rainbow.
- [ ] Reflections in the preview match live reflections.
- [ ] Moving prisms are handled consistently.
- [ ] Portal timing matches.
- [ ] Wind / gravity / spin curves match closely enough to be trustworthy.
- [ ] No visible trajectory-extension bug at prism contact.

## Theme readability

- [ ] Unicorn is recognizable at normal desktop play size.
- [ ] Horn direction clearly communicates aiming.
- [ ] Live projectile reads as a rainbow with a fading tail.
- [ ] Active grumpy cloud is easy to identify.
- [ ] Successful cloud restoration is visually obvious.
- [ ] Prism walls are distinguishable from decorative rainbows.
- [ ] Rainbow arches read as portals.
- [ ] Wind is readable as moving magical air / cloud gusts.
- [ ] Hazard clouds are distinguishable from target clouds.
- [ ] White trajectory remains visible on every background area.

## Navigation

- [ ] `PLAY` is obvious.
- [ ] `LEVELS` is obvious.
- [ ] `PAUSED` menu uses familiar terms.
- [ ] `HELP` explains assistance clearly.
- [ ] `SHOW AIM` behaves as labeled.
- [ ] `WATCH MIRRORED SHOT` behaves as labeled.
- [ ] `WATCH SOLUTION` behaves as labeled.
- [ ] `R` reliably restarts the current level.
- [ ] `M` / `Esc` reliably enters and leaves the menu.

## Persistence

- [ ] Complete a level and reload.
- [ ] Best score persists.
- [ ] Stars persist.
- [ ] Last level selection persists.
- [ ] Corrupt / missing local storage does not prevent startup.

## Desktop layout

- [ ] 1920×1080 window.
- [ ] 1440×900 window.
- [ ] 1366×768 window.
- [ ] Narrow desktop window.
- [ ] High-DPI display.
- [ ] HUD does not obscure important targets.
- [ ] Canvas remains centered and aspect-correct.

## Source repository

- [ ] Public GitHub repository is accessible.
- [ ] README accurately describes the submitted build.
- [ ] Readable source is available publicly.
- [ ] Build / packaging instructions are documented if a build step exists.
- [ ] Submitted artifact can be traced to a tagged commit.
- [ ] Release tag matches the game version.

## Final freeze

Record the final submission values here:

```text
Version:
Commit:
Tag:
ZIP filename:
ZIP bytes:
SHA-256:
Chrome version tested:
Firefox version tested:
Test date:
```

Once these values are frozen, do not rebuild or recompress the archive before uploading. A different compression tool can change the byte count even when the contained source is identical.
