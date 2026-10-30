---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:61587671ef8848221df38c6bee525c4a30e1fc4d42458df33ec169e76f807b46
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 6.1 (sum converges absolutely), Def. 6.4 (integral of |x| f(x) finite), Theorems 6.2 and 6.10, sec. 10.3 (mu_n = E(X^n)), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-28), §6.1.3 Moment Functions (n-th moment E[X^n], n-th central moment E[(X-EX)^n], MGF exists if finite on [-a,a] for some a > 0), sha256:c0a7c6272c4e4f05d4a52ec1718dafa0e6420d9f0aed6e2898105f6de9144a4a — https://www.probabilitycourse.com/chapter6/6_1_3_moment_functions.php"
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), A.2.3.1 Pareto (E[X^k] for -1 < k < alpha) (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Definitions and Basic Properties: Symmetry (distribution symmetric about a with E(X) existing gives E(X) = a; density form f(a+x) = f(a-x)), Linearity, indicator E(1_A) = P(A), conditional density f(x|A) and its conditional expected values, HTML fetched 2026-10-30, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.2 Additional Properties: N taking values in the naturals has E(N) = sum_{n>=0} P(N > n) = sum_{n>=1} P(N >= n), HTML fetched 2026-10-30, sha256:80150b157fee54ddfea427e726a32493121464235644d38eec5997fdd9ca7321 — https://www.randomservices.org/random/expect/Properties2.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_{X|A}(x) = f_X(x)/P(A) on A, conditional expectation as the integral against f_{X|A}; independent X, Y have f_XY = f_X f_Y and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-10-30, sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expected Value.md
---

**Expected Value** ($E[X]$, also called the mean $\mu$) is the probability-weighted average of all values a [[Random Variable]] $X$ can take, representing its long-run average outcome.

> $$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)} \end{cases}$$

- The sum or integral must converge absolutely ($\sum_k |k|\,f(k)$ or $\int |x|\,f(x)\,dx$ finite); otherwise $X$ has no expected value — a Pareto with shape $\alpha \le 1$ has none (see [[Moment]]).
- It is linear: $E[aX + b] = aE[X] + b$
- The $n$-th moment of $X$ is $E[X^n]$, and the $n$-th central moment is $E[(X-\mu)^n]$

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
