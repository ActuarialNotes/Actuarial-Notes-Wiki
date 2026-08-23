---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a49f98c160e4b3d364aa52c478265fd177191e2c21262d72c5645928d4dddea7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cumulative Distribution Function (CDF).md
---

The **Cumulative Distribution Function (CDF)** of a random variable $X$ gives the probability that $X$ takes a value less than or equal to $x$.

> $$F(x) = P(X \leq x)$$

- For a continuous random variable, $F(x) = \int_{-\infty}^{x} f(t)\, dt$
- The CDF is non-decreasing and right-continuous
- $\lim_{x \to -\infty} F(x) = 0$ and $\lim_{x \to \infty} F(x) = 1$

![[Media/Figures/Cumulative_Distribution_Function_CDF.svg|340]]

> [!example]- CDF and Probability for a Uniform Variable {Example}
> If $X$ is uniform on $[0, 5]$, what is the CDF and what is $P(2 \leq X \leq 4)$?
>
> > [!answer]-
> > The PDF is $f(x) = 1/5$ for $0 \leq x \leq 5$, so the CDF is:
> > $$F(x) = \frac{x}{5}, \quad 0 \leq x \leq 5$$
> > $$P(2 \leq X \leq 4) = F(4) - F(2) = \frac{4}{5} - \frac{2}{5} = \frac{2}{5} = 0.4$$
