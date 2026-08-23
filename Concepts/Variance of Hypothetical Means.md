---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:162c8b153f3977a58326d83e438ea20a6c777fb71d3f2c9a75c42fbfef2cab8e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance of Hypothetical Means.md
---

The **variance of the hypothetical means (VHM)**, written $a$, is the between-risk variance in a [[Bühlmann Credibility]] model — how much the risks in the portfolio genuinely differ from one another once process noise is stripped out.

> $$a = \mathrm{VHM} = \mathrm{Var}_\Theta\!\left(E[X \mid \Theta]\right)$$

- $\mu(\Theta) = E[X \mid \Theta]$ is the **hypothetical mean**: the long-run mean of a risk with parameter $\Theta$. VHM is the variance of that quantity across the population
- With the [[Expected Value of Process Variance]] $v$ it gives $k = v/a$ and $Z = n/(n+k)$
- **Large $a$** means the risks are genuinely heterogeneous, so a risk's own experience is worth a lot and $Z$ rises
- $a = 0$ means every risk has the same mean — experience rating has nothing to detect, and $Z = 0$ for any $n$
- The overall mean is $\mu = E[\mu(\Theta)]$, and $\mathrm{Var}(X) = v + a$

![[Media/Figures/Variance_of_Hypothetical_Means.svg|340]]

> [!example]- VHM for a Gamma-Poisson Model {Example}
> Claim counts are Poisson with mean $\Lambda$, where $\Lambda \sim \text{Gamma}(\alpha = 4, \theta = 0.05)$. Find $\mu$, $v$, $a$, and $k$.
>
> > [!answer]-
> > $\mu(\Lambda) = \Lambda$ and $\sigma^2(\Lambda) = \Lambda$ for a Poisson.
> > $$\mu = E[\Lambda] = \alpha\theta = 4(0.05) = 0.20$$
> > $$v = E[\Lambda] = 0.20 \qquad a = \mathrm{Var}(\Lambda) = \alpha\theta^{2} = 4(0.0025) = 0.01$$
> > $$k = \frac{v}{a} = \frac{0.20}{0.01} = 20 = \frac{1}{\theta}$$
> > For the Gamma-Poisson, $k$ is always $1/\theta$, and $Z = n/(n + 1/\theta)$ reproduces the Bayesian posterior mean exactly.
