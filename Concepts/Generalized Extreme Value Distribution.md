---
aliases:
  - Generalized Extreme
  - Extreme Value Distribution
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4ae2946017010e7d8d2dc54e57556e50bdd5014ced536e0e11a3bb061b627ca5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Generalized Extreme Value Distribution.md
---

A **Generalized Extreme Value Distribution** (GEV) is the only possible limit of a suitably normalized block maximum $M_n = \max(X_1, \ldots, X_n)$ of independent, identically distributed losses, much as the normal is the limit of a normalized sum. It is fitted to block maxima, such as the largest loss of each year, to estimate the probabilities and quantiles of extreme losses.

The maximum of a block is at most $m$ exactly when every loss in it is, so for a finite block

> $$\Pr(M_n \le m) = F(m)^n$$

- $F$ is the cdf of a single loss.

The GEV matters when $F$ is unknown in its tail and the maxima themselves are modelled. If there are constants $c_n > 0$ and $d_n$ for which the normalized maximum has a limit, that limit is

> $$\lim_{n \to \infty} \Pr\left[\frac{M_n - d_n}{c_n} \le x\right] = H(x)$$

- $H$ is a non-degenerate distribution.

The loss distribution $F$ is then said to be in the *maximum domain of attraction* (MDA) of $H$. The Fisher–Tippett–Gnedenko theorem says that $H$ must be a GEV.

Following Hardy and Saunders (the ASTAM study note on extreme value theory), with a location parameter $\mu$, a scale parameter $\theta > 0$ and a shape parameter $\xi \neq 0$, the GEV cdf is

> $$H_{\xi,\mu,\theta}(x) = \exp\left\{-\left[1 + \xi\,\frac{x - \mu}{\theta}\right]^{-1/\xi}\right\}$$

- The formula holds where $1 + \xi(x - \mu)/\theta > 0$. Outside that range, $H$ is 0 below the lower bound when $\xi > 0$ and 1 above the upper bound when $\xi < 0$.

As $\xi \to 0$, the cdf becomes

> $$H_{0,\mu,\theta}(x) = \exp\left\{-e^{-(x - \mu)/\theta}\right\}$$

> [!example]- How well does the GEV approximate the probability that this year's largest claim exceeds 20,000? {Example}
> A book has $n = 100$ independent large claims a year, each Pareto with $\alpha = 2.5$ and scale 1,000, so $S(x) = \left(\frac{1{,}000}{1{,}000 + x}\right)^{2.5}$. For the Pareto, the normalizing constants are $c_n = 1{,}000\,n^{1/\alpha}/\alpha$ and $d_n = 1{,}000\,(n^{1/\alpha} - 1)$, and $\xi = 1/\alpha$.
>
> > [!answer]-
> > - With $n = 100$, $n^{0.4} = 6.309573$, so $c_{100} = 2{,}523.83$, $d_{100} = 5{,}309.57$ and $\xi = 0.4$.
> > - The normalized level is $z = (20{,}000 - 5{,}309.57)/2{,}523.83 = 5.82069$, so $1 + 0.4z = 3.32828$.
> > - $H(z) = \exp\left(-3.32828^{-2.5}\right) = \exp(-0.049483) = 0.951722$.
> > - The approximation is $\Pr(M_{100} > 20{,}000) \approx 1 - 0.951722 = 0.048278$.
> > - Exactly, $S(20{,}000) = 0.000494825$, and $1 - (1 - 0.000494825)^{100} = 0.048290$.
> > - For a Pareto, $(1 + \xi z)^{-1/\xi}$ equals $n\,S(x)$, so the approximation $1 - e^{-nS(x)}$ is close to the exact $1 - (1 - S(x))^n$ whenever $S(x)$ is small.

## The three cases

The sign of the shape parameter $\xi$ classifies the tail of the loss distribution:

| Case | $\xi$ | Support | MDA includes |
| :--- | :--- | :--- | :--- |
| Fréchet | $\xi > 0$ | bounded below, fat tail, moments only of order below $1/\xi$ | Pareto ($\xi = 1/\alpha$), Student's $t$, Burr |
| Gumbel | $\xi = 0$ | unbounded, every moment | normal, exponential, gamma, lognormal |
| Weibull | $\xi < 0$ | bounded above at $\mu - \theta/\xi$ | uniform, beta |

The Weibull extreme value distribution is not the [[Weibull Distribution|Weibull severity]] of the exam tables, to which it is related by a change of sign.

## Quantiles of a block maximum

The $p$-quantile of a block maximum that follows the GEV is

> $$Q_p(M) = \mu + \frac{\theta}{\xi}\left[(-\ln p)^{-\xi} - 1\right]$$

- When $\xi = 0$, the quantile is $\mu - \theta \ln(-\ln p)$.

The GEV describes the largest loss in a block, not a single loss. A 1% chance that the annual maximum exceeds $x$ is not a 1% chance that a single loss does. For a single loss in a block of $n$, $S(x) \approx -\ln H(x)/n$.

> [!example]- What are $\Pr(M > 30)$ and the 99th percentile of the annual maximum, and how does a Gumbel fit compare? {Example}
> A GEV fitted to the annual maximum catastrophe loss (in millions) has $\xi = 0.2$, $\mu = 10$ and $\theta = 4$. The Gumbel fit has the same $\mu$ and $\theta$.
>
> > [!answer]-
> > - At $x = 30$, $1 + 0.2(30 - 10)/4 = 2$, and $2^{-1/0.2} = 2^{-5}$.
> > - $\Pr(M > 30) = 1 - \exp\left(-2^{-5}\right) = 1 - e^{-0.03125} = 0.030767$, about one year in 33.
> > - With $p = 0.99$, $-\ln p = 0.0100503$, and $(0.0100503)^{-0.2} - 1 = 1.509365$.
> > - $Q_{0.99}(M) = 10 + \frac{4}{0.2}(1.509365) = 40.19$ million.
> > - The Gumbel quantile is $10 - 4\ln(0.0100503) = 28.40$ million, almost 30% lower.

## Fitting to block maxima

The data are split into blocks, the maximum of each block is taken, and the GEV is fitted to the maxima by [[Maximum Likelihood Estimation|maximum likelihood]]. Larger blocks put the maxima further into the tail but leave fewer of them, so $\xi$ is estimated with a large standard error. Blocks that are too small give a biased fit, and too few maxima give a variable one. The fitted $\mu$ and $\theta$ change with the block size, but $\xi$ should not.

> [!trap] Assuming a Gumbel tail
> Setting $\xi = 0$ because its estimate is uncertain understates every extreme quantile when the true $\xi$ is positive. In the catastrophe example, the Gumbel's one-in-100-year maximum of 28.40 million is almost 30% below the GEV's 40.19 million.
