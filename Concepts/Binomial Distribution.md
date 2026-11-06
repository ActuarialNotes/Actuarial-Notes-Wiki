---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:85a4cc7f20034163dac9d5642d1cfa39658f9dd15557c4ef52525c19e148764a
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

The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ independent trials, each with the same probability of success $p$.

> $$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad k = 0, 1, \ldots, n$$

> $$E[X] = np$$

> $$\text{Var}(X) = np(1-p)$$

- The trials must be independent, each must have exactly two outcomes, and $p$ must be the same on every trial.
- The **Bernoulli** distribution is the case $n = 1$, a single trial that is 1 with probability $p$ and 0 otherwise.
- Compared with the [[Hypergeometric Distribution|hypergeometric]], the binomial draws with replacement, so the trials stay independent.

> [!idea] The idea
> Any one arrangement of $k$ successes and $n - k$ failures has probability $p^k(1-p)^{n-k}$, because the trials are independent. The binomial coefficient counts how many such arrangements there are. So the count is the probability of one arrangement times the number of arrangements.

![[Media/Binomial_distribution_pmf.svg|450]]

![[Media/Figures/Binomial_Distribution.svg|340]]

## How many of five policyholders claim?

A group of 5 policyholders each files a claim in the year with probability 0.2, independently. The number who claim is $X \sim \text{Bin}(5, 0.2)$.

| Claims $k$ | Arrangements $\binom{5}{k}$ | $P(X = k)$ |
|---|---|---|
| 0 | 1 | 0.3277 |
| 1 | 5 | 0.4096 |
| 2 | 10 | 0.2048 |
| 3 | 10 | 0.0512 |
| 4 | 5 | 0.0064 |
| 5 | 1 | 0.0003 |

- One claim is the most likely count. Two claims has twice as many arrangements as one, but each arrangement is a quarter as likely.
- "At least one claim" is the complement of none, $1 - 0.8^5 = 0.6723$.

## The mean and variance as a sum of single trials

Each policyholder is a Bernoulli indicator $I_j$ that is 1 if they claim. The count is the sum, $X = I_1 + \cdots + I_5$.

- An indicator has $I_j^2 = I_j$, so $E[I_j] = E[I_j^2] = p$ and $\text{Var}(I_j) = p - p^2 = p(1-p)$.
- Expected values add, so $E[X] = 5(0.2) = 1$.
- Variances of independent trials add, so $\text{Var}(X) = 5(0.2)(0.8) = 0.8$.
- The same holds for a 0/1 variable under a conditional distribution, with $p$ the conditional probability of a 1.

## Comparing two probabilities

A question may say that one count is some multiple as likely as another. Dividing two binomial probabilities cancels the common powers of $p$ and $1 - p$. What is left is a ratio of coefficients and a power of the odds $p/(1-p)$.

> $$\frac{P(X = j)}{P(X = k)} = \frac{\binom{n}{j}}{\binom{n}{k}}\left(\frac{p}{1-p}\right)^{j-k}$$

For neighbouring counts the ratio is simpler.

> $$\frac{P(X = k+1)}{P(X = k)} = \frac{n-k}{k+1}\cdot\frac{p}{1-p}$$

- For the five policyholders, $P(X = 2)/P(X = 1) = \frac{4}{2} \times \frac{0.2}{0.8} = 0.5$, which matches $0.2048 / 0.4096$.
- The probabilities rise while this ratio is above 1 and fall once it drops below 1. That locates the [[Mode|mode]].
- Given a ratio, solve the equation for the odds $p/(1-p)$, or for $n$.

## When one trial is different

Add a sixth policyholder who claims with probability 0.5. The six trials no longer share one $p$, so the total $N$ is not binomial. Condition on the sixth policyholder and add the two cases, using [[The Law of Total Probability|the law of total probability]].

> $$P(N = k) = (1-q)\,P(B = k) + q\,P(B = k-1)$$

- Here $B \sim \text{Bin}(5, 0.2)$ counts the five alike and $q = 0.5$ is the sixth policyholder's probability.
- $P(N = 2) = 0.5(0.2048) + 0.5(0.4096) = 0.3072$.
- With several differing trials, list which of them succeed. Multiply each case by the binomial probability for the identical trials, then add the cases.

## Where the successes fall

