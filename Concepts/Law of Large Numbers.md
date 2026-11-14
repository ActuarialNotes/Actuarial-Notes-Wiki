---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4b30fe4ece21ab4b363f442e79594e4ead3438ecb9180abef4eed85ed2e494a6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Law of Large Numbers.md
---
The **Law of Large Numbers** is the result that the [[Sample Mean|sample mean]] of $n$ independent and identically distributed [[Random Variable|random variables]] with finite mean $\mu$ converges to $\mu$ as $n$ grows. It is the formal reason risk pooling works. The average loss per policy becomes predictable as an insurer writes more independent policies. The sample mean is

> $$\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i$$

- $X_i$ is the $i$th observation, such as the loss on the $i$th policy.

The weak law of large numbers says that for any tolerance $\epsilon > 0$ the sample mean [[Convergence in Probability|converges in probability]] to $\mu$:

> $$P\left(|\bar{X}_n - \mu| > \epsilon\right) \to 0 \text{ as } n \to \infty$$

The sample mean is increasingly likely to land near $\mu$. The same holds for the sample mean of a function of the observations, such as $X_i^2$, which converges to its own expected value.

It underpins [[Credibility Theory|credibility theory]] and the [[Expected Value|expected value]] premium principle. Charging $\mu$ per risk is sustainable only because averages stabilize over a large book of business.

## The Chebyshev bound

The law requires the $X_i$ to be i.i.d. with finite mean $\mu$. The standard proof also assumes a finite variance $\sigma^2$. The sample mean then has variance

> $$\text{Var}(\bar{X}_n) = \frac{\sigma^2}{n}$$

The variance of the average falls in inverse proportion to $n$. Chebyshev's inequality applied to $\bar{X}_n$ gives the bound

> $$P\left(|\bar{X}_n - \mu| > \epsilon\right) \leq \frac{\sigma^2}{n\epsilon^2}$$

The bound goes to 0 as $n$ grows, which proves the weak law.

> [!example]- Each policy's annual loss is i.i.d. with $\mu = 500$ and $\sigma = 2{,}000$. For $n = 10{,}000$ policies, what is Chebyshev's bound on $P(|\bar{X}_n - 500| > 100)$? {Example}
> - The variance of the average is $\text{Var}(\bar{X}_n) = 2{,}000^2/10{,}000 = 400$.
> - The bound is $400/100^2 = 0.04$.
> - There is at least a 96% probability that the average loss per policy lands within $100$ of $500$, although a single policy's loss has a standard deviation of $2{,}000$.

> [!example]- With $\mu = 500$ and $\sigma = 2{,}000$ per policy, how many policies does Chebyshev's bound need for the average to be within $50$ of $\mu$ with probability 0.95? {Example}
> - The bound on the miss probability must be at most $0.05$, so $\sigma^2/(n \cdot 50^2) \leq 0.05$.
> - Solving for $n$ gives $n \geq 2{,}000^2/(0.05 \times 50^2) = 4{,}000{,}000/125$.
> - At least $32{,}000$ independent policies are needed.

## The central limit theorem

The law of large numbers says where the sample mean settles, at $\mu$. The [[Central Limit Theorem|central limit theorem]] describes the shape of its fluctuations around $\mu$, at a scale of $1/\sqrt{n}$.
