---
id: "masi-an-168"
exam: "Exam MAS-I"
topic: "Chi-Squared Distribution"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Chi-Squared+Distribution
  - Concepts/Likelihood+Ratio+Test
  - Concepts/Deviance
  - Concepts/Interaction
  - Concepts/Categorical+Predictor
  - Concepts/p-Value
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5f89e5c0de5b80fa7c36f8202013611e21251769180f27ebc093473ae5910a05
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-168.md
---

Two Poisson GLMs are fitted to claim counts:

- **Model 1:** intercept, territory (4 levels) and vehicle age (continuous). Residual deviance 1,284.6.
- **Model 2:** everything in Model 1, plus vehicle use (3 levels) and the territory × vehicle use interaction. Residual deviance 1,265.8.

Both models use the Poisson dispersion $\phi = 1$. Use this excerpt of the chi-squared table, which gives the value $c$ with $P(\chi^2_{df} \le c) = p$:

| $df$ | $p = 0.950$ | $p = 0.975$ | $p = 0.990$ | $p = 0.995$ |
| :--- | ---: | ---: | ---: | ---: |
| 2 | 5.991 | 7.378 | 9.210 | 10.597 |
| 3 | 7.815 | 9.348 | 11.345 | 12.838 |
| 4 | 9.488 | 11.143 | 13.277 | 14.860 |
| 5 | 11.070 | 12.833 | 15.086 | 16.750 |
| 6 | 12.592 | 14.449 | 16.812 | 18.548 |
| 7 | 14.067 | 16.013 | 18.475 | 20.278 |
| 8 | 15.507 | 17.535 | 20.090 | 21.955 |
| 9 | 16.919 | 19.023 | 21.666 | 23.589 |
| 10 | 18.307 | 20.483 | 23.209 | 25.188 |
| 12 | 21.026 | 23.337 | 26.217 | 28.300 |
| 15 | 24.996 | 27.488 | 30.578 | 32.801 |

Determine the range that contains the p-value of the likelihood ratio test of Model 1 against Model 2.

- A) Less than 0.005
- B) At least 0.005, but less than 0.010
- C) At least 0.010, but less than 0.025
- D) At least 0.025, but less than 0.050
- E) At least 0.050

## Explanation

With $\phi = 1$ the likelihood ratio statistic is the drop in deviance:

$$
\begin{align*}
\Delta D &= 1{,}284.6 - 1{,}265.8 \\
&= 18.8
\end{align*}
$$

Its degrees of freedom are the number of parameters Model 2 adds:

$$
\begin{align*}
\text{vehicle use} &: 3 - 1 = 2 \\
\text{territory} \times \text{vehicle use} &: (4 - 1)(3 - 1) = 6 \\
\text{total} &: 8
\end{align*}
$$

In the $df = 8$ row, 17.535 < 18.8 < 20.090, so $P(\chi^2_8 > 18.8)$ lies between 1 - 0.990 = 0.010 and 1 - 0.975 = 0.025 (it is 0.016). The answer is **C**.

**Why not the others**

- **A** — forgets the interaction and uses 2 df; 18.8 > 10.597 then puts the p-value below 0.005.
- **B** — counts the interaction's degrees of freedom as (4 - 1) + (3 - 1) = 5, a sum instead of a product, so uses 7 df; 18.475 < 18.8 < 20.278.
- **D** — counts vehicle use with all 3 levels instead of 2 dummies, giving 9 df; 16.919 < 18.8 < 19.023.
- **E** — counts every level without dropping a base level, 3 + 4 × 3 = 15 df; 18.8 < 24.996.
