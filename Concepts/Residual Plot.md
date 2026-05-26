A **Residual Plot** is a diagnostic graph used to assess model fit by plotting **residuals** (observed minus fitted values) against fitted values, a predictor, or another variable. Patterns in residuals indicate model deficiencies.

> $$e_i = y_i - \hat{y}_i \quad \text{(raw residual)}$$
>
> $$r_i = \frac{e_i}{\hat{\sigma}\sqrt{1 - h_{ii}}} \quad \text{(standardized/studentized residual)}$$

**How to read residual plots:**

| Pattern | Implication |
| :--- | :--- |
| Random scatter around zero | Model is adequate |
| Fan shape (spread increases) | **Heteroscedasticity** — variance is not constant |
| Curved pattern | **Non-linearity** — a transform or polynomial term is needed |
| Systematic trend | A predictor is missing or improperly specified |
| Outliers | Influential observations; investigate further |

- For [[Generalized Linear Model]]s, **Pearson residuals** $r_i^P = (y_i - \hat{\mu}_i)/\sqrt{V(\hat{\mu}_i)}$ and **deviance residuals** are used instead of raw residuals
- **Residuals vs. fitted**: checks for non-linearity and heteroscedasticity
- **Residuals vs. predictor**: checks whether a variable's effect is correctly specified
- A **Normal [[QQ Plot]]** of residuals checks the normality assumption

> [!example]- Identifying Heteroscedasticity in a Residual Plot {Example}
> After fitting a linear regression of claim severity on vehicle value, the residual plot shows residuals spreading out in a fan shape as fitted values increase. What does this suggest?
>
> > [!answer]-
> > The fan shape indicates **heteroscedasticity**: variance of residuals increases with the fitted value. This is typical for positive, right-skewed data like claim severity. Remedies include applying a log transformation to severity or switching to a Gamma [[Generalized Linear Model]] with a log [[Link Function]], which naturally models multiplicative variance.
