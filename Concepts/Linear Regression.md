---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:feace85b1d0a2b45fd6161aa732763bd72bd5a515ce0203eebd491bf4929f713
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §3.2.1 'We interpret βj as the average effect on Y of a one unit increase in Xj, holding all other predictors fixed', printed p.72 (PDF p.82); §3.1.1 RSS and least squares PDF p.72; §3.2.2 F-statistic PDF p.86, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "The Institutes, CAS DISC DA – Introduction to Data and Analytics Course Syllabus (© 2023), Course Syllabus, PDF pp.2-3 (topics 1-10 and their lettered sections), sha256:d4d823238bd55da3339a9a1ad682029c9a7aa9d4bcb0c18b319d499a00f6ba16 — https://www.casact.org/sites/default/files/2022-12/DISC_DA.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Section C tasks 4, 7 (R-squared) and 8 (diagnostic plots); ISLR Ch.3 §§3.1-3.3 a reading, PDF pp.5-6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026, prerequisites (candidates expected to have mastered Exam MAS-I; undergraduate regression course) and Domain B Linear Mixed Models tasks 1-4, PDF pp.5-6, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Rodríguez, Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 §2.2 least squares, PDF pp.6-8, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.4 §4.2-4.3 Poisson log link and offset, PDF pp.5-10, sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016), pp.1-2, sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
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
- Leaving out $\beta_0$, for instance when its test shows it is not significantly different from zero, gives [[Regression Through the Origin|regression through the origin]]: the fitted response is then zero whenever every predictor is zero
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

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 8.3 covers analyzing data with linear functions. Questions give a fitted line or a short coefficient table and ask for a prediction, the meaning of a slope holding the other predictors fixed, or whether a linear model suits the response, as in the claim-count example above.
> - **MAS-I and MAS-II:** Linear regression is the base case of the linear model family: least squares estimates, $R^2$, the $F$ test and the diagnostic plots that check its assumptions.

> [!warning]- Exam traps
> - **Slope without "holding the others fixed":** In a multiple regression, $\hat\beta_j$ is the change in the mean response for a unit change in $x_j$ with the other predictors unchanged, not the one-variable relationship.
> - **Counts and skewed losses:** A Normal linear model can predict negative claim counts and ignores variance that grows with the mean; a GLM is the usual fix.

