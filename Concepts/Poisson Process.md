A **Poisson Process** $\{N(t), t \geq 0\}$ is a counting process that models the number of events occurring in a time interval when events arrive independently at a constant average rate $\lambda > 0$.

> $$P(N(t) = k) = \frac{e^{-\lambda t}(\lambda t)^k}{k!}, \quad k = 0, 1, 2, \ldots$$
>
> $$E[N(t)] = \text{Var}(N(t)) = \lambda t$$

- The number of events in non-overlapping intervals are **independent**
- The number of events in any interval of length $t$ has distribution $\text{Poi}(\lambda t)$
- Interarrival times $T_1, T_2, \ldots$ are i.i.d. $\text{Exponential}(\lambda)$ with mean $1/\lambda$
- The waiting time $S_n = T_1 + \cdots + T_n$ to the $n$-th event follows a [[Gamma]] distribution with shape $n$ and rate $\lambda$
- A Poisson process with rate $\lambda$ **thinned** by probability $p$ produces a Poisson process with rate $\lambda p$
- **Superposition**: two independent Poisson processes with rates $\lambda_1$ and $\lambda_2$ combine into a Poisson process with rate $\lambda_1 + \lambda_2$

> [!example]- Expected Number of Claims and Probability of More Than 5 {Example}
> Claims arrive at rate $\lambda = 2$ per month. Find the expected number of claims and the probability of more than 5 claims in 3 months.
>
> > [!answer]-
> > Over $t = 3$ months, $N(3) \sim \text{Poi}(2 \times 3) = \text{Poi}(6)$.
> > $$E[N(3)] = 6, \quad \text{Var}(N(3)) = 6$$
> > $$P(N(3) > 5) = 1 - P(N(3) \leq 5) = 1 - \sum_{k=0}^{5} \frac{e^{-6}6^k}{k!} \approx 1 - 0.4457 = 0.5543$$

> [!example]- Thinning a Poisson Process {Example}
> Large claims arrive at rate $\lambda = 10$ per year. Each claim independently has a 30% chance of exceeding the deductible. Find the rate of claims that exceed the deductible.
>
> > [!answer]-
> > By the thinning property, claims exceeding the deductible form a Poisson process with rate $\lambda p = 10 \times 0.30 = 3$ per year.
