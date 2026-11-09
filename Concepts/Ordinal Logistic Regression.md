---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:4162593c58784fc0b1b04510a64e95ab81b17444358410ac43345b0ba7f710b4
  sources:
    - "Rodriguez, GLM lecture notes (Princeton), ch.6 Multinomial Response Models, sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf, sec.6.5 Models for Ordinal Response Data, 6.5.1-6.5.3 (cumulative probabilities gamma_j, eq.6.20 g(gamma_ij)=theta_j+x'beta with no column of ones, cut-points theta_1<...<theta_J-1, latent variable with beta*=-beta, proportional odds name and odds lambda_j*exp(x'beta), 'not a log-linear model', continuation-ratio model) (PDF pp.15-19)"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, printed contents Ch.8 (sec.8.4 Ordinal logistic regression: 8.4.1 cumulative logit, 8.4.2 proportional odds, 8.4.3 adjacent categories logit, 8.4.4 continuation ratio logit) (PDF p.11)"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ordinal Logistic Regression.md
---

An **Ordinal Logistic Regression** is a [[Logistic Regression|logistic regression]] for a response with $J$ ordered categories, modelled through the cumulative probabilities $\gamma_j = P(Y \le j)$. Its usual form is the proportional odds (cumulative logit) model, which applies the logit [[Link Function|link function]] to each cumulative probability, with its own intercept at each cut-point and one common set of slopes. For $j = 1, \ldots, J-1$, the logit of the cumulative probability is

> $$\ln\!\left(\frac{\gamma_j}{1 - \gamma_j}\right) = \theta_j + \beta_1 x_1 + \cdots + \beta_p x_p$$

- $\theta_j$ is the intercept of cut-point $j$, with $\theta_1 < \theta_2 < \cdots < \theta_{J-1}$ because the cumulative probabilities increase with $j$.
- $\beta_1, \ldots, \beta_p$ are the slopes of the predictors $x_1, \ldots, x_p$, the same at every cut-point.

The model has $(J - 1) + p$ parameters. A [[Multinomial Logistic Regression|multinomial logistic regression]] fitted to the same response has $(J-1)(p+1)$ and makes no use of the order of the categories.

The probability of category $j$ is the difference of adjacent cumulative probabilities:

> $$\pi_j = \gamma_j - \gamma_{j-1}$$

- $\pi_j = P(Y = j)$.
- $\gamma_0 = 0$ and $\gamma_J = 1$.

The probability of the highest category is therefore $\pi_J = 1 - \gamma_{J-1}$.

> [!example]- Claims are banded as small ($Y = 1$), medium ($Y = 2$) or large ($Y = 3$). A proportional odds model has $\theta_1 = 0.8$, $\theta_2 = 2.2$ and $\beta_1 = -1.1$ for $x_1 = 1$ when the claimant has an attorney. What is the probability of each band for a claim with an attorney? {Example}
> - The linear predictor at the first cut-point is $0.8 - 1.1 = -0.3$, so $\gamma_1 = \frac{1}{1 + e^{0.3}} = 0.4256$.
> - The linear predictor at the second cut-point is $2.2 - 1.1 = 1.1$, so $\gamma_2 = \frac{1}{1 + e^{-1.1}} = 0.7503$.
> - The probability of a small claim is $\pi_1 = \gamma_1 = 0.4256$.
> - The probability of a medium claim is $\pi_2 = 0.7503 - 0.4256 = 0.3247$.
> - The probability of a large claim is $\pi_3 = 1 - 0.7503 = 0.2497$.

## Proportional odds

Exponentiating the model, the odds of a response in category $j$ or below are

> $$\frac{\gamma_j}{1 - \gamma_j} = e^{\theta_j}\, e^{\beta_1 x_1 + \cdots + \beta_p x_p}$$

The factor $e^{\theta_j}$ cancels when two observations are compared at the same cut-point. A one-unit increase in $x_1$ therefore multiplies the odds of category $j$ or below by $e^{\beta_1}$ at every cut-point, which gives the model its name.

> [!example]- In the claim-band model, what is the odds ratio of a claim with an attorney to a claim without one, at each cut-point? {Example}
> - Without an attorney, $\gamma_1 = \frac{1}{1 + e^{-0.8}} = 0.6900$ and $\gamma_2 = \frac{1}{1 + e^{-2.2}} = 0.9002$.
> - At the first cut-point the odds are $0.4256/0.5744 = 0.7409$ with an attorney and $0.6900/0.3100 = 2.2258$ without, a ratio of $0.333$.
> - At the second cut-point the odds are $0.7503/0.2497 = 3.0048$ with an attorney and $0.9002/0.0998 = 9.0200$ without, a ratio of $0.333$.
> - Both ratios equal $e^{-1.1} = 0.333$. An attorney cuts the odds of being at or below any band to a third.

> [!trap] Reading the sign of a slope the wrong way round
> In the form $\theta_j + \beta_1 x_1 + \cdots$, a negative $\beta_1$ lowers the odds of the lower categories and shifts the response toward the higher ones. Some software writes the model as $\theta_j - \beta_1^* x_1 - \cdots$, and there a positive $\beta_1^*$ shifts the response toward the higher categories. Check which form the output uses before reading a sign.
