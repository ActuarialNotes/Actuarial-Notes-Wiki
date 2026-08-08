**Restricted (or residual) maximum likelihood — REML —** estimates the [[Variance Components|variance components]] of a [[Linear Mixed Model]] from the part of the likelihood that does not depend on the [[Fixed Effects|fixed effects]], removing the downward bias ordinary maximum likelihood carries.

> $$\ell_R(\boldsymbol{\theta}) = -\tfrac{1}{2}\left[\log|\mathbf{V}| + \log|\mathbf{X}^{\top}\mathbf{V}^{-1}\mathbf{X}| + \mathbf{r}^{\top}\mathbf{V}^{-1}\mathbf{r}\right]$$
>
> $$\mathbf{r} = \mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}$$

- ML treats $\hat{\boldsymbol\beta}$ as known when estimating variances and so **ignores the $p$ degrees of freedom spent** on it — the same reason the sample variance divides by $n-1$ rather than $n$
- The extra $\log|\mathbf{X}^\top\mathbf{V}^{-1}\mathbf{X}|$ term is the correction; in the simplest case REML reproduces $s^2 = \sum(y_i - \bar y)^2/(n-1)$ exactly where ML gives the $/n$ version
- **The rule that gets tested:** compare models differing in their *random* part (or covariance structure) with REML; compare models differing in their *fixed* effects with **ML**, because the REML likelihoods are then not comparable at all
- [[AIC]] and [[BIC]] inherit the same rule — a REML AIC may only be compared with another REML AIC on identical fixed effects
- Bias matters most with few groups; with many groups ML and REML converge

![[Media/Figures/Restricted_Maximum_Likelihood.svg|340]]

> [!example]- Which Fit Do You Compare? {Example}
> An actuary wants to test (i) whether a random slope by accident year is needed, and (ii) whether a `region` predictor belongs in the model. Which estimation method for each comparison?
>
> > [!answer]-
> > **(i) Random slope** — the fixed effects are unchanged and only the random structure differs, so fit both by **REML** and compare with a [[Likelihood Ratio Test]].
> > **(ii) Adding `region`** — this changes the fixed part, so the REML likelihoods are built on different residual contrasts and cannot be compared. Refit both by **ML** and test there.
