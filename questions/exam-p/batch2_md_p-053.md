---
id: p-053
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - uniform-distribution
  - deductibles
wiki_link: Concepts/Uniform+Continuous+Distribution
answer: C
points: 1
---

An insurance policy is written to cover a loss, $X$, where $X$ has a uniform distribution on $[0, 1000]$. The policy has a deductible, $d$, and the expected payment under the policy is 25% of what it would be with no deductible.

Calculate $d$.

- A) 250
- B) 375
- C) 500
- D) 625
- E) 750

## Explanation

With no deductible, the expected payment is the mean of the uniform distribution on $[0, 1000]$, which is 500.
With a deductible $d$, the expected payment is $0.25 \times 500 = 125$.

The expected payment with deductible $d$ is:
$$E[Y] = \int_{d}^{1000} (x-d) f(x) dx = \int_{d}^{1000} (x-d) \frac{1}{1000} dx = \frac{(x-d)^2}{2000} \Big|_{d}^{1000} = \frac{(1000-d)^2}{2000}$$

Setting this equal to 125:
$$\frac{(1000-d)^2}{2000} = 125 \implies (1000-d)^2 = 250,000$$
$$1000-d = \sqrt{250,000} = 500$$
$$d = 500$$
