---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5bcac9fa170e3697692cb666c9cbdac745232befa3a31feed86bf80f907463d3
  sources: []
  open_findings: 0
  log: .verify/Concepts/Standard Deviation.md
---

**Standard Deviation** $\sigma$ is the positive square root of [[Variance]], measuring the typical spread of a random variable $X$ around its mean in the same units as $X$.
- The standard deviation is directly interpretable because it shares units with $X$, unlike variance
- It satisfies $\sigma(aX + b) = |a|\,\sigma(X)$, so location shifts do not affect spread

> $$\sigma = \sqrt{\text{Var}(X)}$$

> $$= \sqrt{E[X^2] - (E[X])^2}$$

![[Media/Figures/Standard_Deviation.svg|340]]

> [!example]- Standard Deviation of a Claim Amount {Example}
> Claim amounts $X$ follow a distribution with $E[X] = 200$ and $E[X^2] = 50{,}000$. Find the standard deviation of $X$.
>
> > [!answer]-
> > First compute variance:
> > $$\text{Var}(X) = E[X^2] - (E[X])^2 = 50{,}000 - 200^2 = 50{,}000 - 40{,}000 = 10{,}000$$
> > Then:
> > $$\sigma = \sqrt{10{,}000} = 100$$
> > The standard deviation of the claim amount is \$100.
