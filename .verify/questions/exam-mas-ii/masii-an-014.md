---
target: questions/exam-mas-ii/masii-an-014.md
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
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted PDF, §10.7-10.7.1 eqs.(10.25)-(10.29), PDF pp.441-443: R(theta) = 1/2 sum (y - f)^2; theta <- theta - rho grad R (10.27); dR_i/dbeta_k = -(y_i - f(x_i)) g(z_ik) (10.29); 'a fraction of that residual gets attributed to each of the hidden units', sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf
- note: Recomputed: gradient -(1.2)(1.5) = -1.8; 0.6 + 0.18 = 0.78, option C. With the gradient 0.42 (A); no A2 0.72 (B); no 1/2 0.96 (D); no rho 2.40 (E).
