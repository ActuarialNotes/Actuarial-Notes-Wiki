## Definition

A ==Conditional Probability Function== gives the distribution of one random variable given a specific value of another. For continuous random variables with joint PDF $f(x,y)$ and marginal PDF $f_Y(y)$:

$$ f_{X|Y}(x \mid y) = \frac{f(x, y)}{f_Y(y)}, \quad f_Y(y) > 0 $$

For discrete random variables: $P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$.

> [!example]- If $f(x,y) = 6(1-y)$ for $0 \leq x \leq y \leq 1$, what is $f_{X|Y}(x \mid y)$?
> First find $f_Y(y) = \int_0^y 6(1-y)\, dx = 6y(1-y)$.
> $$ f_{X|Y}(x \mid y) = \frac{6(1-y)}{6y(1-y)} = \frac{1}{y}, \quad 0 \leq x \leq y $$
> Given $Y = y$, $X$ is uniformly distributed on $[0, y]$.
