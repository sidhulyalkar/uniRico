# uniRico — js13kGames 2026 competition audit

## Executive assessment

uniRico's strongest competition argument is coherence. The unicorn horn is the launcher, the rainbow is both projectile and trajectory language, grumpy clouds are ordered locks, and the fantasy systems physically transform the same shot. The game now delivers **50 deterministic levels** while the standard Desktop/Mobile candidate occupies only **11,512 of 13,312 bytes**.

v0.20.0 materially improves both sides of the entry: the player gets a longer mastery arc ending in a ten-level Reflection Gauntlet, while the release pipeline gains deterministic Roadroller packing, final-ZIP strategy comparison, byte-identical rebuild proof, and packed-runtime execution.

The remaining risks are primarily human-facing: first-minute comprehension, physical-phone ergonomics, cross-browser feel, and final audio balance. Those deserve the remaining validation time more than another mechanic.

## Competition scorecard

| Criterion | Current assessment | Why |
| --- | --- | --- |
| Theme | **Very strong** | Removing unicorns/rainbows would remove the launch, projectile, target fantasy, portal/prism language, and much of the audio vocabulary. |
| Innovation | **Very strong** | One deterministic physics model supports live play, preview, Help, tutorials, 50 puzzles, generated reflection mastery, and automated proofs. |
| Gameplay | **Strong, comprehension-sensitive** | Exact ricochet constraints create real puzzle mastery, but the first minute must make ring/order/badge language effortless. |
| Graphics | **Strong for the budget** | Procedural Canvas art is cohesive, readable, and asset-free; device-size legibility remains a physical test. |
| Audio | **Distinctive** | Procedural orchestral-planning → bass-flight structure and rainbow-linked harmonic cues are unusual at this size. |
| Controls | **Strong** | Desktop has authoritative displayed aim; Mobile separates AIM and FIRE to prevent accidental commitment. |
| Technical execution | **Exceptional for 13 KB** | 50/50 solution proof, mechanic coverage, deterministic package reproduction, packed-runtime smoke, exact archive contract. |

These are internal design assessments, not predictions of official judge scores.

## 1. Theme

The theme is gameplay rather than a skin:

- unicorn horn establishes launch direction;
- rainbow is projectile, preview, trail, and harmonic feedback;
- grumpy clouds are ordered objectives that visibly recover;
- prisms create literal rainbow ricochets;
- rainbow arches teleport the shot;
- wind, dream zones, stardust, moonbow gravity, spin, charge, magnetism, storms, resonance, and void hazards all read as escalating sky magic.

The compact target language is especially valuable under the byte limit: **white ring = current target, cloud number = order, dark badge = exact ricochets**.

## 2. Innovation

The novelty is compositional. A single fixed-step projectile model powers live play, trajectory prediction, Help, tutorial demonstrations, moving geometry, portals, continuous forces, ordered targets, and the entire campaign.

v0.20.0 adds another compact idea: **geometric symmetry as content compression**. Levels 41–50 are exact 180° transformations of Levels 31–40. Geometry, directional forces, motion amplitudes, portal endpoints, and launch angle are transformed consistently, so the deterministic source solution remains a proof after rotation.

That gives the player ten reversed mastery puzzles for only a small compressed-byte cost instead of storing ten full new maps.

## 3. Gameplay / progression

The campaign deliberately teaches before it combines:

```text
01–08  fundamentals
09–15  moving/timed/linked lessons
16–19  first combinations
20–25  two-lock mixed bridge
26–30  three-lock chains
31–35  four-lock advanced
36–39  five-lock endgame
40     six-lock FULL SPECTRUM
41–45  four-lock Reflection Gauntlet
46–49  five-lock reflected endgame
50     six-lock MIRROR FULL SPECTRUM
```

Trajectory assistance never increases. Difficulty comes from interaction and route planning rather than arbitrary projectile-speed inflation.

The main gameplay risk remains exact-bounce frustration when a player has not internalized the visual grammar. Guided demonstrations on first visits to Levels 1–12 and the Help recovery path are therefore competition-critical features, not optional tutorial garnish.

## 4. Controls

### Desktop

Pointer movement is the sole aim authority. Click fires the already-displayed trajectory and cannot re-sample a different down-event coordinate. An adversarial regression deliberately separates the pointermove and pointerdown coordinates and requires exact preservation.

