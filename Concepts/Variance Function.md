---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:a1e32bf81f809d1eba0199fe5f9b27cb91ef8e708c8a74dc13129119aaf59e31
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5, 2nd ed., §2.2 eq. 3 and Table 1 (variance functions), §2.5 (weights: Var = phi V(mu)/w), §2.7.1-2.7.3 (gamma, inverse Gaussian, Tweedie p=0,1,2,3, 1<p<2 compound Poisson-gamma), pp.7-8, 16, 19-23, sha256:06f7c01d4c80af9a9c6672cb0ace7814c533499b4662b783218f23d12cc46318 — https://www.casact.org/sites/default/files/2021-03/8_GLM.pdf"
    - "Rodriguez, Generalized Linear Model Theory (GLM notes Appendix B), eqs. B.3, B.6-B.8 (var = phi b''(theta)/p_i; IRLS working variable and weights p_i/[b''(theta)(d eta/d mu)^2]), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, GLM notes ch.3, §3.8.1 Pearson residuals (observed minus fitted divided by an estimate of the standard deviation), p.47, sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf"
    - "Rodriguez, Models for Count Data With Overdispersion (GLM notes addendum), comparing variance functions by grouping on fitted values and plotting group means and variances, sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "nlme (Pinheiro & Bates) documentation, varExp.Rd ('sigma^2(v) = exp(2 theta v)', default form ~fitted(.)), sha256:3723dae6e60e6caca06b252713a60b25dc350151de094a1aeae22339f2a3b2c5, varPower.Rd ('sigma^2(v) = |v|^(2 theta)'), sha256:41fd48607be59547248b415e127cbecb57f48da2707b2be6b74fd8da1f6c8890, varIdent.Rd, sha256:2660f855e58dfae76b497aced8c713b79bba9143b59a73c88152ab8503cce652 — https://github.com/cran/nlme/tree/master/man"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance Function.md
---

A **Variance Function** $V(\mu)$ is the function that says how the variance of a response depends on its mean. In a [[Generalized Linear Model|generalized linear model]] it is fixed by the choice of [[Exponential Family|exponential-family]] distribution, and the variance of observation $i$ is

> $$\text{Var}(Y_i) = \frac{\phi\,V(\mu_i)}{w_i}$$

- $\phi$ is the [[Dispersion Parameter|dispersion parameter]] and $w_i$ the prior weight (exposure, claim count).
- $\mu_i = E[Y_i]$ is the mean.

The prior weight sets how much each observation counts in the fit. In a severity GLM on average claim size, the number of claims is the prior weight.

> [!example]- A gamma severity GLM has $\phi = 0.5$. A claim with $\hat{\mu} = 5{,}000$ and claim count 1 has what standard deviation, and what if the observation were the average of 4 claims? {Example}
> - The gamma variance function is $V(\mu) = \mu^2$, so the variance is $0.5(5{,}000^2)/1$ and the standard deviation is $\sqrt{0.5}(5{,}000) = 3{,}536$.
> - With a prior weight of 4, the variance is divided by 4, so the standard deviation halves to $1{,}768$.

## Variance functions of the common distributions

- normal: $1$ (constant variance)
- Poisson: $\mu$
- binomial: $\mu(1 - \mu)$
- [[Gamma|gamma]]: $\mu^2$ (constant coefficient of variation)
- inverse Gaussian: $\mu^3$
- [[Tweedie Distribution|Tweedie]] with $1 < p < 2$: $\mu^p$

A normal model assumes constant variance, so it does not fit data whose spread grows with the mean. If the standard deviation is proportional to the mean, the variance is proportional to the mean squared, which is the gamma's variance function. Under a Poisson model the standard deviation grows like the square root of the mean.

## Role of the variance function in the fit

A GLM's estimating equations weight each residual $y_i - \mu_i$ by $w_i/V(\mu_i)$, along with a factor from the link. The Pearson residual puts all residuals on one scale:

