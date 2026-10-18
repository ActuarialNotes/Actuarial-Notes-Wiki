---
target: questions/exam-mas-ii/masii-an-017.md
created: 2026-10-18
---

## [F-001] Distractor A calls 2·AUROC − 1 'the Gini index'; the syllabus Gini is the Lorenz-curve one
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- severity: major
- status: open
- locus: Why not the others, A
- claim: '2(0.6875) - 1 = 0.375 is the Gini index, not the AUROC'.
- evidence: Salis §2.1 and §3.2 (PDF pp.2, 4-7, sha256:e952ace6…) define the MAS-II Gini indexes: node purity, and 'Gini index (for lift)' = 1 - sum (x_j - x_(j-1))(y_(j-1) + y_j) on the Lorenz curve. Goldburd §7.3 (printed p.82, PDF 92, sha256:89b203ea…): for logistic models 'a Lorenz curve can be created by sorting the records by predicted probability and graphing cumulative risks against cumulative occurrences ... and a Gini index can be computed from the resulting graph'. Recomputed for these eight claims (sorted ascending, x = share of claims, y = share of frauds): trapezoid sum 0.8125, Gini = 0.1875, not 0.375. A student who learns Gini = 2·AUROC - 1 from this line computes the wrong Gini on a tested measure (C10).
- source_rank: 2
- proposed_action: Delete the Gini clause; keep the pair-count reasoning, which does land in A.
- applied: true
- fingerprint: 952a48675841

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- resolves: F-001
- status: resolved
- note: Clause deleted; A's line now reads 'counting the pairs a non-fraud wins, 5/16 = 0.3125, lands here.' (5/16 = 1 - 11/16 rechecked). Nothing added.

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind recomputation in Python before reading the key; every distractor's stated reasoning reproduced; explanation worked line by line; wiki_link targets exist (spaces as +) and sit on Exam MAS-II (CAS).md; topic/learning_objective match the exam page domain; format per question-writer formats.md; validate_content.py clean
- sources_checked: Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §4.2 Tables 8-12, PDF pp.8-12: ROC points by threshold, trapezoidal AUROC, pair-count form AUROC = (1/2NP) sum n_i(c_(i-1) + c_i), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §7.3, printed p.82 (PDF 92): Gini for a logistic model from the Lorenz curve, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf
- note: Recomputed: 11 of 16 (fraud, non-fraud) pairs ranked correctly, AUROC 0.6875, range C; trapezoids agree. Threshold 0.55 gives accuracy, sensitivity, specificity 0.75 (D) as stated. Re-checked after the F-001 deletion.
