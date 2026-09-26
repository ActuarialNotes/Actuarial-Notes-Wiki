---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3e5d44889d16290a0a2c25ebb6e29b224d83932350b0a86c5c1e58ede0780b35
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moment.md
---

The $n$-th **Moment** of a [[Random Variable]] $X$ is the [[Expected Value]] of its $n$-th power, $E[X^n]$ (a *raw* moment); the $n$-th *central* moment $E[(X - \mu)^n]$ measures the same thing about the mean $\mu$. The first four summarise a distribution's location, spread, asymmetry and tail weight.

> $$\mu_n' = E[X^n] = \int_{-\infty}^{\infty} x^n f(x)\,dx$$

> $$\mu_n = E\big[(X - \mu)^n\big]$$

- The mean is $\mu = \mu_1'$. For a discrete variable the integral becomes $\sum_x x^n\,p(x)$.
- The second central moment is the [[Variance]], $\mu_2 = E[X^2] - \mu^2$. The third gives the **skewness** $\gamma_1 = \mu_3/\sigma^3$, computed from raw moments as $\mu_3 = E[X^3] - 3\mu E[X^2] + 2\mu^3$. The fourth gives the kurtosis $\mu_4/\sigma^4$, which is 3 for a normal.
- Closed forms worth memorising: [[Exponential Distribution|exponential]] $E[X^n] = n!\,\theta^n$; [[Gamma]] $E[X^n] = \theta^n\,\alpha(\alpha+1)\cdots(\alpha+n-1)$; [[Lognormal Distribution|lognormal]] $E[X^n] = e^{n\mu + n^2\sigma^2/2}$. The moment generating function $M_X(t) = E[e^{tX}]$ produces every raw moment as $E[X^n] = M_X^{(n)}(0)$.
- Moments need not exist. A heavy-tailed Pareto with shape $\alpha$ has $E[X^n]$ finite only for $n < \alpha$, so a fitted $\alpha \le 2$ means an infinite variance.
- Moments of several variables — $E[XY]$ and [[Covariance]] — are in [[Moments for Joint Distributions]] and [[Moments for Linear Combinations]]. Setting sample moments equal to these formulas is the [[Method of Moments]].
- **Exam 7.** An [[Unpaid Claim Distribution|unpaid claim distribution]] is summarised by its moments: the mean (the central estimate), the standard deviation (the [[Prediction Error|prediction error]]), the CV and the skewness. [[Percentile|Percentiles]] then come from a distribution fitted to those moments — commonly a lognormal, which is positive and right-skewed like the liability it describes.

> [!example]- Skewness of an Exponential Severity {Example}
> Claim sizes are exponential with mean $\theta = 1{,}000$. Find the first three raw moments, the variance and the skewness.
>
> > [!answer]-
> > From $E[X^n] = n!\,\theta^n$: $E[X] = 1{,}000$, $E[X^2] = 2{,}000{,}000$ and $E[X^3] = 6 \times 10^9$.
> > $$
> > \begin{align*}
> > \sigma^2 &= 2{,}000{,}000 - 1{,}000^2 \\
> >          &= 1{,}000{,}000 \\
> > \mu_3 &= 6 \times 10^9 - 3(1{,}000)(2 \times 10^6) + 2(1{,}000)^3 \\
> >       &= 2 \times 10^9 \\
> > \gamma_1 &= \frac{2 \times 10^9}{1{,}000^3} \\
> >          &= 2
> > \end{align*}
> > $$
> > The standard deviation equals the mean ($\text{CV} = 1$) and the skewness is 2 whatever $\theta$ is: both are scale-free, so every exponential severity has the same shape.

> [!example]- Reserve Percentile from Two Moments {Example}
> A chain-ladder analysis gives total unpaid claims with mean $R = \$10.0$ million and standard error $\$2.5$ million. Fit a lognormal with those two moments, as Mack (1994) suggests for a skewed reserve distribution, and find its 95th percentile. Compare with a normal.
>
> > [!answer]-
> > Match the CV, $2.5/10 = 0.25$, then the mean. Working in \$ millions:
> > $$
> > \begin{align*}
> > \sigma^2 &= \ln(1 + 0.25^2) \\
> >          &= \ln 1.0625 \\
> >          &= 0.06062 \\
> > \sigma &= 0.2462 \\
> > \mu &= \ln 10 - \tfrac{1}{2}(0.06062) \\
> >     &= 2.2723
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > x_{0.95} &= e^{\mu + 1.645\sigma} \\
> >          &= e^{2.2723 + 0.4050} \\
> >          &= 14.55
> > \end{align*}
> > $$
> > A normal with the same moments gives $10 + 1.645(2.5) = 14.11$. The lognormal 95th percentile is \$14.55 million, about \$0.43 million higher, and its median $e^{\mu} = 9.70$ sits below the mean. Two distributions sharing a mean and a variance still disagree in the tail — the skewness they don't share is what a [[Risk Margin|risk margin]] set at a percentile is sensitive to.
