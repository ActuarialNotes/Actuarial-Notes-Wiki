A **Marginal Model Plot** is a regression diagnostic that overlays a smooth curve fit directly to the raw data against the smooth curve implied by the fitted [[Generalized Linear Model]], both plotted against a predictor or the fitted values — large divergence between the two curves signals model misspecification.

> $$\text{Marginal model plot: compare } \widehat{E}[Y \mid x] \text{ (data smooth) to } \hat{\mu}(x) \text{ (model smooth)}$$

- Unlike a [[Residual Plot]], which plots residuals, a marginal model plot directly compares two **fitted curves** — one nonparametric smooth of the data and one implied by the model — on the original response scale
- Close agreement between the two smooths across the range of $x$ indicates the model adequately captures the relationship; systematic gaps indicate missing [[Model Structure]] (e.g., a missing [[Interaction]] or a needed transformation)
- Marginal model plots can be drawn against any predictor, or against the fitted values to check overall calibration
- Especially useful for GLMs, where raw residuals on the link scale can be harder to interpret directly than a comparison of fitted-vs-actual curves

> [!example]- Detecting Missing Structure with a Marginal Model Plot {Example}
> A Gamma GLM models claim severity as a linear function of vehicle age. The marginal model plot shows the data smooth curving upward sharply for very new and very old vehicles, while the model's smooth (fit with a single linear term) stays nearly flat in those regions. What does this suggest?
>
> > [!answer]-
> > The divergence between the two smooths at the extremes of vehicle age indicates the linear term is **misspecified** — severity is not linear in vehicle age. A quadratic or banded term for vehicle age (richer [[Model Structure]]) would likely bring the model's smooth closer to the data smooth.
