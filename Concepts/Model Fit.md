---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7d63570934d53d913478a5ebcee2aa345c6adef76f847a2972973135a4d1baf6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Fit.md
---

**Model Fit** is how closely a fitted model's predictions agree with the observed outcomes. It is measured in-sample with likelihood statistics such as [[Deviance]], diagnosed with residual and other [[Model Diagnostics|diagnostic plots]], and, for a rating model, confirmed by comparing actual with predicted results on a [[Holdout Sample|holdout sample]].

> $$D^* = 2\left[\ell_{\text{saturated}} - \ell_{\text{model}}\right]$$

- $D^*$ is the **scaled deviance**. It measures the log-likelihood gap between the model and the saturated model, which has one parameter per record and fits perfectly ($D^* = 0$). The null model (intercept only) marks the other end, so a model's deviance lies between zero and the null deviance. Maximizing likelihood is the same as minimizing deviance.
- The **deviance residual** $d_i$ is the signed square root of record $i$'s contribution to the deviance. If the assumed distribution is right, deviance residuals are roughly normal with constant variance.
- **Fit is not predictive power.** Adding any predictor lowers deviance. In-sample measures therefore compare models only through a test ([[Likelihood Ratio Test]] or $F$-test, for nested models) or a penalty ([[AIC]], [[BIC]]). Whether the fit holds on new data is a holdout question.
- **Diagnostic plots (MAS-I).**
  - [[Residual Plot|Residuals against fitted values]]: a trend means the mean is misspecified (wrong link or a missing term), and a funnel means the wrong [[Variance Function|variance function]].
  - A [[QQ Plot]] of deviance residuals should be close to a straight line; bent tails mean the data are more or less skewed than the assumed distribution.
  - [[Marginal Model Plot|Marginal model plots]] compare a smooth of the data with a smooth of the fitted values against each predictor, and the two should coincide.
  - [[Added Variable Plot|Added variable plots]] show one predictor's effect net of the others, exposing its functional form and any influential points.
- **Rating-plan fit (Exam 8).** The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] tests fit where a rating plan needs it: actual against predicted on holdout data, by quantile of prediction and by level of each [[Rating Variable|rating variable]]. Influential records (high Cook's distance) and estimates that swing across cross-validation folds or bootstrap samples flag fit that won't survive new data. [[Model Benchmarking]] then asks whether the model fits better than the current plan.

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
