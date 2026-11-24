---
id: "pa-an-029"
exam: "Exam PA"
topic: "Regularization"
learning_objective: "Generalized Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Regularization
  - Concepts/Hyperparameter
  - Concepts/Bias-Variance+Tradeoff
answer: "C"
points: 1
---

An actuary fits a ridge-penalized Poisson GLM for claim frequency with predictors on very different scales: driver age in years, vehicle value in dollars, and annual distance in kilometres.

Determine which of the following statements are true.

- I. As $\lambda$ increases from 0, the training deviance of the fitted model increases.
- II. As $\lambda$ becomes very large, every coefficient, including the intercept, approaches 0, so the fitted frequency approaches $e^0 = 1$ for every policy.
- III. The predictors should be standardized before fitting, because the penalty would otherwise depend on the units each predictor is measured in.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I is true.** At $\lambda = 0$ the fit is the unpenalized one, which has the smallest training deviance. A larger $\lambda$ shrinks the coefficients away from that fit, adding bias, so the training deviance rises. Test deviance, by contrast, is U-shaped in $\lambda$.

**II is false.** The intercept is not penalized, so the overall level of the predictions is still fitted to the data. As $\lambda$ grows the slope coefficients approach 0 and every policy gets nearly the same fitted frequency, but that frequency is set by the intercept fitted to the claims, not fixed at $e^0 = 1$.

**III is true.** Unpenalized estimates are scale equivariant: multiplying a predictor by $c$ multiplies its coefficient by $\frac{1}{c}$. Penalized estimates are not, so vehicle value measured in dollars would be penalized very differently from the same predictor measured in thousands of dollars. Standardizing puts the predictors on one scale first.

I and III are true, so the answer is **C**.

**Why not the others**

- **A** rejects III, missing that the penalty treats a coefficient's size the same whatever its predictor's units.
- **B** and **D** accept II, assuming the penalty shrinks the intercept along with the slopes.
- **E** would need another combination, but I and III are true and II is false.
