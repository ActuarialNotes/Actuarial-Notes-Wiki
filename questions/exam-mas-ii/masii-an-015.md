---
id: "masii-an-015"
exam: "Exam MAS-II"
topic: "Extended Linear Model"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Extended+Linear+Model
  - Concepts/Regularization
  - Concepts/Generalized+Linear+Model
answer: "A"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b04587134a9ef5b8e3d7d46c421e4e6c735cd5fd49087df1660b6504213b2910
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-015.md
---

An actuary building a frequency model with many candidate rating variables replaces an ordinary Poisson GLM with an elastic net GLM. The elastic net estimates the coefficients by minimizing the deviance plus $\lambda$ times a penalty that is a weighted average of the sum of absolute coefficients and half the sum of squared coefficients.

Determine which of the following statements are true.

- I. Raising $\lambda$ shrinks the coefficients toward zero, and some less important predictors can be given coefficients of exactly zero.
- II. The intercept is penalized like every other coefficient, so raising $\lambda$ also pulls the overall predicted frequency toward zero.
- III. Compared with an ordinary GLM, the elastic net is more prone to unstable, very large coefficients when predictors are highly correlated.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

Regularization fits the same model structure as the GLM — same distribution, link and linear predictor — but constrains the size of the coefficients.

- **I — true.** $\lambda$ sets the severity of the penalty: raising it forces the coefficients toward zero, and the absolute-value (lasso) part can set some to exactly zero, removing those predictors. At $\lambda = 0$ the elastic net is the ordinary GLM, so tuning $\lambda$ by cross-validation can recover it if it is best.
- **II — false.** The intercept is excluded from the penalty. The overall level is left to fit the data; only the predictors' effects are shrunk.
- **III — false.** It is the other way round: the penalty keeps coefficients from "blowing up" when predictors are highly correlated, typically keeping one or two of a correlated group with moderate coefficients.

I only, so the answer is **A**.

**Why not the others**

- **B** and **D** — count statement II as true; the intercept is not penalized.
- **C** and **D** — count statement III as true, reversing the elastic net's advantage with correlated predictors.
- **E** — would need all three true; II and III are false.
