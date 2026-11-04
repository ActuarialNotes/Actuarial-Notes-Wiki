---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:261483c3ba78ef53a4687ee0e4af25e1e690bb12d26027a798984c4195266a45
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 6.1 (sum converges absolutely), Def. 6.4 (integral of |x| f(x) finite), Theorems 6.2 and 6.10, sec. 10.3 (mu_n = E(X^n)), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-28), §6.1.3 Moment Functions (n-th moment E[X^n], n-th central moment E[(X-EX)^n], MGF exists if finite on [-a,a] for some a > 0), sha256:c0a7c6272c4e4f05d4a52ec1718dafa0e6420d9f0aed6e2898105f6de9144a4a — https://www.probabilitycourse.com/chapter6/6_1_3_moment_functions.php; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), A.2.3.1 Pareto (E[X^k] for -1 < k < alpha) (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Definitions and Basic Properties: Symmetry (distribution symmetric about a with E(X) existing gives E(X) = a; density form f(a+x) = f(a-x)), Linearity, indicator E(1_A) = P(A), conditional density f(x|A) and its conditional expected values, HTML fetched 2026-10-30, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.2 Additional Properties: N taking values in the naturals has E(N) = sum_{n>=0} P(N > n) = sum_{n>=1} P(N >= n), HTML fetched 2026-10-30, sha256:80150b157fee54ddfea427e726a32493121464235644d38eec5997fdd9ca7321 — https://www.randomservices.org/random/expect/Properties2.html; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_{X|A}(x) = f_X(x)/P(A) on A, conditional expectation as the integral against f_{X|A}; independent X, Y have f_XY = f_X f_Y and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-10-30, sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Siegrist, 4.1 Definitions and Basic Properties: Positive property (P(X >= 0) = 1 implies E(X) >= 0) and Increasing property (P(X <= Y) = 1 implies E(X) <= E(Y)) (HTML fetched 2026-10-30) — https://www.randomservices.org/random/expect/Properties.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 6.1 p.225 (PDF p.233); p.229 (PDF p.237: Law of Large Numbers justifies expected value as the average in many experiments); Theorem 6.1 p.230 (PDF p.238: E(phi(X)) = sum phi(x) m(x)); Theorem 6.2 p.231 (PDF p.239: E(X+Y) = E(X)+E(Y) for any X, Y with finite means, proof uses the joint distribution only); Theorem 6.4 and Example 6.10 p.233-234 (PDF pp.241-242: E(XY) = E(X)E(Y) if independent, fails for Y = 1 - X), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Definitions and Basic Properties: mean as the center of mass of the distribution; sample mean M_n converges to E(X) (law of large numbers); linearity in full generality; conditional expected value given A, HTML fetched 2026-11-04, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist (randomservices.org), 4.2 Additional Properties: E(N) = sum_{n>=0} P(N > n), HTML fetched 2026-11-04, sha256:80150b157fee54ddfea427e726a32493121464235644d38eec5997fdd9ca7321 — https://www.randomservices.org/random/expect/Properties2.html"
    - "Siegrist (randomservices.org), 4.5 Covariance and Correlation: cov(X, Y) = E(XY) - E(X)E(Y), HTML fetched 2026-11-04, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Wikipedia, Actuarial present value (rank 3): 'The actuarial present value (APV) is the expected value of the present value of future payments whose timing or amount depends on uncertain events', HTML fetched 2026-11-04, sha256:a7a94e68e9325bbedc91196cfdafb0b63da40edea81761905dace1de20e7e1dd — https://en.wikipedia.org/wiki/Actuarial_present_value"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 learning outcomes c) and f) (PDF p.3); Topic 3 learning outcomes c), h) (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expected Value.md
---

**Expected Value** ($E[X]$, also called the mean $\mu$) is the probability-weighted average of all values a [[Random Variable]] $X$ can take, representing its long-run average outcome.

> $$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)} \end{cases}$$

- The sum or integral must converge absolutely ($\sum_k |k|\,f(k)$ or $\int |x|\,f(x)\,dx$ finite); otherwise $X$ has no expected value — a Pareto with shape $\alpha \le 1$ has none (see [[Moment]]).
- It is linear: $E[aX + b] = aE[X] + b$
- It is monotone: if $X \le Y$ for every outcome (more generally, $P(X \le Y) = 1$), then $E[X] \le E[Y]$. Expectation preserves inequalities, so a random variable that never exceeds a constant $c$ has a mean of at most $c$, and one that is never negative has a mean of at least 0. For instance, a proportion that always lies between 0 and 1 has a mean between 0 and 1.
- The $n$-th moment of $X$ is $E[X^n]$, and the $n$-th central moment is $E[(X-\mu)^n]$

