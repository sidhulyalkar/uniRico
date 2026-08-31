# js13kGames 2026 competition release checklist

Target categories: **Desktop + Mobile**. Theme: **Unicorns and Rainbows**.

Current official rules: https://js13kgames.com/2026/rules

## Submission contract

- [x] Standard `.zip` archive at or below **13,312 bytes** (`13 × 1024`).
- [x] `index.html` is in the **top directory of the ZIP**.
- [x] CI requires exact archive membership `['index.html']`, rejecting wrapper folders and stray files.
- [x] CSS + compiled JavaScript are self-contained in the competition HTML.
- [x] CI rejects external/network runtime dependencies in the standard Desktop/Mobile candidate.
- [x] Readable source remains public beside the minified package.
- [x] Desktop and Mobile use one shared game/submission.
- [x] v0.19.1 PR candidate: **13,227 / 13,312 bytes**, 85 bytes free; SHA-256 `2f9bceeaab568d3653a949052478b851c3420e6e65acbd45260b77d9d19fef2c`.
- [ ] Final manual Chrome smoke test has no game-breaking console errors.
- [ ] Final manual Firefox smoke test has no game-breaking console errors.
- [ ] Review submission form, repository URL, categories, description, and final ZIP immediately before upload.

## Tutorial / comprehension gate

- [x] Level 1 demonstrates the full grammar before asking the player to solve it.
- [x] Tutorial explicitly states **ring = current**, **number = order**, **badge = exact ricochets**.
- [x] Each reflection during tutorial playback shows a visible `RICOCHET n` count.
- [x] Level 1 handoff states that exact ricochets unlock the cloud, then gives **YOUR TURN**.
- [x] First visits to Levels 1–12 run short accelerated demonstrations using the real encoded solution before player control.
- [x] Tutorial demos use the same deterministic physics as live play, not canned animation.
- [x] A lesson does not replay repeatedly within the same session.
- [x] Existing early one-mechanic-at-a-time practice levels are preserved after each demo.
- [x] Automated tutorial-flow regression completes Level 1 demo, verifies clean handoff, repeat suppression, and the next lesson.
- [ ] Fresh-player test: without verbal explanation, player can explain **ring/current, number/order, badge/ricochets, ricochet unlock** after Level 1.
- [ ] Fresh-player test: first new mechanic after Level 1 is understood from its quick demo before the attempt.

## Gameplay / progression gate

- [x] 40/40 encoded solutions complete every target chain.
- [x] Preview assistance never increases as the campaign advances.
- [x] Levels 1–8 still isolate fundamentals after demonstrations.
- [x] Levels 20–25 form a two-lock mixed-system bridge.
- [x] Levels 26–30 use three-lock chains; 31–35 four-lock chains; 36–39 five-lock chains.
- [x] Level 40 `FULL SPECTRUM` ends with six ordered clouds and seven interacting mechanic families.
- [x] Wrong cloud / wrong ricochet failures are explicit.
- [x] Third failure points once toward Help.
- [x] Help offers aim guidance, mirrored demonstration, and actual solution without changing physics.
- [ ] Human frustration test: representative players recover from three failed shots rather than abandoning the level.

## Desktop controls gate

- [x] Mouse movement is the sole desktop aim authority; click fires the exact trajectory already displayed.
- [x] Pointerdown cannot silently retarget the launch away from the visible preview.
- [x] Adversarial regression aims at one coordinate, fires with pointerdown at another, and verifies exact aim preservation.
- [x] Keyboard pause/menu, retry, help, path, and sound controls remain available.
- [x] Aim preview uses the exact fixed-step live simulation.
- [ ] Chrome desktop: early, mixed, moving-target, and endgame representative levels.
- [ ] Firefox desktop: same representative flow.

## Mobile controls gate

- [x] `touch-action:none` prevents browser gestures from stealing play.
- [x] First touch reveals a persistent lower-left AIM wheel and lower-right FIRE button during active play.
- [x] Dragging around the AIM ring maps continuously to the launch angle.
- [x] Releasing AIM **never fires** and preserves the selected angle.
- [x] FIRE launches exactly once using the selected angle.
- [x] Touches elsewhere in the playfield do not accidentally launch a shot.
- [x] Pointer cancel safely releases AIM capture without firing.
- [x] Mobile level briefing moves above the control deck instead of obscuring it.
- [x] Sound and trajectory-preview toggles remain tappable from Pause and persist.
- [x] Automated regression covers wheel capture, angle mapping, release-without-fire, separate FIRE, playfield safety, desktop aim authority, and pause toggles.
- [ ] Real iPhone/Safari portrait + landscape feel pass.
- [ ] Real Android/Chrome portrait + landscape feel pass.
- [ ] Confirm AIM/FIRE controls remain comfortable with common browser bars / safe-area layouts.
- [ ] Confirm the lower-left AIM / lower-right FIRE handedness feels natural for representative players.

