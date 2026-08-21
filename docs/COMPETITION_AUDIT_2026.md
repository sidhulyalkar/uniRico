# uniRico — js13kGames 2026 competition audit

## Executive assessment

uniRico is already substantially beyond a prototype. Its strongest competitive idea is that the theme is structural: a unicorn launches a rainbow whose physical route is the puzzle, and the sky's fantasy systems transform that route. The 40-level campaign, exact-bounce cloud grammar, same-simulation trajectory preview, procedural Canvas presentation, and procedural Web Audio all reinforce a single compact concept.

The main risks entering this audit were not lack of mechanics. They were judge-facing friction: a stale competition packaging path, mobile input that committed on touch-down, important settings that were keyboard-centric, procedural music without a master mix bus, and sound effects whose pitch language did not reinforce the rainbow theme.

v0.18.0 addresses those risks without changing the encoded solution space.

## Competition scorecard

| Criterion | Before v0.18 | v0.18 target | Assessment |
| --- | ---: | ---: | --- |
| Theme | 4.3 / 5 | 4.7 / 5 | Unicorn, rainbow, clouds, prisms, arches, moonbow/stardust systems and restoration fantasy are gameplay rather than decoration. Rainbow harmony now extends the theme into audio. |
| Innovation | 4.4 / 5 | 4.6 / 5 | One tiny deterministic physics language supports prediction, live play, moving geometry, portals, force fields, ordered targets, and 40 authored puzzles. Adaptive touch adds a compact human-input twist. |
| Gameplay | 4.0 / 5 | 4.4 / 5 | Strong discovery curve and mastery ceiling. Main remaining risk is exact-bounce frustration if a judge misses the cloud grammar or reaches precision levels too quickly. |
| Graphics | 4.1 / 5 | 4.3 / 5 | Cohesive procedural sky, readable mechanic vocabulary, strong rainbow trail, and very low HUD clutter. Final device-size legibility is still a human gate. |
| Audio | 3.8 / 5 | 4.5 / 5 | State-aware orchestral-to-dubstep score is unusual at this size. v0.18 adds dynamic mix control and theme-linked harmonic feedback. Physical speaker tests remain mandatory. |
| Controls | 3.7 / 5 | 4.6 / 5 | Desktop was already clean. Mobile now supports tap or relative drag-and-release, self-calibrating touch jitter, pointer cancellation, and tappable persistent settings. |

These are design-audit targets, not claims about official judge scores.

## 1. Theme

### What works

The best choice in uniRico is that removing the theme would destroy the game rather than merely reskin it. The unicorn's horn establishes the launch direction. The rainbow is both projectile and persistent visual trace. Angry clouds are the ordered objectives and become happy after restoration. Prisms create literal rainbow ricochet. Rainbow arches behave as portals. Later mechanics read as escalating weather / celestial magic rather than unrelated puzzle gadgets.

The target language is especially efficient: white ring means current cloud, number inside means order, badge above means exact bounce count. That lets the world itself carry the objective instead of a permanent instruction panel.

### Remaining risk

There are enough systems that late levels can read as a generic physics laboratory unless the fantasy vocabulary stays legible. The transient mechanic names and interaction echoes are therefore important and should remain, even under byte pressure.

### v0.18 improvement

Bounce notes now cycle through a six-note rainbow palette, ordered-cloud resolutions climb through the same palette, victory resolves within it, and flight harmony lifts slightly as the rainbow restores additional clouds. The theme now exists in the soundtrack's rules, not only in its timbre.

## 2. Innovation

### What works

The technical novelty is compositional rather than one flashy subsystem. A fixed-step projectile model drives live play and prediction. Moving targets use swept collision. Moving prisms reflect in their moving frame. Portals, forces, spin, charge, magnetism, timed barriers, resonance windows, and hazards all modify the same projectile state. Compact data tuples then turn that engine into a 40-level campaign.

This is exactly the sort of small-code leverage a 13 KB competition can reward: systems multiply one another instead of each requiring an asset or bespoke engine.

### v0.18 improvement

Mobile aiming now adapts with almost no interface cost. A quick tap remains direct aim-and-fire. A drag becomes a relative direction gesture, allowing the thumb to stay anywhere on the screen and avoid covering the target. Release commits the shot. The tap/drag threshold learns from that player's small touch movements and persists locally. It is an accessibility/control improvement that is also a compact technical idea.

## 3. Gameplay

### What works

The campaign has a deliberate curriculum. Early levels isolate fundamentals. Middle levels introduce moving/timed systems and two-system mixtures. Later levels chain multiple mechanics and ordered clouds while trajectory assistance shrinks. The encoded intended path for every level is executable in automated tests, and visible mechanics are audited for actual participation in that path.

The help system is stronger than a normal hint button because it reuses the simulation: show aim, watch a mirrored shot, or watch the true solution. That provides an escape hatch without changing physics or secretly solving a different game.

### Main risk

Exact bounce counts create satisfying "I see it" moments, but also brittle-feeling misses when the visual grammar is not understood. Judges frequently evaluate many games in a short period; confusion during the first minute is much more dangerous than a difficult Level 35.

