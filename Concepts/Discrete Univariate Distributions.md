---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:5e3a408457a3267a241d5e6afcad45760e6859e6b791a7aa258f0a5732895441
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 1.2 p.19 (PDF p.27) distribution function m >= 0, sum = 1; 5.1 geometric p.185 (PDF p.193), negative binomial p.187 (PDF p.195), hypergeometric and its binomial limit p.193 (PDF p.201); 6.1 E(Sn)=np p.233 (PDF p.241); 6.2 E(T)=1/p p.262 (PDF p.270), Exercise 11 uniform on 1..n p.264 (PDF p.272), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-09-27, 3.2.1 CDF definition F_X(x)=P(X <= x), sha256:af20b8d628299ce3fe01503e29617951bd45f4292ce46980c319cd3eede2035b — https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php; 3.2.2 Pascal EX=m/p, sha256:cef561084124ba2a0ab25d131a56f9647e8f53a20ab41be7c4480f11fb27c5bf — https://www.probabilitycourse.com/chapter3/3_2_2_expectation.php; 3.2.5 hypergeometric EX=kb/(b+r), sha256:71f926e8d746785af219018a406d4b28b9aac9e283a7c501119fc6c94584f86e — https://www.probabilitycourse.com/chapter3/3_2_5_solved3_2.php"
    - "SOA Probability Exam syllabus, November 2026, Topic 2 Univariate Random Variables (binomial, geometric, hypergeometric, negative binomial, Poisson, uniform), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Discrete Univariate Distributions.md
---

A **Discrete Univariate Distribution** describes the probability law of a single [[Random Variable]] $X$ that takes on a countable set of values.
- The probability mass function (PMF) $f(k)$ specifies the probability that the variable takes a particular distinct value $k$
- The PMF must satisfy $f(k) \geq 0$ for all $k$ and $\sum_{k} f(k) = 1$:

> $$P(X = k) = f(k), \quad k \in \{x_1, x_2, \ldots\}$$

- The cumulative distribution function (CDF) specifies the probability that the variable is at most $x$:

> $$F(x) = P(X \leq x)$$

> $$= \sum_{k \leq x} f(k)$$

## Choosing the right one

Most of the difficulty is identification, not computation. Read the question for **what is being counted** and **whether the trial count is fixed**:

- Successes in a **fixed** number of independent trials → [[Binomial Distribution]] $(n,p)$, with $E[X] = np$
- Successes in a **fixed** number of draws taken **without replacement** from a finite pool → [[Hypergeometric Distribution]] $(N,K,n)$, with $E[X] = nK/N$
- **Trials until** the first success, the trial count not fixed in advance → [[Geometric Distribution]] $(p)$, with $E[X] = 1/p$
- **Trials until** the $r$-th success → [[Negative Binomial Distribution]] $(r,p)$, with $E[X] = r/p$
- Events occurring over a fixed interval of **time or space**, with no trial count at all → [[Poisson Distribution]] $(\lambda)$, with $E[X] = \lambda$
- One of $n$ equally likely outcomes → [[Uniform Discrete|Discrete Uniform]], with $E[X] = (n+1)/2$

- **Binomial vs. hypergeometric** turns entirely on replacement. When the population is large relative to the sample the two nearly agree, and the binomial is the intended shortcut.
- **Binomial vs. Poisson**: a fixed number of trials points to binomial; "per year", "per hour", "per 100 policies" with no trial count points to Poisson.
- The **variance-to-mean ratio** is a fast identification check: it is $< 1$ for binomial, $= 1$ for Poisson, and $> 1$ for negative binomial.
- For "at least one", reach for the complement $1 - P(X=0)$ rather than summing the tail.

![[Media/Figures/Discrete_Univariate_Distributions.svg|340]]

> [!example]- PMF Verification for a Simple Discrete Distribution {Example}
> A random variable $X$ has PMF $f(k) = c \cdot k$ for $k = 1, 2, 3, 4$. Find $c$ and compute $P(X \leq 3)$.
>
> > [!answer]-
> > For $f$ to be a valid PMF we need $\sum_{k=1}^{4} c \cdot k = 1$, so
> > $$c(1 + 2 + 3 + 4) = 10c = 1 \implies c = \frac{1}{10}$$
> > Then
> > $$P(X \leq 3) = F(3) = \frac{1}{10}(1+2+3) = \frac{6}{10} = 0.6$$
