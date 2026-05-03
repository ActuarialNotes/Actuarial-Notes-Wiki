$$ \rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y}, \quad -1 \leq \rho \leq 1 $$

==Correlation== measures the strength and direction of the linear relationship between two random variables $X$ and $Y$. The Pearson correlation coefficient $\rho$ is computed by dividing the covariance of $X$ and $Y$ by the product of their standard deviations, which standardizes the measure to always fall between $-1$ and $1$. A value of $\rho = 1$ indicates a perfect positive linear relationship, $\rho = -1$ indicates a perfect negative linear relationship, and $\rho = 0$ indicates no linear association. Note that zero correlation does not imply independence unless the variables are jointly normal.

> [!example]- Correlation Between Insurance Loss and Expense {💡 Example}
> Two random variables $X$ and $Y$ have $\text{Var}(X) = 25$, $\text{Var}(Y) = 36$, and $\text{Cov}(X, Y) = -18$. What is the correlation coefficient, and what does it indicate?
>
> > [!answer]- Answer
> > The standard deviations are $\sigma_X = \sqrt{25} = 5$ and $\sigma_Y = \sqrt{36} = 6$.
> > $$ \rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y} = \frac{-18}{5 \times 6} = \frac{-18}{30} = -0.6 $$
> > A correlation of $-0.6$ indicates a moderately strong negative linear relationship: as $X$ increases, $Y$ tends to decrease.
