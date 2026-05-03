---
id: p-037
topic: Univariate Random Variables
subtopic: Discrete Univariate Distributions
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - binomial-distribution
wiki_link: Concepts/Binomial+Distribution
answer: E
points: 1
---

A company prices its hurricane insurance using the following assumptions:
(i) In any calendar year, there can be at most one hurricane.
(ii) In any calendar year, the probability of a hurricane is 0.05.
(iii) The numbers of hurricanes in different calendar years are mutually independent.

Using the company's assumptions, calculate the probability that there are fewer than 3 hurricanes in a 20-year period.

- A) 0.06
- B) 0.19
- C) 0.38
- D) 0.62
- E) 0.92

## Explanation

The number of hurricanes in a 20-year period has a binomial distribution with $n=20$ and $p=0.05$.
We want to find $P[X < 3] = P[X=0] + P[X=1] + P[X=2]$.

$$P[X < 3] = \binom{20}{0}(0.95)^{20} + \binom{20}{1}(0.95)^{19}(0.05) + \binom{20}{2}(0.95)^{18}(0.05)^2$$
$$= 0.35848 + 20(0.37735)(0.05) + 190(0.39721)(0.0025)$$
$$= 0.35848 + 0.37735 + 0.18868 \approx 0.9245$$
