# v0.20.0 final-candidate qualification

Authoritative development branch: `feat/50-level-compression-v0.20.0` (PR #8).

v0.20.0 combines two deliberately coupled changes: a stronger deterministic compression pipeline and a 50-level campaign that spends only a small portion of the recovered byte budget.

## Campaign authority

Levels 1–40 remain the existing validated campaign. Levels 41–50 form the **Reflection Gauntlet**, generated as exact 180° spatial transforms of Levels 31–40. Launch points, ordered targets, walls, moving geometry, portals, forces, gravity/magnet centers, gates, and motion vectors are transformed consistently; the encoded source launch angle is rotated by π and its timing is preserved.

The readable-source qualification proves **50/50 encoded solutions** through the authoritative fixed-step physics and audits mechanic use on all 50 levels. Level 50 is `MIRROR FULL SPECTRUM`, a six-lock reflected finale.

## Compression authority

The release builder compares final ZIP sizes for two deterministic candidates:

- Terser 5.50.0 → Zopfli;
- Terser 5.50.0 → Roadroller 2.1.0 `-O0` → Zopfli.

The smaller final ZIP wins. CI then rebuilds the candidate a second time and requires byte-for-byte identity. The exact packed `index.html` is extracted from the ZIP and executed by `tests/packed-runtime-smoke.js` before the artifact can qualify.

The 50-level PR candidate currently builds at **11,512 / 13,312 bytes**, leaving **1,800 bytes** free. Candidate SHA-256: `713114a1185abd266ffdd42664217e06170b22673e9afb5eaa7cb3dd9c9a87ff`.

The previous v0.19.1 package was 13,227 bytes with 85 bytes free, so v0.20.0 both expands the campaign and substantially increases release headroom.

## Release rule

Do not treat the PR artifact as canonical production output. Merge only while the exact-head **Competition candidate** workflow is green. After merge, allow the `main` publisher to regenerate `dist/uniRico-js13k.zip`, then verify `dist/uniRico-js13k-build.txt` points to the final game-source commit, reports `archive_entry=index.html`, and records a size no greater than 13,312 bytes. That main-branch ZIP is the standard Desktop/Mobile submission artifact.
