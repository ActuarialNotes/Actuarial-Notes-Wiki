---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:34c6a98e5abca2589bdd8016a37bf73727f266bc4c800a758cce6b2544501290
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §6.2 Bernoulli trials E(X_j)=p, V(X_j)=pq, E(S_n)=np, V(S_n)=npq p.261 (PDF p.269); §5.1 b(n,p,k)/b(n,p,k-1) p.189 (PDF p.197), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 11.2 The Binomial Distribution: f_n(k) > f_n(k-1) iff p/k > (1-p)/(n-k+1); given Y_n = k each outcome sequence has probability 1/C(n,k), not depending on p, sha256:223ab179871c6da69d1e68811192935c2f12d9762a62de02336f446dd47b10b9 — https://www.randomservices.org/random/bernoulli/Binomial.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-11-06), §1.4.2 Law of Total Probability, sha256:e670bbb6d9b77df6d4a0c8d7fa5d5317d0bc1991eb0f7fb8e4df15a2b41a3825 — https://www.probabilitycourse.com/chapter1/1_4_2_total_probability.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 11.4 The Negative Binomial Distribution: V_k trial number of the k-th success, E = k/p, var = k(1-p)/p^2; W_k = V_k - k failures, pdf C(n+k-1,n)p^k(1-p)^n, mode at floor((k-1)(1-p)/p) with two modes when integer; the problem of points, sha256:090f2543374cd589ff963f4addb35f897d0bd1c0c8ff5c08cc7086f659858916 — https://www.randomservices.org/random/bernoulli/NegativeBinomial.html"
    - "CAS, Tables for Exam MAS-I (version date 01/15/2018, linked from the CAS MAS-I exam page), p.1 (tables used when writing MAS-I questions); p.15 Appendix B.2 (a,b,0) class: B.2.1.1 Poisson, B.2.1.2 geometric-beta, B.2.1.3 binomial-q,m, B.2.1.4 negative binomial-beta,r, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "SOA, Exam FAM syllabus (2027 February), Topic 2 outcomes e)-j) (a,b,0) frequency, individual risk model, normal approximation, p.3; readings Loss Models Ch. 6, p.8, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
    - "SOA, Exam ASTAM syllabus (October 2026), Topic 2 a) aggregate claims with (a,b,0) or (a,b,1) frequency, p.2; Loss Models readings, p.6, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf"
    - "CAS, Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domains A (tasks 1-2, Poisson processes) and B (tasks 3, 5, 7), readings p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 13.4 The Poisson Distribution: P(N_t=n) = e^{-rt}(rt)^n/n!; modes at a-1 and a for integer a; sum of independent Poissons; N_s given N_t = n is binomial(n, s/t), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "CAS Exam MAS-I Spring 2019 Q21 (Bernoulli sample, H0: q=0.5, binomial sum with normal approximation) and Fall 2019 Q12 (binomial deaths, normal approximation), as transcribed in questions/exam-mas-i/masi-2019s-021.md and masi-2019f-012.md (consistency, rank 4)"
    - "CAS, Exam MAS-II Content Outlines 2026, Domain A Introduction to Credibility, task 1 Bayesian credibility, readings Tse Ch. 6-9, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "CAS Exam MAS-II Spring 2019 Q19, as transcribed in questions/exam-mas-ii/masii-2019s-019.md: beta prior conjugate to the binomial, posterior Beta (consistency, rank 4)"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Binomial Distribution.md
---

![[Media/Figures/Binomial_Distribution.svg|340]]

A **Binomial Distribution** is the distribution of the number of successes in $n$ independent trials that each succeed with the same probability $p$. The probability of $k$ successes for a binomial random variable $X \sim \text{Bin}(n, p)$ is

> $$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

- $k = 0, 1, \ldots, n$.

A single trial, $n = 1$, is a **Bernoulli** random variable: 1 with probability $p$, and 0 with probability $1 - p$.

> [!idea] The idea
> Each arrangement of $k$ successes and $n - k$ failures has probability $p^k(1-p)^{n-k}$, and $\binom{n}{k}$ counts the [[Combination|arrangements]].

