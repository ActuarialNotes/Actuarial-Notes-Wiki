---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:0889eaaf54f385d95954b7318b717f615ee9ff4012ec9aa26bfdbc5c417e138c
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.6 The Normal Distribution: phi'(z)=-z phi(z); Phi and Phi^-1 have no closed form; Phi(-z)=1-Phi(z); location-scale family, quantile mu + sigma Phi^-1(p); sum of independent normals normal, linear transformations (HTML fetched 2026-11-06), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html"
    - "SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table rows z=0.7-2.0 and selected-percentile row (0.90 1.2816, 0.95 1.6449, 0.975 1.9600, 0.99 2.3263), PDF p.2, read 2026-11-06, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "Wikipedia, Truncated normal distribution, One sided truncation (of lower tail): E(X | X>a) = mu + sigma phi(alpha)/Z, alpha=(a-mu)/sigma, Z = 1 - Phi(alpha) (HTML fetched 2026-11-06), sha256:dec14d4864f0614704b51dea05d7e16f652f951d55cf24920b0fc3e0dad2be1f — https://en.wikipedia.org/wiki/Truncated_normal_distribution"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 6.4 The Central Limit Theorem: continuity correction for integer-valued sums (HTML fetched 2026-11-06), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 9.4 and Thm 9.6 Central Limit Theorem (PDF pp.351, 365), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Normal Distribution.md
---

![[Media/Figures/Normal_Distribution.svg|340]]

A **Normal Distribution** is a symmetric, bell-shaped continuous distribution on the whole real line, determined by its mean $\mu$ and variance $\sigma^2$. The probability density function of $X \sim N(\mu, \sigma^2)$ is

> $$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-(x-\mu)^2/(2\sigma^2)}$$

- $\sigma$ is the standard deviation.
- $-\infty < x < \infty$.

The density has no closed-form integral, so a normal probability is found by standardizing:

> $$P(X \le x) = \Phi\!\left(\frac{x - \mu}{\sigma}\right)$$

- $\Phi$ is the cumulative distribution function of the standard normal $Z = (X - \mu)/\sigma$, which has mean 0 and variance 1.
- Values of $\Phi$ are read from the standard normal table.

> [!idea] The idea
> Every normal is the standard normal, stretched by $\sigma$ and shifted by $\mu$.

So one table of $\Phi$ answers every normal question, once a value is written as a number of standard deviations from the mean.

> [!example]- Annual aggregate losses are normal with mean 50,000 and standard deviation 5,000. What is the probability that they exceed 55,000? {Example}
> - Standardize: $z = \frac{55{,}000 - 50{,}000}{5{,}000} = 1$.
> - $P(X > 55{,}000) = 1 - \Phi(1) = 1 - 0.8413 = 0.1587$.

![[Media/Normal_distribution_pdf.svg|500]]

## Symmetry about the mean

The standard normal table lists only $z \ge 0$. A negative $z$ uses the symmetry of the curve:

> $$\Phi(-z) = 1 - \Phi(z)$$

The probability of landing within $a$ of the mean is

> $$P(\mu - a < X < \mu + a) = 2\Phi(a/\sigma) - 1$$

> [!example]- Losses are normal with mean 50,000 and standard deviation 5,000. What is the probability that they fall below 45,000, and that they fall within 5,000 of the mean? {Example}
> - Below 45,000 is $z = -1$, so the probability is $\Phi(-1) = 1 - 0.8413 = 0.1587$.
> - Within 5,000 of the mean is $2\Phi(1) - 1 = 0.6827$.

## Percentiles

The value $x$ with $P(X \le x) = p$, the $100p$th [[Percentile|percentile]], is

> $$x = \mu + z_p\,\sigma$$

- $z_p$ is the standard normal value with $\Phi(z_p) = p$.

The values used most are $z_{0.90} = 1.282$, $z_{0.95} = 1.645$, $z_{0.975} = 1.960$ and $z_{0.99} = 2.326$. A value exceeded with probability $q$ uses $z_{1-q}$.

> [!example]- Losses are normal with mean 50,000 and standard deviation 5,000. What loss level is exceeded only 5% of the time? {Example}
> - Exceeded 5% of the time is the 95th percentile, so use $z_{0.95} = 1.645$.
> - $x = 50{,}000 + 1.645 \times 5{,}000 = 58{,}225$.

The same equation can be solved for $\mu$ or $\sigma$. Two percentiles give two equations, which fix both.

> [!example]- A normal random variable has $P(X \le 60) = 0.8413$ and $P(X \le 80) = 0.9772$. What are $\mu$ and $\sigma$? {Example}
> - The table gives $z = 1$ and $z = 2$.
> - So $60 = \mu + \sigma$ and $80 = \mu + 2\sigma$.
> - Subtracting gives $\sigma = 20$, and then $\mu = 40$.

## Sums of independent normals

If $X_1, \ldots, X_n$ are independent with $X_i \sim N(\mu_i, \sigma_i^2)$, a linear combination of them is exactly normal, with

> $$E\Big[\sum c_iX_i\Big] = \sum c_i\mu_i$$

> $$\text{Var}\Big(\sum c_iX_i\Big) = \sum c_i^2\sigma_i^2$$

- $c_1, \ldots, c_n$ are constants.

> [!example]- Two independent lines have annual losses $X \sim N(100, 400)$ and $Y \sim N(80, 225)$. What is the probability that $X < Y$? {Example}
> - Let $D = X - Y$, so the question asks for $P(D < 0)$.
> - $E[D] = 100 - 80 = 20$.
> - $\text{Var}(D) = 400 + 225 = 625$, so the standard deviation is 25.
> - $P(D < 0) = \Phi(-0.8) = 1 - 0.7881 = 0.2119$.

> [!trap] Subtracting the variances of a difference
> For $X - Y$, the coefficient on $Y$ is $-1$, and $(-1)^2 = 1$. Means subtract, but variances add. Subtracting them understates the spread.

## The expected excess over a threshold

For a threshold $c$, the expected amount by which $X$ exceeds $c$ is

> $$E\left[(X - c)_+\right] = (\mu - c)\,\Phi\!\left(\frac{\mu - c}{\sigma}\right) + \sigma\,\phi\!\left(\frac{\mu - c}{\sigma}\right)$$

- $(X - c)_+$ is $X - c$ when $X > c$, and 0 otherwise.
- $\phi(z) = \frac{1}{\sqrt{2\pi}}e^{-z^2/2}$ is the standard normal density.

> [!example]- Losses are normal with mean 100 and standard deviation 20. What is the expected excess over 100? {Example}
> - $\frac{\mu - c}{\sigma} = 0$, so the first term is 0.
> - $\phi(0) = \frac{1}{\sqrt{2\pi}} = 0.3989$.
> - The expected excess is $20 \times 0.3989 = 7.98$.

## Approximating a count

By the [[Central Limit Theorem|central limit theorem]], a sum of many independent variables is approximately normal ([[Normal Approximation|normal approximation]]). For a count $X$ that takes whole-number values, add half a unit, the continuity correction:

> $$P(X \le k) \approx \Phi\!\left(\frac{k + 0.5 - \mu}{\sigma}\right)$$

> [!example]- A fair coin is tossed 100 times. What is the approximate probability of at most 55 heads? {Example}
> - The count is binomial with mean 50 and standard deviation 5.
> - $P(X \le 55) \approx \Phi\!\left(\frac{55.5 - 50}{5}\right) = \Phi(1.1) = 0.8643$.
