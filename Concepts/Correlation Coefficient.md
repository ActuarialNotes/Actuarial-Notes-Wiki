The **Correlation Coefficient** (Pearson's $\rho$) is the standardized measure of linear association between two random variables, obtained by dividing the [[Covariance]] by the product of the standard deviations.

> $$\rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y}$$

- It satisfies $-1 \leq \rho \leq 1$
- $\rho = \pm 1$ indicates a perfect linear relationship; $\rho = 0$ indicates no linear association

![Scatter plots illustrating correlation coefficients from −1 to +1](https://commons.wikimedia.org/wiki/Special:FilePath/Correlation_examples2.svg)

> [!example]- Computing the Correlation Coefficient from Variances {Example}
> If $\text{Cov}(X,Y) = 6$, $\text{Var}(X) = 9$, and $\text{Var}(Y) = 16$, what is $\rho$?
>
> > [!answer]-
> > $$\rho = \frac{6}{\sqrt{9} \cdot \sqrt{16}} = \frac{6}{3 \times 4} = \frac{6}{12} = 0.5$$
> > This indicates a moderate positive linear relationship between $X$ and $Y$.
