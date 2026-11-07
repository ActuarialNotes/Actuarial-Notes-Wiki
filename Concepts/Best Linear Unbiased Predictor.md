---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:364cd5f66b999d8e5eb08b7fe1f7ada888cf77eae6ec07efa399a4f5b7ee58ef
  sources:
    - "West, Additional Notes on Shrinkage Means (author-hosted, assigned MAS-II reading), whole note (1 page): u_i = a_i*mu + (1-a_i)*mu_i, a_i = sigma_i^2/(sigma^2_rf + sigma_i^2), sigma_i^2 = sigma^2_error/n_i, sha256:a843104b0090e1e7c305be0b4a83064c2fe5620f7570937eac321e425aba57f9 — http://www-personal.umich.edu/~bwest/shrinkage.doc"
    - "Klinker, Generalized Linear Mixed Models for Ratemaking, CAS E-Forum Winter 2011 Vol. 2, Sections 2-3, pp.3-10, eq. (3.6), sha256:7ef820482d27ecb454bd80f9b649ed7d8d6a5f0b4bf25a910c457c3726d36b68 — https://www.casact.org/sites/default/files/database/forum_11wforumpt2_klinker.pdf"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Best Linear Unbiased Predictor.md
---

![[Media/Figures/Best_Linear_Unbiased_Predictor.svg|340]]

A **Best Linear Unbiased Predictor** (BLUP) is the prediction a [[Linear Mixed Model|linear mixed model]] makes of a [[Random Effects|random effect]]. It is the cluster's residual, shrunk toward zero. With the covariance parameters replaced by their estimates (an EBLUP), the predicted random effects of cluster $i$ are

> $$\hat{\mathbf{u}}_i = \hat{\mathbf{D}}\mathbf{Z}_i^T\hat{\mathbf{V}}_i^{-1}\left(\mathbf{Y}_i - \mathbf{X}_i\hat{\boldsymbol{\beta}}\right)$$

- $\hat{\mathbf{D}}$ is the estimated covariance matrix of the random effects.
- $\hat{\mathbf{V}}_i = \mathbf{Z}_i\hat{\mathbf{D}}\mathbf{Z}_i^T + \hat{\mathbf{R}}_i$ is the estimated marginal covariance.

[[Fixed Effects|Fixed effects]] are estimated, and random effects are predicted, because a random effect is a realized value of a random variable rather than a constant. BLUPs minimize mean squared prediction error, so their spread is deliberately narrower than that of the true effects.

## Random intercept

For a random intercept model, the BLUP of cluster $i$ is

> $$\hat{u}_i = \frac{n_i\sigma_u^2}{n_i\sigma_u^2 + \sigma^2}\left(\bar{Y}_i - \hat{\beta}_0\right)$$

- $n_i$ is the number of observations of cluster $i$ and $\bar{Y}_i$ their mean.
- $\hat{\beta}_0$ is the estimated overall mean.

The shrinkage weight equals $n_i/(n_i + k)$ with $k = \sigma^2/\sigma_u^2$, which is [[Bühlmann Credibility|Bühlmann's]] credibility factor with $k$ the ratio of the expected process variance to the variance of hypothetical means. A cluster with plenty of data keeps nearly all of its own deviation. A thin cluster is pulled almost all the way back to the population mean.

> [!example]- A random intercept model of pure premium by class has $\sigma_u^2 = 900$ and $\sigma^2 = 3{,}600$. Class C has 6 policy-years averaging 260 against an overall mean of 200. What is its BLUP and its fitted pure premium? {Example}
> - $k = 3{,}600/900 = 4$, so the weight is $6/(6 + 4) = 0.60$.
> - The BLUP is $0.60(260 - 200) = 36$.
> - The fitted pure premium is $200 + 36 = 236$, not the raw 260.

## Conditional and marginal predictions

The predicted response for a subject is the fixed-effects linear predictor plus its predicted random effects:

> $$\hat{\mathbf{Y}}_i = \mathbf{X}_i\hat{\boldsymbol{\beta}} + \mathbf{Z}_i\hat{\mathbf{u}}_i$$

This conditional prediction is for a specific, observed cluster. The marginal prediction $\mathbf{X}_i\hat{\boldsymbol{\beta}}$ is the population average, for a cluster not in the data. The implied marginal model yields only marginal predictions, while a linear mixed model yields both. With [[Nested and Crossed Factors|nested]] random effects, the conditional prediction adds the predicted effect at every level.

> [!example]- A model has fixed effects $\hat{\beta}_0 = 50$ and $\hat{\beta}_1 = 2$ for age, and subject S, aged 30, has predicted random intercept $\hat{u}_S = -4$. What are the conditional prediction for S and the marginal prediction for a new subject aged 30? {Example}
> - The fixed-effects linear predictor at age 30 is $50 + 2(30) = 110$.
> - The conditional prediction for S adds its random intercept: $110 - 4 = 106$.
> - The marginal prediction for a new subject uses the fixed part alone: $110$.
