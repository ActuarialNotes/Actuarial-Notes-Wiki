---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:df48c05237e82c23ef9aada5460daa3c25aa1716bfcd4e71e1b410dcee0bc453
  sources:
    - "StataCorp, Stata Base Reference Manual (release 19), [R] regress postestimation diagnostic plots, avplot Remarks p.5 (PDF p.5): an AV plot's regression has the same coefficient and SE as the full model; its coordinates 'cannot be used to identify functional form, or, at least, not well'; 'the relationship between y and x is forced to be linear', sha256:2b6a9b898c73d0657d3ce7fbf18a7a23c507d01ad9c1d0543cf7689dc6aa734f — https://www.stata.com/manuals/rregresspostestimationdiagnosticplots.pdf"
    - "Wikipedia, 'Partial regression plot' (citing Velleman & Welsch 1981), Properties 1-4 and the comparison with partial residual plots: LS fit has intercept 0 and slope beta_i; its residuals equal the full model's; mostly used for leverage and influential points; 'the x-axis is not X_i. This limits its usefulness in determining the need for a transformation (which is the primary purpose of the partial residual plot)', sha256:8ecce810efb2f345c2582914e56ad6e8bd2d40dec1e403dd541a5481bc48011a — https://en.wikipedia.org/wiki/Partial_regression_plot"
    - "Weisberg, Applied Linear Regression, 4th ed. (Wiley 2014), Ch.9 'Regression Diagnostics' (course copy), §9.5.4 p.224 (PDF 21): points at the left or right of an AV plot that do not match the general trend are likely to be influential, sha256:7ecdc82a05367d2107915fe0535c8cbf65a9f47d95ee80b8816e0c5903d507af — https://www2.stat.duke.edu/courses/Fall21/sta521.001/papers/Applied_Linear_Regression_CHAPTER_9_Regression_Diagnostics.pdf"
    - "Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026), avPlots examples p.14 ('marginal plot, ignoring other predictors' vs 'AV plot, adjusting for others'); crPlots 'Component+Residual (Partial Residual) Plots' p.39, sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §5.4.1-5.4.3 pp.48-51 (PDF 58-61: partial residual plots detect non-linearity; binning and polynomial terms), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.3.3 pp.97-99 (PDF 107-109: outlier vs high leverage), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "UCLA OARC, Regression with Stata, Chapter 2 'Regression Diagnostics': leverage > (2k+2)/n (k predictors); Cook's D conventional cut-off 4/n; avplot used to spot influential points, sha256:de14fccf40c9e9eed21b92e1a9ed432a00abd13f6cb086b80b5af26900cdb30c — https://stats.oarc.ucla.edu/stata/webbooks/reg/chapter2/stata-webbooksregressionwith-statachapter-2-regression-diagnostics/"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Added Variable Plot.md
---

![[Media/Figures/Added_Variable_Plot.svg|340]]

An **Added Variable Plot** (partial regression plot) is a plot of the response adjusted for all the other predictors against one predictor $x_j$ adjusted for all the other predictors. It shows the effect of $x_j$ in the full [[Linear Regression|multiple regression]]. The added variable plot for $x_j$ is built in three steps:

1. Regress the response $y$ on all the predictors except $x_j$, and keep the residuals $e_i^{(y)}$.
2. Regress $x_j$ on the same other predictors, and keep the residuals $e_i^{(x_j)}$.
3. Plot $e_i^{(y)}$ against $e_i^{(x_j)}$.

The least squares line through the plot is

> $$e_i^{(y)} = \hat{\beta}_j\, e_i^{(x_j)} + e_i$$

- $\hat{\beta}_j$ is the coefficient of $x_j$ in the full multiple regression.
- $e_i$ is the residual of observation $i$ in the full multiple regression.

The line has intercept zero, because residuals from a least squares regression with an intercept average zero. By the Frisch–Waugh result, its slope is the full model's coefficient $\hat{\beta}_j$, and its residuals are the full model's residuals.

> [!example]- A simple regression of claim cost on vehicle value alone gives a slope of 1.8. In the multiple regression of claim cost on vehicle value and driver age, the coefficient of vehicle value is 0.6. What line is fitted through the added variable plot for vehicle value? {Example}
> - The slope of the line is the coefficient in the full multiple regression, 0.6.
> - The intercept of the line is zero.
> - The simple regression's slope of 1.8 is a marginal effect, which includes what vehicle value shares with driver age, so it differs from the adjusted coefficient.

## Leverage and outliers in an added variable plot

A point far along the horizontal axis has a value of $x_j$ that is unusual given the other predictors, so it has high leverage for $\hat{\beta}_j$. A point far from the fitted line is an [[Outlier|outlier]]. A point that is both can move the slope a great deal and should be investigated.

## Partial residual plot

An added variable plot is a weak guide to the functional form of $x_j$, because its horizontal axis is not $x_j$ and its construction forces the relationship to be linear. The plot for judging the functional form, or a needed transformation, is the partial residual (component plus residual) plot. Its vertical coordinate is

> $$e_i + \hat{\beta}_j x_{ij}$$

- $e_i$ is the residual of the full model, the working residual in a [[Generalized Linear Model|GLM]].
- $\hat{\beta}_j x_{ij}$ is the fitted linear contribution of $x_j$.

This is plotted against $x_{ij}$ itself. Curvature, or a systematic departure from the fitted line, shows that the linear term in $x_j$ is not appropriate. One remedy is to group $x_j$ into bins treated as a categorical predictor, so that each bin has its own coefficient, with the bin boundaries placed where the partial residuals change their pattern.

> [!example]- In a frequency GLM, the partial residual plot for driver age is flat from age 25 to age 65 but rises steeply below 25 and above 65. What should replace the linear term in driver age? {Example}
> - The partial residuals curve away from the fitted line, so a single linear term is not appropriate.
> - The pattern changes at about age 25 and age 65.
> - Group driver age into three bins, below 25, 25 to 65, and above 65, each with its own coefficient.
