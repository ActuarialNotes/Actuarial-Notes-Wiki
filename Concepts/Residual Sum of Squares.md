The **Residual Sum of Squares (RSS)** (also called the **Sum of Squared Errors, SSE**) measures the total unexplained variability in a regression model — the sum of squared differences between observed and fitted values.

> $$\text{RSS} = \sum_{i=1}^n (y_i - \hat{y}_i)^2$$
>
> $$= \sum_{i=1}^n e_i^2$$
>
> $$\hat{y}_i = \hat{\beta}_0 + \hat{\beta}_1 x_{i1} + \cdots + \hat{\beta}_p x_{ip}$$

- Ordinary least squares (OLS) estimation **minimizes RSS** with respect to $\boldsymbol{\beta}$
- RSS is the numerator of the **residual variance** estimate: $\hat{\sigma}^2 = \text{RSS}/(n-p-1)$
- For [[Decision Tree]] regression, RSS is the split criterion: splits are chosen to minimize the total RSS across all resulting regions
- **Decomposition**: $\text{SS}_{\text{Tot}} = \text{SS}_{\text{Reg}} + \text{RSS}$, where $\text{SS}_{\text{Tot}} = \sum(y_i - \bar{y})^2$ and $\text{SS}_{\text{Reg}} = \sum(\hat{y}_i - \bar{y})^2$
- [[R-Squared]] $= 1 - \text{RSS}/\text{SS}_{\text{Tot}}$

> [!example]- RSS for a Simple Linear Regression {Example}
> Fitted values from a regression of claim severity ($y$) on vehicle age ($x$) are $\hat{y} = (180, 220, 260)$ and observed values are $y = (200, 210, 270)$. Compute the RSS.
>
> > [!answer]-
> > $$\text{RSS} = (200-180)^2 + (210-220)^2 + (270-260)^2 = 400 + 100 + 100 = 600$$

> [!example]- RSS as a Decision Tree Split Criterion {Example}
> A regression tree considers splitting 6 observations into two groups. Group L: $y = (5, 7, 6)$ and Group R: $y = (15, 14, 16)$. Compute the total RSS for this split.
>
> > [!answer]-
> > $\bar{y}_L = 6$; RSS$_L = (5-6)^2+(7-6)^2+(6-6)^2 = 1+1+0 = 2$.
> > $\bar{y}_R = 15$; RSS$_R = (15-15)^2+(14-15)^2+(16-15)^2 = 0+1+1 = 2$.
> > Total RSS $= 2 + 2 = 4$. A split is accepted if no other partition gives a lower total RSS.
