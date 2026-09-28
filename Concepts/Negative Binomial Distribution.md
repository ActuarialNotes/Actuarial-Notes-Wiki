---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:8b901f507be6e6a11af1e7bac19d40ece3db15d814a8e428550e21fec124f93f
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 negative binomial u(x,k,p)=C(x-1,k-1)p^k q^(x-k), trials until the k-th head, k=1 geometric, p.187 (PDF p.195); 7.1 convolution of k geometrics is negative binomial p.289 (PDF p.297); 6.2 geometric V=q/p^2 p.262 (PDF p.270), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-09-27, 3.2.2 Pascal(m,p) EX=m/p, sha256:cef561084124ba2a0ab25d131a56f9647e8f53a20ab41be7c4480f11fb27c5bf — https://www.probabilitycourse.com/chapter3/3_2_2_expectation.php"
    - "SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA Exam P Sample Solutions (Aug 2026 revision), Q146 solution PDF pp.42-43 (negative binomial probability of the third success on the fifth trial), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Negative Binomial Distribution.md
---

The **Negative Binomial Distribution** $X \sim \text{NegBin}(r, p)$ counts the number of independent Bernoulli trials needed to achieve exactly $r$ successes. When $r = 1$ it reduces to the [[Geometric Distribution|Geometric]] distribution.

> $$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}$$
>
> $$k = r, r+1, r+2, \ldots$$
>
> $$\text{where } r = \text{number of successes required},\; p = \text{success probability}$$

> $$E[X] = \frac{r}{p}, \qquad \text{Var}(X) = \frac{r(1-p)}{p^2}$$

- **Check the parameterization first.** As written, $X$ counts *trials* and starts at $r$. The alternative counts *failures before the $r$-th success*, $Y = X - r \in \{0,1,2,\ldots\}$, with $P(Y=k) = \binom{k+r-1}{k}p^r(1-p)^k$ and $E[Y] = r(1-p)/p$. Same variance, means differing by $r$ — the same trap as the [[Geometric Distribution|geometric]].
- $\text{Var}(X) > E[X]$ always, so the negative binomial is the standard **overdispersed** alternative to the [[Poisson Distribution|Poisson]] for claim counts in a heterogeneous portfolio.

![[Media/Negative_binomial_pmf.svg|500]]

![[Media/Figures/Negative_Binomial_Distribution.svg|340]]

> [!example]- Claims Until Third Large Loss {Example}
> Each claim has a 25% probability of being a large loss. Find the probability the 3rd large loss occurs on the 7th claim.
>
> > [!answer]-
> > $r=3$, $p=0.25$, $k=7$:
> > $$P(X=7) = \binom{6}{2}(0.25)^3(0.75)^4 = 15 \cdot 0.015625 \cdot 0.3164 \approx 0.0742$$
