---
id: p-040
topic: Multivariate Random Variables
subtopic: Linear Combinations of Random Variables
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - normal-distribution
  - linear-combinations
wiki_link: Concepts/Linear+Combinations+of+Random+Variables
answer: D
points: 1
---

For Company A there is a 60% chance that no claim is made during the coming year. If one or more claims are made, the total claim amount is normally distributed with mean 10,000 and standard deviation 2,000.

For Company B there is a 70% chance that no claim is made during the coming year. If one or more claims are made, the total claim amount is normally distributed with mean 9,000 and standard deviation 2,000.

The total claim amounts of the two companies are independent.

Calculate the probability that, in the coming year, Company B's total claim amount will exceed Company A's total claim amount.

- A) 0.180
- B) 0.185
- C) 0.217
- D) 0.223
- E) 0.240

## Explanation

There are two disjoint situations where Company B's total exceeds Company A's.

1. Company B has at least one claim and Company A has no claims.
Probability = $P(B > 0) P(A = 0) = (1 - 0.70)(0.60) = 0.3(0.6) = 0.18$.

2. Both companies have claims, and B's claims > A's claims.
Probability = $P(B > 0) P(A > 0) = (0.3)(0.4) = 0.12$.
Given that both have claims, the difference $D = B - A$ is normally distributed with:
Mean = $9,000 - 10,000 = -1,000$
Variance = $2000^2 + 2000^2 = 8,000,000 \implies \text{SD} = \sqrt{8,000,000} = 2828.43$.
We want $P(B - A > 0)$:
$$P(D > 0) = P\left(Z > \frac{0 - (-1000)}{2828.43}\right) = P(Z > 0.3535)$$
Using normal tables, $P(Z > 0.354) = 1 - 0.6383 = 0.3617$.

Total probability = $0.18 + 0.12(0.3617) = 0.18 + 0.0434 = 0.2234$.
