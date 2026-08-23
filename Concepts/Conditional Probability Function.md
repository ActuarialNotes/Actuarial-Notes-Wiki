---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:68970d2337f16633ad4ae3ed9e3168d2d982faf404a4a8ec864e89e705e3097b
  sources: []
  open_findings: 0
  log: .verify/Concepts/Conditional Probability Function.md
---

A **Conditional Probability Function** gives the distribution of one random variable given a specific value of another. The conditional distribution integrates (or sums) to 1 over its support given the conditioning value.

> $$f_{X|Y}(x \mid y) = \frac{f(x, y)}{f_Y(y)}, \quad f_Y(y) > 0$$

- For discrete random variables:

> $$P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$$

![[Media/Figures/Conditional_Probability_Function.svg|340]]

> [!example]- Conditional PDF from a Joint Density {Example}
> If $f(x,y) = 6(1-y)$ for $0 \leq x \leq y \leq 1$, what is $f_{X|Y}(x \mid y)$?
>
> > [!answer]-
> > First find the marginal PDF of $Y$:
> > $$f_Y(y) = \int_0^y 6(1-y)\, dx = 6y(1-y)$$
> > Then apply the conditional PDF formula:
> > $$f_{X|Y}(x \mid y) = \frac{6(1-y)}{6y(1-y)} = \frac{1}{y}, \quad 0 \leq x \leq y$$
> > Given $Y = y$, $X$ is uniformly distributed on $[0, y]$.
