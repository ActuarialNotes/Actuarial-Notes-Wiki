---
id: p-065
topic: Multivariate Random Variables
subtopic: Central Limit Theorem
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - central-limit-theorem
  - percentiles
wiki_link: Concepts/Central+Limit+Theorem
answer: C
points: 1
---

A charity receives 2025 contributions. Contributions are assumed to be mutually independent and identically distributed with mean 3125 and standard deviation 250.

Calculate the approximate $90^{\text{th}}$ percentile for the distribution of the total contributions received.

- A) 6,328,000
- B) 6,338,000
- C) 6,343,000
- D) 6,784,000
- E) 6,977,000

## Explanation

Let $S = \sum_{i=1}^{2025} X_i$ be the total contributions. By the Central Limit Theorem, $S$ is approximately normally distributed.

Mean of $S$: $\mu_S = n\mu = 2025 \times 3125 = 6,328,125$
Variance of $S$: $\sigma_S^2 = n\sigma^2 = 2025 \times 250^2$
Standard deviation of $S$: $\sigma_S = \sqrt{2025} \times 250 = 45 \times 250 = 11,250$

The 90th percentile of a standard normal distribution is approximately $Z = 1.282$.
The 90th percentile of $S$ is:
$$S_{0.90} = \mu_S + 1.282\sigma_S = 6,328,125 + 1.282(11,250) = 6,328,125 + 14,422.5 = 6,342,547.5 \approx 6,343,000$$
