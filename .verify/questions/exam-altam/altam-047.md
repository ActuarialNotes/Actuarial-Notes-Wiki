---
target: questions/exam-altam/altam-047.md
created: 2026-10-23
---

## [F-001] SOA double full stop in (e) comment not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part e examiner report
- claim: The graders' comment ends 'reaches 65..' unmarked.
- evidence: SOA ALTAM solutions PDF p.96 prints 'when the couple (jointly or singly) reaches 65..'. Content-plan A.7 lists it.
- source_rank: 1
- proposed_action: Add ' (as printed)'.
- applied: true
- fingerprint: 330a90dc81f9

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: '(as printed)' after '65..'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q47, pp.85-86 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q47, pp.94-96 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute (SULT, joint-life SULT, 2-term Woolhouse): (a) 424,945.17; (b)(i) factor 14.6126, X = 2423.39 (SOA 2423.37 with tabled values); (b)(ii) I first divided by the salary rate at 60 (35.28%); the SOA divides by the salary earned in the final year, 81,617.17, giving 35.63%, which its graders' comment states is the intended reading - my slip, not the key's, and 12 x 2423.37 / 81,617.17 = 35.63% reproduces it; (c) X = 4167.44 (SOA); (d) 5167.44 / 3778.29 / 3278.29 (SOA); (e) 4872.75 from the SOA's printed terms (SOA 4872.74). Stem matches pp.85-86; explanation and comments match pp.94-96. '65..' marked (as printed) (F-001).
