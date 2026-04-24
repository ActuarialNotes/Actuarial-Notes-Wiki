$$\text{Var}(X \mid Y=y) = E[X^2 \mid Y=y] - \bigl(E[X \mid Y=y]\bigr)^2$$

The Variance of a marginal distribution measures spread of $X$ across all values of $Y$, computed from $p_X(x)$. The Conditional Variance $\text{Var}(X \mid Y=y)$ measures the spread of $X$ within the subpopulation where $Y=y$, using $p_{X|Y}(x \mid y)$.

> [!example]- Variance of Claims Given Policy Type {💡 Example}
> Joint PMF: $p(0,1)=0.3$, $p(1,1)=0.2$, $p(0,2)=0.1$, $p(1,2)=0.4$ where $X$ = claims and $Y$ = policy type. Find $\text{Var}(X \mid Y=2)$.
>
> > [!answer]- Answer
> > Since $p_Y(2)=0.5$: $p_{X|Y}(0\mid 2)=0.2$ and $p_{X|Y}(1\mid 2)=0.8$. Then $E[X \mid Y=2] = 0(0.2)+1(0.8) = 0.8$ and $E[X^2 \mid Y=2] = 0.8$. So:
> > $$\text{Var}(X \mid Y=2) = 0.8 - (0.8)^2 = 0.16$$
