---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:0b62f1f0c26872abfd9d42c8d49b0705e6fce09f8ec890581c3becf9e261590f
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Def. & Prop. 1.1-1.2 p.4 (Poisson pmf, E = Var = Λ, independent increments), Fact 1.13 p.9 (thinning), Fact 1.15 pp.9-10 (sum of independent Poisson processes), Fact 1.25 p.13 (increment over length h is Poisson λh), Fact 1.26 p.13 (interevent times iid exponential mean 1/λ; nth event time Gamma α = n, θ = 1/λ), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Thinning and Superposition' (types p and 1 − p independent Poisson processes; combined process Poisson with summed rate), sha256:e07aab3aa8206236541466f57719dcdce9fdf7f1f21a9dd5357d89034cf623ba — https://www.randomservices.org/random/poisson/Splitting.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Gamma Distribution' (T_n gamma shape n, rate r; E = n/r), sha256:bbea5da3e0577d07d2670905b5727657c25b044f8382e17cee3bdfdd723bbe16 — https://www.randomservices.org/random/poisson/Gamma.html"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-30), The Poisson Process, 'The Poisson Distribution': 'the conditional distribution of N_s given N_t = n is binomial with trial parameter n and success parameter p = s / t' (free of the rate r); given N_t = n the arrival times are distributed as 'the order statistics of a random sample of size n from the uniform distribution on the interval (0, t]' — https://www.randomservices.org/random/poisson/Poisson.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Process.md
---

![[Media/Figures/Poisson_Process.svg|340]]

A **Poisson Process** with rate $\lambda > 0$ is a [[Counting Process|counting process]] $\{N(t), t \ge 0\}$ in which $N(0) = 0$, the numbers of events in non-overlapping intervals are independent, and the number of events in any interval of length $t$ has a [[Poisson Distribution|Poisson distribution]] with mean $\lambda t$. The probability that $k$ events occur by time $t$ is

> $$P(N(t) = k) = \frac{e^{-\lambda t}(\lambda t)^k}{k!}$$

- $k = 0, 1, 2, \ldots$.

The mean and the variance of the number of events by time $t$ are both

> $$E[N(t)] = \text{Var}(N(t)) = \lambda t$$

- $\lambda$ is the expected number of events per unit of time, so the mean is proportional to the length of the interval.

The same model applies when $t$ measures exposure, such as car-years, rather than time. The expected number of claims is then the rate per unit of exposure multiplied by the exposure.

> [!example]- Claims arrive as a Poisson process at a rate of 2 per month. What is the probability of at least 2 claims in 3 months? {Example}
> - Over $t = 3$ months, the number of claims $N(3)$ is Poisson with mean $\lambda t = 2 \times 3 = 6$.
> - At least 2 claims is the complement of 0 or 1 claim, so $P(N(3) \ge 2) = 1 - P(N(3) = 0) - P(N(3) = 1)$.
> - $P(N(3) = 0) = e^{-6}$ and $P(N(3) = 1) = 6e^{-6}$.
> - The probability of at least 2 claims is $1 - 7e^{-6} = 0.9826$.

## Interarrival times

The [[Interarrival Time|interarrival times]] $T_1, T_2, \ldots$ of a Poisson process are independent, and each has an [[Exponential Distribution|exponential distribution]] with mean $1/\lambda$. The probability that the $n$th interarrival time is greater than $t$ is

> $$P(T_n > t) = e^{-\lambda t}$$

- $T_1$ is the time of the first event, and $T_n$ is the time between the $(n-1)$th and the $n$th events.

The first event occurs after time $t$ exactly when no event occurs by time $t$, so $P(T_1 > t) = P(N(t) = 0)$.

> [!example]- Claims arrive as a Poisson process at a rate of 4 per month. What is the expected time until the first claim, and what is the probability that the first claim arrives after more than half a month? {Example}
> - The time of the first claim $T_1$ is exponential with mean $1/\lambda = 1/4$ month.
> - The probability that the first claim arrives after more than half a month is $P(T_1 > 0.5) = e^{-4 \times 0.5} = e^{-2} = 0.1353$.

## Time of the $n$th event

