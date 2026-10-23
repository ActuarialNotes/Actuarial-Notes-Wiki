---
target: questions/exam-altam/altam-024.md
created: 2026-10-23
---

## [F-001] SOA wording slips in the Graders' Comments not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part d and Part e, Examiner Report
- claim: '(using a separate 0.25 instead and using .15)' and 'did not really address the question answered' reproduced with no marker.
- evidence: Solution PDF p.48 prints both phrases as quoted (content-plan A.7 'Q24 the question answered, using a separate 0.25 instead and using .15'). Vault faithful; each now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: b024db68cf55

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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q24, p.45, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q24, pp.47-48, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem matches p.45; recomputed from the SULT a-dot_50:60:10 = 7.9044, P = 15,778.7 (SOA 15,778.55 from A rounded to 0.6236), 2A = 0.39084, SD = 23,499 (SOA 23,505.84; the SOA squares A rounded to 0.6236, which moves 2A - A^2 by 0.3%), G = 17,909.5, G* = 13,601.3 and the 24.05% reduction, and the direction in (e)(ii), agreeing with the SOA solution pp.47-48 to the precision the SOA shows. Two Graders' Comments slips marked '(as printed)'.
