---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:84dd684dda0d50c62feff9429570007a713bc6ed272a366dad85e3b297c8326b
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (PDF p.7: tables/plots 'of the type shown in the texts'; a language 'such as R'; 'candidates will not be asked to write or interpret R code'), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy; MAS-I reading), §3.3.3 'Potential Problems' pp.92-99 (PDF 102-109): residual plots, U-shape = non-linearity (Fig 3.9); funnel = heteroscedasticity, log Y remedy (Fig 3.11); outlier with ordinary x has little effect; outlier + high leverage the dangerous combination, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501, Lesson 11 'Influential Points', §11.2-11.5: leverage flags, studentized residuals, Cook's D_i depends on both e_i and h_ii and summarises how much all fitted values change when i is deleted, sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11"
    - "UCLA OARC, Regression with Stata, Chapter 2 'Regression Diagnostics': leverage > (2k+2)/n (k predictors); Cook's D conventional cut-off 4/n; avplot used to spot influential points, sha256:de14fccf40c9e9eed21b92e1a9ed432a00abd13f6cb086b80b5af26900cdb30c — https://stats.oarc.ucla.edu/stata/webbooks/reg/chapter2/stata-webbooksregressionwith-statachapter-2-regression-diagnostics/"
    - "Weisberg, Applied Linear Regression, 4th ed. (Wiley 2014), Ch.9 'Regression Diagnostics' (course copy), §9.1.5 residual-plot shapes (Fig 9.2: megaphone = nonconstant variance, curvature = non-linearity); §9.5.4 p.224 AV plots and influence, sha256:7ecdc82a05367d2107915fe0535c8cbf65a9f47d95ee80b8816e0c5903d507af — https://www2.stat.duke.edu/courses/Fall21/sta521.001/papers/Applied_Linear_Regression_CHAPTER_9_Regression_Diagnostics.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5; rank 3 for MAS-I), §2.4.1 p.12 (PDF 22: logged vs unlogged predictor shapes under a log link); §5.4.1-5.4.4 pp.48-55 (PDF 58-65: partial residual plots; binning, polynomial terms, hinge functions); §6.3.1-6.3.2 pp.67-70 (PDF 77-80: deviance residuals, q-q plot, discrete-distribution caveat, binned working residuals), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "R Core, stats::summary.glm documentation (R-devel): third column labelled t ratio if the dispersion is estimated, z ratio if known or fixed by the family; dispersion 1 for binomial and Poisson, otherwise the residual Chi-squared statistic divided by the residual df; cov.scaled = covariance scaled by dispersion, sha256:c7cf5a73225bd54cad2584cf31b1155884c4d359a14de4048b6e11a7acfe9e2d — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.glm.html"
    - "NIST/SEMATECH e-Handbook §6.4.4.8 'Box-Jenkins Model Diagnostics': residuals should be white noise; autocorrelation plot of the residuals; Box-Ljung statistic, sha256:39f5d095ce90f5690064a9f92b68950fc1eda2f2dc623b0e058e8d1d6ff98945 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc448.htm"
    - "Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026), mmps pp.89-91 (smooth of the data vs smooth of the fitted values; GLM smoother a GAM with the model's family, link and weights); avPlots p.14, sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf"
    - "Pinheiro, Bates et al., R package 'nlme' 3.1-171 reference manual (2026): plot.lme examples (standardized residuals vs fitted; 'box-plots of residuals by Subject'); qqnorm.lme examples ('normal plots of random effects', qqnorm(fm1, ~ranef(.))); varIdent (different variances by the levels of a classification factor), sha256:0194d826259d6ef5dfa3d32badccedb7bc6e60c0b5c5d8aec1783ee88f650899 — https://cran.r-project.org/web/packages/nlme/nlme.pdf"
    - "Bates et al., R package 'lme4' 2.0-6 reference manual (2026), anova.merMod argument 'refit': REML-fitted models with different fixed effects have likelihoods that are not directly comparable, sha256:4e4faf83522214402c69a6ed3cfa2b6c8ee96e034fddbce079b2513672a1985c — https://cran.r-project.org/web/packages/lme4/lme4.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain B task 4 (interpret linear mixed model diagnostics and summary statistics to evaluate the model structure and variable selection), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Diagnostics.md
---

**Model Diagnostics** are the plots and statistics used after a model is fitted to check whether its assumptions hold, and which one fails when they do not. They judge the [[Model Fit|quality of fit]] of a model whose overall fit has been measured by [[Deviance|deviance]], [[AIC]] or [[R-Squared|$R^2$]]. A multivariate method such as a [[Generalized Linear Model|GLM]] provides these diagnostics, with standard errors and significance tests, where a one-way analysis provides none. Each assumption has its own diagnostics:

