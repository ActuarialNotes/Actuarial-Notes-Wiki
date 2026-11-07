---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:30501ad4142d5482a26072f56feee0b80edda6b4770ea0437b6f22d5a257eb35
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §6.3.2 'Partial Least Squares', printed pp.259-261 (PDF pp.267-269), and §6.3.1 for the PCR comparison, printed pp.256-259 (PDF pp.264-267); eq (3.4) simple-regression slope, printed p.62 (PDF p.72), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Partial Least Squares.md
---

A **Partial Least Squares** (PLS) fit is a supervised dimension reduction method: it builds $M$ new features $Z_1, \ldots, Z_M$ as linear combinations of the $p$ predictors, using the response to choose them, and then fits a least squares [[Linear Regression|linear regression]] of the response on the new features. Each new feature is

> $$Z_m = \sum_{j=1}^{p} \phi_{jm} X_j$$

- $\phi_{1m}, \ldots, \phi_{pm}$ are the weights of the predictors $X_1, \ldots, X_p$ in the $m$th feature.

After the $p$ predictors are standardized, the weight of each predictor in the first feature is the slope of the simple linear regression of the response on that predictor:

> $$\phi_{j1} = \frac{\sum_{i=1}^{n}(x_{ij} - \bar{x}_j)(y_i - \bar{y})}{\sum_{i=1}^{n}(x_{ij} - \bar{x}_j)^2}$$

- $x_{ij}$ is the value of predictor $X_j$ for observation $i$, and $\bar{x}_j$ is its mean.
- $y_i$ is the response of observation $i$, and $\bar{y}$ is the mean response.

Each slope is proportional to the [[Correlation|correlation]] between the response and the predictor, so $Z_1$ puts the most weight on the predictors most strongly related to the response. For the second feature, each predictor is regressed on $Z_1$, and $Z_2$ is computed from the residuals in the same way as $Z_1$ was computed from the data. This is repeated until there are $M$ features. The response is then regressed on $Z_1, \ldots, Z_M$:

> $$y_i = \theta_0 + \sum_{m=1}^{M} \theta_m z_{im} + \varepsilon_i$$

- $z_{im}$ is the value of $Z_m$ for observation $i$.
- $\theta_0, \ldots, \theta_M$ are the regression coefficients, and $\varepsilon_i$ is the error term.

> [!example]- Four policies have standardized predictors $x_1$ and $x_2$ and claim cost $y$ as below. What is the first PLS feature, and what is the fitted value of policy 4 with $M = 1$? {Example}
>
> | Policy | $x_1$ | $x_2$ | $y$ |
> | --- | --- | --- | --- |
> | 1 | $-1$ | $-1.4$ | 2 |
> | 2 | $-1$ | $0.2$ | 6 |
> | 3 | $1$ | $-0.2$ | 4 |
> | 4 | $1$ | $1.4$ | 8 |
>
> - The mean response is 5, so $y - \bar{y}$ is $-3$, $1$, $-1$ and $3$, and each predictor has mean 0 and $\sum x_{ij}^2 = 4$.
> - The weights are $\phi_{11} = 4/4 = 1.0$ and $\phi_{21} = 8.8/4 = 2.2$.
> - The values of $Z_1 = X_1 + 2.2X_2$ are $-4.08$, $-0.56$, $0.56$ and $4.08$.
> - Regressing $y$ on $z_1$ gives $\hat\theta_1 = 23.36/33.92 = 0.6887$ and $\hat\theta_0 = 5$.
> - The fitted value of policy 4 is $5 + 0.6887(4.08) = 7.81$.

## Partial least squares and principal components regression

| | [[Principal Components Regression]] | Partial least squares |
| --- | --- | --- |
| Directions chosen from | The predictors only | The predictors and the response |
| Type of method | Unsupervised directions | Supervised directions |
| First direction | Explains the predictors best | Explains the response better, the predictors less well |

In both methods each direction is a linear combination of all $p$ predictors, so neither performs [[Variable Selection|variable selection]]. The directions are derived features, and a small weight on one direction does not mean that a predictor is unimportant. The number of directions $M$ is chosen by [[Cross-Validation|cross-validation]]. In practice PLS often performs no better than ridge regression or principal components regression, because using the response can reduce bias but can also increase variance.
