---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3a8f998592204f6ca0ced3c1e738e2150e5bd4e07a1c2fa488dfdc29ddbe6c7d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Distribution.md
---

The **Poisson Distribution** $X \sim \text{Poi}(\lambda)$ models the number of events occurring in a fixed interval of time or space when events happen independently at a constant average rate $\lambda$.

> $$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$
>
> $$k = 0, 1, 2, \ldots$$
>
> $$\text{where } \lambda > 0 = \text{the rate (mean number of events)}$$

- A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal
- It arises as the limit of $\text{Bin}(n, p)$ as $n \to \infty$ and $p \to 0$ with $np = \lambda$ fixed
- It is the standard model for claim counts in actuarial science

![[Media/Poisson_pmf.svg|500]]

![[Media/Figures/Poisson_Distribution.svg|340]]

> [!example]- Probability of Zero Claims in a Month {Example}
> Claims arrive at an average rate of $\lambda = 3$ per month. What is the probability of receiving no claims in a given month?
>
> > [!answer]-
> > $$P(X = 0) = \frac{e^{-3} \cdot 3^0}{0!} = e^{-3} \approx 0.0498$$
> > There is approximately a 5% chance of a claim-free month.
