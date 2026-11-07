---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:d42ecd8753e1c8cc277edcf357f6354a0fae70f40ecdd36b2908332e570996f8
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.1 eq (3.3)-(3.4) printed p.62 (PDF p.72); §3.1.2 eqs (3.8), (3.14) and footnote 3, printed pp.66-67 (PDF pp.76-77); §3.2.1 eq (3.22) printed p.72; §3.3.3 outliers/high leverage/collinearity printed pp.97-102 (PDF pp.107-112), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1 normal equations X'X b = X'y and (2.7); §2.2.2 unbiasedness, var = (X'X)^-1 sigma², BLUE, MLE under normality; §2.2.3 RSS/(n-p); §2.3.1 t with n-p df, PDF pp.6-10, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.2 IRLS: b = (X'WX)^-1 X'Wz, PDF pp.4-5, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models (4th ed., CRC 2018) — publisher preview, §1.6.3 'Least squares estimation' printed pp.15-16 (PDF pp.32-33), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 5 §5.4 matrix formulation, least squares estimates b = (X'X)^-1 X'Y, linear dependence, sha256:c7eb1ac675fffa3493ca7644a47f8a36e96fa53d301d2f8191c7ac4ca82edec6 — https://online.stat.psu.edu/stat501/Lesson05.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ordinary Least Squares.md
---

**Ordinary Least Squares** is the method of estimating the coefficients of a [[Linear Regression|linear regression]] by choosing the values that minimize the [[Residual Sum of Squares|residual sum of squares]]. For $n$ observations and $p$ predictors, the least squares estimates $\hat\beta_0, \ldots, \hat\beta_p$ are the values of $\beta_0, \ldots, \beta_p$ that minimize

> $$\text{RSS} = \sum_{i=1}^{n} \left(y_i - \beta_0 - \beta_1 x_{i1} - \cdots - \beta_p x_{ip}\right)^2$$

- $y_i$ is the observed response of observation $i$, and $x_{ij}$ is its value of predictor $j$.

At the estimates, each term of the sum is the square of a [[Residual|residual]], $e_i = y_i - \hat{y}_i$.

## Simple linear regression

With one predictor, the least squares slope is

> $$\hat\beta_1 = \frac{\sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n} (x_i - \bar{x})^2}$$

- $\bar{x}$ and $\bar{y}$ are the sample means of the $x_i$ and the $y_i$.

and the least squares intercept is

> $$\hat\beta_0 = \bar{y} - \hat\beta_1 \bar{x}$$

The fitted line therefore passes through the point of means $(\bar{x}, \bar{y})$. Dividing the top and the bottom of $\hat\beta_1$ by $n$ gives the same slope as the sample covariance of $x$ and $y$ divided by the sample variance of $x$:

> $$\hat\beta_1 = \frac{\overline{xy} - \bar{x}\,\bar{y}}{\overline{x^2} - \bar{x}^2}$$

- $\overline{xy}$ is the mean of the products $x_i y_i$, and $\overline{x^2}$ is the mean of the squares $x_i^2$.

> [!example]- Average claim severity, in thousands, for years $x = 1, 2, 3, 4, 5$ is $10.0$, $10.6$, $11.1$, $11.9$ and $12.4$. What is the least squares line, and what severity does it project for year 6? {Example}
> - The sample means are $\bar{x} = 3$ and $\bar{y} = 56.0/5 = 11.2$.
> - The deviations of $x$ are $-2, -1, 0, 1, 2$, so $\sum (x_i - \bar{x})^2 = 10$.
> - The products of the deviations of $x$ and $y$ are $2.4$, $0.6$, $0$, $0.7$ and $2.4$, so $\sum (x_i - \bar{x})(y_i - \bar{y}) = 6.1$.
> - The slope is $\hat\beta_1 = 6.1/10 = 0.61$, and the intercept is $\hat\beta_0 = 11.2 - 0.61(3) = 9.37$.
> - The projected severity for year 6 is $9.37 + 0.61(6) = 13.03$ thousand.

## Matrix form of the estimates

In matrix form the least squares estimate of the coefficient vector is

> $$\hat{\boldsymbol\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$$

- $\mathbf{X}$ is the $n \times (p + 1)$ [[Design Matrix|design matrix]], and $\mathbf{y}$ is the vector of observed responses.
- $\mathbf{X}^T\mathbf{X}$ must be invertible.

Each entry of $\hat{\boldsymbol\beta}$ estimates the coefficient of the corresponding column of $\mathbf{X}$. The [[Fitted Values|fitted values]] are $\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol\beta}$.

