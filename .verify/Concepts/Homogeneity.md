---
target: Concepts/Homogeneity.md
created: 2026-09-13
---

## [F-001] Werner's criteria for evaluating rating variables misstated: category name and contents
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: major
- status: open
- locus: bullet 4, 'Werner's criteria for evaluating a rating variable'
- claim: The criteria are 'actuarial (statistically significant, accurate, homogeneous within class, credible), operational, social and legal'.
- evidence: Werner & Modlin Ch. 9 printed p.155 (PDF p.167): the criteria, taken from Finger's 'Risk Classification' (2001, pp.292-301), 'can be grouped into the following categories: Statistical, Operational, Social, Legal', and the statistical criteria are exactly three - 'Statistical significance, Homogeneity, Credibility'. The page renames the first category 'actuarial' and adds a fourth criterion, 'accurate', which appears nowhere in the list. The operational (objective, inexpensive to administer, verifiable - p.156, PDF p.168) and social (affordability, causality, controllability, privacy concerns - p.157, PDF p.169) lists on the page are correct. A candidate asked to name the four categories or the statistical criteria would lose marks on both counts.
- source_rank: 2
- proposed_action: Rename the first category 'statistical' and list exactly statistical significance, homogeneity and credibility.
- applied: false
- fingerprint: 953dcb078c7e

## [F-002] Over/undercharge percentages in the worked example are computed on different bases
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- severity: nit
- status: open
- locus: Example 'Testing a Class for Homogeneity', answer, sentence after the relativities
- claim: A single rate 'overcharges local operators by 25% and undercharges long haul by 47%'.
- evidence: Recomputed from the page's own table: class pure premium 7,975,000/10,000 = 797.50, relativities 600/797.50 = 0.752, 850/797.50 = 1.066, 1500/797.50 = 1.881 - all three as printed. But the two error percentages use different denominators: 25% is (797.50-600)/797.50 = 24.8% (a share of the charged rate), while 47% is (1500-797.50)/1500 = 46.8% (a share of the true cost). On a common base the pair is 33% and 47% (share of cost) or 25% and 88% (share of rate). Low consequence - the conclusion that the class is not homogeneous holds either way.
- source_rank: 5
- proposed_action: Express both deviations on the same base, e.g. 'the rate is 33% above the local operators' cost and 47% below the long-haul cost'.
- applied: false
- fingerprint: 3d3115c9a292

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-13T04:49Z/9e59
- date: 2026-09-13
- status_set: verified
- confidence: medium
- checks_run: Definition diffed against Werner p.155 ('the groups should be defined such that the risk potential is homogeneous within groups and heterogeneous between groups') and the homogeneity/credibility trade-off against Friedland p.30 ('The goal for the actuary is to divide the data into sufficiently homogeneous groupings without compromising the credibility of the data'); the reserving-side claim (emergence pattern, not loss cost) against Friedland p.29, whose grouping criteria are reporting patterns, case-outstanding development and settlement speed; the rating-variable criteria bullet diffed item by item against Werner pp.155-157 - operational and social lists correct, statistical list wrong (finding F-001, major, open); both examples recomputed before reading the answers - 7,975,000/10,000 = 797.50 with relativities 0.75/1.07/1.88 as printed. Confidence medium because the open major finding is a claim on the page the source contradicts.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 9 pp.154-157 (PDF pp.166-169), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.29-30 (PDF pp.35-36), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-001
- status: resolved
- note: Werner Ch.9 p.155 (PDF p.167): categories Statistical, Operational, Social, Legal (after Finger 2001); statistical criteria statistical significance, homogeneity, credibility. Bullet rewritten to 'statistical (statistical significance, homogeneity, credibility), operational (objective, inexpensive to administer, verifiable), social (affordability, causality, controllability, privacy concerns) and legal'; 'accurate' dropped.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-002
- status: resolved
- note: Recomputed: class PP 797.50; 797.50/600 - 1 = 32.9%, 1 - 797.50/1,500 = 46.8%. Sentence now puts both on the cost basis: 'the single rate is 33% above the local operators' cost and 47% below the long-haul cost'.

## [F-003] Reserving homogeneity described as emergence only, excluding severity
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- severity: minor
- status: open
- locus: bullet 3, 'In reserving, homogeneity is about the emergence pattern rather than the loss cost'
- claim: In reserving, homogeneity is about the emergence pattern rather than the loss cost.
- evidence: Friedland Ch.3 pp.29-30 (PDF pp.35-36): the key characteristics for grouping claims are consistency of coverage, volume of claim counts, reporting patterns, ability to set case outstanding, settlement patterns, likelihood of reopening, and average settlement value (severity). Severity is on the list, so 'rather than the loss cost' contradicts the source. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Restate the bullet with Friedland's characteristics, severity included.
- applied: true
- fingerprint: add644b20c71

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- resolves: F-003
- status: resolved
- note: Bullet now reads: Friedland groups claims on reporting patterns, settlement patterns, how well case reserves can be set, likelihood of reopening, alongside consistency of coverage, claim volume and severity (Friedland pp.29-30, PDF pp.35-36). The two-coverages illustration is kept.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-09T19:04Z/2db6
- date: 2026-10-09
- status_set: verified
- confidence: medium
- checks_run: Definition and within/between-groups wording against Werner p.155; the homogeneity-credibility balance against Werner p.156, Friedland p.30 and the SOP considerations; criteria bullet item by item against Werner pp.155-158; reserving grouping characteristics against Friedland pp.29-30; persistence-across-years check against Werner's statistical significance ('relatively stable from one year to the next'). Examples recomputed: 7,975,000/10,000 = 797.50, relativities 0.752/1.066/1.881; 33% and 47% on a common base.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.9 pp.155-158 (PDF pp.167-170), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 pp.29-30 (PDF pp.35-36), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS Statement of Principles Regarding Property and Casualty Insurance Ratemaking (adopted May 1988; reinstated May 2021), Section III p.3, Homogeneity and Credibility, sha256:f240ea62dd033aac827c2073e56c0a4061d5c84531e5cf6be02d333a8f9f2140 — https://www.casact.org/sites/default/files/2021-05/Statement-Of-Principles-Ratemaking.pdf
- note: F-001 and F-002 fixed, F-003 found and fixed. Medium: both examples (including the reserving factors 1.05/1.60/1.28) are vault-authored illustrations.
