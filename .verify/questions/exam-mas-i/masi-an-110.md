---
target: questions/exam-mas-i/masi-an-110.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: (a) F = (40.0 - 37.4)/2 / (37.4/24) = 0.834 -> 0.83; (b) F = (52 - 40)/2 / (40/26) = 3.90; (c) 0.83 < 3.403, 3.90 > 3.369 -> C; keys match; wrong entries 0.90, 1.67, 3.85, 7.80 recomputed; F(2,24) and F(2,26) critical values and p = 0.033 reproduced (rank 5); sequential test on the ANCOVA model's residual MS as in Rodriguez Table 2.24; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Ch.2 Linear Models for Continuous Data, §2.8 Analysis of Covariance Models, PDF pp.42-48 (additive model mu_ij = mu + alpha_i + beta x_ij, parallel lines, alpha_1 = 0; dummies for every level add up to the constant; hierarchical anova F for the factor given the covariate on the ANCOVA model's residual mean square; interaction gives different slopes), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
