---
target: questions/exam-mas-i/masi-an-108.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: intercept t = 0.78, p = 0.465 (t6); SSE1 = 2.267^2 x 6 = 30.84, SSE2 = 2.203^2 x 7 = 33.97; RSE 2.203 < 2.267 -> E = key; centred R2 for Model 2 = 1 - 33.97/2,658 = 0.9872; the two outputs checked internally consistent (x-bar ~ 23.3, intercept SE 2.618, Model 2 slope 2.5026, p-values 4.9e-7 and 1.4e-11 reproduced); R's no-intercept R2 is about zero per summary.lm; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016; MAS-I reading), 'Regression Through the Origin', PDF p.1, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; R documentation, stats::summary.lm, Value r.squared: R^2 = 1 - sum R_i^2 / sum (y_i - y*)^2, y* the mean of y_i if there is an intercept and zero otherwise, sha256:52be4406a547f6a905ee71eb8737033c90e339e8ff7147af116cb4b2d6376c2c — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.lm.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
