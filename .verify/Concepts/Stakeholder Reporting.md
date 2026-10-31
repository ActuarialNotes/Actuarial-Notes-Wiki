---
target: Concepts/Stakeholder Reporting.md
created: 2026-10-31
---

## [F-001] ASOP 43 disclosures do not apply 'regardless of audience'
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: minor
- status: open
- locus: opening sentence
- claim: ... and ASOP 43 fixes what must be disclosed regardless of audience.
- evidence: ASOP 43 §4.1, p.9 (PDF p.14): 'consistent with the intended purpose or use, the actuary should disclose the following in an appropriate actuarial communication'; §3.8 likewise ties documentation to 'the intended purpose or use of the unpaid claim estimate'. The disclosures are conditioned on purpose and use, which the clause denies.
- source_rank: 2
- proposed_action: Delete 'regardless of audience'.
- applied: true
- fingerprint: 996c1dde9c88

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Deleted 'regardless of audience' (ASOP 43 §4.1: disclosures are made 'consistent with the intended purpose or use').

## [F-002] Actuarial central estimate asserted as the right number to book
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: minor
- status: open
- locus: example 'Reporting Uncertainty Without Undermining the Estimate', answer, first paragraph
- claim: The point estimate is the actuarial central estimate: the expected value over the range of reasonably possible outcomes, and the right single number to book.
- evidence: ASOP 43 §3.3(a)(1)-(2), pp.3-4 (PDF pp.8-9): the intended measure may be a 'high estimate, low estimate, median, mean, mode, actuarial central estimate, mean plus risk margin, actuarial central estimate plus risk margin, or specified percentile', and 'the actuary should consider whether the intended measure is appropriate to the intended purpose or use'. Friedland Ch.1 p.10 fn.6 (PDF p.16): 'In a number of countries (e.g., Australia, Singapore, the United Kingdom, and South Africa), insurers are required to hold provisions ... at the 75% confidence level.' The ACE definition in the sentence is ASOP 43 §2.1 verbatim and stands; the 'right single number to book' clause is contradicted.
- source_rank: 2
- proposed_action: Delete 'and the right single number to book'.
- applied: true
- fingerprint: 34990fb203fc

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Deleted ', and the right single number to book'; the ACE definition (ASOP 43 §2.1) is kept.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Audiences against Friedland Ch.1 pp.4-5 (internal management: pricing, underwriting, strategic, financial decisions; investors: misstated balance sheets and income statements; regulators: supervisory role) and task B18 (internal management, investors, regulators); ASOP 43 claims against §2.1 (ACE), §3.3 (intended measure), §4.1(e) (significant risks and uncertainties); range-as-information against Friedland Ch.1 p.10 ('a range of estimates ... valuable to management, regulators, policyholders, investors, and even the general public. However, the insurer's balance sheet requires the insurer to record a point estimate'). No arithmetic to recompute beyond the 5M / 50M figures, which are consistent. Links resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.4-5, 10 (PDF pp.10-11, 16), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§2.1, 3.3, 3.8, 4.1, pp.2-10 (PDF pp.7-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf; CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Verified against Friedland Ch.1 and ASOP 43. Two minor findings fixed by deletion (F-001 'regardless of audience'; F-002 ACE as 'the right single number to book'). Rating agencies, auditors and claims/underwriting as audiences, and the right-skew remark, are the page's own additions, not in either reading.
