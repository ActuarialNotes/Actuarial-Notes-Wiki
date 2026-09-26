---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:02aa52a73258a152ed196b20418d58cee27c09e42d937106d34b6d284c2e8eda
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Predictor Variable.md
---

A **predictor variable** — also called an explanatory or independent variable, a covariate, a feature, or in ratemaking a [[Rating Variable|rating variable]] — is an input $x_j$ used to explain or predict the [[Response Variable|response]]. Each predictor fills one or more columns of the [[Design Matrix|design matrix]] and receives its own coefficient.

> $$g(\mu_i) = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \cdots + \beta_p x_{ip}$$

- $\mu_i = E[Y_i]$ and $g$ is the [[Link Function|link function]] (the identity in [[Linear Regression]]). $\beta_j$ is the effect of $x_j$ **holding the other predictors fixed**; with a log link, $e^{\beta_j}$ is a multiplicative relativity
- **Types** ([[Data Types]]): a continuous predictor gets one coefficient, or a [[Variable Transformation|transformation]] when its effect is curved; a nominal [[Categorical Predictor|categorical predictor]] with $k$ levels gets $k - 1$ indicator columns; an ordinal one can be treated either way. An [[Interaction]] lets one predictor's effect depend on the level of another
- **Not every input is a free predictor.** A [[Control Variable|control variable]] is estimated so that it absorbs a real effect (a year trend, say) but is left out of the rates; an [[Offset Variable|offset]] enters with its coefficient fixed at $1$; an identifier is not a predictor at all
- **[[Multicollinearity]] among predictors** — vehicle age with vehicle value, building age with construction type — inflates each coefficient's variance by $\text{VIF}_j = 1/(1 - R_j^2)$, where $R_j^2$ comes from regressing $x_j$ on the other predictors. Fitted values are largely unaffected; the interpretation of each coefficient is not
- "Independent" variable does not mean statistically independent of the other predictors. In insurance data they almost never are, which is exactly why a multivariate model is needed instead of one-way analyses
- Adding a predictor always lowers training error but can raise [[Test Error|test error]]. Choosing them is [[Variable Selection|variable selection]], judged by significance tests, [[AIC]], [[BIC]] and [[Cross-Validation|cross-validation]]

> [!example]- Assigning Roles in a Frequency Data Set {Example}
> A personal auto frequency file contains: claim count, earned car-years, accident year, territory ($12$ levels), driver age, number of prior claims, and policy number. The rating plan will use territory, driver age and prior claims. State each field's role in a Poisson GLM with a log link.
>
> > [!answer]-
> > - **Claim count** — the response
> > - **Earned car-years** — an offset, entered as $\ln(\text{car-years})$ with coefficient fixed at $1$, so the model fits a frequency per car-year
> > - **Accident year** — a control variable: estimated so that trend is not absorbed into the rating variables, then left out of the rates
> > - **Territory** — a categorical predictor with $11$ indicator columns against a base territory
> > - **Driver age** — continuous, but its effect on frequency is U-shaped, so it is banded or transformed rather than given a single slope
> > - **Prior claims** — a count used as a predictor; usually capped (e.g. $0$, $1$, $2+$) and treated as ordinal
> > - **Policy number** — an identifier, used to join tables; including it as a predictor would be meaningless

> [!example]- How Collinearity Hides a Real Effect {Example}
> In a severity model, regressing vehicle value on the other predictors gives $R_j^2 = 0.84$. Had the predictors been uncorrelated, the vehicle-value coefficient of $0.15$ would have had a standard error of $0.04$. Find the VIF, the actual standard error, and the $t$-statistic before and after the inflation.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{VIF} &= \frac{1}{1 - 0.84} \\
> > &= 6.25 \\
> > \text{SE} &= 0.04\sqrt{6.25} \\
> > &= 0.10
> > \end{align*}
> > $$
> > The $t$-statistic falls from $0.15/0.04 = 3.75$ to $0.15/0.10 = 1.50$. The effect may be entirely real, but the data cannot separate it from the correlated predictors, so vehicle value looks insignificant. Dropping it on that basis is a mistake; combining the correlated variables or accepting the joint effect is the better response.
