$$p_X(x) = \sum_y p_{X,Y}(x,y), \qquad p_{X|Y}(x \mid y) = \frac{p_{X,Y}(x,y)}{p_Y(y)}$$

The Marginal Probability Function of $X$ is obtained by summing the joint PMF over all values of $Y$. The Conditional Probability Function of $X$ given $Y = y$ is the ratio of the joint PMF to the marginal of $Y$, defined wherever $p_Y(y) > 0$.

> [!example]- Insurance Claims by Policy Type {💡 Example}
> Let $X$ = number of claims (0 or 1) and $Y$ = policy type (1 or 2), with joint PMF: $p(0,1)=0.3$, $p(1,1)=0.2$, $p(0,2)=0.1$, $p(1,2)=0.4$. Find the marginal distribution of $X$ and $P(X=1 \mid Y=2)$.
>
> > [!answer]- Answer
> > Marginals: $p_X(0) = 0.3+0.1 = 0.4$ and $p_X(1) = 0.2+0.4 = 0.6$. The marginal of $Y$: $p_Y(2) = 0.1+0.4 = 0.5$. Conditional:
> > $$p_{X|Y}(1 \mid 2) = \frac{p(1,2)}{p_Y(2)} = \frac{0.4}{0.5} = 0.8$$
