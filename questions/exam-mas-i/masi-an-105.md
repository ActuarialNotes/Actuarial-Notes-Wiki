---
id: "masi-an-105"
exam: "Exam MAS-I"
topic: "Predictor Variable"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Predictor+Variable
  - Concepts/Multicollinearity
  - Concepts/Generalized+Linear+Model
  - Concepts/Severity
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c1b547899855c07dab5620d984dc22d73ce2edfdb2a90028a2805a65ac276871
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-105.md
---

In an auto physical damage book, older vehicles are worth much less than newer ones. A one-way review shows that average claim severity falls steadily with vehicle age. An actuary then fits a Gamma GLM with a log link for severity using both vehicle age and vehicle value as predictors. Vehicle value's coefficient is positive, and vehicle age's coefficient is **positive** and significant.

Which statement best explains the positive vehicle-age coefficient?

- A) It must be an error, since a coefficient's sign should match the one-way relationship with the response
- B) It measures the effect of age with value held fixed; the one-way decline reflects older vehicles' lower values
- C) It shows the predictors are uncorrelated, since the model assumes its independent variables are independent
- D) It is caused by collinearity, which always reverses a coefficient's sign, so the true age effect is negative
- E) It shows vehicle age should be categorical, since a continuous predictor cannot reverse its one-way trend

## Explanation

In a model with several predictors, each coefficient is the effect of its predictor **holding the others fixed**. Here the two predictors are strongly (negatively) correlated, so the one-way view of vehicle age mixes two effects: older vehicles are worth less, and lower-valued vehicles have smaller claims. Once value is in the model, the age coefficient measures what age does *among vehicles of the same value* — and an older vehicle of a given value can produce larger claims (parts harder to source, more repair labour for the same value). The one-way decline is mostly vehicle value acting through its correlation with age. The answer is **B**.

**Why not the others**

- **A** — a multivariate coefficient answers a different question from a one-way average; when predictors are correlated their signs can legitimately differ, which is why a multivariate model is needed.
- **C** — "independent variable" names the role, not a statistical property; insurance predictors are almost never independent of each other, and the model does not assume they are.
- **D** — collinearity inflates a coefficient's variance (by the VIF), making it unstable; it does not systematically reverse its sign, and a significant estimate is not evidence the true effect is the opposite.
- **E** — how age is coded changes the *shape* of its effect, not the fact that it is measured net of vehicle value; a categorical age could show the same reversal.
