$$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}, \quad k = 0, 1, 2, \ldots$$
$$\text{where } \lambda > 0 = \text{the rate (mean number of events)}$$

The Poisson Distribution $X \sim \text{Poi}(\lambda)$ models the number of events occurring in a fixed interval of time or space when events happen independently at a constant average rate $\lambda$.

A defining property is that $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal. It arises as the limit of $\text{Bin}(n, p)$ as $n \to \infty$ and $p \to 0$ with $np = \lambda$ fixed, and is the standard model for claim counts in actuarial science.

> [!example]- Probability of Zero Claims in a Month {💡 Example}
> Claims arrive at an average rate of $\lambda = 3$ per month. What is the probability of receiving no claims in a given month?
>
> > [!answer]- Answer
> > $$P(X = 0) = \frac{e^{-3} \cdot 3^0}{0!} = e^{-3} \approx 0.0498$$
> > There is approximately a 5% chance of a claim-free month.
