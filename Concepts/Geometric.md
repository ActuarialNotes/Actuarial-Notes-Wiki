$$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$
$$\text{where } p \in (0,1) = \text{probability of success on each trial}$$

The **Geometric distribution** $X \sim \text{Geom}(p)$ counts the number of independent Bernoulli trials until the first success. It is the discrete analogue of the [[Exponential]] distribution and shares its **memoryless property**: $P(X > m+n \mid X > m) = P(X > n)$.

$$E[X] = \frac{1}{p}, \qquad \text{Var}(X) = \frac{1-p}{p^2}$$

> [!example]- Number of Policies Until First Claim {💡 Example}
> Each policy independently has a 20% chance of generating a claim. Let $X$ = the number of policies reviewed until the first claim.
>
> > [!answer]- Answer
> > $X \sim \text{Geom}(0.20)$. The probability the first claim is on the 3rd policy:
> > $$P(X=3) = (0.80)^2(0.20) = 0.128$$
> > The expected number of policies until the first claim: $E[X] = 1/0.20 = 5$.
