---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:618a0ccab4b0c191153d6162f2e172bd4383c17b92906f0194af1b90dcf5aea1
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.3.3 'Collinearity' (correlation matrix detects pairwise collinearity; multicollinearity among three or more variables with no high pairwise correlation; VIF = 1/(1 - R^2_{Xj|X-j})), printed p.102 (PDF p.112), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26.11 'Scatterplot Matrix' (purpose: check pairwise relationships between variables), fetched 2026-10-05 (per-request Cloudflare token makes the hash fetch-specific), sha256:471a44f7e196205e2a95fb6e3a52bbf4c450be12163411f0a9791101bd9de043 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterb.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26 'Scatter Plot', fetched 2026-10-05, sha256:0828907b442403df9720ca82f9ed00c3b60431f45af818a4ee9d70970eee5de3 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm"
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
- A **scatter plot matrix** (all pairs of predictors) screens for *pairwise* collinearity, as the correlation matrix does — but it can miss [[Multicollinearity]], collinearity among three or more predictors when no pair is highly correlated; ISLR assesses that with the **variance inflation factor**, $\text{VIF}(\hat\beta_j) = 1/(1 - R^2_{X_j \mid X_{-j}})$, from regressing each predictor on all the others

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
