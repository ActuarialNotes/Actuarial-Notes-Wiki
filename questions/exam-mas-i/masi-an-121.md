---
id: "masi-an-121"
exam: "Exam MAS-I"
topic: "Marginal Model Plot"
learning_objective: "Extended Linear Models"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Marginal+Model+Plot
  - Concepts/Generalized+Linear+Model
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:4d880aeff9aca34e424f748362f69e6b9402a3680a25735242cbb5ffad4840ae
  sources:
    - "Fox & Weisberg, R package 'car' reference manual, avPlots 'Added-Variable Plots' (also called partial-regression plots) PDF p.11; mmps 'Marginal Model Plotting' PDF p.89 (response vs a linear combination u of the regressors, a smooth of the data and a smooth of the fitted values on u), sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf"
    - "Wikipedia, 'Partial regression plot' (citing Velleman & Welsch 1981), Properties: least squares fit has intercept 0 and slope beta_i; its residuals equal the full model's; used to identify high-leverage and influential points; distinct from partial residual plots, sha256:5e487cf1309ebc972337649354fe46b8d2a604bdc44dce7534091ed5683fec72 — https://en.wikipedia.org/wiki/Partial_regression_plot"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §6.3.1, PDF pp.78-79 (q-q plot of deviance residuals: theoretical quantiles on x, sample on y; right-most points above the line = more skewed than the assumed distribution; inverse Gaussian as the next try for a gamma model), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26 Scatter Plot: Y vs X; linear or non-linear relationship, variation in Y changing with X, outliers, sha256:e5847cce6c0469fb68a2ad3ad38688f0753b680a308e09cf4c798f23b6bf57ac — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-121.md
---

A modeler fits a gamma GLM with a log link to claim severity, using driver age, vehicle class and territory as predictors, and then draws a marginal model plot against driver age.

Which description of that plot, and of how it is read, is correct?

- A) Residuals against driver age; a band with no pattern around zero means the mean is specified correctly
- B) Severity against driver age, with one smooth of the data and one of the fitted values; good fit where they coincide
- C) Severity adjusted for the other predictors against driver age adjusted likewise; its slope is driver age's coefficient
- D) Ordered residuals against quantiles of the assumed distribution; a straight line means the distribution is right
- E) Driver age's fitted component plus the residuals, against driver age; its curve shows the transformation driver age needs

## Explanation

A marginal model plot keeps the **response** on the vertical axis and a predictor (or the fitted values / linear predictor) on the horizontal axis. Two curves are overlaid:

$$
\begin{align*}
\text{data smooth} &: \text{a smooth of the observed } y \text{ against driver age} \\
\text{model smooth} &: \text{a smooth of the fitted } \hat{\mu} \text{ against driver age}
\end{align*}
$$

If the model reproduces how severity moves with driver age, the two curves lie on top of each other; where they separate, the model is missing structure in that direction. The answer is **B**.

**Why not the others**

- **A** — that is a residual plot. A marginal model plot compares two curves on the response scale, not residuals against zero.
- **C** — that is an added variable (partial regression) plot, whose least squares slope equals the full-model coefficient.
- **D** — that is a QQ plot, which checks the assumed distribution of the residuals, not the mean against a predictor.
- **E** — that is a partial residual (component plus residual) plot, the tool for choosing a transformation of one predictor.
