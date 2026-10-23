---
target: questions/exam-astam/astam-2024s-q2.md
created: 2026-10-23
---

## [F-001] SOA '1/N times' (1/sqrt(N)) not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a explanation, point 3
- claim: Point 3 says the SD of the average is '1/N times' the SD of each loss, with no note.
- evidence: Solutions PDF p.2 prints '1/N times'; for i.i.d. losses the SD of the average is 1/sqrt(N) times. Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 32a97d0cf6c1

## [F-002] SOA fixed expenses 30000 (3,000 given) not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b explanation
- claim: The rate line reads (25000 + 30000)/20 x 1/0.85 = 1647.06 with no note.
- evidence: Solutions PDF p.2 prints (25000 + 30000)/20 x 1/0.85 = 1647.06. The stem (booklet p.4) gives fixed expenses 3,000; (25,000 + 3,000)/20/0.85 = 1,647.06 (recompute 1647.0588), while 55,000/20/0.85 = 3,235.29. Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: e01aeeb84302

## [F-003] SOA Region C formula labelled with Region A/B loss ratios not marked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c explanation, Region C line
- claim: Region C’s formula is labelled 'Region A Loss Ratio / Region B Loss Ratio' with no note.
- evidence: Solutions PDF p.3 prints the Region A label on the Region C line; the figures are 1.20 x 0.76/0.80 = 1.14 (Region C over Region B). Listed in A.6.
- source_rank: 1
- proposed_action: Keep the SOA’s text as printed and mark it in place with '(as printed)' (P1: the vault transcribes, it does not correct the publisher).
- applied: true
- fingerprint: 61db8beffc24

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Marked '(as printed)' in place; the SOA’s text is otherwise unchanged.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Marked '(as printed)' in place; the SOA’s text is otherwise unchanged.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- resolves: F-003
- status: resolved
- note: Marked '(as printed)' in place; the SOA’s text is otherwise unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:24Z/b1bc
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every calculated part before reading the key; every number, symbol, subscript, exponent and table cell of the stem diffed against the question booklet page images (130 dpi); explanation compared line by line with the model-solution page images; examiners' comments compared verbatim and checked for filing under the part each names; points per part and total; topic and wiki_link targets exist
- sources_checked: SOA Exam ASTAM Spring 2024 (April 24, 2024), question booklet, Q2, pp.4-5, sha256:e41c30b8ef94a58adba9510cdeb6875db0e3a2abdb3491df90b0eab848421fdf — https://www.soa.org/globalassets/assets/files/edu/2024/spring/exams/spring-2024-astam-exam.pdf; SOA ASTAM April 2024 Model Solutions, Q2, pp.2-4, sha256:4f33d5c7e1aa38fd23684a24eb5e1c6535973fa01492638db9ecc94b87ace259 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/spring-2024-astam-solutions.pdf
- note: Stem, tables, options and every formula match the SOA booklet; explanation and examiners' comments match the model solution. Recompute: 1647.06, 0.72 / 1.00 / 1.14, 1706.74. 3 SOA printed slip(s) marked '(as printed)'.
