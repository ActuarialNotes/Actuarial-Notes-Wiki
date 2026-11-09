---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:f506fe517347bad6ac1ac0196ca89cdca269e6da6eaf7ed568ceaa5da0994a69
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §6.1.2 eqs.15-16 p.63 (PDF 73: scaled deviance, saturated and null models); §6.2 pp.64-67 (F-test, AIC, BIC); §6.3.1 pp.67-69 (PDF 77-79: deviance residuals normal with constant variance; discrete-distribution caveat, randomized quantile and binned working residuals, aggregated data; q-q plot, right tail above the line = more skewed than gamma, inverse Gaussian); §5.4.1 p.48 (partial residual plots for non-linearity); §6.4 p.74 (Cook's distance, CV, bootstrap); §7.1 pp.75-76 (PDF 85-86: actual vs predicted on holdout, sorted by prediction and grouped into percentiles); §7.2.1 p.77 (quantile plots), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.3.3 pp.92-99 (residuals vs fitted: U-shape = non-linearity, funnel = heteroscedasticity), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026), mmps pp.89-91 (smooth of the data vs smooth of the fitted values, drawn versus each term and versus the fitted values), sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf"
    - "StataCorp, Stata Base Reference Manual (release 19), [R] regress postestimation diagnostic plots, avplot Remarks p.5 (PDF p.5): an AV plot's regression has the same coefficient and SE as the full model; its coordinates 'cannot be used to identify functional form, or, at least, not well'; 'the relationship between y and x is forced to be linear', sha256:2b6a9b898c73d0657d3ce7fbf18a7a23c507d01ad9c1d0543cf7689dc6aa734f — https://www.stata.com/manuals/rregresspostestimationdiagnosticplots.pdf"
    - "Wikipedia, 'Partial regression plot' (citing Velleman & Welsch 1981), Properties 1-4 and the comparison with partial residual plots: LS fit has intercept 0 and slope beta_i; its residuals equal the full model's; mostly used for leverage and influential points; 'the x-axis is not X_i. This limits its usefulness in determining the need for a transformation (which is the primary purpose of the partial residual plot)', sha256:8ecce810efb2f345c2582914e56ad6e8bd2d40dec1e403dd541a5481bc48011a — https://en.wikipedia.org/wiki/Partial_regression_plot"
    - "Weisberg, Applied Linear Regression, 4th ed. (Wiley 2014), Ch.9 'Regression Diagnostics' (course copy), §9.5.4 p.224 (AV plots and influence), sha256:7ecdc82a05367d2107915fe0535c8cbf65a9f47d95ee80b8816e0c5903d507af — https://www2.stat.duke.edu/courses/Fall21/sta521.001/papers/Applied_Linear_Regression_CHAPTER_9_Regression_Diagnostics.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §4.3 p.38 (PDF 48: every polynomial term adds a model degree of freedom); §5.4.3 p.51 (PDF 61: each polynomial term a separate predictor with its own coefficient), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Fit.md
---

**Model Fit** is how closely a fitted model's predictions agree with the observed outcomes. For a [[Generalized Linear Model|generalized linear model]], the fit is summarized by the scaled [[Deviance|deviance]], which is

> $$D^* = 2\left[l_{\text{sat}} - l_{\text{model}}\right]$$

- $l_{\text{sat}}$ is the maximized log-likelihood of the saturated model.
- $l_{\text{model}}$ is the maximized log-likelihood of the fitted model.

The deviance is $D = \phi D^*$, so the scaled deviance is the deviance divided by the [[Dispersion Parameter|dispersion parameter]] $\phi$. The deviance measures how far the model is from the saturated model, so a smaller deviance means a better fit and a large deviance a poor one.

> [!example]- A Poisson GLM has maximized log-likelihood $-1{,}480$, and the saturated model has $-1{,}350$. What is the model's deviance? {Example}
> - The scaled deviance is $D^* = 2[-1{,}350 - (-1{,}480)] = 260$.
> - A Poisson model has $\phi = 1$, so the deviance is also $D = 260$.

## The null model and the saturated model

The fit of every model lies between two extremes:

1. The null model has only an intercept, and it predicts the mean of the response, $\bar{y}$, for every record. Its deviance is the null deviance.
2. The saturated model has as many linearly independent parameters as records. It reproduces every observed response exactly, so its linear predictor is $g(y_i)$ for each record, whatever the link $g$. Its deviance is zero.

## Deviance and added parameters

Adding a parameter to a model never raises its deviance. A lower deviance alone is therefore not a reason to adopt a more complex model, because it would always favour the largest model and lead to overfitting. Nested models are compared by a [[Likelihood Ratio Test|likelihood ratio test]] of the added parameters, and any models by a criterion that charges for each parameter, such as [[AIC]] or [[BIC]].

> [!example]- A Poisson frequency GLM on 20,000 policies has null deviance 9,840. Adding 11 rating-variable parameters lowers the deviance to 9,312. Are the variables significant? {Example}
> - For a Poisson model $\phi = 1$, so the drop in deviance is the likelihood ratio statistic, $9{,}840 - 9{,}312 = 528$.
> - The statistic has 11 degrees of freedom, and $\chi^2_{0.05,\,11} = 19.68$.
> - $528 > 19.68$, so the variables are significant.
> - They explain only $528/9{,}840 = 5.4\%$ of the null deviance, which is usual for claim counts, where most of the variation is random.

## Diagnostic plots of fit

The [[Model Diagnostics|diagnostic plots]] show where a model fits badly:

1. A [[Residual Plot|residual plot]] against the fitted values shows a trend when the mean is misspecified and a fan when the variance function is wrong.
2. A [[Marginal Model Plot|marginal model plot]] overlays a smooth of the observed response and a smooth of the fitted values against each predictor. The two agree when the model captures that predictor's relationship and separate when structure is missing.
3. A [[QQ Plot|QQ plot]] of the [[Deviance Residual|deviance residuals]] should track the reference line with only small random departures, because the deviance residuals of a correct model follow the assumed distribution.

When the deviance residuals of a [[Gamma]] severity model rise above the line at the high end, the claims are more right-skewed than the Gamma captures. A distribution with a heavier right tail, such as the inverse Gaussian, is the natural alternative.

## Actual-to-predicted ratio

A rating model's fit is checked on a [[Holdout Sample|holdout sample]] by grouping the records and comparing actual with predicted losses in each group. The actual-to-predicted ratio of a group is

> $$\frac{\text{total actual losses}}{\text{total predicted losses}}$$

A ratio near 1 indicates a good fit in that group. The fit is judged by how far the ratio is from 1, not by the dollar size of the gap. A better model has ratios close to 1 in every group, such as every quantile of the prediction. An overall ratio near 1 only shows that the total predicted equals the total actual, and it can hide errors that offset at the two ends.

> [!example]- On holdout data, a pure premium model's predicted and actual losses are compared by vehicle age band. Where does the model fit badly? {Example}
>
> | Vehicle age | Predicted | Actual |
> | --- | --- | --- |
> | 0 to 3 years | 1,200,000 | 1,236,000 |
> | 4 to 7 years | 1,500,000 | 1,470,000 |
> | 8 to 11 years | 900,000 | 882,000 |
> | 12 years and over | 400,000 | 460,000 |
>
> - The actual-to-predicted ratios are 1.03, 0.98, 0.98 and 1.15.
> - Overall, the ratio is $4{,}048{,}000/4{,}000{,}000 = 1.012$, so the model is balanced in total.
> - The model under-predicts the oldest vehicles by 15%, which is where it fits badly.

## Model stability

Model stability is the sensitivity of a model's results, such as its relativities, to small changes in the data, such as removing or adding a few records. A record with a large [[Model Diagnostics#Cook's distance|Cook's distance]] is highly influential, because the parameter estimates change materially when it is removed. Estimates that change across [[Cross-Validation|cross-validation]] folds or [[Bootstrap|bootstrap]] samples show a fit that may not hold on new data.

> [!trap] Choosing the model with the lowest deviance
> The deviance never rises when a parameter is added, so the model with the most parameters always has the lowest deviance. Compare models with a likelihood ratio test or with AIC or BIC, which account for the added parameters.
