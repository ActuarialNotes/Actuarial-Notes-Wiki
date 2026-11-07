---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:db4d432b5c05b38bc2d2d90f985d3d94787823eb29d75a9f77c21afa98b50b24
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.6.1.1-6.1.2 eqs.15-16 and fn.12 (PDF p.73), sec.6.2.1 eq.17 (PDF p.75), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), App. B sec.B.3.2 eqs.B.11-B.13 and Normal examples (PDF pp.6-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), ch.4 secs.4.2.2-4.2.3 Poisson deviance, chi^2 on n-p df, nested differences (PDF pp.7-8), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sec.6.1.1 (deviance = -2 x maximized log-likelihood, printed p.228, PDF p.236), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Deviance.md
---

![[Media/Figures/Deviance.svg|340]]

The **Deviance** of a [[Generalized Linear Model]] measures how far the fitted model is from the saturated model, the model with one parameter for each observation, which fits every observation exactly. The scaled deviance is twice the difference between the maximized log-likelihoods of the saturated model and the fitted model:

> $$D^* = 2\left[\,l_{\text{sat}} - l(\hat{\boldsymbol{\beta}})\,\right]$$

- $l_{\text{sat}}$ is the maximized log-likelihood of the saturated model.
- $l(\hat{\boldsymbol{\beta}})$ is the maximized log-likelihood of the fitted model.

The deviance, also called the unscaled deviance, is the scaled deviance multiplied by the [[Dispersion Parameter|dispersion parameter]] $\phi$:

> $$D = \phi\, D^*$$

For the Poisson and the binomial, $\phi = 1$, so the two are equal. The deviance is never negative, and the saturated model has deviance 0. A smaller deviance means a fitted model closer to the saturated model, which is a better fit. As a function of the coefficients, the deviance is smallest where the log-likelihood is largest, so its minimum is at the [[Maximum Likelihood Estimation|maximum likelihood estimate]].

## Deviance of common distributions

For a [[Normal Distribution|normal]] response with the identity link, the deviance is the [[Residual Sum of Squares|residual sum of squares]]:

> $$D = \sum_{i=1}^{n} (y_i - \hat{\mu}_i)^2$$

For a [[Poisson Distribution|Poisson]] response, the deviance is

> $$D = 2\sum_{i=1}^{n}\left[\,y_i \ln\frac{y_i}{\hat{\mu}_i} - (y_i - \hat{\mu}_i)\right]$$

- A term with $y_i = 0$ has $y_i \ln(y_i/\hat{\mu}_i) = 0$.

> [!example]- A Poisson GLM gives fitted means 3, 4 and 1 for observed counts 2, 5 and 1. What is its deviance? {Example}
> - The first observation contributes $2 \ln\frac{2}{3} - (2 - 3) = 0.1891$.
> - The second contributes $5 \ln\frac{5}{4} - (5 - 4) = 0.1157$.
> - The third has $y_i = \hat{\mu}_i$, so it contributes 0.
> - The deviance is $2(0.1891 + 0.1157) = 0.6096$.

## Comparing nested models

When a smaller model is nested in a larger one, the drop in scaled deviance tests whether the extra parameters improve the fit. When $\phi$ is known, the test statistic is

> $$D^*_{\text{small}} - D^*_{\text{large}}$$

- Under the hypothesis that the smaller model is adequate, it has approximately a [[Chi-Squared Distribution|chi-squared distribution]] with degrees of freedom equal to the number of extra parameters in the larger model.

This is the [[Likelihood Ratio Test|likelihood ratio test]]. In the same way, the scaled deviance of one model can be compared with a chi-squared distribution with $n - k$ degrees of freedom to test its fit, where $k$ is the number of estimated coefficients.

> [!example]- A Poisson GLM with only an intercept has deviance 45.2 on 49 degrees of freedom. Adding territory, with 3 levels, gives deviance 30.8 on 47 degrees of freedom. Does territory improve the model at the 5% level? {Example}
> - For a Poisson model $\phi = 1$, so the statistic is $45.2 - 30.8 = 14.4$.
> - Territory adds $49 - 47 = 2$ parameters, so the statistic is compared with a chi-squared distribution with 2 degrees of freedom.
> - The 5% critical value is $5.991$, and $14.4 > 5.991$, so territory improves the model.

## The F test when the dispersion is estimated

When $\phi$ is estimated, as for a normal or a gamma response, nested models are compared with the [[F-Distribution|F statistic]]

> $$F = \frac{(D_{\text{small}} - D_{\text{large}})/r}{D_{\text{large}}/(n - k_{\text{large}})}$$

- $r$ is the number of extra parameters in the larger model.
- $k_{\text{large}}$ is the number of estimated coefficients in the larger model.
- $F$ has $r$ and $n - k_{\text{large}}$ degrees of freedom.

The denominator is the larger model's estimate of $\phi$, which may instead be its Pearson estimate.

> [!example]- A normal linear model has residual sum of squares 520 on 46 degrees of freedom. Adding an interaction with 2 coefficients lowers it to 400 on 44 degrees of freedom. Is the interaction significant at the 5% level? {Example}
> - For a normal response the deviance is the residual sum of squares, so the drop is $520 - 400 = 120$.
> - The statistic is $F = \frac{120 / 2}{400 / 44} = \frac{60}{9.091} = 6.6$.
> - The 5% critical value of $F$ with 2 and 44 degrees of freedom is $3.21$, and $6.6 > 3.21$, so the interaction is significant.

> [!trap] Scaled and unscaled deviance named the other way round
> Dobson and Barnett call $2[\,l_{\text{sat}} - l(\hat{\boldsymbol{\beta}})\,]$ the deviance, which is the scaled deviance $D^*$ on this page. Check which quantity a question gives before dividing by $\phi$. For the Poisson and the binomial, $\phi = 1$ and the two are equal.
