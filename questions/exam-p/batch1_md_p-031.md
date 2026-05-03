---
id: p-031
topic: Univariate Random Variables
subtopic: Discrete Univariate Distributions
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - binomial
  - multinomial
wiki_link: Concepts/Binomial+Distribution
answer: D
points: 1
---

A large pool of adults earning their first driver's license includes 50% low-risk drivers, 30% moderate-risk drivers, and 20% high-risk drivers. Because these drivers have no prior driving record, an insurance company considers each driver to be randomly selected from the pool.

This month, the insurance company writes four new policies for adults earning their first driver's license.

Calculate the probability that these four will contain at least two more high-risk drivers than low-risk drivers.

- A) 0.006
- B) 0.012
- C) 0.018
- D) 0.049
- E) 0.073

## Explanation

Let $X$, $Y$, and $Z$ be the number of low-risk, moderate-risk, and high-risk drivers insured, respectively.
The probability function is a trinomial distribution.
We want to find $P[Z \ge X + 2]$. The possible outcomes $(x, y, z)$ that satisfy this condition for 4 policies are:
* $(0, 0, 4): (0.20)^4 = 0.0016$
* $(1, 0, 3): 4(0.50)(0.20)^3 = 0.0160$
* $(0, 1, 3): 4(0.30)(0.20)^3 = 0.0096$
* $(0, 2, 2): \frac{4!}{2!2!}(0.30)^2(0.20)^2 = 0.0216$

The total probability is the sum of these probabilities:
$$P[Z \ge X + 2] = 0.0016 + 0.0160 + 0.0096 + 0.0216 = 0.0488$$
