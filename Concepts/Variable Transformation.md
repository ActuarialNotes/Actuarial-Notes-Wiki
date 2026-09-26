---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:39da5fddc5aed8a75306854e380458690dc458b428c45205adf5f2e9dc1dbc5a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variable Transformation.md
---

A **Variable Transformation** replaces a predictor $x$ with a function of it, $h(x)$, so that its relationship with the response is captured by a model that is linear on the scale of the [[Link Function|link]]. In a [[Generalized Linear Model]] the *response* is not transformed — the link and the error distribution handle its scale — so transformation is about the *predictors*.

> $$g(\mu) = \beta_0 + \beta_1\,h(x) + \cdots$$
>
> $$h(x) = \ln x \quad \Rightarrow \quad \mu \propto x^{\beta_1} \text{ (log link)}$$

- $\mu = E[Y]$, $g$ is the link, and $h$ is the transformation. Under a log link a *logged* predictor gives a power curve: doubling $x$ multiplies the mean by $2^{\beta_1}$, whatever the starting value of $x$
- **Log**: for positive, right-skewed predictors whose effect is proportional (amount of insurance, building value). With a log link this is usually the natural first choice
- **Binning (banding)**: cut a continuous variable into groups and fit a level for each, treating it as a [[Categorical Predictor|categorical predictor]]. Captures any shape, but spends a parameter per band and ignores the ordering within one
- **Polynomial** ($x$, $x^2$, …) and **piecewise linear** (hinge) terms: fit a curve with a few parameters. Polynomials can behave badly at the edges of the data
- **Capping** extreme predictor values before fitting stops a handful of points from driving the fit (see [[Outlier]]); **standardizing**, $(x - \bar{x})/s_x$, puts predictors on a common scale and helps when [[Interaction|interactions]] or penalties are used
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
