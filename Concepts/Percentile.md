## Definition

The $p$-th ==Percentile== (or $p$-th quantile) of a random variable $X$ is the value $x_p$ such that $P(X \leq x_p) = p/100$ (or equivalently $F(x_p) = p/100$). The 50th percentile is the median. Percentiles partition a distribution into hundredths and are commonly used to describe tail behavior and risk measures.

> [!example]- An exponential distribution has CDF $F(x) = 1 - e^{-x/10}$ for $x \geq 0$. What is the 90th percentile?
> Set $F(x_{90}) = 0.90$:
> $$ 1 - e^{-x_{90}/10} = 0.90 \implies e^{-x_{90}/10} = 0.10 $$
> $$ x_{90} = -10 \ln(0.10) = 10 \ln(10) \approx 23.03 $$
