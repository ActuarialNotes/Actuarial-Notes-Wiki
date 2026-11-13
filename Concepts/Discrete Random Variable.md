---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:52b6c1d678f572611d701336afd3c7486654a439e878f23a156c84c6a31155a4
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 1.1 p.18 (PDF p.26): discrete = finite or countably infinite sample space, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §3.2.1 CDF: F_X(x)=P(X<=x), defined for discrete, continuous and mixed; discrete CDF a staircase, jump = P(X=x), sha256:ddcdb7ea63d9e918e1d8e69af197212e089af8cf665730306927c861bd3f5f6f — https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 7.1 p.286 (PDF p.294): convolution m3(j)=sum_k m1(k)m2(j-k) for independent integer-valued X, Y, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.1 Expected value: definitions (discrete, continuous, mixed), may not exist, change of variables, increasing property P(X<=Y)=1, symmetry -> E(X)=a, independence E(XY)=E(X)E(Y), E(X|A) via conditional density, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.9 Expected value as an integral: E(X)=int_0^inf P(X>x)dx for X>=0; E(X)=sum_{k>=1} P(X>=k) on N; E(X;A)=E(X 1_A), sha256:13db7b0f6f791843abcef65cf16e1214b8e745e3f9eeac74e01cc96fa3a032bc — https://www.randomservices.org/random/expect/Integral.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 14.4 Poisson distribution: M+N Poisson with parameter a+b for independent Poisson M, N, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.5 Covariance and correlation: cov=E(XY)-E(X)E(Y); cor=cov/(sd sd); var(X+Y)=var(X)+var(Y)+2cov(X,Y), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §5.1.3 conditional PMF P_{X|Y}=P_{XY}/P_Y, sha256:937740fa7d0feecdb1a09585b50e5fc6bea5ed4cfae6425ad7aa56855a0f58e4 — https://www.probabilitycourse.com/chapter5/5_1_3_conditioning_independence.php"
    - "SOA, Exam P syllabus, November 2026, Topic 3 Multivariate Random Variables, LOs a)-i), incl. g) linear combinations of independent discrete and of normal random variables (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discrete Random Variable.md
---

A **Discrete Random Variable** is a [[Random Variable|random variable]] whose possible values form a finite or countably infinite set. The probability that a discrete random variable $X$ takes the value $x$ is its [[Probability Mass Function (PMF)|probability mass function]]:

> $$f(x) = P(X = x)$$

- $f(x) \ge 0$ for every $x$, and $\sum_x f(x) = 1$.

> [!example]- A policyholder's number of claims $X$ in a year is 0, 1, 2 or 3 with probabilities 0.60, 0.25, 0.10 and $f(3)$. What is $f(3)$? {Example}
> - The probabilities must add to 1.
> - $f(3)$ is $1 - 0.60 - 0.25 - 0.10$, which is $0.05$.

## Probabilities of events

The probability of an event is the sum of $f$ over the values in it. The [[Cumulative Distribution Function (CDF)|cumulative distribution function]] is

> $$F(x) = P(X \le x) = \sum_{k \le x} f(k)$$

Each value carries its own probability, so whether an endpoint is included matters: $P(X \le k) = P(X < k) + f(k)$.

For an integer-valued $X$ and a number $x$ that is not an integer, $P(X > x) = P(X \ge \lceil x \rceil)$, where $\lceil x \rceil$ is the next integer above $x$. More claims than a mean of 0.6 means at least 1 claim.

> [!example]- For the claim count above, what are the probabilities of fewer than 2 claims and of at least 2 claims? {Example}
> - "Fewer than 2" is $X \le 1$, so its probability is $F(1) = 0.60 + 0.25$, which is $0.85$.
> - "At least 2" is its complement, $1 - 0.85 = 0.15$.

> [!trap] Strict or weak inequality
> "Fewer than 2 claims" is $P(X \le 1) = 0.85$. Reading it as $P(X \le 2) = 0.95$ adds $f(2) = 0.10$. Write "fewer than", "at most" and "at least" as a set of values before summing.

## Expected value of a function

The [[Expected Value|expected value]] of a function $g(X)$ weights each value $g(x)$ by its probability:

> $$E[g(X)] = \sum_x g(x)\,f(x)$$

> [!example]- For the claim count above, what are $E[X]$, $E[X^2]$ and the variance? {Example}
> - $E[X]$ is $1(0.25) + 2(0.10) + 3(0.05)$, which is $0.60$.
> - With $g(x) = x^2$, $E[X^2]$ is $1(0.25) + 4(0.10) + 9(0.05)$, which is $1.10$.
> - The [[Variance|variance]] is $E[X^2] - (E[X])^2$, which is $1.10 - 0.60^2 = 0.74$.

## Sum of two independent discrete random variables

The probability that the sum of independent discrete random variables $X$ and $Y$ equals $s$ adds every pair of values that sums to $s$:

> $$P(X + Y = s) = \sum_x P(X = x)\,P(Y = s - x)$$

> [!example]- The claim count $X$ above and an independent count $Y$, with $P(Y = 0) = 0.7$ and $P(Y = 1) = 0.3$, are added. What is the probability that the total is at least 2? {Example}
> - $P(X + Y = 0) = 0.60(0.7) = 0.420$.
> - $P(X + Y = 1)$ is $0.25(0.7) + 0.60(0.3)$, which is $0.355$.
> - $P(X + Y \ge 2)$ is $1 - 0.420 - 0.355$, which is $0.225$.

When $X$ and $Y$ are not independent, each pair's probability comes from their [[Joint Probability Function|joint probability function]] instead of the product.
