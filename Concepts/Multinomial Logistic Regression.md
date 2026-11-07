---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:8cfbae143173f180a43dfa111311a0841f534bc19035dee4640c5c173fe4db45
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.4.3.5 Multinomial Logistic Regression, eqs 4.10-4.13 (printed pp.140-141, PDF pp.150-151)"
    - "Rodriguez, GLM lecture notes (Princeton), ch.6 Multinomial Response Models, sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf, secs.6.2.1-6.2.4 (baseline category, J-1 equations, reduces to logistic for J=2, log(pi1/pi2) as difference, probabilities form eq.6.5, ML by Fisher scoring/Newton-Raphson, deviance and LR chi-square) (PDF pp.3-6)"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, printed contents Ch.8 (sec.8.3 'Nominal logistic regression') (PDF p.11)"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multinomial Logistic Regression.md
---

A **Multinomial Logistic Regression** is a [[Logistic Regression|logistic regression]] for a response with $J > 2$ unordered categories, in which one category, $J$, is the reference category and the log-odds of each other category against it is linear in the predictors $x_1, \ldots, x_p$. Dobson and Barnett call it nominal logistic regression.

For each category $j = 1, \ldots, J-1$, the log-odds of category $j$ against the reference category is

> $$\ln\!\left(\frac{\pi_j}{\pi_J}\right) = \beta_{0j} + \beta_{1j} x_1 + \cdots + \beta_{pj} x_p$$

- $\pi_j = P(Y = j)$ is the probability of category $j$ for an observation with predictors $x_1, \ldots, x_p$.
- $\beta_{0j}, \beta_{1j}, \ldots, \beta_{pj}$ are the coefficients of category $j$.

Each of the $J - 1$ equations has its own intercept and slopes, so the model has $(J-1)(p+1)$ coefficients. Write $\eta_j$ for the right side of the equation of category $j$. Because the probabilities of the $J$ categories sum to 1, the probability of category $j$ is

> $$\pi_j = \frac{e^{\eta_j}}{1 + \sum_{k=1}^{J-1} e^{\eta_k}}$$

and the probability of the reference category is

> $$\pi_J = \frac{1}{1 + \sum_{k=1}^{J-1} e^{\eta_k}}$$

With $J = 2$ the model is the ordinary logistic regression.

> [!example]- A renewal model has three outcomes: renew unchanged (the reference category), renew with reduced coverage, and lapse. For a $10\%$ rate increase, the log-odds against renewing unchanged are $\eta_{\text{reduce}} = -0.7$ and $\eta_{\text{lapse}} = -1.0$. What is the probability of each outcome? {Example}
> - The odds against the reference category are $e^{-0.7} = 0.4966$ for reducing coverage and $e^{-1.0} = 0.3679$ for lapsing.
> - The denominator is $1 + 0.4966 + 0.3679 = 1.8645$.
> - The probability of renewing unchanged is $\pi_{\text{renew}} = 1/1.8645 = 0.536$.
> - The probability of reducing coverage is $\pi_{\text{reduce}} = 0.4966/1.8645 = 0.266$.
> - The probability of lapsing is $\pi_{\text{lapse}} = 0.3679/1.8645 = 0.197$.

## Interpreting the coefficients

A one-unit increase in $x_1$, with the other predictors held fixed, multiplies the odds of category $j$ against the reference category by $e^{\beta_{1j}}$. The log-odds of one non-reference category $j$ against another, $k$, is the difference of their equations:

> $$\ln\!\left(\frac{\pi_j}{\pi_k}\right) = \eta_j - \eta_k$$

Refitting the model with a different reference category changes the coefficients but not the fitted probabilities.

> [!example]- In the renewal model, $\eta_{\text{reduce}} = -1.2 + 0.05x$ and $\eta_{\text{lapse}} = -2.0 + 0.10x$, where $x$ is the rate increase in percent. What is the log-odds of lapsing rather than reducing coverage, and by what factor does each percentage point change the odds of lapsing rather than renewing unchanged? {Example}
> - The log-odds of lapsing rather than reducing coverage is $\eta_{\text{lapse}} - \eta_{\text{reduce}} = -0.8 + 0.05x$.
> - At $x = 10$ it is $-0.3$, and $e^{-0.3} = 0.741$ equals $0.197/0.266$ from the probabilities above.
> - Each percentage point multiplies the odds of lapsing rather than renewing unchanged by $e^{0.10} = 1.105$.

> [!trap] Reading a coefficient against the wrong category
> Every coefficient compares its category with the reference category. The slope $0.10$ of the lapse equation describes lapsing against renewing unchanged. Against reducing coverage, the slope of lapsing is $0.10 - 0.05 = 0.05$.
