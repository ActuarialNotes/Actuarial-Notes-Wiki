An **Interaction** between two predictors in a [[Generalized Linear Model]] exists when the effect of one predictor on the response depends on the level or value of the other — the combined effect is not simply the sum of each predictor's separate (main) effect.

> $$\eta = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 (x_1 \times x_2)$$

- $\beta_3$ is the interaction coefficient: it measures how much the effect of $x_1$ on $\eta$ changes per unit increase in $x_2$ (and symmetrically for $x_2$ given $x_1$)
- If $\beta_3 = 0$, the two predictors act **additively** on the link scale — no interaction
- Interactions can occur between two [[Categorical Predictor|categorical predictors]] (the effect differs by combination of levels), a categorical and a continuous predictor (the slope differs by group), or two continuous predictors
- Interaction terms add to the [[Model Structure]] and are tested for significance via the [[Parameter Estimate Tables|parameter estimate table]] or a nested-model [[ANOVA]] (likelihood-ratio) test; unnecessary interactions increase the risk of overfitting

> [!example]- Interpreting an Interaction Coefficient {Example}
> A Poisson GLM for claim frequency includes vehicle age ($x_1$), an indicator for sports car ($x_2$), and their interaction, with $\hat{\beta}_1 = -0.02$, $\hat{\beta}_2 = 0.10$, $\hat{\beta}_3 = 0.03$. How does the effect of one additional year of vehicle age on log-frequency differ for sports cars versus non-sports cars?
>
> > [!answer]-
> > For non-sports cars ($x_2 = 0$), one more year of age changes $\eta$ by $\hat{\beta}_1 = -0.02$.
> > For sports cars ($x_2 = 1$), one more year of age changes $\eta$ by $\hat{\beta}_1 + \hat{\beta}_3 = -0.02 + 0.03 = 0.01$.
> > The interaction reverses the sign of the age effect for sports cars: frequency decreases with age for non-sports cars but slightly increases with age for sports cars.
