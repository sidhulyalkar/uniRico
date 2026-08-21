# js13kGames 2026 competition release checklist

Target categories: **Desktop + Mobile**. Theme: **Unicorns and Rainbows**.

## Package integrity

- [x] Competition builder assembles the readable source tree into one self-contained `index.html`.
- [x] CSS and JavaScript are inlined before packaging; the submitted game has no runtime asset dependencies.
- [x] Terser 5.50.0 + Zopfli are pinned for deterministic minification/compression.
- [x] CI rejects an archive above **13,312 bytes**.
- [x] CI opens the ZIP and verifies it contains exactly one root-level `index.html`.
- [x] CI verifies that the packaged HTML contains no external script or stylesheet references.
- [ ] Record the final v0.18.0 byte count and SHA-256 from the successful competition workflow.

## Theme / novelty gate

- [x] The unicorn is the physical launcher rather than a decorative mascot.
- [x] The rainbow is the projectile, trajectory language, trail, success feedback, and now the basis of the harmonic SFX palette.
- [x] Angry clouds are ordered puzzle targets and visibly become happy/restored.
- [x] Prisms, rainbow arches, wind, dream clouds, stardust, moonbow gravity, spin, charge, magnetism, storms, resonance gates, and void hazards alter the actual solution path.
- [x] Every visible gameplay mechanic is used by the encoded intended solution or documented as required gate geometry.
- [x] Mechanic interaction echoes teach cause and effect at the instant the rainbow touches a system.

## Gameplay / progression gate

- [x] 40/40 encoded solutions truly complete every target chain.
- [x] Preview assistance never increases as the campaign advances.
- [x] Levels 1–8 introduce fundamentals one at a time.
- [x] Levels 20–25 form a two-lock mixed-system bridge.
- [x] Levels 26–30 use three-lock chains; 31–35 four-lock chains; 36–39 five-lock chains.
- [x] Level 40 `FULL SPECTRUM` ends with six ordered clouds and seven interacting mechanic families.
- [x] Wrong cloud / wrong bounce failures are explicit rather than silent.
- [x] Help offers aim guidance, a mirrored demonstration, and the actual solution without altering the physics model.
- [ ] Human first-impression test: a new player can explain **ring = current, inside = order, above = exact bounces** after the opening screen.
- [ ] Human frustration test: representative players recover from three failed shots without abandoning the level.

## Desktop controls gate

- [x] Mouse movement aims and click fires immediately.
- [x] Keyboard pause/menu, retry, help, path, and sound controls remain available.
- [x] Aim preview uses the exact fixed-step simulation used by the live shot.
- [ ] Chrome desktop: early, mixed, moving-target, and endgame representative levels.
- [ ] Firefox desktop: same representative flow.

## Mobile controls gate

- [x] `touch-action:none` prevents browser gestures from stealing play.
- [x] A quick tap preserves direct tap-to-fire behavior.
- [x] Touch-down no longer commits a shot; drag can refine direction and release fires exactly once.
- [x] Drag aiming is relative to the gesture, so a thumb can aim without covering the destination.
- [x] The tap-versus-drag deadzone self-calibrates from the player's own touch jitter and persists locally.
- [x] Sound and trajectory-preview toggles are tappable from the pause menu and persist locally.
- [x] Pointer cancellation cannot leave a captured gesture or fire an accidental shot.
- [x] Automated touch regression covers tap, drag-release, mouse parity, cancel, persistence, and pause toggles.
- [ ] Real iPhone/Safari portrait + landscape feel pass.
- [ ] Real Android/Chrome portrait + landscape feel pass.
- [ ] Confirm menus, targets, and touch aim remain readable with common browser bars / safe-area layouts.

## Audio gate

- [x] All music and SFX are synthesized with Web Audio; no samples or external audio assets are shipped.
- [x] Planning uses a sparse, slower orchestral bed.
- [x] A fired rainbow snaps into the denser dubstep / bass-music arrangement.
- [x] Flight music responds to bounce count and ordered-cloud progress.
- [x] A six-note rainbow palette now unifies bounce, cloud-resolution, and victory feedback.
- [x] A dynamics-compressor master bus reduces stacked-oscillator clipping when the browser supports it.
- [x] Bass uses a clean sub plus filtered upper harmonics so the motif survives small speakers better.
- [x] Audio regressions cover transport pacing, timbre families, mute gating, oscillator cleanup, and competition-theme hooks.
- [ ] Real phone speaker mix pass: kick/bass audible without drowning success cues.
- [ ] Real laptop speaker mix pass.
- [ ] Headphones mix pass at low and medium volume.

## Presentation gate

- [x] Live HUD is timer-only.
- [x] Level title / mechanic briefing fades after roughly 3.5 seconds.
- [x] Target grammar is embedded directly in clouds, with a high-contrast bounce badge.
- [x] Main menu explicitly teaches touch and mouse firing behavior.
- [x] Pause menu exposes mobile-accessible Sound / Path controls.
- [x] First-shot clears receive `PERFECT PATH!` presentation.
- [ ] Verify no late-game target/mechanic is obscured at common 16:9, 19.5:9, and tall-phone aspect ratios.

## Submission freeze

- [ ] Successful competition workflow on the final commit.
- [ ] Download the CI-produced `uniRico-v0.18.0-js13k.zip` rather than hand-building a different archive.
- [ ] Verify its recorded SHA-256 immediately before upload.
- [ ] Play the downloaded ZIP offline once on desktop and once on a physical phone.
- [ ] Freeze gameplay code after the official deadline; do not rely on category-specific publishing windows for feature fixes.
