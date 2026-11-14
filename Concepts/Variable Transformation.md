---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:cdf755371f2d21b413fe94923139a3f8887a9db561c4dd8c6ddc100d96558871
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.4.1 printed pp.11-12 (logging continuous predictors in a log-link model; coefficient as a power; AOI example; driver-age U shape); §5.1.3 printed p.45; §5.4-5.4.4 printed pp.48-54 (binning, polynomial terms erratic at the edges, hinge functions, partial residual plots), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021; CAS-hosted copy), §3.3.3 PDF pp.104-106 (non-linearity seen in residual plots, transform the predictors with log X, sqrt X, X^2; transform the response with log Y or sqrt Y); §6.2.1 printed p.239 (standardize before ridge), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "SOA, Exam SRM syllabus, January 2027, outcome 2e, p.3, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Variable Transformation.md
---

A **Variable Transformation** replaces a predictor $x$ with a function of it, $h(x)$, so that its relationship with the response is captured by a model that is linear on the scale of the [[Link Function|link]]. The transformed predictor enters the linear predictor as

> $$g(\mu) = \beta_0 + \beta_1\,h(x) + \cdots$$

- $\mu = E[Y]$ is the mean response and $g$ is the link.

The need for a transformation shows up in [[Exploratory Data Analysis|exploratory data analysis]] and in a [[Residual Plot|residual plot]] against the predictor, as a curve where there should be none.

## Log transformation

A log suits positive, right-skewed predictors whose effect is proportional, such as amount of insurance or building value. With a log link it is usually the natural first choice. Under a log link with $h(x) = \ln x$, the mean is

> $$\mu \propto x^{\beta_1}$$

Doubling $x$ multiplies the mean by $2^{\beta_1}$, whatever the starting value of $x$.

> [!example]- A log-link severity GLM includes $\ln(\text{Amount of Insurance})$ with $\hat{\beta} = 0.6$. How does expected severity change when the amount of insurance doubles? {Example}
> - Expected severity is proportional to $\text{AOI}^{0.6}$.
> - Doubling the amount of insurance multiplies it by $2^{0.6} = 1.516$, an increase of about $52\%$.
> - A $50\%$ increase would multiply it by $1.5^{0.6} = 1.275$.
> - Severity grows less than proportionally because $\hat{\beta} < 1$. Larger properties rarely burn to the ground, so their average claim is a smaller share of the amount insured.

## Binning, polynomial and hinge terms

A single linear term forces the effect to move in one direction. Binning (banding) cuts a continuous variable into groups and fits a level for each, treating it as a [[Categorical Predictor|categorical predictor]]. It captures any shape, but spends a parameter per band and ignores the ordering within one. Polynomial terms ($x$, $x^2$, …) and piecewise linear (hinge) terms such as $\max(0, x - c)$ fit a curve with a few parameters. Polynomials can behave badly at the edges of the data.

> [!example]- What is wrong with a single linear term for this driver-age effect, and what are the options? {Example}
> A frequency model's residuals show that the effect of driver age is high for young drivers, falls through middle age, and rises again after 75.
>
> > [!answer]-
> > - A linear term forces the effect to move in one direction, so it cannot capture a **U-shape**; it will understate the risk at both ends.
> > - Binning age (for example $16$–$20$, $21$–$25$, …, $76+$) fits a level per band. This is flexible and easy to explain, but the bands need enough exposure to be credible.
> > - Polynomial or hinge terms, such as $\max(0, \text{age} - 75)$, bend the line with fewer parameters.
> > - Choose between them on hold-out performance rather than training fit, which always favours more parameters.

## Standardizing

Before a penalized fit such as ridge regression, **standardizing**, $(x - \bar{x})/s_x$, puts predictors on a common scale.

- $\bar{x}$ and $s_x$ are the predictor's sample mean and standard deviation.

The standardized predictor has mean 0 and standard deviation 1.

## Transforming the response

The response can be transformed too. When the residual spread grows with the fitted value, ISLR transforms the response with a concave function such as $\ln Y$ or $\sqrt{Y}$.
