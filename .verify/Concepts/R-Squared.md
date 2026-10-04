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
