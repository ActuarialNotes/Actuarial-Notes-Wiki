---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:54f7130849c0176fb8ff1c8214cb655f67694479e57cb17c111deb5a5f46a509
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.7 'Generalized Additive Models' — backfitting and footnote 6 'A partial residual for X3, for example, has the form ri = yi − f1(xi1) − f2(xi2)', printed p.309 (PDF p.317); §7.7.1 pros/cons and f_jk, printed p.310 (PDF p.318), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Tibshirani, R., 'Additive Models' lecture notes, Advanced Methods for Data Analysis (CMU 36-402/36-608, Spring 2014), §2.1 identifiability E(Y) = beta0, E[rj(Xj)] = 0 (PDF p.2); §2.2 backfitting: beta0-hat = ybar, jth partial residual y − beta0-hat − sum over l≠j of rl-hat, smooth, then centre rj-hat; different smoothers allowed per variable (PDF p.3), sha256:008ff298d9d3c5103b58a5a417499e745348c6ead70fe96cdfa601f9ebf10d18 — https://www.stat.cmu.edu/~ryantibs/advmethods/notes/addmodels.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Generalized Additive Model.md
---

A **Generalized Additive Model** (GAM) is a regression model that replaces each linear term $\beta_j x_{ij}$ of a multiple [[Linear Regression|linear regression]] with a smooth non-linear function $f_j(x_{ij})$ of that predictor, and adds the functions together. The GAM for a quantitative response is

> $$y_i = \beta_0 + \sum_{j=1}^{p} f_j(x_{ij}) + \varepsilon_i$$

- $y_i$ is the response of observation $i$, and $x_{ij}$ is its value of the predictor $x_j$, for $j = 1, \ldots, p$.
- $\varepsilon_i$ is the error term.

Each $f_j$ can be fitted with any method for one predictor: a [[Regression Spline|regression spline]] or natural spline, a [[Smoothing Spline|smoothing spline]], [[Local Regression|local regression]], [[Polynomial Regression|polynomial regression]] or a [[Step Function|step function]]. A function $f_j$ can also stay linear, and a qualitative predictor enters with a separate constant for each level. When every $f_j$ is a natural spline or a step function, the GAM is one least squares regression on the spline basis functions and the indicator variables. The smoothness of each fitted $f_j$ is summarized by its effective degrees of freedom.

> [!example]- A severity GAM has a natural spline in building age with 4 degrees of freedom, a natural spline in square footage with 5, and a step function over 4 construction classes. How many coefficients does the least squares fit estimate? {Example}
> - The intercept is 1 coefficient.
> - The two natural splines contribute 4 and 5 basis functions.
> - The 4 construction classes need 3 indicator variables alongside the intercept.
> - The fit estimates $1 + 4 + 5 + 3 = 13$ coefficients.

## Additivity

Because the model is additive, the effect of each predictor on the response can be examined while the other predictors are held fixed. A change in $x_j$ changes the prediction by the same amount whatever the values of the other predictors, which makes a GAM useful for inference. Additivity also means that a GAM misses interactions between predictors. An [[Interaction|interaction]] can be added by hand, as a product term $x_j \times x_k$ or as a function $f_{jk}(x_j, x_k)$ of two predictors fitted with a two-dimensional smoother.

## Logistic regression GAM

For a binary response, the GAM replaces the linear predictor of [[Logistic Regression|logistic regression]] with the same additive form:

> $$\ln\left(\frac{\pi}{1 - \pi}\right) = \beta_0 + f_1(x_1) + f_2(x_2) + \cdots + f_p(x_p)$$

- $\pi = P(Y = 1 \mid x_1, \ldots, x_p)$ is the probability that the response is 1.

> [!example]- A logistic GAM for the probability of a claim has intercept $-2.2$ and fitted functions $f_1(22) = 0.65$ and $f_1(45) = -0.20$ for driver age, $f_2(3) = -0.10$ for vehicle age and $f_3(\text{Urban}) = 0.30$ for territory. What is the probability of a claim for a 22-year-old with a 3-year-old vehicle in the Urban territory, and what is the odds ratio between drivers aged 22 and 45? {Example}
> - The log-odds for the 22-year-old are $-2.2 + 0.65 - 0.10 + 0.30 = -1.35$.
> - The probability of a claim is $\pi = e^{-1.35}/(1 + e^{-1.35}) = 0.206$.
> - With vehicle age and territory held fixed, their terms cancel in the difference of the log-odds, which is $0.65 - (-0.20) = 0.85$.
> - The odds ratio is $e^{0.85} = 2.34$, for every vehicle age and territory.

> [!trap] Expecting a GAM to find interactions
> A GAM fits each predictor's effect separately and adds them. If young drivers are much riskier only in urban territories, a GAM without an interaction term gives young drivers the same odds ratio in every territory.
