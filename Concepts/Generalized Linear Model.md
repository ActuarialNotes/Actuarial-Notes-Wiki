---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-13
  last_checked_by: agent:validate-v1
  content_hash: sha256:9ff7bd3b09aa376eed99804c8a34a436d7e661c80723e4c9d664047437be4ed5
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.10 'Multivariate Classification', printed pp.176-181 (PDF pp.188-193), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Generalized Linear Model.md
---

A **Generalized Linear Model (GLM)** extends ordinary linear regression to allow the [[Response Variable|response variable]] $Y$ to follow any distribution in the **exponential family** and to be related to the predictors through a **[[Link Function]]** $g$.

> $$g(\mu_i) = \eta_i$$

> $$= \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

> $$\text{where } \mu_i = E[Y_i \mid \mathbf{x}_i]$$

**Three components of a GLM:**
1. **Random component**: $Y_i$ follows an exponential family distribution (Normal, Poisson, Gamma, Binomial, etc.)
2. **Systematic component**: linear predictor $\eta_i = \mathbf{x}_i^\top \boldsymbol{\beta}$
3. **Link function**: $g(\mu_i) = \eta_i$ connects the mean to the linear predictor

**Common GLM specifications:**

| Response Type | Distribution | Canonical Link |
| :--- | :--- | :--- |
| Continuous (symmetric) | Normal | Identity: $g(\mu) = \mu$ |
| Count | Poisson | Log: $g(\mu) = \ln\mu$ |
| Binary | Binomial | Logit: $g(\mu) = \ln\!\frac{\mu}{1-\mu}$ |
| Positive continuous | Gamma | Reciprocal: $g(\mu) = 1/\mu$ |

- Parameters are estimated by **[[Maximum Likelihood Estimation|maximum likelihood]]**, not OLS. In the classical [[Linear Regression|linear model]], with normal errors and the identity link, the least squares estimates are the maximum likelihood estimates; the other GLMs are fitted by iteratively reweighted least squares.
- Model fit is assessed via [[Deviance]], [[AIC]], [[BIC]], and [[Residual Plot]]s
- **[[ANOVA]] (Analysis of Deviance)** compares nested GLMs

**In ratemaking**, the GLM is the standard tool for [[Classification Ratemaking|classification]] work, because it estimates every rating variable *simultaneously* and so reports each one net of the others — solving the correlation problem that makes univariate relativities double-count. Standard practice:

- **Frequency** is modelled Poisson with a log link and exposures as an offset; **severity** is modelled Gamma with a log link, weighted by claim counts. Multiplying the two gives the pure premium. A single [[Tweedie Distribution|Tweedie]] model on pure premium is the one-step alternative.
- The **log link makes the model multiplicative**, so $e^{\beta}$ is a relativity and the fitted coefficients drop straight into a multiplicative [[Rating Algorithm|rating algorithm]].
- Output is judged on more than significance: consistency of the pattern across levels, standard errors, the effect of removing the variable (analysis of deviance), and validation on a holdout period.
- Model relativities are still [[Credibility|credibility]]-weighted and are still subject to the operational, social and legal criteria for a rating variable — statistical significance alone does not make a variable usable.

**Building the model (Exam 8, Goldburd et al.).**

