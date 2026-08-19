# Changelog

## v0.16.0 — First-Menu Rules Legend

- Add a compact visual rules card to the initial menu so new players can immediately distinguish cloud order from bounce count.
- Demonstrate the actual in-game grammar: white ring = current cloud, number inside cloud = order, badge above = exact required bounces.
- Define a bounce as a wall / prism ricochet so the badge has an unambiguous meaning before Level 1 begins.
- Move Play / Levels controls downward to preserve breathing room around the visual example.
- Add `tests/menu-rules.js` and extend HUD regression coverage so the onboarding legend cannot silently regress.
- Preserve the timer-only live HUD and all v0.15 ring-language behavior once play begins.
- Freeze the deterministic candidate at 12,784 bytes, leaving 528 bytes beneath the 13,312-byte ceiling.

## v0.15.0 — Ring Language

- Remove the persistent `NEXT X/X · NEED X BOUNCES` objective text from active play; the top HUD now contains only the timer.
- Remove the `NEXT` label above the active target and the wordy `N BOUNCES` labels below clouds.
- Use one bright white ring as the sole active-cloud indicator.
- Move each cloud's order number directly onto the upper cloud body, using white text on unresolved gray clouds and dark text on restored white clouds.
- Reuse the old circular order badge position for the raw required bounce number.
- Remove the dotted next-target connector and simplify wrong-order feedback to `WRONG CLOUD`.
- Add `tests/target-language.js` and update HUD/module regressions to lock in the timer-only HUD and spatial target grammar.
- Revalidate all 40 true solutions, mechanic coverage, mechanic feedback, moving-wall collisions, audio, and modular load.
- Freeze the deterministic candidate at 12,582 bytes, leaving 730 bytes beneath the 13,312-byte ceiling.

## v0.14.0 — Mechanic Echoes

- Replace the generic level-intro tagline with a data-driven list of the mechanics actually present in each puzzle.
- Show `MOVING CLOUD` on motion-only lessons and compact mechanic combinations such as `PRISM · WIND · SPIN` on mixed stages.
- Add one-per-shot mechanic interaction echoes: floating label, five-spark burst, and a tiny pitch-coded blip when a live rainbow first activates a system.
- Cover prisms, portals, wind, dream zones, accelerators, gravity, spin, storm barriers, charge, magnetism, resonance, and void hazards.
- Suppress all mechanic echoes in prediction / Help simulation so feedback never changes deterministic physics or pollutes tutorial traces.
- Add a `PERFECT PATH!` completion title and higher resolving chime for first-shot clears.
- Add mechanic-feedback regression coverage for Level 20's `PRISM · WIND · SPIN` briefing, once-per-shot behavior, particles, and simulation silence.
- Revalidate all 40 true solutions, mechanic coverage, moving-wall collisions, HUD behavior, modular load, and adaptive audio.
- Freeze the deterministic candidate at 12,802 bytes, leaving 510 bytes beneath the 13,312-byte ceiling.

## v0.13.0 — Mechanic-Driven Campaign

- Rebuild all 40 levels around a strict mechanic-use invariant: visible interactive systems must be used by the intended solution or serve as explicit gate geometry.
- Redesign Level 20 `FIRST MIX` into a required wind + spin + prism two-lock circuit.
- Prune decorative hazards, barriers, fields, and prism segments that did not affect intended solutions.
- Rebuild Levels 9, 10, 11, and 15 to eliminate moving-prism, storm-barrier, polarity, and portal bypasses found during design audit.
- Strengthen late full-spectrum gravity and magnetic stages so charge/polarity materially shape the route.
- Rebuild ordered cloud targets directly along validated mechanic-dependent trajectories.
- Establish explicit difficulty tiers: 2-lock bridge at 20–25, 3-lock chains at 26–30, 4-lock advanced levels at 31–35, 5-lock endgame at 36–39, and a 6-lock finale.
- Make trajectory-preview budget monotonically non-increasing across all 40 levels.
- Replace the old weak solution smoke test with true target-by-target completion validation.
- Add `tests/mechanic-coverage.js` so unused visible mechanics fail CI-style local testing.
- Run broad aim/delay and dense intended-neighborhood bypass audits with no sampled winning route skipping a required mechanic.
- Preserve v0.12 HUD, collision, and orchestral-to-dubstep audio behavior.
- Freeze the deterministic candidate at 12,522 bytes, leaving 790 bytes under the 13,312-byte ceiling.

