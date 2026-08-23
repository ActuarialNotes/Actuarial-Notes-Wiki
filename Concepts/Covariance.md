---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:18d27ecc53ea0d77df1bddca59c8ed04f11af35dee5b1a85c3fefd4d4782b2ad
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Covariance.md
---

**Covariance** measures the linear association between two random variables $X$ and $Y$. Positive covariance indicates the variables tend to move together; negative covariance indicates they tend to move in opposite directions.

> $$\text{Cov}(X, Y) = E[XY] - E[X] \cdot E[Y]$$

> $$= E[(X - \mu_X)(Y - \mu_Y)]$$

- If $X$ and $Y$ are [[Independent Random Variables|independent]], $\text{Cov}(X, Y) = 0$ (but the converse is not necessarily true)

![[Media/Figures/Covariance.svg|340]]

> [!example]- Computing Covariance from Expectations {Example}
> Given $E[X] = 2$, $E[Y] = 4$, and $E[XY] = 10$, what is $\text{Cov}(X, Y)$?
>
> > [!answer]-
> > $$\text{Cov}(X, Y) = E[XY] - E[X] \cdot E[Y] = 10 - 2 \times 4 = 10 - 8 = 2$$
> > The positive covariance suggests $X$ and $Y$ tend to increase together.
