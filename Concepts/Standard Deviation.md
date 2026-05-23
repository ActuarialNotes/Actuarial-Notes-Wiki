- **Standard Deviation (SD) $\sigma$** is the positive square root of variance.
- $$\sigma = \sqrt{\text{Var}(X)}$$
- $$\sigma = \sqrt{E[X^2] - (E[X])^2}$$
- It measures the typical spread of a random variable $X$ around its mean
- The difference between variance and standard deviation is that the SD is in the same units as $X$.
- This mean standard deviation is directly interpretable.
- It satisfies $\sigma(aX + b) = |a|\,\sigma(X)$, so location shifts do not affect spread.

> [!example]- Standard Deviation of a Claim Amount {Example}
> Claim amounts $X$ follow a distribution with $E[X] = 200$ and $E[X^2] = 50000$. Find the standard deviation of $X$.
>
> > [!answer]- Answer
> > First compute variance:
> > $$\text{Var}(X) = E[X^2] - (E[X])^2 = 50000 - 200^2 = 50000 - 40000 = 10000$$
> > Then:
> > $$\sigma = \sqrt{10000} = 100$$
> > The standard deviation of the claim amount is \$100.
