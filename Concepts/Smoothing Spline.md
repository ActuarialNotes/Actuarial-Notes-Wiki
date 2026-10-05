---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a04f362affd6229e0780cc53408f4b76ab5d312d7fc39f6466d025c3f0b1f956
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Smoothing Spline.md
---

A **smoothing spline** is the function $g$ that minimizes the [[Residual Sum of Squares]] plus a penalty on its roughness. A nonnegative tuning parameter $\lambda$ sets the trade-off between fitting the data and being smooth.

> $$\sum_{i=1}^{n}\big(y_i - g(x_i)\big)^2 + \lambda \int g''(t)^2\, dt$$
>
> $$\hat{\mathbf{g}}_\lambda = \mathbf{S}_\lambda \mathbf{y}$$
>
> $$df_\lambda = \sum_{i=1}^{n} \{\mathbf{S}_\lambda\}_{ii}$$
>
> $$\mathrm{RSS}_{cv}(\lambda) = \sum_{i=1}^{n}\left[\frac{y_i - \hat g_\lambda(x_i)}{1 - \{\mathbf{S}_\lambda\}_{ii}}\right]^2$$

- **Loss + Penalty.** This is the same form as ridge regression and the lasso (see [[Regularization]]). The sum of squares rewards fitting the data. The second derivative $g''(t)$ measures how fast the slope is changing, so $\int g''(t)^2\,dt$ measures the total change in $g'(t)$ over its range. It is small for a smooth $g$ and large for a jumpy one. A straight line has $g'' = 0$.
- **The extremes of $\lambda$.** At $\lambda = 0$ the penalty has no effect, and $g$ interpolates the training observations exactly. As $\lambda \to \infty$, $g$ becomes the linear least squares line. In between, $\lambda$ controls the [[Bias-Variance Tradeoff]].
- **The solution.** The minimizer is a natural cubic spline with a knot at every unique value of $x_1, \dots, x_n$. It is not the natural cubic spline that the basis approach would fit with those knots (see [[Regression Spline]]). It is a *shrunken* version of it, and $\lambda$ sets the amount of shrinkage.
- **Effective degrees of freedom.** $\hat{\mathbf{g}}_\lambda$ is the $n$-vector of fitted values at $x_1, \dots, x_n$, and $\mathbf{S}_\lambda$ is an $n \times n$ matrix. The spline has $n$ nominal parameters, but they are heavily constrained, so flexibility is measured by $df_\lambda$, the sum of the diagonal of $\mathbf{S}_\lambda$. As $\lambda$ increases from $0$ to $\infty$, $df_\lambda$ falls from $n$ to $2$. Higher $df_\lambda$ means a more flexible fit, with lower bias and higher variance.
- **Choosing $\lambda$.** There are no knots to place. Instead $\lambda$ is chosen by [[Cross-Validation]], to minimize the cross-validated RSS. Leave-one-out CV costs essentially one fit, using the last formula above. There, $\hat g_\lambda^{(-i)}(x_i)$ denotes the fit made without observation $i$, and the formula replaces it with quantities from the full fit $\hat g_\lambda$. Least squares has the same kind of shortcut, built on the leverages of the [[Hat Matrix]]. On ISLR's Wage data, choosing $\lambda$ by LOOCV gave $6.8$ effective degrees of freedom. The fit was hard to tell apart from one with 16, so the simpler fit is preferred.
- A smoothing spline can be the building block for one term of a [[Generalized Additive Model]], fit by backfitting. [[Local Regression]] controls flexibility the same way, but with a span instead of $\lambda$.

> [!example]- Choosing the Smoothing Parameter by LOOCV {Example}
> A smoothing spline relates claim frequency (per 100 vehicles) to vehicle age $x = 1, \dots, 6$. At $\lambda = 1$, the fit to all six points gives:
>
> | $x_i$ | 1 | 2 | 3 | 4 | 5 | 6 |
> |---|---|---|---|---|---|---|
> | $y_i$ | 8.1 | 7.2 | 7.5 | 6.1 | 6.4 | 5.2 |
> | $\hat g_\lambda(x_i)$ | 8.011 | 7.519 | 7.063 | 6.537 | 6.002 | 5.367 |
> | $\{\mathbf{S}_\lambda\}_{ii}$ | 0.757 | 0.379 | 0.379 | 0.379 | 0.379 | 0.757 |
>
> At $\lambda = 0.2$ the same calculation gives $df_\lambda = 3.92$ and $\mathrm{RSS}_{cv} = 3.78$. Find $df_\lambda$ and $\mathrm{RSS}_{cv}(\lambda)$ at $\lambda = 1$, and say which $\lambda$ LOOCV prefers.
>
> > [!answer]-
> > The effective degrees of freedom is the sum of the diagonal:
> > $$
> > \begin{align*}
> > df_\lambda &= 2(0.757) + 4(0.379) \\
> > &= 3.03
> > \end{align*}
> > $$
> > Each residual $y_i - \hat g_\lambda(x_i)$ is divided by $1 - \{\mathbf{S}_\lambda\}_{ii}$ (that is, $0.243$ or $0.621$) and squared:
> > $$
> > \begin{align*}
> > \mathrm{RSS}_{cv} &= \left(\tfrac{0.089}{0.243}\right)^2 + \left(\tfrac{-0.319}{0.621}\right)^2 + \left(\tfrac{0.437}{0.621}\right)^2 \\
> > &\quad + \left(\tfrac{-0.437}{0.621}\right)^2 + \left(\tfrac{0.398}{0.621}\right)^2 + \left(\tfrac{-0.167}{0.243}\right)^2 \\
> > &= 0.134 + 0.264 + 0.495 + 0.495 + 0.411 + 0.472 \\
> > &= 2.27
> > \end{align*}
> > $$
> > $2.27 < 3.78$, so LOOCV prefers $\lambda = 1$, the smoother fit with about 3 effective degrees of freedom. The ordinary RSS at $\lambda = 1$ is only $0.68$. Dividing by $1 - \{\mathbf{S}_\lambda\}_{ii}$ inflates each residual to what it would have been with that point left out. The end points have the largest $\{\mathbf{S}_\lambda\}_{ii}$, so they are inflated most.

> [!example]- What Happens as λ Changes {Example}
> A smoothing spline is fit to $n = 40$ points with distinct $x$ values. Which of these statements are true?
>
> I. At $\lambda = 0$ the fit passes through every training point.
> II. As $\lambda$ increases from $0$ to $\infty$, $df_\lambda$ decreases from $40$ to $2$.
> III. As $\lambda \to \infty$, the fit becomes the least squares line.
> IV. Increasing $\lambda$ removes knots from the spline.
>
> > [!answer]-
> > **I, II and III are true; IV is false.**
> >
> > With no penalty, the RSS can be driven to zero, so $g$ interpolates (I). The effective degrees of freedom run from $n = 40$ down to $2$ (II), and the limit is the linear least squares fit, which has two coefficients (III).
> >
> > IV is false. The minimizer always has a knot at every unique $x_i$, whatever $\lambda$ is. Increasing $\lambda$ shrinks the fit toward a line rather than removing knots. Choosing the number and location of knots is the [[Regression Spline]] approach.
