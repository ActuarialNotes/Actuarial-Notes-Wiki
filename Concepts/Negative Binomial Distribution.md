---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:bc3f0bf09e1ff7c904a2aece481496062791dbb702b4a12ed936aea162af8039
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

The **Negative Binomial Distribution** $X \sim \text{NegBin}(r, p)$ counts the number of independent trials needed to reach the $r$-th success, when each trial succeeds with probability $p$. This page counts *trials*, so $X$ starts at $r$.

> $$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}, \quad k = r, r+1, \ldots$$

> $$E[X] = \frac{r}{p}$$

> $$\text{Var}(X) = \frac{r(1-p)}{p^2}$$

- $r$ is the number of successes required and $p$ is the probability of success on each trial.
- With $r = 1$ it is the [[Geometric Distribution|geometric distribution]].
- The other convention counts the *failures* before the $r$-th success, $Y = X - r$, starting at 0. Its mean is $r(1-p)/p$ and its variance is the same.
- Compared with the [[Binomial Distribution|binomial]], the negative binomial fixes the number of successes and lets the number of trials vary.

> [!idea] The idea
> Waiting for the $r$-th success is $r$ geometric waits laid end to end, so the mean and the variance are $r$ times the geometric's. The last trial must be the $r$-th success. Only the first $k - 1$ trials are free to be arranged, and they hold the other $r - 1$ successes.

![[Media/Negative_binomial_pmf.svg|500]]

![[Media/Figures/Negative_Binomial_Distribution.svg|340]]

## When does the third large loss arrive?

Each claim independently has a 25% chance of being a large loss. An analyst counts claims until the third large loss. The count is $X \sim \text{NegBin}(3, 0.25)$.

| Claim $k$ | $\binom{k-1}{2}$ | $P(X = k)$ |
|---|---|---|
| 3 | 1 | 0.0156 |
| 5 | 6 | 0.0527 |
| 7 | 15 | 0.0742 |
| 9 | 28 | 0.0779 |
| 11 | 45 | 0.0704 |

- For $k = 7$, the 7th claim is the third large loss and the first 6 claims hold exactly 2 large losses. That gives $\binom{6}{2}(0.25)^3(0.75)^4 \approx 0.0742$.

> [!trap] $\binom{k}{r}$ instead of $\binom{k-1}{r-1}$
> $\binom{7}{3}$ counts 3 large losses anywhere in 7 claims. It includes orders where the third large loss came earlier. The last trial is fixed, so only the first $k - 1$ trials are arranged.

## The mean and variance as a sum of waits

The wait for the third large loss is the wait for the first, then the wait for the second, then the wait for the third. Each wait is geometric with $p = 0.25$, and the waits are independent.

- $E[X] = 3/0.25 = 12$ claims.
- $\text{Var}(X) = 3(0.75)/0.25^2 = 36$.

## The most likely claim

Which claim is most likely to be the third large loss? Compare neighbouring probabilities.

> $$\frac{P(X = k+1)}{P(X = k)} = \frac{k}{k-r+1}\,(1-p)$$

- The probabilities rise while this ratio is above 1. At $k = 8$ the ratio is $\frac{8}{6}(0.75) = 1$ exactly.
- So claims 8 and 9 tie as the [[Mode|mode]], each with probability about 0.0779. The mode sits below the mean of 12, because the distribution has a long right tail.

## Counting failures instead

Some questions count the ordinary claims before the third large loss, $Y = X - 3$.

| | Trials $X$ | Failures $Y$ |
|---|---|---|
| Values | $r, r+1, \ldots$ | $0, 1, \ldots$ |
| Mean | $r/p$ | $r(1-p)/p$ |
| Variance | $r(1-p)/p^2$ | $r(1-p)/p^2$ |

> $$P(Y = k) = \binom{k+r-1}{k}p^r(1-p)^k, \quad k = 0, 1, \ldots$$

- For the large losses, $E[Y] = 12 - 3 = 9$ ordinary claims.
- The failures form is **overdispersed**. Its variance-to-mean ratio is $1/p > 1$, where the binomial's is below 1 and the [[Poisson Distribution|Poisson]]'s is exactly 1. Here it is $36/9 = 4$.
- The trials form does not share this. Its ratio is $(1-p)/p$, below 1 whenever $p > 1/2$. With $r = 3$ and $p = 0.75$, $E[X] = 4$ but $\text{Var}(X) = 4/3$.

## Large losses before the fifth ordinary claim

What is the probability of at least 3 large losses before the 5th ordinary claim? The question is about the race between two counts.

