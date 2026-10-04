---
id: "masi-sample-q2"
exam: "Exam MAS-I"
topic: "Bias-Variance Tradeoff"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Bias-Variance+Tradeoff
  - Concepts/Test+Error
  - Concepts/Mean+Square+Error
answer: "D"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1b9bc6f4006148613ebb8d89ba1aee319a70ba39935194a5247a2771e2dd2b7d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-sample-002.md
---

You want to fit a cubic spline to a large dataset and need to determine the number of knots to use. Below is a chart of four statistics from this model valued for various numbers of knots:

![Line chart of four statistics against Number of Knots. The horizontal axis has ticks at 2, 5, 15 and 25 knots; the vertical axis is unlabelled and runs from 0.0 to 2.5. Each line is labelled with its letter at its right end. W, a dash-dot line, is U-shaped: about 1.3 at 2 knots, dipping to about 1.13 at 5, back to about 1.3 at 15, and rising to about 1.9 at 25. X, a solid line, decreases throughout: 1.0 at 2 knots, about 0.95 at 5, about 0.8 at 15 and about 0.4 at 25. Y, a dotted line, increases throughout: about 0.2 at 2 knots, about 0.25 at 5, about 0.5 at 15 and about 1.2 at 25. Z, a dashed line, decreases and levels off: 1.0 at 2 knots, about 0.78 at 5, about 0.7 at 15 and about 0.6 at 25. X and Z start together at 1.0; between 15 and 25 knots X drops below Z and Y rises above both.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/masi-sample-q2-knots-chart.png)

Determine which set of statistics below best describes each line.

- A) W is Test MSE, X is Variance, Y is Squared Bias, Z is Train MSE
- B) W is Variance, X is Squared Bias, Y is Test MSE, Z is Train MSE
- C) W is Train MSE, X is Test MSE, Y is Variance, Z is Squared Bias
- D) W is Test MSE, X is Train MSE, Y is Variance, Z is Squared Bias
- E) W is Variance, X is Train MSE, Y is Test MSE, Z is Squared Bias

## Explanation

CAS's solution starts from what a knot does: "All else equal, a spline with more knots will be more flexible, and allow the model to better fit the training data." So read the chart left to right as increasing flexibility, and match each statistic to the way it moves as flexibility grows:

- "Variance increases with flexibility" → **Line Y**, which climbs steadily from about 0.2 at 2 knots to about 1.2 at 25.
- "Bias squared and Train MSE both decrease with flexibility" → **Lines X and Z**, which both fall from 1.0 at 2 knots, X to about 0.4 and Z to about 0.6.
- "Test MSE generally exhibits a 'U' shaped behavior" → **Line W**, which dips from about 1.3 to about 1.13 at 5 knots and then rises to about 1.9 at 25.

Only C and D call Y the variance, and C calls W the training MSE, so "only answer D meets these conditions."

CAS adds a second check, which also tells X from Z: "Test MSE is the sum of Variance + Bias Squared + Irreducible Error, and only Line W can be the sum of two of the other values." That is the decomposition of the expected test MSE,

$$
E\left[\left(y_0 - \hat{f}(x_0)\right)^2\right] = \text{Var}\left(\hat{f}(x_0)\right) + \left[\text{Bias}\left(\hat{f}(x_0)\right)\right]^2 + \text{Var}(\epsilon)
$$

Read off the chart, W sits about 0.1 — the irreducible error $\text{Var}(\epsilon)$ — above $Y + Z$ at every labelled number of knots:

| Knots | Y (variance) | Z (squared bias) | Y + Z | W (test MSE) |
|---|---|---|---|---|
| 2 | ≈ 0.2 | ≈ 1.0 | ≈ 1.2 | ≈ 1.3 |
| 5 | ≈ 0.25 | ≈ 0.78 | ≈ 1.03 | ≈ 1.13 |
| 15 | ≈ 0.5 | ≈ 0.7 | ≈ 1.2 | ≈ 1.3 |
| 25 | ≈ 1.2 | ≈ 0.6 | ≈ 1.8 | ≈ 1.9 |

$Y + X$ does not track W that way: it is about 1.2 at 2 knots and about 1.6 at 25, so its gap to W grows from about 0.1 to about 0.3. Z is the squared bias and X the training MSE, as D says.

The answer is **D**.
