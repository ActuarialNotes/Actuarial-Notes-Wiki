---
target: questions/exam-altam/altam-036.md
created: 2026-10-23
---

## [F-001] SOA slips in (c) and (d) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: explanation, parts c and d; part c examiner report
- claim: Part (c) says the Pi_t values 'are the same as in (a)' (part (b) is meant); its graders' comment reads 'based on then new reserve'; part (d) calls the 78,973 first-year outlay '(annuity plus premium)' though the deferred contract pays no annuity in year 1 (it is the premium 28,973 plus the 50,000 care cost). All transcribed faithfully but unmarked.
- evidence: SOA ALTAM solutions PDF p.75 prints all three exactly so. Content-plan A.7 lists them.
- source_rank: 1
- proposed_action: Add ' (as printed)' after each; do not correct.
- applied: true
- fingerprint: a55279b88052

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run: three (as printed) markers added; wording otherwise unchanged.

## [F-002] Printed question total (8 points) is not the sum of the parts (10)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: frontmatter, points
- claim: The vault gives points: 10, the sum of the parts (a) 2 + (b) 4 + (c) 3 + (d) 1; the SOA prints the question as '(8 points)'.
- evidence: SOA ALTAM questions PDF p.67 heads Q36 '(8 points)'; pp.67-69 print part values (2), (4), (3), (1) points = 10. A conflict inside the source (content-plan A.7). The vault's body prints no question total, so there is no printed figure to carry an (as printed) marker; points: 10 follows the parts, which is what the app scores.
- source_rank: 1
- proposed_action: None: keep points: 10 (the parts' sum); the SOA's 8 is recorded here.
- applied: false
- fingerprint: 7b7ad499c7ab

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-002
- status: wontfix
- note: Kept: the frontmatter follows the parts the SOA prints; the printed total of 8 is the publisher's slip and is recorded in this log rather than in the body, which carries no total.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q36, pp.67-69 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q36, pp.74-75 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute: (a) q[95] = 0.45, q95 = 0.2143; (b) row 0 Exp 300, Pr0 -300; row 1: 0 / 110,000 / 50,000 / 100 / 4,193 / 57,750 / 6,343; row 2: 105,000 / 0 / 50,000 / 100 / 3,843 / 56,000 / 2,743; NPV 6,710.7 (SOA 6,711 from rounded Pi), PM 6.101%; (c) P = 28,973.5 (SOA 28,973) - agree with the SOA. (a)(iii), (d) prose match the SOA. Table and stem match pp.67-69; explanation, both tables and comments match pp.74-75. Points 8 printed vs parts 10 (F-002, wontfix); three SOA slips marked (as printed) (F-001).
