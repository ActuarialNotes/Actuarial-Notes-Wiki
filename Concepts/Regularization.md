---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0f2e088cd7606d39183a60f665492f47c11cda7311c2f10abcc9d3e79a7c1da6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Regularization.md
---

**Regularization** adds a penalty on coefficient size to the fitting criterion, shrinking estimates toward zero. It trades a little bias for a large reduction in variance — the [[Bias-Variance Tradeoff]] deliberately exploited.

> $$\text{Ridge:}\quad \min_{\beta}\ \mathrm{RSS} + \lambda\sum_{j=1}^{p}\beta_j^{2}$$
>
> $$\text{Lasso:}\quad \min_{\beta}\ \mathrm{RSS} + \lambda\sum_{j=1}^{p}\lvert\beta_j\rvert$$

- $\lambda = 0$ returns least squares; $\lambda \to \infty$ drives every coefficient to zero. $\lambda$ is chosen by [[Cross-Validation]]
- **Ridge** ($\ell_2$) shrinks all coefficients smoothly and keeps every predictor — good when many predictors each contribute a little, and the fix for collinearity
- **Lasso** ($\ell_1$) sets some coefficients exactly to zero, so it performs [[Variable Selection]] as part of the fit — good when the truth is sparse
- **Elastic net** mixes the two penalties, keeping lasso's selection while handling correlated predictors like ridge
- Predictors must be **standardized** first: the penalty is not scale-invariant, so a variable measured in thousands would otherwise be penalized differently from one measured in units
- The intercept is left unpenalized

![[Media/Figures/Regularization.svg|340]]

> [!example]- Ridge or Lasso? {Example}
> A rating model has 200 candidate telematics variables and 3,000 policies. The actuary believes only a handful actually matter and wants a deployable model. Which penalty, and what does the tuning look like?
>
> > [!answer]-
> > **Lasso.** The belief is sparsity, and lasso's $\ell_1$ penalty zeroes out the irrelevant variables, producing a model with a few predictors that can be filed and explained. Ridge would keep all 200 with small coefficients.
> > Standardize the predictors, fit over a grid of $\lambda$, and pick $\lambda$ by 10-fold CV — the one-standard-error rule if a simpler model is worth a little accuracy.