At least $r$ successes come before the $s$-th failure exactly when the first $r + s - 1$ trials hold at least $r$ successes. If they held fewer, they would hold at least $s$ failures, and the $s$-th failure would already have come.

> $$P(r \text{ successes before } s \text{ failures}) = P(\text{Bin}(r+s-1, p) \geq r)$$

- With $r = 3$ and $s = 5$, the first 7 claims must hold at least 3 large losses. $P(\text{Bin}(7, 0.25) \geq 3) \approx 0.2436$.
- This is the classical problem of points.

## More than two kinds of claim

Split the claims into large (0.25), medium (0.35) and small (0.40). What is the probability that the third large loss is the 7th claim and exactly 2 of the claims before it are medium?

The first 6 claims hold 2 large, 2 medium and 2 small. A multinomial coefficient counts their arrangements. Each category's probability is raised to its count.

> $$P = \frac{(k-1)!}{n_1!\cdots n_m!\,(r-1)!}\;q_1^{n_1}\cdots q_m^{n_m}\,p^{r}$$

- Here $n_1, \ldots, n_m$ are the counts of the other categories before the $r$-th success and $q_1, \ldots, q_m$ their probabilities, so $n_1 + \cdots + n_m + r - 1 = k - 1$.
- $P = \frac{6!}{2!\,2!\,2!}(0.35)^2(0.40)^2(0.25)^3 = 90 \times 0.1225 \times 0.16 \times 0.015625 \approx 0.0276$.

## On other exams

- **FAM, MAS-I and ASTAM** use the Loss Models form. It counts failures and has parameters $r$ and $\beta$, with $p = 1/(1+\beta)$.

> $$P(N = k) = \frac{r(r+1)\cdots(r+k-1)\,\beta^k}{k!\,(1+\beta)^{r+k}}$$

- Its mean is $r\beta$ and its variance is $r\beta(1+\beta)$. Unlike the binomial's $m$, $r$ need not be a whole number.
- It is the overdispersed alternative to the Poisson among [[Frequency Distribution|frequency distributions]], and a member of the $(a, b, 0)$ class.
- A Poisson count whose mean $\lambda$ is itself [[Gamma|gamma]] distributed with parameters $\alpha$ and $\theta$ is negative binomial with $r = \alpha$ and $\beta = \theta$. This [[Mixture Distribution|mixture]] is why the negative binomial models claim counts across a mix of better and worse risks.

## Try it

> [!example]- Damage on the fifth hurricane {Example}
> Each hurricane independently damages a home with probability 0.4. Find the probability that the second damaging hurricane is the 5th hurricane.
>
> > [!answer]-
> > **Plan:** trials until the 2nd success, so $r = 2$, $p = 0.4$, $k = 5$.
> > $$P(X = 5) = \binom{4}{1}(0.4)^2(0.6)^3 = 4 \times 0.16 \times 0.216 \approx 0.1382$$
> > The 5th hurricane does damage, and exactly one of the first four does.

> [!example]- Rolls until two sixes {Example}
> A fair die is rolled until two sixes appear. Find the mean and variance of the number of rolls, and the mean number of rolls that are not sixes.
>
> > [!answer]-
> > **Plan:** two geometric waits with $p = 1/6$.
> > $$E[X] = \frac{2}{1/6} = 12$$
> > $$\text{Var}(X) = \frac{2(5/6)}{1/36} = 60$$
> > The rolls that are not sixes number $X - 2$, with mean 10 and the same variance 60.

> [!example]- Successes before failures {Example}
> Each underwriting review independently approves a file with probability 0.6. Find the probability that 3 approvals come before the 2nd rejection.
>
> > [!answer]-
> > **Plan:** 3 approvals before 2 rejections means at least 3 approvals in the first $3 + 2 - 1 = 4$ files.
> > $$P = \binom{4}{3}(0.6)^3(0.4) + (0.6)^4$$
> > $$P = 0.3456 + 0.1296 = 0.4752$$
> > Why 4 files? By then either 3 approvals or 2 rejections must have occurred, but not both.

> [!warning]- Exam traps
> - **Trials or failures.** The means differ by $r$. Check whether the count starts at $r$ or at 0.
> - **$\binom{k}{r}$ for the coefficient.** The last trial is the $r$-th success, so the coefficient is $\binom{k-1}{r-1}$.
> - **Overdispersion of the trials form.** Only the failures count always has variance above its mean.
> - **$\beta$ is not $p$.** In the Loss Models form, $p = 1/(1+\beta)$ and the mean is $r\beta$.
