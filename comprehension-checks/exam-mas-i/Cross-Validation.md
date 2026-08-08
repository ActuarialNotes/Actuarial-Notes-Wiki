---
concept: "Cross-Validation"
exam: exam-mas-i
topic: "C. Extended Linear Models"
correct: C
---
An analyst screens 200 candidate predictors on the full data set, keeps the 10 most correlated with the response, then runs 10-fold cross-validation on those 10. Why is the reported error too optimistic?

- A) Ten folds is too few for 200 candidates
- B) Correlation is the wrong screening statistic
- C) The screening step already used the held-out rows
- D) The folds should be stratified by the response

<!-- rationale: 0: blames the fold count for a leakage problem · 1: blames the statistic rather than the order of operations · 3: a real refinement, but not what inflates the score here -->
