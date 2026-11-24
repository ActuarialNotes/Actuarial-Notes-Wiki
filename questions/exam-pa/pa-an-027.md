---
id: "pa-an-027"
exam: "Exam PA"
topic: "Hyperparameter"
learning_objective: "Generalized Linear Models"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Hyperparameter
  - Concepts/Regularization
  - Concepts/Cross-Validation
answer: "C"
points: 1
---

An actuary fits a Poisson lasso for claim frequency over a grid of values of the penalty $\lambda$. Ten-fold cross-validation on the training data gives:

| $\lambda$ | CV deviance | SE | Nonzero coefficients |
| ---: | ---: | ---: | ---: |
| 0.002 | 512.4 | 3.1 | 22 |
| 0.02 | 508.9 | 3.0 | 17 |
| 0.04 | 507.2 | 2.8 | 12 |
| 0.08 | 508.6 | 2.9 | 8 |
| 0.15 | 510.1 | 3.2 | 5 |
| 0.30 | 515.8 | 3.5 | 3 |

The underwriting manager wants the fewest rating variables that predict as well as the best model within the uncertainty of the cross-validation estimate, so the actuary applies the one-standard-error rule. Which value of $\lambda$ is chosen?

- A) 0.02
- B) 0.04
- C) 0.08
- D) 0.15
- E) 0.30

## Explanation

The minimum CV deviance is 507.2, at $\lambda = 0.04$, with standard error 2.8. The threshold is

$$
507.2 + 2.8 = 510.0
$$

The values of $\lambda$ with CV deviance at most 510.0 are 0.02, 0.04 and 0.08. The one-standard-error rule takes the simplest of these, which for a penalty is the largest $\lambda$: **0.08**, with 8 nonzero coefficients against 12 at the minimum. The answer is **C**.

**Why not the others**

- **A** is within the threshold but is the most complex of the three candidates; the rule takes the largest $\lambda$, not the smallest.
- **B** is the minimum CV deviance, the choice without the one-standard-error rule.
- **D** has CV deviance 510.1, just above the threshold of 510.0. It would qualify only if the threshold were built from its own standard error of 3.2 instead of the standard error at the minimum.
- **E** has the fewest variables, but its CV deviance of 515.8 is far above the threshold.