> $$r_i = \frac{y_i - \hat{\mu}_i}{\sqrt{V(\hat{\mu}_i)}}$$

A fan shape in a [[Residual Plot|residual plot]] of such residuals means the wrong $V$ was chosen.

> [!example]- A gamma severity GLM has $\phi = 0.5$. Claim 1 has $\hat{\mu} = 5{,}000$ and settles for $8{,}000$, and claim 2 has $\hat{\mu} = 50{,}000$ and settles for $53{,}000$. How do the two misses compare, each divided by the claim's standard deviation? {Example}
> - The standard deviation is $\sqrt{0.5}\,\hat{\mu}$: $3{,}536$ for claim 1 and $35{,}355$ for claim 2.
> - Claim 1's miss is $3{,}000/3{,}536 = 0.849$ standard deviations.
> - Claim 2's miss is $3{,}000/35{,}355 = 0.085$ standard deviations.
> - The same $3{,}000$ miss is ten times as surprising on the small claim.

## Choosing a variance function

Plot group variances against group means on log–log axes. The slope estimates $p$ in $V(\mu) = \mu^p$: $0$ for normal, $1$ for Poisson, $2$ for gamma, and between $1$ and $2$ for Tweedie. A fan or wedge in a plot of the response against a predictor, with the spread widening as the mean grows, points the same way.

> [!example]- Pure premium data in three cells have means 200, 400 and 800 and variances 60,000, 180,000 and 540,000. Which variance function is indicated? {Example}
> - Each doubling of the mean triples the variance.
> - The log–log slope is $p = \ln 3/\ln 2 = 1.585$.
> - $V(\mu) \approx \mu^{1.6}$ lies between Poisson and gamma, so a Tweedie with $p \approx 1.6$ is indicated.

## Variance functions in a linear mixed model

In a [[Linear Mixed Model|linear mixed model]] the default residual covariance is $\mathbf{R}_i = \sigma^2\mathbf{I}$, a constant variance. It can be relaxed in two ways.

1. **Heterogeneous variances**: a separate residual variance $\sigma_g^2$ for each level of a factor (a treatment group, a region). With $G$ levels, the model has $G - 1$ extra variance parameters.
2. **Variance as a function of a covariate** $v_{ti}$, such as development age or the fitted value, with an estimated coefficient $\delta$. The exponential form (`varExp` in R's `nlme`) and the power form (`varPower`) are

> $$\text{Var}(\varepsilon_{ti}) = \sigma^2\exp(2\delta v_{ti})$$

> $$\text{Var}(\varepsilon_{ti}) = \sigma^2\lvert v_{ti}\rvert^{2\delta}$$

Under the exponential form the residual standard deviation is $\sigma\exp(\delta v_{ti})$, and $\delta = 0$ gives a constant variance.

## Testing a variance function

In a linear mixed model the variance function is a modelling choice with its own estimated parameters. The competing models share their fixed effects, so they are compared by a [[Likelihood Ratio Test|likelihood ratio test]] on [[Restricted Maximum Likelihood|REML]] fits, or by AIC from REML fits. The choice feeds the [[Covariance Structure|covariance structure]], and so the standard errors of every fixed effect.

> [!example]- A random intercept model of loss ratios is fitted by REML with one residual variance, $-2\,l_R = 1{,}254.6$, and with a separate residual variance for each of three regions, $-2\,l_R = 1{,}241.2$. Is a common residual variance rejected at 5%? {Example}
> - The heterogeneous model has $2$ extra variance parameters.
> - The statistic is $1{,}254.6 - 1{,}241.2 = 13.4$.
> - $13.4 > \chi^2_{0.95,2} = 5.991$, so a common residual variance is rejected.
> - Equal variances is not a boundary hypothesis, so the plain $\chi^2_2$ applies.

> [!trap] A variance of zero is on the boundary
> When the null hypothesis sets a variance to zero, as in testing whether a random effect is needed, the value lies on the boundary of the parameter space. The plain $\chi^2$ p-value is then too large. For a single variance component it is halved.
