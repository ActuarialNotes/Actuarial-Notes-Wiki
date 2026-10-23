---
target: questions/exam-altam/altam-2025f-q4.md
created: 2026-10-23
---

## [F-001] SOA slips unmarked: variance sum 4.3e-7 and z-value 1.95
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, Explanation
- claim: Explanation gives σ_A²+σ_B² = 4.3×10^-7 and a 95% CI with ±1.95 with no markers.
- evidence: Model solutions p.8 print 4.3×10^-7 and 1.95. From the solution's own (b) figures 6.875e-8 + 4.043e-7 = 4.73e-7 (sd 0.00069, as printed), and the 95% two-sided z is 1.96. The printed CI (0.0017, 0.0044) is reproduced to the precision shown with 1.96 (0.00167, 0.00437). Both kept as printed with markers (A.7).
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: e206ec6ef745

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
- sources_checked: SOA Exam ALTAM Fall 2025 – exam (questions), Q4, pp.7-8, sha256:8298b1396b4c2dac7679324ddfc5451f9ebeb004d5dd019fb961a7ad76f8fbb8 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-altam-exam.pdf; SOA ALTAM Fall 2025 Model Solutions and Examiners' Comments, Q4, pp.7-9, sha256:7d087ea5f200ed24a6bb37c8e74edebb3fc45943458d10d06bc02e46cd8f6b2a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-altam-solutions.pdf
- note: Recompute: μ̂A = 0.01032 (sd 0.00026), μ̂B = 0.00730 (sd 0.00064), difference 0.00302, var 4.73e-7, z = 4.39, 95% CI (0.0017, 0.0044) — equal to the SOA's to the precision shown. Printed slips marked (F-001).
