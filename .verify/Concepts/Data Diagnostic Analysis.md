---
target: Concepts/Data Diagnostic Analysis.md
created: 2026-10-16
---

## [F-001] "Not along the diagonals" for a mix change is in no source
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- severity: minor
- status: open
- locus: What the common changes look like, third bullet
- claim: A mix change: shows up down the columns, not along the diagonals.
- evidence: Friedland Ch. 6 says average values for a stable insurer should change down the columns only by inflation (p.74, PDF p.80) and that average case outstanding 'could also be changing due to changes in the mix of business' (p.75, PDF p.81), but it nowhere says a mix change leaves the diagonals alone; its own example has a shift in the type of claim closed at each age appearing on the latest diagonal of the average paid triangle (p.74, PDF p.80) and in average case outstanding (p.76, PDF p.82). Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Chapters 5-6 pp.61-77 (PDF pp.67-83); Chapter 13 p.291 (PDF p.297), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- source_rank: 2
- proposed_action: Delete ', not along the diagonals'.
- applied: false
- fingerprint: c3adf9a1f068

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rba
- date: 2026-10-16
- status_set: in_review
- checks_run: average case outstanding formula vs Friedland Table 11 (p.72); unscaled Pearson residual vs Shapland (3.16) with z=1; Friedland Ch. 5-6 triangles and the case-strengthening / settlement-speed signatures (pp.68-76); Shapland residual graphs, normality test, box-whisker outliers, hetero-adjustment (4.8)-(4.10), degrees of freedom and process variance (pp.25-36); data issues list vs Shapland Section 4 contents; Venter implications; both examples recomputed (ratios 1.050/1.107/1.053/1.104/1.103; h = 0.75 and 1.50, 1.6 and 0.8 standard units) and their conclusions checked against Friedland p.291 (case-strengthening restatement detrended from the latest diagonal) and Shapland (4.10); link check
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Chapters 5-6 pp.61-77 (PDF pp.67-83); Chapter 13 p.291 (PDF p.297), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Shapland, Using the ODP Bootstrap Model (CAS Monograph #4, 2016), eq. (3.16) p.11 (PDF p.19); Sections 4.1-4.9 pp.20-30 and 5.1-5.3 pp.31-37 (PDF pp.28-45), eqs. (4.8)-(4.10), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; Venter, Testing the Assumptions of Age-to-Age Factors (PCAS 1998), Testable implications pp.812-813 (PDF pp.6-7), sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf
- note: Everything holds against Friedland, Shapland and Venter except one minor unsourced clause (F-001), to be removed in the clean-up round.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- resolves: F-001
- status: resolved
- note: Deleted ', not along the diagonals' in run e7rbb; 'shows up down the columns' is kept (Friedland p.74, p.75).

## [C-002] Data Diagnostic Analysis re-verified after the clean-up
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-11T02:10Z/e7rbb
- date: 2026-10-16
- status_set: verified
- confidence: high
- checks_run: delta re-check of the corrected bullet against Friedland Ch. 6; link check; the rest unchanged since e7rba's check
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Chapters 5-6 pp.61-77 (PDF pp.67-83); Chapter 13 p.291 (PDF p.297), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; Shapland, Using the ODP Bootstrap Model (CAS Monograph #4, 2016), eq. (3.16) p.11 (PDF p.19); Sections 4.1-4.9 pp.20-30 and 5.1-5.3 pp.31-37 (PDF pp.28-45), eqs. (4.8)-(4.10), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf; Venter, Testing the Assumptions of Age-to-Age Factors (PCAS 1998), Testable implications pp.812-813 (PDF pp.6-7), sha256:58523222aa33f1b8c82455818e8c2da1b8f24aee7d83badf8c88d2f71a638dcb — https://www.casact.org/sites/default/files/database/proceed_proceed98_980807.pdf
- note: Re-verified after F-001 was fixed; formulas, diagnostics, hetero-adjustment and both examples hold against Friedland, Shapland and Venter.
