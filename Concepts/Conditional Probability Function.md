$$ f_{X|Y}(x \mid y) = \frac{f(x, y)}{f_Y(y)}, \quad f_Y(y) > 0 $$

A ==Conditional Probability Function== gives the distribution of one random variable given a specific value of another. For continuous random variables with joint PDF $f(x,y)$ and marginal PDF $f_Y(y)$, the conditional PDF is given by the formula above. For discrete random variables: $P(X = x \mid Y = y) = \frac{P(X = x, Y = y)}{P(Y = y)}$. The conditional distribution integrates (or sums) to 1 over its support given the conditioning value.

> [!example]- Conditional PDF from a Joint Density {💡 Example}
> If $f(x,y) = 6(1-y)$ for $0 \leq x \leq y \leq 1$, what is $f_{X|Y}(x \mid y)$?
>
> > [!answer]- Answer
> > First find the marginal PDF of $Y$:
> > $$ f_Y(y) = \int_0^y 6(1-y)\, dx = 6y(1-y) $$
> > Then apply the conditional PDF formula:
> > $$ f_{X|Y}(x \mid y) = \frac{6(1-y)}{6y(1-y)} = \frac{1}{y}, \quad 0 \leq x \leq y $$
> > Given $Y = y$, $X$ is uniformly distributed on $[0, y]$.
