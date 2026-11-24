---
id: "pa-an-028"
exam: "Exam PA"
topic: "Regularization"
learning_objective: "Generalized Linear Models"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Regularization
  - Concepts/Hyperparameter
answer: "A"
points: 1
---

A marketing team asks for a renewal model built from 60 candidate predictors, many of them highly correlated with each other (several credit-based scores and several measures of tenure). The team wants a model that drops the predictors that add little, and wants the coefficients of correlated predictors to be stable rather than swinging wildly between refits. The actuary will fit a penalized logistic GLM with R's `glmnet`.

Which specification best meets both goals?

- A) An elastic net, with `alpha` and $\lambda$ chosen by cross-validation
- B) Ridge regression (`alpha = 0`), with $\lambda$ chosen by cross-validation
- C) An unpenalized logistic GLM ($\lambda = 0$) on all 60 predictors
- D) Ridge regression (`alpha = 0`), with $\lambda$ chosen to minimize the training deviance
- E) The lasso (`alpha = 1`), with $\lambda$ chosen to minimize the training deviance

## Explanation

The elastic net penalty is a weighted average of the lasso and ridge penalties:

$$
\lambda \left[\alpha \sum_{j=1}^{p} \lvert\beta_j\rvert + \frac{1 - \alpha}{2} \sum_{j=1}^{p} \beta_j^{2}\right]
$$

With `alpha` strictly between 0 and 1, its lasso part can set coefficients to exactly 0, which drops predictors, and its ridge part shrinks the coefficients of correlated predictors toward each other, which steadies them. Both hyperparameters are chosen by cross-validation. The answer is **A**.

**Why not the others**

- **B** steadies the correlated coefficients, but ridge regression leaves every coefficient non-zero, so no predictor is dropped.
- **C** applies no penalty. With many highly correlated predictors the unpenalized estimates are large and unstable, which is the problem the team described.
- **D** chooses $\lambda$ by training deviance, which is smallest at $\lambda = 0$, so it returns the unpenalized fit of C. Ridge would also drop nothing.
- **E** has the same flaw: training deviance always favours the most flexible setting, so it picks $\lambda = 0$ and the lasso drops nothing.