- **Weights.** A row that stands for the average outcome of a group of similar risks (the average severity of several claims, the average pure premium of several exposures) should count for more than a row for one risk. A weight $w_i$ enters the model through the assumed variance, $\text{Var}[y_i] = \phi V(\mu_i)/w_i$. Setting the weight to the number of records the row represents matches the fact that the average of $n$ independent, identically distributed outcomes has $1/n$ the variance of one. A row for a single risk carries weight 1, and in a renewal (binomial) model a row giving the share of $n$ policies that renewed carries weight $n$.
- **Correlated predictors.** Moderate correlation is what the GLM handles well: it sorts out each variable's own effect, so nothing is double-counted. Very high correlation makes the model unstable, with erratic coefficients, large standard errors and estimates that swing with small changes in the data. The remedies are to keep only one of a group of correlated predictors, or to replace the group with uncorrelated components (principal components or factor analysis). [[Multicollinearity]], where two or more predictors together predict a third, causes the same instability without showing in a correlation matrix; the variance inflation factor detects it, and a VIF above 10 is high.
- **Aliasing.** Where two predictors are perfectly correlated they are aliased, and the GLM has no unique solution; most fitting software detects this and drops one of them. Where two predictors are nearly perfectly correlated (near aliasing), the software may not catch it and runs the model anyway, and the model is highly unstable: the fit may fail to converge, and the coefficients that come out are nonsensical. For example, two indicators may overlap except for a handful of records. The GLM gives that small segment full credibility, driving one coefficient very high and the other very low. Removing those few records, or reclassifying them, makes the two columns identical, so the near alias becomes an exact alias, which the software resolves by dropping one predictor. A field that duplicates another adds no new information and need not be kept, and a lasso penalty is likely to penalize one of the two indicators heavily and keep the other. Missing data can create an alias: where the same records are missing in two fields and each field gets its own "unknown" level or error flag, the two flags are identical columns, and so are aliased.
- **Non-linear effects of a continuous predictor.** Goldburd et al. give three fixes. Binning it into a [[Categorical Predictor|categorical]] variable lets each level float freely, but it adds parameters (degrees of freedom) and nothing keeps neighbouring estimates consistent with each other. Polynomial terms are hard to interpret and behave erratically at the edges of the data. Piecewise linear (hinge) functions such as $\max(0, x - c)$ have break points that must be chosen by the user, usually by eye from a partial residual plot, since the GLM cannot estimate them, and the fitted line changes direction abruptly at each break. A natural cubic [[Regression Spline|spline]] combines the polynomial and piecewise ideas.
- **Centering a continuous predictor at its base value.** A coefficient on a variable that is interacted with a continuous predictor $x$ describes the effect where $x = 0$. For $\ln(\text{AOI})$, that is an amount of insurance of \$1, far outside the data, so such a coefficient can come out with a counterintuitive sign that no real policy would pay. Dividing $x$ by its base value $b$ before logging gives an equivalent model with the same predictions. Since $\beta_0 + \beta_1 \ln x = (\beta_0 + \beta_1 \ln b) + \beta_1 \ln(x/b)$, the new intercept is the old intercept plus the predictor's main-effect coefficient times $\ln b$, and after centering the intercept gives the prediction for a risk at every base level. An interacted variable's main effect likewise absorbs its interaction coefficient times $\ln b$, and then reads as its effect at the base value. The slope of $\ln x$ and the interaction coefficient, their standard errors and the number of parameters are unchanged.
- **Stability is a separate check.** Stability is a separate check from a variable's significance and from penalized measures of fit such as [[AIC]] and [[BIC]]. Model stability is the sensitivity of the model to changes in the modelling data. A small class with one unusually large loss can look very risky with the loss in the data and very safe without it, with the same confidence both times. Stability is assessed by refitting without the most influential records (the highest Cook's distance), by comparing the parameter estimates across cross-validation runs, since the model should give similar results on separate subsets of the data, and by bootstrapping each estimate.
- **Coverage options belong outside the GLM.** In a frequency or pure premium GLM, a deductible above the base often gets a significant positive coefficient, which would charge more premium for less coverage. Insureds who choose high deductibles, or are required by the underwriter to take them, may be worse risks, so the coefficient reflects selection rather than loss elimination. Goldburd et al. recommend estimating deductible factors, ILFs and other coverage-option factors outside the GLM with loss elimination methods, and including them in the GLM as an [[Offset Variable|offset]]. In a severity model a positive deductible coefficient is to be expected: the deductible lowers severity's numerator by eliminating part of each loss, but it also eliminates many small claims, lowering the denominator (the claim count), and the second effect is usually the stronger, so average claim size most often rises with the deductible. It is not the cost of the coverage.

![[Media/Figures/Generalized_Linear_Model.svg|340]]

