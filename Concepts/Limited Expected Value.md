The **Limited Expected Value** (LEV) of a random variable $X$ at limit $u$ is the expected value of the payment under a policy that pays $X$ up to a maximum of $u$. It equals the expected value of $\min(X, u)$.

> $$E[X \wedge u] = \int_0^u [1 - F(x)]\,dx \quad \text{(for non-negative } X\text{)}$$
>
> $$E[X \wedge u] = E[X] - E[\max(X - u, 0)] = E[X] - e(u)\cdot[1-F(u)]$$

- Also written $E[\min(X, u)]$; the **limited loss variable** is $Y = \min(X, u)$
- As $u \to \infty$, $E[X \wedge u] \to E[X]$
- $E[X \wedge u]$ is a non-decreasing, concave function of $u$
- Used to price **policy limits** and **excess-of-loss reinsurance**: the insurer pays $E[X \wedge u]$ and the reinsurer pays $E[X] - E[X \wedge u]$

**Common formulas:**

| Distribution | $E[X \wedge u]$ |
| :--- | :--- |
| Exponential$(\theta)$ | $\theta(1 - e^{-u/\theta})$ |
| Pareto$(\alpha, \theta)$ | $\dfrac{\theta}{\alpha-1}\!\left[1 - \left(\dfrac{\theta}{\theta+u}\right)^{\alpha-1}\right]$ |

> [!example]- Insurer Payment with a Policy Limit {Example}
> Losses $X \sim \text{Exponential}(\theta = 1{,}000)$. A policy pays losses up to a limit of $u = 2{,}000$. Find the expected payment per loss.
>
> > [!answer]-
> > $$E[X \wedge 2{,}000] = 1{,}000\left(1 - e^{-2{,}000/1{,}000}\right) = 1{,}000(1 - e^{-2}) \approx 1{,}000(0.8647) = 864.7$$
> > The insurer expects to pay \$$864.70$ per loss.
