---
id: p-047
topic: Univariate Random Variables
subtopic: Discrete Univariate Distributions
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - poisson-distribution
  - expected-value
wiki_link: Concepts/Poisson+Distribution
answer: C
points: 1
---

A company buys a policy to insure its revenue in the event of major snowstorms that shut down business. The policy pays nothing for the first such snowstorm of the year and 10,000 for each one thereafter, until the end of the year. The number of major snowstorms per year that shut down business is assumed to have a Poisson distribution with mean 1.5.

Calculate the expected amount paid to the company under this policy during a one-year period.

- A) 2,769
- B) 5,000
- C) 7,231
- D) 8,347
- E) 10,578

## Explanation

Let $N$ be the number of snowstorms. $N \sim \text{Poisson}(\lambda = 1.5)$.
The policy pays $Y = 10,000(N-1)$ for $N \ge 1$, and 0 for $N=0$.
The expected payment is:
$$E[Y] = \sum_{n=1}^{\infty} 10,000(n-1) P(N=n) = 10,000 \sum_{n=0}^{\infty} (n-1) \frac{1.5^n e^{-1.5}}{n!} - 10,000(-1)P(N=0)$$
Note that $\sum_{n=0}^{\infty} (n-1) P(N=n) = E[N-1] = E[N] - 1 = 1.5 - 1 = 0.5$.
So the sum is $10,000(0.5) + 10,000 e^{-1.5} = 5000 + 10,000(0.2231) = 5000 + 2231.30 = 7231.30$.
