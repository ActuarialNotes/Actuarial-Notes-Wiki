---
target: questions/exam-altam/altam-052.md
created: 2026-10-23
---

## [F-001] SOA label 'Graders Comments' (no apostrophe) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part a examiner report label
- claim: The (a) comment's label reads 'Graders Comments:' unmarked; every other label in the set is 'Graders' Comments'.
- evidence: SOA ALTAM solutions PDF p.104 prints 'Graders Comments:' before 'Part (a) was done well...'. Content-plan A.7 lists it.
- source_rank: 1
- proposed_action: Add '(as printed)' to the label.
- applied: true
- fingerprint: bf4d877eb592

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q52, pp.95-96 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q52, pp.104 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute: AV1 = 1985.70 with COI discounted at 6%, CV1 = 397.14 (SOA 397.1); Pr1 = 403.56 (SOA 403.6); NPV(1) = 154.0 (SOA); revised Pr1* = 551.82, NPV* = 1924.94 (SOA 551.9, 1925.0) - agree. Stem and table match pp.95-96; explanation matches p.104. The SOA's single (a)/(b) comment is split verbatim at 'In part (b)' between the two parts. Label marked (as printed) (F-001).
