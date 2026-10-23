---
target: questions/exam-altam/altam-046.md
created: 2026-10-23
---

## [F-001] SOA slips in (a)(ii) and (c) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, parts a(ii) and c
- claim: The (a)(ii) alternative multiplies 0.674057 by 13.0807 (the given annuity is 13.0870; the product 8.8213838 follows 13.0870); (c)'s alternative adds '12,35.46' (12,385.46 computed below it); and its v p57 AL1 line uses 0.185974 for 0.1859744. Transcribed faithfully but unmarked.
- evidence: SOA ALTAM solutions PDF p.92 ((a)(ii): '(0.674057)(13.0807) + (0.6551081)(13.0870 - 11.2158) = 8.8213838 + 1.0258383'; 0.674057 x 13.0870 = 8.82138, x 13.0807 = 8.81713) and p.93 ((c): '= 24,353.85 + 12,35.46 - 35,888.33 = 850.94'; '(64,800){0.1898566 + 0.185974}'). Content-plan A.7 lists all three. Results unaffected.
- source_rank: 1
- proposed_action: Add ' (as printed)' at each; do not correct.
- applied: true
- fingerprint: 1dfd17132926

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: three (as printed) markers; figures unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q46, pp.83-84 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q46, pp.92-93 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA ALTAM April 2026 exam workbook (tables), sheet 'Service Table' (Standard Service Table), sha256:2d8c59a01df2a61781bafcf3c64f9f85304dca80e284e5da1f73d9f223440074 — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-excel.xlsx
- note: Blind recompute with the SOA's own Standard Service Table (April 2026 ALTAM workbook) and the SULT under UDD: 7.5E57.5:57.5 = 0.65511, 7.5E57.5 = 0.67406, a^w_57.5 = 10.0472 (SOA 10.04722; its recursive first method prints 10.050395); AL 35,888.38 (SOA 35,888.33); NC 850.94 (SOA); X = 54,584.77 (SOA 54,584.75) - agree. Stem matches pp.83-84; explanation and graders' comments match pp.92-93. Three SOA slips marked (as printed) (F-001).
