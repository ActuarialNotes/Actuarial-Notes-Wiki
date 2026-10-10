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
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e4f27382e3784f43aa6b8fd2e452b652686b235ed3880d3dc07f3e1252792b22
  sources:
    - "Siegrist, Random, 'Sample Correlation and Regression', sample covariance s(x,y) with divisor n - 1 and sample correlation r = s(x,y)/(s(x)s(y)), sha256:1009a5a6a129ee5592aed6c2b914973ae82bb7e7685c477c4c205dbe47fd7072 — https://www.randomservices.org/random/sample/Covariance.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
