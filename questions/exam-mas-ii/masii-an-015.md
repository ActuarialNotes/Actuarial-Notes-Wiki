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
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b04587134a9ef5b8e3d7d46c421e4e6c735cd5fd49087df1660b6504213b2910
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §10.5 Elastic Net GLMs, printed pp.101-104 (PDF 111-114), Eq.27 and footnote 27, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS, Exam MAS-II Content Outline 2026 (MASII_CO_S_2026 v06 2026_1_13), pp.3-4 Domain C tasks and readings, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 1
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
