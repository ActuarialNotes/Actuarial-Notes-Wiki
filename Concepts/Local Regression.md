---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:53e9e6b1fe11f8817778a7117e13f7d5bf7d5cd60264e71cbc55ea748030b8b6
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.6 'Local Regression', Algorithm 7.1 steps 1-4 and eq (7.14) printed p.306 (PDF p.314); memory-based procedure, choice of K / degree / span printed p.305 (PDF p.313); Fig 7.10 legend (span 0.2 -> 16.4 df, 0.7 -> 5.3 df) printed p.307 (PDF p.315), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Local Regression.md
---

A **Local Regression** is a method that fits a non-linear function of a predictor $x$ one target point at a time: the fit at a target point $x_0$ is a weighted least squares regression on only the training observations near $x_0$. Like [[Polynomial Regression|polynomial regression]], [[Step Function|step functions]] and [[Regression Spline|splines]], it extends [[Linear Regression|linear regression]] to a non-linear relationship between a predictor and the response. The fit at $x_0$ takes four steps:

1. Gather the fraction $s = k/n$ of the $n$ training observations whose $x_i$ are closest to $x_0$.
2. Give each observation in this neighbourhood a weight $K_{i0} = K(x_i, x_0)$, so that the observation furthest from $x_0$ has weight 0 and the closest has the highest weight. Every observation outside the neighbourhood has weight 0.
3. Fit a weighted least squares regression of $y_i$ on $x_i$ with these weights.
4. Take the fitted value of that regression at $x_0$ as $\hat f(x_0)$.

The span $s$ is the fraction of the training observations used in each local fit. The weighted least squares regression of step 3 finds the $\hat\beta_0$ and $\hat\beta_1$ that minimize

> $$\sum_{i=1}^{n} K_{i0}\,(y_i - \beta_0 - \beta_1 x_i)^2$$

- $y_i$ is the response and $x_i$ is the predictor of observation $i$.
- $K$ is the weighting function.

The fitted value at the target point is

> $$\hat f(x_0) = \hat\beta_0 + \hat\beta_1 x_0$$

The weights change with $x_0$, so every target point needs its own weighted regression. Local regression is a memory-based method, like [[K-Nearest Neighbors|K-nearest neighbors]]: to find the neighbourhood of $x_0$, the distance from $x_0$ to every training observation is computed and the $k$ smallest are kept, so all the training data are needed for each prediction. Local regression extends to two predictors with two-dimensional neighbourhoods, but it performs poorly when the number of predictors is much larger than 3 or 4, because few training observations are close to $x_0$.

> [!example]- A local linear regression of claim frequency on driver age uses $n = 50$ age groups and span $s = 0.1$. The neighbourhood of $x_0 = 40$ and its weights are below. What is $\hat f(40)$? {Example}
>
> | Age $x_i$ | 36 | 38 | 41 | 43 | 45 |
> | --- | --- | --- | --- | --- | --- |
> | Frequency $y_i$ | 6.0 | 5.6 | 5.0 | 4.9 | 4.0 |
> | Weight $K_{i0}$ | 0.1 | 0.7 | 0.9 | 0.4 | 0 |
>
> - The neighbourhood holds $k = sn = 0.1(50) = 5$ observations. The closest age, 41, has the highest weight and the furthest, 45, has weight 0.
> - The weights add up to 2.1, so the weighted means are $\bar{x}_w = 84.3/2.1 = 40.1429$ and $\bar{y}_w = 10.98/2.1 = 5.2286$.
> - The weighted least squares slope is
>
> $$
> \begin{aligned}
> \hat\beta_1 &= \frac{\sum K_{i0}(x_i - \bar{x}_w)(y_i - \bar{y}_w)}{\sum K_{i0}(x_i - \bar{x}_w)^2} \\
> &= \frac{-1.4286}{8.8571} \\
> &= -0.1613
> \end{aligned}
> $$
>
> - The fitted value at the target point is
>
> $$
> \begin{aligned}
> \hat f(40) &= \bar{y}_w + \hat\beta_1(40 - \bar{x}_w) \\
> &= 5.2286 - 0.1613(40 - 40.1429) \\
> &= 5.25
> \end{aligned}
> $$

## The span and the smoothness of the fit

The span $s$ controls the flexibility of the fit, as the tuning parameter $\lambda$ does for a [[Smoothing Spline|smoothing spline]]. A larger span averages over more observations and gives a smoother, less variable fit. A smaller span follows local fluctuations and gives a wiggly fit with higher variance. A span of 1 uses all the training observations. The span is chosen by [[Cross-Validation|cross-validation]] or set directly. Local regression also needs a weighting function $K$ and a choice of whether step 3 fits a constant, a line or a quadratic, but the span is the most important choice. Knots and the degree of a piecewise polynomial tune a [[Regression Spline|regression spline]], not a local regression.

> [!example]- A local regression of loss ratio on policy tenure for $n = 400$ policies is fitted with spans 0.2 and 0.7. How many observations are in each neighbourhood, and which span gives the smoother curve? {Example}
> - The neighbourhood holds $k = sn$ observations: $0.2(400) = 80$ for $s = 0.2$ and $0.7(400) = 280$ for $s = 0.7$.
> - The span 0.7 averages over more observations, so it gives the smoother curve with lower variance.
> - The span 0.2 gives the wigglier curve, which uses more degrees of freedom.
