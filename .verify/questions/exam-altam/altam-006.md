---
target: questions/exam-altam/altam-006.md
created: 2026-10-23
---

## [F-001] SOA sign slips in (d)(i)-(ii) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation (i) and (ii)
- claim: (1 - e^{5(0.25)})/0.25 and (1 - e^{5(0.45)})/0.45 reproduced with no marker.
- evidence: Solution PDF p.11 prints both exponents without their minus signs; the stated values 2.85398 and 0.86598 follow from e^{-1.25} and e^{-2.25} (recomputed: 2.853981, 0.865979); content-plan A.7 'Q6(d)(i),(ii) missing minus signs'. Vault faithful; both lines now carry '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 7061a1a5cb33

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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q6, pp.11-12, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q6, pp.11-12, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, intensities and diagram match pp.11-12; recomputed 0.11531, 0.399577, 2.85398, 0.86598, Option A 2.61567 vs Option B 2.5335 (choose A), agreeing with the SOA solution pp.11-12. SOA's missing minus signs in (d) marked '(as printed)'.
