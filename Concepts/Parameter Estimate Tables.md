---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:b984e79d197deff7357f518536d5e416143e2c413329d853116a4b82bce413d8
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.2 standard errors, t-statistic (3.14) with n-2 df, footnote 3 on the 97.5% t quantile, printed pp.66-67 (PDF pp.76-77); §4.3.2 z-statistic, Table 4.1, printed p.136 (PDF p.146); §4.6.2 Table 4.11 Poisson regression z-statistic, printed p.168 (PDF p.178), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.1 Wald t-test: t with n-p df when sigma² estimated, normal when known, CI with t_(1-alpha/2, n-p), PDF pp.9-10, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.3.1 information matrix X'WX/phi and large-sample normality of the MLE (B.10), PDF pp.5-6, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.3.1-2.3.3 standard error, p-value, confidence interval in GLM output, printed pp.8-10 (PDF pp.18-20), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C task 4 ('Interpret the extended linear model output from statistical software, such as parameter estimate tables and ANOVA tables') and task 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Parameter Estimate Tables.md
---

![[Media/Figures/Parameter_Estimate_Tables.svg|340]]

A **Parameter Estimate Table** is the part of a fitted regression's [[Model Output|output]] that lists, for each coefficient $\beta_j$, its estimate and the test of whether it is zero. A [[Categorical Predictor|categorical predictor]] has one row for each of its levels. Its columns are:

| Column | Contents |
| --- | --- |
| Parameter | The predictor, or the level of a categorical predictor |
| df | 1 for an estimated coefficient, 0 for a base level |
| Estimate | $\hat{\beta}_j$ |
| Standard error | $\text{SE}(\hat{\beta}_j)$, the estimated standard deviation of $\hat{\beta}_j$ |
| $t$ or $z$ value | $\hat{\beta}_j / \text{SE}(\hat{\beta}_j)$ |
| p-value | The probability of a statistic at least as extreme, if $\beta_j = 0$ |

The variance of the estimator $\hat{\beta}_j$ is the square of its standard error, so variances are compared by squaring the standard errors.

## Test of a coefficient

The test of $H_0: \beta_j = 0$ is a Wald test. Its statistic is

> $$t_j = \frac{\hat{\beta}_j}{\text{SE}(\hat{\beta}_j)}$$

- $\hat{\beta}_j$ is the estimate of the coefficient $\beta_j$.
- $\text{SE}(\hat{\beta}_j)$ is its standard error.

In a [[Linear Regression|linear regression]] with an intercept and $p$ predictors fitted to $n$ observations, $t_j$ is compared with a [[Student's t-Distribution|$t$ distribution]] with $n - p - 1$ degrees of freedom. In a [[Generalized Linear Model|GLM]] with a fixed dispersion, such as a Poisson or logistic regression, it is labelled $z$ and compared with the standard normal distribution, so its two-sided p-value is

> $$p = 2\left[1 - \Phi(|z|)\right]$$

- $\Phi$ is the standard normal cdf.

The predictor is statistically significant at level $\alpha$ when $p < \alpha$, and $H_0$ is rejected. When $p > \alpha$, the predictor is not significant and is a candidate to drop from the model. The fixed-effects table of a [[Linear Mixed Model|linear mixed model]] is read the same way.

> [!example]- A Poisson GLM reports a coefficient of 0.30 with standard error 0.12. Is the predictor significant at the 5% level? {Example}
> - The test statistic is $z = 0.30/0.12 = 2.5$.
> - The p-value is $2[1 - \Phi(2.5)] = 2(1 - 0.99379) = 0.0124$.
> - $0.0124 < 0.05$, so the predictor is significant at the 5% level.

## Confidence interval for a coefficient

A $100(1 - \alpha)\%$ confidence interval for $\beta_j$ in a linear regression is

> $$\hat{\beta}_j \pm t_{\alpha/2,\, n-p-1}\, \text{SE}(\hat{\beta}_j)$$

- $t_{\alpha/2,\, n-p-1}$ is the value that a $t$ distribution with $n - p - 1$ degrees of freedom exceeds with probability $\alpha/2$.

With more than about 100 residual degrees of freedom, the $t$ distribution is close to normal, and the 95% value is close to 1.96.

> [!example]- A linear regression with 4 predictors is fitted to 30 observations. A coefficient is estimated as 1.5 with standard error 0.4. What is a 95% confidence interval for it? {Example}
> - The residual degrees of freedom are $30 - 4 - 1 = 25$, and $t_{0.025,\,25} = 2.060$.
> - The half-width is $2.060 \times 0.4 = 0.824$.
> - The interval is from 0.676 to 2.324.

## Linear predictor from the table

The linear predictor $\eta_i$ for an observation adds the intercept, the coefficient of each categorical level the observation falls in (the level whose range contains its value), and each numeric coefficient times the predictor's value. A base level has df 0 and coefficient 0, so it adds nothing. A predictor entered as a logarithm contributes its coefficient times $\ln x_{ij}$. Under a log link, the fitted mean is

> $$\mu_i = e^{\eta_i}$$

> [!example]- A Poisson frequency GLM with a log link reports an intercept of $-2.10$, territory A (df 0) 0, territory B 0.25 and vehicle age $-0.03$ per year. What is the expected claim frequency for a territory B vehicle that is 5 years old? {Example}
> - The linear predictor is $\eta = -2.10 + 0.25 - 0.03 \times 5 = -2.00$.
> - The expected frequency is $e^{-2.00} = 0.135$.

## Base level and the intercept

When every categorical predictor is at its base level and every numeric predictor is zero, the linear predictor is the intercept. With two-level predictors coded as 0/1 indicators, the intercept is the mean response of the base cell. The coefficient of an indicator is the expected difference between its level and the base level, with the other predictors held fixed. Under a log link, $e^{\hat{\beta}_j}$ is the multiplicative effect of that level relative to the base level.

Changing the base level changes the coefficients but not the fitted values. The new intercept is the old model's fitted value for the new base level with the other predictors at zero, which is the old intercept plus the new base level's coefficient.

> [!example]- A linear regression of salary on experience and an indicator Male (1 for male, 0 for female) gives an intercept of 50.0 and a Male coefficient of 6.0. The model is refitted with an indicator Female instead. What are the new intercept and the Female coefficient? {Example}
> - Males are the new base level.
> - The old model's fitted salary for a male with zero experience is $50.0 + 6.0 = 56.0$, so the new intercept is 56.0.
> - A female's fitted salary is 6.0 lower than a male's, so the Female coefficient is $-6.0$.
> - The experience coefficient and every fitted value are unchanged.

> [!trap] Comparing p-values across different degrees of freedom
> The same $t$ statistic gives a larger p-value when there are fewer degrees of freedom, because the $t$ distribution's tails are heavier. A $t$ statistic of 2.2 has a two-sided p-value of 0.079 on 5 degrees of freedom and 0.032 on 60, so a larger $t$ statistic does not always mean a smaller p-value.
