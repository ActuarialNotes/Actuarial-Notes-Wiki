---
target: questions/exam-mas-i/masi-an-156.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: phi = 1,880/800 = 2.35; F = (22.2/3)/2.35 = 3.149 -> 3.15 = key; F(3,800) 95th pct 2.616 (rank 5); wrong entries 7.40, 9.45, 4.83, 3.05 recomputed; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: Roback & Legler, Beyond Multiple Linear Regression, Ch.4 Poisson Regression (bookdown), §4.9 overdispersion: phi-hat = sum of squared Pearson residuals / (n - p); SE_Q = sqrt(phi-hat) SE; t tests; drop-in-deviance F = (drop in deviance / difference in df) / phi-hat, sha256:55079c7b837d6207e55badacb0258e26d6c8f07ee731d11db0878b2d6a4982d4 — https://bookdown.org/roback/bookdown-BeyondMLR/ch-poissonreg.html; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §6.1.3 and §6.2.1, PDF pp.74-75 (deviance comparisons need identical data, missing values dropped by software; nested models and F = (D_S - D_B)/(# added parameters x phi-hat_B)), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; R documentation, stats::summary.glm, Details: dispersion taken as 1 for binomial and Poisson, otherwise residual chi-squared statistic / residual df; column labelled t ratio if dispersion is estimated, z ratio if known, two-tailed p-values from Student t or Normal, sha256:c7cf5a73225bd54cad2584cf31b1155884c4d359a14de4048b6e11a7acfe9e2d — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.glm.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
