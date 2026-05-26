**Bühlmann-Straub Credibility** extends [[Bühlmann Credibility]] to handle observations with **unequal exposures** (or weights) $m_i$. Each period $i$ contributes a loss rate $X_i = S_i / m_i$ with weight $m_i$, so periods with more exposure get more weight.

> $$\text{Estimate} = Z \cdot \bar{X}_w + (1-Z) \cdot \mu$$
>
> $$Z = \frac{m}{m + k}, \quad \bar{X}_w = \frac{\sum_{i=1}^n m_i X_i}{\sum_{i=1}^n m_i}, \quad m = \sum_{i=1}^n m_i$$

**Variance components** (same definitions as [[Bühlmann Credibility]]):
$$k = \frac{v}{a}, \quad v = E[\sigma^2(\theta)], \quad a = \text{Var}(\mu(\theta))$$

- $\bar{X}_w$ is the **exposure-weighted** average loss rate
- $m$ is the **total exposure**; credibility increases with total exposure, not just the number of periods
- When all $m_i = 1$, Bühlmann-Straub reduces to the standard Bühlmann model
- Parameters $v$ and $a$ are typically estimated from the data using **empirical Bayes** methods

> [!example]- Bühlmann-Straub with Unequal Exposures {Example}
> A risk has three years of data with exposures $(m_1, m_2, m_3) = (100, 200, 150)$ and loss rates $(X_1, X_2, X_3) = (0.08, 0.06, 0.09)$. Given $k = 2{,}500/m$ scaling such that $k = 250$ (i.e., $v/a = 250$) and overall mean $\mu = 0.07$, find the credibility estimate.
>
> > [!answer]-
> > $m = 100 + 200 + 150 = 450$.
> > $\bar{X}_w = \frac{100(0.08) + 200(0.06) + 150(0.09)}{450} = \frac{8 + 12 + 13.5}{450} = \frac{33.5}{450} \approx 0.0744$.
> > $Z = \frac{450}{450 + 250} = \frac{450}{700} \approx 0.643$.
> > $$\text{Estimate} = 0.643(0.0744) + 0.357(0.07) \approx 0.0479 + 0.0250 = 0.0729$$