### v0.18 improvement

After a third failed shot, one contextual `STUCK? MENU → HELP` nudge points to the existing deterministic help tools. It does not lower difficulty or auto-solve the level; it makes the recovery path discoverable before frustration becomes abandonment.

## 4. Graphics / presentation

### What works

Canvas-generated art gives the game a coherent handmade identity with virtually no asset overhead. The unicorn is readable at gameplay scale, clouds encode state, the shot trail is unmistakably rainbow-colored, each mechanic has a distinct visual language, and the live HUD has been reduced to the timer.

The transient level card is a good compromise: judges learn the level name and active mechanic vocabulary, then the card disappears so the puzzle owns the screen.

### Remaining risk

Mobile legibility cannot be inferred from the 960×600 logical canvas alone. Uniform scaling prevents aspect-ratio-dependent physics, but very tall or very narrow displays can still make labels and small late-game targets physically tiny. Physical-device review remains a release gate.

## 5. Audio / music

### What worked before

The soundtrack already had an unusually ambitious state machine for the size budget. Planning used sparse sine/triangle orchestral pulses; firing snapped into a faster bass-music state with sub, filtered wobble, formant/yoi calls, irregular kicks, half-time snare, hats, swing, risers, and phrase-end fills. Audio was synthesized entirely with Web Audio.

### Problems found

Voices connected directly to the destination, so dense moments could stack harshly. Bounce pitches were useful feedback but musically arbitrary. The score reacted to planning versus flight but did not communicate ordered-cloud progress strongly enough. Development headphones could hide the fact that pure sub energy disappears on many phone speakers.

### v0.18 improvement

A browser-supported dynamics compressor is now the master bus, with a direct-output fallback. The bass voice retains a clean low sine while an upper filtered oscillator carries the motif on small speakers. Bounce count alters the wobble behavior. Cloud-chain progress lifts the tonal center. Bounce, cloud-success, and victory SFX share a six-note rainbow palette.

The intended arc is now:

`quiet plan → fire/drop → harmonic ricochet → rising cloud chain → resolved victory`

The remaining work is mixing, not composition: verify cue audibility and bass balance on actual phone, laptop, and headphones.

## 6. Desktop controls

Mouse aiming remains absolute and click still fires immediately. Keyboard shortcuts retain pause/menu, retry, Help, sound, and path toggles. The path preview is not an approximation: it uses the live simulation in prediction mode, which gives the player trustworthy feedback.

No desktop behavior needed reinvention in v0.18; preserving its immediacy was the goal.

## 7. Mobile controls

### Problem found

The previous pointer abstraction made the game technically playable on touch, but pointer-down in active play immediately fired. That creates accidental shots, especially when the player's finger obscures the exact location being selected. Sound and path settings were also described through keyboard shortcuts instead of feeling first-class on a phone.

### v0.18 behavior

Touch-down begins an aim gesture without committing. While the finger moves, a sufficiently large gesture becomes relative directional aiming. Release fires once. A small gesture stays direct, so quick tap-to-fire remains available. The transition threshold continuously adapts to the player's observed tap jitter and is stored in localStorage. Pointer cancellation safely discards a gesture. Sound and trajectory-preview controls are now real pause-menu buttons and their choices persist.

This gives three useful properties within a tiny code budget: no mandatory calibration screen, no forced left/right handed layout, and no need for the thumb to cover the intended target.

## 8. Engineering / 13 KB integrity

The standard competition package is built from the readable source modules into a single self-contained HTML document, minified with pinned tooling, deterministically Zopfli-compressed, and rejected if it exceeds 13,312 bytes.

The release workflow verifies the archive contains exactly one member named `index.html`. That makes the js13k upload-form requirement mechanically enforceable: there can be no wrapper folder, no nested `dist/index.html`, and no stray payload files. The same gate rejects external script/style/network dependencies for the Desktop/Mobile candidate and records source commit, byte size, and SHA-256 beside the canonical `dist/uniRico-js13k.zip`.

## 9. Judge-first play path

The desired first five minutes are:

1. Menu communicates the cloud grammar and that touch supports tap or drag-release.
2. Level 1 produces a successful rainbow almost immediately.
3. The first ricochet makes a pitched rainbow response and a grumpy cloud visibly resolves.
4. A new mechanic arrives alone, announces itself only when touched, and produces an obvious cause/effect change.
5. By the first mixed level, the player understands that the pleasure of the game is composing a magical route, not merely finding an angle.

Do not optimize the submission around showing all 40 levels to a judge. Optimize the first few levels so the judge wants to see Level 40.

## 10. Freeze recommendation

Once the exact merge candidate is below the size ceiling and all automated regressions pass, the remaining blockers should be human/device checks rather than new mechanics: current Chrome, current Firefox, iPhone Safari, Android Chrome, plus phone/laptop/headphone audio. If those sessions are clean, freeze mechanics and spend any remaining bytes only on defects or high-value micro-polish discovered in those sessions.
