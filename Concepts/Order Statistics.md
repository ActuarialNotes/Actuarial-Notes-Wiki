## Definition

==Order Statistics== are the values of a random sample arranged in non-decreasing order. Given a sample $X_1, X_2, \ldots, X_n$, the $k$-th order statistic $X_{(k)}$ is the $k$-th smallest value. The minimum is $X_{(1)}$ and the maximum is $X_{(n)}$. The CDF of the $k$-th order statistic from a sample with common CDF $F(x)$ is:

$$ F_{X_{(k)}}(x) = \sum_{j=k}^{n} \binom{n}{j} [F(x)]^j [1 - F(x)]^{n-j} $$

> [!example]- Three independent observations are drawn from a Uniform(0,1) distribution. What is the expected value of the maximum?
> For $n$ i.i.d. $\text{Uniform}(0,1)$ random variables, $E[X_{(k)}] = \frac{k}{n+1}$.
> $$ E[X_{(3)}] = \frac{3}{3+1} = \frac{3}{4} = 0.75 $$
