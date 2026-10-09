---
target: Concepts/Loss Reserving.md
created: 2026-09-13
---

## [F-001] ASOP 43 does not require an actuarial central estimate
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- severity: major
- status: open
- locus: Further points, final bullet ('Professional requirements come from ASOP 43')
- claim: Professional requirements come from ASOP 43: an actuarial central estimate, disclosure of methods and assumptions, and identification of any material change from the previous analysis.
- evidence: ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007; sha256:b921a3c59038fcb748214ed127e97dfe9df2111c97ac1223f8cf9952c16304e9), section 3.3(a), standard p.4: the actuary should identify 'the intended measure of the unpaid claim estimate', and 3.3(a)(1) lists the examples -- 'high estimate, low estimate, median, mean, mode, actuarial central estimate, mean plus risk margin, actuarial central estimate plus risk margin, or specified percentile'. The actuarial central estimate (defined in 2.1 as 'an estimate that represents an expected value over the range of reasonably possible outcomes') is therefore ONE permitted intended measure, not a requirement; the standard's requirement is to identify and disclose whichever measure is intended (4.1(c)). The other two items on the page are right: 4.1(f) covers significant assumptions/reliances and 4.2(b) covers changes in assumptions, procedures, methods or models when updating a previous estimate. A candidate who writes 'ASOP 43 requires an actuarial central estimate' on an exam is stating the standard incorrectly.
- source_rank: 2
- proposed_action: Replace 'an actuarial central estimate' with the standard's actual requirement -- identify and disclose the intended measure of the estimate, of which the actuarial central estimate is one example -- keeping the ACE definition from 2.1.
- applied: false
- fingerprint: e8da20aa9792

## [F-002] IBNR split omits two of Friedland's four broad-IBNR components
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- severity: minor
- status: open
- locus: second display formula, IBNR = Pure IBNR + IBNER
- claim: IBNR is exactly pure IBNR (unreported) plus IBNER (development on known claims).
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 'Key Terminology', printed p.14 (PDF p.20), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464: 'The unpaid claims estimate includes five components: case outstanding on known claims, provision for future development on known claims, estimate for reopened claims, provision for claims incurred but not reported, and provision for claims in transit... Actuaries refer to the sum of the remaining four components... as the broad definition of incurred but not reported.' The page's two-part split drops reopened claims and claims in transit, both of which are named components in the syllabus text.
- source_rank: 2
- proposed_action: State the broad definition's four components (future development on known claims, reopened claims, pure IBNR, claims in transit), keeping pure IBNR vs IBNER as the working two-way split.
- applied: false
- fingerprint: 6f613dc65738

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/f8d9
- date: 2026-09-13
- status_set: verified
- confidence: medium
- checks_run: Workflow steps checked against Friedland's own structure and terminology (Ch.1-3): unpaid claim estimate vs carried reserve, the five components of the estimate, the data-organization choices (accident, policy/underwriting, report and calendar year, with calendar year used for exposures and diagnostics rather than as a cohort), and gross/ceded/net segmentation. Recomputed both examples before reading the answers: 13,000,000-10,000,000 = 3,000,000 IBNR; a $1M reserve shortfall on a $10M premium book is exactly ten loss-ratio points; and the method-comparison example's outlier gap, 8.9/7.7-1 = +16.2%, matches the stated 16%. Two findings: F-001 (major) -- ASOP 43 does not require the estimate to be an actuarial central estimate, it requires the intended measure to be identified (3.3(a)) and disclosed (4.1(c)), the ACE being one of the listed examples; the page's other two ASOP items are correct (4.1(f) assumptions, 4.2(b) changes on an update). F-002 (minor) -- the IBNR = pure IBNR + IBNER display omits two of Friedland's four broad-IBNR components. Confidence medium on account of the open major finding; the arithmetic and the workflow are sound. LaTeX balanced; links and embed resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 printed pp.13-14 (PDF pp.19-20) and Ch.3 printed pp.39-43 (PDF pp.45-49), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007), sections 2.1, 3.3(a), 4.1 and 4.2(b), standard pp.2, 4, 9-10, sha256:b921a3c59038fcb748214ed127e97dfe9df2111c97ac1223f8cf9952c16304e9

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Stands. ASOP 43 (Doc. No. 159) §3.3(a) (PDF pp.8-9) requires the actuary to identify the intended measure, listing 'high estimate, low estimate, median, mean, mode, actuarial central estimate, … or specified percentile' as examples; §2.1 (PDF p.7) defines the ACE as 'an estimate that represents an expected value over the range of reasonably possible outcomes'; §4.1(c),(f) (PDF p.14) and §4.2(b) (PDF p.15) cover disclosure of scope, significant assumptions and changes on an update. Bullet rewritten: identify the intended measure (the ACE one of the listed measures) and disclose it with the scope, significant assumptions and material changes on an update.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Stands. Friedland Ch.1 printed p.14 (PDF p.20): the broad IBNR is the sum of future development on known claims, reopened claims, pure IBNR and claims in transit; 'IBNR claims are often further separated into two components' (pure IBNR and IBNER). Kept the two-way display as the usual split and added a sentence giving Friedland's four components; the first example now says 'in the usual two-way split'.

## [F-003] 'Leading cause of insolvency' and 'continuous monitoring' are not in the source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: Further points, third bullet
- claim: Under-reserving is a leading cause of insolvency … The feedback loop is the reason reserve monitoring is continuous rather than annual.
- evidence: Friedland Ch.1 printed pp.4-5 (PDF pp.10-11) supports the mechanism — an inadequate estimate 'could drive an insurer to reduce its rates', worse 'if the insurer gains market share', until 'the future solvency of the insurer is at risk', and insufficient reserves present an insurer 'in a stronger position than it truly is' — but not that under-reserving is a *leading* cause of insolvency. Friedland Ch.15 printed p.351 (PDF p.357) describes actual-vs-expected and roll-forward monitoring between complete analyses, not a rule that monitoring is continuous because of the pricing loop.
- source_rank: 2
- proposed_action: Restate as Friedland does: under-reserving can put solvency at risk through the pricing loop; actual-vs-expected monitoring between full analyses catches it.
- applied: true
- fingerprint: bcff97ffb252

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Bullet rewritten to Friedland Ch.1 pp.4-5 (PDF pp.10-11) and Ch.15 p.351 (PDF p.357): under-reserving can put solvency at risk (stronger apparent position, rate cuts on underpriced business, worse with market-share gains); comparing actual with expected emergence between full analyses catches a deficiency early.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Open findings re-read and fixed; workflow steps against Friedland's chapter structure (TOC PDF p.7; Ch.3-4 data and management, Ch.6 diagnostics, Ch.7-13 methods, Ch.15 selection and actual-vs-expected/roll-forward monitoring); ASOP 43 sections re-read; examples recomputed (13,000,000 - 10,000,000 = 3,000,000; 1M shortfall / 10M premium = 10 points; 8.9/7.7 - 1 = 15.6%, page says 16%).
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.1 pp.4-5, 9-10, 14 (PDF pp.10-11, 15-16, 20), Ch.3 pp.39-43 (PDF pp.45-49), Ch.4 p.44 (PDF p.50), Ch.15 pp.345, 351 (PDF pp.351, 357), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§2.1, 3.3(a), 4.1(c),(f), 4.2(b), PDF pp.7-9, 14-15, sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf
- note: F-001, F-002 fixed; one new minor (F-003) found and fixed. Medium: the page carries its own worked examples and framing.
