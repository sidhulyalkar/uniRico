# Competition distribution

This directory is the canonical download location for the current js13kGames submission package and its standalone local test build.

After any change to the competition game source reaches `main`, GitHub Actions rebuilds and validates the package and updates:

- `uniRico-js13k.zip` — the exact self-contained ZIP intended for js13kGames submission.
- `uniRico-local.html` — a directly downloadable, standalone HTML file for quick local testing. It is byte-for-byte identical to the `index.html` inside the canonical ZIP.
- `uniRico-js13k.zip.sha256` — SHA-256 checksum for the ZIP.
- `uniRico-js13k-build.txt` — source commit, byte size, 13,312-byte limit, ZIP checksum, archive entry metadata, and local HTML identity metadata.

The ZIP is accepted only when it contains exactly one root-level `index.html`, has no external runtime CSS/JavaScript references, passes the repository regression suite, and is at or below 13,312 bytes.

The local HTML is generated from the same packed payload as the ZIP and CI rejects the release if the two differ. This keeps quick local testing representative of the actual competition candidate instead of maintaining a second build that could drift.

Documentation-only changes do not rebuild the package. Changes to the game sources, deterministic build script, or competition workflow do.
