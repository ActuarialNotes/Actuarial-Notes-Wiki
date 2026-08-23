---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:80e66e52cd4277315cbfb149bb9df12d0729e555904822e5a9dcd2c66c3cf011
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Correlation Coefficient.md
---

The **Correlation Coefficient** (Pearson's $\rho$) is the standardized measure of linear association between two random variables, obtained by dividing the [[Covariance]] by the product of the standard deviations.

> $$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y}$$

- It satisfies $-1 \leq \rho \leq 1$
- $\rho = \pm 1$ indicates a perfect linear relationship; $\rho = 0$ indicates no linear association

![[Media/Figures/Correlation_Coefficient.svg|340]]

> [!example]- Computing the Correlation Coefficient from Variances {Example}
> If $\text{Cov}(X,Y) = 6$, $\text{Var}(X) = 9$, and $\text{Var}(Y) = 16$, what is $\rho$?
>
> > [!answer]-
> > $$\rho = \frac{6}{\sqrt{9} \cdot \sqrt{16}} = \frac{6}{3 \times 4} = \frac{6}{12} = 0.5$$
> > This indicates a moderate positive linear relationship between $X$ and $Y$.
