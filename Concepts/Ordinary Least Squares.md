---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:00cc886956eddc4a18d16030ddf3c776e45ab26891c429adcc62333b87667a26
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ordinary Least Squares.md
---

**Ordinary least squares (OLS)** estimates the coefficients of a [[Linear Regression|linear regression]] by choosing the $\hat{\boldsymbol\beta}$ that minimizes the [[Residual Sum of Squares|residual sum of squares]] — the total squared vertical distance between the observations and the fitted surface. It is the starting point that every [[Extended Linear Model|extended linear model]] generalizes.

> $$\hat{\boldsymbol\beta} = \arg\min_{\boldsymbol\beta} \sum_{i=1}^{n} \left(y_i - \mathbf{x}_i^\top\boldsymbol\beta\right)^2$$

> $$\mathbf{X}^\top\mathbf{X}\,\hat{\boldsymbol\beta} = \mathbf{X}^\top\mathbf{y}$$

> $$\hat{\boldsymbol\beta} = (\mathbf{X}^\top\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{y}$$

- The second block is the **normal equations**, from setting the derivative of the RSS to zero. They say $\mathbf{X}^\top\mathbf{e} = \mathbf{0}$: the [[Residual|residuals]] are orthogonal to every column of the [[Design Matrix|design matrix]]. With an intercept the residuals therefore sum to zero, and the fitted line passes through $(\bar{x}, \bar{y})$
- **Simple regression**: $\hat\beta_1 = S_{xy}/S_{xx}$ and $\hat\beta_0 = \bar{y} - \hat\beta_1\bar{x}$, where $S_{xy} = \sum(x_i - \bar{x})(y_i - \bar{y})$ and $S_{xx} = \sum(x_i - \bar{x})^2$
- **Properties**: if the errors have mean zero, OLS is [[Unbiasedness|unbiased]], with $\mathrm{Var}(\hat{\boldsymbol\beta}) = \sigma^2(\mathbf{X}^\top\mathbf{X})^{-1}$ and $\hat\sigma^2 = \text{RSS}/(n - p - 1)$. With uncorrelated, constant-variance errors it is the best linear unbiased estimator (the Gauss–Markov theorem); adding normality makes it the [[Maximum Likelihood Estimation|MLE]] and makes the $t$ and $F$ tests exact
- **When the assumptions fail**: non-constant variance calls for *weighted* least squares, $(\mathbf{X}^\top\mathbf{W}\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{W}\mathbf{y}$; correlated errors call for *generalized* least squares, which is how a [[Linear Mixed Model]] estimates its [[Fixed Effects|fixed effects]]; a non-Normal response calls for a [[Generalized Linear Model]], fitted by maximum likelihood through a sequence of weighted least-squares steps
- Squared loss makes OLS sensitive to [[Outlier|outliers]] and to high-leverage points ([[Hat Matrix]]). Nearly collinear predictors make $\mathbf{X}^\top\mathbf{X}$ nearly singular and the coefficients unstable ([[Multicollinearity]])

> [!example]- Fitting a Severity Trend Line {Example}
> Average claim severity (in $\$000$) for accident years $x = 1, \ldots, 5$ is $10.0, 10.6, 11.1, 11.9, 12.4$. Fit a straight line by OLS, confirm the residuals sum to zero, and project year $6$.
>
> > [!answer]-
> > $\bar{x} = 3$ and $\bar{y} = 56.0/5 = 11.2$. Because $\sum(x_i - \bar{x}) = 0$, $S_{xy}$ can be computed as $\sum(x_i - \bar{x})\,y_i$:
> > $$
> > \begin{align*}
> > S_{xx} &= 4 + 1 + 0 + 1 + 4 \\
> > &= 10 \\
> > S_{xy} &= -2(10.0) - 10.6 + 11.9 + 2(12.4) \\
> > &= 6.1 \\
> > \hat\beta_1 &= \frac{6.1}{10} \\
> > &= 0.61 \\
> > \hat\beta_0 &= 11.2 - 0.61(3) \\
> > &= 9.37
> > \end{align*}
> > $$
> > Fitted values $9.98, 10.59, 11.20, 11.81, 12.42$ give residuals $0.02, 0.01, -0.10, 0.09, -0.02$, which sum to $0$ as the normal equations require.
> > $$
> > \begin{align*}
> > \hat{y}_6 &= 9.37 + 0.61(6) \\
> > &= 13.03
> > \end{align*}
> > $$
> > The projected severity is $\$13{,}030$. A straight line adds a constant $\$610$ a year; fitting the line to $\ln y$ instead would add a constant *percentage*, which is the usual form for severity trend.

> [!example]- Is the Trend Significant? {Example}
> For the trend line above, the residual sum of squares is $0.019$. Estimate $\sigma^2$, the standard error of $\hat\beta_1$, and test $H_0\!: \beta_1 = 0$ at the $5\%$ level ($t_{0.025,\,3} = 3.182$).
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat\sigma^2 &= \frac{\text{RSS}}{n - 2} \\
> > &= \frac{0.019}{3} \\
> > &= 0.006333 \\
> > \text{SE}(\hat\beta_1) &= \sqrt{\frac{\hat\sigma^2}{S_{xx}}} \\
> > &= \sqrt{0.0006333} \\
> > &= 0.02517 \\
> > t &= \frac{0.61}{0.02517} \\
> > &= 24.2
> > \end{align*}
> > $$
> > $24.2 > 3.182$, so the slope is clearly non-zero. The test rests on the OLS assumptions, though — independent, constant-variance errors around a *linear* trend — and five points give only $3$ degrees of freedom. A significant slope confirms there is a trend; it does not validate extrapolating the straight line several years out.
