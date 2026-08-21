# js13kGames 2026 competition release checklist

Target categories: **Desktop + Mobile**. Theme: **Unicorns and Rainbows**.

Current official rules: https://js13kgames.com/2026/rules

## Submission contract

The release is not considered submission-ready unless every item in this section is true.

- [x] The uploaded archive is a standard `.zip` file.
- [x] The ZIP is at or below **13,312 bytes** (`13 × 1024`).
- [x] `index.html` is in the **top directory of the ZIP**.
- [x] CI requires the exact archive member list to be `['index.html']`, which forbids an enclosing `uniRico/` directory, nested `dist/index.html`, or stray packaged files.
- [x] The competition build is a complete HTML page containing the compiled JavaScript and CSS, not TypeScript/CoffeeScript/source-only input.
- [x] The submitted package is self-contained and works without external runtime assets.
- [x] CI rejects external `<script src>`, external stylesheets, `http://`, `https://`, `fetch`, XHR, WebSocket, and EventSource dependencies in the standard Desktop/Mobile candidate.
- [x] The readable source is maintained publicly in this GitHub repository alongside the minified competition package.
- [x] The game is a new 2026 competition project built for the **Unicorns and Rainbows** theme.
- [x] Desktop and Mobile use one shared game/submission rather than separate duplicate submissions.
- [ ] Final manual Chrome smoke test has zero game-breaking console errors.
- [ ] Final manual Firefox smoke test has zero game-breaking console errors.
- [ ] Submission form fields, repository URL, categories, description, and final ZIP are reviewed once immediately before submission.

### Optional categories

- [x] **Wavedash:** maintained as a separate deployment artifact; its extra seven-day publishing window is for deployment/publishing only, not additional gameplay features or bug fixes.
- [x] **Online:** uniRico is not relying on Online-category exceptions; the standard submission remains fully offline and does not depend on the js13k relay or PartySocket.

## Package integrity

- [x] Competition builder assembles the readable source tree into one self-contained `index.html`.
- [x] CSS and JavaScript are inlined before packaging; the submitted game has no runtime asset dependencies.
- [x] Terser 5.50.0 + Zopfli are pinned for deterministic minification/compression.
- [x] CI rejects an archive above **13,312 bytes**.
- [x] CI opens the ZIP and verifies it contains exactly one root-level `index.html`.
- [x] CI verifies that the packaged HTML contains no external/network runtime dependencies.
- [x] Every qualifying game-code push to `main` regenerates `dist/uniRico-js13k.zip`, checksum, and provenance metadata.
- [ ] Record the final submission byte count and SHA-256 from the successful `main` competition workflow.

## Theme / novelty gate

- [x] The unicorn is the physical launcher rather than a decorative mascot.
- [x] The rainbow is the projectile, trajectory language, trail, success feedback, and basis of the harmonic SFX palette.
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
- [x] A six-note rainbow palette unifies bounce, cloud-resolution, and victory feedback.
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

## Repository / branch gate

- [x] Every current non-main branch with substantive code changes is represented by a PR to `main` or has been explicitly superseded by a clean PR from current `main`.
- [x] Dist automation was reviewed and merged through PR #2.
- [x] Dist race-safety hardening was reviewed and merged through PR #3.
- [x] v0.18 gameplay/audio/mobile polish is carried by the clean final competition PR from `agent/js13k-final-v018`.
- [ ] After the final v0.18 PR is merged, verify `main` regenerates the canonical competition ZIP from the merge commit.

## Submission freeze

- [ ] Successful competition workflow on the final `main` game commit.
- [ ] Download **`dist/uniRico-js13k.zip`** rather than hand-building or submitting the Wavedash ZIP.
- [ ] Verify `dist/uniRico-js13k-build.txt` reports `archive_entry=index.html` and a byte count ≤13,312.
- [ ] Verify the recorded SHA-256 immediately before upload.
- [ ] Play the downloaded ZIP offline once on desktop and once on a physical phone.
- [ ] Freeze gameplay code after the official deadline; do not use Wavedash's publishing extension to add features or ordinary bug fixes.
