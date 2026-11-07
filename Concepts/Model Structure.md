---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:dbd7b8b827e1dbb4b9d070ea3e5692a66e1dfe5d6f5bbb20fcca17ee48b55887
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain B description and tasks 1-4, PDF p.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope, printed pp.2-3 (PDF pp.19-20), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 printed p.86 (PDF p.96); §3.3.2 printed p.89 (PDF p.99); §6.1.1-6.1.3 printed pp.227-234 (PDF pp.235-242), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.1 nested F-test PDF pp.75-76; §6.2.2 penalized measures PDF pp.76-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Structure.md
---

![[Media/Figures/Model_Structure.svg|340]]

A **Model Structure** is the specified form of an [[Extended Linear Model|extended linear model]]: the distribution of the [[Response Variable|response]], the [[Link Function|link function]], and the terms of the linear predictor. For a [[Generalized Linear Model|generalized linear model]] with mean $\mu_i = E[Y_i]$ and predictors $x_{i1}, \ldots, x_{ip}$, the model structure is

> $$g(\mu_i) = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- $g$ is the link function.
- $\beta_0, \ldots, \beta_p$ are the coefficients.
- $Y_i$ has a distribution from the [[Exponential Family|exponential family]], chosen together with $g$.

The right-hand side is the linear predictor $\eta_i$. Specifying the model structure means making three choices:

1. The distribution of $Y_i$.
2. The link function $g$.
3. The terms of $\eta_i$: which predictors appear, how each is transformed, and which [[Interaction|interactions]] are included.

## Distribution and link for the response

The distribution and the link are chosen from the behavior of the response being modeled. The usual choices lead to [[Poisson Regression|Poisson regression]] for counts, a [[Gamma]] model for severity, [[Logistic Regression|logistic regression]] for a binary response and a [[Tweedie Distribution|Tweedie]] model for pure premium.

| Response | Distribution | Usual link |
| --- | --- | --- |
| Continuous, symmetric, constant variance | Normal | Identity |
| Count of events, such as claims | Poisson | Log |
| Positive and right-skewed, variance proportional to $\mu_i^2$, such as claim severity | Gamma | Log |
| Binary, or a proportion of successes | Binomial | Logit |
| Pure premium: a mass at zero and a skewed positive part | Tweedie | Log |

> [!example]- An actuary models the probability that a homeowners policy renews. What distribution and link should the model structure use? {Example}
> - Each policy either renews or does not, so the response is binary.
> - A binary response has a binomial distribution.
> - The logit link keeps the fitted probability between 0 and 1.
> - The model structure is a binomial distribution with a logit link.

## Terms of the linear predictor

A continuous predictor enters $\eta_i$ as a single term, or through a transformation such as $\ln x_{ij}$ or a [[Polynomial Regression|polynomial]]. A [[Categorical Predictor|categorical predictor]] with $k$ levels enters as $k - 1$ indicator variables, and the level with no indicator is the base level. An interaction $x_{i1} x_{i2}$ lets the effect of one predictor depend on the value of another.

Changing which level of a categorical predictor is the base level changes the coefficients, but not the fitted values. The refitted model spans the same columns and reproduces the same group means.

> [!example]- A frequency model has main effects for territory and for vehicle age. The data show that newer vehicles have more claims in urban territories than in rural ones. How should the model structure change? {Example}
> - The effect of vehicle age differs by territory, which is an interaction.
> - Add a territory $\times$ vehicle age term to the linear predictor.
> - Territory is categorical, so the interaction adds one coefficient for each non-base territory.

## Comparing nested model structures

A model whose terms are a subset of another's is nested within it. The larger model always fits at least as well, so its [[Deviance|deviance]] is lower than or equal to that of the smaller model. The lowest deviance is therefore not a reason to choose a model. A larger structure is kept only when its added terms improve the fit significantly, by an [[ANOVA|analysis of deviance]], or when a penalized criterion favors it. The [[AIC]] of a model with $k$ parameters and maximized log-likelihood $l$ is

> $$\text{AIC} = -2l + 2k$$

> [!example]- Model 1 has main effects for territory and vehicle age, with 6 parameters and log-likelihood $-2{,}045$. Model 2 adds their interaction, with 12 parameters and log-likelihood $-2{,}030.5$. Which model structure does AIC prefer? {Example}
> - For Model 1, $\text{AIC} = 4{,}090 + 12 = 4{,}102$.
> - For Model 2, $\text{AIC} = 4{,}061 + 24 = 4{,}085$.
> - The lower AIC is preferred, so AIC prefers Model 2, with the interaction.

> [!trap] Choosing the structure with the lowest deviance
> Adding any term lowers the deviance or leaves it unchanged, so the model with the most terms always has the lowest deviance. Compare nested structures with a test of the added terms, or with AIC or BIC, which charge for each parameter.
