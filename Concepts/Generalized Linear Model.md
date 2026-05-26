A **Generalized Linear Model (GLM)** extends ordinary linear regression to allow the response variable $Y$ to follow any distribution in the **exponential family** and to be related to the predictors through a **[[Link Function]]** $g$.

> $$g(\mu_i) = \eta_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$
>
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

> [!example]- Poisson GLM for Claim Counts {Example}
> An actuary models claim counts $N_i \sim \text{Poi}(\mu_i)$ as a function of driver age. The fitted model gives $\ln\hat{\mu}_i = -2.1 + 0.04 \cdot \text{age}_i$. Find the expected claim count for a 30-year-old driver.
>
> > [!answer]-
> > $$\ln\hat{\mu} = -2.1 + 0.04(30) = -2.1 + 1.2 = -0.9$$
> > $$\hat{\mu} = e^{-0.9} \approx 0.407 \text{ claims per year}$$
