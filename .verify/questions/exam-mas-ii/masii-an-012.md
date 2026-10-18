---
target: questions/exam-mas-ii/masii-an-012.md
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
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §10.1 eqs.(10.1)-(10.5), PDF pp.411-412: f(X) = beta0 + sum beta_k g(w_k0 + sum w_kj X_j); sigmoid (10.4); ReLU g(z) = (z)+ (10.5), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Recomputed: z = 2.0, -2.0, 0.4; f = 0.6 + 1.6 + 0 - 0.6 = 1.60, option E. Sigmoid 0.466 (A); no activation 0.60 (B); no beta0 1.00 (C); no hidden biases 1.50 (D).
