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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4d880aeff9aca34e424f748362f69e6b9402a3680a25735242cbb5ffad4840ae
  sources: []
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
