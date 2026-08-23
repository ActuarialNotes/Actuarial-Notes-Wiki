---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:81976b166811f6c61d8a1dd9b09e5afc854c2d4a0f073ca4e139f6106de0137d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Discount Factor.md
---

The **discount factor** $v$ is the [[Present Value]] of $1$ payable one period in the future:

> $$v = \frac{1}{1+i}$$

> $$= 1 - d$$

- $i$ is the effective [[Interest Rate]] and $d$ is the [[Discount Rate]].
- The $n$-period discount factor is $v^n = (1+i)^{-n}$.
- The discount factor converts a future cash flow to its present value:

> $$\text{PV} = C \cdot v^n$$

> $$= \frac{C}{(1+i)^n}$$

- Under [[Force of Interest]] $\delta$, the discount factor is $v = e^{-\delta}$ per period.

![[Media/Figures/Discount_Factor.svg|340]]

> [!example]- Present Value Using Discount Factor {Example}
> Find the present value of $10{,}000$ due in 5 years at an effective annual rate of 4%.
>
> > [!answer]-
> > $$v^5 = (1.04)^{-5} = 0.82193$$
> > $$\text{PV} = 10{,}000 \times 0.82193 = 8219.27$$
