**Variable Selection** is the process of choosing which predictors to include in a model's [[Model Structure]], balancing improved fit against the risk of overfitting and loss of interpretability.

| Method | Description |
| :--- | :--- |
| Forward selection | Start with no predictors; add the most significant one at each step |
| Backward elimination | Start with all predictors; remove the least significant one at each step |
| Stepwise | Alternates forward and backward steps, re-evaluating at each step |
| Criterion-based | Compare candidate models directly via [[AIC]], [[BIC]], or [[Deviance]] |

- Lower [[AIC]] or [[BIC]] indicates a better trade-off between fit and complexity; **BIC penalizes additional parameters more heavily** than AIC, so it tends to favor sparser models
- In a [[Linear Mixed Model]], variable selection also requires deciding which effects are **fixed** versus **random**, not just which predictors to include
- Variable selection should combine statistical significance (from the [[Parameter Estimate Tables|parameter estimate table]]) with business and actuarial judgment, e.g., regulatory restrictions on certain rating variables
- Selecting too few variables causes underfitting (high bias); selecting too many causes overfitting (high variance) — a holdout sample or cross-validation helps detect overfitting that in-sample fit statistics alone would miss

> [!example]- Choosing Between Two Model Specifications {Example}
> Two competing GLMs for claim frequency: Model 1 has $5$ parameters and a log-likelihood of $-2{,}040$. Model 2 adds $2$ more parameters and has a log-likelihood of $-2{,}037$. Using AIC ($\text{AIC} = -2\ell + 2k$), which model is preferred?
>
> > [!answer]-
> > $$\text{AIC}_1 = -2(-2{,}040) + 2(5) = 4{,}080 + 10 = 4{,}090$$
> > $$\text{AIC}_2 = -2(-2{,}037) + 2(7) = 4{,}074 + 14 = 4{,}088$$
> > Model 2 has the lower AIC ($4{,}088 < 4{,}090$), so the extra $2$ parameters are worth the added complexity — **Model 2** is preferred.
