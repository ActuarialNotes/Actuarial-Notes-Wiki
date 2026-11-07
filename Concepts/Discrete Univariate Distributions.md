---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:e2ac338e6a0b163a6333b5a8e8b20f6a53f5f7e587353bca555dc1a643cd4df9
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 geometric P(T=j)=q^(j-1)p p.185, negative binomial pp.186-187, Poisson as binomial limit p.189, hypergeometric p.193 (PDF pp.193-195, 197, 201); §6.2 Ex. 11 discrete uniform E=(n+1)/2 p.264 (PDF p.272), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 2.7 Distribution and Quantile Functions: for a discrete distribution f(x) = F(x) - F(x^-), sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 13.4 The Poisson Distribution: P(N_t=n) = e^{-rt}(rt)^n/n!; modes at a-1 and a for integer a; sum of independent Poissons; N_s given N_t = n is binomial(n, s/t), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 geometric P(T=j) = q^(j-1)p p.185 (PDF p.193); P(T>k) = q^k and memoryless P(T>r+s|T>r) = q^s, also obeyed by the exponential, p.186 (PDF p.194); §6.2 Example 6.19 E(T)=1/p, V(T)=q/p^2 p.262 (PDF p.270), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 Multivariate Random Variables incl. order statistics (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discrete Univariate Distributions.md
---

![[Media/Figures/Discrete_Univariate_Distributions.svg|340]]

A **Discrete Univariate Distribution** is the probability distribution of a single [[Discrete Random Variable|discrete random variable]] $X$. It is given by the [[Probability Mass Function (PMF)|probability mass function]] $f(k) = P(X = k)$, whose values over all $k$ add to 1:

> $$\sum_k f(k) = 1$$

- $f(k) \ge 0$ for every $k$.

> [!example]- A policy's number of claims $X$ has PMF $f(k) = ck$ for $k = 1, 2, 3, 4$. What are $c$ and $P(X \le 3)$? {Example}
> - The probabilities must add to 1, so $c(1 + 2 + 3 + 4) = 1$.
> - $10c = 1$, so $c = 0.1$.
> - $P(X \le 3) = 0.1(1 + 2 + 3) = 0.6$.

## The PMF from the CDF

The [[Cumulative Distribution Function (CDF)|cumulative distribution function]] $F(k) = P(X \le k)$ steps up by $f(k)$ at each value $k$, so for a count

> $$f(k) = F(k) - F(k - 1)$$

- In the same way, $f(k)$ is the drop between neighbouring tail probabilities, $P(X \ge k) - P(X \ge k + 1)$.

> [!example]- The number of accidents $X$ in a month is at most 3, with $P(X \ge 1) = 0.6$, $P(X \ge 2) = 0.25$ and $P(X \ge 3) = 0.1$. What is the PMF of $X$, and what is $E[X]$? {Example}
> - $f(0) = 1 - 0.6 = 0.40$.
> - $f(1) = 0.6 - 0.25 = 0.35$ and $f(2) = 0.25 - 0.1 = 0.15$.
> - 3 is the largest value, so $f(3) = P(X \ge 3) = 0.10$.
> - $E[X]$ is $1(0.35) + 2(0.15) + 3(0.10)$, which is $0.95$.

## Named discrete distributions

Each named distribution counts something different:

| What is counted | Distribution | Mean |
| --- | --- | --- |
| Successes in $n$ independent trials | [[Binomial Distribution]] $(n, p)$ | $np$ |
| Successes in $n$ draws without replacement | [[Hypergeometric Distribution]] $(N, K, n)$ | $nK/N$ |
| Trials until the first success | [[Geometric Distribution]] $(p)$ | $1/p$ |
| Trials until the $r$th success | [[Negative Binomial Distribution]] $(r, p)$ | $r/p$ |
| Events in a period, at a rate | [[Poisson Distribution]] $(\lambda)$ | $\lambda$ |
| One of $1, \ldots, n$, equally likely | [[Uniform Discrete]] | $(n+1)/2$ |

> [!example]- Of 30 claim files, 5 are fraudulent, and an auditor reviews 8 chosen without replacement. An agent makes calls until the second sale, each a sale with probability 0.1. Claims arrive at 4 per month. What distribution does each count follow, and what is its mean? {Example}
> - The fraudulent files reviewed are hypergeometric, with mean $8 \times \frac{5}{30} = 1.33$.
> - The calls until the second sale are negative binomial with $r = 2$, with mean $\frac{2}{0.1} = 20$.
> - The claims in a month are Poisson, with mean 4.

> [!trap] A Poisson rate on the wrong interval
> A Poisson count with mean 4 per month has mean 2 per half month and 48 per year. Using the monthly mean for a different period gives the probability of the wrong count.
