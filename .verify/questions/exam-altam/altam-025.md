---
target: questions/exam-altam/altam-025.md
created: 2026-10-23
---

## [F-001] SOA notation slip in (f) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part f, explanation
- claim: X = 500,000 / a-bar^s_{x:y|delta**=0.0425} reproduced with no marker.
- evidence: Solution PDF p.50 (f) writes the joint-life symbol a-bar^s_{x:y} in the middle denominator, while the value used, 17.9917, is the single-life a-bar^s_50 at delta = 4.25% from the question's table (p.46), as mu^13 = mu^s + 0.0025 requires; content-plan A.7 'Q25(f) denominator'. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 230066cae275

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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q25, pp.46-47, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q25, pp.49-50, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, intensities, table and diagram match pp.46-47; recomputed lambda = 0.005, a-bar^00 = a-bar^s_40:50 at 3.5% = 19.3199, the first-death EPV 1 - 0.04(19.3199) = 0.227204, P = 5,880.1 and X = 500,000/17.9917 = 27,791, agreeing with the SOA solution pp.49-50. SOA's joint-life symbol in (f) marked '(as printed)'.
