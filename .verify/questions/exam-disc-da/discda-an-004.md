---
target: questions/exam-disc-da/discda-an-004.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv01
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Blind recompute from the stem (key and explanation hidden) gave the keyed answer. Class code = label (nominal); storage type is not statistical type; enters as levels (ISLR §3.3.1) — key C; A imposes a slope across codes (5,287 = 7,398 - 2,111 recomputed); B ordinal requires meaningful order (Siegrist); D counts events. learning_objective matches the DISC-DA page's numbered section title (DISC DA syllabus PDF pp.2-3); wiki_link tags resolve and are U.S./generic pages tested by the stem. Options distinct; explanation arithmetic resolves.
- sources_checked: Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.6 §1 Levels of Measurement (nominal: few operations make sense even if numbers are used; ordinal: only order meaningful), sha256:0af72fbf0202413525cae99e696cfa70014a803d6c5ac7a7dcafd1577742414f — https://www.randomservices.org/random/sample/Introduction.html; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §2.3.5 cylinders stored numeric but treated as qualitative via as.factor, PDF p.61; §3.3.1 dummy variables for qualitative predictors, PDF p.96, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf
- note: Vault-written question (no publisher key): medium per the MAS-I / Exam P precedent.
