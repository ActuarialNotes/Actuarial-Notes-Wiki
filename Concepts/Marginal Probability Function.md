---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4935507c2dc67707d5c1ac46d28fda5623a63f47ce0c230db7fdee27fc4ee63b
  sources: []
  open_findings: 0
  log: .verify/Concepts/Marginal Probability Function.md
---

The **marginal probability function** of $X$ is obtained from the [[Joint Probability Function]] $p(x,y)$ by summing over all values of $Y$, describing the behavior of each variable in isolation.

> $$p_X(x) = P(X = x)$$

> $$= \sum_y p(x, y)$$

- Similarly $p_Y(y) = \sum_x p(x,y)$
- In the continuous case, the marginal PDF is:

> $$f_X(x) = \int_{-\infty}^{\infty} f(x,y)\,dy$$

- Marginal distributions are the starting point for computing [[Moments for Joint Distributions]] and assessing [[Independent Random Variables|independence]]

![[Media/Figures/Marginal_Probability_Function.svg|340]]

> [!example]- Finding a Marginal PMF {Example}
> Joint PMF: $p(1,1) = 0.2$, $p(1,2) = 0.3$, $p(2,1) = 0.1$, $p(2,2) = 0.4$. Find $p_X(x)$.
>
> > [!answer]-
> > $$p_X(1) = p(1,1) + p(1,2) = 0.2 + 0.3 = 0.5$$
> > $$p_X(2) = p(2,1) + p(2,2) = 0.1 + 0.4 = 0.5$$
