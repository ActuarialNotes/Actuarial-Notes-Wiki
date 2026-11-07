---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:8fbd6c7ace17e35b4e91bd2d858a066bcd4cc289fb755443e85a26b2bf0ace54
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.3.3 'Collinearity' (correlation matrix detects pairwise collinearity; multicollinearity among three or more variables with no high pairwise correlation; VIF = 1/(1 - R^2_{Xj|X-j})), printed p.102 (PDF p.112), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26.11 'Scatterplot Matrix' (purpose: check pairwise relationships between variables), fetched 2026-10-05 (per-request Cloudflare token makes the hash fetch-specific), sha256:471a44f7e196205e2a95fb6e3a52bbf4c450be12163411f0a9791101bd9de043 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterb.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26 'Scatter Plot', fetched 2026-10-05, sha256:0828907b442403df9720ca82f9ed00c3b60431f45af818a4ee9d70970eee5de3 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm"
    - "ISLR 2nd ed., §3.3.1 dummy variables printed pp.83-84 and §3.3.2 eq.(3.34) and Figure 3.7 printed p.90 (a two-level qualitative predictor amounts to two parallel lines with different intercepts and the same slope), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §1.3.3.26.1 'Scatter Plot: No Relationship' (Y ranges all over the place for a given X, at every X; conclusion: no relationship), fetched 2026-10-30 — https://www.itl.nist.gov/div898/handbook/eda/section3/scatter1.htm"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Scatter Plot.md
---

![[Media/Figures/Scatter_Plot.svg|340]]

A **Scatter Plot** is a graph of two variables in which each observation is a point at $(x_i, y_i)$. It shows the relationship between the two variables, not how either changes over time, and in [[Exploratory Data Analysis|exploratory data analysis]] it is the first look at how the response depends on a continuous predictor. A [[Histogram|histogram]] of the predictor shows only the predictor's own distribution, so the shape of its relationship with the response is read from the scatter plot.

A scatter plot of the response against a predictor shows:

1. The direction of the relationship, upward or downward.
2. Its form, straight or curved.
3. Its strength, how tightly the points cluster around the trend.
4. Its spread, whether the scatter about the trend is constant or changes with the predictor.
5. Unusual points, such as an [[Outlier|outlier]] or a point far out in $x$.

The patterns it shows lead to these choices in the model:

| Pattern | Meaning | Model choice |
| --- | --- | --- |
| Straight band of constant width | Linear relationship, constant variance | A linear term in a linear regression |
| Curved band of constant width | Nonlinear relationship | A transformation, a polynomial term or banding of the predictor |
| Wedge that widens as the mean rises | Variance grows with the mean | A gamma GLM with a log link, or a transformed response |
| Two parallel bands | A missing categorical predictor | An indicator that shifts the intercept for one group |
| Shapeless cloud | No relationship | The predictor tells nothing about the response |

The sample [[Correlation|correlation]] $r$ summarizes only the linear part of the relationship, so a strong curved relationship can have $r$ near zero. A curved relationship is entered in the model through a transformation of the predictor, [[Polynomial Regression|polynomial regression]] or banding.

> [!example]- A scatter plot of pure premium against driver age is high for young drivers, lowest around age 45 and rises again past 70. The correlation is $r = -0.04$. Should driver age be dropped from the model? {Example}
> - The correlation measures only linear association, and a U-shape has almost no linear component, so $r$ near zero does not mean age is unrelated to pure premium.
> - The plot shows a strong curved relationship.
> - Driver age should be kept, banded into categories or entered with a quadratic or spline term.

> [!example]- Claim severity plotted against insured value forms a wedge, narrow at small insured values and wide at large ones. What does the plot show about a linear regression? {Example}
> - The centre of the wedge is linear, but the spread grows with the mean.
> - The constant-variance assumption of ordinary least squares fails.
> - A [[Gamma|gamma]] [[Generalized Linear Model|GLM]] with a log link, whose variance is proportional to the square of the mean, fits this pattern.

## High-leverage points

A point whose predictor value is far from the others has high [[Hat Matrix#Leverage|leverage]]. It pulls the least squares line toward itself, so its residual can be small, and with few observations it can dominate both the fitted slope and the correlation. A high-leverage point should be investigated, for a data error or a different kind of risk, before it is allowed to drive the fit. It should not be removed only for being extreme.

> [!example]- Four points show no trend, and a fifth point lies far to the right and high. The correlation of all five is 0.90. What should the analyst do? {Example}
> - The fifth point has high leverage, so the correlation and the slope may rest on it alone.
> - Recomputing without it shows whether the relationship holds in the rest of the data.
> - The point is checked for a data error or a different kind of risk before the model is allowed to depend on it.

## Scatter plot matrix

A scatter plot matrix shows a scatter plot for every pair of variables. Among the predictors, it screens for pairs that are strongly related, as a correlation matrix does. Both show only pairs, so they can miss [[Multicollinearity|multicollinearity]] among three or more predictors, which the variance inflation factor detects.

## Overplotting

When many points overlap, the plot becomes a solid mass that shows nothing. Plotting on a log scale, making the points transparent so that dense regions appear darker, or binning the predictor and plotting the group means of the response all restore the pattern. Transparency suits smaller data sets, and binning suits very large ones.
