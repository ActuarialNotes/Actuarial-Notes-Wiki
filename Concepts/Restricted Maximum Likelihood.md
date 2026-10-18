---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:71171f3b021f8860bcb4a1a2eec45ecff815b0e0bd84e314f79cad78b2e39f24
  sources:
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Restricted Maximum Likelihood.md
---

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
