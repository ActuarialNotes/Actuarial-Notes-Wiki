The **Central Limit Theorem (CLT)** states that the sum or average of a large number of independent, identically distributed [[Random Variable|random variables]] with finite mean $\mu$ and variance $\sigma^2$ is approximately [[Normal Distribution|normal]], regardless of the original distribution.

> $$\frac{\bar{X} - \mu}{\sigma / \sqrt{n}} \xrightarrow{d} N(0, 1)$$

- Equivalently, a sum $S_n = \sum_{i=1}^{n} X_i$ is approximately $N(n\mu,\ n\sigma^2)$ for large $n$.
- It justifies the normal approximation used throughout actuarial modeling of aggregate losses.
- A continuity correction improves the approximation when the $X_i$ are discrete.

> [!example]- Normal Approximation of Aggregate Losses {Example}
> An insurer has 10,000 independent policies, each with mean loss \$$200$ and standard deviation \$$80$. Approximate the probability that total losses exceed \$$2{,}050{,}000$.
>
> > [!answer]-
> > Let $S = \sum_{i=1}^{10000} X_i$. By the CLT, $S$ is approximately normal with:
> > $$\begin{align*} E[S] &= 10{,}000 \times 200 = 2{,}000{,}000 \\ \sigma_S &= 80\sqrt{10{,}000} = 8{,}000 \end{align*}$$
> > Standardize the threshold:
> > $$Z = \frac{2{,}050{,}000 - 2{,}000{,}000}{8{,}000} = 6.25$$
> > $$P(S > 2{,}050{,}000) = P(Z > 6.25) \approx 0$$
> > A total that far above the mean is essentially impossible.
