---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:5c42a19a755830ef9b244ebe77ceb5e0c744b5d34ad58f873ffe78c75fa4ec19
  sources:
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "Grace-Martin, When the Hessian Matrix Goes Wacky, The Analysis Factor ('run a marginal (aka population-averaged) model instead of a mixed model ... using a Repeated statement instead of a Random statement'; rescaling; removing a random effect) — https://www.theanalysisfactor.com/wacky-hessian-matrix/"
    - "Newsom, Multilevel Regression Estimation Methods for Continuous Dependent Variables, Psy 526/626 handout, Portland State Univ., pp.2, 4 (ML variance estimates biased, more so with fewer groups; ML and REML similar when the number of groups is large), sha256:c4b4a91eb384b7690fcb2ee2671a0a7b698a3494d7b416ef705269593402dfa1 — https://web.pdx.edu/~newsomj/mlrclass/ho_estimators.pdf"
  open_findings: 0
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
- **When estimation fails.** ML and REML are iterative, and the algorithm can fail to converge, stop with an estimated $\mathbf{G}$ (West et al.'s $\mathbf{D}$) that is not positive definite, or leave a variance component on its boundary of $0$. Remedies: supply alternative starting values for the covariance parameters (SAS's `PARMS` statement, which also runs a grid search over the likelihood surface); rescale effects so the covariance parameters are on similar scales; drop a random effect whose variance is estimated at $0$; or fit a marginal model instead — the implied marginal model, or one with an unstructured residual covariance matrix — which models $\mathbf{V}_i$ directly without the random effects (see [[Covariance Structure]])

![[Media/Figures/Restricted_Maximum_Likelihood.svg|340]]

> [!example]- Which Fit Do You Compare? {Example}
> An actuary wants to test (i) whether a random slope by accident year is needed, and (ii) whether a `region` predictor belongs in the model. Which estimation method for each comparison?
>
> > [!answer]-
> > **(i) Random slope** — the fixed effects are unchanged and only the random structure differs, so fit both by **REML** and compare with a [[Likelihood Ratio Test]].
> > **(ii) Adding `region`** — this changes the fixed part, so the REML likelihoods are built on different residual contrasts and cannot be compared. Refit both by **ML** and test there.
