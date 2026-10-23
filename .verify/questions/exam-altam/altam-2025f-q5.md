---
target: questions/exam-altam/altam-2025f-q5.md
created: 2026-10-23
---

## [F-001] SOA slips unmarked in (c): '19.405.97' and a line that drops +300
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, Explanation (i) and (ii)
- claim: (c)(i) numeric line ends '+ 300 − 19.405.97'; (c)(ii) numeric line reads 50,000(0.95)(0.4) + 100,000(0.95)(0.30) = 47,800, no markers.
- evidence: Model solutions p.10 print '19.405.97' (19,405.97 meant) and a (c)(ii) numeric line without the +300 maintenance expense the formula above it includes; 47,500 + 300 = 47,800 is the printed result and my recompute (1V(1) = 300 + 0.95·50,000 = 47,800). Kept as printed with markers (A.7).
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: 6110dc939aaa

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked in place with " (as printed)" after the slip, the vault convention (P1: the vault transcribes the publisher, it does not correct it); the figures themselves are unchanged and match the page.

## [F-002] SOA slip unmarked in examiners' comment: 2p^00_80
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:43Z/fa02
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, Examiner Report, comment 2
- claim: Comment 2 says the most common error was using 2p^00_80 for the year-2 death-benefit probability, no marker.
- evidence: Model solutions p.11 print 2p^00_80 verbatim; the probability that includes first-year deaths, which the comment describes, is 2p^02_80 (found by the conversion's checkers, A.7). Vault keeps 00 as printed; marker added.
- source_rank: 1
- proposed_action: Mark the slip ' (as printed)' in place; do not correct the figure.
- applied: true
- fingerprint: ebfedb50a007

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
- sources_checked: SOA Exam ALTAM Fall 2025 – exam (questions), Q5, pp.9-11, sha256:8298b1396b4c2dac7679324ddfc5451f9ebeb004d5dd019fb961a7ad76f8fbb8 — https://www.soa.org/globalassets/assets/files/edu/2025/fall/exams/2025-fall-altam-exam.pdf; SOA ALTAM Fall 2025 Model Solutions and Examiners' Comments, Q5, pp.10-11, sha256:7d087ea5f200ed24a6bb37c8e74edebb3fc45943458d10d06bc02e46cd8f6b2a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/solutions/2025-11-altam-solutions.pdf
- note: Recompute: 2P80 rows (0.605, 0.22, 0.175), (0.40, 0.24, 0.36); EPV 33,083.75; P = 19,405.97; 1V(0) = −105.97; 1V(1) = 47,800; Pr1 = 1,813.45; Pr2 = 1,280 / 3,200; signature (−500, 1,813.46, 1,504); NPV 2,391.57; PM 7.135% — equal to the SOA's. State diagram matches p.9. Printed slips marked (F-001, F-002).
