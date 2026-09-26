---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9d2fe1627ad142db1ffd8627096e290c40b945b811cc5cb3d9efa7119f0b67ce
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Sample.md
---

A **Random Sample** of size $n$ from a distribution with density $f(x \mid \theta)$ is a set of [[Independent and Identically Distributed|independent and identically distributed]] random variables $X_1, \ldots, X_n$, each with that distribution; the observed values $x_1, \ldots, x_n$ are the data. Functions of the sample that involve no unknown parameter — **statistics** — are what estimate the population's features.

> $$f(x_1, \ldots, x_n \mid \theta) = \prod_{i=1}^{n} f(x_i \mid \theta)$$

> $$\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$$

> $$S^2 = \frac{1}{n-1}\sum_{i=1}^{n} \left(X_i - \bar{X}\right)^2$$

- $\theta$ is the unknown population parameter. Read as a function of $\theta$ with the data plugged in, the product is the likelihood behind [[Maximum Likelihood Estimation]]; matching sample moments to population ones instead is the [[Method of Moments]].
- The [[Sample Mean]] and [[Sample Variance]] estimate $\mu$ and $\sigma^2$ [[Unbiasedness|without bias]]: $E[\bar{X}] = \mu$, $\text{Var}(\bar{X}) = \sigma^2/n$ and $E[S^2] = \sigma^2$. The estimated standard error of $\bar{X}$ is $S/\sqrt{n}$.
- Population quantities ($\mu$, $\sigma^2$, $\theta$) are fixed and unknown; statistics are random variables with a [[Sampling Distribution]] of their own.
- Sorting the sample gives the [[Order Statistics]] $X_{(1)} \le \cdots \le X_{(n)}$: the sample minimum, maximum, median and empirical percentiles. Their distributions come from counting how many observations fall below $x$ — a binomial$(n, F(x))$ count — so, for example, $P(X_{(n)} \le x) = F(x)^n$.
- **When data are not a random sample.** Claims from one catastrophe, or several years of one insured, are dependent ([[Clustered Data]]). Claims recorded only above a deductible come from a conditional distribution ([[Truncation]]), and claims capped at a policy limit are [[Censoring|censored]]. Each breaks the product formula and must be modelled explicitly.

> [!example]- Estimating Mean and Variance from Six Claims {Example}
> Six claims (in \$000s) are $2, 5, 6, 9, 13, 19$. Estimate the mean, the variance and the standard error of the mean, and find the sample median.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{x} &= \frac{54}{6} \\
> >         &= 9 \\
> > \sum x_i^2 &= 4 + 25 + 36 + 81 + 169 + 361 \\
> >            &= 676 \\
> > s^2 &= \frac{676 - 6(9)^2}{6 - 1} \\
> >     &= \frac{190}{5} \\
> >     &= 38
> > \end{align*}
> > $$
> > So $s = 6.16$ and the standard error of $\bar{x}$ is $6.16/\sqrt{6} = 2.52$. The sample median is the average of the third and fourth order statistics, $(6 + 9)/2 = 7.5$.
> >
> > The mean claim is estimated at \$9,000, give or take about \$2,500. The median of \$7,500 sitting below the mean is the right skew typical of severity data.

> [!example]- Sample Median of Five Exponential Claims {Example}
> Five claims are a random sample from an exponential distribution with mean \$1,000. Find the probability that the sample median exceeds the population mean.
>
> > [!answer]-
> > The median is $X_{(3)}$. It exceeds 1,000 exactly when at most 2 of the 5 claims are at or below 1,000. Each claim is, independently, with probability $p = F(1{,}000) = 1 - e^{-1} = 0.6321$, so the count is binomial$(5, p)$ with $1 - p = e^{-1}$:
> > $$
> > \begin{align*}
> > P(X_{(3)} > 1{,}000) &= \sum_{j=0}^{2} \binom{5}{j} p^j (1-p)^{5-j} \\
> >                      &= 0.0067 + 0.0579 + 0.1989 \\
> >                      &= 0.2636
> > \end{align*}
> > $$
> > The sample median lands above the true mean only about 26% of the time. It estimates the population *median*, $1{,}000 \ln 2 = 693$, not the mean — a right-skewed sample's median is the wrong statistic for pricing.
