---
target: questions/exam-altam/altam-031.md
created: 2026-10-23
---

## [F-001] SOA slips in (b) and (e) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, parts b(ii), b(iii), e
- claim: The explanation carried the SOA's 'age 74since', 'until age 76 if annuitant died before 73' and the third sub-part of (e) labelled '(i)' with no marker.
- evidence: SOA ALTAM solutions PDF p.61 prints '...to State 2 at age 74since the annuity...' and '(iii) ... Since payments would continue until age 76 if annuitant died before 73.'; p.62 labels the Pi_9 sub-part '(i)' (it is (iii)). All three are publisher slips (content-plan A.7); the vault transcribed them faithfully but unmarked.
- source_rank: 1
- proposed_action: Add ' (as printed)' after each slip.
- applied: true
- fingerprint: 0e5331974e06

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: the three slips now carry '(as printed)'; the text is otherwise unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q31, pp.57-58 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q31, pp.61-62 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute from the SULT: B = 7547.84, 8V(0) 76,107.6, 8V(1) 14,081.0, Pr9(0) 761.08, Pr9(1) 140.81, Pi9 717.38 - agree with the SOA (7547.848; 76,107.81; 14,081.03; 717.38). p^01_73 = q73 = 0.014664, p^02_73 = p^12_73 = 0 as the SOA. Stem matches pp.57-58; explanation matches pp.61-62. Three SOA slips marked (as printed) this run (F-001).
