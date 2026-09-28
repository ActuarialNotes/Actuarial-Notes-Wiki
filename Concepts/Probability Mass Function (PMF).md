---
verification:
  status: verified
  confidence: high
  last_checked: 2026-09-27
  last_checked_by: agent:validate-v1
  content_hash: sha256:2c99d13a92b520debe9f6fdfb5315a5c7f9b8a5a670e494edf1de30b70cecc11
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Definition 1.2 distribution function m(omega) >= 0 and sum = 1 (PDF p.27), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 4a: Discrete Random Variables, §2 definition (PDF p.2), cdf definition (PDF p.3), §2.8 Properties of the cdf (PDF pp.5-6), sha256:ff2a10e7ef1c0f5ef300ed8f73864d365ca5adcdf9775d1c4a6f356ee7687b5d — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class04-prep-a.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-27), §3.1.3 Probability Mass Function, sha256:d0663822dac70b28920bf443d4d5a8f923d61b1c62e11b7d0b530638cf625ff8 — https://www.probabilitycourse.com/chapter3/3_1_3_pmf.php"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Probability Mass Function (PMF).md
---

A **Probability Mass Function (PMF)** gives the probability that a discrete [[Random Variable]] $X$ equals a specific value $x$.

> $$p(x) = P(X = x)$$

- It must satisfy $p(x) \geq 0$ for all $x$ and $\sum_{\text{all } x} p(x) = 1$

> [!example]- PMF of a Fair Die {Example}
> A fair die is rolled. What is the PMF of the outcome $X$?
>
> > [!answer]-
> > Each face is equally likely, so the PMF is:
> > $$p(x) = \frac{1}{6}, \quad x \in \{1, 2, 3, 4, 5, 6\}$$
> > We can verify: $\sum_{x=1}^{6} \frac{1}{6} = 1$.