### Mobile

Touch uses a persistent lower-left **AIM** wheel plus lower-right **FIRE** button. Releasing AIM never fires. Touching elsewhere in the arena never fires. This costs more interface space than tap-to-shoot but provides much better precision and predictability for a ricochet puzzle.

Remaining release gates are physical iPhone/Safari and Android/Chrome ergonomics, including browser bars and safe-area behavior.

## 5. Graphics / presentation

Canvas-generated art keeps the visual language coherent without image assets. The unicorn is readable at game scale, clouds visibly encode state, rainbow flight is unmistakable, mechanics have distinct visual signatures, and the live HUD remains timer-only.

The remaining risk is physical-size legibility on unusual phone aspect ratios. Uniform logical scaling preserves physics, but very tall/narrow devices still need a human visual pass.

## 6. Audio

All audio is synthesized with Web Audio. Planning uses sparse orchestral harmony; firing transitions into a denser bass-music state with sub, filtered upper voices, percussion, wobble/formant calls, and progress-sensitive harmonic motion.

Bounce, cloud-resolution, and victory feedback share a six-note rainbow palette. A dynamics-compressor bus limits harsh stacked peaks where supported.

Remaining work is mix validation on real phone speakers, laptop speakers, and headphones.

## 7. Deterministic confidence

The game has unusually strong proof for a tiny arcade entry:

- **50/50 intended solutions** execute target-by-target through the real fixed-step physics;
- mechanic-use coverage rejects visible systems that the intended path can ignore;
- moving-target and moving-prism collision regressions protect high-speed geometry;
- tutorial and Help playback share the same simulation;
- desktop/mobile input authority has dedicated adversarial tests;
- preview assistance is verified non-increasing through Level 50.

The Reflection Gauntlet is also tested as transformed gameplay, not merely generated data: each reflected level must solve, preserve its target count, preserve its source mechanic-family set, and exercise those mechanics.

## 8. 13 KB release engineering

The competition builder no longer assumes that the shortest intermediate JavaScript creates the smallest submission.

It builds two candidates:

```text
Terser 5.50.0 → minimal HTML → Zopfli
Terser 5.50.0 → Roadroller 2.1.0 -O0 → minimal HTML → Zopfli
```

The smaller **final ZIP** wins.

Current v0.20.0 PR result:

```text
50 levels
11,512 / 13,312 bytes
1,800 bytes free
SHA-256 713114a1185abd266ffdd42664217e06170b22673e9afb5eaa7cb3dd9c9a87ff
```

For comparison, v0.19.1 occupied 13,227 bytes with only 85 bytes free.

Release CI additionally:

1. rebuilds the archive and requires byte-for-byte identity;
2. extracts and executes the exact packed runtime;
3. requires exactly one root `index.html`;
4. rejects external/network runtime dependencies;
5. rejects anything above 13,312 bytes.

This makes the submission artifact itself a tested product rather than an incidental build output.

## 9. Judge-first play path

The ideal first few minutes are:

1. Menu communicates the three cloud rules plus desktop/mobile controls.
2. Level 1 shows a valid shot before asking the player to reproduce it.
3. The first successful ricochet produces obvious visual and musical feedback.
4. New mechanics arrive in isolation and demonstrate their effect.
5. The player reaches mixed levels already understanding that the pleasure is *routing* the rainbow, not guessing angles.
6. The late Reflection Gauntlet feels like a mastery inversion of familiar systems rather than recycled filler.

Do not optimize the entry around showing every level to a judge. Optimize the opening so the judge wants to discover why there are 50.

## 10. Freeze recommendation

The codebase no longer needs another major feature before submission. The highest-value remaining work is empirical:

- fresh-player comprehension with no verbal coaching;
- Chrome + Firefox desktop play;
- iPhone Safari + Android Chrome physical-device play;
- phone/laptop/headphone audio;
- visual inspection of several Reflection Gauntlet levels and Level 50;
- final offline play of the exact canonical ZIP after `main` publication.

If those checks are clean, freeze mechanics. The remaining **1,800 bytes** should be treated as reliability/polish reserve, not an invitation to fill the ZIP for its own sake.
