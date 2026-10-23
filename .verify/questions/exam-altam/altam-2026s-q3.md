---
target: questions/exam-altam/altam-2026s-q3.md
created: 2026-10-23
---

## [F-001] SOA slips unmarked in (a)(ii) and (d)(i)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, Explanation (ii); Part d, Explanation (i)
- claim: (a)(ii) W2term line 'ä^01_x = ā^01_x' and the factor 0.21132; (d)(i) uses 10+V(0) = 28,094.74; none marked.
- evidence: Model solutions p.5: the W2term line states ä^01_x = ā^01_x but the formula it feeds uses ä^10_70; (a)(i) computes 20p^01_50 = 0.21131 and (ii) uses 0.21132; p.5 (c)(ii) gives 28,094.75 while p.6 (d)(i) uses 28,094.74. All A.7. None changes a result beyond the precision asked (ä = 11.2215 → 11.22; derivative 27.6498 → 28). Kept as printed with markers.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: c0aa33952b5d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked in place with " (as printed)" after the slip, the vault convention (P1: the vault transcribes the publisher, it does not correct it); the figures themselves are unchanged and match the page.

## [F-002] SOA punctuation slip unmarked: 'paid..'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, Examiner Report, comment 2
- claim: Comment reads 'not continuously paid..' with no marker.
- evidence: Model solutions p.6 print the double full stop (A.7). Marker added.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: 04affe743734

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked in place with " (as printed)" after the slip, the vault convention (P1: the vault transcribes the publisher, it does not correct it); the figures themselves are unchanged and match the page.

## [F-003] Stem's mu^12_60 = 0.02325 disagrees with the exam's own model (0.020325)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: stem, additional information, mu_60^12
- claim: Stem gives μ^12_60 = 0.02325 with no marker.
- evidence: The question PDF p.7 prints 0.02325 (the vault matches it). The exam's own Excel workbook (april-2026-altam-excel.xlsx, sheet 'Sickness-Death Model', O26:R33) defines μ12_x = 1.4·μ02_x with μ02_x = 0.0005 + 7.58e-5·exp(0.087x); μ02_60 = 0.014518 (as the stem gives) so μ12_60 = 0.0203252. The printed figure drops the 0 of 0.020325. Both sources are the SOA's (rank 1); μ12_60 enters none of the question's results (Thiele for tV(0) uses μ01 and μ02 only), so the slip is kept as printed and flagged. Not in A.7.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: 00bc289fb4e9

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- resolves: F-003
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
- sources_checked: SOA Exam ALTAM Spring (April) 2026 – exam (questions), Q3, pp.6-7, sha256:be424c84e360f858fda955257513b27618d695b7e05cae80fca475145f90a9aa — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-exam.pdf; SOA ALTAM Spring 2026 Model Solutions and Examiners' Comments, Q3, pp.5-6, sha256:ca1bffa86e9b64729358c65e002dc38c533661dda14693310f8b3cddc852b4d6 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2026-spring-altam-solutions.pdf; SOA Exam ALTAM April 2026 – Excel workbook (tables), sheet 'Sickness-Death Model', parameters O26:R33, sha256:2d8c59a01df2a61781bafcf3c64f9f85304dca80e284e5da1f73d9f223440074 — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-excel.xlsx
- note: Recomputed from the exam workbook's model parameters (sheet 'Sickness-Death Model'; RK4 solution of the Kolmogorov equations): 20p01 = 0.2113, 20p00 = 0.49684 (stem gives 0.49695), ä00_{50:20} (W2) = 11.221, Ā02_50 = 0.33126 (workbook 0.331256), G = 3,338 (SOA 3,337.98), 10V(0) ≈ 25,023, derivative 27.65 with the SOA's 10+V(0) — every 'show that' value reproduced to the precision asked. The SOA's solution labels parts (b), (c), (d) as (a), (b), (c) (A.7); the vault files each under its right part and transcribes no labels, so nothing to mark. Printed slips marked (F-001, F-002); the stem's μ12_60 slip marked (F-003).
