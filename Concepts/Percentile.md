$$ x_p = F^{-1}(p), \quad \text{where } F(x_p) = p, \quad 0 < p < 1 $$

The $100p$-th ==Percentile== (or $p$-th quantile) of a random variable $X$ is the value $x_p$ such that $P(X \leq x_p) = p$. The 50th percentile is the median. Percentiles partition a distribution into hundredths and are commonly used to describe tail behavior and actuarial risk measures such as Value at Risk. To find the $p$-th quantile, invert the CDF: solve $F(x_p) = p$ for $x_p$.

> [!example]- 90th Percentile of an Exponential Distribution {💡 Example}
> An exponential distribution has CDF $F(x) = 1 - e^{-x/10}$ for $x \geq 0$. What is the 90th percentile?
>
> > [!answer]- Answer
> > Set $F(x_{0.90}) = 0.90$:
> > $$ 1 - e^{-x_{0.90}/10} = 0.90 \implies e^{-x_{0.90}/10} = 0.10 $$
> > $$ x_{0.90} = -10 \ln(0.10) = 10 \ln(10) \approx 23.03 $$
