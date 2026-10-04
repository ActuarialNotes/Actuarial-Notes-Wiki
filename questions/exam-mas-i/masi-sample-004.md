---
id: "masi-sample-q4"
exam: "Exam MAS-I"
topic: "Statistical Learning"
learning_objective: "Extended Linear Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Statistical+Learning
  - Concepts/Linear+Regression
answer: "E"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1e592063b0257cd4c7e3f95f63d38b520d17bda10e3f82c345a901e62e7d8966
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-sample-004.md
---

You are given the following models which contain regression splines:

| Model | Numbers of Spline Knots | Degree of Regression Spline |
|---|---|---|
| A | 6 | 4 |
| B | 5 | 5 |
| C | 8 | 2 |
| D | 10 | 3 |

Calculate the total number of the regression coefficients in the four models.

- A) Less than 5
- B) At least 15, but less than 25
- C) At least 25, but less than 35
- D) At least 35, but less than 45
- E) At least 45

## Explanation

CAS's solution counts a regression spline's coefficients as

$$
\text{\# of coefficients} = \text{Degree of Regression Spline} + \text{Numbers of Spline Knots} + \text{Intercept}
$$

This is the count James et al. give for a cubic spline (§7.4.3), carried to any degree: a cubic spline with $K$ knots is a least squares regression on an intercept and $3 + K$ predictors — $X$, $X^2$, $X^3$ and one truncated power function per knot — "a total of $K + 4$ regression coefficients." A spline of degree $d$ has the $d$ powers $X, \ldots, X^d$, one truncated power function per knot and the intercept, so $d + K + 1$ coefficients.

Summing for each model, as CAS does:

$$
\begin{align*}
\text{Model A:} \quad 6 + 4 + 1 &= 11 \\
\text{Model B:} \quad 5 + 5 + 1 &= 11 \\
\text{Model C:} \quad 8 + 2 + 1 &= 11 \\
\text{Model D:} \quad 10 + 3 + 1 &= 14
\end{align*}
$$

$$
\text{Total} = 11 + 11 + 11 + 14 = 47
$$

Option A reads "Less than 5" on CAS's paper, so no option covers 5 to 15; that does not affect this question, whose total is well above 15.

47 is at least 45, so the answer is **E**.
