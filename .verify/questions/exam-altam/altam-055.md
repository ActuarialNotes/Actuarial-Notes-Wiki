---
target: questions/exam-altam/altam-055.md
created: 2026-10-23
---

## [F-001] SOA typos in (b) not marked (as printed)
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: nit
- status: open
- locus: explanation, part b bullets
- claim: The (b) bullets read '1% of F_t. plus 30' and 'In the third year is is', unmarked.
- evidence: SOA ALTAM solutions PDF p.108, (b) explanation, prints both. Content-plan A.7 lists them. Meaning unaffected.
- source_rank: 1
- proposed_action: Add ' (as printed)' at each.
- applied: true
- fingerprint: 831219d81d5f

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run.

## [F-002] Question points (7) not printed by the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- severity: minor
- status: open
- locus: frontmatter, points
- claim: The vault gives points: 7 and its parts carry no point values.
- evidence: SOA ALTAM questions PDF pp.101-102 print Q55 with no '(N points)' heading and no per-part values, and no source-exam note from which they could be looked up; the solutions PDF pp.108-110 give none either. The 7 matches the number of parts (a)-(g), so it looks like a converter default of one point per part rather than a transcribed figure (P1: a value the source does not print should not be presented as the publisher's).
- source_rank: 1
- proposed_action: Maintainer decision: keep a documented one-point-per-part convention for unscored sample questions, or find the original paper's point values. No change made.
- applied: false
- fingerprint: 14ef81881195

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:52Z/838e
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: blind recompute of every part before reading the key (SULT / service table / Black-Scholes in Python); stem, table and formula diff against the 130-dpi page images; explanation vs SOA solution line by line; graders' comments verbatim and filed by part; content-plan A.7 slips confirmed on the page and marked (as printed); wiki_link and topic targets exist (validate_content.py, question_lint.py clean)
- sources_checked: SOA Exam ALTAM Written-Answer Sample Questions (January 2026), Q55, pp.101-102 (question), sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Written-Answer Sample Solutions (January 2026), Q55, pp.108-110 (solution and graders' comments), sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Blind recompute (Black-Scholes, sigma 0.25, r 4%): F3 = 3937.67 (SOA 3937.7); profit vector (-200, 353.4, -32.5, -1032.7) (SOA); NPV -597.1 (SOA); 3-year put 0.13627 per unit (SOA); 1- and 2-year puts reproduce the given 446.7 and 590.8; hedge cost 664.45 (SOA); hedged NPV -429.8 (SOA) - agree. (g) prose matches. Stem and tables match pp.101-102; explanation and tables match pp.108-110 (the SOA's Excel note, printed before (a), is filed under Part a). Points not printed by the SOA (F-002, open, minor); typos marked (F-001).
