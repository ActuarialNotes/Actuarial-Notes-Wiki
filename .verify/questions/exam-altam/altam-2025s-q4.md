---
target: questions/exam-altam/altam-2025s-q4.md
created: 2026-10-23
---

## [F-001] SOA slip unmarked: premium carried as 1846.76
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, Explanation (ii)
- claim: Policy-value line uses P = 1846.76 with no marker, after (i) computed P = 1846.77.
- evidence: Model solutions p.12 give P = 1846.77 in (c)(i) and p.13 use 1846.76 in (c)(ii); recompute gives P = 1846.758 and 10V = 22,663.3 either way. Printed rounding slip, transcribed faithfully but not flagged (A.7).
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: 5b9f19242d83

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked in place with " (as printed)" after the slip, the vault convention (P1: the vault transcribes the publisher, it does not correct it); the figures themselves are unchanged and match the page.

## [F-002] SOA typo unmarked in examiners' comment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, Examiner Report
- claim: Comment reads 'Specially most struggled on the first two parts' with no marker.
- evidence: Model solutions p.14 print 'Specially most struggled' verbatim (A.7). Kept as printed; needs the marker so a reader does not take it for a transcription error.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: 1d4cec9e3a0e

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- resolves: F-002
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
- sources_checked: Spring 2025 Advanced Long-Term Actuarial Mathematics (ALTAM) Exam – Exam File, Q4, pp.10-11, sha256:0d9d7e9ac2c69f2176d1c0a05a0a6a2e9b1006dd64ac8909dd6dbab48541da9b — https://www.soa.org/globalassets/assets/files/edu/2025/spring/exams/spring-2025-altam-exam.pdf; SOA ALTAM April 2025 Model Solutions and Examiners' Comments, Q4, pp.11-14, sha256:6371e71ec29b9d7997e03348d4455e4d3e7418660261b36ddd4dd5a2fa0edf66 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-altam-solutions.pdf
- note: Recompute: (a) P = 3,393.73 (SULT 5%); (c) P = 1,846.76, 10V = 22,663; (d) Euler 1p00 = 0.94802, 1p01 = 0.01004, 11V = 25,985.2 — all equal to the SOA's. Lapse diagram matches p.10. The vault labels the SOA's unlabelled recursion lines as (iii); no wording added. Two printed slips marked (F-001, F-002).
