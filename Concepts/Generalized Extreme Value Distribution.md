---
aliases:
  - Generalized Extreme
  - Extreme Value Distribution
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3053808b4ac868d012289ede00a8f24471f8c047a1f698b174f2ed6e3896f7df
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Generalized Extreme Value Distribution.md
---

**The Generalized Extreme Value (GEV) Distribution** is the only possible limit of a suitably normalized block maximum $M_n = \max(X_1, \ldots, X_n)$ of independent, identically distributed losses, much as the normal is the limit of a normalized sum. Its shape parameter $\xi$ classifies the tail of the loss distribution into three cases, the Gumbel ($\xi = 0$), the Fréchet ($\xi > 0$) and the Weibull ($\xi < 0$). It is fitted to block maxima, such as the largest loss of each year, to estimate the probabilities and quantiles of extreme losses.

> $$\lim_{n \to \infty} \Pr\left[\frac{M_n - d_n}{c_n} \le x\right] = H(x)$$

> $$H_{\xi,\mu,\theta}(x) = \exp\left\{-\left[1 + \xi\,\frac{x - \mu}{\theta}\right]^{-1/\xi}\right\}$$

> $$H_{0,\mu,\theta}(x) = \exp\left\{-e^{-(x - \mu)/\theta}\right\}$$

> $$Q_p(M) = \mu + \frac{\theta}{\xi}\left[(-\ln p)^{-\xi} - 1\right]$$

- **Symbols:** Following Hardy and Saunders (the ASTAM study note on extreme value theory), $\mu$ is a location parameter, $\theta > 0$ a scale parameter and $\xi$ the shape parameter. The second block is the case $\xi \neq 0$ and holds where $1 + \xi(x - \mu)/\theta > 0$, and the third is its limit as $\xi \to 0$. The constants $c_n > 0$ and $d_n$ normalize the maximum, and the last block is the $p$-quantile of a block maximum that follows the GEV, which becomes $\mu - \theta \ln(-\ln p)$ when $\xi = 0$. When the first block holds, the loss distribution $F$ is said to be in the *maximum domain of attraction* (MDA) of $H$.
- **Fisher–Tippett–Gnedenko theorem:** If $F$ is in the MDA of a non-degenerate distribution $H$, then $H$ must be a GEV. For a finite block, $\Pr(M_n \le m) = F(m)^n$ exactly, so the theorem matters when $F$ is unknown in its tail and the maxima themselves are modelled.
- **The three cases:** The Fréchet case, $\xi > 0$, is bounded below and has a fat tail, with moments only of order below $1/\xi$, and its MDA includes the Pareto (with $\xi = 1/\alpha$), Student's $t$ and Burr distributions. The Gumbel case, $\xi = 0$, is unbounded, and its MDA includes the normal, exponential, gamma and lognormal distributions, all of which have every moment. The Weibull case, $\xi < 0$, is bounded above at $\mu - \theta/\xi$, and its MDA includes the uniform and beta distributions.
- **Fitting:** The data are split into blocks, the maximum of each block is taken, and the GEV is fitted to the maxima by [[Maximum Likelihood Estimation|maximum likelihood]]. Larger blocks put the maxima further into the tail but leave fewer of them, so $\xi$ is estimated with a large standard error. The fitted $\mu$ and $\theta$ change with the block size, but $\xi$ should not.