## v0.12.0 — Bottom Level Reveal

- Move the transient level name/tagline card from the upper arena to bottom-center.
- Increase the title to 18px bold and the tagline to 11px bold for a clearer level-opening moment.
- Increase the card to 460×64 with a near-solid warm-white fill and crisp white outline.
- Preserve the existing ~3.5-second lifecycle and final one-second fade.
- Preserve the minimal live HUD, pause stats, orchestral planning bed, dubstep shot state, physics, and 40-level campaign.
- Add HUD regression assertions for bottom placement, stronger opacity, and larger typography.
- Revalidate the full 40-level solution, moving-prism, modular-load, and adaptive-audio regression suite.
- Freeze the deterministic candidate at 13,223 bytes, leaving 89 bytes beneath the 13,312-byte ceiling.

## v0.11.0 — Minimal Flight HUD

- Reduce the live HUD to only the timer and `NEXT X/X · NEED X BOUNCES`.
- Remove `UNI:RICO`, level count, shot count, total stars, and total score from the persistent gameplay overlay.
- Replace the large cream status capsule with a much smaller, lightly translucent single-line pill.
- Hide the live HUD entirely while paused, in Help, on level select, and on menu/completion screens.
- Keep the existing 3.5-second level name/tagline intro card for transient orientation.
- Add a pause-screen stats section containing level name, current time, current shot count, cumulative stars, and cumulative score.
- Reposition pause actions so the new stats remain readable without crowding the menu.
- Update HUD/module regression tests to enforce the minimal live-information contract and pause/menu hiding behavior.
- Revalidate all 40 encoded solutions, moving-prism collision tests, and adaptive orchestral/dubstep audio regression.
- Freeze the deterministic candidate at 13,227 bytes, leaving 85 bytes beneath the 13,312-byte ceiling.

## v0.10.0 — Clean Flight Deck + Orchestral Planning

- Replace the two permanent Canvas HUD cards with a single temporary level-introduction card.
- Show `LEVEL XX · NAME` plus the gameplay tagline at level start, then fade the card after roughly 3.5 seconds.
- Remove the right-side white objective oval entirely.
- Add a centered `NEXT X/X · NEED X BOUNCES` row inside the persistent cream top HUD.
- Refresh the objective row on cloud progression and failed-shot reset.
- Replace the pre-shot electronic groove with a slower four-bar orchestral-style harmonic bed built from overlapping sine and triangle voices.
- Keep the Wobble Warfare dubstep engine for live shots, creating an immediate calm-to-drop state transition on fire.
- Preserve swept moving-cloud and moving-prism collision behavior and the Levels 20–30 teaching bridge.
- Add HUD-layout regression coverage and update adaptive-audio tests for the new slower-planning / faster-flight relationship.
- Revalidate all 40 encoded solution trajectories.
- Freeze the deterministic candidate at 13,291 bytes, leaving 21 bytes beneath the 13,312-byte ceiling.

## v0.9.0 — Wobble Warfare

- Retune the procedural soundtrack around a stronger 45–65 Hz clean sub fundamental.
- Add compact multi-rate wobble behavior through per-note filter timing and resonance variation.
- Add high-Q band-pass formant bass for a talking / vowel-style drop bar.
- Add yoi-style resonant call-and-response stabs.
- Harden the half-time snare with a short high-frequency transient and brighter hats.
- Add a stronger sub impact, bar transition riser, phrase-end growl hit, and final-bar stutter timing.
- Preserve the faster planning groove and slower live-shot pocket introduced in v0.8.0.
- Preserve finite oscillator lifetimes, one recursive audio transport, browser autoplay-safe startup, and the master `S` mute toggle.
- Keep the final deterministic js13k archive at 13,306 bytes, leaving 6 bytes of formal headroom.

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
