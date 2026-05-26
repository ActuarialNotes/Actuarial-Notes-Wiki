A **QQ Plot** (Quantile-Quantile Plot) is a graphical diagnostic that compares the **quantiles** of a dataset against the quantiles of a theoretical distribution (or another dataset) to assess goodness of fit.

> **Construction:** Plot the $i$-th order statistic $x_{(i)}$ against the theoretical quantile $F^{-1}\!\left(\frac{i}{n+1}\right)$ (or $\frac{i-0.5}{n}$).

**Interpretation:**

| Pattern | Implication |
| :--- | :--- |
| Points fall on a straight line | Data fits the theoretical distribution well |
| S-shaped curve | Data has lighter tails than the theoretical distribution |
| Reverse S-shape | Data has heavier tails (fat-tailed data) |
| Points above the line in the upper tail | Right tail is heavier than theoretical |
| Systematic curvature | Distribution family is wrong |

- A **Normal QQ plot** plots sample quantiles against Normal quantiles; a straight line indicates normality
- Used to assess model assumptions in [[Generalized Linear Model]]s and linear regression ([[Residual Plot]]s on a QQ scale check normality of residuals)
- More informative than a histogram for comparing distributional tails

> [!example]- Interpreting a Normal QQ Plot of Residuals {Example}
> After fitting a linear regression to claim severity data, a Normal QQ plot of the residuals shows points that closely follow the 45° line in the center but curve sharply upward in the upper-right tail. What does this indicate?
>
> > [!answer]-
> > The upward curve in the upper tail indicates that the **residuals have a heavier right tail** than the Normal distribution. This suggests the normality assumption for residuals may be violated — perhaps a log transformation of severity or a GLM with a Gamma distribution would be more appropriate.
