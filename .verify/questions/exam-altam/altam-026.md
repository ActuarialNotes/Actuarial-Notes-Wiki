---
target: questions/exam-altam/altam-026.md
created: 2026-10-23
---

## [F-001] SOA double full stop in (b) comments not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part b, Examiner Report
- claim: 'or the recursion approach..' reproduced with no marker.
- evidence: Solution PDF p.51 (b) Graders' Comments print 'recursion approach..'; content-plan A.7 'Q26(b) approach..'. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: b819c5107a2d

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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q26, p.48, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q26, pp.51-52, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem and assumption table match p.48; recomputed from the SULT P = 1015.79 (SOA 1015.80), 1V = 84.4 (SOA 84.30 from A46 and a-dot46 rounded to 5 and 4 places), interest gain 30,790, expense loss 53,500, mortality 0, and year-2 expected deaths 8.4 against 10 (loss), agreeing with the SOA solution pp.51-52. The SOA's (d) line prints two missing-font boxes around 'Expected deaths ... 10000 p45 q46 ... 8.4'; the vault reads them as '=', which the arithmetic supports. SOA's 'approach..' marked '(as printed)'.
