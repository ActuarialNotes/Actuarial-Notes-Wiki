---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:2b041d91fa93c3e522b4abdda65c507ca444a942beb14eabc65e93f8bf7b946b
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain C tasks 4 and 8 (p.5), 'Parameter and Diagnostic Tables' (p.7), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; CAS-hosted copy), §3.3.3 'Potential Problems' pp.92-102 (PDF pp.102-112): residual plots, U-shape = non-linearity (Fig 3.9); correlated errors and tracking vs time (Fig 3.10); funnel = heteroscedasticity, log Y remedy (Fig 3.11); outliers, studentized residuals beyond ±3 (Fig 3.12); leverage statistic, average (p+1)/n (eq 3.37, Fig 3.13); VIF, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Penn State STAT 501, Lesson 11 'Influential Points': §11.2 leverages sum to p (parameters incl. intercept), flag h_ii > 3p/n or 2p/n; §11.3 internally studentized residual e_i/sqrt(MSE(1-h_ii)), |r| > 3 an outlier; §11.4 externally studentized ~ t(n-1-p); §11.5 Cook's D_i = e_i^2/(p MSE) x h_ii/(1-h_ii)^2, summarises how much all fitted values change when i is deleted, D > 0.5 investigate, D > 1 likely influential, sha256:6229ca1803f9d152028893131b323ac3ebdff7b49733518cc14a77a87200dbb9 — https://online.stat.psu.edu/stat501/Lesson11"
    - "UCLA OARC, Regression with Stata, Chapter 2 'Regression Diagnostics': leverage > (2k+2)/n (k predictors); Cook's D conventional cut-off 4/n; avplot = added-variable/partial-regression plot, line has the coefficient's slope, used to spot influential points, sha256:de14ccf40c9e9eed21b92e1a9ed432a00abd13f6cb086b80b5af26900cdb30c — https://stats.oarc.ucla.edu/stata/webbooks/reg/chapter2/stata-webbooksregressionwith-statachapter-2-regression-diagnostics/"
    - "Weisberg, Applied Linear Regression, 4th ed. (Wiley 2014), Ch.9 'Regression Diagnostics' (course copy): intro p.204; §9.1.5 residual-plot shapes (megaphone = nonconstant variance, curvature = wrong mean function) pp.209-210; §9.5.1-9.5.3 Cook's distance D_i = (r_i^2/p')h_ii/(1-h_ii), the distance between Y-hat and Y-hat(i), D_i near 1 as calibration pp.220-221; §9.5.4 added-variable plots and influence pp.224-225; §9.6 normal probability plots pp.225-226, sha256:7ecdc82a05367d2107915fe0535c8cbf65a9f47d95ee80b8816e0c5903d507af — https://www2.stat.duke.edu/courses/Fall21/sta521.001/papers/Applied_Linear_Regression_CHAPTER_9_Regression_Diagnostics.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, 2nd ed. (CAS Monograph 5): §2.4.1 logging continuous variables pp.11-12 (PDF 21-22); §2.4.3 base level p.15; §6.1.2 scaled deviance D* = 2(ll_sat - ll_model) p.63 (PDF 73); §6.2 F-test, AIC, BIC pp.64-67; §6.3.1 deviance residuals, q-q plot, discrete-distribution caveat pp.67-69 (PDF 77-79); §6.3.2 binned working residuals pp.70-73; §6.4 Cook's distance, CV, bootstrap p.74; §7.1 actual vs predicted on holdout pp.75-76; §7.2.1 quantile plots p.77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "R Core, stats::summary.glm documentation (R-devel): third column labelled t if the dispersion is estimated, z if known/fixed by the family; dispersion 1 for binomial and Poisson, otherwise the residual (Pearson) Chi-squared statistic divided by the residual df; cov.scaled = covariance scaled by dispersion, sha256:c7cf5a73225bd54cad2584cf31b1155884c4d359a14de4048b6e11a7acfe9e2d — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/summary.glm.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods §6.4.4.8 'Box-Jenkins Model Diagnostics': residuals should be white noise; autocorrelation plot of the residuals; Box-Ljung statistic, sha256:39f5d095ce90f5690064a9f92b68950fc1eda2f2dc623b0e058e8d1d6ff98945 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc448.htm"
    - "Fox & Weisberg, R package 'car' 3.1-5 reference manual (2026): mmps 'Marginal Model Plotting' pp.89-91 (response vs a linear combination u of the regressors, with a smooth of the data and a smooth of the fitted values on u; drawn versus each term and versus the fitted values/linear predictor; GLM smoother is a GAM with the model's family and link); avPlots 'Added-Variable Plots' pp.11-14 (examples contrast 'marginal plot, ignoring other predictors' with 'AV plot, adjusting for others'); crPlots 'Component+Residual (Partial Residual) Plots' p.39, sha256:5471a6e3292bcc8fcd9a83bf8f912989ce46de55e4a323595bcbb91a9d591cd3 — https://cran.r-project.org/web/packages/car/car.pdf"
    - "Pinheiro, Bates et al., R package 'nlme' 3.1-171 reference manual (2026): plot.lme examples (standardized residuals vs fitted; 'box-plots of residuals by Subject', PDF p.235); qqnorm.lme ('normal plot of standardized residuals'; 'normal plots of random effects', qqnorm(fm1, ~ranef(.))); varIdent (different variances per stratum), sha256:0194d826259d6ef5dfa3d32badccedb7bc6e60c0b5c5d8aec1783ee88f650899 — https://cran.r-project.org/web/packages/nlme/nlme.pdf"
    - "Bates et al., R package 'lme4' 2.0-6 reference manual (2026), anova.merMod argument 'refit': REML-fitted models with different fixed effects have likelihoods that are not directly comparable, so they are refitted by ML, sha256:4e4faf83522214402c69a6ed3cfa2b6c8ee96e034fddbce079b2513672a1985c — https://cran.r-project.org/web/packages/lme4/lme4.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain B tasks 3-4 (interpret LMM output; LMM diagnostics and summary statistics, p.2), Domain C tasks 6 and 8 (PCA and clustering outputs, p.3), Domain D task 4 (time series output, p.3), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Model Diagnostics.md
