# js13kGames 2026 Desktop release checklist

Use this checklist to freeze a uniRico candidate.

## Package

- [ ] ZIP is ≤ 13,312 bytes.
- [ ] Root contains exactly `index.html` for the submitted Desktop artifact.
- [ ] No remote scripts, styles, fonts, images, audio, fetch/XHR, or required network service.
- [ ] Archive extracts and launches offline.
- [ ] SHA-256 is recorded for the exact uploaded ZIP.

## Browser gate

- [ ] Latest Chrome: menu, play, fire, complete, pause, Help, Levels, Restart, sound toggle, path toggle.
- [ ] Latest Firefox: same flow.
- [ ] No console errors in either browser.
- [ ] Web Audio unlocks only after interaction and does not duplicate transports.

## Physics gate

- [ ] 40/40 encoded solutions pass.
- [ ] Fast target contacts do not tunnel.
- [ ] Future-cloud hits fail explicitly rather than appearing ignored.
- [ ] Moving prism high-speed crossing regression passes.
- [ ] Moving wall sweeping into the projectile regression passes.
- [ ] Tangential wall velocity does not corrupt tangential projectile velocity.
- [ ] Post-impact separation prevents sticky repeat bounces.
- [ ] Prediction remains trustworthy across moving walls, portals, wind, gravity, and spin.

## Audio gate

- [ ] Aim state is quicker/lighter than live-shot state.
- [ ] Flight transport slows with additional reflection weight.
- [ ] Swing/tempo spread remains measurable.
- [ ] Sub, mid-bass, snare transient, hats, and pitched stabs all synthesize.
- [ ] Oscillator starts/stops remain balanced in regression test.
- [ ] Muting creates no new voices.
- [ ] Human mix test confirms music does not bury bounce/portal/failure/success SFX.

## Campaign/readability gate

- [ ] Levels 1–19 teach single systems clearly.
- [ ] Levels 20–30 provide understandable mixed-system practice.
- [ ] Levels 31–40 remain challenging but readable.
- [ ] Active lock order, bounce requirement, and dark-cloud silhouettes are visible at common desktop sizes.
- [ ] `src/` readable mirror matches current campaign and behavior.
- [ ] `docs/SOURCE_GUIDE.md` and `docs/ARCHITECTURE.md` match current source layout.
- [ ] Exact submission ZIP is attached to the release candidate and matches the frozen expected SHA-256.

## v0.8.0 frozen candidate

```text
Version: v0.8.0
ZIP bytes: 13,272
Bytes free: 40
SHA-256: e08b939e78159dfd9288becb0aec273c96d8af896df46e6118ad2fd073847e2e
Automated solution test: PASS 40/40
Moving-wall regression: PASS
Audio regression: PASS
Chrome manual version tested:
Firefox manual version tested:
Final test date:
```
