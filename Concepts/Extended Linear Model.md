---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:dfa87e2f0364a7c993847e207030e3c1d96b54e376fa689fb3d869c2b4bcbb5b
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C heading, description and tasks 1-9 (Task 2: model structure, e.g. link function and distribution of the dependent variable for GLM; tasks 3, 7, 8: evaluation, AIC/BIC/deviance, diagnostic plots), PDF p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope, printed pp.2-3 (PDF pp.19-20): modelling step 1, specifying models in two parts; linear regression a special case of GLMs, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), §3.3.2 Extensions of the Linear Model: interaction term (3.31), quadratic term (3.36) 'still a linear model', PDF pp.97-102, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), App. B §§B.1.1-B.1.2: exponential-family response, link g(mu_i) = eta_i, linear predictor eta_i = x_i'beta, standard linear model = normal errors with identity link, PDF pp.2-4, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), §2.1.2-2.1.3 log link gives a multiplicative structure and guarantees positive premium, gamma severity example (PDF pp.14-15); §2.7.1-2.7.2 gamma for severity, Poisson for frequency (PDF pp.29-31); contents §§5.4 (binning, polynomial terms, piecewise linear, splines) and 5.6 interactions (PDF p.6), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Extended Linear Model.md
---

![[Media/Figures/Extended_Linear_Model.svg|340]]

An **Extended Linear Model** is a regression model in which a function of the mean of the [[Response Variable|response]] is a linear combination of the [[Predictor Variable|predictors]]. The CAS MAS-I syllabus uses the term for [[Linear Regression|linear regression]] together with the models that extend it, chiefly the [[Generalized Linear Model|generalized linear model]].

For observation $i$ with predictor values $x_{i1}, \ldots, x_{ip}$, the linear predictor is

> $$\eta_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- $\beta_0, \beta_1, \ldots, \beta_p$ are the coefficients.

The mean of the response, $\mu_i = E[Y_i]$, is related to the linear predictor by a [[Link Function|link function]] $g$, so the model is

> $$g(\mu_i) = \eta_i$$

- $Y_i$ has a distribution from the [[Exponential Family|exponential family]], such as the normal, Poisson or gamma distribution.

The model is linear in the coefficients, not necessarily in the predictors. A column of $x^2$, a log-transformed predictor or a product of two predictors (an [[Interaction|interaction]]) can therefore enter the linear predictor, and all the predictors are estimated together, each holding the others fixed.

> [!example]- Which of the models $\eta = \beta_0 + \beta_1 x + \beta_2 x^2$ and $\eta = \beta_0 + x^{\beta_1}$ is an extended linear model? {Example}
> - In $\beta_0 + \beta_1 x + \beta_2 x^2$, each coefficient multiplies a known quantity, $1$, $x$ or $x^2$, so the linear predictor is linear in the coefficients.
> - The term $x^2$ is simply a second column of the [[Design Matrix|design matrix]], so the first model is an extended linear model.
> - In $\beta_0 + x^{\beta_1}$, the coefficient $\beta_1$ is an exponent, so the linear predictor is not linear in the coefficients.
> - Only the first model is an extended linear model.

## Linear regression as a special case

When the response is normal and the link is the identity, $g(\mu) = \mu$, the model is linear regression:

> $$\mu_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

For this model the [[Maximum Likelihood Estimation|maximum likelihood estimates]] of the coefficients are the [[Ordinary Least Squares|least squares estimates]], which minimize the sum of squared errors. For any other response distribution, such as the Poisson with a log link, the coefficients are estimated by maximizing the log-likelihood, and least squares gives different estimates.

## Choice of response distribution and link

The response distribution and the link are chosen from the behaviour of the response:

| Response | Distribution | Usual link |
| --- | --- | --- |
| Continuous, symmetric, constant variance | Normal | Identity |
| Continuous, strictly positive, right-skewed | Gamma or inverse Gaussian | Log |
| Count of events, such as claims | Poisson | Log |
| Binary, such as claim or no claim | Binomial | Logit |

A normal distribution assigns probability to negative values and has a variance that does not depend on the mean. An identity link can give a negative fitted mean, while a log link gives $\mu_i = e^{\eta_i}$, which is always positive and makes each predictor act multiplicatively on the mean. The normal model with an identity link is therefore a poor choice for claim severities or claim counts, whose values are non-negative and whose variance grows with the mean.

> [!example]- Individual claim severities are strictly positive and right-skewed. Why is a normal linear model a poor choice, and what extended linear model is better? {Example}
> - A normal response is symmetric and allows negative values, while the severities are positive and right-skewed.
> - The normal model assumes a constant variance, while the variance of severities grows with their mean.
> - An identity link can produce negative fitted severities.
> - A [[Gamma|gamma]] generalized linear model with a log link has strictly positive support, a right skew and a variance that grows with the mean, and its fitted means $e^{\eta_i}$ are positive.
> - The gamma model with a log link is the better choice.
