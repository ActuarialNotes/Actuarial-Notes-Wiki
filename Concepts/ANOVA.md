---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:30cec5245a185a6ca609ab3668488b8e9617abb635f6e6649b0b9801f47b96a7
  sources:
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), Ch.2 'Linear Models for Continuous Data', §2.3.4 hierarchical anova Table 2.2, PDF p.14; §2.5 Tables 2.7-2.8, PDF pp.24-25; §2.6.4 one-way anova Table 2.12, PDF p.31; §2.8 'Analysis of Covariance Models' ('models where some of the predictors are continuous variates and some are discrete factors'), PDF p.42, sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodríguez, G., Lecture Notes on Generalized Linear Models (Princeton WWS 509), App. B 'Generalized Linear Model Theory', §B.3.2 likelihood ratio tests, scaled deviance, exact F for normal errors, phi = 1 for binomial/Poisson, PDF pp.6-7, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §6.2 F-test, eq.(17), printed p.65 (PDF p.75), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 2 §2.6 ANOVA table: SSR, SSE, SSTO, df add up, MSR, MSE, F* = MSR/MSE, sha256:1e70ff328d0ed946e167ac2949a287f8b23c3ae7f407af884fe4c6e447a6be32 — https://online.stat.psu.edu/stat501/Lesson02.html"
    - "Penn State STAT 501 Regression Methods (online course notes), Lesson 6 §6.2 general linear F-test; §6.3 sequential sums of squares, order matters, sha256:23f9fd1867db940775816d73b0313cbcacbc0b7d67bcff3be7b4f02430cf981e — https://online.stat.psu.edu/stat501/Lesson06.html"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning (2nd ed., Springer 2021), §3.2.2 F-statistic (3.23), printed p.76 (PDF p.86), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §7.4.7 'How can we make multiple comparisons?' ('What to do after equality of means is rejected'; the ANOVA F test is a preliminary test; Tukey's method for all pairwise differences, Scheffé's for all contrasts, Bonferroni for a pre-selected group of contrasts), sha256:9817042aaf1da7217dfc789ce4a98c1610cface5e73a9d0babbff034ebf2bc6d — https://www.itl.nist.gov/div898/handbook/prc/section4/prc47.htm"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 4 and 7, p.5; p.6 Hogg 9.1-9.6 and Dobson & Barnett Ch 1-9 for C1-C9, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ANOVA.md
---

![[Media/Figures/ANOVA.svg|340]]

