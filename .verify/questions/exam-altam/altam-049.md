---
target: questions/exam-altam/altam-049.md
created: 2026-10-23
---

## [F-001] SOA slips in (a) and (c) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, parts a and c
- claim: Part (a)'s AV recursion '((AV){t-1} + P_t - E_t - COI_t)(1 + i_t^c)' has unbalanced brackets and writes v_{i_q} beside i^q, and its last line says 'total DV'; part (c)'s table gives Pr_2 = 667.00 where (b) computed 667.68 (Pi_2 600.01 follows 667.68), and the NPV line uses 411.40 v^3 where the table has Pi_3 = 411.04 (the result 245.50 follows 411.04). All transcribed faithfully but unmarked.
- evidence: SOA ALTAM solutions PDF p.99 prints each of these. Recomputed: Pr_2 = 667.68, Pi_2 = 0.9985 x 0.9 x 667.68 = 600.01; Pi_3 = 411.04; NPV = 245.49 with 411.04 (245.77 with 411.40). Content-plan A.7 lists all of them.
- source_rank: 1
- proposed_action: Add ' (as printed)' at each; do not correct.
- applied: true
- fingerprint: ad419f374f2b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: four (as printed) markers; figures unchanged.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q49, pp.89-90 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q49, pp.99-100 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute: AV3 = 12,842.04, death benefit 162,842 (SOA); profit vector (-800, 264.88, 667.68, 572.61) (SOA); signature (-800, 264.88, 600.01, 411.04); NPV@10% 245.49 (SOA 245.50); PM 2.12% (SOA, EPV premiums 11,569.0) - agree. Stem and table match pp.89-90; explanation matches pp.99-100 (no graders' comments printed). SOA slips marked (as printed) (F-001).
