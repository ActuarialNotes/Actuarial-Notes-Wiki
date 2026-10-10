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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c1b547899855c07dab5620d984dc22d73ce2edfdb2a90028a2805a65ac276871
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.2 Multiple Linear Regression, PDF p.82 (beta_j is the average effect of a one-unit increase in X_j holding all other predictors fixed), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.3.3 Potential Problems, PDF pp.107-112 (outliers vs high-leverage points; collinearity, correlation matrix, VIF), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §2.9 Correlation Among Predictors, PDF p.37 (the GLM sorts out each variable's unique effect from correlated variables; two-way correlation tables before modeling), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
