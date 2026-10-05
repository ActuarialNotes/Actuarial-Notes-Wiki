---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:5bdba8014c70d4126c942d8206702ebee41225507fd40142e1a8c208463cc8e7
  sources:
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26 'Scatter Plot', sha256:3232379f988c0b0a21dc0591503b480263e3ff7eb0190c9c2a622ddb09a4b9f9 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26.11 'Scatter Plot Matrix', sha256:8cc21d8e7eb4a8c19340d0358089efb945b82986dd29910a3c2e981aacd3c241 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatplma.htm"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.1.3 eq. 3.18 and R^2 = r^2, printed pp.70-71 (PDF pp.80-81); §3.3.3 non-constant variance (funnel), high leverage points, collinearity, printed pp.96-102 (PDF pp.106-112); §2.3.5 pairs() scatterplot matrix, printed p.51 (PDF p.62), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services), Ch.4 §5 'Covariance and Correlation' (definition; properties incl. -1<=cor<=1 and cor=±1 iff linear w.p.1; independent => uncorrelated, converse fails; indicator variables), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (rev. 6/29/2016), pp.1-2 ('QQ and Box Plots…', 'Tweedie Distributions'), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C Extended Linear Models, tasks 5 and 9, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
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
