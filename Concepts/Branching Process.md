---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:fff5ac4867e1e5ef077ff13a5d635d8251afb5738607bb0c745573a362956eab
  sources:
    - "Ross, Introduction to Probability Models, Ch 4 'Markov Chains' (an earlier edition than the 12th ed. the 2026 MAS-I outline assigns; course-hosted copy on the NTNU TMA4265 page, printed pp.185-280, PDF p.n = printed p.184+n), §4.7 Branching Processes pp.233-236 (PDF pp.49-52): offspring distribution P_j with P_j < 1 for all j, X_n a Markov chain, state 0 recurrent and all others transient when P0 > 0 (die out or converge to infinity), mu and sigma^2, X_0 = 1, X_n = sum_{i=1}^{X_{n-1}} Z_i, E[X_n] = mu^n, Var(X_n | X_{n-1}) = X_{n-1} sigma^2 and Eq. (4.19) Var(X_n) = sigma^2 mu^(n-1)(1-mu^n)/(1-mu) for mu != 1, n sigma^2 for mu = 1, pi_0 = 1 if mu <= 1, Eq. (4.20) pi_0 = sum pi_0^j P_j, smallest positive solution when mu > 1, Examples 4.28-4.30 (pi_0^n for n ancestors), sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., CHANCE Project GNU FDL version dated 4 July 2006), §10.2 Branching Processes pp.378-381 (PDF pp.386-389): d_m = P(dies out by generation m), d_0 = 0, monotone to d, Eq. (10.1)-(10.2) d_m = h(d_{m-1}), d = h(d) with d = 1 always a root; Theorem 10.2 (d the smallest root; m <= 1 => d = 1; m > 1 => d < 1) p.380; at most two offspring: roots d = 1 and d = p0/p2, p.381, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Random (randomservices.org), Ch 15 §11 'Discrete-Time Branching Chains': f(1) = 1 trivial case (every state absorbing); f(0) > 0 => every positive state transient, extinction or explosion; chain from x particles = x independent copies, extinction q^x; q a fixed point of the offspring PGF; m <= 1 => q = 1, m > 1 => 0 < q < 1; f(0) = 1-p, f(2) = p gives q = (1-p)/p, sha256:3e58cfd2f74dd0bdc8d925ffe41e6017ab9851e6bc6ecc7e84bfc578c655ccdc — https://www.randomservices.org/random/markov/Branching.html"
    - "CAS Exam MAS-I Fall 2018, Q11 — official exam paper (scan), PDF p.15; Final Answer Key PDF p.50 (Q11 = A), sha256:47ced888a314db1a5e29e28c0a52f989966b21a079b1c08634b73dc90e844296 — https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exammasi_fmasi-18.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Branching Process.md
---

A **Branching Process** is a [[Markov Chain]] $\{X_n, n = 0, 1, 2, \ldots\}$ that counts the individuals in successive generations of a population, in which each individual lives for one generation and, independently of the others, produces $j$ offspring with probability $P_j$. Starting from one individual, $X_0 = 1$, the size of generation $n$ is the total offspring of generation $n - 1$:

> $$X_n = \sum_{i=1}^{X_{n-1}} Z_i$$

- $Z_i$ is the number of offspring of the $i$th individual of generation $n - 1$, with $P(Z_i = j) = P_j$ for $j = 0, 1, 2, \ldots$.
- $X_n = 0$ when $X_{n-1} = 0$.

State 0 is absorbing. If $P_0 > 0$, every other state is [[Recurrent and Transient States|transient]], so the population either dies out or grows without bound.

> [!example]- Each individual of a population lives one generation and leaves 0, 1 or 2 offspring with probabilities 0.3, 0.3 and 0.4. Starting from one individual, what is the probability that the population is extinct by generation 2? {Example}
> - Generation 1 is extinct with probability $P(X_1 = 0) = P_0 = 0.3$.
> - Given $X_1 = j$, generation 2 is extinct when each of the $j$ individuals has no offspring, with probability $0.3^j$.
> - Summing over $j$, the probability is
>
> $$
> \begin{aligned}
> P(X_2 = 0) &= 0.3 + 0.3(0.3) + 0.4(0.3)^2 \\
> &= 0.426
> \end{aligned}
> $$

