---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5c9880160640fce2f5be6068310e6706026a5af30e3e434c8dd31765dabd2ee4
  sources: []
  open_findings: 0
  log: .verify/Concepts/Joint Probability Function.md
---

The **joint probability function** (joint PMF) of discrete random variables $X$ and $Y$ fully characterizes the [[Multivariate Distribution]] of $(X, Y)$.

> $$p(x,y) = P(X = x,\; Y = y)$$

- It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$
- [[Marginal Probability Function]]s are obtained by summing out one variable
- [[Conditional Probability Function]]s are obtained by fixing one variable

![[Media/Figures/Joint_Probability_Function.svg|340]]

> [!example]- Number of Claims and Policies Lapsed {Example}
> Let $X$ = number of claims (0 or 1) and $Y$ = policies lapsed (0 or 1). Joint PMF:
>
> | | $Y=0$ | $Y=1$ |
> |---|---|---|
> | $X=0$ | 0.50 | 0.20 |
> | $X=1$ | 0.20 | 0.10 |
>
> > [!answer]-
> > $P(X=1, Y=1) = 0.10$. Marginal $P(X=1) = 0.20 + 0.10 = 0.30$.
