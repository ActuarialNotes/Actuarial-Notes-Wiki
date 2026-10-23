---
target: questions/exam-altam/altam-021.md
created: 2026-10-23
---

## [F-001] Whole-question Graders' Comments filed under part a
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a / Part e, Examiner Report
- claim: The comment 'The majority of candidates did well on parts (a) to (d) ... Part (e) proved much more challenging ...' sat under Part a; Part e had no Examiner Report.
- evidence: Solution PDF pp.39-40 print parts (a)-(e) with no comments between them and one Graders' Comments block at the end of p.40, after (e). Moved verbatim to Part e, where the page places it; no words changed.
- source_rank: 1
- proposed_action: Move the Examiner Report block from Part a to Part e.
- applied: true
- fingerprint: de07f2f87828

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Moved in this run; the block now follows Part e's explanation, as on p.40.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- status_set: verified
- confidence: medium
- checks_run: independent recomputation of every numeric part before reading the vault's or the SOA's solution; stem, tables and symbols diffed against the rendered question pages; explanation and Graders' Comments diffed against the rendered solution pages; any embedded diagram compared with the page; frontmatter (type, points, wiki_link targets) checked
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q21, pp.40-41, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q21, pp.39-40, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem and table match pp.40-41; recomputed from the SULT 10p70:70 = 0.689972, E[L0] = -4,472 (SOA -4,474 from a rounded a-dot 7.2329), 2A = 0.43702 (SOA 0.437), SD[L0] = 27,173 (SOA 27,150, from 2A rounded to 0.437 before squaring differences) and Pr = 0.05, agreeing with the SOA solution pp.39-40 to the precision the question asks; (e) is a judgment (profit greater; 2 deaths at times 6 and 9 against 3.1 expected), matching the SOA. Medium: (e) rests on reasoning, and the SD agrees only to the SOA's rounding. Graders' Comments moved to Part e as on p.40.
