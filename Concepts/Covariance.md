$$ \text{Cov}(X, Y) = E[XY] - E[X] \cdot E[Y] = E[(X - \mu_X)(Y - \mu_Y)] $$

==Covariance== measures the linear association between two random variables $X$ and $Y$. Positive covariance indicates the variables tend to move together; negative covariance indicates they tend to move in opposite directions. If $X$ and $Y$ are independent, $\text{Cov}(X, Y) = 0$ (but the converse is not necessarily true).

> [!example]- Computing Covariance from Expectations {💡 Example}
> Given $E[X] = 2$, $E[Y] = 4$, and $E[XY] = 10$, what is $\text{Cov}(X, Y)$?
>
> > [!answer]- Answer
> > $$ \text{Cov}(X, Y) = E[XY] - E[X] \cdot E[Y] = 10 - 2 \times 4 = 10 - 8 = 2 $$
> > The positive covariance suggests $X$ and $Y$ tend to increase together.
