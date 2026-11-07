---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:29cf25bfce972c9b0b662543bc4e9c7b2522631d9a4a540db8a551dce9d3be76
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.3.3 pp.92-99 (PDF 102-109): residual plot e_i = y_i - y-hat_i vs fitted values; U-shape = non-linearity, quadratic term (Fig 3.9); funnel = heteroscedasticity, log Y or sqrt Y remedy (Fig 3.11); outlier vs high leverage (Figs 3.12-3.13), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Weisberg, Applied Linear Regression, 4th ed. (Wiley 2014), Ch.9 'Regression Diagnostics' (course copy), §9.1.5 Fig 9.2 (null plot; megaphones = nonconstant variance; curvature = non-linearity), sha256:7ecdc82a05367d2107915fe0535c8cbf65a9f47d95ee80b8816e0c5903d507af — https://www2.stat.duke.edu/courses/Fall21/sta521.001/papers/Applied_Linear_Regression_CHAPTER_9_Regression_Diagnostics.pdf"
    - "Penn State STAT 501, Lesson 11 'Influential Points', §11.3 internally studentized residual (Minitab: standardized), §11.5 Cook's D_i depends on both e_i and h_ii, sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §6.3.1 pp.67-69 (PDF 77-79: deviance residuals), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "statsmodels, GLMResults.resid_pearson documentation: Pearson residuals = (endog - mu)/sqrt(VAR(mu)), VAR the family's variance function, sha256:a88ec9a98794d3c906c89c6c4b33107e34c78c23e4dc287d3caba054520a9882 — https://www.statsmodels.org/stable/generated/statsmodels.genmod.generalized_linear_model.GLMResults.resid_pearson.html"
    - "Larsen, 'Generalized Linear Models' (CAS Study Note, rev. 6/29/2016; MAS-I reading), 'QQ and Box Plots to test distribution assumptions' pp.1-2 (Dobson's normal probability plot of the residuals is a QQ plot built from order statistics) and 'Tweedie Distributions' p.2 (Var[Y] = a E(Y)^p, gamma p = 2), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "NIST/SEMATECH e-Handbook §1.3.3.21 'Normal Probability Plot' (vertical axis: ordered response values; horizontal: normal order statistic medians; fitted reference line; used on model residuals), sha256:bdb6715e4dad4cf3d99e06540b85c460d925bb54af4d94d07e35e04dac6e0749 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprpl.htm"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Residual Plot.md
---

![[Media/Figures/Residual_Plot.svg|340]]

A **Residual Plot** is a graph of a fitted model's [[Residual|residuals]] against the [[Fitted Values|fitted values]], a predictor, or another variable, used to check the model's assumptions. The residual of observation $i$ is

> $$e_i = y_i - \hat{y}_i$$

- $y_i$ is the observed response, and $\hat{y}_i$ is its fitted value.

The standardized residual divides the residual by its estimated standard deviation:

> $$r_i = \frac{e_i}{\hat{\sigma}\sqrt{1 - h_{ii}}}$$

- $\hat{\sigma}$ is the estimate of the error standard deviation.
- $h_{ii}$ is the leverage of observation $i$, from the [[Hat Matrix|hat matrix]].

If the model is right, the residuals scatter randomly in a band of constant width centred on zero. A pattern in the plot shows which assumption fails:

| Pattern | Meaning |
| --- | --- |
| A random band centred on zero, with constant spread | The mean structure and the variance are adequate |
| Curvature | The predictor's effect is nonlinear, and a term such as a quadratic is needed |
| A trend, or residuals systematically positive in one region | A predictor is missing or wrongly specified |
| A spread that grows or shrinks across the plot (a fan) | [[Heteroscedasticity]]: the variance is not constant |
| Isolated points far from zero | [[Outlier|Outliers]] |

> [!example]- A linear regression of claim severity on vehicle value is fitted. The residuals plotted against the fitted values spread out in a fan as the fitted values increase. What does this show, and what model would remove it? {Example}
> - A spread that grows with the fitted value shows that the variance of severity increases with its mean.
> - The constant-variance assumption of the linear regression fails.
> - A [[Gamma]] GLM with a log link assumes a variance proportional to the square of the mean, which fits this pattern.

## Residuals of a generalized linear model

The raw residuals of a [[Generalized Linear Model|GLM]] have a spread that depends on the mean, so a GLM's residual plot uses residuals scaled by the [[Variance Function|variance function]] $V(\mu)$. The Pearson residual is

> $$r_i^P = \frac{y_i - \hat{\mu}_i}{\sqrt{V(\hat{\mu}_i)}}$$

- $\hat{\mu}_i$ is the fitted mean of observation $i$.

The [[Deviance Residual|deviance residual]] is the signed square root of the observation's contribution to the deviance. When the variance function is right, the [[Pearson Residual|Pearson residuals]] and the deviance residuals have a roughly constant spread.

## Residuals of a chain-ladder model

[[Mack Chain Ladder Model|Mack's chain-ladder model]] assumes that the variance of the next cumulative loss is proportional to the current cumulative loss. For accident year $i$ at development age $k$, the weighted residual is

> $$\frac{C_{i,k+1} - f_k\, C_{i,k}}{\sqrt{C_{i,k}}}$$

- $C_{i,k}$ is the cumulative loss of accident year $i$ at age $k$.
- $f_k$ is the age-to-age factor from age $k$ to age $k + 1$.
- Under a constant variance, the residual is $C_{i,k+1} - f_k\, C_{i,k}$, with no division.

The weighted residuals are plotted against $C_{i,k}$, the cumulative loss at the earlier age. Residuals scattered randomly around zero with no trend and no change in spread support the variance assumption and the linear development. A trend, such as residuals decreasing with claim size, or a fan shows that the assumption fails.

> [!example]- An accident year has a cumulative loss of 1,000 at age 12 and 1,250 at age 24, and the age-to-age factor from 12 to 24 is 1.20. What is its weighted residual? {Example}
> - The fitted loss at age 24 is $1.20 \times 1{,}000 = 1{,}200$.
> - The residual is $1{,}250 - 1{,}200 = 50$.
> - The weighted residual is $50/\sqrt{1{,}000} = 1.58$.

## Residuals of a bootstrap reserving model

The [[ODP Bootstrap Model|ODP bootstrap model]] assumes that its standardized residuals are independent and identically distributed, with a constant variance. The residuals are plotted against development period, accident year, calendar period and the size of the predicted incremental loss, and a normality plot is drawn. Heteroscedasticity shows as a spread, or a variance computed from the residuals, that differs materially between development periods. A trend in any plot, such as residuals drifting away from zero across calendar periods, or residuals on the normality plot that stray from the straight 45-degree line, shows that the model needs adjusting.

> [!trap] Reading only the residuals against the fitted values
> A model can show a random band against the fitted values and still be wrong for one predictor. Plot the residuals against each predictor too, and in a reserving model against accident year, development period and calendar period.
