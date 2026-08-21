# v0.18 final candidate

Authoritative feature branch: `agent/js13k-final-v018`.

This branch starts from the current `main` release infrastructure and contains only the validated v0.18 gameplay/audio/mobile competition changes. It supersedes the older historical `agent/js13k-competition-polish-v018` branch, which diverged before the canonical `dist/` pipeline was merged.

Release rule: merge only after the **Competition candidate** workflow passes the exact ZIP size, root-level `index.html`, offline/self-contained package, and full readable-source regression gates.

After merge, submit only `dist/uniRico-js13k.zip` from `main` after confirming `dist/uniRico-js13k-build.txt` points to the final game commit and reports `archive_entry=index.html`.
