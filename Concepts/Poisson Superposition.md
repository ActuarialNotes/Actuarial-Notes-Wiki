---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:d9b69c34f10ba4977fccd3831499f676c24f322790e927650714d6faf2cc658d
  sources:
    - "Daniel, \"Poisson processes (and mixture distributions)\", CAS Study Note (June 2008) — MAS-I syllabus reading, Fact 1.15 pp.9-10 (sum of independent Poisson processes is Poisson with λ1 + λ2), §1.4.2 and Example 1.28 p.14 (next event from N_1 with probability λ1/(λ1+λ2); merged compound Poisson severity is the rate-weighted mixture), sha256:e345451e9daae82b400aed77f2da0c96c361ed4fbdfd22456b8f711ca0d50888 — https://www.casact.org/sites/default/files/2021-03/MAS-I_Daniel_1.pdf"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'Thinning and Superposition', Superposition (combined process Poisson with rate r1 + r2; requires independence), sha256:e07aab3aa8206236541466f57719dcdce9fdf7f1f21a9dd5357d89034cf623ba — https://www.randomservices.org/random/poisson/Splitting.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Exponential Distribution' (first arrival min of exponentials, rate Σr_i; P(type i first) = r_i/Σr_j), sha256:db0eebaa01377dfc5e07ca838f9ae6c3b06b9653e6d10032de301cb07c4aad63 — https://www.randomservices.org/random/poisson/Exponential.html"
    - "Siegrist, Random (randomservices.org, HTML fetched 2026-10-04), ch.13 The Poisson Process, 'The Poisson Distribution', subsection 'The Binomial Distribution' (M given M + N = n is binomial(n, a/(a+b))), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Huang, STAT 253/317 (U. Chicago, 2021) Lecture 11 slides, following Ross, Introduction to Probability Models ch.5, slides p.2 (superposition), pp.6-7 (P(S^A_n < S^B_m) = Σ_{k=n}^{n+m-1} C(n+m-1, k) p^k (1-p)^{n+m-1-k}; labels iid Bernoulli(λA/(λA+λB))), p.12 Proposition 5.4, sha256:a0e1f0472675b35264cff54d6a4223c90ad34df1381d76f2150b537b7b5b9e74 — https://www.stat.uchicago.edu/~yibi/teaching/stat317/2021/Lectures/Lecture11.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain A tasks 1-2 and text references (Daniel A1-5; Ross 5.2.1-5.2.4, 5.3, 5.4.1, 5.4.2), PDF pp.3, 6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Superposition.md
---

**Poisson Superposition** is the combination of independent [[Poisson Process|Poisson processes]] into one process that counts the events of all of them. The sum of $r$ independent Poisson processes with rates $\lambda_1, \lambda_2, \ldots, \lambda_r$ is a Poisson process with rate

> $$\lambda = \lambda_1 + \lambda_2 + \cdots + \lambda_r$$

The same result holds for counts over a fixed period. The [[Poisson Distribution#Sums of independent Poisson counts|sum of independent Poisson random variables]] is Poisson with mean equal to the sum of their means. The total count over $n$ independent periods with the same Poisson mean is therefore Poisson with mean $n$ times that mean.

> [!example]- On a block of auto policies, collision claims arrive at a rate of 3 per month, comprehensive claims at 2 per month and liability claims at 1 per month, as independent Poisson processes. What is the probability of no claims of any kind in a quarter of a month? {Example}
> - All claims together form a Poisson process with rate $\lambda = 3 + 2 + 1 = 6$ per month.
> - The number of claims in a quarter of a month is Poisson with mean $6 \times 0.25 = 1.5$.
> - The probability of no claims is $e^{-1.5} = 0.2231$.

## The process each event comes from

Each event of the combined process comes from process $i$ with probability $\lambda_i/\lambda$, independently of the other events and of the time at which it occurs. Given $N(t) = n$ events of the combined process by time $t$, the number from process 1 is therefore [[Binomial Distribution|binomial]], and the probability that $k$ of them come from process 1 is

> $$P(N_1(t) = k \mid N(t) = n) = \binom{n}{k}\left(\frac{\lambda_1}{\lambda}\right)^{k}\left(1 - \frac{\lambda_1}{\lambda}\right)^{n-k}$$

- $N_1(t)$ is the number of events of process 1 by time $t$.
- $k = 0, 1, \ldots, n$.

When all $r$ processes have the same rate, each event comes from any one of them with probability $1/r$.

> [!example]- In the same block of auto policies, 8 claims occurred in a month. What is the probability that exactly 4 of them were collision claims, and what is the expected number of collision claims? {Example}
> - Each claim is a collision claim with probability $3/6 = 0.5$, independently of the other claims.
> - Given 8 claims, the number of collision claims is binomial with $n = 8$ and probability 0.5.
> - The probability of exactly 4 is $\binom{8}{4}(0.5)^4(0.5)^4 = \frac{70}{256} = 0.2734$.
> - The expected number of collision claims is $8 \times 0.5 = 4$.

## One process reaching $n$ events before another reaches $m$

With two independent processes, let $p = \lambda_1/(\lambda_1 + \lambda_2)$. Process 1 reaches $n$ events before process 2 reaches $m$ events exactly when at least $n$ of the first $n + m - 1$ events of the combined process come from process 1. The probability of that is

> $$\sum_{k=n}^{n+m-1} \binom{n+m-1}{k}\, p^{k}(1-p)^{n+m-1-k}$$

> [!example]- Large property losses arrive at a rate of 3 per year and large casualty losses at a rate of 1 per year, as independent Poisson processes. What is the probability that the second large property loss occurs before the second large casualty loss? {Example}
> - Each large loss is a property loss with probability $p = \frac{3}{3 + 1} = 0.75$.
> - With $n = m = 2$, look at the first $n + m - 1 = 3$ large losses.
> - The property losses come first when at least 2 of those 3 are property losses.
> - Exactly 2 property losses has probability $\binom{3}{2}(0.75)^2(0.25) = 0.421875$.
> - All 3 property losses has probability $(0.75)^3 = 0.421875$.
> - The probability is $0.421875 + 0.421875 = 0.8438$.
