---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:af4686069c666430011b4e9644fc46d7513a6cb2cd393f531439496dbfe98e20
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Fact 1.26 p.13 (interevent times iid exponential mean 1/λ; event times Gamma α = n, θ = 1/λ), Fact 1.27 p.14 (iid exponential interevent times characterise the homogeneous Poisson process), §1.4.2 p.14 (next event comes from N_1 with probability λ1/(λ1+λ2)), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Exponential Distribution' (memoryless property; Poisson process iff interarrival times iid exponential; min of independent exponentials is exponential with summed rate; P(X_i is the minimum) = r_i/Σr_j), sha256:db0eebaa01377dfc5e07ca838f9ae6c3b06b9653e6d10032de301cb07c4aad63 — https://www.randomservices.org/random/poisson/Exponential.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Gamma Distribution' (T_n gamma/Erlang shape n rate r, mean n/r, variance n/r²), sha256:bbea5da3e0577d07d2670905b5727657c25b044f8382e17cee3bdfdd723bbe16 — https://www.randomservices.org/random/poisson/Gamma.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Poisson Distribution', subsection 'The Uniform Distribution' ((T_1..T_n) given N_t = n distributed as uniform order statistics on (0, t]), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Non-homogeneous Poisson Processes' (P(T_1 > t) = e^{-m(t)}; U_n = m(T_n) gamma(n, 1); time change to a rate-1 process), sha256:ab27d84736959d91325dc48823d4e0df83bead12355c73830a28dc427de16aaf — https://www.randomservices.org/random/poisson/Nonhomogeneous.html"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slide p.11 (NHPP interarrival times neither independent nor identically distributed), sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
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
