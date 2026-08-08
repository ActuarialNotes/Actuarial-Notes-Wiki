The **intraclass correlation (ICC)** is the share of total variance in a [[Linear Mixed Model]] that sits *between* groups — equivalently, the correlation between two observations drawn from the same group.

> $$\mathrm{ICC} = \rho = \frac{\sigma_b^{2}}{\sigma_b^{2} + \sigma^{2}}$$

- $\sigma_b^2$ is the random-intercept variance and $\sigma^2$ the residual variance — the two [[Variance Components|variance components]]
- $\rho = 0$: groups are indistinguishable and ordinary regression would do. $\rho \to 1$: observations within a group are near-copies, so a group of $n$ carries little more information than a group of 1
- It is the correlation the random intercept induces — the off-diagonal of a compound-symmetric [[Covariance Structure|covariance structure]]
- The **design effect** $1 + (n-1)\rho$ says how much a clustered sample inflates the variance of a mean; effective sample size is $n / [1 + (n-1)\rho]$
- Ignoring a non-zero ICC is the classic mistake — standard errors come out too small and t-statistics too large

![[Media/Figures/Intraclass_Correlation.svg|340]]

> [!example]- Effective Sample Size Under Clustering {Example}
> Claim severities are grouped by claims office, with $\sigma_b^2 = 0.4$ and $\sigma^2 = 1.6$. Each of 25 offices contributes 20 claims. What is the ICC, and how many independent claims is the 500-claim sample worth?
>
> > [!answer]-
> > $$\rho = \frac{0.4}{0.4 + 1.6} = 0.20$$
> > Design effect $= 1 + (20 - 1)(0.20) = 4.8$, so
> > $$n_{\text{eff}} = \frac{500}{4.8} \approx 104$$
> > 500 clustered claims carry about as much information as **104 independent** ones. Treating them as independent would understate standard errors by a factor of $\sqrt{4.8} \approx 2.2$.
