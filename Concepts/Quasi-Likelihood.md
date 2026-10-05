---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:4d42729b453a72eba35725d68b83f3667efd496bbecd754ee49ca742f07c9d2c
  sources:
    - "Larsen, 'Generalized Linear Models', CAS Study Note (Dec 2015, rev. June 2016; MAS-I reading), 'Quasi-Likelihood' (p.1), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), addendum 'Models for Count Data With Overdispersion' (rev. Oct 2022), sec.1 The Over-Dispersed Poisson Model (PDF pp.1-3), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Roback & Legler, Beyond Multiple Linear Regression (CRC 2021, open online edition), ch.4 Poisson Regression, sec.4.9.1 Dispersion Parameter Adjustment, sha256:55079c7b837d6207e55badacb0258e26d6c8f07ee731d11db0878b2d6a4982d4 — https://bookdown.org/roback/bookdown-BeyondMLR/ch-poissonreg.html"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; rank 3 for MAS-I), sec.2.7.2 overdispersed Poisson (PDF p.31) and sec.6.2.1 Nested Models and the F-Test, eq.17 (PDF pp.74-76), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Quasi-Likelihood.md
---

**Quasi-Likelihood** is a way of estimating the parameters of a [[Generalized Linear Model]] when the full distribution of the response is not known or not trusted. The analyst specifies only how the mean depends on the predictors and how the variance depends on the mean, up to a constant of proportionality $\phi$. Its estimating equations are a variation on the likelihood (score) equations, hence the name.

> $$g(\mu_i) = \mathbf{x}_i^\top\boldsymbol\beta$$

> $$\text{Var}(Y_i) = \phi\,V(\mu_i)$$

> $$\hat\phi = \frac{X^2}{n-p}$$

> $$X^2 = \sum_{i=1}^{n}\frac{(y_i - \hat\mu_i)^2}{V(\hat\mu_i)}$$

- $g$ is the [[Link Function]], $V(\mu)$ the [[Variance Function]], $\phi$ the [[Dispersion Parameter]], $X^2$ Pearson's chi-square statistic, $n$ the number of observations and $p$ the number of parameters. No [[Exponential Family]] distribution has to be assumed.
- **Why it works.** The iteratively reweighted least squares algorithm that fits a GLM uses only the mean and the variance of the observations. Applying it with just a mean–variance relationship gives the maximum quasi-likelihood estimates, which share many of the optimality properties of maximum likelihood estimates.
- **Quasi-Poisson.** For [[Poisson Regression]] with $\text{Var}(Y) = \phi\mu$, $\phi$ cancels out of the weighted least-squares step. So $\hat{\boldsymbol\beta}$ is *exactly* the Poisson estimate, and $\phi$ is estimated alongside it. Only the variances change: $\text{Var}(\hat{\boldsymbol\beta}) = \phi(X^\top W X)^{-1}$, so standard errors are multiplied by $\sqrt{\hat\phi}$.
- $\phi > 1$ is **overdispersion** (variance larger than the Poisson or binomial formula allows), and $\phi < 1$ is underdispersion, which is rare. Ignoring overdispersion understates standard errors, overstates significance and can lead to overly complex models.
- **Testing under quasi-likelihood.** Single coefficients use $t = \hat\beta/(\sqrt{\hat\phi}\,SE)$ on $n - p$ degrees of freedom. Nested models use the drop in [[Deviance]] per degree of freedom divided by $\hat\phi$, which is compared with an $F$ distribution.
- Treating a large $X^2$ as dispersion assumes the systematic part of the model is right. A large $X^2$ can also mean a missing predictor or a wrong link. The fully specified alternative is a [[Negative Binomial Distribution|negative binomial]] model.

> [!example]- Adjusting a Frequency Model's Standard Errors {Example}
> A Poisson frequency GLM fitted to $n - p = 500$ degrees of freedom gives a vacant-building coefficient $\hat\beta = 0.25$ with standard error $0.08$, and Pearson $X^2 = 1{,}450$. Refit as quasi-Poisson. Is the coefficient significant at the $5\%$ level?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat\phi &= \frac{1{,}450}{500} \\
> > &= 2.90 \\[4pt]
> > SE_Q &= 0.08\sqrt{2.90} \\
> > &= 0.08(1.703) \\
> > &= 0.136
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > t &= \frac{0.25}{0.136} \\
> > &= 1.84
> > \end{align*}
> > $$
> >
> > The two-sided $5\%$ critical value of $t_{500}$ is about $1.96$, so the term is **not** significant. The unadjusted Poisson test gave $z = 0.25/0.08 = 3.13$, which only looked significant because the overdispersion was ignored. The estimate and its relativity $e^{0.25} = 1.284$ are unchanged; only the uncertainty around them has grown.

> [!example]- Drop-in-Deviance Test With Overdispersion {Example}
> In the same model, adding a 5-level territory variable lowers the residual deviance from $1{,}560$ (on $504$ df) to $1{,}520$ (on $500$ df), and $\hat\phi = 2.90$. Test whether territory belongs in the model. The $95$th percentile of $F_{4,500}$ is $2.39$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > F &= \frac{(1{,}560 - 1{,}520)/(504 - 500)}{\hat\phi} \\
> > &= \frac{40/4}{2.90} \\
> > &= 3.45
> > \end{align*}
> > $$
> >
> > $3.45 > 2.39$, so territory is significant even after allowing for overdispersion. Without the adjustment, the drop of $40$ would have been compared with $\chi^2_4$ (critical value $9.49$), which overstates the evidence by a factor of $\hat\phi$.
