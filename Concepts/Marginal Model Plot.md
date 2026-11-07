---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:5c053386a10961469561d506ccde7c1a867b41e849cf126c5ffa77ab52fac602
  sources:
    - "Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026), mmps 'Marginal Model Plotting' pp.89-91: response on the vertical axis vs a linear combination u of the regressors, with a smooth of the data and a smooth of the fitted values on u; drawn versus each term and versus the fitted values (linear predictor for a GLM); GLM smoother a GAM with the model's family, link and weights, sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §5.4.1-5.4.3 pp.48-51 (non-linearity remedied by binning or polynomial terms), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Lindsey & Sheather, 'Model fit assessment via marginal model plots', Stata Journal 10(2) 2010, pp.215-217 (k+1 plots, one per predictor and one for the linear form; good fit if lines match in each plot, not if significant disparity in any; model line E_M(y|a'x) = E{E_M(y|x)|a'x}), sha256:72fdd15b952940164d31d7bd8fee1562d37f145642ab5d67611d493d4b3d5189 — https://ageconsearch.umn.edu/record/152305/files/sjart_st0189.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Marginal Model Plot.md
---

![[Media/Figures/Marginal_Model_Plot.svg|340]]

A **Marginal Model Plot** is a diagnostic plot of the response against a single predictor, or against the fitted values, that overlays a smooth of the observed responses and a smooth of the model's fitted values. A marginal model plot for predictor $x_j$ is built in four steps:

1. Plot each observed response $y_i$ against $x_{ij}$.
2. Draw a smooth curve through the observed responses, the data smooth.
3. Draw a smooth curve through the fitted values $\hat{\mu}_i$ against $x_{ij}$, the model smooth.
4. Compare the two smooths across the range of $x_{ij}$.

Close agreement between the two smooths shows that the model captures the relationship between the response and that predictor. A systematic separation shows a misspecified functional form for the predictor, or other missing structure such as an [[Interaction|interaction]]. A [[Residual Plot|residual plot]] shows the same misfit as a pattern in the residuals, while a marginal model plot shows it on the scale of the response.

> [!example]- A Gamma GLM models claim severity with a linear term in vehicle age. In the marginal model plot for vehicle age, the data smooth curves upward for the newest and the oldest vehicles, while the model smooth is nearly flat there. What does this show? {Example}
> - The two smooths separate at both ends of vehicle age.
> - The linear term is a misspecified functional form, because the effect of vehicle age is curved.
> - A banded, quadratic or spline term for vehicle age would let the model smooth follow the data smooth.

## Reading a set of marginal model plots

A model is judged a good fit only when the two smooths agree in every plot: against each predictor and against the fitted values or linear predictor. A clear separation in any one plot means that the model does not fit. The plot against the linear predictor checks the fit along that one combination of the predictors only.

The data smooth is computed from the observed responses alone. Changing the model's predictors therefore changes the model smooth, but not the data smooth. For a [[Generalized Linear Model|GLM]], the response stays on the vertical axis, and the smooths are fitted with the model's own distribution and link.

> [!example]- A modeller adds a quadratic term in vehicle age to the model of the previous example and redraws the marginal model plot. Which smooth changes? {Example}
> - The data smooth is fitted to the observed severities, which have not changed.
> - The model smooth is fitted to the new model's fitted values, which now curve with vehicle age.
> - Only the model smooth changes, and the fit is better if it now follows the data smooth.
