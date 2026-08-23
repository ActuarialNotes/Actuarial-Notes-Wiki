---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:38582140836692e9a20c4ebd36def4223a3a88f727f69af94622c6d4217c42fb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variable Force of Interest.md
---

A **variable (time-varying) force of interest** $\delta(t)$ allows the instantaneous rate of interest to change over time. The [[Accumulation Function]] from time $0$ to time $t$ is:

> $$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$

- The accumulation from time $s$ to time $t$ ($s < t$) is:

> $$\frac{a(t)}{a(s)} = \exp\!\left(\int_s^t \delta(u)\,du\right)$$

- Solving [[Time Value of Money Equations]] under variable force of interest requires evaluating these integrals.

![[Media/Figures/Variable_Force_of_Interest.svg|340]]

> [!example]- Accumulation Under Variable Force {Example}
> The force of interest at time $t$ is $\delta(t) = 0.04 + 0.002t$. Find the accumulation of $1$ from $t=0$ to $t=3$.
>
> > [!answer]-
> > $$\int_0^3 (0.04 + 0.002t)\,dt = [0.04t + 0.001t^2]_0^3 = 0.12 + 0.009 = 0.129$$
> > $$a(3) = e^{0.129} \approx 1.1378$$
