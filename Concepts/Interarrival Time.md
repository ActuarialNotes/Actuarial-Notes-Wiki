---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:38eba35a336ed700ed59716f5553a36c9ac2890b4dcd355cd4cc081f6a7d8e74
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

![[Media/Figures/Interarrival_Time.svg|340]]

An **Interarrival Time** is the time between two consecutive events of a [[Counting Process|counting process]]. The first interarrival time $T_1$ is the time of the first event, and the $n$th interarrival time $T_n$ is the time between the $(n-1)$th and the $n$th events. The time of the $n$th event is

> $$S_n = T_1 + T_2 + \cdots + T_n$$

The $n$th event occurs after time $t$ exactly when fewer than $n$ events have occurred by time $t$, so the probability that the $n$th event occurs after time $t$ is

> $$P(S_n > t) = P(N(t) \le n - 1)$$

> [!example]- Claims arrive as a Poisson process at a rate of 2 per month. What is the probability that the second claim arrives after the end of the first month? {Example}
> - The second claim arrives after one month exactly when at most 1 claim occurs in the first month.
> - $N(1)$ is Poisson with mean 2, so $P(N(1) \le 1) = e^{-2}(1 + 2) = 3e^{-2}$.
> - The probability is $P(S_2 > 1) = 3e^{-2} = 0.4060$.

## Interarrival times of a Poisson process

The interarrival times of a [[Poisson Process|Poisson process]] with rate $\lambda$ are independent, and each has an [[Exponential Distribution|exponential distribution]] whose mean is

> $$E[T_n] = \frac{1}{\lambda}$$

The time of the $n$th event, $S_n$, is then a sum of $n$ independent exponential interarrival times. It has a [[Gamma|gamma distribution]] with shape $n$ and rate $\lambda$, with mean $n/\lambda$ and variance $n/\lambda^2$.

> [!example]- Claims arrive as a Poisson process at a rate of 2 per day. What are the mean and the standard deviation of the time until the fifth claim? {Example}
> - $S_5$ is gamma with shape 5 and rate 2.
> - The mean time until the fifth claim is $5/2 = 2.5$ days.
> - The variance is $5/2^2 = 1.25$, so the standard deviation is $\sqrt{1.25} = 1.118$ days.

## Memorylessness

Because the exponential distribution is [[Exponential Distribution#Memorylessness|memoryless]], the time already spent waiting for the next event of a Poisson process does not change the distribution of the remaining wait. The probability that the wait exceeds a further $t$, given that it has already exceeded $s$, is

> $$P(T_n > s + t \mid T_n > s) = e^{-\lambda t}$$

> [!example]- Large claims arrive as a Poisson process at a rate of 1 per month. Three weeks have passed with no large claim. What is the probability of waiting at least one more month for the next large claim? {Example}
> - The remaining wait is exponential with mean 1 month, whatever the time already waited.
> - The probability is $e^{-1 \times 1} = 0.3679$.

## The first event of two independent Poisson processes

If two independent Poisson processes have rates $\lambda_1$ and $\lambda_2$, the time of the first event of either one is the smaller of their first interarrival times. It is the [[Order Statistics#The minimum of exponential random variables|minimum of two independent exponentials]], so the probability that it exceeds $t$ is

> $$P(\min(T^{(1)}, T^{(2)}) > t) = e^{-(\lambda_1 + \lambda_2)t}$$

- $T^{(1)}$ and $T^{(2)}$ are the first interarrival times of the two processes.

The first event comes from the first process with probability $\lambda_1/(\lambda_1 + \lambda_2)$. This probability does not depend on the time at which the first event occurs.

> [!example]- Large property losses arrive as a Poisson process at a rate of 3 per year, and large casualty losses as an independent Poisson process at a rate of 1 per year. What is the expected time until the first large loss, and, given that it occurs after six months, what is the probability that it is a casualty loss? {Example}
> - The time of the first large loss is exponential with rate $3 + 1 = 4$, so its mean is $1/4$ year.
> - The type of the first loss does not depend on when it occurs.
> - The probability that it is a casualty loss is $\frac{1}{3 + 1} = 0.25$.

## Event times given the number of events

Given that exactly one event of a Poisson process occurred by time $t$, the time of that event is uniform on $(0, t]$. The probability that it occurred by time $s$ is

> $$P(S_1 \le s \mid N(t) = 1) = \frac{s}{t}$$

- $0 < s \le t$.

Given $N(t) = n$, the $n$ event times are distributed as the [[Order Statistics|order statistics]] of $n$ independent random variables, each uniform on $(0, t]$, as in [[Poisson Process#Conditioning on the number of events|conditioning on the number of events]].

> [!example]- Exactly one claim occurred during a year under a Poisson process. What is the probability that it occurred in the last three months, and what is its expected time? {Example}
> - Given $N(12) = 1$, the time of the claim is uniform on $(0, 12]$ months.
> - The probability that it occurred in the last three months is $\frac{3}{12} = 0.25$.
> - Its expected time is the midpoint of the year, 6 months.
