---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:af7eb987f3727c2e147415a0ec4423f65e75c85129a07ce4c535f32407840612
  sources: []
  open_findings: 0
  log: .verify/Concepts/Compound Poisson Process.md
---

A **Compound Poisson Process** adds a random amount to each event of a [[Poisson Process]]: if claims arrive at rate $\lambda$ and the $i$-th claim costs $X_i$, the aggregate loss by time $t$ is the random sum $S(t) = \sum_{i=1}^{N(t)} X_i$. It is the standard model for total claims on a portfolio and the process form of the [[Aggregate Loss Model]].

> $$S(t) = \sum_{i=1}^{N(t)} X_i, \qquad N(t) \sim \text{Poi}(\lambda t)$$

> $$E[S(t)] = \lambda t\, E[X], \qquad \text{Var}(S(t)) = \lambda t\, E[X^2]$$

- The severities $X_1, X_2, \ldots$ are i.i.d., independent of the counting process $N(t)$
- The variance uses the **second moment** $E[X^2]$, not the variance of $X$ — this falls out of the compound-variance formula $\text{Var}(S) = E[N]\text{Var}(X) + \text{Var}(N)E[X]^2$ with $E[N] = \text{Var}(N) = \lambda t$
- The sum of independent compound Poisson processes is compound Poisson with rate $\lambda = \sum \lambda_j$ and severity distribution the $\lambda$-weighted mixture of the $F_j$
- **Thinning** carries over: claims of a given type (e.g. those exceeding a [[Deductible]]) form their own compound Poisson process, with rate $\lambda P(X > d)$ and severity distributed as the conditional excess
- The moment generating function is $M_{S(t)}(r) = \exp\{\lambda t\,[M_X(r) - 1]\}$, which is how higher moments and approximations are derived
- $S(t)$ is not Poisson and is usually right-skewed; for large $\lambda t$ a Normal approximation is workable, but the skewness $\lambda t E[X^3] / (\lambda t E[X^2])^{3/2}$ vanishes only slowly

![[Media/Figures/Compound_Poisson_Process.svg|340]]

> [!example]- Mean and Variance of Annual Aggregate Losses {Example}
> Claims arrive at $\lambda = 50$ per year. Severity is [[Exponential Distribution|exponential]] with mean $2{,}000$. Find the mean and standard deviation of aggregate losses in one year.
>
> > [!answer]-
> > For an exponential with mean $\theta = 2{,}000$: $E[X] = 2{,}000$ and $E[X^2] = 2\theta^2 = 8 \times 10^6$.
> > $$E[S(1)] = 50 \times 2{,}000 = 100{,}000$$
> > $$\text{Var}(S(1)) = 50 \times 8 \times 10^6 = 4 \times 10^8$$
> > $$\text{SD}(S(1)) = \sqrt{4 \times 10^8} = 20{,}000$$

> [!example]- Aggregate Losses Above a Deductible {Example}
> With $\lambda = 50$ and exponential severity of mean $2{,}000$, a $1{,}000$ [[Deductible]] is applied to every claim. Find the mean aggregate payment.
>
> > [!answer]-
> > Claims that pierce the deductible are a thinned Poisson process with rate
> > $$\lambda' = 50 \times P(X > 1{,}000) = 50\,e^{-1000/2000} = 50\,e^{-0.5} \approx 30.33$$
> > By the memoryless property, each such payment is again exponential with mean $2{,}000$, so
> > $$E[S'] = 30.33 \times 2{,}000 \approx 60{,}650$$
