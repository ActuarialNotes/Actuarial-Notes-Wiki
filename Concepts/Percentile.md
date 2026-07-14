The **Percentile** (or quantile) $x_p$ of a [[Random Variable]] $X$ is the value below which a proportion $p$ of the distribution lies — the smallest $x_p$ with $P(X \leq x_p) = p$. It is obtained by inverting the [[Cumulative Distribution Function (CDF)|CDF]].

> $$P(X \leq x_p) = F(x_p) = p$$

> $$x_p = F^{-1}(p)$$

- Here $p \in (0, 1)$; the $100p$-th percentile is the quantile of order $p$.
- The 50th percentile ($p = 0.5$) is the median, splitting the distribution into two equal halves.
- Percentiles describe tail behavior and underlie actuarial risk measures such as Value at Risk (VaR), the loss level a portfolio will not exceed with probability $p$.
- For a continuous, strictly increasing $F$ the inverse is unique; where $F$ is flat or jumps, take the smallest $x_p$ satisfying the condition.

> [!example]- 90th Percentile of an Exponential Distribution {Example}
> Claim sizes follow an [[Exponential Distribution]] with CDF $F(x) = 1 - e^{-x/10}$ for $x \geq 0$. Find the 90th percentile.
>
> > [!answer]-
> > Set $F(x_{0.90}) = 0.90$ and solve:
> > $$\begin{align*} 1 - e^{-x_{0.90}/10} &= 0.90 \\ e^{-x_{0.90}/10} &= 0.10 \\ x_{0.90} &= -10 \ln(0.10) \\ &= 10 \ln(10) \approx 23.03 \end{align*}$$
> > About 90% of claims fall below 23.03.

> [!example]- 95th Percentile of a Normal Loss {Example}
> Annual losses follow a [[Normal Distribution]] $X \sim N(\mu = 100,\ \sigma^2 = 225)$. Find the 95th percentile.
>
> > [!answer]-
> > The 95th percentile of the standard normal is $z_{0.95} = 1.645$. Transform back with $\sigma = 15$:
> > $$\begin{align*} x_{0.95} &= \mu + z_{0.95}\,\sigma \\ &= 100 + 1.645(15) \\ &= 124.68 \end{align*}$$
> > There is a 95% chance the annual loss is below 124.68.
