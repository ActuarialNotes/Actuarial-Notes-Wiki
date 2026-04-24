$$\sigma = \sqrt{\text{Var}(X)} = \sqrt{E[X^2] - (E[X])^2}$$

Standard Deviation ($\sigma$) is the positive square root of variance, measuring the typical spread of a random variable $X$ around its mean in the same units as $X$.

Unlike variance, standard deviation is directly interpretable in the original units of measurement. It satisfies $\sigma(aX + b) = |a|\,\sigma(X)$, so location shifts do not affect spread.

> [!example]- Standard Deviation of a Claim Amount {💡 Example}
> Claim amounts $X$ follow a distribution with $E[X] = 200$ and $E[X^2] = 50{,}000$. Find the standard deviation of $X$.
>
> > [!answer]- Answer
> > First compute variance:
> > $$\text{Var}(X) = E[X^2] - (E[X])^2 = 50{,}000 - 200^2 = 50{,}000 - 40{,}000 = 10{,}000$$
> > Then:
> > $$\sigma = \sqrt{10{,}000} = 100$$
> > The standard deviation of the claim amount is \$100.
