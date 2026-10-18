---
target: questions/exam-mas-ii/masii-an-016.md
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
- sources_checked: Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §4.1 Tables 6-7, PDF p.8: specificity TN/N; sensitivity TP/P; precision TP/P*; negative predicted value TN/N*, sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf
- note: Recomputed: TP 50, FN 30, FP 70, TN 850; specificity 850/920 = 0.924, option D. Precision 0.417 (A), sensitivity 0.625 (B), accuracy 0.900 (C), NPV 0.966 (E) as labelled in Salis Table 7.
