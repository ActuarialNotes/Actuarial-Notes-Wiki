---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8b901f507be6e6a11af1e7bac19d40ece3db15d814a8e428550e21fec124f93f
  sources: []
  open_findings: 0
  log: .verify/Concepts/Negative Binomial Distribution.md
---

The **Negative Binomial Distribution** $X \sim \text{NegBin}(r, p)$ counts the number of independent Bernoulli trials needed to achieve exactly $r$ successes. When $r = 1$ it reduces to the [[Geometric Distribution|Geometric]] distribution.

> $$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}$$
>
> $$k = r, r+1, r+2, \ldots$$
>
> $$\text{where } r = \text{number of successes required},\; p = \text{success probability}$$

> $$E[X] = \frac{r}{p}, \qquad \text{Var}(X) = \frac{r(1-p)}{p^2}$$

- **Check the parameterization first.** As written, $X$ counts *trials* and starts at $r$. The alternative counts *failures before the $r$-th success*, $Y = X - r \in \{0,1,2,\ldots\}$, with $P(Y=k) = \binom{k+r-1}{k}p^r(1-p)^k$ and $E[Y] = r(1-p)/p$. Same variance, means differing by $r$ — the same trap as the [[Geometric Distribution|geometric]].
- $\text{Var}(X) > E[X]$ always, so the negative binomial is the standard **overdispersed** alternative to the [[Poisson Distribution|Poisson]] for claim counts in a heterogeneous portfolio.

![[Media/Negative_binomial_pmf.svg|500]]

![[Media/Figures/Negative_Binomial_Distribution.svg|340]]

> [!example]- Claims Until Third Large Loss {Example}
> Each claim has a 25% probability of being a large loss. Find the probability the 3rd large loss occurs on the 7th claim.
>
> > [!answer]-
> > $r=3$, $p=0.25$, $k=7$:
> > $$P(X=7) = \binom{6}{2}(0.25)^3(0.75)^4 = 15 \cdot 0.015625 \cdot 0.3164 \approx 0.0742$$
