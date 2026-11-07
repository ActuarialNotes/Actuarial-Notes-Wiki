---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:fcab7a286cb2307356981de0f092f28bac96dceb86815a0058e43dca9c780e4f
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 6.6 Order Statistics: f_k(x) = n!/((k-1)!(n-k)!) F^(k-1)(1-F)^(n-k) f; joint f_{j,k}; uniform sample X_(k) beta(k, n-k+1) with mean k/(n+1), sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 3.7 Transformations, Minimum and Maximum: independent X_i with CDFs F_i, max has F_1...F_n, min has 1 - prod(1 - F_i), sha256:827bba81a7f85933f2ba982a09155f5277f5ec19838e2ffe70ac0563a56aca69 — https://www.randomservices.org/random/dist/Transformations.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 12.4 Order Statistics: P[X_(i) = x] = C(x-1,i-1)C(m-x,n-i)/C(m,n), sha256:8b4b38e1ca6a79fcc598b1bebf75fc7b9694f0592411d2ef539a6c727f139c77 — https://www.randomservices.org/random/urn/OrderStatistics.html"
    - "Sheffield, MIT OCW 18.440 (Spring 2014), Lecture 20 Exponential random variables, slide 8 (min of independent exponentials has rate the sum of rates), slide 16 radioactive decay: T1 exponential nλ, T2 (n-1)λ, E[T] = λ^-1 Σ 1/j, sha256:394516321e47a5eae056e929d398075f82956f7711c449c8deca16abb56c175c — https://ocw.mit.edu/courses/18-440-probability-and-random-variables-spring-2014/9c364e256bcc2b34ba6dd73025e8bcb2_MIT18_440S14_Lecture20.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 Multivariate Random Variables incl. order statistics (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Order Statistics.md
---

![[Media/Figures/Order_Statistics.svg|340]]

**Order Statistics** are the values of a random sample sorted from smallest to largest. The $k$th order statistic $X_{(k)}$ of a sample $X_1, \ldots, X_n$ is its $k$th smallest value, so

> $$X_{(1)} \le X_{(2)} \le \cdots \le X_{(n)}$$

- $X_{(1)}$ is the minimum and $X_{(n)}$ is the maximum.

> [!idea] The idea
> The maximum is at most $x$ exactly when every observation is at most $x$, and the minimum is above $x$ exactly when every observation is above $x$.

## The maximum and the minimum

For [[Independent Random Variables|independent]] $X_1, \ldots, X_n$ with CDFs $F_1, \ldots, F_n$, the CDF of the maximum is

> $$P(X_{(n)} \le x) = F_1(x)\,F_2(x) \cdots F_n(x)$$

The minimum is above $x$ with probability

> $$P(X_{(1)} > x) = [1 - F_1(x)] \cdots [1 - F_n(x)]$$

For an i.i.d. sample with CDF $F$, these are $[F(x)]^n$ and $[1 - F(x)]^n$. A system that fails when its first component fails has the minimum lifetime, and one that fails when its last component fails has the maximum.

> [!example]- Two fair dice are rolled. What is the probability that the larger number is 4? {Example}
> - The larger number is at most 4 when both dice are, so $P(X_{(2)} \le 4)$ is $\left(\frac{4}{6}\right)^2 = \frac{16}{36}$.
> - In the same way, $P(X_{(2)} \le 3)$ is $\left(\frac{3}{6}\right)^2 = \frac{9}{36}$.
> - The probability that the larger number is exactly 4 is the difference, $\frac{16}{36} - \frac{9}{36} = \frac{7}{36}$.

> [!trap] Multiplying CDFs for the minimum
> The minimum multiplies the probabilities $1 - F_i(x)$ of being above $x$, not the CDFs. $P(X_{(1)} \le x)$ is one minus that product.

## The $k$th order statistic

For an i.i.d. sample of $n$ from a continuous distribution, the density of the $k$th order statistic is

