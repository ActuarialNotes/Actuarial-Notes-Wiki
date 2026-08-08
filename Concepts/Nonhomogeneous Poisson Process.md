A **Nonhomogeneous Poisson Process** (NHPP) is a [[Poisson Process]] whose rate changes with time: events arrive at intensity $\lambda(t)$ rather than at a constant $\lambda$. Counts over an interval are still Poisson, but the mean is the **integrated** rate over that interval.

> $$m(t) = \int_0^{t} \lambda(u)\,du$$

> $$N(b) - N(a) \sim \text{Poi}\!\left(\int_a^b \lambda(u)\,du\right)$$

- Independent increments still hold, but **stationary** increments do not: two intervals of the same length have different expected counts unless $\lambda$ is constant there
- $m(t)$ is called the **mean value function**; $E[N(t)] = \text{Var}(N(t)) = m(t)$
- Any NHPP can be turned into a rate-$1$ homogeneous process by the **time change** $s = m(t)$ — this is what makes seasonal or trending claim arrivals tractable
- Thinning a homogeneous process with a time-varying probability $p(t)$ produces an NHPP with rate $\lambda p(t)$; conversely, splitting an NHPP by event type gives independent NHPPs
- Actuarial uses: hurricane arrivals concentrated in one season, claim reporting patterns that decay after the accident date, and exposure growth over a policy year
- The waiting time to the first event has survival function $P(T_1 > t) = e^{-m(t)}$, so the [[Hazard Rate]] of $T_1$ is exactly $\lambda(t)$

![[Media/Figures/Nonhomogeneous_Poisson_Process.svg|340]]

> [!example]- Expected Claims Under a Seasonal Rate {Example}
> Claims arrive as an NHPP with $\lambda(t) = 3 + 2t$ per month, where $t$ is measured in months from the start of the year. Find the expected number of claims in the first four months and the probability of no claims in month 1.
>
> > [!answer]-
> > $$m(4) = \int_0^4 (3 + 2u)\,du = \left[3u + u^2\right]_0^4 = 12 + 16 = 28$$
> > So $N(4) \sim \text{Poi}(28)$ and $E[N(4)] = 28$.
> > For month 1, the integrated rate is $\int_0^1 (3+2u)\,du = 3 + 1 = 4$, so
> > $$P(N(1) = 0) = e^{-4} \approx 0.0183$$

> [!example]- Counts on a Later Interval {Example}
> With the same rate $\lambda(t) = 3 + 2t$, find the distribution of the number of claims between $t = 4$ and $t = 6$.
>
> > [!answer]-
> > $$\int_4^6 (3 + 2u)\,du = \left[3u + u^2\right]_4^6 = (18 + 36) - (12 + 16) = 26$$
> > The count is $\text{Poi}(26)$ — larger than the $28$ expected over the *four* earlier months' worth of exposure per month, because the rate is rising. Note this is a two-month window carrying nearly the same expected count as the first four months combined.
