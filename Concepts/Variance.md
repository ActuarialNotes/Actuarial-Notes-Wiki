**Variance** $\sigma^2$ measures the spread or dispersion of a [[Random Variable]]'s distribution as the expected squared deviation from the mean.
- Efficient computation formula: $\text{Var}(X) = E[X^2] - \mu^2$ where $\mu = E[X]$
- $\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not
- $\text{Var}(X) \geq 0$, with equality only if $X$ is constant

> $$\text{Var}(X) = E\left[(X - \mu)^2\right] = E[X^2] - \mu^2$$

> [!example]- Variance of an Insurance Payment {Example}
> A loss $X$ has $E[X] = 500$ and $E[X^2] = 310{,}000$. Find $\text{Var}(X)$.
>
> > [!answer]-
> > Using the computational formula:
> > $$\text{Var}(X) = E[X^2] - (E[X])^2 = 310{,}000 - 500^2 = 310{,}000 - 250{,}000 = 60{,}000$$
