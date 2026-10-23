---
target: questions/exam-altam/altam-032.md
created: 2026-10-23
---

## [F-001] SOA slips in (c) and (d) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, parts c and d(ii)
- claim: Part (c) printed (100,000+1000)(0.029028) + 10(1000)(0.229028), whose products 29,318.28 and 5805.60 need A60 = 0.29028 and 10(2000)(0.29028); in (d)(ii) the gains by source 15,085 + 72,507.56 - 104,723.65 = -17,131.09 do not add to the total -17,169.87 of (d)(i), and a stray line '87,553.78 - 15,046.22 = 72,507.56' follows the interest gain. All transcribed faithfully but unmarked.
- evidence: SOA ALTAM solutions PDF p.63 (part c) and p.64 (part d) print exactly these figures. Recompute: A60 = 0.290282 (SULT), 101,000(0.29028) = 29,318.28 and 20,000(0.29028) = 5805.60; 10V = 20,072.15 as printed. Total gain recomputed -17,169.87; gains with q65 = 0.005915 sum to -17,131.09 (with unrounded q65 = 0.0059147 they sum to -17,164.3), so the mismatch is the SOA's. Content-plan A.7 lists all three.
- source_rank: 1
- proposed_action: Add ' (as printed)' at each slip; do not correct.
- applied: true
- fingerprint: f67f7bca2b95

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: (as printed) markers added after the (c) numeric line, the stray 87,553.78 line and the mortality gain; figures unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q32, pp.59-60 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q32, pp.63-65 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute from the SULT: (a) L = 53,422.49; (b) E[L] = -248.84 exact, -248.53 with tabled A50, a50, 10E50, A60 (SOA -248.53); (c) 10V = 20,072.15 tabled (exact 20,072.46; SOA 20,072.15); (d)(i) total gain -17,169.87 (SOA); (d)(ii) E 15,085, I 72,507.56, M -104,723.65 with q65 = 0.005915 (SOA). (e) MEI and EMI: agreed - interest gain is unchanged whenever E precedes I. Stem matches pp.59-60; explanation and graders' comments match pp.63-65. SOA slips in (c) and (d) marked (as printed) this run (F-001).
