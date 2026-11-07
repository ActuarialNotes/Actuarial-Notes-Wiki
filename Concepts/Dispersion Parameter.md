---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:e7749cf262bd360740cb1af043e8e05cedbee0e1442ab7b650b97e583c05b8c8
  sources:
    - "Rodriguez, GLM lecture notes (Princeton), App. B secs.B.1.1, B.2, B.3.1-B.3.2 (PDF pp.2-7), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, GLM lecture notes, Models for Count Data With Overdispersion, sec.1 (Pearson phihat = chi2_p/(n-p); SEs x sqrt(phihat); beta unchanged) (PDF pp.1-2), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.7.2 (PDF p.31), sec.6.1.2 (PDF p.73), sec.6.2.1 eq.17 (PDF p.75), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "statsmodels documentation, GLM.fit, 'scale' argument (X2 = Pearson chi-square / df_resid, default; dev = deviance / df_resid), sha256:decbc81735f2541367b2d5a57dd8eca35a5e7fca79d4485150e84498f2be3f41 — https://www.statsmodels.org/stable/generated/statsmodels.genmod.generalized_linear_model.GLM.fit.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Dispersion Parameter.md
---

![[Media/Figures/Dispersion_Parameter.svg|340]]

The **Dispersion Parameter** $\phi$ of a distribution in the [[Exponential Family|exponential family]] is the constant that scales its variance. The variance of a response with mean $\mu$ is

> $$\text{Var}(Y) = \phi\, V(\mu)$$

- $V(\mu)$ is the [[Variance Function|variance function]], which is fixed by the distribution.

The variance function says how the variance changes with the mean, and $\phi$ sets its overall size. The dispersion parameter is $\sigma^2$ for the [[Normal Distribution|normal]], $1$ for the [[Poisson Distribution|Poisson]] and the [[Binomial Distribution|binomial]], and $1/\alpha$ for a [[Gamma|gamma]] with shape $\alpha$. For the normal, the gamma and the [[Tweedie Distribution|Tweedie]] it is estimated from the data. It does not enter the fitted mean.

> [!example]- A gamma GLM for claim severity gives $\hat{\phi} = 0.64$. What are the coefficient of variation and the shape of the severity distribution? {Example}
> - For the gamma, $V(\mu) = \mu^2$, so the variance is $0.64\mu^2$ and the standard deviation is $0.8\mu$.
> - The coefficient of variation is $0.8$, whatever the mean.
> - The shape is $\alpha = 1/0.64 = 1.5625$.

## Prior weights

When observation $i$ carries a prior weight $w_i$, its variance is

> $$\text{Var}(Y_i) = \frac{\phi\, V(\mu_i)}{w_i}$$

- $\mu_i$ is the mean of observation $i$.

An observation that is the average of $w_i$ independent outcomes has $1/w_i$ times the variance of one outcome. In a severity GLM whose response is the average severity of several claims, the weight is the number of claims, and an individual claim record has weight 1. The weight changes the variance of the observation, not its mean.

> [!example]- In a gamma severity GLM with $\hat{\phi} = 0.64$, one row is the average of 4 claims with fitted mean 2,000. What is the variance of that row's average severity? {Example}
> - The variance of one claim with mean 2,000 is $0.64 \times 2{,}000^2 = 2{,}560{,}000$.
> - The row has weight $w_i = 4$, so its variance is $2{,}560{,}000 / 4 = 640{,}000$.

## Estimating the dispersion parameter

The dispersion parameter is estimated by the Pearson chi-square statistic divided by the residual degrees of freedom:

> $$\hat{\phi} = \frac{1}{n - k}\sum_{i=1}^{n} \frac{w_i\,(y_i - \hat{\mu}_i)^2}{V(\hat{\mu}_i)}$$

- $n$ is the number of observations, and $k$ is the number of estimated coefficients, including the intercept.

The [[Deviance|deviance]] divided by $n - k$ is a second estimator. In a Poisson or binomial model, $\phi$ is $1$ in theory, so an estimate well above 1 indicates overdispersion, more variation than the distribution allows. Estimating $\phi$, as a [[Quasi-Likelihood|quasi-likelihood]] model does, leaves the coefficient estimates unchanged and multiplies their standard errors by $\sqrt{\hat{\phi}}$.

> [!example]- A Poisson GLM with 8 coefficients is fitted to 500 observations, and the Pearson chi-square statistic is 1,230. A coefficient of 0.40 has standard error 0.15 in the Poisson fit. What are $\hat{\phi}$ and the standard error that allows for it? {Example}
> - The dispersion estimate is $\hat{\phi} = \frac{1{,}230}{500 - 8} = 2.50$.
> - The standard error is $0.15\sqrt{2.50} = 0.237$.
> - The Wald statistic falls from $0.40 / 0.15 = 2.67$ to $0.40 / 0.237 = 1.69$, so the coefficient is no longer significant at the 5% level.
