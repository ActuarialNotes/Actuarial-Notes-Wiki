---
target: Concepts/Reserve Adequacy.md
created: 2026-10-31
---

## [F-001] 'Friedland's reasonableness tests' list is not Friedland's list
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: major
- status: open
- locus: list introduced as "Friedland's reasonableness tests"
- claim: Friedland's reasonableness tests: ultimate loss ratios; ultimate severities and frequencies; ultimate pure premiums; implied development (what CDF the chosen ultimate implies); IBNR to case ratios and IBNR as a percentage of ultimate; implied remaining payment pattern.
- evidence: Friedland Ch.15, printed p.346 (PDF p.352): 'An important final check of the selected ultimate claims, particularly for the most recent years, should include calculation of claim ratios, severities, pure premiums, and claim frequencies ... If exposures are not available, the actuary can compare ultimate claim counts with premiums as a proxy for frequency. Another valuable test for the actuary is the implied average case outstanding and unreported claim on open and unreported claims.' The XYZ exhibits (p.347, PDF p.353) compare ultimate claim ratios, ultimate severities, average case outstanding and unreported claims, and estimated IBNR. Full-text search: 'IBNR to case' and 'ratio of IBNR to' occur zero times; implied payment/reporting patterns appear (Ch.7 p.93, Ch.15 p.351) as a derivation for monitoring, not as a reasonableness test. So three of the six bullets are attributed to Friedland but are not his tests, and his implied average case outstanding and unreported claim test is missing. Exam 5 task B16 (Fall 2026 outline p.5) names 'loss ratios, severities, pure premiums, frequencies, indicated unpaid losses'.
- source_rank: 2
- proposed_action: Add Friedland's implied average case outstanding and unreported claim test (and the counts-to-premium proxy for frequency) under the attribution, and either drop the implied-CDF, IBNR-ratio and payment-pattern bullets or move them out from under 'Friedland's reasonableness tests'.
- applied: false
- fingerprint: f3624959fb71

## [F-002] Redundancy presented as a harmless profit deferral
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'Further points', second bullet
- claim: The direction of error is asymmetric in consequence. Redundancy is a profit deferral; deficiency understates the loss ratio, overstates surplus, and feeds an inadequate rate indication back into pricing ...
- evidence: Friedland Ch.1, printed pp.4-5 (PDF pp.10-11) treats both directions as consequential: 'We can also envision the reverse situation where an excessive estimate of unpaid claims could be a factor in inappropriate pricing decisions that could put the future financial condition of the insurer at risk. A redundant estimate of unpaid claims may drive an insurer to increase rates unnecessarily ... loss of market share'; misstated results from an excessive estimate may lead an insurer 'to exit a particular line of business or region'; and for investors 'an insurer with excessive reserves may show a weaker position than its true state'. The deficiency half of the bullet is supported (same pages). The roll-forward page states the redundancy consequence correctly.
- source_rank: 2
- proposed_action: Restate the bullet with Friedland's consequences of redundancy (unnecessary rate increases, lost market share, wrong exit decisions, understated financial position) alongside those of deficiency.
- applied: false
- fingerprint: 5ce7fff47596

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Examples recomputed before reading the answers: LRs 13,400/20,000 = 67.0%, 14,280/21,000 = 68.0%, 15,180/22,000 = 69.0%, 14,950/23,000 = 65.0%; severities 10,000, 10,500, 11,000, 11,500; (11,500/10,000)^(1/3) − 1 = 4.8%; counts 1,380 → 1,300 = −5.8%; premium +4.5%; counts per premium 0.05652/0.06273 = −9.9% ('nearly 10%'). Ex.2: 47.5M − 43.0M = 4.5M = 9.5% of indicated, 7.5% of surplus; surplus 55.5M; premium-to-surplus 90/60 = 1.50 → 90/55.5 = 1.62. All match. Reasonableness-test list diffed against Friedland Ch.15 p.346 (F-001); ASOP 43 bullet against §3.7.1 ('assess the reasonableness ... using appropriate indicators or tests'), §4.1(f) and §4.2(b); gross-and-net bullet against ASOP 43 §3.6.5 and Friedland Ch.3 p.34 ('the actuary must review the implied net or ceded unpaid claim estimate for reasonableness'); deficiency consequences against Friedland Ch.1 pp.4-5. Links resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.4-5 (PDF pp.10-11); Ch.3 p.34 (PDF p.40); Ch.15 pp.345-348 (PDF pp.351-354), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§3.6.5, 3.7.1, 4.1(f), 4.2(b), pp.7-10 (PDF pp.12-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf; CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Verified against Friedland Ch.1/3/15 and ASOP 43, with two open findings: F-001 (major) the list attributed to Friedland is not his (three of six bullets are not his tests; his implied average case outstanding and unreported claim test is missing) — needs authoring, not fixed; F-002 (minor) redundancy's consequences understated against Friedland Ch.1.
