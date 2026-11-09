---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:856684371da2d8328558c5fbc8c2e4a10bca728ed23e448bb62659ab684bb90b
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 9.4 and Thm 9.6 Central Limit Theorem (PDF pp.351, 365), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 6.4 The Central Limit Theorem: standard score Z_n of the partial sum converges to standard normal; mean mu, variance sigma^2 in (0, infinity); the more abnormal the basic distribution the larger n must be; continuity correction; binomial and Poisson as sums (HTML fetched 2026-11-06), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 14.4 The Poisson Distribution: Poisson infinitely divisible: a sum of any number of i.i.d. Poisson variables (HTML fetched 2026-11-06), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.6 The Normal Distribution: sum of independent normals normal (HTML fetched 2026-11-06), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.21 The Uniform Distribution on an Interval: var of uniform (b-a)^2/12 (HTML fetched 2026-11-06), sha256:8e9ed89d801bc2780eab168757688e254a9484275e8d068c1fd000bf625c8558 — https://www.randomservices.org/random/special/UniformContinuous.html"
    - "SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table rows z=0.7-2.0 and selected-percentile row (0.90 1.2816, 0.95 1.6449, 0.975 1.9600, 0.99 2.3263), PDF p.2, read 2026-11-06, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 outcome i) Central Limit Theorem (PDF p.4), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Central Limit Theorem.md
---

![[Media/Figures/Central_Limit_Theorem.svg|340]]

The **Central Limit Theorem** states that the sum of a large number of [[Independent and Identically Distributed|independent and identically distributed]] random variables with finite variance is approximately [[Normal Distribution|normal]]. If each $X_i$ has mean $\mu$ and variance $\sigma^2$, then as the number of terms $n$ grows, the standardized sum approaches the standard normal distribution:

> $$\frac{S_n - n\mu}{\sigma\sqrt{n}} \to N(0, 1)$$

- $S_n = X_1 + \cdots + X_n$ is the sum of the $n$ terms.

For large $n$, the sum $S_n$ is therefore approximately normal with mean $n\mu$ and variance $n\sigma^2$, whatever the distribution of the $X_i$.

> [!idea] The idea
> The mean of a sum grows like $n$ but its standard deviation only like $\sqrt{n}$, so the sum settles into a bell around its mean.

> [!example]- An insurer's claims are independent, each with mean 1,000 and standard deviation 400. What is the probability that 100 claims total less than 92,000? {Example}
> - The total has mean $100(1{,}000) = 100{,}000$.
> - Its standard deviation is $400\sqrt{100} = 4{,}000$.
> - The standardized value of 92,000 is $\frac{92{,}000 - 100{,}000}{4{,}000} = -2$.
> - The probability is $\Phi(-2) = 0.0228$.

## The sample mean

The [[Sample Mean|sample mean]] $\bar{X} = S_n / n$ has mean $\mu$ and standard deviation $\sigma/\sqrt{n}$, so for large $n$

> $$\frac{\bar{X} - \mu}{\sigma/\sqrt{n}} \to N(0, 1)$$

> [!example]- For the same claims, what is the probability that the average of 100 claims exceeds 1,050? {Example}
> - The average has mean 1,000 and standard deviation $\frac{400}{\sqrt{100}} = 40$.
> - The standardized value of 1,050 is $\frac{50}{40} = 1.25$.
> - The probability is $1 - \Phi(1.25) = 0.1056$.

> [!trap] Dividing by $n$ instead of $\sqrt{n}$
> The standard deviation of the average is $\sigma/\sqrt{n}$, not $\sigma/n$. Using $\frac{400}{100} = 4$ here would put 1,050 more than 12 standard deviations above the mean.

## Conditions of the theorem

The theorem needs three things of the terms:

1. They are independent.
2. They have one common distribution.
3. That distribution has a finite variance.

The terms can have any shape, discrete or continuous, symmetric or skewed. A skewed distribution needs more terms before the sum looks normal. A [[Binomial Distribution|binomial]] count is a sum of independent trials, and a [[Poisson Distribution|Poisson]] count with a large mean is a sum of many smaller Poisson counts, so both are approximately normal when large. A sum of independent normal random variables is exactly normal for every $n$.

> [!example]- A die is rolled 100 times. Is the sum of the rolls approximately normal? {Example}
> - The rolls are independent, each with the same distribution on 1 to 6, which has a finite variance.
> - The theorem applies, so the sum is approximately normal.
> - One roll has mean 3.5 and variance $\frac{35}{12}$, so the sum has mean 350 and variance $\frac{3{,}500}{12} = 291.7$.
