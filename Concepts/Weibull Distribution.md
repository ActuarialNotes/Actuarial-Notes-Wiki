---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:e10f45d222d845f8c72525231cbacdf14df0384fe25fd927966c7838d58ae889
  sources:
    - "CAS Exam MAS-I Tables, Appendix A.3.2.3 Weibull (theta, tau): f(x) = tau (x/theta)^tau e^-(x/theta)^tau / x, F(x) = 1 - e^-(x/theta)^tau, E[X^k] = theta^k Gamma(1 + k/tau) for k > -tau, E[(X^x)^k] = theta^k Gamma(1+k/tau) Gamma[1+k/tau; (x/theta)^tau] + x^k e^-(x/theta)^tau, mode theta((tau-1)/tau)^(1/tau) for tau > 1 else 0, PDF p.12; A.1 incomplete gamma Gamma(alpha; x) = (1/Gamma(alpha)) int_0^x t^(alpha-1) e^-t dt, PDF p.8, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random), §4 Special Distributions, 'Weibull' page: quantile F^-1(p) = b[-ln(1-p)]^(1/k); failure rate R(t) = k t^(k-1)/b^k, decreasing for k<1, constant for k=1, increasing for k>1; shape 1 = exponential with scale b; Z^k standard exponential; minimum of n iid Weibull(k, b) is Weibull(k, b/n^(1/k)), sha256:d673ebeb4242d5daa56d213fd6245374f7ead872173ad01ad58e5e74ee4bc57f — https://www.randomservices.org/random/special/Weibull.html; Frees et al., Loss Data Analytics (open text), Ch 3 'Modeling Loss Severity': §3.2.3 Weibull Distribution (hazard decreasing for shape < 1, constant for 1, increasing for > 1), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html; Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview, printed Contents p.viii (PDF p.10): §2.2.3 Weibull distribution p.51, sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, 8.2.2.1 Weibull probability plotting: ln ln(1/[1 - F(t)]) = gamma ln t - gamma ln alpha; points line up roughly on a straight line with slope gamma; the first few points have more variability (fetched 2026-10-30) — https://www.itl.nist.gov/div898/handbook/apr/section2/apr221.htm"
    - "Siegrist, 5.38 The Weibull Distribution: reliability exp[-(t/b)^k], shape 1 is the exponential — https://www.randomservices.org/random/special/Weibull.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Weibull Distribution.md
---

A **Weibull Distribution** is a continuous distribution on $(0, \infty)$ with scale parameter $\theta > 0$ and shape parameter $\tau > 0$. Its distribution function is

> $$F(x) = 1 - e^{-(x/\theta)^{\tau}}$$

and its density is

> $$f(x) = \frac{\tau\,(x/\theta)^{\tau}\,e^{-(x/\theta)^{\tau}}}{x}$$

- $x > 0$.

The survival function is $S(x) = e^{-(x/\theta)^{\tau}}$. When $\tau = 1$ the Weibull distribution is the [[Exponential Distribution|exponential distribution]] with mean $\theta$. It is used for claim severities and for lifetimes.

> [!example]- Losses follow a Weibull distribution with $\theta = 2{,}000$ and $\tau = 0.5$. What is the probability that a loss exceeds 5,000? {Example}
> - The power is $(5{,}000/2{,}000)^{0.5} = 1.5811$.
> - The probability is $S(5{,}000) = e^{-1.5811} = 0.2057$.

## Moments of the Weibull distribution

The $k$th moment of the Weibull distribution is

> $$E[X^k] = \theta^k\,\Gamma\left(1 + \frac{k}{\tau}\right)$$

- $\Gamma$ is the gamma function, with $\Gamma(n) = (n-1)!$ for a positive integer $n$.
- $k > -\tau$.

The mean is $\theta\,\Gamma(1 + 1/\tau)$, and the variance is $E[X^2] - (E[X])^2$.

