---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f6f574025467aff734e7476b0f5ae6ba9438bacb02f63a4259f6fecc276d4a4d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Thinning.md
---

**Poisson Thinning** (splitting) is the result that if each event of a [[Poisson Process]] with rate $\lambda$ is independently classified as type 1 with probability $p$ and type 2 with probability $1-p$, the two type counts are themselves **independent** Poisson processes with rates $\lambda p$ and $\lambda(1-p)$.

> $$N_1(t) \sim \text{Poi}(\lambda p\, t)$$
>
> $$N_2(t) \sim \text{Poi}\big(\lambda (1-p)\, t\big)$$

- $N_1(t)$ and $N_2(t)$ are independent of each other, and each has independent, stationary increments. With $k$ types of probabilities $p_1, \ldots, p_k$, the result gives $k$ independent Poisson processes with rates $\lambda p_i$.
- **Independence is the surprising part.** Learning that many small claims occurred says nothing about the number of large ones. Contrast conditioning on the total: given $N(t) = n$, $N_1(t)$ is [[Binomial Distribution|binomial]]$(n, p)$ and the two counts are negatively dependent.
- **Time-dependent classification** (Ross): if an event at time $s$ is type $i$ with probability $P_i(s)$, the $N_i(t)$ are independent Poisson with means $\lambda \int_0^t P_i(s)\,ds$. Reporting-lag and [[IBNR]] counts come from this version.
- Thinning with a probability $p(t)$ that varies over time produces a [[Nonhomogeneous Poisson Process]] with [[Intensity Function|intensity]] $\lambda p(t)$ — which is also how such a process is simulated.
- Standard uses: claims that pierce a [[Deductible]] ($p = P(X > d)$), claims by cause of loss or coverage, losses in a reinsurance layer. The reverse operation is [[Poisson Superposition]], and each type's aggregate amount is its own [[Compound Poisson Process]].

> [!example]- Claims That Pierce a Deductible {Example}
> Losses on a book occur as a Poisson process at $\lambda = 10$ per year. Loss amounts are exponential with mean $\$5{,}000$, independent of the arrival process, and every policy carries a $\$2{,}000$ deductible.
>
> (a) At what rate do paid claims arrive? (b) What is the probability of no paid claims in a year? (c) This year $4$ losses below the deductible have been recorded. What is the expected number of paid claims this year?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > p &= P(X > 2{,}000) \\
> > &= e^{-2{,}000/5{,}000} \\
> > &= 0.67032 \\
> > \lambda p &= 10 \times 0.67032 \\
> > &= 6.7032
> > \end{align*}
> > $$
> >
> > (a) Paid claims form a Poisson process at $6.70$ per year.
> >
> > (b) $P(N_1(1) = 0) = e^{-6.7032} = 0.00123$.
> >
> > (c) Still $6.70$. The small-loss count $N_2$ is independent of $N_1$, so the four losses under the deductible carry no information about the number of paid claims.

> [!example]- Counting IBNR Claims from Reporting Lags {Example}
> Claims occur as a Poisson process at $\lambda = 20$ per month starting at time $0$. Each claim's reporting delay is exponential with mean $2$ months, independent of everything else. At $t = 6$ months, find the expected numbers of incurred-but-not-reported and reported claims.
>
> > [!answer]-
> > A claim occurring at time $s \leq 6$ is still unreported at $t = 6$ with probability $e^{-(6-s)/2}$. By time-dependent thinning:
> >
> > $$
> > \begin{align*}
> > E[N_{\text{IBNR}}(6)] &= 20 \int_0^6 e^{-(6-s)/2}\,ds \\
> > &= 20 \times 2\left(1 - e^{-3}\right) \\
> > &= 40 \times 0.95021 \\
> > &= 38.01
> > \end{align*}
> > $$
> >
> > The reported count has mean $20 \times 6 - 38.01 = 81.99$. Both are Poisson and **independent** — under this model, the number of claims already reported says nothing about how many are still to come.