> [!example]- Poisson GLM for Claim Counts {Example}
> An actuary models claim counts $N_i \sim \text{Poi}(\mu_i)$ as a function of driver age. The fitted model gives $\ln\hat{\mu}_i = -2.1 + 0.04 \cdot \text{age}_i$. Find the expected claim count for a 30-year-old driver.
>
> > [!answer]-
> > $$\ln\hat{\mu} = -2.1 + 0.04(30) = -2.1 + 1.2 = -0.9$$
> > $$\hat{\mu} = e^{-0.9} \approx 0.407 \text{ claims per year}$$

> [!example]- Reading GLM Output as Rating Relativities {Example}
> A frequency GLM (Poisson, log link, exposure offset) and a severity GLM (Gamma, log link) are fitted to a personal auto book. Coefficients for the territory variable, relative to the base territory:
>
> | Territory | Frequency $\beta$ | Severity $\beta$ |
> |---|---|---|
> | Base | $0$ | $0$ |
> | Suburban | $0.1823$ | $0.0488$ |
> | Urban | $0.4055$ | $0.1310$ |
>
> Derive the pure premium relativities.
>
> > [!answer]-
> > With a log link the relativity is $e^{\beta}$, and the pure premium relativity is the product of the two:
> >
> > $$\begin{align*}
> > \text{Suburban freq} &= e^{0.1823} = 1.200 \\
> > \text{Suburban sev} &= e^{0.0488} = 1.050 \\
> > \text{Suburban PP} &= 1.200 \times 1.050 = 1.260 \\[6pt]
> > \text{Urban freq} &= e^{0.4055} = 1.500 \\
> > \text{Urban sev} &= e^{0.1310} = 1.140 \\
> > \text{Urban PP} &= 1.500 \times 1.140 = 1.710
> > \end{align*}$$
> >
> > Equivalently, sum the coefficients before exponentiating: $e^{0.4055 + 0.1310} = e^{0.5365} = 1.710$.
> >
> > Two things this shows that a one-way analysis would not. First, the urban loading is driven mostly by **frequency** ($+50\%$) rather than severity ($+14\%$) — a density and traffic effect rather than a repair-cost effect. Second, these relativities are **net of every other variable in the model**: if urban policyholders also skew toward higher limits or older vehicles, that effect sits with those variables, not here. Multiplying a $1.710$ territory factor by the other fitted factors therefore does not double-count.

> [!example]- Centering Amount of Insurance at the Base {Example}
> A commercial property frequency GLM (log link) has occupancy class, sprinklered status, $\ln(\text{AOI})$ and the interaction of sprinklered with $\ln(\text{AOI})$. Goldburd et al. report these estimates (their Table 11):
>
> - Intercept $-8.9456$; sprinklered: Yes $0.7447$; $\ln(\text{AOI})$ $0.4239$; sprinklered: Yes $\times \ln(\text{AOI})$ $-0.1032$
>
> The base AOI is \$200,000. Re-express the model with $\ln(\text{AOI}/200{,}000)$ as the predictor, and interpret the sprinklered coefficient before and after.
>
> > [!answer]-
> > $\ln 200{,}000 = 12.2061$. The slope and interaction coefficients carry over unchanged; the intercept and the sprinklered main effect each absorb their slope times $\ln 200{,}000$:
> >
> > $$\begin{align*}
> > \text{Intercept} &= -8.9456 + 0.4239(12.2061) = -3.7714 \\
> > \text{Sprinklered: Yes} &= 0.7447 - 0.1032(12.2061) = -0.5150
> > \end{align*}$$
> >
> > The monograph's refitted model (its Table 12) gives $-3.7710$ and $-0.5153$, the difference being rounding in the printed coefficients.
> >
> > Before centering, the positive $0.7447$ is the sprinklered effect at an AOI of \$1, a theoretical construct no policy is charged. After centering it is the log sprinklered relativity at the base AOI, $e^{-0.5153} = 0.597$, a 40% discount. The intercept $-3.7710$ is now the log frequency of a non-sprinklered, base-class risk at the base AOI. Both models give the same prediction for every risk.
