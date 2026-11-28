---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:18f2272b0d1bab03a271e0aeae6ccb7b93be6cb72a087c3ee1ef7d11b02331fc
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 3.5 PDF p.104; §5.1 geometric pmf and P(T>k)=q^k, memoryless, PDF pp.192-194; Ex. 6.19 E=1/p, V=q/p^2, PDF p.270, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "CAS, Tables for Exam MAS-I (version date 01/15/2018), p.1; Appendix B.2.1.1-B.2.1.4, p.15, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "SOA, Exam FAM syllabus (2027 February), Topic 2 e)-j), p.3; Loss Models readings, p.8, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Geometric Distribution.md
---

![[Media/Figures/Geometric_Distribution.svg|340]]

A **Geometric Distribution** is the distribution of the number of independent trials up to and including the first success, when each trial succeeds with the same probability $p$. For a geometric random variable $X$, the probability that the first success comes on trial $k$ is

> $$P(X = k) = (1-p)^{k-1}p$$

- $k = 1, 2, 3, \ldots$

> [!idea] The idea
> The first success comes on trial $k$ only if the $k - 1$ trials before it all fail.

> [!example]- Each policy in a file independently has a 20% chance of a claim. An analyst reviews policies one at a time. What is the probability that the first claim is on the 3rd policy? {Example}
> - The first two policies have no claim, each with probability 0.8.
> - The third has a claim, with probability 0.2.
> - The probability is $0.8^2 \times 0.2 = 0.128$.

![[Media/Geometric_pmf.svg|500]]

## Mean and variance of the geometric distribution

The mean of a geometric random variable is

> $$E[X] = \frac{1}{p}$$

and its variance is

> $$\text{Var}(X) = \frac{1-p}{p^2}$$

> [!example]- Each policy has a 20% chance of a claim. How many policies does the analyst expect to review up to and including the first claim, and with what variance? {Example}
> - The mean is $1/0.2 = 5$ policies.
> - The variance is $0.8/0.2^2 = 20$.

## Probability that the first success comes after trial $n$

More than $n$ trials are needed exactly when the first $n$ trials all fail, so

> $$P(X > n) = (1-p)^n$$

It follows that $P(X \le n) = 1 - (1-p)^n$, and $P(X \ge n) = (1-p)^{n-1}$.

> [!example]- Each policy has a 20% chance of a claim. What is the probability that none of the first 3 policies has a claim? {Example}
> - No claim in the first 3 is the event $X > 3$.
> - $P(X > 3) = 0.8^3 = 0.512$.

## Memorylessness

The geometric distribution is memoryless. Given that the first $m$ trials failed, the remaining wait has the same geometric distribution:

> $$P(X > m + n \mid X > m) = P(X > n)$$

Because the trials are independent, conditioning on earlier trials leaves the later ones unchanged. If a die's first roll is known not to be a 5, the wait for a 5 starts again on roll 2 with the same $p = 1/6$.

> [!example]- Eight policies have been reviewed with no claim. Each has a 20% chance of a claim. What is the probability that the first claim comes after the 10th policy? {Example}
> - By memorylessness, $P(X > 10 \mid X > 8) = P(X > 2)$.
> - $P(X > 2) = 0.8^2 = 0.64$.

> [!trap] Counting the wait from the start
> After 8 failures, the remaining wait is geometric from the next trial. Answering $0.8^{10} = 0.107$ ignores the condition.

## Counting failures before the first success

Some questions count the failures before the first success, $N = X - 1$, which starts at 0. Its probability function is

> $$P(N = k) = (1-p)^k p$$

- $k = 0, 1, 2, \ldots$

Its mean is $(1-p)/p$, one less than the mean of $X$, and its variance is the same, $(1-p)/p^2$. Loss Models (FAM, MAS-I) writes this form with $\beta = (1-p)/p$:

> $$P(N = k) = \frac{\beta^k}{(1+\beta)^{k+1}}$$

- $\beta$ is the mean, and the variance is $\beta(1 + \beta)$.

> [!example]- A claim count has $P(N = k) = \frac{1}{3}\left(\frac{2}{3}\right)^k$ for $k = 0, 1, 2, \ldots$. What are $E[N]$, $\text{Var}(N)$ and $P(N \ge 3)$? {Example}
> - The support starts at 0, so this is the failures form with $p = 1/3$.
> - The mean is $(2/3)/(1/3) = 2$.
> - The variance is $(2/3)/(1/9) = 6$.
> - $N \ge 3$ means the first 3 trials fail, so $P(N \ge 3) = (2/3)^3 = 0.2963$.

## The first event in a sequence of periods

When each period, such as a year, independently has the same probability $q$ of an event, the period of the first event is geometric with $p = q$. A life with a constant probability $q$ of dying each year, given survival to the start of it, dies in year $k$ with probability $(1-q)^{k-1}q$. The probability of being alive at the start of year $k$ is the product of the one-year [[Survival Model|survival]] probabilities before it.

> [!example]- A driver's accidents each year are Poisson with mean 0.2, independently from year to year. What is the probability that the first accident is in year 4? {Example}
> - A year has an accident with probability $1 - e^{-0.2}$.
> - The first 3 years have none, with probability $e^{-0.2 \times 3} = e^{-0.6}$.
> - The probability is $e^{-0.6}(1 - e^{-0.2})$, which is $0.0995$.
