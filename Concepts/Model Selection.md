---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:501ce8767facb9605ca20b84edd5a366dc0ba7c31f7900ae0c1c3e3002fccb73
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Selection.md
---

**Model Selection** is the choice, among candidate models fitted to the same problem, of the one expected to perform best on data it has not seen. Fit is traded against complexity with a [[Likelihood Ratio Test]], a penalized criterion ([[AIC]], [[BIC]]) or [[Cross-Validation]] — and the winner is judged against the decision the model has to support.

> $$\hat{M} = \arg\min_{M} \left[-2\,\hat{\ell}_M + k\,p_M\right]$$

- $\hat{\ell}_M$ is model $M$'s maximized log-likelihood and $p_M$ its number of parameters. $k = 2$ gives [[AIC]]; $k = \ln n$ gives [[BIC]], the heavier penalty once $n \geq 8$, so BIC picks the simpler model more often. In-sample fit alone always prefers the bigger model, which is why a penalty or held-out data is needed (the [[Bias-Variance Tradeoff]]).
- **Choosing the family (MAS-I).** Start from the response and the structure of the data. A continuous, roughly symmetric response with constant variance suits [[Linear Regression]]. Counts, positive skewed amounts, binary outcomes, or a variance that grows with the mean call for a [[Generalized Linear Model]] with the matching [[Exponential Family]] member and [[Link Function|link]]. Repeated or grouped observations (the same insured over several years, policies within agencies) call for a [[Linear Mixed Model]], whose [[Random Effects|random effects]] carry the correlation within each group.
- **Comparing candidates.** Nested models are compared with the [[Likelihood Ratio Test]], which is the analysis of [[Deviance]]. Non-nested models are compared with AIC/BIC or with cross-validation error. Cross-validation measures prediction directly, so it works across model types.
- **Mixed models (MAS-II).** Models whose fixed effects differ must be compared on **ML** fits. Models that differ only in their random effects or covariance structure can be compared on [[Restricted Maximum Likelihood|REML]] fits with identical fixed effects. A test that a variance component is zero puts the null hypothesis on the boundary of the parameter space. Its reference distribution is then a 50:50 mixture of $\chi^2_0$ and $\chi^2_1$, which halves the naive $\chi^2_1$ p-value.
- **ERM (Exam 9).** An [[Enterprise Risk Management|ERM]] model combines sub-models for underwriting (including catastrophe), reserve, asset and credit risk, joined by a dependency structure. Here selection turns on the **tail**, not the centre. The [[Parameter Risk|parameter and model risk]] of the choice has to be measured, not assumed away.

> [!example]- Matching the Model to the Data {Example}
> Choose a model for each data set:
>
> 1. Claim counts per commercial auto fleet for one year, where fleets range from 3 to 400 vehicles.
> 2. Annual loss ratios for 60 agencies over 6 years. Management wants agency-level differences and a common trend.
> 3. Average repair cost per claim by vehicle class. Costs are strictly positive, and the standard deviation grows in proportion to the mean.
>
> > [!answer]-
> > 1. **A Poisson GLM with a log link and $\ln(\text{vehicles})$ as an [[Offset Variable|offset]]** (negative binomial if the counts are overdispersed). Counts are non-negative integers, and the offset makes the model predict frequency per vehicle.
> > 2. **A linear mixed model with a random agency intercept**, plus a fixed effect for year. The 360 observations are six correlated readings on each of 60 agencies. An ordinary regression would treat them as independent and understate every standard error.
> > 3. **A Gamma GLM with a log link.** A constant coefficient of variation means $\mathrm{Var}(Y) \propto \mu^2$, which is exactly the Gamma variance function. Least squares would assume constant variance and could predict negative costs.

> [!example]- LRT, AIC and BIC Disagree in a Mixed Model {Example}
> $n = 200$ observations come from 40 insureds over 5 years. Model 1 has a fixed intercept and trend, a random insured intercept and a residual variance ($p = 4$, $\hat{\ell} = -612.4$). Model 2 adds a 3-level territory fixed effect ($p = 6$, $\hat{\ell} = -608.1$). Both are fitted by ML. Compare the models by LRT, AIC and BIC.
>
> > [!answer]-
> > ML is required here because the fixed effects differ. The territory effect adds 2 parameters:
> >
> > $$
> > \begin{align*}
> > \text{LRT} &= 2\left[-608.1 - (-612.4)\right] \\
> > &= 8.6
> > \end{align*}
> > $$
> >
> > This exceeds $\chi^2_{0.05,2} = 5.99$ ($p \approx 0.014$).
> >
> > $$
> > \begin{align*}
> > \text{AIC}_1 &= 1224.8 + 2(4) \\
> > &= 1232.8 \\[4pt]
> > \text{AIC}_2 &= 1216.2 + 2(6) \\
> > &= 1228.2
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \text{BIC}_1 &= 1224.8 + 4\ln 200 \\
> > &= 1246.0 \\[4pt]
> > \text{BIC}_2 &= 1216.2 + 6\ln 200 \\
> > &= 1248.0
> > \end{align*}
> > $$
> >
> > The LRT and AIC favour Model 2. BIC charges $\ln 200 = 5.30$ per parameter, and the fit improvement doesn't cover two of those, so BIC prefers Model 1. The evidence for territory is **moderate**. A holdout or cross-validation comparison, plus whether territory makes business sense, should settle it.

> [!example]- Choosing a Dependency Structure for a Capital Model {Example}
> An insurer's capital model aggregates homeowners and commercial property losses. With a normal copula at rank correlation $0.3$, the 1-in-200 combined loss is materially lower than with a Gumbel copula calibrated to the same rank correlation. Both fit the body of the joint data about equally well. Which should set capital?
>
> > [!answer]-
> > **The one supported by evidence about joint extremes, which here points to the Gumbel.** The normal copula has no tail dependence: at any correlation below 1, extreme losses in the two lines become nearly independent far enough into the tail. The Gumbel copula has upper-tail dependence, meaning the two lines hit their worst years together more often than the correlation alone implies. That is the pattern a single hurricane produces across property lines.
> >
> > Capital is set in the tail, so fit to the body of the data can't decide between the two. Catastrophe-model output showing both lines hit by the same events can. The gap in required capital between the two structures should also be reported as a measure of model risk.
