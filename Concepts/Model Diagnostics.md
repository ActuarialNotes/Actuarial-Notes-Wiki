---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:26da3f7f49c7901ab8e350ea1a8d7013d044a69266b7f68866ffaf4c41a0369c
  sources: []
  open_findings: 0
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
> > 2. **Mean structure**: the model under-predicts large risks. Try $\ln(\text{insured value})$ in place of the raw value, or an interaction with the variable that separates the large risks
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
