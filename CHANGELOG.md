# Changelog

## v0.17.1 — Bounce Badge Contrast Hotfix

- Replace the white onboarding bounce badge with a dark plum badge and white numeral so the example value cannot disappear against pale highlights.
- Apply the same dark-badge / white-number treatment to live cloud bounce requirements so the menu legend exactly matches gameplay.
- Extend `tests/menu-rules.js` and `tests/target-language.js` to protect the contrast treatment.
- Keep the white active-target ring and white unresolved-cloud order numbers unchanged, preserving the established visual grammar.

## v0.17.0 — Bottom Rules Ribbon

- Move the opening cloud-language rules card to the bottom of the menu so it no longer interrupts the title / play hierarchy.
- Restore `PLAY · LEVEL` and `LEVELS` to their original centered positions.
- Replace the pale onboarding card with a dark rainbow gradient panel for stronger contrast and a clearer one-time teaching moment.
- Keep the exact same ring/order/bounce example and move the compact controls line beneath the rules ribbon.
- Extend menu-layout regressions to lock the bottom placement, centered hitboxes, and dark rainbow treatment.
- Freeze the deterministic candidate at 12,858 bytes, leaving 454 bytes beneath the 13,312-byte ceiling.

## v0.16.0 — First-Menu Rules Legend

- Add a compact visual rules card to the initial menu so new players can immediately distinguish cloud order from bounce count.
- Demonstrate the actual in-game grammar: white ring = current cloud, number inside cloud = order, badge above = exact required bounces.
- Define a bounce as a wall / prism ricochet so the badge has an unambiguous meaning before Level 1 begins.
- Move Play / Levels controls downward to preserve breathing room around the visual example.
- Add `tests/menu-rules.js` and extend HUD regression coverage so the onboarding legend cannot silently regress.
- Preserve the timer-only live HUD and all v0.15 ring-language behavior once play begins.

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

## v0.12.0 — Bottom Reveal

- Move the transient level title card from the top of the arena to the bottom center.
- Increase title / mechanic briefing typography and use a more opaque warm-white panel.
- Preserve the timer-only live HUD at the top.

## v0.11.0 — Minimal Flight HUD

- Reduce the persistent live HUD to timer + objective information, then move cumulative stats into pause / completion surfaces.
- Hide the live HUD outside active gameplay.

## v0.10.0 — Clean HUD + Dual-State Music

- Replace permanent level-description panels with a transient level intro.
- Remove the old right-side objective oval.
- Add slower orchestral planning music and switch to procedural dubstep during shot flight.

## v0.9.0 — Wobble Warfare

- Add stronger root-frequency sub bass, formant / yoi bass modes, sharper percussion, and disruptive phrase transitions.

## v0.8.0 — Grooved Bullet Time

- Invert the soundtrack pacing so aiming is quicker / funkier while projectile flight drops into a slower bass-heavy groove.
- Add swing, bar-dependent tempo changes, funk stabs, and irregular percussion.

## v0.7.0 — Adaptive Tempo

- Introduce state-aware music pacing and separate aim / flight arrangements.

## v0.6.0 — Chaotic Gaming Bass

- Expand procedural music into a four-bar bass/trap arrangement with stronger sub, sharper snares, hats, and transitions.

## v0.5.0 — Procedural Music

- Add browser-safe Web Audio background music with one sequencer and explicit oscillator cleanup.

## v0.4.1 — Moving Prism Collision Fix

- Replace embedded-point moving-wall collision with relative swept collision and moving-frame reflection.
- Add post-impact separation to eliminate sticking / dragging at moving prism ends.

## v0.4.0 — Collision + Difficulty Bridge

- Add swept moving-cloud collision to eliminate high-speed lock tunneling.
- Make out-of-order hits explicit.
- Rebuild Levels 20–30 as a gentler bridge into late-game combinations.
- Improve dark-cloud contrast and target-order readability.

## v0.3.0 — Presentation Pass

- Darken the arena for stronger trajectory contrast.
- Simplify navigation and rename major UI surfaces around levels / help.
- Preserve 40-level campaign structure and local records.

## v0.2.0 — Theme Pass

- Re-theme the original ricochet systems around unicorns, rainbows, clouds, dream fields, moonbows, glitter, and storms.
- Add the procedural unicorn, rainbow projectile trail, cloud personalities, and pastel HUD.

## v0.1.0

- First uniRico conversion milestone.
