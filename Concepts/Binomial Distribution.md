---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:6894d0bc4043f949ffae2b0b39707ff94ed71e16b5f371db835a987ff14f272b
  sources:
    - "SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.1 E(Sn)=np p.233 (PDF p.241); 6.2 binomial variance npq p.263 (PDF p.271), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q41 solution PDF pp.15-16 (binomial probabilities for independent months), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Binomial Distribution.md
---

The **Binomial Distribution** $X \sim \text{Bin}(n, p)$ models the number of successes in $n$ independent Bernoulli trials, each with probability of success $p$.
- Requires trials to be independent, each trial to have exactly two outcomes, and $p$ to be constant across trials

> $$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$
>
> $$k = 0, 1, \ldots, n$$

- $E[X] = np$ and $\text{Var}(X) = np(1-p)$

![[Media/Binomial_distribution_pmf.svg|450]]

![[Media/Figures/Binomial_Distribution.svg|340]]

> [!example]- Number of Claims in a Group Policy {Example}
> A group of 10 policyholders each independently file a claim with probability 0.3. Find the probability that exactly 4 file claims.
>
> > [!answer]-
> > $X \sim \text{Bin}(10, 0.3)$, so:
> > $$P(X = 4) = \binom{10}{4}(0.3)^4(0.7)^6 = 210 \times 0.0081 \times 0.117649 \approx 0.2001$$
