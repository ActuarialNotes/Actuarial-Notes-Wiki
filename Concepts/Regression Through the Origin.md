---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:cb078481b6269d99059e5d34192e0b1f377fb7ee3d97b22511069600d20ff1f3
  sources:
    - "Larsen, Generalized Linear Models, CAS Study Note (rev. 6/29/2016), 'Regression Through the Origin', PDF p.1: intercept zero or left out; dropped when its test shows it not significantly different from zero; 'can lead to non-intuitive results'; for a general linear model it implies a zero response when all explanatory variables are zero, 'which may not yield sensible results', sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Paul, D., 'Regression through the origin', Statistics LibreTexts (UC Davis), pageRevision 10, last modified 17 Aug 2020: proportional response / profit vs sales / insignificant intercept; errors uncorrelated, mean 0, variance sigma^2; b = sum XY / sum X^2, E(b) = beta; SSE = sum Y^2 - b^2 sum X^2; MSE = SSE/(n-1) unbiased, d.f. n-1; Var(b) = sigma^2/sum X^2; CI b ± t(1-alpha/2; n-1) s(b); SSTO = sum Y^2 with n d.f., SSR 1 d.f., sha256:1ab7ee828c0be9b0fc905be543dbc26e7f96577fc9086a72712491b866017b78 (HTML as fetched; the page embeds per-request session tokens) — https://stats.libretexts.org/Bookshelves/Computing_and_Modeling/Supplemental_Modules_(Computing_and_Modeling)/Regression_Analysis/Simple_linear_regression/Regression_through_the_origin"
    - "Eisenhauer, J.G., 'Regression through the Origin', Teaching Statistics 25(3):76-80 (2003), doi:10.1111/1467-9639.00136 (metadata confirmed via Crossref): pp.76-77 a priori zero intercept, Hocking 'if the data are far from the origin, we have no evidence that the linearity applies'; p.77 RTO residuals usually have a nonzero mean and the cross-product term is nonzero, so the usual decomposition fails; p.78 centred R^2 can be negative; R^2 = sum Yhat^2/sum Y^2 is non-negative and 'equals or exceeds' the centred measure; d.f. n, k, n-k; p.79 packages disagree (Excel vs SPSS), SPSS: about-the-origin R^2 'CANNOT be compared'; p.80 compare RTO with OLS by the OLS constant's p-value and the two standard errors. Copy read: third-party repost of the publisher PDF at https://web.ist.utl.pt/~ist11038/compute/errtheory/,regression/regrthroughorigin.pdf, sha256:78184c18dc1d766a484a68353985493c5d3a8d7a4996dcdb3dfc747f554335d5"
    - "R documentation, stats::summary.lm, Value 'r.squared': R^2 = 1 - sum R_i^2 / sum (y_i - y*)^2, 'where y* is the mean of y_i if there is an intercept and zero otherwise', sha256:52be4406a547f6a905ee71eb8737033c90e339e8ff7147af116cb4b2d6376c2c — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.lm.html"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 §2.8, PDF p.43 (the dummies for every level add up to the constant) and p.47 (alternative: drop the constant and give each group its own intercept), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf; App. B §B.1.2, PDF p.3: eta = g(mu) = x'beta, mu = g^-1(x'beta), log and logit links, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "CAS Exam MAS-I Tables (version 01/15/2018), t table two-sided tail 0.05: df 4 = 2.776, df 3 = 3.182 (PDF p.16), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Regression Through the Origin.md
---

**Regression Through the Origin** is a [[Linear Regression|linear regression]] fitted without an intercept, so the fitted response is zero when every predictor is zero. With one predictor, the model is

> $$Y_i = \beta_1 x_i + \varepsilon_i$$

- The errors $\varepsilon_i$ are uncorrelated, with mean $0$ and variance $\sigma^2$.

It suits a response that is proportional to its predictor, such as losses to premium, or a model whose intercept is not significantly different from zero. The [[Ordinary Least Squares|least squares]] estimate of the slope is

> $$\hat\beta_1 = \frac{\sum_{i=1}^{n} x_i y_i}{\sum_{i=1}^{n} x_i^2}$$

The same formula gives the least squares slope of a regression with an intercept when $x$ and $y$ have both been centred to mean zero. If the no-intercept model is correct, $\hat\beta_1$ is [[Unbiasedness|unbiased]], and its variance is

> $$\text{Var}(\hat\beta_1) = \frac{\sigma^2}{\sum_{i=1}^{n} x_i^2}$$

