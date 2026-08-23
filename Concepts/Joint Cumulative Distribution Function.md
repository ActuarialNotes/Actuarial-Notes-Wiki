---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cb44352df8f797e3752c952bbd96b971eae75d236737a8e5a0be02d7cb92ed90
  sources: []
  open_findings: 0
  log: .verify/Concepts/Joint Cumulative Distribution Function.md
---

The **joint cumulative distribution function** (joint CDF) of random variables $X$ and $Y$ gives the probability that $X \leq x$ and $Y \leq y$ simultaneously.

> $$F(x,y) = P(X \leq x,\; Y \leq y)$$

- It is non-decreasing in each argument and right-continuous
- $F(-\infty, y) = F(x, -\infty) = 0$ and $F(\infty, \infty) = 1$
- For continuous jointly distributed variables, the joint PDF is recovered by:

> $$f(x,y) = \frac{\partial^2 F(x,y)}{\partial x\, \partial y}$$

- The joint CDF of [[Independent Random Variables]] factors as $F(x,y) = F_X(x)\cdot F_Y(y)$

![[Media/Figures/Joint_Cumulative_Distribution_Function.svg|340]]

> [!example]- Computing a Joint Probability {Example}
> $X$ and $Y$ are independent, each Uniform on $[0,1]$. Find $P(X \leq 0.4,\; Y \leq 0.6)$.
>
> > [!answer]-
> > Since $X$ and $Y$ are independent with $F_X(x) = x$ and $F_Y(y) = y$:
> > $$F(0.4, 0.6) = F_X(0.4) \cdot F_Y(0.6) = 0.4 \times 0.6 = 0.24$$
