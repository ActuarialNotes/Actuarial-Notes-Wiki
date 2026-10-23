---
target: questions/exam-altam/altam-048.md
created: 2026-10-23
---

## [F-001] SOA slips in the prompt and in (b)(ii) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: stem (valuation assumptions); explanation, part b(ii)
- claim: The prompt says the valuation 'uses the projected unit cost (PUC) method' (the solution and parts (c), (d) call it projected unit credit), and the second (b)(ii) derivation of the normal cost is labelled 'AL ='. Both transcribed faithfully but unmarked.
- evidence: SOA ALTAM questions PDF p.87 prints 'uses the projected unit cost (PUC) method'; solutions PDF p.97, (b)(ii), prints 'AL = 0.5/12.5 x 16,503.92 + 1/13 x v x l64/l63 x 191,309 = 660.16 + 12,608.96 = 13,269.11' - the normal cost, not the AL. Content-plan A.7 lists both.
- source_rank: 1
- proposed_action: Add ' (as printed)' at each; do not correct.
- applied: true
- fingerprint: ef987aaa645d

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: (as printed) after 'projected unit cost' in the stem and on the 'AL' label in (b)(ii).

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q48, pp.87-88 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q48, pp.97-98 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA ALTAM April 2026 exam workbook (tables), sheet 'Service Table' (Standard Service Table), sha256:2d8c59a01df2a61781bafcf3c64f9f85304dca80e284e5da1f73d9f223440074 — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-excel.xlsx
- note: Blind recompute with the SOA's own Standard Service Table (April 2026 ALTAM workbook): (a)(i) benefit 13,186.88, EPV 178,206.18 (SOA); (a)(ii) 16,503.96 (SOA 16,503.92 with l rounded to 0.1); (b)(i) AL 167,151.5 (SOA 167,151.26); (b)(ii) NC 13,269.1 (SOA 13,269.11); (d) loss 1310.7 (SOA 1311.03) - agree. (c) prose matches. Stem matches pp.87-88; explanation and comment match pp.97-98. Two SOA slips marked (as printed) (F-001).
