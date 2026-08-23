---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:026219c9c407ec4dd8a18e978ee2d0d0f84dff171af19521e3dfd3ba590c584e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Density Function (PDF).md
---

A **Probability Density Function (PDF)** describes the relative likelihood of a continuous random variable taking a particular value. The probability that $X$ falls in an interval $[a, b]$ is the area under $f$ over that interval.

> $$P(a \leq X \leq b) = \int_a^b f(x)\, dx$$

- The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$
- $P(X = x) = 0$ for any single point

![[Media/Figures/Probability_Density_Function_PDF.svg|340]]

> [!example]- Probability from a Polynomial PDF {Example}
> If $f(x) = 3x^2$ for $0 \leq x \leq 1$, what is $P(X > 0.5)$?
>
> > [!answer]-
> > $$P(X > 0.5) = \int_{0.5}^{1} 3x^2\, dx = \left[ x^3 \right]_{0.5}^{1} = 1 - 0.125 = 0.875$$
