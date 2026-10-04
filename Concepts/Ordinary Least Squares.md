---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:00cc886956eddc4a18d16030ddf3c776e45ab26891c429adcc62333b87667a26
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
