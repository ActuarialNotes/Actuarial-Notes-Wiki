---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:84efa8102831966c5d37d86cc9e9682518848afbe72f27eae273d59debd441f7
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 printed p.86 (PDF p.96); §3.3.2 'Removing the Additive Assumption' printed pp.87-90 (PDF pp.97-100), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2.1 nested F-test PDF pp.75-76, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Rodriguez, Lecture Notes on Generalized Linear Models (Princeton), Ch.2 Linear Models for Continuous Data, two-factor model with interaction, PDF pp.40-41 (R-1, C-1 and (R-1)(C-1) dummies; interaction dummies as products of row and column dummies; a dummy dropped for an empty cell, three rather than four interaction terms; F-test for the interaction on three d.f.), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Goldburd, Khare, Tevet & Guller, CAS Monograph 5, 2nd ed., §6.1.3 printed p.64 (comparison valid only on identical datasets), §6.2.1 printed pp.64-65 (nested model = subset of the predictors of a larger model; F-statistic with numerator d.f. = # of added parameters, eq.17), §6.2.2 printed p.66 (non-nested: one does not contain a subset of the variables of the other), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Interaction.md
---

![[Media/Figures/Interaction.svg|340]]

An **Interaction** between two [[Predictor Variable|predictors]] is present when the effect of one predictor on the response depends on the value of the other. An interaction enters the linear predictor as a coefficient multiplied by the product of the two predictors, so with predictors $x_1$ and $x_2$ the linear predictor is

> $$\eta = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 x_1 x_2$$

- $\beta_1$ and $\beta_2$ are the main effects of $x_1$ and $x_2$.
- $\beta_3$ is the interaction coefficient.

A unit increase in $x_1$ changes the linear predictor by $\beta_1 + \beta_3 x_2$, so the effect of $x_1$ depends on $x_2$. When $\beta_3 = 0$, the effects of the two predictors add on the scale of the linear predictor and there is no interaction. An interaction between a categorical predictor and a continuous one gives each level of the categorical predictor its own slope.

> [!example]- A Poisson frequency GLM has vehicle age $x_1$, an indicator $x_2$ that is 1 for a sports car, and their interaction, with $\hat{\beta}_1 = -0.02$, $\hat{\beta}_2 = 0.10$ and $\hat{\beta}_3 = 0.03$. How does one more year of vehicle age change the linear predictor for a sports car and for any other car? {Example}
> - For a car that is not a sports car, $x_2 = 0$, so one more year changes $\hat{\eta}$ by $\hat{\beta}_1 = -0.02$.
> - For a sports car, $x_2 = 1$, so one more year changes $\hat{\eta}$ by $\hat{\beta}_1 + \hat{\beta}_3 = -0.02 + 0.03 = 0.01$.
> - Frequency falls with vehicle age for other cars and rises slightly with vehicle age for sports cars.

## Interaction of two binary predictors

When $x_1$ and $x_2$ are both indicators, the interaction term applies only when both are 1. Write $\mu_{00}$, $\mu_{10}$, $\mu_{01}$ and $\mu_{11}$ for the means of the four combinations, with the first subscript the value of $x_1$ and the second the value of $x_2$. With link function $g$, the interaction coefficient is

> $$\beta_3 = g(\mu_{11}) - g(\mu_{10}) - g(\mu_{01}) + g(\mu_{00})$$

It is the amount the linear predictor of the combination exceeds the sum of the main effects. Under a log link, $\beta_3 = 0$ exactly when $\mu_{11}\mu_{00} = \mu_{10}\mu_{01}$, so a zero interaction means the effects multiply.

> [!example]- A model with an intercept, two indicators and their interaction gives fitted means $\mu_{00} = 0.20$, $\mu_{10} = 0.30$, $\mu_{01} = 0.40$ and $\mu_{11} = 0.60$. Under which of the identity, inverse and log links is the interaction coefficient non-zero? {Example}
> - Under the identity link, $\beta_3 = 0.60 - 0.30 - 0.40 + 0.20 = 0.10$.
> - Under the inverse link, $\beta_3 = \frac{1}{0.60} - \frac{1}{0.30} - \frac{1}{0.40} + \frac{1}{0.20} = 0.8333$.
> - Under the log link, $\beta_3 = \ln\frac{0.60 \times 0.20}{0.30 \times 0.40} = \ln 1 = 0$.
> - The interaction coefficient is non-zero under the identity and inverse links only.

## Interaction of two categorical predictors

An interaction between a categorical predictor with $k$ levels and one with $m$ levels is coded by the products of their indicator variables. The number of interaction coefficients is

> $$(k - 1)(m - 1)$$

The interaction coefficients are tested together, by comparing the models with and without them in a nested-model test based on the [[Deviance|deviance]]. Each coefficient on its own depends on which levels are the base levels. A model that includes an interaction also includes the main effects of both predictors, even when their coefficients are not significant.

> [!example]- A frequency model has territory with 4 levels, vehicle type with 3 levels and their interaction. How many coefficients does the model have? {Example}
> - The intercept is 1 coefficient.
> - The main effects have $4 - 1 = 3$ and $3 - 1 = 2$ coefficients.
> - The interaction has $(4 - 1)(3 - 1) = 6$ coefficients.
> - The model has $1 + 3 + 2 + 6 = 12$ coefficients, one for each of the $4 \times 3 = 12$ combinations.

## Cross-level interaction in a multilevel model

In a [[Hierarchical Model|multilevel model]], a group-level covariate can appear in the equation for the slope of an observation-level covariate. Substituting that equation into the observation-level equation produces the product of the two covariates, which is called a cross-level interaction.
