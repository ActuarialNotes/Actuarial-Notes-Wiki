---
target: Concepts/Spot Rates and Forward Rates.md
created: 2026-09-28
---

## [F-001] Empty placeholder page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: whole body
- claim: 'Spot Rates and Forward Rates — concept summary to be written.' ... 'Example to be added.'
- evidence: The page has no substantive content to check against any source; it only anchors review questions (it is a wiki_link target of questions/exam-fm/fm-028, fm-039, fm-052, fm-073, fm-099, fm-222, fm-266, fm-294). The topic is SYL p.5 Topic 5 outcome b) ('yield curve developed from forward and spot rates'); [[Spot Rate]] and [[Forward Rate]] hold the content.
- source_rank: 1
- proposed_action: Maintainer: write the summary (or redirect the question links to [[Spot Rate]] / [[Forward Rate]]).
- applied: false
- fingerprint: 8224e681ed8d

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: in_review
- checks_run: Placeholder only — nothing substantive to verify; SYL p.5 confirms the topic is on the syllabus. Recorded F-001 (minor).
- sources_checked: SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
- note: Placeholder page: no claims to check. Left in_review until content is written.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Page written in the concept style for the sense its 12 linking FM questions use (fm-028, 029, 039, 052, 073, 099, 221, 222, 225, 266, 294, 331: PV with spot rates, forward from spot, spot from forward): definition of the two descriptions of one term structure; formula blocks for the consistency relation (1+s_n)^n (1+f_{n,n+k})^k = (1+s_{n+k})^{n+k} (Finan §53 p.461), the chain of one-year forwards giving spot rates (SOA S99 p.28), and PV by spot rates (Finan p.459; syllabus p.5 outcome b); bullets for SOA's 'k-year forward rate, deferred n years' wording (notation note p.2), f_{0,1} = s_1 (S99), and pointers to [[Spot Rate]] / [[Forward Rate]] for the one-step formulas instead of repeating them. Two worked examples, recomputed in python: s_2 = 3.50%, s_3 = 4.16%, PV = 970.874 + 933.532 + 884.865 = 2,789.27; f_{2,4} = (1.227124/1.092025)^(1/2) - 1 = 6.01%.

## [C-002] Comment
- entry_type: correction
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- note: After the F-001 resolution above, example 2's 4-year spot rate was changed from 5.25% to 5.5% so its answer no longer coincides with SOA Q294's (6.01%), which links this page. Recomputed: (1.055)^4 = 1.238825, 1.238825/1.092025 = 1.134429, f_{2,4} = 1.134429^(1/2) - 1 = 6.51% (python 6.5096%).

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Spot and forward rate definitions vs Finan pp.459-460 ✓; (1+s_n)^n (1+f_{n,n+k})^k = (1+s_{n+k})^{n+k} vs Finan p.461 general equation, S222 (k = 1) and S294 (n = k = 2) ✓; chain of one-year forwards to spot rates and f_{0,1} = s_1 vs S99 ✓; PV = sum C_t/(1+s_t)^t vs Finan p.459 and syllabus p.5 outcome b ✓; 'k-year forward rate, deferred n years / starting in n years' vs notation note p.2 ✓. Examples recomputed in python: s_2 = 1.0712^(1/2) - 1 = 3.50%, s_3 = 1.130116^(1/3) - 1 = 4.16%, PV = 970.874 + 933.532 + 884.865 = 2,789.27 ✓; f_{2,4} = (1.238825/1.092025)^(1/2) - 1 = 6.51% ✓. [[Spot Rate]], [[Forward Rate]] and [[Yield Curve]] resolve; validate_links clean. Medium: a page written new, examples the vault's own, every formula traced to a cited source.
- sources_checked: Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.459-461, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 99, solutions PDF p.28, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 222, solutions PDF p.56, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 294, solutions PDF p.77, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
