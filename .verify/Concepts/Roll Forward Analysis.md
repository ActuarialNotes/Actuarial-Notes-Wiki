---
target: Concepts/Roll Forward Analysis.md
created: 2026-10-31
---

## [F-001] Schedule P described as an industry-wide table
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: minor
- status: open
- locus: second bullet, Schedule P sentence
- claim: Statutory reporting requires this to be disclosed by accident year — Schedule P Part 2 is a one-year and two-year development table across the whole industry.
- evidence: Friedland Ch.1 fn.5, printed p.9 (PDF p.15): 'Schedule P is an important section of the U.S. P&C statutory Annual Statement' — each insurer's own filing, a ten-year summary by line with development schedules for incurred net, paid net and bulk + IBNR. Industry-wide figures are an aggregation of those filings, which Friedland lists separately as an external data source ('NAIC Annual Statement data', Ch.3 p.28, PDF p.34). 'Across the whole industry' misdescribes the disclosure the sentence is about.
- source_rank: 2
- proposed_action: Delete 'across the whole industry'.
- applied: true
- fingerprint: 68fab3f832b2

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Deleted 'across the whole industry' (Friedland Ch.1 fn.5: Schedule P is a section of the insurer's statutory Annual Statement).

## [F-002] Schedule P one-year/two-year development detail is in no reading read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: minor
- status: open
- locus: second bullet, Schedule P sentence (after F-001 fix)
- claim: Schedule P Part 2 is a one-year and two-year development table.
- evidence: Full-text search of Friedland (451 pp.) and ASOP 43: 'Schedule P' occurs only at Friedland PDF pp.15, 42, 85, 375; none mentions Part 2 or one-/two-year development columns (fn.5 describes development schedules for incurred net, paid net and bulk + IBNR). The NAIC Annual Statement Instructions, which would settle it, are an Exam 6U reading and were not read this session.
- source_rank: 2
- proposed_action: Source the Part 2 description from the NAIC Annual Statement Instructions (Schedule P), or cut it to what Friedland fn.5 says.
- applied: false
- fingerprint: 354855e3990c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Examples recomputed before reading the answers: 10.0M + 2.5M − 3.2M + 0.4M = 9.7M, fall of 0.3M, 0.4/10.0 = 4%; development ratios 900/38,000 = 2.4%, 1,300/41,000 = 3.2%, 1,800/44,000 = 4.1%, 2,400/47,000 = 5.1% — all match. Definition and interim-valuation bullet against Friedland Ch.15 pp.350-351 ('many use "roll-forward" types of analyses to capture and compare actual claims with expected claims between complete, detailed analyses. In addition to measuring changes in claims for historical periods, the actuary must incorporate the effect of changes in the exposure for the current period'), which supports the split into prior-period change vs new-period exposure behind the identity. Favourable-development bullet against Ch.1 pp.4-5 (a redundant estimate 'may drive an insurer to increase rates unnecessarily'). Systematic-bias bullet against ASOP 43 §3.6.2 (assumptions with 'no known significant bias'). Links resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.1 pp.4-5, 9 fn.5 (PDF pp.10-11, 15); Ch.15 pp.350-351 (PDF pp.356-357), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §3.6.2, p.6 (PDF p.11), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf; CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Verified against Friedland Ch.1 and Ch.15 and ASOP 43 §3.6.2. F-001 (minor, 'across the whole industry') fixed. F-002 (minor) open: the Schedule P Part 2 one-/two-year description is in no Exam 5 reading.
