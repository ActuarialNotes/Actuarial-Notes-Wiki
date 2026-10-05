---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:c0f0bffa0811d8afac9d426d7400b5d0d412cfdcd77b7b8ca71a1ac118090c53
  sources:
    - "Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026), mmps 'Marginal Model Plotting' pp.89-91: response on the vertical axis vs a linear combination u of the regressors, with a smooth of the data and a smooth of the fitted values on u; drawn versus each term and versus the fitted values (linear predictor for a GLM); GLM smoother a GAM with the model's family, link and weights, sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §5.4.1-5.4.3 pp.48-51 (non-linearity remedied by binning or polynomial terms), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Marginal Model Plot.md
---

A **Marginal Model Plot** is a regression diagnostic that overlays a smooth curve fit directly to the raw data against the smooth curve implied by the fitted [[Generalized Linear Model]], both plotted against a predictor or the fitted values — large divergence between the two curves signals model misspecification.

> $$\text{Marginal model plot: compare } \widehat{E}[Y \mid x] \text{ (data smooth) to } \hat{\mu}(x) \text{ (model smooth)}$$

- Unlike a [[Residual Plot]], which plots residuals, a marginal model plot directly compares two **fitted curves** — one nonparametric smooth of the data and one implied by the model — on the original response scale
- Close agreement between the two smooths across the range of $x$ indicates the model adequately captures the relationship; systematic gaps indicate missing [[Model Structure]] (e.g., a missing [[Interaction]] or a needed transformation)
- Marginal model plots can be drawn against any predictor, or against the fitted values to check overall calibration
- The same plot serves a GLM: the response stays on the vertical axis, the smoother is a generalized additive model with the model's own family, link and weights (the default in R's `car::mmps`), and the overall plot is drawn against the linear predictor

![[Media/Figures/Marginal_Model_Plot.svg|340]]

> [!example]- Detecting Missing Structure with a Marginal Model Plot {Example}
> A Gamma GLM models claim severity as a linear function of vehicle age. The marginal model plot shows the data smooth curving upward sharply for very new and very old vehicles, while the model's smooth (fit with a single linear term) stays nearly flat in those regions. What does this suggest?
>
> > [!answer]-
> > The divergence between the two smooths at the extremes of vehicle age indicates the linear term is **misspecified** — severity is not linear in vehicle age. A quadratic or banded term for vehicle age (richer [[Model Structure]]) would likely bring the model's smooth closer to the data smooth.
