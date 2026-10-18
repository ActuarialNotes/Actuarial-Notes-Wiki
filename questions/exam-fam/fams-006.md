---
id: "fams-006"
exam: "Exam FAM"
topic: "Limited Expected Value"
learning_objective: "Severity, Frequency, and Aggregate Models"
difficulty: medium
type: multiple-choice
wiki_link:
  - Concepts/Limited+Expected+Value
  - Concepts/Grouped+Data
  - Concepts/Uniform+Continuous+Distribution
answer: "C"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:75ff119f9256639cc1019f6a2a9023392226045f9948fad1c7e84d399816067c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fams-006.md
---

You are given:

| Claim Size ($X$) | Number of Claims |
|---|---|
| (0, 25] | 25 |
| (25, 50] | 28 |
| (50, 100] | 15 |
| (100, 200] | 6 |

Assume a uniform distribution of claim sizes within each interval.

Calculate $E(X^2) - E[(X \wedge 150)^2]$.

- A) Less than 200
- B) At least 200, but less than 300
- C) At least 300, but less than 400
- D) At least 400, but less than 500
- E) At least 500

## Explanation

In general,

$$\begin{align*}
E(X^2) - E[(X \wedge 150)^2] &= \int_0^{200} x^2 f(x)\,dx - \int_0^{150} x^2 f(x)\,dx - 150^2\int_{150}^{200} f(x)\,dx \\
&= \int_{150}^{200} (x^2 - 150^2) f(x)\,dx
\end{align*}$$

Assuming a uniform distribution, the density function over the interval from 100 to 200 is 6/7400 (the probability of 6/74 assigned to the interval divided by the width of the interval). The answer is

$$\begin{align*}
\int_{150}^{200} (x^2 - 150^2)\frac{6}{7400}\,dx &= \left(\frac{x^3}{3} - 150^2 x\right)\frac{6}{7400}\Bigg|_{150}^{200} \\
&= 337.84
\end{align*}$$

The answer is **C**.
