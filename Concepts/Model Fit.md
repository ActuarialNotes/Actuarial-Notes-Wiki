---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:a6f7c21c390a84d4876c2019cd41e615f736125052e705950aeeb4f0c37b82dd
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5): §2.4.1 logging continuous variables pp.11-12 (PDF 21-22); §2.4.3 base level p.15; §6.1.2 scaled deviance D* = 2(ll_sat - ll_model) p.63 (PDF 73); §6.2 F-test, AIC, BIC pp.64-67; §6.3.1 deviance residuals, q-q plot, discrete-distribution caveat pp.67-69 (PDF 77-79); §6.3.2 binned working residuals pp.70-73; §6.4 Cook's distance, CV, bootstrap p.74; §7.1 actual vs predicted on holdout pp.75-76; §7.2.1 quantile plots p.77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (p.7), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy), §3.3.3 'Potential Problems' pp.92-102 (PDF pp.102-112): residual plots, U-shape = non-linearity (Fig 3.9); correlated errors and tracking vs time (Fig 3.10); funnel = heteroscedasticity, log Y remedy (Fig 3.11); outliers, studentized residuals beyond ±3 (Fig 3.12); leverage statistic, average (p+1)/n (eq 3.37, Fig 3.13); VIF, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026): mmps 'Marginal Model Plotting' pp.89-91 (response vs a linear combination u of the regressors, with a smooth of the data and a smooth of the fitted values on u; drawn versus each term and versus the fitted values/linear predictor; GLM smoother is a GAM with the model's family and link); avPlots 'Added-Variable Plots' pp.11-14 (examples contrast 'marginal plot, ignoring other predictors' with 'AV plot, adjusting for others'); crPlots 'Component+Residual (Partial Residual) Plots' p.39, sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf"
    - "StataCorp, Stata Base Reference Manual (release 19), [R] regress postestimation diagnostic plots, avplot Remarks pp.4-6: added-variable (partial-regression) plot; its regression has the same coefficient as the full model; 'cannot be used to identify functional form, or, at least, not well (see Mallows [1986]). In the construction of the added-variable plot, the relationship between y and x is forced to be linear.', sha256:2b6a9b898c73d0657d3ce7fbf18a7a23c507d01ad9c1d0543cf7689dc6aa734f — https://www.stata.com/manuals/rregresspostestimationdiagnosticplots.pdf"
    - "Wikipedia, 'Partial regression plot' (wikitext retrieved 2026-10-04), citing Velleman & Welsch (1981): construction from two sets of residuals; LS fit has intercept 0 and slope beta_i; its residuals equal the full model's; used mostly to identify high-leverage and influential points; 'the x-axis is not X_i. This limits its usefulness in determining the need for a transformation (which is the primary purpose of the partial residual plot)', sha256:8ecce810efb2f345c2582914e56ad6e8bd2d40dec1e403dd541a5481bc48011a — https://en.wikipedia.org/wiki/Partial_regression_plot"
    - "Weisberg, Applied Linear Regression, 4th ed. (Wiley 2014), Ch.9 'Regression Diagnostics' (course copy): intro p.204; §9.1.5 residual-plot shapes (megaphone = nonconstant variance, curvature = wrong mean function) pp.209-210; §9.5.1-9.5.3 Cook's distance D_i = (r_i^2/p')h_ii/(1-h_ii), the distance between Y-hat and Y-hat(i), D_i near 1 as calibration pp.220-221; §9.5.4 added-variable plots and influence pp.224-225; §9.6 normal probability plots pp.225-226, sha256:7ecdc82a05367d2107915fe0535c8cbf65a9f47d95ee80b8816e0c5903d507af — https://www2.stat.duke.edu/courses/Fall21/sta521.001/papers/Applied_Linear_Regression_CHAPTER_9_Regression_Diagnostics.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Fit.md
---

**Model Fit** is how closely a fitted model's predictions agree with the observed outcomes. It is measured in-sample with likelihood statistics such as [[Deviance]], diagnosed with residual and other [[Model Diagnostics|diagnostic plots]], and, for a rating model, confirmed by comparing actual with predicted results on a [[Holdout Sample|holdout sample]].

> $$D^* = 2\left[\ell_{\text{saturated}} - \ell_{\text{model}}\right]$$

