---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:10d50a2911d5aae991fa9ad96748e7191e6b5038c878ee365aacbe4eb2437df7
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.6.4 Considerations in High Dimensions, 6.4.1-6.4.4 (definition p>n and 'p slightly smaller than n'; perfect fit when p >= n; Fig.6.22 n=2 line; Fig.6.23 R2->1, training MSE->0, test MSE up; Cp/AIC/BIC unusable because sigma-hat^2 = 0, adjusted R2 of 1; forward stepwise, ridge, lasso, PCR; tuning crucial; curse of dimensionality; extreme multicollinearity, one of many models, report test-set or CV error) (printed pp.261-267, PDF pp.269-275)"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/High-Dimensional Data.md
---

**High-Dimensional Data** is a data set whose number of predictors $p$ is larger than, or close to, its number of observations $n$. When a least squares regression has at least as many coefficients as observations, $p + 1 \ge n$, it fits the training data exactly whether or not the predictors are related to the response:

> $$\text{RSS} = 0 \quad \text{and} \quad R^2 = 1$$

- $\text{RSS}$ is the [[Residual Sum of Squares|residual sum of squares]] and $R^2$ is the [[R-Squared|coefficient of determination]] on the training data.

The RSS never increases and $R^2$ never decreases as predictors are added, so on high-dimensional data they are no evidence of a good model. Adding predictors unrelated to the response drives the training MSE to 0 while the test MSE grows.

> [!example]- A least squares line $y = \beta_0 + \beta_1 x$ is fitted to two vehicles, with ages and loss costs $(2, 300)$ and $(5, 150)$. What are the fit and its $R^2$, and what does it predict for a 10-year-old vehicle? {Example}
> - Two coefficients and two observations give an exact fit through both points.
> - The slope is $(150 - 300)/(5 - 2) = -50$, and the intercept is $300 + 50(2) = 400$.
> - Both residuals are 0, so $\text{RSS} = 0$ and $R^2 = 1$.
> - The prediction for a 10-year-old vehicle is $400 - 50(10) = -100$, a negative loss cost.

## Estimating the error variance

The usual estimate of the error variance $\sigma^2$ is

> $$\hat\sigma^2 = \frac{\text{RSS}}{n - p - 1}$$

When $p$ is close to $n$, the estimate is near 0, and when $p + 1 \ge n$ it is undefined. $C_p$, [[AIC]] and [[BIC]] all use $\hat\sigma^2$, so they are unreliable on high-dimensional data, and so is adjusted $R^2$, which can reach 1. They are also computed on the same data used to choose the model.

## Methods for high-dimensional data

Less flexible methods are used on high-dimensional data: forward stepwise selection ([[Variable Selection|variable selection]]), ridge regression and the lasso ([[Regularization|regularization]]) and [[Principal Components Regression|principal components regression]]. Their penalty or their limit on the number of predictors keeps the fit from passing through every observation. The tuning parameter is chosen by [[Cross-Validation|cross-validation]], which estimates the test error even when $p > n$. The test error tends to rise as predictors are added unless they are truly associated with the response, which is called the curse of dimensionality.

## Interpreting the results

On high-dimensional data any predictor can be written as a linear combination of the others, so [[Multicollinearity|multicollinearity]] is extreme. A selected set of predictors is one of many sets that would predict about as well, and it is not shown to be the set that drives the response. The p-values and standard errors of a fit whose predictors were chosen because they fit the same data are not valid, because among many candidate predictors some noise predictors look highly significant by chance. Adjusted $R^2$ penalizes only the predictors in the final model, not the search over all the candidates, so it remains optimistic after a selection. The performance of the model is reported as its error on an independent test set or its cross-validated error, never as its fit to the training data.

High-dimensional data, with many predictors, are different from a [[High Dimensional Variables|high-dimensional variable]], a single categorical variable with so many levels that most of them have little data.

> [!trap] Reporting the training fit of a selected model
> A model with 12 of 3,000 candidate telematics predictors, fitted to 400 drivers, can have a training $R^2$ of 0.97 and very small p-values with no real predictive power. Only its test error or cross-validated error shows how well it predicts.