> [!example]- A regression with an intercept is fitted to the points $(1, 2)$, $(2, 3)$ and $(3, 5)$. What are the least squares estimates? {Example}
> The design matrix has a column of ones and a column of the $x$ values:
>
> $$\mathbf{X} = \begin{bmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \end{bmatrix}, \quad \mathbf{y} = \begin{bmatrix} 2 \\ 3 \\ 5 \end{bmatrix}$$
>
> - $\mathbf{X}^T\mathbf{X}$ has entries $3$, $6$, $6$ and $14$, and its determinant is $3(14) - 6(6) = 6$.
> - $\mathbf{X}^T\mathbf{y}$ has entries $2 + 3 + 5 = 10$ and $2 + 6 + 15 = 23$.
> - By the [[Linear Algebra#The inverse of a matrix|inverse of a $2 \times 2$ matrix]], $\hat\beta_0 = (14 \times 10 - 6 \times 23)/6 = 1/3$.
> - Likewise $\hat\beta_1 = (-6 \times 10 + 3 \times 23)/6 = 1.5$.
> - The fitted line is $\hat{y} = 0.3333 + 1.5x$.

## Properties of the least squares estimators

If the model is correctly specified and the errors are uncorrelated with mean $0$ and variance $\sigma^2$, the least squares estimators are [[Unbiasedness|unbiased]], $E[\hat{\boldsymbol\beta}] = \boldsymbol\beta$, and their covariance matrix is

> $$\text{Var}(\hat{\boldsymbol\beta}) = \sigma^2 (\mathbf{X}^T\mathbf{X})^{-1}$$

The error variance is estimated by

> $$\hat\sigma^2 = \frac{\text{RSS}}{n - p - 1}$$

The standard error of $\hat\beta_j$, $\text{SE}(\hat\beta_j)$, is the square root of the corresponding diagonal entry of $\hat\sigma^2 (\mathbf{X}^T\mathbf{X})^{-1}$. If the errors are also normal, the least squares estimates are the [[Maximum Likelihood Estimation|maximum likelihood estimates]], and the statistic for testing $H_0\colon \beta_j = 0$ is

> $$t = \frac{\hat\beta_j}{\text{SE}(\hat\beta_j)}$$

- Under $H_0$, $t$ has a [[Student's t-Distribution|$t$ distribution]] with $n - p - 1$ degrees of freedom.

A coefficient whose $t$ statistic is not significant, such as an intercept close to zero, is consistent with a true value of zero.

> [!example]- The severity trend line above has $\text{RSS} = 0.019$. Is the slope significantly different from zero at the 5% level? {Example}
> - With $n = 5$ and $p = 1$, the error variance estimate is $\hat\sigma^2 = 0.019/3 = 0.006333$.
> - In simple linear regression, the variance of $\hat\beta_1$ is estimated by $\hat\sigma^2$ divided by $\sum (x_i - \bar{x})^2 = 10$.
> - The standard error is $\text{SE}(\hat\beta_1) = \sqrt{0.006333/10} = 0.02517$.
> - The statistic is $t = 0.61/0.02517 = 24.2$.
> - The two-sided 5% critical value with 3 degrees of freedom is $3.182$, so the slope is significantly different from zero.

## Generalized least squares

When the errors have unequal variances or are correlated, with covariance matrix $\sigma^2 \mathbf{V}$, the generalized least squares estimate is

> $$\hat{\boldsymbol\beta} = (\mathbf{X}^T\mathbf{V}^{-1}\mathbf{X})^{-1}\mathbf{X}^T\mathbf{V}^{-1}\mathbf{y}$$

- $\mathbf{V}$ is a known $n \times n$ matrix that describes the covariance structure of the errors, such as their autocorrelation.

With $\mathbf{V}$ diagonal this is weighted least squares, and with $\mathbf{V} = \mathbf{I}$ it is ordinary least squares. When the variance of the residuals grows with the fitted values, transforming the response, for example to $\ln y$, can also make the variance more nearly constant.

> [!trap] Extrapolating the fitted line beyond the data
> A least squares fit describes the relationship only over the range of the observed predictor values. The data cannot show whether the line continues outside that range, so a prediction far from the observed $x$ values rests on an assumption the data cannot check.
