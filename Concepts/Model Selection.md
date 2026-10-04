---
verification:
  status: verified
  confidence: low
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:14987bd8ec0101f670dc90f95fe5e7b81a241cc27971d52a09dd364502fdf8df
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C tasks 1-3, 7 and reading list, PDF pp.5-6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain B, PDF p.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §2.2.1-2.2.2 (printed pp.29-36, PDF pp.40-47); §6.1.3 (printed pp.232-235, PDF pp.240-243), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "R Core Team, R documentation 'AIC {stats}' (R-devel manual), Description and Details, sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html"
    - "Pinheiro & Bates, nlme documentation 'anova.lme' (R-devel manual), Note, sha256:508e9e3f590825aa2248bbb4fde038face9289698f57248738401421bd9a00e0 — https://stat.ethz.ch/R-manual/R-devel/library/nlme/html/anova.lme.html"
    - "Bolker et al., GLMM FAQ, 'Testing significance of random effects' (boundary: p-value about twice as large as it should be for a single variance), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html"
    - "Embrechts, McNeil & Straumann, 'Correlation and Dependency in Risk Management: Properties and Pitfalls' (ETH preprint), §4.4 and PDF p.22 (Gaussian copula asymptotically independent for rho < 1; Gumbel asymptotically dependent), sha256:2705fc20f5bad0de8bf45ab6325cee27fe86f119b9919438a455c3393e6653cd — https://people.math.ethz.ch/~embrecht/ftp/pitfalls.pdf"
    - "Larsen, 'Generalized Linear Models', CAS Study Note (rev. June 2016), PDF p.2 (Tweedie/variance powers: gamma p = 2), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.6 offsets PDF pp.27-28; §2.7 overdispersion/negative binomial PDF pp.31-32, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Model Selection.md
---

**Model Selection** is the choice, among candidate models fitted to the same problem, of the one expected to perform best on data it has not seen. Fit is traded against complexity with a [[Likelihood Ratio Test]], a penalized criterion ([[AIC]], [[BIC]]) or [[Cross-Validation]], and the winner is judged against the decision the model has to support.

> $$\hat{M} = \arg\min_{M} \left[-2\,\hat{\ell}_M + k\,p_M\right]$$

- $\hat{\ell}_M$ is model $M$'s maximized log-likelihood and $p_M$ its number of parameters. $k = 2$ gives [[AIC]]; $k = \ln n$ gives [[BIC]], which penalizes more heavily once $n \geq 8$. In-sample fit alone always prefers the bigger model, which is why a penalty or held-out data is needed (the [[Bias-Variance Tradeoff]]).
- **Choosing the family (MAS-I).** Start from the response and the structure of the data. A continuous, roughly symmetric response with constant variance suits [[Linear Regression]]. Counts, positive skewed amounts, binary outcomes, or a variance that grows with the mean call for a [[Generalized Linear Model]] with the matching [[Exponential Family]] member and [[Link Function|link]]. Repeated or grouped observations (the same insured over several years, policies within agencies) call for a [[Linear Mixed Model]], whose [[Random Effects|random effects]] carry the correlation within each group.
- **Comparing candidates.** Nested models are compared with the [[Likelihood Ratio Test]], which is the analysis of [[Deviance]]. Non-nested models are compared with AIC/BIC or with cross-validation error. Cross-validation measures prediction directly and works across model types.
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
> > **The one supported by evidence about joint extremes, here the Gumbel.** The normal copula has no tail dependence: at any correlation below 1, extreme losses in the two lines become nearly independent far enough into the tail. The Gumbel copula has upper-tail dependence, meaning the two lines hit their worst years together more often than the correlation alone implies. That is the pattern a single hurricane produces across property lines.
> >
> > Capital is set in the tail, so fit to the body of the data can't decide between them, but catastrophe-model output showing both lines hit by the same events can. The capital gap between the two structures is itself a measure of model risk worth reporting.
