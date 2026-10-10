---
target: questions/exam-mas-i/masi-an-168.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: delta D = 18.8; df 2 + (4-1)(3-1) = 8; 17.535 < 18.8 < 20.090 -> p in (0.010, 0.025), exact 0.016 -> C = key; distractor df 2, 7, 9, 15 rows read from the stem table; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Ch.5 Log-Linear Models for Contingency Tables, PDF pp.3-5 (independence test on (I-1)(J-1) d.f.; multinomial and Poisson models give the same fitted values and test) and pp.13-14 (block independence SE + P; conditional independence), sha256:b98785861711e5e1355ef6f0f2d60e0f655b512c68dc73f295953527563444d2 — https://grodri.github.io/glms/notes/c5.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §6.1.3 and §6.2.1, PDF pp.74-75 (deviance comparisons need identical data, missing values dropped by software; nested models and F = (D_S - D_B)/(# added parameters x phi-hat_B)), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
