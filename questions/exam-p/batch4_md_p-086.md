---
id: p-086
topic: Multivariate Random Variables
subtopic: Central Limit Theorem
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - uniform-distribution
  - central-limit-theorem
  - deductibles
wiki_link: Concepts/Central+Limit+Theorem
answer: D
points: 1
---

The amounts of automobile losses reported to an insurance company are mutually independent, and each loss is uniformly distributed between 0 and 20,000. The company covers each such loss subject to a deductible of 5,000.

Calculate the probability that the total payout on 200 reported losses is between 1,000,000 and 1,200,000.

- A) 0.0803
- B) 0.1051
- C) 0.1799
- D) 0.8201
- E) 0.8575

## Explanation

Let $X$ be a single loss, $X \sim U(0, 20,000)$. Let $Y$ be the payout, $Y = \max(0, X - 5000)$.
We first find the mean and variance of $Y$.
$$E[Y] = \int_{5000}^{20,000} (x - 5000) \frac{1}{20,000} dx = \frac{(x-5000)^2}{40,000} \Big|_{5000}^{20,000} = \frac{15,000^2}{40,000} = 5,625$$
$$E[Y^2] = \int_{5000}^{20,000} (x - 5000)^2 \frac{1}{20,000} dx = \frac{(x-5000)^3}{60,000} \Big|_{5000}^{20,000} = \frac{15,000^3}{60,000} = 56,250,000$$
$$Var(Y) = 56,250,000 - 5625^2 = 56,250,000 - 31,640,625 = 24,609,375$$

Let $S = \sum_{i=1}^{200} Y_i$. By the CLT, $S$ is approximately normal.
$$\mu_S = 200 \times 5625 = 1,125,000$$
$$\sigma_S^2 = 200 \times 24,609,375 = 4,921,875,000$$
$$\sigma_S = \sqrt{4,921,875,000} \approx 70,156.08$$

We want $P(1,000,000 < S < 1,200,000)$:
$$P\left(\frac{1,000,000 - 1,125,000}{70,156} < Z < \frac{1,200,000 - 1,125,000}{70,156}\right)$$
$$= P(-1.78 < Z < 1.07) = P(Z < 1.07) - P(Z < -1.78)$$
From normal tables, $P(Z < 1.07) = 0.8577$ and $P(Z < -1.78) = 1 - 0.9625 = 0.0375$.
$$P = 0.8577 - 0.0375 = 0.8202$$
