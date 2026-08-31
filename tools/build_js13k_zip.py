#!/usr/bin/env python3
"""Build the smallest deterministic, self-contained js13k ZIP from readable source."""
from pathlib import Path
import hashlib, re, shutil, struct, subprocess, sys, tempfile, zlib, zipfile

try:
    import zopfli.zlib
except ImportError as exc:
    raise SystemExit("Install the Python 'zopfli' package to reproduce the competition ZIP") from exc

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "dist" / "uniRico-js13k.zip"
LOCAL_OUTPUT = Path(sys.argv[2]) if len(sys.argv) > 2 else None
LIMIT = 13_312
NAME = b"index.html"
DOS_TIME = 12 << 11
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

def minify_js(source: str) -> str:
    terser = shutil.which("terser")
    if not terser:
        raise SystemExit("Install terser 5.50.0 (`npm install -g terser@5.50.0`) to build the js13k candidate")
    with tempfile.TemporaryDirectory() as tmp:
        inp = Path(tmp) / "all.js"
        out = Path(tmp) / "all.min.js"
        inp.write_text(source)
        subprocess.run([
            terser, str(inp), "--compress", "passes=3", "--mangle", "toplevel=true",
            "--ecma", "2020", "--output", str(out)
        ], check=True)
        code = out.read_text()
        subprocess.run(["node", "--check", str(out)], check=True, stdout=subprocess.DEVNULL)
        return code

def roadroll_js(source: str) -> str:
    roadroller = shutil.which("roadroller")
    if not roadroller:
        raise SystemExit("Install roadroller 2.1.0 (`npm install -g roadroller@2.1.0`) to build the js13k candidate")
    with tempfile.TemporaryDirectory() as tmp:
        inp = Path(tmp) / "all.min.js"
        out = Path(tmp) / "all.rr.js"
        inp.write_text(source)
        # O0 deliberately uses fixed model parameters. Release packaging must be
        # byte-reproducible, not the lucky winner of a stochastic optimizer run.
        subprocess.run([
            roadroller, "-O0", "-t", "js", "-a", "eval", str(inp), "-o", str(out)
        ], check=True, stdout=subprocess.DEVNULL)
        code = out.read_text()
        subprocess.run(["node", "--check", str(out)], check=True, stdout=subprocess.DEVNULL)
        return code

def minify_css(source: str) -> str:
    source = re.sub(r"/\*.*?\*/", "", source, flags=re.S)
    source = re.sub(r"\s+", " ", source)
    source = re.sub(r"\s*([{}:;,])\s*", r"\1", source)
    return source.strip()

def html_for(style: str, script: str) -> str:
    # Omitted html/head/body tags are valid HTML and cost bytes without helping
    # the single-canvas game. Charset stays first because Roadroller can emit
    # non-ASCII code points; viewport stays for the Mobile category.
    return (
        '<!doctype html><meta charset=utf-8>'
        '<meta name=viewport content="width=device-width,initial-scale=1">'
        '<style>' + style + '</style><canvas id=c></canvas>'
        '<div id=hud><span id=time>00:00.0</span></div><script>' + script + '</script>'
    )

def zip_payload(data: bytes) -> bytes:
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
    return local + central + eocd

style = minify_css((ROOT / "src" / "style.css").read_text())
script = minify_js("\n".join(path.read_text() for path in SCRIPTS))
roadrolled = roadroll_js(script)

candidates = []
for strategy, candidate_script in (("terser", script), ("roadroller", roadrolled)):
    # A literal closing script tag inside packed data would terminate the HTML
    # parser early. Keep the safe Terser candidate available as a fallback.
    if "</script" in candidate_script.lower():
        print(f"skip {strategy}: packed script contains </script")
        continue
    html = html_for(style, candidate_script)
    data = html.encode()
    archive = zip_payload(data)
    candidates.append((len(archive), strategy, data, archive))
    print(f"candidate {strategy}: html={len(data)} zip={len(archive)}")

size, strategy, data, archive = min(candidates, key=lambda item: item[0])
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_bytes(archive)
if LOCAL_OUTPUT:
    LOCAL_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    LOCAL_OUTPUT.write_bytes(data)

with zipfile.ZipFile(OUTPUT) as z:
    assert z.namelist() == ["index.html"]
    bundled = z.read("index.html")
    assert bundled == data
    assert b"<script src=" not in bundled
    assert b"<link rel=\"stylesheet\"" not in bundled

if LOCAL_OUTPUT:
    assert LOCAL_OUTPUT.read_bytes() == data

sha = hashlib.sha256(OUTPUT.read_bytes()).hexdigest()
print(f"strategy: {strategy}")
print(f"ZIP: {OUTPUT}")
if LOCAL_OUTPUT:
    print(f"local HTML: {LOCAL_OUTPUT}")
print(f"minified html bytes: {len(data)}")
print(f"bytes: {size} / {LIMIT} ({LIMIT-size} free)")
print(f"sha256: {sha}")
if size > LIMIT:
    raise SystemExit("FAIL: archive exceeds js13k size ceiling")
