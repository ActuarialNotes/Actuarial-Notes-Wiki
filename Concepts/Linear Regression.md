---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:86320f46b9c5701eeb04f05b43756b6ed5114d6f545e5c9c136407d056b79382
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Linear Regression.md
---

**Linear Regression** models a continuous response as a linear function of predictors plus Normal error, with coefficients chosen to minimize the [[Residual Sum of Squares]] (ordinary least squares, OLS). It is the base case of the [[Extended Linear Model]] family: a [[Generalized Linear Model]] with a Normal response and the identity [[Link Function]].

> $$Y_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + \varepsilon_i, \qquad \varepsilon_i \stackrel{\text{iid}}{\sim} N(0, \sigma^2)$$

> $$\hat{\boldsymbol\beta} = (\mathbf{X}^{\top}\mathbf{X})^{-1}\mathbf{X}^{\top}\mathbf{y}$$

- The four assumptions — **linearity, independence, constant variance, normality of errors** — are exactly what the diagnostic plots check: a [[Residual Plot]] for the first and third, a [[QQ Plot]] for the fourth
- $\hat\beta_j$ is the change in $E[Y]$ per unit of $x_j$ **holding the other predictors fixed**; with [[Multicollinearity]] present that clause is what makes coefficients unstable
- Fit is summarized by [[R-Squared]] $= 1 - \text{RSS}/\text{SS}_{\text{Tot}}$, with $\hat\sigma^2 = \text{RSS}/(n - p - 1)$ estimating the error variance
- OLS is the [[Maximum Likelihood Estimation|MLE]] under Normal errors, and by Gauss–Markov it is the [[Minimum Variance|minimum-variance]] linear [[Unbiasedness|unbiased]] estimator whenever the errors have constant variance — normality is needed only for the tests and intervals
- Insurance data usually violates the assumptions: severity is right-skewed and its variance grows with the mean, frequency is a non-negative count. That is precisely the motivation for the GLM, not a reason to keep transforming the response
- The overall test that all slopes are zero is the $F$ test in the [[ANOVA]] table; individual coefficients are tested in [[Parameter Estimate Tables]]

![[Media/Figures/Linear_Regression.svg|340]]

> [!example]- Fitting a Simple Regression {Example}
> For a simple regression with $n = 20$, $S_{xx} = 250$, $S_{xy} = 400$, $\bar{x} = 12$, $\bar{y} = 45$. Find the fitted line and the predicted value at $x = 15$.
>
> > [!answer]-
> > $$\hat\beta_1 = \frac{S_{xy}}{S_{xx}} = \frac{400}{250} = 1.6$$
> > $$\hat\beta_0 = \bar{y} - \hat\beta_1\bar{x} = 45 - 1.6(12) = 25.8$$
> > $$\hat{y} = 25.8 + 1.6x \ \Longrightarrow\ \hat{y}(15) = 25.8 + 24 = 49.8$$

> [!example]- When Linear Regression Is the Wrong Tool {Example}
> An actuary regresses claim counts (mostly $0$, $1$, or $2$) on exposure and territory with OLS. The [[Residual Plot]] fans out and some fitted values are negative. What has gone wrong and what should replace it?
>
> > [!answer]-
> > Two assumptions fail at once. A count response has variance that **grows with the mean**, breaking constant variance, and the identity link lets the linear predictor run below zero, producing impossible negative expected counts. The fix is a **Poisson GLM with a log link** ([[Poisson Regression]]), with log exposure as an [[Offset Variable|offset]] — the log link keeps $\hat\mu > 0$ and the Poisson variance function $V(\mu) = \mu$ matches the observed spread.
