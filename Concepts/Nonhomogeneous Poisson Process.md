---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce2c8e41c6d4e518029cef8a2515dce91c7c718239002600b4a19c2311d4be3f
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. & Prop. 1.1-1.2 p.4 (Poisson mean = variance = Λ; rate function λ; independent increments; increment Poisson with mean ∫_t^{t+h} λ(z) dz; mean-value function m), Example 1.7 p.6 (Pr[T(x) > t] = exp(-∫λ); λ as a force / intensity), Fact 1.13 pp.8-9 (thinning: type-j process Poisson with rate π_j(t)λ(t), independent), §1.4.1 p.13 (stationary increments are the homogeneous case), §1.4.3 and Ex. 1.29 pp.14-15 (thinning a homogeneous process with time-varying π(t) gives a non-homogeneous process), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.13 §6 Non-homogeneous Poisson Processes ('Definition and Basic Properties': independent increments, N(A) ~ Poi(m(A)), equal-length sets share a distribution if m(A) = m(B), E = Var = m(t); 'Arrival Times and Time Change': F_1^c(t) = e^{-m(t)}, r the failure rate, U_n = m(T_n) gamma(n,1) and M_u = N_{m^{-1}(u)} rate-1 for continuous r with m strictly increasing), sha256:ab27d84736959d91325dc48823d4e0df83bead12355c73830a28dc427de16aaf — https://www.randomservices.org/random/poisson/Nonhomogeneous.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 (p.3), text references (p.6: Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Nonhomogeneous Poisson Process.md
---

![[Media/Figures/Nonhomogeneous_Poisson_Process.svg|340]]

A **Nonhomogeneous Poisson Process** is a [[Counting Process|counting process]] $\{N(t), t \ge 0\}$ whose events occur at a rate $\lambda(t)$ that changes with time. It has $N(0) = 0$, the numbers of events in non-overlapping intervals are independent, and the number of events in any interval has a [[Poisson Distribution|Poisson distribution]]. The rate $\lambda(t)$ is the [[Intensity Function|intensity function]], and the expected number of events by time $t$ is the mean value function

> $$m(t) = \int_0^t \lambda(u)\,du$$

The number of events in the interval $(a, b]$, $N(b) - N(a)$, is Poisson with mean

> $$m(b) - m(a) = \int_a^b \lambda(u)\,du$$

The variance of the number of events in $(a, b]$ is also $m(b) - m(a)$. When the rate is a constant $\lambda$, $m(t) = \lambda t$ and the process is an ordinary [[Poisson Process|Poisson process]].

> [!example]- Claims arrive as a nonhomogeneous Poisson process with rate $\lambda(t) = 3 + 2t$ per month, where $t$ is in months. What is the expected number of claims in the first four months, and what is the probability of no claims in the first month? {Example}
> - The expected number of claims in the first four months is $m(4) = \int_0^4 (3 + 2u)\,du = 12 + 16 = 28$.
> - The number of claims in the first month is Poisson with mean $m(1) = 3 + 1 = 4$.
> - The probability of no claims in the first month is $e^{-4} = 0.0183$.

> [!idea] The idea
> Two intervals of the same length have different expected numbers of events when the rate differs over them.

With $\lambda(t) = 3 + 2t$, the interval $(0, 2]$ has mean $\int_0^2 (3 + 2u)\,du = 10$, and the interval $(4, 6]$ has mean $\int_4^6 (3 + 2u)\,du = 26$.

## Time of the first event

The first event occurs after time $t$ exactly when no event occurs by time $t$, so the probability that the time of the first event, $T_1$, is greater than $t$ is

> $$P(T_1 > t) = e^{-m(t)}$$

The [[Hazard Rate|hazard rate]] of $T_1$ is therefore $\lambda(t)$. The interarrival times of a nonhomogeneous Poisson process are not exponential.

> [!example]- Claims arrive as a nonhomogeneous Poisson process with rate $\lambda(t) = 3 + 2t$ per month. What is the probability that the first claim arrives after half a month? {Example}
> - The expected number of claims in the first half month is $m(0.5) = 3(0.5) + (0.5)^2 = 1.75$.
> - The probability that the first claim arrives after half a month is $e^{-1.75} = 0.1738$.

## Thinning with a probability that changes over time

Suppose events occur as a Poisson process with constant rate $\lambda$, and an event at time $t$ is kept with probability $p(t)$, independently of all other events. By [[Poisson Thinning|thinning]], the kept events form a nonhomogeneous Poisson process with intensity function

> $$\lambda(t) = \lambda\, p(t)$$

> [!example]- Claims arrive at a rate of 12 per month during a 3-month season. A claim that arrives $t$ months into the season is a hail claim with probability $t/3$. What is the expected number of hail claims in the season, and what is the probability of no hail claims in the first month? {Example}
> - The hail claims form a nonhomogeneous Poisson process with intensity $\lambda(t) = 12 \times t/3 = 4t$.
> - The expected number of hail claims in the season is $m(3) = \int_0^3 4u\,du = 18$.
> - The expected number of hail claims in the first month is $m(1) = \int_0^1 4u\,du = 2$.
> - The probability of no hail claims in the first month is $e^{-2} = 0.1353$.

> [!trap] Multiplying the rate by the length of the interval
> When the rate changes over time, the expected number of events is the integral of the rate, not the rate at one time multiplied by the length of the interval. With $\lambda(t) = 3 + 2t$, the expected number of claims in the first four months is $m(4) = 28$, not $\lambda(4) \times 4 = 44$.
