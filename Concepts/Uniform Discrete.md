The **Discrete Uniform Distribution** $X \sim \text{Unif}\{1, \ldots, n\}$ assigns equal probability to each of $n$ possible integer values. It is the natural model for any experiment where all outcomes are equally likely, such as rolling a fair die.

> $$P(X = k) = \frac{1}{n}, \quad k = 1, 2, \ldots, n$$

- $E[X] = (n+1)/2$ and $\text{Var}(X) = (n^2 - 1)/12$

> [!example]- Rolling a Fair Six-Sided Die {Example}
> A fair six-sided die is rolled. Find the expected value and variance of the outcome $X$.
>
> > [!answer]-
> > Here $n = 6$, so:
> > $$E[X] = \frac{6+1}{2} = 3.5$$
> > $$\text{Var}(X) = \frac{6^2 - 1}{12} = \frac{35}{12} \approx 2.917$$
