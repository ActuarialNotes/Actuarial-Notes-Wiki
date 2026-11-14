---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b315186f6a13aaf6b7d6d8a5fb2a3aecaffa74d9af12a25206c589947b471ab2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Central Limit Theorem (CLT).md
---

The **Central Limit Theorem (CLT)** is the result that the sum or the average of a large number of independent, identically distributed [[Random Variable|random variables]] with finite mean $\mu$ and variance $\sigma^2$ is approximately [[Normal Distribution|normal]], whatever their own distribution. For the sample mean $\bar{X}$ of $n$ such variables, the standardized mean is

> $$Z = \frac{\bar{X} - \mu}{\sigma / \sqrt{n}}$$

As $n$ grows, the distribution of $Z$ approaches the standard normal $N(0, 1)$. So for large $n$, $\bar{X}$ is approximately normal with mean $\mu$ and variance $\sigma^2/n$.

## Sum of independent identically distributed random variables

For large $n$, the sum $S_n = X_1 + X_2 + \cdots + X_n$ is approximately normal with mean and variance

> $$E[S_n] = n\mu$$

> $$\text{Var}(S_n) = n\sigma^2$$

A probability for $S_n$ is approximated by standardizing with these two moments and reading the standard normal table. When the $X_i$ are discrete, a continuity correction improves the approximation.

> [!example]- An insurer has $10{,}000$ independent policies, each with mean loss $\$200$ and standard deviation $\$80$. What is the approximate probability that total losses exceed $\$2{,}050{,}000$? {Example}
> - The total loss $S$ has mean $10{,}000 \times 200 = \$2{,}000{,}000$.
> - Its variance is $10{,}000 \times 80^2$, so its standard deviation is $80\sqrt{10{,}000} = \$8{,}000$.
> - The threshold standardizes to $z = (2{,}050{,}000 - 2{,}000{,}000)/8{,}000 = 6.25$.
> - $P(S > 2{,}050{,}000) \approx P(Z > 6.25)$, which is approximately $0$.

> [!trap] Scaling the standard deviation by $n$
> The standard deviation of a sum of $n$ independent copies is $\sigma\sqrt{n}$, not $n\sigma$. In the example, $n\sigma = 800{,}000$ would put the threshold only $0.06$ standard deviations above the mean.
