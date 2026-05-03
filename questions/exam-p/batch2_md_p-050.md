---
id: p-050
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - continuous-distributions
  - policy-limits
wiki_link: Concepts/Expected+Value
answer: D
points: 1
---

An insurance policy reimburses a loss up to a benefit limit of 10. The policyholder's loss, $Y$, follows a distribution with density function:
$$f(y) = \begin{cases} \frac{2}{y^3}, & y > 1 \\ 0, & \text{otherwise.} \end{cases}$$

Calculate the expected value of the benefit paid under the insurance policy.

- A) 1.0
- B) 1.3
- C) 1.8
- D) 1.9
- E) 2.0

## Explanation

The benefit paid is $X = Y$ if $Y \le 10$, and $X = 10$ if $Y > 10$. The expected payment is:
$$E[X \wedge 10] = \int_{1}^{10} y \left(\frac{2}{y^3}\right) dy + 10 P[Y > 10]$$
$$= \int_{1}^{10} 2y^{-2} dy + 10 \int_{10}^{\infty} 2y^{-3} dy$$
$$= \left[ -2y^{-1} \right]_{1}^{10} + 10 \left[ -y^{-2} \right]_{10}^{\infty}$$
$$= \left( -\frac{2}{10} - (-2) \right) + 10 \left( 0 - (-(10)^{-2}) \right) = (-0.2 + 2) + 10(0.01) = 1.8 + 0.1 = 1.9$$
