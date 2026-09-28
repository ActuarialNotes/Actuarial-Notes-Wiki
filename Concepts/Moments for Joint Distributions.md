---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:8357cdd72fbf31504c7e8457e1b6cbb7893f6f41e9e19ea5189cedf973bc9a9b
  sources:
    - "Siegrist, Random (randomservices.org), Expected Value > Basic Properties, Change of Variables Theorem, discrete case E[r(X)] = sum_{x in S} r(x) f(x) for X with values in a general set S, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist, Random: Probability, Mathematical Statistics, Stochastic Processes (randomservices.org), Expected Value > Covariance and Correlation (definitions; cov = E(XY)-E(X)E(Y); independent implies uncorrelated, converse fails; correlation dimensionless), sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Exercise 6.3.17(a)-(b) p.281 (PDF p.289), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Probability Exam syllabus, November 2026, Topic 3 Multivariate Random Variables, learning outcomes 3a-3f, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Moments for Joint Distributions.md
---

**Moments for joint distributions** generalize [[Expected Value]] to functions of multiple random variables. [[Covariance]] is computed from these moments as $\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$.

> $$E[X] = \sum_x \sum_y x\,p(x,y)$$

> $$E[Y] = \sum_x \sum_y y\,p(x,y)$$

> $$E[XY] = \sum_x \sum_y xy\,p(x,y)$$

> $$E[g(X,Y)] = \sum_x \sum_y g(x,y)\,p(x,y)$$

- For [[Independent Random Variables]], $E[XY] = E[X]E[Y]$, so $\text{Cov}(X,Y) = 0$

![[Media/Figures/Moments_for_Joint_Distributions.svg|340]]

> [!example]- Computing E[XY] {Example}
> Joint PMF: $p(0,0)=0.3$, $p(0,1)=0.2$, $p(1,0)=0.1$, $p(1,1)=0.4$.
>
> > [!answer]-
> > $$E[XY] = (0)(0)(0.3) + (0)(1)(0.2) + (1)(0)(0.1) + (1)(1)(0.4) = 0.4$$
> > $$E[X] = 0.1 + 0.4 = 0.5, \quad E[Y] = 0.2 + 0.4 = 0.6$$
> > $$\text{Cov}(X,Y) = 0.4 - (0.5)(0.6) = 0.4 - 0.3 = 0.10$$
