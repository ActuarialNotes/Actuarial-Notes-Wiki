---
target: Concepts/External Information in Reserving.md
created: 2026-10-31
---

## [F-001] Page covers external data only; task B20's examples are external conditions
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: major
- status: open
- locus: opening definition and bullets (whole page scope)
- claim: External Information in Reserving is the use of data originating outside the entity being analyzed — industry development patterns, published loss trends, competitor filings, economic and legal indicators — to supplement or replace an insurer's own experience ...
- evidence: Exam 5 Fall 2026 outline p.5, task B20: 'Utilize external information in a reserve analysis (e.g., inflation, tort reform, attorney involvement).' ASOP 43 §3.6.6, p.7 (PDF p.12): 'Claim obligations are influenced by external conditions, such as potential economic changes, regulatory actions, judicial decisions, or political or social forces. The actuary should consider relevant external conditions that are generally known by qualified actuaries in the same practice area ...'; Friedland Ch.7 p.88 (PDF p.94): 'Actuaries also consider the effect of changes in external factors that have not yet manifested themselves in the reported claims experience', and Ch.15 p.346 attributes differences between methods to 'changes in the external environment'. The page treats external information solely as substitute data/benchmarks; no bullet or example covers inflation, tort reform or attorney involvement, the three things the task names.
- source_rank: 1
- proposed_action: Add the external-conditions half (ASOP 43 §3.6.6; Friedland's external environment changes) with the task's examples, alongside the external-data material.
- applied: false
- fingerprint: f4d966f252af

## [F-002] Two listed sources appear in no reading, one is not a data source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'Common sources' bullet
- claim: industry aggregations (ISO, NCCI, statistical agents, Schedule P compilations for U.S. insurers; GISA and OSFI returns in Canada), rating-bureau loss development patterns, published loss-trend indices, reinsurer experience on the same treaty, and the CAS examiner's-report style benchmarks used for market comparison.
- evidence: Friedland Ch.3, printed p.28 (PDF p.34) lists the external sources: United States — ISO, NCCI, Reinsurance Association of America, The Surety & Fidelity Association of America, A.M. Best, NAIC Annual Statement data; Canada — Best, General Insurance Statistical Agency (GISA), Insurance Bureau of Canada, Reinsurance Research Council, MSA. 'OSFI returns' is not among them, and 'CAS examiner's-report style benchmarks' appears nowhere in Friedland or ASOP 43 — CAS examiner's reports comment on exam answers and publish no loss benchmarks.
- source_rank: 2
- proposed_action: Drop the 'CAS examiner's-report style benchmarks' item and either source or drop 'OSFI returns'; consider listing Friedland's sources (RAA, SFAA, Best, IBC, RRC, MSA).
- applied: false
- fingerprint: 8272eaf4177f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/0351
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: When-needed bullet against Friedland Ch.3 p.28 (smaller insurers with limited volume/credibility; large insurers entering a new line or region; 'External information can be particularly valuable when selecting tail development factors, trend rates, and expected claim ratios'; reconciling method results) and Ch.7 p.88 (benchmarks when credibility is limited). Adjustment bullet against Ch.7 p.88 ('Any benchmark must be utilized with caution ... claims practices, policy coverages, underwriting, geographic mix, claim coding, policyholder deductibles and/or limits, legal precedents') and fn.40 (Academy against heavy reliance on industry benchmarks unless credibility is low). Tail-factor example against Ch.7 p.90 (industry benchmark factors as one approach to the tail). Documentation bullet against ASOP 43 §3.6.3 (ASOP 23 for relying on data supplied by others) and §4.1(f),(h) (reliances). Sources list against Ch.3 p.28 (F-002). Scope against task B20 and ASOP 43 §3.6.6 (F-001). Ex.2 recomputed before reading: 0.62/0.96 = 0.646; 8.0M × 0.646 = 5.168M; 1 − 1/1.25 = 0.20; 1.15M + 0.20 × 5.168M = 2.1836M — matches. Links resolve.
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ver. July 2010), Ch.3 p.28 (PDF p.34); Ch.7 pp.88, 90 (PDF pp.94, 96); Ch.15 p.346 (PDF p.352), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; ASOP No. 43, Property/Casualty Unpaid Claim Estimates (ASB, June 2007, Doc. No. 159), §§3.6.3, 3.6.6, 4.1(f),(h), pp.7-10 (PDF pp.12-15), sha256:776302c442cb8d3210fc41269d38caeec4c547da8159084b80fa2ac4ce949cce — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop043_159.pdf; CAS Exam 5 Content Outline, Fall 2026, pp.3-6 (tasks A3, B16-B20; Complete Text References), sha256:fd8373ae9bbe7e56b93f99cee304c76c1d29a9d0dc7f07e6ed500bd647f41795 — https://www.casact.org/sites/default/files/2026-03/Exam_5_CO_2026_Fall.pdf
- note: Verified against Friedland Ch.3/7/15 and ASOP 43 with two open findings: F-001 (major) the page omits external conditions (inflation, tort reform, attorney involvement — task B20's own examples; ASOP 43 §3.6.6); F-002 (minor) 'OSFI returns' and 'CAS examiner's-report style benchmarks' are in no reading. Both need authoring. The credibility-blend formula is the page's own framing; Friedland mentions credibility in selection (Ch.15 p.345) but gives no such formula.
