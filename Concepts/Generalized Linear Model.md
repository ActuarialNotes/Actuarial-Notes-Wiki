A **Generalized Linear Model (GLM)** extends ordinary linear regression to allow the response variable $Y$ to follow any distribution in the **exponential family** and to be related to the predictors through a **[[Link Function]]** $g$.

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

- Parameters are estimated by **maximum likelihood**, not OLS
- Model fit is assessed via [[Deviance]], [[AIC]], [[BIC]], and [[Residual Plot]]s
- **[[ANOVA]] (Analysis of Deviance)** compares nested GLMs

**In ratemaking**, the GLM is the standard tool for [[Classification Ratemaking|classification]] work, because it estimates every rating variable *simultaneously* and so reports each one net of the others — solving the correlation problem that makes univariate relativities double-count. Standard practice:

- **Frequency** is modelled Poisson with a log link and exposures as an offset; **severity** is modelled Gamma with a log link, weighted by claim counts. Multiplying the two gives the pure premium. A single Tweedie model on pure premium is the one-step alternative.
- The **log link makes the model multiplicative**, so $e^{\beta}$ is a relativity and the fitted coefficients drop straight into a multiplicative [[Rating Algorithm|rating algorithm]].
- Output is judged on more than significance: consistency of the pattern across levels, standard errors, the effect of removing the variable (analysis of deviance), and validation on a holdout period.
- Model relativities are still [[Credibility|credibility]]-weighted and are still subject to the operational, social and legal criteria for a rating variable — statistical significance alone does not make a variable usable.

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
