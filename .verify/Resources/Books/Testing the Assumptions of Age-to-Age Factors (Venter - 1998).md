---
target: Resources/Books/Testing the Assumptions of Age-to-Age Factors (Venter - 1998).md
created: 2026-10-16
---

## [F-001] GI-301 bullet omits the SOA's page range
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- severity: minor
- status: open
- locus: > [!info] On the syllabus, Exam GI-301 bullet
- claim: Exam GI-301 - Publications & Research (1a-d); Browse research -> [Author Last Name = Venter, Year Published = 1998] -> Search (1a-d); Result: Testing the Assumptions of Age-to-Age Factors (1a-d).
- evidence: SOA GI-301 syllabus (Mar 2027/Jul 2027), PDF p.2, Topic 1 Resources: 'Testing the Assumptions of Age-to-Age Factors, Venter G.G., Proceedings of the Casualty Actuarial Society LXXXV, 1998, pp. 812-838 ... 1a-d'. The bullet transcribes the syllabus's navigation steps (Publications & Research, Browse research, Result) as if they were the assignment and drops pp. 812-838, so a GI-301 candidate is not told the assignment starts at p.812 (Testable Implications) and stops at p.838 (the Conclusion), leaving out the Preliminaries, references, exhibits and Appendix. SOA GI-301 syllabus, Mar 2027/Jul 2027, PDF pp.2-3 and 6, Topic 1 resources (Venter pp. 812-838, outcomes 1a-d; Clark, outcomes 1e-g) and Topic 4 (Marshall et al., outcomes 4a-c), sha256:491e74c9baec0e9f74552e9c589f0738d914c4d340827727b0d78bea4e23d72e — https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf
- source_rank: 2
- proposed_action: Restate the bullet to what the syllabus assigns: outcomes 1a-d; pp. 812-838.
- applied: false
- fingerprint: b92254af1d91

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- status_set: in_review
- checks_run: outline built from the paper first (section headings PDF pp.1-41), then compared; every figure checked (adjusted SSEs 157,902 / 81,169 / 75,409 / 52,360 / 57,527 / 49,673.4 / 49,034.8 / 44,700.9, h=22,001, T=-0.63, r=-25%); both errata read (2026 erratum rendered); bytes of 7_Venter_Factors.pdf and proceed98_980807.pdf compared (same sha256); scope vs Exam 7 CO and SOA GI-301 syllabus; link check; resource_lint
- sources_checked: Venter, Testing the Assumptions of Age-to-Age Factors (PCAS LXXXV, 1998), PCAS LXXXV pp.807-847 (PDF pp.1-41): every section, Tables 1-11, Exhibits 1-3, Appendix, sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf; Errata to Venter, Version 1.0, January 31, 2020, p.1, correction to p.833, sha256:3c4ef100522d01a4b919ca28cbbb5d7362a8206b7d83b7e5683955b0d5d11c3d — https://forum.casact.org/article/164288-testing-the-assumptions-of-age-to-age-factors/attachment/351760.pdf; Erratum to Venter, approved 4/22/2026, p.1, Table 3 p.823 (rendered and read), sha256:bce086ac02bbd54518fc622d9e51e69c46d8645aa789422a137fef9a5c0418f0 — https://forum.casact.org/article/164288-testing-the-assumptions-of-age-to-age-factors/attachment/351759.pdf; CAS Exam 7 Content Outline, Fall 2026, PDF pp.3-6, tasks A1-A17 and the complete text references (Version Exam_7_CO_2026_F v04), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf; SOA GI-301 syllabus, Mar 2027/Jul 2027, PDF pp.2-3 and 6, Topic 1 resources (Venter pp. 812-838, outcomes 1a-d; Clark, outcomes 1e-g) and Topic 4 (Marshall et al., outcomes 4a-c), sha256:491e74c9baec0e9f74552e9c589f0738d914c4d340827727b0d78bea4e23d72e — https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf
- note: Every section, figure and both errata on the page match the paper; the Exam 7 scope (A.ii.1, A.iii.1, A.iv.2 = A2, A6, A12; pp.807-847 with errata) is right. One minor finding (F-001, the GI-301 bullet), to be fixed in the clean-up round.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- resolves: F-001
- status: resolved
- note: Restated in run e7rbb to what the SOA GI-301 syllabus (PDF p.2) assigns: 'outcomes 1a-d; pp. 812–838'.

## [C-002] Venter (1998) resource page re-verified after the clean-up
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- status_set: verified
- confidence: high
- checks_run: delta re-check of the GI-301 bullet against the SOA syllabus; resource_lint; the rest unchanged since e7rba's full check
- sources_checked: Venter, Testing the Assumptions of Age-to-Age Factors (PCAS LXXXV, 1998), PCAS LXXXV pp.807-847 (PDF pp.1-41): every section, Tables 1-11, Exhibits 1-3, Appendix, sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf; Errata to Venter, Version 1.0, January 31, 2020, p.1, correction to p.833, sha256:3c4ef100522d01a4b919ca28cbbb5d7362a8206b7d83b7e5683955b0d5d11c3d — https://forum.casact.org/article/164288-testing-the-assumptions-of-age-to-age-factors/attachment/351760.pdf; Erratum to Venter, approved 4/22/2026, p.1, Table 3 p.823 (rendered and read), sha256:bce086ac02bbd54518fc622d9e51e69c46d8645aa789422a137fef9a5c0418f0 — https://forum.casact.org/article/164288-testing-the-assumptions-of-age-to-age-factors/attachment/351759.pdf; CAS Exam 7 Content Outline, Fall 2026, PDF pp.3-6, tasks A1-A17 and the complete text references (Version Exam_7_CO_2026_F v04), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf; SOA GI-301 syllabus, Mar 2027/Jul 2027, PDF pp.2-3 and 6, Topic 1 resources (Venter pp. 812-838, outcomes 1a-d; Clark, outcomes 1e-g) and Topic 4 (Marshall et al., outcomes 4a-c), sha256:491e74c9baec0e9f74552e9c589f0738d914c4d340827727b0d78bea4e23d72e — https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf
- note: Re-verified after F-001 was fixed; every section, figure and both errata match the paper, and both scope bullets match their outlines.
