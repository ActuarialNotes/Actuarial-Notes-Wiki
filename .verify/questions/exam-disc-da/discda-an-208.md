---
target: questions/exam-disc-da/discda-an-208.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv02
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind recomputation from the stem before reading the key (agrees: Euclidean sqrt(2.50) = 1.58, Manhattan 2.60; distractors recomputed); every distractor's explanation checked; wiki_link tags and learning_objective vs Exam DISC-DA (CAS).md; question_lint clean
- sources_checked: SciPy docs, scipy.spatial.distance.cityblock, definition, sha256:3ad0c340b7d389773e926a5bc1b891f6f29bcf89336ec34e2413b5d8f286f525 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cityblock.html; SciPy docs, scipy.spatial.distance.minkowski, definition, sha256:2e0f85829595334b2fa7ac2fa5137429d1ee038e07dd1b5cf4cbe39a4cb17725 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.minkowski.html; SciPy docs, scipy.spatial.distance.hamming, definition, sha256:5e9a00450e4fd2da1723c587ccc89769226e19b9abca60dd9e41382526a5f7b4 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.hamming.html; SciPy docs, scipy.spatial.distance.jaccard, definition, sha256:57059b5d873f3326934e15ef4e74216370f277483f313f5812fce96713c2ae18 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.jaccard.html; SciPy docs, scipy.spatial.distance.cosine, definition, sha256:eac484bb1120d904d8f1e5a0882da931350befa0ecd41b90dc2869945cb1fb75 — https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cosine.html
- note: Medium per the vault-written-question precedent: key confirmed by independent recomputation and the cited source; no publisher's key exists.
