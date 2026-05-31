**R-Squared** ($R^2$), also called the **coefficient of determination**, measures the proportion of total variance in the response variable $Y$ that is explained by the model.

> $$R^2 = 1 - \frac{\text{SS}_\text{Res}}{\text{SS}_\text{Tot}}$$
>
> $$= 1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2}$$

- $R^2 \in [0, 1]$; a value of 1 means the model explains all variability; 0 means it explains none
- $R^2$ **always increases** (or stays the same) when predictors are added, even if they are irrelevant
- **Adjusted $R^2$** corrects for this by penalizing for the number of predictors $p$:
$$R^2_{\text{adj}} = 1 - \frac{\text{SS}_\text{Res}/(n-p-1)}{\text{SS}_\text{Tot}/(n-1)}$$
- In [[Generalized Linear Model]]s, the analogue is the **pseudo-$R^2$** based on [[Deviance]]: $R^2_D = 1 - D/D_0$ where $D_0$ is the null deviance
- $R^2$ measures in-sample fit only and does not directly assess predictive performance on new data

> [!example]- Computing R-Squared for a Linear Regression {Example}
> A simple regression of claim severity on vehicle age gives $\text{SS}_\text{Tot} = 10{,}000$ and $\text{SS}_\text{Res} = 3{,}500$. Calculate $R^2$.
>
> > [!answer]-
> > $$R^2 = 1 - \frac{3{,}500}{10{,}000} = 1 - 0.35 = 0.65$$
> > Vehicle age explains 65% of the variance in claim severity.

> [!example]- Adjusted R-Squared Penalizing for Additional Predictors {Example}
> With $n = 50$ observations, $R^2 = 0.65$ for a model with $p = 5$ predictors. Compute $R^2_{\text{adj}}$.
>
> > [!answer]-
> > $$R^2_{\text{adj}} = 1 - \frac{(1-0.65)(50-1)}{50-5-1} = 1 - \frac{0.35 \times 49}{44} = 1 - \frac{17.15}{44} = 1 - 0.390 = 0.610$$
