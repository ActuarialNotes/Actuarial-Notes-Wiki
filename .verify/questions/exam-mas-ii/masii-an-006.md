---
target: questions/exam-mas-ii/masii-an-006.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind recomputation in Python before reading the key; every distractor's stated reasoning reproduced; explanation worked line by line; wiki_link targets exist (spaces as +) and sit on Exam MAS-II (CAS).md; topic/learning_objective match the exam page domain; format per question-writer formats.md; validate_content.py clean
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §6.2.2 Penalized Measures of Fit, printed pp.66-67 (PDF 76-77): AIC = -2 log-likelihood + 2p; BIC = -2 log-likelihood + p log(n), n the number of data points, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Recomputed: ln 400 = 5.9915; AIC 2,018.0 / 2,008.0 / 2,002.0 (M3); BIC 2,033.97 / 2,031.95 / 2,037.92 (M2); option A. log10 variant gives 2,020.4 / 2,011.6 / 2,007.4 (C) as stated. West, the assigned Domain B reading, is a commercial book and was not reached; the stem's 'fitted by maximum likelihood' avoids the REML caveat. Goldburd Ch.6 is not a MAS-II assignment (Ch.7 only) but defines both criteria as used.
