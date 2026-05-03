---
id: p-057
topic: Univariate Random Variables
subtopic: Variance and Standard Deviation
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - uniform-distribution
  - variance
  - censored-distributions
wiki_link: Concepts/Variance
answer: C
points: 1
---

The warranty on a machine specifies that it will be replaced at failure or age 4, whichever occurs first. The machine's age at failure, $X$, has density function
$$f(x) = \begin{cases} 1/5, & 0 < x < 5 \\ 0, & \text{otherwise.} \end{cases}$$

Let $Y$ be the age of the machine at the time of replacement.

Calculate the variance of $Y$.

- A) 1.3
- B) 1.4
- C) 1.7
- D) 2.1
- E) 7.5

## Explanation

$Y = X$ if $X \le 4$, and $Y = 4$ if $X > 4$. This is a censored variable $Y = X \wedge 4$.

Calculate expected value $E[Y]$:
$$E[Y] = \int_{0}^{4} x f(x) dx + 4 P(X > 4) = \int_{0}^{4} x(0.2) dx + 4(0.2) = 0.1x^2 \Big|_{0}^{4} + 0.8 = 1.6 + 0.8 = 2.4$$

Calculate second moment $E[Y^2]$:
$$E[Y^2] = \int_{0}^{4} x^2 f(x) dx + 4^2 P(X > 4) = \int_{0}^{4} x^2(0.2) dx + 16(0.2) = \frac{0.2x^3}{3} \Big|_{0}^{4} + 3.2$$
$$= \frac{0.2(64)}{3} + 3.2 = 4.2667 + 3.2 = 7.4667$$

Calculate variance $Var(Y)$:
$$Var(Y) = E[Y^2] - (E[Y])^2 = 7.4667 - (2.4)^2 = 7.4667 - 5.76 = 1.7067 \approx 1.7$$
