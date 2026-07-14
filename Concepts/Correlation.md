**Correlation** $\rho(X, Y)$ measures the strength and direction of the linear relationship between two [[Random Variable|random variables]] $X$ and $Y$. The Pearson correlation coefficient standardizes the [[Covariance]] by the product of the standard deviations, forcing it into the range $[-1, 1]$.

> $$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \, \sigma_Y}$$

- $\rho = 1$ is a perfect positive linear relationship, $\rho = -1$ a perfect negative one, and $\rho = 0$ no linear association.
- Zero correlation does **not** imply [[Independent Random Variables|independence]] unless $X$ and $Y$ are jointly normal.
- Being unit-free, $\rho$ is comparable across variables on different scales, unlike the raw covariance.

> [!example]- Correlation Between Insurance Loss and Expense {Example}
> Two random variables $X$ and $Y$ have $\text{Var}(X) = 25$, $\text{Var}(Y) = 36$, and $\text{Cov}(X, Y) = -18$. Find the correlation coefficient and interpret it.
>
> > [!answer]-
> > The standard deviations are $\sigma_X = \sqrt{25} = 5$ and $\sigma_Y = \sqrt{36} = 6$:
> > $$\rho(X, Y) = \frac{-18}{5 \times 6} = \frac{-18}{30} = -0.6$$
> > A correlation of $-0.6$ indicates a moderately strong negative linear relationship: as $X$ increases, $Y$ tends to decrease.
