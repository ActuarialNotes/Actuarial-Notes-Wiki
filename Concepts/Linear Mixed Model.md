A **Linear Mixed Model (LMM)** extends ordinary linear regression by including both **fixed effects** (parameters that apply to the entire population) and **random effects** (parameters that vary across groups or subjects). This accommodates correlated observations, repeated measures, and grouped data.

> $$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{Z}\mathbf{u} + \boldsymbol{\varepsilon}$$
>
> $$\mathbf{u} \sim N(\mathbf{0}, \mathbf{G})$$
>
> $$\boldsymbol{\varepsilon} \sim N(\mathbf{0}, \mathbf{R})$$
>
> $$\mathbf{u} \perp \boldsymbol{\varepsilon}$$

**Model components:**

| Symbol | Name | Description |
| :--- | :--- | :--- |
| $\boldsymbol{\beta}$ | Fixed effects | Population-level coefficients |
| $\mathbf{u}$ | Random effects | Group-level deviations |
| $\mathbf{X}$, $\mathbf{Z}$ | Design matrices | For fixed and random effects |
| $\mathbf{G}$ | Random effect covariance | Variance of group-level deviations |
| $\mathbf{R}$ | Residual covariance | Within-group error structure |

- **Marginal mean**: $E[\mathbf{y}] = \mathbf{X}\boldsymbol{\beta}$; **marginal covariance**: $\text{Cov}(\mathbf{y}) = \mathbf{Z}\mathbf{G}\mathbf{Z}^\top + \mathbf{R}$
- Parameters are estimated by **REML** (Restricted Maximum Likelihood) or **ML**, preferring REML for variance component estimates
- **[[Hierarchical Model]]s** are a special case of LMMs with nested random effects
- LMMs connect to [[Bühlmann-Straub Credibility]]: the BLUP (Best Linear Unbiased Predictor) for a random effect corresponds to the credibility estimate

> [!example]- Random Intercept Model for Repeated Claims {Example}
> Claims from $i = 1, \ldots, 50$ policyholders are observed over $t = 1, \ldots, 4$ years. An actuary fits: $Y_{it} = \beta_0 + \beta_1 \text{age}_i + u_i + \varepsilon_{it}$, where $u_i \sim N(0, \sigma_u^2)$ is a policyholder random intercept. Interpret $\sigma_u^2$.
>
> > [!answer]-
> > $\sigma_u^2$ is the **between-policyholder variance** — how much policyholders differ in their baseline claim levels after accounting for age. A large $\sigma_u^2$ relative to $\sigma_\varepsilon^2$ indicates substantial policyholder heterogeneity not explained by age.
