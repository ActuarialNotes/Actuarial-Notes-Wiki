---
id: p-072
topic: Multivariate Random Variables
subtopic: Central Limit Theorem
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - uniform-distribution
  - central-limit-theorem
wiki_link: Concepts/Central+Limit+Theorem
answer: D
points: 1
---

In an analysis of healthcare data, ages have been rounded to the nearest multiple of 5 years. The difference between the true age and the rounded age is assumed to be uniformly distributed on the interval from -2.5 years to 2.5 years. The healthcare data are based on a random sample of 48 people.

Calculate the approximate probability that the mean of the rounded ages is within 0.25 years of the mean of the true ages.

- A) 0.14
- B) 0.38
- C) 0.57
- D) 0.77
- E) 0.88

## Explanation

Let $X_i$ be the rounding error for the $i^{\text{th}}$ person. $X_i \sim \text{Uniform}(-2.5, 2.5)$.
The mean of $X_i$ is 0.
The variance of $X_i$ is $\frac{(2.5 - (-2.5))^2}{12} = \frac{5^2}{12} = \frac{25}{12}$.

The mean of the rounding errors for 48 people is $\bar{X} = \frac{1}{48} \sum_{i=1}^{48} X_i$. By the CLT, $\bar{X}$ is approximately normal.
$$\mu_{\bar{X}} = 0$$
$$\sigma_{\bar{X}}^2 = \frac{Var(X)}{n} = \frac{25/12}{48} = \frac{25}{576} \approx 0.0434$$
$$\sigma_{\bar{X}} = \sqrt{\frac{25}{576}} = \frac{5}{24} \approx 0.2083$$

We want the probability that the mean of the rounded ages is within 0.25 of the true mean, which means $|\bar{X}| \le 0.25$.
$$P(-0.25 \le \bar{X} \le 0.25) = P\left(\frac{-0.25}{5/24} \le Z \le \frac{0.25}{5/24}\right) = P(-1.2 \le Z \le 1.2)$$
From normal tables, $P(Z \le 1.2) = 0.8849$.
$$P(-1.2 \le Z \le 1.2) = 2(0.8849) - 1 = 0.7698 \approx 0.77$$.
