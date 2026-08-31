# v0.19.1 final candidate

Authoritative release branch: `fix/authoritative-aim-v0.19.1` (PR #6).

This candidate is a narrow correctness hotfix over the merged v0.19.0 guided-tutorial/mobile-control release. Desktop pointer movement is now the sole aim authority and click fires the already-displayed trajectory instead of silently re-sampling the click-down coordinate. Mobile AIM-wheel + separate FIRE behavior is unchanged.

The adversarial regression aims at one coordinate, injects the fire down-event at a different coordinate, and requires the launched shot to preserve the displayed aim. The complete readable-source regression suite passes, including all 40 encoded solutions and the existing physics/audio/tutorial/mobile contracts.

The PR qualification run built the deterministic standard Desktop/Mobile package at **13,227 / 13,312 bytes**, leaving **85 bytes** free. Candidate SHA-256: `2f9bceeaab568d3653a949052478b851c3420e6e65acbd45260b77d9d19fef2c`.

Release rule: merge only while the **Competition candidate** workflow remains green. After merge, allow the main-branch publisher to regenerate the canonical dist package, then submit only `dist/uniRico-js13k.zip` after confirming `dist/uniRico-js13k-build.txt` points to the final game-source commit and reports `archive_entry=index.html`.
