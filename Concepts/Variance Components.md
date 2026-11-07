---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:61e4dcf3ac9ab157578a9808f00d3ab890e4c18381c19378ac9d3a6bb6229568
  sources:
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "Klinker, Generalized Linear Mixed Models for Ratemaking, CAS E-Forum Winter 2011 Vol. 2, Sections 2-3, pp.3-10, eq. (3.6), sha256:7ef820482d27ecb454bd80f9b649ed7d8d6a5f0b4bf25a910c457c3726d36b68 — https://www.casact.org/sites/default/files/database/forum_11wforumpt2_klinker.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance Components.md
---

![[Media/Figures/Variance_Components.svg|340]]

**Variance components** are the covariance parameters $\boldsymbol{\theta}$ of a [[Linear Mixed Model|linear mixed model]], which split the total variance into a piece for each source of randomness: one for each [[Random Effects|random effect]], plus the residual. They separate between-cluster from within-cluster variability. The marginal covariance of cluster $i$ is

> $$\mathbf{V}_i = \mathbf{Z}_i\mathbf{D}\mathbf{Z}_i^T + \mathbf{R}_i$$

- $\mathbf{D}$ is the covariance matrix of the random-effect vector $\mathbf{u}_i$, with the random-effect variances on its diagonal and their covariances off it.
- $\mathbf{R}_i$ is the residual [[Covariance Structure|covariance structure]], usually $\sigma^2\mathbf{I}$: independent residuals with the within-cluster variance $\sigma^2$.

For a random intercept model, the marginal variance of one observation is

> $$\text{Var}(Y_{ti}) = \sigma_u^2 + \sigma^2$$

In a multilevel model the marginal variance of one observation is the sum of the random-effect variances at every level plus the residual variance.

> [!example]- A random intercept model of claim severity by adjuster reports an adjuster variance of 250 and a residual variance of 1,000. What is the variance of one claim, and how much of it is between adjusters? {Example}
> - The variance of one claim is $250 + 1{,}000 = 1{,}250$.
> - The share between adjusters is $250/1{,}250 = 0.20$, the [[Intraclass Correlation|intraclass correlation]].

## Constraints on variance components

The diagonal elements of $\mathbf{D}$ and $\mathbf{R}_i$ are variances and must be non-negative, but the off-diagonal covariances can be negative. A fitted variance at the boundary, $\hat{\sigma}_u^2 = 0$, signals that the grouping factor explains nothing, and the mixed model has collapsed to ordinary regression.

## Uses of the variance components

The variance components determine the intraclass correlation, the shrinkage of each [[Best Linear Unbiased Predictor|BLUP]] and the standard errors of the [[Fixed Effects|fixed effects]]. They are the mixed-model counterpart of the [[Variance of Hypothetical Means|variance of hypothetical means]] ($\sigma_u^2$) and the [[Expected Value of Process Variance|expected value of process variance]] ($\sigma^2$) in credibility. [[Restricted Maximum Likelihood|REML]] is the default estimator, because ML variance components are biased downward.
