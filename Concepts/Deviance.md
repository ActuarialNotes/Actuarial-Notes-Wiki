**Deviance** is a goodness-of-fit measure for [[Generalized Linear Model]]s based on the log-likelihood. It compares the fitted model to the **saturated model** (a model with one parameter per observation, achieving perfect fit).

> $$D = -2\left[\ell(\hat{\boldsymbol{\beta}}) - \ell_{\text{sat}}\right] = -2\left[\ell(\text{fitted model}) - \ell(\text{saturated model})\right]$$

- Deviance is always **non-negative**; $D = 0$ means a perfect fit
- For a Normal linear model, deviance equals the **residual sum of squares** $\text{RSS} = \sum(y_i - \hat{y}_i)^2$
- For Poisson regression: $D = 2\sum_i \left[y_i\ln\!\frac{y_i}{\hat{\mu}_i} - (y_i - \hat{\mu}_i)\right]$
- **Scaled deviance**: $D^* = D/\phi$ where $\phi$ is the dispersion parameter; under $H_0$ (model is correct), $D^* \approx \chi^2_{n-p}$
- **Analysis of Deviance**: the difference in deviance between two nested models, $\Delta D = D_{\text{reduced}} - D_{\text{full}} \sim \chi^2_{\Delta p}$, is used to test whether additional predictors significantly improve fit

> [!example]- Analysis of Deviance to Test a Predictor {Example}
> A Poisson GLM with intercept only has deviance $D_0 = 45.2$ on 49 df. Adding "territory" (3 levels, 2 extra parameters) gives $D_1 = 30.8$ on 47 df. Test whether territory significantly improves fit at $\alpha = 0.05$.
>
> > [!answer]-
> > $\Delta D = 45.2 - 30.8 = 14.4$ on $\Delta\text{df} = 2$.
> > The critical value $\chi^2_{0.05, 2} = 5.99$. Since $14.4 > 5.99$, **reject $H_0$** — territory significantly improves the model.
