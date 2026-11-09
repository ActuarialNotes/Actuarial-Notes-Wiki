---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:b21694774631bfdb025e4bd43e2f37580f12b966ece55abe67ca9562d0671319
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021, CAS-hosted copy), §2.2.1 eq. 2.6 and training MSE vs flexibility (PDF pp.41-43), §2.2.2 eq. 2.7 and 'never lie below Var(e)' (PDF p.45), §2.2.3 eq. 2.9 (PDF p.48), Ch 5 intro (PDF p.206), §5.1.1-5.1.4 eqs. 5.1-5.3, leverage, k = 5 or 10, LOOCV correlation (PDF pp.207-215), §5.2 eq. 5.8 (PDF p.220), §6.1.3 indirect adjustment of training error (PDF p.240), §8.2.1 OOB (PDF p.350), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), James reading list incl. Ch 2 (excl. §2.2.3) and Ch 5 (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Test Error.md
---

A **Test Error** is the average error of a fitted model's predictions for test observations, which were not used to fit the model. It measures how well the model predicts new data, which is the aim of [[Supervised Learning|supervised learning]]. For a quantitative response, the test mean squared error is

> $$\text{Test MSE} = \text{Ave}\left(y_0 - \hat{f}(x_0)\right)^{2}$$

- $(x_0, y_0)$ is a test observation, and $\hat{f}(x_0)$ is the model's prediction for it.
- $\text{Ave}$ is the average over the test observations.

The training mean squared error is the same average over the $n$ observations used to fit the model:

> $$\text{Training MSE} = \frac{1}{n}\sum_{i=1}^{n}\left(y_i - \hat{f}(x_i)\right)^{2}$$

The fitting procedure minimizes the training error, so the training MSE decreases, or does not increase, as the flexibility of the model increases. For the same reason, adding a parameter to a [[Generalized Linear Model|GLM]] never increases its residual [[Deviance|deviance]]. The training error therefore cannot choose between models of different flexibility. The test MSE first falls as flexibility increases and then rises once the model overfits, a U-shape explained by the [[Bias-Variance Tradeoff|bias-variance tradeoff]]. The model with the lowest test error is the best model.

> [!example]- Two severity models are compared by 5-fold cross-validation. Model A has training MSE 380 and fold MSEs 412, 398, 455, 430 and 405. Model B has training MSE 310 and fold MSEs 470, 380, 520, 445 and 435. Which model has the lower estimated test error? {Example}
> - The estimated test MSE of model A is the average of its fold MSEs, $2{,}100/5 = 420$.
> - The estimated test MSE of model B is $2{,}250/5 = 450$.
> - Model A has the lower estimated test error, although model B has the lower training error.

## Test error rate of a classifier

For a qualitative response, the test error rate is the proportion of test observations that the model misclassifies:

> $$\text{Test error rate} = \text{Ave}\left(I(y_0 \neq \hat{y}_0)\right)$$

- $\hat{y}_0$ is the predicted class of the test observation, and $y_0$ is its actual class.
- $I(y_0 \neq \hat{y}_0)$ is 1 when the two classes differ and 0 when they are the same.

> [!example]- A classifier predicts fraud for 200 test claims. It labels 12 legitimate claims as fraudulent and misses 8 fraudulent claims. What is its test error rate? {Example}
> - The classifier misclassifies $12 + 8 = 20$ of the 200 test claims.
> - The test error rate is $20/200 = 0.10$.

## Estimating the test error

When no separate test data are available, the test error is estimated by holding out part of the training data. The three methods of [[Cross-Validation|cross-validation]] compare as follows:

| Method | Model fits | Bias of the estimate | Variance of the estimate |
| --- | --- | --- | --- |
| Validation set | 1 | Highest, because the model is fitted to only part of the data | High, because it depends on the random split |
| $k$-fold cross-validation | $k$ | Moderate, because each fit uses $(k-1)/k$ of the data | Lower than leave-one-out |
| Leave-one-out cross-validation | $n$ | Lowest, because each fit uses $n - 1$ observations | Highest, because the $n$ fits are highly correlated |

A model fitted to fewer observations tends to fit worse, so an estimate from a smaller training set tends to overstate the test error of the model fitted to all the data. The $n$ training sets of leave-one-out cross-validation are nearly identical, so their errors are highly positively correlated, and the mean of highly correlated quantities has a higher variance. [[AIC]], [[BIC]] and $C_p$ estimate the test error only indirectly, by adding a penalty for the number of parameters to the training error. They are computed on the same data used to choose the model and rely on an estimate of the error variance, so they are unreliable when the number of predictors is large compared with $n$ ([[High-Dimensional Data|high-dimensional data]]).

> [!trap] Choosing the model with the lowest training error
> The most flexible model always has the lowest training error. In the example above, model B has the lower training MSE, 310 against 380, but the higher estimated test MSE, 450 against 420.
