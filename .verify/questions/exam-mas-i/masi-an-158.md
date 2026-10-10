---
target: questions/exam-mas-i/masi-an-158.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: fraud 0.05 x 0.40 x 0.65 x 0.70 = 0.0091, legitimate 0.95 x 0.12 x 0.85 x 0.30 = 0.02907, posterior 0.2384 -> C = key; distractors 0.0091 (A), 0.149 (B), odds 0.313 (D), no priors 0.856 (E) recomputed; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §4.4 Generative Models for Classification, PDF pp.151-167 (logistic regression models Pr(Y=k|X=x) directly; QDA discriminant (4.28) quadratic in x incl. log pi_k, Kp(p+1)/2 covariance parameters PDF p.163; naive Bayes (4.29)-(4.30), qualitative predictor estimated by class proportions PDF pp.165-166), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
