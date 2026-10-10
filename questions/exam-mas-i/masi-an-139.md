---
id: "masi-an-139"
exam: "Exam MAS-I"
topic: "Correlation"
learning_objective: "Extended Linear Models"
difficulty: easy
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Correlation
  - Concepts/Scatter+Plot
  - Concepts/Covariance
answer: "-0.949"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e4f27382e3784f43aa6b8fd2e452b652686b235ed3880d3dc07f3e1252792b22
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-139.md
---

Five vehicle-age groups have these average claim severities (in thousands):

| Vehicle age $x$ | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Severity $y$ | 8 | 7 | 7 | 5 | 3 |

Calculate the sample correlation coefficient between $x$ and $y$. Give your answer to three decimal places, with a minus sign if negative (e.g. -0.125).

## Explanation

The means are $\bar{x} = 3$ and $\bar{y} = 30/5 = 6$. With deviations $x - \bar{x} = (-2, -1, 0, 1, 2)$ and $y - \bar{y} = (2, 1, 1, -1, -3)$:

$$
\begin{align*}
S_{xy} &= (-2)(2) + (-1)(1) + (0)(1) + (1)(-1) + (2)(-3) \\
&= -12 \\
S_{xx} &= 4 + 1 + 0 + 1 + 4 \\
&= 10 \\
S_{yy} &= 4 + 1 + 1 + 1 + 9 \\
&= 16 \\
r &= \frac{S_{xy}}{\sqrt{S_{xx} S_{yy}}} \\
&= \frac{-12}{\sqrt{160}} \\
&= -0.949
\end{align*}
$$

The answer is **-0.949**: a strong negative linear association, severity falling as vehicles age.

**Common wrong entries**

- **0.900** — $r^2$, the share of the variation in $y$ explained by a line in $x$, which loses the sign and is not the correlation.
- **-1.200** — the least squares slope $S_{xy} / S_{xx}$, which is in thousands per year, not unit-free.
- **-1.186** — dividing the covariance by $n - 1$ but the standard deviations by $n$ (or the reverse, **-0.759**): the divisors must match, and a correlation outside $[-1, 1]$ is a sign they don't.
