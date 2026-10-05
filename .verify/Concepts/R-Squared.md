---
target: Concepts/R-Squared.md
created: 2026-10-04
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- status_set: verified
- confidence: medium
- checks_run: both examples recomputed before comparison (R² = 1 - 3500/10000 = 0.65; adjusted R² = 1 - 0.35*49/44 = 0.6102) - agree; adjusted-R² degrees of freedom (n-p-1 with p predictors = ISLR's d; PSU's n-p with p parameters) checked; monotonicity, range, in-sample caveat, deviance pseudo-R² checked; links and embed resolve; MAS-I task C7 'calculate R-squared' consistent
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.3 R² = 1 - RSS/TSS (3.17), between 0 and 1, printed p.70 (PDF p.80); §3.2.2 R² always increases as variables are added, training data, printed pp.79-80 (PDF pp.89-90); §6.1.3 adjusted R² = 1 - [RSS/(n-d-1)]/[TSS/(n-1)] (6.4), printed pp.234-235 (PDF pp.242-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 10 §10.3 adjusted R² = 1 - ((n-1)/(n-p))(SSE/SSTO), p = parameters incl. intercept, sha256:c5c4744b68f627609bd40ed82d3a571ed3aa6c2231469ddbac18d5b8cc94313c — https://online.stat.psu.edu/stat501/Lesson10.html; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.3 'Logit Models for Binary Data', §3.8 pseudo-R² as the proportion of deviance explained relative to the null model, PDF p.50, sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: No findings. R² and adjusted R² confirmed by ISLR 2nd ed. (rank 2); the GLM pseudo-R² rests on Rodríguez (rank 3), hence medium.

## [F-001] R-squared range stated without the intercept condition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 1 ('R^2 in [0, 1]')
- claim: 'R^2 in [0, 1]; a value of 1 means the model explains all variability; 0 means it explains none', stated for R^2 = 1 - SS_Res/SS_Tot with no condition on the model.
- evidence: The range holds for a least-squares fit that includes an intercept, which is the setting of ISLR §3.1.3 (every ISLR model has beta_0). Without an intercept it fails: Eisenhauer, J.G., 'Regression through the Origin', Teaching Statistics 25(3):76-80 (2003), doi:10.1111/1467-9639.00136: p.78 (PDF p.3) with no constant the cross-product term is generally nonzero, so the usual decomposition fails, and if the fit is poor enough sum(Y - Yhat)^2 > sum(Y - ybar)^2 and equation (4) gives 'an implausibly negative (and thus uninterpretable) coefficient of determination'; R^2 about the origin is strictly non-negative and equals or exceeds equation (4); p.79 (PDF p.4) Excel applies (4) regardless of an intercept and can give negative R^2, SPSS's no-intercept R Square 'CANNOT be compared to R Square for models which include an intercept'. Copy read: third-party repost of the publisher PDF, sha256:78184c18dc1d766a484a68353985493c5d3a8d7a4996dcdb3dfc747f554335d5 — https://web.ist.utl.pt/~ist11038/compute/errtheory/,regression/regrthroughorigin.pdf. Paul, D. & Li, Y., 'Regression through the origin', Statistics LibreTexts (UC Davis), pageRevision 10, last modified 17 Aug 2020: through the origin the ANOVA decomposition is SSTO = sum Y_i^2 with n d.f., SSR with 1 d.f. (not the usual sum (Y - Ybar)^2), sha256:a85654900da2e113630a696e041d0a5f67b8b9d97f70a56a2cbe2dbae8ce0fde (HTML as fetched; the page embeds per-request tokens) — https://stats.libretexts.org/Bookshelves/Computing_and_Modeling/Supplemental_Modules_(Computing_and_Modeling)/Regression_Analysis/Simple_linear_regression/Regression_through_the_origin. So a reader applying the page's formula to a regression through the origin can get a negative value.
- source_rank: 3
- proposed_action: Qualify the range with 'for a least-squares fit that includes an intercept' and add that without an intercept the formula can be negative, linking Regression Through the Origin.
- applied: true
- fingerprint: 760cf2181e68

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- resolves: F-001
- status: resolved
- note: Bullet 1 now reads 'For a least-squares fit that includes an intercept, R^2 in [0, 1]; a value of 1 means the model explains all variability; 0 means it explains none. Fitted without an intercept ([[Regression Through the Origin]]), the formula above can be negative.' Sources: Eisenhauer, Teaching Statistics 25(3) 2003, p.78 (PDF p.3; sha256:78184c18...) - without a constant the centred decomposition fails and equation (4), the page's formula, can give a negative coefficient of determination; p.79 (PDF p.4) Excel reports such negative values; LibreTexts 'Regression through the origin' (sha256:a8565490...) - through the origin SSTO is sum Y^2 on n d.f.; ISLR §3.1.3 printed p.70 for the [0, 1] range in the intercept model. All 4 links and the figure embed resolve.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-04T21:11Z/3707
- date: 2026-10-05
- status_set: verified
- confidence: medium
- checks_run: Edited bullet re-read against Eisenhauer pp.78-79 and LibreTexts; every other claim re-read this session against the cached sources (hashes re-computed, all match): R^2 = 1 - RSS/TSS (3.17) and range (ISLR PDF p.80), always increases as variables are added (ISLR PDF pp.89-90), adjusted R^2 (6.4) with d predictors (ISLR PDF pp.242-243) and PSU 501 L10's (n-1)/(n-p) form with p parameters incl. intercept (same quantity), pseudo-R^2 as proportion of deviance explained (Rodríguez c3 PDF p.50), in-sample caveat. Examples recomputed in python: 1 - 3500/10000 = 0.65; 1 - 0.35(49)/44 = 0.610. All [[links]] resolve exactly; figure embed exists; LaTeX balanced.
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.3 R² = 1 - RSS/TSS (3.17), between 0 and 1 (for the least squares fit of a model with an intercept), printed p.70 (PDF p.80); §3.2.2 R² always increases as variables are added, printed pp.79-80 (PDF pp.89-90); §6.1.3 adjusted R² (6.4), printed pp.234-235 (PDF pp.242-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 10 §10.3 adjusted R² = 1 - ((n-1)/(n-p))(SSE/SSTO), p = parameters incl. intercept, sha256:c5c4744b68f627609bd40ed82d3a571ed3aa6c2231469ddbac18d5b8cc94313c — https://online.stat.psu.edu/stat501/Lesson10.html; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.3 'Logit Models for Binary Data', §3.8 pseudo-R² as the proportion of deviance explained relative to the null model, PDF p.50, sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf; Eisenhauer, J.G., 'Regression through the Origin', Teaching Statistics 25(3):76-80 (2003), doi:10.1111/1467-9639.00136: p.78 (PDF p.3) with no constant the cross-product term is generally nonzero, so the usual decomposition fails, and if the fit is poor enough sum(Y - Yhat)^2 > sum(Y - ybar)^2 and equation (4) gives 'an implausibly negative (and thus uninterpretable) coefficient of determination'; R^2 about the origin is strictly non-negative and equals or exceeds equation (4); p.79 (PDF p.4) Excel applies (4) regardless of an intercept and can give negative R^2, SPSS's no-intercept R Square 'CANNOT be compared to R Square for models which include an intercept'. Copy read: third-party repost of the publisher PDF, sha256:78184c18dc1d766a484a68353985493c5d3a8d7a4996dcdb3dfc747f554335d5 — https://web.ist.utl.pt/~ist11038/compute/errtheory/,regression/regrthroughorigin.pdf; Paul, D. & Li, Y., 'Regression through the origin', Statistics LibreTexts (UC Davis), pageRevision 10, last modified 17 Aug 2020: through the origin the ANOVA decomposition is SSTO = sum Y_i^2 with n d.f., SSR with 1 d.f. (not the usual sum (Y - Ybar)^2), sha256:a85654900da2e113630a696e041d0a5f67b8b9d97f70a56a2cbe2dbae8ce0fde (HTML as fetched; the page embeds per-request tokens) — https://stats.libretexts.org/Bookshelves/Computing_and_Modeling/Supplemental_Modules_(Computing_and_Modeling)/Regression_Analysis/Simple_linear_regression/Regression_through_the_origin; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Verified medium, as before: the pseudo-R^2 and the no-intercept qualifier rest on rank-3 sources. No open findings.
