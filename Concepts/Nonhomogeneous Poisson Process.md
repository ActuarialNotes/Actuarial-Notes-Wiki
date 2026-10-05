---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:be42bb1af419b1a049d74f87a053a2d3291f311d153ec653c64b5defd803f9e8
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. & Prop. 1.2 p.4 (rate function λ, increment Poisson with mean ∫λ, mean-value function m), Example 1.7 p.6 (P(T(x) > t) = exp(−∫λ); λ as a force / intensity), Fact 1.13 p.9 and §1.4.3 p.14 (thinning), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Non-homogeneous Poisson Processes' (independent but not stationary increments; mean function m, E = Var = m(t); infinitesimal characterisation; T_1 survival e^{-m(t)} and failure rate r; time change for strictly increasing m), sha256:ab27d84736959d91325dc48823d4e0df83bead12355c73830a28dc427de16aaf — https://www.randomservices.org/random/poisson/Nonhomogeneous.html"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slide p.10 Definitions 5.4a/5.4b, sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "Gallager, Discrete Stochastic Processes (MIT OCW 6.262, Spring 2011), ch.2 Poisson Processes, §2.4 Non-homogeneous Poisson processes, Thm 2.4.1 and Example 2.4.1 (M/G/∞ splitting), PDF pp.18-20 (book pp.86-88), sha256:22aca1e5891be88631806e7a32fe24ba6b4e4729d61b9217a4517a379ea9838f — https://ocw.mit.edu/courses/6-262-discrete-stochastic-processes-spring-2011/3a19ce0e02d0008877351bfa24f3716a_MIT6_262S11_chap02.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 3
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