| Assumption | Diagnostic | Sign that it fails |
| --- | --- | --- |
| Mean structure | Residual plot against the fitted values and against each predictor, marginal model plot, added variable plot | A trend or curvature, or two smooths that separate |
| Variance | Residual plot against the fitted values, box plots of residuals by group | A spread that changes across the plot |
| Distribution | QQ plot of the residuals | Points that stray from the straight reference line |
| Independence | Residuals against time or collection order | Runs of residuals with the same sign |
| Influence | Leverage, Cook's distance | A record whose removal changes the estimates materially |

Each plot has its own page: the [[Residual Plot|residual plot]], the [[Marginal Model Plot|marginal model plot]], the [[Added Variable Plot|added variable plot]] and the [[QQ Plot|QQ plot]]. A plot of [[Pearson Residual|Pearson residuals]] against a candidate variable not in the model shows, by a pattern, that adding the variable would improve the model. An [[Outlier|outlier]] in a residual plot, or residuals that stray from the line of a QQ plot, are signs that the model needs adjusting.

## Remedies for a nonlinear predictor

When a residual plot or a marginal model plot shows that a continuous predictor's effect is not linear, the linear term is replaced by one of three terms:

1. A banded term, which groups the predictor's values into ranges and treats them as levels of a [[Categorical Predictor|categorical predictor]].
2. A piecewise linear term, which fits a separate slope on each segment of the predictor.
3. A [[Regression Spline|spline]] term, which fits a smooth curve.

A piecewise linear term with one hinge point $k$ adds to the linear predictor

> $$\beta_1 x + \beta_2 \max(x - k,\, 0)$$

- $x$ is the predictor's value.
- $\beta_1$ is the slope below $k$, and $\beta_1 + \beta_2$ is the slope above $k$.

> [!example]- A model includes driver age through $\beta_1 x + \beta_2 \max(x - 40, 0)$ with $\hat{\beta}_1 = 0.02$ and $\hat{\beta}_2 = 0.03$. What does the term add to the linear predictor for a driver aged 60? {Example}
> - The first part is $0.02 \times 60 = 1.2$.
> - The driver is $60 - 40 = 20$ years past the hinge, so the second part is $0.03 \times 20 = 0.6$.
> - The term adds $1.2 + 0.6 = 1.8$ to the linear predictor.

## Heteroscedasticity

[[Heteroscedasticity]] is a variance of the errors that is not constant across observations. It is checked by plotting the residuals against the predicted values, against each predictor and by group, for example with side-by-side box plots. When the model's variance function is specified correctly, it absorbs the heteroscedasticity, and the normalized residuals of the refitted model show a roughly constant spread.

## Cook's distance

Cook's distance measures the influence of observation $i$ on the fitted model: how much the parameter estimates change when the observation is removed. For a linear regression with $p$ predictors and an intercept, Cook's distance is

> $$D_i = \frac{r_i^2}{p + 1} \cdot \frac{h_{ii}}{1 - h_{ii}}$$

- $r_i = \dfrac{e_i}{\hat{\sigma}\sqrt{1 - h_{ii}}}$ is the standardized residual of observation $i$.
- $h_{ii}$ is the leverage of observation $i$, the $i$th diagonal element of the [[Hat Matrix|hat matrix]] $\mathbf{H}$.
- $p + 1$ is the number of coefficients, including the intercept.

Written in terms of the residual $e_i$ and the error variance estimate $\hat{\sigma}^2$, Cook's distance is

> $$D_i = \frac{e_i^2}{(p + 1)\,\hat{\sigma}^2} \cdot \frac{h_{ii}}{(1 - h_{ii})^2}$$

An observation is classified as influential when $D_i$ exceeds a chosen threshold, often 1. An observation with a leverage near 1 can have a large $D_i$ even with a small residual.

> [!example]- A regression with 4 predictors and an intercept is fitted to 50 policies. Policy A has leverage 0.30 and standardized residual 2.1. Policy B has leverage 0.04 and standardized residual 3.0. Which policy is more influential? {Example}
> - For policy A, $D_A = \frac{2.1^2}{5} \times \frac{0.30}{0.70} = 0.378$.
> - For policy B, $D_B = \frac{3.0^2}{5} \times \frac{0.04}{0.96} = 0.075$.
> - Policy B has the larger residual, but its low leverage keeps its influence small.
> - Policy A is more influential, although neither exceeds the threshold of 1.

> [!trap] Treating a large residual as an influential point
> A large residual makes an observation an outlier, but its influence also depends on its leverage. An outlier among typical predictor values barely moves the fit, while a high-leverage point with a modest residual can move it a great deal.
