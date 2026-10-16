---
target: Resources/Books/LDF Curve-Fitting and Stochastic Reserving (Clark - 2003).md
created: 2026-10-16
---

## [F-001] GI-301 bullet is the syllabus's navigation text, not the assignment
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- severity: nit
- status: open
- locus: > [!info] On the syllabus, Exam GI-301 bullet
- claim: Exam GI-301 - Publications & Research (1e-g); Browse research -> [Author Last Name = Clark, Year Published = 2003] -> Search (1e-g); Result: LDF Curve-Fitting and Stochastic Reserving: A Maximum Likelihood Approach (1e-g).
- evidence: SOA GI-301 syllabus, PDF p.3: the Clark entry carries outcomes 1e-g and no page range or exclusion; 'Publications & Research', 'Browse research ...' and 'Result: ...' are the syllabus's instructions for finding the paper on casact.org, not parts of it. The bullet repeats them three times as if they were sections. SOA GI-301 syllabus, Mar 2027/Jul 2027, PDF pp.2-3 and 6, Topic 1 resources (Venter pp. 812-838, outcomes 1a-d; Clark, outcomes 1e-g) and Topic 4 (Marshall et al., outcomes 4a-c), sha256:491e74c9baec0e9f74552e9c589f0738d914c4d340827727b0d78bea4e23d72e — https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf
- source_rank: 2
- proposed_action: Restate the bullet as: outcomes 1e-g; the whole paper.
- applied: false
- fingerprint: a111f163f201

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- status_set: in_review
- checks_run: outline built from the document first (Section 1-5 headings and appendices, PDF pp.3-51), then compared; every figure checked against the text and tables (omega/theta for loglogistic, Weibull and Cape Cod fits; sigma^2 65,029 and 61,577; reserves 28,987,633 / 21,214,761 / 29,707,484; SDs 4,885,707 and 3,422,547; 8,369,200 at 59.78%; 5,448,182 +/- 870,798; 23,454,641 CV 10.5%); formulas for G(x), mu, sigma^2, ELR and ULT MLEs, Expos/AvgAge, discounted reserve; scope vs Exam 7 CO and GI-301; link check; resource_lint
- sources_checked: Clark, LDF Curve-Fitting and Stochastic Reserving: A Maximum Likelihood Approach (CAS Forum, Fall 2003), CAS Forum Fall 2003 pp.41-92 (PDF pp.1-52): Sections 1-5, Tables 1.1-2.1, References, Appendices A-C, sha256:1db0baa8ca6aef6711e6483601de5be6e180f016b1110a7fb0e49765c0953b9e — https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf; CAS Exam 7 Content Outline, Fall 2026, PDF pp.3-6, tasks A1-A17 and the complete text references (Version Exam_7_CO_2026_F v04), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf; SOA GI-301 syllabus, Mar 2027/Jul 2027, PDF pp.2-3 and 6, Topic 1 resources (Venter pp. 812-838, outcomes 1a-d; Clark, outcomes 1e-g) and Topic 4 (Marshall et al., outcomes 4a-c), sha256:491e74c9baec0e9f74552e9c589f0738d914c4d340827727b0d78bea4e23d72e — https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf
- note: Every section, number and formula on the page matches the paper, and the Exam 7 scope (A.ii.1-A.ii.2, A.iii.1-A.iii.3, A.iv.1 = A2-A3, A6-A8, A11) is right. One nit (F-001, the GI-301 bullet), to be fixed in the clean-up round.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- resolves: F-001
- status: resolved
- note: Restated in run e7rbb to what the SOA GI-301 syllabus (PDF p.3) assigns: 'outcomes 1e-g; the whole paper'.

## [C-002] Clark (2003) resource page re-verified after the clean-up
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- status_set: verified
- confidence: high
- checks_run: delta re-check of the GI-301 bullet against the SOA syllabus; resource_lint; the rest unchanged since e7rba's full check
- sources_checked: Clark, LDF Curve-Fitting and Stochastic Reserving: A Maximum Likelihood Approach (CAS Forum, Fall 2003), CAS Forum Fall 2003 pp.41-92 (PDF pp.1-52): Sections 1-5, Tables 1.1-2.1, References, Appendices A-C, sha256:1db0baa8ca6aef6711e6483601de5be6e180f016b1110a7fb0e49765c0953b9e — https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf; CAS Exam 7 Content Outline, Fall 2026, PDF pp.3-6, tasks A1-A17 and the complete text references (Version Exam_7_CO_2026_F v04), sha256:be1833c4f35a9344e33b1c48336dca9724d6556890997b3d8715f9de709ca5ed — https://www.casact.org/sites/default/files/2026-03/Exam_7_CO_2026_Fall.pdf; SOA GI-301 syllabus, Mar 2027/Jul 2027, PDF pp.2-3 and 6, Topic 1 resources (Venter pp. 812-838, outcomes 1a-d; Clark, outcomes 1e-g) and Topic 4 (Marshall et al., outcomes 4a-c), sha256:491e74c9baec0e9f74552e9c589f0738d914c4d340827727b0d78bea4e23d72e — https://www.soa.org/globalassets/assets/files/edu/2026/gi-301/2027-03-gi-301-syllabus.pdf
- note: Re-verified after F-001 was fixed; the page matches the paper and both scope bullets match their outlines.
