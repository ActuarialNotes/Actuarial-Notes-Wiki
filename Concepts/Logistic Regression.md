---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:28f2c93de1e7f92db95c4076b0f5ea8df653f3be840f206e8d07a23df0d69434
  sources: []
  open_findings: 0
  log: .verify/Concepts/Logistic Regression.md
---

**Logistic Regression** is the [[Generalized Linear Model]] for a binary response: the outcome is modelled as binomial and the **logit** [[Link Function]] maps the probability $\pi \in (0,1)$ onto the whole real line, so the linear predictor can take any value and the fitted probability always stays between $0$ and $1$.

> $$\ln\!\left(\frac{\pi}{1-\pi}\right) = \beta_0 + \beta_1 x_1 + \cdots + \beta_p x_p$$

> $$\pi = \frac{e^{\eta}}{1 + e^{\eta}} = \frac{1}{1 + e^{-\eta}}$$

- $\pi/(1-\pi)$ is the **odds**; the model is linear in the log-odds, so $e^{\beta_j}$ is the **odds ratio** for a one-unit increase in $x_j$ — the coefficient's natural interpretation
- The logit is the canonical link for the binomial, and the [[Dispersion Parameter]] is fixed at $\phi = 1$; a residual [[Deviance]] far above its degrees of freedom signals overdispersion or a missing term rather than a scale to estimate
- Coefficients are fitted by [[Maximum Likelihood Estimation]] (there is no closed form), and their standard errors come from the [[Fisher Information]]
- Fit is judged by deviance, [[AIC]], and classification measures (confusion matrix, ROC/AUC) rather than [[R-Squared]]; **pseudo-$R^2$** measures exist but are not comparable to the linear-model version
- Actuarial uses: policyholder retention and conversion, fraud referral, whether a claim exceeds a large-loss threshold, and any yes/no underwriting decision
- **Complete separation** — a predictor that perfectly splits the outcomes — sends a coefficient to infinity and produces enormous standard errors; it is a data problem, not a computing one

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
