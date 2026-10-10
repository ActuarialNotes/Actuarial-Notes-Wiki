---
target: questions/exam-mas-i/masi-an-171.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: E = 5 + 3 = 8, Var = 2(5 + 2 x 3) = 22 -> C = key; Hogg's full-sum convention per Levine Lecture 24; distractors (half-sum convention etc.) recomputed; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: Levine, STAT 517 (Purdue) Lecture 24 'Noncentral chi^2 and F-distributions' (Hogg-Craig notation), PDF pp.2-5 (sum X_i^2/sigma^2 ~ chi-square_n(sum mu_i^2/sigma^2); noncentrality = the quadratic form evaluated at the means / sigma^2; noncentral F), sha256:f84259546359e3b92d9a0e6f2de41a7f4b445a3063739fdbefe1047f5a9214ae — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture24_STAT517.pdf; Wikipedia, 'Noncentral chi-squared distribution', infobox mean k + lambda, variance 2(k + 2 lambda), lambda = sum mu_i^2 for unit-variance normals; 'some references define lambda in other ways, such as half', sha256:b48e021f2a4462eed6b3d285386a4b0ada1e3bf20fc52a1e5f26f997218159c3 — https://en.wikipedia.org/wiki/Noncentral_chi-squared_distribution; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
