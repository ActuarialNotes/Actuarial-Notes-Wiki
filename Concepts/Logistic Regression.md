---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:447cd0072c5b73a451af1b0cfb6baa198a0b23e72f97b79d25a45226e4b47fd4
  sources:
    - "Rodríguez, Lecture Notes on Generalized Linear Models (Princeton), Ch. 3 Logit Models for Binary Data, §3.2.1 Maximum Likelihood Estimation (PDF p.10): log L(β) = Σ{y_i log π_i + (n_i − y_i) log(1 − π_i)} except for a constant; §3.2.2 grouped-data deviance → χ²(n−p) as n_i → ∞, not with individual data (PDF pp.11–12); exp(β_j) an odds ratio; §3.7 Other Choices of Link (PDF pp.41–43): 'The logit and probit transformations are almost linear functions of each other for values of π_i in the range from 0.1 to 0.9, and therefore tend to give very similar results… coefficients in a logit model should be standardized dividing by π/√3', sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf"
    - "Rodríguez, GLM notes, Ch. 6 Multinomial Response Models, §6.2.1 baseline-category multinomial logit (PDF p.3); §6.5 ordered logit / proportional odds (PDF pp.18–19), sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (MAS-I reading), p.1 Quasi-Likelihood (a constant of proportionality between mean and variance solved alongside the betas; binomial over-dispersion); p.3 canonical links, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), eq.(3.17) TSS = Σ(y_i − ȳ)², 'the amount of variability inherent in the response before the regression is performed' (PDF p.80); §3.2.2 'adding another variable always results in a decrease in the residual sum of squares on the training data… R² must increase' (PDF p.90); §4.4 'When there is substantial separation… parameter estimates for the logistic regression model are surprisingly unstable' (PDF p.151), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Logistic Regression.md
---

![[Media/Figures/Logistic_Regression.svg|340]]

A **Logistic Regression** is a [[Generalized Linear Model|generalized linear model]] for a binary response, in which the response $Y_i$ has a [[Binomial Distribution|binomial (Bernoulli) distribution]] with probability of success $\pi_i$ and the [[Link Function|link function]] is the logit. It is a [[Supervised Learning|supervised learning]] method for classifying an observation into one of two classes from its predictors $x_{i1}, \ldots, x_{ip}$.

The odds of success are $\pi_i/(1-\pi_i)$, and the logit is the natural logarithm of the odds. The logit of the probability of success is

> $$\ln\!\left(\frac{\pi_i}{1-\pi_i}\right) = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- $\beta_0, \beta_1, \ldots, \beta_p$ are the coefficients, estimated by [[Maximum Likelihood Estimation|maximum likelihood]].

The logit maps a probability in $(0, 1)$ onto the whole real line, so the linear predictor $\eta_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$ can take any value. Solving for $\pi_i$, the probability of success is

> $$\pi_i = \frac{e^{\eta_i}}{1 + e^{\eta_i}}$$

> $$\pi_i = \frac{1}{1 + e^{-\eta_i}}$$

This inverse of the logit is the logistic function. It maps any value of $\eta_i$ into $(0, 1)$, so every fitted value is a probability. The probit link, the inverse of the standard normal cumulative distribution function, also maps $(0, 1)$ onto the real line and gives similar fitted probabilities. The logit is the canonical link of the binomial distribution, and the [[Dispersion Parameter|dispersion parameter]] of the binomial is fixed at $\phi = 1$.

> [!example]- A logistic regression for the probability that a policy renews has $\hat\beta_0 = 1.20$ and $\hat\beta_1 = -0.03$, where $x$ is the rate increase in percent. What is the probability of renewal for a $10\%$ rate increase? {Example}
> - The linear predictor is $\hat\eta = 1.20 - 0.03 \times 10 = 0.90$.
> - The probability of renewal is $\hat\pi = \frac{1}{1 + e^{-0.90}} = \frac{1}{1.4066} = 0.711$.

## The odds ratio

Exponentiating the logit, the odds of success are

> $$\frac{\pi_i}{1 - \pi_i} = e^{\beta_0}\, e^{\beta_1 x_{i1}} \cdots e^{\beta_p x_{ip}}$$

A one-unit increase in $x_j$, with the other predictors held fixed, multiplies the odds by $e^{\beta_j}$. This factor is the odds ratio of $x_j$.

> [!example]- In the renewal model above, what are the odds of renewal for a $10\%$ rate increase, and by what factor does each additional percentage point of rate increase change them? {Example}
> - The odds of renewal are $e^{\hat\eta} = e^{0.90} = 2.460$.
> - Each additional percentage point multiplies the odds by $e^{-0.03} = 0.970$, a reduction of $3.0\%$.

Because the model is linear on the log-odds scale, two fitted probabilities at two values of one predictor fix both coefficients. The slope is the change in log-odds divided by the change in $x$.

> [!example]- A logistic regression with one predictor gives fitted probabilities of $0.5$ at $x = 2$ and $0.8$ at $x = 4$. What are $\hat\beta_0$ and $\hat\beta_1$? {Example}
> - At $x = 2$ the log-odds are $\ln(0.5/0.5) = 0$.
> - At $x = 4$ the log-odds are $\ln(0.8/0.2) = \ln 4 = 1.3863$.
> - The slope is $\hat\beta_1 = \frac{1.3863 - 0}{4 - 2} = 0.6931$.
> - The intercept is $\hat\beta_0 = 0 - 2 \times 0.6931 = -1.3863$.
> - The odds ratio is $e^{0.6931} = 2$, so each unit of $x$ doubles the odds of success.

## The linear probability model

The linear probability model fits [[Linear Regression|linear regression]] to a $0/1$ response, so that the probability of success is

> $$\pi_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

It has three drawbacks that the logit link and the binomial distribution remove:

1. Fitted values can fall below 0 or above 1, so they are not always probabilities.
2. The variance of a $0/1$ response is $\pi_i(1 - \pi_i)$, which changes with the mean, so the errors are heteroscedastic.
3. The errors take only two values for each $x_i$, so they are not normal and residual analysis is not meaningful.

## Responses with more than two categories

A response with more than two unordered categories is modelled by [[Multinomial Logistic Regression|multinomial logistic regression]]. A response with ordered categories is modelled by [[Ordinal Logistic Regression|ordinal logistic regression]].

> [!trap] Multiplying the probability by the odds ratio
> The odds ratio $e^{\beta_j}$ multiplies the odds, not the probability. In the renewal model, an $11\%$ rate increase gives odds of $2.460 \times 0.970 = 2.387$ and a probability of $2.387/3.387 = 0.705$. Multiplying the probability instead, $0.711 \times 0.970 = 0.690$, is wrong.
