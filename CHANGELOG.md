# Changelog

## v0.8.0 — Grooved bullet-time soundtrack

- Reverse the v0.7 pacing relationship: aiming is quicker, live shots are deliberately slower and heavier.
- Aim state now moves across roughly 122–138 BPM bar values before swing.
- Flight state moves across roughly 94–106 BPM before bounce-dependent slowdown.
- Add alternating sixteenth-note swing so the transport no longer lands on an even mechanical grid.
- Add four different planning-state bass masks and four different pitched-stab masks.
- Add syncopated triangle stabs for a funkier melodic response.
- Add occasional short filtered wah-bass answers during flight.
- Retain independent kick masks, layered sharp snares, irregular hats, deep sub, wobble bass, and phrase-end transitions.
- Make additional reflections slightly slow the music rather than accelerate it.
- Expand audio regression coverage to verify inverse state tempo, swing/tempo spread, groove timbres, density, and oscillator cleanup.

## v0.7.0 — Dynamic music states

- Replaced the fixed ~140 BPM music clock with an adaptive recursive transport.
- Aim/pre-shot music now runs as a sparse ~104–112 BPM half-time pattern, leaving room to read the trajectory.
- Live rainbow shots jump into a denser ~150–167 BPM dubstep/trap pattern.
- Bounce count adds small tempo pressure during flight, while alternating bars vary pacing further.
- Firing a shot triggers an immediate sub/drop accent and resets the flight phrase.
- Returning to a non-flight state immediately switches back to the sparse planning pattern.
- Non-flight states retain the calmer ~104–112 BPM transport.
- Master sound toggle still prevents new audio nodes while muted.

## v0.6.0

### Procedural bass-music redesign

- Expand the soundtrack from a 16-step loop into a 64-step / four-bar arrangement at ~140 BPM.
- Add four evolving bass phrases and independent per-bar kick masks.
- Split bass into a filtered saw/square mid-bass plus a clean sine sub one octave lower.
- Add multiple wobble / growl filter-resonance shapes.
- Add a deeper four-bar downbeat sub boom.
- Layer the half-time snare with a sharper high-frequency transient.
- Add final-bar trap hat rolls, randomized digital ticks, and rare offbeat bass yelps.
- Add a rising transition sweep and phrase-ending octave/glitch fill.
- Preserve the live-projectile call-response bass accent.
- Keep one sequencer timer, finite oscillator lifetimes, autoplay-safe startup, and the existing master `S` audio toggle.
- Extend audio regression testing across a full 64-step macro-pattern, including sub/high-frequency coverage and upward transition sweeps.

## v0.5.0

### Procedural soundtrack

- Added a fully procedural Web Audio background track with no external audio assets.
- Runs a compact 16-step sequence at ~140 BPM.
- Added filtered dual-oscillator bass with resonant low-pass sweeps for a wobble / dubstep character.
- Added sub-kick accents, half-time snare/clap hits, and bright hats.
- Bass root shifts subtly with level progression.
- Adds a small bass fill while a rainbow projectile is in flight.
- Music starts only after Web Audio is unlocked by a user interaction.
- Existing `S` sound toggle controls both music and gameplay SFX.
- Notes are short-lived and explicitly stopped to prevent oscillator accumulation.

## v0.4.1

- Replace moving-wall endpoint-overlap collision with swept relative-motion AABB collision.
- Reflect velocity in the moving wall frame using the wall normal velocity.
- Preserve tangential velocity across moving-prism impacts.
- Separate the projectile just outside the contacted face to prevent sticky repeat collisions.
- Detect high-speed wall crossings that previously could tunnel through thin prisms.
- Add dedicated moving-wall regression tests.
- Revalidate all 40 encoded solution trajectories.

## v0.4.0

- Fix cloud-lock tunneling with swept relative-motion collision detection.
- Add explicit wrong-order cloud feedback.
- Add active-lock `NEXT` badge, stronger order markers, and next-lock connector.
- Add white outlines around unresolved dark target, hazard, and active storm clouds.
- Shift the sky toward a warmer blue-violet gradient for contrast.
- Rebuild Levels 20–30 into a gentler mixed-mechanic bridge.
- Increase target radii and preview budgets through the bridge campaign.
- Make next-level keyboard testing use `LEVELS.length` instead of a hard-coded final index.
- Preserve all 40 encoded solution trajectories and endgame stages.

## v0.3.0

- Darker background and higher-contrast trajectory presentation.
- Simplified menu terminology.
- Reworked Help naming and navigation.
