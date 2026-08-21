#!/usr/bin/env python3
"""Build a deterministic, self-contained js13k ZIP from the readable source tree."""
from pathlib import Path
import hashlib, struct, sys, zlib, zipfile

try:
    import zopfli.zlib
except ImportError as exc:
    raise SystemExit("Install the Python 'zopfli' package to reproduce the competition ZIP") from exc

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "dist" / "uniRico-v0.18.0-js13k.zip"
LIMIT = 13_312
NAME = b"index.html"
DOS_TIME = (12 << 11)
DOS_DATE = ((2026 - 1980) << 9) | (8 << 5) | 20

SCRIPTS = [
    ROOT / "src" / "levels.js",
    ROOT / "src" / "runtime" / "core.js",
    ROOT / "src" / "runtime" / "audio.js",
    ROOT / "src" / "runtime" / "physics.js",
    ROOT / "src" / "runtime" / "render-world.js",
    ROOT / "src" / "runtime" / "render-entities.js",
    ROOT / "src" / "runtime" / "render-hud.js",
    ROOT / "src" / "runtime" / "ui.js",
]

style = (ROOT / "src" / "style.css").read_text()
script = "\n".join(path.read_text() for path in SCRIPTS)
html = (
    '<!doctype html><html lang="en"><head><meta charset="utf-8">'
    '<meta name="viewport" content="width=device-width,initial-scale=1">'
    '<title>uniRico</title><style>' + style + '</style></head><body>'
    '<canvas id="c"></canvas><div id="hud"><span id="time">00:00.0</span></div>'
    '<script>' + script + '</script></body></html>'
)
data = html.encode()
assert "<script src=" not in html
assert "<link rel=\"stylesheet\"" not in html

wrapped = zopfli.zlib.compress(data, numiterations=500)
raw_deflate = wrapped[2:-4]
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
    bundled = archive.read("index.html")
    assert bundled == data
    assert b"src/" not in bundled

size = OUTPUT.stat().st_size
sha = hashlib.sha256(OUTPUT.read_bytes()).hexdigest()
print(f"ZIP: {OUTPUT}")
print(f"html bytes: {len(data)}")
print(f"bytes: {size} / {LIMIT} ({LIMIT-size} free)")
print(f"sha256: {sha}")
if size > LIMIT:
    raise SystemExit("FAIL: archive exceeds js13k size ceiling")
