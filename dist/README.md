# Competition distribution

This directory is the canonical download location for the current js13kGames submission package.

After any change to the competition game source reaches `main`, GitHub Actions rebuilds and validates the package and updates:

- `uniRico-js13k.zip` — the exact self-contained ZIP intended for js13kGames submission.
- `uniRico-js13k.zip.sha256` — SHA-256 checksum for the ZIP.
- `uniRico-js13k-build.txt` — source commit, byte size, 13,312-byte limit, checksum, and archive entry metadata.

The ZIP is accepted only when it contains exactly one root-level `index.html`, has no external runtime CSS/JavaScript references, passes the repository regression suite, and is at or below 13,312 bytes.

Documentation-only changes do not rebuild the package. Changes to the game sources, deterministic build script, or competition workflow do.