- $D^*$ is the **scaled deviance**. It measures the log-likelihood gap between the model and the saturated model, which has one parameter per record and fits perfectly ($D^* = 0$). The null model (intercept only) marks the other end, so a model's deviance lies between zero and the null deviance. Maximizing likelihood is the same as minimizing deviance.
- The **deviance residual** $d_i$ is the signed square root of record $i$'s contribution to the deviance. If the assumed distribution is right, deviance residuals are roughly normal with constant variance — for a continuous response. For a discrete distribution (Poisson, negative binomial) or one with a point mass (Tweedie, at zero), the many records with the same target value cluster the residuals into tight groups, so they will likely not look normal even when the model is right; use binned working residuals (or randomized quantile residuals) instead. Highly aggregated count data behave more like a continuous response.
- **Fit is not predictive power.** Adding any predictor lowers deviance. In-sample measures therefore compare models only through a test ([[Likelihood Ratio Test]] or $F$-test, for nested models) or a penalty ([[AIC]], [[BIC]]). Whether the fit holds on new data is a holdout question.
- **Diagnostic plots (MAS-I).**
  - [[Residual Plot|Residuals against fitted values]]: a trend means the mean is misspecified (wrong link or a missing term), and a funnel means the wrong [[Variance Function|variance function]].
  - A [[QQ Plot]] of deviance residuals from a continuous response should be close to a straight line; bent tails mean the data are more or less skewed than the assumed distribution.
  - [[Marginal Model Plot|Marginal model plots]] compare a smooth of the data with a smooth of the fitted values against each predictor, and the two should coincide.
  - [[Added Variable Plot|Added variable plots]] show one predictor's effect net of the others, exposing any influential points. They are a weak guide to the predictor's functional form, since the plot forces the relationship to be linear; a partial residual plot is the tool for that.
- **Rating-plan fit (Exam 8).** The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] tests fit where a rating plan needs it: actual against predicted on holdout data, grouped into quantiles of the prediction. Influential records (high Cook's distance) and estimates that swing across cross-validation folds or bootstrap samples flag fit that won't survive new data. [[Model Benchmarking]] then asks whether the model fits better than the current plan.

> [!example]- A Significant Model That "Explains" Little {Example}
> A Poisson frequency GLM on $20{,}000$ policies has null deviance $9{,}840$. With $11$ rating-variable parameters added, the deviance falls to $9{,}312$. Is the fit good?
>
> > [!answer]-
> > For a Poisson model $\phi = 1$, so the drop in deviance is the likelihood ratio statistic:
> >
> > $$
> > \begin{align*}
> > \Delta D &= 9{,}840 - 9{,}312 \\
> > &= 528
> > \end{align*}
> > $$
> >
> > That is far above $\chi^2_{0.05,11} = 19.68$, so the variables are overwhelmingly significant. Yet they explain only $528 / 9{,}840 = 5.4\%$ of the null deviance.
> >
> > That is normal for claim counts. Whether one policy has a claim this year is mostly Poisson noise, which no rating variable can predict, so even the true model would explain little of it. A rating model's fit is judged by how well it predicts **segment averages** and separates good risks from bad on holdout data, not by a pseudo-$R^2$.

> [!example]- Reading a QQ Plot of a Severity Model {Example}
> A Gamma GLM (log link) for claim severity shows deviance residuals with no pattern against fitted values. On the QQ plot, however, the right-most points rise well above the reference line. What does this say, and what should be tried?
>
> > [!answer]-
> > The **mean structure looks right**, since the residuals show no trend or funnel. The **distribution does not**. There are far more large positive deviance residuals than a normal distribution allows, so the claims are more right-skewed than a Gamma captures.
> >
> > A more skewed error distribution, such as the **inverse Gaussian**, is the natural next candidate: refit and check that its residuals line up. Left alone, the Gamma model would understate how variable large claims are, even with sensible relativities.

> [!example]- Actual vs. Expected by Rating Level on Holdout {Example}
> On holdout data, a pure premium model's predicted and actual losses by vehicle-age band are:
>
> - 0-3 years: predicted $\$1{,}200{,}000$, actual $\$1{,}236{,}000$
> - 4-7 years: predicted $\$1{,}500{,}000$, actual $\$1{,}470{,}000$
> - 8-11 years: predicted $\$900{,}000$, actual $\$882{,}000$
> - 12+ years: predicted $\$400{,}000$, actual $\$460{,}000$
>
> Assess the fit.
>
> > [!answer]-
> > The actual-to-predicted ratios are $1.03$, $0.98$, $0.98$ and $1.15$. Overall the ratio is $\$4{,}048{,}000 / \$4{,}000{,}000 = 1.012$, so the model is well balanced in total.
> >
> > The first three bands are within a few percent. The **12+ band is under-predicted by 15%**, a sign that the fitted vehicle-age curve has the wrong shape at the old end, for example a linear term forcing a trend the data don't follow there. Check the band's volume to rule out noise, then add a hinge or a separate band and refit. Left as is, the rating plan would undercharge the oldest vehicles.
