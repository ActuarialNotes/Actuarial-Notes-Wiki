An **Aggregate Loss Model** models the total (aggregate) losses $S$ from a portfolio as the sum of a **random number** of individual claim amounts:

> $$S = X_1 + X_2 + \cdots + X_N$$
>
> $$E[S] = E[N] \cdot E[X]$$
>
> $$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2$$

- $N$ is the **claim count** (frequency) random variable; $X_i$ are i.i.d. **claim severity** random variables independent of $N$
- This is called the **collective risk model**
- When $N \sim \text{Poi}(\lambda)$: $\text{Var}(S) = \lambda \cdot E[X^2]$ (simplification since $\text{Var}(N) = E[N] = \lambda$)
- When $N \sim \text{Poi}(\lambda)$ and $X_i \sim \text{Exp}(\theta)$: $S$ has a **compound Poisson** distribution; the MGF is $M_S(t) = \exp\!\left(\lambda(M_X(t) - 1)\right)$
- The [[Normal]] approximation via the [[Central Limit Theorem (CLT)]] applies when the portfolio is large

> [!example]- Mean and Variance of Aggregate Losses {Example}
> A portfolio has $N \sim \text{Poi}(100)$ claims per year. Individual claim sizes $X_i$ have $E[X] = 500$ and $\text{Var}(X) = 90{,}000$. Find $E[S]$ and $\text{Var}(S)$.
>
> > [!answer]-
> > $$E[S] = E[N]\cdot E[X] = 100 \times 500 = 50{,}000$$
> > $$\text{Var}(S) = E[N]\cdot\text{Var}(X) + \text{Var}(N)\cdot(E[X])^2 = 100(90{,}000) + 100(500)^2 = 9{,}000{,}000 + 25{,}000{,}000 = 34{,}000{,}000$$

> [!example]- Normal Approximation for Aggregate Losses {Example}
> Using the values above, approximate $P(S > 55{,}000)$.
>
> > [!answer]-
> > $\sigma_S = \sqrt{34{,}000{,}000} \approx 5{,}831$.
> > $$Z = \frac{55{,}000 - 50{,}000}{5{,}831} \approx 0.858$$
> > $$P(S > 55{,}000) = 1 - \Phi(0.858) \approx 1 - 0.8045 = 0.1955$$
