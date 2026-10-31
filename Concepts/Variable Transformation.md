---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:4945509860b4213a0b682133d12b76eb6d4be2ae947fcd58c610fa7d236b6d44
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.4.1 printed pp.11-12 (logging continuous predictors in a log-link model; coefficient as a power; AOI example; driver-age U shape); §5.1.3 printed p.45; §5.4-5.4.4 printed pp.48-54 (binning, polynomial terms erratic at the edges, hinge functions, partial residual plots), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021; CAS-hosted copy), §3.3.3 PDF pp.104-106 (non-linearity seen in residual plots, transform the predictors with log X, sqrt X, X^2; transform the response with log Y or sqrt Y); §6.2.1 printed p.239 (standardize before ridge), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "SOA, Exam SRM syllabus, January 2027, outcome 2e, p.3, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Variable Transformation.md
---

A **Variable Transformation** replaces a predictor $x$ with a function of it, $h(x)$, so that its relationship with the response is captured by a model that is linear on the scale of the [[Link Function|link]].

> $$g(\mu) = \beta_0 + \beta_1\,h(x) + \cdots$$
>
> $$h(x) = \ln x \quad \Rightarrow \quad \mu \propto x^{\beta_1} \text{ (log link)}$$

- $\mu = E[Y]$, $g$ is the link, and $h$ is the transformation. Under a log link a *logged* predictor gives a power curve: doubling $x$ multiplies the mean by $2^{\beta_1}$, whatever the starting value of $x$
- **Log**: for positive, right-skewed predictors whose effect is proportional (amount of insurance, building value). With a log link this is usually the natural first choice
- **Binning (banding)**: cut a continuous variable into groups and fit a level for each, treating it as a [[Categorical Predictor|categorical predictor]]. Captures any shape, but spends a parameter per band and ignores the ordering within one
- **Polynomial** ($x$, $x^2$, …) and **piecewise linear** (hinge) terms: fit a curve with a few parameters. Polynomials can behave badly at the edges of the data
- Before a penalized fit such as ridge regression, **standardizing**, $(x - \bar{x})/s_x$, puts predictors on a common scale
- The need for a transformation shows up in [[Exploratory Data Analysis]] and in a [[Residual Plot]] against the predictor — a curve where there should be none

> [!example]- Interpreting a Logged Predictor {Example}
> A severity GLM with a log link includes $\ln(\text{Amount of Insurance})$ with coefficient $\hat{\beta} = 0.6$. By how much does expected severity change when the amount of insurance doubles, and when it rises by $50\%$?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mu &\propto \text{AOI}^{0.6} \\
> > \text{Doubling:}\quad 2^{0.6} &= 1.516 \\
> > \text{50\% increase:}\quad 1.5^{0.6} &= 1.275
> > \end{align*}
> > $$
> > Doubling the amount of insurance raises expected severity by about $52\%$, and a $50\%$ increase raises it by about $27\%$. Severity grows **less than proportionally** ($\hat{\beta} < 1$): larger properties rarely burn to the ground, so their average claim is a smaller share of the amount insured.

> [!example]- Binning a Non-Linear Effect {Example}
> A frequency model's residuals show that the effect of driver age is high for young drivers, falls through middle age, and rises again after $75$. A single linear term for age is fitted. What is wrong, and what are the options?
>
> > [!answer]-
> > A linear term forces the effect to move in one direction, so it cannot capture a **U-shape**; it will understate the risk at both ends. The options:
> >
> > - **Bin** age (for example $16$–$20$, $21$–$25$, …, $76+$) and fit a level per band. This is flexible and easy to explain, but the bands need enough exposure to be credible.
> > - Add **polynomial** or **hinge** terms (such as $\max(0, \text{age} - 75)$) to bend the line with fewer parameters.
> >
> > Either way, choose between them on **hold-out** performance rather than training fit, which always favours more parameters.
