---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:267f0a2ec3abf0854a83a708bd99d34c150f46f3fa335002edbc0e8772842df6
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 9.4 and Thm 9.6 Central Limit Theorem (PDF pp.351, 365), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 6.4 The Central Limit Theorem: CLT for the standard score of a sum; the more abnormal the distribution the larger n must be; continuity correction for integer-valued sums; binomial rule of thumb np >= 5 and n(1-p) >= 5 (HTML fetched 2026-11-06), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 14.4 The Poisson Distribution: normal approximation N(a, a) for large a with continuity correction; Poisson infinitely divisible (HTML fetched 2026-11-06), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.6 The Normal Distribution: sum of independent normals normal (HTML fetched 2026-11-06), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html"
    - "SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table rows z=0.7-2.0 and selected-percentile row (0.90 1.2816, 0.95 1.6449, 0.975 1.9600, 0.99 2.3263), PDF p.2, read 2026-11-06, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 outcome i) Central Limit Theorem (PDF p.4), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Normal Approximation.md
---

The **Normal Approximation** is the use of a [[Normal Distribution|normal distribution]] with the same mean and variance in place of the exact distribution of a sum of many independent random variables, as the [[Central Limit Theorem]] justifies. If $X_1, \ldots, X_n$ are [[Independent and Identically Distributed|independent and identically distributed]] with mean $\mu$ and standard deviation $\sigma$, the probability that their sum $S_n$ is at most $s$ is approximately

> $$P(S_n \le s) \approx \Phi\!\left(\frac{s - n\mu}{\sigma\sqrt{n}}\right)$$

- $\Phi$ is the cumulative distribution function of the standard normal distribution.

An upper-tail probability is $P(Z > z) = 1 - \Phi(z)$, which by symmetry equals $\Phi(-z)$.

> [!example]- A portfolio has 400 independent policies. Each policy's annual claim amount has mean 250 and standard deviation 1,000. What is the probability that total claims exceed 130,000? {Example}
> - The total has mean $400(250) = 100{,}000$.
> - Its standard deviation is $1{,}000\sqrt{400} = 20{,}000$.
> - The standardized value of 130,000 is $\frac{30{,}000}{20{,}000} = 1.5$.
> - The probability is $1 - \Phi(1.5) = 0.0668$.

## The continuity correction

When $S_n$ takes only whole numbers, each whole number $k$ is spread over the interval from $k - 0.5$ to $k + 0.5$. The approximations for at least $k$ and at most $k$ are

> $$P(S_n \ge k) \approx 1 - \Phi\!\left(\frac{k - 0.5 - n\mu}{\sigma\sqrt{n}}\right)$$

> $$P(S_n \le k) \approx \Phi\!\left(\frac{k + 0.5 - n\mu}{\sigma\sqrt{n}}\right)$$

> [!example]- Each of 400 independent policies has a claim with probability 0.1. What is the approximate probability of at least 50 claims? {Example}
> - The number of claims is binomial with mean $400(0.1) = 40$.
> - Its variance is $400(0.1)(0.9) = 36$, so its standard deviation is 6.
> - "At least 50" starts at 49.5, so the standardized value is $\frac{49.5 - 40}{6} = 1.58$.
> - The probability is $1 - \Phi(1.58) = 0.0571$. The exact binomial probability is 0.0601.

> [!trap] Correcting in the wrong direction
> Widen the event, never narrow it. "At least 50" includes 50, so it starts at 49.5. "More than 50" excludes 50, so it starts at 50.5.

## Binomial and Poisson distributions

A [[Binomial Distribution|binomial]] count with $n$ trials and probability $p$, and a [[Poisson Distribution|Poisson]] count with mean $\lambda$, are approximately

> $$N\big(np,\ np(1 - p)\big)$$

> $$N(\lambda,\ \lambda)$$

The binomial approximation is usually good enough when $np$ and $n(1 - p)$ are both at least 5.

> [!example]- Accidents occur at a Poisson rate of 4 a day. What is the approximate probability of more than 6,500 accidents in 1,600 days? {Example}
> - The number of accidents is Poisson with mean $4(1{,}600) = 6{,}400$, so its standard deviation is $\sqrt{6{,}400} = 80$.
> - "More than 6,500" starts at 6,500.5, so the standardized value is $\frac{100.5}{80} = 1.26$.
> - The probability is $1 - \Phi(1.26) = 0.1038$.

## Setting a fund

The amount that the sum exceeds with probability $\alpha$ is approximately

> $$n\mu + z_{1-\alpha}\,\sigma\sqrt{n}$$

- $z_{1-\alpha}$ is the $100(1 - \alpha)$th [[Percentile|percentile]] of the standard normal distribution, read from the normal table in reverse.

> [!example]- For the 400 policies above, what fund covers total claims with probability 95%? {Example}
> - The fund is exceeded with probability $\alpha = 0.05$, and $z_{0.95} = 1.645$.
> - The fund is $1.645(20{,}000) = 32{,}900$ above the mean of 100,000, so it is 132,900.

## Number of policies needed

The excess over the mean allowed grows like $n$, while the standard deviation grows like $\sqrt{n}$. For the sum to exceed $(1 + k)$ times its mean with probability at most $\alpha$, the number of terms is

> $$n \ge \left(\frac{z_{1-\alpha}\,\sigma}{k\,\mu}\right)^2$$

- $k$ is the allowed excess as a fraction of the mean.

The number of terms is a whole number, so round up.

> [!example]- Each policy's claim amount has mean $\mu$ and standard deviation $4\mu$. How many independent policies are needed for total claims to exceed 110% of expected with probability at most 5%? {Example}
> - The total must stay within $0.1n\mu$ of its mean, which is 1.645 standard deviations.
> - The condition is $0.1n\mu \ge 1.645(4\mu)\sqrt{n}$, which gives $\sqrt{n} \ge 65.8$.
> - So $n \ge 4{,}329.6$, and at least 4,330 policies are needed.
