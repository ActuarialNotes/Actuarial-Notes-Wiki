---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:0f90017b4f0454e63aab18ad4ecb0cc5590868e72b2fd2219427268101083940
  sources:
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "Grace-Martin, When the Hessian Matrix Goes Wacky, The Analysis Factor ('run a marginal (aka population-averaged) model instead of a mixed model ... using a Repeated statement instead of a Random statement'; rescaling; removing a random effect) — https://www.theanalysisfactor.com/wacky-hessian-matrix/"
    - "Newsom, Multilevel Regression Estimation Methods for Continuous Dependent Variables, Psy 526/626 handout, Portland State Univ., pp.2, 4 (ML variance estimates biased, more so with fewer groups; ML and REML similar when the number of groups is large), sha256:c4b4a91eb384b7690fcb2ee2671a0a7b698a3494d7b416ef705269593402dfa1 — https://web.pdx.edu/~newsomj/mlrclass/ho_estimators.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Restricted Maximum Likelihood.md
---

![[Media/Figures/Restricted_Maximum_Likelihood.svg|340]]

**Restricted Maximum Likelihood** (REML), also called residual maximum likelihood, is a frequentist method that estimates the [[Variance Components|variance components]] of a [[Linear Mixed Model|linear mixed model]] by maximizing the likelihood of the residuals (error contrasts) left after removing the [[Fixed Effects|fixed effects]], rather than the likelihood of the full data. Up to a constant, the REML log-likelihood is

> $$l_R(\boldsymbol{\theta}) = -\frac{1}{2}\left[\sum_i \ln|\mathbf{V}_i| + \ln\Big|\sum_i \mathbf{X}_i^T\mathbf{V}_i^{-1}\mathbf{X}_i\Big| + \sum_i \mathbf{r}_i^T\mathbf{V}_i^{-1}\mathbf{r}_i\right]$$

- $\mathbf{V}_i$ is the marginal covariance of cluster $i$, a function of $\boldsymbol{\theta}$.
- $\mathbf{r}_i = \mathbf{Y}_i - \mathbf{X}_i\hat{\boldsymbol{\beta}}$ is the residual vector.

[[Maximum Likelihood Estimation|Maximum likelihood]] maximizes the full likelihood jointly over the fixed effects and the covariance parameters. Its covariance estimates are biased downward, because it treats $\hat{\boldsymbol{\beta}}$ as known and ignores the $p$ degrees of freedom spent estimating it. The middle term of $l_R$ is the correction. Under both methods, the fixed effects are then estimated by generalized least squares with the estimated covariance parameters plugged in.

> [!example]- A sample of three independent observations, $2$, $4$ and $9$, has only an unknown mean as its fixed effect. What are the ML and REML estimates of the variance? {Example}
> - The mean is $5$, and the sum of squared deviations is $9 + 1 + 16 = 26$.
> - ML divides by $n$: $26/3 = 8.67$.
> - REML divides by $n - 1$, accounting for the degree of freedom spent on the mean: $26/2 = 13$.

The bias matters most with few clusters. With many clusters ML and REML converge.

## Comparing models fitted by REML

Models that differ only in their random part or covariance structure, with the same fixed effects, are compared with REML log-likelihoods. Models that differ in their fixed effects must be compared with ML fits, because their REML likelihoods are built on different error contrasts and are not comparable. [[AIC]] and [[BIC]] follow the same rule: a REML AIC may only be compared with another REML AIC on identical fixed effects.

> [!example]- An actuary tests whether a random slope by accident year is needed, and whether a region predictor belongs in the model. Which estimation method does each comparison use? {Example}
> - The random slope changes only the random part, so both models are fitted by REML and compared with a [[Likelihood Ratio Test|likelihood ratio test]].
> - Region changes the fixed part, so both models are refitted by ML and compared there.

## Failure of estimation

ML and REML are iterative, and the algorithm can fail to converge, stop with an estimated $\mathbf{D}$ that is not positive definite, or leave a variance component on its boundary of $0$. The remedies are:

1. Supply other starting values for the covariance parameters (SAS's `PARMS` statement, which also runs a grid search).
2. Rescale the effects so the covariance parameters are on similar scales.
3. Drop a random effect whose variance is estimated at $0$.
4. Fit a marginal model instead, which models $\mathbf{V}_i$ directly without random effects ([[Covariance Structure#The implied marginal model|implied marginal model]]).

> [!trap] REML likelihoods across fixed effects
> Two models with different fixed effects can't be compared by their REML $-2\,l_R$. Refit both by ML first.
