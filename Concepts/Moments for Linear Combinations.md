---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:270bb0fdcd746905c4384fe04e8424bba7b9a358fd04484b694a7bd3fe41c9f1
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 6.2 (printed p.231, PDF p.239), Thms 6.7-6.8 (printed p.259, PDF p.267), Ex. 6.3.17 (printed p.281, PDF p.289), Thms 6.10, 6.14, 6.16 (printed pp.269-272, PDF pp.277-280), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q80 (PDF p.25), Q86 (PDF pp.26-27), Q301 (PDF p.84), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 3 (Multivariate Random Variables) learning outcomes g-i, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moments for Linear Combinations.md
---

**Moments for Linear Combinations** give the expected value and variance of any weighted sum $W = a_1 X_1 + a_2 X_2 + \cdots + a_n X_n$ of random variables. These results underlie the [[Central Limit Theorem]] and are used to compute the [[Expected Value]] and [[Variance]] of aggregate loss models.

> $$E[W] = a_1 E[X_1] + a_2 E[X_2] + \cdots + a_n E[X_n]$$

> $$\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i) + 2\sum_{i < j} a_i a_j \,\text{Cov}(X_i, X_j)$$

- When the variables are [[Independent Random Variables]], all covariance terms vanish:

> $$\text{Var}(W) = \sum_{i=1}^n a_i^2 \,\text{Var}(X_i)$$

![[Media/Figures/Moments_for_Linear_Combinations.svg|340]]

> [!example]- Portfolio of Two Risks {Example}
> $X_1 \sim (E=100, \text{Var}=400)$ and $X_2 \sim (E=150, \text{Var}=900)$, independent. Find $E[X_1+X_2]$ and $\text{Var}(X_1+X_2)$.
>
> > [!answer]-
> > $$E[X_1+X_2] = 100 + 150 = 250$$
> > $$\text{Var}(X_1+X_2) = 400 + 900 = 1300 \implies \text{SD} = \sqrt{1300} \approx 36.06$$
