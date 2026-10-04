---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:d4355f33351e2b3c95da4a0c3eb78c32c1076c0ebf2779000b21089ffc5d42f0
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy), §3.3.3 'Potential Problems' pp.92-102 (PDF pp.102-112): residual plots, U-shape = non-linearity (Fig 3.9); correlated errors and tracking vs time (Fig 3.10); funnel = heteroscedasticity, log Y remedy (Fig 3.11); outliers, studentized residuals beyond ±3 (Fig 3.12); leverage statistic, average (p+1)/n (eq 3.37, Fig 3.13); VIF, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Weisberg, Applied Linear Regression, 4th ed. (Wiley 2014), Ch.9 'Regression Diagnostics' (course copy): intro p.204; §9.1.5 residual-plot shapes (megaphone = nonconstant variance, curvature = wrong mean function) pp.209-210; §9.5.1-9.5.3 Cook's distance D_i = (r_i^2/p')h_ii/(1-h_ii), the distance between Y-hat and Y-hat(i), D_i near 1 as calibration pp.220-221; §9.5.4 added-variable plots and influence pp.224-225; §9.6 normal probability plots pp.225-226, sha256:7ecdc82a05367d2107915fe0535c8cbf65a9f47d95ee80b8816e0c5903d507af — https://www2.stat.duke.edu/courses/Fall21/sta521.001/papers/Applied_Linear_Regression_CHAPTER_9_Regression_Diagnostics.pdf"
    - "Penn State STAT 501, Lesson 11 'Influential Points': §11.2 leverages sum to p (parameters incl. intercept), flag h_ii > 3p/n or 2p/n; §11.3 internally studentized residual e_i/sqrt(MSE(1-h_ii)), |r| > 3 an outlier; §11.4 externally studentized ~ t(n-1-p); §11.5 Cook's D_i = e_i^2/(p MSE) x h_ii/(1-h_ii)^2, summarises how much all fitted values change when i is deleted, D > 0.5 investigate, D > 1 likely influential, sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5): §2.4.1 logging continuous variables pp.11-12 (PDF 21-22); §2.4.3 base level p.15; §6.1.2 scaled deviance D* = 2(ll_sat - ll_model) p.63 (PDF 73); §6.2 F-test, AIC, BIC pp.64-67; §6.3.1 deviance residuals, q-q plot, discrete-distribution caveat pp.67-69 (PDF 77-79); §6.3.2 binned working residuals pp.70-73; §6.4 Cook's distance, CV, bootstrap p.74; §7.1 actual vs predicted on holdout pp.75-76; §7.2.1 quantile plots p.77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "statsmodels, GLMResults.resid_pearson documentation: Pearson residuals = (endog - mu)/sqrt(VAR(mu)), VAR the family's variance function, sha256:a88ec9a98794d3c906c89c6c4b33107e34c78c23e4dc287d3caba054520a9882 — https://www.statsmodels.org/stable/generated/statsmodels.genmod.generalized_linear_model.GLMResults.resid_pearson.html"
    - "Larsen, 'Generalized Linear Models' (CAS Study Note, rev. 6/29/2016), 'QQ and Box Plots to test distribution assumptions' pp.1-2 (Dobson's normal probability plot of the residuals is a QQ plot built from order statistics) and 'Tweedie Distributions' p.2 (gamma: variance power p = 2), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "NIST/SEMATECH e-Handbook §1.3.3.21 'Normal Probability Plot': a model is fit and a normal probability plot is generated for the residuals; departures from a straight line indicate departures from normality, sha256:bdb6715e4dad4cf3d99e06540b85c460d925bb54af4d94d07e35e04dac6e0749 — https://www.itl.nist.gov/div898/handbook/eda/section3/normprpl.htm"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (p.7), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Residual Plot.md
---

A **Residual Plot** is a diagnostic graph used to assess model fit by plotting **residuals** (observed minus fitted values) against fitted values, a predictor, or another variable. Patterns in residuals indicate model deficiencies.

> $$e_i = y_i - \hat{y}_i \quad \text{(raw residual)}$$

> $$r_i = \frac{e_i}{\hat{\sigma}\sqrt{1 - h_{ii}}} \quad \text{(standardized/studentized residual)}$$

**How to read residual plots:**

| Pattern | Implication |
| :--- | :--- |
| Random scatter around zero | Model is adequate |
| Fan shape (spread increases) | **Heteroscedasticity** — variance is not constant |
| Curved pattern | **Non-linearity** — a transform or polynomial term is needed |
| Systematic trend | A predictor is missing or improperly specified |
| Outliers | Influential observations; investigate further |

- For [[Generalized Linear Model]]s, **Pearson residuals** $r_i^P = (y_i - \hat{\mu}_i)/\sqrt{V(\hat{\mu}_i)}$ and **deviance residuals** are used instead of raw residuals
- **Residuals vs. fitted**: checks for non-linearity and heteroscedasticity
- **Residuals vs. predictor**: checks whether a variable's effect is correctly specified
- A **Normal [[QQ Plot]]** of residuals checks the normality assumption

![[Media/Figures/Residual_Plot.svg|340]]

> [!example]- Identifying Heteroscedasticity in a Residual Plot {Example}
> After fitting a linear regression of claim severity on vehicle value, the residual plot shows residuals spreading out in a fan shape as fitted values increase. What does this suggest?
>
> > [!answer]-
> > The fan shape indicates **heteroscedasticity**: variance of residuals increases with the fitted value. This is typical for positive, right-skewed data like claim severity. Remedies include applying a log transformation to severity or switching to a Gamma [[Generalized Linear Model]] with a log [[Link Function]], which naturally models multiplicative variance.
