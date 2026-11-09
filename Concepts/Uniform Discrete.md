---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:ef18f55c55068d1afdf1a6b032156bec028a81c2ff5e5b6effcfb37d7b3b3390
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §6.2 Exercise 11: X chosen at random from 1..n has E(X) = (n+1)/2 and V(X) = (n-1)(n+1)/12; sum of squares n(n+1)(2n+1)/6, p.264 (PDF p.272), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 5.22 Discrete Uniform Distributions: on {a, a+h, ..., b}, E(X) = (a+b)/2, var(X) = (n^2-1)h^2/12, sha256:a506d04abf9a8a26ebb000acde57d76a97462be43e855e92c983e6f2d09cbac2 — https://www.randomservices.org/random/special/UniformDiscrete.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 5.21 The Uniform Distribution on an Interval: E(X) = (a+b)/2, var(X) = (b-a)^2/12, sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html"
    - "Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), VI Limits on Policy Benefits, Deductibles (PDF p.7): nothing paid on a loss below the deductible, the excess paid above it, sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Uniform Discrete.md
---

![[Media/Figures/Uniform_Discrete.svg|340]]

A **Uniform Discrete** distribution gives the same probability to each of $n$ consecutive integers. If $X$ is uniform on $\{1, 2, \ldots, n\}$, the probability of each value is

> $$P(X = k) = \frac{1}{n}$$

- $k = 1, 2, \ldots, n$.

> [!example]- A fair die is rolled. What is the probability that it shows at least 5? {Example}
> - The roll $X$ is uniform on $\{1, \ldots, 6\}$, so each face has probability $\frac{1}{6}$.
> - Two faces, 5 and 6, are at least 5.
> - $P(X \ge 5) = \frac{2}{6} = \frac{1}{3}$.

## Mean and variance

The mean and the variance of $X$ are

> $$E[X] = \frac{n+1}{2}$$

> $$\text{Var}(X) = \frac{n^2 - 1}{12}$$

> [!example]- What are the mean and the variance of the roll of a fair die? {Example}
> - $n = 6$.
> - $E[X] = \frac{7}{2} = 3.5$.
> - $\text{Var}(X) = \frac{36 - 1}{12} = \frac{35}{12} = 2.9167$.

## Integers from $a$ to $b$

On the integers $\{a, a+1, \ldots, b\}$ there are $n = b - a + 1$ values, and the mean is

> $$E[X] = \frac{a + b}{2}$$

The variance is still $(n^2 - 1)/12$. Adding a constant to every value moves the mean but not the variance.

> [!example]- A claim count is equally likely to be any integer from 20 to 29. What are its mean and variance? {Example}
> - There are $n = 29 - 20 + 1 = 10$ values.
> - $E[X] = \frac{20 + 29}{2} = 24.5$.
> - $\text{Var}(X) = \frac{10^2 - 1}{12} = 8.25$.

## Expected value of a function

The expected value of a function $g(X)$ is the average of $g$ over the $n$ values:

> $$E[g(X)] = \frac{1}{n}\sum_{k} g(k)$$

> [!example]- A loss is equally likely to be any integer from 1 to 10. A deductible of 4 applies. What is the expected payment? {Example}
> - The payment is $X - 4$ when $X > 4$, and 0 otherwise.
> - Losses of 1 to 4 pay nothing, and losses of 5 to 10 pay 1 to 6.
> - The expected payment is $\frac{1 + 2 + \cdots + 6}{10} = \frac{21}{10} = 2.1$.

> [!trap] The continuous formula on a discrete range
> $(b - a)^2/12$ is the variance of the [[Uniform Continuous Distribution|continuous uniform]]. For a die it gives $25/12$, which is too small. Count the values, $n = b - a + 1$, and use $(n^2 - 1)/12 = 35/12$.