> [!example]- Five policyholders each file a claim with probability 0.2, independently. What is the probability that exactly 2 file claims? {Example}
> - The number who claim is $X \sim \text{Bin}(5, 0.2)$.
> - There are $\binom{5}{2} = 10$ arrangements of 2 claims among the 5.
> - Each arrangement has probability $0.2^2 \times 0.8^3 = 0.02048$.
> - The probability is $10 \times 0.02048 = 0.2048$.

![[Media/Binomial_distribution_pmf.svg|450]]

## Mean and variance of the binomial distribution

The mean of a binomial random variable is

> $$E[X] = np$$

and its variance is

> $$\text{Var}(X) = np(1-p)$$

A binomial count is a sum of $n$ independent Bernoulli indicators, each with mean $p$ and variance $p(1-p)$, so the means and the variances add. A sum of independent Bernoulli trials with different probabilities $p_i$ is not binomial, but its mean is still $\sum p_i$ and its variance $\sum p_i(1 - p_i)$. A variable that takes two values $a$ and $b$ with probabilities $p$ and $1 - p$ has variance $p(1-p)(a - b)^2$.

> [!example]- 100 independent lives each die within the year with probability 0.02. What are the mean and standard deviation of the number of deaths? {Example}
> - The number of deaths is $\text{Bin}(100, 0.02)$.
> - The mean is $100 \times 0.02 = 2$.
> - The variance is $100 \times 0.02 \times 0.98 = 1.96$.
> - The standard deviation is $\sqrt{1.96} = 1.4$.

## Ratio of neighbouring binomial probabilities

Dividing two neighbouring binomial probabilities cancels most of the powers, so

> $$\frac{P(X = k+1)}{P(X = k)} = \frac{n-k}{k+1}\cdot\frac{p}{1-p}$$

The probabilities rise while this ratio is above 1 and fall once it is below 1, which locates the [[Mode|mode]]. Given the ratio, solve for the odds $p/(1-p)$.

> [!example]- Six independent risks each have the same probability $p$ of a loss. Exactly two losses is three times as likely as exactly one. What is $p$? {Example}
> - With $n = 6$ and $k = 1$, the ratio is $\frac{5}{2} \cdot \frac{p}{1-p} = 3$.
> - So the odds are $p/(1-p) = 1.2$.
> - The probability is $p = 1.2/2.2$, which is $0.5455$.

## When one trial has a different probability

If $n$ trials share the probability $p$ and one more trial has probability $q$, the total $N$ is not binomial. Conditioning on the different trial, by [[The Law of Total Probability|the law of total probability]], gives

> $$P(N = k) = (1-q)\,P(X = k) + q\,P(X = k-1)$$

- $X \sim \text{Bin}(n, p)$ counts the successes among the trials that share $p$.

> [!example]- Five policyholders each claim with probability 0.2, and a sixth claims with probability 0.5, all independently. What is the probability that exactly 2 claim? {Example}
> - The five alike give $P(X = 2) = 0.2048$ and $P(X = 1) = 0.4096$.
> - Conditioning on the sixth policyholder:
>
> > $$
> > \begin{aligned}
> > P(N = 2) &= 0.5(0.2048) + 0.5(0.4096) \\
> > &= 0.3072
> > \end{aligned}
> > $$

> [!trap] Using the probability of the wrong outcome
> Read which outcome the count counts. If each tourist fails to show up with probability 0.1, the number who show up is binomial with $p = 0.9$, not 0.1.

## The binomial distribution on other exams

- **FAM and ALTAM** count the survivors among $n$ independent lives with the same survival probability $p$ as $\text{Bin}(n, p)$.
- **Exam P and MAS-I** count the observations of an independent sample at or below $x$ as $\text{Bin}(n, F(x))$, which gives the distribution of [[Order Statistics|order statistics]].
- **FAM, MAS-I and ASTAM** place the binomial in the $(a, b, 0)$ class of [[Frequency Distribution|frequency distributions]], with parameters written $m$ and $q$.
- **FAM and MAS-I** approximate a binomial count by a normal distribution with mean $np$ and variance $np(1-p)$, through the [[Normal Approximation|normal approximation]].
- **MAS-II** uses the binomial probability as the likelihood of $k$ successes in $n$ trials, and pairs it with a [[Beta|beta]] prior.
- **Exam 9** counts the defaults among independent bonds as binomial.
