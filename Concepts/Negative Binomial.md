$$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}, \quad k = r, r+1, r+2, \ldots$$
$$\text{where } r = \text{number of successes required},\; p = \text{success probability}$$

The **Negative Binomial distribution** $X \sim \text{NegBin}(r, p)$ counts the number of independent Bernoulli trials needed to achieve exactly $r$ successes. When $r = 1$ it reduces to the [[Geometric]] distribution.

$$E[X] = \frac{r}{p}, \qquad \text{Var}(X) = \frac{r(1-p)}{p^2}$$

> [!example]- Claims Until Third Large Loss {💡 Example}
> Each claim has a 25% probability of being a large loss. Find the probability the 3rd large loss occurs on the 7th claim.
>
> > [!answer]- Answer
> > $r=3$, $p=0.25$, $k=7$:
> > $$P(X=7) = \binom{6}{2}(0.25)^3(0.75)^4 = 15 \cdot 0.015625 \cdot 0.3164 \approx 0.0742$$
