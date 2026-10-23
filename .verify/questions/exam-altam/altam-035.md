---
target: questions/exam-altam/altam-035.md
created: 2026-10-23
---

## [F-001] SOA slips in (b) and (d)(iii) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, parts b and d(iii)
- claim: Part (b) carries the SOA's '177,313,20' (comma for decimal point) and part (d)(iii) its denominator '495,508.93', both unmarked. 210,000(1 + 0.7232143 + 0.4649235) = 459,508.94, and the printed result 0.07188 = 33,030.61/459,508.93 follows the correct value, so 495,508.93 is a transposition in print.
- evidence: SOA ALTAM solutions PDF p.72 (b) prints '285,714.29 - 177,313,20 = 108,401.09'; p.73 (d)(iii) prints '33,030.61 / 495,508.93' after '210,000(1 + 0.7232143 + 0.4649235)', then '= 0.07188 or 7.19%'. Recomputed: 210,000 x 2.1881378 = 459,508.94; 33,030.61/459,508.94 = 0.07188; 33,030.61/495,508.93 would be 0.0667. The comma is in content-plan A.7; the transposition is not - found this run.
- source_rank: 1
- proposed_action: Add ' (as printed)' after each; do not correct.
- applied: true
- fingerprint: d0ce0322ccd4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: (as printed) after 177,313,20 and after 495,508.93; figures unchanged. The 495,508.93 transposition should be added to content-plan A.7.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q35, pp.65-66 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q35, pp.72-73 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute: (b) 2V^n = 108,401.09; (c) Pr0 -35,500, Pr1 35,797.26; Pr2 and Pr3 check (37,766.00, 29,347.16); signature (-35,500; 35,797.26; 30,590.46; 17,115.26); NPV@12% 33,030.67 (SOA 33,030.61 with 17,115.17 - SOA's (0.9)(0.9)(0.8)(0.9)(29,347) is 17,115.17 to the printed Pr3); PM 7.19%; (e) G = 217,989.66 (SOA 217,989.69). (a) is a list; matches the SOA. Stem matches pp.65-66; explanation and comments match pp.72-73. Two SOA slips marked (as printed) this run (F-001), one of them - the 495,508.93 transposition in (d)(iii) - not in content-plan A.7.
