---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:35461ab45150f0557e0280ec85d9396346ebbf5a31d8624ca4196429e5b5fdd0
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope, printed pp.2-3 (PDF pp.19-20), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 printed p.86 (PDF p.96); §3.3.3 Collinearity printed pp.101-103 (PDF pp.111-113); §6.1.1-6.1.3 printed pp.227-234 (PDF pp.235-242), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.6 Offsets PDF pp.27-28; §5 control variables PDF p.56; §1.2 log-link relativities PDF p.21, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Predictor Variable.md
---

A **Predictor Variable** is a variable $x_j$ used to explain or predict the [[Response Variable|response variable]]. It is also called an explanatory variable, an independent variable or a covariate, and in ratemaking a [[Rating Variable|rating variable]]. In a [[Generalized Linear Model]] with predictors $x_1, \ldots, x_p$, the linear predictor of observation $i$ is

> $$\eta_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- $x_{ij}$ is the value of predictor $j$ for observation $i$.
- $\beta_j$ is the change in $\eta_i$ for a unit increase in $x_{ij}$, with the other predictors held fixed.

A predictor enters the linear predictor in the form the model specifies. A predictor entered through a transformation, such as its natural logarithm, contributes its coefficient multiplied by the transformed value. A continuous predictor entered as a single term contributes one coefficient, and a [[Categorical Predictor|categorical predictor]] with $k$ levels contributes $k - 1$ coefficients.

The word "independent" describes the role of a predictor in the model. It does not mean that the predictors are statistically independent of one another, and in insurance data they rarely are.

> [!example]- A log-link frequency GLM has $\hat{\eta} = -4.0 + 0.30 \ln x$, where $x$ is the amount of insurance in thousands. What is the expected frequency for an amount of insurance of 200 thousand? {Example}
> - The predictor enters as its natural logarithm, $\ln 200 = 5.2983$.
> - The linear predictor is $\hat{\eta} = -4.0 + 0.30 \times 5.2983 = -2.4105$.
> - The expected frequency is $e^{-2.4105} = 0.0898$.

## Rating variables, control variables and offsets

Not every predictor in a ratemaking model is used in the same way:

1. A rating variable has its coefficient estimated, and its relativities are used in the rating plan.
2. A [[Control Variable|control variable]], such as accident year, is fitted as a predictor so that its effect is estimated, and is then dropped when the rates are built, or set at one chosen level.
3. An [[Offset Variable|offset]], such as the logarithm of exposure, enters with its coefficient fixed at 1 rather than estimated.

> [!example]- A frequency file holds the claim count, earned car-years, accident year, territory, driver age and policy number. The rating plan will use territory and driver age. What role does each field play in a Poisson GLM with a log link? {Example}
> - The claim count is the response.
> - The logarithm of earned car-years is an offset, so the model fits a frequency per car-year.
> - Accident year is a control variable, fitted as a categorical predictor so that trend is not absorbed by territory and driver age, and then dropped from the rates.
> - Territory and driver age are rating variables.
> - The policy number is an identifier, not a predictor.

## Correlated predictors

When predictors are highly correlated, which is [[Multicollinearity|multicollinearity]], the variance of their coefficient estimates is inflated and the estimates become unstable. The variance inflation factor of predictor $x_j$ is

> $$\text{VIF}_j = \frac{1}{1 - R_j^2}$$

- $R_j^2$ is the $R^2$ of the regression of $x_j$ on the other predictors.

The standard error of $\hat{\beta}_j$ is $\sqrt{\text{VIF}_j}$ times what it would be if $x_j$ were uncorrelated with the other predictors. A VIF above 5 or 10 is usually considered high.

> [!example]- Regressing vehicle value on the other predictors gives $R_j^2 = 0.84$. If the predictors were uncorrelated, the coefficient of vehicle value, $0.15$, would have a standard error of $0.04$. What is the VIF, and what are the standard error and the $t$ statistic? {Example}
> - The VIF is $\frac{1}{1 - 0.84} = 6.25$.
> - The standard error is $0.04\sqrt{6.25} = 0.10$.
> - The $t$ statistic is $0.15 / 0.10 = 1.50$, compared with $0.15 / 0.04 = 3.75$ without the correlation.
