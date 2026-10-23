---
target: questions/exam-altam/altam-020.md
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
- claim: 'probabilities of transition..' reproduced with no marker.
- evidence: Solution PDF p.37 (b) Graders' Comments end 'probabilities of transition..'; content-plan A.7 'Q20(b) transition..'. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 132337172aba

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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q20, pp.38-39, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q20, pp.37-38, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, intensities and diagram match pp.38-39; recomputed from the SULT 10p^23_50 = 0.020678 and 10p^00_40:50 = 0.977654, A-bar^04 = 0.0005 x 7.8487 = 0.00392435 and P = 250.53, and the four directions in (d), agreeing with the SOA solution pp.37-38. (a) is description, matching the SOA verbatim. SOA's 'transition..' marked '(as printed)'.
