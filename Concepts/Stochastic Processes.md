---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce02893c5fe29566442730cdcd33d476caa36863e1dbe108ffada9f063b0472c
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, ch.1 §1.1 p.3 (a stochastic process is a collection of random variables N(t) indexed by t; counting processes), Def. & Prop. 1.2 p.4, Fact 1.25 p.13 (homogeneous increments Poisson with mean λh; stationary increments), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.15 §1 Introduction to General Markov Processes (time set T = N or [0,∞), state space S, Markov property), sha256:69b4f54fd8c976d8a7093b3bfb9e0b3e836aa60794d1ad262e55c9b4b27f043c — https://www.randomservices.org/random/markov/General.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.15 §3 Discrete-Time Markov Chains (Markov property; Chapman-Kolmogorov, P_n = P^n), sha256:808118b103e17cd5e31115b953663b0d8ff94da21f432e6fe7c104e9300380f0 — https://www.randomservices.org/random/markov/Discrete.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Poisson Distribution' (N has stationary, independent increments; N_t − N_s is Poisson r(t − s)), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Stochastic Processes.md
---

A **Stochastic Process** $\{X(t) : t \in T\}$ is a collection of [[Random Variable]]s indexed by a parameter $t$ (usually time), describing how a random quantity — such as an insurer's cumulative claim count or surplus — evolves over an index set $T$.

> $$\{X(t) : t \in T\}$$

- $T$ is the **index set**: a *discrete-time* process has $t = 0, 1, 2, \ldots$, while a *continuous-time* process has $t \geq 0$
- The set of values $X(t)$ can take is the **state space**, likewise discrete or continuous
- A **counting process** $N(t)$ records the number of events by time $t$; the [[Poisson Process]] is the central continuous-time example, and a [[Time Series]] is a common discrete-time example
- A process has the **Markov property** when the future depends on the past only through the present state:

> $$P\big(X(t_{n+1}) = j \mid X(t_n), \ldots, X(t_0)\big) = P\big(X(t_{n+1}) = j \mid X(t_n)\big)$$

- For a Poisson counting process the increments are independent and stationary, giving $N(t) - N(s) \sim \text{Poi}(\lambda(t-s))$ for $s < t$

![[Media/Figures/Stochastic_Processes.svg|340]]

> [!example]- Cumulative Claims as a Counting Process {Example}
> Claims hit a portfolio as a [[Poisson Process]] at rate $\lambda = 4$ per month. Let $N(t)$ be the cumulative number of claims by month $t$. Classify the process and find the expected count and variance over the first half-year.
>
> > [!answer]-
> > $N(t)$ is a **continuous-time** ($t \geq 0$), **discrete-state** ($0, 1, 2, \ldots$) counting process. Over $t = 6$ months:
> > $$N(6) \sim \text{Poi}(4 \times 6) = \text{Poi}(24)$$
> > $$E[N(6)] = \text{Var}(N(6)) = 24$$
> > On average the insurer expects 24 claims in six months.

> [!example]- A Two-State Risk-Class Markov Chain {Example}
> Each year an insured is classed Standard ($S$) or Preferred ($P$). The process is a discrete-time [[Markov Chain]] with one-step transition matrix
> $$\begin{array}{c|cc} & S & P \\ \hline S & 0.8 & 0.2 \\ P & 0.3 & 0.7 \end{array}$$
> An insured is Standard this year. Find the probability they are Preferred two years from now.
>
> > [!answer]-
> > Condition on the class next year (the Markov property lets us ignore earlier history):
> > $$
> > \begin{align*}
> > P(X_2 = P \mid X_0 = S) &= P_{SS}P_{SP} + P_{SP}P_{PP} \\
> >   &= (0.8)(0.2) + (0.2)(0.7) \\
> >   &= 0.16 + 0.14 \\
> >   &= 0.30
> > \end{align*}
> > $$
> > There is a 30% chance the insured is Preferred after two years.
