---
id: p-033
topic: Univariate Random Variables
subtopic: Continuous Univariate Distributions
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - continuous-distributions
  - power-rule
wiki_link: Concepts/Continuous+Probability
answer: C
points: 1
---

The lifetime of a machine part has a continuous distribution on the interval $(0, 40)$ with probability density function $f(x)$, where $f(x)$ is proportional to $(10+x)^{-2}$ on the interval.

Calculate the probability that the lifetime of the machine part is less than 6.

- A) 0.04
- B) 0.15
- C) 0.47
- D) 0.53
- E) 0.94

## Explanation

We know the density has the form $f(x) = C(10+x)^{-2}$ for $0 < x < 40$. First, determine the proportionality constant $C$.
$$1 = \int_{0}^{40} C(10+x)^{-2} dx = -C(10+x)^{-1} \Big|_{0}^{40} = \frac{C}{10} - \frac{C}{50} = \frac{2C}{25}$$
So, $C = 25/2 = 12.5$.

Then, calculate the probability over the interval $(0, 6)$:
$$P[X < 6] = \int_{0}^{6} 12.5(10+x)^{-2} dx = -12.5(10+x)^{-1} \Big|_{0}^{6}$$
$$= 12.5\left(\frac{1}{10} - \frac{1}{16}\right) = 12.5\left(\frac{6}{160}\right) = 0.46875 \approx 0.47$$
