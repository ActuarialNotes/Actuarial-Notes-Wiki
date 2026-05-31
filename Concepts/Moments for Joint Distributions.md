**Moments for joint distributions** generalize [[Expected Value]] to functions of multiple random variables. [[Covariance]] is computed from these moments as $\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$.

> $$E[X] = \sum_x \sum_y x\,p(x,y),$$
>
> $$E[Y] = \sum_x \sum_y y\,p(x,y)$$
>
> $$E[XY] = \sum_x \sum_y xy\,p(x,y)$$
>
> $$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$

- For [[Independent Random Variables]], $E[XY] = E[X]E[Y]$, so $\text{Cov}(X,Y) = 0$

> [!example]- Computing E[XY] {Example}
> Joint PMF: $p(0,0)=0.3$, $p(0,1)=0.2$, $p(1,0)=0.1$, $p(1,1)=0.4$.
>
> > [!answer]-
> > $$E[XY] = (0)(0)(0.3) + (0)(1)(0.2) + (1)(0)(0.1) + (1)(1)(0.4) = 0.4$$
> > $$E[X] = 0.1 + 0.4 = 0.5, \quad E[Y] = 0.2 + 0.4 = 0.6$$
> > $$\text{Cov}(X,Y) = 0.4 - (0.5)(0.6) = 0.4 - 0.3 = 0.10$$
