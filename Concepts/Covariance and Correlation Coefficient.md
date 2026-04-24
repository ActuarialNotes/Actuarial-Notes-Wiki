$$\text{Cov}(X,Y) = E[XY] - E[X]E[Y], \qquad \rho_{X,Y} = \frac{\text{Cov}(X,Y)}{\sigma_X \sigma_Y}$$

The Covariance of $X$ and $Y$ measures the direction of their linear relationship; positive means they tend to move together, negative means they move oppositely.

The Correlation Coefficient $\rho_{X,Y} \in [-1, 1]$ standardizes covariance by the product of the standard deviations, making it unit-free and comparable across different scales.

> [!example]- Covariance of Study Hours and Exam Score {💡 Example}
> Joint PMF: $p(1,4)=0.2$, $p(1,8)=0.1$, $p(3,4)=0.1$, $p(3,8)=0.6$ where $X$ = hours studied and $Y$ = exam score. Compute $\text{Cov}(X,Y)$.
>
> > [!answer]- Answer
> > First find the marginal means:
> > $$E[X] = 1(0.3)+3(0.7) = 2.4, \qquad E[Y] = 4(0.3)+8(0.7) = 6.8$$
> > Then compute $E[XY]$:
> > $$E[XY] = 1\cdot4(0.2)+1\cdot8(0.1)+3\cdot4(0.1)+3\cdot8(0.6) = 17.2$$
> > Therefore:
> > $$\text{Cov}(X,Y) = 17.2 - (2.4)(6.8) = 17.2 - 16.32 = 0.88$$
> > The positive covariance confirms that more study hours is associated with higher scores.
