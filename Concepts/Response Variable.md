---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1bea575dc8a607c6d264745e8b142b04b6399520218d949e55a06ab7560c8e93
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Response Variable.md
---

The **response variable** — also the dependent variable, target or outcome — is the quantity $Y$ a model explains or predicts from its [[Predictor Variable|predictors]]. Its [[Data Types|data type]] and the way its variance behaves determine the model: in a [[Generalized Linear Model]], the response distribution and the [[Link Function|link function]].

> $$g\big(E[Y_i]\big) = \mathbf{x}_i^\top\boldsymbol\beta$$

> $$\mathrm{Var}(Y_i) = \phi\,V(\mu_i)$$

- $\mu_i = E[Y_i]$; $V$ is the [[Variance Function|variance function]] fixed by the chosen distribution and $\phi$ is the [[Dispersion Parameter|dispersion parameter]]. Choosing a distribution is choosing how the variance grows with the mean
- **Continuous, roughly symmetric, constant variance** — Normal with the identity link: ordinary [[Linear Regression]]
- **Claim counts** — Poisson ($V(\mu) = \mu$), or [[Negative Binomial Distribution|negative binomial]] if overdispersed, with a log link and log exposure as an [[Offset Variable|offset]]: [[Poisson Regression]]
- **Claim severity** — positive and right-skewed, with standard deviation roughly proportional to the mean: [[Gamma]] ($V(\mu) = \mu^2$) with a log link, weighted by claim count. The inverse Gaussian ($V(\mu) = \mu^3$) suits a heavier tail
- **Pure premium or loss cost** — mostly zeros plus a skewed positive amount: the [[Tweedie Distribution|Tweedie]] with power $1 < p < 2$ and a log link
- **Binary response** — claim or no claim, renew or lapse, fraud referral: binomial with the logit link, which is [[Logistic Regression]]. The fitted value is a probability; a linear model on a $0/1$ response can predict values outside $[0, 1]$
- A GLM links the *mean* and leaves $Y$ itself untransformed. Least squares on $\ln Y$ is a different model: $E[\ln Y] \neq \ln E[Y]$, so exponentiating its fitted values understates the mean

> [!example]- Matching Each Response to a Model {Example}
> Choose a distribution and link for each response: (a) number of claims per policy-year; (b) average severity per claim; (c) whether a policy renews; (d) loss cost per car-year, $92\%$ of which are zero.
>
> > [!answer]-
> > - **(a)** Poisson with a log link and $\ln(\text{exposure})$ as an offset; switch to negative binomial if the residual deviance is far above its degrees of freedom
> > - **(b)** Gamma with a log link, weighted by the number of claims behind each average — an average of many claims is less variable than one claim
> > - **(c)** Binomial with a logit link: logistic regression, whose fitted values are renewal probabilities
> > - **(d)** Tweedie with $1 < p < 2$ and a log link. The point mass at zero rules out the Gamma, and the continuous positive part rules out the Poisson; the Tweedie is a compound Poisson–Gamma that has both
> >
> > In every case the log (or logit) link keeps the fitted mean in the range the response can take, and makes the coefficients multiplicative.

> [!example]- A Binary Response: Probabilities and Odds {Example}
> A logistic model for whether a claim is referred to the special investigations unit has $\hat\eta = -1.5 + 0.8\,I_{\text{attorney}}$. Find the referral probability with and without attorney involvement, the odds ratio, and the ratio of the probabilities.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat\pi_0 &= \frac{1}{1 + e^{1.5}} \\
> > &= 0.182 \\
> > \hat\pi_1 &= \frac{1}{1 + e^{0.7}} \\
> > &= 0.332 \\
> > \text{Odds ratio} &= e^{0.8} \\
> > &= 2.23
> > \end{align*}
> > $$
> > The probability ratio is $0.332/0.182 = 1.82$. Attorney involvement multiplies the **odds** of referral by $2.23$ but the **probability** by only $1.82$. The two agree only when the probability is small, so an odds ratio read as a relative risk overstates the effect whenever the outcome is common.
