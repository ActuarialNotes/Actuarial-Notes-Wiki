---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:3c743f8e2ea197f926e8e1a41bce746e6facd81b16f7d3728afde706c72db435
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §6.3 intro and §6.3.1 'Principal Components Regression', eqs (6.16)-(6.20), printed pp.251-259 (PDF pp.259-267); §6.2.2 'the lasso performs variable selection', printed p.242 (PDF p.250), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Principal Components Regression.md
---

A **Principal Components Regression** (PCR) is a least squares [[Linear Regression|linear regression]] of the response on the first $M$ principal components of the $p$ predictors $X_1, \ldots, X_p$, with $M < p$. It is a dimension reduction method. The $m$th principal component is a linear combination of all the predictors,

> $$Z_m = \sum_{j=1}^{p} \phi_{jm} X_j$$

- $\phi_{1m}, \ldots, \phi_{pm}$ are the loadings of the $m$th principal component, with $\phi_{1m}^2 + \cdots + \phi_{pm}^2 = 1$.

The first principal component is the direction along which the observations vary the most. The second has the largest variance among the directions uncorrelated with, and so perpendicular to, the first, and so on. The components are straight lines in the space of the predictors, found by [[Principal Components Analysis|principal components analysis]] after each predictor is centred. The regression on the first $M$ components is

> $$y_i = \theta_0 + \sum_{m=1}^{M} \theta_m z_{im} + \varepsilon_i$$

- $z_{im}$ is the score of observation $i$ on the $m$th principal component.
- $\theta_0, \theta_1, \ldots, \theta_M$ are the regression coefficients, estimated by least squares.
- $\varepsilon_i$ is the error term.

> [!example]- Two standardized predictors have first principal component loadings 0.8 and 0.6. A PCR with $M = 1$ gives $\hat\theta_0 = 12.0$ and $\hat\theta_1 = 2.5$. What is the predicted response for $x_1 = 1.5$ and $x_2 = 0.5$? {Example}
> - The loadings satisfy $0.8^2 + 0.6^2 = 1$.
> - The score on the first component is $z_1 = 0.8(1.5) + 0.6(0.5) = 1.5$.
> - The predicted response is $12.0 + 2.5(1.5) = 15.75$.

## Coefficients of the original predictors

The fitted regression on the components is a linear regression on the original predictors whose coefficients are

> $$\beta_j = \sum_{m=1}^{M} \theta_m \phi_{jm}$$

The fit estimates $M + 1$ coefficients instead of $p + 1$, and the $\beta_j$ are constrained to this form. The constraint can bias the estimates, but when $p$ is large compared with $n$ it can reduce their variance a great deal and so reduce overfitting. With $M = p$ there is no constraint, and PCR is least squares on the original predictors. In the example above, $\beta_1 = 2.5(0.8) = 2.0$ and $\beta_2 = 2.5(0.6) = 1.5$, which are held in the ratio of the loadings.

## Properties of principal components regression

Every component is a linear combination of all $p$ predictors, so the fitted model uses every predictor. PCR reduces the dimension of the fit but does not perform [[Variable Selection|variable selection]], unlike the lasso.

The components are chosen without using the response. PCR assumes that the directions in which the predictors vary most are also the directions associated with the response, which is not guaranteed. [[Partial Least Squares|Partial least squares]] uses the response to choose its directions.

The predictors are standardized before the components are computed. Otherwise the predictors with the largest variances dominate the first components.

The number of components $M$ is chosen by [[Cross-Validation|cross-validation]]. As $M$ increases, the bias falls and the variance rises, so the test MSE is U-shaped in $M$ ([[Bias-Variance Tradeoff|bias-variance tradeoff]]).

> [!example]- A PCR on 40 standardized predictors has its smallest cross-validated MSE at $M = 6$. How many regression coefficients does it estimate, and how many predictors does the fitted model use? {Example}
> - The fit estimates the 7 coefficients $\theta_0, \theta_1, \ldots, \theta_6$.
> - Each of the 6 components is a linear combination of all 40 predictors, so the fitted model uses all 40.

> [!trap] Treating principal components regression as variable selection
> Using 6 components out of 40 predictors does not leave 34 predictors out. Every component carries every predictor, so a model built on a few of the original predictors needs a selection method such as the lasso.
