---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f96c2a38884e2c46d3da2e0d7a92a0802d5290daac1e6298172ebe66a707e65d
  sources:
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "Klinker, Generalized Linear Mixed Models for Ratemaking, CAS E-Forum Winter 2011 Vol. 2, Sections 2-3, pp.3-10, eq. (3.6), sha256:7ef820482d27ecb454bd80f9b649ed7d8d6a5f0b4bf25a910c457c3726d36b68 — https://www.casact.org/sites/default/files/database/forum_11wforumpt2_klinker.pdf"
    - "West, Additional Notes on Shrinkage Means (author-hosted, assigned MAS-II reading), whole note (1 page): u_i = a_i*mu + (1-a_i)*mu_i, a_i = sigma_i^2/(sigma^2_rf + sigma_i^2), sigma_i^2 = sigma^2_error/n_i, sha256:a843104b0090e1e7c305be0b4a83064c2fe5620f7570937eac321e425aba57f9 — http://www-personal.umich.edu/~bwest/shrinkage.doc"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Effects.md
---

![[Media/Figures/Random_Effects.svg|340]]

**Random effects** are the cluster-level departures from the population-average fit in a [[Linear Mixed Model|linear mixed model]]. Unlike [[Fixed Effects|fixed effects]] they are treated as draws from a distribution, so a cluster with thin data is pulled toward the overall mean rather than fitted on its own. In the model $\mathbf{Y}_i = \mathbf{X}_i\boldsymbol{\beta} + \mathbf{Z}_i\mathbf{u}_i + \boldsymbol{\varepsilon}_i$, the random effects of cluster $i$ are

> $$\mathbf{u}_i \sim N(\mathbf{0}, \mathbf{D})$$

- $\mathbf{Z}_i$ is the random-effects design matrix, mapping each observation of cluster $i$ to its random effects.
- $\mathbf{D}$ holds the [[Variance Components|variance components]] of the random effects.
- The residuals $\boldsymbol{\varepsilon}_i \sim N(\mathbf{0}, \mathbf{R}_i)$ are independent of $\mathbf{u}_i$.

A factor is a random effect when its observed levels are a sample from a larger population of levels, and the interest is in that population. A subject or cluster identifier with repeated observations per subject is typically a random effect. The normality assumption applies to the random effects and the residuals, not to the response itself.

The random effects are assumed to have mean zero. The population average lives entirely in the fixed part, so a random effect adds no intercept of its own. A random effect costs one variance parameter, not one coefficient per level: 68 territories add a single $\sigma_u^2$ to the model.

> [!example]- A claims model has a random intercept for each of 68 territories. What does the model estimate for territory, and what does it predict? {Example}
> - It estimates one variance component, $\sigma_u^2$, the variance of territory effects.
> - It predicts each territory's effect $u_i$ with the [[Best Linear Unbiased Predictor|BLUP]], a value shrunk toward zero.

## Correlation induced by random effects

Random effects induce correlation between observations of the same cluster, because those observations share $\mathbf{u}_i$. This is what lets a mixed model handle repeated measures on one policyholder.

## Shrinkage of random effects

Partial pooling gives each cluster an estimate that borrows strength from the other clusters. Complete pooling would ignore the clusters, and no pooling would fit each cluster on its own. For a random intercept, the predicted effect of cluster $i$ is its average residual shrunk by the weight

> $$\frac{n_i\sigma_u^2}{n_i\sigma_u^2 + \sigma^2}$$

- $n_i$ is the number of observations of cluster $i$.
- $\sigma_u^2$ is the variance between clusters and $\sigma^2$ the residual variance within them.

The weight is a credibility factor. Sparsely sampled clusters are shrunk more toward the population mean, so they are not overfit. A smaller $\sigma_u^2$ shrinks every cluster effect further toward zero.

> [!example]- A random intercept model of loss ratio by territory has $\sigma_u^2 = 0.010$ and $\sigma^2 = 0.090$. Territory A has 9 observations averaging $0.15$ above the mean, and territory B has 1 observation $0.15$ above. What are their predicted effects? {Example}
> - Territory A's weight is $9(0.010)/(9(0.010) + 0.090) = 0.50$, so its predicted effect is $0.50(0.15) = 0.075$.
> - Territory B's weight is $0.010/(0.010 + 0.090) = 0.10$, so its predicted effect is $0.10(0.15) = 0.015$.
> - The same raw deviation gives very different predictions. This is [[Bühlmann Credibility|Bühlmann credibility]] in another notation.

In a Bayesian hierarchical model the random effects get a normal prior with mean zero, and its variance plays the part of $\sigma_u^2$. The prior variances of the global intercept and slope govern only those parameters, not the cluster effects.
