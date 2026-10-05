---
target: Concepts/ANOVA.md
created: 2026-10-04
---

## [F-001] Analysis-of-deviance chi-squared claim omits the dispersion scaling
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: bullet 3 (Analysis of Deviance)
- claim: Analysis of Deviance compares nested GLMs by the change in Deviance, 'which follows a chi-squared distribution asymptotically'.
- evidence: Rodríguez GLM notes App. B §B.3.2 (a2.pdf PDF pp.6-7, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286): the likelihood-ratio criterion is the scaled deviance difference [D(w1) - D(w2)]/phi, asymptotically chi-squared with p2 - p1 df; with normal errors and phi estimated the exact test is F with (p2 - p1, n - p2) df; the raw deviance difference is chi-squared only when phi = 1 (Poisson, binomial). For a Gamma or Normal model the unscaled change in deviance is not chi-squared distributed, so the bullet as written gives wrong p-values there.
- source_rank: 3
- proposed_action: State that the change in deviance divided by the dispersion phi is asymptotically chi-squared with df equal to the difference in parameters (phi = 1 for Poisson/binomial), and that an F test is used when phi is estimated.
- applied: false
- fingerprint: 2fd62735d291

## [F-002] Regression ANOVA table, which MAS-I asks candidates to interpret, is not described
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: definition and 'ANOVA table structure'
- claim: ANOVA is presented only as the one-way test of k group means (Between/Within, df k-1 and N-k).
- evidence: MAS-I Content Outline 2026 p.5 task C4 (sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed): 'Interpret the extended linear model output from statistical software, such as parameter estimate tables and ANOVA tables'. In regression output the table partitions SSTO = SSR + SSE with df p, n-p-1, n-1 and F = MSR/MSE (PSU STAT 501 Lesson 2 §2.6, sha256:1e70ff328d0ed946e167ac2949a287f8b23c3ae7f407af884fe4c6e447a6be32; ISLR 2nd ed. eq (3.23) printed p.76), and R's anova() prints sequential sums of squares (Rodríguez Ch.2 Table 2.2 'hierarchical anova', c2.pdf PDF p.14). The one-way table is the special case with group indicators (Rodríguez §2.6.4, Table 2.12, df 2 and 17 for k = 3, n = 20). Nothing stated is wrong; it is an omission.
- source_rank: 1
- proposed_action: Add the regression ANOVA table (Regression / Residual / Total with df p, n-p-1, n-1 and F = MSR/MSE) and note that anova() on a fitted model gives sequential sums of squares. Authoring - for a human.
- applied: false
- fingerprint: 7a514ba905c0

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: example recomputed before comparison (MS_B = 1200/2 = 600, MS_W = 5400/27 = 200, F = 3.0, F(0.95; 2, 27) = 3.354 computed from the incomplete beta) - agrees; one-way F statistic, df k-1 / N-k / N-1, rejection rule, equivalence with indicator regression checked; figure builder (SST 1000 = 680 on 2 df + 320 on 47 df, F = 340/6.81 = 49.9) consistent; analysis-of-deviance distribution checked against Rodríguez App. B; links and embed resolve
- sources_checked: Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.4 anova table (Table 2.2), §2.4.3 anova for simple regression, §2.6 one-way analysis of variance and Table 2.12 (df k-1 = 2, n-k = 17, total n-1 = 19), PDF pp.13-14, 18, 26-32, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.3.2 likelihood ratio tests and the (scaled) deviance, PDF pp.6-7, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 2 §2.6 ANOVA table: SS, df, MS, F = MSR/MSE; degrees of freedom add up, sha256:1e70ff328d0ed946e167ac2949a287f8b23c3ae7f407af884fe4c6e447a6be32 — https://online.stat.psu.edu/stat501/Lesson02.html; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.2.2 F-statistic (3.23)-(3.24), printed pp.75-77 (PDF pp.85-87); §3.3.1 F-test for a qualitative predictor's dummies, printed p.86, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: One-way ANOVA content and the example are correct. Open: F-001 major (deviance difference must be scaled by phi for chi-squared), F-002 minor (regression ANOVA table not covered).

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Analysis-of-Deviance bullet rewritten: the change in deviance scaled by the dispersion, [D_small - D_big]/phi, is asymptotically chi-squared with df = number of added parameters; for Poisson and binomial phi = 1 so the raw change is compared with chi-squared; when phi is estimated (Normal, Gamma) the F test F = (D_small - D_big)/(# added parameters x phi-hat_big) on (# added, n - p_big) df is used; for a Normal model the deviance is the RSS and the F is exact. Sources: Rodríguez App. B §B.3.2 eq (B.13), a2.pdf PDF pp.6-7 ('-2 log lambda = [D(w1) - D(w2)]/phi', asymptotically chi-squared with p2 - p1 df; normal-errors criterion divided by p2 - p1 is exactly F with p2 - p1 and n - p2 df; 'In those cases phi = 1 ... the deviance is the same as the scaled deviance'), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Goldburd et al. CAS Monograph 5 §6.2 eq.(17), printed p.65 (PDF p.75), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-002
- status: resolved
- note: Added a 'Regression ANOVA table' section: Regression / Residual (Error) / Total rows with SS (SSR = sum(yhat - ybar)², RSS, SS_Tot), df (p, n-p-1, n-1), MS (MSR = SSR/p, MSE = RSS/(n-p-1)) and F = MSR/MSE ~ F(p, n-p-1) under H0: all slopes zero; SS and df add up, MSE = sigma-hat²; the one-way table as the case of k-1 group indicators; and the sequential (hierarchical, Type I) table - one row per predictor in order of entry, SSR(x1), SSR(x2|x1), ..., rows summing to SSR, each F over the full model's MSE, order matters. Definition extended to say regression output prints the same partition. Sources: ISLR 2nd ed. eq (3.23) printed p.76 (PDF p.86), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; PSU STAT 501 Lesson 2 §2.6 (sha256:1e70ff328d0ed946e167ac2949a287f8b23c3ae7f407af884fe4c6e447a6be32) and Lesson 6 §6.2-6.3 (sha256:23f9fd1867db940775816d73b0313cbcacbc0b7d67bcff3be7b4f02430cf981e); Rodríguez Ch.2 §2.3.4 Table 2.2 hierarchical anova (PDF p.14), Tables 2.7-2.8 (PDF pp.24-25; 1201.1/40.8 = 29.4, 755.1/40.8 = 18.5) and §2.6.4 Table 2.12 (PDF p.31), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; MAS-I outline 2026 task C4.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: every new line re-read against its source; example recomputed in python (MS_B = 600, MS_W = 200, F = 3.0, F(0.95; 2, 27) = 3.354 by numeric integration) - agrees; Rodríguez Table 2.8 arithmetic re-run (sequential SS sum 1201.1 + 755.1 = 1956.2, F = 29.4, 18.5 on MSE 40.8); df additivity checked; links and embed resolve
- sources_checked: Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.4 hierarchical anova Table 2.2, PDF pp.13-14; §2.5 Tables 2.7-2.8 regression and hierarchical anova, PDF pp.24-25; §2.6.4 one-way anova Table 2.12, PDF p.31, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.3.2 likelihood ratio tests, scaled deviance, eq (B.13), exact F for normal errors, phi = 1 for binomial/Poisson, PDF pp.6-7, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2 F-test, eq.(17) F = (D_S - D_B)/(# added parameters x phi-hat_B) on (# added, n - p_B) df, printed p.65 (PDF p.75), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 2 §2.6 ANOVA table: SSR, SSE, SSTO, df add up, MSR, MSE, F* = MSR/MSE, sha256:1e70ff328d0ed946e167ac2949a287f8b23c3ae7f407af884fe4c6e447a6be32 — https://online.stat.psu.edu/stat501/Lesson02.html; Penn State STAT 501 Regression Methods (online course notes), Lesson 6 §6.2 general linear F-test and Analysis of Variance output; §6.3 sequential (extra, Type I) sums of squares, order of entry matters, regression SS decomposes into sequential SS, sha256:23f9fd1867db940775816d73b0313cbcacbc0b7d67bcff3be7b4f02430cf981e — https://online.stat.psu.edu/stat501/Lesson06.html; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.2.2 F-statistic (3.23) and E{RSS/(n-p-1)} = sigma², printed p.76 (PDF p.86), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 4 ('Interpret the extended linear model output from statistical software, such as parameter estimate tables and ANOVA tables') and task 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: F-001 and F-002 resolved. Medium: the deviance/F-test and sequential-table statements rest on rank-3 sources (Rodríguez, PSU, Goldburd); the F statistic is confirmed by ISLR.

## [F-003] Does not link the related pages Multiple Comparisons and Analysis of Covariance
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: nit
- status: open
- locus: one-way ANOVA bullet list (related concepts)
- claim: The page links Generalized Linear Model and Deviance only; it does not link Multiple Comparisons (what follows a rejected ANOVA F test) or Analysis of Covariance (ANOVA's factor model with a continuous variate added), both MAS-I Domain C topics with concept pages.
- evidence: NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7 'How can we make multiple comparisons?' ('What to do after equality of means is rejected'; the ANOVA F test is a preliminary test; Tukey's method for all pairwise differences, Scheffé's for all contrasts, Bonferroni for a pre-selected group of contrasts), sha256:9817042aaf1da7217dfc789ce4a98c1610cface5e73a9d0babbff034ebf2bc6d — https://www.itl.nist.gov/div898/handbook/prc/section4/prc47.htm; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.4 hierarchical anova Table 2.2, PDF p.14; §2.5 Tables 2.7-2.8, PDF pp.24-25; §2.6.4 one-way anova Table 2.12, PDF p.31; §2.8 'Analysis of Covariance Models' ('models where some of the predictors are continuous variates and some are discrete factors'), PDF p.42, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf. Hogg, McKean & Craig 8th ed. publisher preview Contents PDF p.9 puts 9.4 Multiple Comparisons right after 9.2 One-Way ANOVA (sha256:7fd80607a820477e03ff2c8f3469f5cfa57d095d766cbc29d39d723ef5a69a99), and Dobson & Barnett 4th ed. preview Contents PDF p.10 puts 6.5 Analysis of covariance after 6.4 Analysis of variance (sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a). Both Concepts/ pages exist.
- source_rank: 2
- proposed_action: Add one short sourced bullet linking both pages.
- applied: true
- fingerprint: 558a6c7dc034

## [F-003/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-003
- status: resolved
- note: Added one bullet after 'ANOVA is a special case of a linear model ...': 'When the F test rejects H0, multiple-comparison procedures (Tukey, Scheffé, Bonferroni) find which means differ; adding a continuous variate to the group indicators gives an Analysis of Covariance model', linking [[Multiple Comparisons]] and [[Analysis of Covariance]]. Sources: NIST e-Handbook §7.4.7 (after the F test rejects equality, a multiple comparison procedure finds which means differ; Tukey, Scheffé, Bonferroni; sha256:9817042a...) and Rodríguez Ch.2 §2.8 'Analysis of Covariance Models', PDF p.42 (continuous variates with discrete factors; sha256:b9fae913...). All page links and the figure embed resolve.

## [C-003] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Every claim re-read this session against the cached sources (hashes re-computed, all match): one-way F = MSB/MSW on (k-1, N-k), regression table SSR/RSS/SS_Tot with df p, n-p-1, n-1 and F = MSR/MSE (ISLR eq 3.23 PDF p.86; PSU 501 L2 §2.6 df and SS add up, F* = MSR/MSE), sequential table and 'order matters' (Rodríguez Table 2.2 PDF p.14; PSU 501 L6 §6.3), one-way table as indicator regression (Rodríguez Table 2.12 PDF p.31), deviance scaled by phi and the F test (Rodríguez App. B §B.3.2 PDF pp.6-7; Goldburd eq.17 PDF p.75), new bullet (NIST 7.4.7; Rodríguez §2.8 PDF p.42). Example recomputed in python: MS_B = 600, MS_W = 200, F = 3.0, F(0.95; 2, 27) = 3.354 (scipy) - fail to reject, as stated. All [[links]] resolve exactly; figure embed exists; LaTeX balanced.
- sources_checked: Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.4 hierarchical anova Table 2.2, PDF p.14; §2.5 Tables 2.7-2.8, PDF pp.24-25; §2.6.4 one-way anova Table 2.12, PDF p.31; §2.8 'Analysis of Covariance Models' ('models where some of the predictors are continuous variates and some are discrete factors'), PDF p.42, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.3.2 likelihood ratio tests, scaled deviance, exact F for normal errors, phi = 1 for binomial/Poisson, PDF pp.6-7, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2 F-test, eq.(17), printed p.65 (PDF p.75), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 2 §2.6 ANOVA table: SSR, SSE, SSTO, df add up, MSR, MSE, F* = MSR/MSE, sha256:1e70ff328d0ed946e167ac2949a287f8b23c3ae7f407af884fe4c6e447a6be32 — https://online.stat.psu.edu/stat501/Lesson02.html; Penn State STAT 501 Regression Methods (online course notes), Lesson 6 §6.2 general linear F-test; §6.3 sequential sums of squares, order matters, sha256:23f9fd1867db940775816d73b0313cbcacbc0b7d67bcff3be7b4f02430cf981e — https://online.stat.psu.edu/stat501/Lesson06.html; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.2.2 F-statistic (3.23), printed p.76 (PDF p.86), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7 'How can we make multiple comparisons?' ('What to do after equality of means is rejected'; the ANOVA F test is a preliminary test; Tukey's method for all pairwise differences, Scheffé's for all contrasts, Bonferroni for a pre-selected group of contrasts), sha256:9817042aaf1da7217dfc789ce4a98c1610cface5e73a9d0babbff034ebf2bc6d — https://www.itl.nist.gov/div898/handbook/prc/section4/prc47.htm; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5; p.6 Hogg 9.1-9.6 and Dobson & Barnett Ch 1-9 for C1-C9, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Verified medium, as before: the deviance/F-test and sequential-table statements rest on rank-3 sources. No open findings.
