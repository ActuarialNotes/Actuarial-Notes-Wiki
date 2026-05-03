---
id: p-038
topic: Univariate Random Variables
subtopic: Transformations of Random Variables
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - deductibles
  - transformations
wiki_link: Concepts/Transformations+of+Random+Variables
answer: B
points: 1
---

An insurance policy pays for a random loss $X$ subject to a deductible of $C$, where $0 < C < 1$. The loss amount is modeled as a continuous random variable with density function
$$f(x) = \begin{cases} 2x, & 0 < x < 1 \\ 0, & \text{otherwise.} \end{cases}$$

Given a random loss $X$, the probability that the insurance payment is less than 0.5 is equal to 0.64.

Calculate $C$.

- A) 0.1
- B) 0.3
- C) 0.4
- D) 0.6
- E) 0.8

## Explanation

Denote the insurance payment by the random variable $Y$. Then
$$Y = \begin{cases} 0 & \text{if } 0 < X \le C \\ X - C & \text{if } C < X < 1 \end{cases}$$

We are given that:
$$0.64 = P[Y < 0.5] = P[X - C < 0.5] = P[X < 0.5 + C]$$
$$P[X < 0.5 + C] = \int_{0}^{0.5+C} 2x dx = x^2 \Big|_{0}^{0.5+C} = (0.5 + C)^2$$

Setting $(0.5 + C)^2 = 0.64$ gives $0.5 + C = 0.8$ (since $C > 0$). Thus, $C = 0.3$.