Only one coefficient is estimated, so the error variance is estimated on $n - 1$ degrees of freedom, one more than with an intercept:

> $$\hat\sigma^2 = \frac{1}{n - 1}\sum_{i=1}^{n} (y_i - \hat\beta_1 x_i)^2$$

> [!example]- Five cedants have earned premiums of 10, 20, 30, 40 and 50 and incurred losses of 10, 15, 19, 29.5 and 34. What is the fitted model $y = \beta_1 x$, and what is a 95% confidence interval for $\beta_1$? {Example}
> - $\sum x_i y_i = 3{,}850$ and $\sum x_i^2 = 5{,}500$, so $\hat\beta_1 = 3{,}850/5{,}500 = 0.70$, the expected loss ratio.
> - The fitted values are 7, 14, 21, 28 and 35, so the residuals are $3$, $1$, $-2$, $1.5$ and $-1$.
> - $\hat\sigma^2 = (9 + 1 + 4 + 2.25 + 1)/4 = 4.3125$, and the standard error of $\hat\beta_1$ is $\sqrt{4.3125/5{,}500} = 0.0280$.
> - With $t_{0.025,\,4} = 2.776$, the interval is $0.70 \pm 2.776(0.0280)$, or $(0.622, 0.778)$.

## Residuals and R-squared without an intercept

Without an intercept, the least squares fit makes only $\sum x_i e_i = 0$, so the residuals $e_i = y_i - \hat\beta_1 x_i$ need not sum to zero. The division of $\sum (y_i - \bar{y})^2$ into regression and residual parts no longer holds. Software usually measures $R^2$ about zero instead of about the mean:

> $$R^2 = 1 - \frac{\text{RSS}}{\sum_{i=1}^{n} y_i^2}$$

This $R^2$ is not comparable with the [[R-Squared|$R^2$]] of a model with an intercept. Dropping the intercept always raises the RSS, so the choice between the two models rests on the $t$ test of the intercept in the model with one and on the two residual standard errors, $\hat\sigma$. Both models estimate the same $\sigma$, and dropping a parameter raises the RSS but also adds a degree of freedom, so the residual standard error can fall or rise.

> [!example]- Expenses of 48, 62, 66, 80 and 86 are regressed on policy counts of 10, 12, 14, 16 and 18. With an intercept, the RSS is 23.60, $R^2 = 0.974$ and the intercept's $t$ statistic is 0.41. Through the origin, the software reports $R^2 = 0.999$. Does the no-intercept model fit better? {Example}
> - Through the origin, $\hat\beta_1 = 4{,}976/1{,}020 = 4.878$, and the RSS is 24.93, larger than 23.60 because a parameter was dropped.
> - The reported $0.999$ is $1 - 24.93/24{,}300$, measured about zero, so it cannot be compared with $0.974$.
> - Measured about the mean, the no-intercept fit has $1 - 24.93/907.2 = 0.973$.
> - The intercept is not significant ($t = 0.41$), and the residual standard error is $\sqrt{24.93/4} = 2.50$ through the origin against $\sqrt{23.60/3} = 2.80$ with an intercept.
> - The no-intercept model is preferred on these two grounds, not because of its larger reported $R^2$.

## A categorical predictor without an intercept

Dropping the intercept while keeping an indicator for every level of a [[Categorical Predictor|categorical predictor]] does not force the fit through the origin. The indicators add up to the intercept column, so the model spans the same space, the fitted values are unchanged, and each level gets its own intercept. Recoding a two-level indicator, by swapping which level is 0 and which is 1, changes only the base level. The fitted values and the other coefficients stay the same, and the indicator's coefficient changes sign.

> [!example]- Rural claims of 2 and 4 and urban claims of 7 and 9 are fitted as $\beta_0 + \beta_1 I_{\text{urban}}$, giving $3$ and $5$. What are the coefficients with the indicator recoded as $I_{\text{rural}}$, and with no intercept and both indicators? {Example}
> - With $I_{\text{rural}}$, the base level is urban, so the intercept is the urban mean, 8, and the rural coefficient is $3 - 8 = -5$.
> - With no intercept and both indicators, each coefficient is its level's mean, 3 for rural and 8 for urban.
> - In all three versions the fitted values are 3, 3, 8 and 8.

> [!trap] Forcing the line through the origin on data far from it
> When the observed predictor values are all far from zero, the data say nothing about whether the line really passes through the origin. Dropping the intercept then imposes an assumption the data cannot check, and the model predicts a zero response at zero predictors whether or not that is sensible.
