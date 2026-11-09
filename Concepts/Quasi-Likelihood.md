---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:f770554e7e406dd93a3e190894f613292b0dbfab46939f125b93f1e7e280fbcb
  sources:
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), 'Quasi-Likelihood' (p.1), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), addendum 'Models for Count Data With Overdispersion' (rev. Oct 2022), sec.1 The Over-Dispersed Poisson Model (PDF pp.1-3), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Roback & Legler, Beyond Multiple Linear Regression (CRC 2021, open online edition), ch.4 Poisson Regression, sec.4.9.1 Dispersion Parameter Adjustment, sha256:55079c7b837d6207e55badacb0258e26d6c8f07ee731d11db0878b2d6a4982d4 — https://bookdown.org/roback/bookdown-BeyondMLR/ch-poissonreg.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.7.2 overdispersed Poisson (PDF p.31) and sec.6.2.1 Nested Models and the F-Test, eq.17 (PDF pp.74-76), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Quasi-Likelihood.md
---

**Quasi-Likelihood** is a method of fitting a [[Generalized Linear Model|generalized linear model]] that specifies only how the mean of the response depends on the predictors and how its variance depends on its mean, without assuming a full distribution for the response. The mean $\mu_i$ is related to the linear predictor $\eta_i$ by a [[Link Function|link function]], $g(\mu_i) = \eta_i$, and the variance of the response is

> $$\text{Var}(Y_i) = \phi\, V(\mu_i)$$

- $V(\mu)$ is the [[Variance Function|variance function]].
- $\phi$ is the [[Dispersion Parameter|dispersion parameter]], estimated from the data.

The estimating equations use only the mean and the variance, and $\phi$ cancels out of them. The coefficient estimates are therefore the same as those of the distribution with variance function $V$, and only their variances change.

## Estimating the dispersion parameter

The dispersion parameter is estimated by Pearson's chi-square statistic divided by its degrees of freedom:

> $$\hat\phi = \frac{X^2}{n - (p + 1)}$$

> $$X^2 = \sum_{i=1}^{n} \frac{(y_i - \hat\mu_i)^2}{V(\hat\mu_i)}$$

- $n$ is the number of observations.
- $p + 1$ is the number of estimated coefficients, including the intercept.

The Poisson and binomial distributions fix $\phi = 1$, so for those models $\hat\phi$ well above 1 shows overdispersion, a variance larger than the distribution allows. An estimate near 1 is consistent with the distribution. For the normal, gamma and Tweedie distributions $\phi$ is a free parameter, so its size alone says nothing about the fit.

## Quasi-Poisson

A quasi-Poisson model keeps the Poisson mean and log link of [[Poisson Regression|Poisson regression]] but has variance $\text{Var}(Y_i) = \phi\mu_i$. Its coefficient estimates are the Poisson estimates, and the covariance matrix of the estimates is $\phi$ times the Poisson one. The standard error of each coefficient is therefore

> $$\text{SE}_{\text{quasi}}(\hat\beta_j) = \sqrt{\hat\phi}\; \text{SE}(\hat\beta_j)$$

- $\text{SE}(\hat\beta_j)$ is the standard error from the Poisson fit, with $\phi = 1$.

The Wald statistic $\hat\beta_j / \text{SE}_{\text{quasi}}(\hat\beta_j)$ is the Poisson statistic divided by $\sqrt{\hat\phi}$, and it is compared with a $t$ distribution on $n - (p+1)$ degrees of freedom. The same adjustment gives a quasi-binomial model from a binomial one.

> [!example]- A Poisson frequency model on 500 residual degrees of freedom has Pearson $X^2 = 1{,}450$. A vacant-building coefficient is $\hat\beta = 0.25$ with standard error $0.08$. After refitting as quasi-Poisson, is the coefficient significant at the $5\%$ level? {Example}
> - The dispersion estimate is $\hat\phi = 1{,}450/500 = 2.90$.
> - The estimate stays $0.25$, and its standard error becomes $0.08\sqrt{2.90} = 0.136$.
> - The test statistic is $0.25/0.136 = 1.84$, below the critical value $1.96$, so the coefficient is not significant.
> - The Poisson fit gave $0.25/0.08 = 3.13$, which looked significant only because the overdispersion was ignored.

## Comparing nested models

Two nested quasi-likelihood models are compared by the drop in [[Deviance|deviance]] per degree of freedom, divided by the dispersion estimate. The test statistic is

> $$F = \frac{(D_0 - D_1)/(\text{df}_0 - \text{df}_1)}{\hat\phi}$$

- $D_0$ and $\text{df}_0$ are the residual deviance and degrees of freedom of the smaller model.
- $D_1$ and $\text{df}_1$ are those of the larger model.

It is compared with an [[F-Distribution|F distribution]] with $\text{df}_0 - \text{df}_1$ and $\text{df}_1$ degrees of freedom.

> [!example]- In the same model, adding a territory variable with 5 levels lowers the residual deviance from $1{,}560$ on 504 degrees of freedom to $1{,}520$ on 500, with $\hat\phi = 2.90$. The 95th percentile of $F_{4,500}$ is $2.39$. Does territory belong in the model? {Example}
> - The drop in deviance per degree of freedom is $(1{,}560 - 1{,}520)/4 = 10$.
> - The test statistic is $F = 10/2.90 = 3.45$.
> - Because $3.45 > 2.39$, territory is significant after allowing for overdispersion.

> [!trap] Reading lack of fit as overdispersion
> A large $X^2$ is overdispersion only if the predictors and the link are right. A missing predictor, a missing interaction or a wrong link also inflates $X^2$, and a quasi-likelihood fit only widens the standard errors of that misspecified model. Fix the model before estimating $\phi$.
