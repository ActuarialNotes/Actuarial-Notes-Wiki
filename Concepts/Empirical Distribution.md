---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:718b941ec0068c0fcd2c156bdc57beec5fed83282979d61d0b59e1b7f9c8ff59
  sources:
    - "Loss Data Analytics (Frees et al., open textbook), ch.4 §4.1.1.1-4.1.1.2: sample moment estimators (central moment divides by n; s^2 divides by n - 1 and is unbiased); E[g(X)] estimated by n^-1 sum g(X_i); F_n(x) = n^-1 sum I(X_i <= x), I(X <= x) Bernoulli; probability 1/n on each observation; discrete and right-continuous; kernel density estimators; product-limit (Kaplan-Meier) estimator for censored data, sha256:c5fe1ff26cec4dee6f8bcc285b75c840202c947246f7b5d5598f9b837ccad021 — https://openacttexts.github.io/Loss-Data-Analytics/ChapModelSelection.html"
    - "Siegrist, Random, ch.6 §1 Estimators: for fixed y the empirical distribution function F_n(y) is the sample mean of 1(Y <= y), unbiased for F(y) and consistent; mean-square consistency implies consistency, sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "Loss Data Analytics, ch.3 Modeling Loss Severity, §3.4.1 Policy Deductibles: LER = (E(X) - E(Y^L))/E(X), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), reading list PDF p.6: Tse §11.1, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge 2009), publisher preview, printed contents PDF pp.10-13: §11.1.1 'Empirical distribution' (contents only; body not freely available), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Empirical Distribution.md
---

An **Empirical Distribution** of a sample $x_1, \ldots, x_n$ is the discrete distribution that puts probability $1/n$ on each observation. Its [[Cumulative Distribution Function (CDF)|cdf]], the empirical distribution function $F_n(x)$, is the proportion of the observations at or below $x$:

> $$F_n(x) = \frac{1}{n}\sum_{i=1}^{n} \mathbf{1}\{x_i \le x\}$$

- $\mathbf{1}\{x_i \le x\}$ is 1 when $x_i \le x$ and 0 otherwise.

$F_n$ is a step function that jumps by $1/n$ at each observation, and by $m/n$ at a value observed $m$ times. It needs complete individual data. With [[Censoring|censored]] or [[Truncation|truncated]] observations, the proportion at or below $x$ is unknown. [[Kernel Density Estimation]] smooths the empirical distribution into a continuous one.

> [!example]- Ten claims are 200, 350, 350, 500, 500, 500, 800, 1,200, 1,200 and 3,000. What are $F_{10}(350)$, $F_{10}(499)$, $F_{10}(500)$ and $F_{10}(1{,}000)$? {Example}
> - Three claims are at or below 350, so $F_{10}(350) = 3/10 = 0.3$.
> - No claim lies between 350 and 499, so $F_{10}(499) = 0.3$.
> - The three claims of 500 add $3/10$, so $F_{10}(500) = 0.6$.
> - Seven claims are at or below 1,000, so $F_{10}(1{,}000) = 0.7$.

## Expected values under the empirical distribution

The empirical distribution puts probability $1/n$ on each observation, so the expected value of a function $g(X)$ is estimated by the average

> $$\frac{1}{n}\sum_{i=1}^{n} g(x_i)$$

The mean of the empirical distribution is the [[Sample Mean|sample mean]] $\bar{x}$. Its variance divides the sum of squared deviations by $n$, not by $n - 1$ as the [[Sample Variance|sample variance]] does. The [[Limited Expected Value|limited expected value]] $E[X \wedge u]$ is estimated by capping each observation at $u$ and averaging the capped values.

> [!example]- For the ten claims above, what are the mean and the variance of the empirical distribution, and what is the estimated [[Loss Elimination Ratio|loss elimination ratio]] of a deductible of 500? {Example}
> - The mean is $\bar{x} = 8{,}600/10 = 860$.
> - The sum of squared deviations from 860 is 6,159,000, so the variance is $6{,}159{,}000/10 = 615{,}900$.
> - Capped at 500, the claims are 200, 350, 350 and seven of 500, so the estimate of $E[X \wedge 500]$ is $4{,}400/10 = 440$.
> - The estimated loss elimination ratio is $440/860 = 0.512$.

## The empirical distribution function as an estimator

For a [[Random Sample|random sample]] from a distribution with cdf $F$, each observation is at or below $x$ independently with probability $F(x)$. The number of observations at or below $x$, $nF_n(x)$, is therefore [[Binomial Distribution|binomial]] with $n$ trials and probability $F(x)$. So $F_n(x)$ is an [[Unbiasedness|unbiased]] estimator of $F(x)$, with variance

> $$\text{Var}\bigl(F_n(x)\bigr) = \frac{F(x)\bigl(1 - F(x)\bigr)}{n}$$

The variance is estimated by putting $F_n(x)$ in place of $F(x)$. The standard error is proportional to $1/\sqrt{n}$, so halving it requires four times the number of observations. For a given $n$ it is largest where $F(x) = 0.5$.

> [!example]- For the ten claims above, what is the estimated standard error of $F_{10}(500)$ as an estimate of $F(500)$? {Example}
> - $F_{10}(500) = 0.6$.
> - The estimated variance is $0.6 \times 0.4/10 = 0.024$.
> - The estimated standard error is $\sqrt{0.024} = 0.155$.
