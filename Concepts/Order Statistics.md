$$ F_{X_{(k)}}(x) = \sum_{j=k}^{n} \binom{n}{j} [F(x)]^j [1 - F(x)]^{n-j} $$

$$ f_{X_{(k)}}(x) = \frac{n!}{(k-1)!\,(n-k)!} [F(x)]^{k-1} [1 - F(x)]^{n-k} f(x) $$

==Order Statistics== are the values of a random sample arranged in non-decreasing order. Given a sample $X_1, X_2, \ldots, X_n$, the $k$-th order statistic $X_{(k)}$ is the $k$-th smallest value. The minimum is $X_{(1)}$ and the maximum is $X_{(n)}$. The CDF and PDF above apply when the observations are i.i.d. with common CDF $F(x)$ and PDF $f(x)$. For the $\text{Uniform}(0,1)$ distribution, the expected value of the $k$-th order statistic simplifies to $E[X_{(k)}] = \frac{k}{n+1}$.

> [!example]- Expected Maximum of Three Uniform Observations {💡 Example}
> Three independent observations are drawn from a $\text{Uniform}(0,1)$ distribution. What is the expected value of the maximum?
>
> > [!answer]- Answer
> > The maximum is the $k = 3$ order statistic from a sample of $n = 3$. For i.i.d. $\text{Uniform}(0,1)$ random variables:
> > $$ E[X_{(k)}] = \frac{k}{n+1} $$
> > $$ E[X_{(3)}] = \frac{3}{3+1} = \frac{3}{4} = 0.75 $$
