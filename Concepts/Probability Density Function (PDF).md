## Definition

A ==Probability Density Function (PDF)== describes the relative likelihood of a continuous random variable taking a particular value. For a continuous random variable $X$ with PDF $f(x)$, the probability that $X$ falls in an interval $[a, b]$ is:

$$ P(a \leq X \leq b) = \int_a^b f(x)\, dx $$

The PDF must satisfy $f(x) \geq 0$ and $\int_{-\infty}^{\infty} f(x)\, dx = 1$. Note that $P(X = x) = 0$ for any single point.

> [!example]- If $f(x) = 3x^2$ for $0 \leq x \leq 1$, what is $P(X > 0.5)$?
> $$ P(X > 0.5) = \int_{0.5}^{1} 3x^2\, dx = \left[ x^3 \right]_{0.5}^{1} = 1 - 0.125 = 0.875 $$
