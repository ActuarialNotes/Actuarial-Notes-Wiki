The **marginal** and **conditional probability functions** each describe a single component of a joint distribution: the marginal PMF $p_X(x)$ is the distribution of $X$ on its own, and the conditional PMF $p_{X \mid Y}(x \mid y)$ is the distribution of $X$ once $Y = y$ is known.

> $$p_X(x) = \sum_y p_{X,Y}(x, y)$$

> $$p_{X \mid Y}(x \mid y) = \frac{p_{X,Y}(x, y)}{p_Y(y)}$$

- The marginal is found by summing (or integrating, in the continuous case) the [[Joint Probability Function|joint PMF]] over the other variable.
- The conditional is defined wherever $p_Y(y) > 0$; it renormalizes the joint by the [[Marginal Probability Function|marginal]] of the conditioning variable.
- If $X$ and $Y$ are [[Independent Random Variables|independent]], the conditional equals the marginal: $p_{X \mid Y}(x \mid y) = p_X(x)$.

> [!example]- Insurance Claims by Policy Type {Example}
> Let $X$ = number of claims (0 or 1) and $Y$ = policy type (1 or 2), with joint PMF $p(0,1)=0.3$, $p(1,1)=0.2$, $p(0,2)=0.1$, $p(1,2)=0.4$. Find the marginal distribution of $X$ and $P(X=1 \mid Y=2)$.
>
> > [!answer]-
> > Marginals of $X$: $p_X(0) = 0.3 + 0.1 = 0.4$ and $p_X(1) = 0.2 + 0.4 = 0.6$. Marginal of $Y$ at 2: $p_Y(2) = 0.1 + 0.4 = 0.5$. The conditional is:
> > $$p_{X \mid Y}(1 \mid 2) = \frac{p(1,2)}{p_Y(2)} = \frac{0.4}{0.5} = 0.8$$
> > Given a type-2 policy, there is an 80% chance of a claim.
