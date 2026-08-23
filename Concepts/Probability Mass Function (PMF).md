---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2c99d13a92b520debe9f6fdfb5315a5c7f9b8a5a670e494edf1de30b70cecc11
  sources: []
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
