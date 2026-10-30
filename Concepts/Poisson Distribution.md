---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:e79179ce6af3b18cd70e86131a10a67a6c17814109ceb5e7a51a529043f82eb5
  sources:
    - "SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 6.2 Poisson as the limit of binomial with n to infinity, p to 0, np = lambda fixed, and variance lambda, p.263 (PDF p.271), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam P Sample Questions (Aug 2026 revision), 14 questions modelling claim counts as Poisson, sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 eq. 5.2 Poisson pmf, P(X=0) ~ e^-lambda, p.189 (PDF p.197), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "OpenStax Calculus Volume 2 (HTML fetched 2026-10-30), §6.3 Taylor and Maclaurin Series, Example 6.16: Maclaurin series of e^x = sum x^n/n!, converging for all x, sha256:d31b601074d1b8cc7241191e2d4ec581e3524ae4ec5907a6c500f2ad4683f9dd — https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series"
    - "OpenStax Calculus Volume 1 (HTML fetched 2026-10-30), §1.5 Exponential and Logarithmic Functions: natural log as inverse of e^x; Hyperbolic Functions, cosh x = (e^x + e^-x)/2, sha256:bb31120fbd3eefab30afe72f26fb353e84b3d34084c59d0f8b0521d1b4703113 — https://openstax.org/books/calculus-volume-1/pages/1-5-exponential-and-logarithmic-functions"
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
- **Recovering $\lambda$ from a zero probability.** Because $P(X = 0) = e^{-\lambda}$, a given probability of no events (or of at least one event, $1 - e^{-\lambda}$) fixes the mean:

> $$\lambda = -\ln P(X = 0)$$

- A stated relation between such probabilities of two Poisson variables, such as $e^{-\lambda_2} = c\,e^{-\lambda_1}$ or $1 - e^{-\lambda_2} = c\,(1 - e^{-\lambda_1})$, is an equation between the probabilities, not between the means: write it in the probability expressions and solve for the unknown mean by taking natural logarithms.
- **Even or odd counts.** Adding the series $e^{\lambda} = \sum_n \lambda^n/n!$ and $e^{-\lambda} = \sum_n (-\lambda)^n/n!$ cancels the odd terms, so the even terms sum to $\sum_k \lambda^{2k}/(2k)! = (e^{\lambda} + e^{-\lambda})/2 = \cosh\lambda$. Summing the pmf over even $n$ then gives:

> $$P(X \text{ even}) = e^{-\lambda}\cosh\lambda = \frac{1 + e^{-2\lambda}}{2}, \qquad P(X \text{ odd}) = \frac{1 - e^{-2\lambda}}{2}$$

![[Media/Poisson_pmf.svg|500]]

![[Media/Figures/Poisson_Distribution.svg|340]]

> [!example]- Probability of Zero Claims in a Month {Example}
> Claims arrive at an average rate of $\lambda = 3$ per month. What is the probability of receiving no claims in a given month?
>
> > [!answer]-
> > $$P(X = 0) = \frac{e^{-3} \cdot 3^0}{0!} = e^{-3} \approx 0.0498$$
> > There is approximately a 5% chance of a claim-free month.