**ANOVA**, the analysis of variance, is the division of the [[Residual Sum of Squares#Total sum of squares|total sum of squares]] of a response into the part a model explains and the part it leaves unexplained, used to test whether the model explains any of the variation. Regression software prints the division as an ANOVA table. For a [[Linear Regression|linear regression]] with an intercept, $p$ predictors and $n$ observations, the ANOVA table is:

| Source | Sum of squares | Degrees of freedom | Mean square |
| --- | --- | --- | --- |
| Regression | $\text{TSS} - \text{RSS}$ | $p$ | $(\text{TSS} - \text{RSS})/p$ |
| Residual | $\text{RSS}$ | $n - p - 1$ | $\text{RSS}/(n - p - 1)$ |
| Total | $\text{TSS}$ | $n - 1$ | |

In both the sum of squares and the degrees of freedom columns, the regression and residual rows add up to the total row. The residual mean square is $\hat\sigma^2$, the estimate of the error variance. The test of $H_0\colon \beta_1 = \cdots = \beta_p = 0$, that no predictor is related to the response, against the alternative that at least one $\beta_j$ is not zero, uses the statistic

> $$F = \frac{(\text{TSS} - \text{RSS})/p}{\text{RSS}/(n - p - 1)}$$

- Under $H_0$, $F$ has an [[F-Distribution|$F$ distribution]] with $p$ and $n - p - 1$ degrees of freedom.

$H_0$ is rejected at level $\alpha$ when $F$ exceeds the upper-$\alpha$ critical value of that distribution. Software output gives $p$ as the numerator degrees of freedom of $F$ and $n - p - 1$ as the residual degrees of freedom, from which $n$ follows.

> [!example]- A regression with 2 predictors and an intercept is fitted to 50 observations, with $\text{TSS} = 1{,}000$ and $\text{RSS} = 320$. Is the regression significant at the 5% level? {Example}
> - The regression sum of squares is $1{,}000 - 320 = 680$ on $p = 2$ degrees of freedom, a mean square of 340.
> - The residual sum of squares is 320 on $50 - 2 - 1 = 47$ degrees of freedom, a mean square of $6.8$.
> - $F = 340/6.8 = 50$.
> - The 5% critical value of $F$ with 2 and 47 degrees of freedom is $3.195$, so $H_0$ is rejected: at least one predictor is related to the response.

## One-way analysis of variance

One-way ANOVA tests whether the means of $J$ groups are equal. It is the regression of the response on $J - 1$ group indicators, so the regression sum of squares is the between-group sum of squares, and the RSS is the within-group sum of squares $\sum_j \sum_i (y_{ij} - \bar{y}_j)^2$. The statistic is

> $$F = \frac{(\text{TSS} - \text{RSS})/(J - 1)}{\text{RSS}/(n - J)}$$

- $\bar{y}_j$ is the mean of group $j$, and $n$ is the total number of observations.
- Under $H_0$ that all the group means are equal, $F$ has an $F$ distribution with $J - 1$ and $n - J$ degrees of freedom.

When $H_0$ is rejected, [[Multiple Comparisons|multiple comparison]] procedures find which means differ. Adding a continuous covariate to the group indicators gives an [[Analysis of Covariance|analysis of covariance]].

> [!example]- Claim severities from three territories, 10 claims each, give a between-group sum of squares of 1,200 and a within-group sum of squares of 5,400. Do the mean severities differ at the 5% level? {Example}
> - The between-group mean square is $1{,}200/(3 - 1) = 600$.
> - The within-group mean square is $5{,}400/(30 - 3) = 200$.
> - $F = 600/200 = 3.0$.
> - The 5% critical value of $F$ with 2 and 27 degrees of freedom is $3.354$, so $H_0$ is not rejected: the data do not show different mean severities.

## F test for nested models

To test whether $q$ of the coefficients of a model with $p$ predictors are all zero, the restricted model without them is compared with the full model by the statistic

> $$F = \frac{(\text{RSS}_0 - \text{RSS})/q}{\text{RSS}/(n - p - 1)}$$

- $\text{RSS}_0$ is the residual sum of squares of the restricted model, and $\text{RSS}$ is that of the full model.
- Under $H_0$, $F$ has an $F$ distribution with $q$ and $n - p - 1$ degrees of freedom.

The overall test is the case $q = p$, in which the restricted model has only the intercept and $\text{RSS}_0 = \text{TSS}$. A sequential ANOVA table lists, for each predictor in the order it entered the model, the drop in RSS from adding it, so a predictor's row depends on the predictors entered before it.

> [!example]- With 24 observations, a model with 1 predictor has $\text{RSS}_0 = 18.0$. Adding a 3-level factor, as 2 indicators, gives $\text{RSS} = 12.0$. Is the factor significant at the 5% level? {Example}
> - The full model has $p = 3$ predictors, so its residual degrees of freedom are $24 - 3 - 1 = 20$.
> - The numerator is $(18.0 - 12.0)/2 = 3.0$ and the denominator is $12.0/20 = 0.6$, so $F = 5.0$.
> - The 5% critical value of $F$ with 2 and 20 degrees of freedom is $3.493$, so the factor is significant.

## Analysis of deviance

A [[Generalized Linear Model|generalized linear model]] is compared with a smaller model nested in it by the change in [[Deviance|deviance]]. Scaled by the [[Dispersion Parameter|dispersion parameter]] $\phi$, the change is approximately chi-squared:

> $$\frac{D_0 - D}{\phi} \sim \chi^2_q$$

- $D_0$ is the deviance of the smaller model and $D$ that of the larger model.
- $q$ is the number of parameters the larger model adds, which is the difference in their residual degrees of freedom.

A categorical predictor with $J$ levels adds $J - 1$ parameters. For the Poisson and binomial distributions $\phi = 1$, so the change in deviance itself is compared with the chi-squared critical value. When $\phi$ is estimated, the statistic $F = (D_0 - D)/(q\hat\phi)$ is compared with an $F$ distribution. A significant drop in deviance means the added terms are needed, and otherwise they can be dropped.

> [!example]- A Poisson log-linear model has deviance 25.3 on 12 degrees of freedom. Adding an interaction gives deviance 14.1 on 9 degrees of freedom. Is the interaction needed at the 5% level? {Example}
> - The change in deviance is $25.3 - 14.1 = 11.2$ on $12 - 9 = 3$ degrees of freedom.
> - The 5% critical value of $\chi^2_3$ is $7.815$.
> - $11.2 > 7.815$, so the interaction is needed.
