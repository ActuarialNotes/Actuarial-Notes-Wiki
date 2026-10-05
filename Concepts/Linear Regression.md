---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:251f63d92f826dd11876aa3082d9e0aec7f3f3cc713c7aaae7053ac796221978
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.1-3.1.3 and §3.2.1-3.2.2, eqs (3.4), (3.17), (3.19), (3.23), (3.25), printed pp.61-80 (PDF pp.71-90); §3.3.3 'Potential Problems' printed pp.92-96 (PDF pp.102-106), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.2.1-2.2.3 normal equations, (X'X)^-1 X'y, BLUE conditions, normality only for small-sample inference, PDF pp.6-9, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.1 normal errors with identity link as a GLM, PDF pp.1-3, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.4 'Poisson Models for Count Data', §4.2 log link, §4.3.2 offset = log exposure, PDF pp.5-7, 10, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 4 §4.2-4.6 residuals vs fits, residuals vs order, normal probability plot of residuals, sha256:af097ae3a85c7cacb40f3a05735bfda4f6a46a26ad26bed95556e7457ac58b6c — https://online.stat.psu.edu/stat501/Lesson04.html"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 12 §12.3 'The bottom line' (holding correlated predictors fixed), sha256:f67694d5ded5e449996b5fde9068686e916b9c1c5cd9245c02badb257c72bc8e — https://online.stat.psu.edu/stat501/Lesson12.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Linear Regression.md
---

**Linear Regression** models a continuous response as a linear function of predictors plus Normal error, with coefficients chosen to minimize the [[Residual Sum of Squares]] (ordinary least squares, OLS). It is the base case of the [[Extended Linear Model]] family: a [[Generalized Linear Model]] with a Normal response and the identity [[Link Function]].

> $$Y_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip} + \varepsilon_i, \qquad \varepsilon_i \stackrel{\text{iid}}{\sim} N(0, \sigma^2)$$

> $$\hat{\boldsymbol\beta} = (\mathbf{X}^{\top}\mathbf{X})^{-1}\mathbf{X}^{\top}\mathbf{y}$$

- The four assumptions — **linearity, independence, constant variance, normality of errors** — are exactly what the diagnostic plots check: a [[Residual Plot]] for the first and third, a [[QQ Plot]] for the fourth
- $\hat\beta_j$ is the change in $E[Y]$ per unit of $x_j$ **holding the other predictors fixed**; with [[Multicollinearity]] present that clause is what makes coefficients unstable
- Fit is summarized by [[R-Squared]] $= 1 - \text{RSS}/\text{SS}_{\text{Tot}}$, with $\hat\sigma^2 = \text{RSS}/(n - p - 1)$ estimating the error variance
- OLS is the [[Maximum Likelihood Estimation|MLE]] under Normal errors, and by Gauss–Markov it is the [[Minimum Variance|minimum-variance]] linear [[Unbiasedness|unbiased]] estimator whenever the errors have mean zero, are uncorrelated and have constant variance ($E[\boldsymbol\varepsilon] = \mathbf{0}$, $\text{Var}(\boldsymbol\varepsilon) = \sigma^2\mathbf{I}$) — normality is needed only for exact tests and intervals in small samples
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
