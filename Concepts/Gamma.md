$$f(x) = \frac{x^{\alpha-1}\,e^{-x/\theta}}{\theta^{\alpha}\,\Gamma(\alpha)}, \quad x > 0$$
$$\text{where } \alpha > 0 = \text{shape},\quad \theta > 0 = \text{scale}$$

The Gamma Distribution $X \sim \text{Gamma}(\alpha, \theta)$ is a flexible continuous distribution on $(0, \infty)$ generalizing the exponential, used to model skewed loss severities and aggregate claims.

Its mean is $E[X] = \alpha\theta$, variance is $\text{Var}(X) = \alpha\theta^2$, and coefficient of variation is $CV = 1/\sqrt{\alpha}$. Special cases include the exponential ($\alpha = 1$) and chi-squared ($\alpha = n/2$, $\theta = 2$) distributions. The sum of $n$ independent $\text{Exp}(\theta)$ variables follows $\text{Gamma}(n, \theta)$.

> [!example]- Mean and Variance of Aggregate Claim Severity {💡 Example}
> Individual losses follow $\text{Gamma}(\alpha = 4, \theta = 250)$. Find $E[X]$, $\text{Var}(X)$, and the coefficient of variation.
>
> > [!answer]- Answer
> > $$E[X] = \alpha\theta = 4 \times 250 = 1{,}000$$
> > $$\text{Var}(X) = \alpha\theta^2 = 4 \times 250^2 = 250{,}000$$
> > $$CV = \frac{\sqrt{250{,}000}}{1{,}000} = \frac{500}{1{,}000} = 0.50$$
