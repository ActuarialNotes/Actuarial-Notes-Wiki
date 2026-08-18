The **Geometric Distribution** $X \sim \text{Geom}(p)$ counts the number of independent Bernoulli trials until the first success. It is the discrete analogue of the [[Exponential Distribution|Exponential]] distribution and shares its **memoryless property**: $P(X > m+n \mid X > m) = P(X > n)$.

> $$P(X = k) = (1-p)^{k-1}p, \quad k = 1, 2, 3, \ldots$$
>
> $$\text{where } p \in (0,1) = \text{probability of success on each trial}$$

> $$E[X] = \frac{1}{p}, \qquad \text{Var}(X) = \frac{1-p}{p^2}$$

- **Two parameterizations exist and they are not interchangeable.** The form above counts *trials* $X \in \{1,2,3,\ldots\}$ with $E[X] = 1/p$. The other counts *failures before the first success*, $Y = X - 1 \in \{0,1,2,\ldots\}$, with $P(Y=k) = (1-p)^k p$ and $E[Y] = (1-p)/p$. The variance $\,(1-p)/p^2$ is the same for both. Decide from the wording which is being counted before touching a formula — a mismatch shifts every answer by exactly 1.
- The survival function is clean: $P(X > n) = (1-p)^n$ — "the first $n$ trials all failed." Use it instead of summing the PMF.

![[Media/Geometric_pmf.svg|500]]

![[Media/Figures/Geometric_Distribution.svg|340]]

> [!example]- Number of Policies Until First Claim {Example}
> Each policy independently has a 20% chance of generating a claim. Let $X$ = the number of policies reviewed until the first claim.
>
> > [!answer]-
> > $X \sim \text{Geom}(0.20)$. The probability the first claim is on the 3rd policy:
> > $$P(X=3) = (0.80)^2(0.20) = 0.128$$
> > The expected number of policies until the first claim: $E[X] = 1/0.20 = 5$.

> [!example]- Using Memorylessness After a Dry Spell {Example}
> With the same 20% claim probability per policy, 8 policies have been reviewed with no claim. Find the probability that at least 3 more must be reviewed before the first claim appears.
>
> > [!answer]-
> > Memorylessness discards the 8 wasted trials entirely:
> > $$
> > \begin{align*}
> > P(X > 8 + 2 \mid X > 8) &= P(X > 2) \\
> >                         &= (0.80)^2 \\
> >                         &= 0.64
> > \end{align*}
> > $$
> > The 8 claim-free reviews carry no information about when the next claim arrives — the process does not "become due."
