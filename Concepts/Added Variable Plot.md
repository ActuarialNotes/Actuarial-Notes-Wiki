---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:3f315a47ca04ff0749bc08855c99dce2ee59c2b0150971bc14f0381e42a92e84
  sources:
    - "Weisberg, Computing Primer for Applied Linear Regression, 4th ed., Using R (2013), §3.1-3.1.2 pp.23-24: AV plot = residuals of y on the other regressor(s) vs residuals of x_j on them; its regression has intercept 0 and slope equal to x_j's coefficient in the full model; car::avPlots, sha256:ba7e3c9c947bb3354af65f57801b1e6f6f234a69a54f0f395c75a013bd850c9d — https://www.statpower.net/Content/313/R%20Stuff/alrprimer.pdf"
    - "StataCorp, Stata Base Reference Manual (release 19), [R] regress postestimation diagnostic plots, avplot Remarks pp.4-6: added-variable (partial-regression) plot; its regression has the same coefficient as the full model; 'cannot be used to identify functional form, or, at least, not well (see Mallows [1986]). In the construction of the added-variable plot, the relationship between y and x is forced to be linear.', sha256:2b6a9b898c73d0657d3ce7fbf18a7a23c507d01ad9c1d0543cf7689dc6aa734f — https://www.stata.com/manuals/rregresspostestimationdiagnosticplots.pdf"
    - "Wikipedia, 'Partial regression plot' (wikitext retrieved 2026-10-04), citing Velleman & Welsch (1981): construction from two sets of residuals; LS fit has intercept 0 and slope beta_i; its residuals equal the full model's; used mostly to identify high-leverage and influential points; 'the x-axis is not X_i. This limits its usefulness in determining the need for a transformation (which is the primary purpose of the partial residual plot)', sha256:8ecce810efb2f345c2582914e56ad6e8bd2d40dec1e403dd541a5481bc48011a — https://en.wikipedia.org/wiki/Partial_regression_plot"
    - "Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026): mmps 'Marginal Model Plotting' pp.89-91 (response vs a linear combination u of the regressors, with a smooth of the data and a smooth of the fitted values on u; drawn versus each term and versus the fitted values/linear predictor; GLM smoother is a GAM with the model's family and link); avPlots 'Added-Variable Plots' pp.11-14 (examples contrast 'marginal plot, ignoring other predictors' with 'AV plot, adjusting for others'); crPlots 'Component+Residual (Partial Residual) Plots' p.39, sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf"
    - "UCLA OARC, Regression with Stata, Chapter 2 'Regression Diagnostics': leverage > (2k+2)/n (k predictors); Cook's D conventional cut-off 4/n; avplot = added-variable/partial-regression plot, line has the coefficient's slope, used to spot influential points, sha256:de14ccf40c9e9eed21b92e1a9ed432a00abd13f6cb086b80b5af26900cdb30c — https://stats.oarc.ucla.edu/stata/webbooks/reg/chapter2/stata-webbooksregressionwith-statachapter-2-regression-diagnostics/"
    - "Weisberg, Applied Linear Regression, 4th ed. (Wiley 2014), Ch.9 'Regression Diagnostics' (course copy): intro p.204; §9.1.5 residual-plot shapes (megaphone = nonconstant variance, curvature = wrong mean function) pp.209-210; §9.5.1-9.5.3 Cook's distance D_i = (r_i^2/p')h_ii/(1-h_ii), the distance between Y-hat and Y-hat(i), D_i near 1 as calibration pp.220-221; §9.5.4 added-variable plots and influence pp.224-225; §9.6 normal probability plots pp.225-226, sha256:7ecdc82a05367d2107915fe0535c8cbf65a9f47d95ee80b8816e0c5903d507af — https://www2.stat.duke.edu/courses/Fall21/sta521.001/papers/Applied_Linear_Regression_CHAPTER_9_Regression_Diagnostics.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy), §3.3.3 'Potential Problems' pp.92-102 (PDF pp.102-112): residual plots, U-shape = non-linearity (Fig 3.9); correlated errors and tracking vs time (Fig 3.10); funnel = heteroscedasticity, log Y remedy (Fig 3.11); outliers, studentized residuals beyond ±3 (Fig 3.12); leverage statistic, average (p+1)/n (eq 3.37, Fig 3.13); VIF, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (p.7), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 3
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