---

**Model diagnostics** are the plots and statistics used *after* fitting to check whether a model's assumptions hold and, where they fail, how. Summary measures such as [[Deviance]], [[AIC]] and [[R-Squared]] say how well a model fits overall; diagnostics say what is wrong with it — the mean structure, the variance, the distribution, independence, or a few influential points — and so judge its [[Model Fit|quality of fit]].

> $$y_i = \hat{y}_i + e_i$$

- Every observation splits into a [[Fitted Values|fitted value]] and a [[Residual|residual]]. If the model is right, the residuals are structureless noise; diagnostics look for structure left in them, and for observations that bend the fit
- **Mean structure** (right predictors, right form, right [[Link Function|link]]): a [[Residual Plot]] against the fitted values and against each predictor, where curvature means a missing term or transformation; a [[Marginal Model Plot|marginal model plot]], comparing a smooth of the data with a smooth of the model; an [[Added Variable Plot|added variable plot]], showing one predictor's effect net of all the others
- **Variance**: a fan in the residuals-versus-fitted plot means the variance changes with the mean. In a GLM, plot Pearson or deviance residuals — if the [[Variance Function|variance function]] is right their spread is roughly constant — and compare the Pearson $\chi^2$ with its degrees of freedom to check the [[Dispersion Parameter|dispersion]]
- **Distribution**: a [[QQ Plot]] of standardized or deviance residuals; a bent upper tail means the assumed distribution is too light-tailed. Residuals from a count or binary response fall in bands, so they are averaged in bins of fitted value before being read
- **Independence**: residuals against time or collection order; for a time series, the residual [[Autocorrelation Function|ACF]], which should look like [[White Noise|white noise]]
- **Influence**: leverage $h_{ii}$ from the [[Hat Matrix|hat matrix]] (flag above about $2(p+1)/n$), studentized residuals (flag beyond about $\pm 3$, see [[Outlier]]), and **Cook's distance**, which combines the two into a scaled measure of how far all the fitted values move when observation $i$ is deleted:

> $$D_i = \frac{r_i^2}{p + 1} \cdot \frac{h_{ii}}{1 - h_{ii}}$$