Sometimes the order of the trials matters. The first success comes on trial $j$ with $k$ successes in all exactly when trials $1, \ldots, j-1$ fail, trial $j$ succeeds, and the other $k-1$ successes fall among the $n - j$ later trials. By independence the pieces multiply.

> $$P(\text{first on } j,\ X = k) = (1-p)^{j-1}\,p\,\binom{n-j}{k-1}p^{k-1}(1-p)^{n-j-k+1}$$

- For the five policyholders, the first claim is the second policyholder's and exactly 2 claim with probability $0.8 \times 0.2 \times 3 \times 0.2 \times 0.8^2 = 0.0614$.

Given the count, the positions are equally likely. Given $X = k$, every one of the $\binom{n}{k}$ sets of positions has conditional probability $1/\binom{n}{k}$, whatever $p$ is.

- Given that exactly 2 of the 5 claimed, the first claim is the second policyholder's when the pair is $\{2,3\}$, $\{2,4\}$ or $\{2,5\}$. That is 3 of the 10 pairs, so 0.3.
- Check: $0.0614 / 0.2048 = 0.3$. The probability $p$ cancels.

## On other exams

- **FAM, MAS-I and ASTAM** place the binomial in the $(a, b, 0)$ class of [[Frequency Distribution|frequency distributions]], whose probabilities satisfy $p_k / p_{k-1} = a + b/k$. For the binomial, $a = -p/(1-p)$ and $b = (n+1)p/(1-p)$. The Loss Models tables write the parameters as $m$ and $q$.
- **FAM and MAS-I** approximate a binomial count of survivors, claims or failures by a normal distribution with mean $np$ and variance $np(1-p)$, through the [[Normal Approximation|normal approximation]].
- **MAS-I** tests a Bernoulli sample in hypothesis tests, and counts the events of a [[Poisson Process|Poisson process]] by an earlier time given the count at a later time. That conditional count is binomial.
- **MAS-II** pairs a binomial likelihood with a [[Beta|beta]] prior. The posterior is again beta, which makes the beta the [[Conjugate Prior|conjugate prior]] for $p$.

## Try it

> [!example]- Claims in a group policy {Example}
> A group of 10 policyholders each independently files a claim with probability 0.3. Find the probability that exactly 4 file claims.
>
> > [!answer]-
> > **Plan:** a fixed number of independent trials with one $p$ is binomial, $X \sim \text{Bin}(10, 0.3)$.
> > $$P(X = 4) = \binom{10}{4}(0.3)^4(0.7)^6 \approx 0.2001$$
> > There are 210 arrangements, each with probability $0.3^4 \times 0.7^6$.

> [!example]- Solving for p from a ratio {Example}
> Six independent risks each have the same probability $p$ of a loss. Exactly two losses is three times as likely as exactly one. Find $p$.
>
> > [!answer]-
> > **Plan:** divide the two probabilities so the powers cancel, then solve for the odds.
> > $$\frac{P(X = 2)}{P(X = 1)} = \frac{15}{6}\cdot\frac{p}{1-p} = 3$$
> > So $p/(1-p) = 1.2$ and $p = 1.2/2.2 \approx 0.5455$.

> [!example]- Three out of five {Example}
> A system has five independent components, each working with probability 0.9. The system works if at least three components work. Find the probability that the system works.
>
> > [!answer]-
> > **Plan:** the number working is $\text{Bin}(5, 0.9)$, and the system needs at least 3.
> > $$P(X \geq 3) = 10(0.9)^3(0.1)^2 + 5(0.9)^4(0.1) + (0.9)^5$$
> > $$P(X \geq 3) = 0.0729 + 0.32805 + 0.59049 = 0.99144$$

> [!warning]- Exam traps
> - **Leaving out the coefficient.** $p^k(1-p)^{n-k}$ is one arrangement. Multiply by $\binom{n}{k}$ unless the question fixes the order.
> - **Binomial on a small pool.** Drawing without replacement from a few dozen items is hypergeometric. Use the binomial only with replacement or a very large pool.
> - **Unequal probabilities.** Trials with different $p$ do not give a binomial total. Condition on the trial that differs.
> - **Using $p$ after conditioning on the count.** Given $X = k$, all position sets are equally likely, and $p$ drops out of the answer.
