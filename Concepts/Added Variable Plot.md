An **Added Variable Plot** (partial regression plot) isolates the relationship between a single predictor $x_j$ and the response after removing (partialling out) the linear effects of all other predictors in the model — used to check whether $x_j$'s effect is correctly specified and to spot influential observations.

> $$e_Y = Y - \hat{Y}^{(-j)}, \qquad e_{x_j} = x_j - \hat{x}_j^{(-j)}$$
>
> $$\text{Plot } e_Y \text{ vs. } e_{x_j} \text{; the slope equals } \hat{\beta}_j \text{ from the full model}$$

- $\hat{Y}^{(-j)}$ and $\hat{x}_j^{(-j)}$ are the fitted values from regressing $Y$, and $x_j$ respectively, on all *other* predictors — the residuals $e_Y$ and $e_{x_j}$ represent what's left after removing those other predictors' effects
- A linear pattern with the expected slope confirms $x_j$'s effect is well-captured by a single term in the [[Model Structure]]; curvature suggests $x_j$ needs a transformation
- Unlike a simple scatter plot of $Y$ against $x_j$, the added variable plot isolates $x_j$'s **marginal** contribution after controlling for the other predictors, including any [[Control Variable]]s
- Points far out on the $e_{x_j}$ axis are high-leverage observations for $x_j$; points far from the fitted line are influential and worth investigating, complementing what a [[Residual Plot]] shows for overall fit

> [!example]- Reading an Added Variable Plot {Example}
> The added variable plot for vehicle age (after controlling for territory and driver age) shows a clear U-shape rather than a straight line. What does this indicate, and what model change would address it?
>
> > [!answer]-
> > The U-shape indicates that vehicle age's effect on the response, net of the other predictors, is **not linear** — a single linear term for vehicle age is misspecified. Adding a quadratic term (or banding vehicle age) to the [[Model Structure]] would better capture the relationship.
