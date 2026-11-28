---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:53bd6361d5368583b58000f7fa515cebffa170fbcab3b7abe1a9026613de76dd
  sources:
    - "https://www.randomservices.org/random/expect/Generating.html, §4.6 Generating functions, The Moment Generating Function, sha256:40fa48baaa2d9caa1ce28569da70af31c2cf65cd86f0fe091974481ad6a2b625 — https://www.randomservices.org/random/expect/Generating.html"
    - "https://www.randomservices.org/random/expect/Skew.html, §4.4 Skewness and kurtosis, Skewness, sha256:45d1ae0c75cf3412cbf7e56ea88b6715cbd7520b581ff1e2808468f3d5b534c2 — https://www.randomservices.org/random/expect/Skew.html"
    - "https://www.randomservices.org/random/expect/Properties.html, §4.1 Expected value, continuous distribution and change of variables, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §6.2 Theorem 6.6, PDF p.266 (printed p.258), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "https://www.casact.org/sites/default/files/database/forum_94spforum_94spf101.pdf, printed pp.117-118, eq. (10), PDF pp.18-19, sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/database/forum_94spforum_94spf101.pdf"
    - "https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf, A.2.3.1 Pareto, PDF p.8; A.3.3.1 Exponential, PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Moment.md
---

A **Moment** of a [[Random Variable|random variable]] $X$ is the [[Expected Value|expected value]] of a power of $X$. The $n$th moment of $X$, also called the $n$th raw moment, is

> $$E[X^n] = \int_{-\infty}^{\infty} x^n f(x)\,dx$$

- $f(x)$ is the [[Probability Density Function (PDF)|density]] of $X$.
- For a discrete $X$, the integral is the sum $\sum_x x^n f(x)$.

The first moment is the mean $\mu$. "The second moment" said without qualification is $E[X^2]$, taken about 0, not the variance.

> [!example]- Claim sizes $X$ are exponential with mean $\theta = 1{,}000$. What is $E[X^2]$? {Example}
> - The density is $f(x) = \frac{1}{\theta}e^{-x/\theta}$ for $x > 0$.
> - Integrating by parts twice gives $E[X^2] = 2\theta^2$.
> - $E[X^2] = 2(1{,}000)^2 = 2{,}000{,}000$.
> - In general, an [[Exponential Distribution|exponential]] has $E[X^n] = n!\,\theta^n$.

## Central moments

The $n$th central moment is the same expected value taken about the mean $\mu$:

> $$E\big[(X - \mu)^n\big]$$

The second central moment is the [[Variance|variance]]. It is found from the first two raw moments:

> $$\text{Var}(X) = E[X^2] - \mu^2$$

So the second moment is $E[X^2] = \text{Var}(X) + \mu^2$.

> [!example]- A claim count $N$ has mean 2 and variance 3. What is $E[N^2]$? {Example}
> - The second moment is the variance plus the square of the mean.
> - $E[N^2] = 3 + 2^2 = 7$.

## Skewness

The skewness measures a distribution's asymmetry. It is the third central moment divided by the cube of the [[Standard Deviation|standard deviation]] $\sigma$:

> $$\gamma_1 = \frac{E\big[(X - \mu)^3\big]}{\sigma^3}$$

A positive skewness means a long right tail. Every odd central moment of a symmetric distribution is 0, so its skewness is 0.

> [!example]- Claim sizes $X$ are exponential with mean 1,000, so $E[X^2] = 2 \times 10^6$ and $E[X^3] = 6 \times 10^9$. What is the skewness? {Example}
> - The third central moment expands into raw moments:
>
> $$
> \begin{aligned}
> & E\big[(X - \mu)^3\big] \\
> &= E[X^3] - 3\mu E[X^2] + 2\mu^3 \\
> &= 6 \times 10^9 - 6 \times 10^9 + 2 \times 10^9 \\
> &= 2 \times 10^9
> \end{aligned}
> $$
>
> - The variance is $2 \times 10^6 - 10^6 = 10^6$, so $\sigma = 1{,}000$.
> - The skewness is $\frac{2 \times 10^9}{10^9} = 2$.

## Moments from the moment generating function

The moment generating function of $X$ is $M_X(t) = E[e^{tX}]$. Its $n$th derivative at 0 is the $n$th moment:

> $$E[X^n] = M_X^{(n)}(0)$$

The function itself gives other expected values, such as $E[e^{X}] = M_X(1)$.

> [!example]- An exponential $X$ with mean $\theta$ has $M_X(t) = (1 - \theta t)^{-1}$. What are $E[X]$ and $E[X^2]$? {Example}
> - The first derivative is $M_X'(t) = \theta(1 - \theta t)^{-2}$, so $E[X] = M_X'(0) = \theta$.
> - The second derivative is $M_X''(t) = 2\theta^2(1 - \theta t)^{-3}$.
> - So $E[X^2] = M_X''(0) = 2\theta^2$.

## Moments that do not exist

A moment exists only when its sum or integral converges. An integral of $x^{-k}$ from 1 to $\infty$ converges only when

> $$k > 1$$

A heavy-tailed [[Pareto Distribution|Pareto]] with shape $\alpha$ has $E[X^n]$ finite only for $n < \alpha$.

> [!example]- A loss $X$ has density $f(x) = 2x^{-3}$ for $x > 1$. Do $E[X]$ and $E[X^2]$ exist? {Example}
> - $E[X] = \int_1^{\infty} 2x^{-2}\,dx$. The power is $k = 2 > 1$, so it converges, to 2.
> - $E[X^2] = \int_1^{\infty} 2x^{-1}\,dx$. The power is $k = 1$, so it diverges.
> - The mean is 2, and the second moment does not exist.

## Matching a lognormal to two moments

A [[Lognormal Distribution|lognormal]] is a random variable whose logarithm is normal with mean $\mu$ and variance $\sigma^2$. The lognormal with a given mean $m$ and standard deviation $s$ has

> $$\sigma^2 = \ln\!\left(1 + \frac{s^2}{m^2}\right)$$

> $$\mu = \ln m - \frac{\sigma^2}{2}$$

Mack (1994) uses this to fit a lognormal to a chain-ladder reserve and its standard error, and reads [[Percentile|percentiles]] off it.

> [!example]- A reserve has mean 100 and standard error 50. Which lognormal has the same mean and standard deviation? {Example}
> - $\sigma^2 = \ln(1 + 0.25) = 0.2231$.
> - $\mu = \ln 100 - 0.1116 = 4.4936$.

> [!trap] A formula for a moment that does not exist
> The Pareto formula for $E[X^2]$ still returns a number when $\alpha \leq 2$, and that number means nothing. Check $n < \alpha$ before using it.
