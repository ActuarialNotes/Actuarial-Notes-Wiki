---
target: questions/exam-altam/altam-2025f-q3.md
created: 2026-10-23
---

## [F-001] SOA slip unmarked: state-1 and state-2 policy values written without +t
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, Explanation, last line
- claim: Line reads 'where tV(1) = 50,000 ā_x and tV(2) = 50,000 ā_y' with no marker.
- evidence: Model solutions p.5 print 50,000 ā_x and 50,000 ā_y; at time t the reversionary annuity values are 50,000 ā_{x+t} and 50,000 ā_{y+t} (A.7). Kept as printed, marker added.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: 15f0f08fca9c

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked in place with " (as printed)" after the slip, the vault convention (P1: the vault transcribes the publisher, it does not correct it); the figures themselves are unchanged and match the page.

## [F-002] SOA punctuation slip unmarked in examiners' comment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, Examiner Report, comment 4
- claim: Comment reads 'consistent with the examiners' expectations..Many candidates' with no marker.
- evidence: Model solutions p.6 print the double full stop verbatim (A.7). Marker added.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: c4e8030b9f22

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
- sources_checked: SOA Exam ALTAM Fall 2025 – exam (questions), Q3, pp.5-6, sha256:8298b1396b4c2dac7679324ddfc5451f9ebeb004d5dd019fb961a7ad76f8fbb8 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-altam-exam.pdf; SOA ALTAM Fall 2025 Model Solutions and Examiners' Comments, Q3, pp.4-6, sha256:7d087ea5f200ed24a6bb37c8e74edebb3fc45943458d10d06bc02e46cd8f6b2a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-altam-solutions.pdf
- note: Recompute: ā50 = 16.5245, ā55 = 15.5599 (Woolhouse from SUSM), EPV 129,790.08, P = 8,852.90 — equal to the SOA's. Joint-life diagram matches p.5. Two printed slips marked (F-001, F-002).
