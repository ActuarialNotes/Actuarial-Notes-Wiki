A **Hierarchical Model** (also called a **multilevel model** or **nested model**) organizes data and parameters into levels, where units at a lower level are nested within units at a higher level. It is a special case of the [[Linear Mixed Model]] with nested random effects.

> **Two-level hierarchical model:**
> $$Y_{ij} = \beta_0 + \beta_1 x_{ij} + u_j + \varepsilon_{ij}$$
>
> $$u_j \sim N(0, \sigma_u^2)$$
>
> $$\varepsilon_{ij} \sim N(0, \sigma_\varepsilon^2)$$

- **Level 1**: individual observations $i$ within group $j$ (e.g., claims within a policyholder)
- **Level 2**: groups $j$ (e.g., policyholders within a territory)
- $u_j$ is the **random intercept** for group $j$ — the group-level deviation from the population mean
- The **intraclass correlation coefficient (ICC)** measures how much of the total variance is between groups:
$$\text{ICC} = \frac{\sigma_u^2}{\sigma_u^2 + \sigma_\varepsilon^2}$$
- A high ICC indicates that knowing one observation's group provides substantial information about other observations in the same group
- Hierarchical models can also include **random slopes**, where the effect of a predictor $x_{ij}$ varies across groups $j$

> [!example]- ICC in a Claims Hierarchical Model {Example}
> An actuary fits a hierarchical model to claims data from 200 territories, each with multiple policyholders. The estimated variance components are $\hat{\sigma}_u^2 = 0.04$ (between territories) and $\hat{\sigma}_\varepsilon^2 = 0.16$ (within territories). Calculate the ICC.
>
> > [!answer]-
> > $$\text{ICC} = \frac{0.04}{0.04 + 0.16} = \frac{0.04}{0.20} = 0.20$$
> > 20% of the total variance in claims is attributable to territory-level differences. Territory membership explains a meaningful but not dominant share of claim variability.
