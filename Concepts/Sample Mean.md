The **Sample Mean** $\bar{X}$ is the arithmetic average of a random sample and the standard estimator of the population mean $\mu$. It is [[Unbiasedness|unbiased]], [[Consistency|consistent]], and — for a Normal population — the [[Minimum Variance]] unbiased estimator.

> $$\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$$

> $$E[\bar{X}] = \mu, \qquad \text{Var}(\bar{X}) = \frac{\sigma^2}{n}$$

- The **standard error** is $\text{SD}(\bar{X}) = \sigma/\sqrt{n}$; estimated from data it is $S/\sqrt{n}$. Halving it requires four times the sample
- By the [[Central Limit Theorem]], $\bar{X}$ is approximately $N(\mu, \sigma^2/n)$ for large $n$ whatever the population shape — the fact behind almost every test and [[Confidence Interval]] in this section
- For a Normal population the result is exact: $\bar{X} \sim N(\mu, \sigma^2/n)$, and $\bar{X}$ is independent of the [[Sample Variance]] $S^2$
- $\bar{X}$ is the [[Maximum Likelihood Estimation|MLE]] of $\mu$ for Normal, Poisson, and exponential data, and is a function of the [[Sufficient Statistic]] $\sum X_i$ in each case
- It is **not resistant**: one extreme claim shifts $\bar{X}$ without limit, which is why a [[Box Plot]]'s median is reported alongside it for skewed severity data
- With unequal exposures, the exposure-weighted mean $\sum w_i X_i / \sum w_i$ is the right estimator — the same idea that a GLM handles with an [[Offset Variable|offset]] or weights

![[Media/Figures/Sample_Mean.svg|340]]

> [!example]- Standard Error and Sample Size {Example}
> Claim severity has $\sigma = 4{,}000$. How large must $n$ be for the standard error of $\bar{X}$ to be at most $200$?
>
> > [!answer]-
> > $$\frac{\sigma}{\sqrt{n}} \le 200 \ \Longrightarrow\ \sqrt{n} \ge \frac{4{,}000}{200} = 20 \ \Longrightarrow\ n \ge 400$$
> > A sample of $400$ claims pins the mean down to within roughly $\pm 400$ (two standard errors) with $95\%$ confidence.

> [!example]- Probability the Sample Mean Misses {Example}
> A sample of $n = 100$ claims is drawn from a population with $\mu = 5{,}000$ and $\sigma = 1{,}500$. Find $P(\bar{X} > 5{,}300)$.
>
> > [!answer]-
> > By the [[Central Limit Theorem]], $\bar{X} \approx N(5{,}000,\ 1{,}500^2/100) = N(5{,}000,\ 150^2)$.
> > $$Z = \frac{5{,}300 - 5{,}000}{150} = 2.00 \ \Longrightarrow\ P(\bar{X} > 5{,}300) \approx 1 - 0.9772 = 0.0228$$
