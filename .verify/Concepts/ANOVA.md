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
