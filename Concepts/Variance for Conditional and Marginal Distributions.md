---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:fb63fc9cedf5db1f8395c471058a78ee1a2424f888340b6b2861551995e7f112
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes, §5.1.5 law of iterated expectations (5.7), E[g(X)h(Y)] = E[g(X)]E[h(Y)] for independent, conditional variance, law of total variance (5.10), Var(X) >= E[Var(X|Y)] (5.11), random-sum example (5.12), sha256:1bda829553c761a1ee71ba3210a6510e4780b5bcba0513325b5180b3d4100d82 — https://www.probabilitycourse.com/chapter5/5_1_5_conditional_expectation.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.7 Conditional Expected Value: var(Y)=E[var(Y|X)]+var[E(Y|X)]; uniform var(Y|X)=l^2(X)/12, sha256:23e328f9ee55e32522905aba62841f2920eef0d32fb68d7fbb1f4e0b0eaf62f6 — https://www.randomservices.org/random/expect/Conditional.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 14.4 The Poisson Distribution: E(N)=var(N); sum of independent Poisson(a), Poisson(b) is Poisson(a+b), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "SOA Exam P Sample Solutions, Q80 (PDF p.24), Q301 (PDF p.82), Q388 (PDF p.107), sha256:e10d2649bdf708541f87849c85ef6cde195019cfc8a46ee9647f6733d74d04b2 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes a)-i), PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance for Conditional and Marginal Distributions.md
---

![[Media/Figures/Variance_for_Conditional_and_Marginal_Distributions.svg|340]]

**Variance for Conditional and Marginal Distributions** is the variance of a random variable within a [[Conditional Probability Function|conditional distribution]], and how it combines into the variance of the [[Marginal Probability Function|marginal distribution]]. The conditional variance of $Y$ given $X = x$ is the variance of the conditional distribution of $Y$:

> $$
> \begin{aligned}
> &\text{Var}(Y \mid X = x) \\
> &\quad = E[Y^2 \mid X = x] \\
> &\quad\quad - \big(E[Y \mid X = x]\big)^2
> \end{aligned}
> $$

- $E[Y \mid X = x]$ and $E[Y^2 \mid X = x]$ are the mean and second moment of the conditional distribution.
- They are calculated with the conditional probabilities $P(Y = y \mid X = x)$ in place of $P(Y = y)$.

> [!example]- A policyholder's numbers of auto claims $X$ and home claims $Y$ in a year have the joint probabilities below. What is $\text{Var}(Y \mid X = 1)$? {Example}
> | $X$ \ $Y$ | 0 | 1 | 2 |
> | --- | --- | --- | --- |
> | 0 | 0.36 | 0.18 | 0.06 |
> | 1 | 0.10 | 0.20 | 0.10 |
>
> - The $X = 1$ row adds to $P(X = 1) = 0.40$. Dividing the row by 0.40 gives the conditional probabilities 0.25, 0.50 and 0.25.
> - $E[Y \mid X = 1]$ is $0.50 + 2(0.25) = 1.0$.
> - $E[Y^2 \mid X = 1]$ is $0.50 + 4(0.25) = 1.5$.
> - $\text{Var}(Y \mid X = 1)$ is $1.5 - 1.0^2 = 0.5$.

## The law of total expectation

The **law of total expectation** gives the marginal mean as the average of the conditional means:

> $$E[Y] = E\big[E[Y \mid X]\big]$$

- $E[Y \mid X]$ is a random variable, a function of $X$. It takes the value $E[Y \mid X = x]$ with probability $P(X = x)$.

> [!example]- For the auto and home claims above, $E[Y \mid X = 0] = 0.5$ and $E[Y \mid X = 1] = 1.0$. What is $E[Y]$? {Example}
> - $P(X = 0) = 0.60$ and $P(X = 1) = 0.40$.
> - $E[Y]$ is $0.60(0.5) + 0.40(1.0)$, which is 0.70.

## The law of total variance

The **law of total variance** gives the marginal variance in two pieces:

> $$
> \begin{aligned}
> \text{Var}(Y) &= E\big[\text{Var}(Y \mid X)\big] \\
> &\quad + \text{Var}\big(E[Y \mid X]\big)
> \end{aligned}
> $$

- $E[\text{Var}(Y \mid X)]$ is the average of the conditional variances, weighted by the probabilities of $X$.
- $\text{Var}(E[Y \mid X])$ is the variance of the conditional means.

When a count $N$ is [[Poisson Distribution|Poisson]] with a mean $\Lambda$ that is itself random, $E[N \mid \Lambda]$ and $\text{Var}(N \mid \Lambda)$ both equal $\Lambda$. So $\text{Var}(N) = E[\Lambda] + \text{Var}(\Lambda)$.

> [!example]- 70% of policies are Type A and 30% are Type B. A policy's number of claims is Poisson with mean 1 for Type A and mean 3 for Type B. What is the variance of the number of claims on a policy chosen at random? {Example}
> - The Poisson mean $\Lambda$ is 1 with probability 0.7 and 3 with probability 0.3.
> - $E[\Lambda]$ is $0.7(1) + 0.3(3) = 1.6$.
> - $E[\Lambda^2]$ is $0.7(1) + 0.3(9) = 3.4$.
> - $\text{Var}(\Lambda)$ is $3.4 - 1.6^2 = 0.84$.
> - $\text{Var}(N)$ is $1.6 + 0.84 = 2.44$.

> [!trap] Stopping at one piece
> The average of the conditional variances, 1.6 here, is only the spread within each type. The variance of the conditional means, 0.84, is only the spread between the types. The variance of $N$ is their sum, 2.44.

## Variance of a random sum

An aggregate loss $S = X_1 + \cdots + X_N$ adds a random number $N$ of claims, each with mean $\mu$ and variance $\sigma^2$, independent of each other and of $N$. Given $N$, $E[S \mid N] = N\mu$ and $\text{Var}(S \mid N) = N\sigma^2$, so the law of total variance gives

> $$\text{Var}(S) = E[N]\,\sigma^2 + \text{Var}(N)\,\mu^2$$

> [!example]- The number of claims is Poisson with mean 3. Claim sizes are exponential with mean 100, independent of each other and of the number of claims. What is the standard deviation of aggregate claims? {Example}
> - An exponential claim with mean 100 has $\mu = 100$ and $\sigma^2 = 100^2 = 10{,}000$.
> - A Poisson count has $E[N] = \text{Var}(N) = 3$.
> - $\text{Var}(S)$ is $30{,}000 + 30{,}000 = 60{,}000$.
> - The standard deviation is $\sqrt{60{,}000} \approx 244.9$.
