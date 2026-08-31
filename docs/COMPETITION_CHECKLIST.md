# js13kGames 2026 competition release checklist

Target categories: **Desktop + Mobile**. Theme: **Unicorns and Rainbows**.

Current official rules: https://js13kgames.com/2026/rules

## Submission contract

- [x] Standard ZIP is at or below **13,312 bytes** (`13 × 1024`).
- [x] Archive membership is exactly `['index.html']` with `index.html` at the ZIP root.
- [x] CSS + JavaScript are self-contained.
- [x] Standard Desktop/Mobile candidate has no external/network runtime dependency.
- [x] Readable public source remains available beside the packed artifact.
- [x] Desktop and Mobile share one game/submission.
- [x] v0.20.0 50-level PR candidate: **11,512 / 13,312 bytes**, **1,800 bytes free**.
- [x] Candidate SHA-256: `713114a1185abd266ffdd42664217e06170b22673e9afb5eaa7cb3dd9c9a87ff`.
- [ ] Reconfirm final `main` size/hash after merge and publisher commit.
- [ ] Review title, repository URL, categories, description, screenshots, and final ZIP immediately before official upload.

## Gameplay / campaign authority

- [x] **50/50 encoded solutions** complete every ordered target chain under the authoritative fixed-step physics.
- [x] Intended mechanic-use coverage passes across all 50 levels.
- [x] Preview assistance never increases as the campaign advances.
- [x] Levels 1–8 isolate fundamentals after demonstrations.
- [x] Levels 20–25 form the two-lock mixed-system bridge.
- [x] Levels 26–30 use three-lock chains.
- [x] Levels 31–35 use four-lock chains.
- [x] Levels 36–39 use five-lock endgame chains.
- [x] Level 40 `FULL SPECTRUM` uses six ordered clouds.
- [x] Levels 41–50 form the **Reflection Gauntlet** derived from Levels 31–40 by exact 180° transformation.
- [x] Every reflected level preserves its source target count and mechanic family set.
- [x] Levels 41–45 use four locks; 46–49 use five; Level 50 `MIRROR FULL SPECTRUM` uses six.
- [x] Wrong cloud / wrong ricochet failures remain explicit.
- [x] Third failure points once toward Help rather than lowering physics difficulty.

## Tutorial / comprehension

- [x] Level 1 demonstrates **ring = current, number = order, badge = exact ricochets** before player control.
- [x] Tutorial playback visibly counts ricochets.
- [x] First visits to Levels 1–12 run short accelerated demonstrations using real encoded solutions.
- [x] Tutorial, Help, preview, and live play use the same deterministic physics.
- [x] Tutorial lessons do not repeatedly replay in one session.
- [x] Automated tutorial-flow regression verifies Level 1 completion, `YOUR TURN` handoff, repeat suppression, and later lessons.
- [ ] Fresh-player test: without verbal explanation, player can explain the three cloud cues after Level 1.
- [ ] Fresh-player test: first new mechanic is understood from its demonstration before the attempt.

## Desktop controls

- [x] Pointer movement is the sole desktop aim authority.
- [x] Click fires the exact trajectory already displayed.
- [x] Adversarial regression aims at one coordinate, injects pointerdown at another, and verifies no retargeting.
- [x] Keyboard pause/menu, retry, Help, path, and sound controls remain available.
- [x] Preview uses the same fixed-step projectile model as live play.
- [ ] Chrome: play representative early, mixed, moving-target, Reflection Gauntlet, and finale levels.
- [ ] Firefox: repeat the representative flow.

## Mobile controls

- [x] `touch-action:none` prevents browser gestures from stealing play.
- [x] Touch reveals lower-left AIM and lower-right FIRE controls.
- [x] AIM ring continuously maps to launch angle.
- [x] Releasing AIM never fires and preserves the selected angle.
- [x] FIRE launches exactly once using the selected angle.
- [x] Other playfield touches cannot accidentally shoot.
- [x] Pointer cancel safely releases AIM capture.
- [x] Mobile level briefing clears the control deck.
- [x] Sound and path toggles remain accessible from Pause.
- [x] Automated touch regression covers mapping, release-without-fire, separate FIRE, playfield safety, and desktop aim authority.
- [ ] Real iPhone/Safari portrait + landscape feel pass.
- [ ] Real Android/Chrome portrait + landscape feel pass.
- [ ] Verify browser bars/safe areas do not compromise AIM/FIRE comfort.

## Theme / audiovisual identity

- [x] Unicorn horn is the physical launcher.
- [x] Rainbow is projectile, trajectory, trail, success feedback, and harmonic language.
- [x] Grumpy clouds are ordered locks that visibly recover.
- [x] Prisms, arches, wind, dream zones, stardust, gravity, spin, charge, magnetism, storms, resonance, and void systems alter actual routes.
- [x] All music and SFX are procedural Web Audio; no samples ship.
- [x] Planning and flight use distinct orchestral / bass-music states.
- [x] Six-note rainbow palette connects ricochets, target resolution, and victory.
- [x] Audio regression covers transport, timbres, mute gating, cleanup, and mix behavior.
- [ ] Real phone speaker mix pass.
- [ ] Real laptop speaker mix pass.
- [ ] Headphone pass at low and medium volume.

## Compression / package integrity

- [x] Terser is pinned to **5.50.0**.
- [x] Roadroller is pinned to **2.1.0** and uses deterministic `-O0` release parameters.
- [x] Zopfli produces the final DEFLATE stream.
- [x] Builder compares **actual final ZIP bytes** for Terser-only and Roadroller candidates and chooses the smaller result.
- [x] Minimal HTML shell retains UTF-8 and mobile viewport behavior while omitting optional wrapper markup.
- [x] CI rejects any archive above 13,312 bytes.
- [x] CI rejects wrapper directories and stray archive entries.
- [x] CI rejects external/network runtime dependencies.
- [x] CI rebuilds the package twice and requires byte-for-byte identity.
- [x] CI extracts the exact packed `index.html` and executes its Roadroller-packed runtime before qualification.
- [x] Every qualifying game-code push to `main` regenerates ZIP, checksum, and provenance.

## Human presentation pass

- [x] Live HUD remains timer-only.
- [x] Target grammar is embedded directly in clouds with high-contrast ricochet badges.
- [x] Main menu explains desktop and mobile control schemes.
- [x] Pause exposes mobile-accessible Sound / Path controls.
- [x] First-shot clears receive `PERFECT PATH!` feedback.
- [ ] Verify representative late-game and mirrored layouts at 16:9, 19.5:9, and tall-phone aspect ratios.
- [ ] Confirm Reflection Gauntlet feels like deliberate reversed mastery rather than confusing duplication.
- [ ] Confirm Level 50 provides a satisfying final cadence.

## Release / submission freeze

- [ ] PR #8 exact-head Competition candidate workflow is green after all v0.20.0 code/docs changes.
- [ ] Merge PR #8 using its verified exact head.
- [ ] Main-branch competition workflow succeeds and publishes canonical dist.
- [ ] `dist/uniRico-js13k-build.txt` points to the final v0.20.0 game-source commit.
- [ ] Verify `archive_entry=index.html`, byte count ≤13,312, and recorded SHA-256 on `main`.
- [ ] Download **`dist/uniRico-js13k.zip`**, never the Wavedash ZIP.
- [ ] Play the downloaded ZIP offline once on desktop and once on a physical phone.
- [ ] Perform final Chrome + Firefox smoke tests with no game-breaking console errors.
- [ ] Upload that exact canonical ZIP to the official js13kGames submission form.
- [ ] Freeze gameplay after the official deadline; do not use any publishing extension for feature fixes.
