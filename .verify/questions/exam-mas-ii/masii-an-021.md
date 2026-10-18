---
target: questions/exam-mas-ii/masii-an-021.md
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
- sources_checked: Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §3.2 Gini Index (for Lift), PDF pp.4-7: aggregate by predicted loss cost; x cumulative exposure, y cumulative loss; G = 1 - sum (x_j - x_(j-1))(y_(j-1) + y_j), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §7.2.4 The Gini Index, printed pp.80-81 (PDF 90-91): twice the area between the Lorenz curve and the line of equality, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Recomputed: x = 0.2, 0.5, 0.7, 0.9, 1.0; y = 0.04, 0.16, 0.30, 0.50, 1.00; sum 0.470; G = 0.530, option D. 0.235 (A), 0.265 (B), 0.470 (C), 0.765 (E) as stated.
