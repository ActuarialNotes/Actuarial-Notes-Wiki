---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:873219aa721bfc650f0f32c0a7adb64f32f83faa160d30ea9c739ec833e1dde2
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. & Prop. 1.1-1.2 p.4 (Poisson pmf, E = Var = Λ, independent increments), Fact 1.13 p.9 (thinning), Fact 1.15 pp.9-10 (sum of independent Poisson processes), Fact 1.25 p.13 (increment over length h is Poisson λh), Fact 1.26 p.13 (interevent times iid exponential mean 1/λ; nth event time Gamma α = n, θ = 1/λ), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Thinning and Superposition' (types p and 1 − p independent Poisson processes; combined process Poisson with summed rate), sha256:e07aab3aa8206236541466f57719dcdce9fdf7f1f21a9dd5357d89034cf623ba — https://www.randomservices.org/random/poisson/Splitting.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Gamma Distribution' (T_n gamma shape n, rate r; E = n/r), sha256:bbea5da3e0577d07d2670905b5727657c25b044f8382e17cee3bdfdd723bbe16 — https://www.randomservices.org/random/poisson/Gamma.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Process.md
---

A **Poisson Process** $\{N(t), t \geq 0\}$ is a counting process that models the number of events occurring in a time interval when events arrive independently at a constant average rate $\lambda > 0$.

> $$P(N(t) = k) = \frac{e^{-\lambda t}(\lambda t)^k}{k!}$$
>
> $$k = 0, 1, 2, \ldots$$

> $$E[N(t)] = \text{Var}(N(t)) = \lambda t$$

- The number of events in non-overlapping intervals are **independent**
- The number of events in any interval of length $t$ has distribution $\text{Poi}(\lambda t)$
- Interarrival times $T_1, T_2, \ldots$ are i.i.d. $\text{Exponential}(\lambda)$ with mean $1/\lambda$
- The waiting time $S_n = T_1 + \cdots + T_n$ to the $n$-th event follows a [[Gamma]] distribution with shape $n$ and rate $\lambda$
- A Poisson process with rate $\lambda$ **thinned** by probability $p$ produces a Poisson process with rate $\lambda p$
- **Superposition**: two independent Poisson processes with rates $\lambda_1$ and $\lambda_2$ combine into a Poisson process with rate $\lambda_1 + \lambda_2$

![[Media/Figures/Poisson_Process.svg|340]]

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
