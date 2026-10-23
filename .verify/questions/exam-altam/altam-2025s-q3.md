---
target: questions/exam-altam/altam-2025s-q3.md
created: 2026-10-23
---

## [F-001] SOA slip unmarked: alternative line uses a_{70:80} for a_{80:90}
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, Explanation (i), 'or' line
- claim: Line reads ä_{60:70:20} = ä_{60:70} − 20E60·20E70(1.05)^20 ä_{70:80} = 11.2220 − 0.13555(4.5071) with no marker.
- evidence: Model solutions p.10 print exactly ä_{70:80} in this line, but the value used, 4.5071, is ä_{80:90} (the same figure the solution's (b)(i) uses for ä_{80:90} on p.7), and the deferred annuity after 20 years starts at ages 80 and 90. The line is a printed slip, transcribed faithfully but not flagged. Content-plan A.7 lists it.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: 28e0bc4aaa8c

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
- sources_checked: Spring 2025 Advanced Long-Term Actuarial Mathematics (ALTAM) Exam – Exam File, Q3, p.9, sha256:0d9d7e9ac2c69f2176d1c0a05a0a6a2e9b1006dd64ac8909dd6dbab48541da9b — https://www.soa.org/globalassets/assets/files/edu/2025/spring/exams/spring-2025-altam-exam.pdf; SOA ALTAM April 2025 Model Solutions and Examiners' Comments, Q3, pp.6-10, sha256:6371e71ec29b9d7997e03348d4455e4d3e7418660261b36ddd4dd5a2fa0edf66 — https://www.soa.org/globalassets/assets/files/edu/2025/spring/solutions/2025-spring-altam-solutions.pdf
- note: Recompute (SULT 5%): survival-benefit probability 0.88264; EPV 3,865.96; P = 300.12; 10V both alive 3,798.93 (with the given 7.9879); only Kim alive 4,061.95; rider R = 64.21 — all equal to the SOA's. One printed slip marked (F-001).
