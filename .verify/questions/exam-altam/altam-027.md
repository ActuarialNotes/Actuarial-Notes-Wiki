---
target: questions/exam-altam/altam-027.md
created: 2026-10-23
---

## [F-001] SOA's 'NPV of A ... larger than 14%' in (d) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation, paragraph 4
- claim: 'We note that the NPV of A is a little larger than 14%' reproduced with no marker.
- evidence: Solution PDF p.54 (d) prints 'the NPV of A is a little larger than 14%'; an NPV is a sum of money, and the sentence goes on to bracket A's IRR between 14% and 16% (recomputed IRR(A) = 15.77%), so IRR is meant; content-plan A.7 'Q27(d) NPV of A ... larger than 14% (IRR meant)'. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: e3d4b14850da

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [F-002] SOA typos in Q27 not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: nit
- status: open
- locus: Part c Examiner Report; Part d explanation
- claim: 'provit vector' and 'year 1,which' reproduced with no marker.
- evidence: Solution PDF p.53 (c) Graders' Comments print 'provit vector'; p.54 (d) prints 'year 1,which'; content-plan A.7 lists both. Vault faithful; each now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 8636228fbc6f

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
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q27, pp.49-50, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q27, pp.53-54, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem and tables match pp.49-50; recomputed Pr2 = 37.04, profit vector (-155, 65.82, 37.04, 111.02), signature (-155, 65.82, 36.82, 109.65), NPV at 14% = 5.08, and IRR(B) = 10.65% < IRR(A) = 15.8% < IRR(C) = 20.7% (C's signature -155, 165.23, -64.58, 109.65), agreeing with the SOA solution pp.53-54. Three A.7 entries marked '(as printed)'.