The time of the $n$th event, $S_n = T_1 + T_2 + \cdots + T_n$, is a sum of $n$ independent exponential interarrival times. It has a [[Gamma|gamma distribution]] with shape $n$ and rate $\lambda$, so its mean is

> $$E[S_n] = \frac{n}{\lambda}$$

and its variance is

> $$\text{Var}(S_n) = \frac{n}{\lambda^2}$$

The $n$th event occurs by time $t$ exactly when at least $n$ events occur by time $t$, so $P(S_n \le t) = P(N(t) \ge n)$.

> [!example]- Claims arrive as a Poisson process at a rate of 4 per month. What is the expected time until the third claim, and what is the probability that the third claim arrives within one month? {Example}
> - The expected time until the third claim is $E[S_3] = 3/4 = 0.75$ month.
> - The third claim arrives within one month exactly when at least 3 claims occur in that month, so $P(S_3 \le 1) = P(N(1) \ge 3)$.
> - $N(1)$ is Poisson with mean 4, so $P(N(1) \le 2) = e^{-4}(1 + 4 + 8) = 13e^{-4}$.
> - The probability is $1 - 13e^{-4} = 0.7619$.

## Thinning a Poisson process

Suppose each event of a Poisson process with rate $\lambda$ is classified, independently of all other events, as type 1 with probability $p$ or type 2 with probability $1 - p$. By [[Poisson Thinning|thinning]], the type 1 events form a Poisson process with rate

> $$\lambda_1 = \lambda p$$

The type 2 events form a Poisson process with rate $\lambda_2 = \lambda(1 - p)$, and the two processes are independent of each other.

> [!example]- Claims arrive as a Poisson process at a rate of 10 per year. Each claim independently exceeds the deductible with probability 0.3. What is the probability that no claim exceeds the deductible in a year? {Example}
> - The claims that exceed the deductible form a Poisson process with rate $\lambda p = 10 \times 0.3 = 3$ per year.
> - The probability of no such claim in one year is $e^{-3} = 0.0498$.

## Superposition of Poisson processes

If $N_1(t)$ and $N_2(t)$ are independent Poisson processes with rates $\lambda_1$ and $\lambda_2$, then by [[Poisson Superposition|superposition]] their sum $N_1(t) + N_2(t)$ is a Poisson process with rate

> $$\lambda = \lambda_1 + \lambda_2$$

Each event of the combined process comes from the first process with probability $\lambda_1 / (\lambda_1 + \lambda_2)$, independently of the other events.

> [!example]- Collision claims arrive at a rate of 3 per month and comprehensive claims at a rate of 2 per month, as independent Poisson processes. What is the probability of no claims in a month, and what is the probability that the next claim is a collision claim? {Example}
> - All claims together form a Poisson process with rate $\lambda = 3 + 2 = 5$ per month.
> - The probability of no claims in a month is $e^{-5} = 0.0067$.
> - The probability that the next claim is a collision claim is $\frac{3}{3 + 2} = 0.6$.

## Conditioning on the number of events

Given that $n$ events occurred by time $t$, the number of events by an earlier time $s$ has a [[Binomial Distribution|binomial distribution]] with $n$ trials and probability $s/t$:

> $$P(N(s) = k \mid N(t) = n) = \binom{n}{k}\left(\frac{s}{t}\right)^k \left(1 - \frac{s}{t}\right)^{n-k}$$

- $s < t$.
- $k = 0, 1, \ldots, n$.

The rate $\lambda$ does not appear in this probability. Given $N(t) = n$, the $n$ event times are distributed as the [[Order Statistics|order statistics]] of $n$ independent random variables, each uniform on $(0, t]$.

> [!example]- Five claims occurred during a year under a Poisson process. What is the probability that exactly 2 of them occurred in the first 3 months? {Example}
> - Given $N(12) = 5$, the number of claims in the first 3 months is binomial with $n = 5$ and probability $3/12 = 0.25$.
> - The probability of exactly 2 is $\binom{5}{2}(0.25)^2(0.75)^3 = 10 \times 0.0625 \times 0.421875 = 0.2637$.

> [!trap] Using the rate for the wrong length of time
> The mean of $N(t)$ is the rate multiplied by the length of the interval, with both in the same unit of time. A rate of 2 claims per month gives a mean of $2 \times 12 = 24$ claims in a year, not 2.
