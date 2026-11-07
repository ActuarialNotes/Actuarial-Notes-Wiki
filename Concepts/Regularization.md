---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:441ba9a30fa75d5b2c69ee3cc5a0be25b4463a6a26a82ba1f949cc64e7143801
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §3.3.3 collinearity remedies (PDF pp.112-113), §6.1.3 one-standard-error rule (PDF p.244), §6.2.1 eq. 6.5, unpenalized intercept, lambda limits, scaling eq. 6.6, bias-variance (PDF pp.245-249), §6.2.2 lasso variable selection (PDF p.250), eqs. 6.8-6.9 budget form, lambda<->s, s large = lambda 0, diamond/circle and corners on the axes (PDF pp.251-253), sparse vs many-predictor settings (PDF p.254), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Hastie, Qian & Tay, 'An Introduction to glmnet' (CRAN vignette, Sept 23 2026), Introduction (PDF pp.1-2: elastic net alpha; ridge shrinks correlated predictors toward each other, lasso picks one), sha256:f243d8d107c543e8dcc228c628c227af78d5a96bca6b96edc413fa48d94ebc9e — https://cran.r-project.org/web/packages/glmnet/vignettes/glmnet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list incl. Ch 6 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Regularization.md
---

![[Media/Figures/Regularization.svg|340]]

**Regularization** is the fitting of a model by minimizing its loss plus a penalty on the size of its coefficients, which shrinks the coefficient estimates toward 0. The loss is the [[Residual Sum of Squares|residual sum of squares]] for least squares and the [[Deviance|deviance]] for a [[Generalized Linear Model|GLM]], and the model keeps the same structure as the unpenalized fit. A tuning parameter $\lambda \ge 0$ sets the size of the penalty. The intercept $\beta_0$ is not penalized, so the overall level of the predictions is fitted to the data. Ridge regression and the lasso are regularized linear regressions, and they are [[Supervised Learning|supervised learning]] methods.

## Ridge regression

Ridge regression chooses the coefficient estimates that minimize

> $$\text{RSS} + \lambda \sum_{j=1}^{p} \beta_j^{2}$$

- $\beta_1, \ldots, \beta_p$ are the slope coefficients of the $p$ predictors.

At $\lambda = 0$ the penalty has no effect and the estimates are the least squares estimates. As $\lambda$ increases the estimates shrink toward 0, and they approach 0 as $\lambda \to \infty$, but for a finite $\lambda$ none is exactly 0. Ridge regression therefore keeps all $p$ predictors. Least squares estimates are scale equivariant: multiplying a predictor by $c$ multiplies its coefficient by $1/c$. Ridge estimates are not, so the predictors are standardized before the fit.

> [!example]- A ridge regression has one centred predictor, $x = -2, -1, 0, 1, 2$, and responses $y = -3, -1, 0, 2, 2$. What is the slope estimate at $\lambda = 0$ and at $\lambda = 10$? {Example}
> - The predictor and the responses both have mean 0, so the intercept estimate is 0, and minimizing the penalized RSS gives the slope estimate
>
> $$\hat\beta = \frac{\sum x_i y_i}{\sum x_i^2 + \lambda}$$
>
> - Here $\sum x_i y_i = 13$ and $\sum x_i^2 = 10$.
> - At $\lambda = 0$ the estimate is the least squares slope, $13/10 = 1.3$.
> - At $\lambda = 10$ the estimate shrinks to $13/20 = 0.65$.

## The lasso

The lasso chooses the coefficient estimates that minimize

> $$\text{RSS} + \lambda \sum_{j=1}^{p} \lvert\beta_j\rvert$$

The lasso penalty is the $\ell_1$ penalty and the ridge penalty is the $\ell_2$ penalty. When $\lambda$ is large enough, the lasso sets some coefficient estimates exactly to 0, so it performs [[Variable Selection|variable selection]] and gives a model with no more predictors than ridge regression. The lasso is less flexible than least squares, and it gives a simpler model that is easier to interpret.

## Budget form of ridge regression and the lasso

Ridge regression and the lasso can also be written with a budget $s$ in place of the penalty. Ridge regression minimizes the RSS subject to

> $$\sum_{j=1}^{p} \beta_j^{2} \le s$$

and the lasso minimizes the RSS subject to

> $$\sum_{j=1}^{p} \lvert\beta_j\rvert \le s$$

- $s$ is the budget, and each value of $\lambda$ corresponds to a value of $s$.

A larger budget is a smaller penalty. As $s$ increases the model becomes more flexible, and a budget large enough to contain the least squares estimates gives the least squares fit. With two predictors, the lasso region is a diamond with corners on the axes and the ridge region is a circle. The contours of the RSS often touch the diamond first at a corner, where one coefficient is 0, which is why the lasso gives estimates of exactly 0.

> [!example]- Five candidate pairs $(\beta_1, \beta_2)$ have the RSS values below. Which pair is the lasso estimate with budget $s = 1$, and which is the ridge estimate with $s = 1$? {Example}
>
> | $\beta_1$ | $\beta_2$ | RSS |
> | --- | --- | --- |
> | 1.2 | 0.6 | 10 |
> | 0.8 | 0.3 | 14 |
> | 0.5 | $-0.5$ | 15 |
> | 0.6 | 0.2 | 18 |
> | 0.4 | 0.4 | 19 |
>
> - The constraint is checked first, and among the pairs that meet it the one with the smallest RSS is chosen.
> - The sums $\lvert\beta_1\rvert + \lvert\beta_2\rvert$ are 1.8, 1.1, 1.0, 0.8 and 0.8, so the lasso allows the last three pairs, and its estimate is $(0.5, -0.5)$ with RSS 15.
> - The sums $\beta_1^2 + \beta_2^2$ are 1.80, 0.73, 0.50, 0.40 and 0.32, so ridge regression allows the last four pairs, and its estimate is $(0.8, 0.3)$ with RSS 14.

## Choosing the tuning parameter

The tuning parameter $\lambda$ is chosen by [[Cross-Validation|cross-validation]]: the cross-validated error is computed over a grid of values of $\lambda$, and the value with the smallest error is chosen. Increasing $\lambda$ reduces the variance of the fit and increases its bias, so the training MSE rises from its minimum at $\lambda = 0$ while the test MSE is U-shaped in $\lambda$. Regularization helps most when the reduction in variance is larger than the added squared bias, for example when the predictors are highly correlated and the least squares estimates are very large and unstable.

## Elastic net

The elastic net penalty is a weighted average of the lasso and ridge penalties. With a mixing weight $\alpha$ between 0 and 1, the elastic net minimizes the loss plus

> $$\lambda \left[\alpha \sum_{j=1}^{p} \lvert\beta_j\rvert + \frac{1 - \alpha}{2} \sum_{j=1}^{p} \beta_j^{2}\right]$$

- $\alpha = 1$ gives the lasso, and $\alpha = 0$ gives ridge regression with penalty $\lambda/2$.

The elastic net can set coefficients to 0, like the lasso, and it shrinks the coefficients of correlated predictors toward each other, like ridge regression. Both $\lambda$ and $\alpha$ are chosen by cross-validation.

> [!trap] Expecting ridge regression to drop predictors
> Ridge regression shrinks every coefficient toward 0 but leaves all of them non-zero. Of ridge regression and the lasso, only the lasso performs variable selection.
