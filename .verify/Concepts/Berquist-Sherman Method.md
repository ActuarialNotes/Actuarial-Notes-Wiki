---
target: Concepts/Berquist-Sherman Method.md
created: 2026-10-31
---

## [F-001] Case adjustment formula trends total case and omits open counts
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: major
- status: open
- locus: defining formulas
- claim: Adjusted Case = Case_{latest,n} × (1+t)^{-(years before latest)}; Adjusted Reported = Paid + Adjusted Case
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) Ch.13, PDF p.292 (printed 286): the trend is applied to the AVERAGE case outstanding ('the 1975 adjusted average case outstanding at 12 months of $11,329 is equal to the 1976 average case outstanding at 12 months of $13,028 divided by 1.151'), and 'To determine the adjusted reported claims, we multiply the adjusted average case outstanding by the number of open claims and then add the unadjusted paid claims.' Trending total case would carry the latest year's open-claim count into every year. The page's own steps 1-4 and example do it Friedland's way, so only the formulas were wrong. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Write the formulas on average case outstanding, with open counts in the adjusted reported.
- applied: true
- fingerprint: e69caeb1a252

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- resolves: F-001
- status: resolved
- note: Formulas now: Adjusted Avg Case = Avg Case_latest × (1+t)^-k; Adjusted Reported = Paid + Adjusted Avg Case × Open Counts.

## [F-002] Disposal rate defined with reported counts as an alternative denominator
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: minor
- status: open
- locus: settlement adjustment step 1; second example
- claim: disposal rates — closed claims ÷ ultimate (or reported) claims; (example) 'The disposal rate, though, has moved from 58% to 74%' for a closed ÷ reported column.
- evidence: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010) Ch.13 PDF p.294 (printed 288): 'The disposal rate is equal to the cumulative closed claim counts for each accident year-maturity age cell divided by the ultimate claim counts'; the closed-to-reported ratio is used there as the diagnostic, not as the disposal rate (Exhibit II Sheet 2). Ch.11 PDF p.212 gives the same definition. sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Drop '(or reported)'; call the example's closed ÷ reported column the closed-to-reported ratio.
- applied: true
- fingerprint: 81a1f314cf45

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- resolves: F-002
- status: resolved
- note: Definition now closed ÷ ultimate; the example's diagnostic called the closed-to-reported ratio.

## [F-003] 'In two years' for a three-year movement
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- severity: nit
- status: open
- locus: Example 'Which Adjustment Does the Data Call For?', answer
- claim: has moved from 58% to 74% in two years
- evidence: The table's 58% is AY 2021 and 74% is AY 2024 — three accident years apart (rank 5, read off the page's own table).
- source_rank: 5
- proposed_action: Say 'since AY 2021' or 'in three years'.
- applied: false
- fingerprint: 838f2807e52f

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:29Z/3355
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: independent recomputation of the case-adequacy example (5,238, 4,989, adjusted case 1,247,250/1,309,500/1,375,000, reported 1,547,250/1,609,500/1,675,000, +19%) and the diagnostic example (avg case growth ≈4.5%/yr); formulas and both procedures diffed against Friedland pp.291-295
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.13 Berquist-Sherman Techniques, PDF pp.289-296 (printed 283-290): data selection, case adequacy detection and adjustment, settlement-rate adjustment, disposal rates, Thorne's caveats, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.11, PDF p.212 (printed 206): disposal rate definition, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Formulas corrected to Friedland's average-case form; disposal rate definition aligned; procedures agree with Ch.13.

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/cde6
- date: 2026-10-31
- resolves: F-003
- status: resolved
- note: Applied in this run: 'in two years' changed to 'in three years' (AY 2021 58% to AY 2024 74%).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/cde6
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: whole page against Ch.13; step 2 (latest-diagonal disposal rates x ultimate counts; latest diagonal unchanged) p.288; Y = a e^(bX) two-point fits, interpolation/extrapolation from closest range p.289, Friedland's 1970@48 (215 e^(0.000468 x 8,231) = 10,156) and 1969@12 (356 e^(0.000411 x 3,383) = 1,431) recomputed; combined adjustment: adjusted open = reported - adjusted closed, adjusted reported = adj avg case x adj open + adj paid p.292; examples recomputed (5,238; 4,989; 1,547,250; 1,609,500; ~19%; 4.5%/yr)
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.13 Berquist-Sherman Techniques, PDF pp.289-298 (printed 283-292): case adequacy adjustment, settlement rate adjustment (pp.288-290), XYZ Insurer combined adjustment (p.292), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: New material agrees with Friedland Ch.13. Open nit F-003 fixed and resolved.
