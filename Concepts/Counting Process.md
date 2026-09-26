---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:baf2d6c0fc2c88c595808950ca8b3c2014c348777916f4ead1331fab4a19f163
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Counting Process.md
---

A **Counting Process** $\{N(t), t \geq 0\}$ is a [[Stochastic Processes|stochastic process]] in which $N(t)$ is the total number of events — [[Claim|claims]] reported, policies lapsing, storms making landfall — that have occurred by time $t$. It is the frame on which the [[Poisson Process]] and all its variants are built.

> $$N(t) - N(s) = \text{number of events in } (s, t], \quad s < t$$

- **Four defining conditions** (Ross): $N(t) \geq 0$; $N(t)$ is integer-valued; $N(t)$ is nondecreasing, so $s < t \Rightarrow N(s) \leq N(t)$; and the increment $N(t) - N(s)$ counts the events in $(s, t]$. A quantity that can fall — open claims, surplus — is not a counting process.
- **Independent increments**: counts in disjoint intervals are independent. **Stationary increments**: the distribution of $N(t+s) - N(s)$ depends only on the length $t$, not on where the interval sits.
- The [[Poisson Process]] is the counting process with $N(0) = 0$, independent increments and $N(t+s) - N(s) \sim \text{Poi}(\lambda t)$. Let the rate vary over time and stationarity is lost — the [[Nonhomogeneous Poisson Process]]; let the rate vary randomly across risks and independence is lost — the [[Mixed Poisson Process]].
- Counting and waiting carry the same information: $N(t) \geq n \iff S_n \leq t$, where $S_n$ is the arrival time of the $n$-th event (see [[Interarrival Time]]).
- **Exam technique:** rewrite a joint probability such as $P(N(1) = a,\ N(3) = b)$ in terms of **non-overlapping increments** — $N(1)$ and $N(3) - N(1)$ — so that independence lets it factor.

> [!example]- Which Claim Measures Are Counting Processes? {Example}
> A claims department tracks four quantities through a policy year:
>
> 1. $A(t)$ — the cumulative number of claims reported by time $t$
> 2. $B(t)$ — the number of claims open at time $t$
> 3. $C(t)$ — the cumulative dollars paid on claims by time $t$
> 4. $D(t)$ — the cumulative number of claims over $\$50{,}000$ reported by time $t$
>
> Which are counting processes, and when would they have stationary increments?
>
> > [!answer]-
> > - $A(t)$: **yes** — nonnegative, integer-valued and nondecreasing. Its increments are stationary only if the reporting rate is constant through the year; a hail-exposed book with a summer peak breaks that.
> > - $B(t)$: **no** — it falls every time a claim closes.
> > - $C(t)$: **no** — it is nondecreasing but records dollars, not events. Aggregate amounts are modelled on top of a counting process, as in the [[Compound Poisson Process]].
> > - $D(t)$: **yes** — it is $A(t)$ with each claim kept only if it is large, a [[Poisson Thinning|thinned]] count.

> [!example]- Joint and Conditional Claim Counts {Example}
> Claims are reported as a Poisson process at $\lambda = 2$ per week. Find $P(N(1) = 1,\ N(3) = 4)$ and $P(N(1) = 1 \mid N(3) = 4)$.
>
> > [!answer]-
> > Split into the disjoint increments $N(1)$ and $N(3) - N(1)$, which are independent with means $2$ and $4$:
> >
> > $$
> > \begin{align*}
> > P(N(1)=1,\ N(3)=4) &= P(N(1)=1)\,P\big(N(3)-N(1)=3\big) \\
> > &= \left(2e^{-2}\right)\left(\frac{e^{-4}\,4^3}{3!}\right) \\
> > &= (0.27067)(0.19537) \\
> > &= 0.05288
> > \end{align*}
> > $$
> >
> > Dividing by $P(N(3) = 4) = e^{-6}6^4/4! = 0.13385$, the rate cancels and a binomial is left — given four claims in three weeks, each falls in week 1 independently with probability $1/3$:
> >
> > $$
> > \begin{align*}
> > P(N(1)=1 \mid N(3)=4) &= \binom{4}{1}\left(\tfrac{1}{3}\right)\left(\tfrac{2}{3}\right)^3 \\
> > &= \frac{32}{81} \\
> > &= 0.3951
> > \end{align*}
> > $$
> >
> > Conditioning on the total turns a Poisson question into a binomial one, and $\lambda$ no longer matters.
