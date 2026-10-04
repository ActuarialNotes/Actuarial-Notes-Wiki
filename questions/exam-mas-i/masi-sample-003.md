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
---

You are given the following statements about different resampling methods:

I. Leave-one-out cross-validation (LOOCV) is a special case of $k$-fold cross-validation

II. $k$-fold cross-validation has higher variance than LOOCV when $k < n$

III. LOOCV tends to overestimate the test error rate in comparison to validation set approach

Determine which of the above statements are correct.

- A) I only
- B) II only
- C) III only
- D) I, II, and III
- E) The correct answer isn't given by (A), (B), (C), or (D)

## Explanation

Take the statements one at a time, as CAS's solution does.

**I. True.** "LOOCV is just $k$-fold cross-validation where $k = n$": each of the $n$ folds holds out a single observation. James et al. (§5.1.3) say the same — "LOOCV is a special case of $k$-fold CV in which $k$ is set to equal $n$."

**II. False.** It is the other way round: "LOOCV has higher variance than $k$-fold validation, for $k < n$, because of the high degree of correlation in the training data sets." LOOCV averages the test errors of $n$ fits whose training sets differ by one observation, so those errors are highly positively correlated, and the mean of highly correlated quantities has a higher variance than the mean of less correlated ones (James et al., §5.1.4).

**III. False.** "Validation set approach tends to overestimate the test error rate more than LOOCV, which is one of its drawbacks." The validation set approach fits on a training set of typically around half the data, LOOCV on $n - 1$ observations, so LOOCV "tends not to overestimate the test error rate as much as the validation set approach does" (James et al., §5.1.2).

Only statement I is correct, so the answer is **A**.
