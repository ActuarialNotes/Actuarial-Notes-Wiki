
- **Variance** $\sigma^2$ is the expected squared deviation of a random variable $X$ from its mean $\mu$.
- $$\text{Var}(X) = E\left[(X - \mu)^2\right]$$
- It measures the spread or dispersion of its distribution.
- Efficient computation formula: $$\text{Var}(X) = E[X^2] - \mu^2$$ where $\mu = E[X]$
- Key properties include:
  - $\text{Var}(aX + b) = a^2 \text{Var}(X)$
  - $\text{Var}(X) \geq 0$, with equality only if $X$ is constant.

> [!example]- Variance of an Insurance Payment {Example}
> A loss $X$ has $E[X] = 500$ and $E[X^2] = 310{,}000$. Find $\text{Var}(X)$.
>
> > [!answer]- Answer
> > Using the computational formula:
> > $$\text{Var}(X) = E[X^2] - (E[X])^2 = 310{,}000 - 500^2 = 310{,}000 - 250{,}000 = 60{,}000$$
