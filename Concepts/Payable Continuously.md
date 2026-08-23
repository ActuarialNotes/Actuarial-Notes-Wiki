---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ab69d00eb37ce92e6621a6a2f20a40f9e8f156406271fb39d85164c3471ab372
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Payable Continuously.md
---

An annuity **payable continuously** pays at a constant rate of $1$ per year, with payments flowing continuously. The present value of a continuous $n$-year annuity is denoted $\bar{a}_{\overline{n}|}$:

> $$\bar{a}_{\overline{n}|} = \int_0^n v^t\,dt$$

> $$= \int_0^n e^{-\delta t}\,dt$$

> $$= \frac{1-e^{-\delta n}}{\delta}$$

> $$= \frac{1-v^n}{\delta}$$

- Here $\delta$ is the [[Force of Interest]].
- This is the limiting case of a [[Payable m-thly]] annuity as $m \to \infty$.

![[Media/Figures/Payable_Continuously.svg|340]]

> [!example]- Continuous Annuity Present Value {Example}
> Find the present value of a 5-year continuous annuity paying at rate $1000$ per year, at $\delta = 0.07$.
>
> > [!answer]-
> > $$\text{PV} = 1000 \cdot \bar{a}_{\overline{5}|} = 1000 \cdot \frac{1-e^{-0.35}}{0.07} = 1000 \cdot \frac{1-0.70469}{0.07} = 1000 \times 4.219 = 4219$$
