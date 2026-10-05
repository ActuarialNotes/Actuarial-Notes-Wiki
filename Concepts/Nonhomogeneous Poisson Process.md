---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:5855e9d5a114cf1da36a67d119345865d199f7fc5809c58030262edd2be84b0f
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. & Prop. 1.1-1.2 p.4 (Poisson mean = variance = Λ; rate function λ; independent increments; increment Poisson with mean ∫_t^{t+h} λ(z) dz; mean-value function m), Example 1.7 p.6 (Pr[T(x) > t] = exp(-∫λ); λ as a force / intensity), Fact 1.13 pp.8-9 (thinning: type-j process Poisson with rate π_j(t)λ(t), independent), §1.4.1 p.13 (stationary increments are the homogeneous case), §1.4.3 and Ex. 1.29 pp.14-15 (thinning a homogeneous process with time-varying π(t) gives a non-homogeneous process), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.13 §6 Non-homogeneous Poisson Processes ('Definition and Basic Properties': independent increments, N(A) ~ Poi(m(A)), equal-length sets share a distribution if m(A) = m(B), E = Var = m(t); 'Arrival Times and Time Change': F_1^c(t) = e^{-m(t)}, r the failure rate, U_n = m(T_n) gamma(n,1) and M_u = N_{m^{-1}(u)} rate-1 for continuous r with m strictly increasing), sha256:ab27d84736959d91325dc48823d4e0df83bead12355c73830a28dc427de16aaf — https://www.randomservices.org/random/poisson/Nonhomogeneous.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 (p.3), text references (p.6: Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Nonhomogeneous Poisson Process.md
---

A **Nonhomogeneous Poisson Process** (NHPP) is a [[Poisson Process]] whose rate changes with time: events arrive at intensity $\lambda(t)$ rather than at a constant $\lambda$. Counts over an interval are still Poisson, but the mean is the **integrated** rate over that interval.

> $$m(t) = \int_0^{t} \lambda(u)\,du$$

> $$N(b) - N(a) \sim \text{Poi}\!\left(\int_a^b \lambda(u)\,du\right)$$

- Independent increments still hold, but **stationary** increments do not: two intervals of the same length can have different expected counts (their counts share a distribution only when the integrated rates over them are equal)
- $m(t)$ is called the **mean value function**; $E[N(t)] = \text{Var}(N(t)) = m(t)$
- When $\lambda(t) > 0$, so that $m$ is strictly increasing, an NHPP becomes a rate-$1$ homogeneous process under the **time change** $s = m(t)$ — this is what makes seasonal or trending claim arrivals tractable
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
> > The count is $\text{Poi}(26)$: $26/2 = 13$ expected claims per month on $(4, 6]$, against $28/4 = 7$ per month on $(0, 4]$, because the rate is rising. Note this is a two-month window carrying nearly the same expected count as the first four months combined.
