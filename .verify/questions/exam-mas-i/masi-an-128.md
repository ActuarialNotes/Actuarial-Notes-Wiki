---
target: questions/exam-mas-i/masi-an-128.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: (a) 9.2/3.8 = 2.421 -> 2.42; (b) Model 1 ratios 1.30, 1.08, 1.00, 0.94, 0.85, Model 2 1.06, 0.98, 1.02, 0.99, 1.02 -> B; (c) sample answer's 30%/15% figures reproduced; Model 1 totals 30.0 = 30.0 (A's 'exactly 1' true); criteria = Monograph §7.2.1 accuracy and lift; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §7.2.1 Simple Quantile Plots, PDF p.87 (sort by predicted, equal-exposure quantiles, actual vs predicted; criteria predictive accuracy, monotonicity, vertical distance between first and last quantiles = lift), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
