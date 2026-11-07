---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:f3e568f47ea3ff309096d6f5f89f5a7ca13d4ee502f539ef214f405d003e8d0b
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.3-7.4 'Basis Functions' / 'Regression Splines', eqs (7.7)-(7.10) and footnotes 3-4, printed pp.294-300 (PDF pp.302-308); §7.5.1 smoothing-spline knots, printed p.302 (PDF p.310); §7.7.1 GAMs with natural splines, printed p.308 (PDF p.316), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Tibshirani, R., 'Splines' lecture notes, Advanced Methods for Data Analysis (CMU 36-402/36-608, Spring 2014), §1.1-1.4 pp.1-3 (kth-order spline with m knots: truncated power basis g1..g_{m+k+1}; natural spline of order k with knots t1..tm spanned by m basis functions; smoothing spline = penalised regression on the natural-spline basis with knots at every xi), sha256:c13ed5ee6e5dd83ac887822c8d3382780013343effeaacf09ccdebf620b6958b — https://www.stat.cmu.edu/~ryantibs/advmethods/notes/smoothspline.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Regression Spline.md
---

A **Regression Spline** is a piecewise polynomial of degree $d$ in a predictor $X$, fitted by least squares, whose pieces meet at $K$ points $\xi_1 < \xi_2 < \cdots < \xi_K$ called knots, with the function and its first $d - 1$ derivatives continuous at each knot. The knots divide the range of $X$ into $K + 1$ regions. Like [[Polynomial Regression|polynomial regression]], [[Step Function|step functions]] and [[Local Regression|local regression]], a regression spline extends [[Linear Regression|linear regression]] to a non-linear relationship between a predictor and the response. A cubic spline, with $d = 3$, is

> $$y_i = \beta_0 + \beta_1 x_i + \beta_2 x_i^2 + \beta_3 x_i^3 + \sum_{k=1}^{K} \beta_{3+k}\,(x_i - \xi_k)_+^3 + \varepsilon_i$$

- $(x - \xi)_+^3$ is the truncated power function, equal to $(x - \xi)^3$ when $x > \xi$ and 0 otherwise.
- $y_i$ is the response and $x_i$ is the predictor of observation $i$.
- $\varepsilon_i$ is the error term.

The truncated power term $(x - \xi)^3$ is 0 at its knot, and so are its first and second derivatives, $3(x - \xi)^2$ and $6(x - \xi)$. The function and its first two derivatives are therefore continuous at each knot, and only the third derivative jumps. The model is a least squares regression on an intercept and the $K + 3$ predictors $X$, $X^2$, $X^3$ and one truncated power function for each knot, so a cubic spline with $K$ knots has $K + 4$ coefficients.

> [!example]- A cubic spline in vehicle age $x$ has knots at 3 and 8 and the fitted function below. What is $\hat f(6)$, and by how much does the third derivative jump at $x = 3$? {Example}
> $$
> \begin{aligned}
> \hat f(x) = 2.0 &+ 0.5x - 0.1x^2 + 0.01x^3 \\
> &- 0.012(x - 3)_+^3 + 0.006(x - 8)_+^3
> \end{aligned}
> $$
>
> - At $x = 6$ the first truncated term is $(6 - 3)^3 = 27$, and the second is 0 because $6 < 8$.
>
> $$
> \begin{aligned}
> \hat f(6) &= 2.0 + 3.0 - 3.6 + 2.16 - 0.012(27) \\
> &= 3.236
> \end{aligned}
> $$
>
> - The third derivative of $\beta(x - 3)_+^3$ is $6\beta$ to the right of the knot and 0 to the left.
> - The third derivative jumps by $6(-0.012) = -0.072$ at $x = 3$. The function and its first two derivatives do not jump.

## Degrees of freedom of a spline

A piecewise polynomial of degree $d$ fits a separate polynomial in each of the $K + 1$ regions, with no constraints at the knots. Its fitted curve can jump at a knot, and its number of degrees of freedom is

> $$(K + 1)(d + 1)$$

A spline of degree $d$ imposes $d$ continuity constraints at each knot, on the function and its first $d - 1$ derivatives. Each constraint removes one degree of freedom, so the number of degrees of freedom of a spline of degree $d$ with $K$ knots is

> $$(K + 1)(d + 1) - dK = K + d + 1$$

A cubic spline uses $K + 4$ degrees of freedom and a linear spline uses $K + 2$. Adding knots makes a spline more flexible, so it fits the training data more closely. The knots and the degree are the tuning choices of a spline. Software usually places the knots at uniform quantiles of $X$, and the number of knots is chosen by [[Cross-Validation|cross-validation]].

> [!example]- Driver age has knots at 25, 35, 45, 55 and 65. How many degrees of freedom do a piecewise cubic, a cubic spline, a piecewise linear fit and a linear spline use? {Example}
> - There are $K = 5$ knots and 6 regions.
> - A piecewise cubic uses $6 \times 4 = 24$ degrees of freedom.
> - A cubic spline uses $5 + 4 = 9$.
> - A piecewise linear fit uses $6 \times 2 = 12$.
> - A linear spline uses $5 + 2 = 7$.

## Natural cubic spline

A natural cubic spline is a cubic spline that is required to be linear below the smallest knot and above the largest knot. It gives more stable estimates and narrower confidence bands near the boundaries of $X$, where a cubic spline has high variance. Linearity in a boundary region removes that region's quadratic and cubic terms, which is two constraints at each end. Counting the two boundary knots among the $K$ knots, the number of degrees of freedom of a natural cubic spline is

> $$(K + 4) - 4 = K$$

> [!example]- A cubic spline in building age has knots at 10, 20, 30 and 50. How many degrees of freedom does it use once the curve is required to be linear before the first knot and after the last knot? {Example}
> - The cubic spline with $K = 4$ knots uses $4 + 4 = 8$ degrees of freedom.
> - Linearity removes two terms at each end, so the natural cubic spline uses $8 - 2 - 2 = 4$ degrees of freedom.

## Linear spline with hinge functions

A linear spline is often written with the hinge functions $\max(x - \xi_k, 0) = (x - \xi_k)_+$ as predictors, as in a [[Generalized Linear Model|GLM]]:

> $$\eta = \beta_0 + \beta_1 x + \sum_{k=1}^{K} \beta_{1+k} \max(x - \xi_k, 0)$$

- $\eta$ is the linear predictor.
- $\xi_k$ is a hinge point, the knot at which the slope changes by $\beta_{1+k}$.

The fit is a continuous line with a separate slope on each segment. The hinge points are usually chosen by judgment, from a plot of the data, and each one adds a parameter to the model.

> [!trap] Using a smoothing method's tuning choice for a spline
> The knots and the degree tune a regression spline. A [[Smoothing Spline|smoothing spline]] has a knot at every observation and is tuned by its penalty $\lambda$, and [[Local Regression|local regression]] is tuned by its span. Neither has knots to add or remove.
