---
target: Concepts/Parameter Estimate Tables.md
created: 2026-10-04
---

## [F-001] p-value and 95% CI given only in z form; t-value tables need the t distribution
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: major
- status: open
- locus: column table: 'p-value' and '95% CI' rows
- claim: p-value = P(|Z| >= |z-value|) and 95% CI = b ± 1.96 SE(b), presented for tables reporting either a z-value or a t-value.
- evidence: ISLR 2nd ed. §3.1.2 printed p.67 (PDF p.77): under H0 the t-statistic (3.14) has a t-distribution with n-2 degrees of freedom; footnote 3, printed p.66: the 95% interval should use 'the 97.5% quantile of a t-distribution with n-2 degrees of freedom' rather than ~2. ISLR §4.3.2 printed p.136: the z-statistic in logistic-regression output 'plays the same role as the t-statistic'. Rodríguez Ch.2 §2.3.1 (c2.pdf PDF p.9, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f): b_j/SE ~ Student t with n-p df when sigma² is estimated, standard normal only when it is known. For linear-model output ('t value') the p-value is P(|T_(n-p-1)| >= |t|) and the CI uses t_(0.025, n-p-1); e.g. with 3 residual df the multiplier is 3.182, not 1.96.
- source_rank: 2
- proposed_action: Qualify both rows: normal (z) for GLMs with known dispersion (Poisson, binomial) or large samples; t with n-p-1 df when the table reports t values (linear models, or a GLM with estimated dispersion).
- applied: false
- fingerprint: ced44519e494

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: example recomputed before comparison (z = 0.45/0.15 = 3.0, two-sided p = 0.0027 ~ 0.003; e^0.45 = 1.568) - agrees; column definitions, test statistic, significance rule, log-link relativity, baseline level, Fisher-information standard errors checked; figure builder (b ± 2 SE whiskers, prior claim crosses zero) consistent; links and embed resolve; MAS-I task C4 and PCPA C usage consistent
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.2 standard errors, t-statistic (3.14), p-values and CIs, Table 3.1, printed pp.66-68 (PDF pp.76-78); §3.3.1 baseline level, printed p.86; §4.3.2 z-statistic, Table 4.1, printed p.136 (PDF p.146), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.1 Wald t-test: t with n-p df when sigma² estimated, normal when known, PDF pp.9-10, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.3.1 information matrix X'WX/phi and large-sample normality of the MLE, PDF pp.5-6, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.4 'Poisson Models for Count Data', §4.2 exp(beta_j) multiplies the mean under the log link, PDF p.5, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS PCPA Exam & Project Content Outline v.8 (effective Sept 2026, updated 9.9.2026), Domain A task 4 p.4 and 'Performance Evaluation Criteria' p.6, sha256:e22ce369f08e1feec88b1ed8a9273c67fd585b1c62193ea3105fe1fe8077189f — https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf
- note: Open: F-001 major - the p-value and CI rows are z-only although the table covers t values. Everything else matches ISLR 2nd ed. and Rodríguez.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: p-value and 95% CI rows now give both forms: P(|T_(n-p-1)| >= |t|) and b ± t_(0.025, n-p-1) SE for a t-value; P(|Z| >= |z|) and b ± 1.96 SE for a z-value. New bullet 'Which distribution applies': linear-regression tables report t-values (sigma² estimated from the residuals, t with n-p-1 df under Normal errors, p predictors plus intercept); GLM tables such as Poisson or logistic report z-values (Wald statistics referred to the standard Normal, MLE approximately Normal in large samples); critical values 2.09 at 20 df, 1.98 at 100 df vs 1.96, and 3.18 at 3 df (recomputed in python: 2.086, 1.984, 3.182). Sources: ISLR 2nd ed. §3.1.2 (3.14) t with n-2 df and footnote 3 (97.5% t quantile), printed pp.66-67 (PDF pp.76-77); §4.3.2 'The z-statistic in Table 4.1 plays the same role as the t-statistic', printed p.136 (PDF p.146); Table 4.11 Poisson regression z-statistic, printed p.168 (PDF p.178), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodríguez Ch.2 §2.3.1, c2.pdf PDF pp.9-10 (t with n-p df when sigma² estimated, normal when known; 2.09 at 20 df, 1.98 at 100 df), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; App. B §B.3.1 (B.10) large-sample normality of the GLM MLE, a2.pdf PDF pp.5-6, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: edited rows and new bullet re-read against ISLR §3.1.2/§4.3.2/Table 4.11 and Rodríguez §2.3.1; t critical values recomputed in python (2.086 @20, 1.984 @100, 3.182 @3); example recomputed (z = 0.45/0.15 = 3.0, two-sided normal p = 0.0027, e^0.45 = 1.568) - agrees and correctly uses the z form for a Poisson GLM; links and embed resolve
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.2 standard errors, t-statistic (3.14) with n-2 df, footnote 3 on the 97.5% t quantile, printed pp.66-67 (PDF pp.76-77); §4.3.2 z-statistic, Table 4.1, printed p.136 (PDF p.146); §4.6.2 Table 4.11 Poisson regression z-statistic, printed p.168 (PDF p.178), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.1 Wald t-test: t with n-p df when sigma² estimated, normal when known, CI with t_(1-alpha/2, n-p), PDF pp.9-10, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.3.1 information matrix X'WX/phi and large-sample normality of the MLE (B.10), PDF pp.5-6, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.3.1-2.3.3 standard error, p-value, confidence interval in GLM output, printed pp.8-10 (PDF pp.18-20), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 4 ('Interpret the extended linear model output from statistical software, such as parameter estimate tables and ANOVA tables') and task 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: F-001 resolved. Medium: the n-p-1 df and GLM Wald normality rest partly on rank-3 notes (Rodríguez); ISLR confirms the t/z split.
