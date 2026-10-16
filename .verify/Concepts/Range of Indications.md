---
target: Concepts/Range of Indications.md
created: 2026-10-16
---

## [F-001] Modeled range example sums each year's extremes; Shapland takes the range of the model totals
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- severity: critical
- status: open
- locus: Example 'Modeled Versus Weighted Range', the Modeled range bullet
- claim: Modeled range, using every model used anywhere: A is [100, 110] and B is [700, 900], so the total is [800, 1,010].
- evidence: Shapland p.46 (PDF p.54): 'the means from the eight models could be used to derive a reasonable range from the modeled results (i.e., from $4,099 to $5,650) as shown in Figure 6.3'. Figure 6.3 (p.47, PDF p.55): the modeled total row is 4,099 / 5,650, which are the totals of the Paid BF and Incurred GLM models in Figure 6.2; summing the by-year modeled minima instead gives 2+27+37+59+96+168+280+646+2,660 = 3,975, not 4,099. So the modeled total is the lowest and highest model total. (The weighted total, 4,674, is the sum of the by-year weighted minima, so the page's weighted range [800, 870] is right.) Recomputed for the page's numbers: model totals are paid CL 100+900 = 1,000, incurred CL 110+700 = 810, BF 105+760 = 865, so the modeled range is [810, 1,000]; the page's 800 and 1,010 are not totals of any model. A student following the page would answer a modeled-range question (e.g. cas7-an-005) wrong. Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph #4, 2016), Section 6 pp.45-47 (PDF pp.53-55): text p.46 and footnote 62, Figures 6.1-6.3, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf
- source_rank: 2
- proposed_action: Restate the modeled-range bullet to Shapland's construction: the models' totals are 1,000 (paid CL), 810 (incurred CL) and 865 (BF), so the modeled range is [810, 1,000].
- applied: false
- fingerprint: 2665caed229d

## [F-002] ASOP 43 credited with ASOP 36's wording
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- severity: minor
- status: open
- locus: Professional basis bullet
- claim: ASOP 43 allows a point estimate, a range, or both.
- evidence: ASOP 43 sec. 3.7.3 (p.8): 'The actuary may present the unpaid claim estimate in a variety of ways, such as a point estimate, a range of estimates, a point estimate with a margin for adverse deviation, or a probability distribution of the unpaid claim amount.' 'A point estimate, a range of estimates, or both' is ASOP 36 sec. 3.4.2 (p.5), about estimates developed to evaluate reserves for a statement of actuarial opinion. ASOP No. 43, Property/Casualty Unpaid Claim Estimates (Doc. No. 159), sec. 3.6.1-3.6.2 p.6 (PDF pp.10-11), sec. 3.7.3 p.8 (PDF p.13), sec. 4.2 p.10 (PDF p.15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.casact.org/sites/default/files/2021-03/5_ASOP_43.pdf ; ASOP No. 36 (Doc. No. 213, March 2024), sec. 3.4.2 p.5 (PDF p.12), sec. 3.8.1 p.7 (PDF p.14), sha256:50c478415d77dc963b9b97d77cee43ea448efc90bd2fed4f6639803e3fbf5e70 — https://actuarialstandardsboard.org/wp-content/uploads/2024/05/asop036_213.pdf
- source_rank: 2
- proposed_action: Restate to ASOP 43 sec. 3.7.3: a point estimate, a range of estimates, a point estimate with a margin for adverse deviation, or a probability distribution.
- applied: false
- fingerprint: 3289922aaef8

## [F-003] Cites a CAS Statement of Principles the CAS has rescinded
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- severity: minor
- status: open
- locus: Professional basis bullet
- claim: The CAS Statement of Principles on unpaid claims estimates (Principle 2) says uncertainty 'implies that a range of estimates can be reasonable'.
- evidence: The quotation is exact (Principle 2, lines 63-64), but every page of the CAS's own copy is headed '(Rescinded by the Board of Directors of the CAS December 2020)'; it was adopted November 2014. Presented without that, it reads as current professional guidance. CAS Statement of Principles Regarding Property and Casualty Unpaid Claims Estimates (2014), pp.1-2, header and Principle 2 (lines 59-64), sha256:433d161e2b374ce00e733ea956b38f42d784ed7501419704b88bee96a51edd19 — https://www.casact.org/sites/default/files/2021-04/Statement_of_Principles_Regarding_Property_and_Casualty_Unpaid_Claims_Estimates_2021.pdf
- source_rank: 2
- proposed_action: Keep the quotation and say the statement was adopted in November 2014 and rescinded by the CAS Board in December 2020.
- applied: false
- fingerprint: 85f4e51ff698

## [F-004] "Usually much narrower" is in no source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- severity: minor
- status: open
- locus: Lead paragraph, last sentence
- claim: That is a different, and usually much narrower, thing than the range of possible outcomes described by an unpaid claim distribution.
- evidence: The distinction is sourced: ASOP 43 sec. 4.2(a) separates 'a range of estimates of the intended measure (each ... reasonable on a stand-alone basis)' from 'a range representing a confidence interval within the range of outcomes produced by a particular model', and Shapland p.46 calls the weighted range 'a more representative view of the uncertainty of the actuarial central estimate'. Neither source, nor Friedland, Shapland Section 6 or the CAS principles, says the first is usually much narrower than the second. ASOP No. 43, Property/Casualty Unpaid Claim Estimates (Doc. No. 159), sec. 3.6.1-3.6.2 p.6 (PDF pp.10-11), sec. 3.7.3 p.8 (PDF p.13), sec. 4.2 p.10 (PDF p.15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.casact.org/sites/default/files/2021-03/5_ASOP_43.pdf
- source_rank: 2
- proposed_action: Delete 'and usually much narrower,'.
- applied: false
- fingerprint: a099a4ddc8ae

## [C-001] Validation pass — disputed
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- status_set: disputed
- checks_run: Shapland Section 6 read (text, footnote 62, Figures 6.1-6.3) and the stochastic bullet and modeled/weighted example recomputed against it (best 105 + 745 = 850; weighted [800, 870] matches Shapland's by-year sum, 4,674; modeled range does not); Friedland 2022 range comparison; ASOP 43 secs. 3.6-4.2, ASOP 36 secs. 3.4.2 and 3.8.1 and the CAS 2014 principles checked word by word; screening example checked against Friedland EUC (paid development assumes constant settlement speed, p.96; slowing settlement understates, p.288; Berquist-Sherman disposal-rate restatement, pp.288-291); link check
- sources_checked: Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph #4, 2016), Section 6 pp.45-47 (PDF pp.53-55): text p.46 and footnote 62, Figures 6.1-6.3, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; Friedland, Reserving for Reinsurance (CAS Study Note, 2022), Chapter 3 summary, PDF p.67, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Chapter 6 pp.68-77 (PDF pp.74-83), Chapter 7 p.96 (PDF p.102), Chapter 13 pp.288-291 (PDF pp.294-297), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (Doc. No. 159), sec. 3.6.1-3.6.2 p.6 (PDF pp.10-11), sec. 3.7.3 p.8 (PDF p.13), sec. 4.2 p.10 (PDF p.15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.casact.org/sites/default/files/2021-03/5_ASOP_43.pdf; ASOP No. 36 (Doc. No. 213, March 2024), sec. 3.4.2 p.5 (PDF p.12), sec. 3.8.1 p.7 (PDF p.14), sha256:50c478415d77dc963b9b97d77cee43ea448efc90bd2fed4f6639803e3fbf5e70 — https://actuarialstandardsboard.org/wp-content/uploads/2024/05/asop036_213.pdf; CAS Statement of Principles Regarding Property and Casualty Unpaid Claims Estimates (2014), pp.1-2, header and Principle 2 (lines 59-64), sha256:433d161e2b374ce00e733ea956b38f42d784ed7501419704b88bee96a51edd19 — https://www.casact.org/sites/default/files/2021-04/Statement_of_Principles_Regarding_Property_and_Casualty_Unpaid_Claims_Estimates_2021.pdf
- note: One critical finding (F-001, the modeled-range example) and three minor ones (F-002 to F-004). Everything else on the page holds against the sources cited. Fixes go in the clean-up round.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- resolves: F-001
- status: resolved
- note: Restated in run e7rbb to Shapland's construction (p.46 and Figure 6.3): the modeled range is the lowest and highest model total, 810 (incurred CL) to 1,000 (paid CL), with BF at 865. Weighted range [800, 870] and best estimate 850 unchanged.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- resolves: F-002
- status: resolved
- note: Restated in run e7rbb to ASOP 43 sec. 3.7.3: a point estimate, a range of estimates, a point estimate with a margin for adverse deviation, or a probability distribution.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- resolves: F-003
- status: resolved
- note: Added in run e7rbb what the CAS's copy states: adopted November 2014, rescinded by the CAS Board in December 2020. The quotation of Principle 2 is kept.

## [F-004/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- resolves: F-004
- status: resolved
- note: Deleted 'and usually much narrower,' in run e7rbb; the distinction itself is kept, as ASOP 43 sec. 4.2(a) and Shapland p.46 draw it.

## [C-002] Range of Indications re-verified after the clean-up
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- status_set: verified
- confidence: medium
- checks_run: delta re-check of the four corrected passages against Shapland pp.46-47, ASOP 43 sec. 3.7.3 and the CAS 2014 statement; modeled range recomputed (model totals 1,000 / 810 / 865 -> [810, 1,000]); link check; the rest unchanged since e7rba's check
- sources_checked: Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph #4, 2016), Section 6 pp.45-47 (PDF pp.53-55): text p.46 and footnote 62, Figures 6.1-6.3, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; Friedland, Reserving for Reinsurance (CAS Study Note, 2022), Chapter 3 summary, PDF p.67, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Chapter 6 pp.68-77 (PDF pp.74-83), Chapter 7 p.96 (PDF p.102), Chapter 13 pp.288-291 (PDF pp.294-297), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (Doc. No. 159), sec. 3.6.1-3.6.2 p.6 (PDF pp.10-11), sec. 3.7.3 p.8 (PDF p.13), sec. 4.2 p.10 (PDF p.15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.casact.org/sites/default/files/2021-03/5_ASOP_43.pdf; ASOP No. 36 (Doc. No. 213, March 2024), sec. 3.4.2 p.5 (PDF p.12), sec. 3.8.1 p.7 (PDF p.14), sha256:50c478415d77dc963b9b97d77cee43ea448efc90bd2fed4f6639803e3fbf5e70 — https://actuarialstandardsboard.org/wp-content/uploads/2024/05/asop036_213.pdf; CAS Statement of Principles Regarding Property and Casualty Unpaid Claims Estimates (2014), pp.1-2, header and Principle 2 (lines 59-64), sha256:433d161e2b374ce00e733ea956b38f42d784ed7501419704b88bee96a51edd19 — https://www.casact.org/sites/default/files/2021-04/Statement_of_Principles_Regarding_Property_and_Casualty_Unpaid_Claims_Estimates_2021.pdf
- note: All four findings resolved. Medium rather than high: the method-screening bullet and the first example are the vault's own teaching, consistent with ASOP 43 sec. 3.6.1-3.6.2 and Friedland but not stated by them in those words, and the reinsurance comparison condenses Friedland 2022's sentence.
