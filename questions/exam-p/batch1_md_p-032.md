---
id: p-032
topic: Univariate Random Variables
subtopic: Conditional Probability
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - continuous-distributions
  - conditional-probability
wiki_link: Concepts/Conditional+Probability
answer: B
points: 1
---

The loss due to a fire in a commercial building is modeled by a random variable $X$ with density function
$$f(x) = \begin{cases} 0.005(20-x), & 0 < x < 20 \\ 0, & \text{otherwise.} \end{cases}$$

Given that a fire loss exceeds 8, calculate the probability that it exceeds 16.

- A) 1/25
- B) 1/9
- C) 1/8
- D) 1/3
- E) 3/7

## Explanation

First, calculate the survival function $P[X > x]$:
$$P[X > x] = \int_{x}^{20} 0.005(20-t)dt = 0.005\left(20t - \frac{1}{2}t^2\right) \Big|_{x}^{20}$$
$$= 0.005\left(400 - 200 - 20x + \frac{1}{2}x^2\right) = 0.005\left(200 - 20x + \frac{1}{2}x^2\right)$$

We need to find the conditional probability $P[X > 16 \mid X > 8]$:
$$P[X > 16 \mid X > 8] = \frac{P[X > 16]}{P[X > 8]} = \frac{200 - 20(16) + \frac{1}{2}(16)^2}{200 - 20(8) + \frac{1}{2}(8)^2}$$
$$= \frac{200 - 320 + 128}{200 - 160 + 32} = \frac{8}{72} = \frac{1}{9}$$
