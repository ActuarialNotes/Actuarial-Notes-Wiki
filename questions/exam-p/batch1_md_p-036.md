---
id: p-036
topic: Univariate Random Variables
subtopic: Conditional Probability
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - continuous-distributions
  - conditional-probability
wiki_link: Concepts/Conditional+Probability
answer: A
points: 1
---

An insurance company insures a large number of homes. The insured value, $X$, of a randomly selected home is assumed to follow a distribution with density function
$$f(x) = \begin{cases} 3x^{-4}, & x > 1 \\ 0, & \text{otherwise.} \end{cases}$$

Given that a randomly selected home is insured for at least 1.5, calculate the probability that it is insured for less than 2.

- A) 0.578
- B) 0.684
- C) 0.704
- D) 0.829
- E) 0.875

## Explanation

The cumulative distribution function is:
$$F(x) = P[X \le x] = \int_{1}^{x} 3t^{-4} dt = -t^{-3} \Big|_{1}^{x} = 1 - x^{-3}$$

We need to find $P[X < 2 \mid X \ge 1.5]$:
$$P[X < 2 \mid X \ge 1.5] = \frac{P[1.5 \le X < 2]}{P[X \ge 1.5]} = \frac{F(2) - F(1.5)}{1 - F(1.5)}$$
$$= \frac{(1 - 2^{-3}) - (1 - 1.5^{-3})}{1 - (1 - 1.5^{-3})} = \frac{-1/8 + (2/3)^3}{(2/3)^3} = \frac{8/27 - 1/8}{8/27} = \frac{37/216}{8/27} = \frac{37}{64} \approx 0.578$$
