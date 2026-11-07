---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:ddb3f41507a01d5cee69be1e726b2d30c294350dd3447bcdbb0df3675790ca3b
  sources:
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018), publisher eBook preview, §1.2 Scope (printed pp.2-3, PDF pp.19-20), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (rev. June 2016), PDF p.2 (Tweedie variance powers p = 0, 1, (1,2), 2, 3), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §2.1 (printed p.15, PDF p.26); §4.2 (printed p.132, PDF p.142); §4.3 logistic; §4.6.3 GLMs (printed p.170, PDF p.180), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.5 weights and Var[y] = phi*V(mu) PDF pp.26-27; §2.6 offsets; §2.7 gamma, inverse Gaussian, ODP/negative binomial, Tweedie PDF pp.29-33, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Penn State STAT 504, Lesson 9 'Poisson Regression', SAS output for the horseshoe-crab width model (Full Log Likelihood -461.5881, AIC 927.1762, AICC 927.2468, BIC 933.4828; n = 173, 2 parameters), sha256:f8021fab7a1c8cfeb2de7ebfe3b5d1977a32671dd3acefc9ade531369c5da506 — https://online.stat.psu.edu/stat504/Lesson09"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Response Variable.md
---

A **Response Variable** is the variable $Y$ that a model explains or predicts from the [[Predictor Variable|predictor variables]]. It is also called the dependent variable or the target. The observed values of the response, $y_1, \ldots, y_n$, are data, as are the values of the predictors. The parameters of the model are the coefficients and the [[Dispersion Parameter|dispersion parameter]].

In a [[Generalized Linear Model]], the values the response can take decide its distribution, and the [[Link Function|link function]] keeps the fitted mean in that range:

| Response | Values | Distribution | Usual link |
| --- | --- | --- | --- |
| A continuous amount with constant variance | All real numbers, symmetric | [[Normal Distribution|Normal]] | Identity |
| A claim count | $0, 1, 2, \ldots$ | [[Poisson Distribution|Poisson]] | Log |
| Yes or no | $0$ or $1$ | [[Binomial Distribution|Binomial]] | Logit |
| Claim severity | Positive, right-skewed | [[Gamma]] or inverse Gaussian | Log |
| Pure premium | Zero, or a positive amount | [[Tweedie Distribution|Tweedie]], $1 < p < 2$ | Log |

A normal response is continuous and symmetric over all real numbers, so it suits neither a binary response nor an amount with a mass at zero and a long right tail. A Poisson response takes only whole numbers, so it suits claim counts rather than amounts. The gamma takes only positive values, so it cannot model a pure premium that is often zero.

> [!example]- Which distribution and link should model each of these responses: the number of claims per policy, the average severity per claim, and the loss cost per car-year, most of which are zero? {Example}
> - The number of claims is a non-negative whole number, so it has a Poisson distribution with a log link.
> - The average severity is positive and right-skewed, so it has a gamma distribution with a log link.
> - The loss cost has a mass at zero and a continuous positive part, so it has a Tweedie distribution with $1 < p < 2$ and a log link.
> - The log link keeps each fitted mean positive and makes the effects of the predictors multiplicative.

## A binary response

A binary response $Y$ is 1 if an event occurs and 0 if it does not, and its mean is the probability $\pi$ that the event occurs. With the logit link the model is [[Logistic Regression|logistic regression]], and the probability is

> $$\pi = \frac{1}{1 + e^{-\eta}}$$

- $\eta$ is the linear predictor.

A linear model with the identity link can give fitted values below 0 or above 1, which cannot be probabilities. A coefficient $\beta_j$ multiplies the odds $\pi/(1 - \pi)$ by $e^{\beta_j}$, but it does not multiply the probability by $e^{\beta_j}$.

> [!example]- A logistic model for whether a claim is referred for investigation has $\hat{\eta} = -1.5 + 0.8x$, where $x$ is 1 if an attorney is involved and 0 if not. What are the two referral probabilities, the odds ratio and the ratio of the probabilities? {Example}
> - Without an attorney, $\hat{\eta} = -1.5$ and the probability is $\frac{1}{1 + e^{1.5}} = 0.1824$.
> - With an attorney, $\hat{\eta} = -0.7$ and the probability is $\frac{1}{1 + e^{0.7}} = 0.3318$.
> - The odds ratio is $e^{0.8} = 2.226$.
> - The ratio of the probabilities is $0.3318 / 0.1824 = 1.819$, smaller than the odds ratio.

## Modelling the logarithm of the response

A GLM with a log link models the logarithm of the mean, $\ln E[Y]$. A normal linear model fitted to $\ln Y$ models the mean of the logarithm, $E[\ln Y]$, which is a different quantity. For a positive response that is not constant,

> $$E[\ln Y] < \ln E[Y]$$

Exponentiating the fitted values of a model for $\ln Y$ therefore gives the geometric mean, or the median, of $Y$ rather than its mean, and it understates the mean of a right-skewed response.

> [!example]- A claim is 100 or 900 with equal probability. What are $\ln E[Y]$ and $E[\ln Y]$, and what does exponentiating $E[\ln Y]$ give? {Example}
> - The mean is $E[Y] = 500$, so $\ln E[Y] = 6.2146$.
> - The mean of the logarithm is $E[\ln Y] = \frac{\ln 100 + \ln 900}{2} = 5.7038$.
> - Exponentiating gives $e^{5.7038} = 300$, the geometric mean, which is $200$ below the mean of $500$.

## Prior weights

A prior weight $w_i$ divides the [[Dispersion Parameter#Prior weights|variance]] of the response of observation $i$. The weight changes how precisely each observation is known, not its mean, so a weight cannot remove an effect, such as a trend, from the mean. A response that is the average severity of several claims takes the number of claims as its weight.
