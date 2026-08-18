#!/usr/bin/env python3
"""Build a deterministic, Zopfli-compressed js13k ZIP containing only index.html."""
from pathlib import Path
import hashlib, struct, sys, zlib, zipfile

try:
    import zopfli.zlib
except ImportError as exc:
    raise SystemExit("Install the Python 'zopfli' package to reproduce the competition ZIP") from exc

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "index.html"
OUTPUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "dist" / "uniRico-v0.13.0-js13k.zip"
LIMIT = 13_312
NAME = b"index.html"
# Stable DOS timestamp: 2026-08-15 12:00:00.
DOS_TIME = (12 << 11)
DOS_DATE = ((2026 - 1980) << 9) | (8 << 5) | 15

data = SOURCE.read_bytes()
wrapped = zopfli.zlib.compress(data, numiterations=500)
raw_deflate = wrapped[2:-4]  # remove RFC1950 zlib header + Adler32 trailer
crc = zlib.crc32(data) & 0xFFFFFFFF
local = struct.pack(
    "<IHHHHHIIIHH", 0x04034B50, 20, 0, 8, DOS_TIME, DOS_DATE,
    crc, len(raw_deflate), len(data), len(NAME), 0
) + NAME + raw_deflate
central = struct.pack(
    "<IHHHHHHIIIHHHHHII", 0x02014B50, 20, 20, 0, 8,
    DOS_TIME, DOS_DATE, crc, len(raw_deflate), len(data), len(NAME),
    0, 0, 0, 0, 0, 0
) + NAME
eocd = struct.pack("<IHHHHIIH", 0x06054B50, 0, 0, 1, 1, len(central), len(local), 0)
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_bytes(local + central + eocd)

with zipfile.ZipFile(OUTPUT) as archive:
    assert archive.namelist() == ["index.html"]
    assert archive.read("index.html") == data

size = OUTPUT.stat().st_size
sha = hashlib.sha256(OUTPUT.read_bytes()).hexdigest()
print(f"ZIP: {OUTPUT}")
print(f"bytes: {size} / {LIMIT} ({LIMIT-size} free)")
print(f"sha256: {sha}")
if size > LIMIT:
    raise SystemExit("FAIL: archive exceeds js13k size ceiling")
