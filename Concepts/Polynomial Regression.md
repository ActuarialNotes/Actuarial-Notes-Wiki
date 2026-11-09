---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:d7f9c123ce3f59bcb8fc93e34971049b3a1ceb9f98a310ca1f558710636cccbe
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.1 'Polynomial Regression', eqs (7.1)-(7.3) and footnote 1, printed pp.290-292 (PDF pp.298-300); §7.2 opening, printed p.292; §7.3 eq (7.7), printed p.294 (PDF p.302); §7.4.5 and Fig 7.7, printed pp.300-301 (PDF pp.308-309); §7.7.1 building blocks, printed p.309 (PDF p.317), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Polynomial Regression.md
---

A **Polynomial Regression** is a [[Linear Regression|linear regression]] whose predictors are the powers $x, x^2, \ldots, x^d$ of one predictor $x$. It is used when a [[Scatter Plot|scatter plot]] shows a curved relationship between the predictor and the response. The polynomial regression of degree $d$ is

> $$y_i = \beta_0 + \beta_1 x_i + \beta_2 x_i^2 + \cdots + \beta_d x_i^d + \varepsilon_i$$

- $y_i$ is the response and $x_i$ is the predictor of observation $i$, for $i = 1, \ldots, n$.
- $\varepsilon_i$ is the error term.

The model is linear in its coefficients $\beta_0, \ldots, \beta_d$, although it is not linear in $x$. The powers of $x$ are columns of the [[Design Matrix|design matrix]], and the coefficients are estimated by [[Ordinary Least Squares|ordinary least squares]]. A polynomial of degree $d$ adds $d$ coefficients to the intercept, one for each power of $x$.

A degree above 3 or 4 is unusual. A high-degree polynomial is very flexible, and it takes strange shapes near the boundary of the data, where there are few observations. Polynomial regression is a global method: one polynomial covers the whole range of $x$, so a change in the data in one region changes every coefficient and the whole fitted curve. The coefficients of the separate powers are not interpreted on their own, because $x$, $x^2$ and $x^3$ cannot change one at a time. The fitted function is what is interpreted.

> [!example]- Average claim severity, in thousands, is fitted as a quadratic in vehicle age $x$, with $\hat\beta_0 = 4.2$, $\hat\beta_1 = 0.9$ and $\hat\beta_2 = -0.06$. How many coefficients does the model estimate, and what is the fitted severity of a 5-year-old vehicle? {Example}
> - A quadratic has $d = 2$, so the model estimates the intercept and 2 coefficients, 3 in all.
> - The fitted severity at $x = 5$ is $4.2 + 0.9(5) - 0.06(25) = 7.2$, or $\$7{,}200$.

## Variance of the fitted value

The fitted value at a point $x_0$ is $\hat f(x_0) = \hat\beta_0 + \hat\beta_1 x_0 + \cdots + \hat\beta_d x_0^d$, a linear combination of the coefficient estimates. Its variance is

> $$\text{Var}\big(\hat f(x_0)\big) = \boldsymbol{\ell}_0^T \hat{\mathbf{C}}\, \boldsymbol{\ell}_0$$

- $\boldsymbol{\ell}_0^T = (1, x_0, x_0^2, \ldots, x_0^d)$.
- $\hat{\mathbf{C}}$ is the estimated covariance matrix of $\hat\beta_0, \hat\beta_1, \ldots, \hat\beta_d$.

Expanded, the product multiplies each variance on the diagonal of $\hat{\mathbf{C}}$ by the square of its entry of $\boldsymbol{\ell}_0$, and each covariance by twice the product of its two entries. The variance depends on $x_0$, and it is usually largest near the ends of the range of $x$. The standard error of $\hat f(x_0)$ is the square root of its variance, and $\hat f(x_0) \pm 2\,\text{SE}$ is an approximate 95% pointwise [[Confidence Interval|confidence band]].

> [!example]- The quadratic $\hat f(x) = 4.2 + 0.9x - 0.06x^2$ has the coefficient variances and covariances below. What is the approximate 95% pointwise confidence band at $x = 5$? {Example}
>
> | | $\hat\beta_0$ | $\hat\beta_1$ | $\hat\beta_2$ |
> | --- | --- | --- | --- |
> | $\hat\beta_0$ | 0.090 | $-0.030$ | 0.0020 |
> | $\hat\beta_1$ | $-0.030$ | 0.0130 | $-0.0010$ |
> | $\hat\beta_2$ | 0.0020 | $-0.0010$ | 0.00012 |
>
> - The fitted value is $\hat f(5) = 7.2$, and $\boldsymbol{\ell}_0 = (1, 5, 25)$.
> - Each variance is multiplied by the square of its entry of $\boldsymbol{\ell}_0$, and each covariance by twice the product of its two entries:
>
> $$
> \begin{aligned}
> \text{Var}\big(\hat f(5)\big) &= 0.090 + 25(0.0130) + 625(0.00012) \\
> &\quad + 2(5)(-0.030) + 2(25)(0.0020) \\
> &\quad + 2(125)(-0.0010) \\
> &= 0.040
> \end{aligned}
> $$
>
> - The standard error of $\hat f(5)$ is $\sqrt{0.040} = 0.20$.
> - The band is $7.2 \pm 2(0.20)$, from 6.8 to 7.6.

> [!trap] Counting each covariance once
> Each covariance appears twice in $\hat{\mathbf{C}}$, above and below the diagonal, so it enters the variance with a factor of 2. Counting it once in the example above gives a variance of $0.265$ instead of $0.040$.
