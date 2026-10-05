**Polynomial Regression** extends [[Linear Regression]] to a non-linear relationship by adding powers of the predictor as extra predictors. The model is a degree-$d$ polynomial in $x$. Its coefficients are still estimated by least squares, because it is a standard linear model in the predictors $x_i, x_i^2, \dots, x_i^d$.

> $$y_i = \beta_0 + \beta_1 x_i + \beta_2 x_i^2 + \cdots + \beta_d x_i^d + \epsilon_i$$
>
> $$\operatorname{Var}\big[\hat f(x_0)\big] = \ell_0^T \hat{\mathbf{C}}\, \ell_0$$

- $\hat f(x_0) = \hat\beta_0 + \hat\beta_1 x_0 + \cdots + \hat\beta_d x_0^d$ is the fit at a point $x_0$, and $\ell_0^T = (1, x_0, x_0^2, \dots, x_0^d)$. $\hat{\mathbf{C}}$ is the covariance matrix of the $\hat\beta_j$, which least squares supplies (see [[Ordinary Least Squares]]).
- **Pointwise standard errors.** The standard error of $\hat f(x_0)$ is the square root of the variance above. Computing it at each $x_0$ and plotting $\hat f(x_0) \pm 2\,\text{SE}$ gives an approximate 95% [[Confidence Interval]] for normally distributed errors. The individual coefficients are rarely of interest. What matters is the fitted function across a grid of $x$ values.
- **Degree.** Values of $d$ above 3 or 4 are unusual. At high degree the curve becomes overly flexible and can take very strange shapes, especially near the boundary of $X$.
- **Global structure.** A polynomial imposes one global shape on the whole range of $X$. A [[Step Function]] avoids this by fitting a separate constant in each bin. A [[Regression Spline]] keeps the degree fixed and adds knots instead, which generally gives more stable estimates. On ISLR's Wage data, a degree-15 polynomial behaves wildly at the boundaries, while a natural cubic spline with 15 degrees of freedom still fits reasonably.
- **Binary response.** The same powers can be the predictors of a [[Logistic Regression]]. ISLR models $\Pr(y_i > 250 \mid x_i)$, the probability that wage exceeds \$250,000, as $\exp(\cdot)/[1 + \exp(\cdot)]$ of the degree-$d$ polynomial.
- Polynomial regression is a basis-function model with $b_j(x_i) = x_i^j$, so all the usual linear-model inference tools apply. Its terms can also be the building blocks of a [[Generalized Additive Model]].

> [!example]- Pointwise Confidence Band for a Severity Curve {Example}
> Average claim severity (in \$000) is fit as a quadratic in vehicle age $x$ (years):
> $$\hat f(x) = 4.2 + 0.9x - 0.06x^2$$
> The estimated covariance matrix of $(\hat\beta_0, \hat\beta_1, \hat\beta_2)$ is
> $$\hat{\mathbf{C}} = \begin{bmatrix} 0.090 & -0.030 & 0.0020 \\ -0.030 & 0.0130 & -0.0010 \\ 0.0020 & -0.0010 & 0.00012 \end{bmatrix}$$
> Find $\hat f(5)$ and the approximate 95% band $\hat f(5) \pm 2\,\text{SE}$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat f(5) &= 4.2 + 0.9(5) - 0.06(25) \\
> > &= 7.2
> > \end{align*}
> > $$
> > With $\ell_0 = (1, 5, 25)$, each diagonal entry is weighted by the square of its $\ell_0$ term and each off-diagonal entry by twice the product of its two terms:
> > $$
> > \begin{align*}
> > \ell_0^T \hat{\mathbf{C}} \ell_0 &= 0.090 + 25(0.0130) + 625(0.00012) \\
> > &\quad + 2(5)(-0.030) + 2(25)(0.0020) + 2(125)(-0.0010) \\
> > &= 0.090 + 0.325 + 0.075 - 0.300 + 0.100 - 0.250 \\
> > &= 0.040
> > \end{align*}
> > $$
> > So $\text{SE} = \sqrt{0.040} = 0.20$, and the band is $7.2 \pm 0.40$, or $(6.8, 7.6)$: between \$6,800 and \$7,600 at age 5.

> [!example]- Probability of a Large Claim from a Logistic Polynomial {Example}
> A workers' compensation insurer models whether a claim becomes a large claim with a degree-2 logistic polynomial in claimant age $x$:
> $$\log\left(\frac{p(x)}{1 - p(x)}\right) = -6.0 + 0.12x - 0.001x^2$$
> Find the probability that a claim becomes large for claimants aged 30 and 50.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Age 30:}\quad -6.0 + 3.6 - 0.9 &= -3.3 \\
> > p(30) &= \frac{e^{-3.3}}{1 + e^{-3.3}} \\
> > &= 0.0356 \\
> > \text{Age 50:}\quad -6.0 + 6.0 - 2.5 &= -2.5 \\
> > p(50) &= \frac{e^{-2.5}}{1 + e^{-2.5}} \\
> > &= 0.0759
> > \end{align*}
> > $$
> > The chance of a large claim roughly doubles between ages 30 and 50. The negative $x^2$ term bends the curve, so it rises more slowly as age increases.
