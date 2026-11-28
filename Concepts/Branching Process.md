---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:fff5ac4867e1e5ef077ff13a5d635d8251afb5738607bb0c745573a362956eab
  sources:
    - "https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf, §4.7 Branching Processes, pp.233-236 (PDF pp.49-52): X_n = sum_{i=1}^{X_{n-1}} Z_i, Eqs. 4.19-4.20, sha256:9f01ac6c0ef8a6a641de075fe6af109d7215bad8c33734807fd654d4a1ad53e1 — https://arvidn.folk.ntnu.no/TMA4265/Chap%204%20from%20Ross.pdf"
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
