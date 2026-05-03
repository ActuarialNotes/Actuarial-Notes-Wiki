The **joint probability function** (joint PMF) of discrete random variables $X$ and $Y$ is:
$$p(x,y) = P(X = x,\; Y = y)$$

It satisfies $p(x,y) \geq 0$ for all $(x,y)$ and $\displaystyle\sum_x \sum_y p(x,y) = 1$.

The joint PMF fully characterizes the [[Multivariate Distribution]] of $(X, Y)$. From it, [[Marginal Probability Function]]s are obtained by summing out one variable, and [[Conditional Probability Function]]s are obtained by fixing one variable.

> [!example]- Number of Claims and Policies Lapsed {💡 Example}
> Let $X$ = number of claims (0 or 1) and $Y$ = policies lapsed (0 or 1). Joint PMF:
>
> | | $Y=0$ | $Y=1$ |
> |---|---|---|
> | $X=0$ | 0.50 | 0.20 |
> | $X=1$ | 0.20 | 0.10 |
>
> > [!answer]- Answer
> > $P(X=1, Y=1) = 0.10$. Marginal $P(X=1) = 0.20 + 0.10 = 0.30$.
