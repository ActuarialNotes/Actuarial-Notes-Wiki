The **covariance** $\text{Cov}(X, Y)$ measures the direction of the linear relationship between two [[Random Variable|random variables]] — positive if they tend to move together, negative if oppositely. The **correlation coefficient** $\rho_{X,Y}$ standardizes it into the range $[-1, 1]$.

> $$\text{Cov}(X, Y) = E[XY] - E[X]\,E[Y]$$

> $$\rho_{X,Y} = \frac{\text{Cov}(X, Y)}{\sigma_X \, \sigma_Y}$$

- Correlation is unit-free and comparable across scales, whereas covariance carries the product of the two variables' units.
- $\rho_{X,Y} = 0$ means no linear relationship, but not necessarily [[Independent Random Variables|independence]].
- See [[Correlation]] for interpretation and [[Covariance]] for properties such as bilinearity.

> [!example]- Covariance of Study Hours and Exam Score {Example}
> A joint PMF is $p(1,4)=0.2$, $p(1,8)=0.1$, $p(3,4)=0.1$, $p(3,8)=0.6$, where $X$ = hours studied and $Y$ = exam score. Compute $\text{Cov}(X, Y)$.
>
> > [!answer]-
> > First the marginal means:
> > $$\begin{align*} E[X] &= 1(0.3) + 3(0.7) = 2.4 \\ E[Y] &= 4(0.3) + 8(0.7) = 6.8 \end{align*}$$
> > Then $E[XY]$:
> > $$E[XY] = 1{\cdot}4(0.2) + 1{\cdot}8(0.1) + 3{\cdot}4(0.1) + 3{\cdot}8(0.6) = 17.2$$
> > Therefore:
> > $$\text{Cov}(X, Y) = 17.2 - (2.4)(6.8) = 17.2 - 16.32 = 0.88$$
> > The positive covariance confirms that more study hours is associated with higher scores.
