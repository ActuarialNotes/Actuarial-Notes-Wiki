---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c51a36cdfc90786054a01ec73a1dd2c9bdedd11c7d8218b4011e80b6504d95ca
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Standard Deviation (SD).md
---
The **Standard Deviation** of a [[Random Variable|random variable]] $X$ is the positive square root of its [[Variance|variance]]. It measures the spread of $X$ in the same units as $X$, where the variance is in squared units. The standard deviation of $X$, written $\sigma$, is

> $$\text{SD}(X) = \sqrt{\text{Var}(X)}$$

So the variance is the square of the standard deviation, $\text{Var}(X) = \sigma^2$. The variance is usually computed from the first two moments, $\text{Var}(X) = E[X^2] - (E[X])^2$.

> [!example]- The variance of a loss is 400. What is its standard deviation? {Example}
> - The standard deviation is the positive square root of the variance.
> - $\sigma = \sqrt{400} = 20$, in the same units as the loss.

## Standard deviation of a linear transformation

For constants $a$ and $b$, the standard deviation of $aX + b$ is

> $$\text{SD}(aX + b) = |a|\,\sigma$$

Adding $b$ shifts $X$ without changing its spread.

> [!example]- $X$ has standard deviation 20. What is the standard deviation of $Y = 5 - 2X$? {Example}
> - The constant 5 does not change the spread.
> - The multiplier is $a = -2$, and a standard deviation is never negative, so it scales by $|a| = 2$.
> - $\text{SD}(Y) = 2 \times 20 = 40$.

## Standardizing

Measuring $X$ from its mean $\mu = E[X]$ in units of its standard deviation gives the standardized variable

> $$Z = \frac{X - \mu}{\sigma}$$

$Z$ has mean 0 and standard deviation 1. If $X$ is [[Normal Distribution|normal]], $Z$ is the standard normal, so a normal probability is read from the standard normal table once the value is standardized.

> [!example]- Losses are normal with mean 1,000 and standard deviation 200. What is the probability that a loss exceeds 1,300? {Example}
> - Standardize: $z = \frac{1{,}300 - 1{,}000}{200} = 1.5$.
> - $P(X > 1{,}300) = 1 - \Phi(1.5) = 1 - 0.9332 = 0.0668$.

> [!trap] Using the variance where the standard deviation belongs
> $N(\mu, \sigma^2)$ names the variance, not the standard deviation. For $N(1{,}000, 40{,}000)$, standardize with $\sigma = \sqrt{40{,}000} = 200$, not $40{,}000$.
