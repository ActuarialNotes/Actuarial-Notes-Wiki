---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:74f3d62ac9d322ab8c4c1155803466561910700a51dc9db29e16f9ebe0fb7368
  sources: []
  open_findings: 0
  log: .verify/Concepts/Force of Interest.md
---

The **force of interest** $\delta$ is the continuously compounded [[Interest Rate]] — the limiting case of a [[Nominal Interest Rate]] [[Convertible m-thly]] as $m \to \infty$:

> $$\delta = \ln(1+i)$$

> $$i = e^\delta - 1$$

- Under a constant force of interest, the [[Accumulation Function]] is:

> $$a(t) = e^{\delta t}$$

- For a time-varying force $\delta(t)$:

> $$a(t) = \exp\!\left(\int_0^t \delta(s)\,ds\right)$$

- The force of interest equals the instantaneous rate of change of $\ln a(t)$: $\delta(t) = a'(t)/a(t)$.

![[Media/Figures/Force_of_Interest.svg|340]]

> [!example]- Converting Force of Interest to Effective Rate {Example}
> The force of interest is $\delta = 0.05$ per year. Find the equivalent effective annual rate.
>
> > [!answer]-
> > $$i = e^{0.05} - 1 = 1.05127 - 1 = 5.127\%$$