## Theme / novelty gate

- [x] Unicorn is the physical launcher rather than a decorative mascot.
- [x] Rainbow is projectile, trajectory, trail, success feedback, and harmonic SFX language.
- [x] Angry clouds are ordered locks and visibly become restored/happy.
- [x] Prisms, arches, wind, dream clouds, stardust, moonbow gravity, spin, charge, magnetism, storms, resonance gates, and void hazards alter real solution paths.
- [x] Mechanic interaction echoes teach cause/effect when the rainbow activates a system.
- [x] First-seen demonstrations reinforce the fantasy vocabulary before systems are mixed.

## Audio gate

- [x] All music and SFX are synthesized with Web Audio; no samples ship.
- [x] Planning uses a sparse, slower orchestral bed.
- [x] Firing snaps into denser dubstep / bass-music arrangement.
- [x] Flight music responds to ricochet count and ordered-cloud progress.
- [x] Six-note rainbow palette unifies ricochet, cloud-resolution, and victory feedback.
- [x] Dynamics compressor reduces stacked-oscillator clipping where supported.
- [x] Bass uses clean sub + filtered upper harmonics for small speakers.
- [x] Audio regressions cover transport pacing, timbres, mute gating, cleanup, and theme hooks.
- [ ] Real phone speaker mix pass.
- [ ] Real laptop speaker mix pass.
- [ ] Headphones mix pass at low and medium volume.

## Presentation gate

- [x] Live HUD is timer-only.
- [x] Desktop level briefing remains bottom-centered and fades after ~3.5 seconds.
- [x] Mobile level briefing moves to y=105 to clear the control deck.
- [x] Target grammar is embedded directly in clouds with high-contrast ricochet badge.
- [x] Main menu names the mobile AIM wheel + FIRE scheme.
- [x] Pause menu exposes mobile-accessible Sound / Path controls.
- [x] First-shot clears receive `PERFECT PATH!` feedback.
- [ ] Verify no late-game target/mechanic is obscured at 16:9, 19.5:9, and tall-phone aspect ratios.

## Package integrity

- [x] Deterministic builder assembles one self-contained `index.html`.
- [x] Terser 5.50.0 + Zopfli are pinned.
- [x] CI rejects an archive above 13,312 bytes.
- [x] CI opens ZIP and verifies exactly one root-level `index.html`.
- [x] CI verifies no external/network runtime dependencies.
- [x] Every qualifying game-code push to `main` regenerates ZIP, checksum, and provenance.
- [x] v0.19.1 PR #6 qualification passes the complete regression suite and submission contract at **13,227 bytes**, leaving 85 bytes free.
- [ ] After merge, verify `dist/uniRico-js13k-build.txt` points to the final v0.19.1 game commit and records `archive_entry=index.html`.

## Repository / branch gate

- [x] Dist publisher reviewed/merged through PR #2.
- [x] Dist race-safety hardening reviewed/merged through PR #3.
- [x] v0.18 final competition polish reviewed/merged through PR #4.
- [x] v0.19 tutorial/mobile release reviewed/merged through PR #5.
- [x] v0.19.1 authoritative desktop aim hotfix isolated in PR #6.
- [x] PR #6 exact candidate workflow passed on the gameplay/test head before release-document cleanup.
- [ ] Merge PR #6 only while its release state remains coherent and the game-source qualification is unchanged.

## Submission freeze

- [ ] Successful competition workflow on final `main` game commit.
- [ ] Download **`dist/uniRico-js13k.zip`**, never the Wavedash ZIP.
- [ ] Verify `archive_entry=index.html` and byte count ≤13,312.
- [ ] Verify recorded SHA-256 immediately before upload.
- [ ] Play downloaded ZIP offline once on desktop and once on a physical phone.
- [ ] Freeze gameplay after the official deadline; do not use Wavedash publishing extension for feature fixes.
