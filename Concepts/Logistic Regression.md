---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:fb0a20dc900dc789b12f4a5a5a2edd6dddd21fcac93fde65fad1983412a923f4
  sources:
    - "Rodríguez, Lecture Notes on Generalized Linear Models (Princeton), Ch. 3 Logit Models for Binary Data, §3.2.1 Maximum Likelihood Estimation (PDF p.10): log L(β) = Σ{y_i log π_i + (n_i − y_i) log(1 − π_i)} except for a constant; §3.2.2 grouped-data deviance → χ²(n−p) as n_i → ∞, not with individual data (PDF pp.11–12); exp(β_j) an odds ratio; §3.7 Other Choices of Link (PDF pp.41–43): 'The logit and probit transformations are almost linear functions of each other for values of π_i in the range from 0.1 to 0.9, and therefore tend to give very similar results… coefficients in a logit model should be standardized dividing by π/√3', sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf"
    - "Rodríguez, GLM notes, Ch. 6 Multinomial Response Models, §6.2.1 baseline-category multinomial logit (PDF p.3); §6.5 ordered logit / proportional odds (PDF pp.18–19), sha256:f559d07ae73bdf381de5c19a9f0621419c635e5c6495c0135af940ae36807cbb — https://grodri.github.io/glms/notes/c6.pdf"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (MAS-I reading), p.1 Quasi-Likelihood (a constant of proportionality between mean and variance solved alongside the betas; binomial over-dispersion); p.3 canonical links, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), eq.(3.17) TSS = Σ(y_i − ȳ)², 'the amount of variability inherent in the response before the regression is performed' (PDF p.80); §3.2.2 'adding another variable always results in a decrease in the residual sum of squares on the training data… R² must increase' (PDF p.90); §4.4 'When there is substantial separation… parameter estimates for the logistic regression model are surprisingly unstable' (PDF p.151), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Logistic Regression.md
---

**Logistic Regression** is the [[Generalized Linear Model]] for a binary response (with extensions to more than two categories, below): the outcome is modelled as binomial and the **logit** [[Link Function]] maps the probability $\pi \in (0,1)$ onto the whole real line, so the linear predictor can take any value and the fitted probability always stays between $0$ and $1$.

> $$\ln\!\left(\frac{\pi}{1-\pi}\right) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$

> $$\pi = \frac{e^{\eta}}{1 + e^{\eta}} = \frac{1}{1 + e^{-\eta}}$$

- $\pi/(1-\pi)$ is the **odds**; the model is linear in the log-odds, so $e^{\beta_j}$ is the **odds ratio** for a one-unit increase in $x_j$ — the coefficient's natural interpretation
- The logit is the canonical link for the binomial, and the [[Dispersion Parameter]] is fixed at $\phi = 1$. With **grouped** data ($y_i$ successes out of $n_i$ trials) the residual [[Deviance]] is approximately $\chi^2_{n-p}$ as the group sizes $n_i$ grow, so a deviance far above its degrees of freedom signals overdispersion or a missing term; with individual $0/1$ responses the deviance has no such distribution and this check does not apply. Overdispersion can be handled by quasi-likelihood, which estimates a scale factor between the mean and the variance alongside the coefficients
- Coefficients are fitted by [[Maximum Likelihood Estimation]] (there is no closed form), and their standard errors come from the [[Fisher Information]]. For individual $0/1$ responses $y_i$ with fitted success probabilities $\pi_i$, the log-likelihood that is maximized is $\ell = \sum_i \left[ y_i \ln \pi_i + (1 - y_i) \ln(1 - \pi_i) \right]$: each success contributes $\ln \pi_i$ and each failure $\ln(1 - \pi_i)$. With grouped data, $y_i$ successes in $n_i$ trials, it is $\sum_i \left[ y_i \ln \pi_i + (n_i - y_i) \ln(1 - \pi_i) \right]$ up to a constant (Rodríguez, Ch. 3, §3.2.1). Evaluated at the fitted $\pi_i$ of two nested models, it gives the [[Likelihood Ratio Test|likelihood ratio test]] statistic, twice the difference in log-likelihoods
- **Logit or probit.** The probit link, the inverse of the standard normal CDF, is the main alternative. The two curves are both S-shaped and almost linear functions of each other for probabilities between about $0.1$ and $0.9$, so they tend to give very similar fitted results. Their coefficients differ in scale, since the standard logistic distribution has standard deviation $3.1416/\sqrt{3} \approx 1.81$ against the standard normal's $1$: divide logit coefficients by about $1.81$ before comparing them with probit ones (Rodríguez, Ch. 3, §3.7)
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
