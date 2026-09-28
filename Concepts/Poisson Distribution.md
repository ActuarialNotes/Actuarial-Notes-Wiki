---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:3a8f998592204f6ca0ced3c1e738e2150e5bd4e07a1c2fa488dfdc29ddbe6c7d
  sources:
    - "SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.2 Poisson as the limit of binomial with n to infinity, p to 0, np = lambda fixed, and variance lambda, p.263 (PDF p.271), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Questions (Aug 2026 revision), 14 questions modelling claim counts as Poisson, sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Poisson Distribution.md
---

The **Poisson Distribution** $X \sim \text{Poi}(\lambda)$ models the number of events occurring in a fixed interval of time or space when events happen independently at a constant average rate $\lambda$.

> $$P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$$
>
> $$k = 0, 1, 2, \ldots$$
>
> $$\text{where } \lambda > 0 = \text{the rate (mean number of events)}$$

- A defining property is $E[X] = \text{Var}(X) = \lambda$ — the mean and variance are equal
- It arises as the limit of $\text{Bin}(n, p)$ as $n \to \infty$ and $p \to 0$ with $np = \lambda$ fixed
- It is the standard model for claim counts in actuarial science

![[Media/Poisson_pmf.svg|500]]

![[Media/Figures/Poisson_Distribution.svg|340]]

> [!example]- Probability of Zero Claims in a Month {Example}
> Claims arrive at an average rate of $\lambda = 3$ per month. What is the probability of receiving no claims in a given month?
>
> > [!answer]-
> > $$P(X = 0) = \frac{e^{-3} \cdot 3^0}{0!} = e^{-3} \approx 0.0498$$
> > There is approximately a 5% chance of a claim-free month.
