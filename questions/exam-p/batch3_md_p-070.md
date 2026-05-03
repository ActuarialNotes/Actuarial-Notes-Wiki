---
id: p-070
topic: Multivariate Random Variables
subtopic: Central Limit Theorem
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - exponential-distribution
  - central-limit-theorem
wiki_link: Concepts/Central+Limit+Theorem
answer: B
points: 1
---

The total claim amount for a health insurance policy follows a distribution with density function
$$f(x) = \frac{1}{1000}e^{-(x/1000)}, \quad x > 0.$$
The premium for the policy is set at the expected total claim amount plus 100.

If 100 policies are sold, calculate the approximate probability that the insurance company will have claims exceeding the premiums collected.

- A) 0.001
- B) 0.159
- C) 0.333
- D) 0.407
- E) 0.460

## Explanation

A single policy claim $X$ has an exponential distribution with mean $\theta = 1000$ and variance $\theta^2 = 1,000,000$.

The premium for one policy is $E[X] + 100 = 1000 + 100 = 1100$.
For 100 policies, the total premium collected is $100 \times 1100 = 110,000$.

Let $S$ be the total claims for 100 policies. By the CLT, $S$ is approximately normal.
$$\mu_S = 100 \times 1000 = 100,000$$
$$\sigma_S^2 = 100 \times 1,000,000 = 100,000,000 \implies \sigma_S = 10,000$$

We want $P[S > 110,000]$:
$$P[S > 110,000] = P\left(Z > \frac{110,000 - 100,000}{10,000}\right) = P(Z > 1)$$
From standard normal tables, $P(Z < 1) = 0.8413$, so $P(Z > 1) = 1 - 0.8413 = 0.1587 \approx 0.159$.
