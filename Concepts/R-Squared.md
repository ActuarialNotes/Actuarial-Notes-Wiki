---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:683dc3afe259852207c941cbadd0c5391f90895c4e7466683a15f6cf27a6ae0b
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.1.3 R² = 1 - RSS/TSS (3.17), between 0 and 1 (for the least squares fit of a model with an intercept), printed p.70 (PDF p.80); §3.2.2 R² always increases as variables are added, printed pp.79-80 (PDF pp.89-90); §6.1.3 adjusted R² (6.4), printed pp.234-235 (PDF pp.242-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; Penn State STAT 501 Regression Methods (online course notes), Lesson 10 §10.3 adjusted R² = 1 - ((n-1)/(n-p))(SSE/SSTO), p = parameters incl. intercept, sha256:c5c4744b68f627609bd40ed82d3a571ed3aa6c2231469ddbac18d5b8cc94313c — https://online.stat.psu.edu/stat501/Lesson10.html; Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.3 'Logit Models for Binary Data', §3.8 pseudo-R² as the proportion of deviance explained relative to the null model, PDF p.50, sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf; Eisenhauer, J.G., 'Regression through the Origin', Teaching Statistics 25(3):76-80 (2003), doi:10.1111/1467-9639.00136: p.78 (PDF p.3) with no constant the cross-product term is generally nonzero, so the usual decomposition fails, and if the fit is poor enough sum(Y - Yhat)^2 > sum(Y - ybar)^2 and equation (4) gives 'an implausibly negative (and thus uninterpretable) coefficient of determination'; R^2 about the origin is strictly non-negative and equals or exceeds equation (4); p.79 (PDF p.4) Excel applies (4) regardless of an intercept and can give negative R^2, SPSS's no-intercept R Square 'CANNOT be compared to R Square for models which include an intercept'. Copy read: third-party repost of the publisher PDF, sha256:78184c18dc1d766a484a68353985493c5d3a8d7a4996dcdb3dfc747f554335d5 — https://web.ist.utl.pt/~ist11038/compute/errtheory/,regression/regrthroughorigin.pdf; Paul, D. & Li, Y., 'Regression through the origin', Statistics LibreTexts (UC Davis), pageRevision 10, last modified 17 Aug 2020: through the origin the ANOVA decomposition is SSTO = sum Y_i^2 with n d.f., SSR with 1 d.f. (not the usual sum (Y - Ybar)^2), sha256:a85654900da2e113630a696e041d0a5f67b8b9d97f70a56a2cbe2dbae8ce0fde (HTML as fetched; the page embeds per-request tokens) — https://stats.libretexts.org/Bookshelves/Computing_and_Modeling/Supplemental_Modules_(Computing_and_Modeling)/Regression_Analysis/Simple_linear_regression/Regression_through_the_origin; CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "James, Witten, Hastie & Tibshirani, ISLR 2nd ed. (2021), eq.(3.23) printed p.76 (F = ((TSS-RSS)/p)/(RSS/(n-p-1))) and eq.(3.17) printed p.70 (R^2 = 1 - RSS/TSS), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Ruczinski, JHSPH 140.752 notes ch.11, §11.3 The Overall F-Test (F = (RSS_H - RSS)/(p-1) / (RSS/(n-p)), H: all slopes zero, intercept model) and Theorem 11.18 (1 - R^2 = RSS/TOTAL SS), PDF p.6, sha256:8209540855eeb5ad38335b76d71f016b2216a480cde2c4e76659de15cefb53b7 — https://www.biostat.jhsph.edu/~iruczins/teaching/140.752/notes/ch11.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/R-Squared.md
---

![[Media/Figures/R-Squared.svg|340]]

**R-Squared**, $R^2$, also called the coefficient of determination, is the proportion of the total variation in the response that a regression explains. It is

> $$R^2 = 1 - \frac{\text{RSS}}{\text{TSS}}$$

- $\text{RSS}$ is the [[Residual Sum of Squares|residual sum of squares]], the variation the model leaves unexplained.
- $\text{TSS} = \sum (y_i - \bar{y})^2$ is the [[Residual Sum of Squares#Total sum of squares|total sum of squares]].

For a [[Ordinary Least Squares|least squares]] fit with an intercept, $R^2$ lies between 0 and 1. In simple linear regression it equals $r^2$, the square of the sample [[Correlation|correlation]] between $x$ and $y$. $R^2$ is one summary over the whole data set, so it says nothing about how well the model fits in any part of the data.

> [!example]- A regression of claim severity on vehicle age has $\text{TSS} = 10{,}000$ and $\text{RSS} = 3{,}500$. What is $R^2$? {Example}
> - $R^2 = 1 - 3{,}500/10{,}000 = 0.65$.
> - Vehicle age explains 65% of the variation in claim severity.

## Adjusted R-squared

$R^2$ never decreases when a predictor is added, even an irrelevant one, and it reaches 1 when the number of coefficients equals the number of observations. Adjusted $R^2$ divides each sum of squares by its degrees of freedom, so it penalizes the number of predictors $p$:

> $$R^2_{\text{adj}} = 1 - \frac{\text{RSS}/(n - p - 1)}{\text{TSS}/(n - 1)}$$

- $n$ is the number of observations.

In terms of $R^2$, the same quantity is

> $$R^2_{\text{adj}} = 1 - (1 - R^2)\,\frac{n - 1}{n - p - 1}$$

Adjusted $R^2$ penalizes only the predictors in the final model, not the search over all the candidates, so after selecting from many candidates it is still optimistic.

> [!example]- A regression with 5 predictors and an intercept, fitted to 50 observations, has $R^2 = 0.65$. What is the adjusted $R^2$? {Example}
> - The residual degrees of freedom are $n - p - 1 = 50 - 5 - 1 = 44$.
> - $R^2_{\text{adj}} = 1 - 0.35(49/44)$, which is $0.6102$.

## The F statistic in terms of R-squared

The [[ANOVA|overall $F$ statistic]] of a regression with an intercept depends on the sums of squares only through $\text{RSS}/\text{TSS}$. Dividing its numerator and denominator by TSS gives

> $$F = \frac{R^2/p}{(1 - R^2)/(n - p - 1)}$$

So $F$ can be found from $R^2$, $n$ and $p$ alone, and solving for $R^2$ gives $R^2 = pF/(pF + n - p - 1)$.

> [!example]- Software reports "F-statistic: 20 on 4 and 45 DF" for a regression with an intercept. What is $R^2$? {Example}
> - The numerator degrees of freedom give $p = 4$, and the denominator degrees of freedom give $n - p - 1 = 45$.
> - $R^2 = \frac{4(20)}{4(20) + 45} = \frac{80}{125} = 0.64$.

## Deviance R-squared of a generalized linear model

For a [[Generalized Linear Model|generalized linear model]], the analogue of $R^2$ is based on the [[Deviance|deviance]]:

> $$R^2_D = 1 - \frac{D}{D_0}$$

- $D$ is the deviance of the fitted model and $D_0$ is the deviance of the model with only an intercept.

> [!example]- A Poisson model has deviance 120, and the intercept-only model has deviance 400. What is the deviance $R^2$? {Example}
> - $R^2_D = 1 - 120/400 = 0.70$.

> [!trap] Comparing models of different sizes by R-squared
> Because $R^2$ never decreases as predictors are added, the larger of two models always has at least the same $R^2$, and a smaller RSS. Use $R^2$ only to compare models with the same number of parameters. Compare models of different sizes with adjusted $R^2$, [[AIC]], [[BIC]] or [[Cross-Validation|cross-validation]].
