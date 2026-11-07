---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:00ce07f79d87b8c486cf6c5476aac626c51a1c64ee3b3f7a2b58a6b7e14f1d25
  sources:
    - "Rodriguez, GLM lecture notes (Princeton), App. B, sec.B.1.2 The Link Function (PDF pp.3-4), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf; Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf, pp.2-3 (canonical link section and table: identity, logit, natural log, inverse); James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, secs.4.6.2-4.6.3 (log link for Poisson regression, nonnegative fitted values, link functions eta(mu) = mu, logit, log; printed pp.167-172, PDF pp.177-182); Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, sec.1.2 Scope (probit and logistic dose-response models, printed p.5, PDF p.22); Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.1.3 fn.1 (log link almost always used for a multiplicative rating plan, PDF p.16)"
    - "Rodriguez, GLM notes Ch.4 Poisson Models for Count Data, §4.2.1 PDF pp.6-7 (X'y = X'mu-hat for log-linear Poisson and any GLM with canonical link incl. normal linear and binomial logistic, not probit; a constant matches sum of observed and fitted; a factor matches marginals; A+B reproduces both margins) and §4.3 PDF p.10 (log exposure as an offset), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "Rodriguez, GLM notes App. B §B.3 PDF pp.6-7 (saturated model, mu-tilde = y; deviance relative to it), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Larsen, 'Generalized Linear Models', CAS Study Note, pp.2-3 (canonical link gives unbiased estimates, non-canonical does not; canonical links: normal identity, binomial logit, Poisson log, gamma inverse), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Goldburd et al., CAS Monograph 5, 2nd ed., §2.6 Offsets printed pp.17-18 (offset = predictor with coefficient constrained to 1; logged exposure as offset in a claim-count model), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Link Function.md
---

![[Media/Figures/Link_Function.svg|340]]

A **Link Function** is the function $g$ in a [[Generalized Linear Model]] that relates the mean of the response, $\mu_i = E[Y_i]$, to the linear predictor $\eta_i$. The link function of observation $i$ is

> $$g(\mu_i) = \eta_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- $g$ is monotonic and differentiable.

Because $g$ is monotonic, it has an inverse, and the mean is the inverse link applied to the linear predictor:

> $$\mu_i = g^{-1}(\eta_i)$$

The link function is applied to the mean of the response, not to the response itself.

> [!example]- A GLM with the square-root link, $g(\mu) = \sqrt{\mu}$, has fitted linear predictor $\hat{\eta} = 0.2 + 0.05x$. What is the fitted mean at $x = 6$? {Example}
> - The linear predictor is $\hat{\eta} = 0.2 + 0.05 \times 6 = 0.5$.
> - The inverse of the square-root link is $g^{-1}(\eta) = \eta^2$.
> - The fitted mean is $0.5^2 = 0.25$.

## Common link functions

The common link functions and their inverses are:

| Link | $g(\mu)$ | $\mu = g^{-1}(\eta)$ |
| --- | --- | --- |
| Identity | $\mu$ | $\eta$ |
| Log | $\ln \mu$ | $e^{\eta}$ |
| Logit | $\ln\frac{\mu}{1 - \mu}$ | $\frac{e^{\eta}}{1 + e^{\eta}}$ |
| Probit | $\Phi^{-1}(\mu)$ | $\Phi(\eta)$ |
| Inverse | $1/\mu$ | $1/\eta$ |
| Square root | $\sqrt{\mu}$ | $\eta^2$ |

- $\Phi$ is the cumulative distribution function of the standard normal distribution.

The logit and probit links are used for a probability $\pi$, because their inverses always lie between 0 and 1. The logit of a probability is the logarithm of its odds, $\pi/(1 - \pi)$.

> [!example]- A binary-response GLM has fitted linear predictor $\hat{\eta} = -1.2 + 0.4x$. What is the fitted probability at $x = 2$ under a probit link, and under a logit link? {Example}
> - The linear predictor is $\hat{\eta} = -1.2 + 0.4 \times 2 = -0.4$.
> - Under the probit link, the probability is $\Phi(-0.4) = 0.3446$.
> - Under the logit link, the probability is $\frac{e^{-0.4}}{1 + e^{-0.4}} = 0.4013$.

## The log link

Under the log link the mean is the exponential of the linear predictor, which is a product of factors:

> $$\mu_i = e^{\beta_0} \times e^{\beta_1 x_{i1}} \times \cdots \times e^{\beta_p x_{ip}}$$

Each predictor multiplies the mean, so a coefficient $\beta_j$ gives the factor $e^{\beta_j}$ for a unit increase in $x_j$. The fitted means are always positive. The identity link, by contrast, makes the effects additive and can give negative fitted means. The ratio of the means of two risks $A$ and $B$ is

> $$\frac{\mu_A}{\mu_B} = e^{\eta_A - \eta_B}$$

The terms that the two risks share cancel in the difference.

> [!example]- A log-link frequency GLM has an intercept of $-2.0$, a coefficient of $0.30$ for the urban territory (the rural territory is the base level) and $0.40$ for drivers under 25. What are the expected frequencies of an urban and a rural driver who are both under 25, and what is the ratio between them? {Example}
> - The urban driver's linear predictor is $-2.0 + 0.30 + 0.40 = -1.30$, so the expected frequency is $e^{-1.30} = 0.2725$.
> - The rural driver's linear predictor is $-2.0 + 0.40 = -1.60$, so the expected frequency is $e^{-1.60} = 0.2019$.
> - The intercept and the age coefficient cancel in the difference, so the ratio is $e^{0.30} = 1.350$.

## The canonical link

The canonical link of a distribution in the [[Exponential Family|exponential family]] is the link that sets the linear predictor equal to the distribution's canonical parameter, $g(\mu) = \theta$. The canonical links are the identity for the normal, the log for the Poisson, the logit for the binomial, the inverse $1/\mu$ for the gamma and $\mu^{1-p}$ for the [[Tweedie Distribution|Tweedie]] with $1 < p < 2$. The log link is therefore not canonical for the gamma or the Tweedie.

When the link is canonical and the model has an intercept, the maximum likelihood fitted values add up to the observed values:

> $$\sum_{i=1}^{n} \hat{\mu}_i = \sum_{i=1}^{n} y_i$$

The fitted totals then also equal the observed totals within each level of a categorical predictor in the model. A non-canonical link, such as the log link for a gamma, carries no such guarantee.

> [!example]- An actuary models a non-negative response and wants the fitted values to reproduce the observed total. Which distribution and link should be used? {Example}
> - The fitted values reproduce the observed total when the link is canonical and the model has an intercept.
> - The Poisson distribution with its canonical log link meets this, and the log link keeps the fitted means non-negative.
> - The gamma and the Tweedie with a log link are not canonical, and the normal with the identity link can give negative fitted means.
> - The Poisson distribution with a log link should be used.
