---
id: "masi-an-161"
exam: "Exam MAS-I"
topic: "Polynomial Regression"
learning_objective: "Extended Linear Models"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Polynomial+Regression
  - Concepts/Ordinary+Least+Squares
  - Concepts/Linear+Regression
answer: "E"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:80518d251bfcee79fda0a9cda76ac8d5cab656569bf3c8a4d85ad8fb4c65ffbe
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §7.1 Polynomial Regression, PDF pp.298-299 (a linear model in x, x^2, ..., x^d fitted by least squares; d above 3 or 4 unusual, strange shapes near the boundary; pointwise variance l0' C l0 and fit +/- 2 SE), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-161.md
---

An actuary models average claim severity as a degree-4 polynomial in vehicle age, for vehicles aged 0 to 20 years, and is considering raising the degree to 12. Which of the following statements is correct?

- A) The fitted curve is non-linear in age, so its coefficients must be found by iterative non-linear least squares rather than ordinary least squares
- B) Each power of age adjusts the curve locally, so unusual severities among the oldest vehicles leave the fit for new vehicles unchanged
- C) The coefficient on age cubed is the change in expected severity for a one-year increase in age, holding age and age squared fixed
- D) The pointwise standard error of the fitted curve is the same at every age, because all ages share one coefficient covariance matrix
- E) Raising the degree to 12 cannot increase the training RSS, but the curve is likely to swing erratically near ages 0 and 20

## Explanation

A degree-$d$ polynomial is an ordinary linear model in the predictors $x, x^2, \dots, x^d$. The degree-4 model is nested in the degree-12 model (set the extra coefficients to zero), so least squares on the larger model can do no worse on the training data. But a high-degree polynomial is very flexible and imposes one *global* shape, which typically produces wild swings near the boundaries of the data, where there are few observations to pin it down. ISLR notes that a degree above 3 or 4 is unusual for this reason. The answer is **E**.

**Why not the others**

- **A** — confuses non-linear in $x$ with non-linear in the coefficients. The model is linear in $\beta_0, \dots, \beta_d$, so ordinary least squares fits it directly.
- **B** — describes a local method (a step function or a spline). A polynomial is global: changing data at one end moves every coefficient and so the whole curve.
- **C** — age, age squared and age cubed cannot change separately, so "holding the others fixed" has no meaning; the coefficients are rarely of interest in themselves, only the fitted function.
- **D** — the variance of $\hat f(x_0)$ is $\ell_0^\top\hat{\mathbf C}\,\ell_0$ with $\ell_0 = (1, x_0, \dots, x_0^d)$, which depends on $x_0$ and is typically largest near the ends of the age range.
