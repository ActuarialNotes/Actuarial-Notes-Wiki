---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:1bea575dc8a607c6d264745e8b142b04b6399520218d949e55a06ab7560c8e93
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
