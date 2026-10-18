---
target: questions/exam-mas-ii/masii-an-009.md
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
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §8.2.1 Out-of-Bag Error Estimation, PDF pp.350-351: about two-thirds of observations per tree, 'around B/3 predictions'; 'with B sufficiently large, OOB error is virtually equivalent to leave-one-out cross-validation error'; OOB error 'a valid estimate of the test error', sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: I and II are ISLR's statements; III contradicts them (no held-out set). Key B. (1-1/n)^n -> e^-1 = 0.368 checked.
