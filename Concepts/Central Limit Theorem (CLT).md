## Definition

The ==Central Limit Theorem (CLT)== states that the sum (or average) of a large number of independent, identically distributed random variables with finite mean $\mu$ and finite variance $\sigma^2$ is approximately normally distributed, regardless of the original distribution. Specifically, as $n \to \infty$:

$$ \frac{\bar{X} - \mu}{\sigma / \sqrt{n}} \xrightarrow{d} N(0, 1) $$

> [!example]- An insurance company has 10,000 independent policies each with mean loss $\$200$ and standard deviation $\$80$. What is the approximate probability total losses exceed $\$2{,}050{,}000$?
> Let $S = \sum_{i=1}^{10000} X_i$. By CLT, $S$ is approximately normal with:
> $$ E[S] = 10000 \times 200 = 2{,}000{,}000, \quad \sigma_S = 80\sqrt{10000} = 8{,}000 $$
> $$ Z = \frac{2{,}050{,}000 - 2{,}000{,}000}{8{,}000} = \frac{50{,}000}{8{,}000} = 6.25 $$
> $P(S > 2{,}050{,}000) = P(Z > 6.25) \approx 0$ — essentially zero. The probability of total losses exceeding $\$2{,}050{,}000$ is negligible.
