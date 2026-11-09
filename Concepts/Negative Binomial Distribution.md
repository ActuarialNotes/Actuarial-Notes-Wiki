---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:b5088d1b43d4259afca2d80ae86067450d13ffb0d4bbb43793587e6a76c55cb9
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 negative binomial: toss until the k-th head, X = number of tosses, u(x,k,p) = C(x-1,k-1)p^k q^(x-k), k=1 geometric, pp.186-187 (PDF pp.194-195), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 11.4 The Negative Binomial Distribution: V_k trial number of the k-th success, E = k/p, var = k(1-p)/p^2; W_k = V_k - k failures, pdf C(n+k-1,n)p^k(1-p)^n, mode at floor((k-1)(1-p)/p) with two modes when integer; the problem of points, sha256:090f2543374cd589ff963f4addb35f897d0bd1c0c8ff5c08cc7086f659858916 — https://www.randomservices.org/random/bernoulli/NegativeBinomial.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-11-06), 11.5 The Multinomial Distribution: multinomial coefficient and product of category probabilities, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html"
    - "CAS, Tables for Exam MAS-I (version date 01/15/2018, linked from the CAS MAS-I exam page), p.1 (tables used when writing MAS-I questions); p.15 Appendix B.2 (a,b,0) class: B.2.1.1 Poisson, B.2.1.2 geometric-beta, B.2.1.3 binomial-q,m, B.2.1.4 negative binomial-beta,r, sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
    - "Daniel, \"Poisson Processes (and Mixture Distributions)\", CAS study note (June 2008), MAS-I reading, Definition & Properties 1.21 negative binomial (r, beta), Pr[M=k] = r(r+1)...(r+k-1) beta^k / (k!(1+beta)^(k+r)), E = r beta; Poisson mixed over Gamma(alpha, theta) is negative binomial with r = alpha, beta = theta (PDF pp.11-12), sha256:aca974b4085c586e0aadb1461460aa42444310b5ab1986fc5b38ea2aa540ba01 — https://www.casact.org/library/studynotes/3_Poisson_2008.pdf"
    - "SOA, Exam FAM syllabus (2027 February), Topic 2 outcomes e)-j) (a,b,0) frequency, individual risk model, normal approximation, p.3; readings Loss Models Ch. 6, p.8, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
    - "SOA, Exam ASTAM syllabus (October 2026), Topic 2 a) aggregate claims with (a,b,0) or (a,b,1) frequency, p.2; Loss Models readings, p.6, sha256:6d462aea25c09b15cc457176ecf2d5d6143df8fb88df9f366557de17ec1ec9ba — https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf"
    - "Bahnemann, Distributions for Actuaries, CAS Monograph No. 2 (Exam 8 reading), §3.4 Negative Binomial Distributions, eq. (3.19): f(n) = C(r+n-1,n) q^r (1-q)^n, parameters r and q, PDF p.101 (page image read), sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Negative Binomial Distribution.md
---

![[Media/Figures/Negative_Binomial_Distribution.svg|340]]

A **Negative Binomial Distribution** is the distribution of the number of independent trials needed to reach the $r$th success, when each trial succeeds with probability $p$. The probability that the $r$th success comes on trial $k$ is

> $$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}$$

- $X$ is the number of trials.
- $k = r, r+1, r+2, \ldots$.
- $\binom{k-1}{r-1}$ is the number of ways to place the first $r - 1$ successes among the first $k - 1$ trials. The $k$th trial is the $r$th success.

With $r = 1$, it is the [[Geometric Distribution|geometric distribution]].

> [!idea] The idea
> Waiting for the $r$th success is $r$ independent geometric waits laid end to end.

> [!example]- Each claim independently has a 25% chance of being a large loss. What is the probability that the 7th claim is the third large loss? {Example}
> - The count of claims is negative binomial with $r = 3$ and $p = 0.25$.
> - The 7th claim must be a large loss, and the first 6 claims must hold exactly 2 large losses.
> - There are $\binom{6}{2} = 15$ ways to place those 2.
>
> $$
> \begin{aligned}
> P(X = 7) &= 15\,(0.25)^3(0.75)^4 \\
> &= 0.0742
> \end{aligned}
> $$

![[Media/Negative_binomial_pmf.svg|500]]

## Mean and variance

The mean and the variance of the number of trials $X$ are

> $$E[X] = \frac{r}{p}$$

> $$\text{Var}(X) = \frac{r(1-p)}{p^2}$$

Each is $r$ times the geometric's, because the $r$ waits are independent.

> [!example]- A fair die is rolled until two sixes appear. What are the mean and the variance of the number of rolls? {Example}
> - The number of rolls is negative binomial with $r = 2$ and $p = 1/6$.
> - $E[X] = 2 \div \frac{1}{6} = 12$.
> - $\text{Var}(X) = \dfrac{2 \cdot \frac{5}{6}}{1/36} = 60$.

## Counting failures before the $r$th success

Some questions count the failures before the $r$th success, $Y = X - r$. Its probabilities are

> $$P(Y = k) = \binom{k+r-1}{k}p^r(1-p)^k$$

- $k = 0, 1, 2, \ldots$.

Its mean is $r(1-p)/p$, which is $r$ less than the mean of $X$. Its variance is the same as that of $X$, $r(1-p)/p^2$.

The variance of $Y$ is greater than its mean. That makes it the **overdispersed** count, where a [[Poisson Distribution|Poisson]] count has variance equal to its mean and a [[Binomial Distribution|binomial]] count has variance below it.

> [!example]- Each underwriting review approves a file with probability 0.6. What is the expected number of rejections before the 3rd approval? {Example}
> - The rejections before the 3rd approval are $Y$, with $r = 3$ and $p = 0.6$.
> - $E[Y] = \dfrac{3 \times 0.4}{0.6} = 2$.

> [!trap] Counting trials or counting failures
> The two forms differ by $r$. Two sixes take 12 rolls on average, but only 10 of them are not sixes. Check whether the count starts at $r$ or at 0.

## Successes before a number of failures

At least $r$ successes come before the $s$th failure exactly when the first $r + s - 1$ trials hold at least $r$ successes. Writing $n = r + s - 1$, the probability is

> $$\sum_{j=r}^{n} \binom{n}{j}p^j(1-p)^{n-j}$$

- $j$ is the number of successes in the first $n$ trials.

> [!example]- Each underwriting review approves a file with probability 0.6. What is the probability that 3 approvals come before the 2nd rejection? {Example}
> - With $r = 3$ and $s = 2$, the first $n = 4$ files must hold at least 3 approvals.
> - $P(3 \text{ approvals}) = \binom{4}{3}(0.6)^3(0.4) = 0.3456$.
> - $P(4 \text{ approvals}) = (0.6)^4 = 0.1296$.
> - The probability is $0.3456 + 0.1296 = 0.4752$.

## The form used on later exams

FAM, MAS-I and ASTAM count failures and write the negative binomial with parameters $r$ and $\beta$, where $p = 1/(1+\beta)$. The probability of $k$ failures is

> $$P(N = k) = \binom{k+r-1}{k}\frac{\beta^k}{(1+\beta)^{r+k}}$$

- $k = 0, 1, 2, \ldots$.
- $\binom{k+r-1}{k} = \frac{r(r+1)\cdots(r+k-1)}{k!}$, so $r$ need not be a whole number.

Its mean is $r\beta$ and its variance is $r\beta(1+\beta)$. Its probability of zero is $(1+\beta)^{-r}$.
