---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:cdc03a133b9ee53d080b5f81b56fcc2791cb5edc12b7c18bb14ff15bde60b3db
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 6.1 (sum converges absolutely), Def. 6.4 (integral of |x| f(x) finite), Theorems 6.2 and 6.10, sec. 10.3 (mu_n = E(X^n)), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-28), §6.1.3 Moment Functions (n-th moment E[X^n], n-th central moment E[(X-EX)^n], MGF exists if finite on [-a,a] for some a > 0), sha256:c0a7c6272c4e4f05d4a52ec1718dafa0e6420d9f0aed6e2898105f6de9144a4a — https://www.probabilitycourse.com/chapter6/6_1_3_moment_functions.php"
    - "SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), A.2.3.1 Pareto (E[X^k] for -1 < k < alpha) (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
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

> [!example]- Expected Payout on a Simple Policy {Example}
> A discrete random variable $X$ (claim size) has PMF: $P(X=0)=0.5$, $P(X=100)=0.3$, $P(X=500)=0.2$. Find $E[X]$.
>
> > [!answer]-
> > $$E[X] = 0(0.5) + 100(0.3) + 500(0.2) = 0 + 30 + 100 = 130$$
> > On average, the insurer expects to pay \$130 per claim.
