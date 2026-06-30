An **Extended Linear Model (ELM)** is the broad class of regression models that go beyond ordinary least-squares regression by relaxing its classical assumptions — allowing a non-Normal response distribution, a non-identity [[Link Function]], and a flexible [[Model Structure]] for the linear predictor. [[Generalized Linear Model]]s are the most common extended linear model used in actuarial work.

> $$\eta_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$
>
> $$g(\mu_i) = \eta_i, \qquad Y_i \sim \text{(chosen response distribution)}$$

| Model class | Response distribution | Link | Predictor effects |
| :--- | :--- | :--- | :--- |
| Ordinary regression | Normal | Identity | Linear, additive |
| [[Generalized Linear Model]] | Exponential family | Chosen to fit the data | Linear, additive |
| Extended linear model | Any | Any | May include [[Interaction|interactions]], transformations, banded variables |

- Building an extended linear model requires three choices: the **response distribution**, the **[[Link Function]]**, and the **[[Model Structure]]** (which predictors, transformations, and interactions enter the linear predictor)
- Ordinary least-squares regression is a special case where the response is Normal and the link is the identity function
- Model adequacy is compared across candidate extended linear models using [[Deviance]], [[AIC]], [[BIC]], and [[Residual Plot]]s
- In insurance ratemaking, the choice of extended linear model is driven by the data's behavior — e.g., a right-skewed, strictly positive severity favors a Gamma distribution with a log link, while integer claim counts favor a Poisson distribution

> [!example]- Selecting an Extended Linear Model for Claim Severity {Example}
> An actuary has individual claim severities that are strictly positive and right-skewed. Why is ordinary least-squares regression not an appropriate extended linear model here, and what would be a better choice?
>
> > [!answer]-
> > Ordinary least-squares assumes a Normal response, which can produce negative fitted severities and underweights the right skew. A **Gamma [[Generalized Linear Model]] with a log [[Link Function]]** is a better extended linear model: it restricts fitted values to be positive and models the multiplicative, right-skewed behavior typical of claim severity.