Here $r_i$ is the standardized residual and $p + 1$ the number of coefficients. A common flag is $D_i > 1$; some texts use $4/n$. Correlated predictors are diagnosed separately, by variance inflation factors ([[Multicollinearity]]).

**Linear mixed models** add diagnostics of their own:

- **Conditional residuals** (after the [[Best Linear Unbiased Predictor|BLUPs]]) against fitted values and in a QQ plot check the within-group assumptions; side-by-side box plots of residuals by group show whether one residual variance fits every group
- A **QQ plot of the predicted random effects** checks their assumed normality; a group far off the line is an influential cluster worth investigating
- Diagnostics are read alongside the fit's [[Summary Statistics|summary statistics]] — likelihood ratio tests, AIC and BIC — to settle the [[Model Structure|model structure]] and [[Variable Selection|variable selection]]

> [!example]- Outlier or Influential? {Example}
> A regression with $p + 1 = 5$ coefficients is fitted to $n = 50$ policies. Policy A has leverage $0.30$ and standardized residual $2.1$; policy B has leverage $0.04$ and standardized residual $3.0$. Which one matters more to the fit?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > D_A &= \frac{2.1^2}{5} \cdot \frac{0.30}{0.70} \\
> > &= 0.378 \\
> > D_B &= \frac{3.0^2}{5} \cdot \frac{0.04}{0.96} \\
> > &= 0.075
> > \end{align*}
> > $$
> > B is the bigger **outlier** — its residual is at the $\pm 3$ flag — but it sits among the other policies' predictor values, so it barely moves the fit. A has triple the average leverage ($5/50 = 0.10$) and a sizeable residual, giving five times B's influence. Neither exceeds $D = 1$, but A exceeds $4/n = 0.08$: refit without it and see whether any coefficient changes enough to matter.

> [!example]- Reading Four Diagnostics for a Severity GLM {Example}
> A Gamma GLM with a log link models claim severity. What does each finding suggest?
> 1. Deviance residuals plotted against vehicle age form a U-shape.
> 2. The marginal model plot for insured value shows the data smooth well above the model smooth for the largest values.
> 3. The QQ plot of deviance residuals follows the line except for an upper tail bending well above it.
> 4. The Pearson residuals *narrow* steadily as the fitted values increase.
>
> > [!answer]-
> > 1. **Mean structure**: vehicle age enters linearly but its effect is curved. Band it, or add a quadratic term
> > 2. **Mean structure**: the model under-predicts large risks, so insured value's fitted curve rises too slowly at the top of its range. Give it more flexibility there — a band for the largest values, a polynomial term, or a hinge that lets the slope steepen past a break point — or add an interaction with the variable that separates the large risks. (Logging insured value would trade the raw term's exponential growth for a power curve that rises at a decreasing or only mildly increasing rate — the opposite of what is needed)
> > 3. **Distribution**: the largest claims are more extreme than a Gamma allows. Check them for data errors, then consider a heavier-tailed response or capping large losses and loading for the excess
> > 4. **Variance**: Pearson residuals divide by $\sqrt{V(\hat\mu)} = \hat\mu$. If they shrink as $\hat\mu$ grows, the true variance grows *more slowly* than $\mu^2$, so the variance function is too steep for these data

> [!example]- A Group That Needs Its Own Variance {Example}
> A random-intercept model of loss ratios has policyholders nested in four regions. Box plots of the conditional residuals by region show one region with roughly twice the spread of the others; the QQ plot of the predicted intercepts is straight. The $-2$ REML log-likelihood is $3{,}412.8$ with one residual variance and $3{,}391.5$ with a separate variance per region. What should be done?
>
> > [!answer]-
> > The random intercepts look fine; the problem is a residual variance that is not constant across regions. The two fits have the same fixed effects, so their REML likelihoods can be compared, and the heterogeneous model adds $3$ variance parameters:
> > $$
> > \begin{align*}
> > \text{LRT} &= 3{,}412.8 - 3{,}391.5 \\
> > &= 21.3
> > \end{align*}
> > $$
> > $21.3 > \chi^2_{0.05,\,3} = 7.81$, so adopt region-specific residual variances. The null hypothesis — equal variances — is not on a boundary, so the ordinary $\chi^2$ reference applies. With the fix, the high-variance region's observations are down-weighted in estimating the fixed effects instead of dominating them.
