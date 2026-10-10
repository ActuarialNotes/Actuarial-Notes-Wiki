---
target: questions/exam-mas-i/masi-an-172.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: mean 8.3, sum of squared deviations 0.24, theta = 5(0.24)/0.25 = 4.80 = key; (b) theta: A 4.80, B 5.93, C 6.40, D 4.80 -> C = key; powers 0.391/0.470/0.501 and F(0.95; 2, 12) = 3.885 reproduced (rank 5); noncentrality = quadratic form at the means (Levine p.4); key present among options/answer form valid; tags and learning_objective checked
- sources_checked: Levine, STAT 517 (Purdue) Lecture 24 'Noncentral chi^2 and F-distributions' (Hogg-Craig notation), PDF pp.2-5 (sum X_i^2/sigma^2 ~ chi-square_n(sum mu_i^2/sigma^2); noncentrality = the quadratic form evaluated at the means / sigma^2; noncentral F), sha256:f84259546359e3b92d9a0e6f2de41a7f4b445a3063739fdbefe1047f5a9214ae — https://www.stat.purdue.edu/~mlevins/docs/stat517/Lecture24_STAT517.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7.2 Scheffe's method (all contrasts; C-hat +/- sqrt((r-1) F_{alpha; r-1, N-r}) s_C, s_C^2 = sigma-hat^2 sum c_i^2/n_i), sha256:25e822151f4f779425f69dea32f1f44450a2355e22e576bfc43dbbcd8db2e532 — https://www.itl.nist.gov/div898/handbook/prc/section4/prc472.htm; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
