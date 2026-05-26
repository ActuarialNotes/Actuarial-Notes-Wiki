A **Sufficient Statistic** $T(X_1, \ldots, X_n)$ for a parameter $\theta$ is a statistic that captures all the information in the sample about $\theta$. Once $T$ is known, the conditional distribution of the sample given $T$ does not depend on $\theta$.

> **Fisher–Neyman Factorization Theorem:** $T$ is sufficient for $\theta$ if and only if the joint density (or PMF) factors as:
> $$f(x_1, \ldots, x_n \mid \theta) = g(T(x_1,\ldots,x_n),\, \theta) \cdot h(x_1, \ldots, x_n)$$

- $g$ depends on the data **only through** $T$; $h$ does not depend on $\theta$
- The sufficient statistic **summarizes** the sample without loss of information about $\theta$
- For **exponential family** distributions, a natural sufficient statistic always exists (e.g., $\sum X_i$ for the Poisson, Normal, and Exponential families)
- A **complete sufficient statistic** combined with the Lehmann–Scheffé theorem yields the **UMVUE** (uniformly minimum variance unbiased estimator)

| Distribution | Parameter | Sufficient Statistic |
| :--- | :--- | :--- |
| $\text{Poi}(\lambda)$ | $\lambda$ | $\sum_{i=1}^n X_i$ |
| $N(\mu, \sigma^2)$ | $\mu$ (known $\sigma^2$) | $\bar{X}$ |
| $\text{Exp}(\theta)$ | $\theta$ | $\sum_{i=1}^n X_i$ |

> [!example]- Verifying a Sufficient Statistic via Factorization {Example}
> Let $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Poi}(\lambda)$. Show that $T = \sum X_i$ is sufficient for $\lambda$.
>
> > [!answer]-
> > The joint PMF is:
> > $$f(\mathbf{x} \mid \lambda) = \prod_{i=1}^n \frac{e^{-\lambda}\lambda^{x_i}}{x_i!} = \frac{e^{-n\lambda}\lambda^{\sum x_i}}{\prod x_i!}$$
> > Set $g(T, \lambda) = e^{-n\lambda}\lambda^T$ and $h(\mathbf{x}) = \dfrac{1}{\prod x_i!}$. Since $g$ depends on the data only through $T = \sum x_i$, the factorization theorem confirms $T$ is sufficient.
