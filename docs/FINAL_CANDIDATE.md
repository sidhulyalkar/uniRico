# v0.20.0 canonical competition candidate

v0.20.0 was qualified on the exact feature head, merged through PR #9, and independently rebuilt by the `main` competition publisher from source commit `a9350c6a47d5fa2cac85ffb8e4874cffc87ef2a2`.

## Campaign authority

Levels 1–40 remain the existing validated campaign. Levels 41–50 form the **Reflection Gauntlet**, generated as exact 180° spatial transforms of Levels 31–40. Launch points, ordered targets, walls, moving geometry, portals, forces, gravity/magnet centers, gates, and motion vectors are transformed consistently; the encoded source launch angle is rotated by π and its timing is preserved.

The release qualification proves **50/50 encoded solutions** through the authoritative fixed-step physics and audits mechanic use on all 50 levels. Level 50 is `MIRROR FULL SPECTRUM`, a six-lock reflected finale.

## Compression authority

The release builder compares final ZIP sizes for two deterministic candidates:

- Terser 5.50.0 → Zopfli;
- Terser 5.50.0 → Roadroller 2.1.0 `-O0` → Zopfli.

The smaller final ZIP wins. CI rebuilds the package a second time and requires byte-for-byte identity. The exact packed `index.html` is extracted from the ZIP and executed by `tests/packed-runtime-smoke.js` before qualification.

## Canonical `main` artifact

```text
source_commit=a9350c6a47d5fa2cac85ffb8e4874cffc87ef2a2
zip_bytes=11512
limit_bytes=13312
sha256=713114a1185abd266ffdd42664217e06170b22673e9afb5eaa7cb3dd9c9a87ff
archive_entry=index.html
```

That leaves **1,800 bytes** of compressed headroom. The previous v0.19.1 package was 13,227 bytes with only 85 bytes free, so v0.20.0 simultaneously expands the campaign by ten levels and reduces the submission by 1,715 bytes.

The standard Desktop/Mobile submission artifact is the canonical `dist/uniRico-js13k.zip` on `main`. Do not substitute a hand-packed or Wavedash ZIP.
