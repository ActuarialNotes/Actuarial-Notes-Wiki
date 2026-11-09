---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:7b68ebebad6516e201eb3cc3d1a78547ecc432e58241b49317ad8c09dce541e2
  sources:
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "Grace-Martin, When the Hessian Matrix Goes Wacky, The Analysis Factor ('run a marginal (aka population-averaged) model instead of a mixed model ... using a Repeated statement instead of a Random statement'; rescaling; removing a random effect) — https://www.theanalysisfactor.com/wacky-hessian-matrix/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Covariance Structure.md
---

![[Media/Figures/Covariance_Structure.svg|340]]

A **Covariance Structure** is the pattern a [[Linear Mixed Model|linear mixed model]] imposes on the covariance of each cluster's responses, which says which observations are correlated and how the correlation changes. The implied marginal covariance matrix of cluster $i$ is

> $$\mathbf{V}_i = \mathbf{Z}_i\mathbf{D}\mathbf{Z}_i^T + \mathbf{R}_i$$

- $\mathbf{D}$ is the covariance matrix of the random effects $\mathbf{u}_i$.
- $\mathbf{R}_i$ is the covariance matrix of the residuals $\boldsymbol{\varepsilon}_i$.

The common structures for $\mathbf{R}_i$ (or $\mathbf{D}$), for $n$ repeated measures with variance $\sigma^2$, are:

| Structure | Covariance of measures $j \ne k$ | Parameters |
| :--- | :--- | :--- |
| Scaled identity (independent) | $0$ | 1 |
| Compound symmetry | one common covariance | 2 |
| First-order autoregressive, AR(1) | $\sigma^2\rho^{\lvert j-k\rvert}$ | 2 |
| Toeplitz (banded) | depends only on $\lvert j - k \rvert$ | $n$ |
| Unstructured | each free | $n(n+1)/2$ |

A scaled identity $\mathbf{R}_i = \sigma^2\mathbf{I}$ gives every residual the same variance and makes residuals of the same subject uncorrelated, with only $\sigma^2$ to estimate. Compound symmetry gives every pair of observations of a subject the same covariance. Under AR(1) the correlation at lag $k$ is $\rho^k$, so successive off-diagonals are $\sigma^2\rho$, $\sigma^2\rho^2$, and so on, and a positive $\rho$ makes every covariance positive. A banded structure has covariance depending only on lag but zero beyond a certain lag. An unstructured matrix imposes no pattern and estimates each variance and covariance.

> [!example]- A residual covariance matrix for three equally spaced measures has diagonal 4, lag-1 entries 2 and lag-2 entry 1. Is it AR(1)? {Example}
> - The lag-1 correlation is $2/4 = 0.5$, so AR(1) predicts a lag-2 covariance of $4(0.5^2) = 1$.
> - The lag-2 entry is 1, so the matrix is AR(1) with $\sigma^2 = 4$ and $\rho = 0.5$.

For repeated trials on the same subject, residuals are expected to be correlated, so compound symmetry or AR(1) replaces the scaled identity.

## Random intercept and compound symmetry

Under a random intercept model, each observation's marginal variance is the sum of the between-subject and within-subject variances, and the covariance of two observations of a subject is the between-subject variance. A random intercept therefore implies compound symmetry. The random intercept constrains the common correlation to be positive, while a compound-symmetric residual structure leaves it unconstrained. Under compound symmetry for $\mathbf{D}$, all its diagonal elements are equal and all its off-diagonal elements equal one common covariance.

## Dimension of D

$\mathbf{D}$ holds one row and column per random effect, that is per column of $\mathbf{Z}_i$. With $q$ random-effect columns, $\mathbf{u}_i$ is $q \times 1$ and $\mathbf{D}$ is $q \times q$.

> [!example]- A model has a random intercept and two random slopes per subject. What is the size of $\mathbf{D}$, and how many parameters does it hold if unstructured? {Example}
> - There are $q = 3$ random effects, so $\mathbf{D}$ is $3 \times 3$.
> - Unstructured, it holds 3 variances and 3 covariances: $3(4)/2 = 6$ parameters.
> - The number of fixed effects and the number of observations do not enter it.

## The implied marginal model

A marginal model has no random effects. It specifies the covariance of the observations directly through the residual covariance matrix, with $\mathbf{V}_i = \mathbf{R}_i$. It is not held to the random-effects model's constraints, so it can be fitted where the mixed model cannot, for instance when the data call for a negative within-subject correlation.

## Choosing a covariance structure

More structure means fewer parameters and more power. The wrong structure biases the standard errors of the [[Fixed Effects|fixed effects]] even when $\hat{\boldsymbol{\beta}}$ is fine, and assuming independence for correlated data understates them. REML-based [[Likelihood Ratio Test|likelihood ratio tests]] compare nested covariance structures when the fixed effects are the same in both models. Non-nested structures are compared by [[AIC]].

> [!example]- Quarterly loss ratios have empirical correlations $0.62$, $0.38$ and $0.24$ at lags 1, 2 and 3. Does compound symmetry or AR(1) fit? {Example}
> - Compound symmetry predicts one common correlation, but the observed values decay.
> - AR(1) with $\rho = 0.62$ predicts $0.62$, $0.384$ and $0.238$, almost exactly the observed values.
> - AR(1) fits, at the same two-parameter cost as compound symmetry.
