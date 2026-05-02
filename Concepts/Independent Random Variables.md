[[Random Variable]]s $X$ and $Y$ are **independent** if knowledge of one provides no information about the other. Formally, for all values $x$ and $y$:
$$F(x, y) = F_X(x) \cdot F_Y(y) \quad \Longleftrightarrow \quad f(x,y) = f_X(x)\cdot f_Y(y)$$

Independence implies [[Covariance]] is zero ($\text{Cov}(X,Y) = 0$), though the converse is not always true. For independent random variables:
$$E[XY] = E[X]\,E[Y], \qquad \text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$$

The [[Central Limit Theorem]] applies to sums of independent and identically distributed (i.i.d.) random variables.

> [!example]- Verifying Independence {💡 Example}
> $X \sim \text{Uniform}(0,1)$ and $Y \sim \text{Uniform}(0,1)$ with joint density $f(x,y) = 2$ for $0 < x < y < 1$. Are $X$ and $Y$ independent?
>
> > [!answer]- Answer
> > The marginal densities are $f_X(x) = 2(1-x)$ and $f_Y(y) = 2y$. Their product is $4y(1-x)$, but $f(x,y) = 2 \neq 4y(1-x)$ in general, so **$X$ and $Y$ are not independent**.
