---
target: questions/exam-mas-i/masi-an-106.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: ln 300 = 5.703782; eta = -5.2 + 0.3(5.70378) - 0.2 + 0.05(6) + 0.1(5.70378) = -2.81849; mu = 0.0597 -> C = key; distractors: no interaction 0.0337 (A), as frame 0.0412 (B), no masonry main effect 0.0729 (D), unlogged interaction (E); key present among options/answer form valid; tags and learning_objective checked
- sources_checked: R documentation, stats::glm, offset argument (one or more offset terms, summed); null.deviance and df.null; na.action, sha256:6b9a6fad58fad62386050ceba47abe28e40241544dd71d20df000fc40563d6c3 — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/glm.html; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.6 Offsets, printed pp.17-19 (PDF pp.27-29): an offset is a predictor whose coefficient is constrained to 1, on the linear-predictor scale (logged for a log link); deductible factors offset as ln(factor); multiple offsets added after logging; exposure offset ln(exposures) in a claim-count model, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
