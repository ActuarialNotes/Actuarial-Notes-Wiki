---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:3f315a47ca04ff0749bc08855c99dce2ee59c2b0150971bc14f0381e42a92e84
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

An **Added Variable Plot** (partial regression plot) isolates the relationship between a single predictor $x_j$ and the response after removing (partialling out) the linear effects of all other predictors in the model — used to see $x_j$'s adjusted effect and to spot influential observations.

> $$e_Y = Y - \hat{Y}^{(-j)}, \qquad e_{x_j} = x_j - \hat{x}_j^{(-j)}$$
>
> $$\text{Plot } e_Y \text{ vs. } e_{x_j} \text{; the slope equals } \hat{\beta}_j \text{ from the full model}$$

- $\hat{Y}^{(-j)}$ and $\hat{x}_j^{(-j)}$ are the fitted values from regressing $Y$, and $x_j$ respectively, on all *other* predictors — the residuals $e_Y$ and $e_{x_j}$ represent what's left after removing those other predictors' effects
- The least squares line through the plot has intercept $0$ and slope $\hat{\beta}_j$, and its residuals are the full model's residuals. Curvature can flag non-linearity in $x_j$, but the plot is a weak guide to the functional form: its horizontal axis is not $x_j$, and its construction forces the relationship to be linear. A partial residual (component + residual) plot is the tool for choosing a transformation
- Unlike a simple scatter plot of $Y$ against $x_j$, the added variable plot isolates $x_j$'s **partial** (adjusted) contribution after controlling for the other predictors, including any [[Control Variable]]s
- Points far out on the $e_{x_j}$ axis are high-leverage observations for $x_j$; points far from the fitted line are outliers (large residuals). A point that is both — at the left or right of the plot and off the general trend — is likely influential and worth investigating, complementing what a [[Residual Plot]] shows for overall fit

![[Media/Figures/Added_Variable_Plot.svg|340]]

> [!example]- Reading an Added Variable Plot {Example}
> The added variable plot for vehicle age (after controlling for territory and driver age) shows a clear U-shape rather than a straight line. What does this indicate, and what model change would address it?
>
> > [!answer]-
> > The U-shape suggests that vehicle age's effect on the response, net of the other predictors, is **not linear**, so a single linear term may be misspecified. An added variable plot is only a rough guide to the form, so confirm the curve with a partial residual plot of vehicle age; if it is there, a quadratic term (or banding vehicle age) in the [[Model Structure]] would capture the relationship better.
