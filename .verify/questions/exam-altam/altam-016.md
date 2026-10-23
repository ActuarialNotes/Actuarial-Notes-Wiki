---
target: questions/exam-altam/altam-016.md
created: 2026-10-23
---

## [F-001] SOA slips in (a)(iii) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part a, explanation (iii)
- claim: 'A_70^12' (no bar) and '0.47904 - 90.75283)(1.05)^-10(0.62237)' reproduced with no marker.
- evidence: Solution PDF p.28 (a)(iii) prints A^{12}_{70} without its bar and '90.75283)' for '(0.75283)'; the result 0.19140 uses 10p60^11 = 0.75283 (recomputed 0.191398) and the table's A-bar^12_70; content-plan A.7 'Q16(a)(iii)'. Vault faithful; both lines now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: b9766564f972

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-001
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [F-002] SOA slip in (b)(ii) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part b, explanation (ii)
- claim: '(0.01811)(500,000 - 97,500)' reproduced with no marker.
- evidence: Solution PDF p.28 (b)(ii) prints 97,500 inside the bracket while 10V(1) = 95,700 (p.28 (a)(iii)); the printed result -2652.8 follows from 95,700 (recomputed ln(1.05)(95,700) - 0.01811(404,300) = -2652.7; with 97,500 it would be -2620.1). Content-plan A.7 lists the slip but says the result follows 97,500; it follows 95,700. Vault faithful; now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'; correct the A.7 note's 'printed -2652.8 follows 97,500'.
- applied: true
- fingerprint: 23a48c2e1dfc

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-002
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [F-003] SOA slip in (d)(ii) not marked as printed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- severity: minor
- status: open
- locus: Part d, explanation (ii)
- claim: 'lives recently arrived in State 2 ... lives who have been in State 2 for a long time' reproduced with no marker.
- evidence: Solution PDF p.29 (d)(ii) says State 2 (Dead) twice where the argument is about lives in State 1 (Critically Ill), as (d)(i) on the same page sets up; content-plan A.7 'Q16(d)(ii) State 2 (1 meant)'. Vault faithful; both now marked '(as printed)'.
- source_rank: 1
- proposed_action: Mark '(as printed)'.
- applied: true
- fingerprint: 7589c51aa4d1

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- resolves: F-003
- status: resolved
- note: Applied in this run; the file now matches the SOA's printed page.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-23T18:33Z/e686
- date: 2026-10-23
- status_set: verified
- confidence: medium
- checks_run: independent recomputation of every numeric part before reading the vault's or the SOA's solution; stem, tables and symbols diffed against the rendered question pages; explanation and Graders' Comments diffed against the rendered solution pages; any embedded diagram compared with the page; frontmatter (type, points, wiki_link targets) checked
- sources_checked: SOA Exam ALTAM Sample Written-Answer Questions (January 2026), Q16, pp.31-32, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf; SOA Exam ALTAM Sample Written-Answer Solutions (January 2026), Q16, pp.28-29, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf
- note: Stem, table and diagram match pp.31-32; recomputed A-bar^02_{60:10} = 0.09022, 10V(0) = 21,850.4, 10V(1) = 95,699, dV(0)/dt = 1032.2 and dV(1)/dt = -2652.7 (SOA -2652.8), agreeing with the SOA solution pp.28-29. Medium: (b)(iii), (c) and (d) are explanation and an integral expression, matching the SOA verbatim. Four SOA slips marked '(as printed)'.
