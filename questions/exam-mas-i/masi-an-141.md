---
id: "masi-an-141"
exam: "Exam MAS-I"
topic: "High-Dimensional Data"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/High-Dimensional+Data
  - Concepts/Regularization
  - Concepts/Cross-Validation
  - Concepts/AIC
  - Concepts/R-Squared
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:913100277d698184d3e226b024d926077c949816bfb9201ecad21f06caf45bef
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-141.md
---

An insurer has 300 policies, each described by 500 telematics features, and a continuous loss measure as the response.

Determine which of the following statements are true.

- I. A least squares regression on all 500 features fits the 300 training responses exactly, even if no feature is related to the response.
- II. A lasso, with its penalty chosen by cross-validation, can still be fitted and its prediction error estimated.
- III. AIC remains a reliable way to compare the candidate least squares models, because it penalizes the number of parameters.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I — True.** With more coefficients than observations ($p \ge n$), least squares can pass through every training point, so the residual sum of squares is 0 and $R^2 = 1$ whatever the data — including features that are pure noise. The perfect fit is evidence of nothing.

**II — True.** Less flexible methods are what work when $p > n$. The lasso's penalty shrinks coefficients (setting many to exactly zero), so the fit is defined and does not interpolate the data, and cross-validation gives an honest estimate of its prediction error and a way to choose the penalty.

**III — False.** AIC (like $C_p$ and BIC) needs an estimate of the error variance,

$$
\hat{\sigma}^2 = \frac{\text{RSS}}{n - p - 1}
$$

and once $p$ approaches $n$ that estimate collapses toward zero (and is undefined at $p + 1 \ge n$). The penalty for parameters cannot repair a variance estimate that is itself broken, so these criteria are unreliable in high dimensions.

The true statements are I and II. The answer is **B**.

**Why not the others**

- **A** — misses II, treating every method as broken when $p > n$; only the unpenalized, in-sample measures are.
- **C** and **D** — accept III, assuming a parameter penalty is enough when the variance estimate it relies on has failed.
- **E** — the true set, I and II, is option B.
