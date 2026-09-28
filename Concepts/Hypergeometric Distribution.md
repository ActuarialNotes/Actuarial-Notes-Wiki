---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:443b7b3712706f9080db1bdacc62f91591c91c6ced5995ec945560083a1f5be8
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 hypergeometric h(N,k,n,x)=C(k,x)C(N-k,n-x)/C(N,n) p.193 (PDF p.201), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "K. Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (Random Services, UAH), The Hypergeometric Distribution, Moments section: E(Y) = n r/m, var(Y) = n (r/m)(1 - r/m)(m - n)/(m - 1), fetched 2026-09-27, sha256:56414fcd41140fbad38e3e39034536cd06144012f8457ed797740bec97e44487 — https://www.randomservices.org/random/urn/Hypergeometric.html"
    - "H. Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), fetched 2026-09-27, 3.1.5 hypergeometric range max(0,k-r)..min(k,b), sha256:bccbfaa60f1813544eb18810fd601ea98e2e89e80c5d50f76aa6ea10a6096a72 — https://www.probabilitycourse.com/chapter3/3_1_5_special_discrete_distr.php; 3.2.5 EX=kb/(b+r), sha256:71f926e8d746785af219018a406d4b28b9aac9e283a7c501119fc6c94584f86e — https://www.probabilitycourse.com/chapter3/3_2_5_solved3_2.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hypergeometric Distribution.md
---

The **Hypergeometric Distribution** models the number of successes in a sample of size $n$ drawn **without replacement** from a finite population of $N$ items, $K$ of which are successes. Unlike the [[Binomial Distribution|Binomial]], trials are not independent.

> $$P(X = k) = \frac{\dbinom{K}{k}\dbinom{N-K}{n-k}}{\dbinom{N}{n}}$$
>
> $$k = \max(0,\,n+K-N),\ldots,\min(n,K)$$
>
> $$\text{where } N = \text{population size},\; K = \text{successes in population},\; n = \text{sample size}$$

> $$E[X] = \frac{nK}{N}$$

> $$\text{Var}(X) = \frac{nK(N-K)(N-n)}{N^2(N-1)}$$

![[Media/Hypergeometric_pmf.svg|500]]

![[Media/Figures/Hypergeometric_Distribution.svg|340]]

> [!example]- Drawing Defective Items {Example}
> A box contains 10 insurance policies: 4 with errors and 6 without. An auditor selects 3 at random without replacement. Find the probability exactly 2 have errors.
>
> > [!answer]-
> > $N=10$, $K=4$, $n=3$, $k=2$:
> > $$P(X=2) = \frac{\binom{4}{2}\binom{6}{1}}{\binom{10}{3}} = \frac{6 \cdot 6}{120} = \frac{36}{120} = 0.30$$