> [!idea] The idea
> Each value counts in proportion to how often it occurs, so the mean is the balance point of the distribution — the level the average of many independent repetitions settles at. A rare but large value can therefore move it a long way: in the claim-size example below, a $\$500$ claim that happens one time in five supplies $\$100$ of the $\$130$ mean. And because it is a weighted sum, the expected value of a total is the total of the expected values, whether or not the pieces are independent.

![[Media/Figures/Expected_Value.svg|340]]

### Other ways to compute it

- **Symmetry.** If a density is symmetric about a point $c$, that is $f(c + t) = f(c - t)$ for all $t$, and $E[X]$ exists, then $E[X] = c$.
- **Tail sum.** For $N$ taking values $0, 1, 2, \ldots$, the mean is the sum of the survival probabilities:

> $$E[N] = \sum_{k=0}^{\infty} P(N > k) = \sum_{k=1}^{\infty} P(N \ge k)$$

- For a count capped at $m$, $P(\min(N, m) > k)$ is $P(N > k)$ for $k < m$ and $0$ for $k \ge m$, so the tail sum stops at $m - 1$: $E[\min(N, m)] = \sum_{k=0}^{m-1} P(N > k)$.
- **Expected excess of a count.** For an integer $c \ge 1$, $\max(N - c, 0) = (N - c) + \sum_{n=0}^{c-1} (c - n)\,1\{N = n\}$: extending the sum over $n \ge c$ to all $n$ gives $E[N - c]$, and the terms $n < c$ it subtracted are added back.

> $$E[\max(N - c, 0)] = E[N] - c + \sum_{n=0}^{c-1} (c - n)\, P(N = n)$$

- For $c = 1$ this is $E[\max(N - 1, 0)] = E[N] - 1 + P(N = 0)$.
- **Mean given an event.** For an event $A$ with $P(A) > 0$, the conditional mean uses the conditional density $f(x)/P(A)$ on $A$ (and 0 off it), so $E[X \mid A] = E[X \cdot 1_A] / P(A)$. For $A = \{X < c\}$ the numerator integrates $x f(x)$ over the restricted range only:

> $$E[X \mid X < c] = \frac{\int_{-\infty}^{c} x\, f(x)\, dx}{F(c)}$$

> [!example]- Expected Payout on a Simple Policy {Example}
> A discrete random variable $X$ (claim size) has PMF: $P(X=0)=0.5$, $P(X=100)=0.3$, $P(X=500)=0.2$. Find $E[X]$.
>
> > [!answer]-
> > $$E[X] = 0(0.5) + 100(0.3) + 500(0.2) = 0 + 30 + 100 = 130$$
> > On average, the insurer expects to pay \$130 per claim.

> [!tip]- How it appears on the exam
> - **Exam P** (Univariate Random Variables, objectives 3 and 6): the expected payment on a policy — a deductible, a limit, a benefit schedule or a payment that varies with the loss — from a PMF, a density (often in pieces) or a CDF.
> - **Exam P** (Multivariate Random Variables): the expected value of a function of two variables, a sum, or a conditional mean, from a joint distribution.
> - **MAS-I**: expected counts and waiting times in Poisson processes, and moments of loss distributions and their transformations. **MAS-II**: the expected values inside credibility — the expected value of the process variance, the variance of the hypothetical means, the prior mean.
> - **FAM** and **ALTAM**: an actuarial present value is the expected value of a present value random variable, so insurance and annuity questions are expected-value questions in life-contingency notation.

> [!warning]- Exam traps
> - **$E[g(X)]$ is not $g(E[X])$.** Plugging the mean into a nonlinear function — $(E[X])^2$ for $E[X^2]$, or $\max(E[X] - d, 0)$ for the expected payment after a deductible — gives a wrong number. Average $g$ over the distribution: $\sum g(k) f(k)$ or $\int g(x) f(x)\,dx$.
> - **Per loss or per payment.** The expected payment per *loss* averages over every loss, zeros included; per *payment* is the conditional mean given that a payment is made, so it divides by the probability of a payment. Read which one the question asks for.
> - **The tail sum's first term.** $E[N] = \sum_{k=0}^{\infty} P(N > k)$ starts at $k = 0$; starting the $P(N > k)$ sum at $k = 1$ drops $P(N > 0)$ and understates the mean.
> - **Linearity is not a product rule.** $E[X + Y] = E[X] + E[Y]$ always holds, but $E[XY] = E[X]\,E[Y]$ needs independence, or at least zero covariance. With dependent variables, compute $E[XY]$ from the joint distribution.
