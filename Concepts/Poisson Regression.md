---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:b0eb45db88ee91e60bfc7201d7e7dbf34949735c9db56fef91f79d510f6f01ea
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sec.4.6.2 (PDF pp.177-180), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), ch.4 secs.4.2.2-4.3 (PDF pp.7-10), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "Rodriguez, GLM lecture notes, Models for Count Data With Overdispersion, secs.1-2 (PDF pp.1-3), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.6 (PDF pp.28-29), sec.2.7.2 (PDF pp.31-32), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Regression.md
---

![[Media/Figures/Poisson_Regression.svg|340]]

A **Poisson Regression** is a [[Generalized Linear Model|generalized linear model]] for a count response, in which the response $Y_i$ has a [[Poisson Distribution|Poisson distribution]] with mean $\mu_i$ and the [[Link Function|link function]] is the logarithm. It is the usual model for claim [[Frequency|frequency]]. With predictors $x_{i1}, \ldots, x_{ip}$ and coefficients $\beta_0, \ldots, \beta_p$, the logarithm of the expected count is

> $$\ln \mu_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

and the expected count is

> $$\mu_i = e^{\beta_0}\, e^{\beta_1 x_{i1}} \cdots e^{\beta_p x_{ip}}$$

The log link keeps every fitted mean positive and makes the predictors act multiplicatively. A one-unit increase in $x_j$, with the other predictors held fixed, multiplies the expected count by $e^{\beta_j}$, the rating relativity of $x_j$. For a categorical predictor coded with indicators, $e^{\beta_j}$ is the relativity of a level to the base level, and each observation's linear predictor contains only the coefficients of the levels that apply to it.

The Poisson [[Variance Function|variance function]] is $V(\mu) = \mu$, so the variance of a count rises with its mean, and the [[Dispersion Parameter|dispersion parameter]] is fixed at $\phi = 1$. A normal response with an identity link would allow negative fitted counts and assume a constant variance.

> [!example]- A Poisson regression for annual claim counts has $\hat\beta_0 = -2.30$, a coefficient of $0.26$ for an urban driver and a coefficient of $0.41$ for a young driver. What is the expected annual claim frequency of a young urban driver? {Example}
> - The linear predictor contains the intercept and both coefficients: $-2.30 + 0.26 + 0.41 = -1.63$.
> - The expected claim frequency is $e^{-1.63} = 0.196$.
> - Equivalently, the base frequency $e^{-2.30} = 0.100$ is multiplied by the urban relativity $e^{0.26} = 1.297$ and the young-driver relativity $e^{0.41} = 1.507$.

## Exposure as an offset

When observation $i$ has exposure $v_i$, such as car-years, the expected count is proportional to the exposure. The logarithm of the expected count is then

> $$\ln \mu_i = \ln v_i + \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- $\ln v_i$ is an [[Offset Variable|offset]], a term in the linear predictor whose coefficient is fixed at 1 rather than estimated.

The expected count is $\mu_i = v_i\, e^{\eta_i}$, where $\eta_i$ is the linear predictor without the offset, so $e^{\eta_i}$ is the expected claim frequency per unit of exposure. Any known multiplicative factor, such as a relativity set in a separate study, enters the offset the same way, as its logarithm. Modelling the frequency $y_i/v_i$ as the response, with weight $v_i$ and no offset, gives the same coefficients, relativities and standard errors.

> [!example]- In the model above, a young urban driver has $0.5$ car-years of exposure. What is the expected claim count? {Example}
> - The offset is $\ln 0.5 = -0.693$.
> - The linear predictor is $-0.693 - 2.30 + 0.26 + 0.41 = -2.323$.
> - The expected claim count is $e^{-2.323} = 0.098$, which is the frequency $0.196$ multiplied by the exposure $0.5$.

## Overdispersion

For a Poisson regression that fits, the residual [[Deviance|deviance]] $D$ is approximately chi-squared with $n - (p+1)$ degrees of freedom, so the ratio

> $$\frac{D}{n - (p + 1)}$$

is close to 1.

- $n$ is the number of observations.
- $p + 1$ is the number of coefficients, including the intercept.

The null deviance, of the model with only an intercept, has $n - 1$ degrees of freedom. Because $\phi = 1$, the deviance equals the scaled deviance. A ratio far above 1 is first a sign of lack of fit, such as a missing predictor or interaction. Once the predictors and link are trusted, it is a sign of overdispersion, a variance larger than $\mu_i$. A [[Quasi-Likelihood|quasi-Poisson]] model keeps the coefficient estimates and multiplies their standard errors by $\sqrt{\hat\phi}$. A [[Negative Binomial Distribution|negative binomial]] model builds the extra variance into the distribution.

> [!example]- A Poisson regression has residual deviance $1{,}840$ on $600$ degrees of freedom, and its predictors and link are trusted. What does this indicate, and how far are the standard errors understated? {Example}
> - The ratio is $1{,}840/600 = 3.07$, far above 1.
> - The counts are about three times as variable as the Poisson distribution allows, so the data are overdispersed.
> - The standard errors are understated by a factor of about $\sqrt{3.07} = 1.75$.

> [!trap] Adding relativities instead of multiplying them
> Under a log link the relativities multiply. A young urban driver's combined relativity is $1.297 \times 1.507 = 1.954$, not $1 + 0.297 + 0.507 = 1.804$.
