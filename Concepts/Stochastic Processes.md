---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:ad29f6789612bdef272c28c753ca6b42a4a0dddde2a1097d692660bd6bc6f563
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, ch.1 §1.1 p.3 (a stochastic process is a collection of random variables N(t) indexed by t; counting processes), Def. & Prop. 1.2 p.4 (counting process: N(0) = 0, non-decreasing, non-negative integers; independent increments; increment Poisson with mean ∫λ), §1.4.1 Fact 1.25 p.13 (homogeneous: increment Poisson with mean λh, stationary increments), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.15 §1 Introduction to General Markov Processes (time set T = N discrete or [0,∞) continuous; state space; Markov property), sha256:69b4f54fd8c976d8a7093b3bfb9e0b3e836aa60794d1ad262e55c9b4b27f043c — https://www.randomservices.org/random/markov/General.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.15 §3 Discrete-Time Markov Chains (Chapman-Kolmogorov; P_n = P^n), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 — https://www.randomservices.org/random/markov/Discrete.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-05), ch.13 The Poisson Process, 'The Poisson Distribution' (stationary, independent increments), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "NIST/SEMATECH e-Handbook of Statistical Methods, §6.4.1 Definitions, Applications and Techniques (time series = an ordered sequence of values of a variable at equally spaced time intervals), HTML fetched 2026-10-05, sha256:e76d291b8e79f57b07668cfd26d9b4ab26eb2edc5312b191140a72825e8b9acc — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc41.htm"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and readings (p.3), text references (p.6: Daniel A1-5; Ross 4.1-4.8, 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stochastic Processes.md
---

![[Media/Figures/Stochastic_Processes.svg|340]]

A **Stochastic Process** $\{X(t), t \in T\}$ is a collection of [[Random Variable|random variables]] indexed by a set $T$. The index $t$ is usually time, and $X(t)$ is the state of the process at time $t$.

A stochastic process is classified by its index set $T$ and by its state space, the set of values that $X(t)$ can take:

|  | Discrete state space | Continuous state space |
| --- | --- | --- |
| **Discrete time**, $t = 0, 1, 2, \ldots$ | A [[Markov Chain]] of a policyholder's rating class | A [[Time Series]] of monthly loss ratios |
| **Continuous time**, $t \ge 0$ | A [[Counting Process]] of claims | A [[Compound Poisson Process]] of aggregate losses |

> [!example]- Claims are reported as a Poisson process at a rate of 4 per month, and $N(t)$ is the number of claims reported by time $t$. What are the index set and the state space of $\{N(t), t \ge 0\}$, and what is the distribution of the number of claims reported in the first six months? {Example}
> - The index set is $t \ge 0$, so the process is in continuous time.
> - $N(t)$ takes the values $0, 1, 2, \ldots$, so the state space is discrete.
> - In a [[Poisson Process|Poisson process]] with rate $\lambda$, the number of events in an interval of length $t$ is Poisson with mean $\lambda t$.
> - The number of claims in the first six months, $N(6)$, is Poisson with mean $4 \times 6 = 24$.

## The Markov property

A discrete-time process $\{X_n, n = 0, 1, 2, \ldots\}$ has the Markov property when the distribution of the next state depends on the past only through the present state. For all states $i$ and $j$, the Markov property is

> $$P(X_{n+1} = j \mid X_n = i, X_{n-1}, \ldots, X_0) = P(X_{n+1} = j \mid X_n = i)$$

A process with the Markov property is a [[Markov Chain|Markov chain]], and $P_{ij} = P(X_{n+1} = j \mid X_n = i)$ is its transition probability. The probability of moving from state $i$ to state $j$ in two steps is the sum over the state $k$ occupied after one step:

> $$P_{ij}^{2} = \sum_{k} P_{ik}\,P_{kj}$$

> [!example]- Each year an insured is in class 1 (standard) or class 2 (preferred). The class follows a Markov chain with $P_{11} = 0.8$, $P_{12} = 0.2$, $P_{21} = 0.3$ and $P_{22} = 0.7$. The insured is in class 1 this year. What is the probability that the insured is in class 2 two years from now? {Example}
> - The insured is in class 1 or class 2 next year, so sum over those two paths.
> - The path through class 1 has probability $P_{11}P_{12} = 0.8 \times 0.2 = 0.16$.
> - The path through class 2 has probability $P_{12}P_{22} = 0.2 \times 0.7 = 0.14$.
> - The probability is $P_{12}^{2} = 0.16 + 0.14 = 0.30$.

## Expanding the state space

When the distribution of the next state depends on more than the present state, the process is not a Markov chain with those states. It becomes one when the state is redefined to include the history that the next step depends on. If the next state depends on the last two states, the state $(X_{n-1}, X_n)$ gives a Markov chain.

> [!example]- Each year a driver has a claim or no claim. The probability of a claim is 0.1 if neither of the two previous years had a claim, and 0.3 otherwise. The driver had no claim in either of the last two years. What is the probability of a claim two years from now? {Example}
> - The probability of a claim depends on the last two years, so the state is the pair (last year, this year).
> - The state now is (no claim, no claim), so a claim next year has probability 0.1.
> - If there is a claim next year, the state becomes (no claim, claim), and a claim the year after has probability 0.3.
> - If there is no claim next year, the state stays (no claim, no claim), and a claim the year after has probability 0.1.
> - The probability is $0.1 \times 0.3 + 0.9 \times 0.1 = 0.03 + 0.09 = 0.12$.

> [!trap] Using only the last state when the probabilities depend on more history
> If the transition probabilities depend on the last two states, a chain built on the last state alone gives the wrong multi-step probabilities. In the driver example, treating every claim-free year as leading to a claim with probability 0.1 ignores that a claim-free year that follows a claim leads to a claim with probability 0.3.