> [!example]- Pareto Maxima and the Fréchet Limit {Example}
> A book has 100 independent large claims a year, each Pareto with $\alpha = 2.5$ and scale 1,000, so $S(x) = \left(\frac{1{,}000}{1{,}000 + x}\right)^{2.5}$. For the Pareto, the normalizing constants are $c_n = 1{,}000\,n^{1/\alpha}/\alpha$ and $d_n = 1{,}000\,(n^{1/\alpha} - 1)$, and $\xi = 1/\alpha$. Use the GEV to approximate the probability that the year's largest claim exceeds 20,000, and compare it with the exact value.
>
> > [!answer]-
> > With $n = 100$, $n^{0.4} = 6.309573$, so $c_{100} = 2{,}523.83$ and $d_{100} = 5{,}309.57$, and $\xi = 0.4$.
> > $$
> > \begin{align*}
> > z &= \frac{20{,}000 - 5{,}309.57}{2{,}523.83} \\
> > &= 5.82069 \\
> > 1 + 0.4z &= 3.32828 \\
> > H(z) &= \exp\left(-3.32828^{-2.5}\right) \\
> > &= \exp(-0.049483) \\
> > &= 0.951722
> > \end{align*}
> > $$
> > The approximation is $\Pr(M_{100} > 20{,}000) \approx 0.048278$. Exactly, $S(20{,}000) = 0.000494825$, and $1 - (1 - 0.000494825)^{100} = 0.048290$. For a Pareto, $(1 + \xi z)^{-1/\xi}$ equals $n\,S(x)$, so the approximation is $1 - e^{-nS(x)}$ against the exact $1 - (1 - S(x))^n$, and the two agree closely whenever $S(x)$ is small.

> [!example]- Tail Estimates From a Fitted GEV {Example}
> A GEV fitted to the annual maximum catastrophe loss (in \$ millions) has $\xi = 0.2$, $\mu = 10$ and $\theta = 4$. Find the probability that next year's largest loss exceeds 30, and the 99th percentile of the annual maximum. Compare the percentile with a Gumbel fit that has the same $\mu$ and $\theta$.
>
> > [!answer]-
> > At $x = 30$, $1 + 0.2(30 - 10)/4 = 2$, and $2^{-1/0.2} = 2^{-5}$.
> > $$
> > \begin{align*}
> > \Pr(M > 30) &= 1 - \exp\left(-2^{-5}\right) \\
> > &= 1 - e^{-0.03125} \\
> > &= 0.030767 \\
> > Q_{0.99}(M) &= 10 + \frac{4}{0.2}\left[(0.0100503)^{-0.2} - 1\right] \\
> > &= 10 + 20(1.509365) \\
> > &= 40.19
> > \end{align*}
> > $$
> > A loss of 30 million is exceeded in about one year in 33, and the annual maximum exceeds 40.19 million in one year in 100. The Gumbel quantile is $10 - 4\ln(0.0100503) = 28.40$, so ignoring the positive shape understates the one-in-100-year maximum by almost 30%.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to understand the derivation and characteristics of the GEV. A question gives a loss distribution and normalizing constants and asks for the limiting distribution of the maximum, as in showing that the exponential is in the Gumbel MDA, or asks which case a distribution belongs to from its support and its moments.
> - **Tail estimates:** ASTAM also asks candidates to apply the GEV to tail probabilities and risk measures. A question gives fitted values of $\xi$, $\mu$ and $\theta$ and asks for the probability that a block maximum exceeds a level, or for a quantile of the block maximum.
> - **Written comments:** The reading's exercises also ask for the trade-off in choosing the block size, between the bias of blocks that are too small and the variance of too few maxima.

> [!warning]- Exam traps
> - **The sign of $\xi$:** The Fréchet case is $\xi > 0$ and has the heavy tail, and the Weibull case is $\xi < 0$ and is bounded above. The Weibull extreme value distribution is not the [[Weibull Distribution|Weibull severity]] of the exam tables, to which it is related by a change of sign.
> - **The support:** The $\xi \neq 0$ formula holds only where $1 + \xi(x - \mu)/\theta > 0$. Outside that range, $H$ is 0 below the Fréchet's lower bound and 1 above the Weibull case's upper bound.
> - **A maximum, not a single loss:** The GEV describes the largest loss in a block. A 1% chance that the annual maximum exceeds $x$ is not a 1% chance that a single loss does, and for a single loss in a block of $n$, $S(x) \approx -\ln H(x)/n$.
> - **Assuming a Gumbel tail:** Setting $\xi = 0$ because its estimate is uncertain understates every extreme quantile when the true $\xi$ is positive, by almost 30% in the second example.
