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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bafda08ae8a19cff3bbd8bed1212230221f873dfec9ef570503c0a238077de7d
  sources: []
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
