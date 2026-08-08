The **Sample Variance** $S^2$ measures the spread of a random sample around its [[Sample Mean]]. Dividing the sum of squared deviations by $n - 1$ rather than $n$ makes it an [[Unbiasedness|unbiased]] estimator of the population variance $\sigma^2$.

> $$S^2 = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2$$

> $$E[S^2] = \sigma^2, \qquad \frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1} \ \text{ (Normal data)}$$

- The divisor $n - 1$ is the **degrees of freedom**: one is spent estimating $\mu$ by $\bar{X}$, and the deviations $X_i - \bar{X}$ sum to zero, so only $n-1$ of them are free
- Using $n$ instead gives the [[Maximum Likelihood Estimation|MLE]] $\hat\sigma^2 = \frac{n-1}{n}S^2$, which is biased low by $\sigma^2/n$ but has smaller [[Mean Square Error]] — the classic bias-variance trade-off in estimation
- The computing form $S^2 = \frac{1}{n-1}\left(\sum X_i^2 - n\bar{X}^2\right)$ is what exam problems usually need
- For Normal data, $(n-1)S^2/\sigma^2 \sim \chi^2_{n-1}$ independent of $\bar{X}$; this is what makes the $t$-statistic $\frac{\bar{X}-\mu}{S/\sqrt{n}} \sim t_{n-1}$ work, and it gives $\text{Var}(S^2) = 2\sigma^4/(n-1)$
- Tests and [[Confidence Interval|intervals]] for $\sigma^2$ come from the same $\chi^2$ [[Sampling Distribution]]
- $S^2$ is even less resistant than $\bar{X}$ — deviations are squared, so a single outlier can dominate it entirely

![[Media/Figures/Sample_Variance.svg|340]]

> [!example]- Computing the Sample Variance {Example}
> Five claim amounts (in thousands) are $4, 6, 9, 11, 20$. Find $\bar{x}$ and $s^2$.
>
> > [!answer]-
> > $$\bar{x} = \frac{4 + 6 + 9 + 11 + 20}{5} = 10$$
> > $$\sum x_i^2 = 16 + 36 + 81 + 121 + 400 = 654$$
> > $$s^2 = \frac{654 - 5(10)^2}{5 - 1} = \frac{154}{4} = 38.5$$
> > So $s = 6.20$ (thousand). The MLE would divide by $5$ instead: $\hat\sigma^2 = 154/5 = 30.8$.

> [!example]- Testing a Variance {Example}
> A sample of $n = 25$ losses from a Normal population gives $s^2 = 150$. Test $H_0: \sigma^2 = 100$ against $H_1: \sigma^2 > 100$ at $\alpha = 0.05$, given $\chi^2_{0.05, 24} = 36.42$.
>
> > [!answer]-
> > $$\chi^2 = \frac{(n-1)s^2}{\sigma_0^2} = \frac{24 \times 150}{100} = 36.0$$
> > Since $36.0 < 36.42$, **fail to reject $H_0$** at the $5\%$ level — the observed spread is not quite strong enough evidence that the true variance exceeds $100$.
