---
target: questions/exam-mas-i/masi-an-170.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: df 5, 60, 60, 5; p ranges (0.02,0.05), (0.01,0.02), one-sided (0.005,0.01), (0.05,0.10) -> CBAD = key; exact 0.043, 0.017, 0.009, 0.090 reproduced (rank 5); wrong entries ACBD, BCAD checked; key present among options/answer form valid; tags and learning_objective checked
- sources_checked: Siegrist, Random, 'Special Properties of Normal Samples', n W^2/sigma^2 ~ chi-square(n); (n-1)S^2/sigma^2 ~ chi-square(n-1), independent of the sample mean; T = (M - mu)/(S/sqrt n) ~ t(n-1); F = (U/j)/(V/k); chi-square(k) mean k, variance 2k, sha256:d9a62017ae3a8488aedac3eceedb15d8b68243ae60894104ab88564ace25ff79 — https://www.randomservices.org/random/sample/Normal.html; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
