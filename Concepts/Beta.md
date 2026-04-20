$$f(x) = \frac{x^{\alpha - 1}(1-x)^{\beta - 1}}{B(\alpha,\, \beta)}, \quad 0 < x < 1$$
$$\text{where } B(\alpha, \beta) = \frac{\Gamma(\alpha)\,\Gamma(\beta)}{\Gamma(\alpha + \beta)}$$

The Beta Distribution $X \sim \text{Beta}(\alpha, \beta)$ is a continuous distribution on $(0, 1)$ parameterized by shape parameters $\alpha > 0$ and $\beta > 0$.

Its mean is $E[X] = \alpha/(\alpha + \beta)$ and variance is $\text{Var}(X) = \alpha\beta / [(\alpha+\beta)^2(\alpha+\beta+1)]$. When $\alpha = \beta = 1$ it reduces to the continuous uniform distribution on $(0,1)$. It is commonly used to model rates, proportions, and probabilities.

> [!example]- Expected Loss Ratio from a Beta Model {💡 Example}
> An insurer models its loss ratio $X \sim \text{Beta}(3, 2)$. Find the mean and variance of $X$.
>
> > [!answer]- Answer
> > With $\alpha = 3$, $\beta = 2$:
> > $$E[X] = \frac{3}{3+2} = \frac{3}{5} = 0.60$$
> > $$\text{Var}(X) = \frac{3 \cdot 2}{(5)^2 (6)} = \frac{6}{150} = 0.04$$
> > The expected loss ratio is 60% with a standard deviation of $\sqrt{0.04} = 0.20$.
