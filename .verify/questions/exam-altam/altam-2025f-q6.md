---
target: questions/exam-altam/altam-2025f-q6.md
created: 2026-10-23
---

## [F-001] SOA typo unmarked: 'offered by then plan'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, Explanation (iii)
- claim: Explanation reads 'the actuarial reduction factor offered by then plan seems too generous' with no marker.
- evidence: Model solutions p.13 print 'then plan' ('the plan' meant) (A.7). Marker added.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: f97dee910d31

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked in place with " (as printed)" after the slip, the vault convention (P1: the vault transcribes the publisher, it does not correct it); the figures themselves are unchanged and match the page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation before reading the key (SULT/SUSM recomputed from Makeham A=0.00022, B=2.7e-6, c=1.124 at 5%%); stem, tables and every formula diffed against the rendered question pages; explanation diffed line by line against the rendered model-solution pages; examiners' comments checked verbatim and filed under the right part; diagrams compared with the page; points, type, topic and wiki_link targets checked (all exist)
- sources_checked: SOA Exam ALTAM Fall 2025 – exam (questions), Q6, pp.12-13, sha256:8298b1396b4c2dac7679324ddfc5451f9ebeb004d5dd019fb961a7ad76f8fbb8 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-altam-exam.pdf; SOA ALTAM Fall 2025 Model Solutions and Examiners' Comments, Q6, pp.12-14, sha256:7d087ea5f200ed24a6bb37c8e74edebb3fc45943458d10d06bc02e46cd8f6b2a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-altam-solutions.pdf
- note: Recompute: FAS60 132,434.5, FAS65 153,528; first month 4,072.36 / 6,716.84; AL_A 295,503, AL_B 279,169; contributions EPV 7,985.11; net NC rate 5.98% — equal to the SOA's. One printed slip marked (F-001).
