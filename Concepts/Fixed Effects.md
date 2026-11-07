---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:5f686b83a96d99d42253ce040e003c917319c8388da3a526c2e93f0c73c7e190
  sources:
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Klinker, Generalized Linear Mixed Models for Ratemaking, CAS E-Forum Winter 2011 Vol. 2, Sections 2-3, pp.3-10, eq. (3.6), sha256:7ef820482d27ecb454bd80f9b649ed7d8d6a5f0b4bf25a910c457c3726d36b68 — https://www.casact.org/sites/default/files/database/forum_11wforumpt2_klinker.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fixed Effects.md
---

![[Media/Figures/Fixed_Effects.svg|340]]

**Fixed effects** are the regression coefficients $\boldsymbol{\beta}$ of a [[Linear Mixed Model|linear mixed model]] that describe the population-average relationship between the predictors and the response. They are unknown constants to be estimated, not draws from a distribution. The population-average mean is

> $$E[\mathbf{Y}_i] = \mathbf{X}_i\boldsymbol{\beta}$$

- $\mathbf{X}_i$ is the fixed-effects design matrix of cluster $i$, one column per fixed effect.

A factor is a fixed effect when its levels are the specific levels of interest, all present in the data, and would reappear in a replication of the study, such as vehicle class or coverage limit. A factor whose observed levels are a sample from a larger population of levels is a [[Random Effects|random effect]]. A continuous covariate is not a factor with levels, so it enters the model as a fixed effect.

> [!example]- A claims model has three candidate grouping variables: coverage (liability, collision, comprehensive), territory (68 rating territories) and year (5 calendar years). Which are fixed effects? {Example}
> - Coverage is fixed: its three levels are all included, are all of interest, and each has plenty of data.
> - Territory is random: its 68 levels are mostly thin, and the interest is in the distribution of territory effects and a shrunk estimate for each.
> - Year is fixed if the five years are the object of interest, such as a trend, and random only if they are treated as a sample of years.

## Interpretation of a fixed effect

Interpretation is the same as in [[Linear Regression|linear regression]]: $\beta_j$ is the change in the mean response per unit increase in $x_j$, holding the other predictors fixed. A fixed-effect coefficient is the same for every cluster. Only a [[Random Intercept and Slope|random slope]] lets a coefficient vary across clusters.

## Number of fixed-effect parameters

A categorical factor with $L$ levels enters the model as $L - 1$ indicator variables, one level being the reference. The fixed part has

> $$1 + \sum_{\text{factors}} (L - 1) + (\text{number of continuous covariates})$$

parameters. A random effect costs one variance parameter instead, however many levels it has.

> [!example]- A model has an intercept, coverage (3 levels), territory (68 levels) and driver age (continuous). How many parameters does territory cost as a fixed effect, and as a random effect? {Example}
> - As fixed effects the model has $1 + 2 + 67 + 1 = 71$ parameters, territory costing 67 of them.
> - As a random intercept, territory costs one variance parameter $\sigma_u^2$, so the model has $1 + 2 + 1 = 4$ fixed effects and one variance component beside the residual variance.

## Estimation of the fixed effects

Fixed effects are estimated by generalized least squares given the variance parameters, $\hat{\boldsymbol{\beta}} = (\sum_i \mathbf{X}_i^T\mathbf{V}_i^{-1}\mathbf{X}_i)^{-1}\sum_i \mathbf{X}_i^T\mathbf{V}_i^{-1}\mathbf{Y}_i$. Under both ML and REML, the estimated covariance parameters are plugged into this same formula. Random effects are predicted instead, by the [[Best Linear Unbiased Predictor|BLUP]]. Comparing two models that differ in their fixed effects requires [[Maximum Likelihood Estimation|maximum likelihood]], not [[Restricted Maximum Likelihood|REML]].

A marginal model has only fixed effects in its mean and models the correlation through its [[Covariance Structure|covariance structure]], so its coefficients are population averages with no cluster-specific effects.
