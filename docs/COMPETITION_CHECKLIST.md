# js13kGames 2026 Desktop release checklist

## Package

- [x] ZIP ≤ 13,312 bytes: **12,522 bytes**.
- [x] Submitted archive contains exactly one root-level `index.html`.
- [x] No required external scripts, styles, fonts, images, audio files, or network services.
- [x] SHA-256 recorded: `fdab16071f5212635cd07a9193a9ee538eee94469de5c9efcea29f08cdeb89ad`.

## Campaign gate

- [x] 40/40 encoded solutions truly complete every target chain.
- [x] Every visible mechanic instance is used by the intended route or explicitly documented as portal gate geometry.
- [x] Level 20 requires wall + wind + spin.
- [x] Broad aim/delay bypass audit found no sampled win skipping required mechanics.
- [x] Dense local aim/timing audit around each intended solution found no sampled bypass.
- [x] Preview budget never increases from one level to the next.
- [x] Levels 20–25 have at least two ordered locks.
- [x] Levels 26–30 use three-lock chains.
- [x] Levels 31–35 use four-lock chains.
- [x] Levels 36–39 use five-lock chains.
- [x] Level 40 uses six locks and seven interacting mechanic families.

## Physics gate

- [x] Swept moving-target regression passes.
- [x] Moving-prism high-speed crossing regression passes.
- [x] Moving wall sweeping into projectile regression passes.
- [x] Moving-frame reflection preserves tangential velocity.
- [x] Post-impact separation prevents sticky repeat bounces.
- [x] Wrong-order cloud contacts fail explicitly.

## Audio / UI gate

- [x] Planning state uses the slower orchestral bed.
- [x] Live shot switches into the denser dubstep arrangement.
- [x] Oscillator lifecycle/mute regressions pass.
- [x] Live HUD contains only timer + current objective.
- [x] Bottom level title is transient and disappears after ~3.5 seconds.

## Final human browser gate

- [ ] Current Chrome: complete representative early / bridge / endgame levels with no console errors.
- [ ] Current Firefox: same flow.
- [ ] Confirm Web Audio unlock and mix balance on real speakers/headphones.
- [ ] Confirm no late-game cloud or mechanic is obscured at common desktop sizes.
