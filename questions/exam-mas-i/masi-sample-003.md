---
id: "masi-sample-q3"
exam: "Exam MAS-I"
topic: "Cross-Validation"
learning_objective: "Extended Linear Models"
difficulty: easy
type: multiple-choice
wiki_link:
  - Concepts/Cross-Validation
  - Concepts/Test+Error
  - Concepts/Bias-Variance+Tradeoff
answer: "A"
points: 2
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:07b8f9883fd9b2e0607738c9a5ecf8ea8b26d244d98f62440bccce96f9a92a84
  sources:
    - "CAS Exam MAS-I Sample Questions (as of 11/21/2017), Q3 and official solution, PDF pp.5-6, sha256:6f146ad2b2d0fd72746c551376572045246c317ae0ca8e189e3ffeffa79670de — https://www.casact.org/sites/default/files/2021-04/MASI_Sample_Questions.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), s.5.1.2 PDF p.210 ('tends not to overestimate the test error rate as much as the validation set approach does'; training set 'typically around half the size'), s.5.1.3 PDF p.212 ('LOOCV is a special case of k-fold CV in which k is set to equal n'), s.5.1.4 PDF pp.214-215 (LOOCV has higher variance than k-fold CV with k < n; outputs highly (positively) correlated), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), p.5 Domain C tasks 1-9 and p.6 text references (James et al. Ch 1, 2 excl. 2.2.3, 3-7 as listed), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-sample-003.md
---

You are given the following statements about different resampling methods:

- I. Leave-one-out cross-validation (LOOCV) is a special case of $k$-fold cross-validation
- II. $k$-fold cross-validation has higher variance than LOOCV when $k < n$
- III. LOOCV tends to overestimate the test error rate in comparison to validation set approach

Determine which of the above statements are correct.

- A) I only
- B) II only
- C) III only
- D) I, II, and III
- E) The correct answer isn't given by (A), (B), (C), or (D)

## Explanation

Take the statements one at a time, as CAS's solution does.

**I. True.** "LOOCV is just $k$-fold cross-validation where $k = n$": each of the $n$ folds holds out a single observation. James et al. (§5.1.3) say the same — "LOOCV is a special case of $k$-fold CV in which $k$ is set to equal $n$."

**II. False.** It is the other way round: "LOOCV has higher variance than $k$-fold validation, for $k < n$, because of the high degree of correlation in the training data sets." LOOCV averages the test errors of $n$ fits trained on almost identical sets of observations, so those errors are highly positively correlated, and the mean of highly correlated quantities has a higher variance than the mean of less correlated ones (James et al., §5.1.4).

**III. False.** "Validation set approach tends to overestimate the test error rate more than LOOCV, which is one of its drawbacks." The validation set approach fits on a training set of typically around half the data, LOOCV on $n - 1$ observations, so LOOCV "tends not to overestimate the test error rate as much as the validation set approach does" (James et al., §5.1.2).

Only statement I is correct, so the answer is **A**.