> $$
> \begin{aligned}
> & f_{X_{(k)}}(x) \\
> & = \frac{n!}{(k-1)!\,(n-k)!} \\
> & \quad \times [F(x)]^{k-1}\,[1 - F(x)]^{n-k} \\
> & \quad \times f(x)
> \end{aligned}
> $$

- $f(x)$ and $F(x)$ are the density and CDF of each observation.

The density counts $k - 1$ observations below $x$, one at $x$ and $n - k$ above it. For $k = 1$ it is the density of the minimum, $n f(x) [1 - F(x)]^{n-1}$. For a sample of $n$ from the uniform distribution on $(0, \theta)$, the mean of $X_{(k)}$ is $\frac{k\theta}{n+1}$.

> [!example]- A sample of 4 is drawn from the uniform distribution on $(0, 10)$. What is the expected value of the second smallest? {Example}
> - Here $n = 4$, $k = 2$, $F(x) = \frac{x}{10}$ and $f(x) = \frac{1}{10}$.
> - The coefficient is $\frac{4!}{1!\,2!} = 12$, so the density of $X_{(2)}$ is
>
> $$f_{X_{(2)}}(x) = \frac{12}{10} \cdot \frac{x}{10} \left(1 - \frac{x}{10}\right)^2$$
>
> - Integrating $x f_{X_{(2)}}(x)$ from 0 to 10 gives 4, which is $\frac{2 \times 10}{4 + 1}$.

## The minimum of exponential random variables

If $X_1, \ldots, X_n$ are independent [[Exponential Distribution|exponential]] random variables with rates $\lambda_1, \ldots, \lambda_n$, their minimum is exponential with rate $\lambda_1 + \cdots + \lambda_n$:

> $$P(X_{(1)} > x) = e^{-(\lambda_1 + \cdots + \lambda_n)x}$$

- The rate $\lambda_i$ is one over the mean of $X_i$.

The exponential distribution is memoryless, so after the first failure the survivors start afresh. For $n$ i.i.d. lifetimes with mean $\theta$, the gaps between failures are independent, with means $\frac{\theta}{n}$, $\frac{\theta}{n-1}$ and so on, so

> $$E[X_{(k)}] = \theta\left(\frac{1}{n} + \cdots + \frac{1}{n-k+1}\right)$$

> [!example]- A system fails as soon as either of two independent components fails. The lifetimes are exponential with means 10 and 15. What is the mean lifetime of the system? {Example}
> - The system's lifetime is the minimum of the two lifetimes.
> - The rates are $\frac{1}{10}$ and $\frac{1}{15}$, which add to $\frac{1}{6}$.
> - The minimum is exponential with rate $\frac{1}{6}$, so the mean lifetime is 6.

> [!example]- Three components have i.i.d. exponential lifetimes with mean 10. What is the expected time until all three have failed? {Example}
> - All three have failed at the maximum, $X_{(3)}$.
> - Three components survive for the first gap, then two, then one.
> - The expected time is
>
> $$E[X_{(3)}] = 10\left(\frac{1}{3} + \frac{1}{2} + 1\right) = 18.33$$

## Draws without replacement

When $n$ distinct numbers are drawn without replacement from $1, 2, \ldots, N$, the $k$th smallest equals $x$ when $x$ is drawn, $k - 1$ draws are below it and $n - k$ are above it:

> $$P(X_{(k)} = x) = \frac{\binom{x-1}{k-1}\binom{N-x}{n-k}}{\binom{N}{n}}$$

> [!example]- Three numbers are drawn without replacement from 1 to 10. What is the probability that the middle one is 5? {Example}
> - One of the 4 numbers below 5 is drawn, and one of the 5 numbers above it.
> - There are $\binom{10}{3} = 120$ equally likely draws, so
>
> $$P(X_{(2)} = 5) = \frac{4 \times 5}{120} = \frac{1}{6}$$
