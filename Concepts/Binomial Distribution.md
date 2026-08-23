---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6894d0bc4043f949ffae2b0b39707ff94ed71e16b5f371db835a987ff14f272b
  sources: []
  open_findings: 0
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
