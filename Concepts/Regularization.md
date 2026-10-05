---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:0f2e088cd7606d39183a60f665492f47c11cda7311c2f10abcc9d3e79a7c1da6
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §3.3.3 (PDF pp.112-113), §6.1.3 one-standard-error rule (PDF p.244), §6.2.1-6.2.3 eqs. 6.5-6.9 incl. scaling eq. 6.6, unpenalized intercept, bias-variance (PDF pp.245-258), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Hastie, Qian & Tay, 'An Introduction to glmnet' (CRAN vignette, Sept 23 2026), Introduction (PDF pp.1-2), sha256:f243d8d107c543e8dcc228c628c227af78d5a96bca6b96edc413fa48d94ebc9e — https://cran.r-project.org/web/packages/glmnet/vignettes/glmnet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list incl. Ch 6 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 2
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
