---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:63e28f8f2ea39535cb3c40fefc48862c35ad99a3be2f541e5ef7bb32f1b47dd2
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), secs.4.2-4.3.5 (eqs.4.2-4.4, 4.10-4.12; PDF pp.142-150) and sec.4.4 (separation, PDF p.151), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), pp.1, 3, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, printed contents Ch.8 (PDF p.11) and sec.1.2 Scope (PDF p.22), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), App. B secs.B.2-B.4.3 (PDF pp.4-11), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), ch.3 Logit Models for Binary Data, sec.3.2.2 (PDF p.11), sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), ch.6 Multinomial Response Models, secs.6.2.1, 6.5.2-6.5.3 (PDF pp.3-4, 15-19), sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Logistic Regression.md
---

**Logistic Regression** is the [[Generalized Linear Model]] for a binary response (with extensions to more than two categories, below): the outcome is modelled as binomial and the **logit** [[Link Function]] maps the probability $\pi \in (0,1)$ onto the whole real line, so the linear predictor can take any value and the fitted probability always stays between $0$ and $1$.

> $$\ln\!\left(\frac{\pi}{1-\pi}\right) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$

> $$\pi = \frac{e^{\eta}}{1 + e^{\eta}} = \frac{1}{1 + e^{-\eta}}$$

- $\pi/(1-\pi)$ is the **odds**; the model is linear in the log-odds, so $e^{\beta_j}$ is the **odds ratio** for a one-unit increase in $x_j$ — the coefficient's natural interpretation
- The logit is the canonical link for the binomial, and the [[Dispersion Parameter]] is fixed at $\phi = 1$. With **grouped** data ($y_i$ successes out of $n_i$ trials) the residual [[Deviance]] is approximately $\chi^2_{n-p}$ as the group sizes $n_i$ grow, so a deviance far above its degrees of freedom signals overdispersion or a missing term; with individual $0/1$ responses the deviance has no such distribution and this check does not apply. Overdispersion can be handled by quasi-likelihood, which estimates a scale factor between the mean and the variance alongside the coefficients
- Coefficients are fitted by [[Maximum Likelihood Estimation]] (there is no closed form), and their standard errors come from the [[Fisher Information]]
- Fit is judged by deviance, [[AIC]], and classification measures (confusion matrix, ROC/AUC) rather than [[R-Squared]]; **pseudo-$R^2$** measures exist but are not comparable to the linear-model version
- Actuarial uses: policyholder retention and conversion, fraud referral, whether a claim exceeds a large-loss threshold, and any yes/no underwriting decision
- **Complete separation** — a predictor that perfectly splits the outcomes — sends a coefficient to infinity and produces enormous standard errors; it is a data problem, not a computing one

**More than two categories.** Logistic regression extends to a response with $K > 2$ categories.

**Nominal (multinomial) logistic regression** is for unordered categories. One category, $K$, is the baseline, and the log-odds of each other category against it is linear in the predictors, with its own coefficients:

> $$\ln\frac{\Pr(Y = k \mid x)}{\Pr(Y = K \mid x)} = \eta_k = \beta_{k0} + \beta_{k1}x_1 + \cdots + \beta_{kp}x_p, \qquad k = 1, \ldots, K-1$$

> $$\Pr(Y = k \mid x) = \frac{e^{\eta_k}}{1 + \sum_{l=1}^{K-1} e^{\eta_l}}, \qquad \Pr(Y = K \mid x) = \frac{1}{1 + \sum_{l=1}^{K-1} e^{\eta_l}}$$

The choice of baseline changes the coefficients but not the fitted probabilities, and $e^{\beta_{kj}}$ is the factor by which the odds of category $k$ *versus the baseline* change per unit increase in $x_j$. See [[Multinomial Logistic Regression]].

**Ordinal logistic regression** is for ordered categories. The **proportional odds** (cumulative logit) model applies the logit to the cumulative probabilities $\gamma_j = \Pr(Y \le j)$, with an intercept for each cut-point but one set of slopes:

> $$\ln\frac{\gamma_j}{1-\gamma_j} = \theta_j + \mathbf{x}^\top\boldsymbol{\beta}, \qquad j = 1, \ldots, K-1$$

A change in the covariates multiplies the odds of a response in category $j$ or below by the same factor, $e^{\Delta\mathbf{x}^\top\boldsymbol{\beta}}$, for every $j$ — hence the name. Dobson & Barnett also cover adjacent-categories and continuation-ratio logit models. See [[Ordinal Logistic Regression]].

![[Media/Figures/Logistic_Regression.svg|340]]

> [!example]- From Coefficients to a Predicted Probability {Example}
> A retention model gives $\hat\eta = 1.20 - 0.030\,(\text{rate increase }\%)$. Find the predicted renewal probability for a $10\%$ increase, and the odds ratio per extra percentage point.
>
> > [!answer]-
> > $$\hat\eta = 1.20 - 0.030(10) = 0.90$$
> > $$\hat\pi = \frac{1}{1 + e^{-0.90}} = \frac{1}{1 + 0.4066} = 0.711$$
> > Each additional percentage point of rate increase multiplies the odds of renewal by $e^{-0.030} = 0.970$ — a $3.0\%$ reduction in the odds per point.

> [!example]- Why Not Ordinary Regression? {Example}
> An analyst fits OLS to a $0/1$ lapse indicator and obtains fitted values ranging from $-0.08$ to $1.06$. Name two assumptions that fail.
>
> > [!answer]-
> > First, the **fitted values are not probabilities** — the identity link is unbounded, so predictions leave $[0,1]$. Second, a Bernoulli response has variance $\pi(1-\pi)$, which depends on the mean, so the **constant-variance** assumption of [[Linear Regression]] fails; the errors are not Normal either, being two-valued. The logit link and the binomial variance function fix both.
