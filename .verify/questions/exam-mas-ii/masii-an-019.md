---
target: questions/exam-mas-ii/masii-an-019.md
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
- sources_checked: Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §7.2.1 Simple Quantile Plots, printed pp.77-78 (PDF 87-88): steps 1-6 incl. 'Compare the two quantile plots'; criteria predictive accuracy, monotonicity, vertical distance; Figure 22 worked comparison, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Recomputed: current plan errors -0.10, -0.08, +0.05, +0.02, +0.10; GLM within 0.04; GLM actuals monotone, current reverses at Q3; lifts 2.431 vs 1.500. Key E follows Goldburd's three criteria; B contradicted by step 6.