## Mean and variance of the generation size

Let $\mu$ and $\sigma^2$ be the mean and the variance of the number of offspring of one individual. Starting from one individual, the mean of the size of generation $n$ is

> $$E[X_n] = \mu^n$$

and its variance is

> $$\text{Var}(X_n) = \begin{cases} \sigma^2 \mu^{n-1}\, \dfrac{\mu^n - 1}{\mu - 1} & \mu \ne 1 \\[10pt] n\sigma^2 & \mu = 1 \end{cases}$$

- $\mu = \sum_j j P_j$.
- $\sigma^2 = \sum_j (j - \mu)^2 P_j$.

The mean follows from $E[X_n \mid X_{n-1}] = \mu X_{n-1}$, and the variance from the [[Variance for Conditional and Marginal Distributions|law of total variance]] with $\text{Var}(X_n \mid X_{n-1}) = \sigma^2 X_{n-1}$.

> [!example]- An element lives one week and leaves 0, 1 or 2 offspring with probabilities 0.75, 0.20 and 0.05. Starting from one element, what are the mean and the variance of the size of the second generation? {Example}
> - The mean number of offspring is $\mu = 0.20 + 2(0.05) = 0.30$.
> - The variance is $\sigma^2 = 0.20 + 4(0.05) - 0.30^2 = 0.31$.
> - The mean of the second generation is $E[X_2] = 0.30^2 = 0.09$.
> - Its variance is
>
> $$
> \begin{aligned}
> \text{Var}(X_2) &= 0.31(0.30)\,\frac{0.09 - 1}{0.30 - 1} \\
> &= 0.1209
> \end{aligned}
> $$

## Probability of extinction

The probability $\pi_0$ that the population eventually dies out is a solution of

> $$\pi_0 = \sum_{j=0}^{\infty} \pi_0^{\,j}\, P_j$$

Given $X_1 = j$, the population dies out only if each of the $j$ independent family lines does, which has probability $\pi_0^{\,j}$. The value $1$ always solves the equation. If $\mu \le 1$, then $\pi_0 = 1$, excluding the case $P_1 = 1$ in which each individual exactly replaces itself. If $\mu > 1$, then $\pi_0$ is the smallest positive solution, and it is less than 1.

> [!example]- Each individual leaves 0, 1 or 2 offspring with probabilities 0.3, 0.3 and 0.4. Starting from one individual, what is the probability that the population eventually dies out? {Example}
> - The mean number of offspring is $\mu = 0.3 + 2(0.4) = 1.1 > 1$, so extinction is not certain.
> - The equation is $\pi_0 = 0.3 + 0.3\,\pi_0 + 0.4\,\pi_0^2$, which rearranges to $0.4\,\pi_0^2 - 0.7\,\pi_0 + 0.3 = 0$.
> - Its solutions are $\pi_0 = \frac{0.7 \pm 0.1}{0.8}$, which are 1 and 0.75.
> - The probability of extinction is the smallest positive solution, $\pi_0 = 0.75$.

## More than one initial individual

The family lines descending from $k$ initial individuals are independent copies of the process, so the probability that the population eventually dies out is

> $$\pi_0^{\,k}$$

The mean and the variance of $X_n$ are $k$ times those for one initial individual.

> [!example]- In the population above, three individuals are alive now. What is the probability that the population eventually dies out? {Example}
> - Each of the three family lines dies out with probability 0.75, independently.
> - The probability that all three die out is $0.75^3 = 0.4219$.

> [!trap] Taking the solution 1 when $\mu > 1$
> The extinction equation always has the solution 1. When $\mu > 1$, the probability of extinction is the smaller solution. In the example with $\mu = 1.1$, it is 0.75, not 1.
