---
target: Concepts/Changing Conditions.md
created: 2026-10-31
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T13:31Z/75be
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: definition and the development technique's assumptions vs Ch. 7 p. 96; internal/external change list vs Ch. 4 p. 44 and the interview questions pp. 45-50 (claims, underwriting, data processing, reinsurance, senior management incl. marketing); the four 'which estimate each change biases' bullets vs the Ch. 15 p. 349 table (increasing claim ratios: dev 602 = true 602, EC -843, BF-rep 439, BF-paid 159, CC 506; case strengthening: dev-rep 501, BF-rep 458, CC 470 vs true 253, paid and EC = 253; product mix: every method below 2,391); responses vs Ch. 13 pp. 283-284 (data selection/rearrangement, homogeneous groups, B-S adjustments) and Ch. 10 p. 177 (Cape Cod on-level/trend/tort-reform adjustment); both examples recomputed (11.6M, 10.0M, 10.8M, 10.0M; true IBNR 4.2M); links resolve
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 pp. 44-50 (understanding the environment; interview questions); Ch. 6 pp. 63-77; Ch. 7 pp. 96-105 (assumptions, Scenarios 1-4, product mix); Ch. 8 pp. 137-139; Ch. 9 pp. 157-161; Ch. 10 pp. 177-179; Ch. 13 pp. 283-284; Ch. 15 p. 349 (summary table of estimated IBNR), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf
- note: Every claim checked against Friedland; no discrepancy found.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T17:32Z/cde6
- date: 2026-10-31
- status_set: verified
- confidence: high
- checks_run: BF bullet: Ch.9 p.152 'reporting and payment patterns used in the BF methods are the same as those selected in the development method'; Fall 2015 Q22(b) examiner's report (rank 1): BF 'inappropriate because the changing severity would also impact the % unreported', sample answers 'use report year data' / 'use a F-S technique and modify the severity'; Ch.13 p.283 report-year substitution; Ch.11 p.204 regulatory-reform adjustment. Payment-date bullet: Ch.5 p.55 incremental cells = amounts paid in each 12-month calendar period; Spring 2017 Q23(a) sample answer (rank 1) 'Adjust the paid claims before 12/31/2014' and examiner's common errors (adjusting post-decision payments; not carrying the 2013/2014-diagonal adjustment into later cumulative cells); Ch.8 p.133 restate as if in new legal environment; writer's 10% example checked (cells on the change year's and earlier diagonals x1.10, later left) and the bank's Q23 recomputed (468, 582, 510; 1,050/468 etc.; 619 x 3.09375 = 1,915); rest of page unchanged since this morning's pass
- sources_checked: Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.5 p.55-56 (PDF 61-62) incremental paid triangle by calendar period; Ch.8 p.133 (PDF 139) reform restatement; Ch.9 p.152 (PDF 158) BF uses the development technique's patterns; Ch.11 pp.204, 209-210 (PDF 210, 215-216) reform-adjusted and trended severities; Ch.13 p.283 (PDF 289) report-year data after a legal shift, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf; CAS Exam 5 Spring 2017 — sample answers and examiner's report, Q23 part a, pp.88-89, sha256:f42f48b0e1bec884aba2e4c0eca91ee2b95b3f5cc6fd7f02de78086899f9e0c6 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp17-5.pdf; CAS Exam 5 Fall 2015 — sample answers and examiner's report, Q22 part b, p.85, sha256:a3367c88f08abf0726c14d2034c8772c03594cbcf07494b93b35b6433dbca42c — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_f15-5.pdf
- note: The writer's flagged payment-date restatement is a fair general statement: no single Friedland page prints the procedure, but the CAS Spring 2017 Q23 sample answer and examiner's report (rank 1) apply exactly it, and Ch.5 supplies why it works on incremental cells. Kept; content shared with FAM/ASTAM untouched.
