---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:5cc264e0b2e1c5e12ea8e0a1ba939a55036687e4ab8579df73de024c9e21d044
  sources:
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), p.2 'Tweedie Distributions', sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.7.3 (eqs.7-9, point mass at 0, p range and choice, PDF pp.33-35), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "scikit-learn User Guide sec.3.4.6.9 'Mean Poisson, Gamma, and Tweedie deviances' (closed-form Tweedie deviance), sha256:7e740e140ba75771bb1c7de132babfd958c277b5529d187e7ba744e69729120c — https://scikit-learn.org/stable/modules/model_evaluation.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tweedie Distribution.md
---

![[Media/Figures/Tweedie_Distribution.svg|340]]

A **Tweedie Distribution** is a member of the [[Exponential Family|exponential family]] whose variance is a power of its mean. If $Y$ has a Tweedie distribution with mean $\mu$, its variance is

> $$\text{Var}(Y) = \phi\, \mu^{p}$$

- $\phi$ is the [[Dispersion Parameter|dispersion parameter]], a free parameter estimated from the data.
- $p$ is the power, with $p \le 0$ or $p \ge 1$. No Tweedie distribution has $0 < p < 1$.

Its [[Variance Function|variance function]] is $V(\mu) = \mu^p$. Particular powers give familiar distributions:

| $p$ | Distribution | Typical response |
| :--- | :--- | :--- |
| $0$ | Normal | Continuous, symmetric |
| $1$ | Poisson | Claim counts |
| $1 < p < 2$ | Compound Poisson–gamma | Pure premium |
| $2$ | Gamma | Claim severity |
| $3$ | Inverse Gaussian | Heavy-tailed severity |

A larger power gives a variance that rises faster with the mean and a heavier tail. The dispersion parameter scales the variance but does not change which distribution the power selects. The Poisson distribution is the limit of the compound Poisson–gamma case as $p$ approaches 1, not a member of the range $1 < p < 2$.

## The compound Poisson–gamma case

For $1 < p < 2$, $Y$ is the sum of a Poisson number of independent gamma amounts:

> $$Y = \sum_{i=1}^{N} X_i$$

- $N$ has a [[Poisson Distribution|Poisson distribution]] with mean $\lambda$.
- $X_1, X_2, \ldots$ are independent [[Gamma|gamma]] random variables, independent of $N$.
- $Y = 0$ when $N = 0$.

The probability that $Y$ is zero is therefore

> $$P(Y = 0) = e^{-\lambda}$$

So $Y$ has a point mass at zero and a continuous, right-skewed density on positive values. This is the shape of pure premium data, where most policies have no claim. The gamma and inverse Gaussian distributions are defined only on positive values, so they cannot model data with exact zeros.

> [!example]- A policy's claims follow a Poisson distribution with mean $0.1$, and each claim amount has a gamma distribution with mean $2{,}000$. What is the probability that the policy's pure premium is zero, and what is its expected pure premium? {Example}
> - The pure premium is zero when there is no claim, with probability $e^{-0.1} = 0.905$.
> - The expected pure premium is the expected number of claims times the expected claim amount, $0.1 \times 2{,}000 = 200$.

## Tweedie regression for pure premium

A [[Generalized Linear Model|generalized linear model]] with a Tweedie response, $1 < p < 2$ and a log link models pure premium in one step, in place of separate [[Poisson Regression|frequency]] and severity models. The logarithm of the expected pure premium of observation $i$ is

> $$\ln \mu_i = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \cdots$$

- $x_{i1}, x_{i2}, \ldots$ are the predictors of observation $i$, and $\beta_0, \beta_1, \ldots$ are their coefficients.

The fitted value $\mu_i$, the exponential of the linear predictor, is the modelled pure premium, or the modelled loss ratio when the response is a loss ratio. The power is held fixed, chosen from candidate values or estimated with the coefficients.

> [!example]- A Tweedie regression with a log link for pure premium has $\hat\beta_0 = 5.30$ and a coefficient of $0.22$ for a policy with a prior claim. What pure premium does it predict for a policy with a prior claim? {Example}
> - The linear predictor is $5.30 + 0.22 = 5.52$.
> - The predicted pure premium is $e^{5.52} = 249.6$.
> - Equivalently, the base pure premium $e^{5.30} = 200.3$ is multiplied by the prior-claim relativity $e^{0.22} = 1.246$.

> [!trap] Expecting one coefficient to move frequency and severity apart
> With $\phi$ and $p$ fixed, a Tweedie regression assumes that a predictor moves frequency and severity in the same direction. A higher deductible lowers frequency but raises the average severity of the claims that remain, so a single Tweedie coefficient describes it poorly. Separate frequency and severity models capture both effects.
