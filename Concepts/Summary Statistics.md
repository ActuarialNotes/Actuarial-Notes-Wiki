---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:5389ce26db611ca9d536bceb18a6e8a2dd493f4df1cbca865de006ec3503d4ca
  sources:
    - "Few, 'Effectively Communicating Numbers' (Perceptual Edge 2005), PDF p.6 (tables for look-up, graphs for shape), sha256:4de4c11e00faec2ea5fb3f4f31e240908e8356808a0253938d268359144f3a4e — https://www.perceptualedge.com/articles/Whitepapers/Communicating_Numbers.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.10 PDF p.187 (univariate results distorted), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "SAS/STAT 9.3 User's Guide, PROC MIXED 'Mixed Models Theory', Model Selection: LRT with ML or REML; boundary mixture (Self and Liang), sha256:00898035ad108f69d9ec64c3803312516f8413b9ed5e4970fa25d816fbe40edd — https://support.sas.com/documentation/cdl/en/statug/63962/HTML/default/statug_mixed_sect025.htm"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4 (vignette), PDF p.35 (refit with ML for models differing in fixed effects), sha256:60474d07bdb3a511f804a6cd2e73494fd8eb5713f532e2382f69c5dea2e8782e — https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf"
    - "R documentation AIC {stats}, Description and Details (-2 logLik + k npar, k = log(n) for BIC), sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html"
    - "Bolker et al., GLMM FAQ, LRT on the boundary: p-value approx. twice as large in the single-variance case (Pinheiro and Bates 2000), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Summary Statistics.md
---

**Summary statistics** are a few numbers that condense a data set, or a fitted model, so a reader can take it in at once. For data they measure location, spread, shape and association, usually tabulated by group. For a fitted model they measure fit against complexity: the log-likelihood, [[AIC]], [[BIC]] and, in a [[Linear Mixed Model|linear mixed model]], the estimated [[Variance Components|variance components]]. The sample mean and sample standard deviation of $x_1, \ldots, x_n$ are

> $$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$$

> $$s = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2}$$

> [!example]- Five claims are 1, 2, 2, 3 and 12 (thousands). What are the mean, median and standard deviation? {Example}
> - The mean is $20/5 = 4$, and the median is the middle value, $2$.
> - The squared deviations from 4 sum to $9 + 4 + 4 + 1 + 64 = 82$, so $s = \sqrt{82/4} = 4.53$.
> - The mean sits well above the median because the losses are right-skewed.

## Summary statistics of data

1. **Location**: the [[Sample Mean|mean]] $\bar{x}$ and the [[Median|median]]. For right-skewed severity the mean sits well above the median.
2. **Spread**: the standard deviation $s$ ([[Sample Variance|sample variance]]), the interquartile range $Q_3 - Q_1$, the range, and the [[Coefficient of Variation|coefficient of variation]] $s/\bar{x}$ for comparing spread across variables on different scales.
3. **Shape and completeness**: [[Percentile|percentiles]] (the five-number summary behind a [[Box Plot|box plot]]), the share of zeros, the largest values and the count of [[Missing Data|missing]] values in each column.
4. **Categorical variables and association**: counts, proportions and, in insurance, exposure by level, the [[Correlation|correlation]] matrix for numeric predictors and two-way tables for categorical ones.

A table is used when the reader needs exact values, and a [[Data Visualization|graph]] when the message is a shape or a comparison.

## One-way tables

An insurance one-way table shows exposure, claim count, [[Frequency|frequency]], [[Severity|severity]] and [[Pure Premium|pure premium]] by level, with pure premium equal to frequency times severity. Each is a ratio of sums, not an average of ratios. A combined frequency is total claims over total exposure, which equals the exposure-weighted average of the group frequencies.

Each level's figure is confounded with everything correlated with it, which is why final relativities come from a multivariate model. An apparent effect of one variable may be explained by a third, such as coverage mix, so the pattern is checked within subgroups.

> [!example]- Pleasure use has 6,000 exposures, 300 claims and losses of 1,500,000; commute 3,000, 195 and 1,053,000; business 1,000, 90 and 540,000. What are the frequency, severity and pure premium of each, the relativities to pleasure, and the overall frequency? {Example}
> The figures by use are:
>
> | Use | Frequency | Severity | Pure premium | Relativity |
> | :--- | ---: | ---: | ---: | ---: |
> | Pleasure | 0.0500 | 5,000 | 250.00 | 1.000 |
> | Commute | 0.0650 | 5,400 | 351.00 | 1.404 |
> | Business | 0.0900 | 6,000 | 540.00 | 2.160 |
>
> - The business relativity is $1.80$ in frequency times $1.20$ in severity, which is $2.16$.
> - The overall frequency is $585/10{,}000 = 0.0585$, not the average of the three rows ($0.0683$), because Pleasure carries $60\%$ of the exposure.

## Summary statistics of a fitted mixed model

1. $-2$ times the log-likelihood, by [[Restricted Maximum Likelihood|REML]] or ML, and the [[Likelihood Ratio Test|likelihood ratio test]] between nested models. REML compares random effects or [[Covariance Structure|covariance structures]] with identical fixed effects, and ML compares fixed effects.
2. $\text{AIC} = -2l + 2k$ and $\text{BIC} = -2l + k\ln n$ for choices that are not nested. BIC's penalty per parameter is heavier once $\ln n > 2$, that is $n \geq 8$, so it favours smaller models.
3. The variance components and the implied [[Intraclass Correlation|intraclass correlation]]. Testing whether a variance is zero puts the null on the boundary of the parameter space, so the naive $\chi^2$ p-value is too large. For a single variance component it is halved.
4. A $t$ or $F$ statistic for each fixed effect, which guides [[Variable Selection|variable selection]] alongside the [[Model Diagnostics|diagnostic plots]].

> [!example]- Two mixed models of 500 policy-years with identical fixed effects are fitted by REML: a random intercept (2 covariance parameters, $-2l = 2{,}431.6$) and a random intercept and slope (4 covariance parameters, $-2l = 2{,}420.2$). Which do the likelihood ratio test, AIC and BIC prefer? {Example}
> - The likelihood ratio statistic is $2{,}431.6 - 2{,}420.2 = 11.4$ on 2 degrees of freedom, above $\chi^2_{0.95,2} = 5.99$, so it prefers the slope model.
> - AIC is $2{,}431.6 + 2(2) = 2{,}435.6$ against $2{,}420.2 + 2(4) = 2{,}428.2$, so it prefers the slope model.
> - BIC is $2{,}431.6 + 2\ln 500 = 2{,}444.0$ against $2{,}420.2 + 4\ln 500 = 2{,}445.1$, so it prefers the intercept model.

> [!trap] Average of ratios
> An overall frequency is total claims over total exposure, not the average of the levels' frequencies.
