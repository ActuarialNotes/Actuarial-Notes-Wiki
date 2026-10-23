---
target: questions/exam-altam/altam-045.md
created: 2026-10-23
---

## [F-001] SOA slips in (b)(ii) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, part b(ii), alternative method
- claim: The alternative NC line adds 872.20 where the mid-year-death EPV is computed as 872.14 below it; that EPV's formula is written with r_63/l_63 though the 0.004387 it uses is the d_63 ratio; and AL_1 uses a lowercase s_63 for the salary S_63. All transcribed faithfully but unmarked.
- evidence: SOA ALTAM solutions PDF p.91: '... - 1649.09 + 872.20 = 86.95'; 'EPV(mid-year deaths) = 4alpha[(TPS)63 + 0.5 S63] {r63/l63 v^0.5} = 4(0.02)(2,485,000){0.004387} = 872.14'; 'AL1 = 4alpha[(TPS)63 + s63]'. 0.004387 = (213.9/47,579)(1.05)^-0.5, the death ratio d63/l63 from the Standard Service Table. Content-plan A.7 lists all three.
- source_rank: 1
- proposed_action: Add ' (as printed)' at each; do not correct.
- applied: true
- fingerprint: cbb9917cf99e

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: three (as printed) markers in (b)(ii)'s alternative; figures unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q45, pp.82 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q45, pp.90-91 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA ALTAM April 2026 exam workbook (tables), sheet 'Service Table' (Standard Service Table), sha256:2d8c59a01df2a61781bafcf3c64f9f85304dca80e284e5da1f73d9f223440074 — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-excel.xlsx
- note: Blind recompute with the SOA's own Standard Service Table (April 2026 ALTAM workbook) and the given annuity values: retirement AL 571,363 (SOA 571,358.40 with 4-decimal factors), NC 38,344 (SOA 38,344; its alternative 38,346); death-in-service AL 1649.03 (SOA 1649.09), NC 86.98 (SOA 86.98) - agree. Stem matches p.82; explanation matches pp.90-91 (no graders' comments printed). Three SOA slips in (b)(ii) marked (as printed) (F-001).
