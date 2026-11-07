---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:4d47256b4acec3b2abcd77bffb9dbe2e4bd666b077d08f2d9000afbd2ca2bfea
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, ch.1 §1.1 p.3 (N(t) counts events in (0, t]; increments over non-overlapping intervals independent, touching endpoints OK), Def. & Prop. 1.2 p.4, Example 1.6 pp.5-6 (T_3 > 1.2 iff N(1.2) ≤ 2), §1.4.1 p.13 (stationary increments only in the homogeneous case), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Chen, Math 263 Stochastic Processes, 'Poisson processes' slides (San José State U.; based on Ross §§5.3.1-5.3.4, 5.4.1-5.4.2), counting-process conditions PDF p.4, increments Def 0.2 p.5, Poisson Def 0.3 p.6, sha256:a349a248cda7898d393bb41861b87fd65399e793d1abd981babaab36dbdbf826 — https://www.sjsu.edu/faculty/guangliang.chen/Math263/lec8PoissonProcesses.pdf"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 9 slides, following Ross, Introduction to Probability Models ch.5, slides p.8 counting process, p.9 stationary / independent increments, p.10 Definition 5.1, sha256:0c3cfbea1eaf30332c7914d77ba9716b1d1cc790a9a25bad3d4d7cfe52a3259b — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture9.pdf"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slides pp.17-18 §5.4.3 conditional (mixed) Poisson process: stationary increments, in general NOT independent increments, sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Introduction' (N_t ≥ n iff T_n ≤ t), sha256:7a4c43eb9386b17752c17d239847db0fbd50dd9a72f3017bf28f7e335fee13ae — https://www.randomservices.org/random/poisson/Introduction.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Poisson Distribution', subsection 'The Binomial Distribution' (N_s given N_t = n is binomial(n, s/t), independent of r), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Counting Process.md
---

A **Counting Process** $\{N(t), t \ge 0\}$ is a [[Stochastic Processes|stochastic process]] in which $N(t)$ is the number of events that have occurred by time $t$. A counting process satisfies four conditions:

1. $N(t) \ge 0$.
2. $N(t)$ is integer-valued.
3. If $s < t$, then $N(s) \le N(t)$.
4. If $s < t$, then $N(t) - N(s)$ is the number of events in the interval $(s, t]$.

The difference $N(t) - N(s)$ is the increment of the process over $(s, t]$.

> [!example]- A claims department tracks the number of claims reported by time $t$, the number of claims open at time $t$, and the total amount paid on claims by time $t$. Which of these are counting processes? {Example}
> - The number of claims reported by time $t$ is a nonnegative integer that never decreases, so it is a counting process.
> - The number of claims open at time $t$ decreases each time a claim closes, so it fails condition 3.
> - The total amount paid by time $t$ never decreases, but it is an amount of money rather than a number of events, so it fails condition 2.

## Independent increments

A counting process has independent increments when the numbers of events in non-overlapping intervals are independent. For $s < t$, the joint probability of the numbers of events by times $s$ and $t$ then factors over the intervals $(0, s]$ and $(s, t]$:

> $$P(N(s) = a,\ N(t) = b) = P(N(s) = a)\,P(N(t) - N(s) = b - a)$$

- $a \le b$.

> [!example]- Claims are reported as a Poisson process at a rate of 2 per week. What is the probability of exactly 1 claim in the first week and exactly 4 claims in the first three weeks? {Example}
> - The event is 1 claim in $(0, 1]$ and $4 - 1 = 3$ claims in $(1, 3]$.
> - The two intervals do not overlap, so their numbers of claims are independent.
> - $N(1)$ is Poisson with mean 2, so $P(N(1) = 1) = 2e^{-2} = 0.27067$.
> - $N(3) - N(1)$ is Poisson with mean $2 \times 2 = 4$, so $P(N(3) - N(1) = 3) = \frac{e^{-4}\,4^3}{3!} = 0.19537$.
> - The probability is $0.27067 \times 0.19537 = 0.0529$.

## Stationary increments

A counting process has stationary increments when the distribution of the number of events in an interval depends only on the length of the interval. For every $s \ge 0$ and $t > 0$, the number of events in $(s, s + t]$ has the distribution of the number of events in $(0, t]$:

> $$P(N(s + t) - N(s) = k) = P(N(t) = k)$$

- $k = 0, 1, 2, \ldots$.

Stationary increments describe the distribution of each increment on its own. They do not make increments in different intervals independent, so a future count can depend on a past count even when the increments are stationary.

| Process | Independent increments | Stationary increments |
| --- | --- | --- |
| [[Poisson Process]] | Yes | Yes |
| [[Nonhomogeneous Poisson Process]] | Yes | No |
| [[Mixed Poisson Process]] | No | Yes |

> [!example]- Claims occur as a Poisson process at a rate of 3 per month. What is the probability of exactly 2 claims between the end of month 5 and the end of month 6? {Example}
> - The increments are stationary, so $N(6) - N(5)$ has the distribution of $N(1)$.
> - $N(1)$ is Poisson with mean 3.
> - The probability is $\frac{e^{-3}\,3^2}{2!} = 0.2240$.

> [!trap] Treating overlapping counts as independent
> $N(1)$ and $N(3)$ are not independent, because the first week is part of both intervals. Write $P(N(1) = 1,\ N(3) = 4)$ as $P(N(1) = 1)\,P(N(3) - N(1) = 3)$, never as $P(N(1) = 1)\,P(N(3) = 4)$.
