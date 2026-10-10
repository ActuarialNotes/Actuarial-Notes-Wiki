---
target: questions/exam-mas-i/masi-an-124.md
created: 2026-10-10
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masb
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: blind: a B, b D, c A, d E, e C before reading keys; all five match; tail directions per NIST short/long-tail pages (sample on vertical axis) and Monograph §6.3.1 (right-most points above = more skewed; inverse Gaussian next); key present among options/answer form valid; tags and learning_objective checked
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.21.2 Data Have Short Tails (first few points above the fitted line, last few below), sha256:9cb4290bbb8df4d5770b7cc4780ea9d085e1e1b3f1dd5df902d0179ac2231d51 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp2.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.21.3 Data Have Long Tails (first few points below the fitted line, last few above), sha256:9e1d61f9f67ca884c116bb4f3aae6fadadf4c1437309e14c5337fdb1de906907 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp3.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.21.4 Data Are Skewed Right (quadratic pattern; left skew the mirror image), sha256:c46a60850a78b0125fab63f3fe02cdc1a27df1077315aa3ff8007290fcbdda08 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprp4.htm; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §6.3.1, PDF pp.78-79 (q-q plot of deviance residuals: theoretical quantiles on x, sample on y; right-most points above the line = more skewed than the assumed distribution; inverse Gaussian as the next try for a gamma model), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf
- note: Original vault question (question-writer skill) - no publisher's key. Verified medium, the precedent for vault-written questions (Exam P p-901..p-964): independent blind recomputation (rank 5) agreeing with the key, every distractor and explanation step checked, and each method/fact confirmed against the cited open sources (MAS-I readings ISLR/Larsen where they cover it, otherwise rank-3 open references). wiki_link tags each tested by the question; learning_objective 'Extended Linear Models' is the exam page's Domain C callout title (as on the verified MAS-I paper questions) and the topic sits under Domain C on the page.
