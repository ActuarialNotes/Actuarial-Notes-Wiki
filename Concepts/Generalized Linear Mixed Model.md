---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b0cb388bf44ea747e7396776ed71abc909e17354ae43ad1fd08d8a701611ceda
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Generalized Linear Mixed Model.md
---

A **Generalized Linear Mixed Model (GLMM)** is a [[Generalized Linear Model|GLM]] in which some coefficients are treated as random draws from a distribution rather than fixed values. These [[Random Effects|random effects]] are typically the levels of a categorical variable with many thin levels: territory, fleet owner, aircraft make. Each level's estimate is shrunk toward the mean in proportion to how little data it has, which brings [[Credibility|credibility]] into the GLM, and records in the same level are allowed to be correlated.

> $$g(\mu_i) = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + a_{k(i)}$$

> $$y_i \sim \text{exponential family}(\mu_i, \phi)$$

> $$a_k \sim N(0,\ \tau^2)$$

> $$\hat{a}_k = Z_k\,(\bar{y}_k - \bar{y})$$

> $$Z_k = \frac{n_k}{n_k + \sigma^2/\tau^2}$$

- $x_{i1}, \ldots, x_{ip}$ carry the [[Fixed Effects|fixed effects]], the same for every record. $a_{k(i)}$ is the random effect of record $i$'s level $k$, with no base level: every level gets a column. $\phi$ is the dispersion. Goldburd et al. write the random coefficients as $\gamma \sim \text{normal}(\nu, \sigma)$ with $\sigma$ their variance.
- **Shrinkage as credibility.** With normal errors and identity link, level $k$'s estimate is its mean deviation from the overall mean $\bar{y}$ times a credibility factor $Z_k$ (the last two blocks). $\tau^2$ is the **between-level** variance (the [[Variance of Hypothetical Means|VHM]]), $\sigma^2$ the **within-level** variance (the [[Expected Value of Process Variance|EPV]]) and $n_k$ the level's volume. $\sigma^2/\tau^2$ is Bühlmann's $k$, and the result is [[Bühlmann-Straub Credibility|Bühlmann-Straub]] credibility inside a GLM. Chalk et al. derive it as the Bayesian posterior mode, the same shrinkage ridge regression produces with $\lambda = \sigma^2/\tau^2$ ([[Best Linear Unbiased Predictor]]).
- **Why a mixed model.** A GLM assumes records are independent given the coefficients. Cars owned by one wealthy individual, one company's fleet, or renewals of one policy are not: high residuals on half a company's cars predict high residuals on the rest. Entering the company ID as an ordinary categorical variable creates a high cardinality variable with thin, fully credible levels, and cannot rate a new company. As a mean-zero random effect, the company moves only the intercept, and a new company gets $a = 0$.
- **Fitting** (Goldburd et al.) is a two-step process. First come the fixed coefficients, the dispersion and the random effects' *distribution*; then each level's estimate, by a Bayesian procedure that weighs its own data against that distribution. Levels with dense data stay near their own experience, and sparse ones move toward the mean.
- **Against [[Target Encoding|target encoding]]** (Chalk et al.). Both pull thin levels toward the mean, but by different mechanics and reasoning. GLMMs come from a statistically sound framework, take a few lines of code, and extend naturally to hierarchies such as aircraft model within make, though the hierarchy must be meaningful. In the monograph's aviation case study, GLMM software gave errors and never beat target encoding, which also stays inside the cross-validation framework, so target encoding was used and GLMMs recommended as a check.

> [!example]- Fleet Frequency with a Company Random Effect {Example}
> A fleet auto GLMM has fixed effects for vehicle type, which predict $0.20$ claims per vehicle-year for both fleets below. The within-company variance is $\sigma^2 = 0.20$ per vehicle-year (Poisson), and the fitted between-company variance is $\tau^2 = 0.001$.
>
> - Fleet A: $1{,}800$ vehicle-years, observed frequency $0.25$
> - Fleet B: $200$ vehicle-years, observed frequency $0.35$
>
> Find each fleet's random effect and predicted frequency, and the prediction for a new fleet C.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > k &= \frac{\sigma^2}{\tau^2} \\
> > &= \frac{0.20}{0.001} \\
> > &= 200 \\[4pt]
> > Z_A &= \frac{1{,}800}{1{,}800 + 200} \\
> > &= 0.90 \\[4pt]
> > \hat{a}_A &= 0.90\,(0.25 - 0.20) \\
> > &= 0.045 \\[4pt]
> > Z_B &= \frac{200}{200 + 200} \\
> > &= 0.50 \\[4pt]
> > \hat{a}_B &= 0.50\,(0.35 - 0.20) \\
> > &= 0.075
> > \end{align*}
> > $$
> >
> > Fleet A is predicted $0.245$, Fleet B $0.275$ and new Fleet C $0.20$, since its random effect has mean zero. B's observed excess is three times A's, but half of it is shrunk away because $200$ vehicle-years are only $50\%$ credible. A fixed-effect company variable would have charged B the full $0.35$, and could not have rated C at all.

> [!example]- Company Identifier: Fixed or Random? {Example}
> A commercial auto insurer's data hold one row per vehicle per year for $4{,}000$ client companies, from $1$ to $2{,}000$ vehicles each, with a company ID. Evaluate three ways to handle the ID: ignore it, include it as a categorical fixed effect, or treat it as a random effect in a GLMM.
>
> > [!answer]-
> > - **Ignore it.** Rows from one company are correlated, since their drivers share an employer's safety culture, which breaks the GLM's independence assumption. The GLM gives undue weight to large clustered experiences, overstates the significance of the vehicle coefficients, and throws away real information for pricing renewals.
> > - **Fixed effect.** The ID becomes a $4{,}000$-level high cardinality variable. Small companies get full-credibility coefficients built on a handful of claims, the fit may be slow or unstable, and a new company has no coefficient.
> > - **Random effect.** Vehicle features stay fixed and each company gets a mean-zero intercept shift, credibility-weighted by its volume. Large fleets are rated largely on their own experience, small ones near the vehicle-based rate, and new ones at zero. Here the fitted effects are of direct interest, because they inform renewal rates.
> >
> > The GLMM is the natural choice. Its estimates should still be cross-validated with folds assigned by company, and compared with a target-encoded company feature as a check.
