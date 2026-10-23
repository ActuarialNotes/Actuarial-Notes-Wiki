---
target: questions/exam-altam/altam-008.md
created: 2026-10-23
---

## [F-001] SOA slip in (c) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part c, explanation, Thiele line 3
- claim: '- 3(0.2)(10,000 - 1304.54)' reproduced with no marker.
- evidence: Solution PDF p.16 prints '-3(0.2)(10,000 - 1304.54)'; mu^02_{x+3} = 0.02(3), so 3(0.02) is meant, and the printed result 326.80 follows from 0.06 (recomputed 326.79 with P = 967.08); content-plan A.7 'Q8(c) -3(0.2)(...) for 3(0.02)'. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 767fda613c8b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- status_set: verified
- confidence: high
- checks_run: independent recomputation of every numeric part before reading the vault's or the SOA's solution; stem, tables and symbols diffed against the rendered question pages; explanation and Graders' Comments diffed against the rendered solution pages; any embedded diagram compared with the page; frontmatter (type, points, wiki_link targets) checked
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q8, pp.15-17, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q8, pp.15-16, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, given values and diagram match pp.15 and 17 (p.16 blank); recomputed a-bar_10 = 6.32121, P = 967.1, dV/dt at 3 = 326.80, P* = 1212.0 and the increase 244.9, agreeing with the SOA solution pp.15-16. SOA's 3(0.2) for 3(0.02) marked '(as printed)'.
