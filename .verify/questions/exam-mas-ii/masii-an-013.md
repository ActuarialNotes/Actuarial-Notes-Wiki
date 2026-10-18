---
target: questions/exam-mas-ii/masii-an-013.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind recomputation in Python before reading the key; every distractor's stated reasoning reproduced; explanation worked line by line; wiki_link targets exist (spaces as +) and sit on Exam MAS-II (CAS).md; topic/learning_objective match the exam page domain; format per question-writer formats.md; validate_content.py clean
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §10.1, PDF pp.411-413: parameters beta0..betaK and w10..wKp all estimated; Fig.10.1 caption 'these Ak are not directly observed. The functions hk(.) are not fixed in advance, but are learned during the training'; without a nonlinear g 'the model f(X) in (10.1) would collapse into a simple linear model', sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Counts from (10.1): K(p+1) = 10 x 7 = 70 and K+1 = 11. All three true, key E as formats.md requires.