> [!example]- Losses follow a Weibull distribution with $\theta = 2{,}000$ and $\tau = 0.5$. What are the mean and the variance of a loss? {Example}
> - With $1/\tau = 2$, the mean is $E[X] = 2{,}000\,\Gamma(3) = 2{,}000 \times 2 = 4{,}000$.
> - The second moment is $E[X^2] = 2{,}000^2\,\Gamma(5) = 4{,}000{,}000 \times 24 = 96{,}000{,}000$.
> - The variance is $96{,}000{,}000 - 4{,}000^2 = 80{,}000{,}000$.

## Hazard rate of the Weibull distribution

The [[Hazard Rate|hazard rate]] of the Weibull distribution is

> $$h(x) = \frac{\tau\,x^{\tau - 1}}{\theta^{\tau}}$$

The hazard rate decreases when $\tau < 1$, is constant at $1/\theta$ when $\tau = 1$, and increases when $\tau > 1$. A Weibull distribution with $\tau < 1$ has a heavier [[Tail Weight|tail]] than the exponential and an increasing mean excess loss. A Weibull distribution with $\tau > 1$ has a lighter tail than the exponential, because its survival function decays faster than any exponential.

> [!example]- Losses follow a Weibull distribution with $\theta = 2{,}000$ and $\tau = 0.5$. What is the hazard rate at 500 and at 5,000? {Example}
> - The hazard rate is $h(x) = \frac{0.5\,x^{-0.5}}{2{,}000^{0.5}}$.
> - At 500 it is $h(500) = 0.000500$, and at 5,000 it is $h(5{,}000) = 0.000158$.
> - The hazard rate decreases, as it does for every Weibull distribution with $\tau < 1$.

## Simulation by inversion

Setting $F(x) = U$ for a uniform random number $U$ and solving for $x$ gives the [[Inversion Method|inversion]] formula

> $$x = \theta\left[-\ln(1 - U)\right]^{1/\tau}$$

> [!example]- A Weibull distribution has $\theta = 2{,}000$ and $\tau = 0.5$. What value is simulated from the uniform random number $U = 0.6$? {Example}
> - $-\ln(1 - 0.6) = 0.9163$.
> - $x = 2{,}000 \times 0.9163^{2} = 1{,}679.18$.

## Checking a Weibull fit graphically

Taking logarithms of the survival function $S(x) = e^{-(x/\theta)^{\tau}}$ twice gives a straight line in $\ln x$:

> $$\ln[-\ln S(x)] = \tau\ln x - \tau\ln\theta$$

To check a Weibull fit graphically, plot $\ln[-\ln S_n(x)]$ against $\ln x$, where $S_n$ is the empirical survival function. Data from a Weibull distribution lie close to a straight line whose slope estimates the shape $\tau$ and whose intercept is $-\tau\ln\theta$. A slope near 1 points to the exponential.

## Minimum of independent Weibull random variables

If $X_1, \ldots, X_n$ are independent and each is Weibull with parameters $\theta$ and $\tau$, then $P(\min X_i > x) = e^{-n(x/\theta)^{\tau}}$. The minimum is Weibull with shape $\tau$ and scale

> $$\theta\,n^{-1/\tau}$$

This is the lifetime of a [[System Reliability|series system]] of $n$ identical components. For exponential lifetimes ($\tau = 1$), the minimum of $n$ independent exponentials with rate $\lambda$ is exponential with rate $n\lambda$.

> [!example]- A series system has 4 independent components, each with a Weibull lifetime with $\theta = 2{,}000$ and $\tau = 0.5$. What is the probability that the system survives to time 500? {Example}
> - The system's lifetime is Weibull with $\tau = 0.5$ and $\theta = 2{,}000 \times 4^{-2} = 125$.
> - The probability is $e^{-(500/125)^{0.5}} = e^{-2} = 0.1353$.

> [!trap] Treating $\theta$ as a rate
> In $F(x) = 1 - e^{-(x/\theta)^{\tau}}$, $\theta$ divides $x$ inside the power. With $\theta = 2{,}000$ and $\tau = 0.5$, $P(X > 5{,}000) = e^{-(5{,}000/2{,}000)^{0.5}} = 0.2057$, not $e^{-5{,}000^{0.5}/2{,}000} = 0.9653$.
