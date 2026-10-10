---
id: "masi-an-126"
exam: "Exam MAS-I"
topic: "Added Variable Plot"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Added+Variable+Plot
  - Concepts/Linear+Regression
  - Concepts/Ordinary+Least+Squares
answer: "D"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:7b1674680901157c9eb2d0b6f4e07c27feabe0cef40dc42a7b3e43ef8a413191
  sources:
    - "Wikipedia, 'Partial regression plot' (citing Velleman & Welsch 1981), Properties: least squares fit has intercept 0 and slope beta_i; its residuals equal the full model's; used to identify high-leverage and influential points; distinct from partial residual plots, sha256:5e487cf1309ebc972337649354fe46b8d2a604bdc44dce7534091ed5683fec72 — https://en.wikipedia.org/wiki/Partial_regression_plot"
    - "StataCorp, Stata Base Reference Manual, regress postestimation diagnostic plots, avplot Remarks, PDF p.5 (same coefficient and SE as in the original regression; coordinates cannot be used to identify functional form, or not well), sha256:2b6a9b898c73d0657d3ce7fbf18a7a23c507d01ad9c1d0543cf7689dc6aa734f — https://www.stata.com/manuals/rregresspostestimationdiagnosticplots.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-126.md
---

A linear regression of pure premium $Y$ on driver age, territory index and vehicle symbol $x_3$ is fitted by least squares to seven risk groups. On its own, a simple regression of $Y$ on $x_3$ has slope 1.35.

The added variable plot for $x_3$ has these seven points, where $e_{x_3}$ is the residual from regressing $x_3$ on driver age and territory index, and $e_Y$ is the residual from regressing $Y$ on driver age and territory index:

| Group | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| $e_{x_3}$ | -3 | -2 | -1 | 0 | 1 | 2 | 3 |
| $e_Y$ | -1.6 | -4.8 | 2.0 | 1.4 | 0.2 | -1.4 | 4.2 |

Calculate the coefficient of $x_3$ in the full three-predictor regression.

- A) Less than 0.40
- B) At least 0.40, but less than 0.55
- C) At least 0.55, but less than 0.70
- D) At least 0.70, but less than 0.90
- E) At least 0.90

## Explanation

The least squares line through an added variable plot has intercept zero (both sets of residuals average zero) and slope equal to the full-model coefficient of $x_3$:

$$
\begin{align*}
\sum e_{x_3} e_Y &= (-3)(-1.6) + (-2)(-4.8) + (-1)(2.0) + 0 + (1)(0.2) + (2)(-1.4) + (3)(4.2) \\
&= 22.4 \\
\sum e_{x_3}^2 &= 9 + 4 + 1 + 0 + 1 + 4 + 9 \\
&= 28 \\
\hat{\beta}_3 &= \frac{22.4}{28} \\
&= 0.80
\end{align*}
$$

The coefficient is **0.80**, in range **D**.

**Why not the others**

- **A** — squaring the correlation of the plotted points, $r^2 = 0.35$, measures how tightly they cluster, not the slope.
- **B** — regressing $e_{x_3}$ on $e_Y$ (the axes swapped), $\sum e_{x_3} e_Y / \sum e_Y^2 = 22.4 / 51.2 = 0.4375$.
- **C** — the correlation of the plotted points, $r = 22.4 / \sqrt{28 \times 51.2} = 0.592$, which is unit-free and is not a regression coefficient.
- **E** — the simple-regression slope, 1.35, is the *marginal* effect of $x_3$, which still carries the part of $x_3$'s association with $Y$ that runs through driver age and territory. The added variable plot strips that out.
