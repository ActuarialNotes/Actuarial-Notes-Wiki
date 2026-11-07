---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:518755964c3cb376b30823b0bc4c1ab0fd6c4141b54c51c4ce39311dd2f9b426
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Fact 1.13 p.9 (types with probabilities π_j(t): each type a Poisson process with rate π_j(t)λ(t), and the type counts independent), Example 1.14 p.9, §1.4.3 and Example 1.29 pp.14-15 (thinning a homogeneous process with π(t) gives a non-homogeneous one), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Thinning and Superposition', Thinning (two-type process: rates rp and r(1 − p), independent; M_t given N_t = n binomial(n, p); k types), sha256:e07aab3aa8206236541466f57719dcdce9fdf7f1f21a9dd5357d89034cf623ba — https://www.randomservices.org/random/poisson/Splitting.html"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slides pp.4-5 Proposition 5.2 and pp.8-9 Proposition 5.3 (time-dependent classification: N_i(t) independent Poisson with means λ∫_0^t p_i(s)ds; claim-reporting example), sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "Gallager, Discrete Stochastic Processes (MIT OCW 6.262, Spring 2011), ch.2 Poisson Processes, §2.4 Non-homogeneous Poisson processes, Thm 2.4.1 and Example 2.4.1 (M/G/∞ splitting), PDF pp.18-20 (book pp.86-88), sha256:22aca1e5891be88631806e7a32fe24ba6b4e4729d61b9217a4517a379ea9838f — https://ocw.mit.edu/courses/6-262-discrete-stochastic-processes-spring-2011/3a19ce0e02d0008877351bfa24f3716a_MIT6_262S11_chap02.pdf"
    - "Sigman, 'Non-stationary Poisson processes and Compound (batch) Poisson processes', Columbia IEOR 4404 notes (2013), §1.1 The non-stationary case: Thinning, PDF pp.1-2, sha256:91ae1398bbf6f852a48bac75670d19e25cc6369d31f0cb1579627d1c09b80dd4 — http://www.columbia.edu/~ks20/4404-Sigman/4404-Notes-NSP.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Thinning.md
---

**Poisson Thinning** is the splitting of a [[Poisson Process|Poisson process]] into several processes by classifying each event, independently of all other events, as one of $k$ types. If each event of a Poisson process with rate $\lambda$ is of type $i$ with probability $p_i$, then the events of type $i$ form a Poisson process with rate

> $$\lambda_i = \lambda\, p_i$$

- $p_1 + p_2 + \cdots + p_k = 1$.

The number of type $i$ events in an interval of length $t$ is therefore Poisson with mean $\lambda p_i t$. With two types this is [[Poisson Process#Thinning a Poisson process|thinning a Poisson process]] with $p_1 = p$ and $p_2 = 1 - p$.

> [!example]- Claims arrive as a Poisson process at a rate of 20 per year. Each claim is a collision claim with probability 0.6, a comprehensive claim with probability 0.3 and a liability claim with probability 0.1, independently of the other claims. What is the probability of exactly 2 liability claims in a year, and of no liability claim in six months? {Example}
> - The liability claims form a Poisson process with rate $20 \times 0.1 = 2$ per year.
> - The probability of exactly 2 liability claims in a year is $\frac{e^{-2}\,2^2}{2!} = 0.2707$.
> - The number of liability claims in six months is Poisson with mean $2 \times 0.5 = 1$.
> - The probability of no liability claim in six months is $e^{-1} = 0.3679$.

## Independence of the thinned processes

The $k$ thinned processes are independent of each other. The number of events of one type therefore gives no information about the number of events of another type, and the expected number of type 2 events by time $t$, given any number $n$ of type 1 events, is

> $$E[N_2(t) \mid N_1(t) = n] = \lambda\, p_2\, t$$

- $N_i(t)$ is the number of type $i$ events by time $t$.

Given the total number of events $N(t) = n$, by contrast, the number of type 1 events is [[Binomial Distribution|binomial]] with $n$ trials and probability $p_1$, and the numbers of the two types are dependent.

> [!example]- Losses occur as a Poisson process at a rate of 10 per year. Loss amounts are exponential with mean 5,000, and each policy has an ordinary deductible of 2,000. So far this year, 4 losses below the deductible have been recorded. What is the expected number of losses this year that exceed the deductible? {Example}
> - A loss exceeds the deductible with probability $P(X > 2{,}000) = e^{-2{,}000/5{,}000} = 0.67032$.
> - The losses above the deductible form a Poisson process with rate $10 \times 0.67032 = 6.7032$ per year.
> - The losses above and below the deductible form independent processes, so the 4 losses below the deductible do not change this expectation.
> - The expected number of losses above the deductible this year is $6.70$.

## Classification that depends on the time of the event

Suppose an event that occurs at time $s$ is of type $i$ with probability $p_i(s)$, independently of all other events. Then the numbers of events of each type by time $t$ are independent Poisson random variables, and the mean number of type $i$ events is

> $$E[N_i(t)] = \lambda \int_0^t p_i(s)\,ds$$

The events of one type form a [[Nonhomogeneous Poisson Process#Thinning with a probability that changes over time|nonhomogeneous Poisson process]] with intensity function $\lambda p_i(s)$.

> [!example]- Claims occur as a Poisson process at a rate of 20 per month, starting at time 0. The delay from occurrence to report is exponential with mean 2 months, independently for each claim. What are the expected numbers of claims that have occurred but are not yet reported at 6 months, and of claims reported by then? {Example}
> - A claim that occurs at time $s \le 6$ is still unreported at time 6 with probability $e^{-(6 - s)/2}$.
> - The expected number of unreported claims is
>
> $$
> \begin{aligned}
> 20\int_0^6 e^{-(6-s)/2}\,ds &= 40\left(1 - e^{-3}\right) \\
> &= 38.01
> \end{aligned}
> $$
>
> - The expected number of claims that occur by time 6 is $20 \times 6 = 120$, so the expected number reported is $120 - 38.01 = 81.99$.
> - The two numbers are independent Poisson random variables.
