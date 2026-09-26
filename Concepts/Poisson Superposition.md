---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:79f65c54f934b35d6c5507273a2167f6e6449887a9384acb263878d9811a2aff
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Superposition.md
---

**Poisson Superposition** is the result that the sum of independent [[Poisson Process|Poisson processes]] is itself a Poisson process whose rate is the sum of the individual rates — merging independent claim streams produces one Poisson stream.

> $$N(t) = N_1(t) + N_2(t) + \cdots + N_k(t)$$
>
> $$\lambda = \lambda_1 + \lambda_2 + \cdots + \lambda_k$$

- The component processes must be **independent**. The merged process inherits independent increments, and a sum of independent Poisson counts is Poisson with the summed mean.
- **Labelling:** each event of the merged process came from stream $i$ with probability $\lambda_i/\lambda$, independently of the other events and of the event times. Superposition run backwards is [[Poisson Thinning]].
- **First arrival:** the wait for the first event of any type is exponential with rate $\lambda$ (mean $1/\lambda$), and that event is of type $i$ with probability $\lambda_i/\lambda$ — the competing-exponentials result on [[Interarrival Time]].
- Given $N(t) = n$ merged events, the number from stream $i$ is [[Binomial Distribution|binomial]]$(n, \lambda_i/\lambda)$.
- **$n$ of type 1 before $m$ of type 2:** this happens exactly when at least $n$ of the first $n+m-1$ merged events are type 1, so with $p = \lambda_1/(\lambda_1 + \lambda_2)$:

> $$\sum_{k=n}^{n+m-1} \binom{n+m-1}{k} p^k (1-p)^{n+m-1-k}$$

- Streams driven by a common shock (two lines hit by the same storm) are not independent, and their sum need not be Poisson. For amounts, merged [[Compound Poisson Process|compound Poisson]] streams stay compound Poisson with a rate-weighted mixture of severities.

> [!example]- Merging Three Auto Coverages {Example}
> On a block of auto policies, collision claims arrive at $3$ per month, comprehensive at $2$ per month and liability at $1$ per month, as independent Poisson processes.
>
> (a) Find the probability of no claims of any kind in a week ($t = 1/4$ month). (b) Find the probability that the next claim is a liability claim. (c) Given $8$ claims in a month, find the distribution and mean of the number of collision claims.
>
> > [!answer]-
> > The merged process is Poisson with $\lambda = 3 + 2 + 1 = 6$ per month.
> >
> > (a) $P(N(1/4) = 0) = e^{-6/4} = e^{-1.5} = 0.2231$.
> >
> > (b) $\lambda_{\text{liab}}/\lambda = 1/6 = 0.1667$.
> >
> > (c) Each of the $8$ claims is collision with probability $3/6 = 0.5$, independently, so the collision count is $\text{Binomial}(8, 0.5)$ with mean $4$.

> [!example]- Which Large-Loss Stream Hits Twice First? {Example}
> Large property losses arrive at $3$ per year and large casualty losses at $1$ per year, as independent Poisson processes. What is the probability that the insurer sees its second large property loss before its second large casualty loss?
>
> > [!answer]-
> > Each merged large loss is property with probability $p = 3/(3+1) = 0.75$. Two property before two casualty means at least $2$ property among the first $n + m - 1 = 3$ large losses:
> >
> > $$
> > \begin{align*}
> > P &= \binom{3}{2}(0.75)^2(0.25) + \binom{3}{3}(0.75)^3 \\
> > &= 0.421875 + 0.421875 \\
> > &= 0.84375
> > \end{align*}
> > $$
> >
> > There is about an $84\%$ chance the property stream reaches two losses first.
