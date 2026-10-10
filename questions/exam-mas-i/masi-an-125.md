---
id: "masi-an-125"
exam: "Exam MAS-I"
topic: "Added Variable Plot"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Added+Variable+Plot
  - Concepts/Linear+Regression
  - Concepts/Residual
answer: "A"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:bafda08ae8a19cff3bbd8bed1212230221f873dfec9ef570503c0a238077de7d
  sources:
    - "Wikipedia, 'Partial regression plot' (citing Velleman & Welsch 1981), Properties: least squares fit has intercept 0 and slope beta_i; its residuals equal the full model's; used to identify high-leverage and influential points; distinct from partial residual plots, sha256:5e487cf1309ebc972337649354fe46b8d2a604bdc44dce7534091ed5683fec72 — https://en.wikipedia.org/wiki/Partial_regression_plot"
    - "StataCorp, Stata Base Reference Manual, regress postestimation diagnostic plots, avplot Remarks, PDF p.5 (same coefficient and SE as in the original regression; coordinates cannot be used to identify functional form, or not well), sha256:2b6a9b898c73d0657d3ce7fbf18a7a23c507d01ad9c1d0543cf7689dc6aa734f — https://www.stata.com/manuals/rregresspostestimationdiagnosticplots.pdf"
    - "Fox & Weisberg, R package 'car' reference manual, avPlots 'Added-Variable Plots' (also called partial-regression plots) PDF p.11; mmps 'Marginal Model Plotting' PDF p.89 (response vs a linear combination u of the regressors, a smooth of the data and a smooth of the fitted values on u), sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.3.3 Potential Problems, PDF pp.107-112 (outliers vs high-leverage points; collinearity, correlation matrix, VIF), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-125.md
---

A loss ratio $Y$ is regressed on three predictors $x_1$, $x_2$ and $x_3$ by least squares. To build the added variable plot for $x_3$, the analyst regresses $Y$ on $x_1$ and $x_2$ and keeps the residuals $e_Y$, regresses $x_3$ on $x_1$ and $x_2$ and keeps the residuals $e_{x_3}$, and plots $e_Y$ against $e_{x_3}$.

Which statement about this plot is correct?

- A) The least squares line through it has intercept zero and slope equal to the coefficient of $x_3$ in the full model
- B) The least squares line through it has slope equal to the coefficient from regressing $Y$ on $x_3$ alone
- C) Its horizontal axis is $x_3$ itself, so curvature in it is the best guide to the transformation $x_3$ needs
- D) Its vertical axis holds the residuals of the full three-predictor model, so it repeats the residual plot
- E) A point far from zero on its horizontal axis has a large residual, so it is an outlier in the response

## Explanation

Both $e_Y$ and $e_{x_3}$ are residuals from regressions with an intercept, so each averages zero and the line through the plot passes through the origin. By the Frisch–Waugh result, regressing $e_Y$ on $e_{x_3}$ gives

$$
\text{slope} = \frac{\sum e_{x_3}\, e_Y}{\sum e_{x_3}^2} = \hat{\beta}_3
$$

the coefficient of $x_3$ in the full model, and the residuals around that line are the full model's residuals. The answer is **A**.

**Why not the others**

- **B** — the slope of $Y$ on $x_3$ alone is the *marginal* effect, which still contains whatever $x_3$ shares with $x_1$ and $x_2$. The plot shows the *adjusted* effect.
- **C** — the horizontal axis is the part of $x_3$ not explained by $x_1$ and $x_2$, not $x_3$. The plot is a weak guide to functional form; a partial residual plot is the tool for choosing a transformation.
- **D** — the vertical axis is the residual of $Y$ on $x_1$ and $x_2$ only. The *deviations from the fitted line* in the plot equal the full model's residuals, but the plotted values do not.
- **E** — distance along the horizontal axis measures **leverage** (an unusual $x_3$ given the other predictors), not a large residual. A point is an outlier when it sits far from the fitted line.
