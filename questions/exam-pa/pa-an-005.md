---
id: "pa-an-005"
exam: "Exam PA"
topic: "Bias"
learning_objective: "Predictive Analytics Problem Definition"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Bias
  - Concepts/Variance
  - Concepts/Bias-Variance+Tradeoff
answer: "D"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ee5f1989faae3079b4b2ed6a017395d9f5f8635385cc3f29dc0170ba71687f53
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-005.md
---

An actuary maintains a claim frequency model and refits it each year. Determine which of the following statements are true.

- I. This year's refit gives a territory coefficient of 1.3 where the true value is 1.5, so the estimator of that coefficient has a bias of $-0.2$.
- II. Removing two irrelevant predictors from the model lowers the variance of its predictions, at the cost of some bias.
- III. However much data is collected, no model can have an expected test mean squared error below the variance of the error term.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I is false.** The bias of an estimator is $E[\hat{\theta}] - \theta$, an expected value over repeated samples. One estimate of 1.3 against a true value of 1.5 is a sampling error. The estimator could be unbiased and still miss by 0.2 on this year's data.

**II is true.** Removing irrelevant predictors is variable selection: the model becomes less flexible, so the variance of its predictions over possible training sets falls and its bias may rise. The test error falls when the reduction in variance is larger than the added squared bias.

**III is true.** The expected test MSE at a point is

$$
\text{Var}\big(\hat{f}(x_0)\big) + \left[\text{Bias}\big(\hat{f}(x_0)\big)\right]^2 + \text{Var}(\varepsilon)
$$

The first two terms are at least zero, so the expected test MSE is at least $\text{Var}(\varepsilon)$, the irreducible error.

II and III are true, so the answer is **D**.

**Why not the others**

- **A**, **B** and **C** accept I, treating the error of one estimate as the estimator's bias.
- **A** and **B** also reject III, forgetting that the irreducible error is a floor that more data cannot lower.
- **E** would need a different combination, but II and III are true and I is false.
