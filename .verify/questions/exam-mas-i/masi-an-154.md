---
target: questions/exam-mas-i/masi-an-154.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: fitting models TU+UY (6.1 < 9.488) and TU+TY+UY; TY drop 3.8 on 2 df n.s., UY 25.4 on 1 df, TU 16.7 on 2 df significant -> TU+UY, T and Y conditionally independent given U -> B = key; every model's df recounted from its parameters (7, 6, 5, 4, 3, 2); key present among options/answer form valid; tags and learning_objective checked
- sources_checked: Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Ch.5 Log-Linear Models for Contingency Tables, PDF pp.3-5 (independence test on (I-1)(J-1) d.f.; multinomial and Poisson models give the same fitted values and test) and pp.13-14 (block independence SE + P; conditional independence), sha256:b98785861711e5e1355ef6f0f2d60e0f655b512c68dc73f295953527563444d2 — https://grodri.github.io/glms/notes/c5.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
