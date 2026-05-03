---
id: p-069
topic: Multivariate Random Variables
subtopic: Central Limit Theorem
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - central-limit-theorem
  - covariance
wiki_link: Concepts/Central+Limit+Theorem
answer: B
points: 1
---

Let $X$ and $Y$ be the number of hours that a randomly selected person watches movies and sporting events, respectively, during a three-month period. The following information is known about $X$ and $Y$:
$$E[X] = 50, \quad E[Y] = 20, \quad Var(X) = 50, \quad Var(Y) = 30, \quad Cov(X,Y) = 10$$

The totals of hours that different individuals watch movies and sporting events during the three months are mutually independent. One hundred people are randomly selected and observed for these three months. Let $T$ be the total number of hours that these one hundred people watch movies or sporting events during this three-month period.

Approximate the value of $P[T < 7100]$.

- A) 0.62
- B) 0.84
- C) 0.87
- D) 0.92
- E) 0.97

## Explanation

Let $W = X + Y$ be the total hours watched by a single person.
$$E[W] = E[X] + E[Y] = 50 + 20 = 70$$
$$Var(W) = Var(X) + Var(Y) + 2Cov(X,Y) = 50 + 30 + 2(10) = 100$$

For 100 independent individuals, the total hours $T = \sum_{i=1}^{100} W_i$ is approximately normally distributed by the Central Limit Theorem.
$$\mu_T = 100 \times 70 = 7000$$
$$\sigma_T^2 = 100 \times 100 = 10,000 \implies \sigma_T = 100$$

We want to find $P[T < 7100]$:
$$P[T < 7100] = P\left(Z < \frac{7100 - 7000}{100}\right) = P(Z < 1)$$
From the standard normal tables, $P(Z < 1) = 0.8413 \approx 0.84$.
