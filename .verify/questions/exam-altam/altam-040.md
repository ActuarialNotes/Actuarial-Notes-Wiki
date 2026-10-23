---
target: questions/exam-altam/altam-040.md
created: 2026-10-23
---

## [F-001] SOA label slip 'B_61' in (c)(ii) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: nit
- status: open
- locus: explanation, part c(ii)
- claim: The text says 'we must calculate the expected accrued benefit, B_61, one year after the valuation date' and then computes B_56; B_61 is unmarked.
- evidence: SOA ALTAM solutions PDF p.82, (c)(ii), prints 'B61' in the sentence and 'B56 = 0.016 x 26 x 50,000 ...' in the formula. Content-plan A.7 lists it. Figures unaffected.
- source_rank: 1
- proposed_action: Add ' (as printed)'.
- applied: true
- fingerprint: f6479840b346

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: '(as printed)' after B_61.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q40, pp.73-74 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q40, pp.80-83 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf; SOA ALTAM April 2026 exam workbook (tables), sheet 'Service Table' (Standard Service Table), sha256:2d8c59a01df2a61781bafcf3c64f9f85304dca80e284e5da1f73d9f223440074 — https://www.soa.org/globalassets/assets/files/edu/2026/altam/april-2026-altam-excel.xlsx
- note: Blind recompute with the SOA's own Standard Service Table (April 2026 ALTAM workbook, sheet 'Service Table') and the SULT: retirements at exact 60 = 93,085.4 - 65,159.8 = 27,925.6, at 61 = 6187.6 + 61.9 + 58,699.9 = 64,949.3 of l55 = 104,687.7; a^(12)_60 = 14.4457, a^(12)_61 = 14.1907 (2-term Woolhouse); PUC AAL 220,351 and NC 8814.0 (SOA 8815 through rounded AAL56 - its printed figures give 8814.5); TUC AAL 186,248 and NC 13,260.9 (SOA 13,262 - printed figures give 13,261.7) - agree to the SOA's precision. (a), (d) prose match. Stem matches pp.73-74; explanation matches pp.80-83 (no graders' comments printed). 'B_61' marked (as printed) (F-001); the SOA's 'During'/'during' superscript case left as printed (typographic).
