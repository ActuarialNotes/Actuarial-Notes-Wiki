---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:af4686069c666430011b4e9644fc46d7513a6cb2cd393f531439496dbfe98e20
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Interarrival Time.md
---

The **Interarrival Time** $T_n$ is the waiting time between the $(n-1)$-th and $n$-th event of a counting process. For a [[Poisson Process]] with rate $\lambda$, the interarrival times are independent and identically distributed [[Exponential Distribution|exponential]] variables with mean $1/\lambda$ — and that property is an equivalent *definition* of the Poisson process.

> $$T_n \stackrel{\text{iid}}{\sim} \text{Exp}(\lambda), \qquad E[T_n] = \frac{1}{\lambda}$$

> $$S_n = T_1 + \cdots + T_n \sim \text{Gamma}(n, \lambda)$$

- The counting view and the waiting-time view are two descriptions of the same process: $N(t) \ge n \iff S_n \le t$
- **Memoryless**: $P(T > s + t \mid T > s) = P(T > t)$. Time already spent waiting tells you nothing about the wait remaining, so there is no "due for a claim" effect
- The arrival time $S_n$ of the $n$-th event is Gamma (Erlang) with shape $n$ and rate $\lambda$, mean $n/\lambda$ and variance $n/\lambda^2$
- Given $N(t) = n$, the $n$ arrival times are distributed as the [[Order Statistics]] of $n$ independent $\text{Uniform}(0, t)$ draws — arrivals are "scattered at random" over the interval
- For a [[Nonhomogeneous Poisson Process]] the interarrival times are neither identically distributed nor exponential; only after the time change $s = m(t)$ do they become $\text{Exp}(1)$
- Competing risks: if two independent Poisson streams have rates $\lambda_1$ and $\lambda_2$, the wait for the first event of either is $\text{Exp}(\lambda_1 + \lambda_2)$, and it is of type 1 with probability $\lambda_1/(\lambda_1 + \lambda_2)$

![[Media/Figures/Interarrival_Time.svg|340]]

> [!example]- Waiting for the Third Claim {Example}
> Claims arrive at $\lambda = 4$ per month. Find the expected time until the third claim and the probability that the next claim takes more than one month.
>
> > [!answer]-
> > $$E[S_3] = \frac{3}{\lambda} = \frac{3}{4} = 0.75 \text{ months}$$
> > $$P(T > 1) = e^{-\lambda t} = e^{-4} \approx 0.0183$$
> > Equivalently, $P(T > 1) = P(N(1) = 0)$ — no claims in the month is the same event as a wait longer than a month.

> [!example]- Memorylessness in Practice {Example}
> A claims department has waited three weeks with no large claim, in a process with $\lambda = 1$ large claim per month. What is the probability it waits at least another month?
>
> > [!answer]-
> > $$P(T > 0.75 + 1 \mid T > 0.75) = P(T > 1) = e^{-1} \approx 0.368$$
> > The three quiet weeks are irrelevant: the remaining wait is again exponential with mean one month. Any argument that a large claim is "overdue" contradicts the Poisson assumption.
