---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cac8c90bb2ae452e27c3bf7613ca4e8e6383fe85eae21890635a335d0ab3266b
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Intercept and Slope.md
---

A **random intercept** lets each group have its own baseline; a **random slope** lets each group have its own response to a predictor. Together they are the two building blocks of a [[Linear Mixed Model]]'s [[Random Effects|random part]].

> $$y_{ij} = (\beta_0 + b_{0i}) + (\beta_1 + b_{1i})x_{ij} + \varepsilon_{ij}$$
>
> $$\begin{pmatrix} b_{0i} \\ b_{1i}\end{pmatrix} \sim N\!\left(\mathbf{0},\; \mathbf{D} = \begin{pmatrix}\sigma_0^{2} & \sigma_{01} \\ \sigma_{01} & \sigma_1^{2}\end{pmatrix}\right)$$

- **Random intercept only**: parallel lines, one per group, at different heights — implies a compound-symmetric [[Covariance Structure|covariance structure]]
- **Random intercept and slope**: fanning lines, so within-group variance grows with $x$ and the correlation between two observations depends on their $x$ values
- $\sigma_{01}$ is the intercept-slope covariance: negative means groups that start high grow more slowly (a common convergence pattern)
- A random slope costs two extra parameters ($\sigma_1^2$, $\sigma_{01}$) and often fails to converge when groups are small — test it before keeping it
- The predictor carrying a random slope must also appear as a [[Fixed Effects|fixed effect]]; the random part is a mean-zero deviation from it

![[Media/Figures/Random_Intercept_and_Slope.svg|340]]

> [!example]- Does the Development Slope Vary by Accident Year? {Example}
> Log paid losses are modelled against development age with a random effect by accident year. A random-intercept fit has $-2\ell = 812.4$; adding a random slope gives $-2\ell = 803.1$. At the 5% level, keep the random slope?
>
> > [!answer]-
> > Adding a random slope adds two parameters ($\sigma_1^2$ and $\sigma_{01}$), so the [[Likelihood Ratio Test]] statistic is
> > $$\chi^{2} = 812.4 - 803.1 = 9.3 \quad \text{on } 2 \text{ df}$$
> > $\chi^2_{0.95, 2} = 5.99 < 9.3$, so **reject** — accident years genuinely develop at different rates, not just from different levels. (The boundary problem makes the true $p$-value smaller still, so the conclusion is safe.)
