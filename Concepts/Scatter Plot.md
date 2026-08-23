---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5bdba8014c70d4126c942d8206702ebee41225507fd40142e1a8c208463cc8e7
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Scatter Plot.md
---

A **Scatter Plot** is an [[Exploratory Data Analysis]] display of two variables at once: each observation is one point at $(x_i, y_i)$. It is the standard first look at the relationship between a continuous predictor and the response, before any model is fitted.

> $$\{(x_i, y_i)\}_{i=1}^n \quad \text{plotted in the plane}$$

- What to read off it: **direction** (up or down), **form** (straight or curved), **strength** (tight or diffuse), and **outliers** that sit away from the cloud
- Strength in the *linear* direction is summarized by the [[Correlation]] coefficient $r$ — but $r$ near $0$ only rules out a linear trend, not a U-shape
- Systematic curvature says the predictor needs a transformation ($\ln x$, $x^2$, or banding) in the [[Model Structure]]; a fan that widens to the right says the variance grows with the mean, which is an argument for a [[Generalized Linear Model]] rather than [[Linear Regression]]
- A point far out in $x$ has **high leverage** — on its own it can bend the fitted line, so it deserves a look before it is left in
- With many overlapping points, plot on a log scale, add transparency, or bin the $x$-axis and plot group means; a solid black blob shows nothing
- A **scatter plot matrix** (all pairs of predictors) is the fastest screen for [[Multicollinearity]]

![[Media/Figures/Scatter_Plot.svg|340]]

> [!example]- Reading Curvature into the Model {Example}
> A scatter plot of pure premium against driver age shows high values for young drivers, a broad minimum around age $45$, and a rise again past $70$. The fitted correlation is $r = -0.04$. Should driver age be dropped?
>
> > [!answer]-
> > No. The near-zero [[Correlation]] measures only the *linear* association, and a U-shape has almost no linear component. Age is clearly predictive; it just needs the right structure — band it into a [[Categorical Predictor]], or include a quadratic term $\beta_1\,\text{age} + \beta_2\,\text{age}^2$. Dropping a variable on the strength of $r$ alone is the classic scatter-plot mistake.

> [!example]- Spotting Non-Constant Variance {Example}
> Claim severity is plotted against insured value. The points form an upward wedge: tight near the origin, spreading to a wide band at high insured values. What does the plot rule out?
>
> > [!answer]-
> > It rules out the **constant-variance assumption** of ordinary [[Linear Regression]]. Variance increasing with the mean is the signature of a [[Gamma]] response (where the standard deviation is proportional to the mean), so a Gamma [[Generalized Linear Model]] with a log [[Link Function]] is the natural fit. The same wedge would show up afterwards in a [[Residual Plot]] if the ordinary model were used.
