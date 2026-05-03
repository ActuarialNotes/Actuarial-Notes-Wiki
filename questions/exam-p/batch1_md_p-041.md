---
id: p-041
topic: Univariate Random Variables
subtopic: Discrete Univariate Distributions
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - negative-binomial-distribution
wiki_link: Concepts/Negative+Binomial+Distribution
answer: D
points: 1
---

A company takes out an insurance policy to cover accidents that occur at its manufacturing plant. The probability that one or more accidents will occur during any given month is 0.60. The numbers of accidents that occur in different months are mutually independent.

Calculate the probability that there will be at least four months in which no accidents occur before the fourth month in which at least one accident occurs.

- A) 0.01
- B) 0.12
- C) 0.23
- D) 0.29
- E) 0.41

## Explanation

Let a "success" be a month with no accidents ($p = 0.40$) and a "failure" be a month with at least one accident ($q = 0.60$).
The event "at least 4 months with no accidents occur before the 4th month with an accident" is equivalent to saying that in the first $4+4-1 = 7$ months, there are at least 4 months with no accidents.

We calculate this using the Binomial distribution $X \sim \text{Bin}(7, 0.40)$ and finding $P[X \ge 4]$:
$$P[X \ge 4] = \binom{7}{4}(0.4)^4(0.6)^3 + \binom{7}{5}(0.4)^5(0.6)^2 + \binom{7}{6}(0.4)^6(0.6)^1 + \binom{7}{7}(0.4)^7$$
$$= 35(0.0256)(0.216) + 21(0.01024)(0.36) + 7(0.004096)(0.6) + 1(0.0016384)$$
$$= 0.193536 + 0.077414 + 0.017203 + 0.001638 = 0.289791 \approx 0.29$$

Alternatively, this is a negative binomial distribution where $K$ is the number of "no accident" months before the 4th "accident" month. We want $P(K \ge 4) = 1 - P(K < 4)$, which gives the same result.
