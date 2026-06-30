An **Offset Variable** is a predictor in a [[Generalized Linear Model]] whose coefficient is fixed at exactly $1$ rather than estimated from the data — used to force a known, exact relationship (most commonly exposure) into the linear predictor.

> $$g(\mu_i) = \ln(\text{Exposure}_i) + \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- For claim counts $N_i \sim \text{Poi}(\mu_i)$, since $E[N_i] = \text{Exposure}_i \times \text{Frequency}_i$, including $\ln(\text{Exposure}_i)$ as an offset converts a model for expected claim counts into a model for the underlying claim **[[Frequency]]** rate per unit of exposure
- An offset differs from an ordinary [[Control Variable]]: its coefficient is **not estimated** — it is forced to equal $1$, consistent with the known proportional relationship between exposure and expected claims
- If exposure were instead entered as an ordinary covariate, its estimated coefficient need not equal $1$, which would mask the intended exactly-proportional relationship
- Offsets are also used to carry forward previously-determined relativities (e.g., an established territory relativity) into a new model without re-estimating them

> [!example]- Fitting a Poisson Frequency Model with an Exposure Offset {Example}
> A Poisson GLM for claim counts uses $\ln(\text{Exposure})$ as an offset and a single rating variable, driver age, with fitted equation $\ln\hat{\mu}_i = \ln(\text{Exposure}_i) - 2.5 + 0.01 \cdot \text{age}_i$. For a driver age 40 with $2$ car-years of exposure, find the expected claim count and the fitted frequency.
>
> > [!answer]-
> > $$\ln\hat{\mu} = \ln(2) - 2.5 + 0.01(40) = 0.693 - 2.5 + 0.4 = -1.407$$
> > $$\hat{\mu} = e^{-1.407} \approx 0.245 \text{ expected claims}$$
> > Since the offset coefficient is fixed at $1$, dividing back out the exposure gives the fitted frequency: $\hat{\mu}/\text{Exposure} = 0.245/2 \approx 0.122$ claims per car-year.
