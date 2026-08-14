# Changelog

All notable changes to **uniRico** are documented here.

## Repository showcase / readability pass — 2026-08-13

### Public source readability

- Added a runnable `src/` development mirror alongside the compact root `index.html`.
- Split campaign data into `src/levels.js` with documented field keys and target tuples.
- Split the runtime into focused files for core state, physics, environment rendering, entity rendering, HUD / menus, and UI / input.
- Added `docs/SOURCE_GUIDE.md` with a descriptive map for compact runtime symbols, globals, data shapes, rendering order, and common edit locations.
- Updated `docs/ARCHITECTURE.md` to document the relationship between human-readable source and the byte-conscious competition artifact.
- Preserved compact identifiers in the readable mirror where that improves traceability to the shipped build rather than creating a second divergent implementation.

### Repository presentation

- Rebuilt the main README as a full project showcase covering the game fantasy, play loop, mechanics, architecture, readable source, level encoding, release discipline, and technical design.
- Replaced the old README banner with a custom exact 3:1 `docs/banner.svg` featuring the unicorn, rainbow ricochet path, puzzle geometry, and grumpy-to-happy cloud transformation.
- Added a Mermaid architecture diagram and a recommended source-reading path.
- Made the repository layout and competition-vs-development source roles explicit.

### Release discipline

- Kept the compact root `index.html` unchanged during this documentation/source-readability pass.
- Kept the frozen v0.3.0 ZIP size checkpoint documented separately from the expanded public source tree.

## v0.3.0

### Readability

- Reworked the gameplay background into a darker twilight-blue gradient so white guides, clouds, sparkles, and rainbow effects read more clearly.
- Strengthened the trajectory preview and several low-contrast environmental indicators.
- Increased solution-trace contrast.

### Navigation clarity

- Renamed the level-select screen to `LEVELS`.
- Replaced themed menu labels with familiar navigation language where clarity matters.
- Replaced the old Echo naming with a simpler `HELP` screen.
- Added clear assistance labels: `SHOW AIM`, `WATCH MIRRORED SHOT`, and `WATCH SOLUTION`.
- Renamed the learned trace to `SOLUTION PATH`.
- Simplified the pause screen to `PAUSED`.

### Theme and presentation retained

- Procedural unicorn launcher.
- Fading six-band rainbow projectile.
- Angry gray cloud targets that become happy when cleared.
- Rainbow arches, prisms, wind, dream clouds, moonbow gravity, magical spin/charge fields, storm barriers, and aurora-style resonance elements.
- 40-level physics campaign, scoring, stars, records, and assistance tools.

### Gameplay

- Physics, level data, scoring, and progression remain compatible with the v0.2.0 campaign.

## v0.2.0

### Full thematic redesign

- Reframed the game around unicorns, rainbows, clouds, wind, prisms, and sky magic.
- Replaced the generic projectile presentation with a rainbow projectile and fading multicolor tail.
- Turned numbered lock targets into grumpy storm clouds that visually become happy after successful hits.
- Reworked major field and obstacle renderers to feel native to the sky-magic theme.
- Added a softer, cloud-shaped interface and more sparkly procedural feedback.

## v0.1.0

### First uniRico prototype

- Established the unicorn launcher and rainbow-ricochet identity.
- Rethemed the 40-level campaign around spectrum, cloud, prism, and rainbow language.
- Added chromatic projectile feedback and themed completion effects.
