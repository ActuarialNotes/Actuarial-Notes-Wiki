---
target: questions/exam-altam/altam-034.md
created: 2026-10-23
---

## [F-001] SOA slip in (f) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, part f
- claim: The explanation carried the SOA's 'The IRR>0 for discount rates less than IRR=14.83%' unmarked; NPV>0 is meant.
- evidence: SOA ALTAM solutions PDF p.70, part (f), prints 'The IRR>0 for discount rates less than IRR=14.83% (rates between -6.7% and 14.83%)'. The NPV, not the IRR, is positive for discount rates between the two roots (recomputed: roots -6.75% and 14.83%). Content-plan A.7 lists it.
- source_rank: 1
- proposed_action: Add ' (as printed)'; do not correct.
- applied: true
- fingerprint: c44a50a3a760

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: '(as printed)' added after 'The IRR>0'.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q34, pp.63-64 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q34, pp.69-70 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute: Pr0 -15,000; Pr1 check 31,213; Pr2 -18,787; signature (-15,000; 31,213; -16,062.885); NPV@20% -143.95 (-144); IRR 14.83% (other root -6.75%); NPV with 15% lapses 475.76 - all agree with the SOA. (f), (h) are prose; explanation matches the SOA's text. Stem matches pp.63-64; explanation and comments match pp.69-70 (p.71 blank). SOA slip in (f) marked (as printed) this run (F-001).
