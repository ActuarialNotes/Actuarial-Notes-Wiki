---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:af2506fb2788f3db89c4c01deb329093069b7332a993edc92a99770207c589cf
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.5 'Smoothing Splines', eqs (7.11)-(7.13), the LOOCV formula and Fig 7.8, printed pp.301-304 (PDF pp.309-312); eq (5.2), printed p.202 (PDF p.211); §7.6 span vs lambda, printed p.305 (PDF p.313); §7.7.1 backfitting, printed p.309 (PDF p.317), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Tibshirani, R., 'Splines' lecture notes, Advanced Methods for Data Analysis (CMU 36-402/36-608, Spring 2014), §1.1-1.4 pp.1-3 (kth-order spline with m knots: truncated power basis g1..g_{m+k+1}; natural spline of order k with knots t1..tm spanned by m basis functions; smoothing spline = penalised regression on the natural-spline basis with knots at every xi), sha256:c13ed5ee6e5dd83ac887822c8d3382780013343effeaacf09ccdebf620b6958b — https://www.stat.cmu.edu/~ryantibs/advmethods/notes/smoothspline.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Smoothing Spline.md
---

A **Smoothing Spline** is the function $g$ of a predictor $x$ that minimizes the [[Residual Sum of Squares|residual sum of squares]] plus a penalty on the roughness of $g$. For a tuning parameter $\lambda \ge 0$, the smoothing spline minimizes

> $$\sum_{i=1}^{n} \big(y_i - g(x_i)\big)^2 + \lambda \int g''(t)^2\, dt$$

- $y_i$ is the response and $x_i$ is the predictor of observation $i$, for $i = 1, \ldots, n$.
- $g''(t)$ is the second derivative of $g$, and $\int g''(t)^2\,dt$ measures how much the slope of $g$ changes over its range.

The penalty is 0 for a straight line and large for a wiggly function. At $\lambda = 0$ the penalty has no effect, and $g$ passes through every training observation. As $\lambda \to \infty$, $g$ becomes the least squares line. The minimizer is a natural cubic spline with a knot at every unique value of $x_1, \ldots, x_n$, shrunk toward the least squares line by the penalty. Its fitted curve is therefore continuous, and $\lambda$ rather than the choice of knots controls its smoothness. A [[Regression Spline#Natural cubic spline|natural cubic spline]] fitted by least squares instead has knots chosen in advance and no penalty. A smoothing spline can also be one of the functions of a [[Generalized Additive Model|generalized additive model]].

> [!example]- A smoothing spline is fitted to 40 observations with distinct values of $x$. What is the fit at $\lambda = 0$ and as $\lambda \to \infty$, and does increasing $\lambda$ remove knots? {Example}
> - At $\lambda = 0$ only the residual sum of squares counts, so the fit passes through all 40 observations.
> - As $\lambda \to \infty$ any curvature is penalized without limit, so the fit becomes the least squares line.
> - Increasing $\lambda$ does not remove knots. The smoothing spline has a knot at each of the 40 values of $x$ for every $\lambda$, and a larger $\lambda$ shrinks the fit toward the line.

## Effective degrees of freedom

The vector of fitted values at $x_1, \ldots, x_n$ is a matrix times the vector of responses,

> $$\hat{\mathbf{g}}_\lambda = \mathbf{S}_\lambda \mathbf{y}$$

- $\mathbf{y}$ is the vector of responses $y_1, \ldots, y_n$.
- $\mathbf{S}_\lambda$ is an $n \times n$ matrix that depends on $\lambda$.

The effective degrees of freedom of the smoothing spline is the sum of the diagonal elements of $\mathbf{S}_\lambda$:

> $$df_\lambda = \sum_{i=1}^{n} \{\mathbf{S}_\lambda\}_{ii}$$

As $\lambda$ increases from 0 to $\infty$, $df_\lambda$ decreases from $n$ to 2. The flexibility of a method is the range of shapes it can fit, and a smoothing spline with more effective degrees of freedom is more flexible, with lower bias and higher variance.

## Choosing the tuning parameter by cross-validation

The tuning parameter $\lambda$ is chosen by [[Cross-Validation#Leave-one-out cross-validation|leave-one-out cross-validation]]. For a smoothing spline, the leave-one-out cross-validated residual sum of squares can be computed from the one fit to all the data:

> $$\text{RSS}_{cv}(\lambda) = \sum_{i=1}^{n} \left[\frac{y_i - \hat{g}_\lambda(x_i)}{1 - \{\mathbf{S}_\lambda\}_{ii}}\right]^2$$

- $\hat{g}_\lambda(x_i)$ is the fitted value at $x_i$ from the smoothing spline fitted to all $n$ observations.

The value of $\lambda$ with the smallest $\text{RSS}_{cv}(\lambda)$ is chosen.

> [!example]- A smoothing spline of claim frequency on vehicle age, fitted at $\lambda = 1$, gives the values below. At $\lambda = 0.2$, $\text{RSS}_{cv} = 3.78$. What are $df_\lambda$ and $\text{RSS}_{cv}$ at $\lambda = 1$, and which $\lambda$ is chosen? {Example}
>
> | $x_i$ | 1 | 2 | 3 | 4 | 5 | 6 |
> | --- | --- | --- | --- | --- | --- | --- |
> | $y_i$ | 8.1 | 7.2 | 7.5 | 6.1 | 6.4 | 5.2 |
> | $\hat{g}_\lambda(x_i)$ | 8.011 | 7.519 | 7.063 | 6.537 | 6.002 | 5.367 |
> | $\{\mathbf{S}_\lambda\}_{ii}$ | 0.757 | 0.379 | 0.379 | 0.379 | 0.379 | 0.757 |
>
> - The effective degrees of freedom is $2(0.757) + 4(0.379) = 3.03$.
> - Each residual is divided by $1 - \{\mathbf{S}_\lambda\}_{ii}$, which is 0.243 at the ends and 0.621 elsewhere, and squared:
>
> $$
> \begin{aligned}
> \text{RSS}_{cv} &= \left(\tfrac{0.089}{0.243}\right)^2 + \left(\tfrac{-0.319}{0.621}\right)^2 + \left(\tfrac{0.437}{0.621}\right)^2 \\
> &\quad + \left(\tfrac{-0.437}{0.621}\right)^2 + \left(\tfrac{0.398}{0.621}\right)^2 + \left(\tfrac{-0.167}{0.243}\right)^2 \\
> &= 2.27
> \end{aligned}
> $$
>
> - $2.27 < 3.78$, so $\lambda = 1$ is chosen.
