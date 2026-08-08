**Fixed effects** are the regression coefficients in a [[Linear Mixed Model]] that describe the *population-average* relationship between the predictors and the response. They are unknown constants to be estimated, not draws from a distribution.

> $$\mathbf{y} = \underbrace{\mathbf{X}\boldsymbol{\beta}}_{\text{fixed}} + \underbrace{\mathbf{Z}\mathbf{b}}_{\text{random}} + \boldsymbol{\varepsilon}$$
>
> $$E[\mathbf{y}] = \mathbf{X}\boldsymbol{\beta}$$

- A factor belongs in the fixed part when its levels are **the specific levels you care about** and would reappear in a replication of the study — territory, vehicle class, coverage limit
- Each fixed effect costs **one parameter per level** (less the baseline), so a factor with many levels is expensive and unstable — that is the case for making it a [[Random Effects|random effect]] instead
- Interpretation is the same as in a [[Generalized Linear Model]]: $\beta_j$ is the change in the mean response per unit of $x_j$, holding the rest fixed
- Fixed effects are **estimated** ($\hat{\boldsymbol\beta}$) by generalized least squares given the variance parameters; random effects are **predicted** ([[Best Linear Unbiased Predictor|BLUP]])
- Comparing two models that differ in their fixed effects requires **maximum likelihood**, not [[Restricted Maximum Likelihood|REML]]

![[Media/Figures/Fixed_Effects.svg|340]]

> [!example]- Fixed or Random? {Example}
> A claims model has three candidate grouping variables: `coverage` (3 levels: liability, collision, comprehensive), `territory` (68 rating territories), and `year` (5 calendar years of data). Which belong in the fixed part?
>
> > [!answer]-
> > **Coverage** — fixed. Three levels, all of interest, and each has plenty of data.
> > **Territory** — random. 68 levels, most thin, and the interest is in the *distribution* of territory effects and a shrunk estimate for each, not in 67 separately fitted coefficients.
> > **Year** — fixed if the five specific years are the object of interest (a trend), random only if they are treated as a sample of years.
