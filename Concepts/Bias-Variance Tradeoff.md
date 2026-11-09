---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:3d3ff6181e24a6aaff5e81ef7a171c40d7fcaf603125033906b68e0335989372
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §2.2.1-2.2.2 (printed pp.29-36, PDF pp.40-47), eq (2.7) on printed p.34; §6 intro (printed p.226, PDF p.234); §6.2.1 ridge bias-variance, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §4.3 overfitting PDF p.49, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Dean, 'Topics in Credibility Theory', SOA STAM study note STAM-23-18, §1.1 (pp.10-11: X-bar unbiased for mu(theta); Z*X-bar + (1-Z)*mu minimizes expected squared error at Z = N/(N+K)), sha256:a45571885a311426c0d5a16e4d24b9d70d7ff5ff024c2b18f888d5bdaa16f352 — https://www.soa.org/globalassets/assets/Files/Edu/2018/2018-stam-23-18.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bias-Variance Tradeoff.md
---

![[Media/Figures/Bias-Variance_Tradeoff.svg|340]]

The **Bias-Variance Tradeoff** is the relationship between the [[Bias|bias]] and the [[Variance|variance]] of a fitted model as its flexibility changes: a more flexible model has lower bias and higher variance. The expected test mean squared error at a point $x_0$ is

> $$
> \begin{aligned}
> E\left[\left(y_0 - \hat{f}(x_0)\right)^{2}\right] &= \text{Var}\big(\hat{f}(x_0)\big) \\
> &\quad + \left[\text{Bias}\big(\hat{f}(x_0)\big)\right]^{2} \\
> &\quad + \text{Var}(\varepsilon)
> \end{aligned}
> $$

- $\hat{f}(x_0)$ is the model's prediction at $x_0$, and $y_0$ is the response there.
- $\text{Var}\big(\hat{f}(x_0)\big)$ is the variance of the prediction over the training sets the model could have been fitted to.
- $\text{Bias}\big(\hat{f}(x_0)\big)$ is $E\big[\hat{f}(x_0)\big] - f(x_0)$, the error from approximating the true function $f$ by the model.
- $\text{Var}(\varepsilon)$ is the irreducible error, the variance of the error term in $Y = f(X) + \varepsilon$.

No model can have an expected test MSE below $\text{Var}(\varepsilon)$.

> [!example]- At a point $x_0$ the irreducible error is 25. Model A has bias $-3$ and variance 16, and model B has bias $-6$ and variance 4. Which model has the lower expected test MSE? {Example}
> - The expected test MSE of model A is $16 + (-3)^2 + 25 = 50$.
> - The expected test MSE of model B is $4 + (-6)^2 + 25 = 65$.
> - Model A has the lower expected test MSE, although its variance is higher.

## Flexibility and the test MSE

The flexibility of a model is the range of shapes it can fit, and it grows with the model's degrees of freedom. [[Linear Regression|Linear regression]] is relatively inflexible, because it restricts the fit to a linear form. As flexibility increases:

1. The squared bias decreases.
2. The variance increases.
3. The training MSE decreases, because the fitting procedure minimizes it.
4. The test MSE first decreases and then increases, in a U-shape.

The expected test MSE curve lies above the sum of the variance and the squared bias by the constant $\text{Var}(\varepsilon)$. A model to the left of the minimum underfits: it is too inflexible to capture the true relationship, for example because important predictors are left out, and its error is high on both the training and the test data. A model to the right of the minimum overfits: it fits the noise in the training data, so its training error is low and its test error is high. The minimum of the test MSE, estimated by [[Cross-Validation|cross-validation]], marks the best flexibility.

Several methods trade bias for variance in the same way. Removing irrelevant predictors ([[Variable Selection|variable selection]]) or increasing the penalty of ridge regression ([[Regularization|regularization]]) reduces variance at the cost of bias, and the test error falls when the reduction in variance is larger than the added squared bias. A [[Decision Tree|decision tree]] with more splits has lower bias and higher variance. With few observations per class, [[Quadratic Discriminant Analysis|quadratic discriminant analysis]] has many parameters to estimate, so the less flexible [[Naive Bayes|naive Bayes]] classifier can have the lower test error.

> [!example]- A frequency model with territory in 8 groups has training deviance 2,400 and holdout deviance 2,510. With each of 220 postal codes as its own level, the training deviance is 1,950 and the holdout deviance is 2,890. Which model is overfitting? {Example}
> - The 220-level model has the lower training deviance, because it is the more flexible model.
> - Its holdout deviance is higher, 2,890 against 2,510, because most postal codes have too little data to estimate their own level, and the model has high variance.
> - The 220-level model is overfitting. The 8-group model accepts some bias for a large reduction in variance.

> [!trap] Choosing the model with the lowest training error
> The training error falls with every increase in flexibility, so the most flexible model always looks best on the training data. The model is chosen by its test error, or by an estimate of it such as the cross-validated error.
