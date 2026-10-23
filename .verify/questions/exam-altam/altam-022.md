---
target: questions/exam-altam/altam-022.md
created: 2026-10-23
---

## [F-001] SOA notation slip in (b) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation, joint-life line
- claim: 'a^(2)_50:50:20 = a^(2)_50:50 - 20E_50 x a^(2)_70:70' reproduced with no marker.
- evidence: Solution PDF p.41 (b) writes 20E_50 where the joint pure endowment 20E_50:50 is meant; the next step uses (20p50)^2 (1.05)^-20, i.e. 20E_50:50; content-plan A.7 'Q22(b) 20E50 for 20E50:50'. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: a9e570061697

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [F-002] SOA spacing typo in (c) comments not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part c, Examiner Report
- claim: 'Common mistakes included :' reproduced with no marker.
- evidence: Solution PDF p.42 (c) Graders' Comments print 'Common mistakes included :'; content-plan A.7 lists it. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 44f8f74fd0c8

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-002
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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q22, p.42, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q22, pp.41-43, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem matches p.42; recomputed from the SULT 0.1405, a^(2) last-survivor 20-year 12.9202, G = 847.5 (SOA 847.55), 20V both alive 22,438 (SOA 22,437.6), one alive 33,658 and 19.5V = 21,619, agreeing with the SOA solution pp.41-43. Two A.7 entries marked '(as printed)'.
