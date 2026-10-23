---
target: questions/exam-altam/altam-043.md
created: 2026-10-23
---

## [F-001] SOA typo in (c) graders' comment not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part c examiner report
- claim: The graders' comment reads 'This is answer (if complete) was awarded full credit.' unmarked.
- evidence: SOA ALTAM solutions PDF p.88, part (c) graders' comments, prints 'This is answer (if complete) was awarded full credit.' Not in content-plan A.7; found this run. Meaning unaffected.
- source_rank: 1
- proposed_action: Add ' (as printed)'.
- applied: true
- fingerprint: 24d3df58ff61

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: '(as printed)' after 'This is answer'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q43, pp.78-79 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q43, pp.87-88 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute (SULT, joint-life SULT for a_65:65 = 11.6831): final salary 110,000(1.03)^15(1.025)^10 = 219,376.30; AL 322,988 (SOA 322,989.50 with tabled 25E40, a65); NC 16,149.4, rate 14.25% of 113,300 (SOA 0.142537); enhanced AL 345,328 (SOA 345,329.04), NC rate 0.1524 - agree. (c) prose matches. Stem matches pp.78-79; explanation and graders' comments match pp.87-88. Typo in (c)'s comment marked (as printed) (F-001).
